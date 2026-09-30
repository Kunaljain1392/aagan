import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COMPLIANCE_ITEMS, ComplianceItem } from '../../data/project';
import { useAppStore } from '../../store/useAppStore';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  ShieldCheck,
  Flame,
  Layers,
  Leaf,
  Building,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Crosshair,
} from 'lucide-react';

export const CodeChecklist: React.FC = () => {
  const { modelHighlightTarget, setModelHighlightTarget, setActiveSection } = useAppStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'fire' | 'structural' | 'energy' | 'urban'>('all');
  const [activeItem, setActiveItem] = useState<ComplianceItem>(COMPLIANCE_ITEMS[0]);

  const filteredItems = COMPLIANCE_ITEMS.filter((item) =>
    selectedFilter === 'all' ? true : item.category === selectedFilter
  );

  const handleInspect = (item: ComplianceItem) => {
    setActiveItem(item);
    setModelHighlightTarget(item.modelHighlight);
  };

  const jumpTo3D = () => {
    setActiveSection('explorer');
    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="compliance" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-900 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider uppercase">
                Section 09 // Regulatory & Safety Compliance
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Code & Fire-Safety Compliance Checklist
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              100% compliant with National Building Code (NBCS 2026), Indian Standards (IS 456, IS 13920, IS 1893), 
              and Eco-Niwas Samhita 2018. Click any clause to highlight its manifestation in the 3D model.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>8 / 8 Codes Verified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Checklist Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Filterable Checklist Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Standards (8)' },
                { id: 'fire', label: 'NBC Fire Safety (2)', icon: Flame },
                { id: 'structural', label: 'IS Structural (2)', icon: Layers },
                { id: 'energy', label: 'Energy & GRIHA (2)', icon: Leaf },
                { id: 'urban', label: 'Urban & EV (2)', icon: Building },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    selectedFilter === tab.id
                      ? 'bg-emerald-500 text-midnight-950 font-bold shadow-sm'
                      : 'bg-midnight-850 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Checklist Table Rows */}
            <div className="space-y-2">
              {filteredItems.map((item) => {
                const isSelected = activeItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleInspect(item)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 shadow-glow-green text-white'
                        : 'bg-midnight-850/70 border-white/5 text-slate-300 hover:bg-midnight-800 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-white">{item.title}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/10">
                            {item.code}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {item.clause} • {item.aanganSolution}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-300">
                        Highlight 3D
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Code Detail Inspection Card */}
        <div className="lg:col-span-5 space-y-4">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5"
          >
            <div className="border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                {activeItem.code}
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                {activeItem.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{activeItem.clause}</p>
            </div>

            {/* Statutory Requirement vs Solution */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-midnight-950 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">Statutory Mandatory Mandate:</span>
                <p className="text-slate-300 leading-relaxed">{activeItem.requirement}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">AANGAN Engineering Solution:</span>
                <p className="text-emerald-200 leading-relaxed font-medium">{activeItem.aanganSolution}</p>
              </div>
            </div>

            {/* Jump to 3D Inspection Button */}
            <button
              onClick={jumpTo3D}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-medium text-xs shadow-glow-teal hover:brightness-110 active:scale-95 transition-all"
            >
              <Crosshair className="w-4 h-4" />
              <span>Inspect {activeItem.modelHighlight.toUpperCase()} in 3D Explorer</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
