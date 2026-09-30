import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  Sliders,
  Sparkles,
  Layers,
  Compass,
  CheckCircle2,
  Cpu,
  Star,
} from 'lucide-react';

export const FacadeFamilyLab: React.FC = () => {
  const { facadeParams, updateFacadeParams, isHeroBayActive, toggleHeroBay } = useAppStore();

  return (
    <section id="facade-lab" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-950 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-terracotta tracking-wider uppercase">
                Section 06 // Revit Family Workbench
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Facade Family Lab
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              <strong className="text-amber-300">One Parametric Family, Four Faces.</strong> We authored a single adaptive 
              curtain panel family in Revit with instance parameters. Adjust any slider below to watch all four orientation bays update simultaneously.
            </p>
          </div>

          {/* Hero Bay Highlight Toggle */}
          <button
            onClick={toggleHeroBay}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
              isHeroBayActive
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-glow-terracotta'
                : 'bg-midnight-800 text-slate-300 border-white/10 hover:text-white'
            }`}
          >
            <Star className={`w-4 h-4 ${isHeroBayActive ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />
            <span>{isHeroBayActive ? 'Hero Entrance Bay Highlighted' : 'Toggle Hero Bay Detail'}</span>
          </button>
        </div>
      </div>

      {/* Main Lab Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Parametric Sliders Workbench */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Parametric Instance Parameters</span>
              <Sliders className="w-4 h-4 text-terracotta" />
            </h3>

            {/* Fin Depth Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Fin Depth (150 – 600 mm)</span>
                <span className="font-mono font-bold text-terracotta-light">
                  {facadeParams.finDepthMm} mm
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="600"
                step="25"
                value={facadeParams.finDepthMm}
                onChange={(e) => updateFacadeParams({ finDepthMm: parseInt(e.target.value) })}
                className="w-full h-2 rounded-lg bg-midnight-800 accent-terracotta cursor-pointer"
              />
            </div>

            {/* Fin Spacing Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Fin Center-to-Center Spacing (300 – 1200 mm)</span>
                <span className="font-mono font-bold text-terracotta-light">
                  {facadeParams.finSpacingMm} mm
                </span>
              </div>
              <input
                type="range"
                min="300"
                max="1200"
                step="50"
                value={facadeParams.finSpacingMm}
                onChange={(e) => updateFacadeParams({ finSpacingMm: parseInt(e.target.value) })}
                className="w-full h-2 rounded-lg bg-midnight-800 accent-terracotta cursor-pointer"
              />
            </div>

            {/* Fin Rotation Angle Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Fin Rotation Angle (-45° to +45°)</span>
                <span className="font-mono font-bold text-terracotta-light">
                  {facadeParams.finRotationDeg}°
                </span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                step="5"
                value={facadeParams.finRotationDeg}
                onChange={(e) => updateFacadeParams({ finRotationDeg: parseInt(e.target.value) })}
                className="w-full h-2 rounded-lg bg-midnight-800 accent-terracotta cursor-pointer"
              />
            </div>

            {/* Horizontal Louvre Depth Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Horizontal Louvre Depth (100 – 400 mm)</span>
                <span className="font-mono font-bold text-amber-300">
                  {facadeParams.louvreDepthMm} mm
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="400"
                step="25"
                value={facadeParams.louvreDepthMm}
                onChange={(e) => updateFacadeParams({ louvreDepthMm: parseInt(e.target.value) })}
                className="w-full h-2 rounded-lg bg-midnight-800 accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Jaali Screen Porosity Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Terracotta Jaali Porosity (20% – 70%)</span>
                <span className="font-mono font-bold text-emerald-400">
                  {facadeParams.jaaliPorosityPercent}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="70"
                step="5"
                value={facadeParams.jaaliPorosityPercent}
                onChange={(e) =>
                  updateFacadeParams({ jaaliPorosityPercent: parseInt(e.target.value) })
                }
                className="w-full h-2 rounded-lg bg-midnight-800 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Planter Box Width */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Balcony Planter Box Width (400 – 1000 mm)</span>
                <span className="font-mono font-bold text-teal-300">
                  {facadeParams.planterWidthMm} mm
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="1000"
                step="50"
                value={facadeParams.planterWidthMm}
                onChange={(e) =>
                  updateFacadeParams({ planterWidthMm: parseInt(e.target.value) })
                }
                className="w-full h-2 rounded-lg bg-midnight-800 accent-teal-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Time Saving Strategy Card */}
          <div className="p-4 rounded-xl bg-midnight-900 border border-white/10 space-y-1.5">
            <div className="text-xs font-semibold text-terracotta flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>SIH Hackathon Time-Saving Strategy</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Instead of manually drafting hundreds of unique louvre types, Team MIDNIGHT-CODERS authored 
              a single nested parametric panel. Setting orientation type catalogs cut modeling time by ~75%.
            </p>
          </div>
        </div>

        {/* Right: Four Synchronized Mini-Bays (N, E, S, W) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. North Bay */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-serif font-bold text-white text-sm">North Elevation Bay</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                  Diffuse Sky
                </span>
              </div>

              {/* Procedural Bay SVG Drawing */}
              <div className="h-44 rounded-xl bg-midnight-950 flex items-center justify-center p-3 relative overflow-hidden border border-white/5">
                <svg viewBox="0 0 160 120" className="w-full h-full">
                  {/* Glazing */}
                  <rect x="20" y="10" width="120" height="90" fill="#1E293B" rx="3" />
                  {/* Slender vertical fins */}
                  {[-30, -10, 10, 30].map((xOff, i) => (
                    <rect
                      key={i}
                      x={80 + xOff}
                      y="10"
                      width="4"
                      height="90"
                      fill="#E0801F"
                    />
                  ))}
                  {/* Sill Planter Box */}
                  <rect x="20" y="100" width="120" height="12" fill="#2E7D32" rx="2" />
                </svg>
              </div>
              <div className="text-[11px] text-slate-400">
                Fins at 0° rotation allow maximum North indirect daylight into living rooms.
              </div>
            </div>

            {/* 2. East Bay */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-serif font-bold text-white text-sm">East Elevation Bay</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                  Morning Sun
                </span>
              </div>

              {/* Procedural Bay SVG */}
              <div className="h-44 rounded-xl bg-midnight-950 flex items-center justify-center p-3 relative overflow-hidden border border-white/5">
                <svg viewBox="0 0 160 120" className="w-full h-full">
                  <rect x="20" y="10" width="120" height="90" fill="#1E293B" rx="3" />
                  {/* Angled vertical fins */}
                  {[-35, -15, 5, 25].map((xOff, i) => (
                    <line
                      key={i}
                      x1={80 + xOff}
                      y1="10"
                      x2={80 + xOff + facadeParams.finRotationDeg * 0.4}
                      y2="100"
                      stroke="#E0801F"
                      strokeWidth={Math.max(3, facadeParams.finDepthMm / 100)}
                    />
                  ))}
                  <rect x="20" y="100" width="120" height="12" fill="#2E7D32" rx="2" />
                </svg>
              </div>
              <div className="text-[11px] text-slate-400">
                Angled at {facadeParams.finRotationDeg}° to intercept morning low-angle solar glare.
              </div>
            </div>

            {/* 3. South Bay */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-serif font-bold text-white text-sm">South Elevation Bay</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                  High Midday Sun
                </span>
              </div>

              {/* Procedural Bay SVG */}
              <div className="h-44 rounded-xl bg-midnight-950 flex items-center justify-center p-3 relative overflow-hidden border border-white/5">
                <svg viewBox="0 0 160 120" className="w-full h-full">
                  <rect x="20" y="10" width="120" height="90" fill="#1E293B" rx="3" />
                  {/* Horizontal Louvres */}
                  {[25, 50, 75].map((yPos, i) => (
                    <rect
                      key={i}
                      x="20"
                      y={yPos}
                      width="120"
                      height={Math.max(4, facadeParams.louvreDepthMm / 50)}
                      fill="#B85A00"
                      rx="1"
                    />
                  ))}
                  <rect x="20" y="100" width="120" height="12" fill="#2E7D32" rx="2" />
                </svg>
              </div>
              <div className="text-[11px] text-slate-400">
                Horizontal louvre depth {facadeParams.louvreDepthMm}mm blocks 74% high summer solar altitude.
              </div>
            </div>

            {/* 4. West Bay */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="font-serif font-bold text-white text-sm">West Elevation Bay</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                  Harsh Afternoon Sun
                </span>
              </div>

              {/* Procedural Bay SVG */}
              <div className="h-44 rounded-xl bg-midnight-950 flex items-center justify-center p-3 relative overflow-hidden border border-white/5">
                <svg viewBox="0 0 160 120" className="w-full h-full">
                  <rect x="20" y="10" width="120" height="90" fill="#1E293B" rx="3" />
                  {/* Deep angled West fins + Jaali screen overlay */}
                  {[-30, -10, 10, 30].map((xOff, i) => (
                    <rect
                      key={i}
                      x={80 + xOff}
                      y="10"
                      width={Math.max(5, facadeParams.finDepthMm / 60)}
                      height="90"
                      fill="#E0801F"
                    />
                  ))}
                  {/* Jaali Screen hatch */}
                  <rect
                    x="20"
                    y="60"
                    width="120"
                    height="40"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="1.5"
                    strokeDasharray={`${facadeParams.jaaliPorosityPercent / 10} 2`}
                  />
                  <rect x="20" y="100" width="120" height="12" fill="#2E7D32" rx="2" />
                </svg>
              </div>
              <div className="text-[11px] text-slate-400">
                Deep {facadeParams.finDepthMm}mm fins + {facadeParams.jaaliPorosityPercent}% jaali screen 
                eliminate severe western heat load.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
