import React, { useRef, useEffect } from 'react';

class Particle {
  constructor(baseX, baseY, tx, ty, tz) {
    this.baseX = baseX;
    this.baseY = baseY;
    this.tx = tx; 
    this.ty = ty; 
    this.tz = tz; 
    this.x = baseX;
    this.y = baseY;
    this.size = 1.2;
    this.opacity = 0.2;
  }

  draw(ctx, color) {
    ctx.fillStyle = color;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update(scrollProgress, width, height) {
    const t = Math.min(1, scrollProgress / 0.4);
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const sphereRadius = Math.min(width * 0.25, 120);
    const cx = width / 2;
    const cy = height - 160;

    const rotation = scrollProgress * 8; 
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);
    
    const rx = this.tx * cosR - this.tz * sinR;
    const rz = this.tx * sinR + this.tz * cosR;

    const fov = 300;
    const scale = fov / (fov + rz * sphereRadius);
    
    const targetX = cx + rx * sphereRadius * scale;
    const targetY = cy + this.ty * sphereRadius * scale;

    this.x = this.baseX + (targetX - this.baseX) * ease;
    this.y = this.baseY + (targetY - this.baseY) * ease;
    
    this.size = (1.2 * (1 - ease)) + (2.0 * scale * ease);
    
    const zAlpha = Math.max(0.1, Math.min(1, scale)); 
    const globalAlpha = 0.1 + (ease * 0.7);
    this.opacity = globalAlpha * zAlpha;
  }
}

const GravitationalAnomaly = ({ scrollProgress = 0 }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const initParticles = () => {
      const pts = [];
      const spacing = 40;
      const cols = Math.floor(canvas.width / spacing);
      const rows = Math.floor(canvas.height / spacing);
      const totalParticles = cols * rows;
      
      let index = 0;
      const phi = Math.PI * (3 - Math.sqrt(5));

      for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
          const ty = 1 - (index / (totalParticles - 1)) * 2; 
          const radiusAtY = Math.sqrt(1 - ty * ty);
          const theta = phi * index;

          const tx = Math.cos(theta) * radiusAtY;
          const tz = Math.sin(theta) * radiusAtY;

          pts.push(new Particle(x, y, tx, ty, tz));
          index++;
        }
      }
      particles.current = pts;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#c3ff00';
      
      const pts = particles.current;
      for (let i = 0; i < pts.length; i++) {
        pts[i].update(scrollProgress, canvas.width, canvas.height);
        pts[i].draw(ctx, accentColor);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [scrollProgress]);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default GravitationalAnomaly;
