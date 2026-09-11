import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-2 sm:px-4 lg:px-6 2xl:px-8 pt-2 sm:pt-3 lg:pt-3.5 transition-all duration-500 pointer-events-none">
      <div className="max-w-[1580px] mx-auto transition-all duration-500 pointer-events-auto">
        {/* Navigation Bar: Floating glassbox capsule at initial landing, deepening on scroll */}
        <Navbar
          isScrolled={isScrolled}
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
