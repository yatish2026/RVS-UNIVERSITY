import React from 'react';
import { Lightbulb, Rocket, Atom, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export const ResearchInnovationSection: React.FC = () => {
  return (
    <section id="research" className="py-20 lg:py-28 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with Floating Innovation Badges (Slides from LEFT) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <Reveal direction="left" delay={200}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                  alt="Research and Innovation in ATAL IDEA Lab at RVS University"
                  className="w-full h-[420px] md:h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-80" />

                {/* Floating Stat Card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-navy-900/95 border border-gold-500/30 text-white backdrop-blur-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
                      Intellectual Property
                    </span>
                    <span className="text-xs font-mono font-bold bg-gold-500/20 text-gold-300 px-2 py-0.5 rounded">
                      R&D Cell
                    </span>
                  </div>
                  <div className="text-2xl font-serif font-extrabold text-white">
                    35+ Patents Filed & Published
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Faculty and student research published in leading IEEE & Scopus indexed journals.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial & Facilities (Slides from RIGHT) */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <Reveal direction="right" delay={100}>
              <SectionHeading
                number="08"
                eyebrow="Research & Incubation"
                title="AICTE ATAL IDEA Lab & Startup Incubation"
                subtitle="Cultivating breakthrough ideas from proof-of-concept to commercialization through state-of-the-art rapid prototyping laboratories."
              />
            </Reveal>

            <Reveal direction="right" delay={200}>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  RVS University houses an <strong className="text-navy-950 font-semibold">AICTE-funded ATAL IDEA Lab</strong>, created to foster STEM innovation, electronics design, additive manufacturing, and product development among young innovators.
                </p>
                <p>
                  Through the <strong className="text-navy-950 font-semibold">RVS Student Startup Incubator</strong>, aspiring student founders receive seed grants, patent filing support, legal counsel, and direct access to angel investors.
                </p>
              </div>
            </Reveal>

            {/* Research Facilities Grid */}
            <Reveal direction="right" delay={300}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-navy-900 text-gold-400 flex items-center justify-center mb-3">
                    <Atom className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-navy-950 mb-1">Advanced 3D & SLS Printing</h4>
                  <p className="text-xs text-slate-600">Industrial additive manufacturing and CAD simulation workstations.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-navy-900 text-gold-400 flex items-center justify-center mb-3">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-navy-950 mb-1">Startup Incubation Grants</h4>
                  <p className="text-xs text-slate-600">Pre-seed funding and mentoring for student-led deep tech ventures.</p>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={400}>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  variant="primary-navy"
                  size="md"
                  href="#atal-idea-lab"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore ATAL IDEA Lab
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
