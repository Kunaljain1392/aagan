import React from 'react';
import { motion } from 'framer-motion';
import { WORKFLOW_TIMELINE } from '../../data/project';
import { useAppStore } from '../../store/useAppStore';
import { AssumedBadge } from '../common/AssumedBadge';
import {
  Layers,
  Clock,
  CheckCircle2,
  Cpu,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const WorkflowTimeline: React.FC = () => {
  const { activeWorkflowStep, setActiveWorkflowStep, setActiveSection } = useAppStore();

  const currentStep = WORKFLOW_TIMELINE.find((s) => s.step === activeWorkflowStep) || WORKFLOW_TIMELINE[3];

  const handleStepClick = (stepNum: number) => {
    setActiveWorkflowStep(stepNum);
  };

  const jumpTo3D = () => {
    setActiveSection('explorer');
    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="workflow" className="relative w-full min-h-screen py-20 px-4 sm:px-6 bg-midnight-900 flex flex-col justify-between">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold text-terracotta tracking-wider uppercase">
                Section 11 // Revit Execution Strategy
              </span>
              <AssumedBadge />
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              36-Hour Autodesk Revit Workflow Timeline
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              From Shared Coordinates to Grand Finale LOD 350 model. Click any step below to see how 
              the 3D building model assembles sequentially in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-terracotta/10 border border-terracotta/30 text-xs font-mono text-terracotta-light">
              Current Stage: {activeWorkflowStep <= 3 ? 'Idea Stage (B+G+L1)' : 'Grand Finale (Full B+G+9)'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Timeline Interactive Body */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 8-Step Progress Timeline List */}
        <div className="lg:col-span-6 space-y-3">
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-2">
              <span>8-STEP SPRINT EXECUTION SEQUENCE</span>
              <span className="text-terracotta">Click Step to Advance 3D Model</span>
            </div>

            <div className="space-y-2">
              {WORKFLOW_TIMELINE.map((step) => {
                const isActive = activeWorkflowStep === step.step;
                const isPassed = activeWorkflowStep >= step.step;

                return (
                  <div
                    key={step.step}
                    onClick={() => handleStepClick(step.step)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-terracotta/20 border-terracotta text-white shadow-glow-terracotta'
                        : isPassed
                        ? 'bg-midnight-850 border-white/10 text-slate-200'
                        : 'bg-midnight-950/60 border-white/5 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                          isActive
                            ? 'bg-terracotta text-white'
                            : isPassed
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-midnight-800 text-slate-500'
                        }`}
                      >
                        {step.step}
                      </div>

                      <div>
                        <div className="text-xs font-semibold">{step.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {step.durationEst} • {step.stage}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                      <span>{step.revitTool.split(',')[0]}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Step Detail & Deliverable Card */}
        <div className="lg:col-span-6 space-y-4">
          <motion.div
            key={currentStep.step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 space-y-5"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-terracotta/20 text-terracotta-light border border-terracotta/30">
                  Step 0{currentStep.step} of 08
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  {currentStep.title}
                </h3>
                <div className="text-xs text-amber-300 font-mono mt-0.5">{currentStep.stage}</div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                  {currentStep.durationEst}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>

            <div className="p-4 rounded-xl bg-midnight-950 border border-white/5 space-y-1.5">
              <div className="text-xs font-mono uppercase text-slate-400">Revit Deliverable Generated:</div>
              <p className="text-xs text-emerald-300 font-medium font-mono">{currentStep.deliverable}</p>
            </div>

            <div className="p-4 rounded-xl bg-midnight-850 border border-white/5 space-y-1">
              <div className="text-xs font-mono uppercase text-slate-400">Revit Tools & Methodology:</div>
              <div className="text-xs text-slate-200 font-semibold">{currentStep.revitTool}</div>
            </div>

            <button
              onClick={jumpTo3D}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-terracotta to-terracotta-dark text-white font-medium text-xs shadow-glow-terracotta hover:brightness-110 active:scale-95 transition-all"
            >
              <span>See Stage {currentStep.step} Assembly in 3D Building Scene</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
