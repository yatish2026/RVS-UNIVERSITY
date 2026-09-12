import { NavItem } from '../types';
import campusLife3Img from '../assets/3.png';
import irBannerImg from '../assets/international-relations-banner.png';

export const UTILITY_BAR_LINKS = [
  { name: 'Exam Portal', href: '#exam-portal', highlight: true },
  { name: 'Alumni', href: '#alumni' },
  { name: 'ATAL IDEA LAB', href: '#atal-idea-lab', badge: 'AICTE Funded' },
  { name: 'Incubator', href: '#incubator' },
  { 
    name: 'Accreditations & Compliance', 
    dropdown: [
      { name: 'NAAC Accreditation', href: '#naac' },
      { name: 'AICTE Approvals', href: '#aicte-approvals' },
      { name: 'AICTE Scholarships', href: '#aicte-scholarship' },
      { name: 'IQAC Cell', href: '#iqac' },
      { name: 'Mandatory Disclosure', href: '#mandatory-disclosure' },
      { name: 'MOUs & Tie-ups', href: '#mous' },
    ]
  },
  {
    name: 'Governance & Grievance', 
    dropdown: [
      { name: 'Student Grievance Cell', href: '#grievances' },
      { name: 'Feedback Form (Students/Parents/Faculty)', href: '#feedback' },
      { name: 'Institutional Code of Conduct', href: '#code-of-conduct' },
      { name: 'Anti-Ragging Committee', href: '#anti-ragging' },
      { name: 'Internal Complaints Committee (ICC)', href: '#icc' },
    ]
  },
];

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '#home',
  },
  {
    id: 'about',
    label: 'About',
    href: '#about-overview',
    hasDropdown: true,
    megaMenu: {
      featuredCard: {
        title: 'Chancellor Dr. Ravuri Venkataswamy',
        description: 'Founder & Chancellor, RVS University. Guiding a 28-year legacy of academic innovation across 23 group institutions.',
        image: '/images/chairman.jpg',
        linkText: 'Explore Chancellor & Leadership →',
        href: '#about-leadership',
      },
      columns: [
        {
          title: 'Institutional Pillars',
          items: [
            { name: 'Overview', href: '#about-overview', description: 'Vision, Mission, and University Profile' },
            { name: 'Leadership', href: '#about-leadership', badge: 'Executive', description: 'Chancellor, Pro Chancellor & Vice Chancellor' },
            { name: 'Governance', href: '#about-governance', description: 'Statutory Body & University Council' },
            { name: 'Administration', href: '#about-administration', description: 'Administrative Hierarchy & Organisation' },
          ],
        },
        {
          title: 'Quality & Assurance',
          items: [
            { name: 'Ranking and Accreditation', href: '#about-ranking-accreditation', badge: 'NAAC A+ Grade', description: 'NBA, AICTE, NIRF & Recognitions' },
            { name: 'IQAC', href: '#about-iqac', badge: 'Quality Cell', description: 'Internal Quality Assurance Cell & AQAR' },
            { name: 'Contact Us', href: '#contact-us', badge: 'Helpline', description: '+91 9669660155 • info@rvsu.org' },
          ],
        },
      ],
    },
  },

  {
    id: 'departments',
    label: 'Academics',
    href: '#departments',
    hasDropdown: true,
    megaMenu: {
      featuredCard: {
        title: '6 Academic Schools & 49 Programmes',
        description: 'Explore 4,579 approved intake seats across Engineering, Computer Sciences, AI & Data Science, Computing, Management & Allied Health.',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
        linkText: 'Explore All 49 Programmes →',
        href: '#departments',
      },
      columns: [
        {
          title: 'Engineering & Computing Schools',
          items: [
            { name: 'School of Engineering & Tech (SOET)', href: '#course-school-soet', badge: '765 Seats', description: 'Civil, EEE, Mech, ECE, Drone Tech & M.Tech' },
            { name: 'School of Computer Science & Eng (SCSE)', href: '#course-school-scse', badge: '1044 Seats', description: 'B.Tech CSE, AI, Cloud & B.Sc (Hons) AI' },
            { name: 'School of AI & Data Science (SAID)', href: '#course-school-said', badge: '906 Seats', description: 'AI & ML, Robotics, Data Eng, Data Science' },
          ],
        },
        {
          title: 'Computing, Management & Healthcare',
          items: [
            { name: 'School of Computing & Info Sciences (SCIS)', href: '#course-school-scis', badge: '804 Seats', description: 'IT, IoT, Quantum, Cyber Security, BCA, MCA' },
            { name: 'School of Management Studies (SOMS)', href: '#course-school-soms', badge: '180 Seats', description: 'MBA (120 Seats) & BBA (60 Seats)' },
            { name: 'School of Allied Health Sciences (SAHS)', href: '#course-school-sahs', badge: '880 Seats', description: '14 Clinical & Therapy Bachelor Degrees' },
          ],
        },
      ],
    },
  },
  {
    id: 'placements',
    label: 'Placements',
    href: '#placements',
    hasDropdown: true,
    megaMenu: {
      featuredCard: {
        title: '95%+ Career Placement Track Record',
        description: 'Top multinational corporations recruit RVS engineers and managers every year.',
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
        linkText: 'Placement Report 2025–26 →',
        href: '#placement-report',
      },
      columns: [
        {
          title: 'Placement Center',
          items: [
            { name: 'Placement Highlights & Stats', href: '#placement-highlights', description: 'Highest CTC, average packages and offers' },
            { name: 'Corporate Recruiters & Partners', href: '#recruiters', description: 'Over 250+ Fortune 500 & tech leaders' },
            { name: 'Training & Career Development', href: '#career-training', description: 'Aptitude, coding bootcamps & soft skills' },
            { name: 'Industry Internship Cell', href: '#internships', description: 'Paid 6-month capstone industry stints' },
          ],
        },
        {
          title: 'For Corporate Partners',
          items: [
            { name: 'Placement Brochure 2026', href: '#brochure', description: 'Department-wise talent demographics' },
            { name: 'Host Campus Recruitment', href: '#host-drive', description: 'Facilities for tests, GDs & interviews' },
            { name: 'Industry Mentorship Program', href: '#industry-mentor', description: 'Collaborate with students on real-world PRDs' },
            { name: 'Contact Placement Cell', href: '#contact-placement', description: 'Placement director & team contact info' },
          ],
        },
      ],
    },
  },
  {
    id: 'campus-life',
    label: 'Campus Life',
    href: '#campus-life',
    hasDropdown: true,
    megaMenu: {
      featuredCard: {
        title: 'Vibrant 65+ Acre Campus',
        description: 'Hostel residences for 1,500+ students, Central Digital Library with 85k+ books, Olympic-sized sports complex, and active student societies.',
        image: campusLife3Img,
        linkText: 'Explore Campus Life Hub →',
        href: '#hostels',
      },
      columns: [
        {
          title: 'Living & Facilities',
          items: [
            { name: 'Central Digital Library', href: '#academic-about-library', badge: '85k+ Books', description: '85,000+ print volumes, IEEE/DELNET & RFID smart kiosks' },
            { name: 'Hostels & Dining Halls', href: '#hostels', badge: '375 Rooms', description: 'AC/Non-AC rooms, 269 Boys & 129 Girls rooms' },
            { name: 'Sports & Athletic Complex', href: '#sports', description: 'Cricket stadium, indoor badminton & gymnasium' },
            { name: 'Health Center & Ambulance', href: '#health', description: '24/7 medical team and emergency pharmacy' },
            { name: 'Campus Safety & Transport', href: '#safety', description: 'CCTV surveillance & extensive bus fleet' },
          ],
        },
        {
          title: 'Clubs & Culture',
          items: [
            { name: 'Photo Gallery', href: '#gallery', badge: '15+ Photos', description: 'Interactive visual tour with motion & animations' },
            { name: 'Student Technical Societies', href: '#tech-clubs', description: 'Coding club, Robotics, AI builders, IEEE' },
            { name: 'Cultural Fest & Arts Guild', href: '#cultural-fest', description: 'Music, drama, literary & annual university fest' },
            { name: 'NSS & Community Outreach', href: '#nss', description: 'Village adoption and social welfare missions' },
            { name: 'Eco-Friendly Green Campus', href: '#green-campus', description: 'Solar energy, water harvesting & lush greenery' },
          ],
        },
      ],
    },
  },
  {
    id: 'directorate-of-research',
    label: 'Research',
    href: '#research-overview',
    hasDropdown: true,
    simpleDropdown: [
      { name: 'Overview', href: '#research-overview', description: 'Directorate profile & research ecosystem' },
      { name: 'Mission', href: '#research-mission', description: 'Research vision, goals & charter' },
      { name: 'Recent Projects', href: '#research-recent-projects', description: 'Institutional project initiatives' },
      { name: 'Academic Research', href: '#research-academic-research', description: 'Doctoral & scholarly programs' },
      { name: 'Funded Research', href: '#research-funded-research', description: 'Sponsored grants & funding agencies' },
      { name: 'Thrust Area', href: '#research-thrust-area', description: 'Core domains & frontier focus technologies' },
    ],
  },
  {
    id: 'international-relations',
    label: 'International Relations',
    href: '#international-relations',
    hasDropdown: true,
    megaMenu: {
      featuredCard: {
        title: 'Global Community at RVS University',
        description: 'Over 300+ international scholars from 62+ countries thriving across our undergraduate and postgraduate degree programs.',
        image: irBannerImg,
        linkText: 'Explore International Relations Portal →',
        href: '#international-relations',
      },
      columns: [
        {
          title: 'Admissions & Eligibility',
          items: [
            { name: 'International Admissions Overview', href: '#international-relations-admissions', description: 'Application forms, visas, guidelines' },
            { name: 'B.Tech Eligibility (13 Courses)', href: '#international-relations-btech-eligibility', badge: '13 Branches', description: 'Undergraduate engineering admissions' },
            { name: 'PG Eligibility (M.Tech/MCA/MBA)', href: '#international-relations-pg-eligibility', badge: '8 Programs', description: 'Postgraduate admissions & procedure' },
            { name: 'International Scholarships', href: '#international-relations-admissions', description: 'Merit-based financial aid for foreign scholars' },
          ],
        },
        {
          title: 'Global Network & Support',
          items: [
            { name: 'Partner Universities (MoUs)', href: '#international-relations-partner-universities', badge: '11 Global MoUs', description: 'USA, Germany, Malaysia, Ethiopia, Bhutan' },
            { name: 'Student Testimonials (IR)', href: '#international-relations-testimonials', description: 'Stories from international alumni & scholars' },
            { name: 'International Relations Office', href: '#international-relations-contact', description: 'Nodal officers, contacts & helpdesk' },
          ],
        },
      ],
    },
  },
];
