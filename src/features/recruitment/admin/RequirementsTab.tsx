import React, { useState } from 'react';
import { Check, EyeOff, GitBranch, Lock, Minus, Repeat, Search } from 'lucide-react';
import type { FieldDef, FormSchema, SectionDef, StepDef } from '../types';
import { applyAudience, applyShow, lockFlags, mandatoryFor, postTypeLabels, shownFor } from './audience';
import { Card, TextIn } from './ui';

type Mutate = (fn: (s: FormSchema) => void) => void;
type Tri = boolean | 'mixed';

const Box: React.FC<{ value: Tri; onClick?: () => void; disabled?: boolean; tone: 'show' | 'req'; title?: string }> = ({ value, onClick, disabled, tone, title }) => {
  const on = value === true;
  const mixed = value === 'mixed';
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={mixed ? 'mixed' : on}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`mx-auto flex h-5 w-5 items-center justify-center rounded-md border transition disabled:cursor-not-allowed disabled:opacity-35 ${
        on || mixed
          ? tone === 'req'
            ? 'border-rose-500 bg-rose-500'
            : 'border-[#1D1611] bg-[#1D1611]'
          : 'border-[#D4BC9F] bg-white hover:border-[#C6832B]'
      }`}
    >
      {on && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} />}
      {mixed && <Minus className="h-3.5 w-3.5 text-white" strokeWidth={3.5} />}
    </button>
  );
};

export const RequirementsTab: React.FC<{ draft: FormSchema; mutate: Mutate }> = ({ draft, mutate }) => {
  const all = postTypeLabels(draft);
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();

  if (all.length < 2) {
    return (
      <Card>
        <p className="text-[#867362]">Add at least two options to the “Post Types” list (e.g. Teaching, Non Teaching) to set requirements per post type.</p>
      </Card>
    );
  }

  const stepOf = (s: FormSchema, id: string) => s.steps.find((x) => x.id === id)!;
  const secOf = (s: FormSchema, stepId: string, id: string) => stepOf(s, stepId).sections.find((x) => x.id === id)!;
  const fieldOf = (s: FormSchema, stepId: string, sid: string, fid: string) => secOf(s, stepId, sid).fields.find((x) => x.id === fid)!;

  const toggle = (arr: string[], p: string) => (arr.includes(p) ? arr.filter((x) => x !== p) : [...arr, p]);

  const setFieldShow = (st: StepDef, sec: SectionDef, f: FieldDef, p: string) =>
    mutate((s) => {
      const x = fieldOf(s, st.id, sec.id, f.id);
      const show = toggle(shownFor(x, all), p);
      if (!show.length) return;
      applyAudience(x, show, mandatoryFor(x, all), all);
    });

  const setFieldReq = (st: StepDef, sec: SectionDef, f: FieldDef, p: string) =>
    mutate((s) => {
      const x = fieldOf(s, st.id, sec.id, f.id);
      applyAudience(x, shownFor(x, all), toggle(mandatoryFor(x, all), p), all);
    });

  const editable = (sec: SectionDef, f: FieldDef, p: string) => !f.hidden && !lockFlags(f, sec.id).lockMandatory && shownFor(f, all).includes(p);

  const sectionReq = (sec: SectionDef, p: string): Tri => {
    const fs = sec.fields.filter((f) => !f.hidden && shownFor(f, all).includes(p));
    if (!fs.length) return false;
    const n = fs.filter((f) => mandatoryFor(f, all).includes(p)).length;
    return n === 0 ? false : n === fs.length ? true : 'mixed';
  };

  const setSectionReq = (st: StepDef, sec: SectionDef, p: string) => {
    const makeMandatory = sectionReq(sec, p) !== true;
    mutate((s) => {
      for (const x of secOf(s, st.id, sec.id).fields) {
        if (!editable(sec, x, p)) continue;
        const m = mandatoryFor(x, all);
        const next = makeMandatory ? Array.from(new Set([...m, p])) : m.filter((y) => y !== p);
        applyAudience(x, shownFor(x, all), next, all);
      }
    });
  };

  const setBlockShow = (st: StepDef, sec: SectionDef | null, p: string) =>
    mutate((s) => {
      const target = sec ? secOf(s, st.id, sec.id) : stepOf(s, st.id);
      const show = toggle(shownFor(target, all), p);
      if (!show.length) return;
      applyShow(target, show, all);
    });

  const matches = (st: StepDef, sec: SectionDef, f?: FieldDef) =>
    !needle || `${st.title} ${sec.title} ${f ? f.label : sec.fields.map((x) => x.label).join(' ')}`.toLowerCase().includes(needle);

  const head = 'px-2 py-2 text-center text-[11px] font-bold uppercase tracking-[0.06em]';

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl text-[13.5px] leading-relaxed text-[#6B5A4B]">
            Decide, for every field, <b>who sees it</b> and <b>whether it is mandatory</b> — separately for each post type. Untick
            <span className="mx-1 inline-block rounded bg-rose-50 px-1.5 font-semibold text-rose-700">Mandatory</span>
            to make a field optional. Section rows change all fields in that section at once. Click <b>Save &amp; publish</b> when done.
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#AD9A88]" />
            <TextIn value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a field…" className="pl-9" />
          </div>
        </div>
      </Card>

      <Card pad={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-[13px]">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-[#F3ECE0]">
                <th rowSpan={2} className="px-4 py-2 text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#9C8B79]">
                  Field
                </th>
                {all.map((p) => (
                  <th key={p} colSpan={2} className={`${head} border-l border-[#F3ECE0] text-[#1D1611]`}>
                    {p}
                  </th>
                ))}
              </tr>
              <tr className="border-b border-[#EDE3D6] bg-[#FDFAF5]">
                {all.map((p) => (
                  <React.Fragment key={p}>
                    <th className={`${head} w-20 border-l border-[#F3ECE0] text-[#867362]`}>Show</th>
                    <th className={`${head} w-24 text-rose-600`}>Mandatory</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {draft.steps.map((st) => {
                const secs = st.sections.filter((sec) => sec.fields.some((f) => matches(st, sec, f)) || matches(st, sec));
                if (!secs.length) return null;
                const stepShow = shownFor(st, all);
                const stepLock = st.sections.some((x) => x.fields.some((f) => lockFlags(f, x.id).lockShow));
                return (
                  <React.Fragment key={st.id}>
                    <tr className="bg-[#1D1611] text-white">
                      <td className="px-4 py-2.5 font-bold">
                        {st.title}
                        {st.hidden && <span className="ml-2 rounded bg-white/15 px-1.5 text-[11px]">hidden</span>}
                        {st.showIf?.length ? <GitBranch className="ml-2 inline h-3.5 w-3.5 opacity-70" /> : null}
                      </td>
                      {all.map((p) => (
                        <React.Fragment key={p}>
                          <td className="border-l border-white/10 px-2 py-2">
                            <div className="flex justify-center rounded-md bg-white/90 p-0.5">
                              <Box
                                tone="show"
                                value={stepShow.includes(p)}
                                disabled={stepLock || (stepShow.includes(p) && stepShow.length === 1)}
                                title={stepLock ? 'Contains core fields shown to everyone' : `Show this step for ${p}`}
                                onClick={() => setBlockShow(st, null, p)}
                              />
                            </div>
                          </td>
                          <td />
                        </React.Fragment>
                      ))}
                    </tr>
                    {secs.map((sec) => {
                      const secShow = shownFor(sec, all);
                      const secLock = sec.fields.some((f) => lockFlags(f, sec.id).lockShow);
                      return (
                        <React.Fragment key={sec.id}>
                          <tr className="border-b border-[#F3ECE0] bg-[#FAF3E7]">
                            <td className="px-4 py-2 pl-6 text-[12.5px] font-bold uppercase tracking-[0.06em] text-[#9C6019]">
                              {sec.title}
                              {sec.repeatable && <Repeat className="ml-1.5 inline h-3.5 w-3.5 text-[#B57321]" />}
                              {sec.hidden && <span className="ml-2 rounded bg-[#EADFCF] px-1.5 text-[11px] normal-case">hidden</span>}
                            </td>
                            {all.map((p) => {
                              const visible = stepShow.includes(p) && secShow.includes(p);
                              return (
                                <React.Fragment key={p}>
                                  <td className="border-l border-[#F3ECE0] px-2 py-2">
                                    <Box
                                      tone="show"
                                      value={secShow.includes(p)}
                                      disabled={secLock || !stepShow.includes(p) || (secShow.includes(p) && secShow.length === 1)}
                                      title={`Show this section for ${p}`}
                                      onClick={() => setBlockShow(st, sec, p)}
                                    />
                                  </td>
                                  <td className="px-2 py-2">
                                    <Box
                                      tone="req"
                                      value={visible ? sectionReq(sec, p) : false}
                                      disabled={!visible || !sec.fields.some((f) => editable(sec, f, p))}
                                      title={`Make every field in this section mandatory / optional for ${p}`}
                                      onClick={() => setSectionReq(st, sec, p)}
                                    />
                                  </td>
                                </React.Fragment>
                              );
                            })}
                          </tr>
                          {sec.fields.filter((f) => matches(st, sec, f)).map((f) => {
                            const fShow = shownFor(f, all);
                            const fReq = mandatoryFor(f, all);
                            const locks = lockFlags(f, sec.id);
                            return (
                              <tr key={f.id} className={`border-b border-[#F6F0E7] hover:bg-[#FDFAF5] ${f.hidden ? 'opacity-45' : ''}`}>
                                <td className="px-4 py-2 pl-9">
                                  <span className="font-semibold text-[#1D1611]">{f.label}</span>
                                  {f.locked && <Lock className="ml-1.5 inline h-3 w-3 text-[#AD9A88]" aria-label="Core field" />}
                                  {f.showIf?.length ? (
                                    <span title="Also depends on another answer">
                                      <GitBranch className="ml-1.5 inline h-3 w-3 text-[#AD9A88]" />
                                    </span>
                                  ) : null}
                                  {f.hidden && (
                                    <span className="ml-2 inline-flex items-center gap-1 rounded bg-[#F3ECE0] px-1.5 text-[11px] text-[#867362]">
                                      <EyeOff className="h-3 w-3" /> hidden for everyone
                                    </span>
                                  )}
                                </td>
                                {all.map((p) => {
                                  const parentOk = stepShow.includes(p) && secShow.includes(p);
                                  return (
                                    <React.Fragment key={p}>
                                      <td className="border-l border-[#F3ECE0] px-2 py-2">
                                        <Box
                                          tone="show"
                                          value={parentOk && fShow.includes(p)}
                                          disabled={f.hidden || locks.lockShow || !parentOk || (fShow.includes(p) && fShow.length === 1)}
                                          title={!parentOk ? `The whole ${stepShow.includes(p) ? 'section' : 'step'} is not shown for ${p}` : `Show for ${p}`}
                                          onClick={() => setFieldShow(st, sec, f, p)}
                                        />
                                      </td>
                                      <td className="px-2 py-2">
                                        <Box
                                          tone="req"
                                          value={parentOk && fReq.includes(p)}
                                          disabled={f.hidden || locks.lockMandatory || !parentOk || !fShow.includes(p)}
                                          title={`Mandatory for ${p}`}
                                          onClick={() => setFieldReq(st, sec, f, p)}
                                        />
                                      </td>
                                    </React.Fragment>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
