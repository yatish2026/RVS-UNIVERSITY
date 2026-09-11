import React from 'react';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { NavItem } from '../../types';

interface MegaMenuProps {
  item: NavItem;
  isOpen?: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ item, isOpen = true, onClose }) => {
  const [activeSubMenuIndex, setActiveSubMenuIndex] = React.useState<number | null>(null);

  if (!isOpen) return null;

  // Render Simple Dropdown if no megaMenu
  if (item.simpleDropdown) {
    return (
      <div 
        className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-gradient-to-br from-[#0A192F] via-[#0E203C] to-[#0A192F]/98 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] border-2 border-gold-400/50 py-3 z-50 transition-all transform opacity-100 mt-2 text-white backdrop-blur-2xl animate-fadeIn"
        onMouseLeave={() => {
          setActiveSubMenuIndex(null);
          onClose();
        }}
      >
        <div className="px-4 pb-2 mb-2 border-b border-navy-800/80 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gold-300 font-sans flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
            {item.label} Navigation
          </span>
        </div>
        <div className="space-y-1 relative">
          {item.simpleDropdown.map((sub, idx) => {
            const hasSub = sub.subItems && sub.subItems.length > 0;
            const isHovered = activeSubMenuIndex === idx;

            return (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => {
                  if (hasSub) setActiveSubMenuIndex(idx);
                  else setActiveSubMenuIndex(null);
                }}
              >
                <a
                  href={sub.href}
                  onClick={() => {
                    setActiveSubMenuIndex(null);
                    onClose();
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 transition-all group rounded-lg mx-2 border ${
                    isHovered
                      ? 'bg-blue-900/60 border-gold-400/50 text-gold-300'
                      : 'hover:bg-blue-900/40 border-transparent hover:border-gold-400/30 text-white'
                  }`}
                >
                  <div className="flex flex-col pr-2">
                    <div className="flex items-center gap-2 text-xs md:text-sm font-semibold group-hover:text-gold-300">
                      <span>{sub.name}</span>
                      {sub.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40">
                          {sub.badge}
                        </span>
                      )}
                    </div>
                    {sub.description && (
                      <span className="text-[11px] text-slate-300 mt-0.5 group-hover:text-slate-200">
                        {sub.description}
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                      hasSub
                        ? 'opacity-90 text-gold-400 transform group-hover:translate-x-1'
                        : 'opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 text-gold-400'
                    }`}
                  />
                </a>

                {/* Sub-menu Flyout */}
                {hasSub && isHovered && (
                  <div
                    className="absolute left-full top-0 ml-1.5 w-72 bg-gradient-to-br from-[#0A192F] via-[#0E203C] to-[#0A192F]/98 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-2 border-gold-400/50 py-3 z-50 text-white backdrop-blur-2xl animate-fadeIn"
                    onMouseEnter={() => setActiveSubMenuIndex(idx)}
                    onMouseLeave={() => setActiveSubMenuIndex(null)}
                  >
                    <div className="px-4 pb-2 mb-2 border-b border-navy-800/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-300 font-sans flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-gold-400"></span>
                        {sub.name} Sections
                      </span>
                    </div>
                    <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                      {sub.subItems?.map((child, cIdx) => (
                        <a
                          key={cIdx}
                          href={child.href}
                          onClick={() => {
                            setActiveSubMenuIndex(null);
                            onClose();
                          }}
                          className="flex flex-col px-4 py-2 hover:bg-blue-900/40 transition-colors group rounded-lg mx-2 border border-transparent hover:border-gold-400/30"
                        >
                          <div className="flex items-center justify-between text-xs md:text-sm font-semibold text-white group-hover:text-gold-300">
                            <span>{child.name}</span>
                            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 text-gold-400" />
                          </div>
                          {child.description && (
                            <span className="text-[10.5px] text-slate-300 mt-0.5 group-hover:text-slate-200">
                              {child.description}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Render Full Rich Mega Menu
  if (!item.megaMenu) return null;

  const { columns, featuredCard } = item.megaMenu;
  const colCount = columns.length;
  const hasFeatured = !!featuredCard;

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl mx-auto bg-gradient-to-br from-[#0A192F] via-[#0E203C] to-[#0A192F]/98 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] border-2 border-gold-400/50 overflow-hidden z-50 mt-2 animate-fadeIn text-white backdrop-blur-2xl"
      onMouseLeave={onClose}
    >
      <div className="grid grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-navy-800/80 p-6 md:p-8">
        {/* Navigation Columns */}
        <div className={`${hasFeatured ? (colCount === 3 ? 'col-span-12 lg:col-span-9' : 'col-span-12 lg:col-span-8') : 'col-span-12'} pr-0 lg:pr-6`}>
          <div className={`grid gap-6 ${
            colCount === 4 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
              : colCount === 3 
                ? 'grid-cols-1 md:grid-cols-3' 
                : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {columns.map((col, idx) => (
              <div key={idx} className="flex flex-col space-y-3">
                <div className="border-b border-navy-800/80 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold-300 font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                    {col.title}
                  </h4>
                </div>

                <ul className="space-y-1.5">
                  {col.items.map((sub, sIdx) => (
                    <li key={sIdx}>
                      <a
                        href={sub.href}
                        onClick={onClose}
                        className={`group flex flex-col ${sub.description ? 'p-2.5' : 'py-2 px-2.5'} rounded-xl hover:bg-blue-900/40 transition-all border border-transparent hover:border-gold-400/40`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs md:text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                            {sub.name}
                          </span>
                          {sub.badge && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40 flex-shrink-0">
                              {sub.badge}
                            </span>
                          )}
                        </div>
                        {sub.description && (
                          <span className="text-[11px] text-slate-300 mt-0.5 line-clamp-1 group-hover:text-slate-100">
                            {sub.description}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Card (Right Column) */}
        {featuredCard && (
          <div className={`${colCount === 3 ? 'col-span-12 lg:col-span-3' : 'col-span-12 lg:col-span-4'} pl-0 lg:pl-6 pt-6 lg:pt-0 flex flex-col justify-between`}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl group border border-gold-400/30 h-full flex flex-col justify-between bg-navy-950/90 text-white">
              {/* Card Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={featuredCard.image}
                  alt={featuredCard.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-gold-500 text-navy-950 font-sans shadow font-black">
                  Featured
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h5 className="font-serif font-bold text-base text-white mb-1.5 group-hover:text-gold-300 transition-colors">
                    {featuredCard.title}
                  </h5>
                  <p className="text-xs text-slate-300 line-clamp-2 font-light leading-relaxed">
                    {featuredCard.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-navy-800">
                  <a
                    href={featuredCard.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 group-hover:text-gold-200 group-hover:underline"
                  >
                    <span>{featuredCard.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
