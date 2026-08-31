import React from 'react';
import { Sparkles, Phone, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { UNIVERSITY_INFO } from '../../data/universityData';
import { Reveal } from '../ui/Reveal';

export const CallToActionSection: React.FC = () => {
  return (
    <section id="admissions" className="py-20 lg:py-24 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-850 text-white relative overflow-hidden">
      {/* Subtle Grid / Glow */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <Reveal direction="fade" delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admissions Open For Academic Session 2026–27</span>
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal direction="zoom" delay={200}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Begin Your Journey at <br />
              <span className="gold-gradient-text">RVS University Today.</span>
            </h2>
          </Reveal>

          {/* Subtitle */}
          <Reveal direction="up" delay={300}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Step into a world-class academic environment designed to foster technological innovation, ethical leadership, and global career success.
            </p>
          </Reveal>

          {/* Quick Perks */}
          <Reveal direction="up" delay={400}>
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm text-slate-200 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                Merit Scholarships Available
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                NEP 2020 Aligned Curriculum
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
                100% Placement Assistance
              </span>
            </div>
          </Reveal>

          {/* CTA Buttons Group */}
          <Reveal direction="up" delay={500}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                variant="gold"
                size="lg"
                href="#admissions-portal"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                APPLY FOR ADMISSION 2026
              </Button>

              <Button
                variant="ghost-white"
                size="lg"
                href="#download-brochure"
                icon={<FileText className="w-5 h-5" />}
              >
                DOWNLOAD PROSPECTUS
              </Button>
            </div>
          </Reveal>

          {/* Admissions Counselor Helpline */}
          <Reveal direction="up" delay={600}>
            <div className="pt-6 border-t border-navy-800/80 max-w-md mx-auto flex items-center justify-center gap-3 text-xs text-slate-400">
              <span>Need guidance from an admission counselor?</span>
              <a
                href={`tel:${UNIVERSITY_INFO.phone}`}
                className="text-gold-300 hover:text-gold-200 font-bold flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                {UNIVERSITY_INFO.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
