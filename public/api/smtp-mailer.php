<?php
/**
 * RVS University — Native SMTP Mailer Engine
 * Authenticates directly with mail.rvsu.org:465 (SSL)
 * Account: grievance@rvsu.org
 * Supports MIME multipart HTML body + file attachments (images, PDFs, documents)
 */

class RvsuSmtpMailer {
    private $host = 'mail.rvsu.org';
    private $port = 465;
    private $user = 'grievance@rvsu.org';
    private $pass = 'grievance@rvsu2026';
    private $fromName = 'RVS University — Grievance Cell';
    private $timeout = 12;
    private $lastError = '';

    public function getLastError() {
        return $this->lastError;
    }

    /**
     * Send email via native SSL socket to mail.rvsu.org with optional attachments
     */
    public function send($to, $subject, $htmlBody, $replyTo = null, $attachments = []) {
        $this->lastError = '';
        $recipients = is_array($to) ? $to : array_map('trim', explode(',', $to));

        $context = stream_context_create([
            'ssl' => [
                'verify_peer'       => false,
                'verify_peer_name'  => false,
                'allow_self_signed' => true,
            ]
        ]);

        $socket = @stream_socket_client(
            "ssl://{$this->host}:{$this->port}",
            $errno,
            $errstr,
            $this->timeout,
            STREAM_CLIENT_CONNECT,
            $context
        );

        if (!$socket) {
            $this->lastError = "Connection failed: $errstr ($errno). Falling back to PHP mail().";
            $this->logError($this->lastError);
            return $this->fallbackMail($recipients, $subject, $htmlBody, $replyTo, $attachments);
        }

        stream_set_timeout($socket, $this->timeout);

        // Read server greeting
        $reply = $this->readReply($socket);
        if (substr($reply, 0, 3) !== '220') {
            fclose($socket);
            $this->lastError = "Invalid greeting: $reply";
            return $this->fallbackMail($recipients, $subject, $htmlBody, $replyTo, $attachments);
        }

        // Send EHLO
        $this->sendCommand($socket, "EHLO rvsu.org");
        $reply = $this->readReply($socket);

        // AUTH LOGIN
        $this->sendCommand($socket, "AUTH LOGIN");
        $reply = $this->readReply($socket);
        if (substr($reply, 0, 3) !== '334') {
            fclose($socket);
            $this->lastError = "AUTH LOGIN rejected: $reply";
            return $this->fallbackMail($recipients, $subject, $htmlBody, $replyTo, $attachments);
        }

        // Username
        $this->sendCommand($socket, base64_encode($this->user));
        $reply = $this->readReply($socket);
        if (substr($reply, 0, 3) !== '334') {
            fclose($socket);
            $this->lastError = "Username rejected: $reply";
            return $this->fallbackMail($recipients, $subject, $htmlBody, $replyTo, $attachments);
        }

        // Password
        $this->sendCommand($socket, base64_encode($this->pass));
        $reply = $this->readReply($socket);
        if (substr($reply, 0, 3) !== '235') {
            fclose($socket);
            $this->lastError = "Password authentication failed: $reply";
            return $this->fallbackMail($recipients, $subject, $htmlBody, $replyTo, $attachments);
        }

        // MAIL FROM
        $this->sendCommand($socket, "MAIL FROM: <{$this->user}>");
        $reply = $this->readReply($socket);
        if (substr($reply, 0, 3) !== '250') {
            fclose($socket);
            $this->lastError = "MAIL FROM rejected: $reply";
            return $this->fallbackMail($recipients, $subject, $htmlBody, $replyTo, $attachments);
        }

        // RCPT TO for each recipient
        foreach ($recipients as $recipient) {
            if (!empty($recipient)) {
                $this->sendCommand($socket, "RCPT TO: <$recipient>");
                $reply = $this->readReply($socket);
                if (substr($reply, 0, 3) !== '250' && substr($reply, 0, 3) !== '251') {
                    $this->logError("RCPT TO warning for $recipient: $reply");
                }
            }
        }

        // DATA
        $this->sendCommand($socket, "DATA");
        $reply = $this->readReply($socket);
        if (substr($reply, 0, 3) !== '354') {
            fclose($socket);
            $this->lastError = "DATA rejected: $reply";
            return $this->fallbackMail($recipients, $subject, $htmlBody, $replyTo, $attachments);
        }

        // Build Email Payload
        $headers  = "From: =?UTF-8?B?" . base64_encode($this->fromName) . "?= <{$this->user}>\r\n";
        $headers .= "To: " . implode(', ', $recipients) . "\r\n";
        if ($replyTo) {
            $headers .= "Reply-To: <$replyTo>\r\n";
        }
        $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
        $headers .= "Date: " . date('r') . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "X-Mailer: RVSU-Grievance-Mailer/1.2\r\n";

        if (!empty($attachments)) {
            $boundary = "----=_Part_" . md5(uniqid(rand(), true));
            $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n\r\n";

            // HTML Body Part
            $fullPayload  = $headers;
            $fullPayload .= "--$boundary\r\n";
            $fullPayload .= "Content-Type: text/html; charset=UTF-8\r\n";
            $fullPayload .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
            $fullPayload .= $htmlBody . "\r\n\r\n";

            // Attachments
            foreach ($attachments as $att) {
                $attFilename = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $att['filename'] ?? 'attachment');
                $attType     = $att['type'] ?? 'application/octet-stream';
                $attRawData  = $att['data'] ?? '';

                if (strpos($attRawData, 'base64,') !== false) {
                    $attRawData = substr($attRawData, strpos($attRawData, 'base64,') + 7);
                }
                $attRawData = str_replace(["\r", "\n", " "], '', $attRawData);
                $chunkedBase64 = chunk_split($attRawData);

                $fullPayload .= "--$boundary\r\n";
                $fullPayload .= "Content-Type: {$attType}; name=\"{$attFilename}\"\r\n";
                $fullPayload .= "Content-Disposition: attachment; filename=\"{$attFilename}\"\r\n";
                $fullPayload .= "Content-Transfer-Encoding: base64\r\n\r\n";
                $fullPayload .= $chunkedBase64 . "\r\n\r\n";
            }

            $fullPayload .= "--$boundary--\r\n.\r\n";
        } else {
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $headers .= "Content-Transfer-Encoding: 8bit\r\n";
            $fullPayload = $headers . "\r\n" . $htmlBody . "\r\n.\r\n";
        }

        // Send Email Content
        fwrite($socket, $fullPayload);
        $reply = $this->readReply($socket);

        // QUIT
        $this->sendCommand($socket, "QUIT");
        fclose($socket);

        if (substr($reply, 0, 3) === '250') {
            return true;
        }

        $this->lastError = "Data transmission error: $reply";
        return $this->fallbackMail($recipients, $subject, $htmlBody, $replyTo, $attachments);
    }

    private function sendCommand($socket, $cmd) {
        fwrite($socket, $cmd . "\r\n");
    }

    private function readReply($socket) {
        $reply = '';
        while ($line = fgets($socket, 515)) {
            $reply .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return trim($reply);
    }

    private function fallbackMail($recipients, $subject, $htmlBody, $replyTo, $attachments = []) {
        $toStr = implode(', ', $recipients);
        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "From: {$this->fromName} <{$this->user}>\r\n";
        if ($replyTo) {
            $headers .= "Reply-To: $replyTo\r\n";
        }
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

        if (!empty($attachments)) {
            $boundary = "----=_Part_" . md5(uniqid(rand(), true));
            $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

            $body  = "--$boundary\r\n";
            $body .= "Content-Type: text/html; charset=UTF-8\r\n";
            $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
            $body .= $htmlBody . "\r\n\r\n";

            foreach ($attachments as $att) {
                $attFilename = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $att['filename'] ?? 'attachment');
                $attType     = $att['type'] ?? 'application/octet-stream';
                $attRawData  = $att['data'] ?? '';

                if (strpos($attRawData, 'base64,') !== false) {
                    $attRawData = substr($attRawData, strpos($attRawData, 'base64,') + 7);
                }
                $attRawData = str_replace(["\r", "\n", " "], '', $attRawData);

                $body .= "--$boundary\r\n";
                $body .= "Content-Type: {$attType}; name=\"{$attFilename}\"\r\n";
                $body .= "Content-Disposition: attachment; filename=\"{$attFilename}\"\r\n";
                $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
                $body .= chunk_split($attRawData) . "\r\n\r\n";
            }
            $body .= "--$boundary--";
            return @mail($toStr, $subject, $body, $headers);
        } else {
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            return @mail($toStr, $subject, $htmlBody, $headers);
        }
    }

    private function logError($msg) {
        $logFile = __DIR__ . '/smtp_error_log.txt';
        $entry = "[" . date('Y-m-d H:i:s') . "] " . $msg . "\n";
        @file_put_contents($logFile, $entry, FILE_APPEND);
    }
}
