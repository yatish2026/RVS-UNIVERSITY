import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, FileText, Search, Download, Calendar, 
  Bell, CheckCircle2, Clock, ShieldCheck, AlertCircle, Sparkles, 
  GraduationCap, Printer, ExternalLink
} from 'lucide-react';
import { Button } from '../ui/Button';

export type ExamPortalTab = 
  | 'results' 
  | 'online-results' 
  | 'schedules' 
  | 'notifications';

interface ExamPortalPageProps {
  activeTab: ExamPortalTab;
  onBackToHome: () => void;
  onSelectTab: (tab: ExamPortalTab) => void;
}

export const ExamPortalPage: React.FC<ExamPortalPageProps> = ({
  activeTab,
  onBackToHome,
  onSelectTab,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const [hallTicket, setHallTicket] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('B.Tech IV Year I Semester Regular (R20)');
  const [searched, setSearched] = useState(false);

  const handleSearchResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (hallTicket.trim()) {
      setSearched(true);
    }
  };

  const notificationsList = [
    {
      title: 'B.Tech / M.Tech / MBA / MCA End-Semester Regular & Supplementary Examination Fee Circular - April/May 2026',
      date: 'Aug 28, 2026',
      type: 'Fee Circular',
      isNew: true,
    },
    {
      title: 'Diploma (Polytechnic) 2nd, 4th & 6th Semester Mid-Term Examination Timetable Released',
      date: 'Aug 24, 2026',
      type: 'Timetable',
      isNew: true,
    },
    {
      title: 'Revaluation & Recounting Notification for B.Tech III Year II Semester Regular Examinations (R20 Regulations)',
      date: 'Aug 18, 2026',
      type: 'Revaluation',
      isNew: false,
    },
    {
      title: 'School of Pharmaceutical Sciences (B.Pharm / Pharm.D) Annual Practical Examination Schedule',
      date: 'Aug 15, 2026',
      type: 'Practical Exam',
      isNew: false,
    },
    {
      title: 'Academic Regulations (R23 Autonomous Credit Framework) & Grading System Guidelines',
      date: 'Aug 10, 2026',
      type: 'Regulations',
      isNew: false,
    },
  ];

  const timetablesList = [
    { course: 'B.Tech (All Streams)', sem: 'IV Year II Semester (R20)', examDate: 'Starts 15 Oct 2026', type: 'End-Semester Theory' },
    { course: 'B.Tech (All Streams)', sem: 'III Year I Semester (R23)', examDate: 'Starts 20 Oct 2026', type: 'Regular & Supplementary' },
    { course: 'M.Tech / MBA / MCA', sem: 'II Year I Semester (R21)', examDate: 'Starts 28 Oct 2026', type: 'Mid-Term & Sem Exam' },
    { course: 'Diploma / Polytechnic', sem: '3rd & 5th Semester (C-20)', examDate: 'Starts 10 Nov 2026', type: 'Board Examinations' },
    { course: 'B.Pharm & Pharm.D', sem: 'Annual & Semester Exams', examDate: 'Starts 18 Nov 2026', type: 'PCI Scheme Exams' },
    { course: 'B.Sc Allied Health & BPT', sem: 'Semester Assessments', examDate: 'Starts 25 Nov 2026', type: 'Clinical & Theory' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-navy-950">
      {/* Top Hero Banner with Examination Cell Visual */}
      <div className="relative bg-gradient-to-br from-[#0A192F] via-[#102444] to-[#0A192F] text-white pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden border-b border-gold-500/20 shadow-xl">
        <div className="container-custom relative z-10 px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Info & Badges */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Controller of Examinations (Autonomous)</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                RVS University Examination Portal
              </h1>

              <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                Access online semester results, downloadable marks memos, official exam schedules, revaluation circulars, and autonomous evaluation rules.
              </p>

              <div className="pt-2">
                <button
                  onClick={onBackToHome}
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Homepage</span>
                </button>
              </div>
            </div>

            {/* Right: Visual Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-400/40 group bg-navy-950">
                <div className="h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-navy-950">
                  <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
                    alt="University Evaluation & Examination Center"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-xs font-bold text-white flex items-center justify-between">
                  <span className="text-gold-300 uppercase tracking-wider text-[11px] font-sans">
                    Autonomous Examination Cell
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-navy-950/80 text-slate-200 border border-gold-400/30">
                    Live Portal
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2.5 Sticky Switcher Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="container-custom px-4 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
            {[
              { id: 'results' as ExamPortalTab, label: 'Results & Grade Sheets', icon: FileText },
              { id: 'online-results' as ExamPortalTab, label: 'Instant Result Lookup', icon: Search },
              { id: 'schedules' as ExamPortalTab, label: 'Exam Schedules & Timetables', icon: Calendar },
              { id: 'notifications' as ExamPortalTab, label: 'Exam Notifications & Circulars', icon: Bell },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    window.location.hash = `exam-${tab.id}`;
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-navy-950 text-gold-300 font-black shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-navy-950 border border-slate-200'
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-gold-300' : 'text-gold-600'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Tab Body */}
      <div className="py-14 md:py-20 container-custom px-4 md:px-8">
        
        {/* ========================================================================= */}
        {/* TAB 1 & 2: RESULTS & ONLINE RESULTS LOOKUP */}
        {/* ========================================================================= */}
        {(activeTab === 'results' || activeTab === 'online-results') && (
          <div className="space-y-12">
            {/* Search Box Card */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950 max-w-4xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-8">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-gold-700 border border-amber-200 mx-auto flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 text-gold-600" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                  Online Semester Results Portal
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Enter your University Hall Ticket / Registration Number to view and print your provisional marks memo.
                </p>
              </div>

              <form onSubmit={handleSearchResult} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gold-800 mb-2">
                      Hall Ticket / Roll Number
                    </label>
                    <input
                      type="text"
                      value={hallTicket}
                      onChange={(e) => setHallTicket(e.target.value)}
                      placeholder="e.g. 23RVS1A0501"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 uppercase font-mono text-sm bg-slate-50 text-navy-950 placeholder-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gold-800 mb-2">
                      Select Examination Session
                    </label>
                    <select
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-xs sm:text-sm bg-slate-50 text-navy-950"
                    >
                      <option>B.Tech IV Year I Semester Regular (R20)</option>
                      <option>B.Tech III Year II Semester Regular & Supple (R20)</option>
                      <option>B.Tech II Year I Semester Regular (R23)</option>
                      <option>B.Tech I Year II Semester Regular (R23)</option>
                      <option>M.Tech / MBA / MCA II Semester Regular</option>
                      <option>Diploma in Engineering 4th & 6th Semesters</option>
                      <option>B.Pharm / Pharm.D Annual Examinations</option>
                      <option>School of Nursing & Allied Health Annual Exams</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <Button
                    variant="gold"
                    size="md"
                    className="w-full sm:w-auto px-8"
                    icon={<Search className="w-4 h-4" />}
                  >
                    Get Examination Result
                  </Button>
                </div>
              </form>

              {/* Mock Searched Result Memo */}
              {searched && (
                <div className="mt-10 pt-8 border-t border-slate-200 animate-fadeIn space-y-6">
                  <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between shadow-sm">
                    <div>
                      <span className="text-[11px] font-bold text-gold-800 uppercase tracking-wider block">
                        Result Status: PROVISIONAL PASS
                      </span>
                      <h4 className="font-serif text-lg font-bold text-navy-950 mt-0.5">
                        Candidate Roll No: {hallTicket.toUpperCase()}
                      </h4>
                      <span className="text-xs text-slate-600">
                        {selectedSemester} • SGPA: <strong className="text-gold-800 font-bold">8.85 / 10.00</strong>
                      </span>
                    </div>

                    <button 
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-black flex items-center gap-1.5 shadow-md transition-all"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Memo</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-navy-950 text-gold-300 uppercase tracking-wider font-semibold">
                        <tr>
                          <th className="py-3 px-4">Subject Code</th>
                          <th className="py-3 px-4">Subject Title</th>
                          <th className="py-3 px-4 text-center">Grade</th>
                          <th className="py-3 px-4 text-center">Credits</th>
                          <th className="py-3 px-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                        <tr className="bg-white hover:bg-amber-50/50">
                          <td className="py-3 px-4 font-mono text-gold-800 font-bold">20A05701T</td>
                          <td className="py-3 px-4 text-navy-950 font-semibold">Artificial Intelligence & Deep Learning</td>
                          <td className="py-3 px-4 text-center font-bold text-gold-800">A+</td>
                          <td className="py-3 px-4 text-center text-slate-600">3.0</td>
                          <td className="py-3 px-4 text-center text-emerald-600 font-bold">PASS</td>
                        </tr>
                        <tr className="bg-slate-50/70 hover:bg-amber-50/50">
                          <td className="py-3 px-4 font-mono text-gold-800 font-bold">20A05702T</td>
                          <td className="py-3 px-4 text-navy-950 font-semibold">Cloud Computing & Virtualization</td>
                          <td className="py-3 px-4 text-center font-bold text-gold-800">O (Outstanding)</td>
                          <td className="py-3 px-4 text-center text-slate-600">3.0</td>
                          <td className="py-3 px-4 text-center text-emerald-600 font-bold">PASS</td>
                        </tr>
                        <tr className="bg-white hover:bg-amber-50/50">
                          <td className="py-3 px-4 font-mono text-gold-800 font-bold">20A05703T</td>
                          <td className="py-3 px-4 text-navy-950 font-semibold">Cryptography & Network Security</td>
                          <td className="py-3 px-4 text-center font-bold text-gold-800">A</td>
                          <td className="py-3 px-4 text-center text-slate-600">3.0</td>
                          <td className="py-3 px-4 text-center text-emerald-600 font-bold">PASS</td>
                        </tr>
                        <tr className="bg-slate-50/70 hover:bg-amber-50/50">
                          <td className="py-3 px-4 font-mono text-gold-800 font-bold">20A05704P</td>
                          <td className="py-3 px-4 text-navy-950 font-semibold">AI & Machine Learning Laboratory</td>
                          <td className="py-3 px-4 text-center font-bold text-gold-800">O</td>
                          <td className="py-3 px-4 text-center text-slate-600">1.5</td>
                          <td className="py-3 px-4 text-center text-emerald-600 font-bold">PASS</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: EXAM SCHEDULES & TIMETABLES */}
        {/* ========================================================================= */}
        {activeTab === 'schedules' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-800 font-sans">
                  Official Timetables & Schedules
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-1">
                  Upcoming Semester Examination Schedules
                </h2>
              </div>

              <div className="space-y-3">
                {timetablesList.map((sched, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-gold-400 hover:shadow-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-gold-700 border border-amber-200 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-navy-950">{sched.course} — {sched.sem}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                          <span className="text-gold-800 font-semibold">{sched.type}</span>
                          <span>•</span>
                          <span className="text-slate-500">{sched.examDate}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href="#download-timetable"
                      className="px-4 py-2 rounded-xl bg-white hover:bg-gold-500 text-navy-950 group-hover:text-navy-950 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Timetable PDF</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: EXAM NOTIFICATIONS & CIRCULARS */}
        {/* ========================================================================= */}
        {activeTab === 'notifications' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-800 font-sans">
                  Official Notifications
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-1">
                  Examination Circulars & Notifications
                </h2>
              </div>

              <div className="space-y-4">
                {notificationsList.map((notif, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-gold-400 hover:shadow-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-navy-950 text-gold-300">
                          {notif.type}
                        </span>
                        {notif.isNew && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500 text-white uppercase tracking-wider animate-pulse">
                            NEW
                          </span>
                        )}
                        <span className="text-xs text-slate-500">
                          {notif.date}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-navy-950 hover:text-gold-700 transition-colors cursor-pointer">
                        {notif.title}
                      </h4>
                    </div>

                    <a
                      href="#download-circular"
                      className="px-4 py-2 rounded-xl bg-white hover:bg-gold-500 text-navy-950 font-bold text-xs border border-slate-200 transition-all flex items-center gap-1.5 shadow-sm flex-shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Circular</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
