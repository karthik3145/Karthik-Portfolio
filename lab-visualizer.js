/* ==========================================================================
   TECHNICAL INTEREST LAB VISUALIZER - HIGH VISIBILITY EDITION
   Interactive 2D Canvas simulator for VLSI, Digital Logic, Ultrasonic & PLC
   ========================================================================== */

export function initLabVisualizer() {
  const canvas = document.getElementById('labCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let currentMode = 'vlsi';
  let animId;
  let time = 0;
  let pulseTriggered = 0;

  function resizeCanvas() {
    const parent = canvas.parentElement;
    if (!parent) return;
    width = parent.clientWidth;
    height = parent.clientHeight || 420;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  // Handle Tab Switching
  const tabs = document.querySelectorAll('.lab-tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.getAttribute('data-tab');
      pulseTriggered = 1.0;
    });
  });

  // Handle Action Trigger Button
  const actionBtn = document.getElementById('labActionBtn');
  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      pulseTriggered = 1.0;
    });
  }

  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 100);

  function render() {
    ctx.clearRect(0, 0, width, height);
    time += 0.04;
    if (pulseTriggered > 0) pulseTriggered -= 0.015;

    // Draw Dark Cybernetic Background Grid
    drawCyberGrid();

    if (currentMode === 'vlsi') {
      renderVLSIMode();
    } else if (currentMode === 'digital') {
      renderDigitalMode();
    } else if (currentMode === 'embedded') {
      renderUltrasonicMode();
    } else if (currentMode === 'iot') {
      renderPLCMode();
    }

    animId = requestAnimationFrame(render);
  }

  function drawCyberGrid() {
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  // ==========================================
  // 1. VLSI Architecture Mode (High Visibility)
  // ==========================================
  function renderVLSIMode() {
    // Mode Title Banner
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 13px "Space Grotesk", "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('⚡ VLSI 2D MEMORY CONTROLLER & DECODER ARCHITECTURE', 24, 28);

    const centerX = width / 2;
    const centerY = height / 2 + 10;

    // Silicon Die Frame (Glow & High Contrast)
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(centerX - 160, centerY - 120, 320, 240);

    ctx.fillStyle = 'rgba(8, 20, 52, 0.85)';
    ctx.fillRect(centerX - 160, centerY - 120, 320, 240);

    // Silicon Pin Pads
    for (let i = -140; i <= 140; i += 35) {
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(centerX + i - 6, centerY - 126, 12, 6);
      ctx.fillRect(centerX + i - 6, centerY + 120, 12, 6);
    }

    // Decoder Module (74139)
    const activeRow = Math.floor((time * 0.8) % 4);
    ctx.fillStyle = '#0a1936';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.fillRect(centerX - 130, centerY - 80, 80, 160);
    ctx.strokeRect(centerX - 130, centerY - 80, 80, 160);

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 12px "Space Grotesk", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('74139', centerX - 90, centerY - 30);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('DECODER', centerX - 90, centerY - 10);
    ctx.fillStyle = '#34d399';
    ctx.fillText(`SEL: Y${activeRow}`, centerX - 90, centerY + 20);

    // D Flip-Flop Memory Cells Array (2x2 Matrix)
    const cells = [
      { id: 'FF0 (00)', x: centerX + 10, y: centerY - 65, active: activeRow === 0 },
      { id: 'FF1 (01)', x: centerX + 85, y: centerY - 65, active: activeRow === 1 },
      { id: 'FF2 (10)', x: centerX + 10, y: centerY + 15, active: activeRow === 2 },
      { id: 'FF3 (11)', x: centerX + 85, y: centerY + 15, active: activeRow === 3 }
    ];

    cells.forEach(cell => {
      ctx.fillStyle = cell.active ? 'rgba(0, 240, 255, 0.25)' : 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = cell.active ? '#00f0ff' : 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = cell.active ? 2.5 : 1.5;
      ctx.fillRect(cell.x, cell.y, 65, 50);
      ctx.strokeRect(cell.x, cell.y, 65, 50);

      ctx.fillStyle = cell.active ? '#ffffff' : '#94a3b8';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(cell.id, cell.x + 32, cell.y + 24);

      // Value state
      ctx.fillStyle = cell.active ? '#34d399' : '#64748b';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(cell.active ? 'DATA: 1' : 'DATA: 0', cell.x + 32, cell.y + 40);
    });

    // Glowing Bus Lines
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 50, centerY - 40);
    ctx.lineTo(centerX + 10, centerY - 40);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - 50, centerY + 40);
    ctx.lineTo(centerX + 10, centerY + 40);
    ctx.stroke();

    // Telemetry Box at Bottom
    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.fillRect(20, height - 42, width - 40, 32);
    ctx.strokeRect(20, height - 42, width - 40, 32);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`[STATUS: CLOCK 20MHz] • [ADDRESS: A1=1, A0=${activeRow % 2}] • [ACTIVE LINE: Y${activeRow}] • [PROTEUS VERIFIED]`, 34, height - 22);
  }

  // ==========================================
  // 2. Digital Logic Mode (High Visibility)
  // ==========================================
  function renderDigitalMode() {
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 13px "Space Grotesk", "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('⚡ DIGITAL LOGIC GATES & D-LATCH OSCILLATOR', 24, 28);

    const centerX = width / 2;
    const centerY = height / 2;

    const inA = Math.floor(time) % 2;
    const inB = Math.floor(time * 0.5) % 2;
    const nandOut = !(inA && inB) ? 1 : 0;
    const norOut = !(inA || inB) ? 1 : 0;

    // Gate 1: NAND Gate
    drawLogicGate(centerX - 130, centerY - 40, 'NAND-2', inA, inB, nandOut);

    // Gate 2: NOR Gate
    drawLogicGate(centerX + 60, centerY - 40, 'NOR-2', inA, inB, norOut);

    // Telemetry Box
    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.fillRect(20, height - 42, width - 40, 32);
    ctx.strokeRect(20, height - 42, width - 40, 32);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`INPUT A: [${inA}] • INPUT B: [${inB}] ➔ NAND OUT: [${nandOut}] | NOR OUT: [${norOut}]`, 34, height - 22);
  }

  function drawLogicGate(x, y, name, in1, in2, out) {
    ctx.fillStyle = 'rgba(8, 20, 52, 0.9)';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, 100, 70);
    ctx.strokeRect(x, y, 100, 70);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Space Grotesk", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(name, x + 50, y + 30);

    ctx.fillStyle = out ? '#34d399' : '#ef4444';
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillText(`OUT: ${out}`, x + 50, y + 52);

    // Input lines
    ctx.strokeStyle = in1 ? '#34d399' : '#64748b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x - 30, y + 22);
    ctx.lineTo(x, y + 22);
    ctx.stroke();

    ctx.strokeStyle = in2 ? '#34d399' : '#64748b';
    ctx.beginPath();
    ctx.moveTo(x - 30, y + 48);
    ctx.lineTo(x, y + 48);
    ctx.stroke();

    // Output Line
    ctx.strokeStyle = out ? '#34d399' : '#ef4444';
    ctx.beginPath();
    ctx.moveTo(x + 100, y + 35);
    ctx.lineTo(x + 130, y + 35);
    ctx.stroke();
  }

  // ==========================================
  // 3. Ultrasonic Echo Mode (High Visibility)
  // ==========================================
  function renderUltrasonicMode() {
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 13px "Space Grotesk", "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('⚡ ULTRASONIC SENSOR ECHO & RANGE DETECTION (HC-SR04)', 24, 28);

    const centerY = height / 2;
    const sensorX = 70;
    const distance = 140 + Math.sin(time * 1.5) * 70;
    const obstacleX = sensorX + distance + 50;

    // Sensor Body
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.fillRect(sensorX, centerY - 45, 45, 90);
    ctx.strokeRect(sensorX, centerY - 45, 45, 90);

    // Transducer Eyes
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(sensorX + 22, centerY - 22, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(sensorX + 22, centerY + 22, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Animated Echo Waves
    const waveRadius = ((time * 70) % (distance + 40));
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(sensorX + 22, centerY, waveRadius, -Math.PI / 4, Math.PI / 4);
    ctx.stroke();

    // Obstacle Block
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.fillRect(obstacleX, centerY - 60, 28, 120);
    ctx.strokeRect(obstacleX, centerY - 60, 28, 120);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('OBJECT', obstacleX + 14, centerY + 4);

    // Telemetry Box
    const distCm = (distance / 5.2).toFixed(1);
    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.fillRect(20, height - 42, width - 40, 32);
    ctx.strokeRect(20, height - 42, width - 40, 32);

    ctx.fillStyle = distCm < 25 ? '#ef4444' : '#34d399';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`PING FREQ: 40kHz • DISTANCE: ${distCm} cm • STATUS: ${distCm < 25 ? 'OBSTACLE DETECTED [AVOID]' : 'PATH CLEAR [PROCEED]'}`, 34, height - 22);
  }

  // ==========================================
  // 4. PLC Automation Mode (High Visibility)
  // ==========================================
  function renderPLCMode() {
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 13px "Space Grotesk", "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('⚡ PLC AUTOMATED GARAGE GATE SEQUENCE CONTROLLER', 24, 28);

    const centerY = height / 2;
    const centerX = width / 2;

    const cycle = (time * 0.4) % 4;
    const gateOpen = cycle > 1.5 && cycle < 3.5;

    // PLC Controller Panel
    ctx.fillStyle = '#0b1329';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.fillRect(centerX - 180, centerY - 70, 110, 140);
    ctx.strokeRect(centerX - 180, centerY - 70, 110, 140);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px "Space Grotesk", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PLC UNIT', centerX - 125, centerY - 45);

    // Indicator LEDs
    ctx.fillStyle = gateOpen ? '#34d399' : '#64748b';
    ctx.beginPath();
    ctx.arc(centerX - 150, centerY - 15, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillText('OPEN', centerX - 125, centerY - 12);

    ctx.fillStyle = !gateOpen ? '#ef4444' : '#64748b';
    ctx.beginPath();
    ctx.arc(centerX - 150, centerY + 15, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillText('CLOSED', centerX - 120, centerY + 18);

    // Gate Post & Arm
    ctx.fillStyle = '#475569';
    ctx.fillRect(centerX + 60, centerY - 60, 18, 120);

    // Rotating Gate Arm
    ctx.save();
    ctx.translate(centerX + 69, centerY - 45);
    ctx.rotate(gateOpen ? -Math.PI / 2.5 : 0);
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(0, -6, 90, 12);
    ctx.restore();

    // Telemetry Box
    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.fillRect(20, height - 42, width - 40, 32);
    ctx.strokeRect(20, height - 42, width - 40, 32);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`IR SENSOR: [${gateOpen ? 'BEAM INTERRUPTED' : 'CLEAR'}] • GATE MOTOR: [${gateOpen ? 'MOTOR ENGAGED (OPEN)' : 'LOCKED (DOWN)'}] • LADDER LOGIC ACTIVE`, 34, height - 22);
  }

  animId = requestAnimationFrame(render);
}
