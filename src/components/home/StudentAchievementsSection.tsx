import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Award, Sparkles, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, Pause, Play, Flame } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

interface AchievementItem {
  id: string;
  image: string;
  badge: string;
  title: string;
  award: string;
  description: string;
  category: string;
}

export const StudentAchievementsSection: React.FC = () => {
  const achievements: AchievementItem[] = [
    {
      id: 'sih-finale',
      image: '/images/achievement-sih-finale.jpg',
      badge: 'Ministry of Education &bull; Govt. of India',
      title: 'Smart India Hackathon (SIH 2024) Grand Finale Selection',
      award: 'National Grand Finalists & Mementos',
      description: 'RVS University student innovators selected among thousands of nationwide teams for the prestigious Smart India Hackathon (SIH 2024) Software Edition Grand Finale at Amity University.',
      category: 'National Hackathon',
    },
    {
      id: 'intellecthon-30k',
      image: '/images/achievement-intellecthon-30k.png',
      badge: 'National Level Hackathon &bull; ₹30,000 Prize',
      title: 'Team ONYX Wins 1st Runner-Up at Intellecthon ’25',
      award: '₹30,000 Cash Prize + Runner-Up Trophy',
      description: 'Team ONYX from SVCET bagged the 1st Runner-Up position and a ₹30,000 cash award at the Intellecthon ’25 National Level Hackathon competing against premier engineering institutions.',
      category: 'Cash Award & Trophy',
    },
    {
      id: 'selesta-prosovo',
      image: '/images/achievement-selesta-prosovo.jpg',
      badge: 'Selesta 2K25 &bull; Technical Symposium',
      title: 'Winners at Selesta 2K25 & Prosovo Technical Championship',
      award: '1st Prize Gold Mementos & Merit Honors',
      description: 'RVS engineering students felicitated by Principal Dr. M. Mohan Babu on stage for winning the championship gold memento and merit certificates in technical design challenges.',
      category: 'State Championship',
    },
    {
      id: 'impactx-hackathon',
      image: '/images/achievement-impactx-hackathon.png',
      badge: 'IMPACT-X 2K25 &bull; ₹15,000 Cash Award',
      title: 'IMPACT-X 2K25 National Innovation Hackathon Winners',
      award: '₹15,000 Cash Award + Developer Toolkits',
      description: 'RVS innovators awarded ₹15,000 cash prize and official engineering kits at the IMPACT-X 2K25 National Hackathon for breakthrough real-time software prototyping.',
      category: 'Hackathon Winners',
    },
    {
      id: 'sih-team-coding',
      image: '/images/achievement-sih-team-coding.jpg',
      badge: '24-Hour Non-Stop Sprint &bull; Hackathon Arena',
      title: '24-Hour Non-Stop National Hackathon Sprint & Prototyping',
      award: 'Deep-Tech Product Development',
      description: 'Our student developers and AI architects collaborating in round-the-clock 24-hour sprint hackathons, building deployable solutions for national industry problem statements.',
      category: 'Hackathon Sprint',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number>(0);

  // Auto-scroll every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievements.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, achievements.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  return (
    <section id="achievements" className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200 overflow-hidden scroll-mt-20">
      <div className="container-custom px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal direction="left" delay={100}>
            <SectionHeading
              eyebrow="Hackathon Triumphs & Accolades"
              title="Our Students' Achievements"
              subtitle="From Smart India Hackathon grand finales to national championship trophies, our students consistently demonstrate technological excellence, creative problem-solving, and leadership."
            />
          </Reveal>

          {/* Quick Stat Pill */}
          <Reveal direction="right" delay={150}>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-navy-950 text-white shadow-lg border border-gold-400/40 self-start md:self-auto">
              <div className="p-2 rounded-xl bg-gold-500 text-navy-950 font-bold">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-serif font-bold text-white">50+ Hackathon Podiums</div>
                <div className="text-[11px] text-gold-300 font-semibold">National & State Level Accolades</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE MOVING SLIDER CAROUSEL (One After Another Motion) */}
        {/* ========================================================================= */}
        <div
          className="relative bg-white rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-slate-200 shadow-2xl overflow-hidden group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Slide Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Highlight Image Container with Smooth Animation */}
            <div className="lg:col-span-7 relative h-[320px] sm:h-[400px] md:h-[460px] rounded-2xl overflow-hidden shadow-xl bg-navy-950 border border-slate-200">
              {achievements.map((item, index) => {
                const isActive = index === currentIndex;

                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      isActive
                        ? 'opacity-100 scale-100 pointer-events-auto z-10'
                        : 'opacity-0 scale-95 pointer-events-none z-0'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Dark gradient at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy-950/90 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/40 backdrop-blur-md shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                        <span dangerouslySetInnerHTML={{ __html: item.badge }} />
                      </span>

                      <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-xs font-mono font-bold">
                        {index + 1} / {achievements.length}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Dedicated Detail Content Panel */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold-500/15 text-gold-700 text-xs font-bold uppercase tracking-wider font-mono">
                  <Flame className="w-3.5 h-3.5 text-gold-600" />
                  <span>{achievements[currentIndex].category}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 leading-tight">
                  {achievements[currentIndex].title}
                </h3>

                {/* Prize Highlight Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-navy-950 to-navy-900 text-white border border-gold-400/40 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-gold-500 text-navy-950 font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gold-300 font-bold uppercase tracking-wider">Recognition & Prize</div>
                      <div className="text-base font-serif font-bold text-white">{achievements[currentIndex].award}</div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {achievements[currentIndex].description}
                </p>
              </div>

              {/* Navigation Controls & Indicators */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {achievements.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        idx === currentIndex
                          ? 'w-7 h-2.5 bg-gold-500 shadow-sm'
                          : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Arrow Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Achievement"
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-navy-950 hover:text-gold-300 text-navy-950 flex items-center justify-center transition-all shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next Achievement"
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-navy-950 hover:text-gold-300 text-navy-950 flex items-center justify-center transition-all shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    aria-label={isPaused ? 'Play auto-scroll' : 'Pause auto-scroll'}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all ml-1"
                  >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Thumbnail Quick Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {achievements.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`p-3 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                idx === currentIndex
                  ? 'bg-navy-950 text-white border-gold-400 shadow-lg'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-gold-300 hover:shadow-sm'
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
              />
              <div className="overflow-hidden">
                <div className={`text-[11px] font-bold truncate ${idx === currentIndex ? 'text-gold-300' : 'text-navy-950'}`}>
                  {item.title}
                </div>
                <div className="text-[9px] text-slate-400 truncate mt-0.5">
                  {item.award}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
