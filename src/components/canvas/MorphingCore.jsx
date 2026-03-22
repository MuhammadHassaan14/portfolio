import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MorphingCore = ({ progress = 0, position = [0, 0, 0] }) => {
  const meshRef = useRef();
  const pointsRef = useRef();

  const spherePoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 3000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + (Math.random() - 0.5) * 0.2;
      points.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }
    return new Float32Array(points);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      let rotationSpeed = 0.5;
      let scale = 1;

      if (progress <= 0.3) {
        rotationSpeed = 0.5;
        scale = 1;
      } else if (progress > 0.3 && progress <= 0.6) {
        const p = (progress - 0.3) / 0.3;
        rotationSpeed = THREE.MathUtils.lerp(0.5, 3, p);
        scale = THREE.MathUtils.lerp(1, 1.4, p);
      } else {
        rotationSpeed = 3;
        scale = 1.4;
      }

      meshRef.current.rotation.y += state.delta * rotationSpeed;
      meshRef.current.rotation.x += state.delta * rotationSpeed * 0.3;
      meshRef.current.scale.setScalar(scale);

      // Fade mesh out after progress 0.6
      const meshOpacity = progress > 0.6
        ? THREE.MathUtils.lerp(1, 0, (progress - 0.6) / 0.4)
        : 1;
      meshRef.current.material.opacity = meshOpacity;
    }

    if (pointsRef.current) {
      const pointsOpacity = progress > 0.6
        ? THREE.MathUtils.lerp(0, 1, (progress - 0.6) / 0.4)
        : 0;
      pointsRef.current.material.opacity = pointsOpacity;

      if (progress > 0.6) {
        const pulse = 1 + Math.sin(t * 2) * 0.1;
        pointsRef.current.scale.setScalar(pulse);
      }
      pointsRef.current.rotation.y += state.delta * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Wireframe Icosahedron — meshBasicMaterial so no lighting needed */}
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color="#00f5d4"
          wireframe={true}
        />
      </mesh>

      {/* Particle Sphere */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={spherePoints.length / 3}
            array={spherePoints}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f5d4"
          size={0.05}
          sizeAttenuation={true}
          transparent={true}
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default MorphingCore;