import React, { useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Sparkles, GraduationCap, Building2, 
  ChevronRight, Award, Users, BookOpen, CheckCircle2 
} from 'lucide-react';
import { ALL_DEGREE_CATEGORIES } from '../../data/coursesCatalog';
import { DegreeCategory } from '../../types';
import { UNIVERSITY_INFO } from '../../data/universityData';

interface AcademicSchoolsPageProps {
  onBackToHome: () => void;
  onSelectSchool: (schoolId: string) => void;
}

export const AcademicSchoolsPage: React.FC<AcademicSchoolsPageProps> = ({
  onBackToHome,
  onSelectSchool,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-navy-950">
      {/* Top Breadcrumb & Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#FAF3E7] via-[#FFFDF9] to-[#F5ECE0] text-[#1D1611] pt-28 pb-12 lg:pt-32 lg:pb-16 border-b-2 border-[#E5D3BD] overflow-hidden">
        {/* Background subtle patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(#C6832B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C6832B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#D4BC9F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom px-4 md:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E5D4F] mb-6 font-medium">
            <button 
              onClick={onBackToHome}
              className="hover:text-[#9C6019] transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#9C6019]" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#AD9A88]" />
            <span className="text-[#6E5D4F]">Academics</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#AD9A88]" />
            <span className="text-[#9C6019] font-bold">Academic Schools</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C6832B]/15 border border-[#C6832B]/30 text-[#8B4513] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#9C6019]" />
                <span>6 Autonomous Schools • 49 Degree Programmes</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D1611] leading-tight">
                Academic Schools & Faculties
              </h1>
              <p className="text-sm md:text-base text-[#5C4837] font-normal leading-relaxed max-w-2xl">
                Explore 49 accredited undergraduate, postgraduate, and research degree programmes across our 6 specialized academic schools.
              </p>
            </div>

            {/* Quick Metrics Badge */}
            <div className="grid grid-cols-2 gap-3 bg-[#FFFDF9] shadow-sm p-4 sm:p-5 rounded-2xl border border-[#D4BC9F] flex-shrink-0">
              <div className="text-center px-3 py-2 bg-[#FAF3E7] rounded-xl border border-[#E5D3BD]">
                <div className="font-serif text-2xl font-black text-[#9C6019]">6</div>
                <div className="text-[11px] text-[#6E5D4F] font-bold">Academic Schools</div>
              </div>
              <div className="text-center px-3 py-2 bg-[#FAF3E7] rounded-xl border border-[#E5D3BD]">
                <div className="font-serif text-2xl font-black text-[#9C6019]">49</div>
                <div className="text-[11px] text-[#6E5D4F] font-bold">Degree Programmes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Full-Width Schools Grid (No Left Sidebar!) */}
      <section className="py-14 lg:py-20">
        <div className="container-custom px-4 md:px-8">
          
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-700 block mb-1">
                Curriculum & Departmental Gateways
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                Select a School to Explore Syllabi & Degrees
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Approved by AICTE, UGC & State Government
            </span>
          </div>

          {/* Sharp 6 Schools Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {ALL_DEGREE_CATEGORIES.map((school: DegreeCategory) => (
              <div 
                key={school.id}
                onClick={() => onSelectSchool(school.id)}
                className="group bg-[#FFFDF9] rounded-none overflow-hidden border border-[#D4BC9F] hover:border-[#9C6019] shadow-[0_8px_25px_rgba(29,22,17,0.08)] hover:shadow-[0_12px_35px_rgba(156,96,25,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Sharp Edges */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100 rounded-none">
                    <img 
                      src={school.image} 
                      alt={school.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out rounded-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Body Content - ONLY the School Title, Sharp and Clear */}
                  <div className="p-5 sm:p-6 bg-[#FFFDF9]">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1D1611] group-hover:text-[#9C6019] transition-colors leading-snug">
                      {school.title}
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
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
