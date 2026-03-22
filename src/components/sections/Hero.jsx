import React, { useState, useEffect } from 'react';
import useAccentColor from '../../hooks/useAccentColor';

const Hero = () => {
  useAccentColor(); // Mounted once here — drives global --color-accent
  const [dotOpacity, setDotOpacity] = useState(1);

  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;
    const handleScroll = () => {
      setDotOpacity(Math.max(0, 1 - mainEl.scrollTop / 200));
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
        @keyframes hero-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @keyframes dot-glow {
          0%, 100% { box-shadow: 0 0 8px var(--color-accent); }
          50% { box-shadow: 0 0 24px var(--color-accent), 0 0 48px var(--color-accent); }
        }
      `}</style>

      {/* Tag pill */}
      <div style={{
        display: 'inline-block',
        padding: '0.3rem 1.2rem',
        borderRadius: '999px',
        border: '1px solid var(--color-accent)',
        color: 'var(--color-accent)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '2rem',
        transition: 'border-color 0.3s, color 0.3s',
      }}>
        Computer Science · Web Dev · AI
      </div>

      {/* Name */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.5rem, 8vw, 8rem)',
        fontWeight: 800,
        color: 'white',
        lineHeight: 1.05,
        textAlign: 'center',
        maxWidth: '90vw',
        wordBreak: 'break-word',
      }}>
        Muhammad{' '}
        <span style={{ color: 'var(--color-accent)', transition: 'color 0.2s linear' }}>
          Hassaan
        </span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
        color: '#888',
        marginTop: '1.5rem',
        letterSpacing: '0.05em',
      }}>
        I build things that think.
      </p>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: dotOpacity,
        transition: 'opacity 0.15s linear',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: '#555',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>scroll</span>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--color-accent)',
          animation: 'hero-bounce 1.8s ease-in-out infinite, dot-glow 1.8s ease-in-out infinite',
          transition: 'background 0.3s',
        }} />
      </div>
    </section>
  );
};

export default Hero;