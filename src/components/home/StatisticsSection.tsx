import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { UNIVERSITY_STATS } from '../../data/universityData';
import { Reveal } from '../ui/Reveal';

export const StatisticsSection: React.FC = () => {
  return (
    <section id="statistics" className="py-20 lg:py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <Reveal direction="fade">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeading
              number="04"
              eyebrow="University By The Numbers"
              title="A Legacy of Measurable Impact"
              subtitle="Our benchmarks in student achievements, career outcomes, research footprint, and institutional infrastructure speak for themselves."
              align="center"
              variant="light"
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
              <div className="p-6 sm:p-7 rounded-3xl bg-navy-900/80 border border-navy-750 hover:border-gold-500/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between h-full group shadow-lg">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gold-400 font-mono mb-2">
                    {stat.label}
                  </div>
                  <div className="flex items-baseline gap-1 text-3xl sm:text-4xl lg:text-[42px] font-serif font-extrabold text-white group-hover:text-gold-300 transition-colors my-1.5">
                    {stat.prefix && <span className="text-gold-400 text-2xl sm:text-3xl">{stat.prefix}</span>}
                    <span>{stat.value}</span>
                    {stat.suffix && <span className="text-gold-400 text-xl sm:text-2xl font-sans ml-1">{stat.suffix}</span>}
                  </div>
                </div>

                <p className="text-xs lg:text-sm text-slate-300 leading-relaxed pt-4 border-t border-navy-800/80">
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
