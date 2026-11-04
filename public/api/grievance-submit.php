<?php
/**
 * RVS University — Grievance Appeal Submission Gateway
 * Handles formal grievance registration, stores audit log, and notifies grievance@rvsu.org.
 */

// Set CORS & Security Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle Preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed. Only POST is accepted."]);
    exit();
}

require_once __DIR__ . '/smtp-mailer.php';

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?: $_POST;

$trackingId    = isset($data['trackingId']) ? trim(htmlspecialchars($data['trackingId'])) : 'RVS-GRV-' . rand(1000, 9999);
$fullName      = isset($data['fullName']) ? trim(htmlspecialchars($data['fullName'])) : '';
$email         = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone         = isset($data['phone']) ? trim(htmlspecialchars($data['phone'])) : '';
$regNumber     = isset($data['regNumber']) ? trim(htmlspecialchars($data['regNumber'])) : '';
$programme     = isset($data['programme']) ? trim(htmlspecialchars($data['programme'])) : '';
$gender        = isset($data['gender']) ? trim(htmlspecialchars($data['gender'])) : '';
$complaintType = isset($data['complaintType']) ? trim(htmlspecialchars($data['complaintType'])) : '';
$subject       = isset($data['subject']) ? trim(htmlspecialchars($data['subject'])) : '';
$description   = isset($data['description']) ? trim(htmlspecialchars($data['description'])) : '';
$fileName      = isset($data['fileName']) ? trim(htmlspecialchars($data['fileName'])) : '';
$dateTime      = date('d M Y, h:i:s A T');
$ipAddr        = $_SERVER['REMOTE_ADDR'] ?? 'Unknown IP';

if (empty($fullName) || empty($email) || empty($phone) || empty($complaintType) || empty($subject)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please provide all required fields."]);
    exit();
}

$mailer = new RvsuSmtpMailer();

// 1. Send Full Grievance Report TO grievance@rvsu.org (and backup yatishgottapu2026@gmail.com)
$committeeRecipients = "grievance@rvsu.org, yatishgottapu2026@gmail.com";
$emailSubject = "⚠️ [Grievance Appeal Lodged] " . $trackingId . " — " . $complaintType . " (" . $fullName . ")";

$committeeHtml = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Grievance Appeal</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
        .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #0A192F 0%, #1e3a5f 100%); padding: 30px 24px; text-align: center; border-bottom: 3px solid #C6832B; color: #ffffff; }
        .header h1 { margin: 0; font-size: 21px; font-weight: 800; color: #ffffff; }
        .header p { margin: 6px 0 0; font-size: 13px; color: #F5D5A5; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 28px 24px; }
        .badge { display: inline-block; background: #FEF3C7; color: #92400E; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; border: 1px solid #FDE68A; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { text-align: left; padding: 10px 14px; background: #f8fafc; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; width: 35%; }
        td { padding: 10px 14px; color: #0f172a; font-size: 13px; font-weight: 500; border-bottom: 1px solid #e2e8f0; }
        .highlight { font-weight: 700; color: #0A192F; }
        .desc-box { margin-top: 16px; background: #FAF3E7; border-left: 4px solid #C6832B; padding: 14px 16px; border-radius: 0 8px 8px 0; font-size: 13px; line-height: 1.6; color: #334155; }
        .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1>RVS UNIVERSITY</h1>
            <p>Grievance Appeal Committee Notification</p>
        </div>
        <div class="content">
            <span class="badge">⚖️ Formal Grievance Lodged</span>
            <h2 style="font-size: 17px; margin: 0 0 12px; color: #0A192F;">Appeal Tracking ID: <span style="color:#C6832B;">' . $trackingId . '</span></h2>
            <table>
                <tr><th>Full Name</th><td class="highlight">' . $fullName . '</td></tr>
                <tr><th>Verified Email</th><td><a href="mailto:' . $email . '">' . $email . '</a></td></tr>
                <tr><th>Phone Number</th><td><a href="tel:' . $phone . '">' . $phone . '</a></td></tr>
                <tr><th>Registration No</th><td>' . $regNumber . '</td></tr>
                <tr><th>Programme</th><td>' . $programme . '</td></tr>
                <tr><th>Gender</th><td>' . $gender . '</td></tr>
                <tr><th>Complaint Category</th><td style="color:#b45309; font-weight:700;">' . $complaintType . '</td></tr>
                <tr><th>Subject</th><td class="highlight">' . $subject . '</td></tr>
                <tr><th>Supporting File</th><td>' . (!empty($fileName) ? $fileName : '<em>No file attached</em>') . '</td></tr>
                <tr><th>Submitted At</th><td>' . $dateTime . '</td></tr>
                <tr><th>Complainant IP</th><td><code>' . $ipAddr . '</code></td></tr>
            </table>

            <div style="margin-top: 20px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b;">Grievance Description:</div>
                <div class="desc-box">' . nl2br($description) . '</div>
            </div>
        </div>
        <div class="footer">
            Official Statutory Grievance Appeal Committee • RVS University<br>
            Delivered to grievance@rvsu.org. Please initiate fact-finding inquiry within 3 working days.
        </div>
    </div>
</body>
</html>
';

$committeeMailSent = $mailer->send($committeeRecipients, $emailSubject, $committeeHtml, $email);

// 2. Send Formal Confirmation Receipt TO the Student FROM grievance@rvsu.org
$studentSubject = "✅ RVS University Grievance Received — Tracking ID: " . $trackingId;
$studentHtml = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Grievance Received</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px; color: #1e293b;">
    <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
        <div style="background: #0A192F; padding: 24px; text-align: center; color: white;">
            <h2 style="margin: 0; color: #D4AF37;">RVS UNIVERSITY</h2>
            <p style="margin: 4px 0 0; font-size: 13px;">Grievance Redressal Cell</p>
        </div>
        <div style="padding: 24px;">
            <p>Dear <strong>' . $fullName . '</strong>,</p>
            <p>Your Grievance Appeal has been formally received and registered in our portal.</p>
            <div style="background: #FAF3E7; border: 1px solid #D4BC9F; padding: 16px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <div style="font-size: 11px; font-weight: bold; color: #7A695A; text-transform: uppercase;">Your Tracking Reference ID</div>
                <div style="font-size: 22px; font-weight: bold; color: #9C6019; font-family: monospace;">' . $trackingId . '</div>
            </div>
            <p style="font-size: 13px; line-height: 1.6;">
                <strong>Category:</strong> ' . $complaintType . '<br>
                <strong>Subject:</strong> ' . $subject . '<br>
                <strong>Registration Date:</strong> ' . $dateTime . '
            </p>
            <p style="font-size: 13px; color: #64748b; line-height: 1.6;">
                The Grievance Appeal Committee will review the facts of the appeal. You will receive updates directly from <strong>grievance@rvsu.org</strong> within 3 to 7 working days.
            </p>
        </div>
        <div style="background: #f8fafc; padding: 12px; text-align: center; font-size: 11px; color: #94a3b8;">
            RVS University • Statutory Grievance Redressal System • grievance@rvsu.org
        </div>
    </div>
</body>
</html>
';

$studentMailSent = $mailer->send($email, $studentSubject, $studentHtml, 'grievance@rvsu.org');

// 3. Store in Audit Log File
$logFile = __DIR__ . '/grievance_submissions_log.json';
$currentLogs = [];
if (file_exists($logFile)) {
    $currentLogs = json_decode(@file_get_contents($logFile), true) ?: [];
}
$currentLogs[] = [
    'trackingId'    => $trackingId,
    'submittedAt'   => $dateTime,
    'fullName'      => $fullName,
    'email'         => $email,
    'phone'         => $phone,
    'regNumber'     => $regNumber,
    'programme'     => $programme,
    'gender'        => $gender,
    'complaintType' => $complaintType,
    'subject'       => $subject,
    'description'   => $description,
    'fileName'      => $fileName,
    'ip'            => $ipAddr,
    'status'        => 'Submitted',
    'committeeMail' => $committeeMailSent,
    'studentMail'   => $studentMailSent
];
@file_put_contents($logFile, json_encode($currentLogs, JSON_PRETTY_PRINT));

http_response_code(200);
echo json_encode([
    "success"    => true,
    "trackingId" => $trackingId,
    "message"    => "Grievance Appeal registered successfully.",
    "mailSent"   => $committeeMailSent
]);
