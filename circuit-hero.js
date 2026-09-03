/* ==========================================================================
   HERO CIRCUIT VISUALIZER
   Interactive 2D Canvas VLSI & Digital Circuit Visual System
   ========================================================================== */

export function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;

  let mouseX = -1000;
  let mouseY = -1000;
  let targetMouseX = -1000;
  let targetMouseY = -1000;

  // Nodes & Gates Definition
  const nodes = [];
  const connections = [];
  const pulses = [];

  function resizeCanvas() {
    const parent = canvas.parentElement;
    width = parent.clientWidth;
    height = parent.clientHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    initCircuit();
  }

  function initCircuit() {
    nodes.length = 0;
    connections.length = 0;
    pulses.length = 0;

    // Define Grid Layout of Digital Nodes & Logic Blocks
    const cols = 5;
    const rows = 4;
    const paddingX = width * 0.15;
    const paddingY = height * 0.18;
    const stepX = (width - paddingX * 2) / (cols - 1);
    const stepY = (height - paddingY * 2) / (rows - 1);

    const gateTypes = ['AND', 'OR', 'D-FF', 'DEC 2:4', 'MUX', 'BUF', 'CLK'];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = paddingX + c * stepX + (Math.sin(r + c) * 15);
        const y = paddingY + r * stepY + (Math.cos(r * c) * 10);
        
        nodes.push({
          id: r * cols + c,
          x,
          y,
          baseX: x,
          baseY: y,
          type: gateTypes[(r * cols + c) % gateTypes.length],
          isActive: false,
          glow: 0
        });
      }
    }

    // Connect nodes into schematic paths
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140 && Math.random() > 0.3) {
          connections.push({
            from: nodes[i],
            to: nodes[j],
            active: false
          });
        }
      }
    }

    // Spawn Data Pulses
    for (let i = 0; i < 8; i++) {
      spawnPulse();
    }
  }

  function spawnPulse() {
    if (connections.length === 0) return;
    const conn = connections[Math.floor(Math.random() * connections.length)];
    pulses.push({
      conn,
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.008,
      size: 2.5 + Math.random() * 2
    });
  }

  // Mouse Interactivity
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    targetMouseX = e.clientX - rect.left;
    targetMouseY = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    targetMouseX = -1000;
    targetMouseY = -1000;
  });

  function drawCircuit() {
    ctx.clearRect(0, 0, width, height);

    // Smooth Mouse Interpolation
    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;

    // Draw Subtle Background Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    const gridSize = 24;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Update & Draw Connections (Traces)
    connections.forEach((conn) => {
      const distFromMouse = distToSegment({ x: mouseX, y: mouseY }, conn.from, conn.to);
      const isNearMouse = distFromMouse < 60;

      ctx.beginPath();
      ctx.moveTo(conn.from.x, conn.from.y);
      ctx.lineTo(conn.to.x, conn.to.y);

      if (isNearMouse) {
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 10;
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
      }

      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    // Update & Draw Pulses
    pulses.forEach((p, idx) => {
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
        p.conn = connections[Math.floor(Math.random() * connections.length)];
      }

      const px = p.conn.from.x + (p.conn.to.x - p.conn.from.x) * p.progress;
      const py = p.conn.from.y + (p.conn.to.y - p.conn.from.y) * p.progress;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw Nodes (Logic Gates & Pins)
    nodes.forEach((node) => {
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isHovered = dist < 70;

      if (isHovered) {
        node.glow = Math.min(node.glow + 0.08, 1);
      } else {
        node.glow = Math.max(node.glow - 0.04, 0);
      }

      // Gate Box
      const boxW = 56;
      const boxH = 32;

      ctx.save();
      ctx.translate(node.x, node.y);

      ctx.fillStyle = isHovered ? 'rgba(0, 240, 255, 0.15)' : 'rgba(15, 21, 33, 0.9)';
      ctx.strokeStyle = isHovered ? '#00f0ff' : 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = isHovered ? 1.5 : 1;

      if (isHovered) {
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 15;
      }

      // Draw Gate Box Shape
      ctx.beginPath();
      ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, 6);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Gate Label Text
      ctx.fillStyle = isHovered ? '#00f0ff' : 'rgba(248, 250, 252, 0.8)';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.type, 0, 0);

      // Pins on side
      ctx.fillStyle = isHovered ? '#00f0ff' : 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(-boxW / 2 - 3, -4, 3, 2);
      ctx.fillRect(-boxW / 2 - 3, 2, 3, 2);
      ctx.fillRect(boxW / 2, 0, 3, 2);

      ctx.restore();
    });

    animationFrameId = requestAnimationFrame(drawCircuit);
  }

  function distToSegment(p, v, w) {
    const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
    if (l2 === 0) return Math.sqrt((p.x - v.x) ** 2 + (p.y - v.y) ** 2);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    const projX = v.x + t * (w.x - v.x);
    const projY = v.y + t * (w.y - v.y);
    return Math.sqrt((p.x - projX) ** 2 + (p.y - projY) ** 2);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  drawCircuit();
}
