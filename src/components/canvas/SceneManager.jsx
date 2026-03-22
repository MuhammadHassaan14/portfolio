import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid, Stars } from '@react-three/drei';
import * as THREE from 'three';
import useScrollProgress from '../../hooks/useScrollProgress';
 
const IcosahedronCore = ({ progress }) => {
  const meshRef = useRef();
  const groupRef = useRef();
 
  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
 
    const rotationSpeed = 0.5 + progress * 4.5;
    meshRef.current.rotation.y += state.delta * rotationSpeed;
    meshRef.current.rotation.x += state.delta * rotationSpeed * 0.4;
 
    groupRef.current.position.y = 2 + Math.sin(t * 1.5) * 0.3;
  });
 
  const fadeIn = THREE.MathUtils.smoothstep(progress, 0.15, 0.30);
  const fadeOut = 1 - THREE.MathUtils.smoothstep(progress, 0.60, 0.75);
  const opacity = fadeIn * fadeOut;
 
  return (
    <group ref={groupRef} position={[2.2, 2, 8]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial
          color="#00f5d4"
          wireframe={true}
          transparent={true}
          opacity={opacity}
          visible={opacity > 0.01}
        />
      </mesh>
    </group>
  );
};
 
const SceneManager = () => {
  const scrollProgress = useScrollProgress();
 
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f5d4" />
      <Stars radius={80} depth={50} count={3000} factor={4} fade speed={1} />
      <Grid
        position={[0, -1, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        cellColor="#0a2a2a"
        sectionSize={5}
        sectionColor="#00f5d4"
        fadeDistance={30}
      />
      <IcosahedronCore progress={scrollProgress} />
    </>
  );
};
 
export default SceneManager;