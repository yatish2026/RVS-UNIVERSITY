import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Download,
  Eye,
  FileDown,
  FileSpreadsheet,
  FileText,
  Inbox,
  Loader2,
  Mail,
  MailCheck,
  MailX,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-react';
import type { AdminApi } from '../api';
import { saveBlob } from '../api';
import { displayValue, formatDateTime, isFileMeta, sectionData, summarize } from '../engine';
import type { ApplicationRecord, ApplicationStatus, ApplicationSummary, FieldDef, FileMeta, FormSchema, SectionValues } from '../types';
import { APPLICATION_STATUSES } from '../types';
import { Btn, Card, IconBtn, Modal, Select, StatusBadge, TextArea, TextIn } from './ui';

interface Props {
  api: AdminApi;
  toast: (msg: string, tone?: 'ok' | 'err') => void;
}

const csvCell = (v: unknown) => {
  const s = String(v ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function buildCsv(apps: ApplicationRecord[], schema: FormSchema): string {
  const cols: { header: string; get: (a: ApplicationRecord) => string }[] = [
    { header: 'Application ID', get: (a) => a.id },
    { header: 'Submitted', get: (a) => formatDateTime(a.submittedAt) },
    { header: 'Status', get: (a) => a.status },
  ];
  for (const step of schema.steps)
    for (const sec of step.sections) {
      if (sec.repeatable) {
        cols.push({
          header: sec.title,
          get: (a) =>
            ((a.data[sec.id] as SectionValues[] | undefined) ?? [])
              .map(
                (it, i) =>
                  `${sec.itemLabel ?? 'Item'} ${i + 1}: ` +
                  sec.fields
                    .map((f) => [f.label, displayValue(f, it[f.id])])
                    .filter(([, v]) => v)
                    .map(([l, v]) => `${l}: ${v}`)
                    .join(', '),
              )
              .join(' | '),
        });
      } else {
        for (const f of sec.fields)
          cols.push({
            header: `${sec.title} - ${f.label}`,
            get: (a) => displayValue(f as FieldDef, sectionData(a.data, sec.id)?.[f.id]),
          });
      }
    }
  const rows = [cols.map((c) => csvCell(c.header)).join(',')];
  for (const a of apps) rows.push(cols.map((c) => csvCell(c.get(a))).join(','));
  return '﻿' + rows.join('\r\n');
}

export const ApplicationsTab: React.FC<Props> = ({ api, toast }) => {
  const [apps, setApps] = useState<ApplicationSummary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [postType, setPostType] = useState('');
  const [dept, setDept] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setApps((await api.listApplications()).applications);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not load applications', 'err');
    } finally {
      setLoading(false);
    }
  }, [api, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const departments = useMemo(() => Array.from(new Set((apps ?? []).map((a) => a.department).filter(Boolean))).sort(), [apps]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return (apps ?? []).filter(
      (a) =>
        (!status || a.status === status) &&
        (!postType || a.postType === postType) &&
        (!dept || a.department === dept) &&
        (!needle || [a.id, a.name, a.email, a.mobile, a.designation, a.department].some((x) => (x ?? '').toLowerCase().includes(needle))),
    );
  }, [apps, q, status, postType, dept]);

  const count = (s: ApplicationStatus) => (apps ?? []).filter((a) => a.status === s).length;
  const stats = [
    { label: 'Total applications', value: apps?.length ?? 0, tone: 'text-[#1D1611]' },
    { label: 'New', value: count('New'), tone: 'text-sky-700' },
    { label: 'Shortlisted / Interview', value: count('Shortlisted') + count('Interview'), tone: 'text-violet-700' },
    { label: 'Selected', value: count('Selected'), tone: 'text-emerald-700' },
    { label: 'Teaching · Non Teaching', value: `${(apps ?? []).filter((a) => a.postType === 'Teaching').length} · ${(apps ?? []).filter((a) => a.postType === 'Non Teaching').length}`, tone: 'text-[#B57321]' },
  ];

  const exportCsv = async () => {
    setExporting(true);
    try {
      const { applications, schema } = await api.exportAll();
      const ids = new Set(filtered.map((a) => a.id));
      const rows = applications.filter((a) => ids.has(a.id));
      saveBlob(new Blob([buildCsv(rows, schema)], { type: 'text/csv;charset=utf-8' }), `rvsu-applications-${new Date().toISOString().slice(0, 10)}.csv`);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Export failed', 'err');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[#EDE3D6] bg-white px-4 py-3.5 shadow-sm">
            <div className={`text-2xl font-bold ${s.tone}`}>{s.value}</div>
            <div className="mt-0.5 text-[12px] font-medium text-[#867362]">{s.label}</div>
          </div>
        ))}
      </div>

      <Card
        pad={false}
        title={
          <span className="flex items-center gap-2">
            Applications <span className="rounded-full bg-[#F3ECE0] px-2 py-0.5 text-[12px] text-[#6B5A4B]">{filtered.length}</span>
          </span>
        }
        actions={
          <>
            <Btn size="sm" icon={exporting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FileSpreadsheet className="h-3.5 w-3.5" />} onClick={exportCsv} disabled={!filtered.length || exporting}>
              Export CSV
            </Btn>
            <Btn size="sm" icon={<RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />} onClick={load}>
              Refresh
            </Btn>
          </>
        }
      >
        <div className="grid gap-2.5 border-b border-[#F3ECE0] p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AD9A88]" />
            <TextIn value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, mobile, ID…" className="pl-9" />
          </div>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            {APPLICATION_STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
          <Select value={postType} onChange={(e) => setPostType(e.target.value)}>
            <option value="">All post types</option>
            <option>Teaching</option>
            <option>Non Teaching</option>
          </Select>
          <Select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="">All departments</option>
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </Select>
        </div>

        {apps === null ? (
          <div className="flex items-center justify-center py-16 text-[#867362]">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-[#867362]">
            <Inbox className="mb-3 h-10 w-10 text-[#D4BC9F]" />
            <p className="font-semibold text-[#3B2F25]">{apps.length ? 'No applications match your filters' : 'No applications yet'}</p>
            <p className="mt-1 text-[13px]">{apps.length ? 'Try clearing the search or filters.' : 'New submissions will appear here.'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-[13.5px]">
              <thead className="bg-[#FDFAF5] text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#9C8B79]">
                <tr>
                  <th className="px-4 py-2.5">Applicant</th>
                  <th className="px-4 py-2.5">Position</th>
                  <th className="px-4 py-2.5">Post</th>
                  <th className="px-4 py-2.5">Submitted</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F6F0E7]">
                {filtered.map((a) => (
                  <tr key={a.id} className="cursor-pointer transition hover:bg-[#FDFAF5]" onClick={() => setOpenId(a.id)}>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#1D1611]">{a.name || '—'}</div>
                      <div className="text-[12px] text-[#867362]">
                        {a.id} · {a.mobile}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#1D1611]">{a.designation}</div>
                      <div className="max-w-[260px] truncate text-[12px] text-[#867362]">{a.department}</div>
                    </td>
                    <td className="px-4 py-3 text-[#4D3D30]">
                      {a.postType}
                      <div className="text-[12px] text-[#867362]">{a.jobNature}</div>
                    </td>
                    <td className="px-4 py-3 text-[#4D3D30]">{formatDateTime(a.submittedAt)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="inline-flex items-center gap-1">
                        {a.hasResume && <FileText className="mr-1 h-4 w-4 text-[#C2B09C]" aria-label="Resume attached" />}
                        <IconBtn label="Open" onClick={() => setOpenId(a.id)}>
                          <Eye className="h-4 w-4" />
                        </IconBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {openId && (
        <ApplicationDetail
          api={api}
          id={openId}
          toast={toast}
          onClose={() => setOpenId(null)}
          onChanged={(s) => setApps((prev) => (prev ?? []).map((a) => (a.id === s.id ? { ...a, ...s } : a)))}
          onDeleted={(id) => {
            setApps((prev) => (prev ?? []).filter((a) => a.id !== id));
            setOpenId(null);
          }}
        />
      )}
    </div>
  );
};

// ------------------------------------------------------------------ detail

const ApplicationDetail: React.FC<{
  api: AdminApi;
  id: string;
  toast: Props['toast'];
  onClose: () => void;
  onChanged: (s: ApplicationSummary) => void;
  onDeleted: (id: string) => void;
}> = ({ api, id, toast, onClose, onChanged, onDeleted }) => {
  const [app, setApp] = useState<ApplicationRecord | null>(null);
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    api
      .getApplication(id)
      .then((r) => {
        setApp(r.application);
        setSchema(r.schema);
        setNotes(r.application.notes ?? '');
      })
      .catch((e) => {
        toast(e instanceof Error ? e.message : 'Could not open application', 'err');
        onClose();
      });
  }, [api, id, toast, onClose]);

  const files = useMemo(() => {
    if (!app || !schema) return [] as { label: string; meta: FileMeta }[];
    const out: { label: string; meta: FileMeta }[] = [];
    for (const step of schema.steps)
      for (const sec of step.sections)
        for (const f of sec.fields) {
          if (f.type !== 'file') continue;
          const raw = app.data[sec.id];
          const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
          items.forEach((it, i) => {
            const v = it?.[f.id];
            if (isFileMeta(v) && v.stored) out.push({ label: items.length > 1 ? `${f.label} ${i + 1}` : f.label, meta: v });
          });
        }
    return out;
  }, [app, schema]);

  const update = async (patch: { status?: ApplicationStatus; notes?: string }) => {
    if (!app) return;
    setBusy(patch.status ? 'status' : 'notes');
    try {
      const r = await api.updateApplication(app.id, patch);
      setApp(r.application);
      onChanged(r.application);
      toast(patch.status ? `Status changed to ${patch.status}` : 'Notes saved');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Update failed', 'err');
    } finally {
      setBusy(null);
    }
  };

  const downloadPdf = async () => {
    if (!app || !schema) return;
    setBusy('pdf');
    try {
      const photo = sectionData(app.data, 'personal')?.photo;
      let photoDataUrl: string | null = null;
      const { downloadApplicationPdf, blobToDataUrl } = await import('../pdf');
      if (isFileMeta(photo) && photo.stored) {
        try {
          photoDataUrl = await blobToDataUrl(await api.downloadFile(app.id, photo.stored));
        } catch {
          photoDataUrl = null;
        }
      }
      await downloadApplicationPdf(schema, app.data, {
        id: app.id,
        submittedAt: app.submittedAt,
        status: app.status,
        photoDataUrl,
        declarationText: schema.settings.declarationText,
      });
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not create PDF', 'err');
    } finally {
      setBusy(null);
    }
  };

  const downloadFile = async (meta: FileMeta) => {
    if (!app || !meta.stored) return;
    try {
      saveBlob(await api.downloadFile(app.id, meta.stored), meta.name);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Download failed', 'err');
    }
  };

  const resend = async (target: 'team' | 'applicant') => {
    if (!app) return;
    setBusy(`mail-${target}`);
    try {
      const r = await api.resendEmails(app.id, target);
      setApp(r.application);
      const last = r.application.emailLog[r.application.emailLog.length - 1];
      toast(last?.ok ? `Email sent to ${last.to}` : `Email failed: ${last?.error ?? 'unknown error'}`, last?.ok ? 'ok' : 'err');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not send', 'err');
    } finally {
      setBusy(null);
    }
  };

  const remove = async () => {
    if (!app) return;
    setBusy('delete');
    try {
      await api.deleteApplication(app.id);
      toast('Application deleted');
      onDeleted(app.id);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Delete failed', 'err');
      setBusy(null);
    }
  };

  const summary = app && schema ? summarize(schema, app.data, true) : [];

  return (
    <Modal
      open
      wide
      onClose={onClose}
      title={
        app ? (
          <span className="flex flex-wrap items-center gap-2">
            {app.name} <span className="font-mono text-[12.5px] font-semibold text-[#B57321]">{app.id}</span>
            <StatusBadge status={app.status} />
          </span>
        ) : (
          'Loading…'
        )
      }
    >
      {!app || !schema ? (
        <div className="flex items-center justify-center py-20 text-[#867362]">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading application…
        </div>
      ) : (
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4 p-5">
            <div className="flex flex-wrap gap-2">
              <Btn variant="primary" icon={busy === 'pdf' ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />} onClick={downloadPdf} disabled={!!busy}>
                Download PDF
              </Btn>
              <Btn icon={busy === 'mail-team' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />} onClick={() => resend('team')} disabled={!!busy}>
                Resend to team
              </Btn>
              <Btn icon={busy === 'mail-applicant' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />} onClick={() => resend('applicant')} disabled={!!busy}>
                Resend applicant copy
              </Btn>
            </div>
            {summary.map((st) => (
              <div key={st.id} className="overflow-hidden rounded-xl border border-[#EDE3D6]">
                <div className="bg-[#1D1611] px-4 py-2 text-[13px] font-bold text-[#F0D19E]">{st.title}</div>
                <div className="divide-y divide-[#F6F0E7]">
                  {st.sections.map((sec) => (
                    <div key={sec.id} className="px-4 py-3">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#B57321]">{sec.title}</p>
                      {sec.repeatable ? (
                        <div className="space-y-2">
                          {sec.items.map((it, i) => (
                            <div key={i} className="rounded-lg bg-[#FDFAF5] p-2.5">
                              <dl className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
                                {it.filter((r) => r.value).map((r) => (
                                  <div key={r.label} className="flex gap-1.5 text-[13px]">
                                    <dt className="shrink-0 text-[#9C8B79]">{r.label}:</dt>
                                    <dd className="font-medium text-[#1D1611]">{r.value}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <dl className="grid gap-x-5 gap-y-2 sm:grid-cols-2 xl:grid-cols-3">
                          {sec.rows.filter((r) => r.value).map((r) => (
                            <div key={r.label} className={r.field.type === 'textarea' ? 'sm:col-span-2 xl:col-span-3' : ''}>
                              <dt className="text-[11.5px] text-[#9C8B79]">{r.label}</dt>
                              <dd className="whitespace-pre-wrap break-words text-[13.5px] font-semibold text-[#1D1611]">{r.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-4 border-t border-[#F3ECE0] bg-[#FDFAF5] p-5 lg:border-l lg:border-t-0">
            <div>
              <p className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#9C8B79]">Status</p>
              <Select value={app.status} disabled={busy === 'status'} onChange={(e) => update({ status: e.target.value as ApplicationStatus })}>
                {APPLICATION_STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </div>

            <div className="space-y-1 text-[13px]">
              <p>
                <span className="text-[#9C8B79]">Email: </span>
                <a className="font-semibold text-[#9C6019] hover:underline" href={`mailto:${app.email}`}>
                  {app.email}
                </a>
              </p>
              <p>
                <span className="text-[#9C8B79]">Mobile: </span>
                <a className="font-semibold text-[#9C6019] hover:underline" href={`tel:${app.mobile}`}>
                  {app.mobile}
                </a>
              </p>
              <p>
                <span className="text-[#9C8B79]">Submitted: </span>
                <span className="font-semibold text-[#1D1611]">{formatDateTime(app.submittedAt)}</span>
              </p>
            </div>

            <div>
              <p className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#9C8B79]">Attachments</p>
              {files.length ? (
                <div className="space-y-1.5">
                  {files.map((f) => (
                    <button
                      key={f.meta.stored}
                      type="button"
                      onClick={() => downloadFile(f.meta)}
                      className="flex w-full items-center gap-2.5 rounded-lg border border-[#EDE3D6] bg-white px-3 py-2 text-left transition hover:border-[#C6832B]"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-[#B57321]" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11.5px] text-[#9C8B79]">{f.label}</span>
                        <span className="block truncate text-[13px] font-semibold text-[#1D1611]">{f.meta.name}</span>
                      </span>
                      <Download className="h-4 w-4 shrink-0 text-[#AD9A88]" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-[#9C8B79]">No files uploaded.</p>
              )}
            </div>

            <div>
              <p className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#9C8B79]">Internal notes</p>
              <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Visible only to the recruitment team" />
              <Btn size="sm" className="mt-2" onClick={() => update({ notes })} disabled={busy === 'notes' || notes === (app.notes ?? '')}>
                Save notes
              </Btn>
            </div>

            <div>
              <p className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#9C8B79]">History</p>
              <ol className="space-y-2 border-l-2 border-[#EDE3D6] pl-3">
                {[...(app.history ?? [])].reverse().map((h, i) => (
                  <li key={i} className="text-[12.5px]">
                    <span className="font-semibold text-[#1D1611]">{h.status}</span>
                    <span className="text-[#9C8B79]"> · {formatDateTime(h.at)}</span>
                    {h.note && <div className="text-[#867362]">{h.note}</div>}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-[#9C8B79]">Email log</p>
              {app.emailLog?.length ? (
                <ul className="space-y-1.5">
                  {[...app.emailLog].reverse().map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12.5px]">
                      {m.ok ? <MailCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" /> : <MailX className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-600" />}
                      <span>
                        <span className="font-semibold text-[#1D1611]">{m.kind === 'team' ? 'Team' : 'Applicant'}</span>
                        <span className="text-[#9C8B79]"> · {formatDateTime(m.at)}</span>
                        <span className="block break-all text-[#867362]">{m.to || '—'}</span>
                        {m.error && <span className="block text-rose-600">{m.error}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13px] text-[#9C8B79]">Emails are being sent… refresh in a moment.</p>
              )}
            </div>

            <div className="border-t border-[#EDE3D6] pt-4">
              {confirmDelete ? (
                <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-[12.5px] text-rose-700">
                  Delete this application and its files permanently?
                  <div className="mt-2 flex gap-2">
                    <Btn size="sm" variant="danger" onClick={remove} disabled={busy === 'delete'}>
                      Yes, delete
                    </Btn>
                    <Btn size="sm" onClick={() => setConfirmDelete(false)}>
                      Cancel
                    </Btn>
                  </div>
                </div>
              ) : (
                <Btn size="sm" variant="danger" icon={<Trash2 className="h-3.5 w-3.5" />} onClick={() => setConfirmDelete(true)}>
                  Delete application
                </Btn>
              )}
            </div>
          </aside>
        </div>
      )}
    </Modal>
  );
};
