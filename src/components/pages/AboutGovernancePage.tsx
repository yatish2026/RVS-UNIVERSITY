import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Award, GraduationCap, Building2, 
  Users, FileText, CheckCircle2, ShieldCheck, Landmark, 
  Compass, BookOpen, Phone, Mail, MapPin,
  Sparkles, Target, CheckCircle, ExternalLink, Globe, Layers, Download, Clock
} from 'lucide-react';
import { Button } from '../ui/Button';
import { UNIVERSITY_INFO } from '../../data/universityData';

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
  const [leadershipSubTab, setLeadershipSubTab] = useState<'chancellor' | 'pro-chancellor' | 'vice-chancellor'>('chancellor');
  
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

  const [govSectionTab, setGovSectionTab] = useState<'members' | 'meeting-minutes'>('members');

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
    // Leadership
    if (pageType === 'chancellor' || pageType === 'chairman') setLeadershipSubTab('chancellor');
    if (pageType === 'pro-chancellor' || pageType === 'vice-chairman') setLeadershipSubTab('pro-chancellor');
    if (pageType === 'vice-chancellor') setLeadershipSubTab('vice-chancellor');

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

  // Leadership 3 Executive Leaders
  const leadershipMenuItems = [
    { id: 'chancellor', step: '01', label: 'Chancellor', name: 'Dr. Ravuri Venkataswamy', role: 'Founder & Chancellor' },
    { id: 'pro-chancellor', step: '02', label: 'Pro Chancellor', name: 'Shri R.V. Srinivas', role: 'Pro Chancellor & Vice-Chairman' },
    { id: 'vice-chancellor', step: '03', label: 'Vice Chancellor', name: 'Will be updated soon', role: 'Executive Academic Leadership' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-navy-950">
      {/* 1. Regal Header Banner */}
      <div className="bg-gradient-to-r from-[#0A192F] via-[#102444] to-[#0A192F] text-white pt-28 md:pt-32 pb-10 md:pb-14 border-b border-gold-500/20 shadow-xl">
        <div className="container-custom px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Landmark className="w-3.5 h-3.5 text-gold-400" />
                <span>About RVS University</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                About Us & University Governance
              </h1>
              <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl font-light">
                Explore our legacy of educational excellence since 1998, Chancellor and executive leadership, statutory governance framework, accreditations, and internal quality assurance.
              </p>
            </div>

            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-gold-300 text-xs font-bold border border-gold-400/40 backdrop-blur-md transition-all self-start md:self-auto shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Homepage</span>
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
        {/* TAB 2: REDESIGNED DYNAMIC LEADERSHIP SECTION */}
        {/* ========================================================================= */}
        {activeMainTab === 'leadership' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header & Compact Interactive Switcher */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-300 text-gold-900 text-xs font-bold uppercase tracking-wider mb-1.5">
                    <Users className="w-3.5 h-3.5 text-gold-600" />
                    <span>Executive Academic Leadership</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950">
                    University Leadership
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-normal">
                    Visionary leaders shaping academic rigor, global research excellence, and institutional empowerment.
                  </p>
                </div>

                {/* Compact Leadership Switcher Bar */}
                <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start lg:self-auto">
                  {leadershipMenuItems.map((item) => {
                    const isActive = leadershipSubTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setLeadershipSubTab(item.id as any)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'bg-navy-950 text-gold-300 shadow-md transform scale-102 border border-gold-400/30'
                            : 'text-slate-700 hover:text-navy-950 hover:bg-slate-200/70'
                        }`}
                      >
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${isActive ? 'bg-gold-500/20 text-gold-300 border border-gold-400/40' : 'bg-slate-200 text-slate-600'}`}>
                          {item.step}
                        </span>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Jump & Step Progress Strip */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-navy-950">Active Leader:</span>
                  <span className="text-gold-700 font-bold font-serif">
                    {leadershipSubTab === 'chancellor' ? '1 of 3 • Chancellor' : leadershipSubTab === 'pro-chancellor' ? '2 of 3 • Pro Chancellor' : '3 of 3 • Vice Chancellor'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (leadershipSubTab === 'pro-chancellor') setLeadershipSubTab('chancellor');
                      if (leadershipSubTab === 'vice-chancellor') setLeadershipSubTab('pro-chancellor');
                    }}
                    disabled={leadershipSubTab === 'chancellor'}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-[11px] transition-all"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={() => {
                      if (leadershipSubTab === 'chancellor') setLeadershipSubTab('pro-chancellor');
                      if (leadershipSubTab === 'pro-chancellor') setLeadershipSubTab('vice-chancellor');
                    }}
                    disabled={leadershipSubTab === 'vice-chancellor'}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy-950 hover:bg-navy-900 text-gold-300 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-[11px] transition-all"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Profile View: One Side Picture Landing + Other Side Text Sliding */}
            <div key={leadershipSubTab} className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-200 shadow-xl overflow-hidden">
              
              {/* ========================================================================= */}
              {/* LEADER 1: CHANCELLOR (Dr. Ravuri Venkataswamy) */}
              {/* ========================================================================= */}
              {leadershipSubTab === 'chancellor' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Photo Landing Card */}
                  <div className="lg:col-span-5 space-y-4 animate-leader-pic">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-3 border-gold-400/50 bg-navy-950 group">
                      <img
                        src="/images/chairman.jpg"
                        alt="Dr. Ravuri Venkataswamy, Founder & Chancellor"
                        className="w-full h-[420px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent opacity-80" />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-md border border-gold-400/40 px-3 py-1.5 rounded-full text-gold-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                        <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                        <span>Founder & Chancellor</span>
                      </div>

                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 font-sans">
                          Srinivasa Educational Academy
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                          Dr. Ravuri Venkataswamy
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 font-light italic">
                          “Education for Peace & Global Empowerment”
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs shadow-sm">
                      <div className="flex items-center gap-2 text-gold-800 font-bold">
                        <GraduationCap className="w-4 h-4 text-gold-600" />
                        <span>Honorary Ph.D. in Education</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        Conferred by <strong>Johnson & Wales University, Rhode Island, USA</strong> for seminal contributions to higher education and technical empowerment in India.
                      </p>
                    </div>
                  </div>

                  {/* Biography & Text Sliding Card */}
                  <div className="lg:col-span-7 space-y-6 animate-leader-text">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                        Chancellor's Desk
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
                        Dr. Ravuri Venkataswamy
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-gold-700 mt-0.5">
                        Founder & Chancellor, RVS University & Srinivasa Educational Academy
                      </p>
                      <div className="h-1 w-20 bg-gradient-to-r from-gold-500 to-amber-500 rounded-full mt-3" />
                    </div>

                    <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
                      <p>
                        <strong className="text-navy-950">Dr. R. Venkataswamy</strong>, S/o. late Sri R. Kanakaiah, is a renowned Educationist and Philanthropist. With a keen vision to promote quality higher education in Andhra Pradesh under the noble motto of <em className="text-gold-800 font-serif font-bold">“Education for Peace & Global Empowerment”</em>, he established <strong className="text-navy-950">“Srinivasa Educational Academy”</strong> in the year 1998.
                      </p>
                      <p>
                        He established <strong className="text-navy-950">Sri Venkateswara School of Nursing & Sri Srinivasa MPHW (F) Training Institute in 1986</strong> which is affiliated to Director of Medical Education, Hyderabad and recognized by Indian Nursing Council, New Delhi. In the year 1992 he started <strong className="text-navy-950">Sri R.K.M. Law College</strong>, affiliated to S.V. University, Tirupathi and recognized by Bar Council of India, New Delhi.
                      </p>
                      <p>
                        With this profound experience and dedication to technical excellence, he founded <strong className="text-navy-950">RVS University (formerly SVCET) in 1998</strong>. It is approved by AICTE, New Delhi, accredited by NBA under Tier-I, and conferred Autonomous status. Ranked <strong className="text-gold-800 font-bold">3rd in Andhra Pradesh and 30th in India</strong> by CSR-GHRDC Survey.
                      </p>
                      <p>
                        The university campus spanning <strong className="text-navy-950">65+ Acres of lush green academic infrastructure</strong> is located on R.V.S. Nagar, Chittoor. Johnson & Wales University, Rhode Island, USA conferred an <strong className="text-gold-800 font-bold">Honorary Degree, Doctor of Philosophy – Ph.D. in Education</strong> on him in recognition of his transformative contributions.
                      </p>
                    </div>

                    {/* Bottom Navigation CTA */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-slate-500">
                        Explore next executive leadership profile:
                      </div>
                      <button
                        onClick={() => setLeadershipSubTab('pro-chancellor')}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-navy-950 to-navy-900 text-gold-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-gold-400/40 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                      >
                        <span>Next: Pro Chancellor Shri R.V. Srinivas</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* LEADER 2: PRO CHANCELLOR (Shri R.V. Srinivas, B.Tech., MBA (UK)) */}
              {/* ========================================================================= */}
              {leadershipSubTab === 'pro-chancellor' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Photo Landing Card */}
                  <div className="lg:col-span-5 space-y-4 animate-leader-pic">
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

                    {/* Qualifications Card */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs shadow-sm">
                      <div className="flex items-center gap-2 text-gold-800 font-bold uppercase tracking-wider text-[11px]">
                        <GraduationCap className="w-4 h-4 text-gold-600" />
                        <span>Academic Qualifications</span>
                      </div>
                      <div className="space-y-1.5 text-slate-700">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                          <span><strong>B.Tech (Computer Science & Engineering)</strong> — Jawaharlal Nehru Technological University (JNTU), Hyderabad.</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                          <span><strong>MBA (Finance & Marketing)</strong> — Cardiff Business School, Cardiff University, Wales, United Kingdom (7th Best University in U.K.).</span>
                        </div>
                      </div>
                    </div>

                    {/* Social Initiatives Highlight Box */}
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs shadow-sm">
                      <div className="flex items-center gap-2 text-gold-900 font-bold">
                        <ShieldCheck className="w-4 h-4 text-gold-700" />
                        <span>Philanthropic & Social Initiatives</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        Founder Trustee of <strong>Smt Haarika Memorial Literary and Cultural Association</strong> & Founder of <strong>“Helping Hands”</strong> welfare society.
                      </p>
                    </div>
                  </div>

                  {/* Biography & Text Sliding Card */}
                  <div className="lg:col-span-7 space-y-6 animate-leader-text">
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

                    {/* Executive Bio */}
                    <div className="space-y-3.5 text-slate-700 text-xs sm:text-sm leading-relaxed">
                      <p className="text-sm sm:text-base font-medium text-navy-950 bg-slate-50 p-3.5 rounded-xl border-l-4 border-gold-500">
                        <strong className="text-navy-950">Shri R.V. Srinivas, B.Tech., MBA (UK)</strong> is the Vice-Chairman for Srinivasa Educational Academy and playing a proactive role in the management of following 23 Educational Institutions in various fields of study. He did his MBA from <strong>CARDIFF University, Wales (7th Best University in U.K.)</strong> specializing in Finance and Marketing as Major.
                      </p>
                    </div>

                    {/* State & National Awards Section */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
                        <Award className="w-4 h-4 text-gold-600" />
                        <span>State & National Honors & Awards</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1">
                          <div className="text-[11px] font-bold text-gold-800 flex items-center gap-1.5">
                            <span>🏆 Vijaya-Bhargavi Stage Award</span>
                          </div>
                          <p className="text-[11px] text-slate-700 leading-tight">
                            <strong>“Best Educational Promoter”</strong> received in 1993 at Ravindra Bharathi, Hyderabad (15.07.1993).
                          </p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-1">
                          <div className="text-[11px] font-bold text-blue-900 flex items-center gap-1.5">
                            <span>🌟 Bharat Jyothi Award</span>
                          </div>
                          <p className="text-[11px] text-slate-700 leading-tight">
                            Awarded by International Integrity Peace & Friendship Society (2000) for outstanding achievements.
                          </p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-1">
                          <div className="text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
                            <span>🎬 Prestigious Nandi Award</span>
                          </div>
                          <p className="text-[11px] text-slate-700 leading-tight">
                            Received from Hon'ble Chief Minister of AP (2003) for Best Children’s Film <em>“Little Hearts”</em> (2000–2001).
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Institutional Leadership & Milestones */}
                    <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gold-600" />
                        <span>Institutional Milestones & Global Recognition</span>
                      </h4>
                      <p>
                        Recognizing his leadership, the National Media has consistently ranked the educational institutions under his management among top colleges in India. Under his leadership <strong className="text-navy-950">“Sri Venkateswara College of Engineering & Technology (SVCET)”</strong> became the <strong className="text-gold-800 font-bold">Youngest College in Andhra Pradesh to get NBA Accredited</strong>.
                      </p>
                      <p>
                        The College has made its mark as an Institute of Excellence across the World. More than <strong className="text-navy-950">280 foreign students</strong> from various countries including Malaysia, Sudan, Tanzania, UAE, Kuwait, Nepal, Bhutan, Sri Lanka etc., are pursuing their courses in group institutions. Helped <strong className="text-navy-950">Royal Government of Bhutan</strong> in Nursing Education by providing Scholarships for Meritorious students from Kingdom of Bhutan.
                      </p>
                      <p>
                        The college has been accredited by <strong className="text-navy-950">National Assessment and Accreditation Council (NAAC), Bangalore</strong> and accredited by <strong className="text-navy-950">NBA Under Tier-I, New Delhi</strong>.
                      </p>
                      <p>
                        The college has been granted <strong className="text-navy-950">Autonomous status by the UGC</strong> from the Academic Year 2011-12. The college has been recognized under <strong className="text-navy-950">12(B) and 2(F)</strong> and is deemed fit to receive assistance from the central government. The College has become a preferred destination for top companies in India; some of the top companies recruited from the campus include <strong className="text-navy-950">Infosys, Wipro, Accenture, CSC, KPIT Cummins, Robert Bosch, and Mahindra Satyam</strong>.
                      </p>
                    </div>

                    {/* Social Interest Section */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold-600" />
                        <span>Social Interest & Philanthropic Impact</span>
                      </h4>
                      <p className="text-slate-700 text-xs leading-relaxed">
                        A Public Charitable Trust has been instituted under the name <strong className="text-navy-950">Smt Haarika Memorial Literary and Cultural Association</strong> with a view to creating and providing assistance to educational, cultural, and charitable causes. The Foundation also aims at assisting projects in such fields as environmental protection, community health, poverty alleviation, consumer interests, civil liberties, and human rights.
                      </p>
                      <p className="text-slate-700 text-xs leading-relaxed">
                        Is instrumental in starting <strong className="text-navy-950">“Helping Hands”</strong>, an organization of like-minded individuals organizing various welfare initiatives including Blood Donation Camps, Eye Camps, Organizing Relief Camps etc., and Providing Free Scholarships for International Students from across the SAARC Countries.
                      </p>
                    </div>

                    {/* 23 Group Institutions Directory */}
                    <div className="pt-2">
                      <h4 className="font-serif text-sm font-bold text-navy-950 mb-2.5 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gold-600" />
                        <span>23 Group Institutions under Srinivasa Educational Academy</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-2 custom-scrollbar">
                        {groupInstitutions.map((inst, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
                            <div className="font-bold text-navy-950">{idx + 1}. {inst.name}</div>
                            <div className="text-slate-500 mt-0.5">{inst.location} • {inst.courses}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Navigation CTA */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        onClick={() => setLeadershipSubTab('chancellor')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Prev: Chancellor</span>
                      </button>

                      <button
                        onClick={() => setLeadershipSubTab('vice-chancellor')}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-navy-950 to-navy-900 text-gold-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-gold-400/40 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                      >
                        <span>Next: Vice Chancellor</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* LEADER 3: VICE CHANCELLOR (Will be updated soon) */}
              {/* ========================================================================= */}
              {leadershipSubTab === 'vice-chancellor' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-5 animate-leader-pic">
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

                    <div className="lg:col-span-7 space-y-5 animate-leader-text">
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

                      {/* Bottom Navigation CTA */}
                      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                          onClick={() => setLeadershipSubTab('pro-chancellor')}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Prev: Pro Chancellor</span>
                        </button>

                        <button
                          onClick={() => setLeadershipSubTab('chancellor')}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-navy-950 to-navy-900 text-gold-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-gold-400/40 shadow-md hover:shadow-lg transition-all cursor-pointer"
                        >
                          <span>Back to Chancellor ↺</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: GOVERNANCE WITH MEMBERS & MEETING MINUTES SUBSECTIONS */}
        {/* ========================================================================= */}
        {activeMainTab === 'governance' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Description */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-300 text-gold-900 text-xs font-bold uppercase tracking-wider mb-1.5">
                    <Landmark className="w-3.5 h-3.5 text-gold-600" />
                    <span>Statutory Framework & Authorities</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950">
                    University Governance
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 font-normal">
                    Apex statutory bodies, executive management boards, and academic councils established under the Andhra Pradesh Private Universities Act.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-50 border border-gold-300 text-gold-900 text-xs font-bold self-start md:self-auto">
                  <ShieldCheck className="w-4 h-4 text-gold-600" />
                  <span>9 Statutory Bodies</span>
                </div>
              </div>
            </div>

            {/* 2-Column Layout: Left Side Menu Bar + Right Detail View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Side Menu Bar with Expandable Submenus */}
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
                      <div key={item.id} className="space-y-1">
                        <button
                          onClick={() => {
                            setGovernanceSubTab(item.id as any);
                          }}
                          className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
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
                          <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? 'text-gold-400 rotate-90' : 'text-slate-400 group-hover:translate-x-0.5'}`} />
                        </button>

                        {/* Nested Sub-Menu: Members & Meeting Minutes */}
                        {isActive && (
                          <div className="pl-3 pr-2 py-1.5 space-y-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 animate-fadeIn ml-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setGovSectionTab('members');
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                                govSectionTab === 'members'
                                  ? 'bg-navy-950 text-gold-300 font-bold shadow-sm'
                                  : 'text-slate-700 hover:text-navy-950 hover:bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`text-[13px] ${govSectionTab === 'members' ? 'text-gold-400' : 'text-slate-400'}`}>▸</span>
                                <span>Members</span>
                              </div>
                              <Users className="w-3.5 h-3.5 opacity-70" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setGovSectionTab('meeting-minutes');
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                                govSectionTab === 'meeting-minutes'
                                  ? 'bg-navy-950 text-gold-300 font-bold shadow-sm'
                                  : 'text-slate-700 hover:text-navy-950 hover:bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`text-[13px] ${govSectionTab === 'meeting-minutes' ? 'text-gold-400' : 'text-slate-400'}`}>▸</span>
                                <span>Meeting Minutes</span>
                              </div>
                              <FileText className="w-3.5 h-3.5 opacity-70" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Content Area: Interactive Members & Meeting Minutes Display */}
              <div className="lg:col-span-8 space-y-6">
                {governanceMenuItems.map((item) => {
                  if (governanceSubTab !== item.id) return null;

                  // Member Data Mapping based on Statutory Body
                  const membersData = 
                    item.id === 'governing-body' ? [
                      { sNo: 1, name: 'Dr. Ravuri Venkataswamy', designation: 'Founder & Chancellor, RVS University', role: 'Chairperson', category: 'Statutory Officer' },
                      { sNo: 2, name: 'Shri R.V. Srinivas', designation: 'Pro Chancellor, RVS University & Vice-Chairman, SEA', role: 'Member', category: 'Sponsoring Body' },
                      { sNo: 3, name: 'Vice Chancellor', designation: 'Chief Academic & Executive Officer, RVS University', role: 'Member', category: 'Ex-Officio' },
                      { sNo: 4, name: 'Nominee of Sponsoring Body', designation: 'Srinivasa Educational Academy (Est. 1998)', role: 'Member', category: 'Sponsoring Society' },
                      { sNo: 5, name: 'Nominee of the Govt. of Andhra Pradesh', designation: 'Department of Higher Education, Govt. of AP', role: 'Ex-Officio Member', category: 'State Government' },
                      { sNo: 6, name: 'Eminent Educationist Nominee', designation: 'Senior Academic Leader (Nominated by Chancellor)', role: 'Member', category: 'Academic Nominee' },
                      { sNo: 7, name: 'Eminent Industrialist / Tech Leader', designation: 'Corporate Technology Director (Nominated by Chancellor)', role: 'Member', category: 'Industry Nominee' },
                      { sNo: 8, name: 'Registrar, RVS University', designation: 'Principal Secretary to the University', role: 'Member Secretary', category: 'Statutory Officer' },
                    ] : item.id === 'board-of-management' ? [
                      { sNo: 1, name: 'Vice Chancellor', designation: 'Chief Executive & Academic Head, RVS University', role: 'Chairperson', category: 'Ex-Officio' },
                      { sNo: 2, name: 'Shri R.V. Srinivas', designation: 'Pro Chancellor & Sponsoring Body Representative', role: 'Member', category: 'Sponsoring Society' },
                      { sNo: 3, name: 'Dean, School of Computer Science & Eng. (SCSE)', designation: 'Academic Leadership, SCSE', role: 'Member', category: 'Dean of School' },
                      { sNo: 4, name: 'Dean, School of Engineering & Technology (SOET)', designation: 'Academic Leadership, SOET', role: 'Member', category: 'Dean of School' },
                      { sNo: 5, name: 'Dean, School of AI & Data Science (SAID)', designation: 'Academic Leadership, SAID', role: 'Member', category: 'Dean of School' },
                      { sNo: 6, name: 'Dean, School of Management Studies (SOMS)', designation: 'Academic Leadership, SOMS', role: 'Member', category: 'Dean of School' },
                      { sNo: 7, name: 'Dean, School of Allied Health Sciences (SAHS)', designation: 'Clinical & Academic Head, SAHS', role: 'Member', category: 'Dean of School' },
                      { sNo: 8, name: 'Two Senior University Professors', designation: 'Distinguished Faculty Cadre', role: 'Members', category: 'Faculty Representatives' },
                      { sNo: 9, name: 'Finance Officer, RVS University', designation: 'Head of Finance & Accounts', role: 'Permanent Invitee', category: 'Finance' },
                      { sNo: 10, name: 'Controller of Examinations (COE)', designation: 'Autonomous Evaluation Head', role: 'Permanent Invitee', category: 'Examination Cell' },
                      { sNo: 11, name: 'Registrar, RVS University', designation: 'Principal Administrative Officer', role: 'Member Secretary', category: 'Ex-Officio' },
                    ] : item.id === 'academic-council' ? [
                      { sNo: 1, name: 'Vice Chancellor', designation: 'Chief Academic Officer, RVS University', role: 'Chairperson', category: 'Ex-Officio' },
                      { sNo: 2, name: 'Deans of All Academic Schools', designation: 'SOET, SCSE, SAID, SCIS, SOMS, SAHS', role: 'Members', category: 'Academic Deans' },
                      { sNo: 3, name: 'Heads of Academic Departments (HODs)', designation: 'All Departmental Academic Leaders', role: 'Members', category: 'Department Heads' },
                      { sNo: 4, name: 'Eminent Academic Expert 1', designation: 'Senior Professor, Premier IIT / NIT', role: 'External Member', category: 'Academic Nominee' },
                      { sNo: 5, name: 'Eminent Academic Expert 2', designation: 'Senior Professor, Central / State University', role: 'External Member', category: 'Academic Nominee' },
                      { sNo: 6, name: 'Eminent Industry Expert 1', designation: 'Vice President - Engineering, Tech Enterprise', role: 'External Member', category: 'Industry Nominee' },
                      { sNo: 7, name: 'Eminent Industry Expert 2', designation: 'Principal AI Architect, Global R&D Hub', role: 'External Member', category: 'Industry Nominee' },
                      { sNo: 8, name: 'Controller of Examinations (COE)', designation: 'Head of Autonomous Examination Wing', role: 'Member', category: 'Evaluation Head' },
                      { sNo: 9, name: 'Director of Research & Development', designation: 'Head of Directorate of Research', role: 'Member', category: 'Research Head' },
                      { sNo: 10, name: 'Registrar, RVS University', designation: 'Principal Administrative Officer', role: 'Member Secretary', category: 'Ex-Officio' },
                    ] : [
                      { sNo: 1, name: 'Chancellor / Vice Chancellor', designation: 'Executive Academic Leadership', role: 'Chairperson', category: 'Ex-Officio' },
                      { sNo: 2, name: 'Statutory Nominees & Deans', designation: 'Senior Academic & Administrative Officers', role: 'Members', category: 'Statutory' },
                      { sNo: 3, name: 'External Domain Experts', designation: 'Subject Specialists & Industry Advisors', role: 'Members', category: 'Advisory' },
                      { sNo: 4, name: 'Registrar / Nodal Officer', designation: 'Secretariat & Administration', role: 'Member Secretary', category: 'Administration' },
                    ];

                  // Meeting Minutes Data Mapping based on Statutory Body
                  const meetingMinutesData = 
                    item.id === 'governing-body' ? [
                      {
                        meetingNo: '3rd Statutory Governing Body Meeting',
                        date: '15 July 2026',
                        refNo: 'RVSU/GB/2026/03',
                        agenda: 'Admissions Matrix 2026–27 (4,579 Seats across 49 Programs) & Global Academic MoUs',
                        resolutions: [
                          'Approved approved intake allocations across 6 academic schools for Academic Year 2026–27.',
                          'Ratified international student fellowship quotas for SAARC and global partner universities.',
                          'Approved capital allocations for smart campus high-speed fiber upgrades and high-performance GPU AI lab.',
                        ],
                        status: 'Approved & Gazetted'
                      },
                      {
                        meetingNo: '2nd Statutory Governing Body Meeting',
                        date: '22 February 2026',
                        refNo: 'RVSU/GB/2026/02',
                        agenda: 'Annual Budget 2026–27, ATAL IDEA Lab Expansion & NEP 2020 Curricular Framework',
                        resolutions: [
                          'Adopted institutional annual financial estimates and audited revenue expenditure statements.',
                          'Sanctioned Rs. 1.2 Crore research seed funding for faculty patent filing and product incubation.',
                          'Approved the establishment of the School of AI & Data Science (SAID) dedicated research facility.',
                        ],
                        status: 'Approved'
                      },
                      {
                        meetingNo: '1st Statutory Governing Body Meeting',
                        date: '18 October 2025',
                        refNo: 'RVSU/GB/2025/01',
                        agenda: 'University Charter Approval, Statutory Regulations & 10-Year Strategic Development Plan',
                        resolutions: [
                          'Adopted University Charter and statutory governance regulations under AP Private Universities Act.',
                          'Constituted Board of Management, Academic Council, and Finance Committee.',
                          'Endorsed Institutional Development Plan (IDP 2026–2035) for NAAC A+ and global accreditations.',
                        ],
                        status: 'Approved & Gazetted'
                      }
                    ] : item.id === 'board-of-management' ? [
                      {
                        meetingNo: '3rd Board of Management Meeting',
                        date: '08 August 2026',
                        refNo: 'RVSU/BOM/2026/03',
                        agenda: 'Sponsored Research Grants, Central Library RFID Automation & Sports Infrastructure',
                        resolutions: [
                          'Sanctioned automated RFID kiosk integration and 85,000+ digital repository access for Central Digital Library.',
                          'Ratified faculty research incentives and funded international conference travel grants.',
                          'Approved construction tenders for indoor sports pavilion and hostel recreation hubs.',
                        ],
                        status: 'Approved'
                      },
                      {
                        meetingNo: '2nd Board of Management Meeting',
                        date: '12 March 2026',
                        refNo: 'RVSU/BOM/2026/02',
                        agenda: 'Campus Placement Strategy (250+ Recruiters), Exam Protocols & Campus Safety',
                        resolutions: [
                          'Approved corporate recruitment MoUs with Infosys, Wipro, Accenture, Bosch, and Tech Mahindra.',
                          'Mandated 24/7 CCTV smart campus surveillance and emergency ambulance medical protocol.',
                          'Approved autonomous examination confidentiality rules and barcode evaluation protocols.',
                        ],
                        status: 'Approved'
                      },
                      {
                        meetingNo: '1st Board of Management Meeting',
                        date: '05 November 2025',
                        refNo: 'RVSU/BOM/2025/01',
                        agenda: 'Faculty Cadre Recruitment Matrix, Laboratory Upgrades & Departmental Budgets',
                        resolutions: [
                          'Approved Professor, Associate Professor, and Assistant Professor sanctioned cadre ratios.',
                          'Sanctioned specialized laboratory equipment for VLSI Chip Design, Robotics, and Cyber SOC labs.',
                          'Established student grievance cell and women protection internal complaints committee.',
                        ],
                        status: 'Approved'
                      }
                    ] : item.id === 'academic-council' ? [
                      {
                        meetingNo: '3rd Academic Council Meeting',
                        date: '20 August 2026',
                        refNo: 'RVSU/AC/2026/03',
                        agenda: 'Academic Calendar 2026–27, CIA Continuous Assessment & Skill Matrix',
                        resolutions: [
                          'Notified unified academic calendar with 90 instructional working days per semester.',
                          'Approved credit distribution for 6-month mandatory capstone industry internships.',
                          'Ratified minor and honors degree eligibility cutoffs across computing and engineering disciplines.',
                        ],
                        status: 'Approved'
                      },
                      {
                        meetingNo: '2nd Academic Council Meeting',
                        date: '19 April 2026',
                        refNo: 'RVSU/AC/2026/02',
                        agenda: 'Ratification of Syllabi for 49 Programmes recommended by Board of Studies (BOS)',
                        resolutions: [
                          'Approved updated curriculum incorporating Generative AI, Quantum Computing, and EV Powertrains.',
                          'Approved value-added certification courses in Cloud DevOps, Cyber Forensics, and Bio-Analytics.',
                          'Endorsed examination moderation panel comprising senior academicians from IITs/NITs.',
                        ],
                        status: 'Approved'
                      },
                      {
                        meetingNo: '1st Academic Council Meeting',
                        date: '28 November 2025',
                        refNo: 'RVSU/AC/2025/01',
                        agenda: 'Adoption of NEP 2020 Choice-Based Credit System (CBCS) & Academic Regulations',
                        resolutions: [
                          'Approved standard academic regulations, grading rubrics, and SGPA/CGPA evaluation guidelines.',
                          'Established Departmental Boards of Studies (BOS) across all 6 constituent academic schools.',
                          'Ratified interdisciplinary open elective pools for undergraduate and postgraduate programs.',
                        ],
                        status: 'Approved'
                      }
                    ] : [
                      {
                        meetingNo: `1st Statutory Meeting — ${item.label}`,
                        date: '2026 Regular Proceedings',
                        refNo: `RVSU/${item.id.toUpperCase().substring(0, 4)}/2026/01`,
                        agenda: `Statutory Review & Charter Execution for ${item.label}`,
                        resolutions: [
                          'Approved committee objectives, quality parameters, and review schedules.',
                          'Ratified operational guidelines and departmental integration charter.',
                          'Scheduled statutory quarterly review proceedings.',
                        ],
                        status: 'Approved'
                      }
                    ];

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

                        {/* Top Pill Sub-Switcher */}
                        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start sm:self-auto">
                          <button
                            onClick={() => setGovSectionTab('members')}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              govSectionTab === 'members'
                                ? 'bg-navy-950 text-gold-300 shadow-md border border-gold-400/30'
                                : 'text-slate-600 hover:text-navy-950 hover:bg-slate-200'
                            }`}
                          >
                            <Users className="w-3.5 h-3.5" />
                            <span>Members</span>
                          </button>

                          <button
                            onClick={() => setGovSectionTab('meeting-minutes')}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              govSectionTab === 'meeting-minutes'
                                ? 'bg-navy-950 text-gold-300 shadow-md border border-gold-400/30'
                                : 'text-slate-600 hover:text-navy-950 hover:bg-slate-200'
                            }`}
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Meeting Minutes</span>
                          </button>
                        </div>
                      </div>

                      {/* SUBSECTION 1: MEMBERS */}
                      {govSectionTab === 'members' && (
                        <div className="space-y-6 animate-fadeIn">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h4 className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
                                <Users className="w-4 h-4 text-gold-600" />
                                <span>Official Constitution & Committee Members</span>
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Statutory composition constituted under the Andhra Pradesh Private Universities Act.
                              </p>
                            </div>
                            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
                              Active Statutory Tenure
                            </span>
                          </div>

                          {/* Members Table */}
                          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm custom-scrollbar">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="bg-navy-950 text-gold-300 border-b border-navy-800">
                                  <th className="py-3 px-3.5 font-bold uppercase tracking-wider w-12 text-center">#</th>
                                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Member Name</th>
                                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Designation / Affiliation</th>
                                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Role in Committee</th>
                                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Category</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200 bg-white">
                                {membersData.map((m) => (
                                  <tr key={m.sNo} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="py-3 px-3.5 font-mono text-center font-bold text-slate-400">{m.sNo}</td>
                                    <td className="py-3 px-4 font-bold text-navy-950 text-xs sm:text-sm">{m.name}</td>
                                    <td className="py-3 px-4 text-slate-600">{m.designation}</td>
                                    <td className="py-3 px-4">
                                      <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                                        m.role === 'Chairperson'
                                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                          : m.role === 'Member Secretary'
                                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                          : 'bg-slate-100 text-slate-700'
                                      }`}>
                                        {m.role}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4 text-slate-500 font-medium">{m.category}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* SUBSECTION 2: MEETING MINUTES */}
                      {govSectionTab === 'meeting-minutes' && (
                        <div className="space-y-6 animate-fadeIn">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <h4 className="font-serif text-lg font-bold text-navy-950 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gold-600" />
                                <span>Statutory Meeting Proceedings & Minutes</span>
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Chronological record of proceedings, agendas, resolutions, and gazette notifications.
                              </p>
                            </div>
                            <span className="text-[11px] font-semibold text-gold-800 bg-gold-50 px-3 py-1 rounded-full border border-gold-300 self-start sm:self-auto">
                              Official Secretarial Records
                            </span>
                          </div>

                          {/* Meeting Minutes Cards */}
                          <div className="space-y-4">
                            {meetingMinutesData.map((meeting, idx) => (
                              <div
                                key={idx}
                                className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-gold-300 hover:shadow-md transition-all space-y-3"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                                  <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 font-mono">
                                      Ref: {meeting.refNo}
                                    </span>
                                    <h5 className="font-serif text-base font-bold text-navy-950 mt-0.5">
                                      {meeting.meetingNo}
                                    </h5>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1.5">
                                      <Clock className="w-3.5 h-3.5 text-gold-600" />
                                      <span>{meeting.date}</span>
                                    </span>
                                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200">
                                      {meeting.status}
                                    </span>
                                  </div>
                                </div>

                                <div className="text-xs text-slate-700 space-y-2">
                                  <div>
                                    <strong className="text-navy-950 font-bold">Key Agenda: </strong>
                                    <span>{meeting.agenda}</span>
                                  </div>

                                  <div className="space-y-1.5 pt-1">
                                    <strong className="text-navy-950 font-bold block">Key Resolutions & Approvals:</strong>
                                    <ul className="space-y-1 pl-1">
                                      {meeting.resolutions.map((res, rIdx) => (
                                        <li key={rIdx} className="flex items-start gap-2">
                                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                                          <span className="leading-relaxed">{res}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Statutory Secretarial Contact Note */}
                      <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3 text-xs text-slate-700">
                        <Landmark className="w-4 h-4 text-gold-700 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-navy-950">Statutory Notice:</strong> Certified copies of statutory committee proceedings, gazette extracts, or council agendas can be requested through the <strong className="text-navy-950">Office of the Registrar</strong> at <a href="mailto:info@rvsu.org" className="text-gold-800 font-bold underline hover:text-gold-900">info@rvsu.org</a> or helpline <a href="tel:+919669660155" className="text-gold-800 font-bold hover:text-gold-900">+91 9669660155</a>.
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
                  Return to Homepage
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: RANKING AND ACCREDITATION (WITH 5 OFFICIAL SEALS & BADGES) */}
        {/* ========================================================================= */}
        {activeMainTab === 'ranking-accreditation' && (
          <div className="space-y-10 animate-fadeIn">
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                    Quality Recognitions & Statutory Accreditations
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-extrabold text-navy-950 mt-1">
                    Ranking and Accreditation
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-2xl font-normal">
                    RVS University upholds the highest statutory benchmarks in engineering, pharmaceutical, management, and multidisciplinary education with national and state recognitions.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-300 text-gold-900 text-xs font-bold shadow-sm">
                  <Award className="w-4 h-4 text-gold-600" />
                  <span>NAAC Grade A+ & NBA Tier-I</span>
                </div>
              </div>
            </div>

            {/* Official Statutory Seals & Emblems Showcase Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-xl md:text-2xl font-bold text-navy-950">
                    Statutory Seals & Accreditation Badges
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official recognitions by Government of India, Government of Andhra Pradesh, NAAC, NBA, and JNTUA.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                    Internal Quality Assurance Cell
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950 mt-1">
                    IQAC Cell & Quality Framework
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 font-normal">
                    Nodal center for institutional quality enhancement, NAAC/NBA accreditations, curriculum audits, and stakeholder feedback.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Quality Assurance</span>
                </div>
              </div>
            </div>

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

              {/* Right Content Area */}
              <div className="lg:col-span-8 space-y-6">
                {/* 1. About IQAC */}
                {iqacSubTab === 'about-iqac' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Overview</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">About IQAC</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        In pursuance of National Assessment and Accreditation Council (NAAC) guidelines, the Internal Quality Assurance Cell (IQAC) of RVS University steers continuous enhancement in academic and administrative performance.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2">
                        <div className="font-serif font-bold text-navy-950 text-base flex items-center gap-2">
                          <Target className="w-4 h-4 text-gold-700" />
                          <span>Vision of IQAC</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          To establish quality benchmarks in academic, research, and governance systems, fostering holistic student empowerment.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-2">
                        <div className="font-serif font-bold text-navy-950 text-base flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-700" />
                          <span>Core Mission</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          Developing catalytic mechanisms for continuous teaching-learning innovation, outcome-based audits, and stakeholder collaboration.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h5 className="font-serif font-bold text-navy-950 text-base">Key Functions of IQAC</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>Setting quality parameters for academic activities</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>Conducting Annual Quality Audits (AAA)</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>Facilitating learner-centric educational environment</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>Compiling Annual Quality Assurance Reports (AQAR)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Members and Committee */}
                {iqacSubTab === 'members-committee' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">IQAC Governance</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">Members and Committee</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        Composition of the Internal Quality Assurance Cell comprising university leadership, senior faculty, administrative heads, industry experts, and student representatives.
                      </p>
                    </div>

                    <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center mx-auto text-gold-700 shadow-inner">
                        <Users className="w-8 h-8 text-gold-600" />
                      </div>
                      <div className="max-w-md mx-auto space-y-2">
                        <h4 className="font-serif text-xl font-bold text-navy-950">
                          Will be updated soon
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                          The updated list of IQAC Committee Members and department coordinators is currently under constitution and will be published shortly.
                        </p>
                      </div>
                      <span className="inline-block px-3.5 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-semibold">
                        Reconstitution in progress
                      </span>
                    </div>
                  </div>
                )}

                {/* 3. Meeting Minutes */}
                {iqacSubTab === 'meeting-minutes' && (
                  <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6 animate-fadeIn">
                    <div className="border-b border-slate-200 pb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Official Proceedings</span>
                      <h4 className="font-serif text-2xl md:text-3xl font-bold text-navy-950 mt-1">Meeting Minutes</h4>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">
                        Official proceedings, resolutions, and Action Taken Reports (ATR) from quarterly IQAC meetings.
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
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                  Official Communication & Helplines
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950 mt-1">
                  Contact Us
                </h3>
                <p className="text-xs md:text-sm text-slate-600 mt-1 font-normal">
                  Connect with RVS University campus, admissions helpline, international relations, or student affairs.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
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
          </div>
        )}

      </div>
    </div>
  );
};
