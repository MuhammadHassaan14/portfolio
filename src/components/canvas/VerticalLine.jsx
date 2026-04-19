import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
 
const VerticalLine = ({ scrollProgress = 0, projectColors = [] }) => {
  const nodeY = [2, -2.5, -7, -11.5];
  const nodeStarts = [0.58, 0.66, 0.74, 0.82];
 
  useFrame(({ camera }) => {
    let targetY = 2;
    if (scrollProgress > 0.56) {
      const p = (scrollProgress - 0.56) / 0.44;
      targetY = THREE.MathUtils.lerp(2, -13, p);
    }
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (6 - camera.position.z) * 0.04;
    camera.position.x += (0 - camera.position.x) * 0.04;
    camera.rotation.x = 0;
    camera.rotation.z = 0;
  });
 
  if (scrollProgress < 0.54) return null;
 
  const lineProgress = Math.max(0, Math.min(1, (scrollProgress - 0.54) / 0.06));
  const height = Math.max(0.001, 30 * lineProgress);
  const posY = 7 - height / 2;
 
  return (
    <group>
      {/* Vertical line growing downward */}
      <mesh position={[0, posY, 6]}>
        <boxGeometry args={[0.008, height, 0.008]} />
        <meshBasicMaterial color="#ffffff" opacity={0.15} transparent={true} />
      </mesh>
 
      {/* Colored nodes appearing one by one */}
      {nodeY.map(function(y, i) {
        var start = nodeStarts[i];
        var opacity = Math.max(0, Math.min(1, (scrollProgress - start) / 0.04));
        if (opacity <= 0) return null;
        var nodeColor = projectColors[i] || '#ffffff';
 
        return (
          <group key={i} position={[0, y, 6]}>
            <mesh>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color={nodeColor} opacity={opacity} transparent={true} />
            </mesh>
            <pointLight intensity={2 * opacity} distance={4} color={nodeColor} />
          </group>
        );
      })}
    </group>
  );
};
 
export default VerticalLine;