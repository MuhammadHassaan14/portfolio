import React, { useState, useEffect } from 'react';
import projects from '../../data/projects';
import GravitationalAnomaly from '../ui/GravitationalAnomaly';
import ShootingStarsCanvas from '../ui/ShootingStarsCanvas';

// ─── Card timings for 2 cards (spaced across the full scroll range) ───
var twoCardTimes = [
  { fadeInStart: 0.52, fadeInEnd: 0.58, fadeOutStart: 0.68, fadeOutEnd: 0.74 },
  { fadeInStart: 0.76, fadeInEnd: 0.82, fadeOutStart: 0.90, fadeOutEnd: 0.96 },
];

var Projects = function(props) {
  var scrollProgress = props.scrollProgress || 0;

  var stateArr = useState(null);
  var hoveredCard = stateArr[0];
  var setHoveredCard = stateArr[1];

  var mobileArr = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  var isMobile = mobileArr[0];
  var setIsMobile = mobileArr[1];

  var catArr = useState('AI/ML');
  var activeCategory = catArr[0];
  var setActiveCategory = catArr[1];

  var triggerArr = useState(0);
  var triggerCount = triggerArr[0];
  var setTriggerCount = triggerArr[1];

  useEffect(function() {
    var handleResize = function() { setIsMobile(window.innerWidth < 768); };
    window.addEventListener('resize', handleResize);
    return function() { window.removeEventListener('resize', handleResize); };
  }, []);

  // ─── Switch handler ────────────────────────────────────────────
  var switchTo = function(cat) {
    if (cat === activeCategory) return;
    setActiveCategory(cat);
    setTriggerCount(function(c) { return c + 1; });
  };

  // ─── Filter projects by active tab ─────────────────────────────
  var filtered = projects.filter(function(p) { return p.category === activeCategory; });

  // ─── Hue for the shooting star burst ───────────────────────────
  var meteorHue = activeCategory === 'AI/ML' ? 260 : 35;

  // ─── Build cards ───────────────────────────────────────────────
  var activeIndex = -1;
  var maxOpacity = 0;

  var cards = filtered.map(function(project, i) {
    var t = twoCardTimes[i];
    if (!t) return null;
    var opacity = 0;

    if (scrollProgress >= t.fadeInStart && scrollProgress < t.fadeInEnd) {
      opacity = (scrollProgress - t.fadeInStart) / (t.fadeInEnd - t.fadeInStart);
    } else if (scrollProgress >= t.fadeInEnd && scrollProgress < t.fadeOutStart) {
      opacity = 1;
    } else if (scrollProgress >= t.fadeOutStart && scrollProgress < t.fadeOutEnd) {
      opacity = 1 - ((scrollProgress - t.fadeOutStart) / (t.fadeOutEnd - t.fadeOutStart));
    }

    opacity = Math.max(0, Math.min(1, opacity));
    if (opacity > maxOpacity) { maxOpacity = opacity; activeIndex = i; }
    var isEven = i % 2 === 0;
    var isHovered = hoveredCard === i;

    // Card positioning
    var cardLeft = 'auto';
    var cardRight = 'auto';
    var cardTransform = 'translateY(-50%)';
    var cardWidth = 'clamp(240px, 28vw, 300px)';
    if (isMobile) {
      cardLeft = '50%';
      cardTransform = 'translateX(-50%) translateY(-50%)';
      cardWidth = 'clamp(240px, 85vw, 320px)';
    } else if (isEven) {
      cardLeft = '52%';
    } else {
      cardRight = '52%';
    }

    // Preview positioning
    var previewLeft = 'auto';
    var previewRight = 'auto';
    if (!isMobile) {
      if (isEven) { previewRight = 'calc(48% + 16px)'; }
      else { previewLeft = 'calc(48% + 16px)'; }
    }

    var previewHidden = isEven ? 'translateY(-50%) translateX(30px)' : 'translateY(-50%) translateX(-30px)';
    var previewVisible = 'translateY(-50%) translateX(0)';

    // Card element
    var cardEl = React.createElement('div', {
      key: 'card-' + project.id,
      style: {
        position: 'absolute', top: '50%',
        left: cardLeft, right: cardRight,
        transform: cardTransform,
        width: cardWidth,
        background: 'rgba(4,8,18,0.92)',
        borderTop: '1px solid ' + project.color + '40',
        borderBottom: '1px solid ' + project.color + '40',
        borderLeft: isEven ? '3px solid ' + project.color : '1px solid ' + project.color + '40',
        borderRight: isEven ? '1px solid ' + project.color + '40' : '3px solid ' + project.color,
        borderRadius: '14px', padding: '22px',
        backdropFilter: 'blur(14px)',
        fontFamily: 'Space Mono, monospace',
        pointerEvents: opacity > 0.1 ? 'auto' : 'none',
        transition: 'opacity 0.25s ease',
        boxShadow: '0 0 35px ' + project.color + '15',
        opacity: opacity, zIndex: 5, color: 'white',
      }
    },
    React.createElement('div', { style: { height: '2px', background: 'linear-gradient(' + (isEven ? '90deg' : '270deg') + ', ' + project.color + ', transparent)', marginBottom: '14px', borderRadius: '1px' } }),
    React.createElement('div', { style: { fontSize: '10px', color: project.color, letterSpacing: '0.25em', marginBottom: '8px', textTransform: 'uppercase', opacity: 0.8 } }, 'PROJECT 0' + (i + 1)),
    React.createElement('h3', { style: { color: 'white', fontSize: '17px', fontWeight: 700, lineHeight: 1.25, margin: '0 0 10px 0' } }, project.title),
      React.createElement('p', { style: { color: '#999', fontSize: '11.5px', lineHeight: 1.75, margin: '0 0 14px 0' } }, project.description),
      React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' } },
        project.tags.map(function(tag) {
          return React.createElement('span', { key: tag, style: { fontSize: '10px', padding: '3px 9px', border: '1px solid ' + project.color + '55', color: project.color, borderRadius: '999px', background: project.color + '12' } }, tag);
        })
      ),
      React.createElement('a', {
        href: project.live || '#', target: '_blank', rel: 'noreferrer',
        onMouseEnter: function() { setHoveredCard(i); },
        onMouseLeave: function() { setHoveredCard(null); },
        style: { display: 'block', padding: '8px', textAlign: 'center', background: project.color, color: '#000', fontWeight: 700, borderRadius: '8px', fontSize: '11px', textDecoration: 'none', cursor: 'pointer', letterSpacing: '0.05em' }
      }, 'VIEW PROJECT')
    );

    // Preview panel (desktop only)
    var previewEl = null;
    if (!isMobile) {
      previewEl = React.createElement('div', {
        key: 'preview-' + project.id,
        style: {
          position: 'absolute', top: '50%',
          left: previewLeft, right: previewRight,
          width: 'clamp(320px, 34vw, 420px)',
          background: 'rgba(4,8,18,0.95)',
          border: '1px solid ' + project.color + '60',
          borderRadius: '16px', padding: '24px',
          backdropFilter: 'blur(20px)', boxShadow: '0 0 60px ' + project.color + '20',
          zIndex: 20, pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? previewVisible : previewHidden,
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease',
          fontFamily: 'Space Mono, monospace', color: 'white',
        }
      },
      React.createElement('div', { style: { fontSize: '9px', color: project.color, letterSpacing: '0.3em', marginBottom: '12px', textTransform: 'uppercase' } }, 'PREVIEW'),
        React.createElement('div', {
          style: { width: '100%', paddingTop: '56.25%', position: 'relative', borderRadius: '8px', overflow: 'hidden', background: '#060810', border: '1px solid ' + project.color + '30', marginBottom: '16px' }
        },
        React.createElement('div', {
            style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(' + project.color + '10 1px,transparent 1px),linear-gradient(90deg,' + project.color + '10 1px,transparent 1px)', backgroundSize: '20px 20px', background: 'linear-gradient(135deg,' + project.color + '20,transparent 60%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }
          },
          React.createElement('span', { style: { color: project.color, fontSize: '15px', fontWeight: 700, textAlign: 'center', opacity: 0.9, padding: '0 12px' } }, project.title)
          )
        ),
        React.createElement('p', { style: { color: '#777', fontSize: '11px', lineHeight: 1.65, margin: '0 0 14px 0' } }, project.description),
        React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '4px' } },
          project.tags.map(function(tag) {
            return React.createElement('span', { key: tag, style: { fontSize: '10px', padding: '2px 8px', border: '1px solid ' + project.color + '55', color: project.color, borderRadius: '999px', background: project.color + '11' } }, tag);
          })
        )
        );
    }

    // Arrow indicator (desktop only)
    var arrowEl = null;
    if (!isMobile && opacity > 0.05) {
      var arrowPath = isEven ? 'M10 20h20M22 12l8 8-8 8' : 'M30 20H10M18 12l-8 8 8 8';
      var animName = isEven ? 'arrow-pulse-right' : 'arrow-pulse-left';
      arrowEl = React.createElement('div', {
        key: 'arrow-' + project.id,
        style: {
          position: 'absolute', top: '50%',
          left: previewLeft, right: previewRight,
          transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '12px',
          opacity: isHovered ? 0 : opacity,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none', zIndex: 4,
        }
      },
        React.createElement('div', { style: { fontFamily: 'Space Mono, monospace', fontSize: '10px', color: project.color, opacity: 0.7, letterSpacing: '0.15em', textTransform: 'uppercase' } }, 'hover to preview'),
        React.createElement('svg', { width: '40', height: '40', viewBox: '0 0 40 40', style: { animation: animName + ' 1.2s ease-in-out infinite' } },
          React.createElement('path', { d: arrowPath, stroke: project.color, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' })
        ),
        React.createElement('div', { style: { display: 'flex', gap: '6px' } },
          [0.3, 0.5, 0.7].map(function(op, di) {
            return React.createElement('div', { key: di, style: { width: '4px', height: '4px', borderRadius: '50%', background: project.color, opacity: isEven ? op : [0.7, 0.5, 0.3][di] } });
          })
        )
      );
    }
    return React.createElement(React.Fragment, { key: project.id }, cardEl, previewEl, arrowEl);
  });

  var counterText = activeIndex !== -1 ? '0' + (activeIndex + 1) + ' / 0' + filtered.length : '-- / 0' + filtered.length;

  // ─── Tab button builder ────────────────────────────────────────
  var makeTab = function(label, cat, icon) {
    var isActive = activeCategory === cat;
    var accentColor = cat === 'AI/ML' ? '#a78bfa' : '#fbbf24';
    return React.createElement('button', {
      key: cat,
      onClick: function() { switchTo(cat); },
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        padding: '7px 18px',
        borderRadius: '999px',
        border: isActive ? '1px solid ' + accentColor : '1px solid rgba(255,255,255,0.1)',
        background: isActive ? accentColor + '18' : 'rgba(255,255,255,0.03)',
        color: isActive ? accentColor : 'rgba(255,255,255,0.35)',
        cursor: 'pointer',
        transition: 'all 0.35s ease',
        outline: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        backdropFilter: 'blur(8px)',
        boxShadow: isActive ? '0 0 20px ' + accentColor + '15' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }
    },
      React.createElement('span', { style: { fontSize: '12px', lineHeight: 1 } }, icon),
      label,
      // Active indicator dot
      isActive ? React.createElement('span', {
        style: {
          width: '4px', height: '4px', borderRadius: '50%',
          background: accentColor,
          boxShadow: '0 0 6px ' + accentColor,
          marginLeft: '2px',
        }
      }) : null
    );
  };

  // ─── Tab bar ───────────────────────────────────────────────────
  var tabBar = React.createElement('div', {
    style: {
      position: 'absolute',
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '8px',
      zIndex: 15,
      alignItems: 'center',
      opacity: scrollProgress > 0.48 && scrollProgress < 0.98 ? 1 : 0,
      transition: 'opacity 0.4s ease',
      pointerEvents: scrollProgress > 0.48 && scrollProgress < 0.98 ? 'auto' : 'none',
    }
  },
    // Decorative left line
    React.createElement('div', {
      style: {
        width: '30px', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15))',
      }
    }),
    makeTab('AI / ML', 'AI/ML'),
    // Center separator
    React.createElement('div', {
      style: {
        width: '1px', height: '16px',
        background: 'rgba(255,255,255,0.1)',
        margin: '0 2px',
      }
    }),
    makeTab('Web Dev', 'Web Dev'),
    // Decorative right line
    React.createElement('div', {
      style: {
        width: '30px', height: '1px',
        background: 'linear-gradient(270deg, transparent, rgba(255,255,255,0.15))',
      }
    })
  );

  var animStyles = React.createElement('style', null,
    '@keyframes arrow-pulse-right{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}' +
    '@keyframes arrow-pulse-left{0%,100%{transform:translateX(0)}50%{transform:translateX(-6px)}}' +
    '@keyframes gravity-pulse{0%,100%{opacity:1;transform:translateX(-50%) scale(1)}50%{opacity:0.6;transform:translateX(-50%) scale(0.98)}}'
  );

  return React.createElement('section', {
    id: 'projects-section',
    style: { height: '800vh', position: 'relative', background: 'transparent' }
  },
    React.createElement('div', {
      style: { position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', width: '100%' }
    },
      animStyles,
      // GravitationalAnomaly background — fully intact
      React.createElement('div', {
        style: {
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: scrollProgress > 0.8 ? Math.max(0, 1 - (scrollProgress - 0.8) * 5) : 1,
          pointerEvents: 'none'
        }
      }, 
        React.createElement(GravitationalAnomaly, { scrollProgress: scrollProgress })
      ),
      // Shooting Stars Canvas — wrapper div carries the key so React
      // fully destroys and recreates the canvas on every toggle.
      React.createElement('div', {
        key: 'stars-' + triggerCount,
        style: { position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }
      },
        triggerCount > 0
          ? React.createElement(ShootingStarsCanvas, { hue: meteorHue })
          : null
      ),
      // Section label (top-left)
      React.createElement('div', { style: { position: 'absolute', top: '2rem', left: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--color-accent)', textTransform: 'uppercase', zIndex: 10 } }, 'Projects'),
      // Tab bar (top-center)
      tabBar,
      // Counter (bottom-left)
      React.createElement('div', { style: { position: 'absolute', bottom: '2rem', left: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-accent)', zIndex: 10, letterSpacing: '0.1em' } }, counterText),
      // Active category label (bottom-right)
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          letterSpacing: '0.2em',
          padding: '4px 14px',
          borderRadius: '999px',
          background: activeCategory === 'AI/ML' ? 'rgba(167,139,250,0.1)' : 'rgba(251,191,36,0.1)',
          border: '1px solid ' + (activeCategory === 'AI/ML' ? 'rgba(167,139,250,0.25)' : 'rgba(251,191,36,0.25)'),
          color: activeCategory === 'AI/ML' ? '#a78bfa' : '#fbbf24',
          zIndex: 10,
          transition: 'all 0.5s ease',
          textTransform: 'uppercase',
          opacity: scrollProgress > 0.48 && scrollProgress < 0.98 ? 0.7 : 0,
        }
      }, activeCategory === 'AI/ML' ? '◆ AI / ML' : '◆ WEB DEV'),
      // All project cards
      cards
    )
  );
  };

export default Projects;