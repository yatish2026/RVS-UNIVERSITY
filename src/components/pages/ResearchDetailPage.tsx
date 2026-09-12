import React, { useEffect } from 'react';
import { 
  ArrowLeft, Compass, Target, FolderGit2, BookOpen, 
  Banknote, Crosshair, Sparkles, ShieldCheck, Clock, 
  Mail, Phone, MapPin, ExternalLink, Info, CheckCircle2, ChevronRight
} from 'lucide-react';
import { UNIVERSITY_INFO } from '../../data/universityData';

export type ResearchTab = 
  | 'overview'
  | 'mission'
  | 'recent-projects'
  | 'academic-research'
  | 'funded-research'
  | 'thrust-area';

interface ResearchDetailPageProps {
  activeTab: ResearchTab;
  onBackToHome: () => void;
  onSelectTab: (tab: ResearchTab) => void;
}

export const ResearchDetailPage: React.FC<ResearchDetailPageProps> = ({
  activeTab,
  onBackToHome,
  onSelectTab,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const menuItems: { id: ResearchTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'mission', label: 'Mission', icon: Target },
    { id: 'recent-projects', label: 'Recent Projects', icon: FolderGit2 },
    { id: 'academic-research', label: 'Academic Research', icon: BookOpen },
    { id: 'funded-research', label: 'Funded Research', icon: Banknote },
    { id: 'thrust-area', label: 'Thrust Area', icon: Crosshair },
  ];

  const tabContentMap: Record<ResearchTab, { title: string; subtitle: string; tag: string }> = {
    overview: {
      title: 'Directorate of Research — Overview',
      subtitle: 'Institutional framework driving frontier interdisciplinary inquiry, intellectual property creation, and academic research excellence at RVS University.',
      tag: 'Ecosystem & Governance',
    },
    mission: {
      title: 'Research Mission & Objectives',
      subtitle: 'Strategic roadmap to foster high-impact research, ethical inquiry, knowledge dissemination, and societal problem-solving.',
      tag: 'Vision & Charter',
    },
    'recent-projects': {
      title: 'Recent Projects',
      subtitle: 'Portfolio of ongoing and completed multidisciplinary research initiatives undertaken across academic schools and centers.',
      tag: 'Project Portfolio',
    },
    'academic-research': {
      title: 'Academic Research',
      subtitle: 'Ph.D. research programmes, doctoral scholar guidelines, research publications, and thesis evaluation protocols.',
      tag: 'Doctoral Studies & Publications',
    },
    'funded-research': {
      title: 'Funded Research',
      subtitle: 'Sponsored research grants, government funding agencies (DST, SERB, AICTE, UGC), and corporate industry-sponsored research projects.',
      tag: 'Sponsored Grants & Funding',
    },
    'thrust-area': {
      title: 'Thrust Area',
      subtitle: 'Priority research domains spanning artificial intelligence, advanced energy materials, healthcare diagnostics, semiconductors, and sustainable technologies.',
      tag: 'Frontier Focus Areas',
    },
  };

  const currentTabInfo = tabContentMap[activeTab] || tabContentMap.overview;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-navy-950">
      {/* Top Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#0A192F] via-[#102444] to-[#0A192F] text-white pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden border-b border-gold-500/20 shadow-xl">
        <div className="container-custom relative z-10 px-4 md:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Directorate of Research & Development</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Directorate of Research
            </h1>

            <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
              Fostering innovation, interdisciplinary discovery, sponsored research initiatives, and doctoral scholarly excellence across RVS University.
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
        </div>
      </div>

      {/* Main Two-Column Layout (Sidebar + Content Panel) */}
      <div className="container-custom px-4 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sidebar Navigation */}
          <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-lg p-5 sticky top-24">
            <div className="pb-4 mb-4 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Research Menu
              </span>
              <h3 className="font-serif text-lg font-bold text-navy-950">
                Directorate Sections
              </h3>
            </div>

            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const ItemIcon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-navy-950 to-navy-900 text-gold-300 font-bold shadow-md'
                        : 'text-slate-700 hover:text-navy-950 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ItemIcon className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-gold-400' : 'text-slate-400 opacity-60'}`} />
                  </button>
                );
              })}
            </nav>

            {/* Directorate Contact Widget */}
            <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-navy-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span>Office of Dean (R&D)</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Administrative Block, RVS University, Chittoor, AP.
              </p>
              <div className="pt-1 text-[11px] text-slate-500 space-y-1">
                <div>Email: <a href="mailto:research@rvsu.org" className="text-gold-700 font-medium hover:underline">research@rvsu.org</a></div>
                <div>Phone: <span className="font-medium text-navy-950">+91 9669660155</span></div>
              </div>
            </div>
          </aside>

          {/* Right Column: Tab Content Area */}
          <main className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-10">
            {/* Header for Current Section */}
            <div className="space-y-3 pb-6 border-b border-slate-200">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-gold-800 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                <Info className="w-3.5 h-3.5 text-gold-600" />
                <span>{currentTabInfo.tag}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
                {currentTabInfo.title}
              </h2>

              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {currentTabInfo.subtitle}
              </p>
            </div>

            {/* Official Update Notice Card */}
            <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50/40 border border-amber-200/70 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-700 shadow-sm">
                <Clock className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-navy-950">
                  Section Details Will Be Updated Soon
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Official data, documentation, and verified records for <strong className="text-navy-950">{menuItems.find(m => m.id === activeTab)?.label}</strong> are currently being consolidated by the Directorate of Research and will be published here shortly.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-500 font-medium shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified by Directorate of Research (RVS University)</span>
              </div>
            </div>

            {/* Additional Information / Quick Guidance */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <h4 className="font-bold text-navy-950 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-gold-600" />
                  <span>Research Enquiries & MoUs</span>
                </h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Faculty and industry partners interested in collaborative research proposals may submit inquiries directly to the Dean (R&D).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <h4 className="font-bold text-navy-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-600" />
                  <span>Ethics & Quality Standards</span>
                </h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  All ongoing institutional projects adhere to UGC, AICTE, and statutory ethical guidelines for scholarly inquiry.
                </p>
              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};
