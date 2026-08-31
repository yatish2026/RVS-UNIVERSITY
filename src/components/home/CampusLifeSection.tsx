import React from 'react';
import { Home, Trophy, Book, Users, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export const CampusLifeSection: React.FC = () => {
  const campusFeatures = [
    {
      title: 'Modern Residential Hostels',
      description: 'Separate, secure AC & Non-AC residential complexes for boys and girls with 24/7 security, Wi-Fi, and multi-cuisine dining.',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      icon: Home,
      tag: 'Residential Living',
      direction: 'left' as const,
    },
    {
      title: 'Olympic Sports & Athletics Complex',
      description: 'Cricket stadium, indoor badminton courts, basketball arena, athletic running tracks, and fully equipped gymnasium.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      icon: Trophy,
      tag: 'Sports & Fitness',
      direction: 'up' as const,
    },
    {
      title: 'Central Digital Library & Research Commons',
      description: 'Over 100,000+ volumes, IEEE/ScienceDirect e-journal access, collaborative study pods, and multimedia research stations.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      icon: Book,
      tag: 'Knowledge Hub',
      direction: 'up' as const,
    },
    {
      title: 'Tech Clubs & Cultural Societies',
      description: 'Vibrant student-run clubs including Google Developer Group, Coding Guild, Robotics Society, Music & Theatre Guild.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      icon: Users,
      tag: 'Vibrant Community',
      direction: 'right' as const,
    },
  ];

  return (
    <section id="campus-life" className="py-20 lg:py-28 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal direction="left">
            <SectionHeading
              number="06"
              eyebrow="Student Experience & Infrastructure"
              title="Life on a 100+ Acre Smart Campus"
              subtitle="From high-tech learning spaces and vibrant student festivals to competitive athletics and serene residential greens, experience a truly holistic university life."
            />
          </Reveal>

          <Reveal direction="right">
            <Button
              variant="outline-navy"
              size="md"
              href="#campus-life-gallery"
              icon={<ArrowRight className="w-4 h-4" />}
              className="self-start md:self-auto"
            >
              Explore Campus Tour
            </Button>
          </Reveal>
        </div>

        {/* Campus Features Grid with Left/Up/Right Multi-Directional Entrances */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {campusFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={idx}
                direction={item.direction}
                delay={idx * 100}
              >
                <div className="group relative rounded-2xl overflow-hidden bg-navy-950 text-white shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-[380px] justify-between p-6 border border-slate-200">
                  {/* Background Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20" />

                  {/* Top Tag & Icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-navy-900/90 text-gold-300 border border-gold-500/30">
                      {item.tag}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10">
                    <h3 className="font-serif text-lg font-bold text-white mb-2 leading-snug group-hover:text-gold-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
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
