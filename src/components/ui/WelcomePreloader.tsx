import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowRight, GraduationCap } from 'lucide-react';
import noticeBanner1 from '../../assets/admission-announcement-banner.png';
import noticeBanner2 from '../../assets/admissions-programmes-overview.jpg';
import rvsLogo from '../../assets/rvs-official-logo.png';

interface WelcomePreloaderProps {
  onComplete?: () => void;
}

const NOTICES = [
  {
    id: 1,
    tag: 'New B.Tech Programmes',
    title: 'Specialized Engineering Disciplines (Code: RVSPU)',
    image: noticeBanner1,
    alt: 'RVS University New B.Tech Programmes and EAPCET RVSPU Admission Announcement',
    code: 'EAPCET: RVSPU',
  },
  {
    id: 2,
    tag: 'Admissions Open 2026–27',
    title: 'Choose Your Programme • SVCTPU & RVSPU',
    image: noticeBanner2,
    alt: 'RVS University and SVCET Admissions Open Existing & New B.Tech Programmes',
    code: 'EAPCET: SVCTPU / RVSPU',
  },
];

export const WelcomePreloader: React.FC<WelcomePreloaderProps> = ({ onComplete }) => {
  // States: 'splash' -> 'notices' -> 'dismissed'
  const [phase, setPhase] = useState<'splash' | 'notices' | 'dismissed'>('splash');
  const [progress, setProgress] = useState<number>(0);
  const [splashFading, setSplashFading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isNoticeClosing, setIsNoticeClosing] = useState<boolean>(false);
  const [hasDismissedOnce, setHasDismissedOnce] = useState<boolean>(false);

  // Eagerly preload announcement images into browser memory immediately
  useEffect(() => {
    const img1 = new Image();
    img1.src = noticeBanner1;
    const img2 = new Image();
    img2.src = noticeBanner2;
  }, []);

  // Check sessionStorage so we don't repeat splash on every route change in the same tab session
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('rvs_admission_banner_dismissed');
    if (isDismissed === 'true') {
      setPhase('dismissed');
      setHasDismissedOnce(true);
      if (onComplete) onComplete();
      return;
    }

    // Progress animation for Splash Screen (2.2 seconds)
    const intervalTime = 25; // ms
    const totalDuration = 2200; // ms
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          finishSplash();
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Finish Splash Screen and transition to Notification Notices
  const finishSplash = () => {
    setSplashFading(true);
    setTimeout(() => {
      setPhase('notices');
      setSplashFading(false);
    }, 400);
  };

  // Handle ESC key to dismiss current notice or advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (phase === 'splash') {
          finishSplash();
        } else if (phase === 'notices') {
          handleCancelCurrentNotice();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentIndex]);

  // When user cancels/closes the current notice
  const handleCancelCurrentNotice = () => {
    if (currentIndex < NOTICES.length - 1) {
      // Advance to next notice
      setCurrentIndex(currentIndex + 1);
    } else {
      // All notices reviewed / cancelled -> dismiss modal
      handleDismissAllNotices();
    }
  };

  const handleDismissAllNotices = () => {
    setIsNoticeClosing(true);
    sessionStorage.setItem('rvs_admission_banner_dismissed', 'true');
    setHasDismissedOnce(true);
    setTimeout(() => {
      setPhase('dismissed');
      setIsNoticeClosing(false);
      if (onComplete) onComplete();
    }, 350);
  };

  const handleReopenNotices = (index: number = 0) => {
    setCurrentIndex(index);
    setPhase('notices');
    setIsNoticeClosing(false);
  };

  // Listen for custom trigger to reopen notices from moving ticker/banner
  useEffect(() => {
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ index?: number }>;
      handleReopenNotices(customEvent.detail?.index ?? 0);
    };
    window.addEventListener('open-admission-notices', handleCustomOpen);
    return () => {
      window.removeEventListener('open-admission-notices', handleCustomOpen);
    };
  }, []);

  const currentNotice = NOTICES[currentIndex];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. EXACT REGAL WELCOME SPLASH SCREEN MATCHING USER DESIGN */}
      {/* ========================================================================= */}
      {phase === 'splash' && (
        <div
          className={`fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#FAF3E7] via-[#FFFDF9] to-[#F5ECE0] text-[#1D1611] transition-opacity duration-500 select-none ${
            splashFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Subtle Geometric Matrix / Dot Pattern */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#C6832B 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }}
          />

          {/* Subtle Ambient Center Glow */}
          <div className="absolute w-[450px] h-[450px] bg-[#C6832B]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

          {/* Top Skip Button */}
          <button
            onClick={finishSplash}
            className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-[#FAF3E7] hover:bg-[#C6832B] hover:text-white text-[#9C6019] text-xs font-bold border border-[#D4BC9F] backdrop-blur-md transition-all cursor-pointer shadow-sm"
          >
            Skip Intro →
          </button>

          {/* Center Content Container */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
            
            {/* Top Logo: Animated Drop from Top down into place */}
            <div className="relative animate-logo-drop flex items-center justify-center">
              {/* Outer Dashed / Dotted Orbit Ring */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-dashed border-[#C6832B]/60 p-2 flex items-center justify-center shadow-[0_0_40px_rgba(198,131,43,0.25)] animate-spin-slow" style={{ animationDuration: '25s' }}>
                {/* Inner Solid White Circular Badge with Emblem */}
                <div className="w-full h-full rounded-full bg-white p-1.5 sm:p-2 shadow-md flex items-center justify-center overflow-hidden border border-[#D4BC9F]">
                  <img
                    src={rvsLogo}
                    alt="RVS University Emblem"
                    className="w-full h-full object-contain rounded-full block"
                  />
                </div>
              </div>
            </div>

            {/* Pill Tag: ✧ WELCOME TO ✧ */}
            <div className="animate-text-reveal-1 pt-1">
              <div className="inline-flex items-center gap-2 px-5 py-1 rounded-full border border-[#D4BC9F] bg-[#FFFDF9] text-[#9C6019] text-xs font-bold uppercase tracking-[0.25em] shadow-sm">
                <span className="text-[10px]">✧</span>
                <span>WELCOME TO</span>
                <span className="text-[10px]">✧</span>
              </div>
            </div>

            {/* University Name: RVS in Brand Colors, UNIVERSITY in Sand Ochre */}
            <div className="space-y-3 animate-text-reveal-2">
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none">
                <span className="text-[#D81E5B]">R</span>
                <span className="text-[#8B1E8B]">V</span>
                <span className="text-[#00875A]">S </span>
                <span className="text-[#C6832B]">UNIVERSITY</span>
              </h1>

              {/* Sub-location & Estd */}
              <p className="text-[11px] sm:text-xs md:text-sm text-[#6E5D4F] font-sans tracking-[0.2em] uppercase font-bold">
                CHITTOOR, ANDHRA PRADESH • ESTD. 1998
              </p>

              {/* Sanskrit Motto Quote */}
              <p className="font-serif italic text-[#8B4513] text-xs sm:text-sm md:text-base pt-1 font-semibold tracking-wide">
                “विद्या सर्वस्य भूषणम् • Knowledge is the Supreme Ornament”
              </p>
            </div>

            {/* Bottom Progress Bar */}
            <div className="w-72 sm:w-96 space-y-2 pt-4 animate-text-reveal-3">
              <div className="h-2 w-full bg-[#E5D3BD] rounded-full overflow-hidden border border-[#D4BC9F] p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#B57321] via-[#C6832B] to-[#9C6019] rounded-full transition-all duration-75 shadow-sm"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#6E5D4F] font-sans font-medium">
                <span>Entering Campus Portal...</span>
                <span className="font-mono text-[#9C6019] font-bold">{Math.round(progress)}%</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ADMISSION ANNOUNCEMENTS POPUP MODAL (Appears after splash screen) */}
      {/* ========================================================================= */}
      {phase === 'notices' && (
        <div
          className={`fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 w-full h-full max-w-full transition-all duration-300 ease-in-out select-none ${
            isNoticeClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Dark Blurred Backdrop Overlay - Clicking outside closes modal */}
          <div
            onClick={handleDismissAllNotices}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer z-0 transition-opacity"
            aria-label="Click outside to close notice"
          />

          {/* Centered Modal Card - Fully responsive for mobile (max-w-[94vw]) & desktop */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-[94vw] sm:max-w-[480px] bg-[#FFFDF9] rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(77,54,31,0.35)] border-2 border-[#D4BC9F] overflow-hidden flex flex-col my-auto animate-scaleUp text-[#1D1611]"
          >
            
            {/* Top Bar with Step Indicators & Cancel Button */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-[#FAF3E7] via-[#FFFDF9] to-[#FAF3E7] border-b border-[#E5D3BD]">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-[#C6832B] animate-pulse flex-shrink-0" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#9C6019] font-sans truncate">
                  {currentNotice.tag}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#C6832B]/15 text-[#8B4513] border border-[#C6832B]/40">
                  {currentIndex + 1} of {NOTICES.length}
                </span>
              </div>

              {/* Close / Next Cancel Button */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleCancelCurrentNotice}
                  className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F5ECE0] hover:bg-red-500 text-[#1D1611] hover:text-white transition-all text-xs font-bold cursor-pointer"
                  aria-label={currentIndex === 0 ? "Close & View Next Notice" : "Close Notice"}
                  title={currentIndex === 0 ? "Next Notice (Esc)" : "Close (Esc)"}
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Middle: Announcement Image Display with Prev/Next Controls */}
            <div className="relative p-2 sm:p-2.5 bg-[#FFFBF0] flex items-center justify-center group overflow-hidden min-h-[160px] sm:min-h-[220px]">
              <img
                key={currentNotice.id}
                src={currentNotice.image}
                alt={currentNotice.alt}
                loading="eager"
                decoding="sync"
                className="w-full h-auto max-h-[240px] sm:max-h-[320px] object-contain rounded-xl block transition-all duration-200"
              />

              {/* Previous Arrow Button */}
              {currentIndex > 0 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex - 1)}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFFDF9]/90 hover:bg-[#C6832B] text-[#1D1611] hover:text-white border border-[#D4BC9F] flex items-center justify-center shadow-md transition-all cursor-pointer"
                  aria-label="Previous Notice"
                  title="Previous Notice"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}

              {/* Next Arrow Button */}
              {currentIndex < NOTICES.length - 1 && (
                <button
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFFDF9]/90 hover:bg-[#C6832B] text-[#1D1611] hover:text-white border border-[#D4BC9F] flex items-center justify-center shadow-md transition-all cursor-pointer"
                  aria-label="Next Notice"
                  title="Next Notice"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 bg-[#FAF3E7] border-t border-[#E5D3BD] text-xs">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {NOTICES.map((n, idx) => (
                  <button
                    key={n.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'w-5 bg-[#C6832B]'
                        : 'w-2 bg-[#D4BC9F] hover:bg-[#B57321]'
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
                      onClick={handleDismissAllNotices}
                      className="px-2.5 py-1 text-[11px] text-[#6E5D4F] hover:text-[#1D1611] cursor-pointer font-semibold"
                    >
                      Skip All
                    </button>
                    <button
                      onClick={handleCancelCurrentNotice}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#FFFDF9] hover:bg-[#EBDBC8] text-[#1D1611] font-bold text-xs border border-[#D4BC9F] transition-all cursor-pointer"
                    >
                      <span>Next Notice</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#9C6019]" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleDismissAllNotices}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FFFDF9] hover:bg-[#EBDBC8] text-[#1D1611] font-bold text-xs border border-[#D4BC9F] transition-all cursor-pointer"
                  >
                    Cancel / Close
                  </button>
                )}

                <a
                  href="#admissions"
                  onClick={handleDismissAllNotices}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#B57321] via-[#C6832B] to-[#9C6019] hover:from-[#9C6019] hover:to-[#7E4B11] text-white font-black text-xs shadow-md border border-gold-300 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
