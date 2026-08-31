import React from 'react';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { NavItem } from '../../types';

interface MegaMenuProps {
  item: NavItem;
  isOpen?: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ item, isOpen = true, onClose }) => {
  if (!isOpen) return null;

  // Render Simple Dropdown if no megaMenu
  if (item.simpleDropdown) {
    return (
      <div 
        className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 transition-all transform opacity-100 mt-2"
        onMouseLeave={onClose}
      >
        <div className="px-4 pb-2 mb-2 border-b border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600 font-sans">
            {item.label} Quick Links
          </span>
        </div>
        <div className="space-y-1">
          {item.simpleDropdown.map((sub, idx) => (
            <a
              key={idx}
              href={sub.href}
              onClick={onClose}
              className="flex flex-col px-4 py-2 hover:bg-slate-50 transition-colors group rounded-lg mx-2"
            >
              <div className="flex items-center justify-between text-xs md:text-sm font-semibold text-navy-950 group-hover:text-gold-600">
                <span>{sub.name}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5" />
              </div>
              {sub.description && (
                <span className="text-[11px] text-slate-500 mt-0.5">{sub.description}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Render Full Rich Mega Menu
  if (!item.megaMenu) return null;

  const { columns, featuredCard } = item.megaMenu;
  const colCount = columns.length;

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 w-[95vw] max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 mt-2 animate-fadeIn"
      onMouseLeave={onClose}
    >
      <div className="grid grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 p-6 md:p-8">
        {/* Navigation Columns */}
        <div className={`${featuredCard ? 'col-span-12 lg:col-span-8' : 'col-span-12'} pr-0 lg:pr-6`}>
          <div className={`grid gap-6 ${colCount === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
            {columns.map((col, idx) => (
              <div key={idx} className="flex flex-col space-y-3">
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gold-600 font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                    {col.title}
                  </h4>
                </div>

                <ul className="space-y-1.5">
                  {col.items.map((sub, sIdx) => (
                    <li key={sIdx}>
                      <a
                        href={sub.href}
                        onClick={onClose}
                        className="group flex flex-col p-2.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs md:text-sm font-bold text-navy-950 group-hover:text-gold-600 transition-colors">
                            {sub.name}
                          </span>
                          {sub.badge && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gold-100 text-gold-800 border border-gold-300 flex-shrink-0">
                              {sub.badge}
                            </span>
                          )}
                        </div>
                        {sub.description && (
                          <span className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 group-hover:text-slate-700">
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
          <div className="col-span-12 lg:col-span-4 pl-0 lg:pl-6 pt-6 lg:pt-0 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden shadow-md group border border-slate-100 h-full flex flex-col justify-between bg-navy-950 text-white">
              {/* Card Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={featuredCard.image}
                  alt={featuredCard.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-gold-500 text-navy-950 font-sans shadow">
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

                <div className="pt-4 mt-4 border-t border-navy-800/80">
                  <a
                    href={featuredCard.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 group-hover:text-gold-300 group-hover:underline"
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
