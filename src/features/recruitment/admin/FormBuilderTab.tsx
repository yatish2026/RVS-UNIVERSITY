import React, { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Eye,
  EyeOff,
  GitBranch,
  Layers,
  Lock,
  Plus,
  Repeat,
  Settings2,
  Trash2,
} from 'lucide-react';
import type { Condition, FieldDef, FieldType, FieldWidth, FormSchema, SectionDef, StepDef } from '../types';
import { uniqueId } from '../engine';
import { Btn, Card, Field, IconBtn, Label, Modal, Select, TextArea, TextIn, Toggle } from './ui';
import { AudienceEditor, applyAudience, applyShow, audienceText, lockFlags, mandatoryFor, postTypeLabels, shownFor } from './audience';

type Mutate = (fn: (s: FormSchema) => void) => void;

export const TYPE_LABELS: Record<FieldType, string> = {
  text: 'Short text',
  textarea: 'Paragraph',
  email: 'Email',
  tel: 'Phone number',
  number: 'Number',
  year: 'Year',
  date: 'Date',
  select: 'Dropdown',
  choice: 'Buttons (pick one)',
  checkbox: 'Checkbox (yes / no)',
  file: 'File upload',
};

const WIDTH_LABELS: Record<FieldWidth, string> = {
  full: 'Full width',
  half: 'Half (1/2)',
  third: 'One third (1/3)',
  quarter: 'One quarter (1/4)',
};

const PATTERNS: { label: string; pattern: string; message: string }[] = [
  { label: 'Indian mobile (10 digits)', pattern: '^[6-9][0-9]{9}$', message: 'Enter a valid 10-digit mobile number' },
  { label: 'Aadhaar (12 digits)', pattern: '^[0-9]{4} ?[0-9]{4} ?[0-9]{4}$', message: 'Enter the 12-digit Aadhaar number' },
  { label: 'PAN (ABCDE1234F)', pattern: '^[A-Z]{5}[0-9]{4}[A-Z]$', message: 'Enter a valid PAN (e.g. ABCDE1234F)' },
  { label: 'Indian PIN code (6 digits)', pattern: '^[1-9][0-9]{5}$', message: 'Enter a valid 6-digit PIN code' },
  { label: 'Letters and spaces only', pattern: "^[A-Za-z .'-]+$", message: 'Use letters only' },
  { label: 'Digits only', pattern: '^[0-9]+$', message: 'Use digits only' },
  { label: 'URL (https://…)', pattern: '^https?://\\S+$', message: 'Enter a valid link starting with http' },
];

const hasOptions = (t: FieldType) => t === 'select' || t === 'choice';

interface Sel {
  stepId: string;
  sectionId?: string;
  fieldId?: string;
}

interface Props {
  draft: FormSchema;
  saved: FormSchema;
  mutate: Mutate;
}

export const FormBuilderTab: React.FC<Props> = ({ draft, saved, mutate }) => {
  const [sel, setSel] = useState<Sel>({ stepId: draft.steps[0]?.id ?? '' });
  const allPT = postTypeLabels(draft);
  const [adding, setAdding] = useState<null | { sectionId: string; label: string; type: FieldType; show: string[]; mand: string[] }>(null);
  const step = draft.steps.find((s) => s.id === sel.stepId) ?? draft.steps[0];
  const section = step?.sections.find((s) => s.id === sel.sectionId);
  const field = section?.fields.find((f) => f.id === sel.fieldId);

  const savedSectionIds = useMemo(() => new Set(saved.steps.flatMap((s) => s.sections.map((x) => x.id))), [saved]);
  const savedFieldKeys = useMemo(
    () => new Set(saved.steps.flatMap((s) => s.sections.flatMap((x) => x.fields.map((f) => `${x.id}.${f.id}`)))),
    [saved],
  );
  const allSectionIds = draft.steps.flatMap((s) => s.sections.map((x) => x.id));

  const findStep = (s: FormSchema) => s.steps.find((x) => x.id === sel.stepId)!;
  const findSection = (s: FormSchema, sid = sel.sectionId) => findStep(s).sections.find((x) => x.id === sid)!;

  const sectionHasLocked = (sec: SectionDef) => sec.fields.some((f) => f.locked);
  const stepHasLocked = (st: StepDef) => st.sections.some(sectionHasLocked);

  const move = <T,>(arr: T[], i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  // ---------------- steps
  const addStep = () => {
    const id = uniqueId('New step', draft.steps.map((s) => s.id));
    const sid = uniqueId('New section', allSectionIds);
    mutate((s) => {
      s.steps.push({ id, title: 'New step', description: '', sections: [{ id: sid, title: 'New section', fields: [] }] });
    });
    setSel({ stepId: id, sectionId: sid });
  };

  // ---------------- sections
  const addSection = () => {
    const sid = uniqueId('New section', allSectionIds);
    mutate((s) => findStep(s).sections.push({ id: sid, title: 'New section', fields: [] }));
    setSel({ stepId: step.id, sectionId: sid });
  };

  // "Add field" first asks who the field is for and whether it is mandatory.
  const addField = (sec: SectionDef) =>
    setAdding({ sectionId: sec.id, label: '', type: 'text', show: shownFor(sec, allPT), mand: [] });

  const createField = () => {
    if (!adding) return;
    const sec = step.sections.find((x) => x.id === adding.sectionId);
    if (!sec) return;
    const label = adding.label.trim() || 'New field';
    const fid = uniqueId(label, sec.fields.map((f) => f.id));
    const f: FieldDef = { id: fid, label, type: adding.type, width: adding.type === 'checkbox' ? 'full' : 'half', required: false };
    if (hasOptions(adding.type)) f.options = ['Option 1', 'Option 2'];
    if (adding.type === 'file') {
      f.accept = '.pdf';
      f.maxSizeMB = 5;
    }
    applyAudience(f, adding.show, adding.mand, allPT);
    mutate((s) => findSection(s, sec.id).fields.push(f));
    setSel({ stepId: step.id, sectionId: sec.id, fieldId: fid });
    setAdding(null);
  };

  const updateField = (patch: Partial<FieldDef>) =>
    mutate((s) => {
      const f = findSection(s).fields.find((x) => x.id === sel.fieldId)!;
      Object.assign(f, patch);
      for (const k of Object.keys(patch) as (keyof FieldDef)[]) if (patch[k] === undefined) delete f[k];
    });

  if (!step) {
    return (
      <Card>
        <p className="text-[#867362]">The form has no steps.</p>
        <Btn className="mt-3" onClick={addStep} icon={<Plus className="h-4 w-4" />}>
          Add step
        </Btn>
      </Card>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)_380px]">
      {/* Steps */}
      <Card title="Steps" pad={false} actions={<Btn size="sm" icon={<Plus className="h-3.5 w-3.5" />} onClick={addStep}>Add</Btn>}>
        <ol className="space-y-1 p-2">
          {draft.steps.map((s, i) => (
            <li key={s.id}>
              <div
                className={`group flex items-center gap-2 rounded-xl px-2.5 py-2 transition ${
                  s.id === step.id ? 'bg-[#1D1611] text-white' : 'text-[#3B2F25] hover:bg-[#FAF3E7]'
                }`}
              >
                <button type="button" onClick={() => setSel({ stepId: s.id })} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${s.id === step.id ? 'bg-[#C6832B]' : 'bg-[#F3ECE0] text-[#867362]'}`}>
                    {i + 1}
                  </span>
                  <span className={`truncate text-[13.5px] font-semibold ${s.hidden ? 'line-through opacity-60' : ''}`}>{s.title}</span>
                  {s.showIf?.length ? <GitBranch className="h-3.5 w-3.5 shrink-0 opacity-70" /> : null}
                </button>
                <span className="flex shrink-0 opacity-70">
                  <button type="button" disabled={i === 0} onClick={() => mutate((x) => move(x.steps, i, -1))} className="rounded p-0.5 hover:bg-black/10 disabled:opacity-20" aria-label="Move up">
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" disabled={i === draft.steps.length - 1} onClick={() => mutate((x) => move(x.steps, i, 1))} className="rounded p-0.5 hover:bg-black/10 disabled:opacity-20" aria-label="Move down">
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ol>
        <p className="border-t border-[#F3ECE0] px-4 py-3 text-[12px] leading-relaxed text-[#9C8B79]">
          A final “Review & Submit” step is added automatically.
        </p>
      </Card>

      {/* Step + sections */}
      <div className="min-w-0 space-y-4">
        <Card
          title={<span className="flex items-center gap-2"><Settings2 className="h-4 w-4 text-[#B57321]" /> Step settings</span>}
          actions={
            <Btn
              size="sm"
              variant="danger"
              icon={<Trash2 className="h-3.5 w-3.5" />}
              disabled={stepHasLocked(step) || draft.steps.length <= 1}
              title={stepHasLocked(step) ? 'This step holds core fields and cannot be deleted' : undefined}
              onClick={() => {
                if (!confirm(`Delete the step “${step.title}” and all its fields?`)) return;
                mutate((s) => {
                  s.steps = s.steps.filter((x) => x.id !== step.id);
                });
                setSel({ stepId: draft.steps.find((x) => x.id !== step.id)?.id ?? '' });
              }}
            >
              Delete step
            </Btn>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Step title">
              <TextIn value={step.title} onChange={(e) => mutate((s) => (findStep(s).title = e.target.value))} />
            </Field>
            <Field label="Description" hint="(shown under the title)">
              <TextIn value={step.description ?? ''} onChange={(e) => mutate((s) => (findStep(s).description = e.target.value))} />
            </Field>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Toggle
              checked={!!step.hidden}
              disabled={stepHasLocked(step)}
              onChange={(v) => mutate((s) => (findStep(s).hidden = v || undefined))}
              label="Hide this step"
              description="Removed from the form without deleting it."
            />
          </div>
          {allPT.length > 1 && (
            <div className="mt-4">
              <AudienceEditor
                all={allPT}
                show={shownFor(step, allPT)}
                withMandatory={false}
                noun="step"
                lockShow={step.sections.some((x) => x.fields.some((f) => lockFlags(f, x.id).lockShow))}
                onChange={(show) => mutate((s) => applyShow(findStep(s), show, allPT))}
              />
            </div>
          )}
          <ConditionsEditor
            className="mt-4"
            title="Show this step only when…"
            conditions={step.showIf ?? []}
            sources={globalSources(draft)}
            onChange={(c) => mutate((s) => (findStep(s).showIf = c.length ? c : undefined))}
            schema={draft}
          />
        </Card>

        {step.sections.map((sec, si) => (
          <Card
            key={sec.id}
            pad={false}
            title={
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#B57321]" />
                <span className={sec.hidden ? 'line-through opacity-60' : ''}>{sec.title}</span>
                {sec.repeatable && <Repeat className="h-3.5 w-3.5 text-[#9C8B79]" aria-label="Repeatable" />}
                {sec.showIf?.length ? <GitBranch className="h-3.5 w-3.5 text-[#9C8B79]" aria-label="Conditional" /> : null}
              </span>
            }
            actions={
              <>
                <IconBtn label="Move section up" disabled={si === 0} onClick={() => mutate((s) => move(findStep(s).sections, si, -1))}>
                  <ArrowUp className="h-4 w-4" />
                </IconBtn>
                <IconBtn label="Move section down" disabled={si === step.sections.length - 1} onClick={() => mutate((s) => move(findStep(s).sections, si, 1))}>
                  <ArrowDown className="h-4 w-4" />
                </IconBtn>
                <Btn size="sm" variant={sel.sectionId === sec.id && !sel.fieldId ? 'primary' : 'outline'} onClick={() => setSel({ stepId: step.id, sectionId: sec.id })}>
                  Section settings
                </Btn>
              </>
            }
          >
            <ul className="divide-y divide-[#F6F0E7]">
              {sec.fields.map((f, fi) => {
                const active = sel.sectionId === sec.id && sel.fieldId === f.id;
                return (
                  <li
                    key={f.id}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 transition ${active ? 'bg-[#FAF3E7]' : 'hover:bg-[#FDFAF5]'}`}
                    onClick={() => setSel({ stepId: step.id, sectionId: sec.id, fieldId: f.id })}
                  >
                    <div className="min-w-0 flex-1">
                      <div className={`flex items-center gap-1.5 text-[13.5px] font-semibold text-[#1D1611] ${f.hidden ? 'line-through opacity-50' : ''}`}>
                        <span className="truncate">{f.label}</span>
                        {f.required && <span className="text-rose-500">*</span>}
                        {f.locked && <Lock className="h-3 w-3 shrink-0 text-[#AD9A88]" aria-label="Core field" />}
                        {f.showIf?.length ? <GitBranch className="h-3 w-3 shrink-0 text-[#AD9A88]" aria-label="Conditional" /> : null}
                      </div>
                      <div className="text-[11.5px] text-[#9C8B79]">
                        {TYPE_LABELS[f.type]} · <span className="font-semibold text-[#9C6019]">{audienceText(f, allPT)}</span>
                        {f.listId ? ` · list: ${draft.lists.find((l) => l.id === f.listId)?.name ?? f.listId}` : ''}
                      </div>
                    </div>
                    <span className="flex shrink-0 items-center" onClick={(e) => e.stopPropagation()}>
                      <IconBtn label="Move up" disabled={fi === 0} onClick={() => mutate((s) => move(findSection(s, sec.id).fields, fi, -1))}>
                        <ArrowUp className="h-3.5 w-3.5" />
                      </IconBtn>
                      <IconBtn label="Move down" disabled={fi === sec.fields.length - 1} onClick={() => mutate((s) => move(findSection(s, sec.id).fields, fi, 1))}>
                        <ArrowDown className="h-3.5 w-3.5" />
                      </IconBtn>
                      <IconBtn
                        label={f.hidden ? 'Show field' : 'Hide field'}
                        disabled={f.locked}
                        onClick={() =>
                          mutate((s) => {
                            const x = findSection(s, sec.id).fields[fi];
                            if (x.hidden) delete x.hidden;
                            else x.hidden = true;
                          })
                        }
                      >
                        {f.hidden ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </IconBtn>
                      <IconBtn
                        label="Duplicate"
                        onClick={() => {
                          const nid = uniqueId(`${f.label} copy`, sec.fields.map((x) => x.id));
                          mutate((s) => {
                            const fs = findSection(s, sec.id).fields;
                            const copy = { ...structuredClone(f), id: nid, label: `${f.label} (copy)` };
                            delete copy.locked;
                            fs.splice(fi + 1, 0, copy);
                          });
                          setSel({ stepId: step.id, sectionId: sec.id, fieldId: nid });
                        }}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </IconBtn>
                      <IconBtn
                        label={f.locked ? 'Core field — cannot delete' : 'Delete field'}
                        tone="danger"
                        disabled={f.locked}
                        onClick={() => {
                          if (!confirm(`Delete the field “${f.label}”?`)) return;
                          mutate((s) => {
                            const x = findSection(s, sec.id);
                            x.fields = x.fields.filter((y) => y.id !== f.id);
                          });
                          if (active) setSel({ stepId: step.id, sectionId: sec.id });
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </IconBtn>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-[#F3ECE0] p-3">
              <Btn size="sm" icon={<Plus className="h-3.5 w-3.5" />} onClick={() => addField(sec)}>
                Add field
              </Btn>
            </div>
          </Card>
        ))}
        <Btn icon={<Plus className="h-4 w-4" />} onClick={addSection} className="w-full border-dashed">
          Add section to “{step.title}”
        </Btn>
      </div>

      {/* Inspector */}
      <div className="xl:sticky xl:top-[132px] xl:max-h-[calc(100vh-150px)] xl:self-start xl:overflow-y-auto">
        {field && section ? (
          <FieldInspector
            key={`${section.id}.${field.id}`}
            field={field}
            section={section}
            draft={draft}
            isNew={!savedFieldKeys.has(`${section.id}.${field.id}`)}
            allPT={allPT}
            setAudience={(show, mand) =>
              mutate((s) => {
                const f = findSection(s).fields.find((x) => x.id === field.id)!;
                applyAudience(f, show, mand, allPT);
              })
            }
            update={updateField}
            rename={(newId) => {
              mutate((s) => {
                const f = findSection(s).fields.find((x) => x.id === field.id)!;
                f.id = newId;
              });
              setSel({ ...sel, fieldId: newId });
            }}
          />
        ) : section ? (
          <SectionInspector
            key={section.id}
            section={section}
            draft={draft}
            isNew={!savedSectionIds.has(section.id)}
            mutate={mutate}
            canDelete={!sectionHasLocked(section)}
            onDeleted={() => setSel({ stepId: step.id })}
            onRenamed={(nid) => setSel({ stepId: step.id, sectionId: nid })}
            stepId={step.id}
            allPT={allPT}
          />
        ) : (
          <Card>
            <div className="py-6 text-center text-[13.5px] text-[#867362]">
              <Settings2 className="mx-auto mb-2 h-8 w-8 text-[#D4BC9F]" />
              Select a field or a section to edit its settings.
            </div>
          </Card>
        )}
      </div>

      <Modal
        open={!!adding}
        onClose={() => setAdding(null)}
        title="Add a field"
        footer={
          <>
            <Btn onClick={() => setAdding(null)}>Cancel</Btn>
            <Btn variant="primary" icon={<Plus className="h-4 w-4" />} onClick={createField} disabled={!adding?.label.trim()}>
              Add field
            </Btn>
          </>
        }
      >
        {adding && (
          <div className="space-y-4 p-5">
            <Field label="Question / label">
              <TextIn autoFocus value={adding.label} placeholder="e.g. Teaching experience in years" onChange={(e) => setAdding({ ...adding, label: e.target.value })} />
            </Field>
            <Field label="Answer type">
              <Select value={adding.type} onChange={(e) => setAdding({ ...adding, type: e.target.value as FieldType })}>
                {Object.entries(TYPE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </Select>
            </Field>
            {allPT.length > 1 && (
              <AudienceEditor
                all={allPT}
                show={adding.show}
                mandatory={adding.mand}
                onChange={(show, mand) => setAdding({ ...adding, show, mand })}
              />
            )}
            <p className="text-[12px] text-[#9C8B79]">You can change everything later in Field settings or in the Mandatory &amp; Optional tab.</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ------------------------------------------------------------------ section inspector

const SectionInspector: React.FC<{
  section: SectionDef;
  draft: FormSchema;
  isNew: boolean;
  mutate: Mutate;
  canDelete: boolean;
  onDeleted: () => void;
  onRenamed: (id: string) => void;
  stepId: string;
  allPT: string[];
}> = ({ section, draft, isNew, mutate, canDelete, onDeleted, onRenamed, stepId, allPT }) => {
  const find = (s: FormSchema) => s.steps.find((x) => x.id === stepId)!.sections.find((x) => x.id === section.id)!;
  const set = (patch: Partial<SectionDef>) =>
    mutate((s) => {
      const x = find(s);
      Object.assign(x, patch);
      for (const k of Object.keys(patch) as (keyof SectionDef)[]) if (patch[k] === undefined) delete x[k];
    });
  const allIds = draft.steps.flatMap((s) => s.sections.map((x) => x.id)).filter((id) => id !== section.id);
  const [idText, setIdText] = useState(section.id);

  return (
    <Card
      title="Section settings"
      actions={
        <Btn
          size="sm"
          variant="danger"
          icon={<Trash2 className="h-3.5 w-3.5" />}
          disabled={!canDelete}
          title={canDelete ? undefined : 'Contains core fields'}
          onClick={() => {
            if (!confirm(`Delete the section “${section.title}”?`)) return;
            mutate((s) => {
              const st = s.steps.find((x) => x.id === stepId)!;
              st.sections = st.sections.filter((x) => x.id !== section.id);
            });
            onDeleted();
          }}
        >
          Delete
        </Btn>
      }
    >
      <div className="space-y-3.5">
        <Field label="Title">
          <TextIn value={section.title} onChange={(e) => set({ title: e.target.value })} />
        </Field>
        <Field label="Description" hint="(optional)">
          <TextArea value={section.description ?? ''} onChange={(e) => set({ description: e.target.value || undefined })} />
        </Field>
        <Field label="Internal ID" hint={isNew ? '(letters & numbers)' : '(locked after first save)'}>
          <TextIn
            value={idText}
            disabled={!isNew}
            onChange={(e) => setIdText(e.target.value.replace(/[^A-Za-z0-9]/g, ''))}
            onBlur={() => {
              if (!idText || idText === section.id || !/^[A-Za-z]/.test(idText) || allIds.includes(idText)) {
                setIdText(section.id);
                return;
              }
              mutate((s) => (find(s).id = idText));
              onRenamed(idText);
            }}
          />
        </Field>
        <Toggle checked={!!section.hidden} disabled={!canDelete} onChange={(v) => set({ hidden: v || undefined })} label="Hide section" />
        {allPT.length > 1 && (
          <AudienceEditor
            all={allPT}
            show={shownFor(section, allPT)}
            withMandatory={false}
            noun="section"
            lockShow={section.fields.some((f) => lockFlags(f, section.id).lockShow)}
            onChange={(show) => mutate((s) => applyShow(find(s), show, allPT))}
          />
        )}
        <div className="rounded-xl border border-[#EDE3D6] p-3.5">
          <Toggle
            checked={!!section.repeatable}
            onChange={(v) =>
              set(
                v
                  ? { repeatable: true, minItems: 0, maxItems: 10, itemLabel: section.itemLabel ?? 'Entry', addLabel: section.addLabel ?? 'Add entry' }
                  : { repeatable: undefined, minItems: undefined, maxItems: undefined, itemLabel: undefined, addLabel: undefined },
              )
            }
            label="Repeatable (applicant can add several)"
            description="E.g. multiple jobs, articles or patents."
          />
          {section.repeatable && (
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <Field label="Minimum entries">
                <TextIn type="number" min={0} value={section.minItems ?? 0} onChange={(e) => set({ minItems: Math.max(0, Number(e.target.value)) })} />
              </Field>
              <Field label="Maximum entries">
                <TextIn type="number" min={1} value={section.maxItems ?? 10} onChange={(e) => set({ maxItems: Math.max(1, Number(e.target.value)) })} />
              </Field>
              <Field label="Entry name">
                <TextIn value={section.itemLabel ?? ''} onChange={(e) => set({ itemLabel: e.target.value })} />
              </Field>
              <Field label="Add-button text">
                <TextIn value={section.addLabel ?? ''} onChange={(e) => set({ addLabel: e.target.value })} />
              </Field>
            </div>
          )}
        </div>
        <ConditionsEditor
          title="Show this section only when…"
          conditions={section.showIf ?? []}
          sources={globalSources(draft)}
          onChange={(c) => set({ showIf: c.length ? c : undefined })}
          schema={draft}
        />
      </div>
    </Card>
  );
};

// ------------------------------------------------------------------ field inspector

const FieldInspector: React.FC<{
  field: FieldDef;
  section: SectionDef;
  draft: FormSchema;
  isNew: boolean;
  allPT: string[];
  setAudience: (show: string[], mandatory: string[]) => void;
  update: (p: Partial<FieldDef>) => void;
  rename: (id: string) => void;
}> = ({ field, section, draft, isNew, allPT, setAudience, update, rename }) => {
  const [idText, setIdText] = useState(field.id);
  const optionSource = field.listId ? 'list' : 'custom';
  const sameSectionSources = section.fields.filter((f) => f.id !== field.id && hasOptions(f.type));
  const presetIdx = PATTERNS.findIndex((p) => p.pattern === field.pattern);

  return (
    <Card title={<span className="flex items-center gap-2">Field settings {field.locked && <span className="inline-flex items-center gap-1 rounded-full bg-[#F3ECE0] px-2 py-0.5 text-[11px] text-[#867362]"><Lock className="h-3 w-3" /> core</span>}</span>}>
      <div className="space-y-3.5">
        <Field label="Question / label">
          <TextIn value={field.label} onChange={(e) => update({ label: e.target.value })} />
        </Field>
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Answer type">
            <Select
              value={field.type}
              disabled={field.locked}
              onChange={(e) => {
                const type = e.target.value as FieldType;
                const patch: Partial<FieldDef> = { type };
                if (hasOptions(type) && !field.listId && !field.options?.length) patch.options = ['Option 1', 'Option 2'];
                if (type === 'file') {
                  patch.accept = field.accept ?? '.pdf';
                  patch.maxSizeMB = field.maxSizeMB ?? 5;
                }
                if (type === 'checkbox') patch.width = 'full';
                update(patch);
              }}
            >
              {Object.entries(TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Width">
            <Select value={field.width ?? 'half'} onChange={(e) => update({ width: e.target.value as FieldWidth })}>
              {Object.entries(WIDTH_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        {allPT.length > 1 ? (
          <AudienceEditor
            all={allPT}
            show={shownFor(field, allPT)}
            mandatory={mandatoryFor(field, allPT)}
            {...lockFlags(field, section.id)}
            onChange={setAudience}
          />
        ) : (
          <Toggle checked={!!field.required} disabled={field.locked} onChange={(v) => update({ required: v, requiredFor: undefined })} label="Mandatory" />
        )}
        <Toggle checked={!!field.hidden} disabled={field.locked} onChange={(v) => update({ hidden: v || undefined })} label="Hidden for everyone" />

        {field.type !== 'checkbox' && field.type !== 'choice' && field.type !== 'file' && (
          <Field label="Placeholder" hint="(hint inside the box)">
            <TextIn value={field.placeholder ?? ''} onChange={(e) => update({ placeholder: e.target.value || undefined })} />
          </Field>
        )}
        <Field label="Help text" hint="(shown under the field)">
          <TextIn value={field.help ?? ''} onChange={(e) => update({ help: e.target.value || undefined })} />
        </Field>

        {hasOptions(field.type) && (
          <div className="space-y-2.5 rounded-xl border border-[#EDE3D6] p-3.5">
            <Label>Options</Label>
            <div className="flex gap-1.5 rounded-lg bg-[#F3ECE0] p-1">
              {(['list', 'custom'] as const).map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() =>
                    src === 'list'
                      ? update({ listId: draft.lists[0]?.id, options: undefined })
                      : update({ listId: undefined, filterBy: undefined, options: field.options?.length ? field.options : ['Option 1', 'Option 2'] })
                  }
                  className={`flex-1 rounded-md py-1.5 text-[12.5px] font-semibold transition ${optionSource === src ? 'bg-white text-[#1D1611] shadow-sm' : 'text-[#867362]'}`}
                >
                  {src === 'list' ? 'Shared list' : 'Custom options'}
                </button>
              ))}
            </div>
            {optionSource === 'list' ? (
              <>
                <Field label="List" hint="(edit in Lists & Categories)">
                  <Select value={field.listId} onChange={(e) => update({ listId: e.target.value })}>
                    {draft.lists.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name} ({l.options.length})
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Filter options by" hint="(uses option tags)">
                  <Select
                    value={field.filterBy?.field ?? ''}
                    onChange={(e) => update({ filterBy: e.target.value ? { field: e.target.value } : undefined })}
                  >
                    <option value="">No filter — show all options</option>
                    {sameSectionSources.map((f) => (
                      <option key={f.id} value={f.id}>
                        Answer to “{f.label}”
                      </option>
                    ))}
                  </Select>
                </Field>
              </>
            ) : (
              <Field label="One option per line">
                <TextArea
                  rows={5}
                  value={(field.options ?? []).join('\n')}
                  onChange={(e) => update({ options: e.target.value.split('\n').map((s) => s.trimStart()) })}
                  onBlur={() => update({ options: (field.options ?? []).map((s) => s.trim()).filter(Boolean) })}
                />
              </Field>
            )}
          </div>
        )}

        {(field.type === 'number' || field.type === 'year') && (
          <div className="grid grid-cols-2 gap-2.5">
            <Field label="Minimum">
              <TextIn type="number" value={field.min ?? ''} onChange={(e) => update({ min: e.target.value === '' ? undefined : Number(e.target.value) })} />
            </Field>
            <Field label="Maximum">
              <TextIn type="number" value={field.max ?? ''} onChange={(e) => update({ max: e.target.value === '' ? undefined : Number(e.target.value) })} />
            </Field>
          </div>
        )}

        {(field.type === 'text' || field.type === 'tel' || field.type === 'textarea') && (
          <div className="space-y-2.5 rounded-xl border border-[#EDE3D6] p-3.5">
            <Label>Validation</Label>
            <Select
              value={field.pattern ? (presetIdx >= 0 ? String(presetIdx) : 'custom') : ''}
              onChange={(e) => {
                const v = e.target.value;
                if (v === '') update({ pattern: undefined, patternMessage: undefined });
                else if (v === 'custom') update({ pattern: field.pattern ?? '^.+$', patternMessage: field.patternMessage ?? 'Invalid format' });
                else update({ pattern: PATTERNS[Number(v)].pattern, patternMessage: PATTERNS[Number(v)].message });
              }}
            >
              <option value="">No format rule</option>
              {PATTERNS.map((p, i) => (
                <option key={p.label} value={i}>
                  {p.label}
                </option>
              ))}
              <option value="custom">Custom (regular expression)</option>
            </Select>
            {field.pattern && presetIdx < 0 && (
              <Field label="Regular expression">
                <TextIn className="font-mono" value={field.pattern} onChange={(e) => update({ pattern: e.target.value })} />
              </Field>
            )}
            {field.pattern && (
              <Field label="Error message">
                <TextIn value={field.patternMessage ?? ''} onChange={(e) => update({ patternMessage: e.target.value })} />
              </Field>
            )}
            <div className="grid grid-cols-2 gap-2.5">
              <Field label="Max length">
                <TextIn type="number" min={1} value={field.maxLength ?? ''} onChange={(e) => update({ maxLength: e.target.value === '' ? undefined : Number(e.target.value) })} />
              </Field>
              <div className="pt-6">
                <Toggle checked={field.transform === 'uppercase'} onChange={(v) => update({ transform: v ? 'uppercase' : undefined })} label="UPPERCASE" />
              </div>
            </div>
          </div>
        )}

        {field.type === 'file' && (
          <div className="grid grid-cols-2 gap-2.5">
            <Field label="Allowed types" hint="(e.g. .pdf,.docx)">
              <TextIn value={field.accept ?? ''} onChange={(e) => update({ accept: e.target.value || undefined })} />
            </Field>
            <Field label="Max size (MB)">
              <TextIn type="number" min={1} max={15} value={field.maxSizeMB ?? 5} onChange={(e) => update({ maxSizeMB: Math.min(15, Math.max(1, Number(e.target.value))) })} />
            </Field>
            <p className="col-span-2 text-[11.5px] text-[#9C8B79]">Supported: .pdf, .doc, .docx, .jpg, .jpeg, .png, .webp — up to 15 MB each.</p>
          </div>
        )}

        <ConditionsEditor
          title="Show this field only when…"
          conditions={field.showIf ?? []}
          sources={[
            ...section.fields
              .filter((f) => f.id !== field.id && (hasOptions(f.type) || f.type === 'checkbox'))
              .map((f) => ({ key: f.id, label: `${f.label}`, group: `This section (${section.title})`, field: f })),
            ...globalSources(draft).filter((s) => s.section !== section.id),
          ]}
          onChange={(c) => update({ showIf: c.length ? c : undefined })}
          schema={draft}
          localSection={section.id}
        />

        <Field label="Internal ID" hint={isNew ? '(letters & numbers)' : '(locked after first save)'}>
          <TextIn
            className="font-mono"
            value={idText}
            disabled={!isNew}
            onChange={(e) => setIdText(e.target.value.replace(/[^A-Za-z0-9]/g, ''))}
            onBlur={() => {
              if (!idText || idText === field.id || !/^[A-Za-z]/.test(idText) || section.fields.some((f) => f.id === idText)) {
                setIdText(field.id);
                return;
              }
              rename(idText);
            }}
          />
        </Field>
      </div>
    </Card>
  );
};

// ------------------------------------------------------------------ conditions

interface Source {
  key: string;
  label: string;
  group: string;
  field: FieldDef;
  section?: string;
}

function globalSources(schema: FormSchema): Source[] {
  const out: Source[] = [];
  for (const st of schema.steps)
    for (const sec of st.sections) {
      if (sec.repeatable) continue;
      for (const f of sec.fields)
        if (hasOptions(f.type) || f.type === 'checkbox')
          out.push({ key: `${sec.id}::${f.id}`, label: f.label, group: `${st.title} › ${sec.title}`, field: f, section: sec.id });
    }
  return out;
}

function optionLabels(f: FieldDef, schema: FormSchema): string[] {
  if (f.listId) return (schema.lists.find((l) => l.id === f.listId)?.options ?? []).map((o) => o.label);
  return f.options ?? [];
}

const ConditionsEditor: React.FC<{
  title: string;
  conditions: Condition[];
  sources: Source[];
  onChange: (c: Condition[]) => void;
  schema: FormSchema;
  localSection?: string;
  className?: string;
}> = ({ title, conditions, sources, onChange, schema, localSection, className = '' }) => {
  const keyOf = (c: Condition) => (c.section && c.section !== localSection ? `${c.section}::${c.field}` : localSection ? c.field : `${c.section}::${c.field}`);
  const groups = Array.from(new Set(sources.map((s) => s.group)));

  const setAt = (i: number, c: Condition) => onChange(conditions.map((x, j) => (j === i ? c : x)));

  return (
    <div className={`rounded-xl border border-[#EDE3D6] bg-[#FDFAF5] p-3.5 ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <Label>
          <span className="inline-flex items-center gap-1.5">
            <GitBranch className="h-3.5 w-3.5 text-[#B57321]" /> {title}
          </span>
        </Label>
      </div>
      {conditions.length === 0 && <p className="mb-2 text-[12px] text-[#9C8B79]">Always shown.</p>}
      <div className="space-y-2.5">
        {conditions.map((c, i) => {
          const src = sources.find((s) => s.key === keyOf(c));
          const op = c.notEquals !== undefined ? 'notEquals' : 'equals';
          const val = op === 'equals' ? c.equals : c.notEquals;
          const choices = src ? (src.field.type === 'checkbox' ? [] : optionLabels(src.field, schema)) : [];
          const selected = Array.isArray(val) ? val : val === undefined || typeof val === 'boolean' ? [] : [val];
          const build = (o: 'equals' | 'notEquals', v: Condition['equals']): Condition => {
            const base: Condition = { field: c.field };
            if (c.section && c.section !== localSection) base.section = c.section;
            base[o] = v;
            return base;
          };
          return (
            <div key={i} className="space-y-2 rounded-lg border border-[#EDE3D6] bg-white p-2.5">
              {i > 0 && <span className="text-[11px] font-bold uppercase tracking-wider text-[#B57321]">and</span>}
              <div className="flex gap-1.5">
                <Select
                  value={src?.key ?? ''}
                  onChange={(e) => {
                    const s = sources.find((x) => x.key === e.target.value);
                    if (!s) return;
                    const next: Condition = { field: s.field.id };
                    if (s.section && s.section !== localSection) next.section = s.section;
                    next.equals = s.field.type === 'checkbox' ? true : optionLabels(s.field, schema)[0] ?? '';
                    setAt(i, next);
                  }}
                >
                  <option value="">Choose a question…</option>
                  {groups.map((g) => (
                    <optgroup key={g} label={g}>
                      {sources
                        .filter((s) => s.group === g)
                        .map((s) => (
                          <option key={s.key} value={s.key}>
                            {s.label}
                          </option>
                        ))}
                    </optgroup>
                  ))}
                </Select>
                <IconBtn label="Remove condition" tone="danger" onClick={() => onChange(conditions.filter((_, j) => j !== i))}>
                  <Trash2 className="h-3.5 w-3.5" />
                </IconBtn>
              </div>
              {src && src.field.type === 'checkbox' ? (
                <Select value={val === false ? 'off' : 'on'} onChange={(e) => setAt(i, build('equals', e.target.value === 'on'))}>
                  <option value="on">is ticked</option>
                  <option value="off">is not ticked</option>
                </Select>
              ) : src ? (
                <>
                  <Select value={op} onChange={(e) => setAt(i, build(e.target.value as 'equals' | 'notEquals', val))}>
                    <option value="equals">is any of</option>
                    <option value="notEquals">is none of</option>
                  </Select>
                  <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto">
                    {choices.map((ch) => {
                      const on = selected.includes(ch);
                      return (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => {
                            const nextSel = on ? selected.filter((x) => x !== ch) : [...selected, ch];
                            setAt(i, build(op, nextSel.length === 1 ? nextSel[0] : nextSel));
                          }}
                          className={`rounded-full px-2.5 py-1 text-[12px] font-semibold transition ${
                            on ? 'bg-[#1D1611] text-white' : 'bg-[#F3ECE0] text-[#6B5A4B] hover:bg-[#EADFCF]'
                          }`}
                        >
                          {ch}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
      <Btn
        size="sm"
        className="mt-2.5"
        icon={<Plus className="h-3.5 w-3.5" />}
        disabled={!sources.length}
        onClick={() => {
          const s = sources[0];
          const c: Condition = { field: s.field.id, equals: s.field.type === 'checkbox' ? true : optionLabels(s.field, schema)[0] ?? '' };
          if (s.section && s.section !== localSection) c.section = s.section;
          onChange([...conditions, c]);
        }}
      >
        Add condition
      </Btn>
    </div>
  );
};
