import React, { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { calculateVentilation } from '../../sim/ventilation';
import { calculateSolarPosition } from '../../sim/solar';
import { Wind, Sun, Leaf, Sparkles } from 'lucide-react';

export const BreathingScore: React.FC = () => {
  const { ventilationParams, solarMonth, solarHour, facadeParams } = useAppStore();

  const scoreData = useMemo(() => {
    const vent = calculateVentilation(ventilationParams);
    const solar = calculateSolarPosition(solarMonth, solarHour);

    // 1. Ventilation contribution (0 - 30 pts)
    const ventScore = Math.min(30, (vent.airChangesPerHour / 16) * 20 + (vent.tempReductionC / 4.8) * 10);

    // 2. Solar shading & thermal avoidance (0 - 30 pts)
    const finFactor = (facadeParams.finDepthMm / 600) * 15 + (facadeParams.louvreDepthMm / 400) * 15;
    const solarScore = Math.min(30, Math.max(12, finFactor * (solar.heatAvoidedPercent / 65)));

    // 3. Daylight availability (0 - 20 pts)
    const daylightScore = Math.min(20, (vent.daylightFactorPercent / 2.5) * 20);

    // 4. Biophilic & Green Terraces (0 - 20 pts)
    const greenScore = ventilationParams.hasTreesAndWater ? 20 : 8;

    const total = Math.min(100, Math.max(0, Math.round(ventScore + solarScore + daylightScore + greenScore)));

    return {
      total,
      breakdown: {
        ventilation: Math.round(ventScore),
        solarShading: Math.round(solarScore),
        daylight: Math.round(daylightScore),
        biophilic: greenScore,
      },
    };
  }, [ventilationParams, solarMonth, solarHour, facadeParams]);

  return (
    <div
      className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-800/90 border border-terracotta/30 shadow-glow-terracotta hover:border-terracotta/70 transition-all cursor-pointer"
      title="Live Building Breathing Score (0-100)"
    >
      <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-terracotta/20 text-terracotta">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Breathing Score</span>
        <span className="text-base font-bold font-mono text-terracotta-light">
          {scoreData.total}
        </span>
        <span className="text-[10px] text-slate-400">/100</span>
      </div>

      {/* Hover popover tooltip with breakdown */}
      <div className="absolute right-0 top-full mt-2 w-56 p-3 rounded-xl glass-panel shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 text-xs">
        <div className="font-semibold text-slate-200 mb-2 border-b border-white/10 pb-1 flex justify-between items-center">
          <span>Live Composite Score</span>
          <span className="text-terracotta font-mono font-bold">{scoreData.total}</span>
        </div>
        <div className="space-y-1.5 text-slate-300">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-sky-300">
              <Wind className="w-3 h-3" /> Stack Airflow
            </span>
            <span className="font-mono">{scoreData.breakdown.ventilation}/30</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Sun className="w-3 h-3" /> Solar Protection
            </span>
            <span className="font-mono">{scoreData.breakdown.solarShading}/30</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-emerald-300">
              <Leaf className="w-3 h-3" /> Biophilic Cooling
            </span>
            <span className="font-mono">{scoreData.breakdown.biophilic}/20</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-teal-300">
              <Sparkles className="w-3 h-3" /> Daylight Factor
            </span>
            <span className="font-mono">{scoreData.breakdown.daylight}/20</span>
          </div>
        </div>
      </div>
    </div>
  );
};
