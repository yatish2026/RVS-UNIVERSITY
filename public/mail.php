<?php
/**
 * RVS University — Admissions Enquiry 2026–27 Mail Gateway
 * Authenticates directly with mail.rvsu.org:465 (SSL)
 * Primary Authenticated Account: yatish.itops@rvsu.org (Password: Yatish@2026)
 * Secondary / Failover Account: info@rvsu.ac.in (Password: rvsu@@2026)
 * 
 * Delivers copies to:
 * 1. yatish.itops@rvsu.org
 * 2. info@rvsu.ac.in
 * 3. yatishgottapu2026@gmail.com
 */

// Set CORS & Security Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle Preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false, 
        "message" => "Method not allowed. Only POST is accepted."
    ]);
    exit();
}

// Include SMTP Mailer engine
if (file_exists(__DIR__ . '/api/smtp-mailer.php')) {
    require_once __DIR__ . '/api/smtp-mailer.php';
} else if (file_exists(__DIR__ . '/smtp-mailer.php')) {
    require_once __DIR__ . '/smtp-mailer.php';
}

// Read raw JSON or POST data
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    $data = $_POST;
}

// Sanitize & Validate Inputs
$leadId   = isset($data['leadRefId']) ? trim(htmlspecialchars($data['leadRefId'])) : ('RVSU-ADM-' . date('Y') . '-' . rand(1000, 9999));
$fullName = isset($data['fullName']) ? trim(htmlspecialchars($data['fullName'])) : (isset($data['name']) ? trim(htmlspecialchars($data['name'])) : '');
$phone    = isset($data['phone']) ? trim(htmlspecialchars($data['phone'])) : (isset($data['mobile']) ? trim(htmlspecialchars($data['mobile'])) : '');
$email    = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$school   = isset($data['school']) ? trim(htmlspecialchars($data['school'])) : 'General Enquiry';
$course   = isset($data['course']) ? trim(htmlspecialchars($data['course'])) : (isset($data['program']) ? trim(htmlspecialchars($data['program'])) : 'Undergraduate / Postgraduate');
$quota    = isset($data['quota']) ? trim(htmlspecialchars($data['quota'])) : (isset($data['category']) ? trim(htmlspecialchars($data['category'])) : 'Management Quota / Direct Admission');
$query    = isset($data['message']) ? trim(htmlspecialchars($data['message'])) : (isset($data['query']) ? trim(htmlspecialchars($data['query'])) : 'No additional message provided.');
$ipAddr   = $_SERVER['REMOTE_ADDR'] ?? 'Unknown IP';
$dateTime = date('d M Y, h:i:s A T');

// Basic validation
if (empty($fullName) || empty($phone)) {
    http_response_code(400);
    echo json_encode([
        "success" => false, 
        "message" => "Please provide both Full Name and Mobile Number."
    ]);
    exit();
}

// Clean phone for WhatsApp / tel
$cleanPhoneDigits = preg_replace('/\D/', '', $phone);
$waUrl = 'https://wa.me/91' . $cleanPhoneDigits . '?text=' . rawurlencode("Hello " . $fullName . ", thank you for your enquiry at RVS University regarding " . $course . ". We are reaching out from the Admissions Directorate.");

// Target recipients (Both yatish.itops@rvsu.org and info@rvsu.ac.in receive full copies)
$counselorRecipients = "yatish.itops@rvsu.org, info@rvsu.ac.in, yatishgottapu2026@gmail.com";
$emailSubject = "🎓 [New Admission Enquiry 2026–27] " . $fullName . " — " . $course;

// HTML Body for Admissions Directorate
$counselorHtml = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Admission Enquiry</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #FAF6F0; margin: 0; padding: 24px; color: #1D1611; }
        .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #D4BC9F; }
        .header { background: linear-gradient(135deg, #0A192F 0%, #1e3a5f 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #C6832B; color: #ffffff; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px; color: #ffffff; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #F5D5A5; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 28px 24px; }
        .badge { display: inline-block; background: #FEF3C7; color: #92400E; font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; border: 1px solid #FDE68A; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { text-align: left; padding: 11px 14px; background: #FAF6F0; color: #7A695A; font-size: 12px; font-weight: 700; text-transform: uppercase; border-bottom: 1px solid #EFE2D2; width: 34%; }
        td { padding: 11px 14px; color: #1D1611; font-size: 13px; font-weight: 500; border-bottom: 1px solid #EFE2D2; }
        .highlight { font-weight: 700; color: #0A192F; font-size: 14px; }
        .query-box { margin-top: 18px; background: #FAF3E7; border-left: 4px solid #C6832B; padding: 14px 16px; border-radius: 0 8px 8px 0; font-size: 13px; line-height: 1.6; color: #334155; }
        .btn-group { margin-top: 24px; text-align: center; }
        .btn { display: inline-block; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 12px; text-decoration: none; margin: 4px; }
        .btn-call { background: #0A192F; color: #D4AF37; border: 1px solid #D4AF37; }
        .btn-wa { background: #25D366; color: #ffffff; border: 1px solid #1EBE5D; }
        .btn-mail { background: #B57321; color: #ffffff; border: 1px solid #9C6019; }
        .footer { background: #FAF6F0; padding: 18px; text-align: center; font-size: 11px; color: #7A695A; border-top: 1px solid #EFE2D2; }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1>RVS UNIVERSITY</h1>
            <p>Admissions Directorate Notification (2026–27)</p>
        </div>
        <div class="content">
            <span class="badge">⚡ Instant Admission Lead</span>
            <h2 style="font-size: 17px; margin: 0 0 12px; color: #0A192F;">Lead ID: <span style="color:#C6832B;">' . $leadId . '</span></h2>
            
            <table>
                <tr>
                    <th>Student Name</th>
                    <td class="highlight">' . $fullName . '</td>
                </tr>
                <tr>
                    <th>Mobile Number</th>
                    <td><a href="tel:' . $phone . '" style="color:#9C6019; font-weight:bold; text-decoration:none;">' . $phone . '</a></td>
                </tr>
                <tr>
                    <th>Email Address</th>
                    <td>' . (!empty($email) ? '<a href="mailto:' . $email . '" style="color:#0284c7;">' . $email . '</a>' : '<em style="color:#94a3b8;">Not Provided</em>') . '</td>
                </tr>
                <tr>
                    <th>School / Faculty</th>
                    <td>' . $school . '</td>
                </tr>
                <tr>
                    <th>Course / Degree</th>
                    <td style="color:#b45309; font-weight:700;">' . $course . '</td>
                </tr>
                <tr>
                    <th>Admission Quota</th>
                    <td>' . $quota . '</td>
                </tr>
                <tr>
                    <th>Submitted At</th>
                    <td>' . $dateTime . '</td>
                </tr>
                <tr>
                    <th>Applicant IP</th>
                    <td><code>' . $ipAddr . '</code></td>
                </tr>
            </table>

            <div style="margin-top: 18px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #7A695A;">Student Message / Query:</div>
                <div class="query-box">
                    ' . nl2br($query) . '
                </div>
            </div>

            <div class="btn-group">
                <a href="tel:' . $phone . '" class="btn btn-call">📞 Call Student (' . $phone . ')</a>
                <a href="' . $waUrl . '" target="_blank" class="btn btn-wa">💬 WhatsApp Student</a>
                ' . (!empty($email) ? '<a href="mailto:' . $email . '" class="btn btn-mail">✉️ Reply via Email</a>' : '') . '
            </div>
        </div>
        <div class="footer">
            Delivered to Admissions Directorate: yatish.itops@rvsu.org & info@rvsu.ac.in<br>
            RVS University • R.V.S. Nagar, Tirupathi Road, Chittoor, Andhra Pradesh - 517127.
        </div>
    </div>
</body>
</html>
';

// Send email using Authenticated SMTP
$mailSent = false;
$mailerError = '';

if (class_exists('RvsuSmtpMailer')) {
    // 1. Try Primary Authenticated Account: yatish.itops@rvsu.org
    $mailer = new RvsuSmtpMailer('yatish.itops@rvsu.org', 'Yatish@2026', 'RVS University — Admissions Directorate');
    $mailSent = $mailer->send($counselorRecipients, $emailSubject, $counselorHtml, !empty($email) ? $email : null);

    // 2. Failover to Backup Authenticated Account if primary fails: info@rvsu.ac.in
    if (!$mailSent) {
        $mailerError = $mailer->getLastError();
        $fallbackMailer = new RvsuSmtpMailer('info@rvsu.ac.in', 'rvsu@@2026', 'RVS University — Admissions Directorate');
        $mailSent = $fallbackMailer->send($counselorRecipients, $emailSubject, $counselorHtml, !empty($email) ? $email : null);
        if (!$mailSent) {
            $mailerError .= " | Fallback info@rvsu.ac.in failed: " . $fallbackMailer->getLastError();
        }
    }
} else {
    // Fallback standard mail
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: RVS University Admissions <yatish.itops@rvsu.org>\r\n";
    $headers .= "Cc: info@rvsu.ac.in\r\n";
    if (!empty($email)) {
        $headers .= "Reply-To: " . $fullName . " <" . $email . ">\r\n";
    }
    $headers .= "X-Mailer: RVSU-Portal-Mailer/2.0\r\n";
    $mailSent = @mail($counselorRecipients, $emailSubject, $counselorHtml, $headers);
}

// 3. Send Automated Confirmation Receipt TO Student if student email is present
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $studentSubject = "✅ RVS University — Admission Enquiry Received (" . $leadId . ")";
    $studentHtml = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Admission Enquiry Received</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #FAF6F0; padding: 24px; color: #1D1611;">
        <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 14px; border: 1px solid #D4BC9F; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.06);">
            <div style="background: #0A192F; padding: 26px; text-align: center; border-bottom: 3px solid #C6832B;">
                <h2 style="margin: 0; color: #D4AF37; font-size: 22px;">RVS UNIVERSITY</h2>
                <p style="margin: 4px 0 0; color: #F5D5A5; font-size: 13px; text-transform: uppercase;">Admissions Directorate • Academic Session 2026–27</p>
            </div>
            <div style="padding: 26px;">
                <p style="font-size: 15px;">Dear <strong>' . $fullName . '</strong>,</p>
                <p style="font-size: 13px; line-height: 1.6; color: #5C4837;">
                    Thank you for your interest in RVS University! We have received your admission enquiry regarding <strong>' . $course . '</strong>.
                </p>
                <div style="background: #FAF3E7; border: 1px solid #D4BC9F; border-radius: 10px; padding: 16px; margin: 20px 0; text-align: center;">
                    <div style="font-size: 11px; font-weight: bold; color: #7A695A; text-transform: uppercase;">Your Application / Enquiry Reference ID</div>
                    <div style="font-size: 20px; font-weight: bold; color: #9C6019; font-family: monospace; margin-top: 4px;">' . $leadId . '</div>
                </div>
                <p style="font-size: 13px; line-height: 1.6; color: #5C4837;">
                    One of our dedicated admissions counselors will contact you shortly on <strong>' . $phone . '</strong> to guide you through seat eligibility, scholarships, and enrollment procedures.
                </p>
                <div style="margin-top: 22px; padding: 14px; background: #FAF6F0; border-radius: 8px; font-size: 12px; color: #5C4837;">
                    <strong>Admissions Helpline:</strong> +91 93908 84218 / 77299 99158 / 96696 60214<br>
                    <strong>Official Email:</strong> <a href="mailto:info@rvsu.ac.in" style="color:#9C6019;">info@rvsu.ac.in</a> | <a href="mailto:yatish.itops@rvsu.org" style="color:#9C6019;">yatish.itops@rvsu.org</a><br>
                    <strong>Campus Address:</strong> R.V.S. Nagar, Tirupathi Road, Chittoor, Andhra Pradesh - 517127.
                </div>
            </div>
            <div style="background: #FAF6F0; padding: 14px; text-align: center; font-size: 11px; color: #7A695A; border-top: 1px solid #EFE2D2;">
                © 2026 RVS University. Established under AP Private Universities Act.
            </div>
        </div>
    </body>
    </html>';

    if (isset($mailer)) {
        @$mailer->send($email, $studentSubject, $studentHtml, 'info@rvsu.ac.in');
    }
}

// 4. Store backup record in JSON lead log on server
$logEntry = [
    'leadId'    => $leadId,
    'timestamp' => time(),
    'dateTime'  => $dateTime,
    'name'      => $fullName,
    'phone'     => $phone,
    'email'     => $email,
    'school'    => $school,
    'course'    => $course,
    'quota'     => $quota,
    'query'     => $query,
    'ip'        => $ipAddr,
    'mailSent'  => $mailSent,
];

$logFile = __DIR__ . '/admissions_leads_log.json';
$currentLogs = [];
if (file_exists($logFile)) {
    $currentLogs = json_decode(@file_get_contents($logFile), true) ?: [];
}
$currentLogs[] = $logEntry;
@file_put_contents($logFile, json_encode($currentLogs, JSON_PRETTY_PRINT));

// Return response to React frontend
http_response_code(200);
echo json_encode([
    "success"   => true,
    "message"   => "Enquiry submitted successfully! Our admissions counselor will contact you shortly.",
    "leadId"    => $leadId,
    "mailSent"  => $mailSent,
    "error"     => $mailerError
]);
