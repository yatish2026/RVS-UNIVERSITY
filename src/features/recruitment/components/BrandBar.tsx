import React from 'react';

export const BrandBar: React.FC<{ badge: string; right?: React.ReactNode; dark?: boolean }> = ({ badge, right, dark }) => (
  <header
    className={`sticky top-0 z-40 border-b backdrop-blur-md ${
      dark ? 'border-white/10 bg-[#140E0A]/95' : 'border-[#EDE3D6] bg-[#FBF5EB]/90'
    }`}
  >
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
      <a href="#" className="flex min-w-0 items-center gap-3" title="RVS University home">
        <img src="/images/rvsu-logo-200.png" alt="RVS University" className="h-10 w-10 shrink-0 rounded-full" />
        <span className="min-w-0 leading-tight">
          <span className={`block truncate font-serif text-[17px] font-bold ${dark ? 'text-white' : 'text-[#1D1611]'}`}>RVS University</span>
          <span className={`block truncate text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-[#E4B56C]' : 'text-[#B57321]'}`}>
            {badge}
          </span>
        </span>
      </a>
      {right}
    </div>
  </header>
);
