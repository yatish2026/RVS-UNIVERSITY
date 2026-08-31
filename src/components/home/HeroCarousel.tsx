import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';

interface SlideItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  tag: string;
  href: string;
}

export const HeroCarousel: React.FC = () => {
  const slides: SlideItem[] = [
    {
      id: 'placements-450',
      image: '/images/banner-placements-450.png',
      title: '450+ Students Placed in Internships & Full-Time Employment',
      caption: 'Congratulations to our proud achievers across Fortune 500 corporate recruiters.',
      tag: 'Campus Placement Drive 2025–26',
      href: '#placements',
    },
    {
      id: 'campus-rainbow',
      image: '/images/banner-campus-rainbow.png',
      title: 'The Future Looks Bright at RVS University',
      caption: '100+ Acre Green Residential Campus with Central Library & Smart Amphitheatre.',
      tag: 'World-Class Campus Infrastructure',
      href: '#campus-life',
    },
    {
      id: 'microchip-28lpa',
      image: '/images/banner-microchip-28lpa.png',
      title: 'Deekshitha K (CSE) Placed in Microchip with ₹28 LPA Package',
      caption: 'Top-tier packages secured by RVS engineering graduates in global semiconductor & tech leaders.',
      tag: 'Super Dream Placement Offer',
      href: '#placements',
    },
    {
      id: 'graduation-day',
      image: '/images/graduation-students.jpg',
      title: 'Class of 2026 Convocation & Academic Excellence',
      caption: 'Empowering ambitious graduates to lead in industry, research, and entrepreneurship.',
      tag: 'Convocation & Alumni Network',
      href: '#intro',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Auto-scroll every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-navy-950 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="relative h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] w-full overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-100 pointer-events-auto z-10'
                  : 'opacity-0 scale-95 pointer-events-none z-0'
              }`}
            >
              {/* Slide Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950/85 backdrop-blur-md text-gold-300 text-[11px] font-bold uppercase tracking-wider border border-gold-500/40 shadow-md">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  <span>{slide.tag}</span>
                </span>

                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-bold">
                  {index + 1} / {slides.length}
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-5 p-4 md:p-5 rounded-2xl bg-navy-900/90 border border-gold-500/30 backdrop-blur-md text-white shadow-xl z-20">
                <h4 className="font-serif text-base md:text-lg font-bold text-white mb-1 leading-snug line-clamp-2">
                  {slide.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-light">
                  {slide.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow Controls */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-navy-950/80 hover:bg-gold-500 hover:text-navy-950 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-navy-950/80 hover:bg-gold-500 hover:text-navy-950 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicator Dots & Auto-play Toggle */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-950/80 backdrop-blur-md border border-white/20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-6 h-2 bg-gold-400 shadow-sm'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}

        <button
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? 'Play auto-scroll' : 'Pause auto-scroll'}
          className="ml-1 text-slate-300 hover:text-gold-300 transition-colors"
        >
          {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
