import React, { useState, useRef } from 'react';
import { Sparkles, MapPin, Play, Pause, Volume2, VolumeX, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#030914] text-white select-none"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC BACKGROUND VIDEO BANNER (Clean, Vivid, No Glass Overlays) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#030914]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-campus-1.jpg"
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/videobanner.mp4" type="video/mp4" />
          <source src="https://svcetedu.org/assets/img/videobanner.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Natural gradient vignette for crystal clear text readability without obscuring video */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040A15] via-transparent to-[#040A15]/70 z-10 pointer-events-none" />
      </div>

      {/* Video Controls (Floating Bottom Right) */}
      <div className="absolute bottom-20 right-4 sm:right-8 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Campus Video' : 'Play Campus Video'}
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-gold-500 hover:text-navy-950 text-white border border-white/20 hover:border-gold-400 flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer"
          title={isPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-gold-500 hover:text-navy-950 text-white border border-white/20 hover:border-gold-400 flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT (Single Clean Title: Welcome to RVS University) */}
      {/* ========================================================================= */}
      <div className="container-custom relative z-20 pt-28 sm:pt-32 md:pt-36 lg:pt-38 xl:pt-40 pb-12 my-auto px-4 md:px-8 text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <Reveal direction="fade" delay={100}>
            <div className="flex flex-col items-center mb-6">
              
              {/* Clean Welcome Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-3 text-gold-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase font-sans">
                  Welcome to RVS University
                </span>
              </div>

              {/* Prestigious RVS University Title with Brand Color Accents */}
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-black mb-4 tracking-tight leading-[1.08] drop-shadow-[0_6px_32px_rgba(0,0,0,0.98)] font-serif"
              >
                <span className="inline-block">
                  <span className="text-[#FF4D4D] drop-shadow-[0_2px_18px_rgba(255,77,77,0.7)] font-black">R</span>
                  <span className="text-[#E085E9] drop-shadow-[0_2px_18px_rgba(224,133,233,0.7)] font-black">V</span>
                  <span className="text-[#72E28F] drop-shadow-[0_2px_18px_rgba(114,226,143,0.7)] font-black">S</span>
                </span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE79A] via-[#F3BA2F] to-[#D4AF37] drop-shadow-[0_2px_20px_rgba(212,175,55,0.7)]">
                  UNIVERSITY
                </span>
              </h1>

              {/* Tagline text with clean shadow */}
              <p className="text-base sm:text-lg md:text-xl text-slate-100 font-semibold max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] tracking-wide">
                Life on a Smart Campus &bull; Empowering Global Innovators
              </p>

            </div>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-3">
              {/* Explore Programmes Button */}
              <a
                href="#departments"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-navy-950/90 hover:bg-navy-900 text-white text-sm sm:text-base font-bold shadow-2xl border border-gold-400/40 transition-all duration-200 transform hover:scale-105 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-gold-400" />
                <span>Explore Programmes</span>
              </a>

              {/* Admissions 2026–27 Button (Gold Metallic) */}
              <a
                href="#admissions"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3BA2F] to-[#D4AF37] hover:from-[#DFB742] hover:to-[#E5C46D] text-navy-950 text-sm sm:text-base font-black shadow-[0_4px_30px_rgba(212,175,55,0.55)] transition-all duration-200 transform hover:scale-105 border border-gold-300 cursor-pointer"
              >
                <span>Admissions 2026–27</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM CAMPUS INFO STRIP (Clean & Transparent) */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full py-4 px-4 md:px-8 border-t border-white/10 bg-gradient-to-t from-black/90 to-transparent">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-200 font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            <span className="flex items-center gap-1.5 text-gold-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              NAAC 'A' Grade • UGC Recognized
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              Life on a Smart Campus, Chittoor, AP
            </span>
          </div>

          <div className="flex items-center gap-4 text-gold-300 font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              Estd. 1998 &bull; Autonomous Institution
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
