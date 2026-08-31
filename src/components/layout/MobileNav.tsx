import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, Phone, Mail, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import { MAIN_NAV_ITEMS, UTILITY_BAR_LINKS } from '../../data/navigationData';
import { UNIVERSITY_INFO } from '../../data/universityData';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-navy-950 text-white overflow-hidden animate-fadeIn">
      {/* Top Bar with Logo & Close Button */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-navy-800 bg-navy-950">
        <Logo variant="light" size="sm" />
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-navy-900 border border-navy-750 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Close Navigation"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Admissions Fast Action Banner */}
      <div className="p-4 bg-gradient-to-r from-navy-900 to-navy-850 border-b border-navy-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span className="text-xs font-semibold text-gold-300">Admissions Open 2026–27</span>
        </div>
        <Button
          variant="gold"
          size="sm"
          href="#admissions"
          onClick={onClose}
        >
          Apply Now
        </Button>
      </div>

      {/* Main Scrollable Navigation Links */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2 custom-scrollbar">
        {MAIN_NAV_ITEMS.map((item) => {
          const hasChildren = !!(item.megaMenu || item.simpleDropdown);
          const isExpanded = expandedSection === item.id;

          return (
            <div key={item.id} className="border-b border-navy-850/60 pb-2">
              <div className="flex items-center justify-between">
                <a
                  href={item.href}
                  onClick={hasChildren ? (e) => { e.preventDefault(); toggleSection(item.id); } : onClose}
                  className="text-base font-semibold text-slate-100 hover:text-gold-300 py-2 transition-colors flex-1"
                >
                  {item.label}
                </a>

                {hasChildren && (
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="p-2 text-slate-400 hover:text-gold-300 transition-colors focus:outline-none"
                    aria-label={`Toggle ${item.label} submenu`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-gold-400' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Submenu Accordion */}
              {hasChildren && isExpanded && (
                <div className="mt-2 pl-3 space-y-3 border-l-2 border-gold-500/40 py-2 animate-fadeIn">
                  {/* Mega menu columns */}
                  {item.megaMenu && (
                    <div className="space-y-4">
                      {item.megaMenu.columns.map((col, cIdx) => (
                        <div key={cIdx} className="space-y-2">
                          <h6 className="text-[11px] font-bold uppercase tracking-wider text-gold-400">
                            {col.title}
                          </h6>
                          <div className="space-y-1.5 pl-2">
                            {col.items.map((sub, sIdx) => (
                              <a
                                key={sIdx}
                                href={sub.href}
                                onClick={onClose}
                                className="block text-sm text-slate-300 hover:text-white py-1 transition-colors"
                              >
                                <span>{sub.name}</span>
                                {sub.badge && (
                                  <span className="text-[9px] bg-gold-500/20 text-gold-300 border border-gold-500/30 px-1.5 py-0.2 rounded ml-2">
                                    {sub.badge}
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Simple dropdown items */}
                  {item.simpleDropdown && (
                    <div className="space-y-1.5 pl-2">
                      {item.simpleDropdown.map((sub, sIdx) => (
                        <a
                          key={sIdx}
                          href={sub.href}
                          onClick={onClose}
                          className="block text-sm text-slate-300 hover:text-white py-1 transition-colors"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Quick Utility Portals Section in Mobile Drawer */}
        <div className="pt-4 mt-6 border-t border-navy-800">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
            Quick Portals & Approvals
          </span>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="#exam-portal"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-navy-900 border border-gold-500/30 text-xs font-semibold text-gold-300 flex items-center justify-between"
            >
              <span>Exam Portal</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="#atal-idea-lab"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-navy-900 border border-navy-800 text-xs font-semibold text-slate-200 flex items-center justify-between"
            >
              <span>ATAL IDEA Lab</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="#naac"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-navy-900 border border-navy-800 text-xs font-semibold text-slate-200 flex items-center justify-between"
            >
              <span>NAAC / IQAC</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="#alumni"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-navy-900 border border-navy-800 text-xs font-semibold text-slate-200 flex items-center justify-between"
            >
              <span>Alumni Portal</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Contact Footer Inside Drawer */}
        <div className="pt-6 pb-4 space-y-2 text-xs text-slate-400 border-t border-navy-800/80">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <span>{UNIVERSITY_INFO.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <a href={`tel:${UNIVERSITY_INFO.phone}`} className="text-slate-200 hover:text-gold-300">
              {UNIVERSITY_INFO.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
            <a href={`mailto:${UNIVERSITY_INFO.email}`} className="text-slate-200 hover:text-gold-300">
              {UNIVERSITY_INFO.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
