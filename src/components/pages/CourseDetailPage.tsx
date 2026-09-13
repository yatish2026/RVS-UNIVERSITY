import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowLeft, ArrowRight, Clock, Users, BookOpen, CheckCircle2, 
  Sparkles, Award, ShieldCheck, Download, Phone, Mail, GraduationCap, 
  Building, Cpu, Zap, Radio, Code, Settings, Server, LineChart, 
  Binary, Wifi, Database, TrendingUp, Laptop, Terminal, Stethoscope, 
  HeartHandshake, FlaskConical, Activity, Pill, Search, Dna, Atom,
  CreditCard, Target, DollarSign, Heart, Shield, ShieldAlert, Scan,
  Eye, TestTube, HeartPulse, Building2, Gauge, Home
} from 'lucide-react';
import { DegreeCategory, CourseItem } from '../../types';
import { Button } from '../ui/Button';
import { UNIVERSITY_INFO } from '../../data/universityData';

interface CourseDetailPageProps {
  category: DegreeCategory;
  onBackToHome: () => void;
  onSelectCategory: (categoryId: string) => void;
  allCategories: DegreeCategory[];
}

const iconLookup: Record<string, React.FC<{ className?: string }>> = {
  Cpu, GraduationCap, Briefcase: GraduationCap, Award, HeartPulse,
  Activity, Pill, Building, Building2, Zap, Radio, Code, Settings, Server,
  LineChart, Binary, Wifi, ShieldCheck, Database, TrendingUp,
  Laptop, Terminal, Stethoscope, HeartHandshake, FlaskConical,
  Search, Dna, Atom, CreditCard, Target, DollarSign, Heart, Shield,
  ShieldAlert, Scan, Eye, TestTube, Gauge
};

// Reusable scroll-observer wrapper for course cards with buttery smooth landing entrance animation
const CourseScrollCard: React.FC<{
  index: number;
  children: (isInView: boolean, landingDirection: 'left' | 'center' | 'right') => React.ReactNode;
}> = ({ index, children }) => {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Column position in a 3-column layout:
  // Col 0 (index % 3 === 0): Lands from left side
  // Col 1 (index % 3 === 1): Lands from bottom center with elevation lift
  // Col 2 (index % 3 === 2): Lands from right side
  const direction: 'left' | 'center' | 'right' =
    index % 3 === 0 ? 'left' : index % 3 === 1 ? 'center' : 'right';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -15px 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={cardRef} className="h-full">
      {children(isInView, direction)}
    </div>
  );
};

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  category,
  onBackToHome,
  onSelectCategory,
  allCategories,
}) => {
  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const CategoryIcon = iconLookup[category.iconName] || GraduationCap;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-navy-950 overflow-x-hidden">
      {/* Top Hero Banner with Prominent School Visual */}
      <div className="relative bg-gradient-to-br from-[#0A192F] via-[#102444] to-[#0A192F] text-white pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden border-b border-gold-500/20 shadow-xl">
        <div className="container-custom relative z-10 px-4 md:px-8">
          
          {/* Breadcrumb Strip: Home > School */}
          <div className="flex items-center gap-2 text-xs font-semibold text-gold-300/90 flex-wrap mb-4">
            <button 
              onClick={onBackToHome} 
              className="hover:text-gold-200 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-slate-400">&gt;</span>
            <span className="text-gold-400 font-bold">{category.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: School Title & Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>{category.levelBadge}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {category.title}
              </h1>

              <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                {category.description}
              </p>

              {/* Highlights Strip */}
              <div className="flex flex-wrap items-center gap-5 pt-2 text-xs md:text-sm text-slate-200 border-t border-navy-800/80">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gold-400" />
                  <span className="font-semibold">{category.courses.length} Specialized Offerings</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>AICTE / UGC Approved</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onBackToHome}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-gold-300 text-xs font-bold border border-gold-400/40 backdrop-blur-md transition-all self-start shadow-md cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return Back</span>
                </button>
              </div>
            </div>

            {/* Right: Crisp, High-Resolution School Photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-400/40 group bg-navy-950">
                <div className="h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-navy-950">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-xs font-bold text-white flex items-center justify-between">
                  <span className="text-gold-300 uppercase tracking-wider text-[11px] font-sans">
                    {category.countLabel}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-navy-950/80 text-slate-200 border border-gold-400/30">
                    Faculty Catalog
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2.5 Sticky Academic Schools Navigation Switcher */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="container-custom px-4 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  category.id === cat.id
                    ? 'bg-navy-950 text-gold-300 font-black shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-navy-950 border border-slate-200'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Inside Courses & Departments Grid */}
      <div className="py-14 md:py-20 container-custom px-4 md:px-8">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
            Curriculum Directory
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
            Programmes & Departments under {category.title}
          </h2>
          <div className="h-1 w-16 bg-gold-500 rounded-full mt-3 mb-4" />
          <p className="text-sm md:text-base text-slate-600 max-w-3xl font-normal">
            Select any department to view course duration, intake seats, eligibility criteria, specialized laboratory facilities, and syllabus.
          </p>
        </div>

        {/* All Course Cards for this Degree */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden p-1">
          {category.courses.map((course: CourseItem, idx: number) => {
            const CourseIcon = iconLookup[course.iconName || 'Code'] || Code;

            return (
              <CourseScrollCard key={course.id} index={idx}>
                {(isInView, direction) => {
                  const colIdx = idx % 3;
                  const delayMs = colIdx * 90;
                  const transitionStyle: React.CSSProperties = {
                    transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, box-shadow 300ms ease`,
                    willChange: 'transform, opacity',
                    transform: isInView
                      ? 'translate3d(0, 0, 0) scale(1)'
                      : direction === 'left'
                      ? 'translate3d(-40px, 20px, 0) scale(0.96)'
                      : direction === 'right'
                      ? 'translate3d(40px, 20px, 0) scale(0.96)'
                      : 'translate3d(0, 40px, 0) scale(0.95)',
                    opacity: isInView ? 1 : 0,
                  };

                  return (
                    <div
                      style={transitionStyle}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-gold-400 flex flex-col justify-between group h-full"
                    >
                      <div>
                        {/* Photo Header */}
                        <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                          <img
                            src={course.image}
                            alt={course.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                            <div className="w-10 h-10 rounded-xl bg-white/95 border border-slate-200 backdrop-blur-md text-gold-700 flex items-center justify-center shadow-md">
                              <CourseIcon className="w-5 h-5" />
                            </div>
                            {course.code && (
                              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-navy-950 border border-slate-200/90 backdrop-blur-md shadow-sm">
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
                              <span className="text-[11px] text-navy-950 font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-gold-400 to-amber-300 shadow-md">
                                {course.seats} Seats
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 pb-2">
                          <h3 className="font-serif text-xl font-bold text-navy-950 group-hover:text-gold-700 transition-colors leading-snug">
                            {course.name}
                          </h3>
                        </div>
                      </div>

                      {/* Footer Action */}
                      <div className="p-6 pt-0 mt-2 space-y-2">
                        {(course.id === 'soet-civil' || course.id.includes('civil')) ? (
                          <a
                            href="#dept-civil"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore Civil Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id === 'soet-eee' || course.id.includes('eee') || course.id.includes('electrical')) ? (
                          <a
                            href="#dept-eee"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore EEE Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id === 'soet-mech' || course.id.includes('mech') || course.id.includes('mechanical')) ? (
                          <a
                            href="#dept-mech"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore Mechanical Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id === 'soet-ece' || course.id.includes('ece') || course.id.includes('electronics') || course.id.includes('ebm') || course.id.includes('biomedical')) ? (
                          <a
                            href="#dept-ece"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore ECE Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id.includes('csm') || course.id.includes('aiml') || course.id.includes('cse-ai') || course.id.includes('machine-learning') || course.name.toLowerCase().includes('machine learning')) ? (
                          <a
                            href="#dept-csm"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore CSE(AI&ML) Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id.includes('ai') || course.id.includes('robotics') || course.id.includes('intelligence')) ? (
                          <a
                            href="#dept-ai"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore AI Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id.includes('it') || course.name.toLowerCase().includes('information technology')) ? (
                          <a
                            href="#dept-it"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore IT Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id.includes('iot') || course.name.toLowerCase().includes('internet of things') || course.name.toLowerCase().includes('(iot)')) ? (
                          <a
                            href="#dept-iot"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore CSE(IoT) Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id.includes('cyber') || course.id.includes('csc') || course.name.toLowerCase().includes('cyber security')) ? (
                          <a
                            href="#dept-csc"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore CSE(Cyber Security) Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id.includes('ds') || course.id.includes('data-science') || course.name.toLowerCase().includes('data science')) ? (
                          <a
                            href="#dept-ds"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore CSE(Data Science) Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id.includes('mba') || course.id.includes('bba') || course.id.includes('management') || course.name.toLowerCase().includes('business administration') || course.name.toLowerCase().includes('mba')) ? (
                          <a
                            href="#dept-mba"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore Management Studies (MBA) Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id.includes('bca') || course.name.toLowerCase().includes('bachelor of computer application')) ? (
                          <a
                            href="#dept-bca"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore BCA Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id.includes('mca') || course.name.toLowerCase().includes('master of computer application') || course.name.toLowerCase().includes('mca')) ? (
                          <a
                            href="#dept-mca"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore MCA Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (course.id.includes('cse') || course.id.includes('computer') || course.id.includes('scse') || course.id.includes('software')) ? (
                          <a
                            href="#dept-cse"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <Building className="w-3.5 h-3.5" />
                            <span>Explore CSE Dept Portal (Full Syllabus & Faculty)</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        ) : (
                          <a
                            href="#admissions"
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all border border-gold-500/30 shadow-md"
                          >
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>Explore Programme Curriculum & Details</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </a>
                        )}

                        <a
                          href="#admissions"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-gold-500 text-navy-950 font-bold text-xs transition-all border border-slate-200 hover:border-gold-500 shadow-sm"
                        >
                          <span>Admission Enquiry 2026–27</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  );
                }}
              </CourseScrollCard>
            );
          })}
        </div>

        {/* 5. Bottom Admissions CTA for this School */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white border border-gold-400/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
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
              Return Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
