import React from 'react';
import { ShieldCheck, Award, BookOpen, Globe2, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import convocationImg from '../../assets/064A7319.JPG';

export const UniversityIntro: React.FC = () => {
  return (
    <section id="intro" className="py-20 lg:py-28 bg-gradient-to-b from-[#F5F8FC] via-[#ECF2F8] to-[#F5F8FC] text-navy-950 border-b border-slate-200/80 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Slides from LEFT */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="left" delay={100}>
              <SectionHeading
                number="01"
                eyebrow="Institutional Overview"
                title="A Legacy of Visionary Education. A Hub for Global Innovation."
                subtitle="RVS University stands at the intersection of rigorous academic tradition and 21st-century technological disruption."
                variant="dark"
              />
            </Reveal>

            <Reveal direction="left" delay={200}>
              <div className="space-y-4 text-slate-600 text-base md:text-lg leading-relaxed font-normal">
                <p>
                  Established under the <strong className="text-navy-950 font-semibold">Andhra Pradesh Private Universities Act</strong>, RVS University in Chittoor is envisioned as a premier seat of higher learning, multidisciplinary research, and entrepreneurial leadership.
                </p>
                <p>
                  Anchored by state-of-the-art infrastructure spanning over <strong className="text-gold-700 font-semibold">65+ acres</strong> along the Tirupathi highway, the university integrates foundational sciences, emerging computing architectures, core engineering disciplines, and business management with national priorities like NEP 2020.
                </p>
              </div>
            </Reveal>

            {/* Core Values Badges */}
            <Reveal direction="left" delay={300}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-md">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-gold-700 border border-amber-200">
                    <Award className="w-5 h-5 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-950">Statutory Excellence</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Recognized under State Gazette & regulatory bodies.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-md">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-gold-700 border border-amber-200">
                    <Globe2 className="w-5 h-5 text-gold-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-950">Global Collaborations</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Academic MoUs with international research institutions.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={400}>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  variant="gold"
                  size="md"
                  href="#about"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Read Chancellor & VC Messages
                </Button>
                <Button
                  variant="outline-navy"
                  size="md"
                  href="#admissions-prospectus"
                >
                  Download University Charter
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Graduation Day Students Visual Composition with Organic Frame */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="right" delay={200}>
              {/* Organic Framing & Geometry Accents */}
              <div className="relative">
                {/* Decorative Colored Geometry Rings */}
                <div className="absolute -top-6 -right-6 w-48 h-48 rounded-full bg-gradient-to-tr from-gold-500/20 to-gold-400/5 -z-10 blur-xl pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent -z-10 blur-xl pointer-events-none" />

                {/* Main Image Frame with Smooth Rounded Corners & Drop Shadow */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-400/40 bg-navy-950">
                  <img
                    src={convocationImg}
                    alt="RVS University students celebrating on graduation day"
                    className="w-full h-[440px] md:h-[500px] object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-slate-200 text-navy-950 text-xs font-bold backdrop-blur-md shadow-lg">
                      <GraduationCap className="w-4 h-4 text-gold-600" />
                      <span>Class of 2026</span>
                    </div>
                  </div>

                  {/* Floating Chancellor's Vision Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 border border-slate-200/90 backdrop-blur-md text-navy-950 shadow-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gold-700">
                        Chancellor's Vision
                      </span>
                    </div>
                    <p className="text-xs md:text-sm italic text-slate-700 leading-snug mb-3 font-normal">
                      &ldquo;Our vision is to nurture ethical innovators who don't just seek jobs, but create transformative solutions for societal advancement.&rdquo;
                    </p>
                    <div className="text-xs font-semibold text-gold-700 flex items-center justify-between">
                      <span>RVS University Leadership Council</span>
                      <span className="text-[10px] text-slate-500 font-normal">Chittoor, AP</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Geometric Outline Circles */}
                <div className="absolute -bottom-3 -right-3 w-32 h-32 rounded-3xl border-2 border-gold-400/30 -z-10" />
                <div className="absolute -top-3 -left-3 w-32 h-32 rounded-3xl border-2 border-slate-300/40 -z-10" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
