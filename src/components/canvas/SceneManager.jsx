import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Grid } from '@react-three/drei';
import * as THREE from 'three';
import VerticalLine from './VerticalLine';
import projects from '../../data/projects';
 
// Animates camera from close-up to normal position during load
var CameraIntro = function(props) {
  var loadProgress = props.loadProgress || 0;
  var initialized = useRef(false);
 
  useFrame(function(state) {
    var camera = state.camera;
 
    // On first frame, snap camera to close position
    if (!initialized.current) {
      camera.position.set(0, 0, 4);
      initialized.current = true;
    }
 
    // While loading: slowly pull back to final position
    if (loadProgress < 1) {
      camera.position.z += (12 - camera.position.z) * 0.012;
      camera.position.y += (2 - camera.position.y) * 0.012;
      camera.position.x += (0 - camera.position.x) * 0.02;
    } else {
      // Snap to exact final position once done
      camera.position.z += (12 - camera.position.z) * 0.05;
      camera.position.y += (2 - camera.position.y) * 0.05;
      camera.position.x += (0 - camera.position.x) * 0.05;
    }
  });
 
  return null;
};
 
var DynamicGrid = function(props) {
  var accentRgb = props.accentRgb;
  var scrollProgress = props.scrollProgress;
 
  var gridRef = useRef();
  var currentColor = useRef(new THREE.Color(accentRgb[0], accentRgb[1], accentRgb[2]));
  var targetColor = useRef(new THREE.Color(accentRgb[0], accentRgb[1], accentRgb[2]));
  var posY = useRef(-2);
 
  useFrame(function() {
    if (!gridRef.current) return;
 
    // Lerp accent color
    targetColor.current.setRGB(accentRgb[0], accentRgb[1], accentRgb[2]);
    currentColor.current.lerp(targetColor.current, 0.04);
 
    var mat = gridRef.current.material;
    if (mat && mat.uniforms) {
      if (mat.uniforms.sectionColor) {
        mat.uniforms.sectionColor.value.copy(currentColor.current);
      }
      if (mat.uniforms.cellColor) {
        mat.uniforms.cellColor.value.copy(
          currentColor.current.clone().multiplyScalar(0.3)
        );
      }
    }
 
    // Rise and fade as approaching projects section
    var targetY = -2;
    var colorScale = 1;
    if (scrollProgress > 0.44 && scrollProgress <= 0.54) {
      var p = (scrollProgress - 0.44) / 0.10;
      targetY = THREE.MathUtils.lerp(-2, 6, p);
      colorScale = 1 - p;
    } else if (scrollProgress > 0.54) {
      targetY = 6;
      colorScale = 0;
    }
 
    posY.current += (targetY - posY.current) * 0.06;
    gridRef.current.position.y = posY.current;
 
    // Apply faded color
    if (mat && mat.uniforms) {
      var o = Math.max(0, colorScale);
      if (mat.uniforms.sectionColor) {
        mat.uniforms.sectionColor.value.copy(
          currentColor.current.clone().multiplyScalar(o)
        );
      }
      if (mat.uniforms.cellColor) {
        mat.uniforms.cellColor.value.copy(
          currentColor.current.clone().multiplyScalar(o * 0.3)
        );
      }
    }
  });
 
  if (scrollProgress > 0.58) return null;
 
  return React.createElement(Grid, {
    ref: gridRef,
    position: [0, -2, 0],
    cellSize: 1,
    cellThickness: 0.8,
    cellColor: '#1a1a2e',
    sectionSize: 5,
    sectionThickness: 1.2,
    sectionColor: '#7B61FF',
    fadeDistance: 40,
    fadeStrength: 1,
    infiniteGrid: true,
  });
};
 
var SceneManager = function(props) {
  var accentRgb = props.accentRgb || [0.48, 0.38, 1.0];
  var scrollProgress = props.scrollProgress || 0;
  var loadProgress = props.loadProgress || 0;
 
  var projectColors = projects.map(function(p) { return p.color; });
 
  return React.createElement(React.Fragment, null,
    React.createElement(CameraIntro, { loadProgress: loadProgress }),
    React.createElement('ambientLight', { intensity: 0.4 }),
    React.createElement('pointLight', { position: [10, 10, 10], intensity: 1.5, color: '#ffffff' }),
    React.createElement(Stars, { radius: 100, depth: 50, count: 6000, factor: 4, saturation: 0, fade: true, speed: 0.5 }),
    React.createElement(DynamicGrid, { accentRgb: accentRgb, scrollProgress: scrollProgress }),
    React.createElement(VerticalLine, { scrollProgress: scrollProgress, projectColors: projectColors })
  );
};
 
export default SceneManager;