import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/hero/HeroSection';
import { WhyRvsSection } from './components/home/WhyRvsSection';
import { StatisticsSection } from './components/home/StatisticsSection';
import { AcademicSchoolsSection } from './components/home/AcademicSchoolsSection';
import { CampusLifeSection } from './components/home/CampusLifeSection';
import { PlacementsSection } from './components/home/PlacementsSection';
import { StudentAchievementsSection } from './components/home/StudentAchievementsSection';
import { CallToActionSection } from './components/home/CallToActionSection';
import { Footer } from './components/layout/Footer';
import { CourseDetailPage } from './components/pages/CourseDetailPage';
import { AboutGovernancePage, AboutPageType } from './components/pages/AboutGovernancePage';
import { CampusLifeDetailPage, CampusLifeTab } from './components/pages/CampusLifeDetailPage';
import { ExamPortalPage, ExamPortalTab } from './components/pages/ExamPortalPage';
import { DepartmentDetailPage } from './components/pages/DepartmentDetailPage';
import { AcademicsDetailPage, AcademicTab } from './components/pages/AcademicsDetailPage';
import { InternationalRelationsPage, IRTab } from './components/pages/InternationalRelationsPage';
import { ResearchDetailPage, ResearchTab } from './components/pages/ResearchDetailPage';
import { AdmissionsModal } from './components/modals/AdmissionsModal';
import { WelcomePreloader } from './components/ui/WelcomePreloader';
import { ALL_DEGREE_CATEGORIES } from './data/coursesCatalog';

export const App: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [departmentId, setDepartmentId] = useState<string | null>(null);
  const [academicTab, setAcademicTab] = useState<AcademicTab | null>(null);
  const [irTab, setIrTab] = useState<IRTab | null>(null);
  const [researchTab, setResearchTab] = useState<ResearchTab | null>(null);
  const [aboutTab, setAboutTab] = useState<AboutPageType | null>(null);
  const [campusLifeTab, setCampusLifeTab] = useState<CampusLifeTab | null>(null);
  const [examPortalTab, setExamPortalTab] = useState<ExamPortalTab | null>(null);
  const [isAdmissionsModalOpen, setIsAdmissionsModalOpen] = useState(false);

  // Sync with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      // Master reset helper to ensure no conflicting page views remain active
      const resetAllViews = () => {
        setSelectedCourseId(null);
        setDepartmentId(null);
        setAcademicTab(null);
        setIrTab(null);
        setResearchTab(null);
        setAboutTab(null);
        setCampusLifeTab(null);
        setExamPortalTab(null);
      };

      // 0. Check Directorate of Research hashes
      const researchTabs: ResearchTab[] = [
        'overview', 'mission', 'recent-projects', 'academic-research', 'funded-research', 'thrust-area'
      ];
      if (
        hash === '#research' || 
        hash === '#directorate-of-research' || 
        hash === '#research-overview' || 
        hash.startsWith('#research-')
      ) {
        let tab: ResearchTab = 'overview';
        const cleanTab = hash.replace('#research-', '').replace('#', '') as ResearchTab;
        if (researchTabs.includes(cleanTab)) {
          tab = cleanTab;
        }
        resetAllViews();
        setResearchTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 0.1 Check International Relations hashes
      if (
        hash === '#international-relations' ||
        hash === '#international' ||
        hash === '#ir' ||
        hash.startsWith('#international-relations-') ||
        hash.startsWith('#international-admission') ||
        hash.startsWith('#ir-')
      ) {
        let tab: IRTab = 'overview';
        if (hash.includes('admissions') || hash.includes('how-to-apply') || hash.includes('admission')) tab = 'admissions';
        else if (hash.includes('btech') || hash.includes('ug')) tab = 'btech-eligibility';
        else if (hash.includes('pg') || hash.includes('mtech') || hash.includes('mba') || hash.includes('mca')) tab = 'pg-eligibility';
        else if (hash.includes('partner') || hash.includes('mou')) tab = 'partner-universities';
        else if (hash.includes('testimonial')) tab = 'testimonials';
        else if (hash.includes('contact')) tab = 'contact';

        resetAllViews();
        setIrTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 1. Check Academics hashes & compliance shortcuts
      const academicTabs: AcademicTab[] = [
        'mandatory-disclosure', 'board-of-studies', 'academic-calendars', 'naac-ssr',
        'aqar', 'about-library', 'librarians-desk',
        'library-rules', 'library-resources', 'library-rfid', 'library-gallery',
        'library-publications', 'library-services'
      ];
      
      if (hash === '#academics' || hash === '#academic') {
        resetAllViews();
        setAcademicTab('mandatory-disclosure');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (hash.startsWith('#academic-')) {
        const cleanTab = hash.replace('#academic-', '') as AcademicTab;
        if (academicTabs.includes(cleanTab)) {
          resetAllViews();
          setAcademicTab(cleanTab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // Standalone Academics compliance & library shortcuts
      const complianceMap: Record<string, AcademicTab> = {
        '#naac': 'naac-ssr',
        '#naac-ssr': 'naac-ssr',
        '#aqar': 'aqar',
        '#mandatory-disclosure': 'mandatory-disclosure',
        '#board-of-studies': 'board-of-studies',
        '#academic-calendars': 'academic-calendars',
        '#about-library': 'about-library',
        '#librarians-desk': 'librarians-desk',
        '#library-rules': 'library-rules',
        '#library-resources': 'library-resources',
        '#library-rfid': 'library-rfid',
        '#library-gallery': 'library-gallery',
        '#library-publications': 'library-publications',
        '#library-services': 'library-services',
      };
      if (complianceMap[hash]) {
        resetAllViews();
        setAcademicTab(complianceMap[hash]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 2. Check About & Sub-Sections hashes
      if (hash === '#about' || hash === '#about-us' || hash === '#about-overview' || hash === '#overview') {
        resetAllViews();
        setAboutTab('overview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#about-leadership' || hash === '#leadership') {
        resetAllViews();
        setAboutTab('leadership');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#about-chancellor' || hash === '#chancellor' || hash === '#about-chairman' || hash === '#chairman') {
        resetAllViews();
        setAboutTab('chancellor');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#about-pro-chancellor' || hash === '#pro-chancellor' || hash === '#about-vice-chairman' || hash === '#vice-chairman' || hash === '#group-institutions' || hash === '#23-institutions') {
        resetAllViews();
        setAboutTab('pro-chancellor');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#about-vice-chancellor' || hash === '#vice-chancellor') {
        resetAllViews();
        setAboutTab('vice-chancellor');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#about-principal' || hash === '#principal') {
        resetAllViews();
        setAboutTab('principal');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      // Governance side menu hashes
      if (
        hash === '#about-governance' || hash === '#governance' || 
        hash === '#sponsoring-body' || hash === '#about-sponsoring-body' ||
        hash === '#governing-body' || hash === '#about-governing-body' || hash === '#committee-governing-body' ||
        hash === '#board-of-management' || hash === '#about-board-of-management' ||
        hash === '#academic-council' || hash === '#about-academic-council' || hash === '#committee-academic-council' ||
        hash === '#finance-committee' || hash === '#about-finance-committee' || hash === '#finance' || hash === '#committee-finance' ||
        hash === '#planning-monitoring' || hash === '#about-planning-monitoring' ||
        hash === '#research-innovation' || hash === '#about-research-innovation' ||
        hash === '#board-of-examination' || hash === '#about-board-of-examination' ||
        hash === '#board-of-studies' || hash === '#about-board-of-studies'
      ) {
        resetAllViews();
        const govSub = hash.replace('#about-', '').replace('#', '') as any;
        setAboutTab(govSub === 'governance' || govSub === 'committee-governing-body' ? 'governing-body' : govSub === 'committee-academic-council' ? 'academic-council' : govSub === 'committee-finance' || govSub === 'finance' ? 'finance-committee' : govSub);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#about-administration' || hash === '#administration' || hash === '#admin-chart' || hash === '#organisation-chart' || hash === '#organization-chart') {
        resetAllViews();
        setAboutTab('administration');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#about-ranking-accreditation' || hash === '#ranking-accreditation' || hash === '#ranking' || hash === '#rankings' || hash === '#accreditation') {
        resetAllViews();
        setAboutTab('ranking-accreditation');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      // IQAC side menu hashes
      if (
        hash === '#about-iqac' || hash === '#iqac' || hash === '#iqac-cell' ||
        hash === '#members-committee' || hash === '#about-members-committee' ||
        hash === '#meeting-minutes' || hash === '#about-meeting-minutes' ||
        hash === '#annual-report' || hash === '#about-annual-report' ||
        hash === '#naac-certificate' || hash === '#about-naac-certificate' ||
        hash === '#aaa' || hash === '#about-aaa' ||
        hash === '#idp' || hash === '#about-idp' ||
        hash === '#useful-links' || hash === '#about-useful-links' ||
        hash === '#downloads' || hash === '#about-downloads'
      ) {
        resetAllViews();
        const iqacSub = hash.replace('#about-', '').replace('#', '') as any;
        setAboutTab(iqacSub === 'iqac' || iqacSub === 'iqac-cell' ? 'about-iqac' : iqacSub);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#contact-us' || hash === '#contact-campus') {
        resetAllViews();
        setAboutTab('contact-us');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 3. Check Exam Portal hashes
      if (hash === '#exam-portal' || hash === '#examinations' || hash === '#exam-results') {
        resetAllViews();
        setExamPortalTab('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#exam-online-results' || hash === '#online-results') {
        resetAllViews();
        setExamPortalTab('online-results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#exam-schedules' || hash === '#schedules') {
        resetAllViews();
        setExamPortalTab('schedules');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (hash === '#exam-notifications' || hash === '#notifications') {
        resetAllViews();
        setExamPortalTab('notifications');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 4. Check Campus Life hashes
      const campusLifeTabs: CampusLifeTab[] = [
        'hostels', 'sports', 'health', 'safety', 
        'tech-clubs', 'cultural-fest', 'nss', 'green-campus', 'gallery'
      ];
      if (hash === '#gallery' || hash === '#campus-gallery' || hash === '#photo-gallery' || hash === '#campus-life-gallery') {
        resetAllViews();
        setCampusLifeTab('gallery');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const matchedCampusTab = campusLifeTabs.find((tab) => hash === `#${tab}`);
      if (matchedCampusTab) {
        resetAllViews();
        setCampusLifeTab(matchedCampusTab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 5. Check Department Detail Page hashes
      if (
        hash.startsWith('#dept-') ||
        hash.startsWith('#department-') ||
        hash === '#civil-department' ||
        hash === '#department-civil' ||
        hash === '#dept-civil' ||
        hash === '#dept-ce' ||
        hash === '#dept-soet-civil' ||
        hash === '#dept-ece' ||
        hash === '#dept-eee' ||
        hash === '#dept-mech' ||
        hash === '#dept-cse' ||
        hash === '#dept-scse' ||
        hash === '#dept-ai' ||
        hash === '#dept-aiml' ||
        hash === '#dept-csm' ||
        hash === '#dept-cse-aiml' ||
        hash === '#dept-it' ||
        hash === '#dept-iot' ||
        hash === '#dept-cse-iot' ||
        hash === '#dept-cso' ||
        hash === '#dept-csc' ||
        hash === '#dept-cyber' ||
        hash === '#dept-cyber-security' ||
        hash === '#dept-ds' ||
        hash === '#dept-csd' ||
        hash === '#dept-data-science' ||
        hash === '#dept-cse-ds' ||
        hash === '#dept-mba' ||
        hash === '#dept-management' ||
        hash === '#dept-soms-mba' ||
        hash === '#dept-bba' ||
        hash === '#dept-bca' ||
        hash === '#dept-scis-bca' ||
        hash === '#dept-mca' ||
        hash === '#dept-scis-mca' ||
        hash === '#dept-mca-department'
      ) {
        let dept = 'civil';
        if (hash.includes('csc') || hash.includes('cyber')) dept = 'csc';
        else if (hash.includes('dept-ds') || hash.includes('dept-csd') || hash.includes('data-science') || hash.includes('cse-ds') || hash.includes('csd') || hash === '#dept-ds') dept = 'ds';
        else if (hash.includes('dept-bca') || hash.includes('scis-bca') || hash === '#dept-bca') dept = 'bca';
        else if (hash.includes('dept-mca') || hash.includes('scis-mca') || hash === '#dept-mca') dept = 'mca';
        else if (hash.includes('mba') || hash.includes('management') || hash.includes('soms') || hash.includes('bba')) dept = 'mba';
        else if (hash.includes('csm') || hash.includes('aiml') || hash.includes('cse-ai') || hash.includes('cse-ml')) dept = 'csm';
        else if (hash.includes('dept-ai') || hash === '#ai' || hash.includes('artificial')) dept = 'ai';
        else if (hash.includes('dept-it') || hash.includes('information-technology') || hash.includes('scis-it') || hash.includes('dit')) dept = 'it';
        else if (hash.includes('iot') || hash.includes('cso')) dept = 'iot';
        else if (hash.includes('cse') || hash.includes('computer') || hash.includes('scse') || hash.includes('dcse')) dept = 'cse';
        else if (hash.includes('ece') || hash.includes('ebm') || hash.includes('electronics') || hash.includes('dece')) dept = 'ece';
        else if (hash.includes('eee') || hash.includes('electrical') || hash.includes('deee')) dept = 'eee';
        else if (hash.includes('mech') || hash.includes('mechanical') || hash.includes('dme')) dept = 'mechanical';
        else if (hash.includes('civil') || hash.includes('dept-ce') || hash === '#ce') dept = 'civil';
        
        resetAllViews();
        setDepartmentId(dept);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 6. Check Course Detail Page hash (e.g. #course-school-soet, #course-soet, #course-scse)
      if (hash.startsWith('#course-')) {
        let courseId = hash.replace('#course-', '');
        
        // Map shortcodes & aliases to the 6 official schools
        if (courseId === 'soet' || courseId === 'engineering' || courseId === 'eee' || courseId === 'mech' || courseId === 'ece' || courseId === 'drone' || courseId === 'school-engineering') {
          courseId = 'school-soet';
        } else if (courseId === 'civil' || courseId === 'ce') {
          // If user navigates specifically to civil, route to department page
          resetAllViews();
          setDepartmentId('civil');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        } else if (courseId === 'scse' || courseId === 'cse' || courseId === 'ai' || courseId === 'cloud' || courseId === 'school-computing') {
          courseId = 'school-scse';
        } else if (courseId === 'said' || courseId === 'aiml' || courseId === 'robotics' || courseId === 'data-science' || courseId === 'aids') {
          courseId = 'school-said';
        } else if (courseId === 'scis' || courseId === 'it' || courseId === 'iot' || courseId === 'quantum' || courseId === 'cyber' || courseId === 'bca' || courseId === 'mca') {
          courseId = 'school-scis';
        } else if (courseId === 'soms' || courseId === 'management' || courseId === 'mba' || courseId === 'bba' || courseId === 'school-management') {
          courseId = 'school-soms';
        } else if (courseId === 'sahs' || courseId === 'health' || courseId === 'allied-health' || courseId === 'paramedical' || courseId === 'physiotherapy' || courseId === 'bpt' || courseId === 'school-healthcare') {
          courseId = 'school-sahs';
        }

        const exists = ALL_DEGREE_CATEGORIES.some((c) => c.id === courseId);
        if (exists) {
          resetAllViews();
          setSelectedCourseId(courseId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // 7. Homepage & Section Anchors
      resetAllViews();
      if (hash && hash !== '#home' && hash !== '') {
        const scrollToTarget = () => {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        };
        scrollToTarget();
        setTimeout(scrollToTarget, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Global click interceptor for any #admissions or #apply links
  useEffect(() => {
    const handleAdmissionsClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button');
      if (target) {
        const href = target.getAttribute('href');
        if (
          href === '#admissions' ||
          href === '#apply' ||
          href === '#apply-now' ||
          href === '#admissions-portal' ||
          href === '#admissions-enquiry' ||
          href === '#enquiry'
        ) {
          e.preventDefault();
          setIsAdmissionsModalOpen(true);
        }
      }
    };
    document.addEventListener('click', handleAdmissionsClick);
    return () => document.removeEventListener('click', handleAdmissionsClick);
  }, []);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCourseId(categoryId);
    setDepartmentId(null);
    setAcademicTab(null);
    setIrTab(null);
    setResearchTab(null);
    setAboutTab(null);
    setCampusLifeTab(null);
    setExamPortalTab(null);
    window.location.hash = `course-${categoryId}`;
  };

  const handleBackToHome = () => {
    setSelectedCourseId(null);
    setDepartmentId(null);
    setAcademicTab(null);
    setIrTab(null);
    setResearchTab(null);
    setAboutTab(null);
    setCampusLifeTab(null);
    setExamPortalTab(null);
    window.location.hash = 'home';
  };

  const currentCategory = ALL_DEGREE_CATEGORIES.find(
    (c) => c.id === selectedCourseId
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Initial Welcome Splash Animation */}
      <WelcomePreloader />

      {/* Quick Admissions Enquiry & Application Modal */}
      <AdmissionsModal
        isOpen={isAdmissionsModalOpen}
        onClose={() => setIsAdmissionsModalOpen(false)}
      />

      {/* Sticky Main Navigation Header */}
      <Header />

      {/* Conditional Sub-Pages or Full Homepage Flow */}
      <main className="flex-grow">
        {researchTab ? (
          // Standalone Directorate of Research Sub-Page
          <ResearchDetailPage
            activeTab={researchTab}
            onBackToHome={handleBackToHome}
            onSelectTab={(tab) => {
              setResearchTab(tab);
              window.location.hash = `research-${tab}`;
            }}
          />
        ) : irTab ? (
          // Standalone International Relations & Admissions Portal
          <InternationalRelationsPage
            initialTab={irTab}
            onBackToHome={handleBackToHome}
          />
        ) : academicTab ? (
          // Standalone Academics Detail Sub-Page (with exact sidebar matching user reference)
          <AcademicsDetailPage
            activeTab={academicTab}
            onBackToHome={handleBackToHome}
            onSelectTab={(tab) => {
              setAcademicTab(tab);
              window.location.hash = `academic-${tab}`;
            }}
          />
        ) : departmentId ? (
          // Standalone Department Detail Sub-Page (with complete side menu: Profile, Vision, Syllabus, Faculty, Labs...)
          <DepartmentDetailPage
            departmentId={departmentId}
            onBackToHome={handleBackToHome}
            onSelectDepartment={(dId) => {
              setDepartmentId(dId);
              window.location.hash = `dept-${dId}`;
            }}
          />
        ) : aboutTab ? (
          // Standalone Executive Leadership & Governance Sub-Page
          <AboutGovernancePage
            pageType={aboutTab}
            onBackToHome={handleBackToHome}
          />
        ) : examPortalTab ? (
          // Standalone Examination Portal Sub-Page
          <ExamPortalPage
            activeTab={examPortalTab}
            onBackToHome={handleBackToHome}
            onSelectTab={(tab) => setExamPortalTab(tab)}
          />
        ) : campusLifeTab ? (
          // Standalone Campus Life Detail Sub-Page (Hostels, Sports, Health, Safety, Clubs...)
          <CampusLifeDetailPage
            activeTab={campusLifeTab}
            onBackToHome={handleBackToHome}
            onSelectTab={(tab) => setCampusLifeTab(tab)}
          />
        ) : selectedCourseId && currentCategory ? (
          // Standalone Academic School & Course Catalog Detail Page
          <CourseDetailPage
            category={currentCategory}
            onBackToHome={handleBackToHome}
            onSelectCategory={handleSelectCategory}
            allCategories={ALL_DEGREE_CATEGORIES}
          />
        ) : (
          // Full Premium Homepage Layout
          <>
            {/* 1. Hero Section with 5s Background Slider & Gold Brand Headline */}
            <HeroSection />

            {/* 2. Welcome to RVS University (Mission, Vision, Quality Policy + 4-quadrant photo collage) */}
            <WhyRvsSection />

            {/* 3. University Statistics & Key Metrics */}
            <StatisticsSection />

            {/* 4. Academic Schools & Degree Offerings / Programs Offered Gateway */}
            <AcademicSchoolsSection onSelectCategory={handleSelectCategory} />

            {/* 5. Campus Life & World-Class Facilities */}
            <CampusLifeSection />

            {/* 6. Corporate Partnerships & Career Placements with Continuous Logo Marquee Loop */}
            <PlacementsSection />

            {/* 7. Our Students' Achievements (SIH & Hackathon Winners Auto-Carousel) */}
            <StudentAchievementsSection />

            {/* 8. Admissions Call-To-Action Gateway */}
            <CallToActionSection />
          </>
        )}
      </main>

      {/* Comprehensive Institutional Footer */}
      <Footer />
    </div>
  );
};

export default App;
