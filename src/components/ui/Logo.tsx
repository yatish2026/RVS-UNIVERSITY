import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark', 
  size = 'md', 
  className = '', 
  showText = true 
}) => {
  const isLight = variant === 'light';

  // Standard Tailwind sizing classes with fixed dimensions
  const logoDimensions = {
    sm: 'w-9 h-9 min-w-[36px] min-h-[36px]',
    md: 'w-12 h-12 md:w-14 md:h-14 min-w-[48px] min-h-[48px]',
    lg: 'w-16 h-16 md:w-20 md:h-20 min-w-[64px] min-h-[64px]',
  };

  // Typography sizing
  const titleSizes = {
    sm: 'text-base md:text-lg',
    md: 'text-xl sm:text-2xl md:text-[26px]',
    lg: 'text-2xl md:text-3xl',
  };

  return (
    <a href="#home" className={`flex items-center gap-3 group select-none flex-shrink-0 ${className}`}>
      {/* Official Circular University Crest */}
      <div className={`relative flex-shrink-0 ${logoDimensions[size]} transition-transform duration-300 group-hover:scale-105 rounded-full overflow-hidden shadow-md border-2 border-gold-400 bg-white p-0.5 aspect-square`}>
        <img
          src="/images/rvs-official-logo.png"
          alt="RVS University Official Seal"
          className="w-full h-full object-contain rounded-full block"
        />
      </div>

      {/* Prominent University Name with R(Red) V(Purple) S(Green) */}
      {showText && (
        <div className="flex flex-col justify-center flex-shrink-0">
          <span
            className={`font-serif font-black tracking-tight leading-none whitespace-nowrap ${titleSizes[size]}`}
          >
            <span className="text-[#E53935] font-black">R</span>
            <span className="text-[#8E24AA] font-black">V</span>
            <span className="text-[#2E7D32] font-black">S</span>{' '}
            <span className={isLight ? "text-gold-400 font-extrabold" : "text-gold-600 font-extrabold"}>UNIVERSITY</span>
          </span>
        </div>
      )}
    </a>
  );
};
