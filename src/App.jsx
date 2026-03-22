import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SceneManager from './components/canvas/SceneManager';
import Hero from './components/sections/Hero';
import About from './components/sections/About';

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
          camera={{ position: [0, 2, 12], fov: 75 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <SceneManager />
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable Overlay Layer */}
      <main style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        height: "100vh",
        overflowY: "scroll",
        pointerEvents: "none"
      }}>
        <div style={{ pointerEvents: "auto" }}>
          <Hero />
          <About />

          {/* Spacer to allow scrolling */}
          <div style={{ height: "50vh" }} />
        </div>
      </main>
    </div>
  );
}

export default App;
