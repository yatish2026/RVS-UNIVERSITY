import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowLeft, ArrowRight, Award, GraduationCap, Building2, 
  Users, FileText, CheckCircle2, ShieldCheck, Landmark, 
  Compass, BookOpen, Phone, Mail, MapPin, Home,
  Sparkles, Target, CheckCircle, ExternalLink, Globe, Layers, Download, Clock, X
} from 'lucide-react';
import { Button } from '../ui/Button';
import { UNIVERSITY_INFO } from '../../data/universityData';

// Reusable scroll-observer card that triggers dynamic entrance animations from both scroll directions
const LeadershipScrollCard: React.FC<{
  id?: string;
  className?: string;
  children: (isInView: boolean) => React.ReactNode;
}> = ({ id, className = '', children }) => {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const el = cardRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div id={id} ref={cardRef} className={className}>
      {children(isInView)}
    </div>
  );
};

export type AboutPageType = 
  | 'overview'
  | 'leadership'
  | 'governance'
  | 'administration'
  | 'ranking-accreditation'
  | 'iqac'
  | 'contact-us'
  // Leadership aliases
  | 'chancellor'
  | 'pro-chancellor'
  | 'vice-chancellor'
  | 'chairman' 
  | 'vice-chairman' 
  | 'principal' 
  // Governance aliases & side menu items
  | 'sponsoring-body'
  | 'governing-body' 
  | 'board-of-management'
  | 'academic-council' 
  | 'finance-committee'
  | 'finance'
  | 'planning-monitoring'
  | 'research-innovation'
  | 'board-of-examination'
  | 'board-of-studies'
  // Administration alias
  | 'admin-chart'
  // IQAC aliases & side menu items
  | 'about-iqac'
  | 'members-committee'
  | 'meeting-minutes'
  | 'annual-report'
  | 'naac-certificate'
  | 'aaa'
  | 'idp'
  | 'useful-links'
  | 'downloads';

interface AboutGovernancePageProps {
  pageType: AboutPageType;
  onBackToHome: () => void;
}

export const AboutGovernancePage: React.FC<AboutGovernancePageProps> = ({
  pageType,
  onBackToHome,
}) => {
  const [isChancellorModalOpen, setIsChancellorModalOpen] = useState(false);
  const [isProChancellorModalOpen, setIsProChancellorModalOpen] = useState(false);
  
  const [governanceSubTab, setGovernanceSubTab] = useState<
    | 'sponsoring-body'
    | 'governing-body'
    | 'board-of-management'
    | 'academic-council'
    | 'finance-committee'
    | 'planning-monitoring'
    | 'research-innovation'
    | 'board-of-examination'
    | 'board-of-studies'
  >('governing-body');

  const [iqacSubTab, setIqacSubTab] = useState<
    | 'about-iqac'
    | 'members-committee'
    | 'meeting-minutes'
    | 'annual-report'
    | 'naac-certificate'
    | 'aaa'
    | 'idp'
    | 'useful-links'
    | 'downloads'
  >('about-iqac');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageType]);

  // Sync sub-tabs from URL hash / pageType
  useEffect(() => {
    // Governance
    if (pageType === 'sponsoring-body') setGovernanceSubTab('sponsoring-body');
    if (pageType === 'governing-body') setGovernanceSubTab('governing-body');
    if (pageType === 'board-of-management') setGovernanceSubTab('board-of-management');
    if (pageType === 'academic-council') setGovernanceSubTab('academic-council');
    if (pageType === 'finance-committee' || pageType === 'finance') setGovernanceSubTab('finance-committee');
    if (pageType === 'planning-monitoring') setGovernanceSubTab('planning-monitoring');
    if (pageType === 'research-innovation') setGovernanceSubTab('research-innovation');
    if (pageType === 'board-of-examination') setGovernanceSubTab('board-of-examination');
    if (pageType === 'board-of-studies') setGovernanceSubTab('board-of-studies');

    // IQAC
    if (pageType === 'about-iqac') setIqacSubTab('about-iqac');
    if (pageType === 'members-committee') setIqacSubTab('members-committee');
    if (pageType === 'meeting-minutes') setIqacSubTab('meeting-minutes');
    if (pageType === 'annual-report') setIqacSubTab('annual-report');
    if (pageType === 'naac-certificate') setIqacSubTab('naac-certificate');
    if (pageType === 'aaa') setIqacSubTab('aaa');
    if (pageType === 'idp') setIqacSubTab('idp');
    if (pageType === 'useful-links') setIqacSubTab('useful-links');
    if (pageType === 'downloads') setIqacSubTab('downloads');
  }, [pageType]);

  // Normalize pageType to one of the 7 main categories
  const activeMainTab: 'overview' | 'leadership' | 'governance' | 'administration' | 'ranking-accreditation' | 'iqac' | 'contact-us' = 
    pageType === 'chancellor' || pageType === 'pro-chancellor' || pageType === 'vice-chancellor' || pageType === 'chairman' || pageType === 'vice-chairman' || pageType === 'principal' ? 'leadership'
    : pageType === 'sponsoring-body' || pageType === 'governing-body' || pageType === 'board-of-management' || pageType === 'academic-council' || pageType === 'finance-committee' || pageType === 'finance' || pageType === 'planning-monitoring' || pageType === 'research-innovation' || pageType === 'board-of-examination' || pageType === 'board-of-studies' ? 'governance'
    : pageType === 'admin-chart' ? 'administration'
    : pageType === 'about-iqac' || pageType === 'members-committee' || pageType === 'meeting-minutes' || pageType === 'annual-report' || pageType === 'naac-certificate' || pageType === 'aaa' || pageType === 'idp' || pageType === 'useful-links' || pageType === 'downloads' ? 'iqac'
    : pageType;

  // Dynamic Top Banner Content Dictionary (Ref: Image 2)
  const bannerContent: Record<
    'overview' | 'leadership' | 'governance' | 'administration' | 'ranking-accreditation' | 'iqac' | 'contact-us',
    { badge: string; icon: React.ReactNode; title: string; subtitle: string }
  > = {
    overview: {
      badge: 'ABOUT RVS UNIVERSITY',
      icon: <Landmark className="w-3.5 h-3.5 text-gold-400" />,
      title: 'About Us & Institutional Legacy',
      subtitle: 'Explore our 28+ years legacy of educational excellence since 1998, founding vision, core values, and transformative academic milestones.',
    },
    leadership: {
      badge: 'EXECUTIVE LEADERSHIP',
      icon: <Users className="w-3.5 h-3.5 text-gold-400" />,
      title: 'University Leadership & Visionaries',
      subtitle: 'Meet the visionary Chancellor, Pro-Chancellor, and executive academic leadership steering RVS University towards academic excellence and global prominence.',
    },
    governance: {
      badge: 'STATUTORY BODIES',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />,
      title: 'Governance',
      subtitle: 'Statutory governance framework, Apex Governing Body, Board of Management, Academic Council, and statutory authorities established under Act No. 12 of 2024.',
    },
    administration: {
      badge: 'ADMINISTRATIVE STRUCTURE',
      icon: <Layers className="w-3.5 h-3.5 text-gold-400" />,
      title: 'University Administration & Officers',
      subtitle: 'Statutory officers, Registrar, Dean Academics, Controller of Examinations, and administrative leadership driving university operations.',
    },
    'ranking-accreditation': {
      badge: 'QUALITY & RECOGNITIONS',
      icon: <Award className="w-3.5 h-3.5 text-gold-400" />,
      title: 'Rankings, Accreditations & Approvals',
      subtitle: 'NAAC Grade A+, Tier-I NBA, AICTE New Delhi, UGC 2(f) & 12(B), and national benchmarks validating academic excellence.',
    },
    iqac: {
      badge: 'QUALITY ASSURANCE CELL',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />,
      title: 'Internal Quality Assurance Cell (IQAC)',
      subtitle: 'Institutional quality benchmarking, academic audits, outcome-based education, and continuous excellence frameworks.',
    },
    'contact-us': {
      badge: 'CAMPUS & DIRECTORY',
      icon: <Phone className="w-3.5 h-3.5 text-gold-400" />,
      title: 'Contact Us & Campus Directory',
      subtitle: 'Reach out to university admissions, administrative offices, deans, and campus helpdesks in Chittoor, Andhra Pradesh.',
    },
  };

  const currentBanner = bannerContent[activeMainTab] || bannerContent['overview'];

  // 23 Group Institutions Data
  const groupInstitutions = [
    { name: 'RVS University (Autonomous Engineering & PG Campus)', location: 'Chittoor', courses: 'B.Tech., M.Tech., MCA & MBA' },
    { name: 'Sri Venkatesa Perumal College of Engineering & Technology', location: 'Puttur', courses: 'B.Tech., M.Tech., MCA & MBA' },
    { name: 'Chilkur Balaji Institute of Technology', location: 'Hyderabad', courses: 'B.Tech., MCA' },
    { name: 'Sri Venkateswara College of Pharmacy', location: 'Chittoor', courses: 'B.Pharm., M.Pharm, Pharm.D & Ph.D' },
    { name: 'Chilkur Balaji College of Pharmacy', location: 'Hyderabad', courses: 'B.Pharm.' },
    { name: 'Sri Venkateswara College of Education', location: 'Chittoor', courses: 'B.Ed.' },
    { name: 'Sri R.K.M Law College', location: 'Chittoor', courses: 'L.L.B' },
    { name: 'Sir Venkateswara College of Computer Sciences', location: 'Chittoor', courses: 'MCA & MBA' },
    { name: 'Sri Venkatesa Perumal College of Computer Sciences', location: 'Puttur', courses: 'MCA & MBA' },
    { name: 'Chilkur Balaji College of Computer Sciences', location: 'Hyderabad', courses: 'MCA' },
    { name: 'Sri Venkateswara College of Nursing', location: 'Chittoor', courses: 'B.Sc (Nursing)' },
    { name: 'Satya Laxmi College of Nursing', location: 'Hyderabad', courses: 'B.Sc (Nursing)' },
    { name: 'Sri Balaji Junior College', location: 'Chittoor', courses: 'Intermediate (+2)' },
    { name: 'Sri Venkateswara Junior College', location: 'Kothapalli Mitta, Chittoor', courses: 'Intermediate (+2)' },
    { name: 'Sri Vinayaka School of Nursing', location: 'Tirupati', courses: 'Gen. Nursing & Midwifery' },
    { name: 'Sri Jaswanth School of Nursing', location: 'Hyderabad', courses: 'Gen. Nursing & Midwifery' },
    { name: 'Gurunak School of Nursing', location: 'Hyderabad', courses: 'Gen. Nursing & Midwifery' },
    { name: 'Sri Venkateswara School of Nursing', location: 'Chittoor', courses: 'Gen. Nursing & Midwifery' },
    { name: 'Sri Srinivasa M.P.H.W(F) Training Institute', location: 'Tirupati', courses: 'M.P.H.W / A.N.M' },
    { name: 'Balaji M.P.H.W (F) Training Institute', location: 'Tirupati', courses: 'M.P.H.W / A.N.M' },
    { name: 'Vijetha M.P.H.W (F) Training Institute', location: 'Hyderabad', courses: 'M.P.H.W / A.N.M' },
    { name: 'Sri Durga M.P.H.W (F) Training Institute', location: 'Chittoor', courses: 'M.P.H.W / A.N.M' },
    { name: 'Sri Srinivasa M.P.H.W.(F) Training Institute', location: 'Chittoor', courses: 'M.P.H.W / A.N.M' },
  ];

  // 7 Main Tabs
  const mainTabs = [
    { id: 'overview', label: 'Overview', href: '#about-overview', icon: <Compass className="w-4 h-4" /> },
    { id: 'leadership', label: 'Leadership', href: '#about-leadership', icon: <Users className="w-4 h-4" /> },
    { id: 'governance', label: 'Governance', href: '#about-governance', icon: <Landmark className="w-4 h-4" /> },
    { id: 'administration', label: 'Administration', href: '#about-administration', icon: <Layers className="w-4 h-4" /> },
    { id: 'ranking-accreditation', label: 'Ranking and Accreditation', href: '#about-ranking-accreditation', icon: <Award className="w-4 h-4" /> },
    { id: 'iqac', label: 'IQAC', href: '#about-iqac', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'contact-us', label: 'Contact Us', href: '#contact-us', icon: <Phone className="w-4 h-4" /> },
  ];

  // Governance 9 Side Menu Items
  const governanceMenuItems = [
    { id: 'sponsoring-body', label: 'Sponsoring Body', subtitle: 'Srinivasa Educational Academy (Est. 1998)', role: 'Statutory Sponsoring Society' },
    { id: 'governing-body', label: 'Governing Body', subtitle: 'Apex Governing Body', role: 'Apex University Authority' },
    { id: 'board-of-management', label: 'Board of Management', subtitle: 'Executive Administration & Management', role: 'Executive Management' },
    { id: 'academic-council', label: 'Academic Council Members', subtitle: 'Curriculum & Academic Regulation', role: 'Chief Academic Authority' },
    { id: 'finance-committee', label: 'Finance Committee', subtitle: 'Budgeting, Audits & Resource Planning', role: 'Financial Governance' },
    { id: 'planning-monitoring', label: 'Planning and Monitoring Board', subtitle: 'Strategic Roadmap & Infrastructure', role: 'Development Planning' },
    { id: 'research-innovation', label: 'Research and Innovation Council', subtitle: 'R&D, Patents & ATAL IDEA Lab', role: 'Research & Incubation' },
    { id: 'board-of-examination', label: 'Board of Examination', subtitle: 'Evaluation, Moderation & Exam Integrity', role: 'Autonomous Exam Cell' },
    { id: 'board-of-studies', label: 'Board of Studies', subtitle: 'Departmental Syllabi & Industry Alignment', role: 'Curriculum Boards' },
  ];

  // IQAC 9 Side Menu Items
  const iqacMenuItems = [
    { id: 'about-iqac', label: 'About IQAC', subtitle: 'Vision, Quality Objectives & Framework' },
    { id: 'members-committee', label: 'Members and Committee', subtitle: 'Internal Quality Assurance Cell Composition' },
    { id: 'meeting-minutes', label: 'Meeting Minutes', subtitle: 'Quarterly Proceedings & Action Taken Reports' },
    { id: 'annual-report', label: 'Annual Report', subtitle: 'AQAR & Institutional Quality Audits' },
    { id: 'naac-certificate', label: 'NAAC Certificate', subtitle: 'Grade A+ Certificate & Accreditations' },
    { id: 'aaa', label: 'AAA', subtitle: 'Academic & Administrative Audit Reports' },
    { id: 'idp', label: 'IDP', subtitle: 'Institutional Development Plan (2026–2035)' },
    { id: 'useful-links', label: 'Useful Links', subtitle: 'NAAC, NBA, UGC, AICTE & NIRF Portals' },
    { id: 'downloads', label: 'Downloads', subtitle: 'Quality Templates, Forms & Feedback Rubrics' },
  ];

  // Accreditation Seals / Badges (The 8 official uploaded images)
  const accreditationLogos = [
    {
      title: 'Government of Andhra Pradesh',
      category: 'State Statutory Recognition',
      image: '/images/accreditations/ap-govt-logo.png',
      alt: 'Government of Andhra Pradesh Official Emblem',
      description: 'Recognized under the Andhra Pradesh Private Universities (Establishment and Regulation) Act.',
      tag: 'Statutory Act',
    },
    {
      title: 'National Portal of India',
      category: 'National Regulatory Compliance',
      image: '/images/accreditations/india-gov-logo.png',
      alt: 'National Portal of India / Govt of India Emblem',
      description: 'Listed on the National Portal of India (india.gov.in) with complete regulatory compliance.',
      tag: 'india.gov.in',
    },
    {
      title: 'AICTE New Delhi',
      category: 'Technical Education Approval',
      image: '/images/accreditations/aicte-logo.png',
      alt: 'All India Council for Technical Education AICTE Logo',
      description: 'Approved by the All India Council for Technical Education (AICTE), Ministry of Education, New Delhi.',
      tag: 'AICTE Approved',
    },
    {
      title: 'NAAC Accredited Grade A+',
      category: 'Institutional Quality Benchmark',
      image: '/images/accreditations/naac-a-plus-badge.png',
      alt: 'NAAC Accredited with Grade A+ Official Seal',
      description: 'Conferred prestigious Grade A+ by NAAC, UGC for excellence in teaching-learning and research.',
      tag: 'Grade A+',
    },
    {
      title: 'NBA (Washington Accord Tier-I)',
      category: 'Engineering Accreditation',
      image: '/images/accreditations/nba-logo.png',
      alt: 'National Board of Accreditation NBA Seal',
      description: 'Undergraduate engineering programs accredited under Tier-I Washington Accord international standards.',
      tag: 'Tier-I NBA',
    },
    {
      title: 'NIRF Ranking Framework',
      category: 'National Institutional Ranking',
      image: '/images/accreditations/nirf-logo.png',
      alt: 'NIRF National Institutional Ranking Framework Logo',
      description: 'Participating in the National Institutional Ranking Framework (NIRF), Ministry of Education, Govt of India.',
      tag: 'NIRF MHRD',
    },
    {
      title: "Institution's Innovation Council",
      category: 'Innovation & Entrepreneurship',
      image: '/images/accreditations/iic-logo.png',
      alt: "Institution's Innovation Council Ministry of Education Logo",
      description: "Established under the Ministry of Education's Innovation Cell (MIC) to foster startup culture and patents.",
      tag: 'MoE Initiative',
    },
    {
      title: 'JNTUA Anantapur',
      category: 'Affiliation & Academic Legacy',
      image: '/images/accreditations/jntua-logo.png',
      alt: 'Jawaharlal Nehru Technological University Anantapur Seal',
      description: 'Distinguished 28-year autonomous technical engineering academic heritage in Andhra Pradesh.',
      tag: 'Autonomous Legacy',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-navy-950">
      {/* 1. Regal Header Banner (Dynamic for each section - Image 2 Reference) */}
      <div className="bg-gradient-to-r from-[#0A192F] via-[#102444] to-[#0A192F] text-white pt-28 md:pt-32 pb-10 md:pb-14 border-b border-gold-500/20 shadow-xl transition-all duration-300">
        <div className="container-custom px-4 md:px-8">
          {/* Breadcrumb Navigation: [Home] -> [About Us] -> [Section] */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-4 flex-wrap font-sans">
            <button 
              onClick={onBackToHome}
              className="hover:text-gold-300 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span className="text-slate-500">&gt;</span>
            <a 
              href="#about-overview" 
              className="hover:text-gold-300 transition-colors font-semibold"
            >
              About Us
            </a>
            <span className="text-slate-500">&gt;</span>
            <span className="text-gold-400 font-bold">
              {activeMainTab === 'governance' ? 'Governance' : currentBanner.title}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider mb-2">
                {currentBanner.icon}
                <span>{currentBanner.badge}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                {currentBanner.title}
              </h1>
              <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl font-light">
                {currentBanner.subtitle}
              </p>
            </div>

            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-gold-300 text-xs font-bold border border-gold-400/40 backdrop-blur-md transition-all self-start md:self-auto shadow-md cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sticky Tab Switcher for the 7 Main Sections */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="container-custom px-4 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
            {mainTabs.map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  activeMainTab === tab.id
                    ? 'bg-navy-950 text-gold-300 font-black shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-navy-950 border border-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Section Content Display */}
      <div className="py-12 md:py-16 container-custom px-4 md:px-8">

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ========================================================================= */}
        {activeMainTab === 'overview' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Hero Overview Card */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 text-gold-800 border border-gold-200 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    <span>Established in 1998</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy-950 leading-tight">
                    Shaping Global Innovators, <br />
                    <span className="text-gold-600">Empowering Human Potential.</span>
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    <strong className="text-navy-950">RVS University</strong> (established under the aegis of <strong className="text-navy-950">Srinivasa Educational Academy</strong> in 1998) stands as a premier seat of higher learning and technological empowerment in Andhra Pradesh. Spanning an expansive <strong className="text-navy-950">65+ Acre Smart Campus</strong> in Chittoor, the university is committed to academic rigor, experiential industry immersion, and human-centric innovation.
                  </p>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    With autonomous governance, NBA Tier-1 accreditation, NAAC Grade A+, and AICTE approval, RVS University guides over <strong className="text-navy-950">4,500+ students</strong> across 49+ undergraduate, postgraduate, and doctoral degree programs.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60">
                      <div className="text-2xl font-serif font-black text-gold-700">28+</div>
                      <div className="text-xs font-semibold text-slate-600 mt-0.5">Years of Legacy</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60">
                      <div className="text-2xl font-serif font-black text-blue-900">49+</div>
                      <div className="text-xs font-semibold text-slate-600 mt-0.5">Degree Programs</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60">
                      <div className="text-2xl font-serif font-black text-emerald-800">15k+</div>
                      <div className="text-xs font-semibold text-slate-600 mt-0.5">Global Alumni</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-400/40 bg-navy-950">
                    <img
                      src="/images/chairman.jpg"
                      alt="RVS University Chancellor Dr. Ravuri Venkataswamy"
                      className="w-full h-[400px] object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300">
                        Srinivasa Educational Academy
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white">
                        Founder Chancellor Dr. Ravuri Venkataswamy
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        "Education for Peace & Global Empowerment"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-lg space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-gold-800">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy-950">Our Vision</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                  To be a globally recognized center of academic excellence and multidisciplinary innovation, imparting value-based education that equips students with state-of-the-art technological acumen, entrepreneurial mindset, and ethical leadership to solve complex global challenges.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-lg space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-900">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-navy-950">Our Mission</h3>
                <ul className="space-y-2.5 text-slate-600 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-1" />
                    <span>Provide rigorous, outcome-based, and industry-aligned curricula integrated with AI, IoT, Robotics, and high-performance computing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-1" />
                    <span>Foster advanced interdisciplinary research, patent generation, and incubation through the AICTE ATAL IDEA Lab.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-1" />
                    <span>Inculcate lifelong ethical principles, social responsibility, sustainability, and global leadership skills.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-lg space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Institutional Philosophy</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">Core Values</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-gold-700 font-bold text-base flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold-600" />
                    <span>Academic Excellence</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Continuous benchmarking with premier global universities to deliver top-tier education and pedagogy.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-gold-700 font-bold text-base flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold-600" />
                    <span>Innovation & Research</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Driving applied research, patent incubation, and entrepreneurial venture creation across smart domains.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-gold-700 font-bold text-base flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-gold-600" />
                    <span>Integrity & Ethics</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Cultivating transparent governance, student welfare, academic honesty, and inclusive values.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-gold-700 font-bold text-base flex items-center gap-2">
                    <Globe className="w-5 h-5 text-gold-600" />
                    <span>Global Outlook</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Welcoming 300+ scholars from 62+ nations and maintaining 11 international academic partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CONTINUOUS LONG SCROLLING LEADERSHIP PAGE (NO MENU BUTTON BAR) */}
        {/* ========================================================================= */}
        {activeMainTab === 'leadership' && (
          <div className="space-y-12 animate-fadeIn overflow-x-hidden">

            {/* ===================================================================== */}
            {/* 1. CHANCELLOR (Dr. Ravuri Venkataswamy) */}
            {/* ===================================================================== */}
            <LeadershipScrollCard id="chancellor-card" className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-200 shadow-xl overflow-hidden scroll-mt-24">
              {(isInView) => (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* Photo Card (Slides in from Left edge on scroll into view) */}
                  <div
                    className={`lg:col-span-5 space-y-4 transform transition-all duration-1000 ease-out will-change-transform ${
                      isInView
                        ? 'translate-x-0 opacity-100 filter-none'
                        : '-translate-x-[40vw] sm:-translate-x-[60vw] md:-translate-x-[80vw] opacity-0 blur-sm'
                    }`}
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-3 border-gold-400/50 bg-navy-950 group">
                      <img
                        src="/images/chairman.jpg"
                        alt="Dr. Ravuri Venkataswamy, Chancellor SV Group of Educational Institutions"
                        className="w-full h-[450px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent opacity-85" />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-4 left-4 bg-navy-950/85 backdrop-blur-md border border-gold-400/40 px-3 py-1.5 rounded-full text-gold-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                        <span>Chancellor SV Group</span>
                      </div>

                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 font-sans">
                          Srinivasa Educational Academy (Est. 1998)
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                          Dr. Ravuri Venkataswamy
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 font-light italic">
                          “Education for Peace”
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1.5 text-xs shadow-sm">
                      <div className="flex items-center gap-2 text-gold-900 font-bold">
                        <GraduationCap className="w-4 h-4 text-gold-700" />
                        <span>Honorary Ph.D. in Education</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        Conferred by <strong>Johnson & Wales University, Rhode Island, USA</strong> on Dr. R. Venkataswamy for his research on Education in India and technical leadership.
                      </p>
                    </div>
                  </div>

                  {/* Biography & Chancellor's Desk (Slides in from Right edge on scroll into view) */}
                  <div
                    className={`lg:col-span-7 space-y-5 transform transition-all duration-1000 ease-out will-change-transform ${
                      isInView
                        ? 'translate-x-0 opacity-100 filter-none'
                        : 'translate-x-[40vw] sm:translate-x-[60vw] md:translate-x-[80vw] opacity-0 blur-sm'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                        Chancellor's Desk
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
                        Dr. Ravuri Venkataswamy
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-gold-700 mt-0.5">
                        Chancellor, SV Group of Educational Institutions & Founder, RVS University
                      </p>
                      <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-amber-500 rounded-full mt-3" />
                    </div>

                    <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
                      <p>
                        <strong className="text-navy-950">Dr. R. Venkataswamy</strong>, S/o. late Sri R. Kanakaiah is a well known Educationist and Philanthropist of this region. With a keen interest to promote education in the backward Rayalaseema Region of Andhra Pradesh, with a motto of <em className="text-gold-800 font-serif font-bold">“Education for Peace”</em> he has floated an educational society in the name of <strong className="text-navy-950">“Srinivasa Educational Academy”</strong> in the year 1998 with fellow philanthropists and educationists of this area.
                      </p>
                      <p>
                        He has established <strong className="text-navy-950">Sri Venkateswara School of Nursing & Sri Srinivasa MPHW (F) Training Institute in 1986</strong>, <strong className="text-navy-950">Sri R.K.M. Law College in 1992</strong>, and <strong className="text-navy-950">Sri Venkateswara College of Engineering & Technology in 1998</strong> (Tier-I NBA, AICTE, JNTU Anantapur, 2 Gold Medals, ranked 3rd in AP and 30th in India by CSR-GHRDC 2010). The campus in <strong className="text-navy-950 font-bold">40 Acres of land</strong> is located on R.V.S. Nagar, adjacent to the proposed RVS Medical College.
                      </p>
                    </div>

                    {/* Awards Received Section */}
                    <div className="space-y-3 pt-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold-600" />
                        <span>Awards & Honors Received</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1.5 shadow-sm">
                          <div className="text-xs font-bold text-gold-900 flex items-center gap-1.5">
                            <span>🏆 Vijaya-Bhargavi Award</span>
                          </div>
                          <p className="text-[11px] text-slate-700 leading-relaxed">
                            <strong>“Best Educational Promoter”</strong> (1993) at Ravindra Bharathi, Hyderabad.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-1.5 shadow-sm">
                          <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                            <span>🌟 Bharat Jyothi Award</span>
                          </div>
                          <p className="text-[11px] text-slate-700 leading-relaxed">
                            From International Integrity Peace Society (2000) for outstanding achievements.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-1.5 shadow-sm">
                          <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                            <span>🎬 Nandi Award</span>
                          </div>
                          <p className="text-[11px] text-slate-700 leading-relaxed">
                            From Hon'ble Chief Minister of AP (2003) for Best Children’s Film <em>“Little Hearts”</em>.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Prominent "Know More" CTA Button */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="text-xs text-slate-500">
                        Explore complete biographical milestones, Ph.D. research, RVS Hospitals, and proposed Medical College:
                      </div>
                      <button
                        onClick={() => setIsChancellorModalOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-gold-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-gold-400/50 shadow-lg hover:shadow-xl hover:scale-102 transition-all cursor-pointer group"
                      >
                        <BookOpen className="w-4 h-4 text-gold-400" />
                        <span>Know More / View Full Profile</span>
                        <ArrowRight className="w-4 h-4 text-gold-400 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </LeadershipScrollCard>

            {/* ===================================================================== */}
            {/* 2. PRO CHANCELLOR (Shri R.V. Srinivas, B.Tech., MBA (UK)) */}
            {/* ===================================================================== */}
            <LeadershipScrollCard id="pro-chancellor-card" className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-200 shadow-xl overflow-hidden scroll-mt-24">
              {(isInView) => (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* Photo Card (Slides in from Left edge on scroll into view) */}
                  <div
                    className={`lg:col-span-5 space-y-4 transform transition-all duration-1000 ease-out will-change-transform ${
                      isInView
                        ? 'translate-x-0 opacity-100 filter-none'
                        : '-translate-x-[40vw] sm:-translate-x-[60vw] md:-translate-x-[80vw] opacity-0 blur-sm'
                    }`}
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-3 border-gold-400/50 bg-navy-950 group">
                      <img
                        src="/images/vice-chairman.jpg"
                        alt="Shri R.V. Srinivas, B.Tech., MBA (UK), Pro Chancellor"
                        className="w-full h-[420px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent opacity-80" />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-md border border-gold-400/40 px-3 py-1.5 rounded-full text-gold-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                        <Award className="w-3.5 h-3.5 text-gold-400" />
                        <span>Pro Chancellor</span>
                      </div>

                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 font-sans">
                          Srinivasa Educational Academy
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                          Shri R.V. Srinivas
                        </h3>
                        <p className="text-xs text-gold-300 font-semibold mt-0.5">
                          B.Tech., MBA (UK)
                        </p>
                      </div>
                    </div>

                    {/* Academic Qualifications Highlight */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs shadow-sm">
                      <div className="flex items-center gap-2 text-gold-800 font-bold uppercase tracking-wider text-[11px]">
                        <GraduationCap className="w-4 h-4 text-gold-600" />
                        <span>Academic Qualifications</span>
                      </div>
                      <div className="space-y-1.5 text-slate-700">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                          <span><strong>B.Tech (Computer Science & Engg)</strong> — JNTU Hyderabad.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                          <span><strong>MBA (Finance & Marketing)</strong> — Cardiff University, Wales, UK (7th Best in UK).</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Biography, Group Leadership & "Know More" Action (Slides in from Right edge on scroll into view) */}
                  <div
                    className={`lg:col-span-7 space-y-5 transform transition-all duration-1000 ease-out will-change-transform ${
                      isInView
                        ? 'translate-x-0 opacity-100 filter-none'
                        : 'translate-x-[40vw] sm:translate-x-[60vw] md:translate-x-[80vw] opacity-0 blur-sm'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                        Pro Chancellor's Desk
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
                        Shri R.V. Srinivas
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-gold-700 mt-0.5">
                        Pro Chancellor, RVS University & Vice-Chairman, Srinivasa Educational Academy
                      </p>
                      <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-amber-500 rounded-full mt-3" />
                    </div>

                    {/* Executive Bio Highlight */}
                    <div className="p-5 rounded-2xl bg-slate-50 border-l-4 border-gold-500 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                      <p>
                        <strong className="text-navy-950 font-bold">Shri R.V. Srinivas, B.Tech., MBA (UK)</strong> is the Vice-Chairman for Srinivasa Educational Academy and playing a proactive role in the management of <strong className="text-navy-950 font-bold">23 Educational Institutions</strong> in various fields of study. He did his MBA from <strong className="text-navy-950 font-bold">CARDIFF University, Wales (7th Best University in U.K.)</strong> specializing in Finance and Marketing as Major.
                      </p>
                    </div>

                    {/* Institutional Leadership Summary */}
                    <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                      <p>
                        Under his dynamic leadership <strong className="text-navy-950 font-semibold">“Sri Venkateswara College of Engineering & Technology (SVCET)”</strong> became the <strong className="text-gold-800 font-bold">Youngest College in Andhra Pradesh to get NBA Accredited</strong>. The institution has achieved NAAC Grade A+ accreditation, Tier-I NBA accreditation, UGC autonomous status, and recognition under sections 12(B) and 2(F).
                      </p>
                      <p>
                        More than <strong className="text-navy-950 font-bold">280 foreign students</strong> from Malaysia, Sudan, Tanzania, UAE, Kuwait, Nepal, Bhutan, and Sri Lanka pursue studies across group campuses. He has also instituted scholarships for students nominated by the <strong>Royal Government of Bhutan</strong> and led community outreach through charitable trusts.
                      </p>
                    </div>

                    {/* Prominent "Know More" CTA Button */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="text-xs text-slate-500">
                        Explore complete international collaborations, CSR trusts, and directory of 23 group institutions:
                      </div>
                      <button
                        onClick={() => setIsProChancellorModalOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-gold-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-gold-400/50 shadow-lg hover:shadow-xl hover:scale-102 transition-all cursor-pointer group"
                      >
                        <BookOpen className="w-4 h-4 text-gold-400" />
                        <span>Know More / View Full Profile</span>
                        <ArrowRight className="w-4 h-4 text-gold-400 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </LeadershipScrollCard>

            {/* ===================================================================== */}
            {/* 3. VICE CHANCELLOR (Executive Academic Office) */}
            {/* ===================================================================== */}
            <LeadershipScrollCard id="vice-chancellor-card" className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-200 shadow-xl overflow-hidden scroll-mt-24">
              {(isInView) => (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Visual Emblem Card (Slides in from Left edge on scroll into view) */}
                  <div
                    className={`lg:col-span-5 transform transition-all duration-1000 ease-out will-change-transform ${
                      isInView
                        ? 'translate-x-0 opacity-100 filter-none'
                        : '-translate-x-[40vw] sm:-translate-x-[60vw] md:-translate-x-[80vw] opacity-0 blur-sm'
                    }`}
                  >
                    <div className="p-10 rounded-3xl bg-gradient-to-b from-navy-950 to-navy-900 border-2 border-gold-400/40 text-center text-white space-y-4 shadow-2xl">
                      <div className="w-24 h-24 rounded-full bg-gold-500/10 border-2 border-gold-400/50 flex items-center justify-center mx-auto text-gold-400 shadow-inner">
                        <GraduationCap className="w-12 h-12 text-gold-400" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400 font-sans">
                          Executive Leadership
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-white">
                          Vice Chancellor
                        </h3>
                        <p className="text-xs text-slate-300">
                          RVS University, Andhra Pradesh
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desk Details & Notification (Slides in from Right edge on scroll into view) */}
                  <div
                    className={`lg:col-span-7 space-y-5 transform transition-all duration-1000 ease-out will-change-transform ${
                      isInView
                        ? 'translate-x-0 opacity-100 filter-none'
                        : 'translate-x-[40vw] sm:translate-x-[60vw] md:translate-x-[80vw] opacity-0 blur-sm'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                        Executive Academic Office
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
                        Vice Chancellor's Desk
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-gold-700 mt-0.5">
                        Chief Academic & Executive Officer, RVS University
                      </p>
                      <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-amber-500 rounded-full mt-3" />
                    </div>

                    <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                      <div className="flex items-center gap-2 text-gold-900 font-bold text-sm">
                        <Sparkles className="w-4 h-4 text-gold-700" />
                        <span>Notification Status: Appointment in Progress</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        The official profile, vision address, and appointment notification from the <strong>Vice Chancellor</strong> of RVS University are currently being finalized and will be published shortly.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </LeadershipScrollCard>

          </div>
        )}

        {/* ========================================================================= */}
        {/* CHANCELLOR FULL PROFILE MODAL (KNOW MORE POPUP) */}
        {/* ========================================================================= */}
        {isChancellorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gold-400/40 shadow-2xl">
              
              {/* Modal Top Header */}
              <div className="bg-gradient-to-r from-navy-950 via-[#102444] to-navy-950 text-white p-6 border-b border-gold-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-300">
                    <Sparkles className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300 font-sans">
                      Founder Chancellor Profile & Biography
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Dr. Ravuri Venkataswamy
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setIsChancellorModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-slate-300 flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar text-xs sm:text-sm text-slate-700">
                
                {/* 1. Founding Vision & Philosophy */}
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-gold-900 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-gold-700" />
                    <span>Founding Vision: “Education for Peace”</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    <strong className="text-navy-950">Dr. R. Venkataswamy</strong>, S/o. late Sri R. Kanakaiah is a well known Educationist and Philanthropist of this region. With a keen interest to promote education in the backward Rayalaseema Region of Andhra Pradesh, with a motto of <strong className="text-gold-900">“Education for Peace”</strong> he has floated an educational society in the name of <strong className="text-navy-950">“Srinivasa Educational Academy”</strong> in the year 1998 with fellow philanthropists and educationists of this area.
                  </p>
                </div>

                {/* 2. State & National Awards Received */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-navy-950 text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold-600" />
                    <span>State & National Awards & Honors</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-xs font-bold text-gold-800 flex items-center gap-1.5">
                        <span>🏆 Vijaya-Bhargavi Stage Award</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Conferred with <strong>“Best Educational Promoter”</strong> award received in 1993 at Ravindra Bharathi, Hyderabad (15.07.1993).
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                        <span>🌟 Bharat Jyothi Award</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Awarded by <strong>International Integrity Peace & Friendship Society (2000)</strong> for scoring a string of outstanding achievements in the chosen field of activity.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                        <span>🎬 Prestigious Nandi Award</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Received from the <strong>Honorable Chief Minister of Andhra Pradesh (2003)</strong> for the Best Children’s Film <em>“Little Hearts”</em> produced during 2000 and 2001.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Academic Institutions Established */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-navy-950 text-base flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gold-600" />
                    <span>Academic Institutions & Milestones Established</span>
                  </h4>
                  <div className="space-y-2.5 leading-relaxed">
                    <p>
                      He has established <strong className="text-navy-950">Sri Venkateswara School of Nursing & Sri Srinivasa MPHW (F) Training Institute in 1986</strong> which is affiliated to Director of Medical Education, Hyderabad and recognized by Indian Nursing Council, New Delhi.
                    </p>
                    <p>
                      In the year 1992 he has started <strong className="text-navy-950">Sri R.K.M. Law College</strong>, affiliated to the S.V. University, Tirupathi and recognized by Bar Council of India, New Delhi.
                    </p>
                    <p>
                      With this experience and an intention to provide quality technical education, which will provide self employment to the youth of this region, he has established <strong className="text-navy-950">Sri Venkateswara College of Engineering & Technology in the year 1998</strong>. It is approved by AICTE, New Delhi and Accredited by National Board of Accreditation under Tier -I and affiliated to Jawaharlal Nehru Technological University Anantapur, Ananthapuramu. In a span of about 9 years it is recognized as one of the best colleges in A.P. state with <strong>2 Gold Medals and 95% and above results</strong> in all these years.
                    </p>
                    <p>
                      This Institution is ranked <strong>3rd in Andhra Pradesh and 30th in India</strong> by CSR-GHRDC Survey, Competition Success Review 2010. At present this institution is offering 10 B.Tech programmes and 13 M.Tech programmes. The college campus with excellent buildings in <strong>40 Acres of land</strong> is located on R.V.S. Nagar, adjacent to the proposed RVS Medical College.
                    </p>
                  </div>
                </div>

                {/* 4. Honorary Ph.D. & Healthcare Philanthropy */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <h4 className="font-serif font-bold text-navy-950 text-sm flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-gold-600" />
                    <span>Honorary Doctorate & Healthcare Initiatives</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dr. R. Venkataswamy has adequate experience in the activity of establishing and running educational institutions and he proved himself as a successful educationist. <strong>Johnson & Wales University, Rhode Island</strong> has conferred <strong>Honorary Degree, Doctor of Philosophy – Ph.D. in Education</strong> on R. Venkataswamy, the Chairman of the Institution for his research on Education in India.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    He started <strong className="text-navy-950 font-bold">RVS Hospitals at Chittoor</strong> to render medical services to the poor and he has proposed to take up a big venture of establishing <strong className="text-navy-950 font-bold">RVS Institute of Medical Sciences</strong> for promoting medical education catering to the aspirations of the people of Chittoor district and some parts of neighbouring district like Kadapa, Kurnool, Anantapur, and Nellore.
                  </p>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => setIsChancellorModalOpen(false)}
                >
                  Close Profile
                </Button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PRO CHANCELLOR FULL PROFILE MODAL (KNOW MORE POPUP) */}
        {/* ========================================================================= */}
        {isProChancellorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gold-400/40 shadow-2xl">
              
              {/* Modal Top Header */}
              <div className="bg-gradient-to-r from-navy-950 via-[#102444] to-navy-950 text-white p-6 border-b border-gold-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-300">
                    <Award className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300 font-sans">
                      Executive Profile & Biography
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      Shri R.V. Srinivas, B.Tech., MBA (UK)
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setIsProChancellorModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-slate-300 flex items-center justify-center transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar text-xs sm:text-sm text-slate-700">
                
                {/* 1. Academic Credentials */}
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-gold-900 font-bold text-sm">
                    <GraduationCap className="w-4 h-4 text-gold-700" />
                    <span>Academic Qualifications & British Education</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700 pl-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Bachelors in Technology (Computer Science & Engineering)</strong> — Jawaharlal Nehru Technological University (JNTU), Hyderabad.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Masters in Business Administration (MBA - Finance & Marketing)</strong> — Cardiff Business School, CARDIFF University, Wales (7th Best University in the United Kingdom).</span>
                    </li>
                  </ul>
                </div>

                {/* 2. State & National Honors and Awards */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-navy-950 text-base flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold-600" />
                    <span>State & National Honors & Recognitions</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-xs font-bold text-gold-800 flex items-center gap-1.5">
                        <span>🏆 Vijaya-Bhargavi Stage Award</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Conferred with <strong>“Best Educational Promoter”</strong> award received in 1993 at Ravindra Bharathi, Hyderabad (15.07.1993).
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                        <span>🌟 Bharat Jyothi Award</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Awarded by <strong>International Integrity Peace & Friendship Society (2000)</strong> for scoring a string of outstanding achievements.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                        <span>🎬 Prestigious Nandi Award</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Received from the <strong>Hon'ble Chief Minister of Andhra Pradesh (2003)</strong> for the Best Children’s Film <em>“Little Hearts”</em>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Global Reach & Accreditation Milestones */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-navy-950 text-base flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gold-600" />
                    <span>Institutional Leadership & Global Recognition</span>
                  </h4>
                  <div className="space-y-2.5 leading-relaxed">
                    <p>
                      Recognizing his visionary leadership, national media has consistently ranked the educational institutions under his management among top colleges in India. Under his leadership <strong>“Sri Venkateswara College of Engineering & Technology (SVCET)”</strong> became the <strong>Youngest College in Andhra Pradesh to get NBA Accredited</strong>.
                    </p>
                    <p>
                      The College has made its mark as an Institute of Excellence globally, hosting more than <strong>280 foreign students</strong> from Malaysia, Sudan, Tanzania, UAE, Kuwait, Nepal, Bhutan, and Sri Lanka. Extended technical assistance to the <strong>Royal Government of Bhutan</strong> in nursing education through scholarships.
                    </p>
                    <p>
                      Accredited by <strong>National Assessment and Accreditation Council (NAAC) with Grade 'A+'</strong>, accredited by <strong>NBA under Tier-I</strong>, and granted <strong>Autonomous status by UGC</strong> from 2011-12. The college is recognized under <strong>UGC 12(B) and 2(F)</strong>.
                    </p>
                    <p>
                      Premier recruiters include <strong>Infosys, Wipro, Accenture, CSC, KPIT Cummins, Robert Bosch, and Mahindra Satyam</strong>.
                    </p>
                  </div>
                </div>

                {/* 4. Philanthropic Foundations & Social Welfare */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <h4 className="font-serif font-bold text-navy-950 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold-600" />
                    <span>Philanthropic Trusts & Community Impact</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A Public Charitable Trust was instituted under the name <strong>Smt Haarika Memorial Literary and Cultural Association</strong> to provide financial assistance for education, cultural preservation, poverty alleviation, healthcare, and civil liberties.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Founder of <strong>“Helping Hands”</strong>, organizing blood donation drives, free eye camps, disaster relief, and comprehensive scholarships for underprivileged international students from SAARC countries.
                  </p>
                </div>

                {/* 5. 23 Group Institutions Directory */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-navy-950 text-sm flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-gold-600" />
                    <span>Directory of 23 Group Educational Institutions</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                    {groupInstitutions.map((inst, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <div className="font-bold text-navy-950">{idx + 1}. {inst.name}</div>
                        <div className="text-slate-500 mt-0.5">{inst.location} • {inst.courses}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                <Button
                  variant="gold"
                  size="md"
                  onClick={() => setIsProChancellorModalOpen(false)}
                >
                  Close Profile
                </Button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: GOVERNANCE (ALL 9 BODIES WITH CLEAN "WILL BE UPDATED SOON" STATE) */}
        {/* ========================================================================= */}
        {activeMainTab === 'governance' && (
          <div className="space-y-8 animate-fadeIn">
            {/* 2-Column Layout: Left Side Menu Bar + Right Detail View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side Menu Bar */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-4 md:p-5 border border-slate-200 shadow-lg sticky top-20">
                <div className="pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Governance Menu
                  </span>
                  <span className="text-[11px] font-semibold text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200">
                    Statutory
                  </span>
                </div>

                <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
                  {governanceMenuItems.map((item) => {
                    const isActive = governanceSubTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setGovernanceSubTab(item.id as any)}
                        className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? 'bg-navy-950 text-white shadow-md border border-gold-500/30 font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-transparent'
                        }`}
                      >
                        <div className="pr-2">
                          <div className={`text-xs md:text-sm ${isActive ? 'text-gold-300 font-bold' : 'text-navy-950 font-semibold group-hover:text-gold-700'}`}>
                            {item.label}
                          </div>
                          <div className={`text-[11px] mt-0.5 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                            {item.role}
                          </div>
                        </div>
                        <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? 'text-gold-400 translate-x-1' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Content Area: Clean "Will be updated soon" Display */}
              <div className="lg:col-span-8 space-y-6">
                {governanceMenuItems.map((item) => {
                  if (governanceSubTab !== item.id) return null;

                  return (
                    <div key={item.id} className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                      {/* Top Header of the Statutory Body */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-xs font-bold uppercase tracking-wider mb-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                            <span>{item.role}</span>
                          </div>
                          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-950">
                            {item.label}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
                            {item.subtitle}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-gold-900 text-xs font-bold self-start sm:self-auto">
                          <Clock className="w-3.5 h-3.5 text-gold-600" />
                          <span>Statutory Council</span>
                        </span>
                      </div>

                      {/* Clean "Will be updated soon" Placeholder Card */}
                      <div className="p-8 md:p-14 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center mx-auto text-gold-700 shadow-inner">
                          <Landmark className="w-8 h-8 text-gold-600" />
                        </div>
                        <div className="max-w-md mx-auto space-y-2">
                          <h4 className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
                            Will be updated soon
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                            The official details, member directory, and proceedings for <strong className="text-navy-950 font-semibold">{item.label}</strong> will be updated soon.
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ADMINISTRATION (CLEAN "WILL BE UPDATED SOON") */}
        {/* ========================================================================= */}
        {activeMainTab === 'administration' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 md:p-14 border border-slate-200 shadow-xl text-center space-y-8">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 border-2 border-gold-400/50 flex items-center justify-center mx-auto text-gold-600 shadow-inner">
                <Layers className="w-10 h-10 text-gold-600" />
              </div>

              <div className="max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                  <span>University Administration</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950">
                  Organisation & Administrative Structure
                </h3>
                <div className="h-1 w-16 bg-gold-500 rounded-full mx-auto my-3" />
                <p className="text-base md:text-lg text-slate-800 font-bold">
                  Will be updated soon
                </p>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                  The complete organizational hierarchy chart, administrative officer directory, and functional wing structure of RVS University are currently under revision and will be updated soon.
                </p>
              </div>

              <div className="max-w-xl mx-auto p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2 text-left">
                <div className="font-bold text-navy-950 text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gold-600" />
                  <span>Administrative Inquiries & Secretarial Support</span>
                </div>
                <p>
                  For immediate administrative communications, official orders, or departmental verifications, please reach out to the administrative office:
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-navy-950 font-semibold">
                  <span>📞 +91 9669660155</span>
                  <span>📞 +91 9669660214</span>
                  <span>✉️ info@rvsu.org</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="gold"
                  size="md"
                  href="#about-overview"
                >
                  Explore University Overview
                </Button>
                <Button
                  variant="ghost-white"
                  size="md"
                  onClick={onBackToHome}
                  className="text-navy-950 border-slate-300 hover:bg-slate-100"
                >
                  Return Back
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: RANKING AND ACCREDITATION (WITH 5 OFFICIAL SEALS & BADGES) */}
        {/* ========================================================================= */}
        {activeMainTab === 'ranking-accreditation' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Official Statutory Seals & Emblems Showcase Grid */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy-950">
                    Statutory Seals & Accreditation Badges
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                    Official recognitions by Government of India, Government of Andhra Pradesh, NAAC, NBA, and JNTUA.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-gold-900 text-xs font-bold shadow-sm self-start sm:self-auto">
                  <Award className="w-4 h-4 text-gold-600" />
                  <span>NAAC Grade A+ & NBA Tier-I</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
                {accreditationLogos.map((seal, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center group"
                  >
                    <div className="w-full h-32 flex items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-amber-50/30 transition-colors">
                      <img
                        src={seal.image}
                        alt={seal.alt}
                        className="max-h-24 max-w-full object-contain filter drop-shadow-sm"
                      />
                    </div>

                    <div className="mt-4 flex-1 flex flex-col justify-between w-full">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                          {seal.tag}
                        </span>
                        <h5 className="font-serif font-bold text-navy-950 text-sm md:text-base leading-snug">
                          {seal.title}
                        </h5>
                        <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                          {seal.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: IQAC WITH DEDICATED SIDE MENU BAR */}
        {/* ========================================================================= */}
        {activeMainTab === 'iqac' && (
          <div className="space-y-8 animate-fadeIn">
            {/* 2-Column Layout: Left Side Menu Bar + Right Content Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side Menu Bar */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-4 md:p-5 border border-slate-200 shadow-lg sticky top-20">
                <div className="pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    IQAC Menu
                  </span>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Quality Cell
                  </span>
                </div>

                <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1 custom-scrollbar">
                  {iqacMenuItems.map((item) => {
                    const isActive = iqacSubTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setIqacSubTab(item.id as any)}
                        className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group ${
                          isActive
                            ? 'bg-navy-950 text-white shadow-md border border-gold-500/30 font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-transparent'
                        }`}
                      >
                        <div className="pr-2">
                          <div className={`text-xs md:text-sm ${isActive ? 'text-gold-300 font-bold' : 'text-navy-950 font-semibold group-hover:text-gold-700'}`}>
                            {item.label}
                          </div>
                          <div className={`text-[11px] mt-0.5 line-clamp-1 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                            {item.subtitle}
                          </div>
                        </div>
                        <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? 'text-gold-400 translate-x-1' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Content Panel for IQAC */}
              <div className="lg:col-span-8 space-y-6">
                {/* 1. About IQAC */}
                {iqacSubTab === 'about-iqac' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Vision & Purpose</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">About IQAC</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        Internal Quality Assurance Cell establishes benchmarks for continuous quality improvement across curriculum, pedagogy, and research.
                      </p>
                    </div>

                    <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-normal">
                      <p>
                        In pursuance of the National Action Plan of the National Assessment and Accreditation Council (NAAC), Bangalore, for performance evaluation, assessment and accreditation and quality up-gradation of institutions of higher education, the <strong className="text-navy-950">Internal Quality Assurance Cell (IQAC)</strong> was established at RVS University.
                      </p>
                      <p>
                        Since quality enhancement is a continuous process, the IQAC works towards realizing the goals of quality enhancement and sustenance. The prime task of the IQAC is to develop a system for conscious, consistent and catalytic improvement in the overall performance of institutions.
                      </p>
                    </div>

                    {/* Key Objectives */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                        <div className="text-xs font-bold text-gold-900 flex items-center gap-2">
                          <Target className="w-4 h-4 text-gold-700" />
                          <span>Quality Sustenance</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          To develop a quality system for conscious, consistent and catalytic programmed action to improve the academic and administrative performance of the HEI.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                        <div className="text-xs font-bold text-blue-900 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-700" />
                          <span>Outcome Benchmarking</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          To promote measures for institutional functioning towards quality enhancement through internalization of quality culture and institutionalization of best practices.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Members / Committee */}
                {iqacSubTab === 'members-committee' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Composition</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">IQAC Committee Members</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        Statutory composition of IQAC committee with senior faculty, industry experts, alumni, and administrative leaders.
                      </p>
                    </div>

                    <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-400/40 flex items-center justify-center mx-auto text-gold-600 shadow-inner">
                        <Users className="w-8 h-8 text-gold-600" />
                      </div>
                      <div className="max-w-md mx-auto space-y-2">
                        <h4 className="font-serif text-xl font-bold text-navy-950">
                          Will be updated soon
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                          The officially reconstituted IQAC Advisory Council and Departmental Quality Coordinators list will be updated soon.
                        </p>
                      </div>
                      <span className="inline-block px-3.5 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-semibold">
                        Gazetted notification in progress
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. Meeting Minutes */}
                {iqacSubTab === 'meeting-minutes' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Proceedings & ATR</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">Meeting Minutes</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        Formal records of quarterly IQAC meetings, resolutions, and Action Taken Reports (ATR).
                      </p>
                    </div>

                    <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-300 flex items-center justify-center mx-auto text-blue-700 shadow-inner">
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="max-w-md mx-auto space-y-2">
                        <h4 className="font-serif text-xl font-bold text-navy-950">
                          Will be updated soon
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                          Minutes of the IQAC meetings and subsequent Action Taken Reports are being archived for digital download and will be updated soon.
                        </p>
                      </div>
                      <span className="inline-block px-3.5 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-semibold">
                        Document archive under preparation
                      </span>
                    </div>
                  </div>
                )}

                {/* 4. Annual Report */}
                {iqacSubTab === 'annual-report' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">AQAR & Audits</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">Annual Report</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        Annual Quality Assurance Reports (AQAR) submitted to the National Assessment and Accreditation Council (NAAC).
                      </p>
                    </div>

                    <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-700 shadow-inner">
                        <Award className="w-8 h-8 text-emerald-600" />
                      </div>
                      <div className="max-w-md mx-auto space-y-2">
                        <h4 className="font-serif text-xl font-bold text-navy-950">
                          Will be updated soon
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                          The comprehensive Annual Reports and AQAR repository for past and current academic cycles will be available for download shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. NAAC Certificate */}
                {iqacSubTab === 'naac-certificate' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Accreditation</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">NAAC Certificate</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        Official NAAC Accreditation Certificate and Peer Team Evaluation Report.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-5 flex justify-center">
                        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
                          <img
                            src="/images/accreditations/naac-a-plus-badge.png"
                            alt="NAAC Accredited Grade A+ Seal"
                            className="max-h-48 mx-auto object-contain drop-shadow-md"
                          />
                          <div className="text-xs font-bold text-navy-950">
                            NAAC Accredited with Grade A+
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-7 space-y-4">
                        <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                          <h5 className="font-serif font-bold text-navy-950 text-base">Accreditation Status</h5>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            RVS University has been conferred <strong className="text-navy-950">Grade 'A+'</strong> by NAAC in recognition of supreme quality in curriculum, research infrastructure, and graduate employability.
                          </p>
                          <div className="pt-2 text-xs text-slate-500 font-semibold">
                            Status: Certificate download will be updated soon
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. AAA (Academic and Administrative Audit) */}
                {iqacSubTab === 'aaa' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Audit Framework</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">AAA (Academic and Administrative Audit)</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        Annual structured evaluation of teaching methodologies, laboratory readiness, research output, and administrative efficiency.
                      </p>
                    </div>

                    <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-purple-50 border border-purple-300 flex items-center justify-center mx-auto text-purple-700 shadow-inner">
                        <FileText className="w-8 h-8 text-purple-600" />
                      </div>
                      <div className="max-w-md mx-auto space-y-2">
                        <h4 className="font-serif text-xl font-bold text-navy-950">
                          Will be updated soon
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                          The internal and external AAA audit schedules, peer team reports, and department performance index will be published soon.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. IDP (Institutional Development Plan) */}
                {iqacSubTab === 'idp' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Strategic Vision</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">IDP (Institutional Development Plan)</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        10-Year institutional development blueprint aligned with NEP 2020, sustainable development goals (SDGs), and international research collaborations.
                      </p>
                    </div>

                    <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-300 flex items-center justify-center mx-auto text-teal-700 shadow-inner">
                        <Compass className="w-8 h-8 text-teal-600" />
                      </div>
                      <div className="max-w-md mx-auto space-y-2">
                        <h4 className="font-serif text-xl font-bold text-navy-950">
                          Will be updated soon
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                          The Institutional Development Plan document outlining strategic growth milestones is currently being finalized and will be updated soon.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. Useful Links */}
                {iqacSubTab === 'useful-links' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Regulatory Portals</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">Useful Links</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        Quick access to statutory national portals and accreditation regulatory bodies.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'NAAC National Portal', desc: 'National Assessment and Accreditation Council', url: 'https://naac.gov.in' },
                        { title: 'NBA India', desc: 'National Board of Accreditation', url: 'https://www.nbaind.org' },
                        { title: 'UGC Portal', desc: 'University Grants Commission', url: 'https://www.ugc.gov.in' },
                        { title: 'AICTE New Delhi', desc: 'All India Council for Technical Education', url: 'https://www.aicte-india.org' },
                        { title: 'NIRF India', desc: 'National Institutional Ranking Framework', url: 'https://www.nirfindia.org' },
                        { title: 'APSCHE Portal', desc: 'Andhra Pradesh State Council of Higher Education', url: 'https://apsche.ap.gov.in' },
                      ].map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-2xl bg-slate-50 hover:bg-gold-50/50 border border-slate-200 hover:border-gold-300 transition-all flex items-start justify-between group"
                        >
                          <div>
                            <div className="font-serif font-bold text-navy-950 text-sm group-hover:text-gold-700 flex items-center gap-1.5">
                              <span>{link.title}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold-600" />
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{link.desc}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. Downloads */}
                {iqacSubTab === 'downloads' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Resources & Templates</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">Downloads</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        Download standard IQAC forms, feedback rubrics, course outcome templates, and audit proformas.
                      </p>
                    </div>

                    <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-400/40 flex items-center justify-center mx-auto text-gold-600 shadow-inner">
                        <Download className="w-8 h-8 text-gold-600" />
                      </div>
                      <div className="max-w-md mx-auto space-y-2">
                        <h4 className="font-serif text-xl font-bold text-navy-950">
                          Will be updated soon
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                          All standardized IQAC templates, stakeholder feedback formats, and audit documents are being prepared for public download and will be updated soon.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: CONTACT US */}
        {/* ========================================================================= */}
        {activeMainTab === 'contact-us' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Contact Cards */}
              <div className="lg:col-span-6 space-y-4">
                {/* Phone */}
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500 text-navy-950 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-navy-950 text-base">Phone Numbers</h4>
                    <p className="text-xs text-slate-500 mb-2">Direct campus line & admissions helpdesk</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <a href="tel:+919669660155" className="text-sm font-bold text-navy-950 hover:text-gold-700 transition-colors">
                        +91 9669660155
                      </a>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <a href="tel:+919669660214" className="text-sm font-bold text-navy-950 hover:text-gold-700 transition-colors">
                        +91 9669660214
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-900 text-gold-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-navy-950 text-base">Official Email</h4>
                    <p className="text-xs text-slate-500 mb-2">For admissions, general queries & circulars</p>
                    <a href="mailto:info@rvsu.org" className="text-sm font-bold text-blue-900 hover:text-blue-950 transition-colors">
                      info@rvsu.org
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-navy-950 text-base">Campus Location</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {UNIVERSITY_INFO.address}
                    </p>
                    <div className="text-[11px] text-slate-500 mt-2">
                      Working Hours: Monday – Saturday (9:00 AM – 5:30 PM)
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Interactive Enquiry Card */}
              <div className="lg:col-span-6 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 text-white p-8 rounded-3xl border border-gold-400/30 shadow-xl space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Quick Enquiry</span>
                  <h4 className="font-serif text-2xl font-bold text-white">Have a Question for Us?</h4>
                  <p className="text-xs text-slate-300 font-light">
                    Our admissions & academic counseling team will get back to you immediately.
                  </p>
                </div>

                <form className="space-y-3 text-xs" onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! Our team will contact you shortly.'); }}>
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-750 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="Your phone"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-750 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="Your email"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-750 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Message / Query</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="How can we assist you?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-navy-750 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400 custom-scrollbar"
                    />
                  </div>
                  <Button
                    variant="gold"
                    size="md"
                    type="submit"
                    className="w-full justify-center"
                  >
                    Submit Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
