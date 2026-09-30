import React from 'react';
import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '../../data/project';
import { useAppStore } from '../../store/useAppStore';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  Users,
  Compass,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Award,
} from 'lucide-react';

export const TeamRoles: React.FC = () => {
  const { setModelHighlightTarget, setActiveSection } = useAppStore();

  const handleMouseEnter = (domain: string) => {
    if (domain.includes('Facade')) {
      setModelHighlightTarget('facade');
    } else if (domain.includes('Structural')) {
      setModelHighlightTarget('columns');
    } else if (domain.includes('Walkthrough')) {
      setModelHighlightTarget('courtyard');
    } else {
      setModelHighlightTarget('setback');
    }
  };

  const handleMouseLeave = () => {
    setModelHighlightTarget(null);
  };

  return (
    <section id="team" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-950 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-terracotta tracking-wider uppercase">
                Section 14 // Team MIDNIGHT-CODERS
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Design Team & BIM Work Allocation
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Team MIDNIGHT-CODERS (Team ID: 157275). Hover over any team member to see the specific 
              BIM model layers and parametric families they authored.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-terracotta/10 border border-terracotta/30 text-xs font-mono text-terracotta-light">
            <Award className="w-4 h-4" />
            <span>SIH 2026 PS 26116</span>
          </div>
        </div>
      </div>

      {/* 4 Team Member Cards */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {TEAM_MEMBERS.map((member, idx) => (
          <motion.div
            key={idx}
            onMouseEnter={() => handleMouseEnter(member.title)}
            onMouseLeave={handleMouseLeave}
            whileHover={{ y: -6 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4 hover:border-terracotta/50 transition-all cursor-pointer shadow-glass group"
          >
            <div className="space-y-4">
              {/* Avatar Initial Circle & Role Badge */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-terracotta to-amber-600 flex items-center justify-center text-white font-mono font-bold text-xl shadow-glow-terracotta group-hover:scale-105 transition-transform">
                  {member.avatarInitial}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                  Role 0{idx + 1}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  {member.role}
                </h3>
                <div className="text-xs text-terracotta-light font-mono mt-0.5">
                  {member.title}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {member.focus}
              </p>
            </div>

            {/* Owned Revit Layer Badge */}
            <div className="pt-3 border-t border-white/5 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-400">Revit Model Domain:</span>
              <div className="p-2 rounded-lg bg-midnight-950 border border-white/5 text-[11px] font-mono text-emerald-300">
                {member.revitDomain}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
