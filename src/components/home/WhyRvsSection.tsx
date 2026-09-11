import React from 'react';
import { Target, Eye, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

import whyRvsCollageImg from '../../assets/why-rvs-collage.png';

export const WhyRvsSection: React.FC = () => {
  return (
    <section id="welcome" className="relative py-20 lg:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE0] to-[#FAF7F2] text-navy-950 border-b border-amber-900/10 overflow-hidden scroll-mt-20">
      
      {/* Subtle Warm Accent Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#B8860B 1px, transparent 1px)', backgroundSize: '36px 36px' }}
      />

      <div className="container-custom px-4 md:px-8 relative z-10">
        
        {/* 1. Centered Section Header for Perfect Alignment */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <Reveal direction="fade" delay={50}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 text-gold-800 text-xs font-bold uppercase tracking-[0.2em] shadow-sm border border-gold-400/40 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>WELCOME TO RVS UNIVERSITY</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-navy-950 leading-[1.15] mb-4">
              The Place Where You Can <br />
              <span className="gold-gradient-text">Achieve Your Goals.</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={150}>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Welcome to RVS University, where learning knows no bounds. Whether you're a student, professional, or lifelong learner, our ecosystem empowers you to thrive and lead.
            </p>
          </Reveal>
        </div>

        {/* 2. Balanced Side-by-Side Grid with Flush Height Matching */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Authentic Student Life & Campus Montage */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal direction="left" delay={200}>
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 transform hover:scale-[1.01]">
                <img
                  src={whyRvsCollageImg}
                  alt="RVS University Student Life & Academic Excellence Montage"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain drop-shadow-2xl will-change-transform rounded-3xl"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Mission, Vision & Quality Policy in High-Contrast Luxury White Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Card 1: Our Mission */}
            <Reveal direction="right" delay={150}>
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-l-gold-500 border-y border-r border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-gold-400 transition-all duration-300 flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-gold-700 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-gold-500 group-hover:text-navy-950 transition-all border border-amber-200">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-navy-950 mb-1 group-hover:text-gold-700 transition-colors">
                    Our Mission
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Providing quality education, student-centered teaching-learning processes and state-of-the-art infrastructure for professional aspirants hailing from both rural and urban areas.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Vision */}
            <Reveal direction="right" delay={250}>
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-l-navy-900 border-y border-r border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-gold-400 transition-all duration-300 flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-navy-900 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-navy-900 group-hover:text-gold-300 transition-all border border-slate-200">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-navy-950 mb-1 group-hover:text-gold-700 transition-colors">
                    Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Carving the youth as dynamic, competent, valued and knowledgeable professionals who shall lead the Nation to a better future.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Quality Policy */}
            <Reveal direction="right" delay={350}>
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-l-gold-500 border-y border-r border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-gold-400 transition-all duration-300 flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-gold-700 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-gold-500 group-hover:text-navy-950 transition-all border border-amber-200">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-navy-950 mb-1 group-hover:text-gold-700 transition-colors">
                    Quality Policy
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    RVS University strides towards excellence by adopting a system of qualitative policies and processes with continued improvements to enhance students’ skills and talents for their exemplary contribution to the society, the nation and the world.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Action CTA Buttons */}
            <Reveal direction="up" delay={450}>
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Button
                  variant="gold"
                  size="md"
                  href="#departments"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Academic Pathways
                </Button>

                <Button
                  variant="outline-navy"
                  size="md"
                  href="#about-chairman"
                >
                  Meet Leadership
                </Button>
              </div>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
};
