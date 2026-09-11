import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
  showCaption?: boolean | 'responsive';
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark', 
  size = 'md', 
  className = '', 
  showText = true,
  showCaption = 'responsive'
}) => {
  // Standard Tailwind sizing classes with fixed dimensions
  const logoDimensions = {
    sm: 'w-8 h-8 md:w-9 md:h-9 min-w-[32px] min-h-[32px]',
    md: 'w-10 h-10 md:w-12 md:h-12 min-w-[40px] min-h-[40px]',
    lg: 'w-14 h-14 md:w-18 md:h-18 min-w-[56px] min-h-[56px]',
  };

  // Typography sizing
  const titleSizes = {
    sm: 'text-sm md:text-base',
    md: 'text-lg sm:text-xl md:text-[22px]',
    lg: 'text-2xl md:text-3xl',
  };

  return (
    <a href="#home" className={`flex items-center gap-2.5 sm:gap-3 group select-none flex-shrink-0 ${className}`}>
      {/* Official Circular University Crest */}
      <div className={`relative flex-shrink-0 ${logoDimensions[size]} transition-transform duration-300 group-hover:scale-105 rounded-full overflow-hidden shadow-md border-2 border-gold-400 bg-white p-0.5 aspect-square`}>
        <img
          src="/images/rvs-official-logo.png"
          alt="RVS University Official Seal"
          className="w-full h-full object-contain rounded-full block"
        />
      </div>

      {/* Prominent University Name with R(Red) V(Purple) S(Green) + Caption */}
      {showText && (
        <div className="flex flex-col justify-center flex-shrink-0">
          <span
            className={`font-serif font-black tracking-tight leading-none whitespace-nowrap ${titleSizes[size]}`}
          >
            <span className="text-[#FF4D4D] font-black">R</span>
            <span className="text-[#CE93D8] font-black">V</span>
            <span className="text-[#81C784] font-black">S</span>{' '}
            <span className="text-gold-400 font-extrabold drop-shadow-sm">UNIVERSITY</span>
          </span>
          {showCaption && (
            <span
              className={`text-[8.5px] sm:text-[9.5px] md:text-[10px] font-semibold tracking-wider text-slate-300 uppercase mt-0.5 whitespace-nowrap ${
                showCaption === 'responsive' ? 'hidden 2xl:block' : ''
              }`}
            >
              Find Your Place <span className="text-gold-400 font-bold">•</span> Follow Your Passion
            </span>
          )}
        </div>
      )}
    </a>
  );
};

