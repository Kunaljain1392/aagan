import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';
import { PROJECT_CONFIG, LEVELS_DATA } from '../../data/project';

// Grid coordinates for columns (5 bays E-W x 4 bays N-S)
// E-W: 40m total -> x from -16 to +16 in 8m increments: [-16, -8, 0, 8, 16]
// N-S: 32m total -> z from -12 to +12 in 8m increments: [-12, -4, 4, 12]
const GRID_X = [-16, -8, 0, 8, 16];
const GRID_Z = [-12, -4, 4, 12];

// Courtyard bounds: -8 to +8 in X, -8 to +8 in Z (16m x 16m)
const isInsideCourtyard = (x: number, z: number) => {
  return Math.abs(x) < 7.9 && Math.abs(z) < 7.9;
};

export const BuildingModel: React.FC = () => {
  const {
    isolatedLevelIndex,
    isExplodedView,
    isSectionCut,
    facadeParams,
    dayNightMode,
    modelHighlightTarget,
    showArchitectureWithStructure,
    selectedStructuralMember,
    activeWorkflowStep,
  } = useAppStore();

  const groupRef = useRef<THREE.Group>(null);

  // Clipping plane for Section Cut along Z axis (cutting front to reveal courtyard chimney)
  const clippingPlanes = useMemo(() => {
    if (!isSectionCut) return [];
    return [new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)];
  }, [isSectionCut]);

  // Current dynamic exploded offsets (interpolated per frame)
  const explodedOffsets = useRef<number[]>(new Array(11).fill(0));

  useFrame((_, delta) => {
    // Target exploded displacement
    // 0: Basement, 1: Ground, 2: L1, 3..10: L2..L9, Roof
    for (let i = 0; i < 11; i++) {
      let target = 0;
      if (isExplodedView) {
        if (i === 0) target = -8; // Basement drops
        else if (i === 1) target = 0;  // Ground stays
        else if (i === 2) target = 4;  // L1 lifts
        else if (i >= 3 && i <= 9) target = 8 + (i - 2) * 2.2; // Residential ring spreads
        else if (i === 10) target = 28; // Roof garden lifts high
      }
      // Smooth lerp
      explodedOffsets.current[i] += (target - explodedOffsets.current[i]) * Math.min(1, delta * 6);
    }
  });

  // Materials
  const materials = useMemo(() => {
    const isNight = dayNightMode === 'night';
    const clip = clippingPlanes.length > 0 ? clippingPlanes : undefined;

    return {
      concrete: new THREE.MeshStandardMaterial({
        color: '#4A5568',
        roughness: 0.8,
        metalness: 0.1,
        clippingPlanes: clip,
        clipShadows: true,
      }),
      concreteTapered: new THREE.MeshStandardMaterial({
        color: '#718096',
        roughness: 0.7,
        metalness: 0.1,
        clippingPlanes: clip,
        clipShadows: true,
      }),
      slab: new THREE.MeshStandardMaterial({
        color: '#2D3748',
        roughness: 0.85,
        clippingPlanes: clip,
        clipShadows: true,
      }),
      terracottaFin: new THREE.MeshStandardMaterial({
        color: '#E0801F',
        roughness: 0.45,
        metalness: 0.15,
        clippingPlanes: clip,
        clipShadows: true,
      }),
      jaali: new THREE.MeshStandardMaterial({
        color: '#B85A00',
        roughness: 0.6,
        wireframe: true,
        clippingPlanes: clip,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: isNight ? '#FFD59E' : '#90CDF4',
        emissive: isNight ? '#FFA733' : '#000000',
        emissiveIntensity: isNight ? 0.7 : 0.0,
        roughness: 0.1,
        transmission: 0.85,
        thickness: 0.5,
        transparent: true,
        opacity: isNight ? 0.9 : 0.4,
        clippingPlanes: clip,
      }),
      retailColonnade: new THREE.MeshStandardMaterial({
        color: '#0F8A7A',
        roughness: 0.4,
        metalness: 0.2,
        clippingPlanes: clip,
      }),
      communityPurple: new THREE.MeshStandardMaterial({
        color: '#6B3FB5',
        roughness: 0.5,
        metalness: 0.15,
        clippingPlanes: clip,
      }),
      greenTerrace: new THREE.MeshStandardMaterial({
        color: '#2E7D32',
        roughness: 0.9,
        clippingPlanes: clip,
      }),
      solarPV: new THREE.MeshStandardMaterial({
        color: '#1A365D',
        metalness: 0.8,
        roughness: 0.2,
        clippingPlanes: clip,
      }),
      shearCore: new THREE.MeshStandardMaterial({
        color: '#4B5563',
        roughness: 0.7,
        clippingPlanes: clip,
      }),
      waterPool: new THREE.MeshStandardMaterial({
        color: '#0284C7',
        roughness: 0.1,
        metalness: 0.8,
      }),
      highlight: new THREE.MeshStandardMaterial({
        color: '#F59E0B',
        emissive: '#D97706',
        emissiveIntensity: 0.8,
      }),
    };
  }, [dayNightMode, clippingPlanes]);

  // Elevation heights mapped in meters (scaled for 3D scene: 1 unit = 1 meter)
  // Total height = ~34.9m
  // Footprint: 40m x 32m, Courtyard: 16m x 16m
  const floorHeightsM = [3.6, 4.5, 4.0, 3.3, 3.3, 3.3, 3.3, 3.3, 3.3, 3.3, 3.0];
  const floorBaseYM = [-3.6, 0, 4.5, 8.5, 11.8, 15.1, 18.4, 21.7, 25.0, 28.3, 31.6];

  // Helper to test if a level should render given workflow step or isolation
  const shouldRenderLevel = (levelIndex: number) => {
    // If isolated, only show this level
    if (isolatedLevelIndex !== -1 && isolatedLevelIndex !== levelIndex) {
      return false;
    }
    // Workflow stage filtering:
    // Step 1: Site only
    // Step 2: Structure skeleton
    // Step 3: Podium (Basement, G, L1)
    if (activeWorkflowStep <= 3 && levelIndex > 2) {
      return false;
    }
    return true;
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 60x60m Plot Ground Base */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
        receiveShadow
      >
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color={modelHighlightTarget === 'setback' ? '#F59E0B' : '#0B1528'}
          roughness={0.9}
        />
      </mesh>

      {/* Setback / Fire-tender road demarcation line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <ringGeometry args={[26, 27, 4]} />
        <meshBasicMaterial
          color={modelHighlightTarget === 'setback' ? '#FFA733' : '#1C3156'}
        />
      </mesh>

      {/* Central Courtyard Ground Water Mirror & Fountain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[4.5, 32]} />
        <primitive object={materials.waterPool} attach="material" />
      </mesh>

      {/* RENDER EACH LEVEL */}
      {LEVELS_DATA.map((lvl, lvlIdx) => {
        if (!shouldRenderLevel(lvlIdx)) return null;

        const baseElevation = floorBaseYM[lvlIdx] || 0;
        const heightM = floorHeightsM[lvlIdx] || 3.3;
        const explodedY = explodedOffsets.current[lvlIdx] || 0;
        const isTapered = lvlIdx >= 6; // Above L5 columns are 450mm
        const colSize = isTapered ? 0.45 : 0.6; // 600mm or 450mm
        const slabY = baseElevation + explodedY;

        // Is this element highlighted in compliance checks?
        const isHighlighted =
          (modelHighlightTarget === 'basement' && lvlIdx === 0) ||
          (modelHighlightTarget === 'courtyard' && lvlIdx >= 1) ||
          (modelHighlightTarget === 'facade' && lvlIdx >= 3 && lvlIdx <= 9);

        return (
          <group key={lvl.id} position={[0, explodedY, 0]}>
            {/* 1. FLOOR SLAB (175mm = 0.175m) with 16x16m central opening */}
            {/* Slabs are drawn as 4 outer rectangles leaving the 16x16m void open */}
            {/* Building: 40m E-W (x: -20 to 20), 32m N-S (z: -16 to 16) */}
            {/* Courtyard void: x: -8 to 8, z: -8 to 8 */}
            <group position={[0, baseElevation, 0]}>
              {/* North slab strip: x -20 to 20, z -16 to -8 (depth 8m) */}
              <mesh position={[0, 0.0875, -12]} receiveShadow castShadow>
                <boxGeometry args={[40, 0.175, 8]} />
                <primitive
                  object={
                    selectedStructuralMember === 'slab'
                      ? materials.highlight
                      : lvlIdx === 0
                      ? materials.concrete
                      : lvlIdx === 1
                      ? materials.retailColonnade
                      : lvlIdx === 2
                      ? materials.communityPurple
                      : lvlIdx === 6 || lvlIdx === 10
                      ? materials.greenTerrace
                      : materials.slab
                  }
                  attach="material"
                />
              </mesh>

              {/* South slab strip: x -20 to 20, z 8 to 16 (depth 8m) */}
              <mesh position={[0, 0.0875, 12]} receiveShadow castShadow>
                <boxGeometry args={[40, 0.175, 8]} />
                <primitive
                  object={
                    selectedStructuralMember === 'slab'
                      ? materials.highlight
                      : lvlIdx === 0
                      ? materials.concrete
                      : lvlIdx === 1
                      ? materials.retailColonnade
                      : lvlIdx === 2
                      ? materials.communityPurple
                      : lvlIdx === 6 || lvlIdx === 10
                      ? materials.greenTerrace
                      : materials.slab
                  }
                  attach="material"
                />
              </mesh>

              {/* West slab strip: x -20 to -8, z -8 to 8 (width 12m, depth 16m) */}
              <mesh position={[-14, 0.0875, 0]} receiveShadow castShadow>
                <boxGeometry args={[12, 0.175, 16]} />
                <primitive
                  object={
                    selectedStructuralMember === 'slab'
                      ? materials.highlight
                      : lvlIdx === 0
                      ? materials.concrete
                      : lvlIdx === 1
                      ? materials.retailColonnade
                      : lvlIdx === 2
                      ? materials.communityPurple
                      : lvlIdx === 6 || lvlIdx === 10
                      ? materials.greenTerrace
                      : materials.slab
                  }
                  attach="material"
                />
              </mesh>

              {/* East slab strip: x 8 to 20, z -8 to 8 (width 12m, depth 16m) */}
              <mesh position={[14, 0.0875, 0]} receiveShadow castShadow>
                <boxGeometry args={[12, 0.175, 16]} />
                <primitive
                  object={
                    selectedStructuralMember === 'slab'
                      ? materials.highlight
                      : lvlIdx === 0
                      ? materials.concrete
                      : lvlIdx === 1
                      ? materials.retailColonnade
                      : lvlIdx === 2
                      ? materials.communityPurple
                      : lvlIdx === 6 || lvlIdx === 10
                      ? materials.greenTerrace
                      : materials.slab
                  }
                  attach="material"
                />
              </mesh>
            </group>

            {/* 2. STRUCTURAL COLUMNS ON THE 8x8m GRID (Height = floor height) */}
            {GRID_X.map((gx) =>
              GRID_Z.map((gz) => {
                // Skip if column would fall completely inside open 16x16m courtyard
                if (isInsideCourtyard(gx, gz)) return null;

                const colMat =
                  selectedStructuralMember === 'column' || modelHighlightTarget === 'columns'
                    ? materials.highlight
                    : isTapered
                    ? materials.concreteTapered
                    : materials.concrete;

                return (
                  <mesh
                    key={`col-${lvlIdx}-${gx}-${gz}`}
                    position={[gx, baseElevation + heightM / 2, gz]}
                    castShadow
                    receiveShadow
                  >
                    <boxGeometry args={[colSize, heightM, colSize]} />
                    <primitive object={colMat} attach="material" />
                  </mesh>
                );
              })
            )}

            {/* 3. PERIMETER BEAMS (300 x 550mm) */}
            {selectedStructuralMember === 'beam' && (
              <group position={[0, baseElevation + heightM - 0.275, 0]}>
                {/* North & South Outer Perimeter Beams (40m long) */}
                <mesh position={[0, 0, -16]}>
                  <boxGeometry args={[40, 0.55, 0.3]} />
                  <primitive object={materials.highlight} attach="material" />
                </mesh>
                <mesh position={[0, 0, 16]}>
                  <boxGeometry args={[40, 0.55, 0.3]} />
                  <primitive object={materials.highlight} attach="material" />
                </mesh>
                {/* East & West Outer Beams (32m long) */}
                <mesh position={[-20, 0, 0]}>
                  <boxGeometry args={[0.3, 0.55, 32]} />
                  <primitive object={materials.highlight} attach="material" />
                </mesh>
                <mesh position={[20, 0, 0]}>
                  <boxGeometry args={[0.3, 0.55, 32]} />
                  <primitive object={materials.highlight} attach="material" />
                </mesh>
                {/* Courtyard Trimmer Beams (16m long along courtyard edge) */}
                <mesh position={[0, 0, -8]}>
                  <boxGeometry args={[16, 0.55, 0.3]} />
                  <primitive object={materials.highlight} attach="material" />
                </mesh>
                <mesh position={[0, 0, 8]}>
                  <boxGeometry args={[16, 0.55, 0.3]} />
                  <primitive object={materials.highlight} attach="material" />
                </mesh>
                <mesh position={[-8, 0, 0]}>
                  <boxGeometry args={[0.3, 0.55, 16]} />
                  <primitive object={materials.highlight} attach="material" />
                </mesh>
                <mesh position={[8, 0, 0]}>
                  <boxGeometry args={[0.3, 0.55, 16]} />
                  <primitive object={materials.highlight} attach="material" />
                </mesh>
              </group>
            )}

            {/* 4. TWIN SHEAR-WALL CORES & PRESSURIZED STAIRS (East and West flanks) */}
            <group position={[0, baseElevation + heightM / 2, 0]}>
              {/* West Shear Core */}
              <mesh position={[-16, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.8, heightM, 8.0]} />
                <primitive
                  object={
                    selectedStructuralMember === 'shear_wall' || modelHighlightTarget === 'stairs'
                      ? materials.highlight
                      : materials.shearCore
                  }
                  attach="material"
                />
              </mesh>
              {/* East Shear Core */}
              <mesh position={[16, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.8, heightM, 8.0]} />
                <primitive
                  object={
                    selectedStructuralMember === 'shear_wall' || modelHighlightTarget === 'stairs'
                      ? materials.highlight
                      : materials.shearCore
                  }
                  attach="material"
                />
              </mesh>
            </group>

            {/* 5. ARCHITECTURAL ENVELOPE & ADAPTIVE FACADE FINS (Shown if showArchitecture is true) */}
            {showArchitectureWithStructure && lvlIdx >= 1 && lvlIdx <= 9 && (
              <group position={[0, baseElevation + heightM / 2, 0]}>
                {/* Interior Living Glazing Curtain (Recessed by 0.8m for balcony shade) */}
                {/* North Glazing */}
                <mesh position={[0, 0, -15.2]} castShadow>
                  <boxGeometry args={[38, heightM - 0.4, 0.05]} />
                  <primitive object={materials.glass} attach="material" />
                </mesh>
                {/* South Glazing */}
                <mesh position={[0, 0, 15.2]} castShadow>
                  <boxGeometry args={[38, heightM - 0.4, 0.05]} />
                  <primitive object={materials.glass} attach="material" />
                </mesh>
                {/* East Glazing */}
                <mesh position={[19.2, 0, 0]} castShadow>
                  <boxGeometry args={[0.05, heightM - 0.4, 30]} />
                  <primitive object={materials.glass} attach="material" />
                </mesh>
                {/* West Glazing */}
                <mesh position={[-19.2, 0, 0]} castShadow>
                  <boxGeometry args={[0.05, heightM - 0.4, 30]} />
                  <primitive object={materials.glass} attach="material" />
                </mesh>

                {/* ADAPTIVE PARAMETRIC FACADE FINS ON EXTERIOR (Level 2 to 9) */}
                {lvlIdx >= 3 && (
                  <group>
                    {/* SOUTH FACADE: Horizontal cantilevered louvres */}
                    {[-1.0, 0, 1.0].map((hOffset, idx) => (
                      <mesh
                        key={`s-louvre-${lvlIdx}-${idx}`}
                        position={[0, hOffset, 16.2]}
                        castShadow
                      >
                        <boxGeometry args={[38, 0.06, facadeParams.louvreDepthMm / 1000]} />
                        <primitive
                          object={isHighlighted ? materials.highlight : materials.terracottaFin}
                          attach="material"
                        />
                      </mesh>
                    ))}

                    {/* EAST FACADE: Angled vertical fins for morning low-angle sun */}
                    {[-12, -8, -4, 0, 4, 8, 12].map((zPos, idx) => (
                      <mesh
                        key={`e-fin-${lvlIdx}-${idx}`}
                        position={[20.2, 0, zPos]}
                        rotation={[0, (facadeParams.finRotationDeg * Math.PI) / 180, 0]}
                        castShadow
                      >
                        <boxGeometry args={[facadeParams.finDepthMm / 1000, heightM - 0.2, 0.05]} />
                        <primitive
                          object={isHighlighted ? materials.highlight : materials.terracottaFin}
                          attach="material"
                        />
                      </mesh>
                    ))}

                    {/* WEST FACADE: Deep vertical louvres blocking harsh afternoon heat */}
                    {[-12, -8, -4, 0, 4, 8, 12].map((zPos, idx) => (
                      <mesh
                        key={`w-fin-${lvlIdx}-${idx}`}
                        position={[-20.2, 0, zPos]}
                        rotation={[0, (-facadeParams.finRotationDeg * Math.PI) / 180, 0]}
                        castShadow
                      >
                        <boxGeometry args={[facadeParams.finDepthMm / 1000 + 0.15, heightM - 0.2, 0.06]} />
                        <primitive
                          object={isHighlighted ? materials.highlight : materials.terracottaFin}
                          attach="material"
                        />
                      </mesh>
                    ))}

                    {/* NORTH FACADE: Slender vertical fins maximizing diffuse glare-free daylight */}
                    {[-14, -10, -6, -2, 2, 6, 10, 14].map((xPos, idx) => (
                      <mesh
                        key={`n-fin-${lvlIdx}-${idx}`}
                        position={[xPos, 0, -16.2]}
                        castShadow
                      >
                        <boxGeometry args={[0.04, heightM - 0.2, 0.25]} />
                        <primitive
                          object={isHighlighted ? materials.highlight : materials.terracottaFin}
                          attach="material"
                        />
                      </mesh>
                    ))}

                    {/* Terracotta Jaali Balcony Screen accents */}
                    <mesh position={[0, -0.9, 16.1]}>
                      <boxGeometry args={[14, 0.9, 0.04]} />
                      <primitive object={materials.jaali} attach="material" />
                    </mesh>
                  </group>
                )}
              </group>
            )}

            {/* 6. ROOF PERGOLAS & SOLAR PV (Top floor lvlIdx = 10) */}
            {lvlIdx === 10 && showArchitectureWithStructure && (
              <group position={[0, baseElevation + 1.2, 0]}>
                {/* 85 kWp Bifacial Solar PV Pergolas (Tilted 28° facing South) */}
                {[-12, 0, 12].map((xOff, pIdx) => (
                  <mesh
                    key={`pv-${pIdx}`}
                    position={[xOff, 2.2, 10]}
                    rotation={[-0.48, 0, 0]}
                    castShadow
                  >
                    <boxGeometry args={[7, 0.08, 4.5]} />
                    <primitive object={materials.solarPV} attach="material" />
                  </mesh>
                ))}

                {/* Aerodynamic Thermal Chimney Cowl over central 16x16m void */}
                <mesh position={[0, 3.2, 0]}>
                  <ringGeometry args={[7.5, 8.2, 4]} />
                  <meshStandardMaterial color="#B85A00" side={THREE.DoubleSide} />
                </mesh>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
};
