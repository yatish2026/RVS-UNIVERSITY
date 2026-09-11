import React, { useState, useEffect } from 'react';
import { 
  Globe2, GraduationCap, Building2, Phone, Mail, FileText, 
  Download, CheckCircle2, ChevronRight, Award, ShieldCheck, 
  Users, Sparkles, ArrowRight, ArrowLeft, Star, MapPin, 
  ExternalLink, Handshake, HeartHandshake, Compass, HelpCircle
} from 'lucide-react';
import { INTERNATIONAL_RELATIONS_DATA } from '../../data/internationalRelationsData';
import { Button } from '../ui/Button';

export type IRTab = 
  | 'overview'
  | 'admissions'
  | 'btech-eligibility'
  | 'pg-eligibility'
  | 'partner-universities'
  | 'testimonials'
  | 'contact';

interface InternationalRelationsPageProps {
  initialTab?: IRTab;
  onBackToHome: () => void;
}

export const InternationalRelationsPage: React.FC<InternationalRelationsPageProps> = ({
  initialTab = 'overview',
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<IRTab>(initialTab);
  const data = INTERNATIONAL_RELATIONS_DATA;

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Sidebar Menu Items matching the user screenshot exactly:
  const menuTabs: { id: IRTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'INTERNATIONAL RELATIONS', icon: Globe2 },
    { id: 'admissions', label: 'INTERNATIONAL ADMISSIONS', icon: FileText },
    { id: 'btech-eligibility', label: 'B.Tech ELIGIBILITY AND PROCEDURE', icon: GraduationCap },
    { id: 'pg-eligibility', label: 'M.Tech, MCA, MBA ELIGIBILITY AND PROCEDURE', icon: Award },
    { id: 'partner-universities', label: 'PARTNER UNIVERSITIES (MoUs)', icon: Handshake },
    { id: 'testimonials', label: 'Testimonials – IR', icon: Star },
    { id: 'contact', label: 'INTERNATIONAL RELATIONS CONTACT', icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 pt-28 md:pt-32 pb-20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Return */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
            <button 
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 font-bold text-gold-700 hover:text-gold-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <span className="text-slate-400">/</span>
            <span className="font-semibold text-navy-950">International Relations</span>
            <span className="text-slate-400">/</span>
            <span className="text-gold-700 font-bold uppercase tracking-wider text-xs">
              {menuTabs.find(t => t.id === activeTab)?.label}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-900 text-gold-300 text-xs font-bold shadow-sm">
            <Globe2 className="w-3.5 h-3.5 text-gold-400" />
            <span>300+ Scholars | 62+ Nations</span>
          </div>
        </div>

        {/* Hero Visual Showcase Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-500/30 mb-10 bg-navy-950">
          <div className="h-64 sm:h-80 md:h-96 w-full relative">
            <img 
              src={data.bannerImage} 
              alt="International Students at SVCET RVS University" 
              className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/20 backdrop-blur-md border border-gold-400/40 text-gold-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Global Academic Community</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              International Relations & Admissions
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-3xl font-light">
              Fostering global cultural exchange, world-class engineering education, and collaborative research with premier partner universities worldwide.
            </p>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {data.overview.stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-gold-400 transition-all group"
            >
              <div className="text-2xl sm:text-3xl font-black text-navy-950 group-hover:text-gold-700 transition-colors font-serif">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-navy-900 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid: Sidebar + Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Menu (Styled to match user's screenshot) */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-md">
              <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider px-3 py-2">
                International Relations Portal
              </h3>
              
              <div className="space-y-2 mt-1">
                {menuTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const TabIcon = tab.icon;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-gradient-to-r from-navy-950 to-navy-900 text-gold-300 shadow-lg border border-gold-500/40 translate-x-1'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-navy-950 border border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`text-base font-black ${isActive ? 'text-gold-400' : 'text-slate-600'}`}>
                          »
                        </span>
                        <span className="leading-snug">{tab.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? 'text-gold-400 translate-x-0.5' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact Widget in Sidebar */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-navy-950 to-slate-900 text-white shadow-xl border border-gold-500/30">
              <div className="flex items-center gap-2 text-gold-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Phone className="w-3.5 h-3.5" />
                <span>IR Helpdesk</span>
              </div>
              <h4 className="font-serif text-sm font-bold text-white mb-2">
                Need Assistance with International Admissions?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 font-light">
                Our International Students Affairs team assists with visas, transcript equivalencies, hostel reservations, and airport pickups.
              </p>
              <div className="space-y-2 text-xs">
                <a 
                  href="mailto:ir@svcetedu.org"
                  className="flex items-center gap-2 text-gold-300 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                  <span>ir@svcetedu.org</span>
                </a>
                <a 
                  href="tel:+917036661000"
                  className="flex items-center gap-2 text-gold-300 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>+91 70366 61000 / 77299 99151</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-slate-200 pb-5">
                  <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                    <Globe2 className="w-4 h-4" />
                    <span>Global Gateway</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-navy-950">
                    International Relations Overview
                  </h2>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
                  {data.overview.lead}
                </div>

                <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-normal">
                  {data.overview.description.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* About SVCET & Campus Life */}
                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <h3 className="font-serif text-xl font-bold text-navy-950">
                    About SVCET & Campus Life
                  </h3>
                  <div className="text-sm text-slate-600 leading-relaxed space-y-3 whitespace-pre-line">
                    {data.overview.aboutCampus}
                  </div>
                </div>

                {/* Next Tab Callout */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-navy-950 text-sm">Ready to begin your journey?</h4>
                    <p className="text-xs text-slate-600">Review international admission guidelines and eligibility criteria.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('admissions')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-950 hover:bg-gold-500 text-gold-300 hover:text-navy-950 font-bold text-xs transition-all shadow-md flex-shrink-0"
                  >
                    <span>View Admissions & How to Apply</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. ADMISSIONS TAB */}
            {activeTab === 'admissions' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-slate-200 pb-5">
                  <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                    <FileText className="w-4 h-4" />
                    <span>Admissions Portal</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-navy-950">
                    International Admissions & How to Apply
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* How to Apply Card */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                    <div className="flex items-center gap-2 text-navy-950 font-bold text-base">
                      <HelpCircle className="w-5 h-5 text-gold-600" />
                      <h4>How to Apply</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {data.admissions.howToApply}
                    </p>
                  </div>

                  {/* Who Can Apply Card */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                    <div className="flex items-center gap-2 text-navy-950 font-bold text-base">
                      <Users className="w-5 h-5 text-gold-600" />
                      <h4>Who Can Apply</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {data.admissions.whoCanApply}
                    </p>
                  </div>

                  {/* Visa Requirements Card */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                    <div className="flex items-center gap-2 text-navy-950 font-bold text-base">
                      <ShieldCheck className="w-5 h-5 text-gold-600" />
                      <h4>Visa Requirements</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {data.admissions.visaRequirements}
                    </p>
                  </div>

                  {/* Entry Requirements Card */}
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
                    <div className="flex items-center gap-2 text-navy-950 font-bold text-base">
                      <GraduationCap className="w-5 h-5 text-gold-600" />
                      <h4>Entry Requirements</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {data.admissions.entryRequirements}
                    </p>
                  </div>
                </div>

                {/* Application Forms Gateway */}
                <div className="pt-6 border-t border-slate-200 space-y-6">
                  <h3 className="font-serif text-xl font-bold text-navy-950">
                    Application Forms for Foreign Students
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* UG Box */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-navy-950 to-slate-900 text-white space-y-4 shadow-xl border border-gold-500/30">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase">
                          Undergraduate
                        </span>
                        <GraduationCap className="w-5 h-5 text-gold-400" />
                      </div>
                      <h4 className="font-serif text-lg font-bold">UG Application for Foreign Students</h4>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        For 4-Year B.Tech programs across 13 engineering disciplines.
                      </p>
                      <div className="space-y-2 pt-2">
                        {data.admissions.ugLinks.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                              link.type === 'online'
                                ? 'bg-gold-500 hover:bg-gold-400 text-navy-950 shadow-md'
                                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                            }`}
                          >
                            {link.type === 'download' ? <Download className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* PG Box */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-navy-950 to-slate-900 text-white space-y-4 shadow-xl border border-gold-500/30">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase">
                          Postgraduate
                        </span>
                        <Award className="w-5 h-5 text-gold-400" />
                      </div>
                      <h4 className="font-serif text-lg font-bold">PG Application for Foreign Students</h4>
                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        For 2-Year M.Tech, MBA, and MCA postgraduate degree programs.
                      </p>
                      <div className="space-y-2 pt-2">
                        {data.admissions.pgLinks.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                              link.type === 'online'
                                ? 'bg-gold-500 hover:bg-gold-400 text-navy-950 shadow-md'
                                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                            }`}
                          >
                            {link.type === 'download' ? <Download className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scholarship Info */}
                <div className="p-5 rounded-2xl bg-gold-50/80 border border-gold-200 space-y-2">
                  <h4 className="font-bold text-navy-950 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold-700" />
                    <span>International Student Scholarships</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {data.admissions.scholarshipInfo}
                  </p>
                </div>
              </div>
            )}

            {/* 3. B.TECH ELIGIBILITY TAB */}
            {activeTab === 'btech-eligibility' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-slate-200 pb-5">
                  <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>Undergraduate Programs</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-navy-950">
                    B.Tech ELIGIBILITY AND PROCEDURE
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {data.btechEligibility.note}
                  </p>
                </div>

                {/* Table of 13 B.Tech Courses */}
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-navy-950">
                    13 B.Tech Courses Offered to International Students
                  </h3>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-navy-950 text-white border-b border-slate-200">
                          <th className="py-3 px-3.5 font-bold w-12 text-center text-gold-300">S.No</th>
                          <th className="py-3 px-4 font-bold">Courses Offered</th>
                          <th className="py-3 px-3 font-bold w-24">Duration</th>
                          <th className="py-3 px-4 font-bold">Eligibility Criteria</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {data.btechEligibility.courses.map((c) => (
                          <tr key={c.sNo} className="hover:bg-amber-50/40 transition-colors">
                            <td className="py-3 px-3.5 font-bold text-center text-slate-700">{c.sNo}</td>
                            <td className="py-3 px-4 font-bold text-navy-950">{c.course}</td>
                            <td className="py-3 px-3 font-semibold text-slate-600">{c.duration}</td>
                            <td className="py-3 px-4 text-slate-700 leading-relaxed">{c.eligibility}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Eligibility and Procedure Checklist */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-gold-600" />
                    <span>Eligibility & Admission Procedure for B.Tech</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {data.btechEligibility.procedure.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-gold-600 flex-shrink-0 mt-1" />
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 4. PG (M.TECH, MCA, MBA) ELIGIBILITY TAB */}
            {activeTab === 'pg-eligibility' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-slate-200 pb-5">
                  <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                    <Award className="w-4 h-4" />
                    <span>Postgraduate Programs</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-navy-950">
                    M.Tech, MCA, MBA ELIGIBILITY AND PROCEDURE
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {data.pgEligibility.note}
                  </p>
                </div>

                {/* Table of 8 PG Courses */}
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-navy-950">
                    8 Postgraduate Courses Offered
                  </h3>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-navy-950 text-white border-b border-slate-200">
                          <th className="py-3 px-3.5 font-bold w-12 text-center text-gold-300">S.No</th>
                          <th className="py-3 px-4 font-bold">Course</th>
                          <th className="py-3 px-3 font-bold w-24">Duration</th>
                          <th className="py-3 px-4 font-bold">Eligible Qualification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {data.pgEligibility.courses.map((c) => (
                          <tr key={c.sNo} className="hover:bg-amber-50/40 transition-colors">
                            <td className="py-3 px-3.5 font-bold text-center text-slate-700">{c.sNo}</td>
                            <td className="py-3 px-4 font-bold text-navy-950">{c.course}</td>
                            <td className="py-3 px-3 font-semibold text-slate-600">{c.duration}</td>
                            <td className="py-3 px-4 text-slate-700 leading-relaxed">{c.eligibleQualification}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Essential Eligibility & Procedure */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h3 className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-gold-600" />
                    <span>Essential Eligibility & Procedure for PG Admissions</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {data.pgEligibility.procedure.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-gold-600 flex-shrink-0 mt-1" />
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 5. PARTNER UNIVERSITIES (MoUs) TAB */}
            {activeTab === 'partner-universities' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-slate-200 pb-5">
                  <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                    <Handshake className="w-4 h-4" />
                    <span>Global Bilateral MoUs</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-navy-950">
                    PARTNER UNIVERSITIES (MoUs)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    The International Relations office of SVCET with institutes and universities all over the world helps the students to explore diverse environments and various cultures across the world. The International Relations team helps the institute connect students and faculty with peers across many foreign institutions abroad.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.partnerUniversities.map((uni, uIdx) => (
                    <div 
                      key={uIdx}
                      className="p-5 rounded-2xl border border-slate-200 hover:border-gold-400 bg-white hover:bg-slate-50 transition-all shadow-sm group space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-navy-900 text-gold-300">
                          {uni.country}
                        </span>
                        <Globe2 className="w-4 h-4 text-gold-600" />
                      </div>
                      <h4 className="font-serif text-base font-bold text-navy-950 group-hover:text-gold-700 transition-colors">
                        {uni.name}
                      </h4>
                      {uni.city && (
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gold-600" />
                          <span>{uni.city}</span>
                        </p>
                      )}
                      <p className="text-xs text-slate-600 pt-1 border-t border-slate-100 leading-relaxed">
                        <strong className="text-slate-800">Focus:</strong> {uni.collaborationFocus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-slate-200 pb-5">
                  <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                    <Star className="w-4 h-4" />
                    <span>Global Student Voices</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-navy-950">
                    Testimonials – IR
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Hear directly from our international students from 62+ countries thriving at SVCET.
                  </p>
                </div>

                <div className="space-y-6">
                  {data.testimonials.map((t, idx) => (
                    <div 
                      key={idx}
                      className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-navy-950 text-gold-300 font-bold flex items-center justify-center font-serif text-base shadow-md">
                            {t.avatarText || 'IS'}
                          </div>
                          <div>
                            <h4 className="font-bold text-navy-950 text-base">{t.name}</h4>
                            <p className="text-xs text-slate-500">{t.program} • <span className="font-semibold text-gold-700">{t.country}</span></p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-gold-500">
                          {[...Array(5)].map((_, s) => (
                            <Star key={s} className="w-4 h-4 fill-current text-gold-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                        "{t.quote}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. CONTACT TAB */}
            {activeTab === 'contact' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="border-b border-slate-200 pb-5">
                  <div className="inline-flex items-center gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider mb-1">
                    <Phone className="w-4 h-4" />
                    <span>Official Directory</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-navy-950">
                    INTERNATIONAL RELATIONS CONTACT
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Contact officials for international admissions, visas, equivalency certificates, and academic collaborations.
                  </p>
                </div>

                {/* Table of Contacts */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-navy-950 text-white border-b border-slate-200">
                        <th className="py-3.5 px-4 font-bold">Name</th>
                        <th className="py-3.5 px-4 font-bold">Designation</th>
                        <th className="py-3.5 px-4 font-bold">Phone</th>
                        <th className="py-3.5 px-4 font-bold">Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {data.contacts.map((c, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-navy-950">{c.name}</td>
                          <td className="py-3.5 px-4 font-semibold text-slate-700">{c.designation}</td>
                          <td className="py-3.5 px-4 font-bold text-gold-800">
                            <a href={`tel:+91${c.phone}`} className="hover:underline flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-gold-600" />
                              <span>{c.phone}</span>
                            </a>
                          </td>
                          <td className="py-3.5 px-4 text-navy-900 font-medium">
                            <a href={`mailto:${c.email}`} className="hover:underline flex items-center gap-1.5 text-gold-800">
                              <Mail className="w-3.5 h-3.5 text-gold-600" />
                              <span>{c.email}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Office Info Card */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="font-serif text-base font-bold text-navy-950">
                    International Relations Office Location
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                    <span>
                      International Relations Cell, First Floor, Administrative Block, RVS University Campus, R.V.S. Nagar, Chittoor - 517127, Andhra Pradesh, India.
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Office Hours: Monday – Saturday: 9:00 AM – 5:00 PM (IST)
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
