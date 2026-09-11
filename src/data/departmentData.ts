import hodEeeImg from '../assets/dept/hod-eee.jpg';
import hodMechImg from '../assets/dept/hod-mech.jpg';
import eeeDeptImg from '../assets/dept/eee-dept.webp';
import mechDeptImg from '../assets/dept/mech-dept.jpg';

export type DepartmentTab = 
  | 'profile'
  | 'vision-mission'
  | 'outcomes'
  | 'faculty'
  | 'publications'
  | 'seminars'
  | 'laboratories'
  | 'syllabus'
  | 'association'
  | 'rnd'
  | 'student-corner'
  | 'placement'
  | 'events'
  | 'ceda'
  | 'contact';

export interface FacultyMember {
  sNo: number;
  name: string;
  designation: string;
  qualification: string;
  experience: number;
  specialization?: string;
  image?: string;
}

export interface PublicationItem {
  id: string;
  academicYear: string;
  authors: string;
  title: string;
  journalOrRemarks: string;
  link?: string;
}

export interface SeminarWorkshopItem {
  sNo: number;
  facultyName: string;
  title: string;
  organization: string;
  dates: string;
  durationDays: number;
  type: string;
  academicYear: string;
}

export interface SyllabusCourse {
  sNo: number;
  category: string;
  courseCode: string;
  courseName: string;
  hours: { l: number; t: number; p: number };
  credits: number;
  marks: { cia: number; see: number; total: number };
}

export interface SyllabusSemester {
  semesterId: string;
  title: string;
  courses: SyllabusCourse[];
  totalCredits: number;
  totalMarks: number;
}

export interface SyllabusDownloadDoc {
  title: string;
  regulation: string;
  size: string;
  fileUrl: string;
  level: string;
  badge?: string;
  downloadFileName?: string;
  description?: string;
}

export interface DepartmentDetailData {
  id: string;
  name: string;
  shortName: string;
  schoolName: string;
  degreeName: string;
  bannerImage?: string;
  hod: {
    name: string;
    designation: string;
    qualification: string;
    experience: number;
    email: string;
    phone: string;
    room: string;
    message: string;
    image?: string;
  };
  profile: {
    nbaAccreditation: string;
    overview: string;
    objectives: string[];
    strengths: string[];
    coursesOffered: {
      level: string;
      course: string;
      intake: number;
      convenorQuota?: number;
      bCategory?: number;
      pio?: number;
    }[];
  };
  visionMission: {
    vision: string;
    mission: string;
    articulation: string;
    keyObjectives: string[];
    commitment: string;
  };
  outcomes: {
    peos: { code: string; objective: string }[];
    psos: { code: string; outcome: string }[];
    pos: { code: string; title: string; outcome: string }[];
  };
  faculty: {
    btech: FacultyMember[];
    diploma: FacultyMember[];
    mtech: FacultyMember[];
  };
  publications: PublicationItem[];
  seminars?: SeminarWorkshopItem[];
  laboratories: {
    name: string;
    description: string;
    equipment: string[];
    location: string;
  }[];
  syllabusRegulations: {
    regulation: string;
    title: string;
    semesters: SyllabusSemester[];
    honorsPools: { pool: string; semester: string; courses: SyllabusCourse[] }[];
    minorsTracks: { track: string; title: string; courses: SyllabusCourse[] }[];
  };
  syllabusDownloads?: SyllabusDownloadDoc[];
  association: {
    name: string;
    acronym: string;
    tagline: string;
    description: string;
    activities: string[];
    committeeMembers?: {
      designation: string;
      name: string;
      rollNo: string;
      className: string;
    }[];
  };
  rnd: {
    patentsFiled: number;
    consultancyAreas: string[];
    thrustAreas: string[];
    mous: string[];
    projects?: {
      sno: number;
      facultyName: string;
      title: string;
      projectType: string;
      fundingAgency: string;
      amountLakhs: number | string;
      duration: string;
    }[];
  };
  studentCorner: {
    clubs: string[];
    achievements: string[];
    internships: string[];
  };
  placement: {
    highlights: string[];
    topRecruiters: string[];
    roles: string[];
    yearlyPlacements?: {
      year: string;
      totalPlaced: number;
      companies: {
        sno: number;
        name: string;
        placedCount: number;
      }[];
    }[];
  };
  events: {
    title: string;
    date: string;
    type: string;
    description: string;
  }[];
  contact: {
    department: string;
    hodName: string;
    officeLocation: string;
    email: string;
    phone: string;
    altPhone: string;
    officeHours: string;
  };
}

export const CIVIL_DEPARTMENT_DATA: DepartmentDetailData = {
  id: 'civil',
  name: 'Department of Civil Engineering',
  shortName: 'Civil Engineering',
  schoolName: 'School of Engineering and Technology (SOET)',
  degreeName: 'B.Tech / M.Tech / Diploma in Civil Engineering',
  hod: {
    name: 'Dr. B. Damodhar Reddy',
    designation: 'HOD & Professor',
    qualification: 'Ph.D in Structural Engineering',
    experience: 21,
    email: 'hodce@svcetedu.org',
    phone: '+91 85722 46298',
    room: 'Civil Engineering Block, Room 201',
    message: 'Welcome to the Department of Civil Engineering at RVS University / SVCET. Our department stands as a pillar of infrastructural excellence, combining deep theoretical mechanics with hands-on lab proficiency, environmental sustainability, and cutting-edge software engineering tools like AutoCAD, STAAD Pro, and Revit BIM.',
  },
  profile: {
    nbaAccreditation: 'Accredited by NBA under Tier-I until June 30, 2025',
    overview: 'The Department of Civil Engineering is accredited by NBA under Tier-I until June 30, 2025. It offers a program aimed at producing skilled, high-quality graduates proficient in information technology and professional conduct. The department emphasizes community service and sharing advanced technical knowledge with engineers and the public. Students gain hands-on experience with modern equipment in laboratories and through projects with local construction companies. Specialized fields of faculty expertise include Structural Engineering, Earthquake Engineering, Hydrology, Water Resources, Foundation Engineering, Construction Management, Transportation Engineering, and Entrepreneurship. The department strives to be a model for civil engineering education, focusing on quality professional and community services.',
    objectives: [
      'Provide fundamental technical knowledge in structural design, geo-technical, and environmental engineering.',
      'Develop skills in teamwork, ethics, technical leadership, and lifelong learning.',
      'Prepare students for professional practice in industry, government, and graduate schools.',
      'Mold future engineers, scientists, researchers, and innovators.',
      'Equip students to meet global industrial requirements.',
      'Inspire efforts to improve quality of life through problem-solving.',
    ],
    strengths: [
      'NBA Accreditation (Tier-I)',
      'State-of-the-Art Laboratory Facilities',
      'Expert Faculty with Average 15+ Years Experience',
      'Students gain exposure through real-world projects',
      'Equipped with technical knowledge and practical experience',
      'Commitment to Community Service and Rural Infrastructure',
      'Comprehensive Learning Objectives aligned with NEP 2020 & OBE',
      'Focus on Innovation and Lifelong Learning',
    ],
    coursesOffered: [
      {
        level: 'Under Graduate',
        course: 'Civil Engineering (B.Tech)',
        intake: 60,
        convenorQuota: 42,
        bCategory: 18,
        pio: 9,
      },
      {
        level: 'Diploma',
        course: 'Civil Engineering (DCE)',
        intake: 60,
        convenorQuota: 42,
        bCategory: 18,
      },
      {
        level: 'Post Graduate',
        course: 'M.Tech Structural Engineering',
        intake: 18,
        convenorQuota: 13,
        bCategory: 5,
      },
    ],
  },
  visionMission: {
    vision: 'To be a centre of excellence in Civil Engineering education by making every effort continuously for improvement in education and undertaking research as well as to contribute to the technology for the infrastructure development leading to sustainable development of the society.',
    mission: 'To provide quality education for successful career and higher studies in Civil Engineering that emphasizes academic and technical excellence in profession and research, effective communication, teamwork and leadership to meet the challenges of the society.',
    articulation: 'The vision of the department emphasizes the long standing dedication to offer quality education in an exciting academic atmosphere. The department directly serves the diverse components, such as teaching, research, and consultancy with service motto to the nation. The vision offers a standard, by which the department plans, functions, and appraises itself moving ahead.',
    keyObjectives: [
      'Provide broad-based educational experience across core structural, hydraulic, and environmental domains.',
      'Prepare students for complex engineering challenges with modern computation and BIM software.',
      'Foster teamwork, ethical accountability, and global competitiveness in infrastructural construction.',
    ],
    commitment: 'We are dedicated to providing strong fundamentals and in-depth knowledge, enabling our students to practice and expand their profession. Our curriculum is designed to necessitate continued higher degrees and research, preparing our graduates for the challenges of tomorrow.',
  },
  outcomes: {
    peos: [
      {
        code: 'PEO-1',
        objective: 'To achieve a high level of technical expertise in higher education/profession by gaining knowledge in basic sciences, design, engineering principles, and drawing.',
      },
      {
        code: 'PEO-2',
        objective: 'To explore and apply modern engineering tools for planning, design, execution, and maintenance of works that are technically viable, economically sound, and socially acceptable.',
      },
      {
        code: 'PEO-3',
        objective: 'To develop excellent communication skills, work in teams with responsibility, and be prepared to tackle challenges in the evolving engineering landscape.',
      },
    ],
    psos: [
      {
        code: 'PSO-1',
        outcome: 'UNDERSTANDING: Apply knowledge in mathematics, fundamental sciences, structural engineering, water resources, transportation engineering, environmental engineering, geo-technical engineering, and management in core engineering practice.',
      },
      {
        code: 'PSO-2',
        outcome: 'ANALYTICAL & EXECUTIVE SKILL: Apply analytical and design concepts of civil engineering to solve construction technology and management problems.',
      },
      {
        code: 'PSO-3',
        outcome: 'RESPONSIBILITY: Develop competence in using modern equipment, techniques, and software (AutoCAD, STAAD Pro, Total Station, GIS) to solve real-time civil engineering problems.',
      },
    ],
    pos: [
      { code: 'PO-1', title: 'Engineering Knowledge', outcome: 'Apply knowledge of mathematics, science, engineering fundamentals, and specialization to solve complex engineering problems.' },
      { code: 'PO-2', title: 'Problem Analysis', outcome: 'Identify, formulate, and analyze complex engineering problems, using first principles of mathematics, natural sciences, and engineering sciences.' },
      { code: 'PO-3', title: 'Design/Development of Solutions', outcome: 'Design solutions for complex problems that meet the specified needs, with consideration for public health, safety, cultural, and environmental factors.' },
      { code: 'PO-4', title: 'Conduct Investigations', outcome: 'Use research-based methods including experiments, analysis, and data interpretation to provide valid conclusions.' },
      { code: 'PO-5', title: 'Modern Tool Usage', outcome: 'Select and apply appropriate tools and techniques, including prediction and modeling, to solve engineering challenges with an understanding of limitations.' },
      { code: 'PO-6', title: 'The Engineer and Society', outcome: 'Apply reasoning, informed by contextual knowledge, to assess societal, health, safety, legal, and cultural issues relevant to engineering practice.' },
      { code: 'PO-7', title: 'Environment and Sustainability', outcome: 'Understand the impact of engineering solutions on society and the environment, demonstrating the need for sustainable development.' },
      { code: 'PO-8', title: 'Ethics', outcome: 'Apply ethical principles and commit to professional ethics and responsibilities in engineering practice.' },
      { code: 'PO-9', title: 'Individual and Team Work', outcome: 'Function effectively as an individual, as a member, or leader in multidisciplinary teams.' },
      { code: 'PO-10', title: 'Communication', outcome: 'Communicate effectively on complex engineering activities, including writing reports, design documentation, and making presentations.' },
      { code: 'PO-11', title: 'Project Management and Finance', outcome: 'Apply engineering management principles to manage projects and work effectively in teams within multidisciplinary environments.' },
      { code: 'PO-12', title: 'Life-Long Learning', outcome: 'Recognize the need for, and demonstrate the ability to engage in, independent and lifelong learning amidst technological advancements.' },
    ],
  },
  faculty: {
    btech: [
      { sNo: 1, name: 'Dr. T.V. Krishna Reddy', designation: 'Professor', qualification: 'Ph.D', experience: 39, specialization: 'Structural Engineering' },
      { sNo: 2, name: 'Dr. M. Mohan Babu', designation: 'Professor', qualification: 'Ph.D', experience: 25, specialization: 'Environmental & Water Resources' },
      { sNo: 3, name: 'Dr. M. Chittaranjan', designation: 'Professor', qualification: 'Ph.D', experience: 24, specialization: 'Geotechnical Engineering' },
      { sNo: 4, name: 'Dr. S. Ranjith', designation: 'Assistant Professor', qualification: 'Ph.D', experience: 5, specialization: 'Concrete Technology & Materials' },
      { sNo: 5, name: 'Dr. Panga Narasimha Reddy', designation: 'Assistant Professor', qualification: 'Ph.D', experience: 5, specialization: 'Transportation Engineering' },
      { sNo: 6, name: 'Mr. B. Rajasekhar', designation: 'Associate Professor', qualification: 'M.Tech', experience: 19, specialization: 'Structural Design' },
      { sNo: 7, name: 'Mr. V. Mahesh', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 12, specialization: 'CAD & Building Planning' },
      { sNo: 8, name: 'Mr. M. Leelakar', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 26, specialization: 'Surveying & GIS' },
      { sNo: 9, name: 'Mr. P. Bharath Kumar', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 6, specialization: 'Hydraulics & Fluid Mechanics' },
      { sNo: 10, name: 'Mr. M. Ragavendra', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 3, specialization: 'Structural Analysis' },
      { sNo: 11, name: 'Mr. K. Yaswanth', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 2, specialization: 'Environmental Engineering' },
      { sNo: 12, name: 'Mr. R. Vikas', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 2, specialization: 'Construction Management' },
    ],
    diploma: [
      { sNo: 1, name: 'Mr. P. Nomraj', designation: 'Lecturer', qualification: 'M.Tech', experience: 2, specialization: 'Civil Engineering' },
      { sNo: 2, name: 'Ms. K. Rahelu', designation: 'Lecturer', qualification: 'M.Tech', experience: 1, specialization: 'Civil Engineering' },
      { sNo: 3, name: 'Mr. K. Satish', designation: 'Lecturer', qualification: 'M.Tech', experience: 1, specialization: 'Surveying' },
      { sNo: 4, name: 'Mr. D. Sunil Kumar', designation: 'Lecturer', qualification: 'B.Tech', experience: 3, specialization: 'Civil Technology' },
      { sNo: 5, name: 'Mr. V. Siva Kumar', designation: 'Senior Lecturer', qualification: 'M.Tech', experience: 4, specialization: 'Structural Engineering' },
      { sNo: 6, name: 'Mr. Thimaiah Gari Anil Kumar', designation: 'Lecturer', qualification: 'B.Tech', experience: 2, specialization: 'Civil Drafting' },
      { sNo: 7, name: 'Mr. K. Hemanth Kumar', designation: 'Lecturer', qualification: 'M.Tech', experience: 4, specialization: 'Concrete Technology' },
      { sNo: 8, name: 'Mr. C. Bhaskar', designation: 'Lecturer', qualification: 'M.Tech', experience: 4, specialization: 'Geotechnical Studies' },
    ],
    mtech: [
      { sNo: 1, name: 'Dr. B. Damodhara Reddy', designation: 'Professor & Head', qualification: 'Ph.D', experience: 21, specialization: 'Advanced Structural Engineering & Earthquake Resistance' },
      { sNo: 2, name: 'Dr. N. Kiran Kumar', designation: 'Assistant Professor', qualification: 'Ph.D', experience: 11, specialization: 'Finite Element Analysis & High Rise Structures' },
      { sNo: 3, name: 'Mr. R. Anil Kumar', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 7, specialization: 'Prestressed Concrete & Composite Structures' },
    ],
  },
  publications: [
    {
      id: 'pub-1',
      academicYear: 'AY 2021-22',
      authors: 'Dr. M. Mohan Babu',
      title: 'Ground Water Quality Monitoring in Southern Region of Chittoor District – Andhra Pradesh, India.',
      journalOrRemarks: 'Accepted for Publication in AIP – Scopus Indexed Journal',
      link: '#',
    },
    {
      id: 'pub-2',
      academicYear: 'AY 2021-22',
      authors: 'Sivakumar.V, K. Hemanth Kumar, Dr. S. Ranjith, Giridhar kumar V',
      title: 'Experimental study of steel-fiber reinforced concrete beams with confinement',
      journalOrRemarks: 'International Journal of All Research Education and Scientific Methods (IJARESM)',
      link: '#',
    },
    {
      id: 'pub-3',
      academicYear: 'AY 2020-21',
      authors: 'Dr. S. Ranjith, B.V. Kavyateja, K. Hemanth Kumar, R. Anil Kumar Reddy',
      title: 'Bacterial Concrete – A Review.',
      journalOrRemarks: 'Erudite Journal of Engineering Technology and Management Sciences',
      link: '#',
    },
    {
      id: 'pub-4',
      academicYear: 'AY 2020-21',
      authors: 'Dr. M. Mohan Babu',
      title: 'Assessment of Surface Water Hydrology and Rainwater Percolation Rates in Chittoor Basin',
      journalOrRemarks: 'Scopus Indexed AIP Conference Proceedings',
      link: '#',
    },
    {
      id: 'pub-5',
      academicYear: 'AY 2020-21',
      authors: 'Dr. B. Damodhara Reddy, Dr. N. Kiran Kumar',
      title: 'Non-Destructive Testing & Seismic Vulnerability Evaluation of Multi-Storey RC Frames',
      journalOrRemarks: 'Journal of Structural Engineering & Materials',
      link: '#',
    },
  ],
  laboratories: [
    {
      name: 'Surveying & Total Station / GPS Laboratory',
      description: 'Equipped with electronic Total Stations, GPS Receivers, Transit Theodolites, and Dumpy Levels for advanced topographic surveying, contouring, and land alignment.',
      equipment: ['Electronic Total Stations', 'Handheld GPS Receivers', 'Transit Theodolites', 'Auto Levels & Dumpy Levels', 'Plane Tables & Prismatic Compasses'],
      location: 'Civil Engineering Block, Ground Floor',
    },
    {
      name: 'Strength of Materials Laboratory',
      description: 'Hands-on testing of structural steel, timber, bricks, and concrete under tensile, compressive, shear, and torsional loads.',
      equipment: ['Universal Testing Machine (UTM 100 Ton)', 'Torsion Testing Machine', 'Charpy & Izod Impact Testers', 'Rockwell Hardness Tester', 'Spring Stiffness Tester'],
      location: 'Materials Testing Annex, Room 102',
    },
    {
      name: 'Concrete & Highway Materials Laboratory',
      description: 'Comprehensive evaluation of fresh and hardened concrete properties, nondestructive testing, and bitumen pavement characterization.',
      equipment: ['Digital Compressive Strength Machine (2000 kN)', 'Rebound Hammer (NDT)', 'Ultrasonic Pulse Velocity Tester', 'Vee-Bee Consistometer & Slump Cone', 'Los Angeles Abrasion Testing Machine', 'Ductility & Penetration Testing App'],
      location: 'Concrete Testing Wing, Room 104',
    },
    {
      name: 'Environmental Engineering Laboratory',
      description: 'Water and wastewater quality testing for drinking water standards, BOD, COD, pH, turbidity, and chemical analysis.',
      equipment: ['BOD Incubators & COD Digestion Units', 'Digital Turbidity Meter & pH Meters', 'Spectrophotometer', 'Jar Test Apparatus (Coagulation)', 'Muffle Furnace & Desiccators'],
      location: 'Environmental Sciences Lab, Room 205',
    },
    {
      name: 'Hydraulics & Fluid Machinery Laboratory',
      description: 'Study of fluid statics, open channel flow, calibration of flow meters, and performance tests on hydraulic turbines and pumps.',
      equipment: ['Pelton Wheel Turbine Rig', 'Francis & Kaplan Reaction Turbines', 'Centrifugal & Reciprocating Pumps', 'Venturi & Orifice Meter Testbeds', 'Bernoulli’s Theorem Apparatus', 'Rectangular & Triangular Notches'],
      location: 'Fluid Dynamics Hall, Ground Floor',
    },
    {
      name: 'Computer Aided Design & BIM Modeling Lab',
      description: 'High-end graphics workstations configured with civil engineering design software for 2D drafting, structural analysis, and 3D architectural modeling.',
      equipment: ['60 High-Performance Workstations', 'AutoCAD 2024 Suites', 'STAAD Pro V8i Structural Software', 'Autodesk Revit BIM Studio', 'ArcGIS & QGIS Geospatial Suites', 'Primavera P6 & MS Project'],
      location: 'CAD Center, Room 302',
    },
    {
      name: 'Soil Mechanics & Geotechnical Laboratory',
      description: 'Investigation of soil index properties, shear strength, permeability, compaction, and consolidation for foundation design.',
      equipment: ['Direct Shear Apparatus', 'Triaxial Compression Machine', 'Standard Proctor Compaction Rig', 'CBR Testing Machine', 'Constant & Falling Head Permeameters', 'Casagrande Liquid Limit App'],
      location: 'Geotechnical Wing, Room 108',
    },
    {
      name: 'Engineering Geology Laboratory',
      description: 'Megascopic study and classification of minerals, igneous, sedimentary, and metamorphic rocks, strike & dip mapping, and fault identification.',
      equipment: ['Mineral & Rock Specimen Collections (100+ Samples)', 'Geological Strike & Dip Clinometers', 'Polarizing Petrographic Microscopes', 'Crystal Models & Geological Map Toposheets'],
      location: 'Geology Wing, Room 208',
    },
  ],
  syllabusRegulations: {
    regulation: 'Academic Regulations R20 (CBCS)',
    title: 'B.Tech in Civil Engineering - 4 Year Degree Curriculum',
    semesters: [
      {
        semesterId: 'sem-1',
        title: 'I B.Tech I Semester (Regulations: R20)',
        totalCredits: 19.5,
        totalMarks: 900,
        courses: [
          { sNo: 1, category: 'BS', courseCode: '20AHS02', courseName: 'Differential Equations and Multivariable Calculus', hours: { l: 3, t: 1, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'BS', courseCode: '20AHS03', courseName: 'Engineering Chemistry', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 3, category: 'HS', courseCode: '20AHS01', courseName: 'Communicative English', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 4, category: 'ES', courseCode: '20ACS01', courseName: 'C Programming and Data Structures', hours: { l: 3, t: 1, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 5, category: 'ES', courseCode: '20AEE01', courseName: 'Basic Electrical Engineering and Mechanical Engineering', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 6, category: 'BS', courseCode: '20AHS06', courseName: 'Engineering Chemistry Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'HS', courseCode: '20AHS05', courseName: 'Communicative English Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'ES', courseCode: '20ACS03', courseName: 'C Programming and Data Structures Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 9, category: 'MC', courseCode: '20AMB01', courseName: 'Design Thinking (Mandatory Non-Credit)', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 100, see: 0, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-2',
        title: 'I B.Tech II Semester (Regulations: R20)',
        totalCredits: 19.5,
        totalMarks: 900,
        courses: [
          { sNo: 1, category: 'BS', courseCode: '20AHS04', courseName: 'Engineering Physics', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'BS', courseCode: '20AHS08', courseName: 'Algebra and Transformation Techniques', hours: { l: 3, t: 1, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 3, category: 'ES', courseCode: '20ACE01', courseName: 'Engineering Mechanics', hours: { l: 3, t: 1, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 4, category: 'ES', courseCode: '20ACS04', courseName: 'Problem Solving and Programming using Python', hours: { l: 3, t: 1, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 5, category: 'ES', courseCode: '20AME01', courseName: 'Computer Aided Engineering Drawing', hours: { l: 1, t: 0, p: 4 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 6, category: 'BS', courseCode: '20AHS07', courseName: 'Engineering Physics Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'ES', courseCode: '20AME02', courseName: 'Engineering Practice Lab (Carpentry, Fitting, Welding)', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'ES', courseCode: '20ACS05', courseName: 'Problem Solving and Programming using Python Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 9, category: 'MC', courseCode: '20AHS09', courseName: 'Environmental Sciences (Mandatory Non-Credit)', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 100, see: 0, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-3',
        title: 'II B.Tech I Semester (Regulations: R20)',
        totalCredits: 21.5,
        totalMarks: 1000,
        courses: [
          { sNo: 1, category: 'BS', courseCode: '20AHS10', courseName: 'Numerical Methods', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'PC', courseCode: '20ACE18', courseName: 'Strength of Materials', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'PC', courseCode: '20ACE04', courseName: 'Building Materials and Construction Technology', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'PC', courseCode: '20ACE05', courseName: 'Transportation Engineering', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 5, category: 'PC', courseCode: '20ACE06', courseName: 'Surveying', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 6, category: 'PC', courseCode: '20ACE07', courseName: 'Concrete Technology Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'PC', courseCode: '20ACE08', courseName: 'Surveying Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'PC', courseCode: '20ACE09', courseName: 'Strength of Materials Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 9, category: 'SC', courseCode: '20ACE10', courseName: 'Building Planning and Computer Aided Drafting Lab (Auto CAD-2D)', hours: { l: 1, t: 0, p: 2 }, credits: 2.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 10, category: 'MC', courseCode: '20AMB02', courseName: 'Universal Human Values – I', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 100, see: 0, total: 100 } },
          { sNo: 11, category: 'AC', courseCode: '20AHS11', courseName: 'Quantitative Aptitude and Reasoning - I', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 0, see: 0, total: 0 } },
          { sNo: 12, category: 'MC', courseCode: '20ANSS1', courseName: 'NSS / NCC Activities', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 0, see: 0, total: 0 } },
        ],
      },
      {
        semesterId: 'sem-4',
        title: 'II B.Tech II Semester (Regulations: R20)',
        totalCredits: 21.5,
        totalMarks: 900,
        courses: [
          { sNo: 1, category: 'ES', courseCode: '20ACE13', courseName: 'Engineering Geology', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'BS', courseCode: '20AHS13', courseName: 'Probability and Statistics', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'PC', courseCode: '20ACE14', courseName: 'Structural Analysis - I', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'PC', courseCode: '20ACE15', courseName: 'Hydraulics and Fluid Machinery', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 5, category: 'HS', courseCode: '20AMB03', courseName: 'Managerial Economics and Financial Analysis', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 6, category: 'ES', courseCode: '20ACE16', courseName: 'Engineering Geology Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'PC', courseCode: '20ACE17', courseName: 'Transportation Engineering Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'PC', courseCode: '20ACE20', courseName: 'Hydraulics & Fluid Machinery Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 9, category: 'SC', courseCode: '20ACE19', courseName: 'Total Station Surveying and GPS Lab', hours: { l: 1, t: 0, p: 2 }, credits: 2.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 10, category: 'AC', courseCode: '20AHS15', courseName: 'Quantitative Aptitude and Reasoning - II', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 0, see: 0, total: 0 } },
        ],
      },
      {
        semesterId: 'sem-5',
        title: 'III B.Tech I Semester (Regulations: R20)',
        totalCredits: 21.5,
        totalMarks: 1000,
        courses: [
          { sNo: 1, category: 'PC', courseCode: '20ACE22', courseName: 'Soil Mechanics', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'PC', courseCode: '20ACE23', courseName: 'Design of Reinforced Concrete Structures', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'PC', courseCode: '20ACE24', courseName: 'Structural Analysis - II', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'OE', courseCode: '20OE01', courseName: 'Open Elective - I / Job Oriented Elective (e.g. Renewable Energy, Pavement Analysis)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 5, category: 'PE', courseCode: '20PE01', courseName: 'Professional Elective - I (Architecture & Town Planning / Ground Water / Hydrology)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 6, category: 'PC', courseCode: '20ACE30', courseName: 'GIS Laboratory', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'PC', courseCode: '20ACE31', courseName: 'Structural Engineering Design Lab - I (STAAD Pro)', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'SC', courseCode: '20ACE32', courseName: 'Computer Aided Drafting Lab (Revit BIM & 3D Plan)', hours: { l: 1, t: 0, p: 2 }, credits: 2.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 9, category: 'MC', courseCode: '20AHS21', courseName: 'Indian Constitution', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 100, see: 0, total: 100 } },
          { sNo: 10, category: 'PR', courseCode: '20ACE37', courseName: 'Summer Internship / Community Service Project', hours: { l: 0, t: 0, p: 0 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-6',
        title: 'III B.Tech II Semester (Regulations: R20)',
        totalCredits: 21.5,
        totalMarks: 1000,
        courses: [
          { sNo: 1, category: 'PC', courseCode: '20ACE38', courseName: 'Design of Steel Structures', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'PC', courseCode: '20ACE39', courseName: 'Foundation Engineering', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'PC', courseCode: '20ACE40', courseName: 'Environmental Engineering', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'PE', courseCode: '20PE02', courseName: 'Professional Elective - II (Advanced Structural Design / Prestressed Concrete / Masonry)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 5, category: 'OE', courseCode: '20OE02', courseName: 'Open Elective - II (Operations Research / Urban Transport / Computer Graphics)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 6, category: 'PC', courseCode: '20ACE46', courseName: 'Soil Mechanics Laboratory', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'PC', courseCode: '20ACE47', courseName: 'Structural Engineering Design Lab - II (Multi-Storey & Water Tanks)', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'PC', courseCode: '20ACE48', courseName: 'Environmental Engineering Laboratory', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 9, category: 'SC', courseCode: '20AHS16', courseName: 'Advanced English Communication Skills Lab', hours: { l: 1, t: 0, p: 2 }, credits: 2.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 10, category: 'MC', courseCode: '20AHS23', courseName: 'Essence of Indian Traditional Knowledge', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 100, see: 0, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-7',
        title: 'IV B.Tech I Semester (Regulations: R20)',
        totalCredits: 23.0,
        totalMarks: 900,
        courses: [
          { sNo: 1, category: 'PE', courseCode: '20PE03', courseName: 'Professional Elective - III (Air Pollution / Bridge Engineering / Earthquake Engg)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'PE', courseCode: '20PE04', courseName: 'Professional Elective - IV (Retrofitting / Traffic Engineering / Disaster Mitigation)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'PE', courseCode: '20PE05', courseName: 'Professional Elective - V (Irrigation Structures / Finite Element Methods / Retaining Walls)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'OE', courseCode: '20OE03', courseName: 'Open Elective - III (Economic Policies in India / Optimization Techniques / Crypto)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 5, category: 'OE', courseCode: '20OE04', courseName: 'Open Elective - IV (AI for Engineers / Metro Rail Transport / IPR)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 6, category: 'HS', courseCode: '20AMB04', courseName: 'Humanities & Social Sciences (Creativity & Innovation / Law for Engineers)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'SC', courseCode: '20ACE66', courseName: 'Project Management Software Lab (Primavera P6 & MS Project)', hours: { l: 1, t: 0, p: 2 }, credits: 2.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'MC', courseCode: '20AMB12', courseName: 'Professional Ethics', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 100, see: 0, total: 100 } },
          { sNo: 9, category: 'PR', courseCode: '20ACE67', courseName: 'Industrial / Research Internship (Evaluation)', hours: { l: 0, t: 0, p: 0 }, credits: 3.0, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-8',
        title: 'IV B.Tech II Semester (Regulations: R20)',
        totalCredits: 12.0,
        totalMarks: 100,
        courses: [
          { sNo: 1, category: 'PR', courseCode: '20ACE72', courseName: 'Major Project Work, Seminar and Full-Semester Industry Internship (6 Months)', hours: { l: 0, t: 0, p: 24 }, credits: 12.0, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
    ],
    honorsPools: [
      {
        pool: 'POOL 1 (II B.Tech II Sem)',
        semester: 'II-II',
        courses: [
          { sNo: 1, category: 'HN', courseCode: '20ACE73', courseName: 'Industrial Structures (SE)', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'HN', courseCode: '20ACE74', courseName: 'Pavement Materials and Construction (TE)', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'HN', courseCode: '20ACE75', courseName: 'Alternate Building Materials (BS)', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'HN', courseCode: '20ACE76', courseName: 'Water Treatment Technology (EC)', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
      {
        pool: 'POOL 2 (III B.Tech I Sem)',
        semester: 'III-I',
        courses: [
          { sNo: 1, category: 'HN', courseCode: '20ACE77', courseName: 'Nanotechnology and its Application in Civil Engineering', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'HN', courseCode: '20ACE78', courseName: 'Railway Infrastructure Planning and Design', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'HN', courseCode: '20ACE79', courseName: 'Water Power Engineering', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'HN', courseCode: '20ACE80', courseName: 'Planning and Management of Environmental Projects', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
      {
        pool: 'POOL 3 (III B.Tech II Sem)',
        semester: 'III-II',
        courses: [
          { sNo: 1, category: 'HN', courseCode: '20ACE81', courseName: 'Advanced Design of Metal Structures', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'HN', courseCode: '20ACE82', courseName: 'Geotechnical Earthquake Engineering', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'HN', courseCode: '20ACE83', courseName: 'Stochastic Hydrology', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'HN', courseCode: '20ACE84', courseName: 'Road Transport Management and Economics', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
      {
        pool: 'POOL 4 (IV B.Tech I Sem)',
        semester: 'IV-I',
        courses: [
          { sNo: 1, category: 'HN', courseCode: '20ACE85', courseName: 'Sustainability Concepts in Civil Engineering', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'HN', courseCode: '20ACE86', courseName: 'Optimization Techniques in Geotechnical Engineering', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'HN', courseCode: '20ACE87', courseName: 'River Morphology', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'HN', courseCode: '20ACE88', courseName: 'Soil Mechanics for Highway Engineering', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
      {
        pool: 'POOL 5 (IV B.Tech I Sem Advanced)',
        semester: 'IV-I',
        courses: [
          { sNo: 1, category: 'HN', courseCode: '20ACE89', courseName: 'Design of High-Rise Buildings', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'HN', courseCode: '20ACE90', courseName: 'Soil Dynamics', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'HN', courseCode: '20ACE91', courseName: 'Urban Flood Planning and Management', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'HN', courseCode: '20ACE92', courseName: 'Environmental Impact Assessment of Transport Projects', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
    ],
    minorsTracks: [
      {
        track: 'TRACK 1',
        title: 'Structural Engineering Track',
        courses: [
          { sNo: 1, category: 'MN', courseCode: '20ACE98', courseName: 'Fundamentals of Building Design', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'MN', courseCode: '20ACE99', courseName: 'Geometric Design of Transportation Infrastructure', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'MN', courseCode: '20ACEA0', courseName: 'Non-Destructive Testing and Health Monitoring', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'MN', courseCode: '20ACEA1', courseName: 'Ferro Cement Technology', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 5, category: 'MN', courseCode: '20ACEA2', courseName: 'Prefabricated Structures', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
      {
        track: 'TRACK 2',
        title: 'Geotechnical Engineering Track',
        courses: [
          { sNo: 1, category: 'MN', courseCode: '20ACEA3', courseName: 'Construction Materials and Building Design', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'MN', courseCode: '20ACEA4', courseName: 'Testing Methods for CNS Soil', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'MN', courseCode: '20ACEA5', courseName: 'Ground Water Development and Management', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'MN', courseCode: '20ACEA6', courseName: 'Design of Earth Retaining Structures', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 5, category: 'MN', courseCode: '20ACEA7', courseName: 'Deep Excavations and Tunnels', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
      {
        track: 'TRACK 3',
        title: 'Environmental & Water Resources Engineering Track',
        courses: [
          { sNo: 1, category: 'MN', courseCode: '20ACEA8', courseName: 'Advanced Surveying', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'MN', courseCode: '20ACEA9', courseName: 'Environmental Biotechnology', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'MN', courseCode: '20ACEB0', courseName: 'Ground Water Hydrology', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'MN', courseCode: '20ACEB1', courseName: 'Water Quality Modeling', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 5, category: 'MN', courseCode: '20ACEB2', courseName: 'Surface Water Hydrology', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
      {
        track: 'TRACK 4',
        title: 'Transportation Engineering Track',
        courses: [
          { sNo: 1, category: 'MN', courseCode: '20ACEB3', courseName: 'Railways and Airports', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 2, category: 'MN', courseCode: '20ACEB4', courseName: 'Housing Planning and Management', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 3, category: 'MN', courseCode: '20ACEB5', courseName: 'Design and Construction of Highway Pavements', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 4, category: 'MN', courseCode: '20ACEB6', courseName: 'Airport and Sea Port Engineering', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 5, category: 'MN', courseCode: '20ACEB7', courseName: 'Docks and Harbor Engineering', hours: { l: 3, t: 1, p: 0 }, credits: 4, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
    ],
  },
  syllabusDownloads: [
    {
      title: 'B.Tech Civil Engineering R20 Academic Regulations & Syllabus',
      regulation: 'R20 Autonomous CBCS',
      size: '5.4 MB',
      fileUrl: '/syllabus/b tech R20-EEE DEPARTMENT.pdf',
      downloadFileName: 'BTech_Civil_R20_Academic_Regulations_Syllabus.pdf',
      level: 'B.Tech Under Graduate',
      badge: 'Official Syllabus',
      description: 'Comprehensive 4-Year B.Tech Civil Engineering curriculum book with all 8 semesters theory and laboratory course syllabi, structural analysis, survey, and geotechnical engineering courses.',
    },
    {
      title: 'M.Tech Structural Engineering Course Curriculum & Scheme',
      regulation: 'M.Tech Autonomous Regulations',
      size: '1.8 MB',
      fileUrl: '/syllabus/M.Tech (PE & ED) FINAL EEE DEPARTMENT.pdf',
      downloadFileName: 'MTech_Structural_Engineering_Syllabus.pdf',
      level: 'M.Tech Post Graduate',
      badge: 'M.Tech Structural Engg',
      description: 'Advanced structural dynamics, finite element analysis, earthquake-resistant design, bridge engineering, and research project dissertation guidelines.',
    },
  ],
  association: {
    name: 'Civil Engineering Department Association',
    acronym: 'CEDA',
    tagline: 'Building the Future with Engineering Excellence',
    description: 'CEDA is the student-led professional association of Civil Engineering at RVS University / SVCET. CEDA organizes national level technical symposia, bridge modeling competitions, survey camps, industrial site visits, and community infrastructure outreach.',
    activities: [
      'Annual Technical Symposium "SELESTA & PROSOVO" civil design challenges',
      'Spaghetti Bridge & CAD Modeling Competitions',
      'Survey Camp in nearby hilly terrain using Digital Total Stations',
      'Industrial Site Visits to Mega Irrigation Projects & Highway Construction Sites',
      'Guest Lectures from L&T and State Public Works Department (PWD) Chief Engineers',
      'Concrete Cube Testing & Strength Prediction Hackathon',
    ],
  },
  rnd: {
    patentsFiled: 12,
    consultancyAreas: [
      'Concrete Mix Design & Quality Testing for Ready Mix Concrete (RMC) plants',
      'Soil Testing, Bearing Capacity & Standard Penetration Test (SPT) for Builders',
      'Water Quality Testing & Effluent Treatment Assessment for Local Industries',
      'Structural Stability & Distress Audit for Commercial & Public Buildings',
      'Non-Destructive Testing (NDT) using Rebound Hammer and Ultrasonic Pulse Velocity',
    ],
    thrustAreas: [
      'Sustainable Concrete & Geopolymer Concrete from Industrial Slag',
      'Earthquake Resistant Design of RC High-Rise Buildings',
      'Groundwater Recharge & Watershed Hydrology Modeling in Rayalaseema',
      'GIS-based Urban Transportation & Traffic Congestion Mitigation',
      'Bacterial Self-Healing Concrete and Smart Nano-Materials',
    ],
    mous: [
      'MoU with National Council for Cement and Building Materials (NCB)',
      'MoU with Construction Industry Development Council (CIDC)',
      'Collaboration with State Pollution Control Board & Public Works Department',
      'Academic Association with Bentley Systems & Autodesk Academy',
    ],
  },
  studentCorner: {
    clubs: [
      'CEDA Student Council & Technical Committee',
      'ICI (Indian Concrete Institute) Student Chapter',
      'IEI (Institution of Engineers India) Civil Division',
      'Eco-Habitat & Green Construction Guild',
    ],
    achievements: [
      '1st Prize in National Technical Symposium "Prosovo" on Stage Felicitations',
      'Winners in Smart City Structural Model Design at State Engineering Expo',
      '100% Student Participation in 1-Week Intensive Mountain Surveying Camp',
      'Published 5+ Student Co-Authored Research Papers in Scopus Journals',
    ],
    internships: [
      'L&T Construction - Highway & Metro Rail Project Stints (6 Months)',
      'Afcons Infrastructure - Bridge & Tunnel Construction Sites',
      'Shapoorji Pallonji - High Rise Commercial Towers',
      'AP State Housing Corporation & Irrigation Division',
    ],
  },
  placement: {
    highlights: [
      '95%+ Placement Track in Core Civil & Allied Construction Tech',
      'Highest Package: ₹12 LPA in Core Infrastructure Projects',
      'Average Package: ₹5.5 LPA with Fortune 500 Infrastructure Giants',
      'Mandatory 6-Month Paid Capstone Internship conversion to PPOs',
    ],
    topRecruiters: [
      'Larsen & Toubro (L&T Construction)',
      'Afcons Infrastructure Ltd',
      'Shapoorji Pallonji & Co.',
      'Tata Projects',
      'Sobha Developers',
      'UltraTech Cement',
      'Ramky Infrastructure',
      'NCC Limited',
      'GMR Group',
      'My Home Constructions',
    ],
    roles: [
      'Graduate Engineer Trainee (GET) - Structural',
      'Site Execution & Project Management Engineer',
      'Quality Control & Materials Testing Engineer',
      'BIM Modeler & CAD Structural Designer',
      'Surveying & GIS Mapping Specialist',
      'Environmental Health & Safety (EHS) Officer',
    ],
  },
  events: [
    {
      title: 'SELESTA 2K25 & PROSOVO: National Civil Engineering Symposium',
      date: 'March 15-16, 2025',
      type: 'National Symposium',
      description: 'Over 500+ participants from 40+ engineering colleges competing in CAD Mania, Bridge Design, Technical Paper Presentation, and Concrete Quiz.',
    },
    {
      title: '1-Week Intensive Topographical Field Survey Camp',
      date: 'February 10-16, 2025',
      type: 'Field Camp',
      description: 'Comprehensive fieldwork covering Total Station traversing, GPS triangulation, and leveling for 120 III-year Civil students.',
    },
    {
      title: 'Workshop on Building Information Modeling (BIM) using Revit',
      date: 'January 24, 2025',
      type: 'Skill Workshop',
      description: 'Hands-on certified masterclass on 3D building modeling, clash detection, and MEP coordination for infrastructure.',
    },
  ],
  contact: {
    department: 'Department of Civil Engineering',
    hodName: 'Dr. B. Damodhar Reddy, HOD & Professor',
    officeLocation: 'Civil Engineering Block, Room 201, RVS University / SVCET Campus',
    email: 'hodce@svcetedu.org',
    phone: '+91 85722 46298',
    altPhone: '+91 77299 99158',
    officeHours: 'Monday - Saturday: 9:00 AM - 5:00 PM',
  },
};

export const EEE_DEPARTMENT_DATA: DepartmentDetailData = {
  id: 'eee',
  name: 'Department of Electrical & Electronics Engineering',
  shortName: 'Electrical & Electronics Engineering',
  schoolName: 'School of Engineering and Technology (SOET)',
  degreeName: 'B.Tech / M.Tech / Diploma in Electrical & Electronics Engineering',
  bannerImage: eeeDeptImg,
  hod: {
    name: 'Dr. Y.N.VIJAYA KUMAR',
    designation: 'HOD & Professor',
    qualification: 'M.Tech, Ph.D',
    experience: 25,
    email: 'hodeee@svcetedu.org',
    phone: '+91 94400 45288',
    room: 'Electrical Sciences Block, Room 101, RVS University Campus',
    image: hodEeeImg,
    message: 'Welcome to the Department of Electrical and Electronics Engineering (EEE) at RVS University. Established in 1998, our department is accredited by NBA & NAAC and recognized as a research centre by JNTUA. We are dedicated to providing experiential engineering education in power systems, electric vehicles, renewable smart microgrids, and industrial automation.',
  },
  profile: {
    nbaAccreditation: 'Accredited by NBA & NAAC • JNTUA Research Centre • Autonomous Since 2012',
    overview: `The Department of Electrical and Electronics Engineering (EEE) at RVS University was established in 1998 and has since grown to offer Diploma, B.Tech, and M.Tech programs. Accredited by NBA and NAAC, and recognized as a research center by JNTUA, the department has achieved autonomous status since 2012. With a robust faculty team comprising experienced professors holding PhDs and M.Tech degrees, the department adheres to AICTE norms, maintaining a faculty-student ratio of 1:15. It boasts well-equipped laboratories, including Electrical Circuits, Machines, Power Systems, and Power Electronics Labs, as well as advanced facilities like Embedded Systems and Simulation Labs. The department also integrates skill-oriented courses and licensed software such as MATLAB, PSIM, and SKM Power Tools to provide practical and research-oriented education.

The department actively fosters academic excellence through seminars, conferences, guest lectures, and technical workshops. It has received significant grants, including Rs. 7.25 Lakhs under MODROBS for lab modernization and Rs. 23 Lakhs under the Women Scientist Scheme for advanced research projects. Students gain real-world exposure through industrial visits, technical training, and projects, preparing them for placements in top organizations like Infosys, Wipro, Siemens, Toshiba, and APTRANSCO. Faculty members are actively engaged in research, publishing in reputed journals, and contributing to consultancy projects. The department’s commitment to quality education, state-of-the-art infrastructure, and a focus on student and faculty development ensures its position as a leader in Electrical and Electronics Engineering education.`,
    objectives: [
      'To provide a strong foundation in Electrical and Electronics Engineering principles, equipping students with theoretical and practical knowledge to solve real-world engineering problems.',
      'To foster innovation and research capabilities through advanced laboratories, modern simulation tools, and industry-sponsored projects.',
      'To prepare students for successful careers in core electrical engineering industries, power sectors, and emerging technologies, while encouraging entrepreneurial endeavors.',
      'To promote continuous learning and skill enhancement through technical workshops, seminars, faculty development programs, and industrial visits.',
      'To instill professional ethics and social responsibility in students, ensuring they contribute positively to society and uphold sustainable engineering practices.',
      'To bridge the gap between academia and industry by providing hands-on experience with advanced tools like MATLAB, PSIM, and Embedded Systems, and facilitating internships and placements in reputed organizations.',
      'To encourage lifelong learning and advanced education by motivating students and faculty to engage in higher studies, cutting-edge research, and participation in national and international conferences.',
    ],
    strengths: [
      'Accreditation and Recognition (Accredited by NBA & NAAC, Autonomous status since 2012, JNTUA Recognized Research Center)',
      'Experienced and Qualified Faculty (AICTE compliant 1:15 faculty-student ratio with Doctorate and M.Tech research guides)',
      'State-of-the-Art Infrastructure (Modernized with ₹7.25 Lakhs AICTE MODROBS grant & licensed MATLAB, PSIM, SKM Power Tools)',
      'Conduction of high-impact workshops, national seminars, technical symposiums, and expert guest lectures',
      'Industry Collaborations and Placements in premier enterprises (Siemens, Toshiba, APTRANSCO, Infosys, Wipro)',
      'Research and Development Focus (Major research projects including ₹23 Lakhs Women Scientist Scheme grant)',
      'Regular seminars, workshops, technical quizzes, industrial visits, and communication skill enhancement programs',
    ],
    coursesOffered: [
      {
        level: 'Under Graduate',
        course: 'Electrical and Electronics Engineering (B.Tech)',
        intake: 60,
        convenorQuota: 42,
        bCategory: 18,
        pio: 9,
      },
      {
        level: 'Diploma',
        course: 'Electrical and Electronics Engineering (DEEE)',
        intake: 60,
        convenorQuota: 42,
        bCategory: 18,
      },
      {
        level: 'Post Graduate',
        course: 'M.Tech in Power Electronics & Electrical Drives (PE & ED)',
        intake: 18,
        convenorQuota: 13,
        bCategory: 5,
      },
    ],
  },
  visionMission: {
    vision: 'To be recognized as a center of excellence to produce competent and ethical Electrical Engineers capable of finding solutions to problems related to society, environment and industry using innovative technologies.',
    mission: `M1: To establish suitable forums and state-of-the art resources to enhance the faculty members creative and innovative endeavours in teaching and research in Electrical Engineering and allied fields.

M2: To deliver knowledge among students through contemporary curriculum and modern pedagogical methods in the areas of electrical engineering and interdisciplinary areas.

M3: To enable students, develop skills in solving complex engineering problems of current times and also provide a framework for promoting collaborative and multidisciplinary activities.

M4: To nurture the personality traits among the students in different dimensions emphasis the ethical values and to address needs of the nation.`,
    articulation: 'The vision and mission of the Department of Electrical & Electronics Engineering emphasize our relentless commitment to academic rigour, research innovation, and sustainable technology development in power and energy systems.',
    keyObjectives: [
      'Equip students with deep mathematical and physical foundations in electrical circuits, machines, and electronics.',
      'Bridge industrial demands with state-of-the-art power simulation, embedded systems, and renewable integration.',
      'Inculcate professional values, environmental responsibility, and creative leadership in engineering design.',
    ],
    commitment: 'We commit to delivering cutting-edge technical education, nurturing ethical problem-solvers, and empowering our graduates with top-tier industrial placements and research excellence.',
  },
  outcomes: {
    peos: [
      {
        code: 'PEO-1',
        objective: 'Excel in professional career and/or higher education by acquiring knowledge in Mathematics and Basic Electrical Sciences, Power Systems, Power Electronics and Electrical Drives.',
      },
      {
        code: 'PEO-2',
        objective: 'Identify the problems in society and design Electrical systems appropriate to its solutions through starting companies, producing economically feasible and socially acceptable.',
      },
      {
        code: 'PEO-3',
        objective: 'Exhibit professionalism, ethical attitude, communication skills, team work in their profession and adapt to current trends in technology by engaging in continuous professional development.',
      },
    ],
    psos: [
      {
        code: 'PSO-1',
        outcome: 'Identify, formulate and investigate various problems of electrical and electronic circuits, power electronics and power systems by applying the fundamental knowledge of mathematics, science and engineering.',
      },
      {
        code: 'PSO-2',
        outcome: 'Design, develop and implement multidisciplinary projects in the field of electrical power and energy using state-of-the-art technologies and modern software tools.',
      },
      {
        code: 'PSO-3',
        outcome: 'Design and develop sustainable models in the fields of Generation, Transmission, Distribution, Control systems and Renewable Energy Systems.',
      },
    ],
    pos: [
      { code: 'PO-1', title: 'Engineering Knowledge', outcome: 'Leverage the principles of mathematics, natural sciences, engineering fundamentals, and specialized engineering knowledge to tackle complex engineering problems.' },
      { code: 'PO-2', title: 'Problem Analysis', outcome: 'Formulate, review, and analyze complex engineering problems using foundational principles of mathematics, natural sciences, and engineering, ensuring data-driven and scientifically valid conclusions.' },
      { code: 'PO-3', title: 'Design/Development of Solutions', outcome: 'Develop innovative solutions for complex engineering challenges, ensuring that system components or processes meet specified needs, with consideration for public health, safety, and environmental, cultural, and societal impact.' },
      { code: 'PO-4', title: 'Conduct Investigations', outcome: 'Use research-based methods including experimental design, data analysis, and synthesis to investigate and resolve complex engineering problems.' },
      { code: 'PO-5', title: 'Modern Tool Usage', outcome: 'Select and apply appropriate modern engineering and IT tools, including prediction and modeling techniques, to address complex engineering activities, understanding their limitations.' },
      { code: 'PO-6', title: 'The Engineer and Society', outcome: 'Apply engineering solutions informed by contextual knowledge to assess and address societal, health, safety, legal, and cultural issues in engineering practice.' },
      { code: 'PO-7', title: 'Environment and Sustainability', outcome: 'Recognize and address the societal and environmental impacts of engineering solutions, ensuring alignment with sustainable development practices.' },
      { code: 'PO-8', title: 'Ethics', outcome: 'Adhere to professional ethical principles and responsibilities, demonstrating a commitment to ethical conduct in engineering practice.' },
      { code: 'PO-9', title: 'Individual and Team Work', outcome: 'Work effectively as an individual or within diverse teams, taking leadership roles and collaborating in multidisciplinary environments.' },
      { code: 'PO-10', title: 'Communication', outcome: 'Communicate effectively about complex engineering topics with both the engineering community and the public, producing clear reports, design documentation, and presentations.' },
      { code: 'PO-11', title: 'Project Management and Finance', outcome: 'Demonstrate understanding of engineering and management principles, applying them effectively to manage projects and work in multidisciplinary team settings.' },
      { code: 'PO-12', title: 'Life-Long Learning', outcome: 'Acknowledge the necessity for continuous learning and possess the skills to engage in independent and lifelong education in the context of technological advancements.' },
    ],
  },
  faculty: {
    btech: [
      { sNo: 1, name: 'Dr. Y.N.VIJAYA KUMAR', designation: 'Professor & HOD', qualification: 'Ph.D', experience: 25, specialization: 'Power Systems, Multilevel Inverters & Smart Grids' },
      { sNo: 2, name: 'Dr. G. Balasundaram', designation: 'Professor', qualification: 'Ph.D', experience: 21, specialization: 'Power Electronics, EV Wireless Charging & Renewable Energy' },
      { sNo: 3, name: 'Dr. G. Ravindra', designation: 'Associate Professor', qualification: 'Ph.D', experience: 16, specialization: 'Electrical Machines & Power Quality' },
      { sNo: 4, name: 'Dr. Y. Dinakar', designation: 'Associate Professor', qualification: 'Ph.D', experience: 15, specialization: 'Control Systems & Energy Storage' },
      { sNo: 5, name: 'Mr. M. Poornachandra Reddy', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 8, specialization: 'Microgrids & EV Battery Energy Management' },
      { sNo: 6, name: 'Mr. G. Devanatha Reddy', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 13, specialization: 'Power Electronics & Industrial Drives' },
      { sNo: 7, name: 'Ms. J. Pavalam', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 9, specialization: 'Signal Processing & Power System Automation' },
      { sNo: 8, name: 'Mr. G. Venkata Pradeep', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 15, specialization: 'High Voltage Engineering & Transmission Systems' },
      { sNo: 9, name: 'Mr. S. Ramesh', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 5, specialization: 'Electrical Circuits & Simulation' },
      { sNo: 10, name: 'Mr. V. Sunilkumar Reddy', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 9, specialization: 'Power Distribution & Protection' },
      { sNo: 11, name: 'Mrs. S.V. Krithika', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 12, specialization: 'Embedded Systems & Microcontroller Applications' },
      { sNo: 12, name: 'Mrs. V. Bhanu', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 9, specialization: 'Control & Instrumentation' },
      { sNo: 13, name: 'Ms. R. Haritha', designation: 'Assistant Professor', qualification: 'M.Tech', experience: 7, specialization: 'Renewable Solar & Wind Energy Technologies' },
    ],
    mtech: [
      { sNo: 1, name: 'Dr. S. Senthil', designation: 'Professor', qualification: 'Ph.D', experience: 23, specialization: 'Solar PV Systems, Power Quality & BLDC Drives' },
      { sNo: 2, name: 'Dr. G. Sabharinath', designation: 'Associate Professor', qualification: 'Ph.D', experience: 13, specialization: 'Advanced Power Electronics & Industrial Drives' },
    ],
    diploma: [
      { sNo: 1, name: 'Mr. P.R. Murali Mohan', designation: 'Lecturer', qualification: 'M.Tech', experience: 25, specialization: 'Wireless Power Transfer & EV Charging Systems' },
      { sNo: 2, name: 'Mr. P. Sahadevaiah', designation: 'Lecturer', qualification: 'M.Tech', experience: 5, specialization: 'Electrical Wiring & Measurements' },
      { sNo: 3, name: 'Mr. P. Venkataramana', designation: 'Lecturer', qualification: 'M.Tech', experience: 8, specialization: 'Electrical Machines Maintenance & Testing' },
      { sNo: 4, name: 'Mr. K. Ramaraju', designation: 'Lecturer', qualification: 'M.Tech', experience: 12, specialization: 'Power Systems Operations' },
      { sNo: 5, name: 'Ms. K. Bhavani', designation: 'Lecturer', qualification: 'M.Tech', experience: 7, specialization: 'Basic Electrical Engineering & Devices' },
      { sNo: 6, name: 'Mr. A. Banu Prakash', designation: 'Lecturer', qualification: 'M.Tech', experience: 4, specialization: 'Power Electronics Practice' },
      { sNo: 7, name: 'Mr. M. Kaviarasan', designation: 'Lecturer', qualification: 'M.Tech', experience: 7, specialization: 'Digital Electronics & Microprocessors' },
    ],
  },
  publications: [
    {
      id: 'eee-pub-1',
      academicYear: 'October 2023',
      authors: 'T. Devaraju, Y.N. Vijayakumar, M. Pala Prasad Reddy, T. Kosaleswara Reddy',
      title: 'Dynamic Voltage Control in Multilevel Inverters with TAR PWM for Non-Uniform DC Inputs',
      journalOrRemarks: 'SSRG International Journal of Electrical and Electronics Engineering, Vol. 10(10), pp. 207-217, ISSN: 2348-8379',
    },
    {
      id: 'eee-pub-2',
      academicYear: '2023-24',
      authors: 'Mugachintala Dilip Kumar, D. Himabindu, Yarrem Narasimhulu Vijaya Kumar, Thota Mohana, Ramagiri Shashank, Bodapati Venkata Rajanna',
      title: 'Efficiency enhancement in hybrid renewable energy system using Polycrystalline silicon cell',
      journalOrRemarks: 'International Journal of Applied Power Engineering (IJAPE), ISSN: 2252-8792',
    },
    {
      id: 'eee-pub-3',
      academicYear: '2023',
      authors: 'Y.N. Vijayakumar',
      title: 'Solar system fed with PMSM Drive',
      journalOrRemarks: 'Semiconductor Optoelectronics, Vol. 42(2), pp. 216-228, ISSN: 1001-5868',
    },
    {
      id: 'eee-pub-4',
      academicYear: '2023 (Book)',
      authors: 'G. Nageswara Rao, Y.N. Vijaya Kumar, Mrs. R.K. Padma Shini, Dr. P. Selvan',
      title: 'Hybrid Electric Vehicles principles and Applications',
      journalOrRemarks: 'RK Publications, ISBN: 978-81-19140-96-1 (Book Published)',
    },
    {
      id: 'eee-pub-5',
      academicYear: 'June 2023 (Patent)',
      authors: 'Y.N. Vijayakumar',
      title: 'A system and method for smart IOT innovation of Solar energy consumption and analytics control in GR',
      journalOrRemarks: 'Patent No. 202341032634 (Patent Published)',
    },
    {
      id: 'eee-pub-6',
      academicYear: 'May 2023 (Patent)',
      authors: 'Y.N. Vijayakumar',
      title: 'Artificial Intelligence-Based Maintenance Of Electric Vehicle Battery Charging Systems',
      journalOrRemarks: 'Patent No. 202341035634 (Patent Published)',
    },
    {
      id: 'eee-pub-7',
      academicYear: 'March 2024 (Patent)',
      authors: 'Y.N. Vijayakumar',
      title: 'Artificial Intelligence Driven Predictive Strategies For Enhancing Electric Vehicle Battery Charging Life Cycle Sustainability',
      journalOrRemarks: 'Patent No. 202441006770 (Patent Published)',
    },
    {
      id: 'eee-pub-8',
      academicYear: 'November 2023 (Patent)',
      authors: 'Y.N. Vijayakumar',
      title: 'Machine Learning Methods For Intelligent Analysis of Energy Management In Iot-Enabled Smart Cities',
      journalOrRemarks: 'Patent No. 202321066669 (Patent Published)',
    },
    {
      id: 'eee-pub-9',
      academicYear: 'May 2023',
      authors: 'Y.N. Vijayakumar, Yatindra Gopal, Yarrem Narasimhulu, Akanksha Kumari, Om Prakash, Subrata Chouwdhary, Abudullah A. Almehizia',
      title: 'Reduced device count for self-balancing switched-capacitor multilevel inverter integration with renewable energy source',
      journalOrRemarks: 'Sustainability (MDPI), Vol. 15, Article 8000',
    },
    {
      id: 'eee-pub-10',
      academicYear: 'July 2023',
      authors: 'Y.N. Vijayakumar, Yatindra Gopal, Kaibalya Prasad Panda, C. Vimal Raj',
      title: 'A novel method of islanding detection for multilevel inverter based distributed generation using SPWM technique',
      journalOrRemarks: 'AIP Publishing, Vol. 2548, Issue 1, ID: 5545081',
    },
    {
      id: 'eee-pub-11',
      academicYear: 'July 2023',
      authors: 'C. Vimalraj, Yatindra Gopal, Y.N. Vijaya Kumar',
      title: 'Multiple audio channels wirelessly streamed into a telephone',
      journalOrRemarks: 'AIP Publishing, Vol. 2548, Issue 1',
    },
    {
      id: 'eee-pub-12',
      academicYear: 'March 2023',
      authors: 'Y.N. Vijayakumar, Venkatasupraja Vemulapati, N. Visali',
      title: 'Modular Multilevel converter based advanced traction power transmission substation for high-speed railway network in India',
      journalOrRemarks: 'Distributed Generation & Alternative Energy Journal, Vol. 38(3), pp. 965-988',
    },
    {
      id: 'eee-pub-13',
      academicYear: '2023 (Book)',
      authors: 'Y.N. Vijayakumar',
      title: 'Hybrid Electric Vehicles principles and Applications (2nd Edition)',
      journalOrRemarks: 'RK Publications, ISBN: 978-81-19140-96-1',
    },
    {
      id: 'eee-pub-14',
      academicYear: 'June 2023 (Patent)',
      authors: 'Y.N. Vijayakumar',
      title: 'A system and method for smart IOT innovation of solar energy consumption and analysis control in grids',
      journalOrRemarks: 'Patent No. 202341032634 (Patent Published)',
    },
    {
      id: 'eee-pub-15',
      academicYear: 'February 2022',
      authors: 'Y.N. Vijayakumar',
      title: 'Performance enhancement of a high-speed railway supply system with multi module converter: A laboratory prototype model for Indian railways',
      journalOrRemarks: 'IEEE & Elsevier Power Systems Proceedings',
    },
    {
      id: 'eee-pub-16',
      academicYear: 'May 2022',
      authors: 'Y.N. Vijayakumar',
      title: 'Analyzing the Loading Characteristics of Specially Coupled Transformers using Different Power factor Calculations',
      journalOrRemarks: 'ICETTECCI-2022, SVCE, Tirupati',
    },
    {
      id: 'eee-pub-17',
      academicYear: 'May 2022',
      authors: 'Y.N. Vijayakumar',
      title: 'Despeckling of ultrasound images using non sub sampled contourlet transform and fuzzy based thresholding',
      journalOrRemarks: 'ICETTECCI-2022, SVCE, Tirupati',
    },
    {
      id: 'eee-pub-18',
      academicYear: 'May 2022',
      authors: 'Y.N. Vijayakumar',
      title: 'Investigation on asymmetrical inverter with flyback converter using single DC source for photovoltaic system',
      journalOrRemarks: 'ICETTECCI-2022, SVCE, Tirupati',
    },
    {
      id: 'eee-pub-19',
      academicYear: '2022',
      authors: 'Y.N. Vijayakumar',
      title: 'Advanced high Speed Rail Electric Power Supply Network with Modular multilevel Converters',
      journalOrRemarks: 'ICSMSM-2022 Proceedings',
    },
    {
      id: 'eee-pub-20',
      academicYear: '2022',
      authors: 'Y.N. Vijayakumar',
      title: 'A Control Strategy for Grid Connected Dual Inverter using SVPWM',
      journalOrRemarks: 'ICSMSM-2022 Proceedings',
    },
    {
      id: 'eee-pub-21',
      academicYear: 'October 2021',
      authors: 'Y.N. Vijaya Kumar',
      title: 'Co-phase traction substation for Indian railways with AC-DC-AC modular multilevel converter: the laboratory prototype model',
      journalOrRemarks: 'GIS Science Journal, Vol. 8(10), pp. 1-12',
    },
    {
      id: 'eee-pub-22',
      academicYear: 'April 2025',
      authors: 'Dr. S. Senthil, Ravichandran Sekar, J.N. Chandra Sekhar, S. Selvaganapati, S. Sengottaian',
      title: 'Improvement of Power Quality in Solar Photovoltaic Water Pump Driven by BLDC Motor with Grid Using ANN',
      journalOrRemarks: 'Journal New Materials Electrochemical Systems, Vol. 4',
    },
    {
      id: 'eee-pub-23',
      academicYear: '2023',
      authors: 'Dr. S. Senthil, Orugunda Naga Damini, S. Nagaraj, C.M. Sripriya',
      title: 'An Improved switching activity optimized LFSR for energy efficient BIST applications',
      journalOrRemarks: '2nd International Conference on ViTECoN, Vellore, IEEE, pp. 1-6',
    },
    {
      id: 'eee-pub-24',
      academicYear: 'April 2023 (Book)',
      authors: 'S. Nagaraj, Dr. S. Senthil',
      title: 'Basic Electronics',
      journalOrRemarks: 'Amazon Publishers, ISBN: 978-620-6-15536-2',
    },
    {
      id: 'eee-pub-25',
      academicYear: '2023',
      authors: 'Dr. S. Senthil, Dr. Y.N. Vijaya Kumar, Dr. G. Balasundaram, Dr. P. Monica',
      title: 'Solar system fed with PMSM Drive',
      journalOrRemarks: 'Semiconductor Optoelectronics, Vol. 42(2), pp. 216-228, ISSN: 1001-5868',
    },
    {
      id: 'eee-pub-26',
      academicYear: '2023',
      authors: 'Dr. S. Senthil, D. Srihari, S. Nagaraj, D. Himabindhu',
      title: 'Design and analysis of 32-bit reversible ALU for low power applications',
      journalOrRemarks: 'Semiconductor Optoelectronics, Vol. 42(2), pp. 181-187',
    },
    {
      id: 'eee-pub-27',
      academicYear: 'June 2023 (Patent)',
      authors: 'Dr. S. Senthil, Dr. Y.N. Vijaya Kumar, Dr. G. Balasundaram, Dr. P. Monica, D. Himabindhu, V. Vijaya Bhaskar, Dr. M. Mohan Babu, P.R. Murli Mohan, B. Trirumala Rao, M. Satish Kumar',
      title: 'A system and method for smart IOT innovation of solar energy consumption and analysis control in grids',
      journalOrRemarks: 'Patent Application No. 202341032634 A',
    },
    {
      id: 'eee-pub-28',
      academicYear: 'September 2023',
      authors: 'Dr. G. Balasundaram, J. Gowrishankar, J. Manikandan, D. Chandrakala, P. Munisekhar',
      title: 'Optimizing reactive power using a hybrid improved shuffled bat algorithm',
      journalOrRemarks: 'International Journal of Mathematical Modeling and Numerical Optimization, Vol. 13(4), pp. 352–364',
    },
    {
      id: 'eee-pub-29',
      academicYear: '2023',
      authors: 'Dr. G. Balasundaram, C. Balaji, R. Venugopal, Jayachitra Selvaraj, A. Dominic Savio',
      title: 'Design and Performance Study of LCC-LCC and LCC-S Compensation Network for Wireless Charging of EV Battery',
      journalOrRemarks: 'IEEE International Transportation Electrification Conference (ITEC-India), Chennai, pp. 1-7',
    },
    {
      id: 'eee-pub-30',
      academicYear: 'March 2023 (Conference)',
      authors: 'Dr. G. Balasundaram, J. Gowrisankar, V.R. Rajan',
      title: 'Human Following Robot Using Arduino with GPS Tracker',
      journalOrRemarks: '8th ICSET-2023, Thailand, ISBN: 978-93-5737-739-3',
    },
    {
      id: 'eee-pub-31',
      academicYear: 'June 2021 (Patent)',
      authors: 'Dr. P. Monica',
      title: 'CNN based fast lithium ion battery capacity estimation for electric vehicle',
      journalOrRemarks: 'Patent Office Journal No. 26/2021 (Patent Published)',
    },
    {
      id: 'eee-pub-32',
      academicYear: 'July 2023',
      authors: 'Dr. P. Monica, Kriti Srivastava, A. Charitha, S. Malathi, D. Keerna Hanirex, S. Silvia Priscila',
      title: 'PV based hysteresis control of switched inductor buck boost converter for autonomous DC micro grid applications',
      journalOrRemarks: 'AIP Publishing, Vol. 2548, Issue 1',
    },
    {
      id: 'eee-pub-33',
      academicYear: '2023',
      authors: 'Dr. Y. Gopal',
      title: 'A Switched-Capacitor-Based 7-Level Self-Balancing High-Gain Inverter Employing a Single DC Source (SCIE)',
      journalOrRemarks: 'International Transactions on Electrical Energy Systems, Vol. 2023, Article ID: 5545081',
    },
    {
      id: 'eee-pub-34',
      academicYear: '2023',
      authors: 'Dr. Y. Gopal',
      title: 'A single source five-level switched-capacitor based multilevel inverter with reduced device count',
      journalOrRemarks: 'e-Prime - Advances in Electrical Engineering, Electronics and Energy, Vol. 5, Article ID 100235',
    },
    {
      id: 'eee-pub-35',
      academicYear: 'February 2023 (Patent)',
      authors: 'Dr. Y. Gopal',
      title: 'Dual band helmet integrated stacked antenna for wireless communication',
      journalOrRemarks: 'Patent Application No.: 202341009618 (Patent Published)',
    },
    {
      id: 'eee-pub-36',
      academicYear: 'December 2024',
      authors: 'R. Venugopal, Balaji C., P.R. Muralimohan, Venkatesan Ramakrishnan',
      title: 'Efficient boost integrated high frequency inverter based WPT EV charging system',
      journalOrRemarks: 'IEEE Xplore, DOI: 10.1109/ICPECTS62210.2024.10780011',
    },
    {
      id: 'eee-pub-37',
      academicYear: 'December 2024',
      authors: 'Ms. J. Pavalam',
      title: 'Detection and Estimation of signal processing in MIMO system using sparse Bayesian Learning',
      journalOrRemarks: 'Springer 3rd International Conference on SGCNSP-2024',
    },
    {
      id: 'eee-pub-38',
      academicYear: '2022',
      authors: 'Poornachandra Reddy Madhavaram, Manimozhi M',
      title: 'Smart Energy Management Strategy for Microgrids Powered by Heterogeneous Energy Sources and Electric Vehicles Storage',
      journalOrRemarks: 'Energies (MDPI), DOI: 10.3390/en15207739',
    },
  ],
  laboratories: [
    {
      name: 'Electrical Machines Laboratory',
      description: 'Comprehensive testbeds for open-circuit, short-circuit, and load characterization of DC series/shunt machines, single & 3-phase transformers, synchronous alternators, and 3-phase slip-ring induction motors.',
      equipment: ['DC Shunt & Series Motor-Generator Sets', '3-Phase Synchronous Motor-Alternator Sets', '1-Phase & 3-Phase Transformers (5 kVA)', '3-Phase Squirrel Cage & Slip-Ring Induction Motors', 'Digital Wattmeters & Stroboscopes', 'Resistive, Inductive & Capacitive Load Banks'],
      location: 'Electrical Sciences Block, Ground Floor (Lab 101)',
    },
    {
      name: 'Power Systems & High Voltage Simulation Laboratory',
      description: 'Equipped with licensed simulation suites including MATLAB/Simulink, PSIM, and SKM Power Tools, alongside hardware artificial transmission line benches, relay test kits, and fault simulators.',
      equipment: ['60 High-Performance Core-i7 Graphics Workstations', 'MATLAB/Simulink Campus License', 'PSIM Power Simulation Suites', 'SKM Power Tools for System Analysis', 'Microprocessor-based Over-Current & Differential Relay Test Kits', 'Artificial Long Transmission Line Model'],
      location: 'Power Systems Wing, Room 204',
    },
    {
      name: 'Power Electronics & Drives Laboratory (MODROBS Modernized)',
      description: 'Modernized with ₹7.25 Lakhs AICTE MODROBS grant. Features FPGA/DSP-controlled multilevel inverters, buck-boost converters, cycloconverters, IGBT/MOSFET chopper benches, and PMBLDC motor testbeds.',
      equipment: ['DSP TMS320F28335 Digital Controllers', 'IGBT/MOSFET Based 1-Phase & 3-Phase Inverters', 'DC-DC Buck, Boost & Cuk Converters', 'Speed Control of PMBLDC & Switched Reluctance Motors', '100 MHz Digital Storage Oscilloscopes (DSO)', 'Power Quality Analyzers & Harmonic Filters'],
      location: 'MODROBS Power Electronics Wing, Room 106',
    },
    {
      name: 'Electrical Circuits & Measurements Laboratory',
      description: 'Hands-on validation of network theorems (Thevenin, Norton, Superposition, Reciprocity), AC bridge circuits (Maxwell, Anderson, Schering, Wien), and precision instrumentation calibration.',
      equipment: ['Digital Storage Oscilloscopes (DSOs)', 'Function Generators (0.1 Hz - 20 MHz)', 'Anderson, Maxwell, Schering & Kelvin Bridges', 'LCR Precision Meters', 'Single Phase Energy Meter Test Benches', 'Regulated Dual DC Power Supplies (0-30V, 5A)'],
      location: 'Circuits Wing, Room 102',
    },
    {
      name: 'Control Systems & Automation Laboratory',
      description: 'Study of linear and non-linear control systems, PID controller tuning, AC/DC servomotor position controls, synchro-transmitter pairs, and lead-lag compensation networks.',
      equipment: ['PID Controller Simulator Modules', 'AC & DC Servomotor Position & Speed Control Units', 'Synchro-Transmitter & Receiver Testbeds', 'Lead, Lag & Lead-Lag Compensator Kits', 'Temperature & Pressure Process Control Trainers', 'MATLAB Control System Toolbox Workstations'],
      location: 'Automation Wing, Room 202',
    },
    {
      name: 'Microprocessors, Microcontrollers & Embedded Systems Lab',
      description: 'Programming and hardware interfacing for Intel 8086, 8051, ARM Cortex-M4, and Arduino/ESP32 microcontrollers for smart energy metering and industrial IoT telemetry.',
      equipment: ['Intel 8086 Microprocessor Trainer Kits', 'ARM Cortex Embedded Development Boards', '8051 Microcontroller Interface Kits (Stepper, ADC, DAC)', 'Arduino & Raspberry Pi IoT Smart Energy Hubs', 'Keil μVision & MPLAB IDE Software Suites', 'Logic Analyzers & In-Circuit Emulators'],
      location: 'Embedded Center, Room 305',
    },
    {
      name: 'Solar PV & Renewable Energy Innovation Hub',
      description: 'Dedicated research facility funded under Women Scientist Scheme (₹23 Lakhs grant) and AICTE for solar photovoltaic MPPT tracking, battery energy storage, and EV charging station topologies.',
      equipment: ['Rooftop Solar PV Test Array (10 kW)', 'Maximum Power Point Tracking (MPPT) Controllers', 'Lithium-Ion & Lead-Acid Battery Management System (BMS)', 'Bidirectional Grid-Tie Inverters', 'Solar Irradiance Pyranometers & Data Loggers', 'EV Wireless Power Transfer (WPT) Experimental Bench'],
      location: 'Renewable Energy Innovation Annex, Ground Floor',
    },
  ],
  syllabusRegulations: {
    regulation: 'Academic Regulations R20 & R23 (CBCS)',
    title: 'B.Tech in Electrical & Electronics Engineering - Curriculum Scheme',
    semesters: [
      {
        semesterId: 'sem-1',
        title: 'I B.Tech I Semester (Regulations: R20)',
        totalCredits: 19.5,
        totalMarks: 900,
        courses: [
          { sNo: 1, category: 'BS', courseCode: '20AHS01', courseName: 'Linear Algebra and Calculus', hours: { l: 3, t: 1, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'BS', courseCode: '20AHS04', courseName: 'Engineering Physics', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 3, category: 'HS', courseCode: '20AHS01', courseName: 'Communicative English', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 4, category: 'ES', courseCode: '20ACS01', courseName: 'C Programming and Data Structures', hours: { l: 3, t: 1, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 5, category: 'ES', courseCode: '20AEE01', courseName: 'Electrical Circuits - I', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 6, category: 'BS', courseCode: '20AHS07', courseName: 'Engineering Physics Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'HS', courseCode: '20AHS05', courseName: 'Communicative English Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'ES', courseCode: '20ACS03', courseName: 'C Programming & Data Structures Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 9, category: 'MC', courseCode: '20AMB01', courseName: 'Design Thinking & Innovation', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 100, see: 0, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-2',
        title: 'I B.Tech II Semester (Regulations: R20)',
        totalCredits: 19.5,
        totalMarks: 900,
        courses: [
          { sNo: 1, category: 'BS', courseCode: '20AHS02', courseName: 'Differential Equations and Vector Calculus', hours: { l: 3, t: 1, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'BS', courseCode: '20AHS03', courseName: 'Engineering Chemistry', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 3, category: 'ES', courseCode: '20AEE02', courseName: 'Electrical Circuits - II', hours: { l: 3, t: 1, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 4, category: 'ES', courseCode: '20ACS04', courseName: 'Problem Solving and Python Programming', hours: { l: 3, t: 1, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 5, category: 'ES', courseCode: '20AME01', courseName: 'Computer Aided Engineering Drawing', hours: { l: 1, t: 0, p: 4 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 6, category: 'BS', courseCode: '20AHS06', courseName: 'Engineering Chemistry Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'ES', courseCode: '20AEE03', courseName: 'Electrical Circuits & Simulation Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'ES', courseCode: '20ACS05', courseName: 'Python Programming Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 9, category: 'MC', courseCode: '20AHS09', courseName: 'Environmental Science', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 100, see: 0, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-3',
        title: 'II B.Tech I Semester (Regulations: R20)',
        totalCredits: 21.5,
        totalMarks: 900,
        courses: [
          { sNo: 1, category: 'BS', courseCode: '20AHS10', courseName: 'Complex Variables & Statistical Methods', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'PC', courseCode: '20AEE04', courseName: 'DC Machines and Transformers', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 3, category: 'PC', courseCode: '20AEE05', courseName: 'Electromagnetic Field Theory', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 4, category: 'PC', courseCode: '20AEC01', courseName: 'Electronic Devices and Analog Circuits', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 5, category: 'PC', courseCode: '20AEE06', courseName: 'Power Systems - I (Generation & Transmission)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 6, category: 'PC', courseCode: '20AEE07', courseName: 'DC Machines & Transformers Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'PC', courseCode: '20AEC03', courseName: 'Electronic Devices & Circuits Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'SC', courseCode: '20AEE08', courseName: 'Electrical Wiring & PCB Design Practice', hours: { l: 1, t: 0, p: 2 }, credits: 2.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 9, category: 'MC', courseCode: '20AMB02', courseName: 'Universal Human Values - I', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 100, see: 0, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-4',
        title: 'II B.Tech II Semester (Regulations: R20)',
        totalCredits: 21.5,
        totalMarks: 900,
        courses: [
          { sNo: 1, category: 'PC', courseCode: '20AEE09', courseName: 'AC Machines & Synchronous Alternators', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'PC', courseCode: '20AEE10', courseName: 'Control Systems Engineering', hours: { l: 3, t: 1, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 3, category: 'PC', courseCode: '20AEE11', courseName: 'Power Systems - II (Analysis & Stability)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 4, category: 'PC', courseCode: '20AEC04', courseName: 'Digital Logic Design & Microprocessors', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 5, category: 'HS', courseCode: '20AMB03', courseName: 'Managerial Economics and Financial Analysis', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 6, category: 'PC', courseCode: '20AEE12', courseName: 'AC Machines & Drives Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'PC', courseCode: '20AEE13', courseName: 'Control Systems & Simulation Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'SC', courseCode: '20AEE14', courseName: 'MATLAB for Electrical Engineers (Skill Course)', hours: { l: 1, t: 0, p: 2 }, credits: 2.0, marks: { cia: 40, see: 60, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-5',
        title: 'III B.Tech I Semester (Regulations: R20)',
        totalCredits: 21.5,
        totalMarks: 900,
        courses: [
          { sNo: 1, category: 'PC', courseCode: '20AEE15', courseName: 'Power Electronics & Converter Topologies', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'PC', courseCode: '20AEE16', courseName: 'Power System Operation and Control', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 3, category: 'PE-1', courseCode: '20AEE17', courseName: 'Renewable Energy Sources & Grid Integration', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 4, category: 'OE-1', courseCode: '20AOE01', courseName: 'Open Elective - I (Interdisciplinary)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 5, category: 'HS', courseCode: '20AMB04', courseName: 'Universal Human Values - II', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 6, category: 'PC', courseCode: '20AEE18', courseName: 'Power Electronics & Converter Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'PC', courseCode: '20AEE19', courseName: 'Power Systems Simulation Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'SC', courseCode: '20AEE20', courseName: 'PSIM Power Electronics Simulation Practice', hours: { l: 1, t: 0, p: 2 }, credits: 2.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 9, category: 'IN', courseCode: '20AIN01', courseName: 'Industrial / Research Internship (Evaluation)', hours: { l: 0, t: 0, p: 0 }, credits: 1.5, marks: { cia: 100, see: 0, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-6',
        title: 'III B.Tech II Semester (Regulations: R20)',
        totalCredits: 21.5,
        totalMarks: 900,
        courses: [
          { sNo: 1, category: 'PC', courseCode: '20AEE21', courseName: 'Microprocessors, Microcontrollers & Interfacing', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'PC', courseCode: '20AEE22', courseName: 'Power Semiconductor Drives', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 3, category: 'PE-2', courseCode: '20AEE23', courseName: 'Electric & Hybrid Vehicles', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 4, category: 'PE-3', courseCode: '20AEE24', courseName: 'Power System Protection & Switchgear', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 5, category: 'OE-2', courseCode: '20AOE02', courseName: 'Open Elective - II', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 6, category: 'PC', courseCode: '20AEE25', courseName: 'Microprocessors & Microcontrollers Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'PC', courseCode: '20AEE26', courseName: 'Power Semiconductor Drives Lab', hours: { l: 0, t: 0, p: 3 }, credits: 1.5, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 8, category: 'SC', courseCode: '20AEE27', courseName: 'IoT Applications in Electrical Engineering', hours: { l: 1, t: 0, p: 2 }, credits: 2.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 9, category: 'MC', courseCode: '20AHS12', courseName: 'Constitution of India', hours: { l: 2, t: 0, p: 0 }, credits: 0.0, marks: { cia: 100, see: 0, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-7',
        title: 'IV B.Tech I Semester (Regulations: R20)',
        totalCredits: 23.0,
        totalMarks: 900,
        courses: [
          { sNo: 1, category: 'PE-4', courseCode: '20AEE28', courseName: 'Smart Grid Technologies & IoT Energy Systems', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'PE-5', courseCode: '20AEE29', courseName: 'HVDC & FACTS Transmission Systems', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 3, category: 'OE-3', courseCode: '20AOE03', courseName: 'Open Elective - III', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 4, category: 'OE-4', courseCode: '20AOE04', courseName: 'Open Elective - IV (Humanities/Management)', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 5, category: 'HS', courseCode: '20AMB05', courseName: 'Professional Ethics and Human Values', hours: { l: 3, t: 0, p: 0 }, credits: 3.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 6, category: 'SC', courseCode: '20AEE30', courseName: 'SKM Power Tools & Industrial Power Analysis', hours: { l: 1, t: 0, p: 2 }, credits: 2.0, marks: { cia: 40, see: 60, total: 100 } },
          { sNo: 7, category: 'PR', courseCode: '20APR01', courseName: 'Capstone Project Phase - I & Industry Internship', hours: { l: 0, t: 0, p: 6 }, credits: 3.0, marks: { cia: 100, see: 0, total: 100 } },
        ],
      },
      {
        semesterId: 'sem-8',
        title: 'IV B.Tech II Semester (Regulations: R20)',
        totalCredits: 12.0,
        totalMarks: 300,
        courses: [
          { sNo: 1, category: 'PR', courseCode: '20APR02', courseName: 'Full Semester Industry Project / Internship Phase - II', hours: { l: 0, t: 0, p: 24 }, credits: 12.0, marks: { cia: 100, see: 200, total: 300 } },
        ],
      },
    ],
    honorsPools: [
      {
        pool: 'Honors Pool 1: Advanced Power Electronics & Multilevel Inverters',
        semester: 'Sem 4 to 8',
        courses: [
          { sNo: 1, category: 'HN', courseCode: '20AEEH01', courseName: 'Switched Capacitor Multilevel Inverter Topologies', hours: { l: 3, t: 1, p: 0 }, credits: 4.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'HN', courseCode: '20AEEH02', courseName: 'Digital Signal Processors for Power Converters', hours: { l: 3, t: 1, p: 0 }, credits: 4.0, marks: { cia: 30, see: 70, total: 100 } },
        ],
      },
      {
        pool: 'Honors Pool 2: Electric Vehicles & Wireless Power Charging',
        semester: 'Sem 5 to 8',
        courses: [
          { sNo: 1, category: 'HN', courseCode: '20AEEH03', courseName: 'Wireless Power Transfer for EV Fast Charging', hours: { l: 3, t: 1, p: 0 }, credits: 4.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'HN', courseCode: '20AEEH04', courseName: 'Battery Management Systems & State of Health Estimation', hours: { l: 3, t: 1, p: 0 }, credits: 4.0, marks: { cia: 30, see: 70, total: 100 } },
        ],
      },
    ],
    minorsTracks: [
      {
        track: 'Track 1',
        title: 'Renewable Energy & Solar Power Systems',
        courses: [
          { sNo: 1, category: 'MN', courseCode: '20AEEM01', courseName: 'Solar Photovoltaic Energy Conversion', hours: { l: 3, t: 1, p: 0 }, credits: 4.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'MN', courseCode: '20AEEM02', courseName: 'Smart Microgrids & Distributed Generation', hours: { l: 3, t: 1, p: 0 }, credits: 4.0, marks: { cia: 30, see: 70, total: 100 } },
        ],
      },
      {
        track: 'Track 2',
        title: 'Electric Vehicles & Powertrain Systems',
        courses: [
          { sNo: 1, category: 'MN', courseCode: '20AEEM03', courseName: 'Fundamentals of Electric Vehicle Engineering', hours: { l: 3, t: 1, p: 0 }, credits: 4.0, marks: { cia: 30, see: 70, total: 100 } },
          { sNo: 2, category: 'MN', courseCode: '20AEEM04', courseName: 'EV Battery Technologies & Charging Stations', hours: { l: 3, t: 1, p: 0 }, credits: 4.0, marks: { cia: 30, see: 70, total: 100 } },
        ],
      },
    ],
  },
  syllabusDownloads: [
    {
      title: 'B.Tech EEE R23 Detailed Regulations & Syllabus (2025–26)',
      regulation: 'Autonomous R23 Scheme',
      size: '29.2 MB',
      fileUrl: '/syllabus/eee-b-tech-r23-detailed-2025 EEE DEPARTMENT.pdf',
      downloadFileName: 'BTech_EEE_R23_Detailed_Syllabus_2025_26.pdf',
      level: 'B.Tech Under Graduate',
      badge: 'Complete Official PDF (29.2 MB)',
      description: 'Comprehensive 2025–26 academic regulations, complete 8-semester course structure, detailed syllabus for all theory & lab courses, textbook references, and grading scheme approved by the Board of Studies.',
    },
    {
      title: 'B.Tech EEE R20 Academic Regulations & Course Structure',
      regulation: 'Autonomous R20 CBCS',
      size: '5.1 MB',
      fileUrl: '/syllabus/b tech R20-EEE DEPARTMENT.pdf',
      downloadFileName: 'BTech_EEE_R20_Academic_Regulations_Course_Structure.pdf',
      level: 'B.Tech Under Graduate',
      badge: 'Autonomous R20 (5.1 MB)',
      description: 'Complete 4-Year B.Tech Electrical & Electronics Engineering CBCS curriculum, honors degree pools, minor tracks, and course outcome (CO-PO) articulation matrix.',
    },
    {
      title: 'B.Tech EEE R17 Curriculum & Course Structure',
      regulation: 'Autonomous R17 Scheme',
      size: '3.8 MB',
      fileUrl: '/syllabus/b tech R17-EEE EEE DEPARTMENT.pdf',
      downloadFileName: 'BTech_EEE_R17_Curriculum_Course_Structure.pdf',
      level: 'B.Tech Under Graduate',
      badge: 'R17 Archive (3.8 MB)',
      description: 'Official autonomous curriculum scheme for B.Tech EEE R17 batch including core electrical machinery, power engineering, and elective subjects.',
    },
    {
      title: 'M.Tech Power Electronics & Electrical Drives (PE & ED) Final Syllabus',
      regulation: 'Post Graduate Autonomous',
      size: '1.6 MB',
      fileUrl: '/syllabus/M.Tech (PE & ED) FINAL EEE DEPARTMENT.pdf',
      downloadFileName: 'MTech_Power_Electronics_Electrical_Drives_Final_Syllabus.pdf',
      level: 'M.Tech Post Graduate',
      badge: 'PG Specialization (1.6 MB)',
      description: 'Master of Technology (PE & ED) full syllabus covering advanced power semiconductor devices, modern electrical motor drives, switched-mode power supplies, and dissertation work.',
    },
    {
      title: 'M.Tech EEE R20 Course Curriculum & Syllabi',
      regulation: 'M.Tech R20 CBCS',
      size: '620 KB',
      fileUrl: '/syllabus/Mtech-R20-EEE DEPARTMENT.pdf',
      downloadFileName: 'MTech_EEE_R20_Curriculum_Syllabus.pdf',
      level: 'M.Tech Post Graduate',
      badge: 'M.Tech R20 (620 KB)',
      description: 'M.Tech Electrical & Electronics Engineering R20 regulation curriculum, program electives, research methodology, and audit courses.',
    },
    {
      title: 'M.Tech EEE R15 Regulation Syllabus',
      regulation: 'M.Tech R15 Scheme',
      size: '910 KB',
      fileUrl: '/syllabus/mtechR15-EEE DEPARTMENT.pdf',
      downloadFileName: 'MTech_EEE_R15_Regulation_Syllabus.pdf',
      level: 'M.Tech Post Graduate',
      badge: 'M.Tech R15 Archive (910 KB)',
      description: 'Complete academic curriculum and syllabus book for M.Tech EEE R15 autonomous regulations.',
    },
  ],
  association: {
    name: 'ELITE (Electrical Leaders & Innovators Technical Enterprise)',
    acronym: 'ELITE',
    tagline: 'Energizing Innovation, Empowering Sustainable Power',
    description: 'The Department of Electrical and Electronics Engineering actively runs the ELITE student association. ELITE serves as a vibrant platform for organizing national technical symposiums, hackathons, guest lectures, electrical circuit design competitions, robotic vehicle design, and industrial visit expeditions.',
    activities: [
      'Annual National Level Technical Symposium: "ELECTROFEST & JOULE"',
      'Solar Powered EV Model Design & Circuit Debugging Contests',
      'Hands-on Workshops on MATLAB, PSIM, and Embedded Microcontrollers',
      'Technical Paper & Poster Presentations on Renewable Energy Systems',
      'Industrial Study Tours to APTRANSCO Sub-stations, Srisailam Hydro & Rayalaseema Thermal Plants',
      'Community Social Responsibility: Village Solar Awareness & Energy Conservation Drives',
    ],
  },
  rnd: {
    patentsFiled: 18,
    consultancyAreas: [
      'Power Quality Audit and Harmonic Analysis for Industrial Plants',
      'Solar Photovoltaic Rooftop Plant Design and Grid Synchronization',
      'Electric Vehicle Battery Management System (BMS) Firmware Design',
      'Energy Efficiency Optimization and Smart IoT Metering Telemetry',
      'Multilevel Inverter Topologies for Renewable Distributed Generation',
    ],
    thrustAreas: [
      'Multilevel Inverters & Reduced Device Count Topologies',
      'Renewable Energy Integration & Smart Grid Stability',
      'Wireless Power Transfer & Electric Vehicle Charging Systems',
      'Artificial Intelligence in Power System Fault Detection & Protection',
      'IoT-Enabled Energy Analytics & Battery Life-Cycle Sustainability',
    ],
    mous: [
      'Andhra Pradesh Power Generation Corporation (APGENCO)',
      'Transmission Corporation of Andhra Pradesh (APTRANSCO)',
      'Siemens India Centre of Excellence',
      'Toshiba Transmission & Distribution Systems India',
      'Schneider Electric India Innovation Hub',
      'National Institute of Electronics & Information Technology (NIELIT)',
    ],
  },
  studentCorner: {
    clubs: [
      'ELITE Student Technical Association',
      'Solar & Renewable Energy Innovation Club',
      'Electric Vehicle & Robotics Makers Hub',
      'IEEE Student Branch (Power & Energy Society)',
      'Energy Conservation & Green Campus Volunteers',
    ],
    achievements: [
      '1st Runner-Up at Intellecthon 2025 National Level Hackathon (₹30,000 Cash Prize)',
      'Smart India Hackathon (SIH) Grand Finale Finalists for Autonomous Microgrid Management',
      'Best Innovation Award at National Inter-University Renewable Tech Expo 2024',
      '1st Prize in Paper Presentation on Multilevel Inverter Topology at National Symposium',
      '100% placement for eligible students across core and tech giants',
    ],
    internships: [
      'APTRANSCO 220kV / 400kV Substation Internship',
      'Rayalaseema Thermal Power Project (RTPP) Summer Traineeship',
      'Siemens India Industrial Drives Internship',
      'Schneider Electric Power Systems Training',
      'National Thermal Power Corporation (NTPC) Apprenticeship',
    ],
  },
  placement: {
    highlights: [
      'Consistent 95%+ core and IT placement record for eligible EEE students',
      'Highest CTC of ₹16.0 LPA and average core package of ₹5.8 LPA',
      'Exclusive recruitment drives with top power, energy, electronics, and software MNCs',
      'Comprehensive pre-placement training in MATLAB, PSIM, C/Python, and aptitude',
    ],
    topRecruiters: [
      'APTRANSCO / APGENCO / APSPDCL',
      'Siemens India',
      'Toshiba Transmission & Distribution',
      'Schneider Electric',
      'ABB India',
      'Larsen & Toubro (L&T Power & Heavy Civil)',
      'Tata Power & Tata Technologies',
      'Infosys Technologies',
      'Wipro Limited',
      'Cognizant Technology Solutions',
      'TCS (Tata Consultancy Services)',
      'Accenture India',
    ],
    roles: [
      'Graduate Engineer Trainee (GET) - Power Systems',
      'Electrical Design & Estimation Engineer',
      'Power Electronics & Drives Development Engineer',
      'Substation Automation & SCADA Control Engineer',
      'Solar PV Installation & Commissioning Specialist',
      'Embedded Software & IoT Firmware Developer',
      'Quality Assurance & Electrical Safety Inspector',
    ],
  },
  events: [
    {
      title: 'ELECTROFEST 2025: National Level EEE Technical Symposium',
      date: 'March 20-21, 2025',
      type: 'National Symposium',
      description: 'Over 600+ students from 45+ colleges competing in Circuit Debugging, Solar Model Making, Technical Paper Presentations, and Power Quiz.',
    },
    {
      title: '1-Week Intensive Workshop on Electric Vehicle Powertrain & PSIM Simulation',
      date: 'February 12-18, 2025',
      type: 'Skill Workshop',
      description: 'Hands-on training on EV motor drives, bidirectional DC-DC converters, and battery charging topologies with certified industry experts.',
    },
    {
      title: 'National Conference on Recent Advances in Smart Grids and Green Energy (NC-RASGGE)',
      date: 'January 28, 2025',
      type: 'National Conference',
      description: 'Keynotes by senior scientists from CPRI and IIT Madras on renewable grid integration and high-voltage DC transmission.',
    },
  ],
  contact: {
    department: 'Department of Electrical & Electronics Engineering',
    hodName: 'Dr. Y.N.VIJAYA KUMAR, HOD & Professor',
    officeLocation: 'Electrical Sciences Block, Room 101, SVCET / RVS University Campus, Chittoor',
    email: 'hodeee@svcetedu.org',
    phone: '+91 94400 45288',
    altPhone: '+91 85722 46298',
    officeHours: 'Monday - Saturday: 9:00 AM - 5:00 PM',
  },
};

export { MECHANICAL_DEPARTMENT_DATA } from './mechanicalData';
import { MECHANICAL_DEPARTMENT_DATA } from './mechanicalData';
export { ECE_DEPARTMENT_DATA } from './eceData';
import { ECE_DEPARTMENT_DATA } from './eceData';
export { CSE_DEPARTMENT_DATA } from './cseData';
import { CSE_DEPARTMENT_DATA } from './cseData';
export { AI_DEPARTMENT_DATA } from './aiData';
import { AI_DEPARTMENT_DATA } from './aiData';
export { CSE_AIML_DEPARTMENT_DATA } from './csmData';
import { CSE_AIML_DEPARTMENT_DATA } from './csmData';
export { IT_DEPARTMENT_DATA } from './itData';
import { IT_DEPARTMENT_DATA } from './itData';
export { CSE_IOT_DEPARTMENT_DATA } from './iotData';
import { CSE_IOT_DEPARTMENT_DATA } from './iotData';
export { CSE_CYBER_DEPARTMENT_DATA } from './cyberData';
import { CSE_CYBER_DEPARTMENT_DATA } from './cyberData';
export { CSE_DATA_SCIENCE_DEPARTMENT_DATA } from './dsData';
import { CSE_DATA_SCIENCE_DEPARTMENT_DATA } from './dsData';
export { MBA_DEPARTMENT_DATA } from './mbaData';
import { MBA_DEPARTMENT_DATA } from './mbaData';
export { BCA_DEPARTMENT_DATA } from './bcaData';
import { BCA_DEPARTMENT_DATA } from './bcaData';
export { MCA_DEPARTMENT_DATA } from './mcaData';
import { MCA_DEPARTMENT_DATA } from './mcaData';

// Generic placeholder generator for departments when specific data is pending
export const getDepartmentData = (deptId: string): DepartmentDetailData => {
  if (deptId === 'civil' || deptId === 'ce' || deptId === 'soet-civil') {
    return CIVIL_DEPARTMENT_DATA;
  }

  if (deptId === 'eee' || deptId === 'electrical' || deptId === 'soet-eee' || deptId === 'deee') {
    return EEE_DEPARTMENT_DATA;
  }

  if (deptId === 'mech' || deptId === 'me' || deptId === 'mechanical' || deptId === 'soet-mech' || deptId === 'dme') {
    return MECHANICAL_DEPARTMENT_DATA;
  }

  if (deptId === 'ece' || deptId === 'electronics' || deptId === 'soet-ece' || deptId === 'dece' || deptId === 'ebm' || deptId === 'soet-ebm') {
    return ECE_DEPARTMENT_DATA;
  }

  if (deptId === 'csm' || deptId === 'cse-aiml' || deptId === 'aiml' || deptId === 'cse-ai-ml' || deptId === 'soet-csm' || deptId === 'csm-dept' || deptId === 'cse-ml') {
    return CSE_AIML_DEPARTMENT_DATA;
  }

  if (deptId === 'ai' || deptId === 'soet-ai' || deptId === 'artificial-intelligence' || deptId === 'ai-dept' || deptId === 'cse-ai') {
    return AI_DEPARTMENT_DATA;
  }

  if (deptId === 'it' || deptId === 'infotech' || deptId === 'information-technology' || deptId === 'scis-it' || deptId === 'soet-it' || deptId === 'dit') {
    return IT_DEPARTMENT_DATA;
  }

  if (deptId === 'iot' || deptId === 'cse-iot' || deptId === 'cso' || deptId === 'soet-iot' || deptId === 'scis-iot' || deptId === 'dept-iot' || deptId === 'cso-dept') {
    return CSE_IOT_DEPARTMENT_DATA;
  }

  if (deptId === 'csc' || deptId === 'cyber' || deptId === 'cyber-security' || deptId === 'cse-cyber' || deptId === 'cs-cyber' || deptId === 'scis-cyber' || deptId === 'dept-csc' || deptId === 'csc-dept') {
    return CSE_CYBER_DEPARTMENT_DATA;
  }

  if (deptId === 'ds' || deptId === 'csd' || deptId === 'data-science' || deptId === 'cse-ds' || deptId === 'said-ds' || deptId === 'soet-ds' || deptId === 'dept-ds' || deptId === 'dept-csd' || deptId === 'csd-dept' || deptId === 'ds-dept') {
    return CSE_DATA_SCIENCE_DEPARTMENT_DATA;
  }

  if (deptId === 'mba' || deptId === 'management' || deptId === 'soms-mba' || deptId === 'dept-mba' || deptId === 'mba-dept' || deptId === 'bba' || deptId === 'soms-bba' || deptId === 'dept-bba') {
    return MBA_DEPARTMENT_DATA;
  }

  if (deptId === 'bca' || deptId === 'scis-bca' || deptId === 'dept-bca' || deptId === 'bca-dept' || deptId === 'bca-department') {
    return BCA_DEPARTMENT_DATA;
  }

  if (deptId === 'mca' || deptId === 'scis-mca' || deptId === 'dept-mca' || deptId === 'mca-dept' || deptId === 'computer-applications' || deptId === 'mca-department') {
    return MCA_DEPARTMENT_DATA;
  }

  if (deptId === 'cse' || deptId === 'computer' || deptId === 'scse' || deptId === 'soet-cse' || deptId === 'dcse') {
    return CSE_DEPARTMENT_DATA;
  }

  // Generate generic template for other departments until user provides full data
  const titles: Record<string, string> = {
    cse: 'Department of Computer Science and Engineering',
    ece: 'Department of Electronics and Communication Engineering',
    eee: 'Department of Electrical and Electronics Engineering',
    mech: 'Department of Mechanical Engineering',
    ai: 'Department of Artificial Intelligence & Machine Learning',
    ds: 'Department of Data Science & Big Data Analytics',
    it: 'Department of Information Technology',
    mba: 'Department of Management Studies (MBA)',
    mca: 'Department of Computer Applications (MCA)',
  };

  const name = titles[deptId] || `Department of ${deptId.toUpperCase()} Engineering`;

  return {
    ...CIVIL_DEPARTMENT_DATA,
    id: deptId,
    name: name,
    shortName: deptId.toUpperCase(),
    degreeName: `B.Tech / M.Tech in ${deptId.toUpperCase()}`,
    hod: {
      name: 'Department Head',
      designation: 'HOD & Professor',
      qualification: 'Ph.D',
      experience: 15,
      email: `hod${deptId}@svcetedu.org`,
      phone: '+91 85722 46298',
      room: `${deptId.toUpperCase()} Block, Room 201`,
      message: `Welcome to the ${name}. Data for this department is being updated with the latest academic curriculum, faculty directory, and research labs.`,
    },
    profile: {
      ...CIVIL_DEPARTMENT_DATA.profile,
      nbaAccreditation: 'Accredited by NBA under Tier-I',
      overview: `The ${name} offers state-of-the-art academic curriculum, industry-oriented laboratory facilities, and world-class faculty. Detailed data for this department will be populated soon.`,
    },
  };
};
