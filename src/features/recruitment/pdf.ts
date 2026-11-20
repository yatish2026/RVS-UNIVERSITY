import { jsPDF } from 'jspdf';
import autoTable, { type RowInput } from 'jspdf-autotable';
import type { FormSchema, FormValues } from './types';
import { formatDateTime, sectionData, summarize } from './engine';

export interface PdfMeta {
  id: string;
  submittedAt: string;
  status?: string;
  photoDataUrl?: string | null;
  declarationText?: string;
}

const NAVY: [number, number, number] = [29, 22, 17];
const GOLD: [number, number, number] = [198, 131, 43];
const GOLD_DARK: [number, number, number] = [156, 96, 25];
const MUTED: [number, number, number] = [122, 105, 90];
const PARCHMENT: [number, number, number] = [251, 245, 235];
const LINE: [number, number, number] = [232, 222, 211];

const UNIVERSITY = {
  name: 'RVS UNIVERSITY',
  tagline: 'Where Knowledge Meets Possibility',
  address: 'R.V.S Nagar, Tirupathi Road, Chittoor, Andhra Pradesh - 517127',
  contact: 'info@rvsu.org  |  +91 96696 60155  |  www.rvsu.ac.in',
};

/** Standard PDF fonts only cover Latin-1; replace common typographic characters. */
const t = (s: unknown): string =>
  String(s ?? '')
    .replace(/[–—−]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/₹/g, 'Rs.')
    .replace(/[^\x00-\xFF]/g, '?');

let logoCache: Promise<string | null> | null = null;
function loadLogo(): Promise<string | null> {
  if (!logoCache) {
    logoCache = fetch('/images/rvsu-logo-200.png')
      .then((r) => (r.ok ? r.blob() : null))
      .then((b) => (b ? blobToDataUrl(b) : null))
      .catch(() => null);
  }
  return logoCache;
}

export const blobToDataUrl = (b: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(b);
  });

export const fileToDataUrl = (f: File) => blobToDataUrl(f);

function imageFormat(dataUrl: string): 'PNG' | 'JPEG' {
  return /^data:image\/png/i.test(dataUrl) ? 'PNG' : 'JPEG';
}

export async function buildApplicationPdf(schema: Pick<FormSchema, 'steps'>, values: FormValues, meta: PdfMeta): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 14;
  const logo = await loadLogo();

  const position = sectionData(values, 'position') ?? {};
  const personal = sectionData(values, 'personal') ?? {};
  const fullName = t(`${personal.salutation ? `${personal.salutation}. ` : ''}${personal.firstName ?? ''} ${personal.lastName ?? ''}`.trim());
  const designation = position.designation === 'Other' && position.designationOther ? position.designationOther : position.designation;

  // ---------- Letterhead ----------
  doc.setFillColor(...GOLD);
  doc.rect(0, 0, W, 2.2, 'F');
  doc.setFillColor(...NAVY);
  doc.rect(0, 2.2, W, 0.8, 'F');

  if (logo) doc.addImage(logo, 'PNG', M, 8, 24, 24);
  const tx = logo ? M + 29 : M;
  doc.setTextColor(...NAVY);
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.text(UNIVERSITY.name, tx, 17);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(...GOLD_DARK);
  doc.text(UNIVERSITY.tagline, tx, 22.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(...MUTED);
  doc.text(UNIVERSITY.address, tx, 27.3);
  doc.text(UNIVERSITY.contact, tx, 31.4);

  // Photo (top-right)
  const photoW = 25;
  const photoH = 31;
  const photoX = W - M - photoW;
  if (meta.photoDataUrl) {
    try {
      doc.setDrawColor(...LINE);
      doc.setLineWidth(0.4);
      doc.rect(photoX - 0.8, 6.2, photoW + 1.6, photoH + 1.6);
      doc.addImage(meta.photoDataUrl, imageFormat(meta.photoDataUrl), photoX, 7, photoW, photoH, undefined, 'MEDIUM');
    } catch {
      /* unreadable image */
    }
  }

  // Gold rule
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.7);
  doc.line(M, 41, W - M, 41);
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.25);
  doc.line(M, 42.2, W - M, 42.2);

  // Title strip
  doc.setFillColor(...NAVY);
  doc.roundedRect(M, 46, W - 2 * M, 12, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.text('APPLICATION FOR EMPLOYMENT', M + 5, 53.6, { charSpace: 0.6 });
  doc.setTextColor(240, 209, 158);
  doc.setFontSize(9.5);
  const strap = t([position.postType, position.jobNature].filter(Boolean).join('  |  '));
  if (strap) doc.text(strap, W - M - 5, 53.6, { align: 'right' });

  // Key facts
  const facts: [string, string][] = [
    ['Application ID', meta.id],
    ['Submitted On', formatDateTime(meta.submittedAt)],
    ['Applicant Name', fullName],
    ['Status', meta.status ?? 'Submitted'],
    ['Department', t(position.department)],
    ['Designation', t(designation)],
  ];
  const factRows: RowInput[] = [];
  for (let i = 0; i < facts.length; i += 2) {
    factRows.push([facts[i][0], t(facts[i][1]), facts[i + 1]?.[0] ?? '', t(facts[i + 1]?.[1] ?? '')]);
  }
  autoTable(doc, {
    startY: 61,
    margin: { left: M, right: M, top: 22, bottom: 18 },
    body: factRows,
    theme: 'grid',
    styles: { font: 'helvetica', fontSize: 9, cellPadding: { top: 2.2, bottom: 2.2, left: 3, right: 3 }, lineColor: LINE, lineWidth: 0.2, textColor: NAVY },
    columnStyles: {
      0: { cellWidth: 32, textColor: MUTED, fillColor: PARCHMENT, fontStyle: 'bold', fontSize: 8 },
      1: { cellWidth: (W - 2 * M - 64) / 2, fontStyle: 'bold' },
      2: { cellWidth: 32, textColor: MUTED, fillColor: PARCHMENT, fontStyle: 'bold', fontSize: 8 },
      3: { fontStyle: 'bold' },
    },
  });

  // ---------- Body ----------
  const summary = summarize(schema, values, true);
  let y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;

  const ensureSpace = (needed: number) => {
    if (y + needed > H - 20) {
      doc.addPage();
      y = 24;
    }
  };

  summary.forEach((step, si) => {
    ensureSpace(18);
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...NAVY);
    doc.text(t(`${si + 1}. ${step.title}`), M, y);
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.6);
    doc.line(M, y + 1.8, M + 18, y + 1.8);
    y += 5;

    for (const sec of step.sections) {
      ensureSpace(14);
      if (sec.repeatable) {
        const cols = sec.fields.filter((f) => sec.items.some((it) => it.some((r) => r.field.id === f.id && r.value)));
        autoTable(doc, {
          startY: y,
          margin: { left: M, right: M, top: 22, bottom: 18 },
          head: [
            [{ content: t(sec.title), colSpan: cols.length + 1, styles: { fillColor: NAVY, textColor: [240, 209, 158], fontSize: 9 } }],
            ['#', ...cols.map((c) => t(c.label))],
          ],
          body: sec.items.map((it, i) => [
            String(i + 1),
            ...cols.map((c) => t(it.find((r) => r.field.id === c.id)?.value ?? '')),
          ]),
          theme: 'grid',
          styles: { font: 'helvetica', fontSize: 8.2, cellPadding: 2, lineColor: LINE, lineWidth: 0.2, textColor: NAVY, overflow: 'linebreak' },
          headStyles: { fillColor: PARCHMENT, textColor: MUTED, fontStyle: 'bold', fontSize: 7.8 },
          columnStyles: { 0: { cellWidth: 7, halign: 'center', textColor: MUTED } },
        });
      } else {
        const rows = sec.rows.filter((r) => r.value);
        const body: RowInput[] = [];
        const wide = rows.filter((r) => r.field.type === 'textarea' || r.value.length > 48);
        const narrow = rows.filter((r) => !wide.includes(r));
        for (let i = 0; i < narrow.length; i += 2) {
          body.push([t(narrow[i].label), t(narrow[i].value), t(narrow[i + 1]?.label ?? ''), t(narrow[i + 1]?.value ?? '')]);
        }
        for (const r of wide) body.push([t(r.label), { content: t(r.value), colSpan: 3 }]);
        autoTable(doc, {
          startY: y,
          margin: { left: M, right: M, top: 22, bottom: 18 },
          head: [[{ content: t(sec.title), colSpan: 4 }]],
          body,
          theme: 'grid',
          styles: { font: 'helvetica', fontSize: 8.8, cellPadding: { top: 1.9, bottom: 1.9, left: 2.8, right: 2.8 }, lineColor: LINE, lineWidth: 0.2, textColor: NAVY, overflow: 'linebreak' },
          headStyles: { fillColor: NAVY, textColor: [240, 209, 158], fontStyle: 'bold', fontSize: 9 },
          columnStyles: {
            0: { cellWidth: 38, textColor: MUTED, fillColor: PARCHMENT, fontSize: 8 },
            1: { cellWidth: (W - 2 * M - 76) / 2, fontStyle: 'bold' },
            2: { cellWidth: 38, textColor: MUTED, fillColor: PARCHMENT, fontSize: 8 },
            3: { fontStyle: 'bold' },
          },
        });
      }
      y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 4;
    }
    y += 3;
  });

  // ---------- Declaration ----------
  if (meta.declarationText) {
    ensureSpace(40);
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...NAVY);
    doc.text('Declaration', M, y);
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.6);
    doc.line(M, y + 1.8, M + 18, y + 1.8);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    const lines = doc.splitTextToSize(t(meta.declarationText), W - 2 * M);
    doc.text(lines, M, y);
    y += lines.length * 4.2 + 6;
    doc.setTextColor(...NAVY);
    doc.setFont('helvetica', 'bold');
    doc.text(t(`Declared electronically by ${fullName || 'the applicant'}`), M, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...MUTED);
    doc.text(t(`on ${formatDateTime(meta.submittedAt)}`), M, y + 4.6);
  }

  // ---------- Running header / footer ----------
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    if (p > 1) {
      doc.setFillColor(...GOLD);
      doc.rect(0, 0, W, 1.6, 'F');
      if (logo) doc.addImage(logo, 'PNG', M, 6, 9, 9);
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...NAVY);
      doc.text(UNIVERSITY.name, M + (logo ? 11.5 : 0), 12);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...MUTED);
      doc.text(t(`${meta.id}  |  ${fullName}`), W - M, 12, { align: 'right' });
      doc.setDrawColor(...LINE);
      doc.setLineWidth(0.3);
      doc.line(M, 17, W - M, 17);
    }
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.line(M, H - 13, W - M, H - 13);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(...MUTED);
    doc.text(t(`RVS University  |  Recruitment  |  Application ${meta.id}  |  Confidential`), M, H - 8.5);
    doc.text(`Page ${p} of ${pages}`, W - M, H - 8.5, { align: 'right' });
  }

  doc.setProperties({
    title: t(`Application ${meta.id} - ${fullName}`),
    subject: 'Application for Employment',
    author: 'RVS University',
    creator: 'RVS University Recruitment Portal',
  });
  return doc;
}

export function pdfFileName(id: string, values: FormValues): string {
  const p = sectionData(values, 'personal') ?? {};
  const name = `${p.firstName ?? ''} ${p.lastName ?? ''}`.trim().replace(/[^A-Za-z0-9]+/g, '-');
  return `${id}${name ? `-${name}` : ''}.pdf`;
}

export async function downloadApplicationPdf(schema: Pick<FormSchema, 'steps'>, values: FormValues, meta: PdfMeta) {
  const doc = await buildApplicationPdf(schema, values, meta);
  doc.save(pdfFileName(meta.id, values));
}
