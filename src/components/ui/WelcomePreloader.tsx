import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface WelcomePreloaderProps {
  onComplete?: () => void;
}

export const WelcomePreloader: React.FC<WelcomePreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'entering' | 'revealing' | 'exiting' | 'hidden'>('entering');
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Step 1: Progress counter animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Step 2: Phase timeline
    const textTimer = setTimeout(() => {
      setPhase('revealing');
    }, 600);

    const exitTimer = setTimeout(() => {
      setPhase('exiting');
    }, 2400);

    const hideTimer = setTimeout(() => {
      setPhase('hidden');
      if (onComplete) onComplete();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('hidden');
    if (onComplete) onComplete();
  };

  if (phase === 'hidden') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950 text-white overflow-hidden transition-all duration-700 ease-in-out ${
        phase === 'exiting' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Animated Radial Glows */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gold-500/20 via-blue-600/15 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* Main Animated Intro Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl mx-auto space-y-6">
        
        {/* Animated University Logo with Glowing Rings */}
        <div className="relative">
          {/* Pulsing Outer Aura */}
          <div className="absolute -inset-4 rounded-full bg-gold-500/20 blur-xl animate-pulse pointer-events-none" />
          
          {/* Spinning Gold Orbital Ring */}
          <div className="absolute -inset-2.5 rounded-full border border-dashed border-gold-400/50 animate-spin [animation-duration:12s] pointer-events-none" />

          {/* Logo Crest Container */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-2xl border-3 border-gold-400 bg-white p-1 transform transition-all duration-1000 scale-100 animate-bounce [animation-duration:3s]">
            <img
              src="/images/rvs-official-logo.png"
              alt="RVS University Seal"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* Cinematic Welcome Headline Reveal */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>WELCOME TO</span>
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          </div>

          <h1 className="font-serif font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none drop-shadow-lg">
            RVS <span className="gold-gradient-text">UNIVERSITY</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-light tracking-[0.2em] uppercase">
            Chittoor, Andhra Pradesh &bull; Estd. 1998
          </p>

          <p className="text-[13px] text-gold-400/90 font-serif italic tracking-wide">
            &ldquo;विद्या सर्वस्य भूषणम् &bull; Knowledge is the Supreme Ornament&rdquo;
          </p>
        </div>

        {/* Elegant Gold Progress Indicator */}
        <div className="w-64 sm:w-80 space-y-2 pt-4">
          <div className="h-1.5 w-full rounded-full bg-navy-900 border border-gold-500/30 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300 rounded-full transition-all duration-75 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Entering Campus Portal...</span>
            <span className="text-gold-400 font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Skip Button (Top Right) */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-slate-300 text-xs font-semibold backdrop-blur-md border border-white/20 transition-all shadow-md"
      >
        Skip &rarr;
      </button>
    </div>
  );
};
