import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

interface BgSlide {
  id: string;
  image: string;
  tag: string;
  title: string;
}

export const HeroSection: React.FC = () => {
  const bgSlides: BgSlide[] = [
    {
      id: 'campus-architecture',
      image: '/images/hero-campus-1.jpg',
      tag: '100+ Acre Smart Campus • Chittoor',
      title: 'Modern Academic Architecture & Green Lawns',
    },
    {
      id: 'ai-robotics-lab',
      image: '/images/hero-campus-2.jpg',
      tag: 'High-Tech AI & Robotics Laboratories',
      title: 'Next-Gen Research & Innovation Labs',
    },
    {
      id: 'central-library',
      image: '/images/hero-campus-3.jpg',
      tag: 'Central Digital Library & Research Commons',
      title: 'Digital Commons & Study Pods',
    },
    {
      id: 'campus-life',
      image: '/images/hero-campus-4.jpg',
      tag: 'Vibrant Student Community & Open Amphitheatre',
      title: 'Holistic Student Life & Amphitheatre',
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Auto-transition background images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % bgSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [bgSlides.length]);

  return (
    <section id="home" className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-navy-950 text-white">
      
      {/* 1. FULL BACKGROUND SLIDER LAYER (Crossfading with even lighting) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {bgSlides.map((slide, index) => {
          const isActive = index === currentSlideIndex;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover object-center filter brightness-105 contrast-105 transform transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Soft, Uniform Tint for maximum readability of white serif text */}
        <div className="absolute inset-0 bg-black/35 backdrop-brightness-95" />
      </div>

      {/* 2. Foreground Hero Content (Exact Match to Reference Design) */}
      <div className="container-custom relative z-10 pt-28 md:pt-36 lg:pt-40 pb-16 my-auto px-4 md:px-8 text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Main Headline (Exact Merriweather Serif font with R(Red) V(Purple) S(Green) + Gold University) */}
          <Reveal direction="fade" delay={100}>
            <h1 
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[72px] font-bold text-white mb-6 drop-shadow-[0_3px_16px_rgba(0,0,0,0.9)] tracking-normal leading-[1.2]"
              style={{ fontFamily: '"Merriweather", "Lora", serif' }}
            >
              Welcome to the <br />
              <span className="text-[#FF4D4D] drop-shadow-[0_2px_10px_rgba(255,77,77,0.5)]">R</span>
              <span className="text-[#CE93D8] drop-shadow-[0_2px_10px_rgba(206,147,216,0.5)]">V</span>
              <span className="text-[#81C784] drop-shadow-[0_2px_10px_rgba(129,199,132,0.5)]">S</span>{' '}
              <span className="gold-gradient-text font-serif drop-shadow-[0_2px_16px_rgba(212,175,55,0.4)]">University</span>
            </h1>
          </Reveal>

          {/* Subtitle (Slightly smaller, refined font size) */}
          <Reveal direction="up" delay={200}>
            <p className="text-xs sm:text-sm md:text-[15px] text-white/90 font-normal leading-relaxed max-w-xl mx-auto mb-9 drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
              Any prominent career starts with good education. Together with us, you will have an opportunity of getting better and deeper knowledge of the subjects that can build your future
            </p>
          </Reveal>

          {/* Pill-Shaped Buttons */}
          <Reveal direction="up" delay={300}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
              {/* Explore Programmes Pill Button */}
              <a
                href="#departments"
                className="px-8 py-3.5 rounded-full bg-[#1E2530]/90 hover:bg-[#111827] text-white text-sm sm:text-base font-semibold shadow-xl border border-white/15 backdrop-blur-md transition-all duration-200 transform hover:scale-105"
              >
                Explore Programmes
              </a>

              {/* Admissions 2026–27 Premium Gold Pill Button */}
              <a
                href="#admissions"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A059] via-[#E5C46D] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#C5A059] text-navy-950 text-sm sm:text-base font-bold shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.7)] border border-amber-200/70 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 tracking-wide"
              >
                Admissions 2026–27 →
              </a>
            </div>
          </Reveal>

        </div>
      </div>

      {/* 3. Bottom Centered Pagination Dots (Exact 3-4 translucent dots as in reference image) */}
      <div className="relative z-10 pb-8 flex items-center justify-center gap-2.5">
        {bgSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlideIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              idx === currentSlideIndex
                ? 'w-3 h-3 bg-white shadow-md'
                : 'w-3 h-3 bg-white/40 hover:bg-white/70 border border-white/30'
            }`}
          />
        ))}
      </div>

    </section>
  );
};
