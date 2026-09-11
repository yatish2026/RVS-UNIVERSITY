import React, { useState } from 'react';
import { 
  Cpu, Wrench, GraduationCap, Briefcase, Award, HeartPulse, 
  Activity, Pill, Building, Zap, Radio, Code, Settings, Server, 
  LineChart, Binary, Wifi, ShieldCheck, Database, TrendingUp, 
  Laptop, Terminal, Stethoscope, HeartHandshake, FlaskConical, 
  ArrowRight, CheckCircle2, Sparkles, Clock, Users, BookOpen, Shield 
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ALL_DEGREE_CATEGORIES } from '../../data/coursesCatalog';
import { DegreeCategory, CourseItem } from '../../types';
import { Reveal } from '../ui/Reveal';

// Icon resolver for domain & course icons
const iconLookup: Record<string, React.FC<{ className?: string }>> = {
  Cpu, Wrench, GraduationCap, Briefcase, Award, HeartPulse,
  Activity, Pill, Building, Zap, Radio, Code, Settings, Server,
  LineChart, Binary, Wifi, ShieldCheck, Database, TrendingUp,
  Laptop, Terminal, Stethoscope, HeartHandshake, FlaskConical
};

export const DepartmentsGrid: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('btech');

  const selectedCategory: DegreeCategory = ALL_DEGREE_CATEGORIES.find(
    (cat) => cat.id === activeCategoryId
  ) || ALL_DEGREE_CATEGORIES[0];

  const CategoryIcon = iconLookup[selectedCategory.iconName] || GraduationCap;

  return (
    <section id="departments" className="py-20 lg:py-28 bg-gradient-to-b from-[#F5F8FC] via-[#ECF2F8] to-[#F5F8FC] text-navy-950 border-b border-slate-200/80 overflow-hidden scroll-mt-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal direction="left">
            <SectionHeading
              number="05"
              eyebrow="Academic Catalog & Degrees"
              title="Courses & Academic Programmes"
              subtitle="Explore comprehensive degrees across Engineering, Technology, Management, Nursing, Physiotherapy, and Pharmaceutical Sciences."
              variant="dark"
            />
          </Reveal>
        </div>

        {/* Level 1: Main Degree / Domain Selector Tabs */}
        <Reveal direction="fade" delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-10">
            {ALL_DEGREE_CATEGORIES.map((cat) => {
              const Icon = iconLookup[cat.iconName] || GraduationCap;
              const isActive = activeCategoryId === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-navy-950 text-gold-300 border-gold-500 shadow-xl scale-105 z-10 ring-2 ring-gold-400/30'
                      : 'bg-white text-navy-950 border-slate-200/90 hover:border-gold-400 hover:shadow-md hover:text-gold-700'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                      isActive
                        ? 'bg-gold-500 text-navy-950 font-bold shadow-sm'
                        : 'bg-slate-100 text-navy-900 group-hover:bg-gold-500 group-hover:text-navy-950'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold font-serif leading-tight">
                    {cat.title}
                  </span>
                  <span
                    className={`text-[10px] mt-1 font-medium ${
                      isActive ? 'text-gold-300 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {cat.countLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Level 2: Active Domain Overview Card */}
        <Reveal direction="fade" delay={150}>
          <div className="mb-10 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white border border-gold-400/30 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40">
                  {selectedCategory.levelBadge}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {selectedCategory.courses.length} Programmes Available
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2.5">
                <CategoryIcon className="w-7 h-7 text-gold-400 flex-shrink-0" />
                <span>{selectedCategory.title}</span>
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-light">
                {selectedCategory.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#admissions"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs shadow-md transition-all whitespace-nowrap"
              >
                <span>Enquire for {selectedCategory.subtitle}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Level 3: All Inside Departments & Courses for Selected Main Domain */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedCategory.courses.map((course: CourseItem, idx: number) => {
            const CourseIcon = iconLookup[course.iconName || 'Code'] || Code;
            const colIndex = idx % 3;
            const direction = colIndex === 0 ? 'left' : colIndex === 1 ? 'up' : 'right';

            return (
              <Reveal
                key={course.id}
                direction={direction}
                delay={(idx % 6) * 70}
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-gold-400 transition-all duration-300 flex flex-col justify-between group h-full">
                  <div>
                    {/* Course Visual Header Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

                      {/* Badges on Image */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <div className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md text-gold-700 border border-slate-200 flex items-center justify-center shadow-md">
                          <CourseIcon className="w-4 h-4" />
                        </div>
                        {course.code && (
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-navy-950 border border-slate-200/90 backdrop-blur-md shadow-sm">
                            {course.code}
                          </span>
                        )}
                      </div>

                      {/* Course Duration & Seats Bar on bottom of photo */}
                      <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs">
                        <span className="text-gold-300 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gold-400" />
                          {course.duration}
                        </span>
                        {course.seats && (
                          <span className="text-[10px] text-white font-bold px-2 py-0.5 rounded bg-blue-600/90 backdrop-blur-sm shadow-sm">
                            {course.seats}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Course Title */}
                      <h4 className="font-serif text-lg md:text-xl font-bold text-navy-950 group-hover:text-gold-700 transition-colors mb-2 leading-snug">
                        {course.name}
                      </h4>

                      {/* Eligibility or Affiliation Info */}
                      {course.eligibility && (
                        <div className="text-xs text-slate-600 font-medium mb-3 flex items-center gap-1.5">
                          <span className="text-gold-700 font-bold">Eligibility:</span>
                          <span className="truncate">{course.eligibility}</span>
                        </div>
                      )}

                      {/* Affiliations if present (e.g. Nursing / APNMC / Dr NTR) */}
                      {course.affiliations && (
                        <div className="text-[11px] text-gold-900 bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-3 leading-tight">
                          <strong className="block text-[10px] uppercase font-bold text-gold-800">Affiliation:</strong>
                          {course.affiliations}
                        </div>
                      )}

                      {/* Syllabus Standard if present */}
                      {course.syllabus && (
                        <div className="text-[11px] text-slate-600 mb-3 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                          <span><strong className="text-navy-950">Syllabus:</strong> {course.syllabus}</span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3 font-normal">
                        {course.description}
                      </p>

                      {/* Specializations list if present */}
                      {course.specializations && course.specializations.length > 0 && (
                        <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-800 block mb-1.5">
                            Specialized Tracks / Seats:
                          </span>
                          <ul className="space-y-1">
                            {course.specializations.map((spec, sIdx) => (
                              <li key={sIdx} className="text-[11px] text-slate-700 flex items-center gap-1.5 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0"></span>
                                <span>{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Highlights */}
                      {course.highlights && course.highlights.length > 0 && (
                        <div className="space-y-1.5 pt-3 border-t border-slate-100">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-800 block mb-1">
                            Key Laboratories & Pillars:
                          </span>
                          {course.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-600 font-medium leading-tight">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="p-6 pt-0 mt-2">
                    <a
                      href="#admissions"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-gold-500 text-navy-950 group-hover:text-navy-950 font-bold text-xs transition-all border border-slate-200 group-hover:border-gold-500 shadow-sm"
                    >
                      <span>Enquire Admission & Syllabus</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </a>
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
