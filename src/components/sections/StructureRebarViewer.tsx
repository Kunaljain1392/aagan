import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { REBAR_DETAILS } from '../../data/project';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  Layers,
  ShieldCheck,
  Eye,
  EyeOff,
  GitBranch,
  ArrowDown,
  Activity,
  Check,
  FileText,
} from 'lucide-react';

export const StructureRebarViewer: React.FC = () => {
  const {
    showArchitectureWithStructure,
    setShowArchitectureWithStructure,
    selectedStructuralMember,
    setSelectedStructuralMember,
    activeLoadPath,
    setActiveLoadPath,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'rebar_2d' | 'load_path'>('rebar_2d');

  const memberData =
    REBAR_DETAILS.find((m) => m.element === selectedStructuralMember) ||
    REBAR_DETAILS[0];

  return (
    <section id="structure" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-900 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-structural-light tracking-wider uppercase">
                Section 07 // Structural Engineering
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Structure & Rebar Viewer
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Reinforced concrete frame on the 8x8m grid. Click any structural member to review 
              IS 456:2000 and IS 13920:2016 ductile detailing, seismic stirrup spacing, and load-path animations.
            </p>
          </div>

          {/* Toggle Architecture / Skeleton Only */}
          <button
            onClick={() => setShowArchitectureWithStructure(!showArchitectureWithStructure)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-medium transition-all ${
              !showArchitectureWithStructure
                ? 'bg-structural/20 border-structural text-structural-light shadow-glow-teal'
                : 'bg-midnight-800 text-slate-300 border-white/10 hover:text-white'
            }`}
          >
            {showArchitectureWithStructure ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showArchitectureWithStructure ? 'Hide Architectural Envelope' : 'Isolated RC Skeleton Only'}</span>
          </button>
        </div>
      </div>

      {/* Main Structural Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Member Selector & Specification Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Member Picker Buttons */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <span className="text-xs font-mono uppercase text-slate-400">Select Structural Component</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'beam', label: 'Beams (300x550)' },
                { id: 'column', label: 'Columns (600/450)' },
                { id: 'slab', label: 'Slab (175mm)' },
                { id: 'shear_wall', label: 'Shear Cores' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setSelectedStructuralMember(btn.id as any)}
                  className={`py-2 px-2 rounded-xl text-center text-xs font-mono transition-all border ${
                    selectedStructuralMember === btn.id
                      ? 'bg-structural text-white font-bold border-structural-light shadow-glow-teal'
                      : 'bg-midnight-850/80 text-slate-300 border-white/5 hover:text-white'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Member Specification Detail Panel */}
          <motion.div
            key={memberData.element}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4"
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-structural/20 text-purple-300 border border-structural/30">
                  {memberData.codeRef}
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-1">
                  {memberData.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-300 font-bold">
                {memberData.dimensionMm}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-midnight-850 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Concrete Grade</span>
                <div className="font-mono font-bold text-white mt-0.5">{memberData.concreteGrade}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-midnight-850 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Steel Grade</span>
                <div className="font-mono font-bold text-white mt-0.5">{memberData.steelGrade}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-mono text-slate-400">Main Reinforcement:</span>
                <div className="p-2 rounded-lg bg-midnight-850/80 text-slate-200 font-mono mt-1">
                  {memberData.mainRebar}
                </div>
              </div>

              <div>
                <span className="font-mono text-slate-400">Shear Stirrups / Confining:</span>
                <div className="p-2 rounded-lg bg-midnight-850/80 text-slate-200 font-mono mt-1">
                  {memberData.shearRebar}
                </div>
              </div>

              <div>
                <span className="font-mono text-slate-400">Clear Cover:</span>
                <span className="ml-2 font-mono font-bold text-emerald-400">{memberData.coverMm} mm</span>
              </div>
            </div>

            {/* Ductile Code Notes */}
            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <FileText className="w-3 h-3 text-amber-400" />
                <span>IS 13920:2016 Seismic Compliance Notes</span>
              </span>
              <ul className="space-y-1 text-[11px] text-slate-300">
                {memberData.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-[10px] font-mono text-slate-400 italic">
              * Typical engineering detail for hackathon demo. Authoritative fabrication drawings produced in Autodesk Revit.
            </div>
          </motion.div>
        </div>

        {/* Right Column: Animated 2D Beam Cross-Section SVG & Load-Path Animation */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            {/* View Switcher: 2D Rebar Section vs Load Path */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('rebar_2d')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'rebar_2d'
                      ? 'bg-midnight-800 text-white font-bold border border-white/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  2D Beam Cross-Section (IS 13920)
                </button>
                <button
                  onClick={() => setActiveTab('load_path')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'load_path'
                      ? 'bg-midnight-800 text-white font-bold border border-white/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  IS 875 / 1893 Load-Path Flow
                </button>
              </div>

              {activeTab === 'load_path' && (
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    onClick={() => setActiveLoadPath(activeLoadPath === 'gravity' ? 'none' : 'gravity')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono ${
                      activeLoadPath === 'gravity' ? 'bg-amber-500 text-black font-bold' : 'bg-midnight-800 text-slate-300'
                    }`}
                  >
                    Gravity Load
                  </button>
                  <button
                    onClick={() => setActiveLoadPath(activeLoadPath === 'lateral' ? 'none' : 'lateral')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono ${
                      activeLoadPath === 'lateral' ? 'bg-rose-500 text-white font-bold' : 'bg-midnight-800 text-slate-300'
                    }`}
                  >
                    Lateral Seismic
                  </button>
                </div>
              )}
            </div>

            {/* TAB 1: Animated 2D Beam Cross-Section SVG */}
            {activeTab === 'rebar_2d' && (
              <div className="h-96 rounded-xl bg-midnight-950 border border-white/5 p-4 flex items-center justify-center relative">
                <svg viewBox="0 0 400 360" className="w-full h-full select-none">
                  {/* Concrete Beam Boundary 300 x 550 (scaled to 200 x 300) */}
                  <rect
                    x="100"
                    y="30"
                    width="200"
                    height="280"
                    rx="4"
                    fill="#1E293B"
                    stroke="#475569"
                    strokeWidth="3"
                  />

                  {/* Dimension Annotations */}
                  <text x="200" y="20" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">
                    300 mm Beam Width
                  </text>
                  <text x="75" y="170" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono" transform="rotate(-90 75 170)">
                    550 mm Overall Depth
                  </text>

                  {/* 2-Legged 8mm Stirrup Outer Loop (with 30mm clear cover) */}
                  <rect
                    x="120"
                    y="50"
                    width="160"
                    height="240"
                    rx="6"
                    fill="none"
                    stroke="#E0801F"
                    strokeWidth="3.5"
                  />

                  {/* 135° Seismic Hook at Top Right Corner (IS 13920 Cl 6.2.2) */}
                  <path
                    d="M 270 60 L 280 50 L 260 70"
                    fill="none"
                    stroke="#E0801F"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <text x="290" y="45" fill="#FFA733" fontSize="9" fontFamily="JetBrains Mono">
                    135° Seismic Hook (10d)
                  </text>

                  {/* Top Bars: 3-20T Main Bars */}
                  <circle cx="135" cy="65" r="9" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
                  <circle cx="200" cy="65" r="9" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
                  <circle cx="265" cy="65" r="9" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
                  <text x="200" y="90" textAnchor="middle" fill="#7DD3FC" fontSize="9" fontFamily="JetBrains Mono">
                    Top: 3-20T (Fe 500D)
                  </text>

                  {/* Bottom Bars: 3-25T Tension Bars */}
                  <circle cx="135" cy="275" r="11" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
                  <circle cx="200" cy="275" r="11" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
                  <circle cx="265" cy="275" r="11" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
                  <text x="200" y="255" textAnchor="middle" fill="#FDA4AF" fontSize="9" fontFamily="JetBrains Mono">
                    Bottom: 3-25T High Yield Bars
                  </text>

                  {/* Clear Cover Dimension lines */}
                  <line x1="100" y1="325" x2="120" y2="325" stroke="#10B981" strokeWidth="2" />
                  <text x="110" y="342" textAnchor="middle" fill="#34D399" fontSize="8" fontFamily="JetBrains Mono">
                    30mm Cover
                  </text>
                </svg>
              </div>
            )}

            {/* TAB 2: IS 875 / IS 1893 Load-Path Schematic */}
            {activeTab === 'load_path' && (
              <div className="h-96 rounded-xl bg-midnight-950 border border-white/5 p-4 flex flex-col justify-between">
                <div className="text-xs font-mono text-slate-300">
                  {activeLoadPath === 'gravity'
                    ? 'Gravity Load Path: Slab (DL+LL) → Framing Beams → 8x8m Grid Columns → Raft Foundation'
                    : activeLoadPath === 'lateral'
                    ? 'Seismic Zone IV Lateral Path: Facade Pressure → Rigid Floor Diaphragm → Twin 250mm Shear Cores (82% Shear) → Soil Subgrade'
                    : 'Select Gravity or Lateral load path above to animate structural stress flow.'}
                </div>

                {/* Animated Stress Arrows */}
                <div className="relative flex-1 flex items-center justify-center">
                  <div className="space-y-4 w-full max-w-md">
                    <motion.div
                      animate={{
                        y: activeLoadPath === 'gravity' ? [0, 8, 0] : 0,
                        x: activeLoadPath === 'lateral' ? [-6, 6, -6] : 0,
                      }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="p-3 rounded-xl bg-midnight-800 border border-white/10 text-center"
                    >
                      <div className="text-xs font-mono font-bold text-white">175mm RC Floor Slab Diaphragm</div>
                      <div className="text-[10px] text-slate-400">3.0 kN/m² Live + 1.5 kN/m² Finishes</div>
                    </motion.div>

                    <div className="flex justify-center text-slate-400">
                      <ArrowDown className={`w-5 h-5 ${activeLoadPath === 'gravity' ? 'text-amber-400 animate-bounce' : ''}`} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-midnight-800 border border-white/10 text-center">
                        <div className="text-xs font-mono font-bold text-terracotta">300x550 Framing Beams</div>
                        <div className="text-[10px] text-slate-400">Flexure & Shear Transfer</div>
                      </div>

                      <div className="p-3 rounded-xl bg-midnight-800 border border-white/10 text-center">
                        <div className="text-xs font-mono font-bold text-purple-400">Twin Shear Cores</div>
                        <div className="text-[10px] text-slate-400">Resists 82% Base Shear</div>
                      </div>
                    </div>

                    <div className="flex justify-center text-slate-400">
                      <ArrowDown className={`w-5 h-5 ${activeLoadPath === 'gravity' ? 'text-amber-400 animate-bounce' : ''}`} />
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center">
                      <div className="text-xs font-mono font-bold text-emerald-300">Raft Foundation & Soil Subgrade</div>
                      <div className="text-[10px] text-slate-400">Safe Bearing Capacity 250 kN/m²</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
