import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext.jsx';

function getAccent() {
  return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#D4A843';
}

function FloatingParticles({ count = 180, accent }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.y = time * 0.015;
    ref.current.rotation.x = Math.sin(time * 0.008) * 0.05;
    const posArray = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += 0.002;
      posArray[i * 3] += Math.sin(time + i) * 0.0003;
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
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function GalleryParticles() {
  const { theme } = useTheme();
  const accent = getAccent();

  return (
    <div className="gallery-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ pointerEvents: 'none' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <FloatingParticles count={180} accent={accent} />
      </Canvas>
    </div>
  );
}
