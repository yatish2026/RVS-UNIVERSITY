import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MapPin, Play, Pause, Volume2, VolumeX, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

const TAGLINES = [
  {
    subHeadline: 'Autonomous Excellence & Innovation at',
    tagline: 'AUTONOMOUS EXCELLENCE • STATE-OF-THE-ART INFRASTRUCTURE',
    badge: 'NAAC "A" Grade • UGC Recognized',
    location: '65+ Acre Smart Hillside Campus, Chittoor, AP',
  },
  {
    subHeadline: 'Empowering Next-Gen Innovators at',
    tagline: 'FIND YOUR PLACE • FOLLOW YOUR PASSION',
    badge: '25+ Years Legacy • 49+ Degree Programmes',
    location: 'Smart Research Labs & Innovation Centers',
  },
  {
    subHeadline: 'Admissions Open for 2026–27 at',
    tagline: 'EMPOWERING NEXT-GEN TECH LEADERS & INNOVATORS',
    badge: '95%+ Placement Record • ₹28 LPA Highest CTC',
    location: '4,579 Approved Seats across 6 Academic Schools',
  },
];

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTagIndex, setCurrentTagIndex] = useState<number>(0);

  // Rotate tagline / badges smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTagIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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

  const activeTag = TAGLINES[currentTagIndex];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#030914] text-white select-none"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC FULL-SCREEN BACKGROUND VIDEO BANNER (From svcetedu.org) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#030914]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-campus-1.jpg"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        >
          <source src="/videos/videobanner.mp4" type="video/mp4" />
          <source src="https://svcetedu.org/assets/img/videobanner.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Multi-Layer High-Contrast Gradients for Legibility & Luxury Feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#040A15] via-[#040A15]/65 to-[#040A15]/80 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040A15]/85 via-transparent to-[#040A15]/85 z-10 pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-10" 
          style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      {/* Video Control Buttons (Floating Bottom Right) */}
      <div className="absolute bottom-20 right-4 sm:right-8 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Campus Video' : 'Play Campus Video'}
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-gold-500 hover:text-navy-950 text-white backdrop-blur-md border border-white/20 hover:border-gold-400 flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-xl cursor-pointer"
          title={isPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="w-10 h-10 rounded-full bg-black/60 hover:bg-gold-500 hover:text-navy-950 text-white backdrop-blur-md border border-white/20 hover:border-gold-400 flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-xl cursor-pointer"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO CONTENT WITH CRYSTAL-CLEAR GOLD RADIANCE */}
      {/* ========================================================================= */}
      <div className="container-custom relative z-20 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 my-auto px-4 md:px-8 text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Main Headline */}
          <Reveal direction="fade" delay={100}>
            <div className="flex flex-col items-center mb-6">
              
              {/* Dynamic Sub-Headline with Gold Radiance */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/50 backdrop-blur-md mb-4 shadow-lg transition-all duration-500">
                <Sparkles className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
                <span className="text-xs sm:text-sm md:text-base font-bold tracking-wider text-gold-200 uppercase font-sans">
                  {activeTag.subHeadline}
                </span>
              </div>

              {/* Prestigious RVS University Title */}
              <h1 
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[82px] font-black mb-4 tracking-tight leading-[1.08] text-white drop-shadow-[0_6px_32px_rgba(0,0,0,0.98)] font-serif"
              >
                <span className="text-white">RVS </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE79A] via-[#F3BA2F] to-[#D4AF37] drop-shadow-[0_2px_20px_rgba(212,175,55,0.7)]">
                  UNIVERSITY
                </span>
              </h1>

              {/* University Tagline Banner */}
              <div className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-black/65 border border-white/20 backdrop-blur-md text-xs sm:text-sm md:text-base font-bold tracking-[0.18em] sm:tracking-[0.24em] uppercase text-slate-100 shadow-2xl transition-all duration-500">
                <span>{activeTag.tagline}</span>
              </div>

            </div>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 mb-6">
              {/* Explore Programmes Pill Button */}
              <a
                href="#departments"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-navy-950/90 hover:bg-navy-900 text-white text-sm sm:text-base font-bold shadow-2xl border border-gold-400/40 backdrop-blur-md transition-all duration-200 transform hover:scale-105 cursor-pointer"
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

          {/* Tagline Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-2 z-30">
            {TAGLINES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentTagIndex(idx)}
                aria-label={`Show message ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentTagIndex
                    ? 'w-8 bg-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.9)]'
                    : 'w-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM CAMPUS INFO STRIP */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full bg-gradient-to-t from-black/95 via-black/75 to-transparent py-4 px-4 md:px-8 border-t border-white/10">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
              <span>{activeTag.badge}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              {activeTag.location}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gold-300/90 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              NAAC 'A' Grade &bull; UGC Recognized &bull; Estd. 1998
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
