import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { BuildingScene } from '../3d/BuildingScene';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  Building2,
  Compass,
  Play,
  ArrowDown,
  Sparkles,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveSection, setWalkthroughPlaying } = useAppStore();

  const handleExplore = () => {
    setActiveSection('explorer');
    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWalkthrough = () => {
    setActiveSection('walkthrough');
    setWalkthroughPlaying(true);
    document.getElementById('walkthrough')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-midnight-900">
      {/* 3D Master Scene in Background with lazy loading */}
      <div className="absolute inset-0 z-0">
        <BuildingScene />
        {/* Subtle radial vignette overlay */}
        <div className="absolute inset-0 bg-radial-vignette pointer-events-none bg-gradient-to-t from-midnight-900 via-transparent to-midnight-900/60" />
      </div>

      {/* Top Banner / Problem Statement Pill */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-4">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill border border-terracotta/30 text-xs text-slate-300"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-terracotta-light">Smart India Hackathon 2026</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 font-mono">PS 26116: Urban Mixed-Use Challenge</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Team MIDNIGHT-CODERS (ID: 157275)</span>
        </motion.div>
      </div>

      {/* Hero Central Headline & Value Prop */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full my-auto pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-terracotta/20 text-terracotta-light font-mono text-xs font-semibold tracking-wider uppercase border border-terracotta/30">
                Autodesk Revit 2026
              </span>
              <AssumedBadge />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08] text-glow">
              AANGAN: <br />
              <span className="bg-gradient-to-r from-terracotta-light via-amber-200 to-commercial-light bg-clip-text text-transparent">
                the building that breathes
              </span>
            </h1>

            <p className="text-lg sm:text-2xl font-light text-slate-300 tracking-wide font-sans">
              Shops below. Homes above. <br className="hidden sm:inline" />
              <span className="font-medium text-amber-300">A courtyard in the middle.</span>
            </p>

            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
              A climate-responsive mixed-use urban block for Delhi-NCR, reviving the traditional Indian courtyard 
              as a high-performance vertical thermal chimney for natural stack ventilation, 11.4 W/m² RETV, 
              and biophilic community living.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={handleExplore}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-terracotta to-terracotta-dark text-white font-medium shadow-glow-terracotta hover:brightness-110 active:scale-95 transition-all text-sm sm:text-base"
              >
                <Compass className="w-4 h-4" />
                <span>Explore the Building</span>
              </button>

              <button
                onClick={handleWalkthrough}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl glass-card hover:border-terracotta/50 text-slate-200 hover:text-white transition-all text-sm sm:text-base"
              >
                <Play className="w-4 h-4 text-terracotta fill-terracotta" />
                <span>Watch 30-Second Walkthrough</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Key Metrics Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 glass-panel p-4 sm:p-5 rounded-2xl shadow-glass border border-white/10"
        >
          {/* 64 Homes */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-terracotta/20 flex items-center justify-center text-terracotta shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">64</div>
              <div className="text-xs text-slate-400 font-medium">Cross-Vent Homes</div>
              <div className="text-[10px] text-terracotta-light">8 per floor x 8 floors</div>
            </div>
          </div>

          {/* 35 m Height */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-structural/20 flex items-center justify-center text-structural-light shrink-0">
              <Maximize2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">35 m</div>
              <div className="text-xs text-slate-400 font-medium">Building Height</div>
              <div className="text-[10px] text-purple-300">NBCS 2026 Compliant</div>
            </div>
          </div>

          {/* 256 m2 Courtyard */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-nature/20 flex items-center justify-center text-nature-light shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">256 m²</div>
              <div className="text-xs text-slate-400 font-medium">Breathing Courtyard</div>
              <div className="text-[10px] text-emerald-400">16x16m Stack Chimney</div>
            </div>
          </div>

          {/* 20% EV-Ready */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-commercial/20 flex items-center justify-center text-commercial-light shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">20.8%</div>
              <div className="text-xs text-slate-400 font-medium">EV-Ready Bays</div>
              <div className="text-[10px] text-teal-300">15 of 72 Parking Slots</div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator prompt */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleExplore}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-terracotta transition-colors animate-bounce"
          >
            <span>Scroll down to simulate</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
