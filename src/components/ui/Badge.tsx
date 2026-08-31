import React from 'react';

interface BadgeProps {
  variant?: 'gold' | 'navy' | 'blue' | 'slate' | 'outline-gold';
  size?: 'sm' | 'md';
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gold',
  size = 'md',
  className = '',
  children,
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
  };

  const variantStyles = {
    gold: 'bg-gold-50 text-gold-700 border border-gold-300/80',
    navy: 'bg-navy-900 text-gold-400 border border-navy-700',
    blue: 'bg-blue-50 text-blue-700 border border-blue-200',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
    'outline-gold': 'bg-transparent text-gold-600 border border-gold-400',
  };

  return (
    <span className={`inline-flex items-center justify-center rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
