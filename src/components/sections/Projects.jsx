import React from 'react';
 
const Projects = () => {
  return (
    <section id="projects-section" style={{ height: "500vh", position: "relative", background: "transparent" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center" }}>
        <div style={{
          position: "absolute", top: "2rem", left: "2rem",
          fontFamily: "var(--font-mono)", fontSize: "0.7rem",
          letterSpacing: "0.3em", color: "var(--color-accent)",
          textTransform: "uppercase"
        }}>
          Projects
        </div>
        <div style={{
          position: "absolute", bottom: "2rem", left: "2rem",
          fontFamily: "var(--font-mono)", fontSize: "0.7rem",
          color: "var(--color-accent)"
        }}>
          01 — 04
        </div>
      </div>
    </section>
  );
};
 
export default Projects;