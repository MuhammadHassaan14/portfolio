import React from 'react';

const GridScanner = ({ opacity = 1 }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: opacity,
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <style>{`
        @keyframes sweep {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pulse-blink {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
      
      {/* Sweeping Laser */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          background: 'var(--color-accent)',
          boxShadow: '0 0 15px var(--color-accent), 0 0 30px var(--color-accent)',
          animation: 'sweep 3s linear infinite',
        }}
      />

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          color: 'var(--color-accent)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          animation: 'pulse-blink 2s ease-in-out infinite',
          textAlign: 'center',
        }}
      >
        <div style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
          [ SYSTEM READY // SCROLL TO PROCEED ]
        </div>
        <svg 
          width="24" 
          height="14" 
          viewBox="0 0 24 14" 
          fill="none" 
        >
          <path 
            d="M4 4L12 12L20 4" 
            stroke="var(--color-accent)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default GridScanner;
