import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
 
const HelixBeam = ({ scrollProgress = 0, projects = [] }) => {
  const { camera } = useThree();
  const targetY = useRef(2);
  const targetZ = useRef(12);
 
  // Only show helix when user is in projects section (progress > 0.5)
  const isVisible = scrollProgress > 0.5;
 
  // Fade in opacity for cards
  const helixOpacity = scrollProgress > 0.5
    ? Math.min(1, (scrollProgress - 0.5) / 0.08)
    : 0;
 
  useFrame(() => {
    if (scrollProgress > 0.55) {
      const p = (scrollProgress - 0.55) / 0.45;
      targetY.current = THREE.MathUtils.lerp(2, -10, p);
      targetZ.current = 10;
    } else {
      // Reset camera when not in projects section
      targetY.current = 2;
      targetZ.current = 12;
    }
    camera.position.y += (targetY.current - camera.position.y) * 0.05;
    camera.position.x += (0 - camera.position.x) * 0.05;
    camera.position.z += (targetZ.current - camera.position.z) * 0.05;
  });
 
  if (!isVisible) return null;
 
  return (
    <group>
      {/* Central beam */}
      <mesh position={[1, -4, 6]}>
        <cylinderGeometry args={[0.03, 0.03, 20, 8]} />
        <meshBasicMaterial color="#ffffff" opacity={0.15 * helixOpacity} transparent />
      </mesh>
 
      <pointLight position={[1, 2, 6]} color="#ffffff" intensity={2} />
 
      {/* Project cards in helix */}
      {projects.map((project, i) => {
        const angle = i * (Math.PI * 0.9);
        const x = 1 + Math.sin(angle) * 2.5;
        const y = 2 - i * 3.5;
        const z = 6 + Math.cos(angle) * 1.5;
 
        return (
          <Html
            key={project.id}
            position={[x, y, z]}
            occlude={false}
            zIndexRange={[100, 0]}
            transform={false}
            center
          >
            <div style={{
              width: "220px",
              background: "rgba(0,0,0,0.85)",
              border: "1px solid " + project.color,
              borderRadius: "12px",
              padding: "16px",
              backdropFilter: "blur(10px)",
              fontFamily: "Space Mono, monospace",
              pointerEvents: "auto",
              color: "white",
              opacity: helixOpacity,
              transition: "opacity 0.3s ease",
            }}>
              <div style={{ height: "3px", background: project.color, borderRadius: "2px", marginBottom: "12px" }} />
              <h3 style={{ fontSize: "14px", marginBottom: "8px", fontWeight: 600 }}>{project.title}</h3>
              <p style={{ color: "#aaa", fontSize: "11px", lineHeight: "1.6", marginBottom: "12px" }}>{project.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: "10px", padding: "2px 8px",
                    border: "1px solid " + project.color,
                    color: project.color, borderRadius: "999px",
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </Html>
        );
      })}
    </group>
  );
};
 
export default HelixBeam;