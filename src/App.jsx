import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import SceneManager from './components/canvas/SceneManager';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
 
var hexToRgb = function(hex) {
  var clean = hex.trim().replace('#', '');
  var r = parseInt(clean.slice(0, 2), 16) / 255;
  var g = parseInt(clean.slice(2, 4), 16) / 255;
  var b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
};
 
function App() {
  var accentArr = useState('#7B61FF');
  var accentHex = accentArr[0];
  var setAccentHex = accentArr[1];
 
  var scrollArr = useState(0);
  var scrollProgress = scrollArr[0];
  var setScrollProgress = scrollArr[1];
 
  var readyArr = useState(false);
  var isReady = readyArr[0];
  var setIsReady = readyArr[1];
 
  var loadArr = useState(0);
  var loadProgress = loadArr[0];
  var setLoadProgress = loadArr[1];
 
  var startTimeRef = useRef(Date.now());
 
  useEffect(function() {
    var timer = setInterval(function() {
      var elapsed = Date.now() - startTimeRef.current;
      var p = Math.min(1, elapsed / 2500);
      setLoadProgress(p);
      if (p >= 1) {
        setIsReady(true);
        clearInterval(timer);
      }
    }, 16);
    return function() { clearInterval(timer); };
  }, []);
 
  useEffect(function() {
    var interval = setInterval(function() {
      var color = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent').trim();
      if (color && color !== accentHex) setAccentHex(color);
    }, 50);
    return function() { clearInterval(interval); };
  }, [accentHex]);
 
  useEffect(function() {
    var mainEl = document.querySelector('main');
    if (!mainEl) return;
    var handleScroll = function() {
      var scrollTop = mainEl.scrollTop;
      var scrollHeight = mainEl.scrollHeight - mainEl.clientHeight;
      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };
    mainEl.addEventListener('scroll', handleScroll);
    return function() { mainEl.removeEventListener('scroll', handleScroll); };
  }, []);
 
  var accentRgb = hexToRgb(accentHex);
 
  return React.createElement('div', {
    style: { position: 'relative', width: '100%', backgroundColor: '#050a0e' }
  },
    React.createElement('style', null,
      '@keyframes blink { 0%,100%{ opacity:0.2; } 50%{ opacity:1; } }'
    ),
 
    // Loading indicator
    React.createElement('div', {
      style: {
        position: 'fixed',
        bottom: '2rem', right: '2rem',
        zIndex: 100,
        fontFamily: 'Space Mono, monospace',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.4)',
        letterSpacing: '0.2em',
        opacity: isReady ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }
    },
      'INITIALIZING',
      React.createElement('span', { style: { animation: 'blink 0.8s infinite' } }, '_')
    ),
 
    // Fixed 3D canvas
    React.createElement('div', {
      style: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }
    },
      React.createElement(Canvas, {
        camera: { position: [0, 0, 4], fov: 75 },
        gl: { antialias: true }
      },
        React.createElement(Suspense, { fallback: null },
          React.createElement(SceneManager, {
            accentRgb: accentRgb,
            scrollProgress: scrollProgress,
            loadProgress: loadProgress,
          })
        )
      )
    ),
 
    // Scrollable overlay — no extra spacer, stops at Contact end
    React.createElement('main', {
      style: {
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100vh',
        overflowY: 'scroll',
        pointerEvents: 'none',
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }
    },
      React.createElement('div', { style: { pointerEvents: 'auto' } },
        React.createElement(Hero),
        React.createElement(About),
        React.createElement(Projects, { scrollProgress: scrollProgress }),
        React.createElement(Contact)
        // No spacer div — scroll ends at bottom of Contact
      )
    )
  );
}
 
export default App;