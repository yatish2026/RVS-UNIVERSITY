import React from 'react';
import { Check } from 'lucide-react';
import type { FieldDef, FormSchema, SectionDef, StepDef } from '../types';

/** Post types offered in the form (from the "Post Types" list), e.g. Teaching, Non Teaching. */
export const postTypeLabels = (s: FormSchema): string[] =>
  (s.lists.find((l) => l.id === 'postTypes')?.options ?? []).filter((o) => !o.hidden).map((o) => o.label);

type Restrictable = { postTypes?: string[] };

export const shownFor = (item: Restrictable, all: string[]): string[] =>
  item.postTypes && item.postTypes.length ? all.filter((p) => item.postTypes!.includes(p)) : all;

export const mandatoryFor = (f: FieldDef, all: string[]): string[] => {
  const shown = shownFor(f, all);
  if (f.requiredFor) return shown.filter((p) => f.requiredFor!.includes(p));
  return f.required ? shown : [];
};

/** Write "show for" on a step / section / field (all selected = no restriction). */
export function applyShow(item: Restrictable, show: string[], all: string[]) {
  const s = all.filter((p) => show.includes(p));
  if (s.length === 0 || s.length === all.length) delete item.postTypes;
  else item.postTypes = s;
}

/** Write "show for" + "mandatory for" on a field, keeping the stored shape minimal. */
export function applyAudience(f: FieldDef, show: string[], mand: string[], all: string[]) {
  applyShow(f, show, all);
  const s = shownFor(f, all);
  const m = s.filter((p) => mand.includes(p));
  if (m.length === 0) {
    delete f.requiredFor;
    f.required = false;
  } else if (m.length === s.length) {
    delete f.requiredFor;
    f.required = true;
  } else {
    f.requiredFor = m;
    f.required = true;
  }
}

export const audienceText = (f: FieldDef, all: string[]): string => {
  const s = shownFor(f, all);
  const m = mandatoryFor(f, all);
  const who = s.length === all.length ? 'All posts' : s.join(', ');
  const req = m.length === 0 ? 'optional' : m.length === s.length ? 'mandatory' : `mandatory for ${m.join(', ')}`;
  return `${who} · ${req}`;
};

export type AnyRestrictable = StepDef | SectionDef | FieldDef;

/** Core fields: position fields (other than Post type) may be limited to some post types. */
export const lockFlags = (f: FieldDef, sectionId: string) => ({
  lockShow: !!f.locked && !(sectionId === 'position' && f.id !== 'postType'),
  lockMandatory: !!f.locked,
});

const Chip: React.FC<{ on: boolean; disabled?: boolean; onClick: () => void; tone: 'show' | 'req'; children: React.ReactNode }> = ({
  on,
  disabled,
  onClick,
  tone,
  children,
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    aria-pressed={on}
    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-45 ${
      on
        ? tone === 'req'
          ? 'border-rose-200 bg-rose-50 text-rose-700'
          : 'border-[#1D1611] bg-[#1D1611] text-white'
        : 'border-[#E3D6C6] bg-white text-[#867362] hover:border-[#C6832B]'
    }`}
  >
    <span
      className={`flex h-3.5 w-3.5 items-center justify-center rounded ${
        on ? (tone === 'req' ? 'bg-rose-500' : 'bg-[#C6832B]') : 'border border-[#D4BC9F]'
      }`}
    >
      {on && <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />}
    </span>
    {children}
  </button>
);

/** "Show for" (+ optional "Mandatory for") chip rows. */
export const AudienceEditor: React.FC<{
  all: string[];
  show: string[];
  mandatory?: string[];
  onChange: (show: string[], mandatory: string[]) => void;
  lockShow?: boolean;
  lockMandatory?: boolean;
  withMandatory?: boolean;
  noun?: string;
}> = ({ all, show, mandatory = [], onChange, lockShow, lockMandatory, withMandatory = true, noun = 'field' }) => {
  const toggle = (arr: string[], p: string) => (arr.includes(p) ? arr.filter((x) => x !== p) : [...arr, p]);
  return (
    <div className="space-y-3 rounded-xl border border-[#EDE3D6] bg-[#FDFAF5] p-3.5">
      <div>
        <p className="mb-1.5 text-[12px] font-semibold text-[#6B5A4B]">Show this {noun} for</p>
        <div className="flex flex-wrap gap-1.5">
          {all.map((p) => (
            <Chip
              key={p}
              tone="show"
              on={show.includes(p)}
              disabled={lockShow || (show.includes(p) && show.length === 1)}
              onClick={() => {
                const s = toggle(show, p);
                onChange(s, mandatory.filter((m) => s.includes(m)));
              }}
            >
              {p}
            </Chip>
          ))}
        </div>
      </div>
      {withMandatory && (
        <div>
          <p className="mb-1.5 text-[12px] font-semibold text-[#6B5A4B]">
            Mandatory for <span className="font-normal text-[#AD9A88]">(untick = optional)</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {all.map((p) => (
              <Chip key={p} tone="req" on={mandatory.includes(p)} disabled={lockMandatory || !show.includes(p)} onClick={() => onChange(show, toggle(mandatory, p))}>
                {p}
              </Chip>
            ))}
          </div>
        </div>
      )}
      {(lockShow || lockMandatory) && (
        <p className="text-[11.5px] text-[#9C8B79]">
          Core field — {lockShow ? 'always shown and ' : ''}mandatory wherever it is shown.
        </p>
      )}
    </div>
  );
};
