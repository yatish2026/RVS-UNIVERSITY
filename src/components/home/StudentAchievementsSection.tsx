import React, { useState } from 'react';
import { Award, Trophy, Sparkles, Eye, X, CheckCircle2, ChevronRight, Calendar, Users, Medal } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

interface AchievementItem {
  id: string;
  image: string;
  title: string;
  badge: string;
  cashPrize?: string;
  event: string;
  organizer: string;
  year: string;
  description: string;
  teamMembers: string;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'sih-finale-2024',
    image: '/images/achievement-sih-finale.jpg',
    title: 'Smart India Hackathon (SIH) 2024 — Grand Finale Winners',
    badge: 'National Championship',
    cashPrize: 'Prestigious National Recognition',
    event: 'Smart India Hackathon Software Edition Grand Finale',
    organizer: 'Ministry of Education & Innovation Cell, Govt. of India',
    year: 'December 2024',
    description: 'RVS University student innovators winning national honors at the Amity University Grand Finale, presenting software innovations directly to government and enterprise jury panels.',
    teamMembers: 'Finalist Student Innovation Squad & Faculty Mentors',
  },
  {
    id: 'intellecthon-30k',
    image: '/images/achievement-intellecthon-30k.png',
    title: 'Intellecthon \'25 National Hackathon — Runner Up (₹30,000 Prize)',
    badge: 'Runner Up Trophy',
    cashPrize: '₹30,000 Cash Award',
    event: 'Intellecthon \'25 National Level 36-Hour Hackathon',
    organizer: 'Prince Shri Venkateshwara Padmavathy Engineering College (Autonomous)',
    year: 'November 2025',
    description: 'Team ONYX from Sri Venkateshwara College of Engineering & Technology clinching 2nd Place among top engineering colleges in India with a ₹30,000 cash cheque.',
    teamMembers: 'Team ONYX (Undergraduate Tech Lead Squad)',
  },
  {
    id: 'selesta-2k25',
    image: '/images/achievement-selesta-prosovo.jpg',
    title: 'Selesta 2k25 Inter-Collegiate Excellence & Cultural Championship',
    badge: 'Stage Champions',
    cashPrize: 'Championship Trophy & Gold Medals',
    event: 'Selesta 2k25 — 40 Years of Educational Excellence Gala',
    organizer: 'Sri Venkateshwara Group of Institutions & University Council',
    year: 'February 2025',
    description: 'Student champions receiving state awards, merit certificates, and honor shields on the grand live stage during the Selesta 2k25 anniversary celebrations.',
    teamMembers: 'Outstanding Technical & Cultural Achievers',
  },
  {
    id: 'impactx-2k25',
    image: '/images/achievement-impactx-hackathon.png',
    title: 'IMPACTX-2K25 National Innovation Challenge — ₹15,000 Prize',
    badge: 'Top Innovation Team',
    cashPrize: '₹15,000 Cash Award',
    event: 'IMPACTX-2K25 National Level Technical Symposium',
    organizer: 'Madanapalle Institute of Technology & Science (MITS)',
    year: 'March 2025',
    description: 'Multidisciplinary student innovators winning the ₹15,000 cash prize for developing an AI-driven smart infrastructure solution in competition with leading technical institutes.',
    teamMembers: 'National Challenge Project Developers',
  },
];

export const StudentAchievementsSection: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  // Seamless marquee loop with the 4 achievements
  const marqueePhotos = [...ACHIEVEMENTS, ...ACHIEVEMENTS, ...ACHIEVEMENTS];

  return (
    <section 
      id="achievements" 
      className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F3EDE2] to-[#FAF7F2] text-navy-950 border-b border-amber-900/10 overflow-hidden scroll-mt-20"
    >
      <div className="container-custom px-4 md:px-8 mb-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal direction="down" delay={100}>
            <SectionHeading
              eyebrow="National Honors & Accolades"
              title="Our Students' Achievements"
              subtitle="Real glimpses of our scholars, Smart India Hackathon finalists, national cash prize winners, and campus innovators in action."
              variant="dark"
              align="center"
            />
          </Reveal>
        </div>

        {/* ========================================================================= */}
        {/* 1. FEATURED 4-ACHIEVEMENT LUXURY GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {ACHIEVEMENTS.map((item, idx) => (
            <Reveal key={item.id} direction="up" delay={idx * 100}>
              <div 
                onClick={() => setSelectedAchievement(item)}
                className="group relative bg-white rounded-3xl overflow-hidden border border-amber-900/10 hover:border-gold-500 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              >
                {/* Photo Display */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out image-render-crisp"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-navy-950/85 text-gold-300 border border-gold-400/40 shadow-lg backdrop-blur-md">
                      <Trophy className="w-3.5 h-3.5 text-gold-400" />
                      <span>{item.badge}</span>
                    </span>
                  </div>

                  {/* Cash Prize Badge (if available) */}
                  {item.cashPrize && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-[#D4AF37] to-[#F3BA2F] text-navy-950 shadow-md">
                        <Sparkles className="w-3.5 h-3.5 text-navy-950" />
                        <span>{item.cashPrize}</span>
                      </span>
                    </div>
                  )}

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-navy-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-400 text-navy-950 font-bold text-xs shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-4 h-4" />
                      <span>View Full Resolution Photo</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gold-700 mb-1.5">
                      <Medal className="w-4 h-4 text-gold-600" />
                      <span className="uppercase tracking-wider">{item.organizer}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-navy-950 group-hover:text-amber-800 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 font-light mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {item.teamMembers}
                    </span>
                    <span className="font-bold text-gold-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Enlarge <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONTINUOUS MOVING MARQUEE OF THE 4 GIVEN ACHIEVEMENTS */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden py-6 bg-amber-950/[0.03] border-y border-amber-900/10">
        {/* Left & Right Elegant Edge Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20" />

        {/* Continuous Smooth Infinite Marquee Track */}
        <div className="flex animate-marquee-left space-x-6 items-center">
          {marqueePhotos.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setSelectedAchievement(item)}
              className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[440px] aspect-[16/11] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border-2 border-slate-200/80 hover:border-gold-400 transition-all duration-300 group bg-slate-900 cursor-pointer relative"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform image-render-crisp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
              
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gold-300 block mb-0.5">
                  {item.badge} {item.cashPrize ? `• ${item.cashPrize}` : ''}
                </span>
                <p className="text-xs sm:text-sm font-bold font-serif line-clamp-1">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LIGHTBOX FULLSCREEN MODAL */}
      {/* ========================================================================= */}
      {selectedAchievement && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedAchievement(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#0A182F] rounded-3xl border border-gold-400/60 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-navy-950/80 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>{selectedAchievement.title}</span>
                </h3>
                <p className="text-xs text-gold-400 mt-0.5 font-medium">
                  {selectedAchievement.organizer} &bull; {selectedAchievement.year}
                </p>
              </div>

              <button
                onClick={() => setSelectedAchievement(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-3 sm:p-4 overflow-auto flex-1 flex items-center justify-center bg-black/60">
              <img
                src={selectedAchievement.image}
                alt={selectedAchievement.title}
                className="max-h-[65vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-navy-950/95 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="text-slate-300 font-light max-w-2xl">
                <span className="font-bold text-gold-300">{selectedAchievement.badge}: </span>
                {selectedAchievement.description}
              </div>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold transition-all flex-shrink-0 cursor-pointer"
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
