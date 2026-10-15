import React, { useState } from 'react';
import { 
  X, ChevronDown, ChevronRight, Phone, Mail, MapPin, 
  Sparkles, ExternalLink, Instagram, Youtube, Facebook 
} from 'lucide-react';
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
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#FFFDF9] text-[#1D1611] overflow-hidden animate-fadeIn">
      {/* Top Bar with Logo & Close Button */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5D3BD] bg-[#FAF3E7]">
        <Logo variant="dark" size="sm" />
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-[#F5ECE0] border border-[#D4BC9F] text-[#1D1611] hover:bg-[#EBDBC8] focus:outline-none"
          aria-label="Close Navigation"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Admissions Fast Action Banner */}
      <div className="p-4 bg-gradient-to-r from-[#FAF3E7] to-[#F5ECE0] border-b border-[#E5D3BD] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#9C6019]" />
          <span className="text-xs font-bold text-[#8B4513]">Admissions Open 2026–27</span>
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
          const hasChildren = !!((item.items && item.items.length > 0) || item.megaMenu || item.simpleDropdown);
          const isExpanded = expandedSection === item.id;

          return (
            <div key={item.id} className="border-b border-[#E5D3BD] pb-2">
              <div className="flex items-center justify-between">
                <a
                  href={item.href}
                  onClick={hasChildren ? (e) => { e.preventDefault(); toggleSection(item.id); } : onClose}
                  className="text-base font-bold text-[#1D1611] hover:text-[#9C6019] py-2 transition-colors flex-1"
                >
                  {item.label}
                </a>

                {hasChildren && (
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="p-2 text-[#7A695A] hover:text-[#9C6019] transition-colors focus:outline-none"
                    aria-label={`Toggle ${item.label} submenu`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#9C6019]' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Submenu Accordion */}
              {hasChildren && isExpanded && (
                <div className="mt-2 pl-3 space-y-3 border-l-2 border-[#C6832B] py-2 bg-[#FAF0E2]/60 rounded-r-xl animate-fadeIn">
                  {/* Direct items list */}
                  {item.items && (
                    <div className="space-y-1.5 pl-2">
                      {item.items.map((sub, sIdx) => {
                        const hasChild = sub.subItems && sub.subItems.length > 0;
                        return (
                          <div key={sIdx} className="space-y-1">
                            <a
                              href={sub.href}
                              target={sub.isExternal ? '_blank' : undefined}
                              rel={sub.isExternal ? 'noopener noreferrer' : undefined}
                              onClick={() => {
                                if (!sub.isExternal) onClose();
                              }}
                              className="block text-sm font-semibold text-[#2D1E12] hover:text-[#9C6019] py-1 transition-colors"
                            >
                              <span>{sub.name}</span>
                              {sub.badge && (
                                <span className="text-[9px] bg-[#C6832B]/15 text-[#8B4513] border border-[#C6832B]/40 px-1.5 py-0.2 rounded ml-2">
                                  {sub.badge}
                                </span>
                              )}
                            </a>

                            {/* Sub-items if any */}
                            {hasChild && (
                              <div className="pl-3 py-1 space-y-1 border-l border-[#C6832B]/40 ml-1">
                                {sub.subItems?.map((child, cIdx) => (
                                  <a
                                    key={cIdx}
                                    href={child.href}
                                    target={child.isExternal ? '_blank' : undefined}
                                    rel={child.isExternal ? 'noopener noreferrer' : undefined}
                                    onClick={() => {
                                      if (!child.isExternal) onClose();
                                    }}
                                    className="flex items-center justify-between text-xs text-[#5C4837] hover:text-[#9C6019] py-1 transition-colors"
                                  >
                                    <span className="truncate font-medium">{child.name}</span>
                                    {child.badge && (
                                      <span className="text-[8px] bg-[#C6832B]/20 text-[#8B4513] border border-[#C6832B]/40 px-1 py-0.2 rounded ml-2 flex-shrink-0">
                                        {child.badge}
                                      </span>
                                    )}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Mega menu columns fallback */}
                  {item.megaMenu && !item.items && (
                    <div className="space-y-4">
                      {item.megaMenu.columns.map((col, cIdx) => (
                        <div key={cIdx} className="space-y-2">
                          <h6 className="text-[11px] font-bold uppercase tracking-wider text-[#9C6019]">
                            {col.title}
                          </h6>
                          <div className="space-y-1.5 pl-2">
                            {col.items.map((sub, sIdx) => {
                              const hasChild = sub.subItems && sub.subItems.length > 0;
                              return (
                                <div key={sIdx} className="space-y-1">
                                  <a
                                    href={sub.href}
                                    target={sub.isExternal ? '_blank' : undefined}
                                    rel={sub.isExternal ? 'noopener noreferrer' : undefined}
                                    onClick={() => {
                                      if (!sub.isExternal) onClose();
                                    }}
                                    className="block text-sm font-semibold text-[#2D1E12] hover:text-[#9C6019] py-1 transition-colors"
                                  >
                                    <span>{sub.name}</span>
                                    {sub.badge && (
                                      <span className="text-[9px] bg-[#C6832B]/15 text-[#8B4513] border border-[#C6832B]/40 px-1.5 py-0.2 rounded ml-2">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </a>

                                  {/* Sub-items if any */}
                                  {hasChild && (
                                    <div className="pl-3 py-1 space-y-1 border-l border-[#C6832B]/40 ml-1">
                                      {sub.subItems?.map((child, cIdx) => (
                                        <a
                                          key={cIdx}
                                          href={child.href}
                                          target={child.isExternal ? '_blank' : undefined}
                                          rel={child.isExternal ? 'noopener noreferrer' : undefined}
                                          onClick={() => {
                                            if (!child.isExternal) onClose();
                                          }}
                                          className="flex items-center justify-between text-xs text-[#5C4837] hover:text-[#9C6019] py-1 transition-colors"
                                        >
                                          <span className="truncate font-medium">{child.name}</span>
                                          {child.badge && (
                                            <span className="text-[8px] bg-[#C6832B]/20 text-[#8B4513] border border-[#C6832B]/40 px-1 py-0.2 rounded ml-2 flex-shrink-0">
                                              {child.badge}
                                            </span>
                                          )}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Simple dropdown items fallback */}
                  {item.simpleDropdown && !item.items && (
                    <div className="space-y-1.5 pl-2">
                      {item.simpleDropdown.map((sub, sIdx) => (
                        <a
                          key={sIdx}
                          href={sub.href}
                          onClick={onClose}
                          className="block text-sm font-semibold text-[#2D1E12] hover:text-[#9C6019] py-1 transition-colors"
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
        <div className="pt-4 mt-6 border-t border-[#E5D3BD]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9C6019] block mb-3">
            Quick Portals & Approvals
          </span>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="#exam-portal"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-[#FAF3E7] border border-[#D4BC9F] text-xs font-bold text-[#8B4513] flex items-center justify-between hover:bg-[#F5ECE0]"
            >
              <span>Exam Portal</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="#atal-idea-lab"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-[#FAF3E7] border border-[#D4BC9F] text-xs font-bold text-[#2D1E12] flex items-center justify-between hover:bg-[#F5ECE0]"
            >
              <span>ATAL IDEA Lab</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="#naac"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-[#FAF3E7] border border-[#D4BC9F] text-xs font-bold text-[#2D1E12] flex items-center justify-between hover:bg-[#F5ECE0]"
            >
              <span>NAAC / IQAC</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="#alumni"
              onClick={onClose}
              className="p-2.5 rounded-lg bg-[#FAF3E7] border border-[#D4BC9F] text-xs font-bold text-[#2D1E12] flex items-center justify-between hover:bg-[#F5ECE0]"
            >
              <span>Alumni Portal</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Contact Footer & Social Channels Inside Drawer */}
        <div className="pt-6 pb-4 space-y-4 text-xs text-[#5C4837] border-t border-[#E5D3BD]">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9C6019]">
              Follow Us:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/rvsuniversityofficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-[#FAF3E7] border border-[#D4BC9F] flex items-center justify-center text-[#4A3828] hover:text-pink-600"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@rvs_university"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-[#FAF3E7] border border-[#D4BC9F] flex items-center justify-center text-[#4A3828] hover:text-red-600"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/p/RVSUniversityofficial-61593336956152/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-[#FAF3E7] border border-[#D4BC9F] flex items-center justify-center text-[#4A3828] hover:text-blue-600"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#9C6019] flex-shrink-0" />
              <span>{UNIVERSITY_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#9C6019] flex-shrink-0" />
              <a href={`tel:${UNIVERSITY_INFO.phone}`} className="text-[#2D1E12] hover:text-[#9C6019] font-semibold">
                {UNIVERSITY_INFO.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#9C6019] flex-shrink-0" />
              <a href={`mailto:${UNIVERSITY_INFO.email}`} className="text-[#2D1E12] hover:text-[#9C6019] font-semibold">
                {UNIVERSITY_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
