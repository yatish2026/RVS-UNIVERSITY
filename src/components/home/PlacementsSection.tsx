import React, { useState } from 'react';
import { 
  Building2, Award, ArrowRight, 
  CheckCircle2, Sparkles, Eye, X, Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

// Department Achievers Panoramic Image
import deptAchieversCollage from '../../assets/placement_imgs/WhatsApp Image 2026-05-14 at 3.08.47 PM.jpeg';

export const PlacementsSection: React.FC = () => {
  const [isCollageModalOpen, setIsCollageModalOpen] = useState<boolean>(false);

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
      className="relative py-20 lg:py-28 bg-gradient-to-b from-[#050D1A] via-[#08162B] to-[#040A14] text-white border-y border-gold-500/20 overflow-hidden scroll-mt-20"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7 space-y-4">
            <Reveal direction="left" delay={100}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>CORPORATE CAREERS & EXCELLENCE</span>
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
                Empowering graduates through cutting-edge industry training, real-world internships, and exceptional placement drives across Fortune 500 multinationals.
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
              onClick={() => setIsCollageModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs shadow-gold-glow transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Expand Full Resolution Photo</span>
            </button>
          </div>

          <div 
            onClick={() => setIsCollageModalOpen(true)}
            className="rounded-2xl overflow-hidden border border-white/20 relative group cursor-pointer shadow-2xl"
          >
            <img
              src={deptAchieversCollage}
              alt="Department wise placement achievers 2025-2026"
              className="w-full h-auto max-h-[520px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-navy-950/30 group-hover:bg-navy-950/10 transition-colors flex items-center justify-center">
              <div className="px-5 py-2.5 rounded-full bg-black/75 text-gold-300 border border-gold-400/40 text-xs font-bold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-xl flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Click to inspect full panoramic view</span>
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
      {/* FULL-SIZE COLLAGE LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {isCollageModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setIsCollageModalOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#0A182F] rounded-3xl border border-gold-400/60 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-navy-950/80 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Team of Achievers — Academic Year 2025–2026</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40">
                    12 Departments
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  CSE, CSD, CIVIL, ECE, EEE, MCA, MECH, IT, IOT, MBA Cohort Felicitation
                </p>
              </div>

              <button
                onClick={() => setIsCollageModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-3 sm:p-4 overflow-auto flex-1 flex items-center justify-center bg-black/50">
              <img
                src={deptAchieversCollage}
                alt="Department Achievers Panoramic Collage"
                className="max-h-[72vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-navy-950/90 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-light">
                Official RVS University Placement Archive &bull; Multi-Corporate Placement Drives
              </span>
              <button
                onClick={() => setIsCollageModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-all cursor-pointer"
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
