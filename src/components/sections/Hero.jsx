import React, { useState, useEffect } from 'react';
import useAccentColor from '../../hooks/useAccentColor';
 
const Hero = () => {
  useAccentColor();
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
      boxSizing: 'border-box',
      overflow: 'hidden',
      width: '100%',
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
        display: 'inline-flex',
        justifyContent: 'center',
        padding: '0.3rem 1rem',
        borderRadius: '999px',
        border: '1px solid var(--color-accent)',
        color: 'var(--color-accent)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.55rem, 1.8vw, 0.75rem)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
        transition: 'border-color 0.3s, color 0.3s',
        whiteSpace: 'nowrap',
        maxWidth: '90vw',
      }}>
        CS · Web Dev · AI
      </div>
 
      {/* Name — forced two clean lines, no mid-word breaks */}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.6rem, 8.5vw, 8rem)',
        fontWeight: 800,
        color: 'white',
        lineHeight: 1.1,
        textAlign: 'center',
        maxWidth: '88vw',
        margin: '0 auto',
        wordBreak: 'keep-all',
        overflowWrap: 'normal',
        hyphens: 'none',
        whiteSpace: 'normal',
      }}>
        Muhammad<br />
        <span style={{ color: 'var(--color-accent)', transition: 'color 0.2s linear' }}>
          Hassaan
        </span>
      </h1>
 
      {/* Subtitle */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(0.72rem, 2.5vw, 1.1rem)',
        color: '#888',
        marginTop: '1.2rem',
        letterSpacing: '0.03em',
        maxWidth: '85vw',
      }}>
        I build things that think.
      </p>
 
      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: dotOpacity,
        transition: 'opacity 0.15s linear',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: '#555',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>scroll</span>
        <div style={{
          width: '7px',
          height: '7px',
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