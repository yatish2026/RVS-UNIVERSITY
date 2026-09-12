import React from 'react';
import { 
  Home, Trophy, HeartPulse, Bus, Code, Music, Users, Leaf, 
  ArrowRight, Sparkles 
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

import healthHospitalImg from '../../assets/DJI_0827.JPG';
import techLabImg from '../../assets/064A8014.JPG';
import culturalFestImg from '../../assets/064A6024.JPG';
import greenCampusImg from '../../assets/Screenshot 2026-08-25 120528.png';
import campusBoulevardImg from '../../assets/Screenshot 2026-08-25 123337.png';

export const CampusLifeSection: React.FC = () => {
  const campusFeatures = [
    {
      title: 'Hostels & Dining Halls',
      description: '375 modern rooms for Boys (269) and Girls (129) located 0.5km from campus with college bus shuttle, high-speed Wi-Fi & hygienic multicuisine mess.',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      icon: Home,
      tag: 'Residential Living',
      href: '#hostels',
    },
    {
      title: 'Sports & Athletic Complex',
      description: 'Cricket stadium, Olympic-grade running track, 4-court indoor badminton arena, floodlit basketball & volleyball courts, and modern gym.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      icon: Trophy,
      tag: 'Sports & Fitness',
      href: '#sports',
    },
    {
      title: 'Health Center & Ambulance',
      description: '24/7 on-campus health clinic staffed by resident doctors & nurses, emergency pharmacy, and attached multi-specialty hospital backup.',
      image: healthHospitalImg,
      icon: HeartPulse,
      tag: '24/7 Wellness',
      href: '#health',
    },
    {
      title: 'Campus Safety & Transport',
      description: '500+ HD CCTV surveillance grid, biometric security gates, and 45+ GPS-tracked bus fleet connecting Chittoor, Tirupati, and Vellore.',
      image: campusBoulevardImg,
      icon: Bus,
      tag: '45+ Bus Fleet',
      href: '#safety',
    },
    {
      title: 'Student Technical Societies',
      description: 'Coding Guild, Robotics & Drone labs, AI builders, IEEE & CSI Student Chapters winning Smart India Hackathons (SIH) and national prizes.',
      image: techLabImg,
      icon: Code,
      tag: 'Hackathons Hub',
      href: '#tech-clubs',
    },
    {
      title: 'Cultural Fest & Arts Guild',
      description: 'Flagship 3-day annual festival "SELESTA", music bands, street theatre, literary societies, dance troupes, and digital media exhibitions.',
      image: culturalFestImg,
      icon: Music,
      tag: 'SELESTA Fest',
      href: '#cultural-fest',
    },
    {
      title: 'NSS & Community Outreach',
      description: '5 adopted rural villages for clean water & sanitation, annual mega blood donation drives (1,000+ units), and digital literacy programs.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      icon: Users,
      tag: 'Social Impact',
      href: '#nss',
    },
    {
      title: 'Eco-Friendly Green Campus',
      description: '500 kW rooftop solar plant, 100% rainwater percolation pits, sewage water recycling, and lush green biodiversity across 65+ acres.',
      image: greenCampusImg,
      icon: Leaf,
      tag: 'Solar & Green',
      href: '#green-campus',
    },
  ];

  return (
    <section id="campus-life" className="relative py-20 lg:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE0] to-[#FAF7F2] text-navy-950 border-b border-amber-900/10 overflow-hidden">
      <div className="container-custom px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Student Experience & Infrastructure"
              title="Life on a Smart Campus"
              subtitle="From high-tech learning spaces and vibrant student festivals to competitive athletics and serene residential greens, experience a truly holistic university life."
              variant="dark"
            />
          </Reveal>

          <Reveal direction="right">
            <Button
              variant="outline-navy"
              size="md"
              href="#hostels"
              icon={<ArrowRight className="w-4 h-4" />}
              className="self-start md:self-auto"
            >
              Explore Campus Hub
            </Button>
          </Reveal>
        </div>

        {/* Campus Features 8-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {campusFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={idx}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={(idx % 4) * 80}
              >
                <a
                  href={item.href}
                  className="group relative rounded-3xl overflow-hidden bg-navy-950 text-white shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-[380px] justify-between p-6 border border-slate-200/90 hover:border-gold-400 block cursor-pointer transform hover:-translate-y-1.5"
                >
                  {/* Background Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/65 to-navy-950/25" />

                  {/* Top Tag & Icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 text-navy-950 border border-slate-200/90 shadow-md">
                      {item.tag}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-gold-300 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-white leading-snug group-hover:text-gold-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-200 line-clamp-2 font-light leading-relaxed">
                      {item.description}
                    </p>
                    <div className="pt-2 flex items-center gap-1 text-xs font-bold text-gold-300 group-hover:text-gold-200 group-hover:translate-x-1 transition-all">
                      <span>Explore Facility</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
