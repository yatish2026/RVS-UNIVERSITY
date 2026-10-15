import React, { useState, useRef } from 'react';
import { ChevronDown, Menu, Sparkles } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigationData';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { SharpDropdownMenu } from './SharpDropdownMenu';
import { NavItem } from '../../types';

interface NavbarProps {
  isScrolled: boolean;
  isCollapsed?: boolean;
  onMobileMenuOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled, isCollapsed = false, onMobileMenuOpen }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isMini = isCollapsed && !isHovered;

  const handleMouseEnter = (itemId: string, hasDropdown?: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (hasDropdown) {
      setActiveMenu(itemId);
    } else {
      setActiveMenu(null);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 220);
  };

  const handleClick = (e: React.MouseEvent, item: NavItem) => {
    const hasDropdown = item.hasDropdown || Boolean(item.items && item.items.length > 0) || !!item.megaMenu || !!item.simpleDropdown;
    if (hasDropdown) {
      e.preventDefault();
      setActiveMenu(activeMenu === item.id ? null : item.id);
    }
  };

  return (
    <nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      className={`transition-all duration-500 ease-in-out relative rounded-full ${
        isMini
          ? 'max-w-[320px] sm:max-w-[370px] mx-auto py-1.5 px-4 bg-[#FAF6EE]/98 backdrop-blur-2xl border border-[#D6BC97] shadow-[0_12px_40px_rgba(77,54,31,0.16)]'
          : 'w-full py-2 sm:py-2.5 px-3 sm:px-4 lg:px-4 xl:px-6 2xl:px-8 bg-gradient-to-r from-[#FAF6EE] via-[#FDFBF7] to-[#FAF6EE] backdrop-blur-xl border border-[#D6BC97] shadow-[0_10px_35px_rgba(77,54,31,0.08)]'
      }`}
    >
      <div className={`w-full flex items-center transition-all duration-500 ${isMini ? 'justify-center' : 'justify-between gap-1.5 lg:gap-2'}`}>
        
        {/* Left: Official University Logo (Centered when collapsed) */}
        <div className={`flex-shrink-0 min-w-0 transition-all duration-500 ${isMini ? 'transform scale-100' : ''}`}>
          <Logo size="md" variant="dark" showCaption={!isMini} />
        </div>

        {/* Center: Desktop Navigation Links (Smoothly collapses on scroll down) */}
        <div
          className={`transition-all duration-500 ease-in-out items-center justify-center gap-0.5 xl:gap-1 2xl:gap-1.5 px-1 ${
            isMini
              ? 'hidden opacity-0 max-w-0 pointer-events-none'
              : 'hidden lg:flex opacity-100 max-w-full flex-1'
          }`}
        >
          {MAIN_NAV_ITEMS.map((item: NavItem) => {
            const hasDropdown = item.hasDropdown || Boolean(item.items && item.items.length > 0) || !!item.megaMenu || !!item.simpleDropdown;
            const isActive = activeMenu === item.id;
            const alignRight = item.id === 'international-relations' || item.id === 'campus-life';

            return (
              <div
                key={item.id}
                onMouseEnter={() => handleMouseEnter(item.id, hasDropdown)}
                className="relative py-1"
              >
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item)}
                  className={`flex items-center gap-0.5 xl:gap-1 px-1.5 lg:px-2 xl:px-2.5 py-1 xl:py-1.5 rounded-full text-[11px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px] font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-[#B57321] via-[#C6832B] to-[#9C6019] shadow-md font-black'
                      : 'text-[#2D1E12] hover:text-[#9C6019] hover:bg-[#F3ECE0]/80'
                  }`}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 flex-shrink-0 ${
                        isActive ? 'rotate-180 text-white' : 'text-[#7A695A] group-hover:text-[#9C6019]'
                      }`}
                    />
                  )}
                </a>

                {/* Sharp Dropdown Menu anchored right directly below this nav link */}
                {hasDropdown && isActive && !isMini && (
                  <SharpDropdownMenu
                    item={item}
                    align={alignRight ? 'right' : 'left'}
                    onClose={() => setActiveMenu(null)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Admissions CTA & Mobile Trigger */}
        <div
          className={`items-center gap-2 flex-shrink-0 transition-all duration-500 ${
            isMini ? 'hidden opacity-0 max-w-0 pointer-events-none' : 'flex opacity-100 max-w-full'
          }`}
        >
          <div className="hidden sm:block flex-shrink-0">
            <a
              href="#admissions"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#C27D27] to-[#A86419] hover:from-[#A86419] hover:to-[#8E5112] text-white text-[10px] sm:text-[11px] 2xl:text-xs font-black tracking-wider uppercase shadow-md transition-all duration-200 transform hover:scale-105 cursor-pointer"
            >
              <span>ADMISSIONS</span>
              <Sparkles className="w-3 h-3 text-amber-200" />
            </a>
          </div>

          {/* Mobile / Tablet Menu Button */}
          <button
            onClick={onMobileMenuOpen}
            className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C6832B]/15 hover:bg-[#C6832B] text-[#7E4B11] hover:text-white border border-[#C6832B]/40 backdrop-blur-md transition-all duration-200 focus:outline-none shadow-md cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-4 h-4" />
            <span className="text-xs font-extrabold uppercase font-sans tracking-wide">Menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
