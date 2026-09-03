/**
 * Space & Galaxy Particle Canvas Engine
 * Renders an immersive, high-performance cosmic background:
 * - 3-Layer 3D Depth Starfield with twinkling
 * - Procedural Cosmic Nebula Clouds in Blue & Cyan
 * - Interactive Mouse Constellation Particle Web
 * - Periodic Realistic Shooting Stars (Meteors)
 */

export function initSpaceEngine() {
  const canvas = document.getElementById('spaceCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Mouse state
  const mouse = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2,
    active: false,
    radius: 180
  };

  // Resize handler
  function handleResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
    initNebulae();
  }
  window.addEventListener('resize', handleResize);

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // 1. STARS
  let stars = [];
  function initStars() {
    stars = [];
    const count = Math.min(240, Math.floor((width * height) / 5500));
    for (let i = 0; i < count; i++) {
      const depth = Math.random(); // 0 (far) to 1 (near)
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseRadius: depth * 1.8 + 0.4,
        radius: depth * 1.8 + 0.4,
        depth: depth,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: depth > 0.75 ? '#00f0ff' : depth > 0.4 ? '#93c5fd' : '#ffffff',
        vx: (Math.random() - 0.5) * 0.15 * (depth + 0.5),
        vy: (Math.random() - 0.5) * 0.15 * (depth + 0.5)
      });
    }
  }

  // 2. NEBULA CLOUDS
  let nebulae = [];
  function initNebulae() {
    nebulae = [
      {
        x: width * 0.2,
        y: height * 0.25,
        radius: Math.min(width, height) * 0.5,
        color1: 'rgba(0, 102, 255, 0.16)',
        color2: 'rgba(0, 240, 255, 0.05)',
        pulse: 0,
        speed: 0.005
      },
      {
        x: width * 0.8,
        y: height * 0.65,
        radius: Math.min(width, height) * 0.6,
        color1: 'rgba(67, 56, 202, 0.14)',
        color2: 'rgba(30, 64, 175, 0.04)',
        pulse: 1.5,
        speed: 0.004
      },
      {
        x: width * 0.5,
        y: height * 0.85,
        radius: Math.min(width, height) * 0.45,
        color1: 'rgba(14, 165, 233, 0.12)',
        color2: 'rgba(3, 105, 161, 0.03)',
        pulse: 3.0,
        speed: 0.006
      }
    ];
  }

  // 3. SHOOTING STARS (METEORS)
  let meteors = [];
  function spawnMeteor() {
    const startX = Math.random() * width * 1.2;
    const startY = Math.random() * (height * 0.4);
    const length = Math.random() * 120 + 80;
    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
    const speed = Math.random() * 8 + 12;

    meteors.push({
      x: startX,
      y: startY,
      length: length,
      speed: speed,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.012,
      thickness: Math.random() * 1.5 + 1.2
    });
  }

  let lastMeteorTime = 0;
  const meteorInterval = 3200;

  initStars();
  initNebulae();

  function animate(timestamp) {
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Nebula Clouds
    nebulae.forEach((neb) => {
      neb.pulse += neb.speed;
      const currentRadius = neb.radius * (1 + Math.sin(neb.pulse) * 0.08);
      const grad = ctx.createRadialGradient(
        neb.x,
        neb.y,
        0,
        neb.x,
        neb.y,
        currentRadius
      );
      grad.addColorStop(0, neb.color1);
      grad.addColorStop(0.5, neb.color2);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(neb.x, neb.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Draw Stars & Constellations
    const starCount = stars.length;
    for (let i = 0; i < starCount; i++) {
      const s = stars[i];

      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = width;
      if (s.x > width) s.x = 0;
      if (s.y < 0) s.y = height;
      if (s.y > height) s.y = 0;

      const twinkle = Math.sin(timestamp * s.twinkleSpeed + s.twinkleOffset);
      const currentAlpha = Math.max(0.15, s.alpha + twinkle * 0.35);

      ctx.fillStyle = s.color;
      ctx.globalAlpha = currentAlpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();

      if (s.depth > 0.75) {
        ctx.globalAlpha = currentAlpha * 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouse.active) {
        const dx = mouse.x - s.x;
        const dy = mouse.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const lineAlpha = (1 - dist / mouse.radius) * 0.6;
          ctx.strokeStyle = gba(0, 240, 255, );
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (let j = i + 1; j < Math.min(i + 12, starCount); j++) {
        const s2 = stars[j];
        const dx = s.x - s2.x;
        const dy = s.y - s2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 75) {
          const linkAlpha = (1 - dist / 75) * 0.15;
          ctx.strokeStyle = gba(147, 197, 253, );
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;

    // 3. Periodic Meteors
    if (timestamp - lastMeteorTime > meteorInterval) {
      if (Math.random() > 0.2) {
        spawnMeteor();
      }
      lastMeteorTime = timestamp;
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.vx;
      m.y += m.vy;
      m.alpha -= m.decay;

      if (m.alpha <= 0 || m.x < -100 || m.y > height + 100) {
        meteors.splice(i, 1);
        continue;
      }

      const tailX = m.x - (m.vx / m.speed) * m.length;
      const tailY = m.y - (m.vy / m.speed) * m.length;

      const meteorGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
      meteorGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      meteorGrad.addColorStop(0.7, gba(56, 189, 248, ));
      meteorGrad.addColorStop(1, gba(255, 255, 255, ));

      ctx.strokeStyle = meteorGrad;
      ctx.lineWidth = m.thickness;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(m.x, m.y);
      ctx.stroke();

      ctx.fillStyle = gba(255, 255, 255, );
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.thickness * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
