import React from 'react';
import { 
  MapPin, Phone, Mail, Facebook, 
  Instagram, Youtube, ArrowRight, ShieldCheck, Heart 
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { UNIVERSITY_INFO } from '../../data/universityData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800 text-sm">
      {/* Top Institutional Banner inside Footer */}
      <div className="border-b border-navy-850 py-12">
        <div className="container-custom flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <Logo variant="light" size="lg" />
            <p className="mt-4 text-xs text-slate-400 leading-relaxed font-light">
              RVS University is a premier multidisciplinary institution established under the Andhra Pradesh Private Universities Act, dedicated to fostering next-generation leaders across computing, engineering, management, and healthcare.
            </p>
          </div>

          {/* Social Links — Only Instagram, YouTube & Facebook */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400 font-sans">
              Connect With Us:
            </span>
            <div className="flex items-center gap-3">
              {/* 1. Instagram */}
              <a
                href="https://www.instagram.com/rvsuniversityofficial/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RVS University Official Instagram"
                className="w-10 h-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/50 hover:bg-navy-850 transition-all shadow-sm hover:scale-105"
              >
                <Instagram className="w-5 h-5" />
              </a>

              {/* 2. YouTube */}
              <a
                href="https://www.youtube.com/@rvs_university"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RVS University Official YouTube Channel"
                className="w-10 h-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-red-500 hover:border-red-500/50 hover:bg-navy-850 transition-all shadow-sm hover:scale-105"
              >
                <Youtube className="w-5 h-5" />
              </a>

              {/* 3. Facebook */}
              <a
                href="https://www.facebook.com/p/RVSUniversityofficial-61593336956152/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RVS University Official Facebook Page"
                className="w-10 h-10 rounded-xl bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/50 hover:bg-navy-850 transition-all shadow-sm hover:scale-105"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer Links */}
      <div className="py-16">
        <div className="container-custom grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Column 1: About */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-sans border-b border-navy-850 pb-2">
              About RVS
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about-overview" className="hover:text-gold-300 transition-colors">Overview</a></li>
              <li><a href="#about-leadership" className="hover:text-gold-300 transition-colors">Leadership</a></li>
              <li><a href="#about-governance" className="hover:text-gold-300 transition-colors">Governance</a></li>
              <li><a href="#about-administration" className="hover:text-gold-300 transition-colors">Administration</a></li>
              <li><a href="#about-ranking-accreditation" className="hover:text-gold-300 transition-colors">Ranking & Accreditation</a></li>
              <li><a href="#about-iqac" className="hover:text-gold-300 transition-colors">IQAC Cell</a></li>
              <li><a href="#contact-us" className="hover:text-gold-300 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 2: 6 Academic Schools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-sans border-b border-navy-850 pb-2">
              Academic Schools
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#course-school-soet" className="hover:text-gold-300 transition-colors">Engineering & Tech (SOET)</a></li>
              <li><a href="#course-school-scse" className="hover:text-gold-300 transition-colors">Computer Science (SCSE)</a></li>
              <li><a href="#course-school-said" className="hover:text-gold-300 transition-colors">AI & Data Science (SAID)</a></li>
              <li><a href="#course-school-scis" className="hover:text-gold-300 transition-colors">Computing & Info (SCIS)</a></li>
              <li><a href="#course-school-soms" className="hover:text-gold-300 transition-colors">Management Studies (SOMS)</a></li>
              <li><a href="#course-school-sahs" className="hover:text-gold-300 transition-colors">Allied Health Sciences (SAHS)</a></li>
            </ul>
          </div>

          {/* Column 3: Admissions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-sans border-b border-navy-850 pb-2">
              Admissions 2026
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#admissions" className="hover:text-gold-300 transition-colors">B.Tech Engineering</a></li>
              <li><a href="#admissions" className="hover:text-gold-300 transition-colors">MBA & BBA Programs</a></li>
              <li><a href="#admissions" className="hover:text-gold-300 transition-colors">BCA & MCA Programs</a></li>
              <li><a href="#admissions" className="hover:text-gold-300 transition-colors">Allied Health & Paramedical</a></li>
              <li><a href="#admissions" className="hover:text-gold-300 transition-colors">Scholarship Matrix</a></li>
              <li><a href="#admissions" className="hover:text-gold-300 transition-colors">International Admissions</a></li>
            </ul>
          </div>

          {/* Column 4: Campus Life Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-sans border-b border-navy-850 pb-2">
              Campus Life Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#academic-about-library" className="text-gold-300 hover:text-white font-medium transition-colors">Central Digital Library (85k+ Books)</a></li>
              <li><a href="#hostels" className="hover:text-gold-300 transition-colors">Hostels & Dining (375 Rooms)</a></li>
              <li><a href="#sports" className="hover:text-gold-300 transition-colors">Sports Complex & Stadium</a></li>
              <li><a href="#health" className="hover:text-gold-300 transition-colors">Health Center & Ambulance</a></li>
              <li><a href="#safety" className="hover:text-gold-300 transition-colors">Safety & Transport Fleet</a></li>
              <li><a href="#tech-clubs" className="hover:text-gold-300 transition-colors">Technical Societies</a></li>
              <li><a href="#cultural-fest" className="hover:text-gold-300 transition-colors">SELESTA Cultural Fest</a></li>
            </ul>
          </div>

          {/* Column 5: Portals & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-sans border-b border-navy-850 pb-2">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#exam-portal" className="text-gold-300 hover:text-white font-semibold">Exam Portal & Results</a></li>
              <li><a href="#exam-schedules" className="hover:text-gold-300 transition-colors">Exam Schedules & Timetables</a></li>
              <li><a href="#exam-notifications" className="hover:text-gold-300 transition-colors">Exam Notifications</a></li>
              <li><a href="#research-overview" className="hover:text-gold-300 transition-colors">Directorate of Research</a></li>
              <li><a href="#academic-about-library" className="hover:text-gold-300 transition-colors">Central Digital Library</a></li>
              <li><a href="#atal-idea-lab" className="hover:text-gold-300 transition-colors">ATAL IDEA Lab</a></li>
              <li><a href="#about-iqac" className="hover:text-gold-300 transition-colors">IQAC Cell</a></li>
            </ul>
          </div>

          {/* Column 6: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-sans border-b border-navy-850 pb-2">
              Contact Campus
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="leading-tight">
                  {UNIVERSITY_INFO.address}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${UNIVERSITY_INFO.phone}`} className="hover:text-gold-300">
                    {UNIVERSITY_INFO.phone}
                  </a>
                  <a href={`tel:${UNIVERSITY_INFO.altPhone}`} className="hover:text-gold-300">
                    {UNIVERSITY_INFO.altPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`mailto:${UNIVERSITY_INFO.email}`} className="hover:text-gold-300 truncate">
                  {UNIVERSITY_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Strip */}
      <div className="border-t border-navy-900 bg-navy-950/90 py-6">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © {new Date().getFullYear()} RVS University, Chittoor. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy-policy" className="hover:text-gold-300 transition-colors">Privacy Policy</a>
            <a href="#terms-of-use" className="hover:text-gold-300 transition-colors">Terms of Use</a>
            <a href="#accessibility" className="hover:text-gold-300 transition-colors">Accessibility</a>
            <a href="#anti-ragging" className="hover:text-gold-300 transition-colors">Anti-Ragging Policy</a>
            <a href="#sitemap" className="hover:text-gold-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
