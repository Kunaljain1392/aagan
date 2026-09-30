import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { WALKTHROUGH_KEYFRAMES } from '../3d/WalkthroughController';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  Play,
  Pause,
  RotateCcw,
  Tv,
  Film,
  Sparkles,
  Compass,
} from 'lucide-react';

export const CinematicWalkthrough: React.FC = () => {
  const {
    walkthrough,
    setWalkthroughPlaying,
    setWalkthroughTime,
    resetWalkthrough,
    setActiveSection,
  } = useAppStore();

  const currentKf =
    WALKTHROUGH_KEYFRAMES.find((kf, idx) => {
      const nextKf = WALKTHROUGH_KEYFRAMES[idx + 1];
      if (!nextKf) return true;
      return (
        walkthrough.currentTimeSeconds >= kf.time &&
        walkthrough.currentTimeSeconds < nextKf.time
      );
    }) || WALKTHROUGH_KEYFRAMES[0];

  const handlePlayPause = () => {
    if (walkthrough.currentTimeSeconds >= 30) {
      resetWalkthrough();
    }
    setWalkthroughPlaying(!walkthrough.isPlaying);
    // Smooth scroll to top/hero or explorer so the jury sees the 3D camera flight live
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrub = (seconds: number) => {
    setWalkthroughTime(seconds);
  };

  return (
    <section id="walkthrough" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-950 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">
                Section 12 // Cinematic Presentation
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              30-Second Cinematic Walkthrough
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Scripted 30-second camera flight exported from Autodesk Revit. From street corner access, 
              into the 16x16m courtyard chimney, ascending through biophilic balconies, to the sunset roof garden.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300">
              {walkthrough.currentTimeSeconds.toFixed(1)}s / 30.0s
            </span>
          </div>
        </div>
      </div>

      {/* Main Walkthrough Player Controls Grid */}
      <div className="max-w-5xl mx-auto w-full glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        {/* Cinematic Subtitle Callout Display */}
        <div className="p-6 rounded-2xl bg-midnight-950/90 border border-white/10 relative overflow-hidden min-h-[100px] flex items-center justify-center text-center">
          <div className="absolute top-3 left-4 flex items-center gap-2 text-[10px] font-mono uppercase text-terracotta">
            <Film className="w-3.5 h-3.5" />
            <span>Revit Camera Path Subtitle</span>
          </div>

          <p className="text-base sm:text-lg font-serif italic text-amber-100 max-w-2xl">
            "{currentKf.subtitle}"
          </p>
        </div>

        {/* Timeline Scrubber Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>00:00 Street Entrance</span>
            <span>00:10 Courtyard Void</span>
            <span>00:20 Bio-Solar Roof</span>
            <span>00:30 Sunset Finale</span>
          </div>

          <input
            type="range"
            min="0"
            max="30"
            step="0.1"
            value={walkthrough.currentTimeSeconds}
            onChange={(e) => handleScrub(parseFloat(e.target.value))}
            className="w-full h-2.5 rounded-lg bg-midnight-800 accent-terracotta cursor-pointer"
          />
        </div>

        {/* Scrubber Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayPause}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-terracotta to-terracotta-dark text-white font-semibold text-sm shadow-glow-terracotta hover:brightness-110 active:scale-95 transition-all"
            >
              {walkthrough.isPlaying ? (
                <>
                  <Pause className="w-4 h-4" /> Pause Flight
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  {walkthrough.currentTimeSeconds >= 30 ? 'Replay 30s Walkthrough' : 'Play 30s Walkthrough'}
                </>
              )}
            </button>

            <button
              onClick={resetWalkthrough}
              title="Reset Timeline to 0s"
              className="p-3 rounded-xl bg-midnight-800 border border-white/10 text-slate-300 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Keyframe Step Markers */}
          <div className="flex flex-wrap items-center gap-1.5">
            {WALKTHROUGH_KEYFRAMES.slice(0, 6).map((kf, idx) => (
              <button
                key={idx}
                onClick={() => handleScrub(kf.time)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  Math.abs(walkthrough.currentTimeSeconds - kf.time) < 3
                    ? 'bg-amber-400 text-midnight-950 font-bold'
                    : 'bg-midnight-850 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {kf.time}s
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
