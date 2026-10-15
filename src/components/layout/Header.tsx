import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Is past top initial zone
      setIsScrolled(currentScrollY > 30);

      // When scrolling down past 120px -> collapse to centered logo
      if (currentScrollY > 120 && currentScrollY > lastScrollY + 4) {
        setIsCollapsed(true);
      } 
      // When scrolling up or near top (< 50px) -> expand back to normal full menu
      else if (currentScrollY < lastScrollY - 4 || currentScrollY < 60) {
        setIsCollapsed(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-2 sm:px-4 lg:px-6 2xl:px-8 pt-2 sm:pt-3 lg:pt-3.5 transition-all duration-500 pointer-events-none">
      <div className="max-w-[1580px] mx-auto transition-all duration-500 pointer-events-auto">
        {/* Navigation Bar with smooth collapse on scroll-down and expand on scroll-up */}
        <Navbar
          isScrolled={isScrolled}
          isCollapsed={isCollapsed}
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
        />
      </div>

      {/* Mobile Fullscreen Navigation Drawer */}
      <div className="pointer-events-auto">
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
};
