import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, ArrowRight, Award, GraduationCap, Building2, 
  Users, FileText, CheckCircle2, ShieldCheck, Landmark, 
  Compass, HeartHandshake, BookOpen, Clock, Phone, Mail, MapPin,
  Sparkles, Star, Target, CheckCircle, ExternalLink, Globe, Layers, UserCheck
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
  // Legacy aliases
  | 'chairman' 
  | 'vice-chairman' 
  | 'principal' 
  | 'governing-body' 
  | 'academic-council' 
  | 'finance' 
  | 'admin-chart';

interface AboutGovernancePageProps {
  pageType: AboutPageType;
  onBackToHome: () => void;
}

export const AboutGovernancePage: React.FC<AboutGovernancePageProps> = ({
  pageType,
  onBackToHome,
}) => {
  const [leadershipSubTab, setLeadershipSubTab] = useState<'chairman' | 'vice-chairman' | 'principal'>('chairman');
  const [governanceSubTab, setGovernanceSubTab] = useState<'governing-body' | 'academic-council' | 'finance'>('governing-body');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageType]);

  // Set sub-tabs if a direct legacy URL hash was accessed
  useEffect(() => {
    if (pageType === 'chairman') setLeadershipSubTab('chairman');
    if (pageType === 'vice-chairman') setLeadershipSubTab('vice-chairman');
    if (pageType === 'principal') setLeadershipSubTab('principal');
    if (pageType === 'governing-body') setGovernanceSubTab('governing-body');
    if (pageType === 'academic-council') setGovernanceSubTab('academic-council');
    if (pageType === 'finance') setGovernanceSubTab('finance');
  }, [pageType]);

  // Normalize pageType to one of the 7 main categories
  const activeMainTab: 'overview' | 'leadership' | 'governance' | 'administration' | 'ranking-accreditation' | 'iqac' | 'contact-us' = 
    pageType === 'chairman' || pageType === 'vice-chairman' || pageType === 'principal' ? 'leadership'
    : pageType === 'governing-body' || pageType === 'academic-council' || pageType === 'finance' ? 'governance'
    : pageType === 'admin-chart' ? 'administration'
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

  // Governing Body 12 Members
  const governingBodyMembers = [
    { sno: 1, name: 'Dr. R. Venkataswamy, Chairman, RVS University, R.V.S. Nagar, Chittoor', category: 'Management', designation: 'Chairman' },
    { sno: 2, name: 'Sri. R.V. Srinivas, Vice Chairman, RVS University, R.V.S. Nagar, Chittoor', category: 'Management', designation: 'Member' },
    { sno: 3, name: 'Smt. R. Allikeswari, Member, Srinivasa Educational Academy, R.V.S. Nagar, Chittoor', category: 'Management', designation: 'Member' },
    { sno: 4, name: 'Dr. R. Shalini, Member, Srinivasa Educational Academy, R.V.S. Nagar, Chittoor', category: 'Management', designation: 'Member' },
    { sno: 5, name: 'Dr. R. Madhuri Gandhi, Member, Srinivasa Educational Academy, R. V. S. Nagar, Chittoor', category: 'Management', designation: 'Member' },
    { sno: 6, name: 'Dr. E. Lokanadha Reddy, Vice Principal & Dean, Evaluation, RVS University, R. V. S. Nagar, Chittoor', category: 'Faculty nominated by the Principal', designation: 'Member' },
    { sno: 7, name: 'Dr. Y. N. Vijaya Kumar, Head, Electrical and Electronics Engineering Department, RVS University, Chittoor', category: 'Faculty nominated by the Principal', designation: 'Member' },
    { sno: 8, name: 'Prof. V. Sumalatha, Professor, Department of ECE, JNTUA College of Engineering, Ananthapuramu – 515002', category: 'AP State Govt. Nominee', designation: 'Member' },
    { sno: 9, name: 'Prof. S. Krishnaiah, Professor of Civil Engineering & Registrar, JNT University Anantapur, Ananthapuramu - 515002', category: 'JNT University Nominee', designation: 'Member' },
    { sno: 10, name: 'Dr. M. Muralidhar, Former Director, RVS University, R.V.S. Nagar, Chittoor', category: 'Special Invitee', designation: 'Member' },
    { sno: 11, name: 'Prof. Dandu Shiva Rama Raju, Professor & Director, Kansas State University Bulk Solids Innovation Center, Salina, KS 67401', category: 'Special Invitee', designation: 'Member' },
    { sno: 12, name: 'Dr. M. Mohan Babu, Principal, RVS University, R.V.S. Nagar, Chittoor', category: 'Principal', designation: 'Member Secretary' },
  ];

  // Academic Council Categorized Sections (34 Members across 7 Statutory Categories)
  const academicCouncilSections = [
    {
      id: 'chairman',
      categoryNumber: '1',
      categoryTitle: 'Head of the Institution / Chairman',
      badge: 'Chairman',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'Presiding Officer and Chief Academic Administrator of the University Academic Council.',
      members: [
        { sno: 1, name: 'Dr. M. Mohan Babu, Principal, RVS University, Chittoor', category: 'Principal / Head of Institution', designation: 'Chairman', contact: 'info@rvsu.org' },
      ],
    },
    {
      id: 'heads-of-departments',
      categoryNumber: '2',
      categoryTitle: 'All the Heads of the Departments',
      badge: '12 Department Heads',
      badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
      description: 'Departmental leadership representing Engineering disciplines, Computer Applications, Management Studies, and Basic Sciences.',
      members: [
        { sno: 2, name: 'Dr. B. Damodhara Reddy, Head, Civil Engineering Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodce@rvsu.org' },
        { sno: 3, name: 'Dr. Y.N. Vijaya Kumar, Head, Electrical and Electronics Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodeee@rvsu.org' },
        { sno: 4, name: 'Dr. S. Arun Saco, Head, Mechanical Engineering Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodme@rvsu.org' },
        { sno: 5, name: 'Dr. D. Srihari, Head, Electronics and Communication Engineering Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodece@rvsu.org' },
        { sno: 6, name: 'Ms. P. Jyotheeswari, Head, Computer Science and Engineering Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodcse@rvsu.org' },
        { sno: 7, name: 'Dr. M. Lavanya, Head, Computer Science and Engineering (AI&ML) Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodcsm@rvsu.org' },
        { sno: 8, name: 'Mrs. Kokila, Head, Computer Science and Engineering (DS) Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodcsd@rvsu.org' },
        { sno: 9, name: 'Dr. J. Velmurugan, Head, Information Technology Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodit@rvsu.org' },
        { sno: 10, name: 'Dr. Hamsaveni, Head, Master of Computer Applications Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodmca@rvsu.org' },
        { sno: 11, name: 'Dr. N. Giri Babu, Head, Master of Business Administration Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodmba@rvsu.org' },
        { sno: 12, name: 'Dr. K. Komala, Head, Humanities and Sciences Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodhas@rvsu.org' },
        { sno: 13, name: 'Dr. P. Gopi Krishna, Associate Head, Humanities and Sciences Department, RVS University, Chittoor', category: 'Head of the Dept.', designation: 'Member', contact: 'hodhas2@rvsu.org' },
      ],
    },
    {
      id: 'nominated-faculty',
      categoryNumber: '3',
      categoryTitle: 'Four Faculty Members Nominated by the Principal',
      badge: '4 Faculty Nominees',
      badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      description: 'Senior professors and institutional deans representing interdisciplinary teaching, examination, and research wings.',
      members: [
        { sno: 14, name: 'Dr. T. Raja Reddy, Dean I&E, RVS University, Chittoor', category: 'Nominated by the Principal', designation: 'Member', contact: 'deanie@rvsu.org' },
        { sno: 15, name: 'Dr. A. Mahamani, Professor, Mechanical Engineering Department, RVS University, Chittoor', category: 'Nominated by the Principal', designation: 'Member', contact: 'research@rvsu.org' },
        { sno: 16, name: 'Dr. C. K. Selvi, Associate Professor, Humanities and Sciences Department, RVS University, Chittoor', category: 'Nominated by the Principal', designation: 'Member', contact: 'info@rvsu.org' },
        { sno: 17, name: 'Dr. C. Uma Maheswari, Controller of Examinations, Mechanical Department, RVS University, Chittoor', category: 'Nominated by the Principal', designation: 'Member', contact: 'ce@rvsu.org' },
      ],
    },
    {
      id: 'governing-body-experts',
      categoryNumber: '4',
      categoryTitle: 'Experts from Outside the College Nominated by the Governing Body',
      badge: '7 External Experts',
      badgeColor: 'bg-purple-50 text-purple-900 border-purple-200',
      description: 'Distinguished leaders representing international universities, Fortune 500 tech corporations, national research labs (NARL), and public sector undertakings (BHEL).',
      members: [
        { sno: 18, name: 'Prof. Dandu Sivarama Raju, Professor & Director, Kansas State University Bulk Solids Innovation Center, Salina.KS 67401', category: 'GB Nominee representing Education', designation: 'Member', contact: 'rdandu@ksu.edu' },
        { sno: 19, name: 'Mr. Ajit Kumar Koppali, Chairman, VDM India on the move, Bangalore', category: 'GB Nominee representing Education', designation: 'Member', contact: 'acharyavdmajit@gmail.com' },
        { sno: 20, name: 'Mr. Sreenivasa Ramanujam. K, Head – Trainee Engagement & Academic Relations, AWS Cloud Unit, TCS Bangalore', category: 'GB Nominee representing Industry', designation: 'Member', contact: 'sreenivasa.ramanujam@tcs.com' },
        { sno: 21, name: 'Dr. K. Mallikharjuna Babu, Vice-Chancellor, Galgotias University, Greater Noida', category: 'GB Nominee representing Industry', designation: 'Member', contact: 'drkmbabu@gmail.com' },
        { sno: 22, name: 'Dr. Amit Kumar Patra, Director, NARL, Gadanki', category: 'GB Nominee representing Industry', designation: 'Member', contact: 'director@narl.gov.in' },
        { sno: 23, name: 'Dr. Subramani Ramakrishnan, Vice President, UPS-SCS (India) Private Limited, Chennai', category: 'GB Nominee representing Sciences', designation: 'Member', contact: 'rsubramani@ups.com' },
        { sno: 24, name: 'Mr. Arun Mozhi Devan M, Executive Director, General Management, BHEL, Ranipet', category: 'GB Nominee representing Sciences', designation: 'Member', contact: 'amdevan@bhel.in' },
      ],
    },
    {
      id: 'jntua-nominees',
      categoryNumber: '5',
      categoryTitle: 'Three Nominees of JNT University Anantapur, Ananthapuramu',
      badge: '3 University Nominees',
      badgeColor: 'bg-rose-50 text-rose-900 border-rose-200',
      description: 'Official representatives appointed by the affiliating university JNTUA to oversee academic governance and regulatory compliance.',
      members: [
        { sno: 25, name: 'Prof. G. Ranga Janardhana, Professor, Department of Mechanical Engineering, JNTUA College of Engineering, Kalikiri', category: 'JNTUA nominee', designation: 'Ex-Officio Member', contact: 'rangajanardhana@gmail.com' },
        { sno: 26, name: 'Prof. Vaishali G Ghorpade, Professor, Department of Civil Engineering, JNTUA College of Engineering, Ananthapuramu', category: 'JNTUA nominee', designation: 'Ex-Officio Member', contact: 'vaishali.civil@jntua.ac.in' },
        { sno: 27, name: 'Prof. A. P Siva Kumar, Professor, Department of Computer Science & Engineering, JNTUA College of Engineering, Ananthapuramu', category: 'JNTUA nominee', designation: 'Member', contact: 'sivakumar.cse@jntua.ac.in' },
      ],
    },
    {
      id: 'special-invitees',
      categoryNumber: '6',
      categoryTitle: 'Special Invitees Nominated by the Principal',
      badge: '6 Special Invitees',
      badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      description: 'Eminent Vice Chancellors, international aerospace professors, and strategic skill development deans.',
      members: [
        { sno: 28, name: 'Dr. M. Muralidhar, Former Director, RVS University, Chittoor', category: 'Special Invitee', designation: 'Member', contact: 'muralidhar6666@gmail.com' },
        { sno: 29, name: 'Dr. K. Sandeep Kumar, Dean, CSE, RVS University, Chittoor', category: 'Nominated by the Principal', designation: 'Member', contact: 'deancse@rvsu.org' },
        { sno: 30, name: 'Dr. Rakesh Kumar Jain, Vice Chancellor, Ajeenkya DY Patil University, Pune', category: 'Special Invitee', designation: 'Member', contact: 'jainrb20@gmail.com' },
        { sno: 31, name: 'Dr. A. Ramaswamy Reddy, Vice Chancellor, Mallareddy Deemed-to-be-University, Hyderabad', category: 'Special Invitee', designation: 'Member', contact: 'ramaswamyreddymail@gmail.com' },
        { sno: 32, name: 'Mr. N. Sendhil Kumar, Dean, Training and Skill Development, RVS University, Chittoor', category: 'Special Invitee', designation: 'Member', contact: 'dean.tsd@rvsu.org' },
        { sno: 33, name: 'Dr. Sridhar Condoor, Professor of Aerospace and Mechanical Engineering, Saint Louis University, USA', category: 'Special Invitee', designation: 'Member', contact: 'sridhar.condoor@slu.edu' },
      ],
    },
    {
      id: 'member-secretary',
      categoryNumber: '7',
      categoryTitle: 'Member Secretary Nominated by the Principal',
      badge: 'Member Secretary',
      badgeColor: 'bg-teal-50 text-teal-900 border-teal-200',
      description: 'Chief administrative and executive officer coordinating the proceedings of the University Academic Council.',
      members: [
        { sno: 34, name: 'Dr. E. Lokanadha Reddy, Vice Principal, RVS University, Chittoor', category: 'Nominated by the Principal', designation: 'Member Secretary', contact: 'viceprincipal@rvsu.org' },
      ],
    },
  ];

  const mainTabs = [
    { id: 'overview', label: 'Overview', href: '#about-overview', icon: <Compass className="w-4 h-4" /> },
    { id: 'leadership', label: 'Leadership', href: '#about-leadership', icon: <Users className="w-4 h-4" /> },
    { id: 'governance', label: 'Governance', href: '#about-governance', icon: <Landmark className="w-4 h-4" /> },
    { id: 'administration', label: 'Administration', href: '#about-administration', icon: <Layers className="w-4 h-4" /> },
    { id: 'ranking-accreditation', label: 'Ranking and Accreditation', href: '#about-ranking-accreditation', icon: <Award className="w-4 h-4" /> },
    { id: 'iqac', label: 'IQAC', href: '#about-iqac', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'contact-us', label: 'Contact Us', href: '#contact-us', icon: <Phone className="w-4 h-4" /> },
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
                About Us & Institutional Heritage
              </h1>
              <p className="text-sm md:text-base text-slate-300 mt-2 max-w-2xl font-light">
                Explore our legacy of educational excellence since 1998, visionary leadership, statutory governance, accreditations, and smart campus facilities.
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
                    <strong className="text-navy-950">RVS University</strong> (established under the aegis of <strong className="text-navy-950">Srinivasa Educational Academy</strong> in 1998) stands as a premier seat of higher learning and technological empowerment in Andhra Pradesh. Spanning an expansive <strong className="text-navy-950">40+ Acre Smart Campus</strong> in Chittoor, the university is committed to academic rigor, experiential industry immersion, and human-centric innovation.
                  </p>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    With autonomous governance, NBA Tier-1 accreditation, NAAC 'A' Grade, and AICTE approval, RVS University guides over <strong className="text-navy-950">4,500+ students</strong> across 49+ undergraduate, postgraduate, and doctoral degree programs.
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
                      alt="RVS University Campus & Leadership"
                      className="w-full h-[400px] object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300">
                        Srinivasa Educational Academy
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white">
                        Founder Chairman Dr. Ravuri Venkataswamy
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
        {/* TAB 2: LEADERSHIP */}
        {/* ========================================================================= */}
        {activeMainTab === 'leadership' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Leadership Sub Tabs */}
            <div className="flex items-center justify-center gap-3 border-b border-slate-200 pb-4">
              {[
                { id: 'chairman', label: "Founder Chairman's Desk", sub: 'Dr. Ravuri Venkataswamy' },
                { id: 'vice-chairman', label: "Vice Chairman's Desk", sub: 'Shri R.V. Srinivas' },
                { id: 'principal', label: "Principal's Desk", sub: 'Dr. Matam Mohan Babu' },
              ].map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => setLeadershipSubTab(subTab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                    leadershipSubTab === subTab.id
                      ? 'bg-navy-950 text-gold-300 shadow-md scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <div>{subTab.label}</div>
                  <div className="text-[10px] opacity-75 font-normal">{subTab.sub}</div>
                </button>
              ))}
            </div>

            {/* Leader 1: Chairman */}
            {leadershipSubTab === 'chairman' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-navy-950">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div className="lg:col-span-4 space-y-4">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-gold-400/40 bg-navy-950">
                      <img
                        src="/images/chairman.jpg"
                        alt="Dr. Ravuri Venkataswamy, Chairman"
                        className="w-full h-[440px] object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-70" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-serif text-xl font-bold text-white">
                          Dr. Ravuri Venkataswamy
                        </h3>
                        <p className="text-xs text-gold-300 font-semibold mt-0.5">
                          Founder Chairman, SV Group of Educational Institutions
                        </p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-gold-700 font-bold">
                        <GraduationCap className="w-4 h-4 text-gold-600" />
                        <span>Honorary Ph.D. in Education</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed font-normal">
                        Conferred by Johnson & Wales University, Rhode Island, USA for seminal research on Education in India.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                        Founder Chairman's Desk
                      </span>
                      <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
                        Dr. Ravuri Venkataswamy
                      </h2>
                      <p className="text-sm font-semibold text-gold-600 mt-1">
                        Founder Chairman, Srinivasa Educational Academy & SV Group of Institutions
                      </p>
                      <div className="h-1 w-20 bg-gold-500 rounded-full mt-3" />
                    </div>

                    <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                      <p>
                        <strong className="text-navy-950">Dr. R. Venkataswamy</strong>, S/o. late Sri R. Kanakaiah, is a well known Educationist and Philanthropist of this region. With a keen interest to promote education in the backward Rayalaseema Region of Andhra Pradesh, with a motto of <em className="text-gold-700">“Education for Peace”</em>, he floated an educational society in the name of <strong className="text-navy-950">“Srinivasa Educational Academy”</strong> in the year 1998 with fellow philanthropists and educationists of this area.
                      </p>
                      <p>
                        He established <strong className="text-navy-950">Sri Venkateswara School of Nursing & Sri Srinivasa MPHW (F) Training Institute in 1986</strong> which is affiliated to Director of Medical Education, Hyderabad and recognized by Indian Nursing Council, New Delhi. In the year 1992 he started <strong className="text-navy-950">Sri R.K.M. Law College</strong>, affiliated to S.V. University, Tirupathi and recognized by Bar Council of India, New Delhi.
                      </p>
                      <p>
                        With this experience and an intention to provide quality technical education, providing self-employment to the youth of this region, he established <strong className="text-navy-950">RVS University (formerly SVCET) in the year 1998</strong>. It is approved by AICTE, New Delhi, accredited by NBA under Tier-I, and affiliated to JNTUA. In a span of about 9 years it was recognized as one of the best colleges in A.P. state with 2 Gold Medals and 95%+ results. Ranked <strong className="text-gold-700">3rd in Andhra Pradesh and 30th in India</strong> by CSR-GHRDC Survey.
                      </p>
                      <p>
                        The college campus with excellent buildings across <strong className="text-navy-950">40+ Acres of land</strong> is located on R.V.S. Nagar. Johnson & Wales University, Rhode Island conferred an <strong className="text-gold-700">Honorary Degree, Doctor of Philosophy – Ph.D. in Education</strong> on him.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Leader 2: Vice Chairman */}
            {leadershipSubTab === 'vice-chairman' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-navy-950">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div className="lg:col-span-4 space-y-4">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-gold-400/40 bg-navy-950">
                      <img
                        src="/images/vice-chairman.jpg"
                        alt="Shri R.V. Srinivas, Vice Chairman"
                        className="w-full h-[440px] object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-70" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-serif text-xl font-bold text-white">
                          Shri R.V. Srinivas
                        </h3>
                        <p className="text-xs text-gold-300 font-semibold mt-0.5">
                          Vice Chairman, SV Group of Educational Institutions
                        </p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-gold-700 font-bold">
                        <Award className="w-4 h-4 text-gold-600" />
                        <span>B.Tech. (Mech), MBA (UK)</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed font-normal">
                        Leading the modernisation, digital transformation, and international collaborative network of 23 group institutions.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                        Vice Chairman's Desk
                      </span>
                      <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
                        Shri R.V. Srinivas
                      </h2>
                      <p className="text-sm font-semibold text-gold-600 mt-1">
                        Vice Chairman, Srinivasa Educational Academy & SV Group of Institutions
                      </p>
                      <div className="h-1 w-20 bg-gold-500 rounded-full mt-3" />
                    </div>

                    <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                      <p>
                        <strong className="text-navy-950">Sri. R.V. Srinivas</strong>, Vice Chairman, SV Group of Educational Institutions, is a young dynamic entrepreneur and administrator. He holds a <strong className="text-navy-950">B.Tech in Mechanical Engineering</strong> and completed his <strong className="text-navy-950">MBA in the United Kingdom</strong>.
                      </p>
                      <p>
                        Under his energetic leadership, the Srinivasa Educational Academy has expanded across Andhra Pradesh and Telangana, overseeing <strong className="text-navy-950">23 educational institutions</strong> spanning Engineering, Pharmacy, Management, Computer Applications, Law, Nursing, Allied Health Sciences, and Teacher Training.
                      </p>
                      <p>
                        His visionary efforts have spearheaded the modernization of labs, high-bandwidth campus-wide optical fiber backbones, AI research centers, international MoUs with universities in the US and Europe, and 100% placement track records across Fortune 500 corporations.
                      </p>
                    </div>

                    {/* 23 Group Institutions List */}
                    <div className="pt-6 border-t border-slate-200">
                      <h4 className="font-serif text-lg font-bold text-navy-950 mb-3 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-gold-600" />
                        <span>23 Group Institutions under Srinivasa Educational Academy</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {groupInstitutions.map((inst, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                            <div className="font-bold text-navy-950">{idx + 1}. {inst.name}</div>
                            <div className="text-slate-500 mt-0.5">{inst.location} • {inst.courses}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Leader 3: Principal */}
            {leadershipSubTab === 'principal' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-navy-950">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div className="lg:col-span-4 space-y-4">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-gold-400/40 bg-navy-950">
                      <img
                        src="/images/principal.jpg"
                        alt="Dr. Matam Mohan Babu, Principal"
                        className="w-full h-[440px] object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-70" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-serif text-xl font-bold text-white">
                          Dr. Matam Mohan Babu
                        </h3>
                        <p className="text-xs text-gold-300 font-semibold mt-0.5">
                          Principal & Professor of Civil Engineering
                        </p>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-gold-700 font-bold">
                        <BookOpen className="w-4 h-4 text-gold-600" />
                        <span>Ph.D., M.Tech, B.Tech</span>
                      </div>
                      <p className="text-slate-600 leading-relaxed font-normal">
                        Over 25+ years of distinguished pedagogical, research, and institutional administration experience.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                        Principal's Desk
                      </span>
                      <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-navy-950 mt-1">
                        Dr. Matam Mohan Babu
                      </h2>
                      <p className="text-sm font-semibold text-gold-600 mt-1">
                        Principal, RVS University (Autonomous), Chittoor
                      </p>
                      <div className="h-1 w-20 bg-gold-500 rounded-full mt-3" />
                    </div>

                    <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                      <p>
                        Welcome to <strong className="text-navy-950">RVS University</strong>. As the head of this prestigious institution, it gives me immense pride to witness our students consistently achieving new milestones in academia, research, competitive examinations, and global corporate recruitments.
                      </p>
                      <p>
                        Our pedagogical framework is aligned with the <strong className="text-navy-950">National Education Policy (NEP 2020)</strong>, offering students choice-based credit systems (CBCS), minor and honors degrees, hands-on capstone projects, and direct industry mentorship.
                      </p>
                      <p>
                        We place immense emphasis on research, patent filings, ATAL IDEA lab innovations, and holistic student development through technical societies and sports championships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: GOVERNANCE */}
        {/* ========================================================================= */}
        {activeMainTab === 'governance' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Governance Sub Tabs */}
            <div className="flex items-center justify-center gap-3 border-b border-slate-200 pb-4">
              {[
                { id: 'governing-body', label: 'Governing Body', sub: '12 Executive Board Members' },
                { id: 'academic-council', label: 'Academic Council', sub: '34 Academic & Industry Leaders' },
                { id: 'finance', label: 'Finance Committee', sub: 'Budget & Financial Oversight' },
              ].map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => setGovernanceSubTab(subTab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                    governanceSubTab === subTab.id
                      ? 'bg-navy-950 text-gold-300 shadow-md scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <div>{subTab.label}</div>
                  <div className="text-[10px] opacity-75 font-normal">{subTab.sub}</div>
                </button>
              ))}
            </div>

            {/* Sub-tab: Governing Body */}
            {governanceSubTab === 'governing-body' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-navy-950 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                    Statutory Governance
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950 mt-1">
                    Governing Body (12 Members)
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 font-normal">
                    The Governing Body is the apex statutory authority responsible for strategic direction, policy formulation, approvals, and institutional oversight.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                  <table className="w-full text-left text-xs md:text-sm border-collapse">
                    <thead>
                      <tr className="bg-navy-950 text-gold-300 font-serif">
                        <th className="p-3.5 border-b border-navy-800 text-center w-12">S.No</th>
                        <th className="p-3.5 border-b border-navy-800">Name & Designation</th>
                        <th className="p-3.5 border-b border-navy-800">Category</th>
                        <th className="p-3.5 border-b border-navy-800 text-center">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {governingBodyMembers.map((member) => (
                        <tr key={member.sno} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 text-center font-bold text-slate-400">{member.sno}</td>
                          <td className="p-3.5 font-bold text-navy-950">{member.name}</td>
                          <td className="p-3.5 text-slate-600">{member.category}</td>
                          <td className="p-3.5 text-center">
                            <span className="px-2.5 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300 font-bold text-xs whitespace-nowrap">
                              {member.designation}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-tab: Academic Council */}
            {governanceSubTab === 'academic-council' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-navy-950 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                    Academic Standards & Curriculum
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950 mt-1">
                    Academic Council (34 Members)
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 font-normal">
                    Constitutes the principal academic body of RVS University, approving curricula, examination regulations, degree awards, and pedagogical reforms.
                  </p>
                </div>

                <div className="space-y-6">
                  {academicCouncilSections.map((section) => (
                    <div key={section.id} className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-gold-800 uppercase tracking-wider">Category {section.categoryNumber}</div>
                          <h4 className="font-serif text-base md:text-lg font-bold text-navy-950">{section.categoryTitle}</h4>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${section.badgeColor}`}>
                          {section.badge}
                        </span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                              <th className="p-2.5 text-center w-12">S.No</th>
                              <th className="p-2.5">Name & Affiliation</th>
                              <th className="p-2.5">Category</th>
                              <th className="p-2.5 text-center">Designation</th>
                              <th className="p-2.5">Official Contact</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {section.members.map((m) => (
                              <tr key={m.sno} className="hover:bg-amber-50/30">
                                <td className="p-2.5 text-center font-bold text-slate-400">{m.sno}</td>
                                <td className="p-2.5 font-bold text-navy-950">{m.name}</td>
                                <td className="p-2.5 text-slate-600 text-xs">{m.category}</td>
                                <td className="p-2.5 text-center font-bold text-gold-700">{m.designation}</td>
                                <td className="p-2.5 text-slate-500 font-mono text-[11px]">{m.contact}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-tab: Finance Committee */}
            {governanceSubTab === 'finance' && (
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-navy-950 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                    Financial Governance
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950 mt-1">
                    Finance Committee
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1 font-normal">
                    Statutory body overseeing institutional annual budgets, expenditure audits, capital allocations, and funding.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                      The annual accounts and financial estimates of the Institution are vetted by the Finance Committee before final submission to the Governing Body.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-normal">
                      Fixes recurring and non-recurring expenditure boundaries based on resource allocation and academic capital requirements.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: ADMINISTRATION */}
        {/* ========================================================================= */}
        {activeMainTab === 'administration' && (
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl text-navy-950 space-y-8 animate-fadeIn">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                Institutional Hierarchy & Governance
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950 mt-1">
                Organisation & Administrative Chart
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-1 font-normal">
                Hierarchical flow from Management & Principal to Administrative Deans, HODs, Exam Cell, and Functional Wings.
              </p>
            </div>

            {/* Organization Chart Display */}
            <div className="p-4 md:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <img
                src="/images/org-chart.png"
                alt="Organisation Chart of RVS University, Chittoor"
                className="max-w-full h-auto rounded-xl shadow-2xl border border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="font-serif font-bold text-navy-950 text-sm mb-1">Executive Management</h5>
                <p className="text-xs text-slate-500">Chairman, Vice Chairman & Governing Body</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="font-serif font-bold text-navy-950 text-sm mb-1">Academic Leadership</h5>
                <p className="text-xs text-slate-500">Principal, Deans & Academic Council</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="font-serif font-bold text-navy-950 text-sm mb-1">Evaluation & Exams</h5>
                <p className="text-xs text-slate-500">Controller of Examinations & Autonomous Exam Cell</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="font-serif font-bold text-navy-950 text-sm mb-1">Student Services & Wings</h5>
                <p className="text-xs text-slate-500">Hostels, Library, Training & Placements, R&D Cell</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: RANKING AND ACCREDITATION */}
        {/* ========================================================================= */}
        {activeMainTab === 'ranking-accreditation' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                  Quality Recognitions & Accreditations
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950 mt-1">
                  Ranking and Accreditation
                </h3>
                <p className="text-xs md:text-sm text-slate-600 mt-1 font-normal">
                  RVS University maintains the highest benchmarks in autonomous engineering, pharmacy, and management education with top statutory accreditations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                {/* NAAC */}
                <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-200/80 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500 text-navy-950 flex items-center justify-center font-bold text-xl shadow-md">
                    A
                  </div>
                  <h4 className="font-serif text-xl font-bold text-navy-950">NAAC Accreditation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Accredited with <strong className="text-navy-950">Grade 'A'</strong> by the National Assessment and Accreditation Council (NAAC), UGC for high academic standards and student infrastructure.
                  </p>
                  <a href="#naac" className="inline-flex items-center gap-1 text-xs font-bold text-gold-800 hover:text-gold-900 mt-2">
                    <span>View NAAC SSR Disclosures</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* NBA */}
                <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-200/80 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-900 text-gold-300 flex items-center justify-center font-bold text-base shadow-md">
                    NBA
                  </div>
                  <h4 className="font-serif text-xl font-bold text-navy-950">NBA Tier-I Accredited</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Undergraduate Engineering programs accredited under <strong className="text-navy-950">Tier-I (Washington Accord)</strong>, validating international mobility and outcome-based engineering education.
                  </p>
                  <a href="#departments" className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-blue-950 mt-2">
                    <span>Explore Accredited Branches</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* AICTE & UGC */}
                <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-base shadow-md">
                    UGC
                  </div>
                  <h4 className="font-serif text-xl font-bold text-navy-950">UGC Autonomous & AICTE</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Conferred <strong className="text-navy-950">Autonomous Status by UGC</strong>, New Delhi, and approved by All India Council for Technical Education (AICTE), New Delhi.
                  </p>
                  <a href="#academic-mandatory-disclosure" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 hover:text-emerald-950 mt-2">
                    <span>View AICTE Approvals</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* ISO */}
                <div className="p-6 rounded-3xl bg-purple-50/50 border border-purple-200/80 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-900 text-white flex items-center justify-center font-bold text-base shadow-md">
                    ISO
                  </div>
                  <h4 className="font-serif text-xl font-bold text-navy-950">ISO 9001:2015 Certified</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Certified quality management systems ensuring consistent standard operating procedures in education, examinations, laboratories, and student governance.
                  </p>
                </div>

                {/* CSR GHRDC */}
                <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-200/80 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-900 text-white flex items-center justify-center font-bold text-base shadow-md">
                    #3
                  </div>
                  <h4 className="font-serif text-xl font-bold text-navy-950">Top 3 in Andhra Pradesh</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ranked <strong className="text-navy-950">3rd in AP and 30th in India</strong> by Competition Success Review (CSR-GHRDC) for outstanding infrastructure and placements.
                  </p>
                </div>

                {/* AICTE IDEA LAB */}
                <div className="p-6 rounded-3xl bg-teal-50/50 border border-teal-200/80 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-800 text-gold-300 flex items-center justify-center font-bold text-base shadow-md">
                    IDEA
                  </div>
                  <h4 className="font-serif text-xl font-bold text-navy-950">AICTE ATAL IDEA Lab</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ₹1.1 Crore+ funded AICTE center for 3D printing, laser cutting, embedded prototyping, and student product incubation.
                  </p>
                  <a href="#atal-idea-lab" className="inline-flex items-center gap-1 text-xs font-bold text-teal-900 hover:text-teal-950 mt-2">
                    <span>Explore IDEA Lab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: IQAC */}
        {/* ========================================================================= */}
        {activeMainTab === 'iqac' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-700 font-sans">
                  Internal Quality Assurance Cell
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-navy-950 mt-1">
                  IQAC Cell & Quality Framework
                </h3>
                <p className="text-xs md:text-sm text-slate-600 mt-1 font-normal">
                  The Internal Quality Assurance Cell (IQAC) serves as the nodal engine for institutional quality enhancement, curriculum innovation, outcome audits, and compliance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-gold-800 font-bold">
                    <Target className="w-5 h-5 text-gold-600" />
                    <span>Quality Objectives</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To develop a conscious, consistent, and catalytic action plan toward improving academic and administrative performance across all 6 constituent schools.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-gold-800 font-bold">
                    <FileText className="w-5 h-5 text-gold-600" />
                    <span>AQAR & SSR Reports</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Regular compilation and submission of the Annual Quality Assurance Report (AQAR) to NAAC, tracking research publications, patents, and faculty development.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-gold-800 font-bold">
                    <Users className="w-5 h-5 text-gold-600" />
                    <span>Stakeholder Feedback</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Conducting structured 360-degree feedback from students, alumni, parents, and recruiters to refine curriculum and institutional infrastructure.
                  </p>
                </div>
              </div>

              {/* IQAC Functions */}
              <div className="pt-6 border-t border-slate-200 space-y-3">
                <h4 className="font-serif text-xl font-bold text-navy-950">Key IQAC Initiatives & Deliverables</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-slate-700">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Periodic Academic & Administrative Audits (AAA)</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Outcome Based Education (OBE) & Bloom's Taxonomy Mapping</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>National & International Accreditation Coordination</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Faculty Development Programs (FDP) & Skill Enhancement</span>
                  </div>
                </div>
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

                {/* Right: Interactive Enquiry / Reach Us Card */}
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
