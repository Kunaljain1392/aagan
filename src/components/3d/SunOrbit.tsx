import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';
import { calculateSolarPosition } from '../../sim/solar';

export const SunOrbit: React.FC = () => {
  const { solarMonth, solarHour, dayNightMode } = useAppStore();

  const isNight = dayNightMode === 'night';
  const solar = useMemo(
    () => calculateSolarPosition(solarMonth, isNight ? 23 : solarHour),
    [solarMonth, solarHour, isNight]
  );

  // Generate celestial arc trajectory points for this month
  const orbitPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let h = 5.0; h <= 19.0; h += 0.5) {
      const pos = calculateSolarPosition(solarMonth, h);
      if (pos.isDaylight) {
        points.push(new THREE.Vector3(pos.sunVector[0], pos.sunVector[1], pos.sunVector[2]));
      }
    }
    return points;
  }, [solarMonth]);

  const curveGeometry = useMemo(() => {
    if (orbitPoints.length < 2) return null;
    const curve = new THREE.CatmullRomCurve3(orbitPoints);
    return new THREE.TubeGeometry(curve, 64, 0.25, 8, false);
  }, [orbitPoints]);

  const sunColor = isNight
    ? '#93C5FD' // Moon cool blue
    : solar.altitudeDeg < 15
    ? '#F97316' // Golden dawn/dusk orange
    : '#FEF08A'; // High midday warm white

  const sunPos = isNight ? [-40, 50, -40] : solar.sunVector;

  return (
    <group>
      {/* Directional Sun / Moon Light with High-Res Shadow Map */}
      <directionalLight
        position={sunPos as [number, number, number]}
        intensity={isNight ? 0.4 : Math.max(0.5, (solar.altitudeDeg / 90) * 2.8 + 0.5)}
        color={sunColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={10}
        shadow-camera-far={250}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0005}
      />

      {/* Atmospheric ambient lighting */}
      <ambientLight intensity={isNight ? 0.35 : 0.75} color={isNight ? '#1E293B' : '#E2E8F0'} />

      {/* Courtyard interior uplight / lantern illumination */}
      <pointLight position={[0, 1.5, 0]} intensity={isNight ? 4.5 : 1.2} color="#FFA733" distance={25} />

      {/* Visible Celestial Sun / Moon Sphere */}
      <mesh position={sunPos as [number, number, number]}>
        <sphereGeometry args={[isNight ? 2.5 : 3.8, 32, 32]} />
        <meshBasicMaterial color={sunColor} />
      </mesh>

      {/* Visible Sun Path Arc Trajectory */}
      {!isNight && curveGeometry && (
        <mesh geometry={curveGeometry}>
          <meshBasicMaterial color="#E0801F" transparent opacity={0.35} />
        </mesh>
      )}
    </group>
  );
};
