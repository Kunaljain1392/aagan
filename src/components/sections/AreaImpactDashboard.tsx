import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PROJECT_CONFIG } from '../../data/project';
import { calculateRetv } from '../../sim/retv';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  PieChart as PieIcon,
  Calculator,
  Leaf,
  Users,
  Building2,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Sliders,
} from 'lucide-react';

export const AreaImpactDashboard: React.FC = () => {
  const [editablePlotM2, setEditablePlotM2] = useState<number>(3600); // 60x60m baseline

  // RETV interactive sliders
  const [wwr, setWwr] = useState<number>(28);
  const [glazingU, setGlazingU] = useState<number>(2.4);
  const [shgc, setShgc] = useState<number>(0.28);
  const [hasFins, setHasFins] = useState<boolean>(true);

  // Calculate dynamic FAR
  const totalBua = PROJECT_CONFIG.geometry.builtUpAreaAboveGroundM2;
  const calculatedFar = Math.round((totalBua / editablePlotM2) * 100) / 100;

  // Calculate RETV
  const retv = calculateRetv({
    wwrPercent: wwr,
    uValueGlazing: glazingU,
    uValueWall: 0.45,
    shgcGlazing: shgc,
    hasAanganFins: hasFins,
  });

  const donutData = [
    { name: 'Residential (L2-L9)', value: 8192, color: '#E0801F', percent: '80%' },
    { name: 'Commercial (Ground + L1)', value: 2048, color: '#0F8A7A', percent: '20%' },
  ];

  return (
    <section id="dashboard" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-950 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">
                Section 08 // Urban Density & Impact
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Area, FAR & Impact Dashboard
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              10,240 m² above-ground built-up area balanced 80/20 between homes and urban commerce. 
              Live FAR calculator and Eco-Niwas Samhita RETV thermal performance estimator.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300">
              FAR: {calculatedFar} (Plot: {editablePlotM2} m²)
            </span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Donut & FAR Calculator */}
        <div className="lg:col-span-5 space-y-4">
          {/* Donut Chart Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-terracotta" />
                <span>Area Distribution (10,240 m² BUA)</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">80% Resi / 20% Comm</span>
            </div>

            <div className="h-56 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0B1528',
                      borderColor: '#1C3156',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-mono font-bold text-white">10,240</span>
                <span className="text-[10px] font-mono text-slate-400">m² Above Ground</span>
              </div>
            </div>

            {/* Legend & Breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-midnight-850 border border-white/5 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E0801F]" />
                  <span className="font-semibold text-slate-200">Residential</span>
                </div>
                <div className="font-mono text-amber-300 font-bold text-sm">8,192 m² (80%)</div>
                <div className="text-[10px] text-slate-400">64 Homes across L2-L9</div>
              </div>

              <div className="p-3 rounded-xl bg-midnight-850 border border-white/5 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F8A7A]" />
                  <span className="font-semibold text-slate-200">Commercial</span>
                </div>
                <div className="font-mono text-teal-300 font-bold text-sm">2,048 m² (20%)</div>
                <div className="text-[10px] text-slate-400">Ground + L1 Co-Work</div>
              </div>
            </div>
          </div>

          {/* Dynamic FAR Calculator Card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Interactive FAR Calculator</span>
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
            </h4>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Adjust Plot Area:</span>
                <span className="font-mono font-bold text-white">{editablePlotM2} m²</span>
              </div>
              <input
                type="range"
                min="2400"
                max="4800"
                step="100"
                value={editablePlotM2}
                onChange={(e) => setEditablePlotM2(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-midnight-800 accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>2,400 m²</span>
                <span>3,600 m² (Baseline 60x60m)</span>
                <span>4,800 m²</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-300">Resulting Floor Area Ratio (FAR):</span>
              <span className="text-lg font-mono font-bold text-amber-300">{calculatedFar}</span>
            </div>
          </div>
        </div>

        {/* Right Column: RETV Estimator & 4 PPT Impact Pillars */}
        <div className="lg:col-span-7 space-y-4">
          {/* RETV Estimator */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>Eco-Niwas Samhita 2018 RETV Estimator</span>
                  <AssumedBadge />
                </h3>
                <p className="text-xs text-slate-400">
                  Residential Envelope Transmittance Value must be ≤ 15.0 W/m² per national codes.
                </p>
              </div>

              <button
                onClick={() => setHasFins(!hasFins)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  hasFins
                    ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-midnight-800 border border-white/10 text-slate-400'
                }`}
              >
                {hasFins ? '✓ AANGAN Fins Active' : 'Fins Removed'}
              </button>
            </div>

            {/* Live RETV Gauge Banner */}
            <div className="p-4 rounded-xl bg-midnight-950 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Calculated RETV</div>
                <div className="text-3xl font-mono font-bold flex items-baseline gap-2 mt-0.5">
                  <span className={retv.isCompliant ? 'text-emerald-400' : 'text-rose-400'}>
                    {retv.retvValue}
                  </span>
                  <span className="text-xs font-normal text-slate-400">W/m²</span>
                  <span className="text-xs font-mono text-slate-400">(Limit: 15.0 W/m²)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {retv.isCompliant ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complies with ECBC-R</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Exceeds 15.0 Limit</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sliders for WWR, U-Value, SHGC */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">WWR:</span>
                  <span className="font-mono font-bold text-white">{wwr}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="45"
                  value={wwr}
                  onChange={(e) => setWwr(parseInt(e.target.value))}
                  className="w-full h-1.5 rounded bg-midnight-800 accent-terracotta"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Glass U-value:</span>
                  <span className="font-mono font-bold text-white">{glazingU}</span>
                </div>
                <input
                  type="range"
                  min="1.6"
                  max="5.8"
                  step="0.2"
                  value={glazingU}
                  onChange={(e) => setGlazingU(parseFloat(e.target.value))}
                  className="w-full h-1.5 rounded bg-midnight-800 accent-terracotta"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Glass SHGC:</span>
                  <span className="font-mono font-bold text-white">{shgc}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="0.85"
                  step="0.05"
                  value={shgc}
                  onChange={(e) => setShgc(parseFloat(e.target.value))}
                  className="w-full h-1.5 rounded bg-midnight-800 accent-terracotta"
                />
              </div>
            </div>
          </div>

          {/* 4 PPT Impact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Residents Impact */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                <Users className="w-4 h-4" />
                <span>Impact on Residents</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                64 homes receive dual-aspect light, natural cross-ventilation, and reduced AC dependency, 
                cutting summer electricity bills by ~32%.
              </p>
            </div>

            {/* City & Community Impact */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-teal-300 font-semibold text-xs">
                <Building2 className="w-4 h-4" />
                <span>Impact on City & Community</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Active ground colonnade and co-working hub stitch the private homes into the urban neighborhood, 
                eliminating dead street edges.
              </p>
            </div>

            {/* Environmental Impact */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs">
                <Leaf className="w-4 h-4" />
                <span>Environmental Impact</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                85 kWp solar PV, 180 kL rainwater harvesting reservoir, 20% EV bays, and 4.8°C courtyard microclimate cooling.
              </p>
            </div>

            {/* Hackathon Learning & Reuse */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs">
                <Cpu className="w-4 h-4" />
                <span>Hackathon BIM Reproducibility</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                1 parametric facade family drives 4 elevations; 1 floor plan arrays 8 times. 
                Full BIM LOD 350 generated within 36 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
