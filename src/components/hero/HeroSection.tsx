import React, { useState, useRef } from 'react';
import { Sparkles, MapPin, Play, Pause, Volume2, VolumeX, ArrowRight, Compass, ShieldCheck, GraduationCap } from 'lucide-react';
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
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#140E0A] text-white select-none"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC BACKGROUND VIDEO BANNER (Clean, Vivid, No Glass Overlays) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#140E0A]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/videobanner.mp4" type="video/mp4" />
          <source src="https://svcetedu.org/assets/img/videobanner.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Natural gradient vignette for crystal clear text readability without obscuring video */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#140E0A] via-transparent to-[#140E0A]/70 z-10 pointer-events-none" />
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
                  <span className="text-[#D81E5B] drop-shadow-[0_2px_18px_rgba(216,30,91,0.7)] font-black">R</span>
                  <span className="text-[#8B1E8B] drop-shadow-[0_2px_18px_rgba(139,30,139,0.7)] font-black">V</span>
                  <span className="text-[#00875A] drop-shadow-[0_2px_18px_rgba(0,135,90,0.7)] font-black">S</span>
                </span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBF5EB] via-[#D4973F] to-[#C6832B] drop-shadow-[0_2px_20px_rgba(198,131,43,0.7)]">
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
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FFFDF9]/95 hover:bg-[#FAF3E7] text-[#1D1611] text-sm sm:text-base font-bold shadow-2xl border-2 border-[#D4BC9F] transition-all duration-200 transform hover:scale-105 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#9C6019]" />
                <span>Explore Programmes</span>
              </a>

              {/* Admissions 2026–27 Button (RVS Ochre Gold) */}
              <a
                href="#admissions"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B57321] via-[#C6832B] to-[#9C6019] hover:from-[#9C6019] hover:to-[#7E4B11] text-white text-sm sm:text-base font-black shadow-[0_4px_30px_rgba(198,131,43,0.4)] transition-all duration-200 transform hover:scale-105 border border-gold-300 cursor-pointer"
              >
                <span>Admissions 2026–27</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CONTINUOUS MOVING ADMISSIONS NOTIFICATION TICKER (Flush Bottom) */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full bg-[#120C08]/95 backdrop-blur-md border-t border-[#D4BC9F]/40 py-2 sm:py-2.5 px-2 sm:px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="w-full flex items-center gap-2 sm:gap-3.5 overflow-hidden px-1 sm:px-2">
          {/* Static Pill Trigger Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-admission-notices', { detail: { index: 0 } }))}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#B57321] via-[#C6832B] to-[#9C6019] hover:from-[#9C6019] hover:to-[#7E4B11] text-white text-[11px] font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer whitespace-nowrap border border-gold-300/80 hover:scale-105"
            title="Click to view announcement modal"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
            </span>
            <GraduationCap className="w-3.5 h-3.5 text-white" />
            <span>NOTICE</span>
          </button>

          {/* Smooth Continuous Infinite Marquee Track */}
          <div
            onClick={() => window.dispatchEvent(new CustomEvent('open-admission-notices', { detail: { index: 0 } }))}
            className="flex-1 overflow-hidden whitespace-nowrap cursor-pointer group"
            title="Click to view full notice announcements"
          >
            <div className="inline-flex animate-marquee-left items-center gap-8 text-xs font-semibold text-slate-100 group-hover:text-amber-300 transition-colors">
              <span className="inline-flex items-center gap-2">
                <span className="text-[#C6832B]">★</span>
                <span>Admissions 2026–27 Open for New B.Tech Programmes: CSE (Quantum Computing, AI & Data Engineering, AI & Robotics, Cloud Computing) • ECE (Drone Technology)</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[#C6832B]">•</span>
                <span>Counselling Code EAPCET: <strong className="text-amber-300 font-bold">RVSPU</strong></span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[#C6832B]">•</span>
                <span>Admissions Helpline: +91 93908 84218 / 77299 99158 / 96696 60214</span>
              </span>
              <span className="inline-flex items-center gap-1 text-amber-300 font-bold underline underline-offset-2">
                [Click to View Notice Modal]
              </span>

              {/* Seamless loop repetition */}
              <span className="inline-flex items-center gap-2">
                <span className="text-[#C6832B]">★</span>
                <span>Admissions 2026–27 Open for New B.Tech Programmes: CSE (Quantum Computing, AI & Data Engineering, AI & Robotics, Cloud Computing) • ECE (Drone Technology)</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[#C6832B]">•</span>
                <span>Counselling Code EAPCET: <strong className="text-amber-300 font-bold">RVSPU</strong></span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[#C6832B]">•</span>
                <span>Admissions Helpline: +91 93908 84218 / 77299 99158 / 96696 60214</span>
              </span>
              <span className="inline-flex items-center gap-1 text-amber-300 font-bold underline underline-offset-2">
                [Click to View Notice Modal]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
