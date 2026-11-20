import type { ApplicationRecord, ApplicationStatus, ApplicationSummary, FormSchema, FormValues } from './types';

const BASE = '/hr-api';

async function parse<T>(res: Response): Promise<T> {
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    /* non-JSON */
  }
  const b = body as { ok?: boolean; error?: string } | null;
  if (!res.ok || !b || b.ok === false) {
    throw new Error(b?.error || `Request failed (${res.status})`);
  }
  return body as T;
}

export async function fetchForm(): Promise<FormSchema> {
  const res = await fetch(`${BASE}/form.php`, { cache: 'no-store' });
  return (await parse<{ schema: FormSchema }>(res)).schema;
}

export async function submitApplication(
  values: FormValues,
  files: Record<string, File>,
  honeypot: string,
): Promise<{ id: string; submittedAt: string; emailQueued: boolean }> {
  const fd = new FormData();
  fd.append('payload', JSON.stringify(values));
  fd.append('website', honeypot);
  // PHP rewrites "." in field names to "_", so send keys as f--section--index--field
  for (const [key, file] of Object.entries(files)) fd.append(`f--${key.split('.').join('--')}`, file, file.name);
  const res = await fetch(`${BASE}/submit.php`, { method: 'POST', body: fd });
  return parse(res);
}

// ---------------- Admin ----------------

export class AdminApi {
  constructor(private key: string) {}

  private async call<T>(action: string, body?: unknown): Promise<T> {
    const res = await fetch(`${BASE}/admin.php?action=${encodeURIComponent(action)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Key': this.key },
      body: JSON.stringify(body ?? {}),
      cache: 'no-store',
    });
    return parse<T>(res);
  }

  verify() {
    return this.call<{ ok: true; mailMode: string }>('verify');
  }
  getConfig() {
    return this.call<{ schema: FormSchema; history: { file: string; version: number; savedAt: string }[] }>('getConfig');
  }
  getDefault() {
    return this.call<{ schema: FormSchema }>('getDefault');
  }
  saveConfig(schema: FormSchema) {
    return this.call<{ schema: FormSchema }>('saveConfig', { schema });
  }
  restoreVersion(file: string) {
    return this.call<{ schema: FormSchema }>('restoreVersion', { file });
  }
  listApplications() {
    return this.call<{ applications: ApplicationSummary[] }>('listApplications');
  }
  getApplication(id: string) {
    return this.call<{ application: ApplicationRecord; schema: FormSchema }>('getApplication', { id });
  }
  updateApplication(id: string, patch: { status?: ApplicationStatus; notes?: string; note?: string }) {
    return this.call<{ application: ApplicationRecord }>('updateApplication', { id, ...patch });
  }
  deleteApplication(id: string) {
    return this.call<{ ok: true }>('deleteApplication', { id });
  }
  resendEmails(id: string, target: 'team' | 'applicant' | 'both') {
    return this.call<{ application: ApplicationRecord }>('resendEmails', { id, target });
  }
  exportAll() {
    return this.call<{ applications: ApplicationRecord[]; schema: FormSchema }>('exportAll');
  }
  testEmail(to: string) {
    return this.call<{ ok: true; mode: string }>('testEmail', { to });
  }

  /** The same designed PDF that is attached to the emails. */
  async downloadPdf(id: string): Promise<Blob> {
    const res = await fetch(`${BASE}/admin.php?action=pdf&id=${encodeURIComponent(id)}`, {
      headers: { 'X-Admin-Key': this.key },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Could not create PDF (${res.status})`);
    return res.blob();
  }

  async downloadFile(id: string, stored: string): Promise<Blob> {
    const res = await fetch(
      `${BASE}/admin.php?action=file&id=${encodeURIComponent(id)}&file=${encodeURIComponent(stored)}`,
      { headers: { 'X-Admin-Key': this.key }, cache: 'no-store' },
    );
    if (!res.ok) throw new Error(`Could not download file (${res.status})`);
    return res.blob();
  }
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
