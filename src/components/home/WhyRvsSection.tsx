import React from 'react';
import { Target, Eye, ShieldCheck, Sparkles, ArrowRight, GraduationCap, Award } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export const WhyRvsSection: React.FC = () => {
  return (
    <section id="welcome" className="py-20 lg:py-28 bg-[#F1F5F9] border-y border-slate-200 overflow-hidden scroll-mt-20">
      <div className="container-custom px-4 md:px-8">
        
        {/* 1. Centered Section Header for Perfect Alignment */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <Reveal direction="fade" delay={50}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-950 text-gold-300 text-xs font-bold uppercase tracking-[0.2em] shadow-md border border-gold-500/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
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
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto">
              Welcome to RVS University, where learning knows no bounds. Whether you're a student, professional, or lifelong learner, our ecosystem empowers you to thrive and lead.
            </p>
          </Reveal>
        </div>

        {/* 2. Balanced Side-by-Side Grid with Flush Height Matching */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Full-Height Balanced 4-Quadrant Campus Life Image Showcase */}
          <div className="lg:col-span-6 flex flex-col">
            <Reveal direction="left" delay={200} className="h-full">
              <div className="relative h-full flex flex-col justify-between rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-navy-950 group min-h-[480px]">
                {/* Main Photo Asset */}
                <img
                  src="/images/welcome-rvs-collage.jpg"
                  alt="Welcome to RVS University - Library, Auditorium, Green Campus & High-Tech Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                />
                
                {/* Multi-Stop Dark Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent pointer-events-none" />

                {/* Top Corner Floating Tag */}
                <div className="relative z-10 p-5 flex justify-end">
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-navy-950/80 text-gold-300 border border-gold-400/40 backdrop-blur-md shadow-lg">
                    Estd. 1998 &bull; 100+ Acres
                  </span>
                </div>

                {/* Bottom Experience Badge */}
                <div className="relative z-10 p-5 md:p-6">
                  <div className="p-4 rounded-2xl bg-navy-950/90 border border-gold-400/40 backdrop-blur-md text-white shadow-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold shadow-md">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-serif font-bold text-white">Empowering 10,000+ Students</div>
                        <div className="text-[11px] text-gold-300 font-medium">Urban & Rural Higher Education Pioneers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Mission, Vision & Quality Policy in High-Contrast Luxury Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Card 1: Our Mission */}
            <Reveal direction="right" delay={150}>
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-l-gold-500 border-y border-r border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-navy-950 text-gold-400 flex items-center justify-center flex-shrink-0 shadow-md group-hover:bg-gold-500 group-hover:text-navy-950 transition-all">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-navy-950 mb-1 group-hover:text-gold-700 transition-colors">
                    Our Mission
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    Providing quality education, student-centered teaching-learning processes and state-of-the-art infrastructure for professional aspirants hailing from both rural and urban areas.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Vision */}
            <Reveal direction="right" delay={250}>
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-l-navy-900 border-y border-r border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-navy-950 text-gold-400 flex items-center justify-center flex-shrink-0 shadow-md group-hover:bg-navy-900 group-hover:text-gold-300 transition-all">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-navy-950 mb-1 group-hover:text-gold-700 transition-colors">
                    Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    Carving the youth as dynamic, competent, valued and knowledgeable professionals who shall lead the Nation to a better future.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Quality Policy */}
            <Reveal direction="right" delay={350}>
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-l-4 border-l-gold-500 border-y border-r border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-navy-950 text-gold-400 flex items-center justify-center flex-shrink-0 shadow-md group-hover:bg-gold-500 group-hover:text-navy-950 transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-navy-950 mb-1 group-hover:text-gold-700 transition-colors">
                    Quality Policy
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
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
