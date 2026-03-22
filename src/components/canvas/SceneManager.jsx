import React from 'react';
import { Stars, Grid } from '@react-three/drei';

const SceneManager = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />

      <Stars
        radius={100}
        depth={50}
        count={6000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      <Grid
        position={[0, -2, 0]}
        cellSize={1}
        cellThickness={0.8}
        cellColor="#1a1a2e"
        sectionSize={5}
        sectionThickness={1.2}
        sectionColor="#2a2a4e"
        fadeDistance={40}
        fadeStrength={1}
        infiniteGrid
      />
    </>
  );
};

export default SceneManager;