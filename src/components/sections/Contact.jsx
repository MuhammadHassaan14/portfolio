import React, { useState, useEffect } from 'react';
 
const Contact = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [projectType, setProjectType] = useState('');
  const [email, setEmail] = useState('');
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
 
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
 
  const inputStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    color: 'var(--color-accent)',
    fontFamily: 'Space Mono, monospace',
    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
    outline: 'none',
    padding: '2px 8px',
    minWidth: '120px',
    transition: 'all 0.3s',
  };
 
  const spanStyle = {
    fontFamily: 'Space Mono, monospace',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 'clamp(0.85rem, 2vw, 1rem)',
    whiteSpace: 'nowrap',
  };
 
  const sentenceWrapper = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: '8px',
    marginBottom: '20px',
  };
 
  return (
    <section id="contact" style={{
      minHeight: '100vh',
      width: '100%',
      padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,5vw,4rem)',
      paddingBottom: '5rem',
      background: 'transparent',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
    }}>
 
      <style>{`
        @keyframes contact-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        @keyframes contact-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.25); }
        .contact-input:focus {
          border-bottom-color: var(--color-accent) !important;
          box-shadow: 0 2px 0 var(--color-accent);
        }
        .send-btn:hover {
          background: var(--color-accent) !important;
          color: #000 !important;
        }
        .social-link:hover { color: var(--color-accent) !important; }
        .badge-center:hover {
          background: var(--color-accent) !important;
          color: #000 !important;
          transform: translate(-50%,-50%) scale(1.1) !important;
        }
      `}</style>
 
      <div>
        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          margin: '0 0 0 0',
          color: 'white',
          overflow: 'visible',
        }}>
          Let's Work
          <span style={{
            color: 'var(--color-accent)',
            transition: 'color 0.3s',
            marginLeft: '0.3em',
          }}>Together</span>
        </h2>
 
        {/* Marquee */}
        <div style={{
          overflow: 'hidden',
          width: '100%',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '12px 0',
          margin: '2.5rem 0',
        }}>
          <div style={{
            display: 'inline-flex',
            whiteSpace: 'nowrap',
            animation: 'contact-marquee 18s linear infinite',
          }}>
            {[0,1,2,3].map(function(i) {
              return (
                <span key={i} style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.3em',
                  color: 'rgba(255,255,255,0.3)',
                  marginRight: '2rem',
                }}>
                  AVAILABLE FOR WORK — SAY HELLO — GO AHEAD —&nbsp;
                </span>
              );
            })}
          </div>
        </div>
 
        {/* Two column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.1fr',
          gap: isMobile ? '3rem' : '4rem',
          alignItems: 'center',
        }}>
 
          {/* Left: conversational form */}
          <div>
            {/* Sentence 1 */}
            <div style={sentenceWrapper}>
              <span style={spanStyle}>Hey! My name is</span>
              <input
                className="contact-input"
                style={inputStyle}
                placeholder="your name"
                value={name}
                onChange={function(e) { setName(e.target.value); }}
              />
              <span style={spanStyle}>and I work at</span>
              <input
                className="contact-input"
                style={inputStyle}
                placeholder="company"
                value={company}
                onChange={function(e) { setCompany(e.target.value); }}
              />
              <span style={spanStyle}>.</span>
            </div>
 
            {/* Sentence 2 */}
            <div style={sentenceWrapper}>
              <span style={spanStyle}>I'm looking for help with</span>
              <input
                className="contact-input"
                style={{ ...inputStyle, minWidth: '200px' }}
                placeholder="a new website / AI project / web app"
                value={projectType}
                onChange={function(e) { setProjectType(e.target.value); }}
              />
            </div>
 
            {/* Sentence 3 */}
            <div style={sentenceWrapper}>
              <span style={spanStyle}>Reach me at</span>
              <input
                type="email"
                className="contact-input"
                style={{ ...inputStyle, minWidth: '220px' }}
                placeholder="email@example.com"
                value={email}
                onChange={function(e) { setEmail(e.target.value); }}
              />
            </div>
 
            {/* Send button */}
            <button
              className="send-btn"
              onClick={function() { console.log({ name, company, projectType, email }); }}
              style={{
                marginTop: '2rem',
                padding: '0.75rem 2rem',
                border: '1px solid var(--color-accent)',
                background: 'transparent',
                color: 'var(--color-accent)',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                borderRadius: '3px',
                transition: 'all 0.25s',
              }}
            >
              Send Message <span>↑</span>
            </button>
          </div>
 
          {/* Right: rotating badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '260px',
          }}>
            <div style={{ width: '180px', height: '180px', position: 'relative' }}>
              <svg
                viewBox="0 0 180 180"
                style={{
                  width: '180px',
                  height: '180px',
                  animation: 'contact-spin 12s linear infinite',
                  display: 'block',
                }}
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 90,90 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                  />
                </defs>
                <text style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10.5px',
                  fill: 'rgba(255,255,255,0.4)',
                  letterSpacing: '3px',
                }}>
                  <textPath href="#circlePath">
                    AVAILABLE FOR WORK — SAY HELLO — AVAILABLE FOR WORK — SAY HELLO —
                  </textPath>
                </text>
              </svg>
 
              <div
                className="badge-center"
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: '72px', height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                  color: 'var(--color-accent)',
                }}
              >
                <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Footer row */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        marginTop: '4rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        gap: isMobile ? '1rem' : '0',
      }}>
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.1em',
        }}>
          © 2025 Muhammad Hassaan
        </div>
 
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { label: 'GitHub', href: 'https://github.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com' },
          ].map(function(link) {
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.72rem',
                  textDecoration: 'none',
                  letterSpacing: '0.15em',
                  transition: 'color 0.3s',
                }}
              >
                {link.label}
                <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>↗</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
 
export default Contact;