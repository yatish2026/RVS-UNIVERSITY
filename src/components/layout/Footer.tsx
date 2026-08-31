import React from 'react';
import { 
  MapPin, Phone, Mail, Globe, Facebook, Twitter, Linkedin, 
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
              RVS University is a premier multidisciplinary institution established under the Andhra Pradesh Private Universities Act, dedicated to fostering next-generation leaders across computing, engineering, management, and research.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
              Connect With Us:
            </span>
            <div className="flex items-center gap-2.5">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/50 hover:bg-navy-850 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/50 hover:bg-navy-850 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/50 hover:bg-navy-850 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/50 hover:bg-navy-850 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/50 hover:bg-navy-850 transition-colors"
              >
                <Youtube className="w-4 h-4" />
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
              <li><a href="#about" className="hover:text-gold-300 transition-colors">University Overview</a></li>
              <li><a href="#leadership" className="hover:text-gold-300 transition-colors">Chancellor & VC</a></li>
              <li><a href="#governance" className="hover:text-gold-300 transition-colors">Governing Body</a></li>
              <li><a href="#vision" className="hover:text-gold-300 transition-colors">Vision & Mission</a></li>
              <li><a href="#approvals" className="hover:text-gold-300 transition-colors">Statutory Act & UGC</a></li>
              <li><a href="#awards" className="hover:text-gold-300 transition-colors">Accreditations</a></li>
            </ul>
          </div>

          {/* Column 2: Academics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-sans border-b border-navy-850 pb-2">
              Faculties & Degrees
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#course-btech" className="hover:text-gold-300 transition-colors">B.Tech (14 Streams)</a></li>
              <li><a href="#course-diploma" className="hover:text-gold-300 transition-colors">Diploma Polytechnic</a></li>
              <li><a href="#course-mtech" className="hover:text-gold-300 transition-colors">M.Tech Programmes</a></li>
              <li><a href="#course-ug-degree" className="hover:text-gold-300 transition-colors">UG Degrees (BBA/BCA)</a></li>
              <li><a href="#course-pg-programmes" className="hover:text-gold-300 transition-colors">PG Degrees (MBA/MCA)</a></li>
              <li><a href="#course-nursing" className="hover:text-gold-300 transition-colors">Nursing Sciences</a></li>
              <li><a href="#course-physiotherapy" className="hover:text-gold-300 transition-colors">Physiotherapy (BPT)</a></li>
              <li><a href="#course-pharmacy" className="hover:text-gold-300 transition-colors">Pharmacy (SVCP)</a></li>
            </ul>
          </div>

          {/* Column 3: Admissions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-sans border-b border-navy-850 pb-2">
              Admissions
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#admissions" className="hover:text-gold-300 transition-colors">B.Tech Admissions</a></li>
              <li><a href="#admissions-pg" className="hover:text-gold-300 transition-colors">MBA / MCA / M.Tech</a></li>
              <li><a href="#admissions-phd" className="hover:text-gold-300 transition-colors">Ph.D. Fellowships</a></li>
              <li><a href="#scholarships" className="hover:text-gold-300 transition-colors">Scholarship Matrix</a></li>
              <li><a href="#fees" className="hover:text-gold-300 transition-colors">Fee Structure</a></li>
              <li><a href="#international" className="hover:text-gold-300 transition-colors">International Students</a></li>
            </ul>
          </div>

          {/* Column 4: Placements & Life */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-sans border-b border-navy-850 pb-2">
              Placements & Life
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#placements" className="hover:text-gold-300 transition-colors">Placement Statistics</a></li>
              <li><a href="#recruiters" className="hover:text-gold-300 transition-colors">Recruiting Partners</a></li>
              <li><a href="#hostels" className="hover:text-gold-300 transition-colors">Campus Hostels</a></li>
              <li><a href="#sports" className="hover:text-gold-300 transition-colors">Sports & Athletics</a></li>
              <li><a href="#library" className="hover:text-gold-300 transition-colors">Digital Library</a></li>
              <li><a href="#clubs" className="hover:text-gold-300 transition-colors">Student Clubs & Fest</a></li>
            </ul>
          </div>

          {/* Column 5: Important Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-sans border-b border-navy-850 pb-2">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#exam-portal" className="text-gold-300 hover:text-white font-semibold">Exam Portal Login</a></li>
              <li><a href="#alumni" className="hover:text-gold-300 transition-colors">Alumni Network</a></li>
              <li><a href="#atal-idea-lab" className="hover:text-gold-300 transition-colors">ATAL IDEA Lab</a></li>
              <li><a href="#iqac" className="hover:text-gold-300 transition-colors">IQAC Cell</a></li>
              <li><a href="#grievances" className="hover:text-gold-300 transition-colors">Grievance Portal</a></li>
              <li><a href="#mandatory-disclosure" className="hover:text-gold-300 transition-colors">Mandatory Disclosure</a></li>
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
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`tel:${UNIVERSITY_INFO.phone}`} className="hover:text-gold-300">
                  {UNIVERSITY_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href={`mailto:${UNIVERSITY_INFO.altEmail}`} className="hover:text-gold-300 truncate">
                    {UNIVERSITY_INFO.altEmail}
                  </a>
                  <a href={`mailto:${UNIVERSITY_INFO.email}`} className="hover:text-gold-300 truncate">
                    {UNIVERSITY_INFO.email}
                  </a>
                </div>
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
