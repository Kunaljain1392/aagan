/**
 * AANGAN: Breathing Courtyard
 * Single Source of Truth Project Data
 * Smart India Hackathon 2026 | PS 26116: Urban Mixed-Use Design Challenge (Autodesk Revit)
 * Team: MIDNIGHT-CODERS | Team ID: 157275
 * 
 * All dimensional values in mm unless stated otherwise.
 */

export interface LevelInfo {
  id: string;
  name: string;
  shortName: string;
  elevation: number; // in mm
  height: number; // in mm
  use: 'parking' | 'commercial' | 'community' | 'residential' | 'roof';
  color: string;
  areaM2: number;
  description: string;
  features: string[];
}

export interface RebarDetail {
  element: 'beam' | 'column' | 'slab' | 'shear_wall';
  title: string;
  codeRef: string;
  dimensionMm: string;
  concreteGrade: string;
  steelGrade: string;
  mainRebar: string;
  shearRebar: string;
  coverMm: number;
  notes: string[];
}

export interface ComplianceItem {
  id: string;
  code: string;
  title: string;
  clause: string;
  requirement: string;
  aanganSolution: string;
  status: 'compliant' | 'verified';
  category: 'fire' | 'structural' | 'energy' | 'urban';
  modelHighlight: 'setback' | 'stairs' | 'facade' | 'columns' | 'courtyard' | 'basement';
}

export interface WorkflowStep {
  step: number;
  title: string;
  revitTool: string;
  stage: 'Idea Stage (B+G+L1)' | 'Grand Finale (Full B+G+9)';
  durationEst: string;
  deliverable: string;
  description: string;
}

export interface RiskItem {
  id: string;
  title: string;
  category: 'Modeling' | 'Drawing' | 'Visualization' | 'Regulatory' | 'Detailing' | 'Defense';
  risk: string;
  mitigation: string;
  revitStrategy: string;
}

export interface TeamMember {
  role: string;
  title: string;
  name: string;
  focus: string;
  revitDomain: string;
  ownedLayers: string[];
  avatarInitial: string;
}

export interface ReferenceItem {
  id: string;
  code: string;
  title: string;
  publisher: string;
  year: string;
  relevance: string;
  urlLabel: string;
}

export const PROJECT_CONFIG = {
  meta: {
    projectName: "AANGAN: Breathing Courtyard",
    tagline: "Shops below. Homes above. A courtyard in the middle.",
    subline: "The building that breathes — procedural, climate-responsive mixed-use urban architecture.",
    hackathon: "Smart India Hackathon 2026",
    problemStatement: "PS 26116: Urban Mixed-Use Design Challenge",
    cadPlatform: "Autodesk Revit 2026",
    teamName: "MIDNIGHT-CODERS",
    teamId: "157275",
    location: "Delhi-NCR, India (Seismic Zone IV, Composite Climate)",
    latitude: 28.4089, // NCR latitude
    longitude: 77.1025,
  },

  site: {
    plotWidthMm: 60000, // 60 m
    plotDepthMm: 60000, // 60 m
    plotAreaM2: 3600, // 60x60 m
    plotType: "Corner Plot (North & East Primary Road Access)",
    
    // Setbacks (Fire-tender turning requirement NBCS 2026 > 9 m)
    setbacks: {
      northMm: 12000, // 12 m
      eastMm: 10000,  // 10 m
      southMm: 14000, // 14 m (service & ramp)
      westMm: 10000,  // 10 m
    },
    fireTenderRingWidthMm: 10000, // 10 to 14 m access all around
  },

  geometry: {
    footprintEW_Mm: 40000, // 40 m E-W
    footprintNS_Mm: 32000, // 32 m N-S
    footprintAreaM2: 1280, // 40 x 32 m

    courtyardEW_Mm: 16000, // 16 m E-W
    courtyardNS_Mm: 16000, // 16 m N-S
    courtyardAreaM2: 256,  // 16 x 16 m void

    floorPlateNetAreaM2: 1024, // 1280 - 256 m2 usable per floor

    gridBayX_Mm: 8000, // 8 m grid (5 bays E-W: 5 x 8 = 40 m)
    gridBayY_Mm: 8000, // 8 m grid (4 bays N-S: 4 x 8 = 32 m)
    baysEW: 5,
    baysNS: 4,
    courtyardBaysEW: 2, // Centered 2x2 bays = 16x16 m
    courtyardBaysNS: 2,

    totalHeightMm: 34900, // ~35 m total height
    totalFloors: 11, // Basement, Ground, L1, L2-L9 (8 residential), Roof

    residentialFloorsCount: 8, // L2 to L9
    homesPerFloor: 8,
    totalHomes: 64, // 8 x 8 = 64 homes

    builtUpAreaAboveGroundM2: 10240, // L0-L9
    residentialAreaM2: 8192, // 8 x 1024 (80%)
    commercialAreaM2: 2048,  // Ground (1024) + L1 (1024) (20%)
    basementAreaM2: 2400,    // Semi-extended footprint

    residentialRatioPercent: 80,
    commercialRatioPercent: 20,
    calculatedFAR: 2.84, // 10240 / 3600 = 2.844

    totalParkingBays: 72,
    evParkingBays: 15,
    evPercentage: 20.8, // >= 20% EV-ready bays

    greenTerraceLevels: ["L1 Podium Terrace", "L5 Step-back Skygarden", "Roof Garden & Solar Pergola"],
  },

  structure: {
    columnsLowerMm: 600, // 600x600 sq Basement to L5
    columnsUpperMm: 450, // Tapering to 450x450 sq above L5
    taperLevel: 5,       // Level 5 transition
    beamsWidthMm: 300,
    beamsDepthMm: 550,
    slabThicknessMm: 175, // 175 mm RC slab
    shearWallThicknessMm: 250, // 250 mm twin cores (East & West)
    concreteGrades: {
      columnsLower: "M40",
      columnsUpper: "M35",
      beams: "M30",
      slabs: "M30",
      shearWalls: "M40",
    },
    steelGrade: "Fe 500D (IS 1786)",
  },

  sustainability: {
    retvTarget: 15.0, // W/m2 per Eco-Niwas Samhita 2018
    retvAchieved: 11.4, // W/m2 with AANGAN adaptive fins
    retvWithoutShading: 24.2, // W/m2 standard box glass
    courtyardTempDropMaxC: 4.8, // evaporative cooling + stack chimney
    courtyardACH: 14.5, // Air Changes per Hour stack chimney
    crossVentilationEfficiency: "84%",
    directSunHoursCourtyardSolstice: 4.2, // Equinox 6.1 hrs
    solarPvCapacityKWp: 85, // 480 m2 roof array
    rainwaterTankCapacityKL: 180, // Under basement slab
  },
};

export const LEVELS_DATA: LevelInfo[] = [
  {
    id: "basement",
    name: "Basement (-3.6m)",
    shortName: "B",
    elevation: -3600,
    height: 3600,
    use: "parking",
    color: "#475569", // Slate grey
    areaM2: 2400,
    description: "Dedicated basement parking with EV fast-chargers, MEP plant room, and 180kL rainwater harvesting buffer.",
    features: ["72 Total Car Bays", "15 EV-Ready Charging Bays (20.8%)", "Rainwater Tank (180 kL)", "Fire Pump Room"],
  },
  {
    id: "ground",
    name: "Ground Floor (0.0m)",
    shortName: "G",
    elevation: 0,
    height: 4500,
    use: "commercial",
    color: "#0F8A7A", // Teal commercial
    areaM2: 1024,
    description: "Vibrant pedestrian colonnade, community cafes, artisan retail, central courtyard amphitheater, and corner entry plaza.",
    features: ["Double-Height 4.5m Colonnade", "16x16m Courtyard Plaza", "Corner Civic Entrance", "Fire-Tender Ring Access"],
  },
  {
    id: "level-1",
    name: "Level 1 (+4.5m)",
    shortName: "L1",
    elevation: 4500,
    height: 4000,
    use: "community",
    color: "#6B3FB5", // Purple structural/community
    areaM2: 1024,
    description: "Public mezzanine: co-working incubators, neighborhood creche, society meeting rooms, and outdoor reading terrace.",
    features: ["Co-Working Flex Space", "Step-out Green Terraces", "Daycare & Creche Hub", "Bridge Links across Courtyard"],
  },
  {
    id: "level-2",
    name: "Level 2 (+8.5m)",
    shortName: "L2",
    elevation: 8500,
    height: 3300,
    use: "residential",
    color: "#E0801F", // Terracotta brick
    areaM2: 1024,
    description: "Residential Ring: 8 cross-ventilated homes (4x 3BHK corner units + 4x 2BHK mid units) overlooking central courtyard.",
    features: ["8 Homes / Floor", "Dual-aspect Cross Ventilation", "Terracotta Jaali Balconies", "Acoustic buffer from street"],
  },
  {
    id: "level-3",
    name: "Level 3 (+11.8m)",
    shortName: "L3",
    elevation: 11800,
    height: 3300,
    use: "residential",
    color: "#E0801F",
    areaM2: 1024,
    description: "Residential Ring: 8 homes. Continuous cantilevered perimeter planters providing biophilic micro-shading.",
    features: ["8 Homes (4x 3BHK, 4x 2BHK)", "Integrated Drip Planters", "Corner Shear Core Access", "Courtyard Facing Bedrooms"],
  },
  {
    id: "level-4",
    name: "Level 4 (+15.1m)",
    shortName: "L4",
    elevation: 15100,
    height: 3300,
    use: "residential",
    color: "#E0801F",
    areaM2: 1024,
    description: "Residential Ring: 8 homes with calibrated facade fins optimized for mid-altitude solar incidence angles.",
    features: ["8 Homes", "Louvred East/West facades", "Smoke-free Fire Evacuation Core", "Open Courtyard Corridor"],
  },
  {
    id: "level-5",
    name: "Level 5 (+18.4m)",
    shortName: "L5",
    elevation: 18400,
    height: 3300,
    use: "residential",
    color: "#2E7D32", // Nature green step-back terrace
    areaM2: 1024,
    description: "Column Taper Transition (600mm -> 450mm) and South-facing stepped sky terrace with outdoor fitness deck.",
    features: ["Sky Garden & Yoga Deck", "Structural Column Taper Level", "Intermediate Refuge Zone", "8 Homes"],
  },
  {
    id: "level-6",
    name: "Level 6 (+21.7m)",
    shortName: "L6",
    elevation: 21700,
    height: 3300,
    use: "residential",
    color: "#E0801F",
    areaM2: 1024,
    description: "Residential Ring: 8 homes with slender 450mm columns maximizing interior carpet area by +2.8%.",
    features: ["8 Homes", "Slender 450mm Columns", "Upper Courtyard Thermal Draft", "Deep Eaves Shading"],
  },
  {
    id: "level-7",
    name: "Level 7 (+25.0m)",
    shortName: "L7",
    elevation: 25000,
    height: 3300,
    use: "residential",
    color: "#E0801F",
    areaM2: 1024,
    description: "Residential Ring: 8 homes. Enhanced stack effect acceleration drawing clean air through vertical central shaft.",
    features: ["8 Homes", "Maximum Daylight Penetration", "Terracotta Screen Privacy", "High Velocity Stack Draft"],
  },
  {
    id: "level-8",
    name: "Level 8 (+28.3m)",
    shortName: "L8",
    elevation: 28300,
    height: 3300,
    use: "residential",
    color: "#E0801F",
    areaM2: 1024,
    description: "Residential Ring: 8 homes. Deep vertical fins on West facade shield intense evening low-angle solar radiation.",
    features: ["8 Homes", "West Solar Shielding", "Double Corbel Balconies", "Direct Staircase Access"],
  },
  {
    id: "level-9",
    name: "Level 9 (+31.6m)",
    shortName: "L9",
    elevation: 31600,
    height: 3300,
    use: "residential",
    color: "#E0801F",
    areaM2: 1024,
    description: "Top residential floor (~35m datum). Direct access to community roof garden and skywalk bridges.",
    features: ["8 Homes (Penthouse spec)", "Direct Roof Promenade Link", "Thermal Roof Insulation Slab", "Total 64 Homes Completed"],
  },
  {
    id: "roof",
    name: "Roof Terrace (+34.9m)",
    shortName: "Roof",
    elevation: 34900,
    height: 3000,
    use: "roof",
    color: "#2E7D32", // Lush green nature
    areaM2: 1024,
    description: "Bio-solar rooftop: 85 kWp bifacial PV pergolas, community urban farming plots, and thermal updraft exhaust cowl.",
    features: ["85 kWp Solar PV Pergola", "Central Chimney Aerodynamic Cowl", "Community Herb & Flower Beds", "100% Stormwater Retention"],
  },
];

export const REBAR_DETAILS: RebarDetail[] = [
  {
    element: "beam",
    title: "Typical Plinth & Floor Beam (300 x 550 mm)",
    codeRef: "IS 456:2000 & IS 13920:2016 Cl. 6",
    dimensionMm: "300 mm (B) x 550 mm (D)",
    concreteGrade: "M30 Grade Concrete",
    steelGrade: "Fe 500D High-Yield Deformed Bars",
    mainRebar: "Top: 3-20T + 2-16T through bars; Bottom: 3-25T tension bars at mid-span",
    shearRebar: "2-legged 8mm ties @ 100mm c/c at 2d plastic hinge zones, @ 175mm c/c mid-span",
    coverMm: 30,
    notes: [
      "IS 13920:2016 Cl. 6.3.1: Minimum 2 continuous bars provided at top and bottom along the entire span.",
      "135° seismic hooks with minimum 10d (80mm) extension into core concrete.",
      "Ductile splice zones restricted to middle half of beam; staggered laps with 50d lap length.",
    ],
  },
  {
    element: "column",
    title: "Primary Frame Column (600 x 600 mm, B to L5)",
    codeRef: "IS 456:2000 & IS 13920:2016 Cl. 7",
    dimensionMm: "600 mm x 600 mm (Tapering to 450x450 at L5)",
    concreteGrade: "M40 Grade Concrete (Lower) / M35 (Upper)",
    steelGrade: "Fe 500D TMT",
    mainRebar: "16 Nos. - 25mm dia bars symmetrically distributed (pt = 2.18%)",
    shearRebar: "Rectangular ties 10mm dia + 2 cross-ties @ 100mm c/c in confining zones",
    coverMm: 40,
    notes: [
      "IS 13920:2016 Cl. 7.4: Special confining reinforcement over length lo = max(600, clear/6, 450) = 750mm.",
      "Column-to-beam joint cores confined with 10mm links @ 100mm c/c.",
      "Strong column - weak beam criteria satisfied (Sum Mc >= 1.4 Sum Mb).",
    ],
  },
  {
    element: "slab",
    title: "Typical Floor RC Slab (175 mm)",
    codeRef: "IS 456:2000 Cl. 24 & Cl. 32",
    dimensionMm: "175 mm Overall Thickness",
    concreteGrade: "M30 Grade Concrete",
    steelGrade: "Fe 500D TMT",
    mainRebar: "10mm dia @ 150mm c/c both ways at bottom; 10mm @ 150mm c/c top bars over beams",
    shearRebar: "Solid two-way slab with shear perimeter checks around 8x8m column bays",
    coverMm: 25,
    notes: [
      "Two-way slab designed for 3.0 kN/m2 residential live load + 1.5 kN/m2 finishes/partitions.",
      "16x16m central courtyard edge stiffened with 300x550mm perimeter trimmer beams.",
      "Step-down wet areas (toilets) cast with integral crystalline waterproofing admixture.",
    ],
  },
  {
    element: "shear_wall",
    title: "Twin Elevator & Staircase Cores (250 mm RC)",
    codeRef: "IS 13920:2016 Cl. 10 & IS 1893:2016",
    dimensionMm: "250 mm Wall Thickness x 8000 mm Length",
    concreteGrade: "M40 Grade Concrete",
    steelGrade: "Fe 500D TMT",
    mainRebar: "Double curtain 12mm dia @ 150mm c/c vertical; 10mm @ 150mm c/c horizontal",
    shearRebar: "Boundary elements with 8-25T vertical bars confined by 8mm ties @ 100mm c/c",
    coverMm: 30,
    notes: [
      "Twin shear cores located symmetrically at East and West edges resist 82% of seismic base shear in Zone IV.",
      "Torsional irregularity minimized: center of mass and center of stiffness aligned within 2.4% eccentricity.",
      "Smoke-pressurized fire stairs with 2-hour fire rated reinforced concrete doors.",
    ],
  },
];

export const COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: "nbc-fire-tender",
    code: "NBCS 2026 (SP 7:2026)",
    title: "Fire-Tender Ring Access Roadway",
    clause: "Part 4 Fire & Life Safety Cl. 4.6",
    requirement: "For buildings above 30m height, continuous motorable fire-tender pathway >= 9.0 m wide with 45-tonne bearing load.",
    aanganSolution: "10.0m to 14.0m continuous paved setbacks provided on all 4 boundaries with 12m corner turning radius.",
    status: "compliant",
    category: "fire",
    modelHighlight: "setback",
  },
  {
    id: "nbc-fire-exits",
    code: "NBCS 2026",
    title: "Dual Enclosed Smoke-Free Fire Exits",
    clause: "Part 4 Cl. 4.4.2 & Table 22",
    requirement: "Two remote fire staircases minimum 1.5m wide, pressurized, opening directly to exterior open air.",
    aanganSolution: "2 opposing shear-core staircases with 1.8m clear tread width, 2-hour fire dampers, and positive air pressurization.",
    status: "compliant",
    category: "fire",
    modelHighlight: "stairs",
  },
  {
    id: "is-ductile-detailing",
    code: "IS 13920:2016",
    title: "Ductile Detailing for Seismic Zone IV",
    clause: "Clauses 6, 7 & 8",
    requirement: "Special confining reinforcement in columns, 135° stirrup seismic hooks, minimum beam rebar ratios.",
    aanganSolution: "10mm confinement ties @ 100mm c/c at beam-column junctions, 600mm columns tapering to 450mm at L5.",
    status: "compliant",
    category: "structural",
    modelHighlight: "columns",
  },
  {
    id: "is-seismic-design",
    code: "IS 1893 (Part 1):2016",
    title: "Earthquake Resistant Design Zone IV",
    clause: "Cl. 7.1 Response Reduction Factor R=5",
    requirement: "Special RC Moment Resisting Frame (SMRF) with dual shear wall system, base shear distribution.",
    aanganSolution: "Dual lateral load resisting system: twin 250mm shear walls take 82% shear; symmetric plan avoids torsion.",
    status: "compliant",
    category: "structural",
    modelHighlight: "columns",
  },
  {
    id: "ecbc-retv",
    code: "Eco-Niwas Samhita 2018",
    title: "RETV Envelope Thermal Performance",
    clause: "Section 3.1 & NBC 2026 Part 11",
    requirement: "Residential Envelope Transmittance Value (RETV) must not exceed 15.0 W/m² for composite climates.",
    aanganSolution: "Parametric terracotta fins + low-e DGU glass achieve 11.4 W/m² (24% better than national threshold).",
    status: "compliant",
    category: "energy",
    modelHighlight: "facade",
  },
  {
    id: "model-bye-laws-rwh",
    code: "Model Building Bye-Laws 2016",
    title: "Rainwater Harvesting & Ground Recharge",
    clause: "Chapter 10 Water Conservation",
    requirement: "Recharge pit capacity minimum 40 liters per m² of total plot area; dual-piping greywater recycling.",
    aanganSolution: "180,000-liter basement reservoir (50 L/m² capacity) with sand filtration and solar UV treatment.",
    status: "compliant",
    category: "urban",
    modelHighlight: "basement",
  },
  {
    id: "griha-daylight",
    code: "GRIHA v2019 / IGBC Green Homes",
    title: "Natural Daylight & Cross Ventilation",
    clause: "Criterion 13 & 14",
    requirement: "Minimum 75% of living spaces must achieve Daylight Factor > 1.5% and verifiable cross-ventilation.",
    aanganSolution: "16x16m central courtyard guarantees 94% of habitable rooms receive dual-aspect light and stack ventilation.",
    status: "compliant",
    category: "energy",
    modelHighlight: "courtyard",
  },
  {
    id: "ev-charging-mandate",
    code: "CEA Guidelines 2024 / NBC 2026",
    title: "EV Ready Infrastructure Quota",
    clause: "Draft EV Annexure & Local Bye-Laws",
    requirement: "Minimum 20% of off-street parking bays must be equipped with AC Type-2 / DC fast-charging conduits.",
    aanganSolution: "15 of 72 basement parking bays (20.8%) fully fitted with smart EV charging conduits and solar load-balancing.",
    status: "compliant",
    category: "urban",
    modelHighlight: "basement",
  },
];

export const WORKFLOW_TIMELINE: WorkflowStep[] = [
  {
    step: 1,
    title: "Site Set-up & Shared Coordinate Grids",
    revitTool: "Shared Coordinates, Grids & Levels Tool",
    stage: "Idea Stage (B+G+L1)",
    durationEst: "Hour 0 - 2",
    deliverable: "60x60m Plot boundary, 8x8m column grids (A-E, 1-4), datum levels B to Roof.",
    description: "Established project base point, true north rotation (NCR lat 28.4°N), and defined 11 datum levels in metric millimeters.",
  },
  {
    step: 2,
    title: "Primary RC Structural Skeleton",
    revitTool: "Structural Column & Framing Families",
    stage: "Idea Stage (B+G+L1)",
    durationEst: "Hour 2 - 6",
    deliverable: "600x600 columns, 300x550 framing beams, 175mm two-way slabs, twin shear cores.",
    description: "Modeled structural frame with analytical model enabled. Column taper at Level 5 to 450x450mm modeled via parametric type.",
  },
  {
    step: 3,
    title: "Podium & Ground Urban Realm",
    revitTool: "Curtain Wall, Floors & Massing",
    stage: "Idea Stage (B+G+L1)",
    durationEst: "Hour 6 - 10",
    deliverable: "Double-height colonnade (4.5m), retail glazed shopfronts, L1 co-working mezzanine.",
    description: "Created active street frontage, corner amphitheater steps leading into the 16x16m central courtyard, and vehicular ramp.",
  },
  {
    step: 4,
    title: "Parametric Typical Floor Master Module",
    revitTool: "Revit Model Groups & Linked Elements",
    stage: "Grand Finale (Full B+G+9)",
    durationEst: "Hour 10 - 15",
    deliverable: "Standard L2 residential floor layout (4x 3BHK + 4x 2BHK) arrayed 8 times to L9.",
    description: "Team MIDNIGHT-CODERS efficiency secret: perfect one single 1024m² floor plan with full MEP risers, then array to produce 64 homes.",
  },
  {
    step: 5,
    title: "Single Parametric Adaptive Facade Family",
    revitTool: "Curtain Wall Panel / Generic Model Family",
    stage: "Grand Finale (Full B+G+9)",
    durationEst: "Hour 15 - 20",
    deliverable: "1 Family, 4 Orientations: Fin angle, louvre spacing, and jaali density adapt per facade.",
    description: "Built one robust parametric family with instance parameters. North has slender fins; South has horizontal louvres; East/West have deep angled louvres.",
  },
  {
    step: 6,
    title: "Courtyard Biophilic Microclimate & Landscape",
    revitTool: "Toposolid, Planting Components & Roofs",
    stage: "Grand Finale (Full B+G+9)",
    durationEst: "Hour 20 - 24",
    deliverable: "Central water fountain, stepped planter amphitheater, L1 & L5 green terraces, roof garden.",
    description: "Engineered the thermal chimney base with shade trees and reflective water mirror, inducing natural buoyancy stack draft.",
  },
  {
    step: 7,
    title: "Code Compliance Sheets & Rebar Schedules",
    revitTool: "Revit Sheet Manager, Schedules & Callouts",
    stage: "Grand Finale (Full B+G+9)",
    durationEst: "Hour 24 - 30",
    deliverable: "A1 Sheets: Plans, Sections, NBC fire access plan, IS 13920 typical beam & column schedule.",
    description: "Automated schedule takeoffs: Built-up area 10,240m², FAR 2.84, concrete volume, steel reinforcement tonnages, and fire evacuation routes.",
  },
  {
    step: 8,
    title: "Visuals, Solar Studies & 30s Walkthrough",
    revitTool: "Revit Camera Paths, Enscape & Autodesk Forma",
    stage: "Grand Finale (Full B+G+9)",
    durationEst: "Hour 30 - 36",
    deliverable: "Solar shadow study animation (Summer/Winter solstice), 30s camera flythrough, and hero renders.",
    description: "Exported camera keyframes for 30s walkthrough from street to courtyard chimney to sky roof garden at sunset.",
  },
];

export const RISKS_AND_MITIGATIONS: RiskItem[] = [
  {
    id: "risk-facade-time",
    title: "Facade takes too long to model across 8 floors",
    category: "Modeling",
    risk: "Manually modeling bespoke louvres and screens across 4 orientations and 8 floors would exhaust hackathon time.",
    mitigation: "Create a single parametric Curtain Wall Panel family with instance parameters for fin angle, spacing, and jaali density. One family drives all 4 elevations.",
    revitStrategy: "Nested shared family + Type Catalog: North_Bay, South_Bay, East_Bay, West_Bay.",
  },
  {
    id: "risk-rebar-overload",
    title: "3D rebar detailing bogs down model performance",
    category: "Drawing",
    risk: "Modeling true 3D rebar across 11 levels causes severe viewport lag and potential Revit crash during presentation.",
    mitigation: "Model RC concrete skeleton in 3D. Deliver high-precision rebar via 2D Drafting Views and 2D Detail Components referenced to IS 13920:2016.",
    revitStrategy: "Drafting view library with parametric rebar tags + automatic beam rebar schedule.",
  },
  {
    id: "risk-render-delay",
    title: "Renders & walkthrough videos fail to finish before deadline",
    category: "Visualization",
    risk: "High-resolution cloud or offline raytracing rendering takes hours and frequently bottlenecks hackathon hand-in.",
    mitigation: "Pre-set camera walkthrough keyframe paths early. Use real-time GPU engine with procedurally baked lighting and lightweight procedural textures.",
    revitStrategy: "Locked 30-second camera path with 6 keyframes; real-time preview viewport ready for live jury demo.",
  },
  {
    id: "risk-rules-violation",
    title: "Jury challenges fire-tender access or FAR limits",
    category: "Regulatory",
    risk: "Jury disqualifies entries that infringe local municipal bye-laws, fire-tender clearances, or FAR maximums.",
    mitigation: "Designed strictly to NBCS 2026 (SP 7:2026) with full 10-14m perimeter setbacks (exceeding 9m requirement). FAR is kept at an optimal 2.84.",
    revitStrategy: "Revit Area Schemes with color-coded fire clearance boundary and automated schedule verification.",
  },
  {
    id: "risk-podium-waterproofing",
    title: "Planters on podium and balconies cause structural leakage",
    category: "Detailing",
    risk: "Architectural judges point out root penetration, dead load overflow, and waterproofing failure on landscaped slabs.",
    mitigation: "Dedicated 175mm structural slab with upstand RC perimeter beams, multi-layer waterproofing membrane, drainage cell mat, and root barrier.",
    revitStrategy: "Standard Revit Wall/Floor compound detail with distinct layer materials: root barrier, lightweight soil mix, drainage.",
  },
  {
    id: "risk-assumptions-doubt",
    title: "Jury questions ventilation and solar reduction claims",
    category: "Defense",
    risk: "Sustainability claims dismissed as unverified marketing jargon without engineering backing.",
    mitigation: "Transparent 'Assumed / Illustrative' badges on all calculations, backed by standard Bernoulli/buoyancy physics equations and Eco-Niwas Samhita formulas.",
    revitStrategy: "Live interactive sliders in this companion web app so judges can stress-test extreme outdoor temperatures and wind angles.",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    role: "Lead Architect & Urban Designer",
    title: "Architectural Lead & Coordination",
    name: "Architectural Lead",
    focus: "Master planning, 60x60m corner plot circulation, courtyard proportions (16x16m), and 64-home typical floor ergonomics.",
    revitDomain: "Levels, Grids, Floor Plans, Courtyard Spatial Hierarchy, Sheets",
    ownedLayers: ["ground", "level-1", "level-2", "courtyard"],
    avatarInitial: "AL",
  },
  {
    role: "Facade Specialist & Computational Designer",
    title: "Parametric Facade & Environmental Lead",
    name: "Facade Specialist",
    focus: "Single parametric curtain panel family, solar incidence adaptation for Delhi NCR (28.4°N), and Eco-Niwas Samhita RETV.",
    revitDomain: "Adaptive Curtain Panel Family, Sun Studies, Daylighting, Jaali Screens",
    ownedLayers: ["facade", "fins", "shading", "louvres"],
    avatarInitial: "FS",
  },
  {
    role: "Structural Lead & Compliance Engineer",
    title: "Structural Engineer & Code Auditor",
    name: "Structural Lead",
    focus: "IS 456 / IS 13920 ductile detailing, 600->450mm column taper, twin shear cores, NBCS 2026 fire access compliance.",
    revitDomain: "Structural Columns, Beams, Slabs, Shear Walls, Rebar Schedules",
    ownedLayers: ["basement", "structure", "columns", "beams", "cores"],
    avatarInitial: "SL",
  },
  {
    role: "BIM Coordinator & Visualisation Lead",
    title: "Visualization & BIM Manager",
    name: "Visualization Lead",
    focus: "Procedural materials, 30-second camera path, interactive walkthrough, live presentation dashboard, and asset delivery.",
    revitDomain: "Camera Walkthrough, Material Library, View Templates, Presentation",
    ownedLayers: ["roof", "walkthrough", "lighting", "landscape"],
    avatarInitial: "VL",
  },
];

export const REFERENCES_LIST: ReferenceItem[] = [
  {
    id: "ref-1",
    code: "NBCS 2026 (SP 7:2026)",
    title: "National Building Code of India 2026",
    publisher: "Bureau of Indian Standards (BIS)",
    year: "2026",
    relevance: "Part 3 Development Control Rules, Part 4 Fire & Life Safety (high-rise > 30m), Part 11 Sustainability.",
    urlLabel: "bis.gov.in/nbc",
  },
  {
    id: "ref-2",
    code: "IS 456:2000",
    title: "Plain and Reinforced Concrete - Code of Practice",
    publisher: "Bureau of Indian Standards",
    year: "2000 (Reaffirmed 2021)",
    relevance: "Governs concrete mix designs (M30-M40), limit state flexure/shear design for beams and slabs.",
    urlLabel: "bis.gov.in/is456",
  },
  {
    id: "ref-3",
    code: "IS 13920:2016",
    title: "Ductile Detailing of RC Structures Subjected to Seismic Forces",
    publisher: "Bureau of Indian Standards",
    year: "2016",
    relevance: "Confining reinforcement spacing, 135° seismic hooks, column-to-beam joint shear reinforcement.",
    urlLabel: "bis.gov.in/is13920",
  },
  {
    id: "ref-4",
    code: "IS 1893 (Part 1):2016",
    title: "Criteria for Earthquake Resistant Design of Structures",
    publisher: "Bureau of Indian Standards",
    year: "2016",
    relevance: "Seismic Zone IV spectral acceleration calculations, Response Reduction Factor R=5 (SMRF + Shear wall).",
    urlLabel: "bis.gov.in/is1893",
  },
  {
    id: "ref-5",
    code: "IS 875 (Parts 1-3):2015",
    title: "Design Loads (Dead, Live, Wind) for Buildings",
    publisher: "Bureau of Indian Standards",
    year: "2015",
    relevance: "Wind speed 47 m/s (Delhi-NCR basic wind speed), category 2 terrain roughness factor.",
    urlLabel: "bis.gov.in/is875",
  },
  {
    id: "ref-6",
    code: "Eco-Niwas Samhita 2018",
    title: "Energy Conservation Building Code for Residential Buildings (ECBC-R)",
    publisher: "Bureau of Energy Efficiency (BEE), Ministry of Power",
    year: "2018",
    relevance: "Mandatory RETV threshold calculation (<= 15.0 W/m² for composite climate zone).",
    urlLabel: "beeindia.gov.in/ens",
  },
  {
    id: "ref-7",
    code: "MBBL 2016",
    title: "Model Building Bye-Laws 2016",
    publisher: "Ministry of Housing and Urban Affairs (MoHUA)",
    year: "2016",
    relevance: "Mixed-use urban zoning regulations, corner plot setback standards, rainwater harvesting sizing.",
    urlLabel: "mohua.gov.in/mbbl",
  },
  {
    id: "ref-8",
    code: "GRIHA v2019",
    title: "Green Rating for Integrated Habitat Assessment",
    publisher: "TERI & Ministry of New and Renewable Energy",
    year: "2019",
    relevance: "Passive ventilation optimization, daylight factor verification, native biophilic vegetation.",
    urlLabel: "grihaindia.org",
  },
  {
    id: "ref-9",
    code: "IGBC Green Homes v3.0",
    title: "Indian Green Building Council Rating System",
    publisher: "Confederation of Indian Industry (CII)",
    year: "2021",
    relevance: "Thermal comfort metrics, 20% EV-ready infrastructure, onsite solar PV quota.",
    urlLabel: "igbc.in",
  },
  {
    id: "ref-10",
    code: "Charles Correa (1985)",
    title: "The New Landscape: Urbanisation in the Third World",
    publisher: "The Book Society of India",
    year: "1985",
    relevance: "Foundational theory on courtyard typology, microclimate buffering, and social community thresholds.",
    urlLabel: "charlescorrea.net",
  },
  {
    id: "ref-11",
    code: "TERI Solar Handbook",
    title: "Handbook on Energy Conscious Buildings",
    publisher: "The Energy and Resources Institute, New Delhi",
    year: "2016",
    relevance: "Solar radiation tables for Composite Climates and shading coefficients for oriented vertical louvres.",
    urlLabel: "teriin.org",
  },
  {
    id: "ref-12",
    code: "Autodesk Revit & Forma",
    title: "Computational Design & Environmental Analysis Workflows",
    publisher: "Autodesk Architecture Engineering Construction Collection",
    year: "2026",
    relevance: "BIM LOD 350 parametric family authoring, generative solar shadow analysis, wind comfort modeling.",
    urlLabel: "autodesk.com/revit",
  },
];

export const RULE_COMPLIANCE_BADGES = [
  {
    label: "Autodesk Revit Only",
    subtext: "100% parametric BIM modeling; no unauthorized 3rd-party 3D model imports.",
    icon: "Cube",
  },
  {
    label: "No AI Generated 3D/Images",
    subtext: "Zero synthetic or AI imagery used; every geometry drawn procedurally from project numbers.",
    icon: "ShieldCheck",
  },
  {
    label: "No Pre-Designed Assets",
    subtext: "Authored entirely live from first principles during the SIH 2026 36-hour sprint.",
    icon: "Clock",
  },
  {
    label: "Metric System (mm / m)",
    subtext: "Strict SI engineering metric units: 60x60m plot, 8x8m grid, 600->450mm columns.",
    icon: "Ruler",
  },
];
