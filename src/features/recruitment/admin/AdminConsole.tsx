import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, ClipboardList, Copy, ExternalLink, Eye, Inbox, ListChecks, ListTree, Loader2, Save, Settings, ShieldAlert, Undo2, XCircle } from 'lucide-react';
import { AdminApi } from '../api';
import type { FormSchema } from '../types';
import { BrandBar } from '../components/BrandBar';
import { ApplicationForm } from '../components/ApplicationForm';
import { Hero } from '../ApplicationFormPage';
import { ApplicationsTab } from './ApplicationsTab';
import { FormBuilderTab } from './FormBuilderTab';
import { ListsTab } from './ListsTab';
import { RequirementsTab } from './RequirementsTab';
import { SettingsTab } from './SettingsTab';
import { Btn, Modal } from './ui';

type Tab = 'applications' | 'builder' | 'requirements' | 'lists' | 'settings';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'applications', label: 'Applications', icon: <Inbox className="h-4 w-4" /> },
  { id: 'builder', label: 'Form Builder', icon: <ClipboardList className="h-4 w-4" /> },
  { id: 'requirements', label: 'Mandatory & Optional', icon: <ListChecks className="h-4 w-4" /> },
  { id: 'lists', label: 'Lists & Categories', icon: <ListTree className="h-4 w-4" /> },
  { id: 'settings', label: 'Email & Settings', icon: <Settings className="h-4 w-4" /> },
];

export const PUBLIC_FORM_HASH = '#careers-apply';

function keyFromHash(): string {
  const m = /^#hr-console\/([A-Za-z0-9_-]{32,128})/.exec(window.location.hash);
  return m ? m[1] : '';
}

export const AdminConsole: React.FC = () => {
  const key = useMemo(keyFromHash, []);
  const api = useMemo(() => new AdminApi(key), [key]);
  const [state, setState] = useState<'checking' | 'denied' | 'ready'>('checking');
  const [deniedMsg, setDeniedMsg] = useState('');
  const [mailMode, setMailMode] = useState('smtp');
  const [saved, setSaved] = useState<FormSchema | null>(null);
  const [draft, setDraft] = useState<FormSchema | null>(null);
  const [history, setHistory] = useState<{ file: string; version: number; savedAt: string }[]>([]);
  const [tab, setTab] = useState<Tab>(() => {
    try {
      return (sessionStorage.getItem('rvsu-hr-tab') as Tab) || 'applications';
    } catch {
      return 'applications';
    }
  });
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; msg: string; tone: 'ok' | 'err' }[]>([]);
  const toastId = useRef(0);

  const toast = useCallback((msg: string, tone: 'ok' | 'err' = 'ok') => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, msg, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), tone === 'err' ? 7000 : 3500);
  }, []);

  useEffect(() => {
    document.title = 'Recruitment Console | RVS University';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const loadConfig = useCallback(async () => {
    const r = await api.getConfig();
    setSaved(r.schema);
    setDraft(structuredClone(r.schema));
    setHistory(r.history);
  }, [api]);

  useEffect(() => {
    if (!key) {
      setState('denied');
      setDeniedMsg('This link is incomplete.');
      return;
    }
    api
      .verify()
      .then(async (r) => {
        setMailMode(r.mailMode ?? 'smtp');
        await loadConfig();
        setState('ready');
      })
      .catch((e) => {
        setState('denied');
        setDeniedMsg(e instanceof Error ? e.message : 'Access denied');
      });
  }, [api, key, loadConfig]);

  useEffect(() => {
    try {
      sessionStorage.setItem('rvsu-hr-tab', tab);
    } catch {
      /* ignore */
    }
  }, [tab]);

  const dirty = useMemo(() => !!draft && !!saved && JSON.stringify(draft) !== JSON.stringify(saved), [draft, saved]);

  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const mutate = useCallback((fn: (s: FormSchema) => void) => {
    setDraft((prev) => {
      if (!prev) return prev;
      const copy = structuredClone(prev);
      fn(copy);
      return copy;
    });
  }, []);

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const r = await api.saveConfig(draft);
      setSaved(r.schema);
      setDraft(structuredClone(r.schema));
      const h = await api.getConfig();
      setHistory(h.history);
      toast(`Saved — version ${r.schema.version} is now live`);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Save failed', 'err');
    } finally {
      setSaving(false);
    }
  };

  const publicUrl = `${window.location.origin}/${PUBLIC_FORM_HASH}`;

  if (state === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF5EB] text-[#867362]">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Opening recruitment console…
      </div>
    );
  }

  if (state === 'denied' || !draft || !saved) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FBF5EB] px-4 text-center">
        <ShieldAlert className="h-12 w-12 text-[#C6832B]" />
        <h1 className="mt-4 font-serif text-2xl font-bold text-[#1D1611]">Access denied</h1>
        <p className="mt-2 max-w-sm text-[#867362]">{deniedMsg || 'This console link is not valid.'}</p>
        <a href="#" className="mt-6 text-sm font-semibold text-[#9C6019] hover:underline">
          Go to the website
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F1E8]">
      <BrandBar
        dark
        badge="Recruitment Console"
        right={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(publicUrl).then(
                  () => toast('Public form link copied'),
                  () => toast(publicUrl),
                );
              }}
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-[#D2C3B4] transition hover:bg-white/10 hover:text-white sm:inline-flex"
            >
              <Copy className="h-4 w-4" /> Copy form link
            </button>
            <a
              href={PUBLIC_FORM_HASH}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#C6832B] px-3 py-2 text-[13px] font-semibold text-white transition hover:bg-[#B57321]"
            >
              <ExternalLink className="h-4 w-4" /> <span className="hidden sm:inline">Open live form</span>
            </a>
          </div>
        }
      />

      {/* Tabs */}
      <div className="sticky top-16 z-30 border-b border-[#EDE3D6] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center gap-1 overflow-x-auto px-4 sm:px-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`relative inline-flex h-12 shrink-0 items-center gap-2 px-3.5 text-[13.5px] font-semibold transition ${
                tab === t.id ? 'text-[#1D1611]' : 'text-[#9C8B79] hover:text-[#3B2F25]'
              }`}
            >
              {t.icon}
              {t.label}
              {tab === t.id && <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-[#C6832B]" />}
            </button>
          ))}
          <div className="ml-auto flex shrink-0 items-center gap-2 py-2 pl-3">
            {tab !== 'applications' && (
              <Btn size="sm" icon={<Eye className="h-3.5 w-3.5" />} onClick={() => setPreview(true)}>
                Preview
              </Btn>
            )}
            <span className="hidden text-[12px] text-[#9C8B79] md:inline">
              Live: v{saved.version}
            </span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1500px] px-4 py-6 pb-28 sm:px-6">
        {tab === 'applications' && <ApplicationsTab api={api} toast={toast} />}
        {tab === 'builder' && <FormBuilderTab draft={draft} saved={saved} mutate={mutate} />}
        {tab === 'requirements' && <RequirementsTab draft={draft} mutate={mutate} />}
        {tab === 'lists' && <ListsTab draft={draft} saved={saved} mutate={mutate} />}
        {tab === 'settings' && (
          <SettingsTab
            api={api}
            draft={draft}
            mutate={mutate}
            history={history}
            mailMode={mailMode}
            toast={toast}
            onRestore={async (file) => {
              try {
                const r = await api.restoreVersion(file);
                setSaved(r.schema);
                setDraft(structuredClone(r.schema));
                setHistory((await api.getConfig()).history);
                toast(`Restored — now live as version ${r.schema.version}`);
              } catch (e) {
                toast(e instanceof Error ? e.message : 'Restore failed', 'err');
              }
            }}
            onLoadDefault={async () => {
              try {
                const { schema } = await api.getDefault();
                setDraft({
                  ...schema,
                  version: draft.version,
                  updatedAt: draft.updatedAt,
                  settings: { ...schema.settings, notifyEmails: draft.settings.notifyEmails, replyTo: draft.settings.replyTo },
                });
                toast('Default form loaded into the editor — review and Save to publish');
              } catch (e) {
                toast(e instanceof Error ? e.message : 'Could not load default', 'err');
              }
            }}
          />
        )}
      </main>

      {/* Unsaved changes bar */}
      {dirty && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#EDE3D6] bg-white/95 shadow-[0_-8px_30px_-12px_rgba(29,22,17,0.25)] backdrop-blur">
          <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <span className="flex items-center gap-2 text-[13.5px] font-semibold text-[#7E4B11]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#C6832B]" /> You have unsaved changes to the form
            </span>
            <div className="flex gap-2">
              <Btn icon={<Eye className="h-4 w-4" />} onClick={() => setPreview(true)}>
                Preview
              </Btn>
              <Btn icon={<Undo2 className="h-4 w-4" />} onClick={() => setDraft(structuredClone(saved))} disabled={saving}>
                Discard
              </Btn>
              <Btn variant="gold" icon={saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} onClick={save} disabled={saving}>
                Save & publish
              </Btn>
            </div>
          </div>
        </div>
      )}

      <Modal open={preview} onClose={() => setPreview(false)} wide title={<span>Preview {dirty && <span className="ml-1 text-[12px] font-semibold text-[#B57321]">(unsaved changes)</span>}</span>}>
        <div className="bg-[#FBF5EB]">
          <Hero schema={draft} compact />
          <ApplicationForm key={JSON.stringify(draft).length} schema={draft} preview />
        </div>
      </Modal>

      {/* Toasts */}
      <div className="pointer-events-none fixed right-4 top-20 z-[200] flex w-[min(380px,calc(100vw-32px))] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-2.5 rounded-xl border bg-white px-4 py-3 text-[13.5px] font-medium shadow-lg ${
              t.tone === 'err' ? 'border-rose-200 text-rose-700' : 'border-emerald-200 text-[#1D1611]'
            }`}
          >
            {t.tone === 'err' ? <XCircle className="mt-0.5 h-4 w-4 shrink-0" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />}
            <span className="break-words">{t.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminConsole;
