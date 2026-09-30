import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECT_CONFIG } from '../../data/project';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  Compass,
  Car,
  Zap,
  Flame,
  Droplets,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const SitePlotView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'site' | 'basement'>('site');

  return (
    <section id="site-plot" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-950 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-commercial-light tracking-wider uppercase">
                Section 10 // Master Plan & Circulation
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Site & Plot View (60 x 60 m Corner Plot)
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              North & East primary road access. 40x32m footprint centered with 10–14m continuous 
              fire-tender perimeter access. Toggle basement view to inspect 20.8% EV-ready infrastructure.
            </p>
          </div>

          {/* Toggle View: Ground Site vs Basement Parking */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-midnight-800 border border-white/10">
            <button
              onClick={() => setViewMode('site')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'site'
                  ? 'bg-commercial text-white font-bold shadow-glow-teal'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Surface Master Plan
            </button>
            <button
              onClick={() => setViewMode('basement')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'basement'
                  ? 'bg-emerald-500 text-midnight-950 font-bold shadow-glow-green'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Basement Parking (20% EV)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive SVG Plan */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-2">
              <span>{viewMode === 'site' ? 'SURFACE MASTER PLAN (GROUND LEVEL 0.0m)' : 'BASEMENT PARKING LEVEL (-3.6m)'}</span>
              <span className="text-amber-400">Scale: 1:200 (60m x 60m Site)</span>
            </div>

            {/* Plan SVG */}
            <div className="relative w-full aspect-[540/480] rounded-xl overflow-hidden bg-midnight-950 border border-white/5 p-2 flex items-center justify-center">
              <svg viewBox="0 0 540 480" className="w-full h-full select-none">
                {/* 1. Plot Boundary 60x60m (scaled to 460 x 440) */}
                <rect
                  x="40"
                  y="20"
                  width="460"
                  height="440"
                  fill="#0B1528"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                />

                {/* Road Labels (North & East corner plot) */}
                <text x="270" y="14" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">
                  PRIMARY ACCESS ROAD (NORTH 24m WIDE)
                </text>
                <text x="525" y="240" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono" transform="rotate(90 525 240)">
                  SECONDARY ROAD (EAST 18m WIDE)
                </text>

                {/* 2. Fire-Tender Perimeter Road (10m - 14m setback) */}
                <rect
                  x="55"
                  y="35"
                  width="430"
                  height="410"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  rx="15"
                />
                <text x="75" y="55" fill="#F59E0B" fontSize="9" fontFamily="JetBrains Mono">
                  NBC 10-14m Fire-Tender Driveway (Turning Radius 12m)
                </text>

                {/* 3. Surface Master Plan Elements */}
                {viewMode === 'site' && (
                  <g>
                    {/* Building Footprint (40m x 32m) */}
                    <rect
                      x="115"
                      y="110"
                      width="310"
                      height="260"
                      rx="4"
                      fill="#13223E"
                      stroke="#E0801F"
                      strokeWidth="2.5"
                    />

                    {/* Central Courtyard Void 16m x 16m */}
                    <rect
                      x="207"
                      y="175"
                      width="126"
                      height="130"
                      rx="3"
                      fill="#050B18"
                      stroke="#10B981"
                      strokeWidth="2"
                    />
                    <text x="270" y="235" textAnchor="middle" fill="#34D399" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                      16x16m Courtyard
                    </text>
                    <text x="270" y="252" textAnchor="middle" fill="#6EE7B7" fontSize="8" fontFamily="JetBrains Mono">
                      (Water Pool + Trees)
                    </text>

                    {/* Corner Plaza at North-East Entry */}
                    <polygon
                      points="370,35 485,35 485,150 425,110"
                      fill="rgba(15, 138, 122, 0.25)"
                      stroke="#0F8A7A"
                      strokeWidth="1.5"
                    />
                    <text x="440" y="70" textAnchor="middle" fill="#2DD4BF" fontSize="9" fontFamily="JetBrains Mono">
                      Civic Corner Plaza
                    </text>

                    {/* Basement Ramp (South-West corner, 1:8 slope) */}
                    <rect x="55" y="330" width="45" height="110" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
                    <text x="77" y="385" textAnchor="middle" fill="#E2E8F0" fontSize="8" fontFamily="JetBrains Mono" transform="rotate(-90 77 385)">
                      RAMP DOWN (1:8)
                    </text>
                  </g>
                )}

                {/* 4. Basement Parking Elements */}
                {viewMode === 'basement' && (
                  <g>
                    {/* Full Basement Footprint */}
                    <rect x="80" y="70" width="380" height="340" rx="4" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                    <text x="270" y="90" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                      BASEMENT PARKING LEVEL (-3.60m)
                    </text>

                    {/* Central Core Shear Walls & Lift */}
                    <rect x="230" y="200" width="80" height="80" fill="#0F172A" stroke="#475569" strokeWidth="2" />
                    <text x="270" y="245" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">
                      LIFT & STAIR CORE
                    </text>

                    {/* Regular Parking Bays (Grey) */}
                    {[-140, -100, -60, 60, 100, 140].map((xOff, i) => (
                      <g key={i}>
                        <rect x={260 + xOff} y="110" width="28" height="50" fill="#334155" stroke="#475569" strokeWidth="1" />
                        <rect x={260 + xOff} y="340" width="28" height="50" fill="#334155" stroke="#475569" strokeWidth="1" />
                      </g>
                    ))}

                    {/* 15 EV-Ready Charging Bays (Highlighted Green/Teal) */}
                    {[-140, -100, -60, -20, 20].map((xOff, i) => (
                      <g key={`ev-${i}`}>
                        <rect
                          x={260 + xOff}
                          y="180"
                          width="28"
                          height="50"
                          fill="rgba(16, 185, 129, 0.3)"
                          stroke="#10B981"
                          strokeWidth="2"
                        />
                        <circle cx={274 + xOff} cy="205" r="5" fill="#34D399" />
                        <text x={274 + xOff} y="222" textAnchor="middle" fill="#A7F3D0" fontSize="7" fontFamily="JetBrains Mono">
                          EV
                        </text>
                      </g>
                    ))}

                    {/* Rainwater Harvesting Buffer Tank (180 kL) */}
                    <rect x="90" y="270" width="60" height="80" fill="rgba(2, 132, 199, 0.3)" stroke="#0284C7" strokeWidth="2" />
                    <text x="120" y="315" textAnchor="middle" fill="#38BDF8" fontSize="8" fontFamily="JetBrains Mono">
                      180 kL RWH TANK
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Site Key Specifications */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Site & Zoning Metrics</span>
              <Compass className="w-4 h-4 text-commercial-light" />
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-midnight-850 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Total Plot Dimensions:</span>
                <span className="font-mono font-bold text-white">60,000 x 60,000 mm (3,600 m²)</span>
              </div>

              <div className="p-3 rounded-xl bg-midnight-850 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Building Footprint:</span>
                <span className="font-mono font-bold text-terracotta-light">40,000 x 32,000 mm (1,280 m²)</span>
              </div>

              <div className="p-3 rounded-xl bg-midnight-850 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Ground Coverage:</span>
                <span className="font-mono font-bold text-amber-300">35.5% (&lt; 40% Bye-Laws Limit)</span>
              </div>

              <div className="p-3 rounded-xl bg-midnight-850 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Courtyard Void Area:</span>
                <span className="font-mono font-bold text-emerald-400">16,000 x 16,000 mm (256 m²)</span>
              </div>

              <div className="p-3 rounded-xl bg-midnight-850 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Setbacks (Fire Road):</span>
                <span className="font-mono font-bold text-sky-300">10m to 14m all around</span>
              </div>
            </div>

            {/* EV Charging Mandate Callout */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
              <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>20.8% EV-Ready Bays (15 / 72 Slots)</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Exceeds statutory 20% mandate. Connected to smart load management powered by 
                the 85 kWp rooftop solar PV array to prevent grid surges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
