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
import { AboutGovernancePage } from './components/pages/AboutGovernancePage';
import { WelcomePreloader } from './components/ui/WelcomePreloader';
import { ALL_DEGREE_CATEGORIES } from './data/coursesCatalog';

export const App: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [aboutTab, setAboutTab] = useState<
    'chairman' | 'vice-chairman' | 'principal' | 'governing-body' | 'academic-council' | 'finance' | 'admin-chart' | null
  >(null);

  // Sync with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      // Check About & Leadership / Committees hashes
      if (hash === '#about-chairman' || hash === '#chairman') {
        setAboutTab('chairman');
        setSelectedCourseId(null);
        return;
      }
      if (hash === '#about-vice-chairman' || hash === '#vice-chairman' || hash === '#group-institutions') {
        setAboutTab('vice-chairman');
        setSelectedCourseId(null);
        return;
      }
      if (hash === '#about-principal' || hash === '#principal') {
        setAboutTab('principal');
        setSelectedCourseId(null);
        return;
      }
      if (hash === '#committee-governing-body' || hash === '#governing-body') {
        setAboutTab('governing-body');
        setSelectedCourseId(null);
        return;
      }
      if (hash === '#committee-academic-council' || hash === '#academic-council') {
        setAboutTab('academic-council');
        setSelectedCourseId(null);
        return;
      }
      if (hash === '#committee-finance' || hash === '#finance') {
        setAboutTab('finance');
        setSelectedCourseId(null);
        return;
      }
      if (hash === '#administration' || hash === '#admin-chart') {
        setAboutTab('admin-chart');
        setSelectedCourseId(null);
        return;
      }

      // Check Course Detail Page hash (e.g. #course-btech)
      if (hash.startsWith('#course-')) {
        const courseId = hash.replace('#course-', '');
        const exists = ALL_DEGREE_CATEGORIES.some((c) => c.id === courseId);
        if (exists) {
          setSelectedCourseId(courseId);
          setAboutTab(null);
          return;
        }
      }

      // Return to homepage
      if (hash === '#home' || hash === '' || hash === '#departments' || hash === '#about' || hash === '#admissions' || hash === '#placements' || hash === '#achievements') {
        setSelectedCourseId(null);
        setAboutTab(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCourseId(categoryId);
    setAboutTab(null);
    window.location.hash = `course-${categoryId}`;
  };

  const handleBackToHome = () => {
    setSelectedCourseId(null);
    setAboutTab(null);
    window.location.hash = 'home';
  };

  const currentCategory = ALL_DEGREE_CATEGORIES.find(
    (c) => c.id === selectedCourseId
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-gold-500 selection:text-navy-950">
      {/* 0. Cinematic Welcome to RVS University Preloader Animation */}
      <WelcomePreloader />

      {/* 1 & 2. Main Sticky Navigation */}
      <Header />

      {/* Main Page Body */}
      <main className="flex-grow">
        {aboutTab ? (
          /* Dedicated About, Leadership, Committees & Governance Page */
          <AboutGovernancePage
            pageType={aboutTab}
            onBackToHome={handleBackToHome}
          />
        ) : selectedCourseId && currentCategory ? (
          /* Dedicated Course Detail Page for selected main degree */
          <CourseDetailPage
            category={currentCategory}
            onBackToHome={handleBackToHome}
            onSelectCategory={handleSelectCategory}
            allCategories={ALL_DEGREE_CATEGORIES}
          />
        ) : (
          /* Clean, Prestigious Homepage */
          <>
            {/* Cinematic Hero Section */}
            <HeroSection />

            {/* 01 — Welcome to RVS University (Mission, Vision & Quality Policy) */}
            <WhyRvsSection />

            {/* 02 — University Statistics by the Numbers */}
            <StatisticsSection />

            {/* 03 — Academic Schools & Faculties Gateway */}
            <AcademicSchoolsSection onSelectCategory={handleSelectCategory} />

            {/* 04 — Campus Life & Infrastructure */}
            <CampusLifeSection />

            {/* 05 — Placements & Corporate Partners */}
            <PlacementsSection />

            {/* 06 — Student Achievements & Hackathon Triumphs */}
            <StudentAchievementsSection />

            {/* 07 — Admissions Call to Action */}
            <CallToActionSection />
          </>
        )}
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
};

export default App;
