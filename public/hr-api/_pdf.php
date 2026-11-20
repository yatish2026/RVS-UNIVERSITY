<?php
/**
 * Server-side application PDF (attached to the team + applicant emails).
 * Same layout as the browser PDF in src/features/recruitment/pdf.ts.
 */
require_once __DIR__ . '/_fpdf/fpdf.php';

const HR_PDF_M = 14;
const HR_NAVY = [29, 22, 17];
const HR_GOLD = [198, 131, 43];
const HR_GOLD_DARK = [156, 96, 25];
const HR_GOLD_LIGHT = [240, 209, 158];
const HR_MUTED = [122, 105, 90];
const HR_PARCHMENT = [251, 245, 235];
const HR_LINE = [232, 222, 211];

/** UTF-8 -> Windows-1252 for the core PDF fonts. */
function hr_pdf_t($s)
{
    $s = str_replace(['–', '—', '−', '₹', '…', '’', '‘', '“', '”', '•', '›'], ['-', '-', '-', 'Rs.', '...', "'", "'", '"', '"', '-', '>'], (string)$s);
    $out = @iconv('UTF-8', 'Windows-1252//TRANSLIT//IGNORE', $s);
    return $out === false ? preg_replace('/[^\x20-\x7E]/', '?', $s) : $out;
}

function hr_pdf_logo()
{
    $p = __DIR__ . '/../images/rvsu-logo-200.png';
    return is_file($p) ? $p : null;
}

class RvsuApplicationPdf extends FPDF
{
    public $appId = '';
    public $appName = '';

    public function Header()
    {
        if ($this->PageNo() === 1) return;
        $W = $this->GetPageWidth();
        $M = HR_PDF_M;
        $this->SetFillColor(...HR_GOLD);
        $this->Rect(0, 0, $W, 1.6, 'F');
        $logo = hr_pdf_logo();
        if ($logo) {
            try {
                $this->Image($logo, $M, 6, 9, 9);
            } catch (Exception $e) {
                $logo = null;
            }
        }
        $this->SetFont('Times', 'B', 11);
        $this->SetTextColor(...HR_NAVY);
        $this->Text($M + ($logo ? 11.5 : 0), 12, 'RVS UNIVERSITY');
        $this->SetFont('Helvetica', '', 8.5);
        $this->SetTextColor(...HR_MUTED);
        $t = hr_pdf_t($this->appId . '  |  ' . $this->appName);
        $this->Text($W - $M - $this->GetStringWidth($t), 12, $t);
        $this->SetDrawColor(...HR_LINE);
        $this->SetLineWidth(0.3);
        $this->Line($M, 17, $W - $M, 17);
        $this->SetY(23);
    }

    public function Footer()
    {
        $W = $this->GetPageWidth();
        $H = $this->GetPageHeight();
        $M = HR_PDF_M;
        $this->SetDrawColor(...HR_LINE);
        $this->SetLineWidth(0.3);
        $this->Line($M, $H - 13, $W - $M, $H - 13);
        $this->SetFont('Helvetica', '', 7.8);
        $this->SetTextColor(...HR_MUTED);
        $this->Text($M, $H - 8.5, hr_pdf_t('RVS University  |  Recruitment  |  Application ' . $this->appId . '  |  Confidential'));
        $this->SetXY($M, $H - 11.3);
        $this->Cell($W - 2 * $M, 4, 'Page ' . $this->PageNo() . ' of {nb}', 0, 0, 'R');
    }

    /** Number of lines a MultiCell of width $w needs for $txt (current font). */
    public function nbLines($w, $txt)
    {
        $cw = $this->CurrentFont['cw'];
        if ($w == 0) $w = $this->w - $this->rMargin - $this->x;
        $wmax = ($w - 2 * $this->cMargin) * 1000 / $this->FontSize;
        $s = str_replace("\r", '', (string)$txt);
        $nb = strlen($s);
        if ($nb > 0 && $s[$nb - 1] === "\n") $nb--;
        $sep = -1;
        $i = 0;
        $j = 0;
        $l = 0;
        $nl = 1;
        while ($i < $nb) {
            $c = $s[$i];
            if ($c === "\n") {
                $i++;
                $sep = -1;
                $j = $i;
                $l = 0;
                $nl++;
                continue;
            }
            if ($c === ' ') $sep = $i;
            $l += isset($cw[$c]) ? $cw[$c] : 500;
            if ($l > $wmax) {
                if ($sep === -1) {
                    if ($i === $j) $i++;
                } else {
                    $i = $sep + 1;
                }
                $sep = -1;
                $j = $i;
                $l = 0;
                $nl++;
            } else {
                $i++;
            }
        }
        return $nl;
    }

    /**
     * Draw one table row. Each cell: [text, widthMM, style] where style keys:
     * fill (rgb|null), color (rgb), bold (bool), size (pt), align ('L'|'C').
     */
    public function row(array $cells, $padX = 2.8, $padY = 1.9)
    {
        $heights = [];
        foreach ($cells as $c) {
            $st = $c[2];
            $this->SetFont('Helvetica', !empty($st['bold']) ? 'B' : '', isset($st['size']) ? $st['size'] : 8.8);
            $lh = (isset($st['size']) ? $st['size'] : 8.8) * 0.45;
            $heights[] = $this->nbLines($c[1] - 2 * $padX + 2 * $this->cMargin, $c[0]) * $lh;
        }
        $h = max($heights) + 2 * $padY;
        if ($this->GetY() + $h > $this->GetPageHeight() - 18) $this->AddPage();
        $x = HR_PDF_M;
        $y = $this->GetY();
        $this->SetDrawColor(...HR_LINE);
        $this->SetLineWidth(0.2);
        foreach ($cells as $c) {
            list($text, $w, $st) = $c;
            if (!empty($st['fill'])) {
                $this->SetFillColor(...$st['fill']);
                $this->Rect($x, $y, $w, $h, 'DF');
            } else {
                $this->Rect($x, $y, $w, $h, 'D');
            }
            $size = isset($st['size']) ? $st['size'] : 8.8;
            $this->SetFont('Helvetica', !empty($st['bold']) ? 'B' : '', $size);
            $this->SetTextColor(...(isset($st['color']) ? $st['color'] : HR_NAVY));
            $this->SetXY($x + $padX - $this->cMargin, $y + $padY);
            $this->MultiCell($w - 2 * $padX + 2 * $this->cMargin, $size * 0.45, $text, 0, isset($st['align']) ? $st['align'] : 'L');
            $x += $w;
        }
        $this->SetXY(HR_PDF_M, $y + $h);
    }

    public function sectionHead($title, $width)
    {
        $this->row([[hr_pdf_t($title), $width, ['fill' => HR_NAVY, 'color' => HR_GOLD_LIGHT, 'bold' => true, 'size' => 9]]], 3, 2.2);
    }

    public function heading($text)
    {
        if ($this->GetY() + 22 > $this->GetPageHeight() - 18) $this->AddPage();
        $y = $this->GetY() + 5;
        $this->SetFont('Times', 'B', 13);
        $this->SetTextColor(...HR_NAVY);
        $this->Text(HR_PDF_M, $y, hr_pdf_t($text));
        $this->SetDrawColor(...HR_GOLD);
        $this->SetLineWidth(0.6);
        $this->Line(HR_PDF_M, $y + 1.8, HR_PDF_M + 18, $y + 1.8);
        $this->SetY($y + 4.5);
    }
}

/** Build the application PDF and return it as a binary string. */
function hr_build_application_pdf($app, $schema)
{
    $pdf = new RvsuApplicationPdf('P', 'mm', 'A4');
    $pdf->SetMargins(HR_PDF_M, 23, HR_PDF_M);
    $pdf->SetAutoPageBreak(false);
    $pdf->AliasNbPages('{nb}');
    $pdf->appId = $app['id'];
    $pdf->appName = $app['name'];
    $pdf->SetTitle(hr_pdf_t('Application ' . $app['id'] . ' - ' . $app['name']));
    $pdf->SetAuthor('RVS University');
    $pdf->SetCreator('RVS University Recruitment Portal');
    $pdf->AddPage();

    $W = $pdf->GetPageWidth();
    $M = HR_PDF_M;
    $CW = $W - 2 * $M;

    // ---------- Letterhead
    $pdf->SetFillColor(...HR_GOLD);
    $pdf->Rect(0, 0, $W, 2.2, 'F');
    $pdf->SetFillColor(...HR_NAVY);
    $pdf->Rect(0, 2.2, $W, 0.8, 'F');
    $logo = hr_pdf_logo();
    if ($logo) {
        try {
            $pdf->Image($logo, $M, 8, 24, 24);
        } catch (Exception $e) {
            $logo = null;
        }
    }
    $tx = $logo ? $M + 29 : $M;
    $pdf->SetFont('Times', 'B', 22);
    $pdf->SetTextColor(...HR_NAVY);
    $pdf->Text($tx, 17, 'RVS UNIVERSITY');
    $pdf->SetFont('Helvetica', 'I', 9.5);
    $pdf->SetTextColor(...HR_GOLD_DARK);
    $pdf->Text($tx, 22.5, 'Where Knowledge Meets Possibility');
    $pdf->SetFont('Helvetica', '', 8.3);
    $pdf->SetTextColor(...HR_MUTED);
    $pdf->Text($tx, 27.3, hr_pdf_t('R.V.S Nagar, Tirupathi Road, Chittoor, Andhra Pradesh - 517127'));
    $pdf->Text($tx, 31.4, 'info@rvsu.org  |  +91 96696 60155  |  www.rvsu.ac.in');

    // Photo (top-right)
    $photo = null;
    $pe = hr_section_data($app['data'], 'personal') ?: [];
    if (!empty($pe['photo']['stored'])) {
        $p = hr_data_dir() . '/uploads/' . $app['id'] . '/' . basename($pe['photo']['stored']);
        $ext = strtolower(pathinfo($p, PATHINFO_EXTENSION));
        if (is_file($p) && in_array($ext, ['jpg', 'jpeg', 'png'], true)) $photo = $p;
    }
    if ($photo) {
        try {
            $px = $W - $M - 25;
            $pdf->SetDrawColor(...HR_LINE);
            $pdf->SetLineWidth(0.4);
            $pdf->Rect($px - 0.8, 6.2, 26.6, 32.6);
            $pdf->Image($photo, $px, 7, 25, 31);
        } catch (Exception $e) {
            /* unreadable image: skip */
        }
    }

    // Gold rule
    $pdf->SetDrawColor(...HR_GOLD);
    $pdf->SetLineWidth(0.7);
    $pdf->Line($M, 41, $W - $M, 41);
    $pdf->SetDrawColor(...HR_LINE);
    $pdf->SetLineWidth(0.25);
    $pdf->Line($M, 42.2, $W - $M, 42.2);

    // Title strip
    $pdf->SetFillColor(...HR_NAVY);
    $pdf->Rect($M, 46, $CW, 12, 'F');
    $pdf->SetFont('Helvetica', 'B', 11.5);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->Text($M + 5, 53.6, 'APPLICATION  FOR  EMPLOYMENT');
    $strap = hr_pdf_t(trim($app['postType'] . '  |  ' . $app['jobNature'], ' |'));
    if ($strap) {
        $pdf->SetFont('Helvetica', 'B', 9.5);
        $pdf->SetTextColor(...HR_GOLD_LIGHT);
        $pdf->Text($W - $M - 5 - $pdf->GetStringWidth($strap), 53.6, $strap);
    }

    // Key facts
    $pdf->SetY(61);
    $lab = ['fill' => HR_PARCHMENT, 'color' => HR_MUTED, 'bold' => true, 'size' => 8];
    $val = ['bold' => true, 'size' => 9];
    $vw = ($CW - 64) / 2;
    $facts = [
        ['Application ID', $app['id'], 'Submitted On', date('d M Y, h:i A', strtotime($app['submittedAt']))],
        ['Applicant Name', $app['name'], 'Status', isset($app['status']) ? $app['status'] : 'New'],
        ['Department', $app['department'], 'Designation', $app['designation']],
    ];
    foreach ($facts as $f) {
        $pdf->row([[hr_pdf_t($f[0]), 32, $lab], [hr_pdf_t($f[1]), $vw, $val], [hr_pdf_t($f[2]), 32, $lab], [hr_pdf_t($f[3]), $CW - 64 - $vw, $val]], 3, 2.2);
    }
    $pdf->SetY($pdf->GetY() + 3);

    // ---------- Body
    $lab = ['fill' => HR_PARCHMENT, 'color' => HR_MUTED, 'size' => 8];
    $val = ['bold' => true, 'size' => 8.8];
    $vw = ($CW - 76) / 2;
    $n = 0;
    foreach (hr_summarize($schema, $app['data']) as $step) {
        $n++;
        $pdf->heading($n . '. ' . $step['title']);
        foreach ($step['sections'] as $sec) {
            // Keep the section title together with its first rows.
            if ($pdf->GetY() + ($sec['repeatable'] ? 36 : 20) > $pdf->GetPageHeight() - 18) $pdf->AddPage();
            $pdf->sectionHead($sec['title'], $CW);
            if ($sec['repeatable']) {
                $cols = [];
                foreach ($sec['items'] as $rows) foreach ($rows as $r) if (!in_array($r['label'], $cols, true)) $cols[] = $r['label'];
                $cw = ($CW - 7) / max(1, count($cols));
                $head = [['#', 7, ['fill' => HR_PARCHMENT, 'color' => HR_MUTED, 'bold' => true, 'size' => 7.6, 'align' => 'C']]];
                foreach ($cols as $c) $head[] = [hr_pdf_t($c), $cw, ['fill' => HR_PARCHMENT, 'color' => HR_MUTED, 'bold' => true, 'size' => 7.6]];
                $pdf->row($head, 2, 1.8);
                foreach ($sec['items'] as $i => $rows) {
                    $map = [];
                    foreach ($rows as $r) $map[$r['label']] = $r['value'];
                    $cells = [[(string)($i + 1), 7, ['color' => HR_MUTED, 'size' => 8, 'align' => 'C']]];
                    foreach ($cols as $c) $cells[] = [hr_pdf_t(isset($map[$c]) ? $map[$c] : ''), $cw, ['size' => 8.2]];
                    $pdf->row($cells, 2, 1.8);
                }
            } else {
                $wide = [];
                $narrow = [];
                foreach ($sec['rows'] as $r) {
                    if ($r['type'] === 'textarea' || mb_strlen($r['value']) > 48) $wide[] = $r;
                    else $narrow[] = $r;
                }
                for ($i = 0; $i < count($narrow); $i += 2) {
                    $a = $narrow[$i];
                    $b = isset($narrow[$i + 1]) ? $narrow[$i + 1] : ['label' => '', 'value' => ''];
                    $pdf->row([
                        [hr_pdf_t($a['label']), 38, $lab], [hr_pdf_t($a['value']), $vw, $val],
                        [hr_pdf_t($b['label']), 38, $lab], [hr_pdf_t($b['value']), $CW - 76 - $vw, $val],
                    ]);
                }
                foreach ($wide as $r) {
                    $pdf->row([[hr_pdf_t($r['label']), 38, $lab], [hr_pdf_t($r['value']), $CW - 38, $val]]);
                }
            }
            $pdf->SetY($pdf->GetY() + 4);
        }
        $pdf->SetY($pdf->GetY() + 2);
    }

    // ---------- Declaration
    $decl = isset($schema['settings']['declarationText']) ? $schema['settings']['declarationText'] : '';
    if ($decl) {
        if ($pdf->GetY() + 40 > $pdf->GetPageHeight() - 18) $pdf->AddPage();
        $pdf->heading('Declaration');
        $pdf->SetFont('Helvetica', '', 9);
        $pdf->SetTextColor(...HR_MUTED);
        $pdf->SetX($M - 1);
        $pdf->MultiCell($CW + 2, 4.3, hr_pdf_t($decl));
        $pdf->SetY($pdf->GetY() + 4);
        $pdf->SetFont('Helvetica', 'B', 9);
        $pdf->SetTextColor(...HR_NAVY);
        $pdf->Text($M, $pdf->GetY(), hr_pdf_t('Declared electronically by ' . ($app['name'] ?: 'the applicant')));
        $pdf->SetFont('Helvetica', '', 9);
        $pdf->SetTextColor(...HR_MUTED);
        $pdf->Text($M, $pdf->GetY() + 4.6, hr_pdf_t('on ' . date('d M Y, h:i A', strtotime($app['submittedAt']))));
    }

    return $pdf->Output('S');
}

function hr_pdf_filename($app)
{
    $name = trim(preg_replace('/[^A-Za-z0-9]+/', '-', preg_replace('/^(Mr|Ms|Mrs|Dr|Prof)\.\s*/', '', $app['name'])), '-');
    return 'Application-' . $app['id'] . ($name ? '-' . $name : '') . '.pdf';
}
