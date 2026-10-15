import React from 'react';
import { Sparkles } from 'lucide-react';

interface SectionHeadingProps {
  number?: string;
  eyebrow?: string;
  title: React.ReactNode;
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C6832B]/10 border border-[#C6832B]/30 text-[#9C6019] mb-4 shadow-sm">
          {number && (
            <span className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-md ${
              isLight ? 'bg-[#C6832B] text-white' : 'bg-[#FAF3E7] text-[#9C6019] border border-[#D4BC9F]'
            }`}>
              {number}
            </span>
          )}
          {eyebrow && (
            <span className={`text-xs md:text-sm font-bold tracking-[0.2em] uppercase font-sans ${
              isLight ? 'text-[#D4973F]' : 'text-[#2D1E12]'
            }`}>
              {eyebrow}
            </span>
          )}
          <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-[#D4973F]' : 'text-[#C6832B]'}`} />
        </div>
      )}

      {/* Main Title with Elegant Typography */}
      <h2 className={`font-serif font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.15] ${
        isLight ? 'text-white' : 'text-[#1D1611]'
      }`}>
        {title}
      </h2>

      {/* Regal Decorative Divider with Center Diamond */}
      <div className={`flex items-center gap-2 mt-4 mb-4 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#B57321] to-[#D4973F]" />
        <div className="w-2 h-2 rotate-45 bg-[#C6832B] shadow-sm" />
        <div className="h-0.5 w-8 rounded-full bg-[#D4BC9F]" />
      </div>

      {/* Subtitle / Description */}
      {subtitle && (
        <p className={`text-base md:text-lg max-w-3xl leading-relaxed ${
          isLight ? 'text-slate-200 font-light' : 'text-[#5C4837] font-normal'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
