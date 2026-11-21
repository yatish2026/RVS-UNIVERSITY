// Pure helpers shared by the public form, the admin console and the PDF export.
// The PHP backend (public/hr-api/_lib.php) mirrors the visibility + validation rules.

import type {
  Condition,
  FieldDef,
  FieldValue,
  FileMeta,
  FormSchema,
  FormValues,
  ListOption,
  SectionDef,
  SectionValues,
  StepDef,
} from './types';

export const fieldKey = (sectionId: string, index: number | null, fieldId: string) =>
  `${sectionId}.${index === null ? '_' : index}.${fieldId}`;

export const isFileMeta = (v: unknown): v is FileMeta =>
  !!v && typeof v === 'object' && 'name' in (v as Record<string, unknown>) && 'size' in (v as Record<string, unknown>);

export const isEmpty = (v: FieldValue): boolean => {
  if (v === null || v === undefined || v === false) return true;
  if (typeof v === 'string') return v.trim() === '';
  return false;
};

export function sectionData(values: FormValues, sectionId: string): SectionValues | undefined {
  const v = values[sectionId];
  return v && !Array.isArray(v) ? v : undefined;
}

function matches(actual: FieldValue, expected: string | string[] | boolean): boolean {
  if (typeof expected === 'boolean') return (actual === true || actual === 'true') === expected;
  const a = actual === null || actual === undefined ? '' : String(actual);
  return Array.isArray(expected) ? expected.includes(a) : a === expected;
}

export function evalConditions(
  conds: Condition[] | undefined,
  values: FormValues,
  sectionId: string | null,
  item?: SectionValues,
): boolean {
  if (!conds || conds.length === 0) return true;
  return conds.every((c) => {
    if (!c || !c.field) return true;
    const src = c.section && c.section !== sectionId ? sectionData(values, c.section) : item;
    const actual = src ? src[c.field] : undefined;
    if (c.equals !== undefined && c.equals !== '' && !matches(actual, c.equals)) return false;
    if (c.notEquals !== undefined && c.notEquals !== '' && matches(actual, c.notEquals)) return false;
    return true;
  });
}

/** The post type the applicant picked (position › postType), e.g. "Teaching". */
export const currentPostType = (values: FormValues): string => {
  const v = sectionData(values, 'position')?.postType;
  return typeof v === 'string' ? v : '';
};

/** Restricted items are shown only once a matching post type has been chosen. */
export const appliesTo = (postTypes: string[] | undefined, values: FormValues) =>
  !postTypes || postTypes.length === 0 || postTypes.includes(currentPostType(values));

export const isStepVisible = (step: StepDef, values: FormValues) =>
  !step.hidden && appliesTo(step.postTypes, values) && evalConditions(step.showIf, values, null);

export const isSectionVisible = (section: SectionDef, values: FormValues) =>
  !section.hidden && appliesTo(section.postTypes, values) && evalConditions(section.showIf, values, null);

export const isFieldVisible = (field: FieldDef, sectionId: string, item: SectionValues | undefined, values: FormValues) =>
  !field.hidden && appliesTo(field.postTypes, values) && evalConditions(field.showIf, values, sectionId, item);

/** Mandatory for the applicant's post type? (`requiredFor` overrides `required`.) */
export const isRequired = (field: FieldDef, values: FormValues): boolean =>
  field.requiredFor ? field.requiredFor.includes(currentPostType(values)) : !!field.required;

export const visibleSteps = (schema: FormSchema, values: FormValues) => schema.steps.filter((s) => isStepVisible(s, values));

export function resolveOptions(
  field: FieldDef,
  schema: FormSchema,
  item: SectionValues | undefined,
  values: FormValues,
): { options: ListOption[]; waitingFor?: string } {
  let options: ListOption[];
  if (field.listId) {
    const list = schema.lists.find((l) => l.id === field.listId);
    options = (list?.options ?? []).filter((o) => !o.hidden);
  } else {
    options = (field.options ?? []).map((label) => ({ label }));
  }
  if (field.filterBy?.field) {
    const src = field.filterBy.section ? sectionData(values, field.filterBy.section) : item;
    const by = src?.[field.filterBy.field];
    if (isEmpty(by)) return { options: [], waitingFor: field.filterBy.field };
    options = options.filter((o) => !o.tags || o.tags.length === 0 || o.tags.includes(String(by)));
  }
  return { options };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: FieldDef, raw: FieldValue, required: boolean = !!field.required): string | null {
  if (field.type === 'file') {
    if (!raw) return required ? 'Please upload this file' : null;
    if (isFileMeta(raw) && field.maxSizeMB && raw.size > field.maxSizeMB * 1024 * 1024)
      return `File must be ${field.maxSizeMB} MB or smaller`;
    if (isFileMeta(raw) && field.accept) {
      const ext = raw.name.split('.').pop()?.toLowerCase() ?? '';
      const allowed = field.accept.split(',').map((a) => a.trim().replace(/^\./, '').toLowerCase());
      if (!allowed.includes(ext)) return `Allowed file types: ${field.accept}`;
    }
    return null;
  }
  if (field.type === 'checkbox') return required && raw !== true ? 'Please tick this box' : null;

  const v = typeof raw === 'string' ? raw.trim() : raw === null || raw === undefined ? '' : String(raw);
  if (v === '') return required ? 'This field is required' : null;

  if (field.type === 'email' && !EMAIL_RE.test(v)) return 'Enter a valid email address';
  if (field.type === 'number' || field.type === 'year') {
    const n = Number(v);
    if (!Number.isFinite(n)) return 'Enter a valid number';
    if (field.type === 'year' && !Number.isInteger(n)) return 'Enter a 4-digit year';
    if (field.min !== undefined && field.min !== null && n < field.min) return `Must be ${field.min} or more`;
    if (field.max !== undefined && field.max !== null && n > field.max) return `Must be ${field.max} or less`;
  }
  if (field.type === 'date' && Number.isNaN(Date.parse(v))) return 'Enter a valid date';
  if (field.maxLength && v.length > field.maxLength) return `Keep this under ${field.maxLength} characters`;
  if (field.pattern) {
    try {
      if (!new RegExp(field.pattern).test(v)) return field.patternMessage || 'Invalid format';
    } catch {
      /* invalid admin regex: ignore */
    }
  }
  return null;
}

export function validateStep(step: StepDef, schema: FormSchema, values: FormValues): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const section of step.sections) {
    if (!isSectionVisible(section, values)) continue;
    const check = (item: SectionValues | undefined, index: number | null) => {
      for (const field of section.fields) {
        if (!isFieldVisible(field, section.id, item, values)) continue;
        const err = validateField(field, item?.[field.id], isRequired(field, values));
        if (err) errors[fieldKey(section.id, index, field.id)] = err;
      }
    };
    if (section.repeatable) {
      const items = (values[section.id] as SectionValues[] | undefined) ?? [];
      if (section.minItems && items.length < section.minItems)
        errors[fieldKey(section.id, null, '__items')] = `Add at least ${section.minItems} ${section.itemLabel ?? 'item'}(s)`;
      items.forEach((it, i) => check(it, i));
    } else {
      check(sectionData(values, section.id), null);
    }
  }
  return errors;
}

export function initialValues(schema: FormSchema): FormValues {
  const values: FormValues = {};
  for (const step of schema.steps)
    for (const section of step.sections) {
      if (section.repeatable) {
        const blank = () => defaultsFor(section);
        values[section.id] = Array.from({ length: section.minItems ?? 0 }, blank);
      } else {
        values[section.id] = defaultsFor(section);
      }
    }
  return values;
}

export function defaultsFor(section: SectionDef): SectionValues {
  const item: SectionValues = {};
  for (const f of section.fields) if (f.defaultValue) item[f.id] = f.defaultValue;
  return item;
}

/** Keep only values of visible fields so hidden/conditional answers are not submitted. */
export function cleanValues(schema: FormSchema, values: FormValues): FormValues {
  const out: FormValues = {};
  for (const step of schema.steps) {
    if (!isStepVisible(step, values)) continue;
    for (const section of step.sections) {
      if (!isSectionVisible(section, values)) continue;
      const pick = (item: SectionValues | undefined) => {
        const res: SectionValues = {};
        for (const f of section.fields) {
          if (!isFieldVisible(f, section.id, item, values)) continue;
          const v = item?.[f.id];
          if (!isEmpty(v)) res[f.id] = typeof v === 'string' ? v.trim() : v;
        }
        return res;
      };
      if (section.repeatable) {
        out[section.id] = ((values[section.id] as SectionValues[] | undefined) ?? []).map(pick);
      } else {
        out[section.id] = pick(sectionData(values, section.id));
      }
    }
  }
  return out;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(v: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (!m) return v;
  return `${m[3]}-${MONTHS[Number(m[2]) - 1] ?? m[2]}-${m[1]}`;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function displayValue(field: FieldDef, v: FieldValue): string {
  if (isEmpty(v)) return '';
  if (field.type === 'checkbox') return v === true || v === 'true' ? 'Yes' : 'No';
  if (isFileMeta(v)) return v.name;
  const s = String(v);
  if (field.type === 'date') return formatDate(s);
  if (field.type === 'number' && /inr|salary|amount/i.test(field.label) && Number.isFinite(Number(s)))
    return Number(s).toLocaleString('en-IN');
  return s;
}

export interface SummarySection {
  id: string;
  title: string;
  repeatable: boolean;
  fields: FieldDef[];
  rows: { label: string; value: string; field: FieldDef }[];
  items: { label: string; value: string; field: FieldDef }[][];
}
export interface SummaryStep {
  id: string;
  title: string;
  sections: SummarySection[];
}

/**
 * Builds a printable summary. With `skipEmpty`, sections where the applicant
 * left everything blank are dropped (used for PDF / review).
 */
export function summarize(schema: Pick<FormSchema, 'steps'>, values: FormValues, skipEmpty = true): SummaryStep[] {
  const result: SummaryStep[] = [];
  for (const step of schema.steps) {
    if (!isStepVisible(step, values)) continue;
    const sections: SummarySection[] = [];
    for (const section of step.sections) {
      if (!isSectionVisible(section, values)) continue;
      const rowsFor = (item: SectionValues | undefined) =>
        section.fields
          .filter((f) => isFieldVisible(f, section.id, item, values))
          .map((f) => ({ label: f.label, value: displayValue(f, item?.[f.id]), field: f }));
      const s: SummarySection = {
        id: section.id,
        title: section.title,
        repeatable: !!section.repeatable,
        fields: section.fields.filter((f) => !f.hidden),
        rows: [],
        items: [],
      };
      if (section.repeatable) {
        s.items = ((values[section.id] as SectionValues[] | undefined) ?? []).map(rowsFor);
        if (skipEmpty) s.items = s.items.filter((it) => it.some((r) => r.value));
        if (skipEmpty && s.items.length === 0) continue;
      } else {
        s.rows = rowsFor(sectionData(values, section.id));
        if (skipEmpty && !s.rows.some((r) => r.value)) continue;
      }
      sections.push(s);
    }
    if (sections.length) result.push({ id: step.id, title: step.title, sections });
  }
  return result;
}

export const slugify = (s: string) =>
  s
    .replace(/[^A-Za-z0-9 ]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('')
    .slice(0, 40) || 'field';

export function uniqueId(base: string, taken: string[]): string {
  let id = slugify(base);
  let n = 2;
  while (taken.includes(id)) id = `${slugify(base)}${n++}`;
  return id;
}

export const widthClass: Record<string, string> = {
  full: 'sm:col-span-12',
  half: 'sm:col-span-6',
  third: 'sm:col-span-6 lg:col-span-4',
  quarter: 'sm:col-span-6 lg:col-span-3',
};
