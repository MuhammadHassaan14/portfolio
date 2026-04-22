import React, { useState, useEffect } from 'react';
import projects from '../../data/projects';
 
var cardTimes = [
  { fadeInStart: 0.57, fadeInEnd: 0.60, fadeOutStart: 0.65, fadeOutEnd: 0.68 },
  { fadeInStart: 0.68, fadeInEnd: 0.71, fadeOutStart: 0.76, fadeOutEnd: 0.79 },
  { fadeInStart: 0.79, fadeInEnd: 0.82, fadeOutStart: 0.87, fadeOutEnd: 0.90 },
  { fadeInStart: 0.90, fadeInEnd: 0.93, fadeOutStart: 0.97, fadeOutEnd: 1.00 },
];
 
var Projects = function(props) {
  var scrollProgress = props.scrollProgress || 0;
 
  var stateArr = useState(null);
  var hoveredCard = stateArr[0];
  var setHoveredCard = stateArr[1];
 
  var mobileArr = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  var isMobile = mobileArr[0];
  var setIsMobile = mobileArr[1];
 
  useEffect(function() {
    var handleResize = function() { setIsMobile(window.innerWidth < 768); };
    window.addEventListener('resize', handleResize);
    return function() { window.removeEventListener('resize', handleResize); };
  }, []);
 
  var activeIndex = -1;
  var maxOpacity = 0;
 
  var cards = projects.map(function(project, i) {
    var t = cardTimes[i];
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
 
    // Preview and arrow positioning (desktop only)
    var previewLeft = 'auto';
    var previewRight = 'auto';
    if (!isMobile) {
      if (isEven) {
        previewRight = 'calc(48% + 16px)';
      } else {
        previewLeft = 'calc(48% + 16px)';
      }
    }
 
    // Preview slide transform
    var previewHidden = isEven
      ? 'translateY(-50%) translateX(30px)'
      : 'translateY(-50%) translateX(-30px)';
    var previewVisible = 'translateY(-50%) translateX(0)';
 
    // Card
    var cardEl = React.createElement('div', {
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
 
    // Preview panel
    var previewEl = null;
    if (!isMobile) {
      previewEl = React.createElement('div', {
        style: {
          position: 'absolute', top: '50%',
          left: previewLeft, right: previewRight,
          width: 'clamp(320px, 34vw, 420px)',
          background: 'rgba(4,8,18,0.95)',
          border: '1px solid ' + project.color + '60',
          borderRadius: '16px', padding: '24px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 60px ' + project.color + '20',
          zIndex: 20, pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? previewVisible : previewHidden,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
          fontFamily: 'Space Mono, monospace', color: 'white',
        }
      },
        React.createElement('div', { style: { fontSize: '9px', color: project.color, letterSpacing: '0.3em', marginBottom: '12px', textTransform: 'uppercase' } }, 'PREVIEW'),
        React.createElement('div', {
          style: { width: '100%', paddingTop: '56.25%', position: 'relative', borderRadius: '8px', overflow: 'hidden', background: '#060810', border: '1px solid ' + project.color + '30', marginBottom: '16px' }
        },
          React.createElement('div', {
            style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(' + project.color + '10 1px, transparent 1px), linear-gradient(90deg, ' + project.color + '10 1px, transparent 1px)', backgroundSize: '20px 20px', background: 'linear-gradient(135deg, ' + project.color + '20, transparent 60%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }
          },
            React.createElement('span', { style: { color: project.color, fontSize: '16px', fontWeight: 700, textAlign: 'center', opacity: 0.9, padding: '0 12px' } }, project.title),
            React.createElement('div', { style: { display: 'flex', gap: '4px' } },
              project.tags.slice(0, 2).map(function(tag) {
                return React.createElement('span', { key: tag, style: { fontSize: '9px', padding: '2px 7px', border: '1px solid ' + project.color + '60', color: project.color, borderRadius: '999px', background: project.color + '15' } }, tag);
              })
            )
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
 
    // Arrow indicator (desktop only, hides when preview shows)
    var arrowEl = null;
    if (!isMobile && opacity > 0.05) {
      var arrowPath = isEven ? 'M10 20h20M22 12l8 8-8 8' : 'M30 20H10M18 12l-8 8 8 8';
      var animName = isEven ? 'arrow-pulse-right' : 'arrow-pulse-left';
 
      arrowEl = React.createElement('div', {
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
        React.createElement('svg', {
          width: '40', height: '40', viewBox: '0 0 40 40',
          style: { animation: animName + ' 1.2s ease-in-out infinite' }
        },
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
 
  var counterText = activeIndex !== -1 ? '0' + (activeIndex + 1) + ' / 04' : '-- / 04';
 
  var animStyles = React.createElement('style', null,
    '@keyframes arrow-pulse-right { 0%,100%{ transform:translateX(0); } 50%{ transform:translateX(6px); } }' +
    '@keyframes arrow-pulse-left { 0%,100%{ transform:translateX(0); } 50%{ transform:translateX(-6px); } }'
  );
 
  return React.createElement('section', {
    id: 'projects-section',
    style: { height: '600vh', position: 'relative', background: 'transparent' }
  },
    React.createElement('div', {
      style: { position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', width: '100%' }
    },
      animStyles,
      React.createElement('div', { style: { position: 'absolute', top: '2rem', left: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--color-accent)', textTransform: 'uppercase', zIndex: 10 } }, 'Projects'),
      React.createElement('div', { style: { position: 'absolute', bottom: '2rem', left: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-accent)', zIndex: 10, letterSpacing: '0.1em' } }, counterText),
      cards
    )
  );
};
 
export default Projects;