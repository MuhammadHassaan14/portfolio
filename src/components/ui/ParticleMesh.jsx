import React, { useEffect, useRef } from 'react';

class Particle {
  constructor(canvas) {
    this.reset(canvas);
  }

  reset(canvas, respawn = false) {
    this.x = Math.random() * canvas.width;
    this.y = respawn ? 0 : Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    // Positive vertical velocity for downward bias (gravity)
    this.vy = Math.random() * 0.5 + 0.1; 
    this.radius = Math.random() * 1.5 + 1;
  }

  update(canvas) {
    this.x += this.vx;
    this.y += this.vy;

    // Horizontal bounce
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    
    // Downward wrap-around (respawn at top)
    if (this.y > canvas.height) {
      this.reset(canvas, true);
    }
  }

  draw(ctx, accentColor) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = accentColor;
    ctx.globalAlpha = 0.5;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const ParticleMesh = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 60;
    const connectionDistance = 120;
    const mouseDistance = 180;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
      }
    };

    const drawLines = (accentColor) => {
      for (let i = 0; i < particles.length; i++) {
        // Line to mouse
        if (mouseRef.current.x !== null) {
          const dx = mouseRef.current.x - particles[i].x;
          const dy = mouseRef.current.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = accentColor;
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = 1 - dist / mouseDistance;
            ctx.stroke();
          }
        }

        // Lines between particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = accentColor;
            ctx.lineWidth = 0.4;
            ctx.globalAlpha = (1 - dist / connectionDistance) * 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const drawChevron = (accentColor) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height - 100;
      const size = 20;
      
      // Pulsing alpha: oscillations between ~0.2 and ~0.8
      const pulse = 0.5 + Math.sin(Date.now() / 500) * 0.3;
      
      ctx.beginPath();
      ctx.moveTo(centerX - size, centerY - size / 2);
      ctx.lineTo(centerX, centerY + size / 2);
      ctx.lineTo(centerX + size, centerY - size / 2);
      
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = pulse;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#00ffff';
      
      particles.forEach(p => {
        p.update(canvas);
        p.draw(ctx, accentColor);
      });
      
      drawLines(accentColor);
      drawChevron(accentColor);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener('resize', resize);
    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleMesh;
