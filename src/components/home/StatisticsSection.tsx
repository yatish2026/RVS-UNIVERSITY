import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { UNIVERSITY_STATS } from '../../data/universityData';
import { Reveal } from '../ui/Reveal';

export const StatisticsSection: React.FC = () => {
  return (
    <section id="statistics" className="py-20 lg:py-28 bg-white text-[#1D1611] relative overflow-hidden border-y border-[#E8DED3]">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <Reveal direction="fade">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeading
              number="04"
              eyebrow="University By The Numbers"
              title={
                <>
                  A Legacy of{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B57321] via-[#D4973F] to-[#C6832B]">
                    Measurable Impact
                  </span>
                </>
              }
              subtitle="Our benchmarks in student achievements, career outcomes, research footprint, and institutional infrastructure speak for themselves."
              align="center"
              variant="dark"
            />
          </div>
        </Reveal>

        {/* Statistics Grid with Staggered Zoom & Fade Entrances (4x2 layout on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {UNIVERSITY_STATS.map((stat, idx) => (
            <Reveal
              key={idx}
              direction="zoom"
              delay={idx * 60}
            >
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8DED3] hover:border-[#C6832B] shadow-[0_4px_20px_rgba(29,22,17,0.04)] hover:shadow-[0_12px_32px_rgba(198,131,43,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full group">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B5E34] font-mono mb-2">
                    {stat.label}
                  </div>
                  <div className="flex items-baseline gap-1 text-3xl sm:text-4xl lg:text-[42px] font-serif font-extrabold text-[#1D1611] group-hover:text-[#9C6019] transition-colors my-1.5">
                    {stat.prefix && <span className="text-[#C6832B] text-2xl sm:text-3xl">{stat.prefix}</span>}
                    <span>{stat.value}</span>
                    {stat.suffix && <span className="text-[#C6832B] text-xl sm:text-2xl font-sans ml-1 font-bold">{stat.suffix}</span>}
                  </div>
                </div>

                <p className="text-xs lg:text-sm text-[#5C4837] leading-relaxed pt-4 border-t border-[#EFE5D8]">
                  {stat.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
