import React, { useState, useEffect } from 'react';

const NeuralOrb = ({ opacity }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '380px',
    opacity,
    transition: 'opacity 0.5s ease',
  }}>
    <style>{`
      .orb-wrap {
        position: relative;
        width: 300px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .orb-ring {
        position: absolute;
        border-radius: 50%;
        border: 1.5px solid var(--color-accent);
        transition: border-color 0.3s;
      }
      .orb-ring-1 {
        width: 300px; height: 300px;
        opacity: 0.3;
        animation: spin1 12s linear infinite;
      }
      .orb-ring-2 {
        width: 230px; height: 230px;
        opacity: 0.5;
        animation: spin2 8s linear infinite reverse;
      }
      .orb-ring-3 {
        width: 160px; height: 160px;
        opacity: 0.7;
        animation: spin3 5s linear infinite;
      }
      .orb-ring-4 {
        width: 100px; height: 100px;
        opacity: 0.9;
        animation: spin4 3s linear infinite reverse;
      }
      @keyframes spin1 {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes spin2 {
        from { transform: rotateX(55deg) rotate(0deg); }
        to { transform: rotateX(55deg) rotate(360deg); }
      }
      @keyframes spin3 {
        from { transform: rotateY(55deg) rotate(0deg); }
        to { transform: rotateY(55deg) rotate(360deg); }
      }
      @keyframes spin4 {
        from { transform: rotateX(55deg) rotateY(40deg) rotate(0deg); }
        to { transform: rotateX(55deg) rotateY(40deg) rotate(360deg); }
      }
      .orb-dot {
        position: absolute;
        width: 7px; height: 7px;
        border-radius: 50%;
        background: var(--color-accent);
        box-shadow: 0 0 10px var(--color-accent);
        transition: background 0.3s, box-shadow 0.3s;
      }
      .orb-ring-1 .orb-dot { top: -3.5px; left: calc(50% - 3.5px); }
      .orb-ring-2 .orb-dot { bottom: -3.5px; left: calc(50% - 3.5px); }
      .orb-ring-3 .orb-dot { top: calc(50% - 3.5px); right: -3.5px; }
      .orb-core {
        width: 44px; height: 44px;
        border-radius: 50%;
        background: var(--color-accent);
        box-shadow: 0 0 30px var(--color-accent), 0 0 80px var(--color-accent);
        animation: core-pulse 2.5s ease-in-out infinite;
        position: relative;
        z-index: 10;
        transition: background 0.3s, box-shadow 0.3s;
      }
      @keyframes core-pulse {
        0%, 100% { transform: scale(1); opacity: 0.9; }
        50% { transform: scale(1.35); opacity: 1; }
      }
      .orb-label {
        position: absolute;
        font-family: 'Space Mono', monospace;
        font-size: 0.58rem;
        color: var(--color-accent);
        letter-spacing: 0.12em;
        white-space: nowrap;
        opacity: 0.6;
        animation: label-float 3s ease-in-out infinite;
        transition: color 0.3s;
      }
      .orb-label:nth-of-type(1) { top: -28px; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
      .orb-label:nth-of-type(2) { bottom: -28px; left: 50%; transform: translateX(-50%); animation-delay: 1s; }
      .orb-label:nth-of-type(3) { right: -65px; top: 50%; transform: translateY(-50%); animation-delay: 2s; }
      @keyframes label-float {
        0%, 100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
        50% { opacity: 0.9; transform: translateX(-50%) translateY(-4px); }
      }
      .orb-label:nth-of-type(3) {
        animation-name: label-float-side;
      }
      @keyframes label-float-side {
        0%, 100% { opacity: 0.4; transform: translateY(-50%) translateX(0); }
        50% { opacity: 0.9; transform: translateY(-50%) translateX(4px); }
      }
    `}</style>

    <div className="orb-wrap">
      <div className="orb-ring orb-ring-1"><div className="orb-dot" /></div>
      <div className="orb-ring orb-ring-2"><div className="orb-dot" /></div>
      <div className="orb-ring orb-ring-3"><div className="orb-dot" /></div>
      <div className="orb-ring orb-ring-4" />
      <div className="orb-core" />
      <span className="orb-label">neural.core</span>
      <span className="orb-label">online</span>
      <span className="orb-label">v2.0</span>
    </div>
  </div>
);

const About = () => {
  const [orbOpacity, setOrbOpacity] = useState(0);
  const skills = ['React', 'Node.js', 'Python', 'Three.js', 'TensorFlow', 'MongoDB'];

  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;
    const handleScroll = () => {
      const s = mainEl.scrollTop;
      setOrbOpacity(Math.min(1, Math.max(0, (s - 150) / 200)));
    };
    mainEl.addEventListener('scroll', handleScroll);
    return () => mainEl.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '5rem 2rem',
      background: 'transparent',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '4rem',
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {/* Left: text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', justifyContent: 'center' }}>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}>About Me</h2>
            <div style={{
              width: '60px', height: '3px',
              background: 'var(--color-accent)',
              transition: 'background 0.3s',
              borderRadius: '2px',
            }} />
          </div>

          {[
            'I am a Computer Science student specializing in Web Development and AI — building systems that are both functional and intelligent.',
            'My work sits at the intersection of clean frontend engineering and machine learning, turning complex ideas into seamless experiences.',
            'From neural networks to interactive 3D interfaces, I bring curiosity and precision to everything I build.',
          ].map((text, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.92rem',
              color: '#999',
              lineHeight: 1.9,
            }}>{text}</p>
          ))}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {skills.map(skill => (
              <span
                key={skill}
                style={{
                  padding: '0.35rem 0.9rem',
                  border: '1px solid var(--color-accent)',
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  borderRadius: '999px',
                  background: 'transparent',
                  cursor: 'default',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--color-accent)';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
              >{skill}</span>
            ))}
          </div>
        </div>

        {/* Right: orb */}
        <NeuralOrb opacity={orbOpacity} />
      </div>
    </section>
  );
};

export default About;