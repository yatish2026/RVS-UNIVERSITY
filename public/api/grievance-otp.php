<?php
/**
 * RVS University — Grievance Verification OTP Gateway
 * Dispatches 6-digit verification code to student / complainant email from grievance@rvsu.org.
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

$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$otp   = isset($data['otp']) ? trim(htmlspecialchars($data['otp'])) : '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please provide a valid email address."]);
    exit();
}

if (empty($otp)) {
    $otp = (string) rand(100000, 999999);
}

$subject = "🔐 RVS University Grievance Portal — Your Verification Code: " . $otp;

$htmlMessage = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Email Verification Code</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
        .card { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #0A192F 0%, #172a45 100%); padding: 28px 24px; text-align: center; border-bottom: 3px solid #D4AF37; }
        .header h1 { margin: 0; font-size: 20px; color: #ffffff; font-weight: 800; letter-spacing: 0.5px; }
        .header p { margin: 6px 0 0; font-size: 12px; color: #D4AF37; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 32px 24px; text-align: center; }
        .otp-box { margin: 24px auto; background: #FAF3E7; border: 2px dashed #C6832B; padding: 18px 24px; border-radius: 12px; display: inline-block; }
        .otp-code { font-family: "Courier New", Courier, monospace; font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #9C6019; margin: 0; }
        .note { font-size: 12px; color: #64748b; line-height: 1.6; margin-top: 20px; }
        .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1>RVS UNIVERSITY</h1>
            <p>Grievance Appeal Redressal Cell</p>
        </div>
        <div class="content">
            <h2 style="font-size: 17px; margin: 0 0 12px; color: #0A192F;">Identity Verification Required</h2>
            <p style="font-size: 13px; color: #475569; margin: 0;">
                You are initiating a formal submission to the University Grievance Appeal Committee. Use the one-time verification code below to verify your email address:
            </p>
            <div class="otp-box">
                <div class="otp-code">' . $otp . '</div>
            </div>
            <p class="note">
                This verification code will expire in <strong>10 minutes</strong>.<br>
                If you did not request this verification, please disregard this email.
            </p>
        </div>
        <div class="footer">
            RVS University • R.V.S. Nagar, Tirupathi Road, Chittoor, Andhra Pradesh - 517127.<br>
            Official Statutory Grievance Redressal System • grievance@rvsu.org
        </div>
    </div>
</body>
</html>
';

$mailer = new RvsuSmtpMailer();
$mailSent = $mailer->send($email, $subject, $htmlMessage, 'grievance@rvsu.org');

http_response_code(200);
echo json_encode([
    "success"  => true,
    "message"  => "Verification code dispatched to " . $email . " from grievance@rvsu.org",
    "mailSent" => $mailSent,
    "error"    => $mailer->getLastError()
]);
