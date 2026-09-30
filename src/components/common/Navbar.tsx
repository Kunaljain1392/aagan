import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { BreathingScore } from './BreathingScore';
import {
  Sun,
  Moon,
  Layers,
  Tv,
  Menu,
  X,
  Compass,
  Building2,
  Wind,
  ShieldCheck,
  Users,
  BookOpen,
  SplitSquareVertical,
} from 'lucide-react';

export const SECTIONS = [
  { id: 'hero', label: 'Overview', icon: Building2 },
  { id: 'explorer', label: '3D Explorer', icon: Layers },
  { id: 'sun', label: 'Sun & Facade', icon: Sun },
  { id: 'ventilation', label: 'Courtyard Flow', icon: Wind },
  { id: 'floor-plan', label: 'Typical Floor', icon: SplitSquareVertical },
  { id: 'facade-lab', label: 'Parametric Lab', icon: Compass },
  { id: 'structure', label: 'Structure & Rebar', icon: Layers },
  { id: 'dashboard', label: 'FAR & Impact', icon: Building2 },
  { id: 'compliance', label: 'Codes & NBC', icon: ShieldCheck },
  { id: 'site-plot', label: 'Plot & Site', icon: Compass },
  { id: 'workflow', label: 'Revit Timeline', icon: Layers },
  { id: 'walkthrough', label: '30s Tour', icon: Tv },
  { id: 'risks', label: 'Risk Mitigation', icon: ShieldCheck },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'references', label: 'References', icon: BookOpen },
];

export const Navbar: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    dayNightMode,
    toggleDayNightMode,
    toggleCompareModal,
    isPresentationMode,
    togglePresentationMode,
  } = useAppStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-4 py-2.5 shadow-glass">
          {/* Brand & Tagline */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-terracotta to-terracotta-dark flex items-center justify-center shadow-glow-terracotta">
              <span className="font-serif font-black text-white text-base">A</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold tracking-wider text-slate-100 group-hover:text-terracotta-light transition-colors text-sm sm:text-base">
                  AANGAN
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-commercial/20 text-commercial-light border border-commercial/30">
                  PS 26116
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden md:block">
                Breathing Courtyard • SIH 2026
              </p>
            </div>
          </div>

          {/* Section Navigation Quick Dots (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight-950/60 border border-white/5">
            {SECTIONS.map((sec, idx) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  title={`${idx + 1}. ${sec.label}`}
                  className={`relative px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'text-white bg-terracotta shadow-glow-terracotta font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span className="hidden xl:inline">{sec.label}</span>
                  <span className="xl:hidden">{idx + 1}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            <BreathingScore />

            {/* Compare Mode Button */}
            <button
              onClick={toggleCompareModal}
              title="Compare Conventional Box vs AANGAN"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-midnight-800 border border-white/10 hover:border-terracotta/40 text-xs text-slate-300 hover:text-white transition-all shadow-sm"
            >
              <SplitSquareVertical className="w-3.5 h-3.5 text-terracotta" />
              <span className="hidden md:inline">Compare</span>
            </button>

            {/* Day / Night Toggle */}
            <button
              onClick={toggleDayNightMode}
              title={`Switch to ${dayNightMode === 'day' ? 'Night' : 'Day'} Mode`}
              className="p-2 rounded-xl bg-midnight-800 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-300 transition-all"
            >
              {dayNightMode === 'day' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-sky-400" />
              )}
            </button>

            {/* Presentation Mode (F key) */}
            <button
              onClick={togglePresentationMode}
              title="Toggle Jury Presentation Mode (F)"
              className={`p-2 rounded-xl border transition-all ${
                isPresentationMode
                  ? 'bg-terracotta text-white border-terracotta shadow-glow-terracotta'
                  : 'bg-midnight-800 text-slate-300 border-white/10 hover:text-white'
              }`}
            >
              <Tv className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-midnight-800 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-midnight-950/95 backdrop-blur-xl pt-20 px-6 pb-8 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <div className="text-xs font-mono uppercase text-slate-400 mb-2">Project Sections</div>
            {SECTIONS.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all ${
                    activeSection === sec.id
                      ? 'bg-terracotta text-white font-semibold shadow-glow-terracotta'
                      : 'bg-midnight-800/60 text-slate-300 hover:bg-midnight-700'
                  }`}
                >
                  <span className="w-6 font-mono text-xs text-slate-400">{idx + 1}.</span>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
