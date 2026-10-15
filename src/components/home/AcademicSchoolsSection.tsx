import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ALL_DEGREE_CATEGORIES } from '../../data/coursesCatalog';
import { DegreeCategory } from '../../types';
import { Reveal } from '../ui/Reveal';

interface AcademicSchoolsSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export const AcademicSchoolsSection: React.FC<AcademicSchoolsSectionProps> = ({
  onSelectCategory,
}) => {
  return (
    <section id="departments" className="relative py-20 lg:py-28 bg-[#FAF6F0] text-navy-950 border-b border-[#E5D3BD] overflow-hidden scroll-mt-20">
      
      {/* Background Subtle Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C6832B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#D4BC9F]/10 rounded-full blur-3xl pointer-events-none" />

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

        {/* Ultra-Clean, Sharp 6 Academic School Cards - Identical to #schools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {ALL_DEGREE_CATEGORIES.map((cat: DegreeCategory, idx: number) => {
            return (
              <Reveal
                key={cat.id}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={(idx % 3) * 90}
              >
                <div
                  onClick={() => onSelectCategory(cat.id)}
                  className="group bg-[#FFFDF9] rounded-none overflow-hidden border border-[#D4BC9F] hover:border-[#9C6019] shadow-[0_8px_25px_rgba(29,22,17,0.08)] hover:shadow-[0_12px_35px_rgba(156,96,25,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Photo with Sharp Edges */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 rounded-none">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform rounded-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    {/* Body Content - ONLY the School Title, Sharp and Clear */}
                    <div className="p-5 sm:p-6 bg-[#FFFDF9]">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1D1611] group-hover:text-[#9C6019] transition-colors leading-snug">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom Action Footer - Clean & Sharp */}
                  <div className="px-5 sm:px-6 py-3.5 border-t border-[#EFE2D2] bg-[#FAF3E7] flex items-center justify-between text-xs font-bold text-[#1D1611] group-hover:text-[#9C6019] transition-colors">
                    <span className="uppercase tracking-wider text-[11px] font-sans">View School Details</span>
                    <div className="w-7 h-7 rounded-none bg-white border border-[#D4BC9F] group-hover:bg-[#9C6019] group-hover:border-[#9C6019] group-hover:text-white text-[#1D1611] flex items-center justify-center transition-all shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
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

