import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowRight, GraduationCap } from 'lucide-react';

interface WelcomePreloaderProps {
  onComplete?: () => void;
}

const NOTICES = [
  {
    id: 1,
    tag: 'New B.Tech Programmes',
    title: 'Specialized Engineering Disciplines (Code: RVSPU)',
    image: '/images/admission-announcement-banner.png',
    alt: 'RVS University New B.Tech Programmes and EAPCET RVSPU Admission Announcement',
    code: 'EAPCET: RVSPU',
  },
  {
    id: 2,
    tag: 'Admissions Open 2026–27',
    title: 'Choose Your Programme • SVCTPU & RVSPU',
    image: '/images/admissions-programmes-overview.jpg',
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

  const currentNotice = NOTICES[currentIndex];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. EXACT REGAL WELCOME SPLASH SCREEN MATCHING USER DESIGN */}
      {/* ========================================================================= */}
      {phase === 'splash' && (
        <div
          className={`fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 bg-[#080E18] text-white transition-opacity duration-500 select-none ${
            splashFading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Subtle Geometric Matrix / Dot Pattern */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }}
          />

          {/* Subtle Ambient Golden Center Glow */}
          <div className="absolute w-[450px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

          {/* Top Skip Button */}
          <button
            onClick={finishSplash}
            className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-white/5 hover:bg-[#D4AF37] hover:text-navy-950 text-[#D4AF37] text-xs font-bold border border-[#D4AF37]/30 backdrop-blur-md transition-all cursor-pointer shadow-md"
          >
            Skip Intro →
          </button>

          {/* Center Content Container */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
            
            {/* Top Logo: Animated Drop from Top down into place */}
            <div className="relative animate-logo-drop flex items-center justify-center">
              {/* Outer Dashed / Dotted Golden Orbit Ring */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-dashed border-[#D4AF37]/60 p-2 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.35)] animate-spin-slow" style={{ animationDuration: '25s' }}>
                {/* Inner Solid White Circular Badge with Emblem */}
                <div className="w-full h-full rounded-full bg-white p-2.5 sm:p-3 shadow-xl flex items-center justify-center">
                  <img
                    src="/images/logo.png"
                    alt="RVS University Emblem"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Pill Tag: ✧ WELCOME TO ✧ */}
            <div className="animate-text-reveal-1 pt-1">
              <div className="inline-flex items-center gap-2 px-5 py-1 rounded-full border border-[#D4AF37]/40 bg-[#0A192F]/80 text-[#D4AF37] text-xs font-bold uppercase tracking-[0.25em] shadow-sm backdrop-blur-md">
                <span className="text-[10px]">✧</span>
                <span>WELCOME TO</span>
                <span className="text-[10px]">✧</span>
              </div>
            </div>

            {/* University Name: RVS in White, UNIVERSITY in Gold */}
            <div className="space-y-3 animate-text-reveal-2">
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none">
                <span className="text-white">RVS </span>
                <span className="text-[#D4AF37]">UNIVERSITY</span>
              </h1>

              {/* Sub-location & Estd */}
              <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 font-sans tracking-[0.2em] uppercase font-medium">
                CHITTOOR, ANDHRA PRADESH • ESTD. 1998
              </p>

              {/* Sanskrit Motto Quote in Gold Italic */}
              <p className="font-serif italic text-[#E2B855] text-xs sm:text-sm md:text-base pt-1 font-normal tracking-wide">
                “विद्या सर्वस्य भूषणम् • Knowledge is the Supreme Ornament”
              </p>
            </div>

            {/* Bottom Progress Bar */}
            <div className="w-72 sm:w-96 space-y-2 pt-4 animate-text-reveal-3">
              <div className="h-1.5 w-full bg-[#0F223D] rounded-full overflow-hidden border border-[#D4AF37]/30 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F3BA2F] to-[#D4AF37] rounded-full transition-all duration-75 shadow-[0_0_15px_rgba(212,175,55,0.9)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-sans">
                <span>Entering Campus Portal...</span>
                <span className="font-mono text-[#D4AF37] font-semibold">{Math.round(progress)}%</span>
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
          className={`fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 pointer-events-none transition-all duration-300 ease-in-out select-none ${
            isNoticeClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-fadeIn'
          }`}
        >
          {/* Centered Modal Card */}
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
                  onClick={handleCancelCurrentNotice}
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
                      onClick={handleDismissAllNotices}
                      className="px-2.5 py-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                    >
                      Skip All
                    </button>
                    <button
                      onClick={handleCancelCurrentNotice}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
                    >
                      <span>Next Notice</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleDismissAllNotices}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
                  >
                    Cancel / Close
                  </button>
                )}

                <a
                  href="#admissions"
                  onClick={handleDismissAllNotices}
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

      {/* ========================================================================= */}
      {/* 3. FLOATING QUICK BADGE (To Reopen Notices Anytime) */}
      {/* ========================================================================= */}
      {hasDismissedOnce && phase === 'dismissed' && (
        <button
          onClick={() => handleReopenNotices(0)}
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
