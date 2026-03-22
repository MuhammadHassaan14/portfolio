import React, { useEffect, useRef } from 'react';

const NeuralOrb = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      minHeight: '400px',
    }}>
      <style>{`
        .orb-wrapper {
          position: relative;
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orb-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid #00f5d4;
          animation: orb-spin linear infinite;
        }

        .orb-ring:nth-child(1) {
          width: 280px;
          height: 280px;
          border-color: rgba(0, 245, 212, 0.6);
          animation-duration: 8s;
          animation-direction: normal;
        }

        .orb-ring:nth-child(2) {
          width: 220px;
          height: 220px;
          border-color: rgba(0, 245, 212, 0.4);
          animation-duration: 6s;
          animation-direction: reverse;
          transform: rotateX(60deg);
        }

        .orb-ring:nth-child(3) {
          width: 160px;
          height: 160px;
          border-color: rgba(0, 245, 212, 0.7);
          animation-duration: 4s;
          animation-direction: normal;
          transform: rotateY(60deg);
        }

        .orb-ring:nth-child(4) {
          width: 100px;
          height: 100px;
          border-color: rgba(0, 245, 212, 0.9);
          animation-duration: 3s;
          animation-direction: reverse;
          transform: rotateX(60deg) rotateY(45deg);
        }

        @keyframes orb-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .orb-ring:nth-child(2) {
          animation-name: orb-spin-2;
        }
        @keyframes orb-spin-2 {
          from { transform: rotateX(60deg) rotate(0deg); }
          to { transform: rotateX(60deg) rotate(360deg); }
        }

        .orb-ring:nth-child(3) {
          animation-name: orb-spin-3;
        }
        @keyframes orb-spin-3 {
          from { transform: rotateY(60deg) rotate(0deg); }
          to { transform: rotateY(60deg) rotate(360deg); }
        }

        .orb-ring:nth-child(4) {
          animation-name: orb-spin-4;
        }
        @keyframes orb-spin-4 {
          from { transform: rotateX(60deg) rotateY(45deg) rotate(0deg); }
          to { transform: rotateX(60deg) rotateY(45deg) rotate(360deg); }
        }

        .orb-core {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle, #00f5d4, #005a50);
          box-shadow: 0 0 20px #00f5d4, 0 0 60px rgba(0,245,212,0.4), 0 0 100px rgba(0,245,212,0.2);
          animation: core-pulse 2s ease-in-out infinite;
          z-index: 10;
        }

        @keyframes core-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px #00f5d4, 0 0 60px rgba(0,245,212,0.4); }
          50% { transform: scale(1.3); box-shadow: 0 0 40px #00f5d4, 0 0 80px rgba(0,245,212,0.6), 0 0 120px rgba(0,245,212,0.3); }
        }

        .orb-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00f5d4;
          box-shadow: 0 0 10px #00f5d4;
        }

        .orb-ring:nth-child(1) .orb-dot {
          top: -3px;
          left: calc(50% - 3px);
        }

        .orb-ring:nth-child(2) .orb-dot {
          bottom: -3px;
          left: calc(50% - 3px);
        }

        .orb-ring:nth-child(3) .orb-dot {
          top: calc(50% - 3px);
          right: -3px;
        }

        .float-label {
          position: absolute;
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          color: rgba(0, 245, 212, 0.6);
          letter-spacing: 0.15em;
          white-space: nowrap;
          animation: float-text 3s ease-in-out infinite;
        }

        .float-label:nth-of-type(1) { top: -30px; animation-delay: 0s; }
        .float-label:nth-of-type(2) { bottom: -30px; animation-delay: 1s; }
        .float-label:nth-of-type(3) { right: -60px; top: 50%; animation-delay: 2s; }

        @keyframes float-text {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>

      <div className="orb-wrapper">
        <div className="orb-ring"><div className="orb-dot" /></div>
        <div className="orb-ring"><div className="orb-dot" /></div>
        <div className="orb-ring"><div className="orb-dot" /></div>
        <div className="orb-ring"><div className="orb-dot" /></div>
        <div className="orb-core" />
        <span className="float-label">neural.core</span>
        <span className="float-label">v2.0.4</span>
        <span className="float-label">active</span>
      </div>
    </div>
  );
};

const About = () => {
  const skills = ["React", "Node.js", "Python", "Three.js", "TensorFlow"];

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 2rem',
        background: 'transparent',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Left: Text */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.1,
          }}>
            About Me
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', color: '#aaaaaa', fontSize: '0.95rem', lineHeight: 1.8 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', color: '#aaaaaa', fontSize: '0.95rem', lineHeight: 1.8 }}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', color: '#aaaaaa', fontSize: '0.95rem', lineHeight: 1.8 }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem' }}>
            {skills.map((skill) => (
              <span key={skill} style={{
                padding: '0.4rem 1rem',
                border: '1px solid #00f5d4',
                color: '#00f5d4',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                borderRadius: '999px',
                background: 'rgba(0,245,212,0.05)',
                cursor: 'default',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.target.style.background = '#00f5d4';
                e.target.style.color = '#000';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(0,245,212,0.05)';
                e.target.style.color = '#00f5d4';
              }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Neural Orb */}
        <NeuralOrb />
      </div>
    </section>
  );
};

export default About;