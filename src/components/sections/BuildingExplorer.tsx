import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore, CameraPreset } from '../../store/useAppStore';
import { LEVELS_DATA, PROJECT_CONFIG } from '../../data/project';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  Layers,
  Scissors,
  Eye,
  Camera,
  Maximize,
  Compass,
  Check,
  Building,
  Sparkles,
  Info,
} from 'lucide-react';

export const BuildingExplorer: React.FC = () => {
  const {
    isolatedLevelIndex,
    setIsolatedLevelIndex,
    isExplodedView,
    toggleExplodedView,
    isSectionCut,
    toggleSectionCut,
    cameraPreset,
    setCameraPreset,
  } = useAppStore();

  const selectedLevel =
    isolatedLevelIndex >= 0 && isolatedLevelIndex < LEVELS_DATA.length
      ? LEVELS_DATA[isolatedLevelIndex]
      : null;

  return (
    <section id="explorer" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-950 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-terracotta tracking-wider uppercase">
                Section 02 // Centerpiece
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Interactive 3D Building Explorer
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Procedurally generated from exact Autodesk Revit parameters. Sized on the 8x8m column grid 
              with a 16x16m central courtyard chimney. Test floor isolation, exploded massing, and thermal section cuts.
            </p>
          </div>

          {/* Camera View Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-terracotta" /> Camera:
            </span>
            {(['default', 'street', 'courtyard', 'top', 'axonometric'] as CameraPreset[]).map((preset) => (
              <button
                key={preset}
                onClick={() => setCameraPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  cameraPreset === preset
                    ? 'bg-terracotta text-white shadow-glow-terracotta'
                    : 'bg-midnight-800 text-slate-300 hover:bg-midnight-700 border border-white/5'
                }`}
              >
                {preset === 'top' ? 'Top (Plan)' : preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Explorer Control Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Control Panel: Floor Selector & Toggles */}
        <div className="lg:col-span-4 space-y-4">
          {/* Action Toggles Card */}
          <div className="glass-panel p-5 rounded-2xl space-y-4 border border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>View Modes</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Exploded View Toggle */}
              <button
                onClick={toggleExplodedView}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-xs font-medium transition-all ${
                  isExplodedView
                    ? 'bg-terracotta/20 border-terracotta text-terracotta-light shadow-glow-terracotta'
                    : 'bg-midnight-850/80 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <Layers className={`w-5 h-5 mb-1.5 ${isExplodedView ? 'text-terracotta' : 'text-slate-400'}`} />
                <span>Exploded View</span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {isExplodedView ? 'Activated' : 'Off'}
                </span>
              </button>

              {/* Section Cut Toggle */}
              <button
                onClick={toggleSectionCut}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-xs font-medium transition-all ${
                  isSectionCut
                    ? 'bg-commercial/20 border-commercial text-commercial-light shadow-glow-teal'
                    : 'bg-midnight-850/80 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <Scissors className={`w-5 h-5 mb-1.5 ${isSectionCut ? 'text-commercial' : 'text-slate-400'}`} />
                <span>Section Cut</span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {isSectionCut ? 'Courtyard Cut' : 'Off'}
                </span>
              </button>
            </div>

            {/* Isolate All Button */}
            <button
              onClick={() => setIsolatedLevelIndex(-1)}
              className={`w-full py-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                isolatedLevelIndex === -1
                  ? 'bg-white/10 border-white/20 text-white font-semibold'
                  : 'bg-midnight-850 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Show Entire Building (All 11 Levels)</span>
            </button>
          </div>

          {/* Vertical Level Isolator List */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Level Selector ({LEVELS_DATA.length} Levels)
              </h3>
              <span className="text-[10px] font-mono text-terracotta">Click to Isolate</span>
            </div>

            <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
              {/* Reverse to show Roof at top and Basement at bottom */}
              {[...LEVELS_DATA].reverse().map((lvl) => {
                const actualIndex = LEVELS_DATA.findIndex((l) => l.id === lvl.id);
                const isSelected = isolatedLevelIndex === actualIndex;

                return (
                  <button
                    key={lvl.id}
                    onClick={() => setIsolatedLevelIndex(isSelected ? -1 : actualIndex)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all border ${
                      isSelected
                        ? 'bg-terracotta/20 border-terracotta text-white font-medium shadow-sm'
                        : 'bg-midnight-850/60 border-white/5 text-slate-300 hover:bg-midnight-700/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: lvl.color }}
                      />
                      <span className="font-mono text-slate-400 w-7 text-left">{lvl.shortName}</span>
                      <span className="truncate">{lvl.name}</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                      <span>{lvl.height / 1000}m</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-terracotta" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: Selected Level Specification Card & Zone Legend */}
        <div className="lg:col-span-8 space-y-4">
          {/* Active Level Detail Card */}
          <motion.div
            key={selectedLevel ? selectedLevel.id : 'all'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-lg text-white shadow-lg"
                  style={{ backgroundColor: selectedLevel ? selectedLevel.color : '#E0801F' }}
                >
                  {selectedLevel ? selectedLevel.shortName : 'ALL'}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">
                    {selectedLevel ? selectedLevel.name : 'Full Integrated Mixed-Use Model'}
                  </h3>
                  <p className="text-xs text-slate-400 capitalize">
                    {selectedLevel
                      ? `Primary Use: ${selectedLevel.use} • Elevation: ${(selectedLevel.elevation / 1000).toFixed(1)}m`
                      : 'B+G+L1 Commercial/Community + L2-L9 Residential (64 Homes) + Bio-Solar Roof'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                  {selectedLevel ? `${selectedLevel.areaM2} m² Area` : `${PROJECT_CONFIG.geometry.builtUpAreaAboveGroundM2} m² Above Ground`}
                </span>
              </div>
            </div>

            {/* Description & Engineering Highlights */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedLevel
                ? selectedLevel.description
                : 'Central 16x16m courtyard provides thermal stack buoyancy across all 35 meters, ensuring natural light and draft to 64 apartments and lower retail colonnades.'}
            </p>

            {/* Feature Pills */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-slate-400">Architectural & Engineering Specifications</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(selectedLevel
                  ? selectedLevel.features
                  : [
                      '60x60m Corner Plot with 10-14m Fire Tender Ring',
                      '40x32m Footprint on 8x8m Structural Grid',
                      '16x16m Central Courtyard Thermal Chimney',
                      'Columns: 600mm sq tapering to 450mm at L5',
                      '8 Homes/floor x 8 floors = 64 Cross-Ventilated Units',
                      'FAR 2.84 • 20% EV Ready • 11.4 W/m² RETV',
                    ]
                ).map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-midnight-800/80 border border-white/5 text-xs text-slate-200"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Color-Coded Zones Legend */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Programmatic Zone Color Legend</span>
              <Info className="w-3.5 h-3.5 text-slate-400" />
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-midnight-800/60">
                <span className="w-3 h-3 rounded-full bg-[#475569] shrink-0" />
                <div>
                  <div className="font-semibold text-slate-200">Parking</div>
                  <div className="text-[10px] text-slate-400">Basement (20% EV)</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-midnight-800/60">
                <span className="w-3 h-3 rounded-full bg-[#0F8A7A] shrink-0" />
                <div>
                  <div className="font-semibold text-teal-300">Retail / Cafe</div>
                  <div className="text-[10px] text-slate-400">Ground Colonnade</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-midnight-800/60">
                <span className="w-3 h-3 rounded-full bg-[#6B3FB5] shrink-0" />
                <div>
                  <div className="font-semibold text-purple-300">Co-Working</div>
                  <div className="text-[10px] text-slate-400">Level 1 Community</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-midnight-800/60">
                <span className="w-3 h-3 rounded-full bg-[#E0801F] shrink-0" />
                <div>
                  <div className="font-semibold text-amber-300">Homes</div>
                  <div className="text-[10px] text-slate-400">L2 - L9 (64 units)</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-lg bg-midnight-800/60">
                <span className="w-3 h-3 rounded-full bg-[#2E7D32] shrink-0" />
                <div>
                  <div className="font-semibold text-emerald-300">Terraces / PV</div>
                  <div className="text-[10px] text-slate-400">L1, L5, Roof</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
