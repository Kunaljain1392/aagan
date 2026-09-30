import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { BuildingModel } from './BuildingModel';
import { SunOrbit } from './SunOrbit';
import { WalkthroughController } from './WalkthroughController';
import { useAppStore } from '../../store/useAppStore';

// Procedural atmospheric floating particles
const DustParticles: React.FC = () => {
  const count = 120;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = Math.random() * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        color="#FFA733"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
};

export const BuildingScene: React.FC = () => {
  const { walkthrough, dayNightMode } = useAppStore();
  const isNight = dayNightMode === 'night';

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        camera={{ position: [42, 28, 42], fov: 42, near: 0.5, far: 500 }}
        gl={{ antialias: true, localClippingEnabled: true }}
      >
        <Suspense fallback={null}>
          {/* Day / Night Environment Sky */}
          {isNight ? (
            <color attach="background" args={['#030712']} />
          ) : (
            <color attach="background" args={['#071026']} />
          )}

          {isNight && <Stars radius={80} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />}

          {/* Procedural Building Model */}
          <BuildingModel />

          {/* Real Solar Arc, Lighting & Shadows */}
          <SunOrbit />

          {/* Floating Atmospheric Particles */}
          <DustParticles />

          {/* 30s Walkthrough Camera Controller */}
          <WalkthroughController />

          {/* Orbit Controls (disabled when 30s walkthrough is running) */}
          <OrbitControls
            enabled={!walkthrough.isPlaying}
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2 - 0.02} // Prevent camera going beneath ground
            minDistance={8}
            maxDistance={140}
            target={[0, 14, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
