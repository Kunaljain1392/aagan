import React from 'react';
import { motion } from 'framer-motion';
import { REFERENCES_LIST, PROJECT_CONFIG } from '../../data/project';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  BookOpen,
  ExternalLink,
  Award,
  Building,
  Heart,
  FileCheck,
} from 'lucide-react';

export const ReferencesSection: React.FC = () => {
  return (
    <section id="references" className="relative w-full py-20 px-4 sm:px-6 bg-midnight-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">
                Section 15 // Authoritative Citations
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              References & Statutory Standards
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              The 12 authoritative building codes, structural engineering standards, and environmental 
              treatises anchoring every dimensional and physical parameter of AANGAN.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            <span>12 Authoritative Citations</span>
          </div>
        </div>

        {/* 12 Reference Link Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REFERENCES_LIST.map((ref) => (
            <div
              key={ref.id}
              className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3 hover:border-amber-400/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-terracotta/20 text-terracotta-light border border-terracotta/30">
                    {ref.code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{ref.year}</span>
                </div>

                <h4 className="text-sm font-serif font-bold text-white leading-snug">
                  {ref.title}
                </h4>

                <div className="text-[11px] text-slate-400 font-mono">
                  {ref.publisher}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {ref.relevance}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-amber-300">
                <span>{ref.urlLabel}</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Premium Hackathon Footer */}
        <footer className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-terracotta to-terracotta-dark flex items-center justify-center text-white font-serif font-bold">
              A
            </div>
            <div>
              <div className="font-bold text-white font-serif tracking-wider">
                AANGAN: Breathing Courtyard
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                Urban Mixed-Use Design Challenge • Autodesk Revit 2026
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-slate-300">
            <span>Team: <strong className="text-terracotta-light">MIDNIGHT-CODERS</strong></span>
            <span>•</span>
            <span>Team ID: <strong className="text-white">157275</strong></span>
            <span>•</span>
            <span>PS ID: <strong className="text-white">26116</strong></span>
            <span>•</span>
            <span>SIH 2026</span>
          </div>

          <div className="text-center md:text-right text-[10px] text-slate-400 max-w-xs">
            * All physical simulations are illustrative engineering models. Authoritative BIM LOD 350 geometry and fabrication schedules delivered via Autodesk Revit.
          </div>
        </footer>
      </div>
    </section>
  );
};
