import React from 'react';
import rvsOfficialLogo from '../../assets/rvs-official-logo.png';

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
  showCaption = true
}) => {
  // Standard Tailwind sizing classes with fixed dimensions
  const logoDimensions = {
    sm: 'w-8 h-8 md:w-9 md:h-9 min-w-[32px] min-h-[32px] max-w-[36px] max-h-[36px]',
    md: 'w-10 h-10 md:w-11 md:h-11 min-w-[38px] min-h-[38px] max-w-[44px] max-h-[44px]',
    lg: 'w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 min-w-[44px] min-h-[44px] max-w-[56px] max-h-[56px]',
  };

  // Typography sizing
  const titleSizes = {
    sm: 'text-sm md:text-base',
    md: 'text-base sm:text-lg md:text-[20px]',
    lg: 'text-2xl md:text-3xl',
  };

  return (
    <a href="#home" className={`flex items-center gap-2 sm:gap-2.5 group select-none flex-shrink-0 ${className}`}>
      {/* Official Circular University Crest */}
      <div className={`relative flex-shrink-0 ${logoDimensions[size]} transition-transform duration-300 group-hover:scale-105 rounded-full overflow-hidden shadow-md border-2 border-gold-400 bg-white p-0.5 aspect-square`}>
        <img
          src={rvsOfficialLogo}
          alt="RVS University Official Seal"
          className="w-full h-full object-contain rounded-full block"
        />
      </div>

      {/* Prominent University Name with R(Red) V(Purple) S(Green) + Always Visible Tagline */}
      {showText && (
        <div className="flex flex-col justify-center flex-shrink-0">
          <span
            className={`font-serif font-black tracking-tight leading-none whitespace-nowrap ${titleSizes[size]}`}
          >
            <span className="text-[#FF4D4D] font-black drop-shadow-sm">R</span>
            <span className="text-[#CE93D8] font-black drop-shadow-sm">V</span>
            <span className="text-[#81C784] font-black drop-shadow-sm">S</span>{' '}
            <span className="text-gold-400 font-extrabold drop-shadow-sm">UNIVERSITY</span>
          </span>
          {showCaption !== false && (
            <span
              className="hidden sm:block text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-bold tracking-wider text-slate-200 uppercase mt-0.5 whitespace-nowrap drop-shadow-sm"
            >
              FIND YOUR PLACE <span className="text-gold-400 font-bold">•</span> FOLLOW YOUR PASSION
            </span>
          )}
        </div>
      )}
    </a>
  );
};
