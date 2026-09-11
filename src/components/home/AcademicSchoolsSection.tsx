import React from 'react';
import { 
  Cpu, Settings, FlaskConical, Briefcase, Pill, HeartPulse, 
  ArrowRight, Sparkles, GraduationCap 
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ALL_DEGREE_CATEGORIES } from '../../data/coursesCatalog';
import { DegreeCategory } from '../../types';
import { Reveal } from '../ui/Reveal';

interface AcademicSchoolsSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

const iconLookup: Record<string, React.FC<{ className?: string }>> = {
  Cpu, Settings, FlaskConical, Briefcase, Pill, HeartPulse, GraduationCap
};

export const AcademicSchoolsSection: React.FC<AcademicSchoolsSectionProps> = ({
  onSelectCategory,
}) => {
  return (
    <section id="departments" className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F8FC] via-[#ECF2F8] to-[#F5F8FC] text-navy-950 border-b border-slate-200/80 overflow-hidden scroll-mt-20">
      
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Academic Schools & Degree Offerings"
              title="Programs Offered"
              subtitle="Explore accredited undergraduate, postgraduate, and diploma programs across our 6 specialized academic schools."
              variant="dark"
            />
          </Reveal>
        </div>

        {/* Ultra-Clean, Luxury 6 Academic School Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ALL_DEGREE_CATEGORIES.map((cat: DegreeCategory, idx: number) => {
            const Icon = iconLookup[cat.iconName] || GraduationCap;

            return (
              <Reveal
                key={cat.id}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={(idx % 3) * 90}
              >
                <div
                  onClick={() => onSelectCategory(cat.id)}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 hover:border-gold-500 hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between h-full transform hover:-translate-y-1.5"
                >
                  {/* High-Resolution Visual Photo */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
                    />
                    
                    {/* Multi-Layer Cinematic Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                    {/* Top Floating Badge & Icon */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <div className="w-11 h-11 rounded-2xl bg-white/95 border border-gold-400/40 text-gold-700 flex items-center justify-center shadow-lg group-hover:bg-gold-500 group-hover:text-navy-950 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 text-navy-950 border border-slate-200/90 backdrop-blur-md shadow-md">
                        {cat.countLabel}
                      </span>
                    </div>

                    {/* Bottom Pill on Image */}
                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center gap-1.5 text-xs font-semibold text-gold-300">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      <span>{cat.levelBadge}</span>
                    </div>
                  </div>

                  {/* Clean, High-Contrast Typography Block */}
                  <div className="p-6 flex flex-col justify-between flex-grow bg-white">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950 group-hover:text-gold-700 transition-colors leading-tight mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-1 mb-4 font-normal">
                        {cat.subtitle}
                      </p>
                    </div>

                    {/* Bottom Action Strip */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-gold-700 transition-colors">
                      <span className="tracking-wide">Explore All Programs</span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 group-hover:bg-gold-500 group-hover:text-navy-950 group-hover:border-gold-500 text-navy-900 flex items-center justify-center transition-all">
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
