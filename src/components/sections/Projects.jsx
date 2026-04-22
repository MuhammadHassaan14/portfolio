import React, { useState } from 'react';
import projects from '../../data/projects';
 
var cardTimes = [
  { fadeInStart: 0.57, fadeInEnd: 0.60, fadeOutStart: 0.65, fadeOutEnd: 0.68 },
  { fadeInStart: 0.68, fadeInEnd: 0.71, fadeOutStart: 0.76, fadeOutEnd: 0.79 },
  { fadeInStart: 0.79, fadeInEnd: 0.82, fadeOutStart: 0.87, fadeOutEnd: 0.90 },
  { fadeInStart: 0.90, fadeInEnd: 0.93, fadeOutStart: 0.97, fadeOutEnd: 1.00 },
];
 
var Projects = function(props) {
  var scrollProgress = props.scrollProgress || 0;
  // Local state since props won't have these
  var stateArr = useState(null);
  var localHovered = stateArr[0];
  var setLocalHovered = stateArr[1];
 
  var activeHovered = localHovered;
  var setActiveHovered = setLocalHovered;
 
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
    if (opacity > maxOpacity) {
      maxOpacity = opacity;
      activeIndex = i;
    }
 
    var isEven = i % 2 === 0;
    var isHovered = activeHovered === i;
 
    // Card sits on right if even, left if odd
    // Preview panel slides in from opposite side
    var cardLeft = isEven ? '54%' : 'auto';
    var cardRight = isEven ? 'auto' : '54%';
    var previewLeft = isEven ? '4%' : 'auto';
    var previewRight = isEven ? 'auto' : '4%';
 
    // Slide in from off-screen: even cards have preview on left so slides from left (-110%)
    var previewHiddenTransform = isEven
      ? 'translateY(-50%) translateX(-110%)'
      : 'translateY(-50%) translateX(110%)';
    var previewVisibleTransform = 'translateY(-50%) translateX(0)';
 
    return (
      <React.Fragment key={project.id}>
        {/* Project card */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: cardLeft,
          right: cardRight,
          transform: 'translateY(-50%)',
          width: 'clamp(260px, 28vw, 320px)',
          background: 'rgba(4,8,18,0.92)',
          borderTop: '1px solid ' + project.color + '40',
          borderBottom: '1px solid ' + project.color + '40',
          borderLeft: isEven ? '3px solid ' + project.color : '1px solid ' + project.color + '40',
          borderRight: isEven ? '1px solid ' + project.color + '40' : '3px solid ' + project.color,
          borderRadius: '14px',
          padding: '24px',
          backdropFilter: 'blur(14px)',
          fontFamily: 'Space Mono, monospace',
          pointerEvents: opacity > 0.1 ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
          boxShadow: '0 0 35px ' + project.color + '15',
          opacity: opacity,
          zIndex: 5,
          color: 'white',
        }}>
          <div style={{
            height: '2px',
            background: 'linear-gradient(' + (isEven ? '90deg' : '270deg') + ', ' + project.color + ', transparent)',
            marginBottom: '14px',
            borderRadius: '1px',
          }} />
 
          <div style={{
            fontSize: '10px',
            color: project.color,
            letterSpacing: '0.25em',
            marginBottom: '8px',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}>
            {'PROJECT 0' + (i + 1)}
          </div>
 
          <h3 style={{
            color: 'white',
            fontSize: '17px',
            fontWeight: 700,
            lineHeight: 1.25,
            margin: '0 0 10px 0',
          }}>
            {project.title}
          </h3>
 
          <p style={{
            color: '#999',
            fontSize: '11.5px',
            lineHeight: 1.75,
            margin: '0 0 14px 0',
          }}>
            {project.description}
          </p>
 
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            marginBottom: '16px',
          }}>
            {project.tags.map(function(tag) {
              return (
                <span key={tag} style={{
                  fontSize: '10px',
                  padding: '3px 9px',
                  border: '1px solid ' + project.color + '55',
                  color: project.color,
                  borderRadius: '999px',
                  background: project.color + '12',
                }}>
                  {tag}
                </span>
              );
            })}
          </div>
 
          {/* VIEW PROJECT button — hover triggers preview */}
          <a
            href={project.live || '#'}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={function() { setActiveHovered(i); }}
            onMouseLeave={function() { setActiveHovered(null); }}
            style={{
              display: 'block',
              padding: '8px',
              textAlign: 'center',
              background: project.color,
              color: '#000',
              fontWeight: 700,
              borderRadius: '8px',
              fontSize: '11px',
              textDecoration: 'none',
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            VIEW PROJECT
          </a>
        </div>
 
        {/* Hover preview panel — slides in from opposite side */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: previewLeft,
          right: previewRight,
          width: 'clamp(280px, 30vw, 360px)',
          background: 'rgba(4,8,18,0.95)',
          border: '1px solid ' + project.color + '60',
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 60px ' + project.color + '20',
          zIndex: 20,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? previewVisibleTransform : previewHiddenTransform,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
          fontFamily: 'Space Mono, monospace',
          color: 'white',
        }}>
          {/* PREVIEW label */}
          <div style={{
            fontSize: '9px',
            color: project.color,
            letterSpacing: '0.3em',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}>
            PREVIEW
          </div>
 
          {/* Mock browser / project frame */}
          <div style={{
            width: '100%',
            paddingTop: '56.25%',
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#060810',
            border: '1px solid ' + project.color + '30',
            marginBottom: '16px',
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(135deg, ' + project.color + '25, transparent 60%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '8px',
            }}>
              {/* Decorative grid lines inside frame */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'linear-gradient(' + project.color + '10 1px, transparent 1px), linear-gradient(90deg, ' + project.color + '10 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }} />
              <span style={{
                color: project.color,
                fontSize: '16px',
                fontWeight: 700,
                textAlign: 'center',
                opacity: 0.9,
                position: 'relative',
                zIndex: 1,
                padding: '0 12px',
              }}>
                {project.title}
              </span>
              <div style={{
                display: 'flex',
                gap: '4px',
                position: 'relative',
                zIndex: 1,
              }}>
                {project.tags.slice(0, 2).map(function(tag) {
                  return (
                    <span key={tag} style={{
                      fontSize: '9px',
                      padding: '2px 7px',
                      border: '1px solid ' + project.color + '60',
                      color: project.color,
                      borderRadius: '999px',
                      background: project.color + '15',
                    }}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
 
          {/* Description */}
          <p style={{
            color: '#777',
            fontSize: '11px',
            lineHeight: 1.65,
            margin: '0 0 14px 0',
          }}>
            {project.description}
          </p>
 
          {/* All tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {project.tags.map(function(tag) {
              return (
                <span key={tag} style={{
                  fontSize: '10px',
                  padding: '2px 8px',
                  border: '1px solid ' + project.color + '55',
                  color: project.color,
                  borderRadius: '999px',
                  background: project.color + '11',
                }}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  });
 
  var counterText = activeIndex !== -1
    ? '0' + (activeIndex + 1) + ' / 04'
    : '-- / 04';
 
  return (
    <section
      id="projects-section"
      style={{ height: '600vh', position: 'relative', background: 'transparent' }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        width: '100%',
      }}>
        {/* PROJECTS label */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          color: 'var(--color-accent)',
          textTransform: 'uppercase',
          zIndex: 10,
        }}>
          Projects
        </div>
 
        {/* Counter */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-accent)',
          zIndex: 10,
          letterSpacing: '0.1em',
        }}>
          {counterText}
        </div>
 
        {cards}
      </div>
    </section>
  );
};
 
export default Projects;