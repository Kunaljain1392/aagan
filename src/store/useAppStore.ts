import { create } from 'zustand';

export type CameraPreset = 'default' | 'street' | 'courtyard' | 'top' | 'axonometric';

export interface FacadeParameters {
  finDepthMm: number;        // 150 - 600
  finSpacingMm: number;      // 300 - 1200
  finRotationDeg: number;    // -45 to +45
  louvreDepthMm: number;     // 100 - 400
  jaaliPorosityPercent: number; // 20 - 70
  planterWidthMm: number;    // 400 - 1000
}

export interface VentilationParameters {
  outdoorTempC: number;
  windSpeedMps: number;
  windDirectionDeg: number;
  hasTreesAndWater: boolean;
}

export interface WalkthroughState {
  isPlaying: boolean;
  currentTimeSeconds: number;
  activeKeyframe: number;
}

interface AppState {
  // Navigation & View
  activeSection: string;
  setActiveSection: (section: string) => void;
  
  // 3D Building Explorer
  isolatedLevelIndex: number; // -1 = show all, 0 = basement, 1 = ground ... 10 = roof
  setIsolatedLevelIndex: (index: number) => void;
  isExplodedView: boolean;
  toggleExplodedView: () => void;
  isSectionCut: boolean;
  toggleSectionCut: () => void;
  cameraPreset: CameraPreset;
  setCameraPreset: (preset: CameraPreset) => void;
  modelHighlightTarget: string | null;
  setModelHighlightTarget: (target: string | null) => void;

  // Solar Simulation
  solarMonth: number; // 0 = Jan, 11 = Dec
  setSolarMonth: (m: number) => void;
  solarHour: number; // 5.0 to 19.0
  setSolarHour: (h: number | ((prev: number) => number)) => void;
  isSolarPlaying: boolean;
  toggleSolarPlaying: () => void;

  // Facade Parametric Lab
  facadeParams: FacadeParameters;
  updateFacadeParams: (params: Partial<FacadeParameters>) => void;
  isHeroBayActive: boolean;
  toggleHeroBay: () => void;

  // Ventilation Simulation
  ventilationParams: VentilationParameters;
  updateVentilationParams: (params: Partial<VentilationParameters>) => void;

  // Structure & Rebar
  showArchitectureWithStructure: boolean;
  setShowArchitectureWithStructure: (show: boolean) => void;
  selectedStructuralMember: 'beam' | 'column' | 'slab' | 'shear_wall' | null;
  setSelectedStructuralMember: (member: 'beam' | 'column' | 'slab' | 'shear_wall' | null) => void;
  activeLoadPath: 'none' | 'gravity' | 'lateral';
  setActiveLoadPath: (path: 'none' | 'gravity' | 'lateral') => void;

  // Workflow Timeline
  activeWorkflowStep: number; // 1 to 8
  setActiveWorkflowStep: (step: number) => void;

  // 30-Second Walkthrough
  walkthrough: WalkthroughState;
  setWalkthroughPlaying: (playing: boolean) => void;
  setWalkthroughTime: (time: number) => void;
  resetWalkthrough: () => void;

  // Global & Extra Wow Features
  dayNightMode: 'day' | 'night';
  toggleDayNightMode: () => void;
  isCompareModalOpen: boolean;
  toggleCompareModal: () => void;
  isPresentationMode: boolean;
  togglePresentationMode: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),

  isolatedLevelIndex: -1,
  setIsolatedLevelIndex: (index) => set({ isolatedLevelIndex: index }),
  isExplodedView: false,
  toggleExplodedView: () => set((s) => ({ isExplodedView: !s.isExplodedView })),
  isSectionCut: false,
  toggleSectionCut: () => set((s) => ({ isSectionCut: !s.isSectionCut })),
  cameraPreset: 'default',
  setCameraPreset: (cameraPreset) => set({ cameraPreset }),
  modelHighlightTarget: null,
  setModelHighlightTarget: (modelHighlightTarget) => set({ modelHighlightTarget }),

  solarMonth: 5, // June (Summer Solstice)
  setSolarMonth: (solarMonth) => set({ solarMonth }),
  solarHour: 12.0, // Midday
  setSolarHour: (h) =>
    set((s) => ({ solarHour: typeof h === 'function' ? h(s.solarHour) : h })),
  isSolarPlaying: false,
  toggleSolarPlaying: () => set((s) => ({ isSolarPlaying: !s.isSolarPlaying })),

  facadeParams: {
    finDepthMm: 450,
    finSpacingMm: 600,
    finRotationDeg: 25,
    louvreDepthMm: 250,
    jaaliPorosityPercent: 45,
    planterWidthMm: 600,
  },
  updateFacadeParams: (params) =>
    set((s) => ({ facadeParams: { ...s.facadeParams, ...params } })),
  isHeroBayActive: false,
  toggleHeroBay: () => set((s) => ({ isHeroBayActive: !s.isHeroBayActive })),

  ventilationParams: {
    outdoorTempC: 38,
    windSpeedMps: 3.5,
    windDirectionDeg: 240, // SW monsoon breeze
    hasTreesAndWater: true,
  },
  updateVentilationParams: (params) =>
    set((s) => ({ ventilationParams: { ...s.ventilationParams, ...params } })),

  showArchitectureWithStructure: true,
  setShowArchitectureWithStructure: (show) => set({ showArchitectureWithStructure: show }),
  selectedStructuralMember: 'beam',
  setSelectedStructuralMember: (selectedStructuralMember) => set({ selectedStructuralMember }),
  activeLoadPath: 'none',
  setActiveLoadPath: (activeLoadPath) => set({ activeLoadPath }),

  activeWorkflowStep: 4,
  setActiveWorkflowStep: (activeWorkflowStep) => set({ activeWorkflowStep }),

  walkthrough: {
    isPlaying: false,
    currentTimeSeconds: 0,
    activeKeyframe: 0,
  },
  setWalkthroughPlaying: (isPlaying) =>
    set((s) => ({ walkthrough: { ...s.walkthrough, isPlaying } })),
  setWalkthroughTime: (currentTimeSeconds) =>
    set((s) => ({
      walkthrough: {
        ...s.walkthrough,
        currentTimeSeconds,
        activeKeyframe: Math.min(5, Math.floor(currentTimeSeconds / 5)),
      },
    })),
  resetWalkthrough: () =>
    set({
      walkthrough: { isPlaying: false, currentTimeSeconds: 0, activeKeyframe: 0 },
    }),

  dayNightMode: 'day',
  toggleDayNightMode: () =>
    set((s) => ({ dayNightMode: s.dayNightMode === 'day' ? 'night' : 'day' })),
  isCompareModalOpen: false,
  toggleCompareModal: () => set((s) => ({ isCompareModalOpen: !s.isCompareModalOpen })),
  isPresentationMode: false,
  togglePresentationMode: () =>
    set((s) => ({ isPresentationMode: !s.isPresentationMode })),
}));
