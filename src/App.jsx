import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import SceneManager from './components/canvas/SceneManager';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
 
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
};
 
function App() {
  const [accentHex, setAccentHex] = useState('#7B61FF');
 
  useEffect(() => {
    // Poll the CSS variable that useAccentColor sets, and mirror it into state
    const interval = setInterval(() => {
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent').trim();
      if (val && val !== accentHex) setAccentHex(val);
    }, 50);
    return () => clearInterval(interval);
  }, [accentHex]);
 
  const accentRgb = hexToRgb(accentHex);
 
  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#050a0e' }}>
      {/* Fixed Background 3D Layer */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%', zIndex: 0,
      }}>
        <Canvas
          camera={{ position: [0, 2, 12], fov: 75 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <SceneManager accentRgb={accentRgb} />
          </Suspense>
        </Canvas>
      </div>
 
      {/* Scrollable Overlay Layer */}
      <main style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100vh',
        overflowY: 'scroll', pointerEvents: 'none',
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <Hero />
          <About />
          <div style={{ height: '50vh' }} />
        </div>
      </main>
    </div>
  );
}
 
export default App;