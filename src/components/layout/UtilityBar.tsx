import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ExternalLink, Phone, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { UTILITY_BAR_LINKS } from '../../data/navigationData';

export const UtilityBar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-navy-950 text-slate-300 border-b border-navy-800 text-[11.5px] relative z-50 select-none">
      <div className="container-custom flex items-center justify-between h-[38px] md:h-[40px] px-4 md:px-8">
        {/* Left Side: Institutional Status / Helpline */}
        <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 font-medium text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="truncate">R.V.S Nagar, Chittoor, AP – 517127</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-slate-400 before:content-['•'] before:mr-2 before:text-slate-600">
            <span>Admissions:</span>
            <a href="tel:+919669660155" className="text-gold-400 hover:text-gold-300 font-bold flex items-center gap-1 transition-colors">
              <Phone className="w-3 h-3" />
              +91 9669660155
            </a>
          </div>
        </div>

        {/* Right Side: Quick Links & Dropdowns without ugly scrollbars */}
        <div ref={dropdownRef} className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {UTILITY_BAR_LINKS.map((link, idx) => {
            if (link.dropdown) {
              const isOpen = activeDropdown === link.name;
              return (
                <div key={idx} className="relative">
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : link.name)}
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    className={`flex items-center gap-1 px-2 py-1 rounded transition-colors whitespace-nowrap font-medium text-[11.5px] ${
                      isOpen ? 'text-white bg-navy-800' : 'text-slate-300 hover:text-white hover:bg-navy-900'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180 text-gold-400' : 'text-slate-400'}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div 
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute right-0 top-full mt-1 w-64 bg-navy-900 border border-navy-700 rounded-xl shadow-2xl py-2 z-50 animate-fadeIn"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold-400 border-b border-navy-800">
                        {link.name}
                      </div>
                      <div className="py-1">
                        {link.dropdown.map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-200 hover:text-gold-300 hover:bg-navy-800 transition-colors"
                          >
                            <span>{sub.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={idx}
                href={link.href}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all whitespace-nowrap font-medium text-[11.5px] ${
                  link.highlight
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 hover:bg-gold-500 hover:text-navy-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[9px] bg-blue-500/30 text-blue-300 border border-blue-400/30 px-1 rounded font-bold">
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
