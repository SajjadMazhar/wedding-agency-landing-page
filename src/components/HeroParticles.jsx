import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext.jsx';

function getAccent() {
  return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#D4A843';
}

function GoldParticles({ count = 300, accent }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y = time * 0.02;
    ref.current.rotation.x = Math.sin(time * 0.01) * 0.1;
    const posArray = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += 0.003;
      if (posArray[i * 3 + 1] > 5) {
        posArray[i * 3 + 1] = -5;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={accent}
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function MandalaRing({ accent }) {
  const ref = useRef();
  const geometry = useMemo(() => new THREE.TorusKnotGeometry(2.2, 0.02, 200, 8, 3, 5), []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.2;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshBasicMaterial color={accent} wireframe opacity={0.15} transparent />
    </mesh>
  );
}

export default function HeroParticles() {
  const { theme } = useTheme();
  const accent = getAccent();

  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ pointerEvents: 'none' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <GoldParticles count={250} accent={accent} />
        <MandalaRing accent={accent} />
      </Canvas>
    </div>
  );
}
