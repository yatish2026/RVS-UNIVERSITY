import { NavItem } from '../types';

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
    href: '#about-chairman',
    hasDropdown: true,
    megaMenu: {
      featuredCard: {
        title: 'Legacy of Academic Excellence',
        description: 'Established under the aegis of Srinivasa Educational Academy, guiding 23 institutions and 30+ programs.',
        image: '/images/chairman.jpg',
        linkText: 'Explore Chairman & Leadership →',
        href: '#about-chairman',
      },
      columns: [
        {
          title: 'Executive Leadership',
          items: [
            { name: 'Chairman’s Desk', href: '#about-chairman', badge: 'Founder', description: 'Dr. Ravuri Venkataswamy biography & awards' },
            { name: 'Vice Chairman’s Desk', href: '#about-vice-chairman', badge: 'Leadership', description: 'Shri R.V. Srinivas & 23 Group Institutions' },
            { name: 'Principal’s Desk', href: '#about-principal', description: 'Dr. Matam Mohan Babu profile & research' },
            { name: 'Organisation Chart', href: '#administration', description: 'Institutional administrative hierarchy' },
          ],
        },
        {
          title: 'Governance & Committees',
          items: [
            { name: 'Governing Body (12 Members)', href: '#committee-governing-body', description: 'Executive university governance board' },
            { name: 'Academic Council (33 Members)', href: '#committee-academic-council', description: 'Academic regulations & HODs' },
            { name: 'Finance Committee', href: '#committee-finance', description: 'Financial estimates & budget oversight' },
            { name: '23 Group Institutions', href: '#about-vice-chairman', description: 'Footprint of Srinivasa Educational Academy' },
          ],
        },
      ],
    },
  },
  {
    id: 'admissions',
    label: 'Admissions',
    href: '#admissions',
    hasDropdown: true,
    megaMenu: {
      featuredCard: {
        title: 'Admissions Open 2026–27',
        description: 'Take the first step toward a future-proof career. Merit scholarships and early-bird benefits available.',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        linkText: 'Apply Online Now →',
        href: '#admissions',
      },
      columns: [
        {
          title: 'Study Levels',
          items: [
            { name: 'Undergraduate Admissions', href: '#admissions', badge: 'B.Tech / BCA', description: 'Emerging tech & computing degrees' },
            { name: 'Postgraduate Admissions', href: '#admissions', badge: 'MBA / MCA / M.Tech', description: 'Advanced leadership programs' },
            { name: 'Nursing & Allied Healthcare', href: '#course-nursing', description: 'ANM, GNM, B.Sc & M.Sc Nursing, BPT' },
            { name: 'Pharmacy Admissions', href: '#course-pharmacy', description: 'B.Pharm, M.Pharm, Pharm.D & Ph.D' },
          ],
        },
        {
          title: 'Student Support & Info',
          items: [
            { name: 'Fee Structure & Scholarships', href: '#admissions', description: 'Merit, sports, and need-based financial aid' },
            { name: 'Eligibility & Selection Criteria', href: '#admissions', description: 'EAPCET / ICET / University Entrance' },
            { name: 'International Student Admissions', href: '#international-relations', description: 'Admissions for NRI & foreign nationals' },
            { name: 'Download Prospectus 2026', href: '#admissions', description: 'Official curriculum and university brochure' },
          ],
        },
      ],
    },
  },
  {
    id: 'committees',
    label: 'Committees',
    href: '#committee-governing-body',
    hasDropdown: true,
    simpleDropdown: [
      { name: 'Governing Body (12 Members)', href: '#committee-governing-body', description: 'Executive university governance' },
      { name: 'Academic Council (33 Members)', href: '#committee-academic-council', description: 'Academic regulations & standards' },
      { name: 'Finance Committee', href: '#committee-finance', description: 'Budget limits & financial auditing' },
      { name: 'Organisation Chart', href: '#administration', description: 'Administrative hierarchical structure' },
      { name: 'Anti-Ragging Committee & Squad', href: '#anti-ragging', description: 'Zero tolerance campus policy' },
      { name: 'Internal Complaints Committee (ICC)', href: '#icc', description: 'Gender equality and workplace safety' },
      { name: 'Research & Innovation Advisory', href: '#research', description: 'Grants, IPR and patent cell' },
    ],
  },
  {
    id: 'academics',
    label: 'Academics',
    href: '#academics',
    hasDropdown: true,
    megaMenu: {
      featuredCard: {
        title: 'NEP 2020 Aligned Curriculum',
        description: 'Multidisciplinary credit framework, industry-embedded capstones, and experiential lab learning.',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        linkText: 'Explore Academic Framework →',
        href: '#academic-framework',
      },
      columns: [
        {
          title: 'Curriculum & Structure',
          items: [
            { name: 'Faculties & Schools', href: '#faculties', description: 'Engineering, Computing, Management & Sciences' },
            { name: 'Academic Regulations & Syllabi', href: '#regulations', description: 'Outcome-based education framework' },
            { name: 'Academic Calendar 2026–27', href: '#calendar', description: 'Semester dates, exams and holidays' },
            { name: 'Examination & Evaluation Cell', href: '#examinations', description: 'Portal, grading rules and results' },
          ],
        },
        {
          title: 'Learning Ecosystem',
          items: [
            { name: 'Industry 4.0 Center of Excellence', href: '#coe', description: 'Joint labs with IBM, AWS & Siemens' },
            { name: 'Value Added & Honors Courses', href: '#value-added', description: 'Certifications in cloud, cyber & robotics' },
            { name: 'Central Digital Library', href: '#library', description: 'IEEE, Springer, ScienceDirect e-journals' },
            { name: 'Faculty Directory & Research Guides', href: '#faculty-directory', description: 'Distinguished Ph.D. professors & mentors' },
          ],
        },
      ],
    },
  },
  {
    id: 'departments',
    label: 'Courses & Departments',
    href: '#departments',
    hasDropdown: true,
    megaMenu: {
      featuredCard: {
        title: 'Comprehensive Degree Offerings',
        description: 'Explore 30+ programs across B.Tech, M.Tech, Diploma, Management, Nursing, Physiotherapy, and Pharmacy.',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
        linkText: 'View Full Course Directory →',
        href: '#departments',
      },
      columns: [
        {
          title: 'Engineering & Technology',
          items: [
            { name: 'B.Tech (14 Specializations)', href: '#course-btech', badge: 'Flagship', description: 'CSE, AI, AI&DS, IoT, Cyber, ECE, EEE, Mech, Civil' },
            { name: 'Diploma / Polytechnic (5 Streams)', href: '#course-diploma', description: 'Civil, EEE, ECE, Mechanical, CSE' },
            { name: 'M.Tech (6 Postgraduate Disciplines)', href: '#course-mtech', description: 'CAD/CAM, PEED, VLSI, CSE, Structural, Data Science' },
          ],
        },
        {
          title: 'Management & Applications',
          items: [
            { name: 'UG Degrees (BBA & BCA)', href: '#course-ug-degree', description: 'Bachelor of Business Administration & Computer Applications' },
            { name: 'PG Programmes (MBA & MCA)', href: '#course-pg-programmes', badge: 'Top Tier', description: 'Master of Business Admin & Computer Applications' },
          ],
        },
        {
          title: 'Healthcare & Pharmacy',
          items: [
            { name: 'Nursing (ANM, GNM, B.Sc & M.Sc)', href: '#course-nursing', description: 'APNMC & INC Approved Hospital Attachments' },
            { name: 'Physiotherapy (BPT - 4.5 Yrs)', href: '#course-physiotherapy', description: 'Orthopaedics, Neurology & Cardiopulmonary Rehab' },
            { name: 'Pharmacy (SVCP - B.Pharm, M.Pharm, Pharm.D, Ph.D)', href: '#course-pharmacy', description: 'PCI Approved Pharmaceutical Sciences' },
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
        title: 'Vibrant 100+ Acre Campus',
        description: 'State-of-the-art residential hostels, Olympic-sized sports facilities, and cultural clubs.',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
        linkText: 'Virtual Campus Tour →',
        href: '#virtual-tour',
      },
      columns: [
        {
          title: 'Living & Wellness',
          items: [
            { name: 'Hostels & Dining Halls', href: '#hostels', description: 'AC/Non-AC rooms with hygienic multicuisine' },
            { name: 'Sports & Athletic Complex', href: '#sports', description: 'Cricket stadium, indoor badminton & gymnasium' },
            { name: 'Health Center & Ambulance', href: '#health', description: '24/7 medical team and emergency pharmacy' },
            { name: 'Campus Safety & Transport', href: '#safety', description: 'CCTV surveillance & extensive bus fleet' },
          ],
        },
        {
          title: 'Clubs & Culture',
          items: [
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
    id: 'our-institutions',
    label: 'Our Institutions',
    href: '#about-vice-chairman',
  },
];
