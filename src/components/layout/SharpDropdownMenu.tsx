import React, { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { NavItem, NavSubItem } from '../../types';

interface SharpDropdownMenuProps {
  item: NavItem;
  align?: 'left' | 'right';
  onClose: () => void;
}

export const SharpDropdownMenu: React.FC<SharpDropdownMenuProps> = ({
  item,
  align = 'left',
  onClose,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Derive menu items from item.items, item.megaMenu, or item.simpleDropdown
  const menuItems: NavSubItem[] =
    item.items ||
    (item.megaMenu?.columns?.[0]?.items ? item.megaMenu.columns[0].items : []) ||
    item.simpleDropdown ||
    [];

  if (menuItems.length === 0) return null;

  const activeSubItem = hoveredIndex !== null ? menuItems[hoveredIndex] : null;
  const hasActiveSubMenu = Boolean(activeSubItem?.subItems && activeSubItem.subItems.length > 0);

  const handleMouseEnterItem = (index: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setHoveredIndex(index);
  };

  const handleMouseLeaveMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 150);
  };

  return (
    <div
      onMouseLeave={handleMouseLeaveMenu}
      className={`absolute top-full ${
        align === 'right' ? 'right-0' : 'left-0'
      } mt-1.5 z-50 animate-fadeIn`}
    >
      <div className="relative">
        {/* Main Sharp Dropdown List */}
        <div className="w-64 sm:w-72 bg-[#FFFDF9] border border-[#D4BC9F] shadow-[0_12px_35px_rgba(29,22,17,0.18)] rounded-none divide-y divide-[#EFE2D2] py-0">
          {menuItems.map((menuItem, idx) => {
            const hasChildren = Boolean(menuItem.subItems && menuItem.subItems.length > 0);
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => handleMouseEnterItem(idx)}
                className="relative"
              >
                <a
                  href={menuItem.href}
                  target={menuItem.isExternal ? '_blank' : undefined}
                  rel={menuItem.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={() => {
                    if (!menuItem.isExternal) {
                      onClose();
                    }
                  }}
                  className={`flex items-center justify-between px-5 py-2.5 sm:py-3 text-[13.5px] transition-colors duration-150 select-none cursor-pointer ${
                    isHovered
                      ? 'bg-[#9C6019] text-white font-semibold shadow-inner'
                      : 'text-[#1D1611] font-medium hover:bg-[#9C6019] hover:text-white'
                  }`}
                >
                  <span className="truncate pr-2">{menuItem.name}</span>

                  {hasChildren ? (
                    <ChevronRight
                      className={`w-4 h-4 flex-shrink-0 transition-transform ${
                        isHovered ? 'text-white translate-x-0.5' : 'text-[#8A7565]'
                      }`}
                    />
                  ) : menuItem.badge ? (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm border ${
                        isHovered
                          ? 'bg-white/20 text-white border-white/40'
                          : 'bg-[#C6832B]/15 text-[#8B4513] border-[#C6832B]/40'
                      }`}
                    >
                      {menuItem.badge}
                    </span>
                  ) : null}
                </a>

                {/* Adjacent Sharp Flyout Submenu - positioned right beside THIS specific item */}
                {hasChildren && isHovered && menuItem.subItems && (
                  <div
                    onMouseEnter={() => {
                      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                    }}
                    className={`absolute ${
                      align === 'right' ? 'right-full mr-0' : 'left-full ml-0'
                    } top-0 max-h-[75vh] overflow-y-auto custom-scrollbar w-64 sm:w-72 bg-[#FFFDF9] border border-[#D4BC9F] shadow-[0_12px_35px_rgba(29,22,17,0.22)] rounded-none divide-y divide-[#EFE2D2] py-0 animate-fadeIn z-50`}
                  >
                    {menuItem.subItems.map((sub, sIdx) => (
                      <a
                        key={sIdx}
                        href={sub.href}
                        target={sub.isExternal ? '_blank' : undefined}
                        rel={sub.isExternal ? 'noopener noreferrer' : undefined}
                        onClick={() => {
                          if (!sub.isExternal) {
                            onClose();
                          }
                        }}
                        className="flex items-center justify-between px-5 py-2.5 sm:py-3 text-[13px] font-medium text-[#1D1611] hover:bg-[#9C6019] hover:text-white transition-colors duration-150 cursor-pointer group"
                      >
                        <span className="truncate pr-2">{sub.name}</span>
                        {sub.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-[#C6832B]/15 text-[#8B4513] group-hover:bg-white/20 group-hover:text-white border border-[#C6832B]/40 group-hover:border-white/40">
                            {sub.badge}
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
    </div>
  );
};
