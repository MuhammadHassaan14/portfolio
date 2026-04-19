import React from 'react';
import projects from '../../data/projects';
 
var cardTimes = [
  { fadeInStart: 0.58, fadeInEnd: 0.61, fadeOutStart: 0.68, fadeOutEnd: 0.72 },
  { fadeInStart: 0.67, fadeInEnd: 0.70, fadeOutStart: 0.76, fadeOutEnd: 0.80 },
  { fadeInStart: 0.76, fadeInEnd: 0.79, fadeOutStart: 0.84, fadeOutEnd: 0.88 },
  { fadeInStart: 0.85, fadeInEnd: 0.88, fadeOutStart: 0.97, fadeOutEnd: 1.00 },
];
 
const Projects = function(props) {
  var scrollProgress = props.scrollProgress || 0;
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
 
    return (
      <div
        key={project.id}
        style={{
          position: 'absolute',
          top: '50%',
          left: isEven ? '55%' : 'auto',
          right: isEven ? 'auto' : '55%',
          transform: 'translateY(-50%)',
          width: 'clamp(240px, 28vw, 300px)',
          background: 'rgba(5,10,20,0.88)',
          border: '1px solid ' + project.color + '44',
          borderRadius: '12px',
          padding: '20px',
          backdropFilter: 'blur(10px)',
          fontFamily: 'Space Mono, monospace',
          pointerEvents: opacity > 0.1 ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          boxShadow: '0 0 20px ' + project.color + '15',
          opacity: opacity,
          zIndex: 5,
          color: 'white',
        }}
      >
        <div style={{
          height: '2px',
          background: project.color,
          marginBottom: '12px',
          borderRadius: '1px',
        }} />
 
        <div style={{
          fontSize: '10px',
          color: project.color,
          letterSpacing: '0.2em',
          marginBottom: '6px',
          textTransform: 'uppercase',
          opacity: 0.8,
        }}>
          {'PROJECT 0' + (i + 1)}
        </div>
 
        <h3 style={{
          color: 'white',
          fontSize: '15px',
          fontWeight: 700,
          lineHeight: 1.3,
          margin: '0 0 8px 0',
        }}>
          {project.title}
        </h3>
 
        <p style={{
          color: '#888',
          fontSize: '11px',
          lineHeight: 1.7,
          margin: '0 0 12px 0',
        }}>
          {project.description}
        </p>
 
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          marginBottom: '14px',
        }}>
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
 
        <a
          href={project.live || '#'}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'block',
            padding: '6px',
            textAlign: 'center',
            background: project.color,
            color: '#000',
            fontWeight: 700,
            borderRadius: '7px',
            fontSize: '11px',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          VIEW PROJECT
        </a>
      </div>
    );
  });
 
  var sectionVisible = scrollProgress > 0.54;
  var counterText = activeIndex !== -1
    ? '0' + (activeIndex + 1) + ' / 04'
    : '-- / 04';
 
  return (
    <section
      id="projects-section"
      style={{ height: '500vh', position: 'relative', background: 'transparent' }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        width: '100%',
        opacity: sectionVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
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
 
        {/* Active project counter */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-accent)',
          zIndex: 10,
        }}>
          {counterText}
        </div>
 
        {cards}
      </div>
    </section>
  );
};
 
export default Projects;