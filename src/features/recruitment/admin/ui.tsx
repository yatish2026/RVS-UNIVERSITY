import React, { useEffect } from 'react';
import { X } from 'lucide-react';

type BtnVariant = 'primary' | 'gold' | 'outline' | 'ghost' | 'danger';

const btnStyles: Record<BtnVariant, string> = {
  primary: 'bg-[#1D1611] text-white hover:bg-[#322820] shadow-sm',
  gold: 'bg-gradient-to-r from-[#C6832B] to-[#B57321] text-white hover:brightness-105 shadow-sm shadow-[#B57321]/20',
  outline: 'border border-[#E3D6C6] bg-white text-[#3B2F25] hover:border-[#C6832B]',
  ghost: 'text-[#6B5A4B] hover:bg-[#F3ECE0] hover:text-[#1D1611]',
  danger: 'border border-rose-200 bg-white text-rose-600 hover:bg-rose-50',
};

export const Btn: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; size?: 'sm' | 'md'; icon?: React.ReactNode }
> = ({ variant = 'outline', size = 'md', icon, className = '', children, ...rest }) => (
  <button
    type="button"
    {...rest}
    className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg font-semibold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C6832B]/25 disabled:cursor-not-allowed disabled:opacity-50 ${
      size === 'sm' ? 'h-8 px-2.5 text-[12.5px]' : 'h-10 px-3.5 text-[13.5px]'
    } ${btnStyles[variant]} ${className}`}
  >
    {icon}
    {children}
  </button>
);

export const IconBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string; tone?: 'default' | 'danger' }> = ({
  label,
  tone = 'default',
  className = '',
  children,
  ...rest
}) => (
  <button
    type="button"
    title={label}
    aria-label={label}
    {...rest}
    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-30 ${
      tone === 'danger' ? 'text-[#9C8B79] hover:bg-rose-50 hover:text-rose-600' : 'text-[#9C8B79] hover:bg-[#F3ECE0] hover:text-[#1D1611]'
    } ${className}`}
  >
    {children}
  </button>
);

export const inputCls =
  'w-full rounded-lg border border-[#E3D6C6] bg-white px-3 text-[13.5px] text-[#1D1611] placeholder:text-[#B3A493] transition focus:border-[#C6832B] focus:outline-none focus:ring-4 focus:ring-[#C6832B]/15 disabled:bg-[#F7F1E8]';

export const TextIn: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...rest }) => (
  <input {...rest} className={`${inputCls} h-9 ${className}`} />
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...rest }) => (
  <textarea {...rest} className={`${inputCls} min-h-[84px] py-2 leading-relaxed ${className}`} />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...rest }) => (
  <select {...rest} className={`${inputCls} h-9 pr-8 ${className}`}>
    {children}
  </select>
);

export const Label: React.FC<{ children: React.ReactNode; hint?: string }> = ({ children, hint }) => (
  <span className="mb-1 block text-[12px] font-semibold text-[#6B5A4B]">
    {children}
    {hint && <span className="ml-1 font-normal text-[#AD9A88]">{hint}</span>}
  </span>
);

export const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode; className?: string }> = ({
  label,
  hint,
  children,
  className = '',
}) => (
  <label className={`block ${className}`}>
    <Label hint={hint}>{label}</Label>
    {children}
  </label>
);

export const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label?: string; description?: string; disabled?: boolean }> = ({
  checked,
  onChange,
  label,
  description,
  disabled,
}) => (
  <label className={`flex items-start gap-3 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition ${checked ? 'bg-[#B57321]' : 'bg-[#DCCFBF]'}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${checked ? 'left-[18px]' : 'left-0.5'}`} />
    </button>
    {(label || description) && (
      <span>
        {label && <span className="block text-[13.5px] font-semibold text-[#1D1611]">{label}</span>}
        {description && <span className="block text-[12px] text-[#867362]">{description}</span>}
      </span>
    )}
  </label>
);

export const Card: React.FC<{ title?: React.ReactNode; actions?: React.ReactNode; children: React.ReactNode; className?: string; pad?: boolean }> = ({
  title,
  actions,
  children,
  className = '',
  pad = true,
}) => (
  <section className={`rounded-2xl border border-[#EDE3D6] bg-white shadow-[0_1px_2px_rgba(29,22,17,0.04)] ${className}`}>
    {(title || actions) && (
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F3ECE0] px-5 py-3.5">
        <div className="text-[14.5px] font-bold text-[#1D1611]">{title}</div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </header>
    )}
    <div className={pad ? 'p-5' : ''}>{children}</div>
  </section>
);

export const Modal: React.FC<{ open: boolean; onClose: () => void; title: React.ReactNode; children: React.ReactNode; wide?: boolean; footer?: React.ReactNode }> = ({
  open,
  onClose,
  title,
  children,
  wide,
  footer,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#140E0A]/50 p-3 backdrop-blur-sm sm:p-6" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
        className={`relative my-auto w-full overflow-hidden rounded-2xl bg-white shadow-2xl ${wide ? 'max-w-6xl' : 'max-w-lg'}`}
      >
        <div className="flex items-center justify-between border-b border-[#F3ECE0] px-5 py-3.5">
          <div className="text-[15px] font-bold text-[#1D1611]">{title}</div>
          <IconBtn label="Close" onClick={onClose}>
            <X className="h-4 w-4" />
          </IconBtn>
        </div>
        <div className="max-h-[calc(100vh-160px)] overflow-y-auto">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-[#F3ECE0] bg-[#FDFAF5] px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
};

const statusTone: Record<string, string> = {
  New: 'bg-sky-50 text-sky-700 ring-sky-200',
  'Under Review': 'bg-amber-50 text-amber-700 ring-amber-200',
  Shortlisted: 'bg-violet-50 text-violet-700 ring-violet-200',
  Interview: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  Selected: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'On Hold': 'bg-slate-100 text-slate-700 ring-slate-200',
  Rejected: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11.5px] font-semibold ring-1 ring-inset ${statusTone[status] ?? statusTone['On Hold']}`}>
    {status}
  </span>
);

export const Chip: React.FC<{ children: React.ReactNode; onRemove?: () => void; tone?: 'gold' | 'neutral' }> = ({ children, onRemove, tone = 'neutral' }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
      tone === 'gold' ? 'bg-[#FAF3E7] text-[#9C6019] ring-1 ring-inset ring-[#F0D19E]' : 'bg-[#F3ECE0] text-[#4D3D30]'
    }`}
  >
    {children}
    {onRemove && (
      <button type="button" onClick={onRemove} className="-mr-1 rounded-full p-0.5 hover:bg-black/10" aria-label="Remove">
        <X className="h-3 w-3" />
      </button>
    )}
  </span>
);

/** Multi-value input that turns typed entries into chips (Enter / comma). */
export const ChipsInput: React.FC<{ values: string[]; onChange: (v: string[]) => void; placeholder?: string; validate?: (v: string) => string | null }> = ({
  values,
  onChange,
  placeholder,
  validate,
}) => {
  const [text, setText] = React.useState('');
  const [err, setErr] = React.useState<string | null>(null);
  const commit = () => {
    const parts = text.split(/[,;\s]+/).map((s) => s.trim()).filter(Boolean);
    if (!parts.length) return;
    for (const p of parts) {
      const e = validate?.(p);
      if (e) {
        setErr(e);
        return;
      }
    }
    onChange(Array.from(new Set([...values, ...parts])));
    setText('');
    setErr(null);
  };
  return (
    <div>
      <div className={`${inputCls} flex min-h-[40px] flex-wrap items-center gap-1.5 py-1.5`}>
        {values.map((v) => (
          <Chip key={v} tone="gold" onRemove={() => onChange(values.filter((x) => x !== v))}>
            {v}
          </Chip>
        ))}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              commit();
            } else if (e.key === 'Backspace' && !text && values.length) onChange(values.slice(0, -1));
          }}
          onBlur={commit}
          placeholder={values.length ? '' : placeholder}
          className="min-w-[160px] flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-[#B3A493]"
        />
      </div>
      {err && <p className="mt-1 text-[12px] text-rose-600">{err}</p>}
    </div>
  );
};
