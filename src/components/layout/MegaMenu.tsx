import React from 'react';
import { ChevronRight, Sparkles, ArrowRight, FileText, Download, ExternalLink } from 'lucide-react';
import { NavItem } from '../../types';

interface MegaMenuProps {
  item: NavItem;
  isOpen?: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ item, isOpen = true, onClose }) => {
  const [activeSubMenuIndex, setActiveSubMenuIndex] = React.useState<number | null>(null);
  // Default all sub-sections (Schools, Academic Calendars, Exam Section) to expanded
  const [expandedSubSections, setExpandedSubSections] = React.useState<Record<string, boolean>>({
    'Schools': true,
    'Academic Calendars': true,
    'Exam Section': true,
  });

  const toggleSubSection = (sectionName: string) => {
    setExpandedSubSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  if (!isOpen) return null;

  // Render Simple Dropdown if no megaMenu
  if (item.simpleDropdown) {
    return (
      <div 
        className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E7] to-[#F5ECE0] rounded-2xl shadow-[0_20px_50px_rgba(77,54,31,0.22)] border-2 border-[#D4BC9F] py-3 z-50 transition-all transform opacity-100 mt-2 text-[#1D1611] backdrop-blur-2xl animate-fadeIn"
        onMouseLeave={() => {
          setActiveSubMenuIndex(null);
          onClose();
        }}
      >
        <div className="px-4 pb-2 mb-2 border-b border-[#E5D3BD] flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9C6019] font-sans flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6832B] animate-pulse"></span>
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
                  target={sub.isExternal ? '_blank' : undefined}
                  rel={sub.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={() => {
                    if (!sub.isExternal) {
                      setActiveSubMenuIndex(null);
                      onClose();
                    }
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 transition-all group rounded-lg mx-2 border ${
                    isHovered
                      ? 'bg-[#F3E5D3] border-[#C6832B]/60 text-[#9C6019]'
                      : 'hover:bg-[#F3E5D3]/70 border-transparent hover:border-[#D4BC9F]/50 text-[#1D1611]'
                  }`}
                >
                  <div className="flex flex-col pr-2">
                    <div className="flex items-center gap-2 text-xs md:text-sm font-bold group-hover:text-[#9C6019]">
                      <span>{sub.name}</span>
                      {sub.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#C6832B]/15 text-[#8B4513] border border-[#C6832B]/40">
                          {sub.badge}
                        </span>
                      )}
                    </div>
                    {sub.description && (
                      <span className="text-[11px] text-[#6E5D4F] mt-0.5 group-hover:text-[#4A3828]">
                        {sub.description}
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                      hasSub
                        ? 'opacity-90 text-[#9C6019] transform group-hover:translate-x-1'
                        : 'opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 text-[#9C6019]'
                    }`}
                  />
                </a>

                {/* Sub-menu Flyout */}
                {hasSub && isHovered && (
                  <div
                    className="absolute left-full top-0 ml-1.5 w-72 bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E7] to-[#F5ECE0] rounded-2xl shadow-[0_20px_50px_rgba(77,54,31,0.24)] border-2 border-[#D4BC9F] py-3 z-50 text-[#1D1611] backdrop-blur-2xl animate-fadeIn"
                    onMouseEnter={() => setActiveSubMenuIndex(idx)}
                    onMouseLeave={() => setActiveSubMenuIndex(null)}
                  >
                    <div className="px-4 pb-2 mb-2 border-b border-[#E5D3BD]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9C6019] font-sans flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#C6832B]"></span>
                        {sub.name} Sections
                      </span>
                    </div>
                    <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                      {sub.subItems?.map((child, cIdx) => (
                        <a
                          key={cIdx}
                          href={child.href}
                          target={child.isExternal ? '_blank' : undefined}
                          rel={child.isExternal ? 'noopener noreferrer' : undefined}
                          onClick={() => {
                            if (!child.isExternal) {
                              setActiveSubMenuIndex(null);
                              onClose();
                            }
                          }}
                          className="flex flex-col px-4 py-2 hover:bg-[#F3E5D3] transition-colors group rounded-lg mx-2 border border-transparent hover:border-[#D4BC9F]/60"
                        >
                          <div className="flex items-center justify-between text-xs md:text-sm font-bold text-[#1D1611] group-hover:text-[#9C6019]">
                            <span>{child.name}</span>
                            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 text-[#9C6019]" />
                          </div>
                          {child.description && (
                            <span className="text-[10.5px] text-[#6E5D4F] mt-0.5 group-hover:text-[#4A3828]">
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
      className={`absolute top-full left-1/2 -translate-x-1/2 ${
        colCount >= 3 
          ? 'w-[96vw] max-w-7xl' 
          : colCount === 2 
            ? 'w-[94vw] max-w-5xl' 
            : hasFeatured 
              ? 'w-[90vw] max-w-2xl' 
              : 'w-[92vw] max-w-md sm:max-w-lg'
      } mx-auto bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E7] to-[#F5ECE0] rounded-2xl shadow-[0_25px_65px_rgba(77,54,31,0.22)] border-2 border-[#D4BC9F] overflow-hidden z-50 mt-2 animate-fadeIn text-[#1D1611] backdrop-blur-2xl`}
      onMouseLeave={onClose}
    >
      <div className={`p-5 md:p-6 ${hasFeatured ? 'grid grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E5D3BD]' : ''}`}>
        {/* Navigation Column (Single clean line/column) */}
        <div className={`${hasFeatured ? (colCount >= 3 ? 'col-span-12 lg:col-span-9 pr-0 lg:pr-6' : colCount === 2 ? 'col-span-12 lg:col-span-8 pr-0 lg:pr-6' : 'col-span-12 lg:col-span-7 pr-0 lg:pr-6') : 'w-full'}`}>
          <div className={`grid gap-6 ${
            colCount === 4 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' 
              : colCount === 3 
                ? 'grid-cols-1 md:grid-cols-3' 
                : colCount === 2
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1'
          }`}>
            {columns.map((col, idx) => (
              <div key={idx} className="flex flex-col space-y-2.5">
                <div className="border-b border-[#E5D3BD] pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#9C6019] font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6832B]"></span>
                    {col.title}
                  </h4>
                </div>

                <ul className="space-y-1.5 max-h-[58vh] overflow-y-auto custom-scrollbar pr-1">
                  {col.items.map((sub, sIdx) => {
                    const hasChildren = sub.subItems && sub.subItems.length > 0;
                    const isExpanded = expandedSubSections[sub.name] ?? true;

                    return (
                      <li key={sIdx} className="space-y-1">
                        {/* Parent Row */}
                        {hasChildren ? (
                          <div
                            onClick={() => toggleSubSection(sub.name)}
                            className="group flex items-center justify-between p-2.5 rounded-xl bg-[#FAF0E2] hover:bg-[#F3E5D3] cursor-pointer transition-all border border-[#E5D3BD] hover:border-[#C6832B]/50 shadow-sm"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs md:text-sm font-bold text-[#1D1611] group-hover:text-[#9C6019] transition-colors">
                                {sub.name}
                              </span>
                              {sub.badge && (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#C6832B]/15 text-[#8B4513] border border-[#C6832B]/40">
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                            <ChevronRight
                              className={`w-3.5 h-3.5 text-[#9C6019] transition-transform duration-200 ${
                                isExpanded ? 'rotate-90' : ''
                              }`}
                            />
                          </div>
                        ) : (
                          <a
                            href={sub.href}
                            target={sub.isExternal ? '_blank' : undefined}
                            rel={sub.isExternal ? 'noopener noreferrer' : undefined}
                            onClick={() => {
                              if (!sub.isExternal) onClose();
                            }}
                            className="group flex flex-col p-2.5 rounded-xl hover:bg-[#F3E5D3]/80 transition-all border border-transparent hover:border-[#D4BC9F]/60"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs md:text-sm font-bold text-[#1D1611] group-hover:text-[#9C6019] transition-colors leading-snug">
                                {sub.name}
                              </span>
                              {sub.badge && (
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#C6832B]/15 text-[#8B4513] border border-[#C6832B]/40 flex-shrink-0">
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                            {sub.description && (
                              <span className="text-[11px] text-[#6E5D4F] mt-0.5 group-hover:text-[#4A3828] font-medium">
                                {sub.description}
                              </span>
                            )}
                          </a>
                        )}

                        {/* Nested Sub-Items Box */}
                        {hasChildren && isExpanded && (
                          <div className="pl-2.5 pr-2 py-1.5 ml-1 border-l-2 border-[#C6832B] space-y-1 bg-[#FAF0E2]/90 rounded-r-xl border border-y-transparent border-r-transparent animate-fadeIn">
                            {sub.subItems?.map((child, cIdx) => (
                              <a
                                key={cIdx}
                                href={child.href}
                                target={child.isExternal ? '_blank' : undefined}
                                rel={child.isExternal ? 'noopener noreferrer' : undefined}
                                onClick={() => {
                                  if (!child.isExternal) onClose();
                                }}
                                className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-[#EBDBC8] text-[#2D1E12] hover:text-[#9C6019] transition-all text-xs font-semibold border border-transparent hover:border-[#D4BC9F]/50"
                              >
                                <div className="flex items-center gap-1.5 truncate">
                                  {child.badge === 'PDF' ? (
                                    <FileText className="w-3.5 h-3.5 text-[#9C6019] flex-shrink-0" />
                                  ) : (
                                    <ChevronRight className="w-3 h-3 text-[#9C6019]/70 group-hover:text-[#9C6019] flex-shrink-0" />
                                  )}
                                  <span className="truncate">{child.name}</span>
                                </div>
                                {child.badge && (
                                  <span className="text-[8.5px] font-bold px-1.5 py-0.2 rounded bg-[#C6832B]/20 text-[#8B4513] border border-[#C6832B]/40 flex-shrink-0 ml-1.5">
                                    {child.badge}
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Card (Right Column) */}
        {featuredCard && (
          <div className={`${colCount >= 3 ? 'col-span-12 lg:col-span-3' : colCount === 2 ? 'col-span-12 lg:col-span-4' : 'col-span-12 lg:col-span-5'} pl-0 lg:pl-6 pt-5 lg:pt-0 flex flex-col justify-between`}>
            <div className="relative rounded-2xl overflow-hidden shadow-md group border-2 border-[#D4BC9F] h-full flex flex-col justify-between bg-[#FFFDF9] text-[#1D1611]">
              {/* Card Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={featuredCard.image}
                  alt={featuredCard.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md bg-[#C6832B] text-white font-sans shadow">
                  Featured
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h5 className="font-serif font-bold text-base text-[#1D1611] mb-1 group-hover:text-[#9C6019] transition-colors line-clamp-1">
                    {featuredCard.title}
                  </h5>
                  <p className="text-xs text-[#5C4A3C] line-clamp-2 font-normal leading-relaxed">
                    {featuredCard.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#E5D3BD]">
                  <a
                    href={featuredCard.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9C6019] group-hover:text-[#7E4B11] group-hover:underline"
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
