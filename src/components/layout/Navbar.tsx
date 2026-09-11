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
      className={`w-full transition-all duration-500 relative rounded-full sm:rounded-[36px] ${
        isScrolled
          ? 'py-2 px-3 sm:px-5 lg:px-6 bg-[#081528]/95 backdrop-blur-2xl border border-gold-400/60 shadow-[0_16px_45px_rgba(8,21,40,0.6)]'
          : 'py-2.5 px-3 sm:px-5 lg:px-6 2xl:px-8 bg-[#0B192C]/85 backdrop-blur-xl border border-white/20 sm:border-gold-400/40 shadow-[0_10px_35px_rgba(11,25,44,0.45)]'
      }`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full flex items-center justify-between gap-1.5 lg:gap-2 2xl:gap-3">
        
        {/* Left: Official University Logo with Tagline */}
        <div className="flex-shrink-0">
          <Logo size="md" variant="light" showCaption="responsive" />
        </div>

        {/* Center: Desktop Navigation Links (Warm Champagne & Gold Theme) */}
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
                  className={`flex items-center gap-1 px-1.5 2xl:px-2.5 py-1 2xl:py-1.5 rounded-full text-[11.5px] 2xl:text-[13px] font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-navy-950 bg-gradient-to-r from-[#D4AF37] via-[#F3BA2F] to-[#D4AF37] shadow-gold-glow font-black'
                      : 'text-[#F8FAFC] hover:text-gold-300 hover:bg-white/15 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                  }`}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isActive ? 'rotate-180 text-navy-950' : 'text-slate-300 group-hover:text-gold-300'
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
          <div className="hidden sm:block flex-shrink-0">
            <Button
              variant="gold"
              size="sm"
              href="#admissions"
              icon={<Sparkles className="w-3 h-3" />}
              className="rounded-full shadow-gold-glow text-[11px] 2xl:text-xs font-black tracking-wider px-3 2xl:px-4 py-1.5 whitespace-nowrap"
            >
              ADMISSIONS
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={onMobileMenuOpen}
            className="xl:hidden p-2 rounded-full bg-black/50 hover:bg-black/75 text-gold-300 border border-white/20 backdrop-blur-md transition-colors focus:outline-none shadow-md"
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
          className="absolute left-0 w-full z-50 animate-fade-in top-[calc(100%+12px)]"
        >
          <MegaMenu item={activeNavItem} isOpen={true} onClose={() => setActiveMenu(null)} />
        </div>
      )}
    </nav>
  );
};
