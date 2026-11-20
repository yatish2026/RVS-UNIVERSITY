<?php
/**
 * RVS University — Native SMTP Mailer Engine
 * Authenticates directly with mail.rvsu.org:465 (SSL)
 * Account: grievance@rvsu.org
 * 
 * Strict RFC 5321 & RFC 2045 compliant:
 * - Content-Transfer-Encoding: quoted-printable (guarantees lines <= 76 chars, preventing Exim 2048 transport limit errors)
 * - Attachments: base64 chunked strictly at 76 chars
 */

class RvsuSmtpMailer {
    private $host = 'mail.rvsu.org';
    private $port = 465;
    private $user = 'grievance@rvsu.org';
    private $pass = 'grievance@rvsu2026';
    private $fromName = 'RVS University';
    private $timeout = 30;
    private $lastError = '';

    public function __construct($user = null, $pass = null, $fromName = null, $host = null, $port = null) {
        if (!empty($user)) $this->user = $user;
        if (!empty($pass)) $this->pass = $pass;
        if (!empty($fromName)) $this->fromName = $fromName;
        if (!empty($host)) $this->host = $host;
        if (!empty($port)) $this->port = (int)$port;
    }

    public function setCredentials($user, $pass, $fromName = null) {
        $this->user = $user;
        $this->pass = $pass;
        if (!empty($fromName)) $this->fromName = $fromName;
    }

    public function getLastError() {
        return $this->lastError;
    }

    /**
     * Encode HTML string using Quoted-Printable (wraps at 76 chars with soft line breaks)
     */
    private function encodeQuotedPrintable($text) {
        if (function_exists('quoted_printable_encode')) {
            return quoted_printable_encode($text);
        }
        // Fallback for line-folding
        return wordwrap($text, 76, "=\r\n");
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

        // Format HTML body with quoted-printable to guarantee all lines <= 76 characters
        $qpBody = $this->encodeQuotedPrintable($htmlBody);

        // Build Email Headers
        $msgId = '<' . time() . '.' . md5(uniqid(rand(), true)) . '@rvsu.org>';
        $headers  = "From: =?UTF-8?B?" . base64_encode($this->fromName) . "?= <{$this->user}>\r\n";
        $headers .= "To: " . implode(', ', $recipients) . "\r\n";
        if ($replyTo) {
            $headers .= "Reply-To: <$replyTo>\r\n";
        }
        $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
        $headers .= "Date: " . date('r') . "\r\n";
        $headers .= "Message-ID: $msgId\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "X-Mailer: RVSU-Portal-Mailer/2.1\r\n";

        if (!empty($attachments)) {
            $boundary = "----=_NextPart_" . md5(uniqid(rand(), true));
            $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n\r\n";

            // HTML Body Part in quoted-printable
            $fullPayload  = $headers;
            $fullPayload .= "--$boundary\r\n";
            $fullPayload .= "Content-Type: text/html; charset=UTF-8\r\n";
            $fullPayload .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";
            $fullPayload .= $qpBody . "\r\n\r\n";

            // Attachments
            foreach ($attachments as $att) {
                $attFilename = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $att['filename'] ?? 'attachment.dat');
                $attType     = $att['type'] ?? 'application/octet-stream';
                $attRawData  = $att['data'] ?? '';
                $attCid      = $att['cid'] ?? null;

                if (strpos($attRawData, 'base64,') !== false) {
                    $attRawData = substr($attRawData, strpos($attRawData, 'base64,') + 7);
                }
                $attRawData = str_replace(["\r", "\n", " "], '', $attRawData);
                // Strictly chunk base64 at 76 characters per RFC standard
                $chunkedBase64 = chunk_split($attRawData, 76, "\r\n");

                $fullPayload .= "--$boundary\r\n";
                $fullPayload .= "Content-Type: {$attType}; name=\"{$attFilename}\"\r\n";
                $fullPayload .= "Content-Disposition: attachment; filename=\"{$attFilename}\"\r\n";
                if ($attCid) {
                    $fullPayload .= "Content-ID: <{$attCid}>\r\n";
                }
                $fullPayload .= "Content-Transfer-Encoding: base64\r\n\r\n";
                $fullPayload .= $chunkedBase64 . "\r\n\r\n";
            }

            $fullPayload .= "--$boundary--\r\n";
        } else {
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $headers .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";
            $fullPayload = $headers . $qpBody . "\r\n";
        }

        // RFC 5321 §4.5.2 dot-stuffing: a line that starts with "." must be sent as "..",
        // otherwise the mail server strips the dot (e.g. "13=\r\n.5px" became "135px").
        $fullPayload = preg_replace('/(^|\r\n)\./', '$1..', $fullPayload) . ".\r\n";

        // Send Email Content safely in chunks
        if (!$this->safeFwrite($socket, $fullPayload)) {
            fclose($socket);
            $this->lastError = "Failed to stream payload through socket. Falling back to PHP mail().";
            return $this->fallbackMail($recipients, $subject, $htmlBody, $replyTo, $attachments);
        }

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

    /**
     * Safely write all bytes to socket stream in 8192-byte chunks, ensuring complete transmission
     * even for large attachments where a single fwrite() only writes a partial buffer.
     */
    private function safeFwrite($socket, $data) {
        $total = strlen($data);
        $written = 0;
        while ($written < $total) {
            $chunk = substr($data, $written, 8192);
            $n = @fwrite($socket, $chunk);
            if ($n === false || $n === 0) {
                $meta = stream_get_meta_data($socket);
                if (!empty($meta['timed_out'])) {
                    $this->lastError = "Socket write timed out after transmitting {$written} of {$total} bytes.";
                } else {
                    $this->lastError = "Socket connection broken after transmitting {$written} of {$total} bytes.";
                }
                $this->logError($this->lastError);
                return false;
            }
            $written += $n;
        }
        @fflush($socket);
        return true;
    }

    private function sendCommand($socket, $cmd) {
        return $this->safeFwrite($socket, $cmd . "\r\n");
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
        $qpBody = $this->encodeQuotedPrintable($htmlBody);

        $msgId = '<' . time() . '.' . md5(uniqid(rand(), true)) . '@rvsu.org>';
        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "From: {$this->fromName} <{$this->user}>\r\n";
        $headers .= "Message-ID: $msgId\r\n";
        if ($replyTo) {
            $headers .= "Reply-To: $replyTo\r\n";
        }
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

        if (!empty($attachments)) {
            $boundary = "----=_NextPart_" . md5(uniqid(rand(), true));
            $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

            $body  = "--$boundary\r\n";
            $body .= "Content-Type: text/html; charset=UTF-8\r\n";
            $body .= "Content-Transfer-Encoding: quoted-printable\r\n\r\n";
            $body .= $qpBody . "\r\n\r\n";

            foreach ($attachments as $att) {
                $attFilename = preg_replace('/[^a-zA-Z0-9_\-\.]/', '_', $att['filename'] ?? 'attachment.dat');
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
                $body .= chunk_split($attRawData, 76, "\r\n") . "\r\n\r\n";
            }
            $body .= "--$boundary--";
            return @mail($toStr, $subject, $body, $headers, "-f {$this->user}");
        } else {
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $headers .= "Content-Transfer-Encoding: quoted-printable\r\n";
            return @mail($toStr, $subject, $qpBody, $headers, "-f {$this->user}");
        }
    }

    private function logError($msg) {
        $logFile = __DIR__ . '/smtp_error_log.txt';
        $entry = "[" . date('Y-m-d H:i:s') . "] " . $msg . "\n";
        @file_put_contents($logFile, $entry, FILE_APPEND);
    }
}
