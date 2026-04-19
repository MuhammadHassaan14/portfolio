import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import SceneManager from './components/canvas/SceneManager';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
 
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
};
 
function App() {
  const [accentHex, setAccentHex] = useState('#7B61FF');
  const [scrollProgress, setScrollProgress] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent').trim();
      if (color && color !== accentHex) setAccentHex(color);
    }, 50);
    return () => clearInterval(interval);
  }, [accentHex]);
 
  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;
    const handleScroll = () => {
      const scrollTop = mainEl.scrollTop;
      const scrollHeight = mainEl.scrollHeight - mainEl.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);
    };
    mainEl.addEventListener('scroll', handleScroll);
    return () => mainEl.removeEventListener('scroll', handleScroll);
  }, []);
 
  const accentRgb = hexToRgb(accentHex);
 
  return (
    <div style={{ position: 'relative', width: '100%', backgroundColor: '#050a0e' }}>
      {/* Fixed 3D background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 2, 12], fov: 75 }} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <SceneManager accentRgb={accentRgb} scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>
 
      {/* Scrollable overlay */}
      <main style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100vh',
        overflowY: 'scroll', pointerEvents: 'none',
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <Hero />
          <About />
          <Projects scrollProgress={scrollProgress} />
          <div style={{ height: '100vh' }} />
        </div>
      </main>
    </div>
  );
}
 
export default App;