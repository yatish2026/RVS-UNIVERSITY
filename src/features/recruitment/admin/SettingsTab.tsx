import React, { useState } from 'react';
import { History, Loader2, Mail, RotateCcw, Send } from 'lucide-react';
import type { AdminApi } from '../api';
import { formatDateTime } from '../engine';
import type { FormSchema, FormSettings } from '../types';
import { Btn, Card, ChipsInput, Field, TextArea, TextIn, Toggle } from './ui';

type Mutate = (fn: (s: FormSchema) => void) => void;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const SettingsTab: React.FC<{
  api: AdminApi;
  draft: FormSchema;
  mutate: Mutate;
  history: { file: string; version: number; savedAt: string }[];
  onRestore: (file: string) => Promise<void>;
  onLoadDefault: () => Promise<void>;
  mailMode: string;
  toast: (m: string, tone?: 'ok' | 'err') => void;
}> = ({ api, draft, mutate, history, onRestore, onLoadDefault, mailMode, toast }) => {
  const s = draft.settings;
  const set = <K extends keyof FormSettings>(k: K, v: FormSettings[K]) => mutate((x) => void (x.settings[k] = v));
  const [testTo, setTestTo] = useState('');
  const [testing, setTesting] = useState(false);
  const [restoring, setRestoring] = useState<string | null>(null);

  const sendTest = async () => {
    setTesting(true);
    try {
      const r = await api.testEmail(testTo.trim());
      toast(r.mode === 'log' ? 'Test email written to the local outbox (log mode)' : `Test email sent to ${testTo}`);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not send test email', 'err');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card title={<span className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#B57321]" /> Email notifications</span>} className="lg:col-span-2">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <Field label="Send every new application to" hint="(press Enter after each address)">
              <ChipsInput
                values={s.notifyEmails}
                onChange={(v) => set('notifyEmails', v)}
                placeholder="hr@rvsu.org, principal@rvsu.org"
                validate={(v) => (EMAIL_RE.test(v) ? null : `“${v}” is not a valid email`)}
              />
            </Field>
            {s.notifyEmails.length === 0 && (
              <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12.5px] text-amber-800">
                No recipients yet — the team will not get emails for new applications until you add at least one address and save.
              </p>
            )}
            <Toggle
              checked={s.attachFilesToEmail}
              onChange={(v) => set('attachFilesToEmail', v)}
              label="Attach uploaded files (resume, photo…) to the team email"
              description="Files over 15 MB in total are skipped; they stay downloadable here."
            />
            <Toggle checked={s.sendApplicantCopy} onChange={(v) => set('sendApplicantCopy', v)} label="Send the applicant a copy of their application" />
          </div>
          <div className="space-y-4">
            <Field label="Sender name" hint="(shown as “From”)">
              <TextIn value={s.senderName} onChange={(e) => set('senderName', e.target.value)} />
            </Field>
            <Field label="Reply-to address for applicants" hint="(optional; defaults to the first recipient)">
              <TextIn type="email" value={s.replyTo} onChange={(e) => set('replyTo', e.target.value.trim())} placeholder="careers@rvsu.org" />
            </Field>
            <Field label="Message in the applicant’s email">
              <TextArea rows={4} value={s.applicantEmailMessage} onChange={(e) => set('applicantEmailMessage', e.target.value)} />
            </Field>
            <div>
              <Field label="Send a test email">
                <div className="flex gap-2">
                  <TextIn type="email" value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="you@rvsu.org" />
                  <Btn icon={testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} onClick={sendTest} disabled={testing || !EMAIL_RE.test(testTo.trim())}>
                    Send
                  </Btn>
                </div>
              </Field>
              {mailMode === 'log' && <p className="mt-1 text-[12px] text-[#9C6019]">Local mode: emails are saved to the outbox folder, not sent.</p>}
            </div>
          </div>
        </div>
      </Card>

      <Card title="Form page">
        <div className="space-y-4">
          <Toggle
            checked={s.acceptingApplications}
            onChange={(v) => set('acceptingApplications', v)}
            label="Accepting applications"
            description="Turn off to close the form temporarily."
          />
          {!s.acceptingApplications && (
            <Field label="Message shown while closed">
              <TextArea value={s.closedMessage} onChange={(e) => set('closedMessage', e.target.value)} />
            </Field>
          )}
          <Field label="Badge text">
            <TextIn value={s.formTitle} onChange={(e) => set('formTitle', e.target.value)} />
          </Field>
          <Field label="Main heading">
            <TextIn value={s.formSubtitle} onChange={(e) => set('formSubtitle', e.target.value)} />
          </Field>
          <Field label="Introduction">
            <TextArea value={s.intro} onChange={(e) => set('intro', e.target.value)} />
          </Field>
        </div>
      </Card>

      <Card title="Submission">
        <div className="space-y-4">
          <Field label="Declaration (applicant must accept)">
            <TextArea rows={4} value={s.declarationText} onChange={(e) => set('declarationText', e.target.value)} />
          </Field>
          <Field label="Message after submitting">
            <TextArea value={s.successMessage} onChange={(e) => set('successMessage', e.target.value)} />
          </Field>
          <Field label="Application ID prefix" hint="(e.g. RVSU-REC → RVSU-REC-2026-0001)">
            <TextIn value={s.idPrefix} onChange={(e) => set('idPrefix', e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ''))} />
          </Field>
        </div>
      </Card>

      <Card title={<span className="flex items-center gap-2"><History className="h-4 w-4 text-[#B57321]" /> Version history</span>} className="lg:col-span-2">
        <p className="mb-3 text-[13px] text-[#867362]">
          Every save creates a version. Restoring a version publishes it again as a new version. Old applications always keep the version they were submitted with.
        </p>
        <div className="flex flex-wrap gap-2">
          {history.map((h) => (
            <div key={h.file} className="flex items-center gap-2 rounded-xl border border-[#EDE3D6] bg-[#FDFAF5] py-1.5 pl-3 pr-1.5 text-[12.5px]">
              <span className="font-bold text-[#1D1611]">v{h.version}</span>
              <span className="text-[#9C8B79]">{h.savedAt ? formatDateTime(h.savedAt) : ''}</span>
              {h.version !== draft.version && (
                <Btn
                  size="sm"
                  variant="ghost"
                  icon={restoring === h.file ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
                  disabled={!!restoring}
                  onClick={async () => {
                    if (!confirm(`Publish version ${h.version} again? Your current unsaved changes will be lost.`)) return;
                    setRestoring(h.file);
                    try {
                      await onRestore(h.file);
                    } finally {
                      setRestoring(null);
                    }
                  }}
                >
                  Restore
                </Btn>
              )}
              {h.version === draft.version && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">live</span>}
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-[#F3ECE0] pt-4">
          <Btn
            variant="danger"
            icon={<RotateCcw className="h-4 w-4" />}
            onClick={async () => {
              if (!confirm('Load the original default form into the editor? You can review it and then Save to publish.')) return;
              await onLoadDefault();
            }}
          >
            Load factory default form
          </Btn>
        </div>
      </Card>
    </div>
  );
};
