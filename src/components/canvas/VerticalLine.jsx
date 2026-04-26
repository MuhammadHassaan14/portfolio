import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
 
const VerticalLine = function(props) {
  var scrollProgress = props.scrollProgress || 0;
  var projectColors = props.projectColors || [];
 
  var nodeY = [4, -2, -8, -14];
  var nodeStarts = [0.57, 0.69, 0.81, 0.91];
 
  useFrame(function(state) {
    var camera = state.camera;
    var targetY = 2;
    if (scrollProgress > 0.56) {
      var p = (scrollProgress - 0.56) / 0.44;
      targetY = THREE.MathUtils.lerp(2, -13, p);
    }
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (6 - camera.position.z) * 0.04;
    camera.position.x += (0 - camera.position.x) * 0.04;
    camera.rotation.x = 0;
    camera.rotation.z = 0;
  });
 
  if (scrollProgress < 0.54) return null;
 
  return (
    <group>
      {nodeY.map(function(y, i) {
        var start = nodeStarts[i];
        var opacity = Math.max(0, Math.min(1, (scrollProgress - start) / 0.04));
        if (opacity <= 0) return null;
        var nodeColor = projectColors[i] || '#ffffff';
 
        return (
          <group key={i} position={[0, y, 6]}>
            <mesh>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshBasicMaterial color={nodeColor} opacity={opacity} transparent={true} />
            </mesh>
            <pointLight intensity={2 * opacity} distance={5} color={nodeColor} />
          </group>
        );
      })}
    </group>
  );
};
 
export default VerticalLine;