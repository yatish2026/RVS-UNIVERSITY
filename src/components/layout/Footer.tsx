import React from 'react';
import { 
  MapPin, Phone, Mail, Facebook, 
  Instagram, Youtube, ArrowRight 
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import svcetCampusImg from '../../assets/SVCET1.png';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0A0704] text-white overflow-hidden border-t-2 border-[#D4BC9F]/40 select-none">
      {/* 1. CAMPUS PHOTO BACKGROUND (SVCET1.png, Visible around 70%) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center scale-105 transition-all duration-300"
        style={{ 
          backgroundImage: `url(${svcetCampusImg})`,
          opacity: 0.70,
          filter: 'brightness(0.92) contrast(1.08)'
        }}
      />
      
      {/* Translucent Dark Vignette - Keeps Sunset 70% Visible while Text Remains Pristine */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-black/35 to-black/65" />
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-amber-500/15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 container-custom px-4 md:px-8">
        
        {/* ========================================================================= */}
        {/* TOP INSTITUTIONAL BAR & CONNECT WITH US */}
        {/* ========================================================================= */}
        <div className="border-b border-white/15 py-10 md:py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left: Official University Logo & Summary Paragraph */}
            <div className="max-w-xl w-full space-y-3">
              <Logo variant="light" size="md" className="max-w-full" />
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                RVS University is a premier multidisciplinary institution established under the Andhra Pradesh Private Universities Act, dedicated to fostering next-generation leaders across computing, engineering, management, and healthcare.
              </p>
            </div>

            {/* Right: Connect With Us & Social Media Icons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                Connect With Us:
              </span>
              <div className="flex items-center gap-3">
                {/* 1. Instagram */}
                <a
                  href="https://www.instagram.com/rvsuniversityofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="RVS University Official Instagram"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 text-white border border-white/20 hover:border-pink-400 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-md group cursor-pointer"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>

                {/* 2. YouTube */}
                <a
                  href="https://www.youtube.com/@rvs_university"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="RVS University Official YouTube Channel"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#FF0000] text-white border border-white/20 hover:border-[#FF0000] backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-md group cursor-pointer"
                  title="YouTube"
                >
                  <Youtube className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>

                {/* 3. Facebook */}
                <a
                  href="https://www.facebook.com/p/RVSUniversityofficial-61593336956152/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="RVS University Official Facebook Page"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white border border-white/20 hover:border-[#1877F2] backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-md group cursor-pointer"
                  title="Facebook"
                >
                  <Facebook className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN 6-COLUMN FOOTER LINKS (Spacious, Sharp Arrow Bullets, High Legibility) */}
        {/* ========================================================================= */}
        <div className="py-14 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 xl:gap-8">
            
            {/* COLUMN 1: ABOUT RVS */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide border-b-2 border-[#C6832B] pb-2 inline-block drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                About RVS
              </h4>
              <ul className="space-y-2.5 pt-1">
                {[
                  { label: 'Overview', href: '#about-overview' },
                  { label: 'Leadership', href: '#about-leadership' },
                  { label: 'Governance', href: '#about-governance' },
                  { label: 'Administration', href: '#about-administration' },
                  { label: 'Ranking & Accreditation', href: '#about-ranking-accreditation' },
                  { label: 'IQAC Cell', href: '#about-iqac' },
                  { label: 'Contact Us', href: '#contact-us' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href={item.href}
                      className="group flex items-center gap-2 text-slate-100 hover:text-amber-300 font-medium text-[13px] sm:text-[13.5px] transition-colors leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] cursor-pointer"
                    >
                      <span className="text-[#C6832B] group-hover:text-amber-300 font-black text-sm transition-transform group-hover:translate-x-1 flex-shrink-0">
                        ›
                      </span>
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: ACADEMIC SCHOOLS */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide border-b-2 border-[#C6832B] pb-2 inline-block drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Academic Schools
              </h4>
              <ul className="space-y-2.5 pt-1">
                {[
                  { label: 'Engineering & Tech (SOET)', href: '#course-school-soet' },
                  { label: 'Computer Science (SCSE)', href: '#course-school-scse' },
                  { label: 'AI & Data Science (SAID)', href: '#course-school-said' },
                  { label: 'Computing & Info (SCIS)', href: '#course-school-scis' },
                  { label: 'Management Studies (SOMS)', href: '#course-school-soms' },
                  { label: 'Allied Health Sciences (SAHS)', href: '#course-school-sahs' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href={item.href}
                      className="group flex items-center gap-2 text-slate-100 hover:text-amber-300 font-medium text-[13px] sm:text-[13.5px] transition-colors leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] cursor-pointer"
                    >
                      <span className="text-[#C6832B] group-hover:text-amber-300 font-black text-sm transition-transform group-hover:translate-x-1 flex-shrink-0">
                        ›
                      </span>
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: ADMISSIONS 2026 */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide border-b-2 border-[#C6832B] pb-2 inline-block drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Admissions 2026
              </h4>
              <ul className="space-y-2.5 pt-1">
                {[
                  { label: 'B.Tech Engineering', href: '#admissions' },
                  { label: 'MBA & BBA Programs', href: '#admissions' },
                  { label: 'BCA & MCA Programs', href: '#admissions' },
                  { label: 'Allied Health & Paramedical', href: '#admissions' },
                  { label: 'Scholarship Matrix', href: '#admissions' },
                  { label: 'International Admissions', href: '#admissions' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href={item.href}
                      className="group flex items-center gap-2 text-slate-100 hover:text-amber-300 font-medium text-[13px] sm:text-[13.5px] transition-colors leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] cursor-pointer"
                    >
                      <span className="text-[#C6832B] group-hover:text-amber-300 font-black text-sm transition-transform group-hover:translate-x-1 flex-shrink-0">
                        ›
                      </span>
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 4: CAMPUS LIFE HUB */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide border-b-2 border-[#C6832B] pb-2 inline-block drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Campus Life Hub
              </h4>
              <ul className="space-y-2.5 pt-1">
                {[
                  { label: 'Campus Photo Gallery (15+ Photos)', href: '#gallery' },
                  { label: 'Central Digital Library (85k+ Books)', href: '#academic-about-library' },
                  { label: 'Hostels & Dining (375 Rooms)', href: '#hostels' },
                  { label: 'Sports Complex & Stadium', href: '#sports' },
                  { label: 'Health Center & Ambulance', href: '#health' },
                  { label: 'Safety & Transport Fleet', href: '#safety' },
                  { label: 'Technical Societies', href: '#tech-clubs' },
                  { label: 'SELESTA Cultural Fest', href: '#cultural-fest' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href={item.href}
                      className="group flex items-center gap-2 text-slate-100 hover:text-amber-300 font-medium text-[13px] sm:text-[13.5px] transition-colors leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] cursor-pointer"
                    >
                      <span className="text-[#C6832B] group-hover:text-amber-300 font-black text-sm transition-transform group-hover:translate-x-1 flex-shrink-0">
                        ›
                      </span>
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 5: QUICK PORTALS */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide border-b-2 border-[#C6832B] pb-2 inline-block drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Quick Portals
              </h4>
              <ul className="space-y-2.5 pt-1">
                {[
                  { label: 'Exam Portal & Results', href: '#exam-portal' },
                  { label: 'Exam Schedules & Timetables', href: '#exam-schedules' },
                  { label: 'Exam Notifications', href: '#exam-notifications' },
                  { label: 'Directorate of Research', href: '#research-overview' },
                  { label: 'Central Digital Library', href: '#academic-about-library' },
                  { label: 'ATAL IDEA Lab', href: '#atal-idea-lab' },
                  { label: 'IQAC Cell', href: '#about-iqac' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <a 
                      href={item.href}
                      className="group flex items-center gap-2 text-slate-100 hover:text-amber-300 font-medium text-[13px] sm:text-[13.5px] transition-colors leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] cursor-pointer"
                    >
                      <span className="text-[#C6832B] group-hover:text-amber-300 font-black text-sm transition-transform group-hover:translate-x-1 flex-shrink-0">
                        ›
                      </span>
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 6: CONTACT CAMPUS */}
            <div className="space-y-4">
              <h4 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide border-b-2 border-[#C6832B] pb-2 inline-block drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Contact Campus
              </h4>
              <div className="space-y-3 pt-1 text-slate-100 text-[13px] sm:text-[13.5px] leading-relaxed">
                
                {/* Campus Address with Red MapPin */}
                <div className="flex items-start gap-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                  <span className="font-medium">
                    R.V.S Nagar, Tirupathi Road, Chittoor, Andhra Pradesh – 517127
                  </span>
                </div>

                {/* Telephone with Red Phone */}
                <div className="flex items-start gap-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                  <Phone className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                  <div className="flex flex-col gap-0.5">
                    <a href="tel:+919669660155" className="hover:text-amber-300 font-bold transition-colors">
                      +91 9669660155
                    </a>
                    <a href="tel:+919669660214" className="hover:text-amber-300 font-bold transition-colors">
                      +91 9669660214
                    </a>
                  </div>
                </div>

                {/* Email with Red Mail */}
                <div className="flex items-center gap-2.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                  <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <a href="mailto:info@rvsu.org" className="hover:text-amber-300 font-bold transition-colors truncate">
                    info@rvsu.org
                  </a>
                </div>

                {/* Bold Golden "Get Directions" CTA Button */}
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=RVS+University+Chittoor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-500 text-black font-extrabold text-[11.5px] uppercase tracking-wider shadow-lg hover:shadow-amber-500/30 transition-all transform hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Get Directions</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* BOTTOM COPYRIGHT & LEGAL STRIP */}
      {/* ========================================================================= */}
      <div className="relative z-10 border-t border-white/10 bg-black/75 backdrop-blur-md py-5">
        <div className="container-custom px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 font-medium">
          <div>
            © {new Date().getFullYear()} RVS University, Chittoor. All Rights Reserved. • UGC Autonomous & AICTE Approved
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-slate-300">
            <a href="#privacy-policy" className="hover:text-amber-400 transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#terms-of-use" className="hover:text-amber-400 transition-colors cursor-pointer">Terms of Use</a>
            <a href="#accessibility" className="hover:text-amber-400 transition-colors cursor-pointer">Accessibility</a>
            <a href="#anti-ragging" className="hover:text-amber-400 transition-colors cursor-pointer">Anti-Ragging Policy</a>
            <a href="#sitemap" className="hover:text-amber-400 transition-colors cursor-pointer">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
