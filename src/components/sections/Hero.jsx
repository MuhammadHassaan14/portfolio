import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [dotOpacity, setDotOpacity] = useState(1);

  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;
    const handleScroll = () => {
      const scrolled = mainEl.scrollTop;
      // Fade out dot between 0 and 200px scroll
      const opacity = Math.max(0, 1 - scrolled / 200);
      setDotOpacity(opacity);
    };
    mainEl.addEventListener('scroll', handleScroll);
    return () => mainEl.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      background: 'transparent',
      padding: '0 1.5rem',
      textAlign: 'center',
    }}>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes dot-glow {
          0%, 100% { box-shadow: 0 0 8px #00f5d4; }
          50% { box-shadow: 0 0 20px #00f5d4, 0 0 40px rgba(0,245,212,0.5); }
        }
      `}</style>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        letterSpacing: '0.2em',
        color: 'var(--color-cyan)',
        marginBottom: '1rem',
        textTransform: 'uppercase',
      }}>
        Computer Science · Web Dev · AI
      </p>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 6vw, 7rem)',
        fontWeight: 800,
        color: 'white',
        lineHeight: 1.1,
        textAlign: 'center',
        padding: '0 1rem',
        wordBreak: 'break-word',
        maxWidth: '90vw',
      }}>
        Muhammad Hassaan
      </h1>

      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '1.1rem',
        color: '#aaaaaa',
        marginTop: '1rem',
      }}>
        I build things that think.
      </p>

      {/* Bouncing dot that fades out on scroll */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: dotOpacity,
        transition: 'opacity 0.1s linear',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'rgba(0,245,212,0.6)',
          letterSpacing: '0.15em',
          marginBottom: '0.25rem',
        }}>scroll</p>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--color-cyan)',
          animation: 'bounce 1.5s infinite, dot-glow 1.5s infinite',
        }} />
      </div>
    </section>
  );
};

export default Hero;