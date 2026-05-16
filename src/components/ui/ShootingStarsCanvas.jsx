import React, { useRef, useEffect } from 'react';

// ─── Fixed parallel angle for ALL meteors (40° from horizontal) ──
var METEOR_ANGLE = 40 * (Math.PI / 180);
var COS_A = Math.cos(METEOR_ANGLE);
var SIN_A = Math.sin(METEOR_ANGLE);

// ─── A single straight-line meteor ─────────────────────────────
function Meteor(w, h, hue) {
  var spawnSide = Math.random();
  if (spawnSide < 0.7) {
    this.x = Math.random() * w * 1.3 - w * 0.15;
    this.y = -10 - Math.random() * 120;
  } else {
    this.x = -10 - Math.random() * 60;
    this.y = Math.random() * h * 0.5;
  }

  var speed = 7 + Math.random() * 11;
  this.vx = COS_A * speed;
  this.vy = SIN_A * speed;

  this.life = 1.0;
  this.decay = 0.008 + Math.random() * 0.008;
  this.length = 50 + Math.random() * 80;
  this.width = 1 + Math.random() * 1.5;
  this.hue = hue + (Math.random() - 0.5) * 30;
  this.sat = 70 + Math.random() * 30;
  this.lit = 70 + Math.random() * 25;
}

Meteor.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
  this.life -= this.decay;
};

Meteor.prototype.draw = function(ctx) {
  if (this.life <= 0) return;

  var mag = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  var nx = this.vx / mag;
  var ny = this.vy / mag;

  var tailX = this.x - nx * this.length;
  var tailY = this.y - ny * this.length;

  var grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
  grad.addColorStop(0, 'hsla(' + this.hue + ',' + this.sat + '%,' + this.lit + '%,0)');
  grad.addColorStop(0.5, 'hsla(' + this.hue + ',' + this.sat + '%,' + this.lit + '%,' + (this.life * 0.35) + ')');
  grad.addColorStop(1, 'hsla(' + this.hue + ',100%,95%,' + (this.life * 0.9) + ')');

  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(this.x, this.y);
  ctx.strokeStyle = grad;
  ctx.lineWidth = this.width;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(this.x, this.y, this.width * 1.2, 0, Math.PI * 2);
  ctx.fillStyle = 'hsla(' + this.hue + ',100%,97%,' + (this.life * 0.7) + ')';
  ctx.fill();
};

// ─── React component — fires on mount, parent uses key={n} to remount ─
var ShootingStarsCanvas = function(props) {
  var hue = props.hue || 260;

  var canvasRef = useRef(null);
  var meteorsRef = useRef([]);
  var frameRef = useRef(null);
  // Flag: true while the spawn interval is still running
  var stillSpawningRef = useRef(true);

  useEffect(function() {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var handleResize = function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Spawn all meteors immediately (first batch) then stagger the rest.
    // This ensures the loop has particles to draw on its very first tick.
    var totalMeteors = 30 + Math.floor(Math.random() * 10);
    var spawned = 0;
    stillSpawningRef.current = true;

    var spawnBatch = function() {
      var batch = Math.min(6, totalMeteors - spawned);
      for (var i = 0; i < batch; i++) {
        meteorsRef.current.push(new Meteor(canvas.width, canvas.height, hue));
      }
      spawned += batch;
    };

    // Spawn the first batch synchronously so the loop always has meteors
    spawnBatch();

    var spawnTimer = setInterval(function() {
      if (spawned >= totalMeteors) {
        clearInterval(spawnTimer);
        stillSpawningRef.current = false;
        return;
      }
      spawnBatch();
    }, 50);

    // ─── Animation loop ───────────────────────────────────────────
    // Keeps running while EITHER spawning is ongoing OR meteors are alive.
    var animate = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var alive = [];
      for (var k = 0; k < meteorsRef.current.length; k++) {
        var m = meteorsRef.current[k];
        m.update();
        if (m.life > 0) {
          m.draw(ctx);
          alive.push(m);
        }
      }
      meteorsRef.current = alive;

      // Continue if still spawning OR there are live meteors
      if (stillSpawningRef.current || alive.length > 0) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return function() {
      window.removeEventListener('resize', handleResize);
      clearInterval(spawnTimer);
      stillSpawningRef.current = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      meteorsRef.current = [];
    };
  }, []); // empty deps — runs exactly once on mount, cleaned up on unmount

  return React.createElement('canvas', {
    ref: canvasRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 3,
      pointerEvents: 'none',
    }
  });
};

export default ShootingStarsCanvas;
