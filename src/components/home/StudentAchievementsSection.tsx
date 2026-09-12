import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

interface AchievementPhoto {
  id: string;
  image: string;
  title: string;
  badge: string;
}

const ACHIEVEMENT_PHOTOS: AchievementPhoto[] = [
  {
    id: 'sih-finale-2024',
    image: '/images/achievement-sih-finale.jpg',
    title: 'Smart India Hackathon (SIH 2024) Grand Finale Winners',
    badge: 'National Hackathon Championship',
  },
  {
    id: 'intellecthon-30k',
    image: '/images/achievement-intellecthon-30k.png',
    title: 'Intellecthon \'25 National Hackathon — Runner Up (₹30,000 Cheque)',
    badge: '₹30,000 Cash Award',
  },
  {
    id: 'selesta-2k25',
    image: '/images/achievement-selesta-prosovo.jpg',
    title: 'Selesta 2k25 — 40 Years of Excellence Stage Felicitation Ceremony',
    badge: 'Stage Champions',
  },
  {
    id: 'impactx-2k25',
    image: '/images/achievement-impactx-hackathon.png',
    title: 'IMPACTX-2K25 National Innovation Challenge (₹15,000 Award)',
    badge: '₹15,000 Cash Prize',
  },
];

export const StudentAchievementsSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<AchievementPhoto | null>(null);

  // Repeat sequence for continuous, buttery-smooth infinite marquee
  const marqueePhotos = [
    ...ACHIEVEMENT_PHOTOS,
    ...ACHIEVEMENT_PHOTOS,
    ...ACHIEVEMENT_PHOTOS,
    ...ACHIEVEMENT_PHOTOS,
  ];

  return (
    <section 
      id="achievements" 
      className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F3EDE2] to-[#FAF7F2] text-navy-950 border-b border-amber-900/10 overflow-hidden scroll-mt-20"
    >
      <div className="container-custom px-4 md:px-8 mb-10 md:mb-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal direction="down" delay={100}>
            <SectionHeading
              eyebrow="Campus Glory & Accolades"
              title="Our Students' Achievements"
              subtitle="Real glimpses of our scholars, Smart India Hackathon finalists, national cash prize winners, and campus innovators in action."
              variant="dark"
              align="center"
            />
          </Reveal>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CONTINUOUS SMOOTH MOVING PHOTO STREAM (ONLY SCROLLING IMAGES) */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Edge Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20" />

        {/* Continuous Smooth Infinite Marquee Track */}
        <div className="flex animate-marquee-left space-x-5 sm:space-x-8 items-center">
          {marqueePhotos.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => setSelectedPhoto(item)}
              className="flex-shrink-0 w-[82vw] sm:w-[50vw] md:w-[38vw] lg:w-[460px] aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border-2 border-slate-200/90 hover:border-gold-500 transition-all duration-300 group bg-slate-900 cursor-pointer relative"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform image-render-crisp"
              />

              {/* Hover Quick View Overlay */}
              <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-400 text-navy-950 font-bold text-xs shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Eye className="w-4 h-4" />
                  <span>Click to Enlarge</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LIGHTBOX FULL-SIZE PHOTO VIEWER */}
      {/* ========================================================================= */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#0A182F] rounded-3xl border border-gold-400/60 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-navy-950/90 flex items-center justify-between">
              <h3 className="font-serif text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>{selectedPhoto.title}</span>
              </h3>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-3 sm:p-4 overflow-auto flex-1 flex items-center justify-center bg-black/60">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[72vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-navy-950/90 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-gold-300 font-medium">
                {selectedPhoto.badge}
              </span>
              <button
                onClick={() => setSelectedPhoto(null)}
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
