import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

import photo1 from '../../assets/064A4797.JPG';
import photo2 from '../../assets/DSC_0696.JPG';
import photo3 from '../../assets/064A8652.JPG';
import photo4 from '../../assets/064A8326.JPG';
import photo5 from '../../assets/064A6024.JPG';
import photo6 from '../../assets/064A5518.JPG';
import photo7 from '../../assets/064A7319.JPG';
import photo8 from '../../assets/064A7604.JPG';
import photo9 from '../../assets/064A8014.JPG';
import photo10 from '../../assets/064A8021.JPG';
import photo11 from '../../assets/064A8040.JPG';
import photo12 from '../../assets/DSC06305.JPG';
import photo13 from '../../assets/DSC06265.JPG';
import photo14 from '../../assets/students_placed.JPG';

export const StudentAchievementsSection: React.FC = () => {
  const achievementPhotos = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo7,
    photo8,
    photo9,
    photo10,
    photo11,
    photo12,
    photo13,
    photo14,
  ];

  // Duplicate list to ensure a seamless, non-jittery 60fps infinite marquee loop
  const marqueePhotos = [...achievementPhotos, ...achievementPhotos];

  return (
    <section 
      id="achievements" 
      className="relative py-16 lg:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F3EDE2] to-[#FAF7F2] text-navy-950 border-b border-amber-900/10 overflow-hidden scroll-mt-20"
    >
      <div className="container-custom px-4 md:px-8 mb-10 md:mb-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal direction="down" delay={100}>
            <SectionHeading
              eyebrow="Campus Glory & Accolades"
              title="Our Students' Achievements"
              subtitle="Glimpses of our scholars, national hackathon finalists, championship medalists, and innovators in action across premier events."
              variant="dark"
              align="center"
            />
          </Reveal>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CONTINUOUS MOVING PHOTO STREAM (4 PHOTOS VISIBLE AT A TIME, NO TEXT) */}
      {/* ========================================================================= */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Elegant Edge Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20" />

        {/* Continuous Smooth Infinite Marquee Track */}
        <div className="flex animate-marquee-left space-x-4 sm:space-x-6 items-center">
          {marqueePhotos.map((photo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] sm:w-[46vw] md:w-[31vw] lg:w-[calc(25vw-1.5rem)] xl:w-[calc(25vw-1.75rem)] max-w-[420px] aspect-[4/3] sm:aspect-[16/11] md:h-[340px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border-2 border-slate-200/80 hover:border-gold-400 transition-all duration-500 group bg-slate-900"
            >
              <img
                src={photo}
                alt={`Student Achievement ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform image-render-crisp"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
