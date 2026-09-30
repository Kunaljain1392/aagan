import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RISKS_AND_MITIGATIONS, RULE_COMPLIANCE_BADGES } from '../../data/project';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  ShieldAlert,
  ShieldCheck,
  RotateCw,
  Box,
  Cpu,
  Clock,
  Ruler,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

export const RiskMitigation: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cube':
        return <Box className="w-5 h-5 text-terracotta" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-amber-400" />;
      case 'Ruler':
        return <Ruler className="w-5 h-5 text-sky-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="risks" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-900 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-rose-400 tracking-wider uppercase">
                Section 13 // Hackathon Risk Management
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Risk & Mitigation Strategy
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Anticipating every engineering hurdle in the 36-hour sprint. Click any card below to flip 
              and reveal Team MIDNIGHT-CODERS' mitigation defense.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <RotateCw className="w-4 h-4 text-terracotta animate-spin" />
            <span>Click cards to flip</span>
          </div>
        </div>
      </div>

      {/* 4 Rule-Compliance Badges */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RULE_COMPLIANCE_BADGES.map((badge, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-2xl border border-white/10 flex items-start gap-3.5 shadow-sm"
            >
              <div className="p-2.5 rounded-xl bg-midnight-800 border border-white/10 shrink-0">
                {getBadgeIcon(badge.icon)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                  {badge.label}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                  {badge.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Interactive 3D Flip Cards Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {RISKS_AND_MITIGATIONS.map((item) => {
          const isFlipped = !!flippedCards[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleFlip(item.id)}
              className="relative min-h-[260px] perspective-1000 cursor-pointer group"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full transform-style-preserve-3d"
              >
                {/* FRONT OF CARD (Risk) */}
                <div className="absolute inset-0 backface-hidden glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between group-hover:border-rose-500/40 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {item.category}
                      </span>
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                    </div>

                    <h3 className="text-base font-serif font-bold text-white leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.risk}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-terracotta-light">
                    <span>Click to flip mitigation</span>
                    <RotateCw className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* BACK OF CARD (Mitigation & Revit Strategy) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel p-6 rounded-2xl border border-emerald-500/40 flex flex-col justify-between bg-midnight-950/90 shadow-glow-green">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Mitigation Defense
                      </span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {item.mitigation}
                    </p>

                    <div className="p-2.5 rounded-lg bg-midnight-850 border border-white/5 text-[11px] font-mono text-emerald-300">
                      <strong>Revit Strategy:</strong> {item.revitStrategy}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Click to flip back</span>
                    <RotateCw className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
