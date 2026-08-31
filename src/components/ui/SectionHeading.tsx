import React from 'react';
import { Sparkles } from 'lucide-react';

interface SectionHeadingProps {
  number?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  variant?: 'dark' | 'light';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  variant = 'dark',
  className = '',
}) => {
  const isCenter = align === 'center';
  const isLight = variant === 'light';

  return (
    <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {/* Eyebrow & Number with Premium Pill */}
      {(eyebrow || number) && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 mb-4 shadow-sm">
          {number && (
            <span className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-md ${
              isLight ? 'bg-gold-400 text-navy-950' : 'bg-navy-950 text-gold-300'
            }`}>
              {number}
            </span>
          )}
          {eyebrow && (
            <span className={`text-xs md:text-sm font-bold tracking-[0.2em] uppercase font-sans ${
              isLight ? 'text-gold-300' : 'text-navy-900'
            }`}>
              {eyebrow}
            </span>
          )}
          <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-gold-300' : 'text-gold-500'}`} />
        </div>
      )}

      {/* Main Title with Elegant Typography */}
      <h2 className={`font-serif font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] ${
        isLight ? 'text-white' : 'text-navy-950'
      }`}>
        {title}
      </h2>

      {/* Regal Decorative Divider with Center Diamond */}
      <div className={`flex items-center gap-2 mt-4 mb-4 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-gold-600 to-gold-400" />
        <div className="w-2 h-2 rotate-45 bg-gold-500 shadow-sm" />
        <div className="h-0.5 w-8 rounded-full bg-gold-300/60" />
      </div>

      {/* Subtitle / Description */}
      {subtitle && (
        <p className={`text-base md:text-lg max-w-3xl leading-relaxed ${
          isLight ? 'text-slate-200 font-light' : 'text-slate-600 font-normal'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
