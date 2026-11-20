import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Loader2,
  Pencil,
  Plus,
  RotateCcw,
  Send,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import type { FieldValue, FileMeta, FormSchema, FormValues, SectionDef, SectionValues, StepDef } from '../types';
import {
  cleanValues,
  defaultsFor,
  fieldKey,
  initialValues,
  isFieldVisible,
  isFileMeta,
  isSectionVisible,
  resolveOptions,
  sectionData,
  summarize,
  validateField,
  validateStep,
  visibleSteps,
  widthClass,
} from '../engine';
import { submitApplication } from '../api';
import { FieldInput } from './FieldInput';

const DRAFT_KEY = 'rvsu-careers-draft-v1';
const REVIEW_ID = '__review';

interface Props {
  schema: FormSchema;
  /** Preview mode (admin): no draft saving, submit disabled. */
  preview?: boolean;
}

interface Draft {
  values: FormValues;
  stepId: string;
  savedAt: string;
  version: number;
}

function stripFiles(values: FormValues): FormValues {
  const strip = (s: SectionValues) => Object.fromEntries(Object.entries(s).filter(([, v]) => !isFileMeta(v)));
  return Object.fromEntries(
    Object.entries(values).map(([k, v]) => [k, Array.isArray(v) ? v.map(strip) : strip(v)]),
  ) as FormValues;
}

function readDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

function writeDraft(d: Draft | null) {
  try {
    if (d) localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    else localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* storage unavailable */
  }
}

function mergeDraft(schema: FormSchema, draft: FormValues): FormValues {
  const base = initialValues(schema);
  for (const key of Object.keys(base)) {
    const d = draft[key];
    if (d === undefined) continue;
    if (Array.isArray(base[key]) && Array.isArray(d)) base[key] = d;
    else if (!Array.isArray(base[key]) && d && !Array.isArray(d)) base[key] = { ...(base[key] as SectionValues), ...d };
  }
  return base;
}

const timeAgo = (iso: string) => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const h = Math.round(mins / 60);
  return h < 24 ? `${h} hr ago` : `${Math.round(h / 24)} day(s) ago`;
};

export const ApplicationForm: React.FC<Props> = ({ schema, preview = false }) => {
  const [values, setValues] = useState<FormValues>(() => initialValues(schema));
  const [files, setFiles] = useState<Record<string, File>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stepId, setStepId] = useState<string>(() => schema.steps.find((s) => !s.hidden)?.id ?? REVIEW_ID);
  const [restoredAt, setRestoredAt] = useState<string | null>(null);
  const [declared, setDeclared] = useState(false);
  const [declError, setDeclError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{ id: string; submittedAt: string; values: FormValues } | null>(null);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const topRef = useRef<HTMLDivElement>(null);

  // Restore draft once
  useEffect(() => {
    if (preview) return;
    const d = readDraft();
    if (d && d.values) {
      setValues(mergeDraft(schema, d.values));
      if (d.stepId) setStepId(d.stepId);
      setRestoredAt(d.savedAt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave draft
  useEffect(() => {
    if (preview || result) return;
    const t = setTimeout(
      () => writeDraft({ values: stripFiles(values), stepId, savedAt: new Date().toISOString(), version: schema.version }),
      400,
    );
    return () => clearTimeout(t);
  }, [values, stepId, preview, result, schema.version]);

  const steps = useMemo(() => visibleSteps(schema, values), [schema, values]);
  const allIds = [...steps.map((s) => s.id), REVIEW_ID];
  const currentIndex = Math.max(0, allIds.indexOf(stepId));
  const currentStep: StepDef | undefined = steps.find((s) => s.id === stepId);
  const isReview = stepId === REVIEW_ID || !currentStep;
  const progress = Math.round((currentIndex / (allIds.length - 1 || 1)) * 100);

  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  // If the current step became hidden (e.g. post type changed), fall back to the first step.
  useEffect(() => {
    if (stepId !== REVIEW_ID && !steps.some((s) => s.id === stepId)) setStepId(steps[0]?.id ?? REVIEW_ID);
  }, [steps, stepId]);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const goTo = (id: string) => {
    setStepId(id);
    setSubmitError(null);
    requestAnimationFrame(scrollTop);
  };

  const setField = useCallback(
    (section: SectionDef, index: number | null, fieldId: string, v: FieldValue, file?: File | null) => {
      const key = fieldKey(section.id, index, fieldId);
      setValues((prev) => {
        const next: FormValues = { ...prev };
        const update = (item: SectionValues): SectionValues => {
          const it: SectionValues = { ...item, [fieldId]: v };
          // Clear dependent selects whose filter source changed
          for (const f of section.fields) {
            if (f.filterBy?.field === fieldId && !f.filterBy.section && it[f.id]) {
              const { options } = resolveOptions(f, schema, it, next);
              if (!options.some((o) => o.label === it[f.id])) it[f.id] = '';
            }
          }
          return it;
        };
        if (index === null) next[section.id] = update(sectionData(prev, section.id) ?? {});
        else {
          const arr = [...((prev[section.id] as SectionValues[]) ?? [])];
          arr[index] = update(arr[index] ?? {});
          next[section.id] = arr;
        }
        return next;
      });
      if (file !== undefined) {
        setFiles((prev) => {
          const n = { ...prev };
          if (file) n[key] = file;
          else delete n[key];
          return n;
        });
      }
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const field = section.fields.find((f) => f.id === fieldId);
        const err = field ? validateField(field, v) : null;
        const n = { ...prev };
        if (err) n[key] = err;
        else delete n[key];
        return n;
      });
    },
    [schema],
  );

  const addItem = (section: SectionDef) =>
    setValues((prev) => ({ ...prev, [section.id]: [...((prev[section.id] as SectionValues[]) ?? []), defaultsFor(section)] }));

  const removeItem = (section: SectionDef, index: number) => {
    setValues((prev) => ({
      ...prev,
      [section.id]: ((prev[section.id] as SectionValues[]) ?? []).filter((_, i) => i !== index),
    }));
    setFiles((prev) => {
      const n: Record<string, File> = {};
      for (const [k, f] of Object.entries(prev)) {
        const [sid, idx, fid] = k.split('.');
        if (sid !== section.id || idx === '_') n[k] = f;
        else if (Number(idx) < index) n[k] = f;
        else if (Number(idx) > index) n[fieldKey(sid, Number(idx) - 1, fid)] = f;
      }
      return n;
    });
    setErrors({});
  };

  const focusFirstError = (errs: Record<string, string>) => {
    const first = Object.keys(errs)[0];
    if (!first) return;
    requestAnimationFrame(() => {
      const el = document.querySelector(`[data-fkey="${CSS.escape(first)}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = el?.querySelector('input,select,textarea,button') as HTMLElement | null;
      input?.focus({ preventScroll: true });
    });
  };

  const validateCurrent = (): boolean => {
    if (!currentStep) return true;
    const errs = validateStep(currentStep, schema, values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateCurrent()) return;
    if (currentStep) setCompleted((c) => ({ ...c, [currentStep.id]: true }));
    goTo(allIds[Math.min(currentIndex + 1, allIds.length - 1)]);
  };
  const back = () => goTo(allIds[Math.max(currentIndex - 1, 0)]);

  const canJumpTo = (i: number) => i <= currentIndex || allIds.slice(0, i).every((id) => completed[id]);

  const submit = async () => {
    if (preview) return;
    // Validate every step, jump to the first one with problems
    for (const s of steps) {
      const errs = validateStep(s, schema, values);
      if (Object.keys(errs).length) {
        setErrors(errs);
        setStepId(s.id);
        focusFirstError(errs);
        return;
      }
    }
    if (!declared) {
      setDeclError(true);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const cleaned = cleanValues(schema, values);
      const sendFiles: Record<string, File> = {};
      for (const [k, f] of Object.entries(files)) {
        const [sid, idx, fid] = k.split('.');
        const sec = cleaned[sid];
        const item = Array.isArray(sec) ? sec[Number(idx)] : sec;
        if (item && isFileMeta(item[fid])) sendFiles[k] = f;
      }
      const res = await submitApplication(cleaned, sendFiles, honeypot);
      writeDraft(null);
      setResult({ id: res.id, submittedAt: res.submittedAt, values: cleaned });
      requestAnimationFrame(scrollTop);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const startOver = () => {
    writeDraft(null);
    setValues(initialValues(schema));
    setFiles({});
    setErrors({});
    setCompleted({});
    setRestoredAt(null);
    setDeclared(false);
    goTo(schema.steps.find((s) => !s.hidden)?.id ?? REVIEW_ID);
  };

  const downloadCopy = async () => {
    if (!result) return;
    setPdfBusy(true);
    try {
      const photoKey = Object.keys(files).find((k) => k.endsWith('.photo'));
      const photo = photoKey ? files[photoKey] : undefined;
      const { downloadApplicationPdf, fileToDataUrl } = await import('../pdf');
      await downloadApplicationPdf(schema, result.values, {
        id: result.id,
        submittedAt: result.submittedAt,
        photoDataUrl: photo ? await fileToDataUrl(photo) : null,
        declarationText: schema.settings.declarationText,
      });
    } finally {
      setPdfBusy(false);
    }
  };

  // ---------------------------------------------------------------- Success
  if (result) {
    const personal = sectionData(result.values, 'personal') ?? {};
    return (
      <div ref={topRef} className="mx-auto max-w-2xl scroll-mt-24 px-4 py-14 text-center sm:py-20">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
          <CheckCircle2 className="h-11 w-11 text-emerald-600" />
        </div>
        <h2 className="mt-7 font-serif text-3xl font-bold text-[#1D1611] sm:text-4xl">Application submitted</h2>
        <p className="mx-auto mt-3 max-w-lg text-[15.5px] leading-relaxed text-[#6B5A4B]">
          Thank you{personal.firstName ? `, ${String(personal.firstName)}` : ''}. {schema.settings.successMessage}
        </p>
        <div className="mx-auto mt-8 inline-flex flex-col items-center rounded-2xl border border-[#E8DED3] bg-white px-8 py-5 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9C8B79]">Your application ID</span>
          <span className="mt-1 font-mono text-2xl font-bold tracking-wide text-[#B57321]">{result.id}</span>
          <span className="mt-1 text-xs text-[#9C8B79]">Please quote this ID in any communication.</span>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={downloadCopy}
            disabled={pdfBusy}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#1D1611] px-6 text-[14.5px] font-semibold text-white shadow-lg shadow-black/10 transition hover:bg-[#322820] disabled:opacity-60"
          >
            {pdfBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Download a copy (PDF)
          </button>
          <a
            href="#"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#E3D6C6] bg-white px-6 text-[14.5px] font-semibold text-[#3B2F25] transition hover:border-[#C6832B]"
          >
            Visit RVS University website
          </a>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- Form
  const renderSectionFields = (section: SectionDef, item: SectionValues | undefined, index: number | null) => (
    <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-12">
      {section.fields.map((field) => {
        if (!isFieldVisible(field, section.id, item, values)) return null;
        const key = fieldKey(section.id, index, field.id);
        const { options, waitingFor } = resolveOptions(field, schema, item, values);
        const waitingLabel = waitingFor
          ? section.fields.find((f) => f.id === waitingFor)?.label.toLowerCase()
          : undefined;
        return (
          <div key={field.id} data-fkey={key} className={`col-span-1 ${widthClass[field.width ?? 'half'] ?? widthClass.half}`}>
            <FieldInput
              field={field}
              value={item?.[field.id]}
              error={errors[key]}
              options={options}
              waitingFor={waitingFor}
              waitingLabel={waitingLabel}
              onChange={(v, file) => setField(section, index, field.id, v, file)}
            />
          </div>
        );
      })}
    </div>
  );

  const renderSection = (section: SectionDef) => {
    if (!isSectionVisible(section, values)) return null;
    const items = section.repeatable ? ((values[section.id] as SectionValues[]) ?? []) : [];
    const itemsErr = errors[fieldKey(section.id, null, '__items')];
    return (
      <section key={section.id} className="rounded-2xl border border-[#EDE3D6] bg-white p-5 shadow-[0_1px_2px_rgba(29,22,17,0.04)] sm:p-7">
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="flex items-center gap-2.5 text-[17px] font-bold text-[#1D1611]">
              <span className="h-5 w-1 rounded-full bg-gradient-to-b from-[#D4973F] to-[#B57321]" />
              {section.title}
            </h3>
            {section.description && <p className="mt-1 pl-3.5 text-[13.5px] text-[#867362]">{section.description}</p>}
          </div>
          {section.repeatable && items.length > 0 && (
            <span className="shrink-0 rounded-full bg-[#FAF3E7] px-2.5 py-1 text-xs font-semibold text-[#9C6019]">
              {items.length} added
            </span>
          )}
        </header>

        {section.repeatable ? (
          <div className="space-y-4">
            {items.map((item, i) => (
              <div key={i} className="rounded-xl border border-[#EFE5D8] bg-[#FDFAF5] p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#9C6019]">
                    {section.itemLabel ?? 'Item'} {i + 1}
                  </span>
                  {items.length > (section.minItems ?? 0) && (
                    <button
                      type="button"
                      onClick={() => removeItem(section, i)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#867362] transition hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  )}
                </div>
                {renderSectionFields(section, item, i)}
              </div>
            ))}
            {(!section.maxItems || items.length < section.maxItems) && (
              <button
                type="button"
                onClick={() => addItem(section)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E3D6C6] py-3.5 text-[14px] font-semibold text-[#9C6019] transition hover:border-[#C6832B] hover:bg-[#FDF9F2]"
              >
                <Plus className="h-4 w-4" /> {section.addLabel ?? 'Add'}
              </button>
            )}
            {itemsErr && <p className="text-[12.5px] font-medium text-rose-600">{itemsErr}</p>}
          </div>
        ) : (
          renderSectionFields(section, sectionData(values, section.id), null)
        )}
      </section>
    );
  };

  const summary = isReview ? summarize(schema, values, true) : [];
  const errorCount = Object.keys(errors).length;

  return (
    <div ref={topRef} className="mx-auto grid max-w-7xl scroll-mt-24 grid-cols-1 gap-8 px-4 pb-24 pt-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:pt-10">
      {/* Stepper */}
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-[#EDE3D6] bg-white p-4 shadow-sm lg:p-5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#867362]">
            <span>
              Step {currentIndex + 1} of {allIds.length}
            </span>
            <span className="text-[#B57321]">{progress}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F3ECE0]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#D4973F] to-[#B57321] transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <ol className="-mx-1 mt-4 flex gap-1 overflow-x-auto pb-1 lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
            {[...steps.map((s) => ({ id: s.id, title: s.title })), { id: REVIEW_ID, title: 'Review & Submit' }].map((s, i) => {
              const active = s.id === stepId || (isReview && s.id === REVIEW_ID);
              const done = completed[s.id] && !active;
              const enabled = canJumpTo(i);
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    disabled={!enabled}
                    onClick={() => {
                      if (i > currentIndex && !validateCurrent()) return;
                      if (currentStep && i > currentIndex) setCompleted((c) => ({ ...c, [currentStep.id]: true }));
                      goTo(s.id);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-[13.5px] transition ${
                      active ? 'bg-[#1D1611] text-white' : enabled ? 'text-[#3B2F25] hover:bg-[#FAF3E7]' : 'cursor-not-allowed text-[#B3A493]'
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        active ? 'bg-[#C6832B] text-white' : done ? 'bg-emerald-100 text-emerald-700' : 'bg-[#F3ECE0] text-[#867362]'
                      }`}
                    >
                      {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                    </span>
                    <span className="whitespace-nowrap font-semibold lg:whitespace-normal">{s.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        {!preview && (
          <div className="mt-4 hidden items-start gap-2.5 rounded-2xl border border-[#EDE3D6] bg-[#FDFAF5] p-4 text-[12.5px] leading-relaxed text-[#867362] lg:flex">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#B57321]" />
            Your details are sent securely and used only for recruitment at RVS University.
          </div>
        )}
      </aside>

      {/* Step body */}
      <div className="min-w-0">
        {restoredAt && !preview && (
          <div className="mb-5 flex flex-col gap-2 rounded-2xl border border-[#F0D19E] bg-[#FAF3E7] px-4 py-3 text-[13.5px] text-[#7E4B11] sm:flex-row sm:items-center sm:justify-between">
            <span>
              We restored the progress you saved {timeAgo(restoredAt)}. Uploaded files need to be attached again.
            </span>
            <button type="button" onClick={startOver} className="inline-flex items-center gap-1.5 font-semibold underline-offset-2 hover:underline">
              <RotateCcw className="h-3.5 w-3.5" /> Start over
            </button>
          </div>
        )}

        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B57321]">
            Step {currentIndex + 1} of {allIds.length}
          </p>
          <h2 className="mt-1.5 font-serif text-[28px] font-bold leading-tight text-[#1D1611] sm:text-[32px]">
            {isReview ? 'Review & Submit' : currentStep?.title}
          </h2>
          <p className="mt-1.5 text-[15px] text-[#867362]">
            {isReview ? 'Check your details below. You can edit any section before submitting.' : currentStep?.description}
          </p>
        </div>

        {errorCount > 0 && !isReview && (
          <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13.5px] font-medium text-rose-700">
            Please fix {errorCount} highlighted {errorCount === 1 ? 'field' : 'fields'} to continue.
          </div>
        )}

        {isReview ? (
          <div className="space-y-5">
            {summary.map((st) => (
              <div key={st.id} className="overflow-hidden rounded-2xl border border-[#EDE3D6] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#F3ECE0] bg-[#FDFAF5] px-5 py-3.5">
                  <h3 className="font-bold text-[#1D1611]">{st.title}</h3>
                  <button
                    type="button"
                    onClick={() => goTo(st.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-semibold text-[#9C6019] transition hover:bg-[#FAF3E7]"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                </div>
                <div className="divide-y divide-[#F6F0E7]">
                  {st.sections.map((sec) => (
                    <div key={sec.id} className="px-5 py-4">
                      <p className="mb-2.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#B57321]">{sec.title}</p>
                      {sec.repeatable ? (
                        <div className="space-y-2.5">
                          {sec.items.map((it, i) => (
                            <dl key={i} className="grid grid-cols-1 gap-x-6 gap-y-1.5 rounded-xl bg-[#FDFAF5] p-3 sm:grid-cols-2">
                              {it.filter((r) => r.value).map((r) => (
                                <div key={r.label} className="flex gap-2 text-[13.5px]">
                                  <dt className="shrink-0 text-[#9C8B79]">{r.label}:</dt>
                                  <dd className="font-medium text-[#1D1611]">{r.value}</dd>
                                </div>
                              ))}
                            </dl>
                          ))}
                        </div>
                      ) : (
                        <dl className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 xl:grid-cols-3">
                          {sec.rows.filter((r) => r.value).map((r) => (
                            <div key={r.label}>
                              <dt className="text-[12px] text-[#9C8B79]">{r.label}</dt>
                              <dd className="break-words text-[14px] font-semibold text-[#1D1611]">{r.value}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className={`rounded-2xl border bg-white p-5 shadow-sm sm:p-6 ${declError ? 'border-rose-300' : 'border-[#EDE3D6]'}`}>
              <h3 className="mb-3 flex items-center gap-2 font-bold text-[#1D1611]">
                <ClipboardCheck className="h-5 w-5 text-[#B57321]" /> Declaration
              </h3>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={declared}
                  onChange={(e) => {
                    setDeclared(e.target.checked);
                    setDeclError(false);
                  }}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#B57321]"
                />
                <span className="text-[14px] leading-relaxed text-[#4D3D30]">{schema.settings.declarationText}</span>
              </label>
              {declError && <p className="mt-2 text-[12.5px] font-medium text-rose-600">Please accept the declaration to submit.</p>}
            </div>

            {/* Honeypot (bots fill this; people never see it) */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden
              name="website"
            />

            {submitError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13.5px] font-medium text-rose-700">{submitError}</div>
            )}
          </div>
        ) : (
          <div className="space-y-5">{currentStep?.sections.map(renderSection)}</div>
        )}

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#EDE3D6] pt-6">
          <button
            type="button"
            onClick={back}
            disabled={currentIndex === 0}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#E3D6C6] bg-white px-5 text-[14.5px] font-semibold text-[#3B2F25] transition hover:border-[#C6832B] disabled:invisible"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>
          {isReview ? (
            <button
              type="button"
              onClick={submit}
              disabled={submitting || preview}
              title={preview ? 'Submitting is disabled in preview' : undefined}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[#C6832B] to-[#B57321] px-7 text-[15px] font-bold text-white shadow-lg shadow-[#B57321]/25 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {preview ? 'Submit (disabled in preview)' : submitting ? 'Submitting…' : 'Submit application'}
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#1D1611] px-7 text-[15px] font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#322820]"
            >
              {currentIndex === allIds.length - 2 ? 'Review' : 'Next'} <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export type { FileMeta };
