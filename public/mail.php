<?php
/**
 * RVS University — Admissions Enquiry 2026–27 Mail Gateway
 * Handles instant email notifications for student leads submitted via GoDaddy hosting.
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

// Read raw JSON or POST data
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    $data = $_POST;
}

// Sanitize & Validate Inputs
$fullName = isset($data['fullName']) ? trim(htmlspecialchars($data['fullName'])) : (isset($data['name']) ? trim(htmlspecialchars($data['name'])) : '');
$phone    = isset($data['phone']) ? trim(htmlspecialchars($data['phone'])) : (isset($data['mobile']) ? trim(htmlspecialchars($data['mobile'])) : '');
$email    = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$school   = isset($data['school']) ? trim(htmlspecialchars($data['school'])) : 'General Enquiry';
$course   = isset($data['course']) ? trim(htmlspecialchars($data['course'])) : (isset($data['program']) ? trim(htmlspecialchars($data['program'])) : 'Undergraduate / Postgraduate');
$quota    = isset($data['quota']) ? trim(htmlspecialchars($data['quota'])) : (isset($data['category']) ? trim(htmlspecialchars($data['category'])) : 'General / Convenor');
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

// Target email address specified by user
$toEmail = "yatish.techie@dailsmart.in, yatish.techie@dialsmart.in";
$subject = "🎓 [New Admission Lead 2026–27] " . $fullName . " (" . $course . ")";

// Build HTML email body
$emailHtml = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Admission Enquiry</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #1e293b; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #0A192F 0%, #102444 100%); padding: 30px 24px; text-align: center; color: #ffffff; border-bottom: 3px solid #D4AF37; }
        .header h1 { margin: 0; font-size: 22px; color: #ffffff; font-weight: 800; letter-spacing: 0.5px; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #D4AF37; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 28px 24px; }
        .badge-bar { display: inline-block; background: #FEF3C7; color: #92400E; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; border: 1px solid #FDE68A; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { text-align: left; padding: 12px 14px; background: #f8fafc; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; width: 35%; }
        td { padding: 12px 14px; color: #0f172a; font-size: 14px; font-weight: 500; border-bottom: 1px solid #e2e8f0; }
        .highlight { color: #0f172a; font-weight: 700; font-size: 15px; }
        .query-box { margin-top: 20px; background: #f8fafc; border-left: 4px solid #D4AF37; padding: 16px; border-radius: 0 8px 8px 0; font-size: 13px; line-height: 1.6; color: #334155; }
        .cta-box { margin-top: 24px; text-align: center; }
        .cta-btn { display: inline-block; background: #0A192F; color: #D4AF37; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 13px; border: 1px solid #D4AF37; }
        .footer { background: #f8fafc; padding: 18px 24px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1>RVS UNIVERSITY</h1>
            <p>Admissions Lead Notification (2026–27)</p>
        </div>
        <div class="content">
            <span class="badge-bar">⚡ Instant Web Lead</span>
            <h2 style="font-size: 18px; margin: 0 0 16px 0; color: #0A192F;">New Student Enquiry Received</h2>
            
            <table>
                <tr>
                    <th>Student Name</th>
                    <td class="highlight">' . $fullName . '</td>
                </tr>
                <tr>
                    <th>Mobile Number</th>
                    <td><a href="tel:' . $phone . '" style="color: #0284c7; text-decoration: none; font-weight: 700;">' . $phone . '</a></td>
                </tr>
                <tr>
                    <th>Email Address</th>
                    <td>' . (!empty($email) ? '<a href="mailto:' . $email . '" style="color: #0284c7; text-decoration: none;">' . $email . '</a>' : '<em style="color:#94a3b8;">Not Provided</em>') . '</td>
                </tr>
                <tr>
                    <th>School / Domain</th>
                    <td>' . $school . '</td>
                </tr>
                <tr>
                    <th>Course / Degree</th>
                    <td style="color: #b45309; font-weight: 700;">' . $course . '</td>
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
                    <th>IP Address</th>
                    <td><code style="font-size: 11px; color: #64748b;">' . $ipAddr . '</code></td>
                </tr>
            </table>

            <div style="margin-top: 20px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b;">Student Message / Query:</div>
                <div class="query-box">
                    ' . nl2br($query) . '
                </div>
            </div>

            <div class="cta-box">
                <a href="tel:' . $phone . '" class="cta-btn">📞 Call Student (' . $phone . ')</a>
            </div>
        </div>
        <div class="footer">
            Automated lead notification from RVS University official portal.<br>
            R.V.S. Nagar, Tirupathi Road, Chittoor, Andhra Pradesh - 517127.
        </div>
    </div>
</body>
</html>
';

// Setup Email Headers for GoDaddy PHP Mail
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: RVS Admissions Lead <no-reply@rvsu.org>\r\n";
if (!empty($email)) {
    $headers .= "Reply-To: " . $fullName . " <" . $email . ">\r\n";
}
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Attempt to send email
$mailSent = @mail($toEmail, $subject, $emailHtml, $headers);

// Store backup record in a JSON lead log on server
$logEntry = [
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

// Return success response to React frontend
http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Enquiry submitted successfully! Our admissions counselor will contact you shortly.",
    "leadId"  => "RVSU-" . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8)),
    "mailSent" => $mailSent
]);
