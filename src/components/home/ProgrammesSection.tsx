import React, { useState } from 'react';
import { GraduationCap, Clock, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { FEATURED_PROGRAMS } from '../../data/universityData';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export const ProgrammesSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Undergraduate' | 'Postgraduate' | 'Doctoral'>('All');

  const filteredPrograms = selectedLevel === 'All'
    ? FEATURED_PROGRAMS
    : FEATURED_PROGRAMS.filter(p => p.level === selectedLevel);

  const levels: Array<'All' | 'Undergraduate' | 'Postgraduate' | 'Doctoral'> = [
    'All',
    'Undergraduate',
    'Postgraduate',
    'Doctoral'
  ];

  return (
    <section id="programmes" className="py-20 lg:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE0] to-[#FAF7F2] text-navy-950 border-b border-amber-900/10 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal direction="left">
            <SectionHeading
              number="02"
              eyebrow="Academic Pathways"
              title="Programmes Designed for Tomorrow's Leaders"
              subtitle="Industry-aligned curriculum, multidisciplinary credit choices, and hands-on laboratory immersion across multiple degree levels."
              variant="dark"
            />
          </Reveal>

          {/* Level Filter Tabs */}
          <Reveal direction="right">
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200/90 shadow-sm self-start md:self-auto overflow-x-auto">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                    selectedLevel === level
                      ? 'bg-navy-950 text-gold-300 shadow-sm'
                      : 'text-slate-600 hover:text-navy-950 hover:bg-slate-50'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Programmes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPrograms.map((prog, idx) => (
            <Reveal
              key={prog.id}
              direction={idx % 2 === 0 ? 'left' : 'right'}
              delay={idx * 100}
            >
              <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-gold-400 transition-all duration-300 flex flex-col justify-between group h-full">
                <div>
                  {/* Level & Category Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-50 text-gold-800 border border-amber-200">
                      {prog.level}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-600" />
                      {prog.duration}
                    </span>
                  </div>

                  {/* Program Title */}
                  <h3 className="font-serif text-xl font-bold text-navy-950 group-hover:text-gold-700 transition-colors mb-3 leading-snug">
                    {prog.title}
                  </h3>

                  {/* Tagline / Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {prog.tagline}
                  </p>

                  {/* Key Pillars */}
                  <div className="space-y-2 py-4 border-t border-slate-100 mb-6 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                      <span>NEP 2020 Flexible Credit System</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                      <span>Industry Capstone & Paid Internships</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-2">
                  <a
                    href="#admissions"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 group-hover:bg-gold-500 text-navy-950 group-hover:text-navy-950 font-bold text-xs transition-all border border-slate-200 group-hover:border-gold-500 shadow-sm"
                  >
                    <span>Admission Enquiry & Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* View All Programs Banner */}
        <Reveal direction="up" delay={300}>
          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-gold-400/30 shadow-2xl">
            <div>
              <h4 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">
                Looking for a specialized degree or minor certification?
              </h4>
              <p className="text-sm text-slate-300 font-light">
                Explore our comprehensive 17+ departments across engineering, artificial intelligence, and corporate management.
              </p>
            </div>
            <Button
              variant="gold"
              size="md"
              href="#departments"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore All 17+ Departments
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
