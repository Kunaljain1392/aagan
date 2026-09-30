import React, { useState, useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { LoadingScreen } from './components/common/LoadingScreen';
import { CursorGlow } from './components/common/CursorGlow';
import { Navbar, SECTIONS } from './components/common/Navbar';

// 15 Interactive Sections
import { HeroSection } from './components/sections/HeroSection';
import { BuildingExplorer } from './components/sections/BuildingExplorer';
import { SunSimulator } from './components/sections/SunSimulator';
import { VentilationSimulator } from './components/sections/VentilationSimulator';
import { TypicalFloorPlanner } from './components/sections/TypicalFloorPlanner';
import { FacadeFamilyLab } from './components/sections/FacadeFamilyLab';
import { StructureRebarViewer } from './components/sections/StructureRebarViewer';
import { AreaImpactDashboard } from './components/sections/AreaImpactDashboard';
import { CodeChecklist } from './components/sections/CodeChecklist';
import { SitePlotView } from './components/sections/SitePlotView';
import { WorkflowTimeline } from './components/sections/WorkflowTimeline';
import { CinematicWalkthrough } from './components/sections/CinematicWalkthrough';
import { RiskMitigation } from './components/sections/RiskMitigation';
import { TeamRoles } from './components/sections/TeamRoles';
import { ReferencesSection } from './components/sections/ReferencesSection';
import { CompareModal } from './components/sections/CompareModal';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    activeSection,
    setActiveSection,
    dayNightMode,
    toggleDayNightMode,
    isPresentationMode,
    togglePresentationMode,
    toggleSolarPlaying,
    isCompareModalOpen,
    toggleCompareModal,
  } = useAppStore();

  // Keyboard accessibility shortcuts (1-9, F, D, Space, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        if (index < SECTIONS.length) {
          const sec = SECTIONS[index];
          setActiveSection(sec.id);
          document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'f' || e.key === 'F') {
        togglePresentationMode();
      } else if (e.key === 'd' || e.key === 'D') {
        toggleDayNightMode();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleSolarPlaying();
      } else if (e.key === 'Escape' && isCompareModalOpen) {
        toggleCompareModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    setActiveSection,
    togglePresentationMode,
    toggleDayNightMode,
    toggleSolarPlaying,
    isCompareModalOpen,
    toggleCompareModal,
  ]);

  // Presentation Mode: Auto advance sections every 12 seconds
  useEffect(() => {
    if (!isPresentationMode) return;

    const interval = setInterval(() => {
      const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
      const nextIndex = (currentIndex + 1) % SECTIONS.length;
      const nextSec = SECTIONS[nextIndex];
      setActiveSection(nextSec.id);
      document.getElementById(nextSec.id)?.scrollIntoView({ behavior: 'smooth' });
    }, 12000);

    return () => clearInterval(interval);
  }, [isPresentationMode, activeSection, setActiveSection]);

  // Intersection observer to automatically update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <div
      className={`min-h-screen relative font-sans ${
        dayNightMode === 'night' ? 'bg-midnight-950 text-slate-100' : 'bg-midnight-900 text-slate-100'
      } bg-grain selection:bg-terracotta selection:text-white transition-colors duration-500`}
    >
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Subtle Desktop Cursor Follower Glow */}
      <CursorGlow />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Presentation Mode Floating Banner */}
      {isPresentationMode && (
        <div className="fixed bottom-6 right-6 z-40 px-4 py-2 rounded-2xl glass-panel border border-terracotta/40 text-xs font-mono text-terracotta-light shadow-glow-terracotta flex items-center gap-2 animate-pulse">
          <span className="w-2.5 h-2.5 rounded-full bg-terracotta" />
          <span>Jury Presentation Mode Active (Press F to exit)</span>
        </div>
      )}

      {/* 15 Sequential Single-Scroll Sections */}
      <main className="w-full">
        {/* Section 01: Hero */}
        <HeroSection />

        {/* Section 02: 3D Building Explorer */}
        <BuildingExplorer />

        {/* Section 03: Sun & Facade Simulator */}
        <SunSimulator />

        {/* Section 04: Courtyard Breathing Stack Effect */}
        <VentilationSimulator />

        {/* Section 05: Typical Floor & Home Planner */}
        <TypicalFloorPlanner />

        {/* Section 06: Facade Family Lab */}
        <FacadeFamilyLab />

        {/* Section 07: Structure & Rebar Viewer */}
        <StructureRebarViewer />

        {/* Section 08: Area, FAR & Impact Dashboard */}
        <AreaImpactDashboard />

        {/* Section 09: Code Compliance Checklist */}
        <CodeChecklist />

        {/* Section 10: Site & Plot View */}
        <SitePlotView />

        {/* Section 11: 36h Revit Workflow Timeline */}
        <WorkflowTimeline />

        {/* Section 12: 30s Cinematic Tour */}
        <CinematicWalkthrough />

        {/* Section 13: Risk & Mitigation */}
        <RiskMitigation />

        {/* Section 14: Team Roles & Model Allocation */}
        <TeamRoles />

        {/* Section 15: References & Statutory Standards */}
        <ReferencesSection />
      </main>

      {/* Compare Modal */}
      <CompareModal />
    </div>
  );
};

export default App;
