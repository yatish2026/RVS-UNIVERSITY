import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Building, Award, CheckCircle2, 
  Users, BookOpen, FileText, FlaskConical, BookMarked, 
  ShieldCheck, Atom, GraduationCap, Briefcase, Calendar, 
  Phone, Mail, MapPin, Sparkles, Download, Clock, 
  ExternalLink, Target, Compass, ChevronRight, Check,
  Layers, Lightbulb, Trophy, Star, Printer, Eye, Search,
  X, FileCheck
} from 'lucide-react';
import { Button } from '../ui/Button';
import { DepartmentDetailData, DepartmentTab, SyllabusDownloadDoc, CIVIL_DEPARTMENT_DATA, getDepartmentData } from '../../data/departmentData';
import studentHoneycombImg from '../../assets/student-honeycomb-collage.png';
import civilDeptImg from '../../assets/dept/civil-dept1.webp';

interface DepartmentDetailPageProps {
  departmentId?: string;
  onBackToHome: () => void;
  onSelectDepartment?: (deptId: string) => void;
}

export const DepartmentDetailPage: React.FC<DepartmentDetailPageProps> = ({
  departmentId = 'civil',
  onBackToHome,
  onSelectDepartment,
}) => {
  const [activeTab, setActiveTab] = useState<DepartmentTab>('profile');
  const [activeFacultyTab, setActiveFacultyTab] = useState<'btech' | 'diploma' | 'mtech'>('btech');
  const [syllabusFilter, setSyllabusFilter] = useState<'all' | 'btech' | 'mtech'>('all');
  const [syllabusSearch, setSyllabusSearch] = useState<string>('');
  const [previewPdfDoc, setPreviewPdfDoc] = useState<SyllabusDownloadDoc | null>(null);
  const [activeSeminarYear, setActiveSeminarYear] = useState<'all' | '2023-2024' | '2022-2023'>('all');
  const [rndFilter, setRndFilter] = useState<'all' | 'Research' | 'Consultancy'>('all');
  const [rndSearch, setRndSearch] = useState<string>('');
  const [activePlacementYear, setActivePlacementYear] = useState<string>('2023-2024');

  const deptData: DepartmentDetailData = getDepartmentData(departmentId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, departmentId]);

  // Download / Print Syllabus Handler
  const handlePrintSyllabus = () => {
    window.print();
  };

  const navMenuItems: { id: DepartmentTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'profile', label: 'Department Profile', icon: Building },
    { id: 'vision-mission', label: 'Vision & Mission', icon: Target },
    { id: 'outcomes', label: 'POs, PSOs & PEOs', icon: Award },
    { id: 'faculty', label: 'Faculty & Staff', icon: Users },
    { id: 'publications', label: 'Faculty Publications', icon: BookOpen },
    { id: 'seminars', label: 'Seminar & Workshop', icon: PresentationIcon },
    { id: 'laboratories', label: 'Laboratories', icon: FlaskConical },
    { id: 'syllabus', label: 'Syllabus', icon: BookMarked },
    { id: 'association', label: 'Dept Association', icon: ShieldCheck },
    { id: 'rnd', label: 'R & D Activities', icon: Atom },
    { id: 'student-corner', label: 'Student’s Corner', icon: GraduationCap },
    { id: 'placement', label: 'Placement & Training', icon: Briefcase },
    { id: 'events', label: 'Latest Events', icon: Calendar },
    { id: 'ceda', label: deptData.association.acronym || 'Student Council', icon: FlagIcon },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  function PresentationIcon({ className }: { className?: string }) {
    return <Sparkles className={className} />;
  }

  function FlagIcon({ className }: { className?: string }) {
    return <ShieldCheck className={className} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-navy-950">
      
      {/* 1. Top Department Header Banner */}
      <div className="relative bg-gradient-to-br from-[#0A192F] via-[#102444] to-[#0A192F] text-white pt-28 md:pt-32 pb-12 overflow-hidden border-b border-gold-500/20 shadow-xl">
        <div className="container-custom relative z-10 px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              {/* Breadcrumb Strip */}
              <div className="flex items-center gap-2 text-xs font-semibold text-gold-300/90 flex-wrap">
                <button onClick={onBackToHome} className="hover:underline flex items-center gap-1">
                  Home
                </button>
                <span>&gt;</span>
                <span className="text-slate-300">{deptData.schoolName}</span>
                <span>&gt;</span>
                <span className="text-gold-400 font-bold">{deptData.shortName}</span>
              </div>

              {/* Department Title */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {deptData.name}
              </h1>

              {/* NBA Accreditation Tag */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-gold-400" />
                  <span>{deptData.profile.nbaAccreditation}</span>
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  Autonomous &bull; Permanent Affiliation &bull; AICTE Approved
                </span>
              </div>
            </div>

            {/* Top Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="gold"
                size="md"
                onClick={() => setActiveTab('syllabus')}
                icon={<Download className="w-4 h-4" />}
              >
                Download Syllabus ({deptData.syllabusDownloads?.length || 6} PDFs)
              </Button>
              <Button
                variant="ghost-white"
                size="md"
                onClick={onBackToHome}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Return to Home
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Layout (Sidebar Navigation + Dynamic Content Area) */}
      <div className="container-custom px-4 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT SIDEBAR NAVIGATION (Matching Reference Screenshot Design) */}
          {/* ========================================================================= */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
            
            {/* Sidebar Navigation Card */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xl space-y-1.5">
              <div className="px-3 py-2 border-b border-slate-100 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700 block font-mono">
                  Department Navigation
                </span>
                <span className="text-xs font-serif font-bold text-navy-950">
                  {deptData.shortName} Directory
                </span>
              </div>

              {navMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center justify-between group ${
                      isActive
                        ? 'bg-[#2D3E50] text-white font-bold shadow-md'
                        : 'bg-[#F4F6F9] hover:bg-[#E9ECEF] text-slate-800 hover:text-navy-950 border border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-gold-300' : 'text-slate-500 group-hover:text-navy-950'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isActive ? 'text-gold-300 transform translate-x-0.5' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                  </button>
                );
              })}
            </div>

            {/* Head of Department (HOD) Fast-Contact Card */}
            <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-5 rounded-3xl border border-gold-400/30 shadow-xl space-y-3">
              <div className="flex items-center gap-3">
                {deptData.hod.image ? (
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-gold-400 shadow-md flex-shrink-0 bg-navy-900">
                    <img
                      src={deptData.hod.image}
                      alt={deptData.hod.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-gold-500 text-navy-950 flex items-center justify-center font-serif font-black text-lg shadow-md flex-shrink-0">
                    HOD
                  </div>
                )}
                <div>
                  <h4 className="font-serif font-bold text-sm text-white leading-tight">
                    {deptData.hod.name}
                  </h4>
                  <div className="text-[11px] text-gold-300 font-medium">
                    {deptData.hod.designation} &bull; {deptData.hod.qualification}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {deptData.hod.experience} Years Academic Experience
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-navy-800 text-[11px] space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <a href={`mailto:${deptData.hod.email}`} className="hover:underline truncate">{deptData.hod.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>{deptData.hod.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span className="truncate">{deptData.hod.room}</span>
                </div>
              </div>
            </div>

          </aside>


          {/* ========================================================================= */}
          {/* RIGHT MAIN CONTENT AREA */}
          {/* ========================================================================= */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* ----------------------------------------------------------------------- */}
            {/* TAB 1: DEPARTMENT PROFILE */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                {/* Department Feature Visual Banner */}
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 h-64 sm:h-72 md:h-80 bg-navy-950 group">
                  <img
                    src={deptData.bannerImage || civilDeptImg}
                    alt={deptData.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-300 font-mono">
                        {deptData.schoolName}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                        {deptData.name}
                      </h3>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40 backdrop-blur-md">
                      <Award className="w-3.5 h-3.5 text-gold-400" />
                      NBA Tier-I Accredited
                    </span>
                  </div>
                </div>

                {/* Profile Overview Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                        Institutional Overview
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-0.5">
                        Department Profile
                      </h2>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      NBA Tier-I Accredited
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                    {deptData.profile.overview}
                  </p>

                  {/* Objectives & Strengths Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
                    {/* Objectives */}
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <h3 className="font-serif font-bold text-base text-navy-950 flex items-center gap-2">
                        <Target className="w-4 h-4 text-gold-600" />
                        <span>Our Objectives</span>
                      </h3>
                      <ul className="space-y-2">
                        {deptData.profile.objectives.map((obj, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 flex-shrink-0" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Department Strengths */}
                    <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                      <h3 className="font-serif font-bold text-base text-navy-950 flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold-700" />
                        <span>Department Strength</span>
                      </h3>
                      <ul className="space-y-2">
                        {deptData.profile.strengths.map((str, idx) => (
                          <li key={idx} className="text-xs text-slate-800 flex items-start gap-2 font-medium leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Courses Offered Table Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                      Approved Academic Seats
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                      Courses Offered & Intake Distribution
                    </h3>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-navy-950 text-gold-300 text-xs uppercase tracking-wider font-semibold">
                          <th className="py-4 px-6">Level</th>
                          <th className="py-4 px-6">Course</th>
                          <th className="py-4 px-6 text-center bg-gold-600 text-navy-950 font-bold">Total Intake</th>
                          <th className="py-4 px-6 text-center">Convenor Quota (70%)</th>
                          <th className="py-4 px-6 text-center">B Category (30%)</th>
                          <th className="py-4 px-6 text-center">PIO (15%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                        {deptData.profile.coursesOffered.map((c, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-amber-50/40' : 'bg-slate-50/70 hover:bg-amber-50/40'}>
                            <td className="py-3.5 px-6 font-semibold text-navy-950">{c.level}</td>
                            <td className="py-3.5 px-6 font-bold text-slate-800">{c.course}</td>
                            <td className="py-3.5 px-6 text-center font-black text-gold-900 bg-amber-50/80">{c.intake}</td>
                            <td className="py-3.5 px-6 text-center font-medium text-slate-600">{c.convenorQuota ?? '-'}</td>
                            <td className="py-3.5 px-6 text-center font-medium text-slate-600">{c.bCategory ?? '-'}</td>
                            <td className="py-3.5 px-6 text-center font-medium text-slate-600">{c.pio ?? '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 2: VISION & MISSION */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'vision-mission' && (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
                  
                  {/* Vision Box */}
                  <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/50 border-l-4 border-gold-500 border-y border-r border-amber-200 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🎯</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
                        Department Vision
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal italic">
                      &ldquo;{deptData.visionMission.vision}&rdquo;
                    </p>
                  </div>

                  {/* Mission Box */}
                  <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/40 border-l-4 border-navy-900 border-y border-r border-blue-200 space-y-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🚀</span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
                        Department Mission
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal italic">
                      &ldquo;{deptData.visionMission.mission}&rdquo;
                    </p>
                  </div>

                  {/* Articulation */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="font-serif font-bold text-base text-navy-950 flex items-center gap-2">
                      <span>📝</span>
                      <span>Vision & Mission Articulation</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {deptData.visionMission.articulation}
                    </p>
                  </div>

                  {/* Key Objectives & Commitment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                      <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-gold-800">
                        Key Pillars
                      </h4>
                      <ul className="space-y-2">
                        {deptData.visionMission.keyObjectives.map((item, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                            <Check className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                      <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-gold-800">
                        Our Commitment
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {deptData.visionMission.commitment}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 3: POs, PSOs & PEOs */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'outcomes' && (
              <div className="space-y-8">
                
                {/* PEOs Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                      Educational Objectives
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                      Program Educational Objectives (PEO) of {deptData.shortName}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {deptData.outcomes.peos.map((peo) => (
                      <div key={peo.code} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                        <span className="px-3 py-1 rounded-lg bg-navy-950 text-gold-300 font-mono font-bold text-xs flex-shrink-0">
                          {peo.code}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          {peo.objective}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PSOs Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                      Discipline Specific Competencies
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                      Program Specific Outcomes (PSO) of {deptData.shortName}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {deptData.outcomes.psos.map((pso) => (
                      <div key={pso.code} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-4">
                        <span className="px-3 py-1 rounded-lg bg-gold-600 text-navy-950 font-mono font-bold text-xs flex-shrink-0 shadow-sm">
                          {pso.code}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                          {pso.outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* POs Section (PO-1 to PO-12) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                      Graduate Attributes (NBA / Washington Accord)
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                      Program Outcomes (PO-1 to PO-12)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {deptData.outcomes.pos.map((po) => (
                      <div key={po.code} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-gold-400 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-navy-950 text-gold-300 font-mono font-bold text-[11px]">
                            {po.code}
                          </span>
                          <h4 className="font-bold text-xs text-navy-950">{po.title}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {po.outcome}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 4: FACULTY & STAFF */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'faculty' && (
              <div className="space-y-6">
                
                {/* Faculty Sub-Tab Bar */}
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 w-fit">
                  <button
                    onClick={() => setActiveFacultyTab('btech')}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                      activeFacultyTab === 'btech'
                        ? 'bg-navy-950 text-gold-300 shadow-md'
                        : 'text-slate-700 hover:text-navy-950'
                    }`}
                  >
                    B.Tech Faculty ({deptData.faculty.btech.length})
                  </button>
                  <button
                    onClick={() => setActiveFacultyTab('diploma')}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                      activeFacultyTab === 'diploma'
                        ? 'bg-navy-950 text-gold-300 shadow-md'
                        : 'text-slate-700 hover:text-navy-950'
                    }`}
                  >
                    Diploma Faculty ({deptData.faculty.diploma.length})
                  </button>
                  <button
                    onClick={() => setActiveFacultyTab('mtech')}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                      activeFacultyTab === 'mtech'
                        ? 'bg-navy-950 text-gold-300 shadow-md'
                        : 'text-slate-700 hover:text-navy-950'
                    }`}
                  >
                    M.Tech Faculty ({deptData.faculty.mtech.length})
                  </button>
                </div>

                {/* Faculty Table Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
                        {activeFacultyTab === 'btech' ? 'B.Tech Faculty Members' : activeFacultyTab === 'diploma' ? 'Diploma (DCE) Faculty Members' : 'M.Tech Structural Engineering Faculty'}
                      </h3>
                      <p className="text-xs text-slate-500">Qualified professors, associate professors, and research guides.</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-navy-950 text-gold-300 text-xs uppercase tracking-wider font-semibold">
                          <th className="py-3.5 px-4 text-center w-16">S.No</th>
                          <th className="py-3.5 px-6">Name of the Faculty</th>
                          <th className="py-3.5 px-6">Designation</th>
                          <th className="py-3.5 px-6 text-center">Qualification</th>
                          <th className="py-3.5 px-6 text-center">Experience (Years)</th>
                          <th className="py-3.5 px-6">Specialization / Domain</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-700">
                        {deptData.faculty[activeFacultyTab].map((f) => (
                          <tr key={f.sNo} className={f.sNo % 2 === 0 ? 'bg-white hover:bg-amber-50/40' : 'bg-slate-50/70 hover:bg-amber-50/40'}>
                            <td className="py-3 px-4 text-center font-mono font-bold text-slate-500">{f.sNo}</td>
                            <td className="py-3 px-6 font-bold text-navy-950 flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-slate-200 text-navy-950 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                                {f.name.replace('Dr. ', '').replace('Mr. ', '').replace('Ms. ', '').substring(0, 1)}
                              </div>
                              <span>{f.name}</span>
                            </td>
                            <td className="py-3 px-6 text-slate-700 font-medium">{f.designation}</td>
                            <td className="py-3 px-6 text-center font-mono font-bold text-gold-800">{f.qualification}</td>
                            <td className="py-3 px-6 text-center font-bold text-navy-950">{f.experience} Yrs</td>
                            <td className="py-3 px-6 text-slate-600 text-xs">{f.specialization || 'Civil Engineering'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 5: FACULTY PUBLICATIONS */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'publications' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                    Research & Scholarly Articles
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                    List of Faculty Publications
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Research papers published in Scopus, Web of Science, and international peer-reviewed journals.</p>
                </div>

                <div className="space-y-4">
                  {deptData.publications.map((pub) => (
                    <div key={pub.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-gold-400 hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-navy-950 text-gold-300">
                            {pub.academicYear}
                          </span>
                          <span className="text-xs font-bold text-gold-800">{pub.authors}</span>
                        </div>
                        <h4 className="font-serif font-bold text-sm sm:text-base text-navy-950 leading-snug">
                          {pub.title}
                        </h4>
                        <p className="text-xs text-slate-600">
                          <strong>Journal / Remarks:</strong> {pub.journalOrRemarks}
                        </p>
                      </div>

                      <a
                        href={pub.link || '#'}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gold-500 hover:text-navy-950 text-slate-800 font-bold text-xs border border-slate-200 transition-all shadow-sm whitespace-nowrap self-start md:self-auto"
                      >
                        <span>View Details</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 6: SEMINAR & WORKSHOP */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'seminars' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                      Knowledge Exchange & Industry Connect
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                      Seminars, Workshops & Faculty Development Programs (FDPs)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      National & international faculty development initiatives, technology masterclasses, and skill workshops.
                    </p>
                  </div>

                  {deptData.seminars && deptData.seminars.length > 0 && (
                    <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 w-fit">
                      <button
                        onClick={() => setActiveSeminarYear('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          activeSeminarYear === 'all'
                            ? 'bg-navy-950 text-gold-300 shadow-md'
                            : 'text-slate-700 hover:text-navy-950'
                        }`}
                      >
                        All ({deptData.seminars.length})
                      </button>
                      <button
                        onClick={() => setActiveSeminarYear('2023-2024')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          activeSeminarYear === '2023-2024'
                            ? 'bg-navy-950 text-gold-300 shadow-md'
                            : 'text-slate-700 hover:text-navy-950'
                        }`}
                      >
                        2023–2024
                      </button>
                      <button
                        onClick={() => setActiveSeminarYear('2022-2023')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          activeSeminarYear === '2022-2023'
                            ? 'bg-navy-950 text-gold-300 shadow-md'
                            : 'text-slate-700 hover:text-navy-950'
                        }`}
                      >
                        2022–2023
                      </button>
                    </div>
                  )}
                </div>

                {deptData.seminars && deptData.seminars.length > 0 ? (
                  <div className="space-y-4">
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-navy-950 text-gold-300 text-xs uppercase tracking-wider font-semibold">
                            <th className="py-3.5 px-4 text-center w-14">S.No</th>
                            <th className="py-3.5 px-5">Name of the Faculty</th>
                            <th className="py-3.5 px-6">Title of the Program</th>
                            <th className="py-3.5 px-6">Organization / Host Institution</th>
                            <th className="py-3.5 px-4 text-center">Dates</th>
                            <th className="py-3.5 px-3 text-center">Days</th>
                            <th className="py-3.5 px-4 text-center">Type</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                          {deptData.seminars
                            .filter(s => activeSeminarYear === 'all' || s.academicYear === activeSeminarYear)
                            .map((s, sIdx) => (
                              <tr key={sIdx} className={sIdx % 2 === 0 ? 'bg-white hover:bg-amber-50/40' : 'bg-slate-50/70 hover:bg-amber-50/40'}>
                                <td className="py-3 px-4 text-center font-mono font-bold text-slate-500">{s.sNo}</td>
                                <td className="py-3 px-5 font-bold text-navy-950 flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-slate-200 text-navy-950 flex items-center justify-center font-bold text-[9px] flex-shrink-0">
                                    {s.facultyName.replace('Dr. ', '').replace('Mr. ', '').substring(0, 1)}
                                  </div>
                                  <span>{s.facultyName}</span>
                                </td>
                                <td className="py-3 px-6 font-semibold text-slate-900">{s.title}</td>
                                <td className="py-3 px-6 text-slate-600">{s.organization}</td>
                                <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-600 whitespace-nowrap">{s.dates}</td>
                                <td className="py-3 px-3 text-center font-mono font-bold text-navy-950">{s.durationDays}</td>
                                <td className="py-3 px-4 text-center">
                                  <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-900 border border-gold-400/50 font-mono font-bold text-[10px]">
                                    {s.type}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: 'National Workshop on Building Information Modeling (BIM)', date: 'Recent', desc: 'Hands-on training for students and faculty on Autodesk Revit and Navisworks coordination.' },
                      { title: 'Industry Masterclass by L&T Chief Engineers', date: 'Recent', desc: 'Deep dive into precast concrete construction and quality management in mega highways.' },
                      { title: 'Hands-on Survey Camp using GPS & Total Station', date: 'Annual', desc: '1-week intensive topographical field mapping in mountain terrains for final year students.' },
                      { title: 'Seminar on Sustainable Concrete & Green Materials', date: 'Recent', desc: 'Exploring geopolymer concrete, fly-ash utilization, and carbon capture in masonry.' },
                    ].map((s, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-gold-400 transition-all">
                        <div className="flex items-center justify-between text-xs font-mono font-bold text-gold-700">
                          <span>Seminar / Workshop</span>
                          <span className="px-2 py-0.5 rounded bg-white border border-slate-200">{s.date}</span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-navy-950">{s.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 7: LABORATORIES */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'laboratories' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                    Experimental Infrastructure
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                    Specialized Department Laboratories
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Modern testing rigs, automated machines, and computing labs for practical learning and industry consultancy.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {deptData.laboratories.map((lab, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-gold-400 hover:shadow-xl transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded bg-navy-950 text-gold-300 font-mono font-bold text-[10px]">
                            Lab #{idx + 1}
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gold-600" />
                            {lab.location}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-base text-navy-950">
                          {lab.name}
                        </h4>

                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {lab.description}
                        </p>

                        <div className="pt-2">
                          <span className="text-[11px] font-bold text-gold-800 uppercase tracking-wider block mb-1.5">
                            Key Equipment & Software:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {lab.equipment.map((eq, eIdx) => (
                              <span key={eIdx} className="text-[11px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                                {eq}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 8: OFFICIAL SYLLABUS & CURRICULUM PDF DOWNLOAD REPOSITORY */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'syllabus' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-8">
                
                {/* 1. Header Banner Strip */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                        Official Academic Repository
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Direct PDF Downloads
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950 mt-1">
                      Syllabus & Academic Regulations
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
                      Download full official syllabus books and curriculum schemes for all autonomous regulations (R23, R20, R17, M.Tech) for {deptData.name}. All files are complete, unabridged official PDF documents.
                    </p>
                  </div>

                  {/* Quick Search */}
                  <div className="relative min-w-[260px] sm:min-w-[300px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search regulation, year, degree..."
                      value={syllabusSearch}
                      onChange={(e) => setSyllabusSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-all"
                    />
                    {syllabusSearch && (
                      <button
                        onClick={() => setSyllabusSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Filter Tabs Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 w-fit flex-wrap">
                    <button
                      onClick={() => setSyllabusFilter('all')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        syllabusFilter === 'all'
                          ? 'bg-navy-950 text-gold-300 shadow-md'
                          : 'text-slate-700 hover:text-navy-950'
                      }`}
                    >
                      All Official Syllabi ({(deptData.syllabusDownloads || []).length})
                    </button>
                    <button
                      onClick={() => setSyllabusFilter('btech')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        syllabusFilter === 'btech'
                          ? 'bg-navy-950 text-gold-300 shadow-md'
                          : 'text-slate-700 hover:text-navy-950'
                      }`}
                    >
                      B.Tech Under Graduate
                    </button>
                    <button
                      onClick={() => setSyllabusFilter('mtech')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        syllabusFilter === 'mtech'
                          ? 'bg-navy-950 text-gold-300 shadow-md'
                          : 'text-slate-700 hover:text-navy-950'
                      }`}
                    >
                      M.Tech Post Graduate
                    </button>
                  </div>

                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-gold-600" />
                    <span>Approved by Academic Council & Board of Studies</span>
                  </span>
                </div>

                {/* 3. Official PDF Download Cards Grid */}
                {(() => {
                  const filteredDocs = (deptData.syllabusDownloads || []).filter(doc => {
                    const matchesCategory = 
                      syllabusFilter === 'all' ? true :
                      syllabusFilter === 'btech' ? (doc.level.toLowerCase().includes('b.tech') || doc.level.toLowerCase().includes('under graduate')) :
                      syllabusFilter === 'mtech' ? (doc.level.toLowerCase().includes('m.tech') || doc.level.toLowerCase().includes('post graduate')) :
                      true;
                    
                    const query = syllabusSearch.toLowerCase().trim();
                    const matchesSearch = !query || 
                      doc.title.toLowerCase().includes(query) || 
                      doc.regulation.toLowerCase().includes(query) ||
                      (doc.description && doc.description.toLowerCase().includes(query)) ||
                      doc.level.toLowerCase().includes(query);

                    return matchesCategory && matchesSearch;
                  });

                  if (filteredDocs.length === 0) {
                    return (
                      <div className="text-center py-12 px-4 rounded-3xl bg-slate-50 border border-dashed border-slate-200 space-y-3">
                        <BookMarked className="w-10 h-10 text-slate-400 mx-auto" />
                        <h4 className="font-serif text-lg font-bold text-navy-950">No syllabus documents found</h4>
                        <p className="text-xs text-slate-500">Try changing your search query or switching to &ldquo;All Official Syllabi&rdquo;.</p>
                        <Button variant="outline-navy" size="sm" onClick={() => { setSyllabusFilter('all'); setSyllabusSearch(''); }}>
                          Reset Filters
                        </Button>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredDocs.map((doc, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#FAFCFF] via-white to-amber-50/25 border-2 border-slate-200/90 hover:border-gold-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                        >
                          {/* Top Tag & Badge */}
                          <div className="space-y-3.5">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-navy-950 text-gold-300 font-mono font-bold text-xs shadow-sm">
                                <FileText className="w-3.5 h-3.5 text-gold-400" />
                                {doc.regulation}
                              </span>
                              {doc.badge && (
                                <span className="text-[11px] font-bold px-3 py-0.5 rounded-full bg-gold-500/20 text-gold-900 border border-gold-400/50">
                                  {doc.badge}
                                </span>
                              )}
                            </div>

                            {/* Document Title */}
                            <h4 className="font-serif font-extrabold text-lg sm:text-xl text-navy-950 group-hover:text-gold-700 transition-colors leading-snug">
                              {doc.title}
                            </h4>

                            {/* Description */}
                            {doc.description && (
                              <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                                {doc.description}
                              </p>
                            )}

                            {/* Metadata Pills */}
                            <div className="flex items-center gap-3 text-xs text-slate-600 font-medium pt-1">
                              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                                {doc.level}
                              </span>
                              <span>&bull;</span>
                              <span className="inline-flex items-center gap-1 font-mono font-bold text-slate-700">
                                <FileText className="w-3.5 h-3.5 text-rose-600" />
                                PDF Document ({doc.size})
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-6 mt-5 border-t border-slate-100 space-y-2.5">
                            <div className="flex items-center gap-3">
                              {/* Primary Download Button */}
                              <a
                                href={encodeURI(doc.fileUrl)}
                                download={doc.downloadFileName || `${doc.title}.pdf`}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-extrabold text-xs shadow-md hover:shadow-lg transition-all"
                              >
                                <Download className="w-4 h-4" />
                                <span>Download Full PDF ({doc.size})</span>
                              </a>

                              {/* Preview in In-page Modal */}
                              <button
                                onClick={() => setPreviewPdfDoc(doc)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-gold-300 font-bold text-xs shadow-sm hover:shadow-md transition-all"
                                title="Preview PDF in browser modal"
                              >
                                <Eye className="w-4 h-4" />
                                <span className="hidden sm:inline">Preview</span>
                              </button>

                              {/* Open in New Tab */}
                              <a
                                href={encodeURI(doc.fileUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-navy-950 font-bold text-xs transition-all border border-slate-200"
                                title="Open PDF in new tab"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* 4. Academic Council & BOS Notice Box */}
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2 font-bold text-navy-950 text-sm">
                    <ShieldCheck className="w-4 h-4 text-gold-600" />
                    <span>Academic Regulation & Syllabus Guidelines</span>
                  </div>
                  <p className="leading-relaxed">
                    All syllabus PDF documents published on this portal represent the authorized complete curriculum approved by the Department Board of Studies (BOS) and Academic Council of RVS University. Syllabi comply with AICTE model curriculum, NBA Tier-I outcome-based education (OBE) criteria, and NEP 2020 multi-disciplinary guidelines.
                  </p>
                  <p className="text-slate-500 italic">
                    For verification of previous batch archives or hardcopy transcripts, contact the Controller of Examinations (COE) or the HOD Office.
                  </p>
                </div>

              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* ----------------------------------------------------------------------- */}
            {/* TAB 9: DEPT ASSOCIATION */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'association' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                    Student Leadership & Professional Chapter
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                    {deptData.association.name} ({deptData.association.acronym})
                  </h3>
                  <p className="text-xs font-serif italic text-gold-800 mt-1">&ldquo;{deptData.association.tagline}&rdquo;</p>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {deptData.association.description}
                </p>

                {/* Committee Members Table */}
                {deptData.association.committeeMembers && deptData.association.committeeMembers.length > 0 && (
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                          Executive Leadership Team
                        </span>
                        <h4 className="font-serif font-bold text-lg text-navy-950 mt-0.5">
                          Committee Members of the Association
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl self-start sm:self-auto">
                        {deptData.association.committeeMembers.length} Elected Student Leaders
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-navy-950 text-white font-mono text-[11px] uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4 text-center w-14">#</th>
                            <th className="py-3 px-5">Designation</th>
                            <th className="py-3 px-5">Name of the Student</th>
                            <th className="py-3 px-4 font-mono">Roll Number</th>
                            <th className="py-3 px-5">Class / Year</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {deptData.association.committeeMembers.map((member, idx) => (
                            <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                              <td className="py-3 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                              <td className="py-3 px-5">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  member.designation === 'President'
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : member.designation === 'Vice President'
                                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                    : member.designation === 'Secretary'
                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                    : member.designation === 'Treasurer'
                                    ? 'bg-purple-100 text-purple-900 border border-purple-300'
                                    : 'bg-slate-100 text-slate-800 border border-slate-200'
                                }`}>
                                  {member.designation}
                                </span>
                              </td>
                              <td className="py-3 px-5 font-bold text-navy-950">{member.name}</td>
                              <td className="py-3 px-4 font-mono font-semibold text-gold-800">{member.rollNo}</td>
                              <td className="py-3 px-5 text-slate-700 font-medium">{member.className}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <h4 className="font-serif font-bold text-base text-navy-950">
                    Key Annual Association Activities:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {deptData.association.activities.map((act, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-700 font-medium">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 10: R & D ACTIVITIES */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'rnd' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                    Research & Industrial Consultancy
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                    R & D Activities & Sponsored Projects
                  </h3>
                </div>

                {/* If deptData.rnd.projects exists */}
                {deptData.rnd.projects && deptData.rnd.projects.length > 0 && (
                  <div className="space-y-6">
                    {/* KPI Stats Strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-navy-950 text-white border border-gold-500/30 text-center">
                        <div className="text-2xl font-extrabold text-gold-400">{deptData.rnd.projects.length}</div>
                        <div className="text-xs text-slate-300 font-medium mt-0.5">Total R&D Projects</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                        <div className="text-2xl font-extrabold text-amber-900">
                          {deptData.rnd.projects.filter(p => p.projectType === 'Research').length}
                        </div>
                        <div className="text-xs text-amber-800 font-medium mt-0.5">Research Grants</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                        <div className="text-2xl font-extrabold text-emerald-900">
                          {deptData.rnd.projects.filter(p => p.projectType === 'Consultancy').length}
                        </div>
                        <div className="text-xs text-emerald-800 font-medium mt-0.5">Industry Consultancy</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center">
                        <div className="text-2xl font-extrabold text-purple-900">
                          ₹{deptData.rnd.projects.reduce((acc, p) => acc + (parseFloat(String(p.amountLakhs)) || 0), 0).toFixed(2)} L
                        </div>
                        <div className="text-xs text-purple-800 font-medium mt-0.5">Total Sanctioned Value</div>
                      </div>
                    </div>

                    {/* Filter & Search Toolbar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => setRndFilter('all')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            rndFilter === 'all'
                              ? 'bg-navy-950 text-white shadow-sm'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          All Projects ({deptData.rnd.projects.length})
                        </button>
                        <button
                          onClick={() => setRndFilter('Research')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            rndFilter === 'Research'
                              ? 'bg-navy-950 text-white shadow-sm'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          Research ({deptData.rnd.projects.filter(p => p.projectType === 'Research').length})
                        </button>
                        <button
                          onClick={() => setRndFilter('Consultancy')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            rndFilter === 'Consultancy'
                              ? 'bg-navy-950 text-white shadow-sm'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          Consultancy ({deptData.rnd.projects.filter(p => p.projectType === 'Consultancy').length})
                        </button>
                      </div>

                      <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search faculty or project..."
                          value={rndSearch}
                          onChange={(e) => setRndSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white text-navy-950 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                        />
                      </div>
                    </div>

                    {/* Projects Table */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm max-h-[600px] overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-navy-950 text-white font-mono text-[11px] uppercase tracking-wider sticky top-0 z-10">
                          <tr>
                            <th className="py-3 px-3 text-center">#</th>
                            <th className="py-3 px-3 whitespace-nowrap">Faculty Investigator</th>
                            <th className="py-3 px-4">Project Title</th>
                            <th className="py-3 px-3 text-center">Type</th>
                            <th className="py-3 px-3 whitespace-nowrap">Funding Agency</th>
                            <th className="py-3 px-3 text-right whitespace-nowrap">Amount (₹ Lakhs)</th>
                            <th className="py-3 px-3 whitespace-nowrap">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {deptData.rnd.projects
                            .filter(p => rndFilter === 'all' || p.projectType === rndFilter)
                            .filter(p => !rndSearch || p.facultyName.toLowerCase().includes(rndSearch.toLowerCase()) || p.title.toLowerCase().includes(rndSearch.toLowerCase()) || p.fundingAgency.toLowerCase().includes(rndSearch.toLowerCase()))
                            .map((proj, idx) => (
                              <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                                <td className="py-3 px-3 text-center font-bold text-slate-400">{idx + 1}</td>
                                <td className="py-3 px-3 font-bold text-navy-950 whitespace-nowrap">{proj.facultyName}</td>
                                <td className="py-3 px-4 text-slate-700 font-medium leading-snug">{proj.title}</td>
                                <td className="py-3 px-3 text-center whitespace-nowrap">
                                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    proj.projectType === 'Consultancy'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                                  }`}>
                                    {proj.projectType}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">{proj.fundingAgency}</td>
                                <td className="py-3 px-3 text-right font-bold text-navy-950 whitespace-nowrap">₹{proj.amountLakhs} L</td>
                                <td className="py-3 px-3 text-slate-600 font-mono text-[11px] whitespace-nowrap">{proj.duration}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Consultancy Areas */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="font-serif font-bold text-base text-navy-950 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gold-600" />
                      <span>Industrial Testing & Consultancy</span>
                    </h4>
                    <ul className="space-y-2">
                      {deptData.rnd.consultancyAreas.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Thrust Research Areas */}
                  <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                    <h4 className="font-serif font-bold text-base text-navy-950 flex items-center gap-2">
                      <Atom className="w-4 h-4 text-gold-700" />
                      <span>Thrust Areas of Research</span>
                    </h4>
                    <ul className="space-y-2">
                      {deptData.rnd.thrustAreas.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-800 flex items-start gap-2 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* MoUs */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <h4 className="font-serif font-bold text-sm uppercase tracking-wider text-gold-800">
                    Institutional MoUs & Partnerships
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {deptData.rnd.mous.map((mou, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                        &bull; {mou}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 11: STUDENT'S CORNER */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'student-corner' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-8">
                {/* Visual Showcase Banner */}
                <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#0A192F] via-[#102444] to-[#0A192F] text-white border border-gold-400/30 shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40 text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                        <span>Student Development & Innovation</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                        Vibrant Student Life & Practical Labs
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                        Department students participate in specialized technical clubs, national symposiums, hackathons, and industry capstone internships. From hands-on workshop fabrications to graduation ceremonies, our students lead with excellence.
                      </p>
                    </div>

                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative group max-w-xs">
                        <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl -z-10 group-hover:scale-105 transition-transform duration-500" />
                        <img
                          src={studentHoneycombImg}
                          alt="RVS University Student Life & Technical Activities"
                          className="w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                    Student Activities & Development
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                    Student’s Corner Overview
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <h4 className="font-serif font-bold text-sm text-navy-950 flex items-center gap-2">
                      <Users className="w-4 h-4 text-gold-600" />
                      <span>Student Clubs</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {deptData.studentCorner.clubs.map((c, idx) => (
                        <li key={idx} className="text-xs text-slate-600 leading-tight">&bull; {c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <h4 className="font-serif font-bold text-sm text-navy-950 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-gold-600" />
                      <span>Student Accolades</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {deptData.studentCorner.achievements.map((a, idx) => (
                        <li key={idx} className="text-xs text-slate-600 leading-tight">&bull; {a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <h4 className="font-serif font-bold text-sm text-navy-950 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gold-600" />
                      <span>Internships Stints</span>
                    </h4>
                    <ul className="space-y-1.5">
                      {deptData.studentCorner.internships.map((i, idx) => (
                        <li key={idx} className="text-xs text-slate-600 leading-tight">&bull; {i}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* ----------------------------------------------------------------------- */}
            {/* TAB 12: PLACEMENT & TRAINING */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'placement' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                    Career Acceleration & Industry Placements
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                    Placement Records & Corporate Recruiters
                  </h3>
                </div>

                {/* If yearlyPlacements exists */}
                {deptData.placement.yearlyPlacements && deptData.placement.yearlyPlacements.length > 0 && (
                  <div className="space-y-6">
                    {/* 3-Year Placement Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {deptData.placement.yearlyPlacements.map((yearItem, idx) => {
                        const isSelected = (activePlacementYear || deptData.placement.yearlyPlacements![0].year) === yearItem.year;
                        return (
                          <div
                            key={idx}
                            onClick={() => setActivePlacementYear(yearItem.year)}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? 'bg-navy-950 text-white border-gold-400 shadow-lg scale-[1.02]'
                                : 'bg-slate-50 hover:bg-slate-100 text-navy-950 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                                isSelected ? 'text-gold-300' : 'text-slate-500'
                              }`}>
                                Academic Year
                              </span>
                              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                                isSelected
                                  ? 'bg-gold-500/20 text-gold-300 border border-gold-400/40'
                                  : 'bg-slate-200 text-slate-700'
                              }`}>
                                {yearItem.companies.length} Companies
                              </span>
                            </div>
                            <div className="text-xl font-serif font-extrabold mt-1">{yearItem.year}</div>
                            <div className="mt-3 pt-3 border-t border-slate-200/20 flex items-baseline justify-between">
                              <span className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                                Total Students Placed:
                              </span>
                              <span className={`text-2xl font-extrabold font-serif ${
                                isSelected ? 'text-gold-400' : 'text-emerald-700'
                              }`}>
                                {yearItem.totalPlaced}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Selected Year Company Table */}
                    {(() => {
                      const currentYearData = deptData.placement.yearlyPlacements.find(
                        y => y.year === activePlacementYear
                      ) || deptData.placement.yearlyPlacements[0];

                      return (
                        <div className="space-y-4 pt-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h4 className="font-serif font-bold text-base sm:text-lg text-navy-950 flex items-center gap-2">
                              <Briefcase className="w-5 h-5 text-gold-600" />
                              <span>Company-Wise Recruitment Breakdown &bull; {currentYearData.year}</span>
                            </h4>
                            <span className="text-xs font-mono font-bold text-gold-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl self-start sm:self-auto">
                              Total Placed: {currentYearData.totalPlaced} Students
                            </span>
                          </div>

                          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm max-h-[500px] overflow-y-auto">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-navy-950 text-white font-mono text-[11px] uppercase tracking-wider sticky top-0 z-10">
                                <tr>
                                  <th className="py-3 px-4 text-center w-16">Sl.No</th>
                                  <th className="py-3 px-6">Name of the Company</th>
                                  <th className="py-3 px-6 text-right">No. of Students Placed</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {currentYearData.companies.map((c, cIdx) => (
                                  <tr key={cIdx} className="hover:bg-amber-50/40 transition-colors">
                                    <td className="py-2.5 px-4 text-center font-bold text-slate-400">{c.sno || cIdx + 1}</td>
                                    <td className="py-2.5 px-6 font-bold text-navy-950">{c.name}</td>
                                    <td className="py-2.5 px-6 text-right font-extrabold text-gold-800 text-sm">{c.placedCount}</td>
                                  </tr>
                                ))}
                                <tr className="bg-slate-100 font-bold text-navy-950 sticky bottom-0 border-t-2 border-slate-300">
                                  <td colSpan={2} className="py-3 px-6 text-right uppercase tracking-wider font-mono text-xs">
                                    Total Placements for {currentYearData.year}:
                                  </td>
                                  <td className="py-3 px-6 text-right font-extrabold text-navy-950 text-base text-gold-800">
                                    {currentYearData.totalPlaced}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Highlights */}
                  <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                    <h4 className="font-serif font-bold text-base text-navy-950">
                      Placement Highlights
                    </h4>
                    <ul className="space-y-2">
                      {deptData.placement.highlights.map((h, idx) => (
                        <li key={idx} className="text-xs text-slate-800 flex items-start gap-2 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Top Recruiters */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="font-serif font-bold text-base text-navy-950">
                      Top Core & Infrastructure Recruiters
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {deptData.placement.topRecruiters.map((r, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-xl bg-white text-navy-950 border border-slate-200 text-xs font-bold shadow-sm">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 13: LATEST EVENTS */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'events' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                    Department Happenings
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                    Latest Events & Symposia
                  </h3>
                </div>

                <div className="space-y-4">
                  {deptData.events.map((ev, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-gold-800">
                          <span>{ev.type}</span>
                          <span>&bull;</span>
                          <span className="text-slate-500">{ev.date}</span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-navy-950">{ev.title}</h4>
                        <p className="text-xs text-slate-600 font-normal">{ev.description}</p>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-navy-950 self-start sm:self-auto whitespace-nowrap">
                        View Event
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 14: DEPARTMENT ASSOCIATION / STUDENT BODY */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'ceda' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-8">
                <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white border border-gold-400/40 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-300 font-mono">
                    Official Student Body
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                    {deptData.association?.name || `${deptData.shortName} Department Association`} ({deptData.association?.acronym || 'Association'})
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {deptData.association?.description || `${deptData.name} Student Association provides a platform for students to hone their professional, technical, and leadership abilities through events, contests, and peer mentoring.`}
                  </p>
                </div>

                {/* Committee Members Table */}
                {deptData.association.committeeMembers && deptData.association.committeeMembers.length > 0 && (
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                          Executive Leadership Team
                        </span>
                        <h4 className="font-serif font-bold text-lg text-navy-950 mt-0.5">
                          Committee Members of the Association
                        </h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl self-start sm:self-auto">
                        {deptData.association.committeeMembers.length} Elected Student Leaders
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-navy-950 text-white font-mono text-[11px] uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4 text-center w-14">#</th>
                            <th className="py-3 px-5">Designation</th>
                            <th className="py-3 px-5">Name of the Student</th>
                            <th className="py-3 px-4 font-mono">Roll Number</th>
                            <th className="py-3 px-5">Class / Year</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {deptData.association.committeeMembers.map((member, idx) => (
                            <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                              <td className="py-3 px-4 text-center font-bold text-slate-400">{idx + 1}</td>
                              <td className="py-3 px-5">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  member.designation === 'President'
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : member.designation === 'Vice President'
                                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                    : member.designation === 'Secretary'
                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                    : member.designation === 'Treasurer'
                                    ? 'bg-purple-100 text-purple-900 border border-purple-300'
                                    : 'bg-slate-100 text-slate-800 border border-slate-200'
                                }`}>
                                  {member.designation}
                                </span>
                              </td>
                              <td className="py-3 px-5 font-bold text-navy-950">{member.name}</td>
                              <td className="py-3 px-4 font-mono font-semibold text-gold-800">{member.rollNo}</td>
                              <td className="py-3 px-5 text-slate-700 font-medium">{member.className}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-base text-navy-950">
                    {deptData.association?.acronym || 'Association'} Flagship Initiatives & Activities:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(deptData.association?.activities || [
                      'Annual National Level Technical Symposium with 500+ participants',
                      'Technical Paper & Poster Presentation Contests',
                      'Hands-on Workshops on Industry Tools & Emerging Tech',
                      'Project Design Competitions and Model Exhibitions',
                    ]).map((act, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="space-y-1">
                          <h5 className="font-serif font-bold text-sm text-navy-950">Activity #{idx + 1}</h5>
                          <p className="text-xs text-slate-600 font-normal">{act}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------------------------- */}
            {/* TAB 15: CONTACT */}
            {/* ----------------------------------------------------------------------- */}
            {activeTab === 'contact' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-mono">
                    Department Communication Desk
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-navy-950 mt-0.5">
                    Contact {deptData.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <h4 className="font-serif font-bold text-base text-navy-950">HOD Office & Coordinates</h4>
                    <div className="space-y-3 text-xs md:text-sm text-slate-700">
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <span><strong>Head of Department:</strong> {deptData.contact.hodName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <span><strong>Office Room:</strong> {deptData.contact.officeLocation}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <span><strong>Email:</strong> <a href={`mailto:${deptData.contact.email}`} className="text-gold-700 hover:underline font-bold">{deptData.contact.email}</a></span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <span><strong>Phone:</strong> {deptData.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <span><strong>Office Hours:</strong> {deptData.contact.officeHours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-base text-navy-950 mb-2">Student Admissions & Counselling</h4>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        For undergraduate (B.Tech), diploma (DCE), and postgraduate (M.Tech) admissions in Civil Engineering, please reach out to our admission counselors.
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button
                        variant="gold"
                        size="md"
                        href="#admissions"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Apply for Admissions 2026–27
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* PDF Quick Preview Modal */}
      {previewPdfDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 bg-navy-950 text-white border-b border-gold-500/30">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-gold-500 text-navy-950 flex items-center justify-center flex-shrink-0 font-bold shadow-md">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-white truncate">
                    {previewPdfDoc.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gold-300/80 font-mono">
                    <span>{previewPdfDoc.regulation}</span>
                    <span>&bull;</span>
                    <span>{previewPdfDoc.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={encodeURI(previewPdfDoc.fileUrl)}
                  download={previewPdfDoc.downloadFileName || `${previewPdfDoc.title}.pdf`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs shadow-md transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a
                  href={encodeURI(previewPdfDoc.fileUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setPreviewPdfDoc(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white hover:text-gold-300 transition-all"
                  title="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal PDF Viewer Body */}
            <div className="flex-1 bg-slate-100 p-2 sm:p-4 overflow-hidden">
              <iframe
                src={encodeURI(previewPdfDoc.fileUrl)}
                className="w-full h-[62vh] sm:h-[70vh] rounded-2xl border border-slate-200 bg-white"
                title={previewPdfDoc.title}
              />
            </div>

            {/* Modal Footer Strip */}
            <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <span>
                Viewing official document for <strong>{deptData.shortName}</strong> ({previewPdfDoc.level}).
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={encodeURI(previewPdfDoc.fileUrl)}
                  download={previewPdfDoc.downloadFileName || `${previewPdfDoc.title}.pdf`}
                  className="text-xs font-bold text-gold-700 hover:text-gold-800 underline"
                >
                  Click here if PDF does not preview in your browser
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
