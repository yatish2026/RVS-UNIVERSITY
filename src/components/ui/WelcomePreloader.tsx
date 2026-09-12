import React, { useState, useEffect } from 'react';
import { X, Sparkles, Phone, ArrowRight, CheckCircle2, GraduationCap, Eye } from 'lucide-react';
import { Button } from './Button';

interface WelcomePreloaderProps {
  onComplete?: () => void;
}

export const WelcomePreloader: React.FC<WelcomePreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [hasDismissedOnce, setHasDismissedOnce] = useState<boolean>(false);

  // Check sessionStorage so we don't block subsequent route refreshes in same tab unless explicitly triggered
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('rvs_admission_banner_dismissed');
    if (isDismissed === 'true') {
      setIsVisible(false);
      setHasDismissedOnce(true);
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsClosing(true);
    sessionStorage.setItem('rvs_admission_banner_dismissed', 'true');
    setHasDismissedOnce(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      if (onComplete) onComplete();
    }, 400);
  };

  const handleReopen = () => {
    setIsVisible(true);
    setIsClosing(false);
  };

  return (
    <>
      {/* 1. Modal Overlay on Top of the Loading Page */}
      {isVisible && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm transition-all duration-300 ease-in-out select-none ${
            isClosing ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100 animate-fadeIn'
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleDismiss();
          }}
        >
          {/* Compact Centered Card */}
          <div className="relative w-full max-w-[520px] bg-[#0A192F] rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] border-2 border-gold-400/70 overflow-hidden flex flex-col animate-scaleUp">
            
            {/* Top Bar with Title & Close Button */}
            <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-gradient-to-r from-navy-950 via-[#0E203C] to-navy-950 border-b border-gold-500/30">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gold-300 font-sans truncate">
                  Admissions Notice &bull; EAPCET: RVSPU
                </span>
              </div>

              {/* Close / Cancel Button */}
              <button
                onClick={handleDismiss}
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-red-500 text-slate-300 hover:text-white transition-all text-xs font-bold cursor-pointer"
                aria-label="Close"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Middle: Compact Announcement Image */}
            <div className="p-2 sm:p-3 bg-[#FFFBF0] flex items-center justify-center">
              <img
                src="/images/admission-announcement-banner.png"
                alt="RVS University New B.Tech Programmes and EAPCET RVSPU Admission Announcement"
                className="w-full h-auto max-h-[290px] sm:max-h-[330px] object-contain rounded-xl block"
              />
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 bg-navy-950 border-t border-navy-800 text-xs">
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition-all cursor-pointer"
              >
                Cancel / Close
              </button>

              <div className="flex items-center gap-2">
                <a
                  href="#admissions"
                  onClick={handleDismiss}
                  className="inline-flex items-center gap-1 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3BA2F] to-[#D4AF37] hover:from-[#DFB742] hover:to-[#E5C46D] text-navy-950 font-black text-xs shadow-gold-glow border border-gold-300 transition-all cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. Floating Quick Badge to Reopen the Banner Anytime */}
      {hasDismissedOnce && !isVisible && (
        <button
          onClick={handleReopen}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0B192C] via-[#0F284E] to-[#0B192C] text-gold-300 hover:text-white border-2 border-gold-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 transform hover:scale-105 group cursor-pointer animate-fadeIn"
          aria-label="View New B.Tech Programmes Announcement"
          title="Click to view New B.Tech Programmes & EAPCET Announcement"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-500"></span>
          </span>
          <GraduationCap className="w-4 h-4 text-gold-400" />
          <span className="text-xs font-bold uppercase tracking-wider font-sans">
            New B.Tech Programmes <span className="text-gold-400">(EAPCET: RVSPU)</span>
          </span>
        </button>
      )}
    </>
  );
};
