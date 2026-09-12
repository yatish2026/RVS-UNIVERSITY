import React, { useState, useEffect } from 'react';
import { X, Sparkles, ChevronLeft, ChevronRight, ArrowRight, GraduationCap } from 'lucide-react';

interface WelcomePreloaderProps {
  onComplete?: () => void;
}

const NOTICES = [
  {
    id: 1,
    tag: 'Admissions Open 2026–27',
    title: 'Choose Your Programme • SVCTPU & RVSPU',
    image: '/images/admissions-programmes-overview.jpg',
    alt: 'RVS University and SVCET Admissions Open Existing & New B.Tech Programmes',
    code: 'EAPCET: SVCTPU / RVSPU',
  },
  {
    id: 2,
    tag: 'New B.Tech Programmes',
    title: 'Specialized Engineering Disciplines (Code: RVSPU)',
    image: '/images/admission-announcement-banner.png',
    alt: 'RVS University New B.Tech Programmes and EAPCET RVSPU Admission Announcement',
    code: 'EAPCET: RVSPU',
  },
];

export const WelcomePreloader: React.FC<WelcomePreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [hasDismissedOnce, setHasDismissedOnce] = useState<boolean>(false);

  // Check sessionStorage so we don't block subsequent route refreshes in same tab
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('rvs_admission_banner_dismissed');
    if (isDismissed === 'true') {
      setIsVisible(false);
      setHasDismissedOnce(true);
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  // Handle ESC key to dismiss current or advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleCancelCurrent();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, currentIndex]);

  // When user cancels/closes the current notice
  const handleCancelCurrent = () => {
    if (currentIndex < NOTICES.length - 1) {
      // Advance to next notice
      setCurrentIndex(currentIndex + 1);
    } else {
      // All notices reviewed / cancelled -> dismiss modal
      handleDismissAll();
    }
  };

  const handleDismissAll = () => {
    setIsClosing(true);
    sessionStorage.setItem('rvs_admission_banner_dismissed', 'true');
    setHasDismissedOnce(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      if (onComplete) onComplete();
    }, 350);
  };

  const handleReopen = (index: number = 0) => {
    setCurrentIndex(index);
    setIsVisible(true);
    setIsClosing(false);
  };

  const currentNotice = NOTICES[currentIndex];

  return (
    <>
      {/* 1. Floating Center Multi-Step Notice without background blur */}
      {isVisible && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 pointer-events-none transition-all duration-300 ease-in-out select-none ${
            isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-fadeIn'
          }`}
        >
          {/* Compact Centered Card */}
          <div className="relative pointer-events-auto w-full max-w-[490px] bg-[#0A192F] rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] border-2 border-gold-400/80 overflow-hidden flex flex-col animate-scaleUp">
            
            {/* Top Bar with Step Indicators & Cancel Button */}
            <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-gradient-to-r from-navy-950 via-[#0E203C] to-navy-950 border-b border-gold-500/30">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gold-300 font-sans truncate">
                  {currentNotice.tag}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40">
                  {currentIndex + 1} of {NOTICES.length}
                </span>
              </div>

              {/* Close / Next Cancel Button */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCancelCurrent}
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-red-500 text-slate-300 hover:text-white transition-all text-xs font-bold cursor-pointer"
                  aria-label={currentIndex === 0 ? "Close & View Next Notice" : "Close Notice"}
                  title={currentIndex === 0 ? "Next Notice (Esc)" : "Close (Esc)"}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle: Announcement Image Display with Prev/Next Controls */}
            <div className="relative p-2 sm:p-2.5 bg-[#FFFBF0] flex items-center justify-center group overflow-hidden">
              <img
                key={currentNotice.id}
                src={currentNotice.image}
                alt={currentNotice.alt}
                className="w-full h-auto max-h-[300px] sm:max-h-[340px] object-contain rounded-xl block transition-all duration-300 animate-fadeIn"
              />

              {/* Previous Arrow Button */}
              {currentIndex > 0 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-navy-950/80 hover:bg-navy-950 text-gold-300 border border-gold-400/50 flex items-center justify-center shadow-lg transition-all cursor-pointer"
                  aria-label="Previous Notice"
                  title="Previous Notice"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Arrow Button */}
              {currentIndex < NOTICES.length - 1 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-navy-950/80 hover:bg-navy-950 text-gold-300 border border-gold-400/50 flex items-center justify-center shadow-lg transition-all cursor-pointer"
                  aria-label="Next Notice"
                  title="Next Notice"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 bg-navy-950 border-t border-navy-800 text-xs">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {NOTICES.map((n, idx) => (
                  <button
                    key={n.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-5 bg-gold-400'
                        : 'w-2 bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to Notice ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {currentIndex < NOTICES.length - 1 ? (
                  <>
                    <button
                      onClick={handleDismissAll}
                      className="px-2.5 py-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                    >
                      Skip All
                    </button>
                    <button
                      onClick={handleCancelCurrent}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
                    >
                      <span>Next Notice</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleDismissAll}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
                  >
                    Cancel / Close
                  </button>
                )}

                <a
                  href="#admissions"
                  onClick={handleDismissAll}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3BA2F] to-[#D4AF37] hover:from-[#DFB742] hover:to-[#E5C46D] text-navy-950 font-black text-xs shadow-gold-glow border border-gold-300 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. Floating Quick Badge to Reopen Notices Anytime */}
      {hasDismissedOnce && !isVisible && (
        <button
          onClick={() => handleReopen(0)}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0B192C] via-[#0F284E] to-[#0B192C] text-gold-300 hover:text-white border-2 border-gold-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 transform hover:scale-105 group cursor-pointer animate-fadeIn"
          aria-label="View Admissions Announcements"
          title="Click to view Admissions & B.Tech Programmes Notices"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500"></span>
          </span>
          <GraduationCap className="w-4 h-4 text-gold-400" />
          <span className="text-xs font-bold uppercase tracking-wider font-sans">
            Admissions Notices <span className="text-gold-400">(SVCTPU / RVSPU)</span>
          </span>
        </button>
      )}
    </>
  );
};
