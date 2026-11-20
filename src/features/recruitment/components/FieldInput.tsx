import React, { useId, useRef } from 'react';
import { AlertCircle, Check, ChevronDown, FileText, Paperclip, UploadCloud, X } from 'lucide-react';
import type { FieldDef, FieldValue, FileMeta, ListOption } from '../types';
import { isFileMeta } from '../engine';

interface Props {
  field: FieldDef;
  value: FieldValue;
  error?: string;
  options: ListOption[];
  waitingFor?: string;
  waitingLabel?: string;
  onChange: (value: FieldValue, file?: File | null) => void;
  disabled?: boolean;
}

const inputBase =
  'w-full rounded-xl border bg-white px-3.5 text-[15px] text-[#1D1611] placeholder:text-[#B3A493] shadow-[0_1px_0_rgba(29,22,17,0.03)] transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-[#F7F1E8] disabled:text-[#9C8B79]';
const okBorder = 'border-[#E3D6C6] hover:border-[#D4BC9F] focus:border-[#C6832B] focus:ring-[#C6832B]/15';
const errBorder = 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15';

export const formatBytes = (n: number) =>
  n < 1024 ? `${n} B` : n < 1024 * 1024 ? `${(n / 1024).toFixed(0)} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;

function groupOptions(options: ListOption[]): { group: string; options: ListOption[] }[] {
  const groups: { group: string; options: ListOption[] }[] = [];
  for (const o of options) {
    const g = o.group || '';
    let bucket = groups.find((x) => x.group === g);
    if (!bucket) groups.push((bucket = { group: g, options: [] }));
    bucket.options.push(o);
  }
  return groups;
}

export const FieldLabel: React.FC<{ field: FieldDef; htmlFor?: string }> = ({ field, htmlFor }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-semibold leading-snug tracking-[0.01em] text-[#3B2F25]">
    {field.label}
    {field.required && (
      <span className="ml-1 text-rose-500" aria-hidden>
        *
      </span>
    )}
  </label>
);

export const FieldInput: React.FC<Props> = ({ field, value, error, options, waitingFor, waitingLabel, onChange, disabled }) => {
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const strVal = typeof value === 'string' ? value : value === null || value === undefined ? '' : isFileMeta(value) ? '' : String(value);
  const border = error ? errBorder : okBorder;
  const describedBy = error ? `${id}-err` : field.help ? `${id}-help` : undefined;

  const setText = (raw: string) => {
    let v = raw;
    if (field.transform === 'uppercase') v = v.toUpperCase();
    if (field.type === 'number') v = v.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    if (field.type === 'year') v = v.replace(/[^0-9]/g, '').slice(0, 4);
    if (field.type === 'tel') v = v.replace(/[^0-9+\- ]/g, '').slice(0, 15);
    onChange(v);
  };

  let control: React.ReactNode;

  switch (field.type) {
    case 'textarea':
      control = (
        <textarea
          id={id}
          rows={3}
          value={strVal}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          onChange={(e) => setText(e.target.value)}
          className={`${inputBase} ${border} min-h-[96px] resize-y py-3 leading-relaxed`}
        />
      );
      break;

    case 'select': {
      const waiting = !!waitingFor;
      control = (
        <div className="relative">
          <select
            id={id}
            value={strVal}
            disabled={disabled || waiting}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputBase} ${border} h-12 appearance-none pr-10 ${strVal ? '' : 'text-[#9C8B79]'}`}
          >
            <option value="">{waiting ? `Choose ${waitingLabel ?? 'the option above'} first` : field.placeholder || 'Select…'}</option>
            {groupOptions(options).map((g) =>
              g.group ? (
                <optgroup key={g.group} label={g.group}>
                  {g.options.map((o) => (
                    <option key={o.label} value={o.label}>
                      {o.label}
                    </option>
                  ))}
                </optgroup>
              ) : (
                g.options.map((o) => (
                  <option key={o.label} value={o.label}>
                    {o.label}
                  </option>
                ))
              ),
            )}
            {strVal && !options.some((o) => o.label === strVal) && <option value={strVal}>{strVal}</option>}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9C8B79]" />
        </div>
      );
      break;
    }

    case 'choice':
      control = (
        <div role="radiogroup" aria-labelledby={`${id}-lbl`} aria-describedby={describedBy} className="flex flex-wrap gap-2">
          {options.map((o) => {
            const active = strVal === o.label;
            return (
              <button
                key={o.label}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={disabled}
                onClick={() => onChange(active && !field.required ? '' : o.label)}
                className={`inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-[14px] font-semibold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C6832B]/25 ${
                  active
                    ? 'border-[#1D1611] bg-[#1D1611] text-white shadow-[0_6px_16px_-8px_rgba(29,22,17,0.6)]'
                    : error
                      ? 'border-rose-300 bg-white text-[#3B2F25] hover:border-rose-400'
                      : 'border-[#E3D6C6] bg-white text-[#3B2F25] hover:border-[#C6832B] hover:text-[#1D1611]'
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    active ? 'border-[#E4B56C] bg-[#C6832B]' : 'border-[#D4BC9F]'
                  }`}
                >
                  {active && <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />}
                </span>
                {o.label}
              </button>
            );
          })}
        </div>
      );
      break;

    case 'checkbox': {
      const checked = value === true;
      control = (
        <label
          htmlFor={id}
          className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
            checked ? 'border-[#C6832B] bg-[#FAF3E7]' : error ? 'border-rose-300 bg-white' : 'border-[#E3D6C6] bg-white hover:border-[#D4BC9F]'
          }`}
        >
          <input
            id={id}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            className="peer sr-only"
          />
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition peer-focus-visible:ring-4 peer-focus-visible:ring-[#C6832B]/25 ${
              checked ? 'border-[#C6832B] bg-[#C6832B]' : 'border-[#D4BC9F] bg-white'
            }`}
          >
            {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.5} />}
          </span>
          <span className="text-[14px] font-medium leading-snug text-[#3B2F25]">
            {field.label}
            {field.required && <span className="ml-1 text-rose-500">*</span>}
          </span>
        </label>
      );
      break;
    }

    case 'file': {
      const meta = isFileMeta(value) ? (value as FileMeta) : null;
      control = meta ? (
        <div className={`flex items-center gap-3 rounded-xl border bg-white px-3.5 py-3 ${error ? 'border-rose-300' : 'border-[#E3D6C6]'}`}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FAF3E7] text-[#B57321]">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-semibold text-[#1D1611]">{meta.name}</p>
            <p className="text-xs text-[#867362]">{formatBytes(meta.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onChange(null, null);
              if (fileRef.current) fileRef.current.value = '';
            }}
            className="rounded-lg p-2 text-[#867362] transition hover:bg-rose-50 hover:text-rose-600"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) onChange({ name: file.name, size: file.size, type: file.type }, file);
          }}
          className={`group flex w-full items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3.5 text-left transition ${
            error ? 'border-rose-300 bg-rose-50/40' : 'border-[#E3D6C6] bg-white hover:border-[#C6832B] hover:bg-[#FDF9F2]'
          }`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FAF3E7] text-[#B57321] transition group-hover:bg-[#C6832B] group-hover:text-white">
            <UploadCloud className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[14px] font-semibold text-[#1D1611]">Click to upload or drop a file</span>
            <span className="block text-xs text-[#867362]">
              {field.accept ? field.accept.replace(/\./g, '').toUpperCase().replace(/,/g, ', ') : 'Any file'}
              {field.maxSizeMB ? ` · up to ${field.maxSizeMB} MB` : ''}
            </span>
          </span>
          <Paperclip className="ml-auto h-4 w-4 text-[#C2B09C]" />
        </button>
      );
      control = (
        <>
          {control}
          <input
            ref={fileRef}
            id={id}
            type="file"
            accept={field.accept}
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onChange({ name: file.name, size: file.size, type: file.type }, file);
            }}
          />
        </>
      );
      break;
    }

    default: {
      const type = field.type === 'email' ? 'email' : field.type === 'date' ? 'date' : 'text';
      const inputMode =
        field.type === 'number' ? 'decimal' : field.type === 'year' ? 'numeric' : field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : undefined;
      control = (
        <input
          id={id}
          type={type}
          inputMode={inputMode as React.HTMLAttributes<HTMLInputElement>['inputMode']}
          value={strVal}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          disabled={disabled}
          autoComplete={
            field.id === 'email' ? 'email' : field.id === 'mobile' ? 'tel' : field.id === 'firstName' ? 'given-name' : field.id === 'lastName' ? 'family-name' : undefined
          }
          aria-invalid={!!error}
          aria-describedby={describedBy}
          onChange={(e) => setText(e.target.value)}
          className={`${inputBase} ${border} h-12 ${field.transform === 'uppercase' ? 'uppercase' : ''}`}
        />
      );
    }
  }

  return (
    <div>
      {field.type !== 'checkbox' && (
        <span id={`${id}-lbl`}>
          <FieldLabel field={field} htmlFor={field.type === 'choice' ? undefined : id} />
        </span>
      )}
      {control}
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-rose-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : field.help ? (
        <p id={`${id}-help`} className="mt-1.5 text-[12.5px] text-[#867362]">
          {field.help}
        </p>
      ) : null}
    </div>
  );
};
