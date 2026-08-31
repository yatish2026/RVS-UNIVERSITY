import React, { useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Clock, Users, BookOpen, CheckCircle2, 
  Sparkles, Award, ShieldCheck, Download, Phone, Mail, GraduationCap, 
  Building, Cpu, Zap, Radio, Code, Settings, Server, LineChart, 
  Binary, Wifi, Database, TrendingUp, Laptop, Terminal, Stethoscope, 
  HeartHandshake, FlaskConical, Activity, Pill 
} from 'lucide-react';
import { DegreeCategory, CourseItem } from '../../types';
import { Button } from '../ui/Button';
import { UNIVERSITY_INFO } from '../../data/universityData';
import { Reveal } from '../ui/Reveal';

interface CourseDetailPageProps {
  category: DegreeCategory;
  onBackToHome: () => void;
  onSelectCategory: (categoryId: string) => void;
  allCategories: DegreeCategory[];
}

const iconLookup: Record<string, React.FC<{ className?: string }>> = {
  Cpu, GraduationCap, Briefcase: GraduationCap, Award, HeartPulse: Activity,
  Activity, Pill, Building, Zap, Radio, Code, Settings, Server,
  LineChart, Binary, Wifi, ShieldCheck, Database, TrendingUp,
  Laptop, Terminal, Stethoscope, HeartHandshake, FlaskConical
};

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  category,
  onBackToHome,
  onSelectCategory,
  allCategories,
}) => {
  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const CategoryIcon = iconLookup[category.iconName] || GraduationCap;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Sub-Header / Breadcrumb Bar */}
      <div className="bg-navy-950 text-white border-b border-navy-800 py-3.5 px-4 md:px-8">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-300">
            <button
              onClick={onBackToHome}
              className="hover:text-gold-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Courses & Degrees</span>
            <span className="text-slate-600">/</span>
            <span className="text-gold-300 font-bold">{category.title}</span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs text-gold-300 hover:text-gold-200 font-semibold flex items-center gap-1"
          >
            <span>Back to All Faculties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Dedicated Domain Hero Banner */}
      <div className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 text-white py-16 md:py-24 overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 z-0">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover opacity-20 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/70" />
        </div>

        <div className="container-custom relative z-10 px-4 md:px-8">
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{category.levelBadge}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {category.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl">
              {category.description}
            </p>

            {/* Highlights Strip */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs md:text-sm text-slate-200 border-t border-navy-800">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gold-400" />
                <span className="font-semibold">{category.courses.length} Specialized Programmes</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>AICTE / UGC / Regulatory Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>NEP 2020 Aligned Curriculum</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="gold"
                size="md"
                href="#apply-admissions"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Apply for {category.subtitle}
              </Button>
              <Button
                variant="ghost-white"
                size="md"
                href="#download-syllabus"
                icon={<Download className="w-4 h-4" />}
              >
                Download Syllabus & Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Inside Courses & Departments Grid */}
      <div className="py-16 md:py-24 container-custom px-4 md:px-8">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600 font-sans">
            Curriculum Directory
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
            Programmes & Departments under {category.title}
          </h2>
          <div className="h-1 w-16 bg-gold-500 rounded-full mt-3 mb-4" />
          <p className="text-sm md:text-base text-slate-600 max-w-3xl font-light">
            Select any department to view course duration, intake seats, eligibility criteria, specialized laboratory facilities, and syllabus.
          </p>
        </div>

        {/* All Course Cards for this Degree */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.courses.map((course: CourseItem, idx: number) => {
            const CourseIcon = iconLookup[course.iconName || 'Code'] || Code;

            return (
              <div
                key={course.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-52 w-full overflow-hidden bg-navy-950">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-navy-900 flex items-center justify-center shadow-md">
                        <CourseIcon className="w-5 h-5" />
                      </div>
                      {course.code && (
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-navy-900/90 text-gold-300 border border-gold-500/30 backdrop-blur-md shadow-sm">
                          {course.code}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs">
                      <span className="text-gold-300 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold-400" />
                        {course.duration}
                      </span>
                      {course.seats && (
                        <span className="text-[10px] text-white font-bold px-2 py-0.5 rounded bg-blue-600/90 backdrop-blur-sm">
                          {course.seats}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-navy-950 group-hover:text-gold-700 transition-colors mb-2 leading-snug">
                      {course.name}
                    </h3>

                    {course.eligibility && (
                      <div className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-1.5">
                        <span className="text-gold-600 font-bold">Eligibility:</span>
                        <span className="truncate">{course.eligibility}</span>
                      </div>
                    )}

                    {course.affiliations && (
                      <div className="text-[11px] text-blue-800 bg-blue-50 border border-blue-200 rounded-xl p-2.5 mb-3 leading-tight">
                        <strong className="block text-[10px] uppercase font-bold text-blue-900">Affiliation:</strong>
                        {course.affiliations}
                      </div>
                    )}

                    {course.syllabus && (
                      <div className="text-[11px] text-slate-600 mb-3 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                        <span><strong>Syllabus:</strong> {course.syllabus}</span>
                      </div>
                    )}

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3 font-light">
                      {course.description}
                    </p>

                    {course.specializations && course.specializations.length > 0 && (
                      <div className="mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-navy-950 block mb-1.5">
                          Specialized Tracks / Focus Areas:
                        </span>
                        <ul className="space-y-1">
                          {course.specializations.map((spec, sIdx) => (
                            <li key={sIdx} className="text-[11px] text-slate-700 flex items-center gap-1.5 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0"></span>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {course.highlights && course.highlights.length > 0 && (
                      <div className="space-y-1.5 pt-3 border-t border-slate-100">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Laboratories & Highlights:
                        </span>
                        {course.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium leading-tight">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 mt-2">
                  <a
                    href="#apply"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-navy-900 text-navy-900 group-hover:text-gold-300 font-bold text-xs transition-all border border-slate-200 group-hover:border-navy-900"
                  >
                    <span>Admission Enquiry 2026–27</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. Bottom Admissions CTA for this Domain */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-850 text-white border border-navy-750 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Ready to Enroll in {category.title}?
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-white">
              Admissions Open for Academic Session 2026–27
            </h3>
            <p className="text-xs md:text-sm text-slate-300 font-light">
              Connect with our academic counselors for syllabus details, merit scholarship eligibility, and fee structure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="gold"
              size="md"
              href={`tel:${UNIVERSITY_INFO.phone}`}
              icon={<Phone className="w-4 h-4" />}
            >
              Call: {UNIVERSITY_INFO.phone}
            </Button>
            <Button
              variant="ghost-white"
              size="md"
              onClick={onBackToHome}
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
