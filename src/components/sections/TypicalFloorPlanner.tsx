import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  Layers,
  Wind,
  Sun,
  EyeOff,
  Trees,
  Check,
  Building,
  Sparkles,
  Maximize2,
  Copy,
} from 'lucide-react';

interface HomeUnit {
  id: string;
  code: string;
  type: '2BHK' | '3BHK';
  carpetAreaM2: number;
  orientation: string;
  x: number;
  y: number;
  width: number;
  height: number;
  features: string[];
}

const TYPICAL_HOMES: HomeUnit[] = [
  // Top Row (North-facing)
  {
    id: 'unit-1',
    code: 'Unit 201 (Corner)',
    type: '3BHK',
    carpetAreaM2: 138,
    orientation: 'North-East Corner',
    x: 40,
    y: 40,
    width: 140,
    height: 120,
    features: ['3 Bedrooms (2 Courtyard-Facing)', 'Wrap-around Balcony', 'Dual-aspect Cross Ventilation', 'Kitchen Utility Balcony'],
  },
  {
    id: 'unit-2',
    code: 'Unit 202 (Mid)',
    type: '2BHK',
    carpetAreaM2: 104,
    orientation: 'North Center',
    x: 190,
    y: 40,
    width: 160,
    height: 120,
    features: ['2 Bedrooms', 'Direct Courtyard Garden Vistas', 'Deep Balcony Shading', 'Natural Cross Draft'],
  },
  {
    id: 'unit-3',
    code: 'Unit 203 (Corner)',
    type: '3BHK',
    carpetAreaM2: 138,
    orientation: 'North-West Corner',
    x: 360,
    y: 40,
    width: 140,
    height: 120,
    features: ['3 Bedrooms', 'Terracotta Jaali Balcony Screen', 'West Solar Shading Fins', 'Ensuite Master Bath'],
  },

  // Flank Units
  {
    id: 'unit-4',
    code: 'Unit 204 (Flank)',
    type: '2BHK',
    carpetAreaM2: 98,
    orientation: 'East Flank',
    x: 40,
    y: 170,
    width: 120,
    height: 120,
    features: ['2 Bedrooms', 'Morning Sun Aspect', 'Direct Shear Core Access', 'Acoustic Wall Buffer'],
  },
  {
    id: 'unit-5',
    code: 'Unit 205 (Flank)',
    type: '2BHK',
    carpetAreaM2: 98,
    orientation: 'West Flank',
    x: 380,
    y: 170,
    width: 120,
    height: 120,
    features: ['2 Bedrooms', 'Deep Western Fins', 'Courtyard Corridor Entry', 'Recessed Glazing'],
  },

  // Bottom Row (South-facing)
  {
    id: 'unit-6',
    code: 'Unit 206 (Corner)',
    type: '3BHK',
    carpetAreaM2: 138,
    orientation: 'South-East Corner',
    x: 40,
    y: 300,
    width: 140,
    height: 120,
    features: ['3 Bedrooms', 'South Overhang Louvres', 'Courtyard Facing Living Room', 'Daylight Cones on 2 Faces'],
  },
  {
    id: 'unit-7',
    code: 'Unit 207 (Mid)',
    type: '2BHK',
    carpetAreaM2: 104,
    orientation: 'South Center',
    x: 190,
    y: 300,
    width: 160,
    height: 120,
    features: ['2 Bedrooms', 'Winter Sun Ingress', 'Horizontal Shading Fins', 'Continuous Planter Box'],
  },
  {
    id: 'unit-8',
    code: 'Unit 208 (Corner)',
    type: '3BHK',
    carpetAreaM2: 138,
    orientation: 'South-West Corner',
    x: 360,
    y: 300,
    width: 140,
    height: 120,
    features: ['3 Bedrooms', 'Dual Shear Core Access', 'Integrated Balcony Planters', 'Thermal Buffer Corridor'],
  },
];

export const TypicalFloorPlanner: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<HomeUnit>(TYPICAL_HOMES[0]);
  const [activeOverlay, setActiveOverlay] = useState<'ventilation' | 'daylight' | 'privacy' | 'views'>('ventilation');
  const [isStackingAnimated, setIsStackingAnimated] = useState(false);

  const handleStackAnimation = () => {
    setIsStackingAnimated(true);
    setTimeout(() => setIsStackingAnimated(false), 2400);
  };

  return (
    <section id="floor-plan" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-900 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-terracotta tracking-wider uppercase">
                Section 05 // Architectural Floor Layout
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Typical Floor & Home Planner
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              1,024 m² standard floor plate (L2-L9): 8 dual-aspect homes arranged around the 16x16m central courtyard. 
              Click any home to inspect room layouts and toggle engineering overlays.
            </p>
          </div>

          {/* Stacking Animation Trigger */}
          <button
            onClick={handleStackAnimation}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-terracotta to-terracotta-dark text-white font-medium text-xs shadow-glow-terracotta hover:brightness-110 active:scale-95 transition-all"
          >
            <Copy className="w-4 h-4" />
            <span>Copy to L2–L9 (Stack 8 Floors)</span>
          </button>
        </div>
      </div>

      {/* Main Floor Planner Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive SVG Floor Plan */}
        <div className="lg:col-span-8 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            {/* Overlay Selector Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <span className="text-xs font-mono uppercase text-slate-400">Engineering Overlays</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'ventilation', label: 'Ventilation Vectors', icon: Wind, color: 'text-sky-400' },
                  { id: 'daylight', label: 'Daylight Cones', icon: Sun, color: 'text-amber-400' },
                  { id: 'privacy', label: 'Privacy Sightlines', icon: EyeOff, color: 'text-purple-400' },
                  { id: 'views', label: 'Courtyard Vistas', icon: Trees, color: 'text-emerald-400' },
                ].map((ov) => {
                  const Icon = ov.icon;
                  return (
                    <button
                      key={ov.id}
                      onClick={() => setActiveOverlay(ov.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        activeOverlay === ov.id
                          ? 'bg-midnight-800 text-white font-bold border border-white/20 shadow-sm'
                          : 'bg-midnight-950/60 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${ov.color}`} />
                      <span>{ov.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SVG Architectural Floor Plan Canvas */}
            <div className="relative w-full aspect-[540/460] rounded-xl overflow-hidden bg-midnight-950 border border-white/5 p-2 flex items-center justify-center">
              {/* Animated 8-floor Stacking Overlay Notification */}
              <AnimatePresence>
                {isStackingAnimated && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="absolute inset-0 z-30 bg-midnight-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-terracotta/20 border border-terracotta flex items-center justify-center text-terracotta mb-4 shadow-glow-terracotta animate-pulse">
                      <Layers className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white">
                      Revit Master Module Arrayed (L2 to L9)
                    </h3>
                    <p className="text-xs text-slate-300 max-w-sm mt-1">
                      1 single modeled floor replicates 8 times to yield all 64 dual-aspect homes. 
                      Saving ~14 hours of modeling time in the SIH sprint!
                    </p>
                    <div className="mt-4 font-mono text-xs text-emerald-400 font-bold">
                      ✓ 64 Homes Generated • 8,192 m² Residential Complete
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <svg viewBox="0 0 540 460" className="w-full h-full select-none">
                {/* 1. Outer Perimeter Footprint 40m x 32m (scaled to 500 x 400) */}
                <rect
                  x="20"
                  y="20"
                  width="500"
                  height="420"
                  rx="6"
                  className="fill-midnight-900 stroke-slate-700"
                  strokeWidth="2"
                />

                {/* Grid guidelines (8m bays) */}
                <line x1="120" y1="20" x2="120" y2="440" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="220" y1="20" x2="220" y2="440" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="320" y1="20" x2="320" y2="440" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="420" y1="20" x2="420" y2="440" stroke="#1E293B" strokeDasharray="3 3" />

                {/* 2. Central Courtyard Void 16m x 16m */}
                <rect
                  x="170"
                  y="150"
                  width="200"
                  height="160"
                  rx="4"
                  className="fill-midnight-950 stroke-emerald-500/80"
                  strokeWidth="2.5"
                />
                <text
                  x="270"
                  y="225"
                  textAnchor="middle"
                  fill="#10B981"
                  fontSize="12"
                  fontFamily="JetBrains Mono"
                  fontWeight="bold"
                >
                  16x16m Courtyard Void
                </text>
                <text
                  x="270"
                  y="245"
                  textAnchor="middle"
                  fill="#6EE7B7"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                >
                  (Thermal Stack Chimney)
                </text>

                {/* Central Biophilic Trees */}
                <circle cx="270" cy="180" r="14" fill="#2E7D32" opacity="0.6" />
                <circle cx="240" cy="275" r="10" fill="#2E7D32" opacity="0.6" />
                <circle cx="300" cy="275" r="10" fill="#2E7D32" opacity="0.6" />

                {/* Perimeter Walkway Ring Corridor */}
                <rect
                  x="150"
                  y="130"
                  width="240"
                  height="200"
                  rx="4"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />

                {/* 3. Twin Shear Cores (East and West) */}
                {/* West Core */}
                <rect x="25" y="180" width="30" height="100" fill="#475569" stroke="#94A3B8" strokeWidth="1.5" />
                <text x="40" y="235" textAnchor="middle" fill="#CBD5E1" fontSize="8" fontFamily="JetBrains Mono" transform="rotate(-90 40 235)">
                  WEST CORE (LIFT+FIRE STAIR)
                </text>
                {/* East Core */}
                <rect x="485" y="180" width="30" height="100" fill="#475569" stroke="#94A3B8" strokeWidth="1.5" />
                <text x="500" y="235" textAnchor="middle" fill="#CBD5E1" fontSize="8" fontFamily="JetBrains Mono" transform="rotate(90 500 235)">
                  EAST CORE (LIFT+FIRE STAIR)
                </text>

                {/* 4. Units (Interactive Clickable Rectangles) */}
                {TYPICAL_HOMES.map((unit) => {
                  const isSelected = selectedUnit.id === unit.id;
                  return (
                    <g
                      key={unit.id}
                      onClick={() => setSelectedUnit(unit)}
                      className="cursor-pointer group"
                    >
                      <rect
                        x={unit.x}
                        y={unit.y}
                        width={unit.width}
                        height={unit.height}
                        rx="4"
                        className={`transition-all duration-200 ${
                          isSelected
                            ? 'fill-terracotta/30 stroke-terracotta'
                            : 'fill-midnight-800/80 stroke-white/10 hover:fill-midnight-700/80 hover:stroke-terracotta/50'
                        }`}
                        strokeWidth={isSelected ? '2' : '1'}
                      />
                      <text
                        x={unit.x + unit.width / 2}
                        y={unit.y + 24}
                        textAnchor="middle"
                        fill={isSelected ? '#FFA733' : '#F8FAFC'}
                        fontSize="11"
                        fontFamily="Inter"
                        fontWeight="600"
                      >
                        {unit.code}
                      </text>
                      <text
                        x={unit.x + unit.width / 2}
                        y={unit.y + 40}
                        textAnchor="middle"
                        fill="#94A3B8"
                        fontSize="9"
                        fontFamily="JetBrains Mono"
                      >
                        {unit.type} • {unit.carpetAreaM2} m²
                      </text>
                    </g>
                  );
                })}

                {/* 5. ACTIVE ENGINEERING OVERLAYS */}
                {/* Ventilation Vectors: Streamlines into courtyard */}
                {activeOverlay === 'ventilation' && (
                  <g className="stroke-sky-400 stroke-2" strokeDasharray="4 2">
                    {/* Top inward breeze */}
                    <line x1="110" y1="25" x2="110" y2="150" markerEnd="url(#arrow)" />
                    <line x1="270" y1="25" x2="270" y2="150" markerEnd="url(#arrow)" />
                    <line x1="430" y1="25" x2="430" y2="150" markerEnd="url(#arrow)" />
                    {/* Bottom inward breeze */}
                    <line x1="110" y1="435" x2="110" y2="310" markerEnd="url(#arrow)" />
                    <line x1="270" y1="435" x2="270" y2="310" markerEnd="url(#arrow)" />
                    <line x1="430" y1="435" x2="430" y2="310" markerEnd="url(#arrow)" />
                  </g>
                )}

                {/* Daylight Cones: Angular penetration cones */}
                {activeOverlay === 'daylight' && (
                  <g className="fill-amber-400/20 stroke-amber-400/50">
                    <polygon points="170,150 270,70 370,150 270,190" />
                    <polygon points="170,310 270,390 370,310 270,270" />
                  </g>
                )}

                {/* Privacy Sightlines: Shield cones */}
                {activeOverlay === 'privacy' && (
                  <g className="stroke-purple-400 stroke-1" strokeDasharray="3 3">
                    <line x1="170" y1="160" x2="370" y2="300" />
                    <line x1="370" y1="160" x2="170" y2="300" />
                    <rect x="250" y="210" width="40" height="40" rx="20" fill="rgba(107,63,181,0.2)" stroke="#9575CD" />
                  </g>
                )}

                {/* Courtyard Views: Green sightline cones */}
                {activeOverlay === 'views' && (
                  <g className="stroke-emerald-400 stroke-2">
                    <line x1="180" y1="160" x2="260" y2="210" strokeDasharray="2 2" />
                    <line x1="360" y1="160" x2="280" y2="210" strokeDasharray="2 2" />
                    <line x1="180" y1="300" x2="260" y2="250" strokeDasharray="2 2" />
                    <line x1="360" y1="300" x2="280" y2="250" strokeDasharray="2 2" />
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Selected Home Detail Card */}
        <div className="lg:col-span-4 space-y-4">
          <motion.div
            key={selectedUnit.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-terracotta/20 text-terracotta-light border border-terracotta/30">
                  {selectedUnit.type} Floor Plan
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-1">
                  {selectedUnit.code}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">{selectedUnit.orientation}</div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-mono font-bold text-amber-300">
                  {selectedUnit.carpetAreaM2}
                </div>
                <div className="text-[10px] font-mono text-slate-400">m² Carpet Area</div>
              </div>
            </div>

            {/* Room Specifications & Design Intent */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-slate-400">Architectural Innovations</div>
              <div className="space-y-2">
                {selectedUnit.features.map((feat, idx) => (
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

            {/* Acoustic & Biophilic Callout */}
            <div className="p-3.5 rounded-xl bg-midnight-950 border border-white/5 space-y-1">
              <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                <Trees className="w-3.5 h-3.5" />
                <span>Courtyard Bedroom Orientation</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Bedrooms face the tranquil 16x16m inner garden rather than the noisy outer road, 
                reducing ambient traffic noise by ~16 dB.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
