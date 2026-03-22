import { useState, useEffect } from 'react';

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const rgbToHex = (r, g, b) => {
  const toHex = (n) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const lerpColor = (hexA, hexB, t) => {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const r = a.r + (b.r - a.r) * t;
  const g = a.g + (b.g - a.g) * t;
  const bl = a.b + (b.b - a.b) * t;
  return rgbToHex(r, g, bl);
};

const stops = [
  { pos: 0,    color: '#7B61FF' },
  { pos: 0.33, color: '#00f5d4' },
  { pos: 0.66, color: '#FFB347' },
  { pos: 1.0,  color: '#FF6B9D' },
];

const useAccentColor = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set initial color immediately
    document.documentElement.style.setProperty('--color-accent', '#7B61FF');

    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const handleScroll = () => {
      const scrollTop = mainEl.scrollTop;
      const scrollHeight = mainEl.scrollHeight - mainEl.clientHeight;
      const normalizedProgress = scrollHeight > 0
        ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
        : 0;

      setProgress(normalizedProgress);

      let startStop = stops[0];
      let endStop = stops[stops.length - 1];

      for (let i = 0; i < stops.length - 1; i++) {
        if (normalizedProgress >= stops[i].pos && normalizedProgress <= stops[i + 1].pos) {
          startStop = stops[i];
          endStop = stops[i + 1];
          break;
        }
      }

      const range = endStop.pos - startStop.pos;
      const t = range === 0 ? 0 : (normalizedProgress - startStop.pos) / range;
      const interpolatedColor = lerpColor(startStop.color, endStop.color, t);
      document.documentElement.style.setProperty('--color-accent', interpolatedColor);
    };

    mainEl.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => mainEl.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};

export default useAccentColor;