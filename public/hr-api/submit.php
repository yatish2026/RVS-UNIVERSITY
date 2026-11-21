<?php
// Public: receives a recruitment application (multipart: payload JSON + files).
require __DIR__ . '/_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') hr_fail('Method not allowed', 405);
$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int)$_SERVER['CONTENT_LENGTH'] : 0;
if (empty($_POST) && empty($_FILES) && $contentLength > 0) {
    hr_fail('Your files are too large to upload together. Please use smaller files and try again.', 413);
}

$schema = hr_load_schema();
$settings = $schema['settings'];
if (empty($settings['acceptingApplications'])) hr_fail('Applications are currently closed.', 403);

// Honeypot: bots fill the hidden "website" input. Pretend success.
if (!empty($_POST['website'])) {
    hr_json(['ok' => true, 'id' => 'RECEIVED', 'submittedAt' => hr_now(), 'emailQueued' => false]);
    exit;
}
if (hr_rate_limited()) hr_fail('Too many applications were submitted from your network. Please try again in an hour.', 429);

$payload = json_decode(isset($_POST['payload']) ? (string)$_POST['payload'] : '', true);
if (!is_array($payload)) hr_fail('Invalid submission. Please refresh the page and try again.');

// ---- Collect uploads (f--section--index--field)
$uploads = [];
$uploadFiles = [];
foreach ($_FILES as $name => $file) {
    if (!preg_match('/^f--([A-Za-z0-9]+)--(_|\d{1,3})--([A-Za-z0-9]+)$/', $name, $m)) continue;
    if (is_array($file['error']) || $file['error'] === UPLOAD_ERR_NO_FILE) continue;
    if ($file['error'] !== UPLOAD_ERR_OK) {
        hr_fail($file['error'] === UPLOAD_ERR_INI_SIZE || $file['error'] === UPLOAD_ERR_FORM_SIZE
            ? 'One of your files is too large. Please upload a smaller file.'
            : 'A file could not be uploaded. Please try again.');
    }
    $key = $m[1] . '.' . $m[2] . '.' . $m[3];
    $uploads[$key] = true;
    $uploadFiles[$key] = $file;
}

// ---- Find a field definition by section + field id
$findField = function ($sid, $fid) use ($schema) {
    foreach ($schema['steps'] as $step) {
        foreach ($step['sections'] as $sec) {
            if ($sec['id'] !== $sid) continue;
            foreach ($sec['fields'] as $f) {
                if ($f['id'] === $fid) return $f;
            }
        }
    }
    return null;
};

// ---- Check each upload against its field rules
foreach ($uploadFiles as $key => $file) {
    list($sid, , $fid) = explode('.', $key);
    $f = $findField($sid, $fid);
    if (!$f || $f['type'] !== 'file') {
        unset($uploadFiles[$key], $uploads[$key]);
        continue;
    }
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $accept = !empty($f['accept']) ? array_map(function ($a) {
        return strtolower(ltrim(trim($a), '.'));
    }, explode(',', $f['accept'])) : HR_ALLOWED_EXT;
    if (!in_array($ext, HR_ALLOWED_EXT, true) || !in_array($ext, $accept, true)) {
        hr_fail($f['label'] . ': please upload a ' . strtoupper(implode(', ', $accept)) . ' file.');
    }
    $max = !empty($f['maxSizeMB']) ? (float)$f['maxSizeMB'] : 10;
    if ($file['size'] > $max * 1024 * 1024) hr_fail($f['label'] . ': file must be ' . $max . ' MB or smaller.');
}

// ---- Validate + clean
list($data, $errors) = hr_clean_and_validate($schema, $payload, $uploads);
if ($errors) {
    hr_fail(count($errors) === 1 ? $errors[0] : $errors[0] . ' (and ' . (count($errors) - 1) . ' more issue(s))', 422);
}

// ---- Store
$id = hr_next_id(isset($settings['idPrefix']) ? $settings['idPrefix'] : 'RVSU-REC');
$uploadDir = hr_data_dir() . '/uploads/' . $id;
$finfo = function_exists('finfo_open') ? finfo_open(FILEINFO_MIME_TYPE) : null;

foreach ($uploadFiles as $key => $file) {
    list($sid, $idx, $fid) = explode('.', $key);
    // Only store files for fields that are still visible/accepted
    if ($idx === '_') {
        if (!isset($data[$sid][$fid]) || $data[$sid][$fid] !== $key) continue;
    } else {
        if (!isset($data[$sid][(int)$idx][$fid]) || $data[$sid][(int)$idx][$fid] !== $key) continue;
    }
    if (!is_dir($uploadDir)) @mkdir($uploadDir, 0700, true);
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $stored = $fid . '-' . ($idx === '_' ? '0' : $idx) . '-' . bin2hex(random_bytes(5)) . '.' . $ext;
    if (!@move_uploaded_file($file['tmp_name'], $uploadDir . '/' . $stored)) {
        hr_fail('Could not save your file. Please try again.', 500);
    }
    @chmod($uploadDir . '/' . $stored, 0600);
    $original = preg_replace('/[^\w.\- ()]+/u', '_', basename((string)$file['name']));
    $meta = [
        'name' => mb_substr($original ?: ($fid . '.' . $ext), 0, 120),
        'size' => (int)$file['size'],
        'type' => $finfo ? (string)finfo_file($finfo, $uploadDir . '/' . $stored) : (string)$file['type'],
        'stored' => $stored,
    ];
    if ($idx === '_') $data[$sid][$fid] = $meta;
    else $data[$sid][(int)$idx][$fid] = $meta;
}

$submittedAt = hr_now();
$app = hr_summary_from($id, $submittedAt, $data, $schema);
$app['schemaVersion'] = (int)$schema['version'];
$app['data'] = $data;
$app['notes'] = '';
$app['emailLog'] = [];
$app['history'] = [['at' => $submittedAt, 'status' => 'New', 'note' => 'Application submitted']];
$app['meta'] = [
    'ipHash' => substr(sha1(hr_client_ip() . '|rvsu'), 0, 16),
    'userAgent' => substr(isset($_SERVER['HTTP_USER_AGENT']) ? (string)$_SERVER['HTTP_USER_AGENT'] : '', 0, 200),
];
if (!hr_save_app($app)) hr_fail('Could not save your application. Please try again.', 500);

// ---- Reply to the browser now, then send emails in the background
hr_respond_early(['ok' => true, 'id' => $id, 'submittedAt' => $submittedAt, 'emailQueued' => true]);

$app = hr_send_app_emails($app, $schema, 'both');
hr_save_app($app);
