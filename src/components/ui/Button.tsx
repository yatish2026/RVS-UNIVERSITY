import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'primary-navy' | 'outline-navy' | 'outline-gold' | 'ghost-white' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  icon,
  iconPosition = 'right',
  href,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 rounded-lg gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-lg gap-2 tracking-wide',
    lg: 'text-base px-7 py-3.5 rounded-xl gap-2.5 tracking-wide shadow-sm',
  };

  const variantStyles = {
    gold: 'bg-gradient-to-r from-[#B57321] via-[#C6832B] to-[#9C6019] hover:from-[#9C6019] hover:to-[#7E4B11] text-white hover:shadow-lg hover:shadow-gold-600/30 active:scale-[0.98] border border-[#D4973F]/50 focus:ring-gold-500 font-bold',
    'primary-navy': 'bg-[#2D1E12] hover:bg-[#1D1611] text-[#FAF3E7] hover:shadow-lg hover:shadow-[#1D1611]/20 active:scale-[0.98] border border-[#5C4837] focus:ring-[#C6832B]',
    'outline-navy': 'bg-[#FFFDF9] hover:bg-[#FAF3E7] text-[#1D1611] hover:text-[#9C6019] border-2 border-[#D4BC9F] hover:border-[#C6832B] active:scale-[0.98] focus:ring-[#C6832B] shadow-sm',
    'outline-gold': 'bg-transparent hover:bg-gold-500/10 text-[#9C6019] border-2 border-[#C6832B] hover:border-[#9C6019] active:scale-[0.98] focus:ring-gold-500 font-bold',
    'ghost-white': 'bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md hover:border-white/40 active:scale-[0.98] focus:ring-white',
    glass: 'bg-[#FFFDF9]/90 hover:bg-[#FAF3E7] text-[#1D1611] border border-[#D4BC9F] shadow-sm backdrop-blur-md active:scale-[0.98] focus:ring-[#C6832B]',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
