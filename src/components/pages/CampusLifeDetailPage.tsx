import React, { useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Bed, UtensilsCrossed, Trophy, HeartPulse, 
  ShieldCheck, Bus, Code, Sparkles, Music, Users, Leaf, Sun, 
  Droplets, Camera, CheckCircle2, Phone, Mail, Clock, MapPin, 
  Tv, Wifi, Activity, Dumbbell, Shield, Flame, Radio
} from 'lucide-react';
import { Button } from '../ui/Button';
import { UNIVERSITY_INFO } from '../../data/universityData';

import rvsHospitalImg from '../../assets/DJI_0827.JPG';
import techLabImg from '../../assets/064A8014.JPG';
import festBonfireImg from '../../assets/064A6024.JPG';
import festOnamImg from '../../assets/064A1054.JPG';
import festStageImg from '../../assets/DSC_0696.JPG';
import festFoodImg from '../../assets/dsc06293.jpg';
import greenGardenImg from '../../assets/Screenshot 2026-08-25 120528.png';
import greenAerialImg from '../../assets/3.png';
import auditoriumImg from '../../assets/Screenshot 2026-08-25 123412.png';
import campusBoulevardImg from '../../assets/Screenshot 2026-08-25 123337.png';
import studentHoneycombImg from '../../assets/student-honeycomb-collage.png';

export type CampusLifeTab = 
  | 'hostels' 
  | 'sports' 
  | 'health' 
  | 'safety' 
  | 'tech-clubs' 
  | 'cultural-fest' 
  | 'nss' 
  | 'green-campus';

interface CampusLifeDetailPageProps {
  activeTab: CampusLifeTab;
  onBackToHome: () => void;
  onSelectTab: (tab: CampusLifeTab) => void;
}

export const CampusLifeDetailPage: React.FC<CampusLifeDetailPageProps> = ({
  activeTab,
  onBackToHome,
  onSelectTab,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // Hostels Occupancy Data
  const hostelOccupancyData = [
    { type: 'Single Occupancy', girls: 3, boys: 19, total: 22 },
    { type: 'Double Occupancy', girls: 9, boys: 195, total: 204 },
    { type: 'Triple Occupancy', girls: 2, boys: 3, total: 5 },
    { type: 'Four Occupancy', girls: 92, boys: 22, total: 114 },
    { type: 'Five Occupancy', girls: 1, boys: 10, total: 11 },
    { type: 'Six Occupancy', girls: 0, boys: 2, total: 2 },
    { type: 'Triple Common Occupancy', girls: 0, boys: 17, total: 17 },
  ];

  const tabMeta: Record<CampusLifeTab, { title: string; eyebrow: string; subtitle: string; image: string }> = {
    hostels: {
      title: 'Student Hostels & Dining Halls',
      eyebrow: 'Residential Campus Community',
      subtitle: 'Modern living spaces with 375 rooms for Boys & Girls, high-speed Wi-Fi, and hygienic multicuisine dining.',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    },
    sports: {
      title: 'Sports & Athletic Complex',
      eyebrow: 'Physical Excellence & Championship Arena',
      subtitle: 'Cricket stadium, Olympic-grade athletic tracks, multi-court indoor badminton stadium, and modern gymnasium.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    },
    health: {
      title: 'Health Center & Emergency Services',
      eyebrow: '24/7 Wellness & Medical Care',
      subtitle: 'Hospital-attached on-campus clinic, round-the-clock medical officers, in-house pharmacy, and dedicated ambulance.',
      image: rvsHospitalImg,
    },
    safety: {
      title: 'Campus Safety & Transport Fleet',
      eyebrow: 'Security & Regional Mobility',
      subtitle: '500+ CCTV camera surveillance grid, biometric security, and 45+ GPS-tracked air-conditioned university bus fleet.',
      image: campusBoulevardImg,
    },
    'tech-clubs': {
      title: 'Student Technical Societies',
      eyebrow: 'Innovation & Hackathons Hub',
      subtitle: 'Coding guilds, Robotics & Drone labs, AI builders, IEEE & CSI Student chapters driving national hackathon victories.',
      image: techLabImg,
    },
    'cultural-fest': {
      title: 'Cultural Fest & Arts Guild',
      eyebrow: 'Creativity, Music & Theatre',
      subtitle: 'Annual university mega-fest "SELESTA", student food carnivals, music bands, street theater, and cultural exhibitions.',
      image: festStageImg,
    },
    nss: {
      title: 'NSS & Community Outreach',
      eyebrow: 'Social Impact & Civic Leadership',
      subtitle: '5 adopted rural villages, annual mega blood donation camps collecting 1,000+ units, and digital literacy drives.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    },
    'green-campus': {
      title: 'Eco-Friendly Green Campus',
      eyebrow: 'Sustainability & Environmental Stewardship',
      subtitle: '500 kW rooftop solar energy, 100% rainwater harvesting, sewage water recycling, and lush green biodiversity.',
      image: greenGardenImg,
    },
  };

  const currentMeta = tabMeta[activeTab] || tabMeta.hostels;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-navy-950">
      {/* Top Hero Banner with Prominent Thematic Image */}
      <div className="relative bg-gradient-to-br from-[#0A192F] via-[#102444] to-[#0A192F] text-white pt-28 md:pt-32 pb-12 md:pb-16 overflow-hidden border-b border-gold-500/20 shadow-xl">
        <div className="container-custom relative z-10 px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Text & Badges */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>{currentMeta.eyebrow}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {currentMeta.title}
              </h1>

              <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
                {currentMeta.subtitle}
              </p>

              <div className="pt-2">
                <button
                  onClick={onBackToHome}
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Homepage</span>
                </button>
              </div>
            </div>

            {/* Right: Crisp, High-Resolution Thematic Visual Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-400/40 group bg-navy-950">
                <div className="h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-navy-950">
                  <img
                    src={currentMeta.image}
                    alt={currentMeta.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-xs font-bold text-white flex items-center justify-between">
                  <span className="text-gold-300 uppercase tracking-wider text-[11px] font-sans">
                    RVS University Campus Life
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-navy-950/80 text-slate-200 border border-gold-400/30">
                    Live Facilities
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2.5 Horizontal Campus Life Switcher Tabs Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="container-custom px-4 md:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
            {[
              { id: 'hostels' as CampusLifeTab, label: 'Hostels & Dining', icon: Bed },
              { id: 'sports' as CampusLifeTab, label: 'Sports Complex', icon: Trophy },
              { id: 'health' as CampusLifeTab, label: 'Health & Medical', icon: HeartPulse },
              { id: 'safety' as CampusLifeTab, label: 'Safety & Transport', icon: Bus },
              { id: 'tech-clubs' as CampusLifeTab, label: 'Technical Societies', icon: Code },
              { id: 'cultural-fest' as CampusLifeTab, label: 'Cultural & Arts', icon: Music },
              { id: 'nss' as CampusLifeTab, label: 'NSS & Outreach', icon: Users },
              { id: 'green-campus' as CampusLifeTab, label: 'Green Campus', icon: Leaf },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    window.location.hash = tab.id;
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-navy-950 text-gold-300 font-black shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-navy-950 border border-slate-200'
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 ${isActive ? 'text-gold-300' : 'text-gold-600'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Tab Content Section */}
      <div className="py-14 md:py-20 container-custom px-4 md:px-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: HOSTELS & DINING HALLS */}
        {/* ========================================================================= */}
        {activeTab === 'hostels' && (
          <div className="space-y-12">
            {/* Overview Card */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-gold-700 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                    <Bed className="w-3.5 h-3.5 text-gold-600" />
                    <span>Hostel Accommodation & Facilities</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 leading-tight">
                    A Secure, Vibrant Home Away from Home
                  </h2>

                  <div className="text-sm md:text-base text-slate-600 space-y-4 leading-relaxed font-normal">
                    <p>
                      The SVCET College / RVS University, Chittoor provides Hostel accommodation for both Boys and Girls. Both the hostels are situated just <strong className="text-navy-950">0.5 km from college</strong>. Bus facility is available for students in between college and hostel.
                    </p>
                    <p>
                      <strong className="text-navy-950">Boy’s hostel</strong> has presently <strong className="text-gold-700">269 rooms</strong> and it is under expansion to cater to the increasing number of students seeking admission into hostel. The <strong className="text-navy-950">Girls hostel</strong> has <strong className="text-gold-700">129 rooms</strong> that are equipped with necessary amenities.
                    </p>
                    <p className="p-4 rounded-2xl bg-slate-50 border-l-4 border-gold-500 text-slate-700 italic">
                      “The students are encouraged to develop community life and inculcate the spirit of tolerance, thus taking care of their psychological and emotional problems and shape themselves to be better citizens. It is in this spirit and sense of direction that rules and regulations are framed carefully for orderly and peaceful living, and to make the students Good Samaritans and leaders of tomorrow. Life in hostels always provides many wits and fond memories and as such all efforts are made to make the living in hostels most memorable.”
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      'Hygienic Vegetarian & Non-Veg Mess',
                      'High-Speed Campus Wi-Fi 24/7',
                      'Dedicated College Bus Shuttle (0.5 km)',
                      'Continuous RO Purified Drinking Water',
                      'Solar Water Heaters in all Blocks',
                      'Biometric Security & 24/7 Wardens',
                    ].map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs md:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Composite Visual Photo Gallery */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
                      alt="Modern University Student Room"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=600&q=80"
                        alt="Hygienic Dining Hall & Mess"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
                        alt="Hostel Study & Recreation Area"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exact Room Occupancy Table */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700 font-sans">
                  Official Accommodation Statistics
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                  Type of Occupancy & Room Distribution
                </h3>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-navy-950 text-gold-300 text-xs uppercase tracking-wider font-semibold">
                      <th className="py-4 px-6">Type of Occupancy</th>
                      <th className="py-4 px-6 text-center">No of Rooms (Girls)</th>
                      <th className="py-4 px-6 text-center">No of Rooms (Boys)</th>
                      <th className="py-4 px-6 text-center bg-gold-600 text-navy-950 font-bold">Total Rooms</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {hostelOccupancyData.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-amber-50/50' : 'bg-slate-50/70 hover:bg-amber-50/50'}>
                        <td className="py-3.5 px-6 font-semibold text-navy-950">{row.type}</td>
                        <td className="py-3.5 px-6 text-center font-medium text-slate-600">{row.girls}</td>
                        <td className="py-3.5 px-6 text-center font-medium text-slate-600">{row.boys}</td>
                        <td className="py-3.5 px-6 text-center font-bold text-gold-800 bg-amber-50/80">{row.total}</td>
                      </tr>
                    ))}
                    <tr className="bg-navy-950 text-white font-bold text-sm border-t-2 border-gold-500/40">
                      <td className="py-4 px-6">Total</td>
                      <td className="py-4 px-6 text-center text-gold-300">107</td>
                      <td className="py-4 px-6 text-center text-gold-300">268</td>
                      <td className="py-4 px-6 text-center text-gold-300 bg-navy-950 font-black text-base border-l border-gold-500/30">375 Rooms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SPORTS & ATHLETIC COMPLEX */}
        {/* ========================================================================= */}
        {activeTab === 'sports' && (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-gold-700 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5 text-gold-600" />
                    <span>State-of-the-Art Sports Infrastructure</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 leading-tight">
                    Championing Fitness, Teamwork & Athletic Glory
                  </h2>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                    RVS University houses an Olympic-standard sports arena designed to nurture physical well-being, agility, and sportsmanship. With dedicated facilities for indoor and outdoor sports, professional coaches, and floodlit grounds, our athletes consistently achieve podium finishes at state and national inter-university championships.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: 'Cricket Stadium', desc: 'Full-sized cricket ground with natural turf pitches and pavilion' },
                      { title: 'Indoor Badminton Arena', desc: '4 synthetic & wooden courts with international LED illumination' },
                      { title: 'Multi-Station Gymnasium', desc: 'Air-conditioned modern gym with cardio & weight training zones' },
                      { title: 'Basketball & Volleyball Courts', desc: 'Synthetic floodlit courts with acrylic sports surfacing' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-sm text-navy-950 mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                      alt="Gymnasium & Fitness Complex"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80"
                        alt="Outdoor Basketball Court"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80"
                        alt="Cricket & Athletic Arena"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: HEALTH CENTER & AMBULANCE */}
        {/* ========================================================================= */}
        {activeTab === 'health' && (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider">
                    <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
                    <span>24/7 Medical Care & Critical Response</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 leading-tight">
                    Compassionate Healthcare Backed by Multi-Specialty Hospital
                  </h2>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                    The health and wellness of students, faculty, and staff is our topmost priority. The university features an on-campus Health Care Center operational 24/7 with qualified resident medical officers, nurses, emergency trauma equipment, and a dedicated ambulance.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: '24/7 Resident Doctor & Staff', desc: 'Immediate medical attention, emergency stabilization & first aid' },
                      { title: 'Emergency Ambulance on Standby', desc: 'Fully equipped BLS/ALS ambulance stationed on campus 24/7' },
                      { title: 'In-House Emergency Pharmacy', desc: 'Stocked with essential medicines, diagnostics & oxygen support' },
                      { title: 'Annual Student Health Camps', desc: 'Comprehensive eye, dental, cardiology and general wellness checkups' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-sm text-navy-950 mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 bg-slate-100">
                    <img
                      src={rvsHospitalImg}
                      alt="RVS 24hr Emergency Hospital & Clinical Care"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
                        alt="Emergency Trauma Care"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
                        alt="Attached Hospital Infrastructure"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CAMPUS SAFETY & TRANSPORT */}
        {/* ========================================================================= */}
        {activeTab === 'safety' && (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Total Campus Security & Regional Connectivity</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 leading-tight">
                    500+ CCTV Surveillance Grid & Extensive Bus Fleet
                  </h2>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                    Safety is non-negotiable at RVS University. We maintain a round-the-clock security apparatus comprising trained security squads, biometric access gates, and 500+ HD CCTV cameras. For commuting day scholars, our university operates 45+ GPS-tracked buses covering over a 60km radius across Andhra Pradesh and Tamil Nadu borders.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: '45+ GPS Tracked Buses', desc: 'Routes covering Chittoor, Tirupati, Vellore, Palamaner, and Puttur' },
                      { title: '24/7 CCTV Grid', desc: 'Continuous surveillance across hostels, academic blocks, labs, and parking' },
                      { title: 'Biometric Turnstile Gates', desc: 'Secure student and staff identification and automated parent SMS alerts' },
                      { title: 'Zero Tolerance Ragging Policy', desc: 'Strict anti-ragging squad patrols and institutional grievance cells' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-sm text-navy-950 mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
                      alt="Extensive Campus Bus Fleet"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80"
                        alt="Security Control Center"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
                        alt="Secure University Gated Campus"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: STUDENT TECHNICAL SOCIETIES */}
        {/* ========================================================================= */}
        {activeTab === 'tech-clubs' && (
          <div className="space-y-12">
            {/* Featured Visual Innovation Banner with Honeycomb Collage */}
            <div className="bg-gradient-to-br from-[#0A192F] via-[#102444] to-[#0A192F] rounded-3xl p-8 md:p-12 border border-gold-400/30 text-white shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-400/40 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>Experiential Learning & Innovation Hub</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    From Hands-on Labs <br />
                    <span className="gold-gradient-text">To Industry-Ready Innovators.</span>
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                    At RVS University, education extends far beyond textbooks. Our students gain practical mastery through AICTE ATAL Idea Labs, advanced mechanical workshops, material testing apparatus, high-performance computing centers, and interdisciplinary hackathons.
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-xl font-serif font-black text-gold-400">50+</div>
                      <div className="text-[11px] text-slate-300 font-medium">Advanced Labs</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-xl font-serif font-black text-gold-400">100%</div>
                      <div className="text-[11px] text-slate-300 font-medium">Practical Immersion</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <div className="text-xl font-serif font-black text-gold-400">24/7</div>
                      <div className="text-[11px] text-slate-300 font-medium">Lab Access</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative group max-w-sm">
                    <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-2xl -z-10 group-hover:scale-110 transition-transform duration-700" />
                    <img
                      src={studentHoneycombImg}
                      alt="RVS University Student Life, Workshops, Laboratories & Convocation Montage"
                      className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
                  <Code className="w-3.5 h-3.5 text-purple-600" />
                  <span>Student Driven Innovation & Engineering Societies</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 mt-2">
                  Technical Clubs Driving Hackathons & Research
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Coding & Algorithms Guild',
                    badge: 'Hackathons & Sprints',
                    aim: 'To master competitive programming (LeetCode/CodeChef), open-source development, full-stack web architectures, and 24-hr hackathon sprints.',
                    achievements: 'Smart India Hackathon (SIH 2024) Finalists & Intellecthon 1st Runner Up (₹30,000 Award)',
                  },
                  {
                    name: 'Robotics & Automation Society',
                    badge: 'Hardware & Drones',
                    aim: 'Building autonomous rovers, drone mechanics, microcontroller firmware (ESP32/STM32), ROS, and industrial IoT automation testbeds.',
                    achievements: '1st Prize in National Technical Symposium Robot Race & Drone Obstacle Navigation',
                  },
                  {
                    name: 'AI Builders & Data Science Guild',
                    badge: 'GenAI & Deep Learning',
                    aim: 'Exploring Large Language Models (LLMs), vision transformers, Kaggle machine learning challenges, and generative intelligence applications.',
                    achievements: 'Published IEEE Scopus research papers and deployed live campus AI voice assistants',
                  },
                  {
                    name: 'IEEE Student Branch',
                    badge: 'Global Professional Chapter',
                    aim: 'Connecting students with global IEEE technical standards, hosting international conferences, and fostering research paper publishing.',
                    achievements: 'Ranked among top active IEEE Student Branches in Region 10 (Asia-Pacific)',
                  },
                  {
                    name: 'Cyber Security & Ethical Hacking Cell',
                    badge: 'Red Team / Blue Team',
                    aim: 'Hands-on capture-the-flag (CTF) challenges, network penetration testing, digital forensics, and cloud infrastructure hardening.',
                    achievements: 'Over 50+ students certified with CEH and active bug bounty hall of fame recognitions',
                  },
                  {
                    name: 'Entrepreneurship & Startup Cell (E-Cell)',
                    badge: 'Incubation & Pitching',
                    aim: 'Fostering student ventures, seed capital pitching, patent filing, and business model prototyping under ATAL IDEA Lab mentorship.',
                    achievements: '3 student startups incubated with ₹15 Lakhs+ seed grant support',
                  },
                ].map((club, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:shadow-xl hover:border-gold-400 transition-all">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-navy-950 text-gold-300 font-sans border border-gold-500/30">
                          {club.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-navy-950 mb-2">{club.name}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
                        <strong className="text-navy-950">Aim:</strong> {club.aim}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-gold-900 font-medium">
                      🏆 <strong className="text-navy-950">Highlight:</strong> {club.achievements}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: CULTURAL FEST & ARTS GUILD */}
        {/* ========================================================================= */}
        {activeTab === 'cultural-fest' && (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200 text-xs font-bold uppercase tracking-wider">
                    <Music className="w-3.5 h-3.5 text-pink-600" />
                    <span>SELESTA Annual University Cultural Fest</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 leading-tight">
                    Unleashing Artistic Brilliance, Music & Drama
                  </h2>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                    Campus life at RVS University is filled with rhythm, celebration, and creative expression. Our flagship 3-day annual festival <strong className="text-navy-950">"SELESTA"</strong> brings together over 10,000+ students from across South India for celebrity concerts, battle of the bands, classical dances, theatrical plays, fashion showcases, and literary arts.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: 'Music & Fusion Band Guild', desc: 'Western acoustics, Carnatic vocals, electronic synthesizers and rock bands' },
                      { title: 'Dramatic Arts & Street Plays', desc: 'Social message street theatre, English drama, and mime productions' },
                      { title: 'Dance & Choreography Club', desc: 'Classical Bharatanatyam, contemporary hip-hop, and folk dances' },
                      { title: 'Photography & Short Films', desc: 'Cinematography workshops, digital editing suites, and photo exhibitions' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-sm text-navy-950 mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 bg-slate-900">
                    <img
                      src={festStageImg}
                      alt="SELESTA Annual University Cultural Fest Stage Felicitation"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-900">
                      <img
                        src={festFoodImg}
                        alt="Kerala Kulukki Sarbath & Student Carnival Stalls"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-900">
                      <img
                        src={festOnamImg}
                        alt="Onam Festival & Cultural Celebrations"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: NSS & COMMUNITY OUTREACH */}
        {/* ========================================================================= */}
        {activeTab === 'nss' && (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Youth Leadership & Community Service</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 leading-tight">
                    NSS Units Transforming Rural Lives in Chittoor
                  </h2>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                    The National Service Scheme (NSS) at RVS University instills social responsibility, empathy, and leadership in students. With 3 active NSS units and over 300+ student volunteers, our initiatives include adopting 5 neighboring rural villages, organizing mega health and eye screening camps, and planting over 5,000+ saplings annually.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: 'Mega Blood Donation Camps', desc: '1,000+ units collected annually in association with Red Cross Society' },
                      { title: 'Village Digital Literacy', desc: 'Teaching foundational computing & digital banking in adopted rural schools' },
                      { title: 'Clean Campus Swachhata Pakhwada', desc: 'Regular environmental cleanliness, waste segregation & plastic ban drives' },
                      { title: 'Disaster Relief Squads', desc: 'Emergency relief aid, food packages and health kits distribution' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-sm text-navy-950 mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 bg-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80"
                      alt="NSS Community Volunteer Mission"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80"
                        alt="Blood Donation Camp"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
                        alt="Rural Education Outreach"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: ECO-FRIENDLY GREEN CAMPUS */}
        {/* ========================================================================= */}
        {activeTab === 'green-campus' && (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-xl text-navy-950">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold uppercase tracking-wider">
                    <Leaf className="w-3.5 h-3.5 text-teal-600" />
                    <span>Environmental Stewardship & Carbon Neutrality</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 leading-tight">
                    500 kW Rooftop Solar Power & 100% Water Recycling
                  </h2>

                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                    Spanning 100+ pristine acres surrounded by scenic hillscapes, RVS University operates as a green-energy model institution. With on-grid solar power installations, extensive rainwater harvesting recharge pits, a modern sewage treatment plant, and thousands of lush botanical trees, our campus harmonizes academic brilliance with environmental sustainability.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: '500 kW Rooftop Solar Grid', desc: 'Clean solar energy meeting major power demands of academic blocks' },
                      { title: 'Rainwater Harvesting Pits', desc: '100% rooftop rain runoff channeled into groundwater recharge pits' },
                      { title: 'Sewage Treatment Plant (STP)', desc: '100% recycled water used for lush horticulture and botanical lawns' },
                      { title: 'Battery Electric Buggies', desc: 'Zero emission green transport buggies for internal campus commuting' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-sm text-navy-950 mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 bg-slate-100">
                    <img
                      src={greenGardenImg}
                      alt="Green Botanical Pathways & Lawns"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src={greenAerialImg}
                        alt="Panoramic Aerial View of Campus"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow border border-slate-200 h-36 bg-slate-100">
                      <img
                        src={auditoriumImg}
                        alt="Central Auditorium & Scenic Greens"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Campus Life Admissions Callout */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white border border-gold-400/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
              Experience the RVS University Campus Life
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-white">
              Schedule a Campus Tour & Hostel Visit
            </h3>
            <p className="text-xs md:text-sm text-slate-300 font-light">
              Visit our 65+ acre campus in Chittoor to tour our residential hostels, sports arena, research labs, and digital library.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="gold"
              size="md"
              href="#admissions"
            >
              Admissions 2026–27 →
            </Button>
            <Button
              variant="ghost-white"
              size="md"
              onClick={onBackToHome}
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
