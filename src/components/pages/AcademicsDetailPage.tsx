import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, ArrowRight, BookOpen, FileText, Calendar, Award, 
  CheckCircle2, Download, ExternalLink, Search, Star, Send, 
  QrCode, Library, UserCheck, ShieldCheck, Clock, Phone, Mail, 
  MapPin, Eye, ChevronRight, Sparkles, Building2, BookMarked,
  Cpu, Radio, FileSpreadsheet, Layers, Info, Filter
} from 'lucide-react';
import { Button } from '../ui/Button';
import { UNIVERSITY_INFO } from '../../data/universityData';
import { LIBRARY_DATA } from '../../data/libraryData';

export type AcademicTab = 
  | 'mandatory-disclosure'
  | 'board-of-studies'
  | 'academic-calendars'
  | 'naac-ssr'
  | 'aqar'
  | 'about-library'
  | 'librarians-desk'
  | 'library-rules'
  | 'library-resources'
  | 'library-rfid'
  | 'library-gallery'
  | 'library-publications'
  | 'library-services';

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
  const [pubSubTab, setPubSubTab] = useState<'international' | 'national'>('international');

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Sidebar Menu Items
  const sidebarItems: { id: AcademicTab; label: string; group?: string; badge?: string }[] = [
    { id: 'mandatory-disclosure', label: 'Mandatory Disclosure', group: 'Statutory & Compliance' },
    { id: 'board-of-studies', label: 'Board of Studies', group: 'Statutory & Compliance' },
    { id: 'academic-calendars', label: 'Academic Calendars', group: 'Statutory & Compliance', badge: '2026–27' },
    { id: 'naac-ssr', label: 'NAAC Self Study Report', group: 'Statutory & Compliance', badge: 'Grade A+' },
    { id: 'aqar', label: 'AQAR', group: 'Statutory & Compliance' },
    { id: 'about-library', label: 'About Central Library', group: 'Library Hub' },
    { id: 'librarians-desk', label: 'Librarian’s Desk', group: 'Library Hub' },
    { id: 'library-rules', label: 'Rules & Regulations', group: 'Library Hub' },
    { id: 'library-resources', label: 'Resources', group: 'Library Hub', badge: '85k+ Books' },
    { id: 'library-rfid', label: 'RFID Technology', group: 'Library Hub' },
    { id: 'library-gallery', label: 'Photo Gallery', group: 'Library Hub' },
    { id: 'library-publications', label: 'Publications', group: 'Library Hub' },
    { id: 'library-services', label: 'Services', group: 'Library Hub' },
  ];

  // Active Tab Metadata
  const tabMetadata: Record<AcademicTab, { title: string; subtitle: string; category: string }> = {
    'mandatory-disclosure': {
      title: 'Mandatory Disclosure',
      subtitle: 'Official AICTE, UGC, and State Regulatory compliance disclosures, institutional affiliations, and governance frameworks.',
      category: 'Statutory Compliance',
    },
    'board-of-studies': {
      title: 'Board of Studies (BOS)',
      subtitle: 'Department-wise BOS composition, academic curriculum design, course syllabi restructuring, and industry alignment.',
      category: 'Curricular Affairs',
    },
    'academic-calendars': {
      title: 'Academic Calendars (2026–27)',
      subtitle: 'Comprehensive schedules for instructional working days, mid-term examinations, laboratory evaluations, and semester breaks.',
      category: 'Academic Schedules',
    },
    'naac-ssr': {
      title: 'NAAC Self Study Report (SSR)',
      subtitle: 'National Assessment and Accreditation Council (NAAC) institutional SSR portfolio, quantitative metrics, and quality criteria.',
      category: 'Quality Assurance',
    },
    'aqar': {
      title: 'Annual Quality Assurance Report (AQAR)',
      subtitle: 'Year-wise internal quality benchmarks, IQAC initiatives, academic audits, and strategic enhancement reviews.',
      category: 'IQAC Cell',
    },
    'about-library': {
      title: 'About Central Digital Library',
      subtitle: 'Premier academic knowledge repository sprawling over 15,000 sq.ft with 85,000+ volumes, e-learning nodes, and multimedia center.',
      category: 'Library & Information Hub',
    },
    'librarians-desk': {
      title: 'Librarian’s Desk & Leadership',
      subtitle: 'Message from the Chief Librarian, Library Advisory Committee members, and modernization roadmap.',
      category: 'Library & Information Hub',
    },
    'library-rules': {
      title: 'Library Rules & Borrowing Regulations',
      subtitle: 'Membership guidelines, circulation policies, book bank rules, operating timings, and library code of conduct.',
      category: 'Library & Information Hub',
    },
    'library-resources': {
      title: 'Library Resources & E-Databases',
      subtitle: 'Access 85,000+ print volumes, IEEE Xplore, ScienceDirect, Springer, DELNET, and National Digital Library (NDL) subscriptions.',
      category: 'Library & Information Hub',
    },
    'library-rfid': {
      title: 'RFID Smart Automation & Kiosks',
      subtitle: 'Automated self-issue / return kiosks, RFID security gates, smart card reader integration, and Koha Open-Source LMS.',
      category: 'Library & Information Hub',
    },
    'library-gallery': {
      title: 'Central Library Photo Gallery',
      subtitle: 'Visual tour of reading halls, digital knowledge lab, reference sections, archival stacks, and multimedia study pods.',
      category: 'Library & Information Hub',
    },
    'library-publications': {
      title: 'Faculty & Scholar Publications Repository',
      subtitle: 'Institutional repository indexing research papers, international journals, patents, books, and conference proceedings.',
      category: 'Research & Publications',
    },
    'library-services': {
      title: 'Library Services & Student Facilities',
      subtitle: 'Book bank scheme for eligible scholars, plagiarism detection (Turnitin), inter-library loan, and reprographic services.',
      category: 'Library & Information Hub',
    },
  };

  const currentMeta = tabMetadata[activeTab] || tabMetadata['mandatory-disclosure'];

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-navy-950">
      {/* Top Breadcrumb & Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#0B192C] via-[#0E203C] to-[#0A192F] text-white py-12 lg:py-16 border-b border-gold-400/40 overflow-hidden">
        {/* Background glow & subtle patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom px-4 md:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-6 font-medium">
            <button 
              onClick={onBackToHome}
              className="hover:text-gold-300 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-gold-400" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-300">Academics</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-gold-300 font-semibold">{currentMeta.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>{currentMeta.category}</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                {currentMeta.title}
              </h1>
              <p className="text-sm md:text-base text-slate-200 font-light leading-relaxed">
                {currentMeta.subtitle}
              </p>
            </div>

            {/* Quick Status / Helpline Badge */}
            <div className="flex-shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-gold-400/30">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-amber-500 flex items-center justify-center text-navy-950 shadow-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-300 font-medium">Academic Affairs Cell</div>
                <div className="text-sm font-bold text-white">{UNIVERSITY_INFO.email}</div>
                <div className="text-[11px] text-gold-300 font-semibold">Toll Free: {UNIVERSITY_INFO.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout (Sidebar + Content) */}
      <section className="py-10 lg:py-16">
        <div className="container-custom px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR: Styled matching reference image with grey pill buttons & » arrows */}
            <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 space-y-4">
              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-lg border border-slate-200/80">
                <div className="pb-3 mb-3 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-navy-900 font-sans flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                    Academics Menu
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                    18 Sections
                  </span>
                </div>

                {/* Sidebar Navigation Buttons */}
                <nav className="space-y-1.5" aria-label="Academics Sidebar">
                  {sidebarItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectTab(item.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                          isActive
                            ? 'bg-gradient-to-r from-navy-900 via-navy-950 to-navy-900 text-gold-300 font-bold shadow-md border-l-4 border-gold-400 translate-x-1'
                            : 'bg-slate-100/80 hover:bg-slate-200/90 text-slate-800 hover:text-navy-950 border border-transparent hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {/* Chevron / Iconic » symbol matching user screenshot */}
                          <span className={`font-serif text-sm font-black transition-transform ${
                            isActive ? 'text-gold-400 translate-x-0.5' : 'text-slate-500 group-hover:text-navy-900'
                          }`}>
                            »
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.badge && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${
                            isActive 
                              ? 'bg-gold-500 text-navy-950 font-black' 
                              : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* QR Code / Quick Enquiry Card matching reference badge */}
              <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl p-4 text-navy-950 shadow-md border border-amber-300/80 flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-[11px] font-black uppercase tracking-wider text-navy-950/80 flex items-center gap-1">
                    <QrCode className="w-4 h-4 text-navy-950" />
                    Scan To Enquire
                  </div>
                  <div className="text-xs font-bold leading-snug">
                    RVS Academic & Verification Cell
                  </div>
                  <div className="text-[10px] text-navy-900/90">
                    Direct Whatsapp & Email Support
                  </div>
                </div>
                <div className="w-14 h-14 bg-white p-1.5 rounded-xl shadow-inner flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-full h-full text-navy-950" />
                </div>
              </div>
            </aside>

            {/* RIGHT MAIN CONTENT AREA: Dynamic per tab */}
            <main className="lg:col-span-8 xl:col-span-9 bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg border border-slate-200/80 min-h-[600px]">
              
              {/* TAB 1: Mandatory Disclosure */}
              {activeTab === 'mandatory-disclosure' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Mandatory Disclosure (AICTE & Regulatory Compliance)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      In compliance with All India Council for Technical Education (AICTE), New Delhi, and Government of Andhra Pradesh regulations.
                    </p>
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-medium">AICTE Permanent ID</div>
                      <div className="text-base font-bold text-navy-950">1-4128913</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-medium">NAAC Grade</div>
                      <div className="text-base font-bold text-emerald-700">Grade 'A+' (Cycle-2)</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-medium">UGC Recognition</div>
                      <div className="text-base font-bold text-navy-950">Section 2(f) & 12(B)</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="text-xs text-slate-500 font-medium">Campus Area</div>
                      <div className="text-base font-bold text-navy-950">65+ Acres</div>
                    </div>
                  </div>

                  {/* Regulatory Documents Download Table */}
                  <div>
                    <h3 className="text-base font-bold text-navy-900 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gold-600" />
                      Statutory Disclosures & Compliance Affidavits
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs md:text-sm text-slate-700">
                        <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                          <tr>
                            <th className="p-3">S.No</th>
                            <th className="p-3">Document Title</th>
                            <th className="p-3">Academic Session</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {[
                            { title: 'AICTE Extension of Approval (EOA) Letter', session: '2026–27', type: 'PDF' },
                            { title: 'Audited Financial Statements & Balance Sheets', session: '2024–25 & 2025–26', type: 'PDF' },
                            { title: 'Campus Land & Building Completion Certificate', session: 'Permanent', type: 'PDF' },
                            { title: 'Fire Safety & Environmental Clearance Certificate', session: 'Current Validity', type: 'PDF' },
                            { title: 'Anti-Ragging Committee & Squad Notification', session: '2026–27', type: 'PDF' },
                            { title: 'Internal Complaints Committee (ICC) & Gender Sensitization', session: '2026–27', type: 'PDF' },
                            { title: 'Grievance Redressal Committee for Students & Faculty', session: '2026–27', type: 'PDF' },
                            { title: 'SC/ST & OBC Welfare Committee Constitution', session: '2026–27', type: 'PDF' },
                          ].map((doc, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="p-3 font-semibold text-slate-500">{idx + 1}</td>
                              <td className="p-3 font-medium text-navy-950">{doc.title}</td>
                              <td className="p-3 text-slate-600">{doc.session}</td>
                              <td className="p-3 text-right">
                                <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-navy-900 hover:bg-navy-800 text-gold-300 text-xs font-bold transition-colors">
                                  <Download className="w-3.5 h-3.5" />
                                  <span>Download</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Board of Studies */}
              {activeTab === 'board-of-studies' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Board of Studies (BOS)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Department-level statutory academic committee responsible for framing curriculum, course structures, and evaluation schemes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { dept: 'Computer Science & Engineering', chair: 'HOD - CSE', members: '14 Experts (IIT/NIT/MNCs)', code: 'BOS-CSE' },
                      { dept: 'Artificial Intelligence & Data Science', chair: 'HOD - AI&DS', members: '12 Experts (Industry AI Leads)', code: 'BOS-AIDS' },
                      { dept: 'Electronics & Communication Eng.', chair: 'HOD - ECE', members: '11 Experts (ISRO/Cadence)', code: 'BOS-ECE' },
                      { dept: 'Electrical & Electronics Eng.', chair: 'HOD - EEE', members: '10 Experts (PowerGrid/EV)', code: 'BOS-EEE' },
                      { dept: 'Mechanical Engineering', chair: 'HOD - ME', members: '10 Experts (Automotive/Robotics)', code: 'BOS-ME' },
                      { dept: 'Civil Engineering', chair: 'HOD - CE', members: '9 Experts (L&T/Structural)', code: 'BOS-CE' },
                      { dept: 'Management Studies (MBA/BBA)', chair: 'Dean - SOMS', members: '12 Corporate Leaders', code: 'BOS-SOMS' },
                      { dept: 'Allied Health Sciences', chair: 'Dean - SAHS', members: '15 Senior Physicians & Clinicians', code: 'BOS-SAHS' },
                    ].map((b, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 hover:border-gold-400 bg-slate-50/50 hover:bg-slate-50 transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-navy-900 text-gold-300">{b.code}</span>
                          <span className="text-[11px] text-slate-500 font-semibold">Updated 2026</span>
                        </div>
                        <h4 className="font-bold text-sm text-navy-950 mb-1">{b.dept}</h4>
                        <p className="text-xs text-slate-600 mb-3">Chairperson: {b.chair} • {b.members}</p>
                        <button className="text-xs font-bold text-gold-700 hover:text-gold-900 inline-flex items-center gap-1">
                          <span>View Members & Minutes</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Academic Calendars */}
              {activeTab === 'academic-calendars' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Academic Calendars (Academic Year 2026–27)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Approved schedules for instructional working days, mid examinations, semester practicals, and university semester-end exams.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { program: 'B.Tech - I, II, III & IV Years (All Branches)', sem: 'Odd & Even Semesters 2026–27', date: 'Commencing July 2026', badge: 'Official Schedule' },
                      { program: 'M.Tech - I & II Years (SE, PEED, CAD/CAM, VLSI, CSE)', sem: 'Semester I to IV 2026–27', date: 'Commencing August 2026', badge: 'Postgraduate' },
                      { program: 'MBA & MCA Programs', sem: 'I, II, III & IV Semesters', date: 'Commencing August 2026', badge: 'Management & IT' },
                      { program: 'School of Allied Health Sciences (SAHS - 14 Degrees)', sem: 'Annual / Semester Clinical Batches', date: 'Commencing July 2026', badge: 'Clinical Schedule' },
                    ].map((cal, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-navy-900 text-gold-300 flex items-center justify-center flex-shrink-0 font-bold">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-sm text-navy-950">{cal.program}</h4>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gold-100 text-gold-800">{cal.badge}</span>
                            </div>
                            <p className="text-xs text-slate-600">{cal.sem} • {cal.date}</p>
                          </div>
                        </div>
                        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-300 text-xs font-bold transition-colors self-start sm:self-auto">
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: NAAC Self Study Report */}
              {activeTab === 'naac-ssr' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      NAAC Self Study Report (SSR) - Cycle 2
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Comprehensive Self Study Report and quantitative metrics submitted to National Assessment and Accreditation Council.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { num: 'Criterion 1', name: 'Curricular Aspects', score: 'Institutional curriculum design, feedback systems & academic flexibility' },
                      { num: 'Criterion 2', name: 'Teaching-Learning and Evaluation', score: 'Student enrollment, student-faculty ratio, teaching innovations & exam reforms' },
                      { num: 'Criterion 3', name: 'Research, Innovations and Extension', score: 'Funded projects, patents, seed money grants & community outreach' },
                      { num: 'Criterion 4', name: 'Infrastructure and Learning Resources', score: 'Smart classrooms, 50+ specialized labs, 65-acre campus & digital library' },
                      { num: 'Criterion 5', name: 'Student Support and Progression', score: 'Scholarships, placements, career counseling & student technical societies' },
                      { num: 'Criterion 6', name: 'Governance, Leadership and Management', score: 'E-governance, faculty welfare, internal audit & strategic development plans' },
                      { num: 'Criterion 7', name: 'Institutional Values and Best Practices', score: 'Green energy, water conservation, inclusive environment & distinctive best practices' },
                    ].map((crit, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all">
                        <div className="text-xs font-bold text-gold-700 uppercase tracking-wide mb-1">{crit.num}</div>
                        <h4 className="font-bold text-sm text-navy-950 mb-1.5">{crit.name}</h4>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">{crit.score}</p>
                        <button className="text-xs font-bold text-navy-900 hover:text-gold-700 inline-flex items-center gap-1">
                          <Download className="w-3.5 h-3.5 text-gold-600" />
                          <span>Download Criterion PDF</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: AQAR */}
              {activeTab === 'aqar' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Annual Quality Assurance Report (AQAR)
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Annual quality reviews documented and submitted by the Internal Quality Assurance Cell (IQAC).
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { year: 'AQAR 2025–26', status: 'Submitted & Approved', date: 'Published June 2026' },
                      { year: 'AQAR 2024–25', status: 'Submitted & Approved', date: 'Published May 2025' },
                      { year: 'AQAR 2023–24', status: 'Submitted & Approved', date: 'Published June 2024' },
                      { year: 'AQAR 2022–23', status: 'Submitted & Approved', date: 'Published May 2023' },
                      { year: 'AQAR 2021–22', status: 'Submitted & Approved', date: 'Published June 2022' },
                    ].map((aq, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-navy-950 mb-0.5">{aq.year}</h4>
                          <p className="text-xs text-slate-600">{aq.status} • {aq.date}</p>
                        </div>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 text-gold-300 text-xs font-bold hover:bg-navy-800 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Report</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: About Central Library */}
              {activeTab === 'about-library' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                      <Library className="w-4 h-4" />
                      <span>Knowledge Center</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      {LIBRARY_DATA.about.heading}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Heart, mind, and soul of the institution with over 73,747+ classified textbooks and reference books.
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {LIBRARY_DATA.about.stats.map((stat, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center hover:border-gold-400 transition-all">
                        <div className="text-xl sm:text-2xl font-black text-navy-950 font-serif">{stat.value}</div>
                        <div className="text-xs font-bold text-navy-900 mt-1">{stat.label}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Lead Callout */}
                  <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-slate-800 text-sm leading-relaxed font-medium">
                    {LIBRARY_DATA.about.lead}
                  </div>

                  {/* Description Paragraphs */}
                  <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
                    {LIBRARY_DATA.about.description.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 12: Librarian's Desk */}
              {activeTab === 'librarians-desk' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                      <BookOpen className="w-4 h-4" />
                      <span>Leadership Message</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Librarian’s Desk
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Message from the Assistant Librarian and Central Library Staff Directory.
                    </p>
                  </div>

                  {/* Librarian Profile Card */}
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      <div className="w-32 h-36 rounded-2xl overflow-hidden shadow-md border-2 border-gold-400/50 bg-white flex-shrink-0">
                        <img 
                          src={LIBRARY_DATA.librarianDesk.librarian.image} 
                          alt={LIBRARY_DATA.librarianDesk.librarian.name} 
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="space-y-1 text-center sm:text-left">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-navy-900 text-gold-300 inline-block mb-1">
                          Central Library Head
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold font-serif text-navy-950">
                          {LIBRARY_DATA.librarianDesk.librarian.name}
                        </h3>
                        <p className="text-xs font-semibold text-gold-800">
                          {LIBRARY_DATA.librarianDesk.librarian.designation}
                        </p>
                        <p className="text-xs text-slate-600">
                          {LIBRARY_DATA.librarianDesk.librarian.qualification} • <span className="font-semibold text-navy-900">{LIBRARY_DATA.librarianDesk.librarian.experience}</span>
                        </p>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="pt-4 border-t border-slate-200 space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {LIBRARY_DATA.librarianDesk.librarian.message}
                    </div>
                  </div>

                  {/* Central Library Staff Details Table */}
                  <div className="space-y-3 pt-2">
                    <h3 className="font-serif text-base font-bold text-navy-950">
                      CENTRAL LIBRARY STAFF DETAILS
                    </h3>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-navy-950 text-white border-b border-slate-200">
                            <th className="py-3 px-4 font-bold">Name</th>
                            <th className="py-3 px-4 font-bold">Qualification</th>
                            <th className="py-3 px-4 font-bold">Designation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {LIBRARY_DATA.librarianDesk.staffDetails.map((staff, idx) => (
                            <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                              <td className="py-3 px-4 font-bold text-navy-950">{staff.name}</td>
                              <td className="py-3 px-4 text-slate-700 font-medium">{staff.qualification}</td>
                              <td className="py-3 px-4 font-semibold text-gold-800">{staff.designation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 13: Library Rules */}
              {activeTab === 'library-rules' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Code of Conduct</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Library Rules & Regulations
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Code of conduct, RFID circulation guidelines, borrowing limits, and central library operating hours.
                    </p>
                  </div>

                  {/* General Rules List */}
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="font-serif text-base font-bold text-navy-950 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-gold-600" />
                      <span>General Rules & Guidelines</span>
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                      {LIBRARY_DATA.rulesAndRegulations.generalRules.map((rule, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200/80">
                          <span className="w-2 h-2 rounded-full bg-gold-600 flex-shrink-0 mt-1" />
                          <span className="leading-relaxed font-medium">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Circulation Policies */}
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                    <h3 className="font-serif text-base font-bold text-navy-950 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-gold-600" />
                      <span>CIRCULATION & RFID BOOK TRANSACTION RULES</span>
                    </h3>
                    <div className="space-y-2.5 text-xs text-slate-700">
                      {LIBRARY_DATA.rulesAndRegulations.circulation.map((circ, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{circ}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Borrowing Limits Table */}
                  <div className="space-y-3">
                    <h3 className="font-serif text-base font-bold text-navy-950">
                      BORROWING LIMITS
                    </h3>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-navy-950 text-white border-b border-slate-200">
                            <th className="py-3 px-4 font-bold">Category</th>
                            <th className="py-3 px-4 font-bold">Borrowing Limits</th>
                            <th className="py-3 px-4 font-bold">Loan Period</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {LIBRARY_DATA.rulesAndRegulations.borrowingLimits.map((b, idx) => (
                            <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                              <td className="py-3 px-4 font-bold text-navy-950">{b.category}</td>
                              <td className="py-3 px-4 font-bold text-gold-800">{b.limit}</td>
                              <td className="py-3 px-4 text-slate-600">{b.period}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Timings Table */}
                  <div className="space-y-3">
                    <h3 className="font-serif text-base font-bold text-navy-950">
                      CENTRAL LIBRARY TIMINGS
                    </h3>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-navy-950 text-white border-b border-slate-200">
                            <th className="py-3 px-4 font-bold">Day</th>
                            <th className="py-3 px-4 font-bold">Timings</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {LIBRARY_DATA.rulesAndRegulations.timings.map((t, idx) => (
                            <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                              <td className="py-3 px-4 font-bold text-navy-950">{t.day}</td>
                              <td className="py-3 px-4 font-bold text-gold-800">{t.hours}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}


              {/* TAB 14: Library Resources */}
              {activeTab === 'library-resources' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Library Resources & E-Databases
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Access top-tier international digital libraries, peer-reviewed journals, and indexing platforms.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: 'IEEE Xplore Digital Library', desc: 'Full-text access to IEEE transactions, journals, and conference proceedings', badge: 'E-Journals' },
                      { name: 'ScienceDirect (Elsevier)', desc: 'Comprehensive research database covering computing, materials, and engineering', badge: 'E-Database' },
                      { name: 'SpringerLink Journals', desc: 'Over 2,500+ peer-reviewed STEM and management journals', badge: 'E-Journals' },
                      { name: 'DELNET Database Network', desc: 'Inter-library union catalogue accessing 3 crore+ books and research documents', badge: 'Network' },
                      { name: 'National Digital Library (NDL)', desc: 'MHRD initiated digital repository of textbooks, audiobooks, and video lectures', badge: 'Govt Portal' },
                      { name: 'ASME & ASCE Journals', desc: 'Specialized international mechanical and civil engineering journals', badge: 'Core Engineering' },
                    ].map((res, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-navy-900 text-gold-300">{res.badge}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                        <h4 className="font-bold text-sm text-navy-950 mb-1">{res.name}</h4>
                        <p className="text-xs text-slate-600 mb-2">{res.desc}</p>
                        <button className="text-xs font-bold text-gold-700 hover:text-gold-900 inline-flex items-center gap-1">
                          <span>Access via Campus IP</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 15: RFID Technology */}
              {activeTab === 'library-rfid' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      RFID Technology & Automation
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Smart campus automation ensuring frictionless check-in, check-out, and real-time inventory tracking.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center mx-auto">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-sm text-navy-950">Self-Check Kiosks</h4>
                      <p className="text-xs text-slate-600">Instant book issuance and return within seconds using Smart ID Cards.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center mx-auto">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-sm text-navy-950">Security RFID Gates</h4>
                      <p className="text-xs text-slate-600">Multi-lane anti-theft security gates integrated with automated library alarms.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center mx-auto">
                        <Layers className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-sm text-navy-950">Koha Open LMS</h4>
                      <p className="text-xs text-slate-600">Web-based Online Public Access Catalog (OPAC) searchable from any device.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 16: Photo Gallery */}
              {activeTab === 'library-gallery' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Central Digital Library Photo Gallery
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Visual tour of central library reading halls, stack areas, multimedia labs, and quiet study rooms.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { title: 'Main Circulation Desk & Entry', desc: 'RFID automated security gates' },
                      { title: 'Central Reading Hall', desc: '500+ air-conditioned seating capacity' },
                      { title: 'Digital Knowledge Lab', desc: '60+ high-speed desktop terminals' },
                      { title: 'Stack & Periodical Area', desc: '85,000+ volumes sorted via Dewey Decimal' },
                      { title: 'Research Scholar Cubicles', desc: 'Dedicated quiet study bays for Ph.D. scholars' },
                      { title: 'E-Resource Access Section', desc: 'IEEE and ScienceDirect download desks' },
                    ].map((gal, idx) => (
                      <div key={idx} className="rounded-xl border border-slate-200 bg-slate-100 overflow-hidden group">
                        <div className="h-36 bg-navy-950 flex items-center justify-center text-gold-300 font-bold text-xs p-4 text-center">
                          <Library className="w-8 h-8 opacity-40 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="p-3 bg-white">
                          <h4 className="font-bold text-xs text-navy-950">{gal.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{gal.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 17: Publications */}
              {activeTab === 'library-publications' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                      <BookMarked className="w-4 h-4" />
                      <span>Research & Publications</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Library & LIS Research Publications
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Over 37 peer-reviewed International (17) and National (20) research papers published by library professionals.
                    </p>
                  </div>

                  {/* Toggle Sub-tabs: International vs National */}
                  <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200/80 w-fit">
                    <button
                      onClick={() => setPubSubTab('international')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        pubSubTab === 'international'
                          ? 'bg-navy-950 text-gold-300 shadow-md'
                          : 'text-slate-600 hover:text-navy-950'
                      }`}
                    >
                      International Publications ({LIBRARY_DATA.publications.international.length})
                    </button>
                    <button
                      onClick={() => setPubSubTab('national')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        pubSubTab === 'national'
                          ? 'bg-navy-950 text-gold-300 shadow-md'
                          : 'text-slate-600 hover:text-navy-950'
                      }`}
                    >
                      National Publications ({LIBRARY_DATA.publications.national.length})
                    </button>
                  </div>

                  {/* Publications List */}
                  <div className="space-y-3">
                    {(pubSubTab === 'international' 
                      ? LIBRARY_DATA.publications.international 
                      : LIBRARY_DATA.publications.national
                    ).map((pub) => (
                      <div 
                        key={pub.sNo} 
                        className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-gold-400 hover:shadow-sm transition-all space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-navy-900 text-gold-300">
                            #{pub.sNo} • {pub.year}
                          </span>
                          {pub.isbnOrIssn && (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {pub.isbnOrIssn}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-navy-950 leading-snug">
                          {pub.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {pub.citation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 18: Library Services */}
              {activeTab === 'library-services' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-slate-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold font-serif text-navy-950 mb-1">
                      Library Services & Student Facilities
                    </h2>
                    <p className="text-xs md:text-sm text-slate-600">
                      Comprehensive specialized services ensuring academic and research excellence for scholars and faculty.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: 'Book Bank Scheme', desc: 'Semester-long full textbook set provided to SC/ST, merit, and economically disadvantaged students.' },
                      { title: 'Plagiarism Detection Service', desc: 'Official Turnitin & Urkund similarity checking for research papers, dissertations, and project reports.' },
                      { title: 'Inter-Library Loan (ILL)', desc: 'Procurement of rare manuscripts, articles, and volumes via national DELNET partner libraries.' },
                      { title: 'Reprography & Printing', desc: 'High-speed digital printing, scanning, and photocopying facility at subsidized student rates.' },
                    ].map((serv, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                        <h4 className="font-bold text-sm text-navy-950 mb-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          {serv.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{serv.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Navigation & Contact Bar */}
              <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={onBackToHome}
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-navy-950 hover:text-gold-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to University Homepage</span>
                </button>
                <div className="text-xs text-slate-500 font-medium">
                  Have questions? Email <span className="font-bold text-navy-950">{UNIVERSITY_INFO.email}</span> or call <span className="font-bold text-navy-950">{UNIVERSITY_INFO.phone}</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};
