import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Grid } from '@react-three/drei';
import * as THREE from 'three';
import HelixBeam from './HelixBeam';
import projects from '../../data/projects';
 
const DynamicGrid = ({ accentRgb }) => {
  const gridRef = useRef();
  const currentColor = useRef(new THREE.Color(...accentRgb));
  const targetColor = useRef(new THREE.Color(...accentRgb));
 
  useFrame(() => {
    if (!gridRef.current) return;
    targetColor.current.setRGB(...accentRgb);
    currentColor.current.lerp(targetColor.current, 0.04);
    const mat = gridRef.current.material;
    if (mat && mat.uniforms) {
      if (mat.uniforms.sectionColor) mat.uniforms.sectionColor.value.copy(currentColor.current);
      if (mat.uniforms.cellColor) {
        const dimColor = currentColor.current.clone().multiplyScalar(0.3);
        mat.uniforms.cellColor.value.copy(dimColor);
      }
    }
  });
 
  return (
    <Grid
      ref={gridRef}
      position={[0, -2, 0]}
      cellSize={1}
      cellThickness={0.8}
      cellColor="#1a1a2e"
      sectionSize={5}
      sectionThickness={1.2}
      sectionColor="#7B61FF"
      fadeDistance={40}
      fadeStrength={1}
      infiniteGrid
    />
  );
};
 
const SceneManager = ({ accentRgb = [0.48, 0.38, 1.0], scrollProgress = 0 }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={0.5} />
      <DynamicGrid accentRgb={accentRgb} />
      <HelixBeam scrollProgress={scrollProgress} projects={projects} />
    </>
  );
};
 
export default SceneManager;