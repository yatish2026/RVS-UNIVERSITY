<?php
// Admin API for the recruitment console. Every call needs the X-Admin-Key header.
require __DIR__ . '/_lib.php';

hr_require_admin();

$action = isset($_GET['action']) ? (string)$_GET['action'] : '';
$input = [];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode((string)file_get_contents('php://input'), true);
    if (!is_array($input)) $input = [];
}
$get = function ($k, $default = null) use ($input) {
    return array_key_exists($k, $input) ? $input[$k] : $default;
};
$requireApp = function ($id) {
    $app = hr_load_app($id);
    if (!$app) hr_fail('Application not found', 404);
    return $app;
};

switch ($action) {
    case 'verify':
        hr_json(['ok' => true, 'mailMode' => hr_mail_mode()]);
        break;

    case 'getConfig':
        $history = [];
        foreach (glob(hr_data_dir() . '/form-versions/v*.json') ?: [] as $file) {
            $snap = hr_read_json($file);
            if (!$snap) continue;
            $history[] = ['file' => basename($file), 'version' => (int)$snap['version'], 'savedAt' => isset($snap['savedAt']) ? $snap['savedAt'] : null];
        }
        usort($history, function ($a, $b) {
            return $b['version'] - $a['version'];
        });
        hr_json(['ok' => true, 'schema' => hr_load_schema(), 'history' => array_slice($history, 0, 40)]);
        break;

    case 'getDefault':
        $d = hr_default_schema();
        $d['version'] = hr_load_schema()['version'];
        hr_json(['ok' => true, 'schema' => $d]);
        break;

    case 'saveConfig':
        $schema = $get('schema');
        $err = hr_validate_schema($schema);
        if ($err) hr_fail($err, 422);
        $schema['settings']['notifyEmails'] = array_values(array_unique(array_map('trim', $schema['settings']['notifyEmails'])));
        hr_json(['ok' => true, 'schema' => hr_save_schema($schema)]);
        break;

    case 'restoreVersion':
        $file = basename((string)$get('file', ''));
        if (!preg_match('/^v\d+\.json$/', $file)) hr_fail('Invalid version');
        $snap = hr_read_json(hr_data_dir() . '/form-versions/' . $file);
        if (!$snap) hr_fail('Version not found', 404);
        unset($snap['savedAt']);
        hr_json(['ok' => true, 'schema' => hr_save_schema($snap)]);
        break;

    case 'listApplications':
        hr_json(['ok' => true, 'applications' => array_map('hr_summary', hr_all_apps())]);
        break;

    case 'exportAll':
        hr_json(['ok' => true, 'applications' => hr_all_apps(), 'schema' => hr_load_schema()]);
        break;

    case 'getApplication':
        $app = $requireApp((string)$get('id'));
        $schema = hr_schema_for_version(isset($app['schemaVersion']) ? $app['schemaVersion'] : 1);
        hr_json(['ok' => true, 'application' => $app, 'schema' => $schema]);
        break;

    case 'updateApplication':
        $app = $requireApp((string)$get('id'));
        $allowed = ['New', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'On Hold', 'Rejected'];
        $status = $get('status');
        if ($status !== null) {
            if (!in_array($status, $allowed, true)) hr_fail('Invalid status');
            if ($status !== $app['status']) {
                $app['status'] = $status;
                $app['history'][] = ['at' => hr_now(), 'status' => $status, 'note' => mb_substr((string)$get('note', ''), 0, 500)];
            }
        }
        if ($get('notes') !== null) $app['notes'] = mb_substr((string)$get('notes'), 0, 10000);
        hr_save_app($app);
        hr_json(['ok' => true, 'application' => $app]);
        break;

    case 'deleteApplication':
        $id = (string)$get('id');
        $app = $requireApp($id);
        $dir = hr_data_dir() . '/uploads/' . $app['id'];
        foreach (glob($dir . '/*') ?: [] as $f) @unlink($f);
        @rmdir($dir);
        @unlink(hr_app_path($app['id']));
        hr_json(['ok' => true]);
        break;

    case 'resendEmails':
        $app = $requireApp((string)$get('id'));
        $target = in_array($get('target'), ['team', 'applicant', 'both'], true) ? $get('target') : 'both';
        // Use the current settings (recipients) but the application's own form version for labels.
        $schema = hr_schema_for_version(isset($app['schemaVersion']) ? $app['schemaVersion'] : 1);
        $schema['settings'] = hr_load_schema()['settings'];
        $app = hr_send_app_emails($app, $schema, $target);
        hr_save_app($app);
        hr_json(['ok' => true, 'application' => $app]);
        break;

    case 'testEmail':
        $to = trim((string)$get('to'));
        if (!filter_var($to, FILTER_VALIDATE_EMAIL)) hr_fail('Enter a valid email address');
        $settings = hr_load_schema()['settings'];
        $html = hr_email_layout('Test email from the careers portal', 'Test Email', 'Email delivery is working.',
            '<tr><td style="padding:24px 32px 0;font:14.5px/1.65 Arial,Helvetica,sans-serif;color:#4D3D30;">This is a test message from the RVS University recruitment console. If you can read this, notification emails will reach this address.</td></tr>');
        list($ok, $err) = hr_send_mail([$to], 'Test email — RVS University careers portal', $html, null, [], isset($settings['senderName']) ? $settings['senderName'] : null);
        if (!$ok) hr_fail('Could not send: ' . $err, 502);
        hr_json(['ok' => true, 'mode' => hr_mail_mode()]);
        break;

    case 'pdf':
        $app = $requireApp(isset($_GET['id']) ? (string)$_GET['id'] : '');
        require_once __DIR__ . '/_pdf.php';
        $schema = hr_schema_for_version(isset($app['schemaVersion']) ? $app['schemaVersion'] : 1);
        $bytes = hr_build_application_pdf($app, $schema);
        header('Content-Type: application/pdf');
        header('Content-Length: ' . strlen($bytes));
        header('Content-Disposition: attachment; filename="' . hr_pdf_filename($app) . '"');
        header('Cache-Control: no-store');
        echo $bytes;
        break;

    case 'file':
        $app = $requireApp(isset($_GET['id']) ? (string)$_GET['id'] : '');
        $stored = basename(isset($_GET['file']) ? (string)$_GET['file'] : '');
        $meta = null;
        foreach (hr_app_files($app) as $f) {
            if ($f['stored'] === $stored) $meta = $f;
        }
        $path = hr_data_dir() . '/uploads/' . $app['id'] . '/' . $stored;
        if (!$meta || !is_file($path)) hr_fail('File not found', 404);
        header('Content-Type: ' . ($meta['type'] ?: 'application/octet-stream'));
        header('Content-Length: ' . filesize($path));
        header('Content-Disposition: attachment; filename="' . str_replace('"', '', $meta['name']) . '"');
        header('Cache-Control: no-store');
        header('X-Content-Type-Options: nosniff');
        readfile($path);
        break;

    default:
        hr_fail('Unknown action', 404);
}
