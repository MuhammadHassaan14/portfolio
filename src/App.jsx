import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SceneManager from './components/canvas/SceneManager';
import Hero from './components/sections/Hero';

function App() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", backgroundColor: "#050a0e" }}>
      {/* Fixed Background 3D Layer */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0
      }}>
        <Canvas
          camera={{ position: [0, 2, 8], fov: 60 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <SceneManager scrollProgress={0} />
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable Overlay Layer */}
      <main style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        height: "100vh",
        overflowY: "auto",
        pointerEvents: "none"
      }}>
        <div style={{ pointerEvents: "auto" }}>
          <Hero />

          {/* Spacer to allow scrolling if needed */}
          <div style={{ height: "100vh" }} />
        </div>
      </main>
    </div>
  );
}

export default App;