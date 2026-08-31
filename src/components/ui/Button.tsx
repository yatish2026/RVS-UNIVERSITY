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
    gold: 'bg-gold-500 hover:bg-gold-400 text-navy-950 hover:shadow-lg hover:shadow-gold-500/20 active:scale-[0.98] border border-gold-400 focus:ring-gold-500 font-bold',
    'primary-navy': 'bg-navy-850 hover:bg-navy-900 text-white hover:shadow-lg hover:shadow-navy-900/25 active:scale-[0.98] border border-navy-700 focus:ring-navy-800',
    'outline-navy': 'bg-transparent hover:bg-navy-50 text-navy-900 border-2 border-navy-850 hover:border-navy-900 active:scale-[0.98] focus:ring-navy-800',
    'outline-gold': 'bg-transparent hover:bg-gold-50 text-gold-700 border-2 border-gold-500 hover:border-gold-600 active:scale-[0.98] focus:ring-gold-500',
    'ghost-white': 'bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md hover:border-white/40 active:scale-[0.98] focus:ring-white',
    glass: 'bg-white/90 hover:bg-white text-navy-900 border border-slate-200/80 shadow-md backdrop-blur-md active:scale-[0.98] focus:ring-navy-800',
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
