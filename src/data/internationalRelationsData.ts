import irBannerImg from '../assets/international-relations-banner.png';

export interface BTechCourseEligibility {
  sNo: number;
  course: string;
  duration: string;
  eligibility: string;
}

export interface PGCourseEligibility {
  sNo: number;
  course: string;
  duration: string;
  eligibleQualification: string;
}

export interface PartnerUniversity {
  name: string;
  country: string;
  city?: string;
  logoCode?: string;
  collaborationFocus: string;
}

export interface IRContactPerson {
  name: string;
  designation: string;
  phone: string;
  email: string;
}

export interface IRTestimonial {
  name: string;
  country: string;
  program: string;
  quote: string;
  avatarText?: string;
}

export interface InternationalRelationsData {
  title: string;
  bannerImage: string;
  overview: {
    lead: string;
    description: string[];
    stats: { label: string; value: string; sub: string }[];
    aboutCampus: string;
  };
  admissions: {
    howToApply: string;
    whoCanApply: string;
    visaRequirements: string;
    entryRequirements: string;
    scholarshipInfo: string;
    ugLinks: { label: string; url: string; type: 'online' | 'download' }[];
    pgLinks: { label: string; url: string; type: 'online' | 'download' }[];
  };
  btechEligibility: {
    note: string;
    courses: BTechCourseEligibility[];
    procedure: string[];
  };
  pgEligibility: {
    note: string;
    courses: PGCourseEligibility[];
    procedure: string[];
  };
  partnerUniversities: PartnerUniversity[];
  testimonials: IRTestimonial[];
  contacts: IRContactPerson[];
}

export const INTERNATIONAL_RELATIONS_DATA: InternationalRelationsData = {
  title: 'International Relations',
  bannerImage: irBannerImg,
  overview: {
    lead: 'Foreign student enrolment on campus is expected to rise significantly, and international relations will contribute to this development. There is a projected substantial increase in the number of international students enrolled on campus, which will be facilitated by international relations. In an inclusive, diverse classroom with faculty members knowledgeable in many important disciplines, such a presence would be advantageous.',
    description: [
      'Students from abroad as well as those from India can receive an education from RVS University. An indication of RVS University’s evolution as an international institute is the increasing number of international students coming to the campus to further their studies and research.',
      'The International Relations branch of RVS University assists students in learning about other cultures and environments across the globe. The growing number of foreign students enrolling on campus is evidence of RVS University’s transformation into a global institution.',
      'The RVS University Family extends a warm invitation to students to become part of the more than 300 international students from across 62 countries that make up the RVS University international community.',
      'Before and after their arrival, new international students can discover useful information on a range of issues on this portal.',
    ],
    stats: [
      { value: '300+', label: 'International Students', sub: 'Across undergraduate & postgraduate programs' },
      { value: '62+', label: 'Countries Represented', sub: 'Global diversity on our green campus' },
      { value: '11+', label: 'Global Partner MoUs', sub: 'USA, Germany, Malaysia, Ethiopia, Bhutan' },
      { value: '100%', label: 'Dedicated Visa & IR Support', sub: 'FRRO & on-campus international housing' },
    ],
    aboutCampus: 'The goal of RVS University’s establishment was to offer top-notch higher education that matched or exceeded global standards. It continuously looks for and implements cutting-edge techniques to raise the standard of higher education. With students from all around the world, the campus boasts a multicultural vibe. Professors with expertise and experience are highly encouraged to develop the students. The incredibly driven youth on campus are a continuous source of admiration. RVS University’s unwavering quest of excellence is motivated by the global standards it has set in the fields of learning.\n\nRVS University (Autonomous Campus), Chittoor, offers Thirteen (13) UG and Eight (8) PG programs in Engineering and Technology, MBA and MCA. The institution is ranked with 198 Among Top Engineering Colleges by NIRF 2022, MHRD, Govt. of India. RVS University is also NBA Accredited under Tier-I for five years up to 27.02.2028 and Accredited by NAAC with A+ Grade Accredited Institution.',
  },
  admissions: {
    howToApply: 'The RVS University Admissions branch oversees the whole application process for International Students. All of the information required to enroll in any of the University’s many programs is available on this page, along with details on important procedures.',
    whoCanApply: 'The residential status of international students in their home countries has been used to categorize them in accordance with criteria. A valid visa is a must for any student who wants to enroll in a program at the university.',
    visaRequirements: 'For the purpose of pursuing education, international learners from other countries—apart from Nepal, Bhutan, and the Maldives—must obtain a student visa before traveling to India.',
    entryRequirements: 'In addition to meeting the prerequisites for admission and education in India, foreign applicants must meet the minimal eligibility requirements for the qualifying exam, as specified by the relevant programs.',
    scholarshipInfo: 'RVS University takes great satisfaction in its ability to offer an education that is highly sought after both domestically and internationally. The growing number of international students attending RVS University to pursue higher education is evidence of this. Additionally, worthy applicants are given access to appealing merit and international cooperation scholarships.',
    ugLinks: [
      { label: 'UG Online Application Form', url: '#international-admission-apply', type: 'online' },
      { label: 'Download UG Application Form (PDF)', url: '/syllabus/ug-international-application.pdf', type: 'download' },
    ],
    pgLinks: [
      { label: 'PG Online Application Form', url: '#international-admission-apply', type: 'online' },
      { label: 'Download PG Application Form (PDF)', url: '/syllabus/pg-international-application.pdf', type: 'download' },
    ],
  },
  btechEligibility: {
    note: 'There will be no entrance examination for international admissions.',
    courses: [
      { sNo: 1, course: 'B.Tech in Civil Engineering', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 2, course: 'B.Tech in Electrical and Electronics Engineering', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 3, course: 'B.Tech in Mechanical Engineering', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 4, course: 'B.Tech in Electronics and Communication Engineering', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 5, course: 'B.Tech in Computer Science and Engineering', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 6, course: 'B.Tech in Computer Science and Engineering (Data Science)', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 7, course: 'B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning)', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 8, course: 'B.Tech in Computer Science and Engineering (Artificial Intelligence)', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 9, course: 'B.Tech in Computer Science and Engineering (Cyber Security)', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 10, course: 'B.Tech in Computer Science and Engineering (Internet of Things)', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 11, course: 'B.Tech in Information Technology', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 12, course: 'B.Tech in Computer Science and Business Systems', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
      { sNo: 13, course: 'B.Tech in Electronics and Communication Engineering (Bio Technology)', duration: '4 Years (UG)', eligibility: '50% in 10 + 2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory)' },
    ],
    procedure: [
      'Candidates should fulfil the minimum eligibility criteria to seek admission under International Admission, otherwise admission will stand cancelled.',
      'Completed 12 years of schooling (Equivalent to 10+2 system of Indian Education) / Diploma awarded with a minimum of 50% in 10+2 / Intermediate / XII / ‘A’ Level Pass or Equivalent (with Mathematics, Physics & Chemistry compulsory).',
      'Candidates must have completed 17 years of age.',
      'For candidates having NRI status, sponsorship should be given ONLY by the parent (either father or mother) living abroad [Sponsorship by a relative/friend is not acceptable].',
      'NRI candidates should produce Employer Certificate of the sponsor (either Father or Mother).',
      'A valid passport and Visa copies must be submitted.',
      'Candidate should have studied through Regular, Full Time and Formal Education mode.',
      'Candidate must present proof of foreign nationality, i.e., Valid Passport or National ID.',
    ],
  },
  pgEligibility: {
    note: 'There will be no entrance examination for international admissions.',
    courses: [
      {
        sNo: 1,
        course: 'M.Tech in VLSI Design',
        duration: '2 Years (PG)',
        eligibleQualification: 'B.E. / B.Tech. / AMIE in ECE / EEE / CSE / Electronics & Computers Engg. / ETE / IT / CSIT / Electronics & Control Engg. / Instrumentation Engg. / Instrumentation Technology / EIE / Electronics Engg. / Bio-Medical Engg. / AMIETE and Electronics and Telematics Engg. / Electronics (or) equivalent',
      },
      {
        sNo: 2,
        course: 'M.Tech in Structural Engineering',
        duration: '2 Years (PG)',
        eligibleQualification: 'B.E. / B.Tech. / AMIE in Civil Engg. / Construction Engg / Civil and Environmental Engg. (or) equivalent',
      },
      {
        sNo: 3,
        course: 'M.Tech in CAD/CAM',
        duration: '2 Years (PG)',
        eligibleQualification: 'B.E. / B.Tech. / AMIE in Mechanical Engg. / Automobile Engg. / Metallurgy / Industrial Engg. / Mechanical Engg. (Mechatronics) / Mechanical Engg. (Production) / Aeronautical Engineering / Production Engineering / Industrial and Production Engineering / Marine Engineering / Mechatronics / Mining Engg. / Industrial Production / Mechanical Marine / (or) equivalent',
      },
      {
        sNo: 4,
        course: 'M.Tech in Computer Science and Engineering',
        duration: '2 Years (PG)',
        eligibleQualification: 'B.E. / B.Tech. / AMIE in CSE / CSIT / Electronics & Computers Engg. / IT & Computer Science and Systems Engineering / MCA (or) Equivalent',
      },
      {
        sNo: 5,
        course: 'M.Tech in Computer Science and Engineering (Data Science)',
        duration: '2 Years (PG)',
        eligibleQualification: 'B.E. / B.Tech. / AMIE in any branch of Engg. / Tech. (or) equivalent Master’s Degree in Physics, Statistics, Mathematics or Applied Mathematics, Applied Statistics, Applied Physics, Geophysics, M.Sc.(Comp. Sc.), M.Sc.(Information Systems), Computer Applications and Electronics / MCA / M.Sc. (Electronics) (or) Equivalent',
      },
      {
        sNo: 6,
        course: 'M.Tech in Power Electronics and Electrical Drives',
        duration: '2 Years (PG)',
        eligibleQualification: 'B.E. / B.Tech. / AMIE in Electrical & Electronics Engg. / Electrical Engg. (or) Equivalent',
      },
      {
        sNo: 7,
        course: 'Master of Computer Applications (MCA)',
        duration: '2 Years (PG)',
        eligibleQualification: 'Any Degree with 50% (Mathematics Compulsory in 10+2 / XII / ’A’ Level or in Degree) (or) Equivalent',
      },
      {
        sNo: 8,
        course: 'Master of Business Administration (MBA)',
        duration: '2 Years (PG)',
        eligibleQualification: 'Any Degree with 50% (or) Equivalent',
      },
    ],
    procedure: [
      'Candidates should fulfil the minimum eligibility criteria to seek admission under International Admission, otherwise admission will stand cancelled.',
      'Candidates must have completed 21 years of age for Postgraduate admissions.',
      'For candidates having NRI status, sponsorship should be given ONLY by the parent (either father or mother) living abroad [Sponsorship by a relative/friend is not acceptable].',
      'NRI candidates should produce Employer Certificate of the sponsor (either Father or Mother).',
      'A valid passport and Visa copies must be submitted.',
      'Candidate should have studied through Regular, Full Time and Formal Education mode.',
      'Candidate must present proof of foreign nationality, i.e., Valid Passport or National ID.',
    ],
  },
  partnerUniversities: [
    {
      name: 'University of Massachusetts, Lowell',
      country: 'USA',
      city: 'Lowell, Massachusetts',
      collaborationFocus: 'Academic Exchange, Joint Research & Advanced Computing Fellowships',
    },
    {
      name: 'Purdue University',
      country: 'USA',
      city: 'West Lafayette, Indiana',
      collaborationFocus: 'Engineering Dual-Credit Modules & Advanced Systems Research',
    },
    {
      name: 'gcGEMS – GC German Center for Engineering & Management Studies UG',
      country: 'Germany',
      city: 'Aachen',
      collaborationFocus: 'Industry 4.0, Smart Manufacturing & Management Pathways',
    },
    {
      name: 'European Center for Mechatronics APS GmbH',
      country: 'Germany',
      city: 'Aachen',
      collaborationFocus: 'Robotics, Mechatronics Certification & Industrial Automation',
    },
    {
      name: 'Lincoln University College',
      country: 'Malaysia',
      city: 'Petaling Jaya',
      collaborationFocus: 'Faculty Exchange, Credit Transfers & Allied Health / IT Research',
    },
    {
      name: 'St. Mary’s University',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      collaborationFocus: 'Higher Education Student Mobility & Collaborative Teaching',
    },
    {
      name: 'MOST (Ministry of Science and Technology)',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      collaborationFocus: 'National Technological Capacity Building & Doctoral Sponsorships',
    },
    {
      name: 'Rhine-Westphalia Technical University of Aachen (RWTH Aachen)',
      country: 'Germany',
      city: 'Aachen',
      collaborationFocus: 'Advanced Mechanical, Thermal & Sustainable Energy Engineering',
    },
    {
      name: 'Daffodil International University',
      country: 'Bangladesh',
      city: 'Dhaka',
      collaborationFocus: 'South Asian Student Exchange & ICT Innovation Summits',
    },
    {
      name: 'Wollo University',
      country: 'Ethiopia',
      city: 'Dessie',
      collaborationFocus: 'Engineering Curriculum Enhancement & Research Collaborations',
    },
    {
      name: 'Royal Civil Service Commission (RCSC)',
      country: 'Bhutan',
      city: 'Thimphu',
      collaborationFocus: 'Civil Servant & Scholar Technical Training and Degree Sponsorship',
    },
  ],
  testimonials: [
    {
      name: 'Tenzin Wangchuk',
      country: 'Bhutan',
      program: 'B.Tech Computer Science & Engineering',
      quote: 'RVS University provides an exceptional multicultural learning environment. The professors are approachable and the state-of-the-art laboratories helped me build strong foundations for my tech career.',
      avatarText: 'TW',
    },
    {
      name: 'Amina Bekele',
      country: 'Ethiopia',
      program: 'M.Tech Structural Engineering',
      quote: 'Studying under the International Relations program at RVS University has been transformative. The campus is safe, green, and the international office guided me at every step from visa to housing.',
      avatarText: 'AB',
    },
    {
      name: 'Rahim Chowdhury',
      country: 'Bangladesh',
      program: 'Master of Computer Applications (MCA)',
      quote: 'The high-performance computing centers, dedicated faculty mentorship, and international student association events make RVS University truly a global campus in India.',
      avatarText: 'RC',
    },
  ],
  contacts: [
    {
      name: 'Dr. M. Mohan Babu',
      designation: 'Principal',
      phone: '7729999200',
      email: 'principal@svcetedu.org',
    },
    {
      name: 'Dr. M. Pragnasree',
      designation: 'Nodal Officer – IR',
      phone: '7729999158',
      email: 'hr@svcetedu.org',
    },
    {
      name: 'Mrs. V. Sujatha',
      designation: 'Compliance Officer',
      phone: '7729999151',
      email: 'ir@svcetedu.org',
    },
    {
      name: 'Mr. Vivekanad Adhikari',
      designation: 'Senior Associate Intl. Stu. Affairs',
      phone: '7036661000',
      email: 'vevekanandadhikari@svcetedu.org',
    },
  ],
};
