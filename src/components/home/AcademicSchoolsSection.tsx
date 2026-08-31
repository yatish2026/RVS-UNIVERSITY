import React from 'react';
import { 
  Cpu, Wrench, GraduationCap, Briefcase, Award, HeartPulse, 
  Activity, Pill, ArrowRight, Sparkles 
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ALL_DEGREE_CATEGORIES } from '../../data/coursesCatalog';
import { DegreeCategory } from '../../types';
import { Reveal } from '../ui/Reveal';

interface AcademicSchoolsSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

const iconLookup: Record<string, React.FC<{ className?: string }>> = {
  Cpu, Wrench, GraduationCap, Briefcase, Award, HeartPulse, Activity, Pill
};

export const AcademicSchoolsSection: React.FC<AcademicSchoolsSectionProps> = ({
  onSelectCategory,
}) => {
  return (
    <section id="departments" className="py-20 lg:py-28 bg-[#F8FAFC] overflow-hidden scroll-mt-20">
      <div className="container-custom px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Academic Catalog & Faculties"
              title="Academic Schools & Degree Offerings"
              subtitle="Select a faculty below to explore accredited degrees, specialized departments, lab infrastructure, and career prospects."
            />
          </Reveal>
        </div>

        {/* Ultra-Clean, Luxury 8 Faculty Cards (Image + Name Only) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {ALL_DEGREE_CATEGORIES.map((cat: DegreeCategory, idx: number) => {
            const Icon = iconLookup[cat.iconName] || GraduationCap;

            return (
              <Reveal
                key={cat.id}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={(idx % 4) * 80}
              >
                <div
                  onClick={() => onSelectCategory(cat.id)}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-2xl border-2 border-slate-200/90 hover:border-gold-500 transition-all duration-500 cursor-pointer flex flex-col justify-between h-full transform hover:-translate-y-1.5"
                >
                  {/* High-Resolution Visual Photo */}
                  <div className="relative h-60 w-full overflow-hidden bg-navy-950">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Multi-Layer Cinematic Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top Floating Badge & Icon */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <div className="w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md text-navy-950 flex items-center justify-center shadow-lg group-hover:bg-gold-500 group-hover:text-navy-950 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-navy-950/90 text-gold-300 border border-gold-400/40 backdrop-blur-md shadow-md">
                        {cat.countLabel}
                      </span>
                    </div>

                    {/* Bottom Pill on Image */}
                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center gap-1.5 text-xs font-semibold text-gold-300">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      <span>{cat.levelBadge}</span>
                    </div>
                  </div>

                  {/* Clean, High-Contrast Typography Block (Image + Name Only) */}
                  <div className="p-6 flex flex-col justify-between flex-grow bg-white">
                    <h3 className="font-serif text-xl font-bold text-navy-950 group-hover:text-gold-600 transition-colors leading-tight mb-4">
                      {cat.title}
                    </h3>

                    {/* Bottom Action Strip */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-navy-950 group-hover:text-gold-600 transition-colors">
                      <span className="tracking-wide">Explore Programmes</span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-navy-950 group-hover:text-gold-300 flex items-center justify-center transition-all">
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
