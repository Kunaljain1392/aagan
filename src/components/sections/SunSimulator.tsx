import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { calculateSolarPosition, MONTH_NAMES } from '../../sim/solar';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  Sun,
  Play,
  Pause,
  Clock,
  Calendar,
  ShieldAlert,
  Flame,
  ThermometerSnowflake,
  RotateCw,
} from 'lucide-react';

export const SunSimulator: React.FC = () => {
  const {
    solarMonth,
    setSolarMonth,
    solarHour,
    setSolarHour,
    isSolarPlaying,
    toggleSolarPlaying,
    facadeParams,
  } = useAppStore();

  const [compareMode, setCompareMode] = useState<'with_shading' | 'without_shading'>('with_shading');
  const [selectedFace, setSelectedFace] = useState<'east' | 'west' | 'south' | 'north'>('south');

  // Play animation loop for sun time
  useEffect(() => {
    if (!isSolarPlaying) return;

    const interval = setInterval(() => {
      setSolarHour((prev) => {
        if (prev >= 19.0) return 5.0;
        return Math.round((prev + 0.1) * 10) / 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isSolarPlaying, setSolarHour]);

  const solar = calculateSolarPosition(solarMonth, solarHour);

  // Formatting 12h time string
  const formatTime = (hour: number) => {
    const wholeHours = Math.floor(hour);
    const minutes = Math.round((hour - wholeHours) * 60);
    const period = wholeHours >= 12 ? 'PM' : 'AM';
    const displayHour = wholeHours > 12 ? wholeHours - 12 : wholeHours === 0 ? 12 : wholeHours;
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <section id="sun" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-900 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">
                Section 03 // Solar Physics
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Sun & Facade Response Simulator
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Real solar geometry for Delhi-NCR (28.4° N). Watch how the single parametric facade family 
              dynamically blocks peak solar radiation while maintaining natural diffuse daylighting.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 p-2.5 rounded-xl bg-midnight-800 border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Latitude 28.4°N • Longitude 77.1°E</span>
          </div>
        </div>
      </div>

      {/* Main Simulation Workbench Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Interactive Controllers */}
        <div className="lg:col-span-5 space-y-4">
          {/* Time & Month Controls Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Solar Trajectory Controls</span>
              </h3>

              <button
                onClick={toggleSolarPlaying}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSolarPlaying
                    ? 'bg-amber-500 text-midnight-950 font-bold'
                    : 'bg-midnight-800 text-slate-200 border border-white/10 hover:border-amber-400/40'
                }`}
              >
                {isSolarPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> Auto Play
                  </>
                )}
              </button>
            </div>

            {/* Time of Day Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-terracotta" /> Time of Day (5 AM - 7 PM)
                </span>
                <span className="font-mono font-bold text-amber-300 text-sm">
                  {formatTime(solarHour)}
                </span>
              </div>
              <input
                type="range"
                min="5.0"
                max="19.0"
                step="0.1"
                value={solarHour}
                onChange={(e) => setSolarHour(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg bg-midnight-800 accent-terracotta cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>05:00 Dawn</span>
                <span>12:00 Solar Noon</span>
                <span>19:00 Dusk</span>
              </div>
            </div>

            {/* Month Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-commercial" /> Month of Year
                </span>
                <span className="font-mono font-semibold text-slate-200">
                  {MONTH_NAMES[solarMonth]}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {MONTH_NAMES.map((m, idx) => (
                  <button
                    key={m}
                    onClick={() => setSolarMonth(idx)}
                    className={`py-1.5 rounded text-[11px] font-mono transition-all ${
                      solarMonth === idx
                        ? 'bg-amber-400 text-midnight-950 font-bold shadow-sm'
                        : 'bg-midnight-850 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {m.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Celestial Coordinates */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs">
              <div className="p-2.5 rounded-xl bg-midnight-850 border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Solar Altitude (α)</div>
                <div className="text-lg font-mono font-bold text-white mt-0.5">
                  {solar.altitudeDeg.toFixed(1)}°
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-midnight-850 border border-white/5">
                <div className="text-[10px] text-slate-400 uppercase font-mono">Solar Azimuth (γ)</div>
                <div className="text-lg font-mono font-bold text-white mt-0.5">
                  {solar.azimuthDeg.toFixed(1)}°
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-side Shading Comparison Toggle */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Facade Performance Comparison</span>
              <RotateCw className="w-3.5 h-3.5 text-slate-400" />
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCompareMode('without_shading')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  compareMode === 'without_shading'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-midnight-850 text-slate-400 border-white/5 hover:text-white'
                }`}
              >
                Without Shading (Box)
              </button>

              <button
                onClick={() => setCompareMode('with_shading')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  compareMode === 'with_shading'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-glow-green'
                    : 'bg-midnight-850 text-slate-400 border-white/5 hover:text-white'
                }`}
              >
                With AANGAN Facade
              </button>
            </div>
          </div>
        </div>

        {/* Right Adaptive Facade Family & Thermal Heat-Map Display */}
        <div className="lg:col-span-7 space-y-4">
          {/* Key Simulation KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Heat Gain Avoided */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400">Solar Heat Gain Avoided</span>
                <ThermometerSnowflake className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-mono font-bold text-emerald-400 mt-2">
                {compareMode === 'with_shading' ? `${solar.heatAvoidedPercent}%` : '0%'}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {compareMode === 'with_shading'
                  ? 'Terracotta louvres reflect up to 68% direct insolation.'
                  : 'Full solar radiation penetrates standard glazing unprotected.'}
              </p>
            </div>

            {/* Direct Sun Hours on Courtyard */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400">Courtyard Direct Sun Hours</span>
                <Sun className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-mono font-bold text-amber-300 mt-2">
                {solar.courtyardDirectSunHours} hrs
              </div>
              <p className="text-xs text-slate-400 mt-1">
                35m tall 16x16m courtyard naturally self-shades floor during peak afternoon heat.
              </p>
            </div>
          </div>

          {/* 4 Elevations Adaptive Response Detail Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h4 className="text-sm font-semibold text-white">
                  1 Parametric Family, 4 Orientation Responses
                </h4>
                <p className="text-xs text-slate-400">
                  Select a facade face to inspect live louvre geometry and incident solar load.
                </p>
              </div>

              {/* Face Selection Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-midnight-950 border border-white/5">
                {(['south', 'east', 'west', 'north'] as const).map((face) => (
                  <button
                    key={face}
                    onClick={() => setSelectedFace(face)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                      selectedFace === face
                        ? 'bg-terracotta text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {face}
                  </button>
                ))}
              </div>
            </div>

            {/* Facade Face Specific Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-midnight-800/80 border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Incident Radiation</div>
                <div className="text-xl font-mono font-bold text-white">
                  {solar.faceIncidentRadiation[selectedFace]} <span className="text-xs font-normal text-slate-400">W/m²</span>
                </div>
                <div className="text-[11px] text-amber-300">
                  {solar.faceIncidentRadiation[selectedFace] > 400 ? 'High Solar Exposure' : 'Diffused Lighting'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-midnight-800/80 border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Adaptive Geometry</div>
                <div className="text-sm font-bold text-terracotta-light">
                  {selectedFace === 'south'
                    ? 'Horizontal Deep Shelves'
                    : selectedFace === 'east'
                    ? '35° Angled Vertical Fins'
                    : selectedFace === 'west'
                    ? 'Deep 600mm West Fins'
                    : 'Slender Vertical Fins'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {selectedFace === 'south'
                    ? `${facadeParams.louvreDepthMm}mm depth louvres`
                    : `${facadeParams.finDepthMm}mm fin depth`}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-midnight-800/80 border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Daylight Quality</div>
                <div className="text-sm font-bold text-emerald-400">
                  {selectedFace === 'north' ? 'Glare-Free North Sky' : 'Filtered Diffuse Light'}
                </div>
                <div className="text-[11px] text-slate-400">Terracotta Jaali screen buffer</div>
              </div>
            </div>

            {/* Animated Heatmap Overlay Simulator Bar */}
            <div className="p-4 rounded-xl bg-midnight-950 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Facade Surface Temperature Heat-Map</span>
                </span>
                <span className="font-mono text-xs text-emerald-400 font-medium">
                  {compareMode === 'with_shading' ? 'Comfortable (28°C - 31°C)' : 'Extreme Heat (43°C - 48°C)'}
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 bottom-0 w-2 bg-white shadow-lg"
                  animate={{
                    left: compareMode === 'with_shading' ? '25%' : '88%',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Cool Shaded (24°C)</span>
                <span>Ambient (34°C)</span>
                <span>Glazing Solar Burn (50°C)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
