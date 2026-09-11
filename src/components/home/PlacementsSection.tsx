import React, { useState } from 'react';
import { 
  Briefcase, TrendingUp, Building2, Award, ArrowRight, 
  CheckCircle2, Sparkles, Download, ShieldCheck, Eye, 
  X, ChevronLeft, ChevronRight, UserCheck, Star, Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

// Placement Images
import microchip28Lpa from '../../assets/26lpa.jpeg';
import intellipaat8Lpa from '../../assets/8lap.jpeg';
import studentsPlacedBanner from '../../assets/students_placed.JPG';
import tcs10Lpa from '../../assets/placement_imgs/WhatsApp Image 2026-07-13 at 10.54.47 AM.jpeg';
import lg5Lpa from '../../assets/placement_imgs/WhatsApp Image 2026-07-13 at 10.54.42 AM.jpeg';
import intellipaatPoster from '../../assets/placement_imgs/WhatsApp Image 2026-07-13 at 11.13.40 AM.jpeg';
import deptAchieversCollage from '../../assets/placement_imgs/WhatsApp Image 2026-05-14 at 3.08.47 PM.jpeg';
import ethnusVijay from '../../assets/placement_imgs/WhatsApp Image 2026-02-19 at 5.55.30 PM.jpeg';
import ethnusPreethi from '../../assets/placement_imgs/WhatsApp Image 2026-02-19 at 5.55.30 PM (1).jpeg';
import ethnusHanitha from '../../assets/placement_imgs/WhatsApp Image 2026-02-19 at 5.55.31 PM.jpeg';
import ethnusKeerthi from '../../assets/placement_imgs/WhatsApp Image 2026-02-19 at 5.55.31 PM (1).jpeg';
import ethnusGanesh from '../../assets/placement_imgs/WhatsApp Image 2026-02-19 at 5.55.32 PM.jpeg';
import ethnusVeenika from '../../assets/placement_imgs/WhatsApp Image 2026-02-19 at 5.55.32 PM (1).jpeg';
import ethnusRaj from '../../assets/placement_imgs/WhatsApp Image 2026-02-19 at 5.55.32 PM (2).jpeg';
import ethnusMabi from '../../assets/placement_imgs/WhatsApp Image 2026-02-19 at 5.55.33 PM.jpeg';
import ethnusStudent9 from '../../assets/placement_imgs/WhatsApp Image 2026-02-19 at 5.55.33 PM (1).jpeg';

interface PlacementPoster {
  id: string;
  studentName: string;
  rollNo?: string;
  department: string;
  company: string;
  packageLpa: string;
  badge: string;
  category: 'super-dream' | 'dream' | 'enterprise' | 'batches';
  image: string;
  featured?: boolean;
}

export const PlacementsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'super-dream' | 'dream' | 'enterprise' | 'batches'>('all');
  const [selectedPoster, setSelectedPoster] = useState<PlacementPoster | null>(null);

  const placementCards: PlacementPoster[] = [
    {
      id: 'microchip-28lpa',
      studentName: 'Deekshitha K',
      rollNo: '16781A0564',
      department: 'Computer Science & Engineering',
      company: 'Microchip Technology',
      packageLpa: '₹28 LPA',
      badge: 'Super Dream Offer • Highest CTC',
      category: 'super-dream',
      image: microchip28Lpa,
      featured: true,
    },
    {
      id: 'tcs-10lpa',
      studentName: 'G V Goutham Reddy',
      rollNo: '22781A3717',
      department: 'CSE (Cyber Security)',
      company: 'Tata Consultancy Services (TCS)',
      packageLpa: '₹10 LPA',
      badge: 'Dream Package • Cloud & Sec',
      category: 'dream',
      image: tcs10Lpa,
      featured: true,
    },
    {
      id: 'intellipaat-8lpa',
      studentName: 'Team of 7 Achievers',
      rollNo: 'CSE, IT, Cyber & ECE Batches',
      department: 'Achyutha, Mythresh, Anas, Ashika, Gowthami, Jasmin, Shireesha',
      company: 'IntelliPaat',
      packageLpa: '₹8 LPA',
      badge: 'Dream Batch Placement',
      category: 'dream',
      image: intellipaatPoster || intellipaat8Lpa,
      featured: true,
    },
    {
      id: 'lg-5lpa',
      studentName: 'Gondipalli Pavani',
      rollNo: '22781A3346',
      department: 'CSE (AI & Machine Learning)',
      company: 'LG Electronics',
      packageLpa: '₹5 LPA',
      badge: 'Tier-1 Electronics & AI',
      category: 'enterprise',
      image: lg5Lpa,
    },
    {
      id: 'dept-collage-2026',
      studentName: 'A Team of Achievers Departmentwise',
      rollNo: 'Academic Year 2025–2026',
      department: 'CSE, CSD, CIVIL, ECE (A/B/C), EEE, MCA, MECH, IT, IOT, MBA',
      company: 'Multi-Corporate Placement Drive',
      packageLpa: '₹3.75 - ₹28 LPA',
      badge: '12 Departments Placed',
      category: 'batches',
      image: deptAchieversCollage,
      featured: true,
    },
    {
      id: 'outdoor-celebration',
      studentName: 'Placed Students Felicitation Day',
      rollNo: 'Campus Placement Day',
      department: 'Department of Training & Placement',
      company: '250+ Recruiting Partners',
      packageLpa: '95%+ Track',
      badge: 'Campus Achievers Felicitation',
      category: 'batches',
      image: studentsPlacedBanner,
    },
    {
      id: 'ethnus-vijay',
      studentName: 'Vijay Kumar Thalla',
      rollNo: '24781F0028',
      department: 'Master of Computer Applications (MCA)',
      company: 'Ethnus',
      packageLpa: '₹3.75 LPA',
      badge: 'MCA Placements 2026',
      category: 'enterprise',
      image: ethnusVijay,
    },
    {
      id: 'ethnus-preethi',
      studentName: 'Pakalamanda Preethi Priya',
      rollNo: '24781F0021',
      department: 'Master of Computer Applications (MCA)',
      company: 'Ethnus',
      packageLpa: '₹3.75 LPA',
      badge: 'MCA Placements 2026',
      category: 'enterprise',
      image: ethnusPreethi,
    },
    {
      id: 'ethnus-hanitha',
      studentName: 'Gandham Hanitha Reddy',
      rollNo: '22781A3249',
      department: 'CSE (Data Science - CSD)',
      company: 'Ethnus',
      packageLpa: '₹3.75 LPA',
      badge: 'CSD Placements 2026',
      category: 'enterprise',
      image: ethnusHanitha,
    },
    {
      id: 'ethnus-keerthi',
      studentName: 'Chinnappagari Keerthi',
      rollNo: '22781A3232',
      department: 'CSE (Data Science - CSD)',
      company: 'Ethnus',
      packageLpa: '₹3.75 LPA',
      badge: 'CSD Placements 2026',
      category: 'enterprise',
      image: ethnusKeerthi,
    },
    {
      id: 'ethnus-ganesh',
      studentName: 'Kuruva Ganesh',
      rollNo: '22781A3123',
      department: 'CSE (AI - CAI)',
      company: 'Ethnus',
      packageLpa: '₹3.75 LPA',
      badge: 'CAI Placements 2026',
      category: 'enterprise',
      image: ethnusGanesh,
    },
    {
      id: 'ethnus-veenika',
      studentName: 'Utukuru Veenika',
      rollNo: '22781A32E4',
      department: 'CSE (Data Science - CSD)',
      company: 'Ethnus',
      packageLpa: '₹3.75 LPA',
      badge: 'CSD Placements 2026',
      category: 'enterprise',
      image: ethnusVeenika,
    },
    {
      id: 'ethnus-raj',
      studentName: 'Raj Priyadershi',
      rollNo: '22781A32G0',
      department: 'CSE (Data Science - CSD)',
      company: 'Ethnus',
      packageLpa: '₹3.75 LPA',
      badge: 'CSD Placements 2026',
      category: 'enterprise',
      image: ethnusRaj,
    },
    {
      id: 'ethnus-mabi',
      studentName: 'Dudekula Mabi',
      rollNo: '22781A3239',
      department: 'CSE (Data Science - CSD)',
      company: 'Ethnus',
      packageLpa: '₹3.75 LPA',
      badge: 'CSD Placements 2026',
      category: 'enterprise',
      image: ethnusMabi,
    },
    {
      id: 'ethnus-student9',
      studentName: 'Placement Achiever',
      rollNo: '2026 Campus Drive',
      department: 'CSE / Allied Engineering',
      company: 'Ethnus',
      packageLpa: '₹3.75 LPA',
      badge: 'Engineering Placements 2026',
      category: 'enterprise',
      image: ethnusStudent9,
    },
  ];

  const filteredCards = activeFilter === 'all'
    ? placementCards
    : placementCards.filter((c) => c.category === activeFilter);

  const row1Companies = [
    { name: 'MICROCHIP', package: '₹28 LPA', tier: 'Highest Super Dream' },
    { name: 'TCS', package: '₹10 LPA', tier: 'Global Tech MNC' },
    { name: 'INTELLIPAAT', package: '₹8 LPA', tier: 'EdTech & AI' },
    { name: 'LG ELECTRONICS', package: '₹5 LPA', tier: 'Core & IoT' },
    { name: 'ETHNUS', package: '₹3.75 LPA', tier: 'Digital Systems' },
    { name: 'MICROSOFT', package: '₹16 LPA', tier: 'Tier-1 Enterprise' },
    { name: 'INFOSYS', package: 'Day-1 Partner', tier: 'Global Tech' },
    { name: 'WIPRO', package: 'Elite Recruiter', tier: 'MNC' },
    { name: 'AMAZON', package: '₹14 LPA', tier: 'Cloud & AI' },
    { name: 'GOOGLE', package: 'Top Recruiter', tier: 'Global Titan' },
  ];

  const row2Companies = [
    { name: 'ROBERT BOSCH', package: 'Embedded Tech', tier: 'Automotive & IoT' },
    { name: 'CAPGEMINI', package: 'Engineering', tier: 'Global MNC' },
    { name: 'TECH MAHINDRA', package: 'Telecom & AI', tier: 'Enterprise' },
    { name: 'L&T INFOTECH', package: 'Infrastructure', tier: 'Core & IT' },
    { name: 'ORACLE', package: 'Database Cloud', tier: 'Tier-1' },
    { name: 'CISCO SYSTEMS', package: 'Networking', tier: 'Global Leader' },
    { name: 'DELL TECHNOLOGIES', package: 'Hardware Cloud', tier: 'Enterprise' },
    { name: 'INTEL', package: 'VLSI & Chips', tier: 'Semiconductor' },
    { name: 'QUALCOMM', package: '5G & SoC', tier: 'Semiconductor' },
    { name: 'DELOITTE', package: 'Advisory', tier: 'Big 4' },
  ];

  return (
    <section 
      id="placements" 
      className="relative py-20 lg:py-32 bg-gradient-to-b from-[#050D1A] via-[#08162B] to-[#040A14] text-white border-y border-gold-500/20 overflow-hidden scroll-mt-20"
    >
      {/* Anchor for direct navbar jumping */}
      <div id="placement-highlights" className="absolute -top-24 left-0 w-1 h-1 pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '36px 36px' }}
      />

      <div className="container-custom px-4 md:px-8 relative z-10">
        
        {/* Section Header & Metrics Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
          <div className="lg:col-span-7 space-y-4">
            <Reveal direction="left" delay={100}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>CORPORATE CAREERS & WALL OF FAME</span>
              </div>
            </Reveal>

            <Reveal direction="left" delay={150}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Where Industry Titans Hire <br />
                <span className="gold-gradient-text">Next-Gen Talent.</span>
              </h2>
            </Reveal>

            <Reveal direction="left" delay={200}>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                Explore real placement highlights and student achievers across Microchip (₹28 LPA), TCS (₹10 LPA), IntelliPaat (₹8 LPA), LG (₹5 LPA), and premier multinational corporations.
              </p>
            </Reveal>
          </div>

          {/* Glowing Metrics Glass Cards */}
          <div className="lg:col-span-5">
            <Reveal direction="right" delay={200}>
              <div className="grid grid-cols-3 gap-3.5 p-4 rounded-3xl bg-white/[0.04] border border-gold-400/25 backdrop-blur-xl shadow-2xl">
                <div className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl sm:text-2xl font-serif font-black gold-gradient-text">₹28 LPA</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-bold mt-0.5">Highest CTC</div>
                </div>

                <div className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl sm:text-2xl font-serif font-black text-white">95%+</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-bold mt-0.5">Placement Track</div>
                </div>

                <div className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-xl sm:text-2xl font-serif font-black text-white">250+</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-bold mt-0.5">Recruiters</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SPOTLIGHT HERO: TOP PLACEMENT ACHIEVERS BANNER */}
        {/* ========================================================================= */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 font-sans flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-gold-400" />
                Featured Student Achievers
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mt-1">
                Placement Wall of Fame 2026
              </h3>
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: `All Posters (${placementCards.length})` },
                { id: 'super-dream', label: 'Super Dream (₹28 LPA)' },
                { id: 'dream', label: 'Dream Offers (₹8-10 LPA)' },
                { id: 'enterprise', label: 'Corporate MNCs' },
                { id: 'batches', label: 'Department Batches' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    activeFilter === tab.id
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3BA2F] text-navy-950 shadow-gold-glow font-black'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Placement Posters Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCards.map((card, idx) => (
              <div
                key={card.id}
                onClick={() => setSelectedPoster(card)}
                className="group relative rounded-3xl overflow-hidden bg-[#0A182F]/90 border border-white/10 hover:border-gold-400/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(212,175,55,0.25)] cursor-pointer flex flex-col justify-between"
              >
                {/* Poster Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                  <img
                    src={card.image}
                    alt={`${card.studentName} - ${card.company}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A182F] via-transparent to-transparent opacity-90" />
                  
                  {/* Package Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-navy-950/90 text-gold-300 border border-gold-400/50 shadow-lg backdrop-blur-md">
                      {card.packageLpa}
                    </span>
                  </div>

                  {/* Company Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 text-white border border-white/20 backdrop-blur-md">
                      {card.company}
                    </span>
                  </div>

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400 text-navy-950 font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-4 h-4" />
                      <span>View Full Certificate</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Meta */}
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif font-bold text-sm text-white group-hover:text-gold-300 transition-colors truncate">
                      {card.studentName}
                    </h4>
                    {card.rollNo && (
                      <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                        {card.rollNo}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-1 font-light">
                    {card.department}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-gold-400 font-semibold">{card.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold-400 transform group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANORAMIC DEPARTMENT BATCH ACHIEVERS SPOTLIGHT */}
        {/* ========================================================================= */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-gold-400/30 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                <span>Department-Wise Achievers Spotlight</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Team of Achievers — Academic Year 2025–2026
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl font-light">
                Comprehensive department-wise cohort celebrations across Engineering, Computer Applications (MCA), and Management Studies (MBA).
              </p>
            </div>

            <button
              onClick={() => setSelectedPoster(placementCards.find(c => c.id === 'dept-collage-2026') || placementCards[0])}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs shadow-gold-glow transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Expand 12-Department Photo</span>
            </button>
          </div>

          <div 
            onClick={() => setSelectedPoster(placementCards.find(c => c.id === 'dept-collage-2026') || placementCards[0])}
            className="rounded-2xl overflow-hidden border border-white/20 relative group cursor-pointer shadow-2xl"
          >
            <img
              src={deptAchieversCollage}
              alt="Department wise placement achievers 2025-2026"
              className="w-full h-auto max-h-[500px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-navy-950/30 group-hover:bg-navy-950/10 transition-colors flex items-center justify-center">
              <div className="px-4 py-2 rounded-full bg-black/70 text-gold-300 border border-gold-400/40 text-xs font-bold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                Click to inspect full panoramic view
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOVING COMPANY LOGOS MARQUEE (Seamless Infinite Continuous Loops) */}
        {/* ========================================================================= */}
        <div className="space-y-4 mb-16">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400/90 font-sans">
              250+ Global Recruiting Partners
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
              Top Corporate Recruiters & Technology Leaders
            </h3>
          </div>

          {/* Row 1: Moving Left (Continuous Smooth Loop) */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050D1A] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050D1A] to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee-left flex gap-4">
              {[...row1Companies, ...row1Companies, ...row1Companies].map((company, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-gold-400 hover:bg-gold-500/15 backdrop-blur-md shadow-lg group transition-all duration-300 flex-shrink-0 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-300 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-serif font-extrabold text-sm md:text-base tracking-wide text-white group-hover:text-gold-300 transition-colors block">
                      {company.name}
                    </span>
                    <span className="text-[11px] font-bold text-gold-400/90 font-mono">
                      {company.package} &bull; <span className="text-slate-400 font-normal">{company.tier}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Moving Right (Continuous Smooth Loop) */}
          <div className="relative w-full overflow-hidden py-1">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050D1A] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050D1A] to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee-right flex gap-4">
              {[...row2Companies, ...row2Companies, ...row2Companies].map((company, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:border-gold-400 hover:bg-gold-500/15 backdrop-blur-md shadow-lg group transition-all duration-300 flex-shrink-0 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-300 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-serif font-extrabold text-sm md:text-base tracking-wide text-white group-hover:text-gold-300 transition-colors block">
                      {company.name}
                    </span>
                    <span className="text-[11px] font-bold text-gold-400/90 font-mono">
                      {company.package} &bull; <span className="text-slate-400 font-normal">{company.tier}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Placement Pillars & CTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal direction="up" delay={100}>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold-400/40 backdrop-blur-md transition-all space-y-2.5">
              <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Industry Capstone Internships</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Mandatory 6-month capstones with Fortune 500 companies allowing students to convert internships into full-time pre-placement offers (PPOs).
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={200}>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold-400/40 backdrop-blur-md transition-all space-y-2.5">
              <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                <span>Full-Stack & AI Training Labs</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Continuous bootcamps in Data Structures, Cloud Architecture, Generative AI, and soft-skills training from the 2nd year onwards.
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={300}>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-500/15 via-white/[0.04] to-transparent border border-gold-400/40 backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-gold-300 font-bold text-sm mb-1.5">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Admissions 2026–27 Open</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Secure your seat at RVS University and unlock world-class career placements across Fortune 500 tech leaders.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  variant="gold"
                  size="sm"
                  href="#admissions"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Apply for 2026 Admissions
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* FULL-SIZE POSTER LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {selectedPoster && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedPoster(null)}
        >
          <div 
            className="relative max-w-3xl w-full max-h-[92vh] bg-[#0A182F] rounded-3xl border border-gold-400/60 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-navy-950/80 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>{selectedPoster.studentName}</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40">
                    {selectedPoster.packageLpa}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedPoster.company} &bull; {selectedPoster.department} {selectedPoster.rollNo ? `(${selectedPoster.rollNo})` : ''}
                </p>
              </div>

              <button
                onClick={() => setSelectedPoster(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-3 sm:p-4 overflow-auto flex-1 flex items-center justify-center bg-black/50">
              <img
                src={selectedPoster.image}
                alt={selectedPoster.studentName}
                className="max-h-[72vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-navy-950/90 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-light">
                Official RVS University Placement Archive &bull; {selectedPoster.badge}
              </span>
              <button
                onClick={() => setSelectedPoster(null)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
