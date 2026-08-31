import React, { useState, useRef } from 'react';
import { ChevronDown, Menu, Sparkles } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigationData';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { MegaMenu } from './MegaMenu';
import { NavItem } from '../../types';

interface NavbarProps {
  isScrolled: boolean;
  onMobileMenuOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isScrolled, onMobileMenuOpen }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    }, 200);
  };

  const handleClick = (e: React.MouseEvent, item: NavItem) => {
    const hasDropdown = item.hasDropdown || !!item.megaMenu || !!item.simpleDropdown;
    if (hasDropdown) {
      e.preventDefault();
      setActiveMenu(activeMenu === item.id ? null : item.id);
    }
  };

  const activeNavItem = MAIN_NAV_ITEMS.find((item) => item.id === activeMenu);

  return (
    <nav
      className={`w-full bg-white transition-all duration-300 relative ${
        isScrolled
          ? 'py-2 shadow-nav border-b border-slate-200/90 bg-white/95 backdrop-blur-md'
          : 'py-2.5 sm:py-3 border-b border-slate-200/70 shadow-sm'
      }`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full px-2 sm:px-4 lg:px-6 2xl:px-8 flex items-center justify-between gap-1.5 lg:gap-2">
        
        {/* Left: Official University Logo */}
        <div className="flex-shrink-0">
          <Logo size="md" />
        </div>

        {/* Center: Desktop Navigation Links (Compact & perfectly fitting) */}
        <div className="hidden xl:flex items-center justify-center gap-0.5 2xl:gap-1 flex-1 px-1">
          {MAIN_NAV_ITEMS.map((item: NavItem) => {
            const hasDropdown = item.hasDropdown || !!item.megaMenu || !!item.simpleDropdown;
            const isActive = activeMenu === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => handleMouseEnter(item.id, hasDropdown)}
                className="relative py-1"
              >
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item)}
                  className={`flex items-center gap-0.5 px-1.5 2xl:px-2 py-1 rounded-md text-[11.5px] 2xl:text-[13px] font-bold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'text-gold-600 bg-slate-100 shadow-sm'
                      : 'text-navy-950 hover:text-gold-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="nav-link-underline">{item.label}</span>
                  {hasDropdown && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 opacity-60 ${
                        isActive ? 'rotate-180 text-gold-600 opacity-100' : ''
                      }`}
                    />
                  )}
                </a>
              </div>
            );
          })}
        </div>

        {/* Right: Admissions CTA & Mobile Trigger */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden sm:block">
            <Button
              variant="gold"
              size="sm"
              href="#admissions"
              icon={<Sparkles className="w-3.5 h-3.5" />}
            >
              ADMISSIONS
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={onMobileMenuOpen}
            className="xl:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-navy-950 border border-slate-200 transition-colors focus:outline-none shadow-sm"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Shared Active Mega Menu Container */}
      {activeNavItem && (
        <div
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          className="absolute top-full left-0 w-full z-50 animate-fade-in"
        >
          <MegaMenu item={activeNavItem} isOpen={true} onClose={() => setActiveMenu(null)} />
        </div>
      )}
    </nav>
  );
};
