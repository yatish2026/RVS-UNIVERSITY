import React from 'react';
import { Quote, Star, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { TESTIMONIALS } from '../../data/universityData';
import { Reveal } from '../ui/Reveal';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#F8FAFC] overflow-hidden">
      <div className="container-custom">
        <Reveal direction="fade">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeading
              number="12"
              eyebrow="Voices of RVS"
              title="Student & Alumni Stories"
              subtitle="Discover how an education at RVS University propels ambitious minds into trailblazing careers across the globe."
              align="center"
            />
          </div>
        </Reveal>

        {/* Testimonials Grid with Left, Up, Right Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => {
            const direction = idx === 0 ? 'left' : idx === 1 ? 'up' : 'right';
            return (
              <Reveal
                key={t.id}
                direction={direction}
                delay={idx * 120}
              >
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group h-full">
                  <div>
                    {/* Quote Icon & Stars */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center">
                        <Quote className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1 text-gold-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    {/* Quote Content */}
                    <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold-400"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-navy-950 group-hover:text-gold-600 transition-colors">
                        {t.name}
                      </h4>
                      <div className="text-xs text-gold-600 font-semibold">{t.companyOrRole}</div>
                      <div className="text-[11px] text-slate-600">{t.batch}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
