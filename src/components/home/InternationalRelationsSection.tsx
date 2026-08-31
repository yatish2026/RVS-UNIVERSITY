import React from 'react';
import { Globe, Plane, Award, Users2, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export const InternationalRelationsSection: React.FC = () => {
  const globalPillars = [
    {
      icon: Globe,
      title: 'Global University MoUs',
      description: 'Strategic academic agreements with leading international universities across the US, UK, Europe, and Southeast Asia.',
      direction: 'left' as const,
    },
    {
      icon: Plane,
      title: 'Semester Abroad & Exchanges',
      description: 'Opportunities for students to complete credit-bearing study semesters and summer research internships internationally.',
      direction: 'up' as const,
    },
    {
      icon: Users2,
      title: 'Visiting International Faculty',
      description: 'Specialized modular courses, masterclasses, and keynote sessions delivered by global researchers.',
      direction: 'up' as const,
    },
    {
      icon: Award,
      title: 'Dual Degree Pathways',
      description: 'Integrated pathway programs enabling students to earn recognized global degrees with partner institutions.',
      direction: 'right' as const,
    },
  ];

  return (
    <section id="international-relations" className="py-20 lg:py-28 bg-[#F8FAFC] overflow-hidden">
      <div className="container-custom">
        <Reveal direction="fade">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <SectionHeading
              number="09"
              eyebrow="Global Footprint"
              title="Connecting Knowledge Across Borders"
              subtitle="RVS University provides students with a truly global perspective through international research collaborations, student exchange programs, and foreign university partnerships."
              align="center"
            />
          </div>
        </Reveal>

        {/* Global Cards Grid with Multi-Directional Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {globalPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={idx}
                direction={item.direction}
                delay={idx * 100}
              >
                <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group h-full">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center mb-6 group-hover:bg-navy-900 group-hover:text-gold-400 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-navy-950 mb-2 leading-snug group-hover:text-gold-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-gold-600 uppercase tracking-wider">
                      Global Gateway
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal direction="up" delay={300}>
          <div className="text-center">
            <Button
              variant="primary-navy"
              size="md"
              href="#international-relations"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore International Programmes & MoUs
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
