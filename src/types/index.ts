export interface NavSubItem {
  name: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface MegaMenuColumn {
  title: string;
  items: NavSubItem[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  megaMenu?: {
    featuredCard?: {
      title: string;
      description: string;
      image: string;
      linkText: string;
      href: string;
    };
    columns: MegaMenuColumn[];
  };
  simpleDropdown?: NavSubItem[];
}

export interface CourseItem {
  id: string;
  name: string;
  code?: string;
  duration: string;
  seats?: string | number;
  eligibility?: string;
  description: string;
  highlights: string[];
  affiliations?: string;
  syllabus?: string;
  specializations?: string[];
  image: string;
  iconName?: string;
}

export interface DegreeCategory {
  id: string;
  title: string;
  subtitle: string;
  levelBadge: string;
  countLabel: string;
  iconName: string;
  image: string;
  description: string;
  courses: CourseItem[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  category: 'Computing & AI' | 'Core Engineering' | 'Management & Applications' | 'Sciences & Humanities';
  degreeLevel: string;
  description: string;
  highlights: string[];
  iconName: string;
  image: string;
  intake?: number;
}

export interface StatItem {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  description: string;
}

export interface Program {
  id: string;
  title: string;
  level: 'Undergraduate' | 'Postgraduate' | 'Doctoral';
  duration: string;
  degree: string;
  tagline: string;
  category: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  snippet: string;
  isUrgent?: boolean;
  link: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: {
    day: string;
    month: string;
  };
  time: string;
  location: string;
  category: string;
  link: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  designation: string;
  batch: string;
  companyOrRole: string;
  image: string;
}
