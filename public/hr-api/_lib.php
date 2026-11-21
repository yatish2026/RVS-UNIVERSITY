<?php
/**
 * RVS University — Recruitment (careers application) backend helpers.
 *
 * Data lives OUTSIDE the web root:
 *   production: /home/<cpanel-user>/rvsu_hr_data
 *   local dev : <repo>/.hr-data
 * Override with the RVSU_HR_DATA_DIR environment variable.
 *
 * The visibility/validation rules mirror src/features/recruitment/engine.ts.
 */

if (!defined('HR_LIB')) {
    define('HR_LIB', 1);
}

date_default_timezone_set('Asia/Kolkata');

const HR_PUBLIC_SITE = 'https://rvsu.ac.in';
const HR_CORE_FIELDS = [
    'position' => ['postType', 'department', 'designation'],
    'personal' => ['firstName', 'lastName', 'email', 'mobile'],
];
const HR_ALLOWED_EXT = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'webp'];

// ---------------------------------------------------------------- basics

function hr_data_dir()
{
    static $dir = null;
    if ($dir !== null) return $dir;
    $env = getenv('RVSU_HR_DATA_DIR');
    $here = str_replace('\\', '/', __DIR__) . '/';
    if ($env) {
        $dir = rtrim($env, '/\\');
    } elseif (preg_match('#^(/home\d*/[^/]+)/#', $here, $m)) {
        $dir = $m[1] . '/rvsu_hr_data';
    } else {
        $dir = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . '.hr-data';
    }
    foreach (['', '/applications', '/uploads', '/form-versions', '/outbox', '/ratelimit'] as $sub) {
        if (!is_dir($dir . $sub)) @mkdir($dir . $sub, 0700, true);
    }
    if (!file_exists($dir . '/.htaccess')) @file_put_contents($dir . '/.htaccess', "Require all denied\n");
    return $dir;
}

function hr_json($data, $code = 200)
{
    if (!headers_sent()) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        header('X-Content-Type-Options: nosniff');
    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function hr_fail($message, $code = 400)
{
    hr_json(['ok' => false, 'error' => $message], $code);
    exit;
}

function hr_read_json($path, $default = null)
{
    if (!is_file($path)) return $default;
    $raw = @file_get_contents($path);
    if ($raw === false) return $default;
    $data = json_decode($raw, true);
    return is_array($data) ? $data : $default;
}

function hr_write_json($path, $data)
{
    $tmp = $path . '.' . bin2hex(random_bytes(4)) . '.tmp';
    $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if ($json === false || @file_put_contents($tmp, $json, LOCK_EX) === false) return false;
    @chmod($tmp, 0600);
    if (!@rename($tmp, $path)) {
        // Windows cannot rename over an existing file
        @unlink($path);
        if (!@rename($tmp, $path)) return false;
    }
    return true;
}

function hr_now()
{
    return date('c');
}

function hr_client_ip()
{
    return isset($_SERVER['REMOTE_ADDR']) ? (string)$_SERVER['REMOTE_ADDR'] : '0.0.0.0';
}

// ---------------------------------------------------------------- schema

function hr_default_schema()
{
    $s = json_decode((string)@file_get_contents(__DIR__ . '/_default-form.json'), true);
    if (!is_array($s)) hr_fail('Default form definition missing', 500);
    return $s;
}

function hr_version_path($version)
{
    return hr_data_dir() . '/form-versions/v' . (int)$version . '.json';
}

function hr_load_schema()
{
    $path = hr_data_dir() . '/form.json';
    $schema = hr_read_json($path);
    if (!$schema) {
        $schema = hr_default_schema();
        $schema['version'] = 1;
    }
    // Make sure an immutable snapshot exists for this version (used to render old applications).
    $vp = hr_version_path($schema['version']);
    if (!is_file($vp)) {
        $snap = $schema;
        $snap['savedAt'] = isset($schema['updatedAt']) && $schema['updatedAt'] ? $schema['updatedAt'] : hr_now();
        hr_write_json($vp, $snap);
    }
    return $schema;
}

function hr_schema_for_version($version)
{
    $snap = hr_read_json(hr_version_path($version));
    return $snap ? $snap : hr_load_schema();
}

function hr_valid_id($id)
{
    return is_string($id) && preg_match('/^[A-Za-z][A-Za-z0-9]{0,47}$/', $id);
}

function hr_validate_schema($s)
{
    if (!is_array($s) || !isset($s['steps'], $s['lists'], $s['settings']) || !is_array($s['steps']) || !is_array($s['lists']) || !is_array($s['settings'])) {
        return 'Invalid form definition';
    }
    $sectionIds = [];
    $found = [];
    foreach ($s['steps'] as $step) {
        if (!hr_valid_id(isset($step['id']) ? $step['id'] : null)) return 'Invalid step id';
        if (!isset($step['sections']) || !is_array($step['sections'])) return 'Step "' . $step['id'] . '" has no sections';
        foreach ($step['sections'] as $sec) {
            $sid = isset($sec['id']) ? $sec['id'] : null;
            if (!hr_valid_id($sid)) return 'Invalid section id in step "' . $step['id'] . '"';
            if (isset($sectionIds[$sid])) return 'Duplicate section id "' . $sid . '"';
            $sectionIds[$sid] = true;
            $fieldIds = [];
            foreach ((isset($sec['fields']) && is_array($sec['fields']) ? $sec['fields'] : []) as $f) {
                $fid = isset($f['id']) ? $f['id'] : null;
                if (!hr_valid_id($fid)) return 'Invalid field id in section "' . $sid . '"';
                if (isset($fieldIds[$fid])) return 'Duplicate field id "' . $fid . '" in section "' . $sid . '"';
                $fieldIds[$fid] = true;
                $found[$sid . '.' . $fid] = empty($f['hidden']);
            }
        }
    }
    foreach (HR_CORE_FIELDS as $sid => $fids) {
        foreach ($fids as $fid) {
            if (empty($found[$sid . '.' . $fid])) return 'Core field "' . $sid . '.' . $fid . '" must exist and stay visible';
        }
    }
    $listIds = [];
    foreach ($s['lists'] as $l) {
        if (!hr_valid_id(isset($l['id']) ? $l['id'] : null)) return 'Invalid list id';
        if (isset($listIds[$l['id']])) return 'Duplicate list id "' . $l['id'] . '"';
        $listIds[$l['id']] = true;
    }
    $emails = isset($s['settings']['notifyEmails']) && is_array($s['settings']['notifyEmails']) ? $s['settings']['notifyEmails'] : [];
    foreach ($emails as $e) {
        if (!filter_var($e, FILTER_VALIDATE_EMAIL)) return 'Invalid notification email: ' . $e;
    }
    return null;
}

function hr_save_schema($schema)
{
    $current = hr_load_schema();
    $schema['version'] = (int)$current['version'] + 1;
    $schema['updatedAt'] = hr_now();
    if (!hr_write_json(hr_data_dir() . '/form.json', $schema)) hr_fail('Could not save the form', 500);
    $snap = $schema;
    $snap['savedAt'] = $schema['updatedAt'];
    hr_write_json(hr_version_path($schema['version']), $snap);
    return $schema;
}

function hr_public_schema($schema)
{
    $s = $schema;
    // Recipient addresses are internal.
    unset($s['settings']['notifyEmails'], $s['settings']['replyTo'], $s['settings']['attachFilesToEmail']);
    return $s;
}

// ---------------------------------------------------------------- rules (mirror engine.ts)

function hr_is_empty($v)
{
    if ($v === null || $v === false) return true;
    if (is_string($v)) return trim($v) === '';
    return false;
}

function hr_matches($actual, $expected)
{
    if (is_bool($expected)) return ($actual === true || $actual === 'true') === $expected;
    $a = ($actual === null || is_array($actual)) ? '' : (is_bool($actual) ? ($actual ? 'true' : '') : (string)$actual);
    if (is_array($expected)) return in_array($a, array_map('strval', $expected), true);
    return $a === (string)$expected;
}

function hr_section_data($values, $sid)
{
    return (isset($values[$sid]) && is_array($values[$sid]) && !hr_is_list($values[$sid])) ? $values[$sid] : null;
}

function hr_is_list($arr)
{
    if (!is_array($arr)) return false;
    if ($arr === []) return true;
    return array_keys($arr) === range(0, count($arr) - 1);
}

function hr_eval($conds, $values, $sectionId, $item)
{
    if (empty($conds) || !is_array($conds)) return true;
    foreach ($conds as $c) {
        if (!is_array($c) || empty($c['field'])) continue;
        $src = (!empty($c['section']) && $c['section'] !== $sectionId) ? hr_section_data($values, $c['section']) : $item;
        $actual = is_array($src) && array_key_exists($c['field'], $src) ? $src[$c['field']] : null;
        if (array_key_exists('equals', $c) && $c['equals'] !== null && $c['equals'] !== '' && !hr_matches($actual, $c['equals'])) return false;
        if (array_key_exists('notEquals', $c) && $c['notEquals'] !== null && $c['notEquals'] !== '' && hr_matches($actual, $c['notEquals'])) return false;
    }
    return true;
}

/** Post type the applicant picked (position › postType). */
function hr_post_type($values)
{
    $p = hr_section_data($values, 'position');
    return ($p && isset($p['postType']) && is_string($p['postType'])) ? $p['postType'] : '';
}

/** Items restricted to some post types are shown only once a matching one is chosen. */
function hr_applies($item, $values)
{
    if (empty($item['postTypes']) || !is_array($item['postTypes'])) return true;
    return in_array(hr_post_type($values), $item['postTypes'], true);
}

/** Mandatory for this applicant's post type? (`requiredFor` overrides `required`.) */
function hr_is_required($f, $values)
{
    if (isset($f['requiredFor']) && is_array($f['requiredFor'])) return in_array(hr_post_type($values), $f['requiredFor'], true);
    return !empty($f['required']);
}

function hr_step_visible($step, $values)
{
    return empty($step['hidden']) && hr_applies($step, $values) && hr_eval(isset($step['showIf']) ? $step['showIf'] : null, $values, null, null);
}

function hr_section_visible($sec, $values)
{
    return empty($sec['hidden']) && hr_applies($sec, $values) && hr_eval(isset($sec['showIf']) ? $sec['showIf'] : null, $values, null, null);
}

function hr_field_visible($f, $sid, $item, $values)
{
    return empty($f['hidden']) && hr_applies($f, $values) && hr_eval(isset($f['showIf']) ? $f['showIf'] : null, $values, $sid, $item);
}

function hr_js_regex($pattern)
{
    return '~' . str_replace('~', '\~', $pattern) . '~u';
}

function hr_validate_value($f, $v, $required = null)
{
    $type = isset($f['type']) ? $f['type'] : 'text';
    if ($required === null) $required = !empty($f['required']);
    if ($type === 'file') {
        return ($required && !$v) ? 'Please upload this file' : null;
    }
    if ($type === 'checkbox') {
        return ($required && $v !== true) ? 'Please tick this box' : null;
    }
    $s = is_scalar($v) ? trim((string)$v) : '';
    if ($s === '') return $required ? 'This field is required' : null;
    if ($type === 'email' && !filter_var($s, FILTER_VALIDATE_EMAIL)) return 'Enter a valid email address';
    if ($type === 'number' || $type === 'year') {
        if (!is_numeric($s)) return 'Enter a valid number';
        $n = $s + 0;
        if ($type === 'year' && !preg_match('/^\d{4}$/', $s)) return 'Enter a 4-digit year';
        if (isset($f['min']) && $f['min'] !== null && $f['min'] !== '' && $n < $f['min']) return 'Must be ' . $f['min'] . ' or more';
        if (isset($f['max']) && $f['max'] !== null && $f['max'] !== '' && $n > $f['max']) return 'Must be ' . $f['max'] . ' or less';
    }
    if ($type === 'date' && strtotime($s) === false) return 'Enter a valid date';
    if (!empty($f['maxLength']) && mb_strlen($s) > (int)$f['maxLength']) return 'Too long';
    if (!empty($f['pattern'])) {
        $ok = @preg_match(hr_js_regex($f['pattern']), $s);
        if ($ok === 0) return !empty($f['patternMessage']) ? $f['patternMessage'] : 'Invalid format';
    }
    return null;
}

/**
 * Keep only known, visible fields; validate them.
 * $uploads: map "section.index.field" => true for files actually uploaded.
 * Returns [cleanData, errors[]].
 */
function hr_clean_and_validate($schema, $payload, $uploads)
{
    $clean = [];
    $errors = [];
    // First pass: copy raw scalar values so cross-section conditions can be evaluated.
    $raw = [];
    foreach ($schema['steps'] as $step) {
        foreach ($step['sections'] as $sec) {
            $sid = $sec['id'];
            $in = isset($payload[$sid]) && is_array($payload[$sid]) ? $payload[$sid] : [];
            $norm = function ($item) use ($sec) {
                $out = [];
                foreach ($sec['fields'] as $f) {
                    if (!is_array($item) || !array_key_exists($f['id'], $item)) continue;
                    $v = $item[$f['id']];
                    if ($f['type'] === 'checkbox') $v = ($v === true || $v === 'true');
                    elseif ($f['type'] === 'file') $v = is_array($v) ? $v : null;
                    elseif (is_scalar($v)) $v = mb_substr(trim((string)$v), 0, 5000);
                    else $v = null;
                    if (!empty($f['transform']) && $f['transform'] === 'uppercase' && is_string($v)) $v = mb_strtoupper($v);
                    $out[$f['id']] = $v;
                }
                return $out;
            };
            if (!empty($sec['repeatable'])) {
                $items = hr_is_list($in) ? array_slice($in, 0, max(1, (int)(isset($sec['maxItems']) ? $sec['maxItems'] : 50))) : [];
                $raw[$sid] = array_map($norm, $items);
            } else {
                $raw[$sid] = $norm(hr_is_list($in) ? [] : $in);
            }
        }
    }

    foreach ($schema['steps'] as $step) {
        if (!hr_step_visible($step, $raw)) continue;
        foreach ($step['sections'] as $sec) {
            if (!hr_section_visible($sec, $raw)) continue;
            $sid = $sec['id'];
            $process = function ($item, $index) use ($sec, $sid, $raw, $uploads, $step, &$errors) {
                $out = [];
                foreach ($sec['fields'] as $f) {
                    if (!hr_field_visible($f, $sid, $item, $raw)) continue;
                    $v = isset($item[$f['id']]) ? $item[$f['id']] : null;
                    if ($f['type'] === 'file') {
                        $key = $sid . '.' . ($index === null ? '_' : $index) . '.' . $f['id'];
                        $v = !empty($uploads[$key]) ? $key : null;
                    }
                    $err = hr_validate_value($f, $v, hr_is_required($f, $raw));
                    if ($err) {
                        $where = $step['title'] . ' › ' . $sec['title'] . ($index !== null ? ' #' . ($index + 1) : '') . ' › ' . $f['label'];
                        $errors[] = $where . ': ' . $err;
                    }
                    if (!hr_is_empty($v)) $out[$f['id']] = $v;
                }
                return $out;
            };
            if (!empty($sec['repeatable'])) {
                $items = isset($raw[$sid]) && is_array($raw[$sid]) ? $raw[$sid] : [];
                if (!empty($sec['minItems']) && count($items) < (int)$sec['minItems']) {
                    $errors[] = $step['title'] . ' › ' . $sec['title'] . ': add at least ' . (int)$sec['minItems'];
                }
                $clean[$sid] = [];
                foreach (array_values($items) as $i => $it) $clean[$sid][] = $process($it, $i);
            } else {
                $clean[$sid] = $process(isset($raw[$sid]) ? $raw[$sid] : [], null);
            }
        }
    }
    return [$clean, $errors];
}

// ---------------------------------------------------------------- applications

function hr_next_id($prefix)
{
    $prefix = preg_replace('/[^A-Z0-9-]/', '', strtoupper($prefix ?: 'RVSU-REC'));
    $path = hr_data_dir() . '/counter.json';
    $fh = fopen($path, 'c+');
    if (!$fh) hr_fail('Storage unavailable', 500);
    flock($fh, LOCK_EX);
    $raw = stream_get_contents($fh);
    $state = json_decode($raw ?: '{}', true) ?: [];
    $year = date('Y');
    $n = (isset($state['year']) && $state['year'] === $year) ? ((int)$state['n'] + 1) : 1;
    $state = ['year' => $year, 'n' => $n];
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($state));
    fflush($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
    return $prefix . '-' . $year . '-' . str_pad((string)$n, 4, '0', STR_PAD_LEFT);
}

function hr_app_id_valid($id)
{
    return is_string($id) && preg_match('/^[A-Z0-9][A-Z0-9-]{2,60}$/', $id);
}

function hr_app_path($id)
{
    return hr_data_dir() . '/applications/' . $id . '.json';
}

function hr_load_app($id)
{
    if (!hr_app_id_valid($id)) return null;
    return hr_read_json(hr_app_path($id));
}

function hr_save_app($app)
{
    return hr_write_json(hr_app_path($app['id']), $app);
}

function hr_summary_from($id, $submittedAt, $data, $schema = null)
{
    $p = hr_section_data($data, 'position') ?: [];
    $pe = hr_section_data($data, 'personal') ?: [];
    $ex = hr_section_data($data, 'extras') ?: [];
    $g = function ($a, $k) {
        return isset($a[$k]) && is_scalar($a[$k]) ? (string)$a[$k] : '';
    };
    $desig = $g($p, 'designation');
    if ($desig === 'Other' && $g($p, 'designationOther') !== '') $desig = $g($p, 'designationOther');
    $dept = $g($p, 'department');
    $hasResume = !empty($ex['resume']);

    // Admins may add their own fields (e.g. a Teaching-only "Department" and "Cadre").
    // Fall back to them by label so lists, email subjects and PDFs are never blank.
    if ($schema && is_array($schema)) {
        foreach ($schema['steps'] as $step) {
            foreach ($step['sections'] as $sec) {
                foreach ($sec['fields'] as $f) {
                    $label = isset($f['label']) ? $f['label'] : '';
                    if ($sec['id'] === 'position' && !in_array($f['id'], ['postType', 'department', 'designation', 'designationOther'], true)) {
                        $val = $g($p, $f['id']);
                        if ($val === '') continue;
                        if ($dept === '' && preg_match('/department|unit|centre|center|school/i', $label)) $dept = $val;
                        elseif ($desig === '' && preg_match('/designation|cadre|position|post\b|role/i', $label)) $desig = $val;
                    }
                    if (!$hasResume && $f['type'] === 'file' && preg_match('/resume|\bcv\b|curriculum/i', $label)) {
                        $sd = hr_section_data($data, $sec['id']);
                        if ($sd && !empty($sd[$f['id']])) $hasResume = true;
                    }
                }
            }
        }
    }
    return [
        'id' => $id,
        'submittedAt' => $submittedAt,
        'status' => 'New',
        'name' => trim(($g($pe, 'salutation') ? $g($pe, 'salutation') . '. ' : '') . $g($pe, 'firstName') . ' ' . $g($pe, 'lastName')),
        'email' => $g($pe, 'email'),
        'mobile' => $g($pe, 'mobile'),
        'postType' => $g($p, 'postType'),
        'jobNature' => $g($p, 'jobNature'),
        'department' => $dept,
        'designation' => $desig,
        'hasResume' => $hasResume,
    ];
}

function hr_summary($app)
{
    $keys = ['id', 'submittedAt', 'status', 'name', 'email', 'mobile', 'postType', 'jobNature', 'department', 'designation', 'hasResume'];
    $out = [];
    foreach ($keys as $k) $out[$k] = isset($app[$k]) ? $app[$k] : null;
    return $out;
}

function hr_all_apps()
{
    $apps = [];
    foreach (glob(hr_data_dir() . '/applications/*.json') ?: [] as $file) {
        $a = hr_read_json($file);
        if ($a && isset($a['id'])) $apps[] = $a;
    }
    usort($apps, function ($a, $b) {
        return strcmp($b['submittedAt'], $a['submittedAt']);
    });
    return $apps;
}

function hr_rate_limited($max = 6, $window = 3600)
{
    $file = hr_data_dir() . '/ratelimit/' . sha1(hr_client_ip() . '|rvsu') . '.json';
    $now = time();
    $hits = array_values(array_filter(hr_read_json($file, []), function ($t) use ($now, $window) {
        return is_int($t) && $t > $now - $window;
    }));
    if (count($hits) >= $max) return true;
    $hits[] = $now;
    hr_write_json($file, $hits);
    return false;
}

// ---------------------------------------------------------------- display

function hr_format_date($s)
{
    if (preg_match('/^(\d{4})-(\d{2})-(\d{2})/', $s, $m)) {
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return $m[3] . '-' . $months[(int)$m[2] - 1] . '-' . $m[1];
    }
    return $s;
}

function hr_display($f, $v)
{
    if (hr_is_empty($v)) return '';
    if ($f['type'] === 'checkbox') return $v === true ? 'Yes' : 'No';
    if ($f['type'] === 'file') return is_array($v) && isset($v['name']) ? $v['name'] : 'Attached';
    $s = is_scalar($v) ? (string)$v : '';
    if ($f['type'] === 'date') return hr_format_date($s);
    if ($f['type'] === 'number' && preg_match('/inr|salary|amount/i', $f['label']) && is_numeric($s)) {
        return hr_inr((float)$s);
    }
    return $s;
}

function hr_inr($n)
{
    $neg = $n < 0;
    $n = abs($n);
    $int = (string)floor($n);
    $dec = $n - floor($n) > 0 ? substr(number_format($n - floor($n), 2), 1) : '';
    if (strlen($int) > 3) {
        $last3 = substr($int, -3);
        $rest = substr($int, 0, -3);
        $rest = preg_replace('/\B(?=(\d{2})+(?!\d))/', ',', $rest);
        $int = $rest . ',' . $last3;
    }
    return ($neg ? '-' : '') . $int . $dec;
}

/** Same structure as engine.ts summarize(): only visible, non-empty content. */
function hr_summarize($schema, $values)
{
    $out = [];
    foreach ($schema['steps'] as $step) {
        if (!hr_step_visible($step, $values)) continue;
        $secs = [];
        foreach ($step['sections'] as $sec) {
            if (!hr_section_visible($sec, $values)) continue;
            $sid = $sec['id'];
            $rowsFor = function ($item) use ($sec, $sid, $values) {
                $rows = [];
                foreach ($sec['fields'] as $f) {
                    if (!hr_field_visible($f, $sid, $item, $values)) continue;
                    $val = hr_display($f, isset($item[$f['id']]) ? $item[$f['id']] : null);
                    if ($val !== '') $rows[] = ['label' => $f['label'], 'value' => $val, 'type' => $f['type']];
                }
                return $rows;
            };
            if (!empty($sec['repeatable'])) {
                $items = [];
                foreach ((isset($values[$sid]) && is_array($values[$sid]) ? $values[$sid] : []) as $it) {
                    $r = $rowsFor($it);
                    if ($r) $items[] = $r;
                }
                if ($items) $secs[] = ['title' => $sec['title'], 'repeatable' => true, 'itemLabel' => isset($sec['itemLabel']) ? $sec['itemLabel'] : 'Item', 'items' => $items];
            } else {
                $rows = $rowsFor(hr_section_data($values, $sid) ?: []);
                if ($rows) $secs[] = ['title' => $sec['title'], 'repeatable' => false, 'rows' => $rows];
            }
        }
        if ($secs) $out[] = ['title' => $step['title'], 'sections' => $secs];
    }
    return $out;
}

// ---------------------------------------------------------------- email

function hr_e($s)
{
    return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
}

function hr_email_rows($rows)
{
    $h = '';
    $last = count($rows) - 1;
    foreach ($rows as $i => $r) {
        $val = $r['type'] === 'textarea' ? nl2br(hr_e($r['value'])) : hr_e($r['value']);
        $line = $i === $last ? 'border-bottom:0' : 'border-bottom:1px solid #F1E8DC';
        $h .= '<tr>'
            . '<td class="lbl" width="38%" style="padding:9px 12px;' . $line . ';width:38%;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.45;color:#867362;word-break:break-word;">' . hr_e($r['label']) . '</td>'
            . '<td class="val" style="padding:9px 12px;' . $line . ';vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.45;font-weight:bold;color:#1D1611;word-break:break-word;overflow-wrap:anywhere;">' . $val . '</td>'
            . '</tr>';
    }
    return $h;
}

function hr_email_details($summary)
{
    $h = '';
    $n = 0;
    foreach ($summary as $step) {
        $n++;
        $h .= '<tr><td style="padding:26px 32px 6px;">'
            . '<div style="font:700 17px/1.3 Georgia,\'Times New Roman\',serif;color:#1D1611;">' . $n . '. ' . hr_e($step['title']) . '</div>'
            . '<div style="width:44px;height:3px;background:#C6832B;border-radius:2px;margin-top:7px;"></div>'
            . '</td></tr>';
        foreach ($step['sections'] as $sec) {
            $h .= '<tr><td style="padding:12px 32px 4px;">'
                . '<div style="font:700 11px/1 Arial,Helvetica,sans-serif;letter-spacing:1.6px;text-transform:uppercase;color:#B57321;margin-bottom:8px;">' . hr_e($sec['title']) . '</div>';
            if ($sec['repeatable']) {
                foreach ($sec['items'] as $i => $rows) {
                    $h .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #EDE3D6;border-radius:10px;border-collapse:separate;margin-bottom:10px;background:#FFFFFF;">'
                        . '<tr><td colspan="2" style="padding:8px 12px;background:#FBF5EB;border-bottom:1px solid #EDE3D6;border-radius:10px 10px 0 0;font:700 12px/1 Arial,Helvetica,sans-serif;color:#9C6019;">' . hr_e($sec['itemLabel']) . ' ' . ($i + 1) . '</td></tr>'
                        . hr_email_rows($rows) . '</table>';
                }
            } else {
                $h .= '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #EDE3D6;border-radius:10px;border-collapse:separate;background:#FFFFFF;">'
                    . hr_email_rows($sec['rows']) . '</table>';
            }
            $h .= '</td></tr>';
        }
    }
    return $h;
}

function hr_email_layout($preheader, $bandTitle, $bandSub, $bodyRows)
{
    $logo = HR_PUBLIC_SITE . '/images/rvsu-logo-200.png';
    $year = date('Y');
    $html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        . '<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">'
        . '<title>' . hr_e($bandTitle) . '</title>'
        . '<style>'
        . 'table{border-spacing:0}td{word-break:break-word}'
        . '@media only screen and (max-width:620px){'
        . '.wrap{padding:12px 6px!important}'
        . '.px{padding-left:16px!important;padding-right:16px!important}'
        . '.band{padding-left:10px!important;padding-right:10px!important}'
        . '.lbl{width:40%!important;font-size:12px!important;padding:8px 8px!important}'
        . '.val{font-size:13px!important;padding:8px 8px!important}'
        . '.logo{width:44px!important;height:44px!important}'
        . '.uni{font-size:18px!important}'
        . '}'
        . '</style></head>'
        . '<body style="margin:0;padding:0;background:#F5ECE0;">'
        . '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' . hr_e($preheader) . '</div>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#F5ECE0" style="background:#F5ECE0;"><tr><td class="wrap" align="center" style="padding:28px 12px;">'
        . '<table role="presentation" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" style="width:100%;max-width:640px;table-layout:fixed;background:#FFFFFF;border-radius:16px;overflow:hidden;">'
        // gold top bar
        . '<tr><td style="height:5px;background:#C6832B;font-size:0;line-height:0;">&nbsp;</td></tr>'
        // letterhead
        . '<tr><td style="padding:22px 32px 18px;">'
        . '<table role="presentation" cellpadding="0" cellspacing="0"><tr>'
        . '<td width="58" style="width:58px;padding-right:14px;vertical-align:middle;"><img class="logo" src="' . $logo . '" width="58" height="58" alt="RVSU" style="display:block;width:58px;height:58px;border-radius:50%;background:#1D1611;color:#F0D19E;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;text-align:center;line-height:58px;"></td>'
        . '<td style="vertical-align:middle;">'
        . '<div class="uni" style="font:700 22px/1.1 Georgia,\'Times New Roman\',serif;color:#1D1611;letter-spacing:.5px;">RVS UNIVERSITY</div>'
        . '<div style="font:italic 12.5px/1.4 Georgia,serif;color:#9C6019;margin-top:3px;">Where Knowledge Meets Possibility</div>'
        . '<div style="font:11.5px/1.4 Arial,Helvetica,sans-serif;color:#9C8B79;margin-top:2px;">R.V.S Nagar, Tirupathi Road, Chittoor, Andhra Pradesh &ndash; 517127</div>'
        . '</td></tr></table></td></tr>'
        // title band
        . '<tr><td class="band" style="padding:0 20px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#1D1611" style="background:#1D1611;border-radius:12px;">'
        . '<tr><td style="padding:20px 22px;">'
        . '<div style="font:700 11px/1 Arial,Helvetica,sans-serif;letter-spacing:2px;text-transform:uppercase;color:#E4B56C;">Careers &middot; Recruitment</div>'
        . '<div style="font:700 22px/1.3 Georgia,\'Times New Roman\',serif;color:#FFFFFF;margin-top:8px;">' . hr_e($bandTitle) . '</div>'
        . '<div style="font:13.5px/1.5 Arial,Helvetica,sans-serif;color:#D2C3B4;margin-top:4px;">' . $bandSub . '</div>'
        . '</td></tr></table></td></tr>'
        . $bodyRows
        // footer
        . '<tr><td style="padding:28px 32px 26px;"><div style="border-top:1px solid #EDE3D6;padding-top:16px;font:12px/1.6 Arial,Helvetica,sans-serif;color:#9C8B79;">'
        . 'RVS University &middot; R.V.S Nagar, Tirupathi Road, Chittoor, Andhra Pradesh &ndash; 517127<br>'
        . '<a href="mailto:info@rvsu.org" style="color:#9C6019;text-decoration:none;">info@rvsu.org</a> &middot; +91 96696 60155 &middot; '
        . '<a href="' . HR_PUBLIC_SITE . '" style="color:#9C6019;text-decoration:none;">rvsu.ac.in</a><br>'
        . '&copy; ' . $year . ' RVS University. This message was generated by the RVS University careers portal.'
        . '</div></td></tr>'
        . '</table></td></tr></table></body></html>';
    // Side padding cells get a class so the mobile media query can shrink them.
    return preg_replace('/<td style="(padding:[^";]*32px)/', '<td class="px" style="$1', $html);
}

function hr_email_team($app, $schema)
{
    $summary = hr_summarize($schema, $app['data']);
    $facts = [
        ['label' => 'Application ID', 'value' => $app['id'], 'type' => 'text'],
        ['label' => 'Applicant', 'value' => $app['name'], 'type' => 'text'],
        ['label' => 'Post', 'value' => trim($app['postType'] . ' · ' . $app['jobNature'], ' ·'), 'type' => 'text'],
        ['label' => 'Department', 'value' => $app['department'], 'type' => 'text'],
        ['label' => 'Designation', 'value' => $app['designation'], 'type' => 'text'],
        ['label' => 'Mobile', 'value' => $app['mobile'], 'type' => 'text'],
        ['label' => 'Email', 'value' => $app['email'], 'type' => 'text'],
        ['label' => 'Submitted', 'value' => date('d-M-Y, h:i A', strtotime($app['submittedAt'])), 'type' => 'text'],
    ];
    $body = '<tr><td style="padding:24px 32px 4px;font:14px/1.6 Arial,Helvetica,sans-serif;color:#4D3D30;">'
        . 'A new application has been submitted through the RVS University careers portal. Key details are below, followed by the complete application. A formatted PDF of the application is attached.'
        . (!empty($app['attachmentsNote']) ? '<br><span style="color:#9C6019;">' . hr_e($app['attachmentsNote']) . '</span>' : '')
        . '</td></tr>'
        . '<tr><td style="padding:12px 32px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #F0D19E;border-radius:10px;border-collapse:separate;background:#FFFBF4;">'
        . hr_email_rows($facts) . '</table></td></tr>'
        . hr_email_details($summary);
    $sub = 'Application ID <b style="color:#F0D19E;">' . hr_e($app['id']) . '</b> &middot; ' . hr_e($app['designation']) . ($app['department'] ? ', ' . hr_e($app['department']) : '');
    return hr_email_layout('New application from ' . $app['name'] . ' for ' . $app['designation'], 'New Application Received', $sub, $body);
}

function hr_email_applicant($app, $schema)
{
    $summary = hr_summarize($schema, $app['data']);
    $pe = hr_section_data($app['data'], 'personal') ?: [];
    $greet = trim((isset($pe['salutation']) ? $pe['salutation'] . '. ' : '') . (isset($pe['firstName']) ? $pe['firstName'] : '') . ' ' . (isset($pe['lastName']) ? $pe['lastName'] : ''));
    $msg = isset($schema['settings']['applicantEmailMessage']) ? $schema['settings']['applicantEmailMessage'] : '';
    $body = '<tr><td style="padding:24px 32px 4px;font:14.5px/1.65 Arial,Helvetica,sans-serif;color:#4D3D30;">'
        . 'Dear ' . hr_e($greet ?: 'Applicant') . ',<br><br>' . nl2br(hr_e($msg))
        . '</td></tr>'
        . '<tr><td style="padding:16px 32px 4px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px dashed #E4B56C;border-radius:12px;background:#FFFBF4;"><tr><td align="center" style="padding:16px;">'
        . '<div style="font:700 10.5px/1 Arial,Helvetica,sans-serif;letter-spacing:2px;text-transform:uppercase;color:#9C8B79;">Your Application ID</div>'
        . '<div style="font:700 24px/1.3 \'Courier New\',monospace;color:#B57321;margin-top:6px;letter-spacing:1px;">' . hr_e($app['id']) . '</div>'
        . '<div style="font:12px/1.4 Arial,Helvetica,sans-serif;color:#9C8B79;margin-top:4px;">Please quote this ID in any communication with us.</div>'
        . '</td></tr></table></td></tr>'
        . '<tr><td style="padding:18px 32px 0;font:13.5px/1.6 Arial,Helvetica,sans-serif;color:#867362;">For your records, a PDF copy of your application is attached to this email, and your details are listed below:</td></tr>'
        . hr_email_details($summary)
        . '<tr><td style="padding:22px 32px 0;font:14px/1.65 Arial,Helvetica,sans-serif;color:#4D3D30;">Warm regards,<br><b>Recruitment Team</b><br>RVS University</td></tr>';
    $sub = 'Thank you for applying for <b style="color:#F0D19E;">' . hr_e($app['designation']) . '</b>' . ($app['department'] ? ' &middot; ' . hr_e($app['department']) : '');
    return hr_email_layout('We have received your application ' . $app['id'], 'Application Received', $sub, $body);
}

function hr_mail_mode()
{
    $env = getenv('RVSU_MAIL_MODE');
    if ($env) return strtolower($env);
    $f = hr_data_dir() . '/mail-mode.txt';
    return is_file($f) ? strtolower(trim((string)file_get_contents($f))) : 'smtp';
}

/**
 * Send one email. In "log" mode the message is written to <data>/outbox instead (local testing).
 * Returns [ok(bool), error(string|null)].
 */
function hr_send_mail($to, $subject, $html, $replyTo, $attachments, $fromName)
{
    $to = array_values(array_filter(array_map('trim', (array)$to), function ($e) {
        return filter_var($e, FILTER_VALIDATE_EMAIL);
    }));
    if (!$to) return [false, 'No valid recipient'];
    if (hr_mail_mode() === 'log') {
        $base = hr_data_dir() . '/outbox/' . date('Ymd-His') . '-' . bin2hex(random_bytes(3));
        @file_put_contents($base . '.html', $html);
        foreach ($attachments as $i => $a) @file_put_contents($base . '-att' . $i . '-' . preg_replace('/[^\w.\-]/', '_', $a['filename']), base64_decode($a['data']));
        hr_write_json($base . '.json', [
            'to' => $to, 'subject' => $subject, 'replyTo' => $replyTo, 'fromName' => $fromName,
            'attachments' => array_map(function ($a) {
                return ['filename' => $a['filename'], 'type' => $a['type'], 'bytes' => (int)(strlen($a['data']) * 3 / 4)];
            }, $attachments),
        ]);
        return [true, null];
    }
    $mailerFile = __DIR__ . '/../api/smtp-mailer.php';
    if (!is_file($mailerFile)) return [false, 'Mailer not found'];
    require_once $mailerFile;
    $mailer = new RvsuSmtpMailer(null, null, $fromName ?: 'RVS University Recruitment');
    $ok = $mailer->send($to, $subject, $html, $replyTo ?: null, $attachments);
    return [(bool)$ok, $ok ? null : $mailer->getLastError()];
}

/** The designed application PDF as a mail attachment (null if it cannot be built). */
function hr_application_pdf_attachment($app, $schema)
{
    try {
        require_once __DIR__ . '/_pdf.php';
        return ['filename' => hr_pdf_filename($app), 'type' => 'application/pdf', 'data' => base64_encode(hr_build_application_pdf($app, $schema))];
    } catch (Throwable $e) {
        @file_put_contents(hr_data_dir() . '/pdf-errors.log', '[' . date('c') . '] ' . $app['id'] . ': ' . $e->getMessage() . "\n", FILE_APPEND);
        return null;
    }
}

/** Uploaded documents (resume, certificates…). Images are skipped: the photo is inside the PDF. */
function hr_app_attachments($app, $limitBytes)
{
    $out = [];
    $total = 0;
    $skipped = 0;
    foreach (hr_app_files($app) as $f) {
        if (stripos((string)$f['type'], 'image/') === 0 || preg_match('/\.(jpe?g|png|webp)$/i', $f['stored'])) continue;
        $path = hr_data_dir() . '/uploads/' . $app['id'] . '/' . $f['stored'];
        $size = is_file($path) ? filesize($path) : 0;
        if (!$size) continue;
        if ($total + $size > $limitBytes) {
            $skipped++;
            continue;
        }
        $total += $size;
        $out[] = ['filename' => $f['name'], 'type' => $f['type'] ?: 'application/octet-stream', 'data' => base64_encode((string)file_get_contents($path))];
    }
    return [$out, $skipped];
}

/** All uploaded files referenced by an application's data. */
function hr_app_files($app)
{
    $files = [];
    $walk = function ($item) use (&$files) {
        foreach ((array)$item as $v) {
            if (is_array($v) && isset($v['stored'], $v['name'])) $files[] = $v;
        }
    };
    foreach ((array)$app['data'] as $sec) {
        if (hr_is_list($sec)) {
            foreach ($sec as $it) $walk($it);
        } else {
            $walk($sec);
        }
    }
    return $files;
}

function hr_send_app_emails($app, $schema, $target = 'both')
{
    $settings = $schema['settings'];
    $fromName = isset($settings['senderName']) ? $settings['senderName'] : 'RVS University Recruitment';
    $log = isset($app['emailLog']) && is_array($app['emailLog']) ? $app['emailLog'] : [];
    $team = isset($settings['notifyEmails']) && is_array($settings['notifyEmails']) ? $settings['notifyEmails'] : [];
    $pdfAtt = hr_application_pdf_attachment($app, $schema);

    if (($target === 'both' || $target === 'team')) {
        if ($team) {
            $att = $pdfAtt ? [$pdfAtt] : [];
            $app['attachmentsNote'] = '';
            if (!empty($settings['attachFilesToEmail'])) {
                list($docs, $skipped) = hr_app_attachments($app, 15 * 1024 * 1024);
                $att = array_merge($att, $docs);
                if ($skipped) $app['attachmentsNote'] = $skipped . ' file(s) were too large to attach — download them from the admin console.';
            }
            $subject = 'New Application: ' . $app['name'] . ' — ' . $app['designation'] . ($app['department'] ? ', ' . $app['department'] : '') . ' [' . $app['id'] . ']';
            list($ok, $err) = hr_send_mail($team, $subject, hr_email_team($app, $schema), $app['email'], $att, $fromName);
            if (!$ok && count($att) > 1) {
                // Retry with just the application PDF so the team still gets the details
                list($ok, $err2) = hr_send_mail($team, $subject, hr_email_team($app, $schema), $app['email'], $pdfAtt ? [$pdfAtt] : [], $fromName);
                if ($ok) $err = 'Sent without uploaded documents (' . $err . ')';
            }
            $log[] = ['to' => implode(', ', $team), 'kind' => 'team', 'ok' => $ok, 'at' => hr_now(), 'error' => $err];
        } else {
            $log[] = ['to' => '', 'kind' => 'team', 'ok' => false, 'at' => hr_now(), 'error' => 'No notification emails configured'];
        }
    }
    if (($target === 'both' || $target === 'applicant') && !empty($settings['sendApplicantCopy']) && $app['email']) {
        $subject = 'Application received — RVS University [' . $app['id'] . ']';
        $replyTo = !empty($settings['replyTo']) ? $settings['replyTo'] : ($team ? $team[0] : null);
        list($ok, $err) = hr_send_mail([$app['email']], $subject, hr_email_applicant($app, $schema), $replyTo, $pdfAtt ? [$pdfAtt] : [], $fromName);
        $log[] = ['to' => $app['email'], 'kind' => 'applicant', 'ok' => $ok, 'at' => hr_now(), 'error' => $err];
    }
    unset($app['attachmentsNote']);
    $app['emailLog'] = array_slice($log, -30);
    return $app;
}

// ---------------------------------------------------------------- admin auth

function hr_require_admin()
{
    $hashFile = hr_data_dir() . '/admin-key.sha256';
    if (!is_file($hashFile)) hr_fail('Admin access is not configured on this server', 503);
    $expected = trim((string)file_get_contents($hashFile));
    $given = isset($_SERVER['HTTP_X_ADMIN_KEY']) ? (string)$_SERVER['HTTP_X_ADMIN_KEY'] : '';
    if ($given === '' || strlen($given) < 32 || !hash_equals($expected, hash('sha256', $given))) {
        usleep(400000);
        hr_fail('Access denied', 403);
    }
}

function hr_respond_early($payload)
{
    ignore_user_abort(true);
    @set_time_limit(180);
    $body = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if (function_exists('fastcgi_finish_request')) {
        hr_json($payload);
        fastcgi_finish_request();
        return;
    }
    while (ob_get_level() > 0) @ob_end_clean();
    ob_start();
    http_response_code(200);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo $body;
    header('Content-Length: ' . ob_get_length());
    header('Connection: close');
    ob_end_flush();
    @ob_flush();
    flush();
}
