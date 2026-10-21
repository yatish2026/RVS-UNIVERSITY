import React from 'react';
import { Sparkles, Phone, ArrowRight, CheckCircle2, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { UNIVERSITY_INFO } from '../../data/universityData';
import { Reveal } from '../ui/Reveal';

export const CallToActionSection: React.FC = () => {
  return (
    <section id="admissions" className="py-20 lg:py-24 bg-white text-[#1D1611] relative overflow-hidden border-t border-[#E8DED3]">
      {/* Subtle Ambient Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C6832B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D4BC9F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Eyebrow */}
          <Reveal direction="fade" delay={100}>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#C6832B]/10 border border-[#C6832B]/30 text-[#8B4513] text-[11px] sm:text-xs font-bold uppercase tracking-widest max-w-full shadow-sm">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-[#C6832B]" />
              <span className="truncate">Admissions Open For Academic Session 2026–27</span>
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal direction="zoom" delay={200}>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1D1611] leading-tight">
              Begin Your Journey at <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B57321] via-[#D4973F] to-[#C6832B]">
                RVS University Today.
              </span>
            </h2>
          </Reveal>

          {/* Subtitle */}
          <Reveal direction="up" delay={300}>
            <p className="text-sm sm:text-base md:text-lg text-[#5C4837] max-w-2xl mx-auto leading-relaxed font-normal">
              Step into a world-class academic environment designed to foster technological innovation, ethical leadership, and global career success.
            </p>
          </Reveal>

          {/* Quick Perks */}
          <Reveal direction="up" delay={400}>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#1D1611] pt-2 font-medium">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8DED3] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C6832B] flex-shrink-0" />
                Merit Scholarships Available
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8DED3] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C6832B] flex-shrink-0" />
                NEP 2020 Aligned Curriculum
              </span>
            </div>
          </Reveal>

          {/* CTA Buttons Group */}
          <Reveal direction="up" delay={500}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 max-w-xl mx-auto">
              <a
                href="#admissions-portal"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B57321] via-[#C6832B] to-[#9C6019] hover:from-[#9C6019] hover:to-[#7E4B11] text-white text-sm sm:text-base font-bold shadow-[0_8px_25px_rgba(198,131,43,0.35)] transition-all duration-200 transform hover:scale-105 cursor-pointer"
              >
                <span>APPLY FOR ADMISSION 2026</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#watch-video-prospectus"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF3E7] text-[#1D1611] hover:text-[#9C6019] text-sm sm:text-base font-bold border-2 border-[#D4BC9F] hover:border-[#C6832B] shadow-sm transition-all duration-200 transform hover:scale-105 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#C6832B] fill-[#C6832B]/20" />
                <span>WATCH VIDEO PROSPECTUS</span>
              </a>
            </div>
          </Reveal>

          {/* Admissions Counselor Helpline */}
          <Reveal direction="up" delay={600}>
            <div className="pt-6 border-t border-[#E8DED3] max-w-md mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs text-[#5C4837]">
              <span>Need guidance from an admission counselor?</span>
              <a
                href={`tel:${UNIVERSITY_INFO.phone}`}
                className="text-[#C6832B] hover:text-[#9C6019] font-bold flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                {UNIVERSITY_INFO.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
