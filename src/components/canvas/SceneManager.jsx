import React from 'react';
import { Grid, Stars } from '@react-three/drei';

const SceneManager = ({ scrollProgress = 0 }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f5d4" />

      {/* Background Environment */}
      <Stars
        radius={80}
        depth={50}
        count={3000}
        factor={4}
        fade
        speed={1}
      />

      {/* Foundation Grid */}
      <Grid
        position={[0, -2, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        cellColor="#0a2a2a"
        sectionSize={5}
        sectionColor="#00f5d4"
        fadeDistance={30}
      />
    </>
  );
};

export default SceneManager;