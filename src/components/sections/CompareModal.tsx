import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  X,
  SplitSquareVertical,
  CheckCircle2,
  XCircle,
  Thermometer,
  Wind,
  Sun,
  Leaf,
  Zap,
} from 'lucide-react';

export const CompareModal: React.FC = () => {
  const { isCompareModalOpen, toggleCompareModal } = useAppStore();

  if (!isCompareModalOpen) return null;

  const comparisonRows = [
    {
      metric: 'RETV Thermal Transmittance',
      icon: Thermometer,
      box: '24.2 W/m² (Fails ECBC-R standard)',
      boxStatus: false,
      aangan: '11.4 W/m² (24% better than 15.0 limit)',
      aanganStatus: true,
      note: 'Parametric terracotta fins block 68% direct insolation.',
    },
    {
      metric: 'Natural Ventilation Draft',
      icon: Wind,
      box: '0 – 1.5 ACH (100% HVAC Dependent)',
      boxStatus: false,
      aangan: '14.5 ACH (Natural Stack Chimney)',
      aanganStatus: true,
      note: '16x16m central courtyard acts as a 35m thermal chimney.',
    },
    {
      metric: 'Habitable Daylighting',
      icon: Sun,
      box: '< 35% rooms receive > 1.5% DF (Deep dark cores)',
      boxStatus: false,
      aangan: '94% rooms daylit with dual-aspect cross-light',
      aanganStatus: true,
      note: 'Meets GRIHA v2019 Criterion 13 daylight mandates.',
    },
    {
      metric: 'Plaza Microclimate Cooling',
      icon: Leaf,
      box: '+4.5°C Urban Heat Island effect',
      boxStatus: false,
      aangan: '-4.8°C evaporative water & canopy cooling',
      aanganStatus: true,
      note: 'Water mirror fountain + native canopy trees drop ground temp.',
    },
    {
      metric: 'EV-Ready Parking Infrastructure',
      icon: Zap,
      box: '0% – 5% ad-hoc basic outlets',
      boxStatus: false,
      aangan: '20.8% EV-Ready bays (15 of 72 slots)',
      aanganStatus: true,
      note: 'Dedicated charging conduits tied to 85 kWp solar array.',
    },
    {
      metric: 'Community & Mixed-Use Integration',
      icon: SplitSquareVertical,
      box: 'Isolated residential gate; dead street boundary',
      boxStatus: false,
      aangan: 'Double-height 4.5m colonnade + L1 co-working',
      aanganStatus: true,
      note: 'Active urban frontages with civic amphitheater steps.',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-midnight-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl relative"
        >
          {/* Close Button */}
          <button
            onClick={toggleCompareModal}
            className="absolute top-6 right-6 p-2 rounded-xl bg-midnight-800 text-slate-400 hover:text-white border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-terracotta tracking-wider">
                Benchmark Analysis
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Conventional Sealed Box vs. AANGAN Breathing Courtyard
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Why our Smart India Hackathon 2026 entry breaks away from the generic glass-clad tower model.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="space-y-3">
            {comparisonRows.map((row, idx) => {
              const Icon = row.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-midnight-850/80 border border-white/5 space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-white font-mono uppercase tracking-wide">
                    <Icon className="w-4 h-4 text-terracotta" />
                    <span>{row.metric}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Box */}
                    <div className="p-3 rounded-xl bg-midnight-950/60 border border-rose-500/20 flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] uppercase font-mono text-slate-400">Conventional Sealed Box</div>
                        <div className="font-semibold text-rose-300 mt-0.5">{row.box}</div>
                      </div>
                    </div>

                    {/* AANGAN */}
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] uppercase font-mono text-emerald-400">AANGAN Courtyard Block</div>
                        <div className="font-semibold text-emerald-200 mt-0.5">{row.aangan}</div>
                        <div className="text-[11px] text-slate-400 mt-1">{row.note}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={toggleCompareModal}
              className="px-6 py-2.5 rounded-xl bg-midnight-800 text-white border border-white/10 text-xs font-mono hover:bg-midnight-700"
            >
              Close Benchmark Modal
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
