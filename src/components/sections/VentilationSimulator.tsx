import React, { useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { calculateVentilation } from '../../sim/ventilation';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  Wind,
  Droplets,
  Trees,
  Thermometer,
  Gauge,
  ArrowUp,
  Sparkles,
  Info,
} from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  tempState: number; // 0 = cool blue, 1 = warm amber
}

export const VentilationSimulator: React.FC = () => {
  const { ventilationParams, updateVentilationParams } = useAppStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const vent = calculateVentilation(ventilationParams);

  // Canvas 2D Particle Stack Effect Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 420);

    const particles: Particle[] = [];
    const maxParticles = 180;

    // Courtyard chimney geometry within canvas coordinates
    const chimneyLeft = width * 0.38;
    const chimneyRight = width * 0.62;
    const groundY = height * 0.82;
    const roofY = height * 0.12;

    const createParticle = (): Particle => {
      // Spawn either from left plaza or right plaza
      const fromLeft = Math.random() > 0.5;
      return {
        x: fromLeft ? Math.random() * chimneyLeft : chimneyRight + Math.random() * (width - chimneyRight),
        y: groundY + (Math.random() - 0.5) * 40,
        vx: fromLeft ? 1.5 + Math.random() * 2 : -(1.5 + Math.random() * 2),
        vy: (Math.random() - 0.5) * 0.5,
        age: 0,
        life: 140 + Math.random() * 100,
        tempState: 0, // starts cool blue
      };
    };

    // Pre-populate particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    const render = () => {
      // Dark trail clear
      ctx.fillStyle = 'rgba(5, 11, 24, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Draw schematic building cross-section lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1.5;

      // Ground plane
      ctx.beginPath();
      ctx.moveTo(20, groundY);
      ctx.lineTo(width - 20, groundY);
      ctx.stroke();

      // Left residential wing (Floors L2 to L9)
      ctx.strokeRect(width * 0.08, roofY, chimneyLeft - width * 0.08, groundY - roofY);
      // Right residential wing
      ctx.strokeRect(chimneyRight, roofY, width * 0.92 - chimneyRight, groundY - roofY);

      // Floor slab lines
      const floorCount = 8;
      const floorSpacing = (groundY - roofY) / floorCount;
      for (let f = 1; f < floorCount; f++) {
        const fy = roofY + f * floorSpacing;
        ctx.beginPath();
        ctx.moveTo(width * 0.08, fy);
        ctx.lineTo(chimneyLeft, fy);
        ctx.moveTo(chimneyRight, fy);
        ctx.lineTo(width * 0.92, fy);
        ctx.stroke();
      }

      // Draw Central Courtyard Label & Roof Exhaust Cowl
      ctx.fillStyle = '#64748B';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText('16x16m Central Courtyard Chimney', chimneyLeft + 8, groundY - 12);
      ctx.fillText('Aerodynamic Roof Cowl (Exhaust)', chimneyLeft + 12, roofY - 8);

      // Roof cowl deflection baffles
      ctx.strokeStyle = '#E0801F';
      ctx.beginPath();
      ctx.moveTo(chimneyLeft - 10, roofY);
      ctx.lineTo(chimneyLeft + 20, roofY - 16);
      ctx.moveTo(chimneyRight + 10, roofY);
      ctx.lineTo(chimneyRight - 20, roofY - 16);
      ctx.stroke();

      // Draw water pool at base if active
      if (ventilationParams.hasTreesAndWater) {
        ctx.fillStyle = 'rgba(2, 132, 199, 0.4)';
        ctx.fillRect(chimneyLeft + 15, groundY - 6, chimneyRight - chimneyLeft - 30, 6);
      }

      // Update & Draw Particles
      const stackMultiplier = vent.stackVelocityMps * 1.4;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.age++;

        // In the plaza: travel towards courtyard center
        if (p.x < chimneyLeft) {
          p.x += Math.abs(p.vx) + ventilationParams.windSpeedMps * 0.2;
        } else if (p.x > chimneyRight) {
          p.x -= Math.abs(p.vx) - ventilationParams.windSpeedMps * 0.2;
        } else {
          // Inside Courtyard Chimney: Buoyancy stack effect takes over!
          p.vy -= 0.08 * stackMultiplier;
          p.y += p.vy;
          p.x += (Math.random() - 0.5) * 1.2; // turbulent eddy
          p.tempState = Math.min(1, p.tempState + 0.015); // warms up as it ascends
        }

        // Color interpolation: cool blue (#38BDF8) to warm terracotta (#F97316)
        const r = Math.round(56 + p.tempState * (249 - 56));
        const g = Math.round(189 + p.tempState * (115 - 189));
        const b = Math.round(248 + p.tempState * (22 - 248));
        const alpha = Math.max(0, 1 - p.age / p.life);

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Cross-ventilation streamline particles into apartments
        if (p.age > 40 && Math.random() < 0.02 && (p.x < chimneyLeft || p.x > chimneyRight)) {
          ctx.strokeStyle = `rgba(52, 211, 153, ${alpha * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + (p.x < chimneyLeft ? 15 : -15), p.y);
          ctx.stroke();
        }

        // Reset dead particles
        if (p.age >= p.life || p.y < roofY - 20) {
          particles[i] = createParticle();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [ventilationParams, vent.stackVelocityMps]);

  return (
    <section id="ventilation" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-950 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-commercial-light tracking-wider uppercase">
                Section 04 // Fluid Dynamics
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Courtyard Breathing: Ventilation Simulation
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Thermal buoyancy stack physics. Cool ambient air is drawn across tree-shaded plazas into the courtyard base, 
              warmed by the building envelope, and evacuated up through the 35m vertical shaft.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-commercial/10 border border-commercial/30 text-xs font-mono text-commercial-light flex items-center gap-2">
              <Wind className="w-3.5 h-3.5" />
              <span>Stack Velocity: {vent.stackVelocityMps} m/s</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Simulation Body */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Environmental Sliders */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Environmental Inputs</span>
              <Gauge className="w-4 h-4 text-commercial" />
            </h3>

            {/* Outdoor Temperature Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-rose-400" /> Outdoor Ambient Temp
                </span>
                <span className="font-mono font-bold text-rose-300">
                  {ventilationParams.outdoorTempC}°C
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="45"
                step="1"
                value={ventilationParams.outdoorTempC}
                onChange={(e) =>
                  updateVentilationParams({ outdoorTempC: parseInt(e.target.value) })
                }
                className="w-full h-2 rounded-lg bg-midnight-800 accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>20°C Mild</span>
                <span>35°C Hot</span>
                <span>45°C Peak NCR Summer</span>
              </div>
            </div>

            {/* Ambient Wind Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-sky-400" /> Wind Speed (0 - 8 m/s)
                </span>
                <span className="font-mono font-bold text-sky-300">
                  {ventilationParams.windSpeedMps} m/s
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="0.5"
                value={ventilationParams.windSpeedMps}
                onChange={(e) =>
                  updateVentilationParams({ windSpeedMps: parseFloat(e.target.value) })
                }
                className="w-full h-2 rounded-lg bg-midnight-800 accent-sky-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>0 m/s Stagnant</span>
                <span>3.5 m/s Breeze</span>
                <span>8 m/s Strong</span>
              </div>
            </div>

            {/* Courtyard Water & Trees Biophilic Toggle */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() =>
                  updateVentilationParams({
                    hasTreesAndWater: !ventilationParams.hasTreesAndWater,
                  })
                }
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs font-medium transition-all ${
                  ventilationParams.hasTreesAndWater
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-glow-green'
                    : 'bg-midnight-850 border-white/10 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 text-emerald-400">
                    <Droplets className="w-4 h-4" />
                    <Trees className="w-4 h-4" />
                  </div>
                  <span>Water Mirror & Shade Trees</span>
                </div>
                <span className="font-mono text-[11px] font-bold">
                  {ventilationParams.hasTreesAndWater ? 'ON (-4.8°C)' : 'OFF'}
                </span>
              </button>
            </div>
          </div>

          {/* Mathematical Formulas Card */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Physics Formula Notes</span>
            </h4>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
              {vent.formulaNotes.map((note, idx) => (
                <div key={idx} className="p-1.5 rounded bg-midnight-950/60 border border-white/5">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Canvas Particle Simulation & Key Metrics */}
        <div className="lg:col-span-8 space-y-4">
          {/* Real-time Canvas Display */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2 px-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                <span className="font-mono">Live Hydrostatic Particle Simulation</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-400" /> Cool Inflow
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Thermal Updraft
                </span>
              </div>
            </div>

            <div className="w-full rounded-xl overflow-hidden bg-midnight-950 border border-white/5">
              <canvas ref={canvasRef} className="w-full block" />
            </div>
          </div>

          {/* Live Ventilation Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* ACH */}
            <div className="glass-panel p-4 rounded-xl border border-white/10">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Air Changes / Hour</div>
              <div className="text-2xl font-mono font-bold text-sky-400 mt-1">
                {vent.airChangesPerHour} <span className="text-xs font-normal">ACH</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Courtyard 8,960 m³ Vol</div>
            </div>

            {/* Plaza Temp Reduction */}
            <div className="glass-panel p-4 rounded-xl border border-white/10">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Plaza Temp Drop</div>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
                -{vent.tempReductionC}°C
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Microclimate Buffer</div>
            </div>

            {/* Cross-vent velocity */}
            <div className="glass-panel p-4 rounded-xl border border-white/10">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Unit Cross Breeze</div>
              <div className="text-2xl font-mono font-bold text-amber-300 mt-1">
                {vent.crossVentVelocityMps} <span className="text-xs font-normal">m/s</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Across 2/3 BHK Units</div>
            </div>

            {/* Buoyancy pressure */}
            <div className="glass-panel p-4 rounded-xl border border-white/10">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Buoyancy Delta P</div>
              <div className="text-2xl font-mono font-bold text-purple-300 mt-1">
                {vent.buoyancyPressurePa} <span className="text-xs font-normal">Pa</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Hydrostatic Head (35m)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
