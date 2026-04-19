import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Grid } from '@react-three/drei';
import * as THREE from 'three';
import VerticalLine from './VerticalLine';
import projects from '../../data/projects';
 
const DynamicGrid = ({ accentRgb, scrollProgress }) => {
  const gridRef = useRef();
  const currentColor = useRef(new THREE.Color(...accentRgb));
  const targetColor = useRef(new THREE.Color(...accentRgb));
  const posY = useRef(-2);
 
  useFrame(() => {
    if (!gridRef.current) return;
 
    // Lerp color
    targetColor.current.setRGB(accentRgb[0], accentRgb[1], accentRgb[2]);
    currentColor.current.lerp(targetColor.current, 0.04);
 
    const mat = gridRef.current.material;
    if (mat && mat.uniforms) {
      if (mat.uniforms.sectionColor) {
        mat.uniforms.sectionColor.value.copy(currentColor.current);
      }
      if (mat.uniforms.cellColor) {
        mat.uniforms.cellColor.value.copy(
          currentColor.current.clone().multiplyScalar(0.3)
        );
      }
    }
 
    // Rise and fade between 0.44 and 0.54
    let targetY = -2;
    let colorScale = 1;
    if (scrollProgress > 0.44 && scrollProgress <= 0.54) {
      const p = (scrollProgress - 0.44) / 0.10;
      targetY = THREE.MathUtils.lerp(-2, 6, p);
      colorScale = 1 - p;
    } else if (scrollProgress > 0.54) {
      targetY = 6;
      colorScale = 0;
    }
 
    posY.current += (targetY - posY.current) * 0.06;
    gridRef.current.position.y = posY.current;
 
    // Fade by scaling color brightness
    if (mat && mat.uniforms) {
      const o = Math.max(0, colorScale);
      if (mat.uniforms.sectionColor) {
        mat.uniforms.sectionColor.value.copy(
          currentColor.current.clone().multiplyScalar(o)
        );
      }
      if (mat.uniforms.cellColor) {
        mat.uniforms.cellColor.value.copy(
          currentColor.current.clone().multiplyScalar(o * 0.3)
        );
      }
    }
  });
 
  if (scrollProgress > 0.58) return null;
 
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
  const projectColors = projects.map(function(p) { return p.color; });
 
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <Stars radius={100} depth={50} count={6000} factor={4} saturation={0} fade speed={0.5} />
      <DynamicGrid accentRgb={accentRgb} scrollProgress={scrollProgress} />
      <VerticalLine scrollProgress={scrollProgress} projectColors={projectColors} />
    </>
  );
};
 
export default SceneManager;