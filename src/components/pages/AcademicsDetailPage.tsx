import React, { useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, BookOpen, FileText, Calendar, Award, 
  CheckCircle2, Download, ExternalLink, QrCode, ShieldCheck, 
  Phone, Mail, ChevronRight, Sparkles, Building2, GraduationCap,
  Clock, AlertCircle
} from 'lucide-react';
import { UNIVERSITY_INFO } from '../../data/universityData';

export type AcademicTab = 
  | 'mandatory-disclosure'
  | 'board-of-studies'
  | 'academic-calendars'
  | 'naac-ssr'
  | 'ranking-accreditation'
  | 'iqac'
  | 'aqar'
  | 'exam-section';

interface AcademicsDetailPageProps {
  activeTab: AcademicTab;
  onBackToHome: () => void;
  onSelectTab: (tab: AcademicTab) => void;
}

export const AcademicsDetailPage: React.FC<AcademicsDetailPageProps> = ({
  activeTab,
  onBackToHome,
  onSelectTab,
}) => {
  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Sidebar Menu Items matching the user request
  const sidebarItems: { id: AcademicTab; label: string; badge?: string }[] = [
    { id: 'mandatory-disclosure', label: 'Mandatory Disclosure', badge: 'AICTE' },
    { id: 'board-of-studies', label: 'Board of Studies' },
    { id: 'academic-calendars', label: 'Academic Calendars', badge: '2026–27' },
    { id: 'naac-ssr', label: 'NAAC Self Study Report', badge: 'SSR' },
    { id: 'ranking-accreditation', label: 'Ranking and Accreditation', badge: 'NBA NIRF' },
    { id: 'iqac', label: 'IQAC', badge: 'Quality Cell' },
    { id: 'aqar', label: 'AQAR' },
    { id: 'exam-section', label: 'Exam Section', badge: 'Portal' },
  ];

  // Active Tab Metadata
  const tabMetadata: Record<AcademicTab, { title: string; subtitle: string; category: string }> = {
    'mandatory-disclosure': {
      title: 'Mandatory Disclosure',
      subtitle: 'AICTE, UGC, and State Regulatory statutory disclosures and institutional compliance.',
      category: 'Statutory Compliance',
    },
    'board-of-studies': {
      title: 'Board of Studies (BOS)',
      subtitle: 'Department-level statutory academic board composition, curriculum framework, and syllabus design.',
      category: 'Curricular Affairs',
    },
    'academic-calendars': {
      title: 'Academic Calendars (2026–27)',
      subtitle: 'University instructional working days, mid examinations, semester practicals, and vacation calendars.',
      category: 'Academic Schedules',
    },
    'naac-ssr': {
      title: 'NAAC Self Study Report (SSR)',
      subtitle: 'National Assessment and Accreditation Council institutional Self Study Report and quality metrics.',
      category: 'Quality Assurance',
    },
    'ranking-accreditation': {
      title: 'Ranking and Accreditation',
      subtitle: 'National recognitions, NBA accredited departments, AICTE approvals, and NIRF rankings.',
      category: 'Accreditations',
    },
    'iqac': {
      title: 'Internal Quality Assurance Cell (IQAC)',
      subtitle: 'Fostering academic excellence, continuous pedagogical audits, and quality benchmarks across all departments.',
      category: 'Quality Assurance',
    },
    'aqar': {
      title: 'Annual Quality Assurance Report (AQAR)',
      subtitle: 'Annual institutional quality performance reviews documented and submitted to regulatory bodies.',
      category: 'Quality Cell',
    },
    'exam-section': {
      title: 'Controller of Examinations & Exam Portal',
      subtitle: 'Central autonomous examination cell handling semester results, timetables, revaluation, and notifications.',
      category: 'Examination Cell',
    },
  };

  const currentMeta = tabMetadata[activeTab] || tabMetadata['mandatory-disclosure'];

  return (
    <div className="bg-[#FAF6F0] min-h-screen text-navy-950">
      {/* Top Breadcrumb & Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#FAF3E7] via-[#FFFDF9] to-[#F5ECE0] text-[#1D1611] pt-28 pb-10 lg:pt-32 lg:pb-14 border-b-2 border-[#E5D3BD] overflow-hidden">
        {/* Background glow & subtle patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(#C6832B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C6832B]/5 rounded-full blur-3xl pointer-events-none" />

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
            <a 
              href="#schools"
              className="hover:text-[#9C6019] transition-colors cursor-pointer font-semibold"
            >
              Academics
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-[#AD9A88]" />
            <span className="text-[#9C6019] font-bold">{currentMeta.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6832B]/15 border border-[#C6832B]/30 text-[#8B4513] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#9C6019]" />
                <span>{currentMeta.category}</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-[#1D1611] mb-3">
                {currentMeta.title}
              </h1>
              <p className="text-sm md:text-base text-[#5C4837] font-normal leading-relaxed">
                {currentMeta.subtitle}
              </p>
            </div>

            {/* Quick Status / Helpline Badge */}
            <div className="flex-shrink-0 flex items-center gap-3 bg-[#FFFDF9] shadow-sm p-4 rounded-2xl border border-[#D4BC9F]">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C6832B] to-[#9C6019] flex items-center justify-center text-white shadow-md font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-300 font-medium">Academic Affairs Cell</div>
                <div className="text-sm font-bold text-white">{UNIVERSITY_INFO.email}</div>
                <div className="text-[11px] text-gold-300 font-semibold">Helpdesk: {UNIVERSITY_INFO.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout (Sidebar + Content) */}
      <section className="py-10 lg:py-16">
        <div className="container-custom px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR: Dynamic Menu (IQAC Menu if activeTab === 'iqac', otherwise Academics Menu) */}
            <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 space-y-4">
              <div className="bg-white rounded-none p-4 md:p-5 shadow-lg border border-[#D4BC9F]">
                <div className="pb-3 mb-3 border-b border-[#E5D3BD] flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9C6019] font-sans flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none bg-[#C6832B]"></span>
                    {activeTab === 'iqac' ? 'IQAC Menu' : 'Academics Menu'}
                  </span>
                  <span className="text-[10px] bg-[#FAF3E7] text-[#8B4513] px-2 py-0.5 rounded-none font-bold border border-[#D4BC9F]">
                    {activeTab === 'iqac' ? '9 Sections' : `${sidebarItems.length} Sections`}
                  </span>
                </div>

                {/* Sidebar Navigation Buttons */}
                <nav className="space-y-2" aria-label="Academics or IQAC Sidebar">
                  {activeTab === 'iqac' ? (
                    // IQAC Specific Menu Items
                    [
                      { id: 'about-iqac', label: 'IQAC Cell Overview', href: '#about-iqac', badge: 'Overview' },
                      { id: 'members-committee', label: 'Members Committee', href: '#members-committee', badge: 'Committee' },
                      { id: 'meeting-minutes', label: 'Meeting Minutes', href: '#meeting-minutes', badge: 'Minutes' },
                      { id: 'annual-report', label: 'Annual Report (AQAR)', href: '#annual-report', badge: 'AQAR' },
                      { id: 'naac-certificate', label: 'NAAC Certificate & SSR', href: '#naac-certificate', badge: 'SSR' },
                      { id: 'aaa', label: 'Academic Audit (AAA)', href: '#aaa', badge: 'AAA' },
                      { id: 'idp', label: 'Institutional Plan (IDP)', href: '#idp', badge: 'IDP' },
                      { id: 'useful-links', label: 'Useful Links & Policies', href: '#useful-links', badge: 'Policies' },
                      { id: 'downloads', label: 'Downloads & Rubrics', href: '#downloads', badge: 'Rubrics' },
                    ].map((item, idx) => (
                      <a
                        key={item.id}
                        href={item.href}
                        className={`w-full text-left px-3.5 py-3 rounded-none text-xs md:text-sm font-semibold transition-all duration-150 flex items-center justify-between group cursor-pointer border ${
                          idx === 0
                            ? 'bg-[#9C6019] text-white border-[#9C6019] font-bold shadow-md'
                            : 'bg-[#FAF3E7] hover:bg-[#9C6019] text-[#1D1611] hover:text-white border-[#D4BC9F] hover:border-[#9C6019]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className={`font-serif text-sm font-black flex-shrink-0 ${
                            idx === 0 ? 'text-white' : 'text-[#C6832B] group-hover:text-white'
                          }`}>
                            »
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-none border flex-shrink-0 ml-2 ${
                              idx === 0
                                ? 'bg-white text-[#9C6019] border-white font-black'
                                : 'bg-[#EFE2D2] text-[#8B4513] border-[#D4BC9F] group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </a>
                    ))
                  ) : (
                    sidebarItems.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => onSelectTab(item.id)}
                          className={`w-full text-left px-3.5 py-3 rounded-none text-xs md:text-sm font-semibold transition-all duration-150 flex items-center justify-between group cursor-pointer border ${
                            isActive
                              ? 'bg-[#9C6019] text-white border-[#9C6019] font-bold shadow-md'
                              : 'bg-[#FAF3E7] hover:bg-[#9C6019] text-[#1D1611] hover:text-white border-[#D4BC9F] hover:border-[#9C6019]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span className={`font-serif text-sm font-black flex-shrink-0 ${
                              isActive ? 'text-white' : 'text-[#C6832B] group-hover:text-white'
                            }`}>
                              »
                            </span>
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-none border flex-shrink-0 ml-2 ${
                              isActive 
                                ? 'bg-white text-[#9C6019] border-white font-black' 
                                : 'bg-[#EFE2D2] text-[#8B4513] border-[#D4BC9F] group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </nav>
              </div>

              {/* Quick Contact & WhatsApp Support Card */}
              <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl p-4 text-navy-950 shadow-md border border-amber-300/80 flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-[11px] font-black uppercase tracking-wider text-navy-950/80 flex items-center gap-1">
                    <QrCode className="w-4 h-4 text-navy-950" />
                    Academic Cell
                  </div>
                  <div className="text-xs font-bold leading-snug">
                    RVS University Academic Support
                  </div>
                  <div className="text-[10px] text-navy-900/90">
                    Direct Contact: {UNIVERSITY_INFO.phone}
                  </div>
                </div>
                <div className="w-12 h-12 bg-white p-1 rounded-xl shadow-inner flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-navy-950" />
                </div>
              </div>
            </aside>

            {/* RIGHT MAIN CONTENT AREA */}
            <main className="lg:col-span-8 xl:col-span-9 bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-slate-200/80 min-h-[600px]">
              
              {/* TAB 1: Mandatory Disclosure */}
              {activeTab === 'mandatory-disclosure' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Mandatory Disclosure
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      AICTE, UGC, and State Regulatory compliance disclosures.
                    </p>
                  </div>

                  {/* Will be updated soon Notice Box */}
                  <div className="p-8 sm:p-12 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-300 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
                      <FileText className="w-8 h-8 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-serif text-navy-950 mb-1">
                        Mandatory Disclosure
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto">
                        Regulatory documents and mandatory disclosures will be updated soon.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 text-gold-300 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      <span>Academic Session 2026–27</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Board of Studies */}
              {activeTab === 'board-of-studies' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Board of Studies
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Department-level statutory academic board composition and minutes.
                    </p>
                  </div>

                  {/* Will be updated soon Notice Box */}
                  <div className="p-8 sm:p-12 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-300 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
                      <BookOpen className="w-8 h-8 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-serif text-navy-950 mb-1">
                        Board of Studies (BOS)
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto">
                        Board of Studies composition, members and minutes will be updated soon.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 text-gold-300 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      <span>Curriculum Revision 2026</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Academic Calendars */}
              {activeTab === 'academic-calendars' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Academic Calendars (Academic Year 2026–27)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Schedules for instructional working days, mid examinations, semester practicals, and university semester-end exams.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { 
                        program: 'I B.Tech II Sem Academic Calendar 2026–27', 
                        sem: 'B.Tech - First Year Second Semester', 
                        date: 'Academic Year 2026–27', 
                        badge: 'PDF',
                        file: '/academic-calendar/btech-academic-calendar-2026-27.pdf',
                        downloadName: 'I-BTech-II-Sem-Academic-Calendar-2026-27.pdf'
                      },
                      { 
                        program: 'MBA & MCA Academic Calendar 2026–27', 
                        sem: 'School of Management & SCIS (MBA/MCA)', 
                        date: 'Academic Year 2026–27', 
                        badge: 'PDF',
                        file: '/academic-calendar/mba-mca-academic-calendar-2026-27.pdf',
                        downloadName: 'MBA-MCA-Academic-Calendar-2026-27.pdf'
                      },
                    ].map((cal, idx) => (
                      <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                        <div className="flex items-start gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-300 flex items-center justify-center flex-shrink-0 font-bold shadow">
                            <Calendar className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-sm md:text-base text-navy-950">{cal.program}</h4>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gold-100 text-gold-800 border border-gold-300/40">{cal.badge}</span>
                            </div>
                            <p className="text-xs text-slate-600">{cal.sem} • {cal.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 self-start sm:self-auto">
                          <a 
                            href={cal.file} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-200 text-navy-950 text-xs font-bold transition-colors border border-slate-300 shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-navy-900" />
                            <span>View PDF</span>
                          </a>
                          <a 
                            href={cal.file} 
                            download={cal.downloadName}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-300 text-xs font-bold transition-colors shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: NAAC Self Study Report */}
              {activeTab === 'naac-ssr' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      NAAC Self Study Report
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      National Assessment and Accreditation Council institutional Self Study Report portfolio.
                    </p>
                  </div>

                  {/* Will be updated soon Notice Box */}
                  <div className="p-8 sm:p-12 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-300 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
                      <Award className="w-8 h-8 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-serif text-navy-950 mb-1">
                        NAAC Self Study Report (SSR)
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto">
                        NAAC Self Study Report (SSR) will be updated soon.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 text-gold-300 text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                      <span>Quality Cell Review</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: Ranking and Accreditation */}
              {activeTab === 'ranking-accreditation' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Ranking and Accreditation
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      NAAC NBA, AICTE, NIRF & National Recognitions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">Coming Soon</span>
                        <Award className="w-5 h-5 text-amber-600" />
                      </div>
                      <h4 className="font-bold text-base text-navy-950">NAAC Accreditation</h4>
                      <p className="text-xs text-slate-600">NAAC Accreditation documents & details will be updated soon.</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Approved</span>
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <h4 className="font-bold text-base text-navy-950">AICTE & UGC Recognitions</h4>
                      <p className="text-xs text-slate-600">Approved by AICTE New Delhi and recognized under UGC Section 2(f) & 12(B).</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: IQAC */}
              {activeTab === 'iqac' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Internal Quality Assurance Cell (IQAC)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Internal Quality Assurance Cell & AQAR benchmarks.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h3 className="font-serif font-bold text-base text-navy-950">
                      IQAC Quality Charter & Vision
                    </h3>
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                      The Internal Quality Assurance Cell (IQAC) at RVS University is established to develop a system for conscious, consistent, and catalytic improvement in the overall performance of the institution.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 8: AQAR */}
              {activeTab === 'aqar' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Annual Quality Assurance Report (AQAR)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Annual quality reviews documented and submitted to NAAC.
                    </p>
                  </div>

                  {/* Will be updated soon Notice Box */}
                  <div className="p-8 sm:p-12 rounded-2xl bg-amber-50/70 border-2 border-dashed border-amber-300 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
                      <FileText className="w-8 h-8 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-serif text-navy-950 mb-1">
                        AQAR Reports
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto">
                        AQAR: will be updated soon.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900 text-gold-300 text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      <span>IQAC Quality Cell</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: Exam Section */}
              {activeTab === 'exam-section' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Exam Section
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Autonomous examination cell portals for results, schedules, and notifications.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                      href="#exam-portal"
                      className="p-5 rounded-2xl bg-[#FAF3E7] hover:bg-[#F5ECE0] group border-2 border-[#E5D3BD] hover:border-[#C6832B] transition-all text-center space-y-2 cursor-pointer shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#FFFDF9] group-hover:bg-[#C6832B] text-[#9C6019] group-hover:text-white border border-[#D4BC9F] flex items-center justify-center mx-auto transition-colors font-bold">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-sm text-[#1D1611] group-hover:text-[#9C6019] transition-colors">
                        1. Results
                      </h4>
                      <p className="text-xs text-[#5C4837] transition-colors">
                        Online semester examination results & grade cards
                      </p>
                    </a>

                    <a
                      href="#exam-schedules"
                      className="p-5 rounded-2xl bg-[#FAF3E7] hover:bg-[#F5ECE0] group border-2 border-[#E5D3BD] hover:border-[#C6832B] transition-all text-center space-y-2 cursor-pointer shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#FFFDF9] group-hover:bg-[#C6832B] text-[#9C6019] group-hover:text-white border border-[#D4BC9F] flex items-center justify-center mx-auto transition-colors font-bold">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-sm text-[#1D1611] group-hover:text-[#9C6019] transition-colors">
                        2. Exam Schedules
                      </h4>
                      <p className="text-xs text-[#5C4837] transition-colors">
                        Mid-term & end-semester timetables
                      </p>
                    </a>

                    <a
                      href="#exam-notifications"
                      className="p-5 rounded-2xl bg-[#FAF3E7] hover:bg-[#F5ECE0] group border-2 border-[#E5D3BD] hover:border-[#C6832B] transition-all text-center space-y-2 cursor-pointer shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#FFFDF9] group-hover:bg-[#C6832B] text-[#9C6019] group-hover:text-white border border-[#D4BC9F] flex items-center justify-center mx-auto transition-colors font-bold">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-sm text-[#1D1611] group-hover:text-[#9C6019] transition-colors">
                        3. Exam Notifications
                      </h4>
                      <p className="text-xs text-[#5C4837] transition-colors">
                        Circulars, revaluation & exam fee dates
                      </p>
                    </a>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#D4BC9F] text-[#1D1611] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                    <div>
                      <h4 className="text-sm font-bold text-[#9C6019]">Launch Examination Portal</h4>
                      <p className="text-xs text-[#5C4837]">Access the full Controller of Examinations portal with hall ticket search.</p>
                    </div>
                    <a
                      href="#exam-portal"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B57321] via-[#C6832B] to-[#9C6019] hover:from-[#9C6019] hover:to-[#7E4B11] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
                    >
                      Open Exam Portal →
                    </a>
                  </div>
                </div>
              )}

            </main>
          </div>
        </div>
      </section>
    </div>
  );
};
