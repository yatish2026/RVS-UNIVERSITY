import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, MapPin, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

import heroImg1 from '../../assets/SVCET  Image.png';
import heroImg2 from '../../assets/SVCET 2026.png';
import heroImg3 from '../../assets/dsc06293.jpg';

interface HeroSlide {
  id: number;
  image: string;
  tagline: string;
  subHeadline: string;
  highlightBadge: string;
  locationBadge: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: heroImg1,
    tagline: 'AUTONOMOUS EXCELLENCE • STATE-OF-THE-ART INFRASTRUCTURE',
    subHeadline: 'World-Class Campus & Learning at',
    highlightBadge: 'NAAC "A" Grade • UGC Recognized',
    locationBadge: '65+ Acre Smart Hillside Campus, Chittoor, AP',
  },
  {
    id: 2,
    image: heroImg2,
    tagline: 'FIND YOUR PLACE • FOLLOW YOUR PASSION',
    subHeadline: 'Welcome to Future-Ready Education at',
    highlightBadge: '25+ Years Legacy • 49+ Degree Programmes',
    locationBadge: 'Smart Research Labs & Innovation Centers',
  },
  {
    id: 3,
    image: heroImg3,
    tagline: 'EMPOWERING NEXT-GEN TECH LEADERS & INNOVATORS',
    subHeadline: 'Admissions Open for 2026–27 at',
    highlightBadge: '95%+ Placement Record • ₹16 LPA Highest CTC',
    locationBadge: '4,579 Approved Seats across 6 Academic Schools',
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-navy-950 text-white select-none"
    >
      {/* 1. Full Screen Background Image Slider with Contrast Enhancement */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-navy-950">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={`RVS University Campus - Slide ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`w-full h-full object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Multi-Layer Cinematic Contrast Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-[#060F1E]/55 to-[#060F1E]/75 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/60 via-transparent to-[#060F1E]/60 z-10 pointer-events-none" />
      </div>

      {/* Manual Left/Right Slide Controls */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden sm:flex absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-navy-950/70 hover:bg-gold-500 hover:text-navy-950 text-white backdrop-blur-md border border-gold-400/40 items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-2xl cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden sm:flex absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-navy-950/70 hover:bg-gold-500 hover:text-navy-950 text-white backdrop-blur-md border border-gold-400/40 items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-2xl cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 2. Foreground Hero Content with Crystal-Clear Contrast */}
      <div className="container-custom relative z-20 pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 my-auto px-4 md:px-8 text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Classic Cohesive 2-Line Headline */}
          <Reveal direction="fade" delay={100}>
            <div className="flex flex-col items-center mb-6">
              
              {/* Dynamic Sub-Headline with Gold Radiance */}
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-500/20 border border-gold-400/50 backdrop-blur-md mb-3 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-gold-300" />
                <span className="text-xs sm:text-sm md:text-base font-bold tracking-wider text-gold-200 uppercase font-sans">
                  {HERO_SLIDES[currentSlide].subHeadline}
                </span>
              </div>

              {/* Prestigious RVS University Title */}
              <h1 
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-black mb-3 tracking-tight leading-[1.1] text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.95)] font-serif"
              >
                <span className="text-white">RVS </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE58F] via-[#F3BA2F] to-[#D4AF37] drop-shadow-[0_2px_16px_rgba(212,175,55,0.6)]">
                  UNIVERSITY
                </span>
              </h1>

              {/* University Tagline Banner */}
              <div className="flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-xs sm:text-sm md:text-base font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-slate-100 mt-2 shadow-2xl">
                <span>{HERO_SLIDES[currentSlide].tagline}</span>
              </div>

            </div>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-3 mb-4">
              {/* Explore Programmes Pill Button */}
              <a
                href="#departments"
                className="px-8 py-3.5 rounded-full bg-navy-950/90 hover:bg-navy-900 text-white text-sm sm:text-base font-bold shadow-xl border border-gold-400/40 backdrop-blur-md transition-all duration-200 transform hover:scale-105"
              >
                Explore Programmes
              </a>

              {/* Admissions 2026–27 Button (Gold Metallic) */}
              <a
                href="#admissions"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3BA2F] to-[#D4AF37] hover:from-[#DFB742] hover:to-[#E5C46D] text-navy-950 text-sm sm:text-base font-black shadow-[0_4px_25px_rgba(212,175,55,0.5)] transition-all duration-200 transform hover:scale-105 border border-gold-300"
              >
                Admissions 2026–27 →
              </a>
            </div>
          </Reveal>

          {/* Interactive Slide Pagination Bars */}
          <div className="flex items-center justify-center gap-2.5 mt-6 z-30">
            {HERO_SLIDES.map((slide, idx) => {
              const isCurrent = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Jump to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'w-10 bg-gold-400 shadow-[0_0_12px_rgba(212,175,55,0.9)]'
                      : 'w-3 bg-white/40 hover:bg-white/80'
                  }`}
                />
              );
            })}
          </div>

        </div>
      </div>

      {/* 3. Bottom Campus Info Bar */}
      <div className="relative z-30 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent py-4 px-4 md:px-8 border-t border-white/10">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
              <span>{HERO_SLIDES[currentSlide].highlightBadge}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              {HERO_SLIDES[currentSlide].locationBadge}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gold-300/90 font-medium">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-gold-400" />
              NAAC 'A' Grade &bull; UGC Recognized &bull; Estd. 1998
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
