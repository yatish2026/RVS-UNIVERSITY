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
    gold: 'bg-[#FAF3E7] text-[#9C6019] border border-[#D4BC9F] font-semibold',
    navy: 'bg-[#2D1E12] text-[#D4973F] border border-[#5C4837]',
    blue: 'bg-[#FAF3E7] text-[#2D1E12] border border-[#D4BC9F]',
    slate: 'bg-[#F5ECE0] text-[#5C4837] border border-[#E5D3BD]',
    'outline-gold': 'bg-transparent text-[#9C6019] border border-[#C6832B] font-semibold',
  };

  return (
    <span className={`inline-flex items-center justify-center rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
