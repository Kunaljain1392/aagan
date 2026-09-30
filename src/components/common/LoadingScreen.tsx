import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12 + 6);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-950 text-white select-none px-6"
        >
          {/* Subtle courtyard architectural schematic wireframe drawing */}
          <div className="relative w-48 h-48 mb-8">
            <svg viewBox="0 0 200 200" className="w-full h-full stroke-terracotta fill-none" strokeWidth="1.5">
              {/* Plot boundary */}
              <motion.rect
                x="15"
                y="15"
                width="170"
                height="170"
                strokeDasharray="6 4"
                className="stroke-slate-700"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2 }}
              />

              {/* Building Footprint */}
              <motion.rect
                x="40"
                y="48"
                width="120"
                height="104"
                className="stroke-terracotta/80"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, delay: 0.2 }}
              />

              {/* Central Courtyard Void */}
              <motion.rect
                x="76"
                y="76"
                width="48"
                height="48"
                className="stroke-commercial"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />

              {/* Cross Ventilation Airflow vectors */}
              <motion.path
                d="M100 25 L100 70 M100 130 L100 175 M25 100 L70 100 M130 100 L175 100"
                className="stroke-emerald-400"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />

              {/* Central Biophilic Tree Node */}
              <motion.circle
                cx="100"
                cy="100"
                r="6"
                className="fill-nature stroke-emerald-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              />
            </svg>

            {/* Glowing amber pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-terracotta/15 blur-xl animate-pulse" />
            </div>
          </div>

          {/* Typography */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-serif tracking-wider font-semibold text-slate-100 flex items-center justify-center gap-2">
              <span>AANGAN</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-terracotta/20 text-terracotta border border-terracotta/30">
                REVIT 2026
              </span>
            </h1>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
              The Building That Breathes • SIH 2026 PS 26116
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-56 h-1 mt-6 rounded-full bg-midnight-800 overflow-hidden relative border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-terracotta via-amber-400 to-commercial"
              style={{ width: `${Math.min(100, progress)}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <div className="mt-3 font-mono text-[11px] text-slate-500">
            Initializing procedural geometry... {Math.min(100, progress)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
