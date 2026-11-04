<?php
/**
 * RVS University — Grievance Appeal Submission Gateway
 * Handles formal grievance registration, stores audit log, attaches uploaded files/images,
 * and notifies grievance@rvsu.org with full embedded attachment & download link.
 * 
 * Strict transport-safe:
 * - Content-Transfer-Encoding: quoted-printable
 * - No oversized raw base64 in HTML lines (prevents Exim line length limit 2048 errors)
 * - Safe MIME attachments with 76-character chunking
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
$fileType      = isset($data['fileType']) ? trim(htmlspecialchars($data['fileType'])) : '';
$fileData      = isset($data['fileData']) ? $data['fileData'] : '';
$dateTime      = date('d M Y, h:i:s A T');
$ipAddr        = $_SERVER['REMOTE_ADDR'] ?? 'Unknown IP';

if (empty($fullName) || empty($email) || empty($phone) || empty($complaintType) || empty($subject)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please provide all required fields."]);
    exit();
}

// 1. Process Attachment (Save to server disk + prepare safe MIME attachment)
$savedFileUrl = '';
$isImage = false;
$attachments = [];

if (!empty($fileData) && !empty($fileName)) {
    $ext = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $isImage = in_array($ext, ['png', 'jpg', 'jpeg', 'webp', 'gif']) || strpos($fileType, 'image/') === 0;

    // Save copy to server uploads directory
    $uploadDir = __DIR__ . '/uploads/grievance';
    if (!is_dir($uploadDir)) {
        @mkdir($uploadDir, 0755, true);
    }
    
    // Clean base64 binary
    $rawBase64 = $fileData;
    if (strpos($rawBase64, 'base64,') !== false) {
        $rawBase64 = substr($rawBase64, strpos($rawBase64, 'base64,') + 7);
    }
    $rawBase64 = str_replace(["\r", "\n", " "], '', $rawBase64);
    $binaryData = base64_decode($rawBase64);
    
    if ($binaryData !== false) {
        $safeName = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $fileName);
        $serverFileName = $trackingId . '_' . time() . '_' . $safeName;
        $targetPath = $uploadDir . '/' . $serverFileName;
        if (@file_put_contents($targetPath, $binaryData)) {
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
            $host = $_SERVER['HTTP_HOST'] ?? 'rvsu.org';
            $savedFileUrl = $protocol . '://' . $host . '/api/uploads/grievance/' . $serverFileName;
        }
    }

    // Add as safe chunked MIME attachment for Gmail/Roundcube
    $attachments[] = [
        'filename' => $fileName,
        'type'     => $fileType ?: 'application/octet-stream',
        'data'     => $rawBase64
    ];
}

$mailer = new RvsuSmtpMailer();

// 2. Prepare Committee Notification Email
$committeeRecipients = "grievance@rvsu.org, yatishgottapu2026@gmail.com";
$emailSubject = "⚠️ [Grievance Appeal Lodged] " . $trackingId . " — " . $complaintType . " (" . $fullName . ")";

// Attachment Section in Email (Clean URL link & attachment indicator - No raw base64 line overflows!)
$attachmentSectionHtml = '';
if (!empty($fileName)) {
    $attachmentSectionHtml = '
    <div style="margin-top: 20px; background: #FAF3E7; border: 2px solid #C6832B; border-radius: 12px; padding: 18px;">
        <div style="font-size: 13px; font-weight: 800; color: #9C6019; margin-bottom: 8px;">
            📎 Supporting File / Screenshot Attached:
        </div>
        <div style="font-size: 13px; color: #1D1611; font-weight: 600; margin-bottom: 12px;">
            ' . $fileName . '
        </div>
        <p style="font-size: 12px; color: #5C4837; margin: 0 0 12px;">
            The file has been attached directly to this email and saved on the server.
        </p>
        ' . (!empty($savedFileUrl) ? '<div><a href="' . $savedFileUrl . '" target="_blank" style="display: inline-block; background: #0A192F; color: #D4AF37; text-decoration: none; padding: 9px 18px; border-radius: 6px; font-weight: bold; font-size: 12px; border: 1px solid #D4AF37;">🔗 View / Download File in Browser</a></div>' : '') . '
    </div>
    ';
}

$committeeHtml = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Grievance Appeal</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
        .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
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
                <tr><th>Supporting File</th><td>' . (!empty($fileName) ? '<strong>' . $fileName . '</strong> (Attached to email)' : '<em>No file attached</em>') . '</td></tr>
                <tr><th>Submitted At</th><td>' . $dateTime . '</td></tr>
                <tr><th>Complainant IP</th><td><code>' . $ipAddr . '</code></td></tr>
            </table>

            <div style="margin-top: 20px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b;">Grievance Description:</div>
                <div class="desc-box">' . nl2br($description) . '</div>
            </div>

            ' . $attachmentSectionHtml . '
        </div>
        <div class="footer">
            Official Statutory Grievance Appeal Committee • RVS University<br>
            Delivered to grievance@rvsu.org. Please initiate fact-finding inquiry within 3 working days.
        </div>
    </div>
</body>
</html>
';

$committeeMailSent = $mailer->send($committeeRecipients, $emailSubject, $committeeHtml, $email, $attachments);

// 3. Send Formal Confirmation Receipt TO the Student FROM grievance@rvsu.org
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
                <strong>Attached Document:</strong> ' . (!empty($fileName) ? $fileName : 'None') . '<br>
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

// 4. Store in Audit Log File
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
    'fileUrl'       => $savedFileUrl,
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
    "mailSent"   => $committeeMailSent,
    "hasFile"    => !empty($fileName)
]);
