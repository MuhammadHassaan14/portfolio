import React, { useState, useEffect } from 'react';
 
const NeuralOrb = ({ opacity }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '300px',
    opacity,
    transition: 'opacity 0.5s ease',
  }}>
    <style>{`
      .orb-wrap {
        position: relative;
        width: clamp(200px, 40vw, 300px);
        height: clamp(200px, 40vw, 300px);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: visible;
      }
      .orb-ring {
        position: absolute;
        border-radius: 50%;
        border: 1.5px solid var(--color-accent);
        transition: border-color 0.3s;
      }
      .orb-ring-1 { width:100%; height:100%; opacity:0.3; animation:spin1 12s linear infinite; }
      .orb-ring-2 { width:76%; height:76%; opacity:0.5; animation:spin2 8s linear infinite reverse; }
      .orb-ring-3 { width:53%; height:53%; opacity:0.7; animation:spin3 5s linear infinite; }
      .orb-ring-4 { width:33%; height:33%; opacity:0.9; animation:spin4 3s linear infinite reverse; }
      @keyframes spin1 { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes spin2 { from{transform:rotateX(55deg) rotate(0deg)} to{transform:rotateX(55deg) rotate(360deg)} }
      @keyframes spin3 { from{transform:rotateY(55deg) rotate(0deg)} to{transform:rotateY(55deg) rotate(360deg)} }
      @keyframes spin4 { from{transform:rotateX(55deg) rotateY(40deg) rotate(0deg)} to{transform:rotateX(55deg) rotateY(40deg) rotate(360deg)} }
      .orb-dot {
        position: absolute;
        width: 7px; height: 7px;
        border-radius: 50%;
        background: var(--color-accent);
        box-shadow: 0 0 10px var(--color-accent);
        transition: background 0.3s, box-shadow 0.3s;
      }
      .orb-ring-1 .orb-dot { top:-3.5px; left:calc(50% - 3.5px); }
      .orb-ring-2 .orb-dot { bottom:-3.5px; left:calc(50% - 3.5px); }
      .orb-ring-3 .orb-dot { top:calc(50% - 3.5px); right:-3.5px; }
      .orb-core {
        width: clamp(28px, 5vw, 44px);
        height: clamp(28px, 5vw, 44px);
        border-radius: 50%;
        background: var(--color-accent);
        box-shadow: 0 0 30px var(--color-accent), 0 0 80px var(--color-accent);
        animation: core-pulse 2.5s ease-in-out infinite;
        position: relative;
        z-index: 10;
        transition: background 0.3s, box-shadow 0.3s;
      }
      @keyframes core-pulse {
        0%,100% { transform:scale(1); opacity:0.9; }
        50% { transform:scale(1.35); opacity:1; }
      }
      .orb-label {
        position: absolute;
        font-family: 'Space Mono', monospace;
        font-size: clamp(0.45rem, 1.2vw, 0.58rem);
        color: var(--color-accent);
        letter-spacing: 0.1em;
        white-space: nowrap;
        opacity: 0.6;
        transition: color 0.3s;
      }
      .orb-label-top {
        top: -24px;
        left: 50%;
        transform: translateX(-50%);
        animation: label-float-up 3s ease-in-out infinite;
      }
      .orb-label-bottom {
        bottom: -24px;
        left: 50%;
        transform: translateX(-50%);
        animation: label-float-up 3s ease-in-out infinite 1s;
      }
      .orb-label-side {
        right: -50px;
        top: 50%;
        transform: translateY(-50%);
        animation: label-float-side 3s ease-in-out infinite 2s;
      }
      @keyframes label-float-up {
        0%,100% { opacity:0.4; transform:translateX(-50%) translateY(0); }
        50% { opacity:0.9; transform:translateX(-50%) translateY(-4px); }
      }
      @keyframes label-float-side {
        0%,100% { opacity:0.4; transform:translateY(-50%) translateX(0); }
        50% { opacity:0.9; transform:translateY(-50%) translateX(4px); }
      }
      @media (max-width: 500px) {
        .orb-label-side { display: none; }
      }
    `}</style>
    <div className="orb-wrap">
      <div className="orb-ring orb-ring-1"><div className="orb-dot" /></div>
      <div className="orb-ring orb-ring-2"><div className="orb-dot" /></div>
      <div className="orb-ring orb-ring-3"><div className="orb-dot" /></div>
      <div className="orb-ring orb-ring-4" />
      <div className="orb-core" />
      <span className="orb-label orb-label-top">neural.core</span>
      <span className="orb-label orb-label-bottom">online</span>
      <span className="orb-label orb-label-side">v2.0</span>
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
      padding: '4rem 1.5rem',
      background: 'transparent',
      boxSizing: 'border-box',
      width: '100%',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '3rem',
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {/* Left: text */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', justifyContent:'center', minWidth:0 }}>
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
              fontSize: 'clamp(0.78rem, 2vw, 0.92rem)',
              color: '#999',
              lineHeight: 1.9,
            }}>{text}</p>
          ))}
 
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
            {skills.map(skill => (
              <span
                key={skill}
                style={{
                  padding: '0.3rem 0.8rem',
                  border: '1px solid var(--color-accent)',
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.65rem, 1.8vw, 0.78rem)',
                  borderRadius: '999px',
                  background: 'transparent',
                  cursor: 'default',
                  transition: 'all 0.25s',
                  whiteSpace: 'nowrap',
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