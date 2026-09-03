/* ==========================================================================
   PROJECT DIAGRAMS & TECHNICAL VISUAL ILLUSTRATIONS
   Animated SVG/Canvas technical graphics for project cards
   ========================================================================== */

export function initProjectDiagrams() {
  initP1Diagram();
  initP2Diagram();
  initP3Diagram();
  initP4Diagram();
  initP5Diagram();
}

// Project 01: Word Scramble Puzzle Game (Python CLI matrix visual)
function initP1Diagram() {
  const container = document.getElementById('p1-visual');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 300 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="160" fill="#07090e" rx="8"/>
      <rect x="20" y="20" width="260" height="120" rx="6" fill="#0d111a" stroke="rgba(0, 240, 255, 0.2)" stroke-width="1"/>
      <circle cx="35" cy="35" r="4" fill="#ef4444"/>
      <circle cx="48" cy="35" r="4" fill="#eab308"/>
      <circle cx="61" cy="35" r="4" fill="#22c55e"/>
      
      <text x="30" y="65" font-family="JetBrains Mono" font-size="12" fill="#00f0ff">&gt; import random</text>
      <text x="30" y="85" font-family="JetBrains Mono" font-size="12" fill="#94a3b8">&gt; word = "VLSI_EMBEDDED"</text>
      <text x="30" y="105" font-family="JetBrains Mono" font-size="12" fill="#3b82f6">&gt; scrambled = "S_VLI_BEDDEEM"</text>
      
      <text x="30" y="125" font-family="JetBrains Mono" font-size="11" fill="#10b981">
        [MATCH CORRECT!] <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
      </text>
    </svg>
  `;
}

// Project 02: Water Level Indicator & Automatic Pump Control (Tank + Ultrasonic + Relay + LCD)
function initP2Diagram() {
  const container = document.getElementById('p2-visual');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 300 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="160" fill="#07090e" rx="8"/>
      
      <!-- Water Tank -->
      <rect x="40" y="40" width="80" height="100" rx="4" fill="none" stroke="#64748b" stroke-width="2"/>
      
      <!-- Animated Water Level -->
      <rect x="42" y="70" width="76" height="68" fill="rgba(0, 240, 255, 0.25)" rx="2">
        <animate attributeName="height" values="40;80;40" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="y" values="98;58;98" dur="4s" repeatCount="indefinite"/>
      </rect>

      <!-- Ultrasonic Sensor Top -->
      <rect x="55" y="22" width="50" height="15" rx="3" fill="#1e293b" stroke="#00f0ff" stroke-width="1.5"/>
      <circle cx="68" cy="29.5" r="4" fill="#00f0ff"/>
      <circle cx="92" cy="29.5" r="4" fill="#00f0ff"/>

      <!-- Waves -->
      <path d="M 65 42 Q 80 48 95 42" stroke="#00f0ff" stroke-width="1.5" fill="none" opacity="0.8">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/>
      </path>

      <!-- LCD Display -->
      <rect x="150" y="30" width="110" height="45" rx="4" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
      <text x="160" y="52" font-family="JetBrains Mono" font-size="10" fill="#34d399">WATER: 78%</text>
      <text x="160" y="66" font-family="JetBrains Mono" font-size="9" fill="#a7f3d0">PUMP: AUTO-OFF</text>

      <!-- Relay & Pump -->
      <rect x="160" y="95" width="90" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="172" y="118" font-family="JetBrains Mono" font-size="10" fill="#60a5fa">RELAY MODULE</text>
      <circle cx="235" cy="115" r="4" fill="#10b981">
        <animate attributeName="fill" values="#10b981;#ef4444;#10b981" dur="4s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `;
}

// Project 03: Obstacle Avoiding Car (Ultrasonic + L293D + Vehicle)
function initP3Diagram() {
  const container = document.getElementById('p3-visual');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 300 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="160" fill="#07090e" rx="8"/>
      
      <!-- Mini Vehicle Chassis -->
      <rect x="80" y="55" width="120" height="65" rx="8" fill="#1e293b" stroke="#00f0ff" stroke-width="1.5"/>
      
      <!-- Wheels -->
      <rect x="65" y="45" width="15" height="30" rx="3" fill="#475569"/>
      <rect x="65" y="100" width="15" height="30" rx="3" fill="#475569"/>
      <rect x="200" y="45" width="15" height="30" rx="3" fill="#475569"/>
      <rect x="200" y="100" width="15" height="30" rx="3" fill="#475569"/>

      <!-- L293D Chip -->
      <rect x="125" y="70" width="30" height="35" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="1"/>
      <text x="130" y="90" font-family="JetBrains Mono" font-size="7" fill="#94a3b8">L293D</text>

      <!-- Ultrasonic Eyes on Front -->
      <circle cx="200" cy="75" r="5" fill="#00f0ff"/>
      <circle cx="200" cy="100" r="5" fill="#00f0ff"/>

      <!-- Sensor Radar Waves -->
      <path d="M 215 65 A 30 30 0 0 1 215 110" fill="none" stroke="#00f0ff" stroke-width="1.5">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite"/>
      </path>
      <path d="M 230 55 A 50 50 0 0 1 230 120" fill="none" stroke="#3b82f6" stroke-width="1.5">
        <animate attributeName="opacity" values="0.1;0.8;0.1" dur="1s" begin="0.3s" repeatCount="indefinite"/>
      </path>

      <!-- Obstacle Box -->
      <rect x="260" y="50" width="20" height="75" rx="3" fill="#ef4444" opacity="0.8"/>
    </svg>
  `;
}

// Project 04: 2D Memory Controller Using Decoder (74139 Decoder, D Flip-Flops, 7-Segment Display)
function initP4Diagram() {
  const container = document.getElementById('p4-visual');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 300 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="160" fill="#07090e" rx="8"/>

      <!-- 74139 Decoder Block -->
      <rect x="30" y="40" width="65" height="80" rx="4" fill="#0f172a" stroke="#00f0ff" stroke-width="1.5"/>
      <text x="42" y="85" font-family="JetBrains Mono" font-size="10" fill="#00f0ff">74139</text>
      <text x="38" y="98" font-family="JetBrains Mono" font-size="8" fill="#94a3b8">DECODER</text>

      <!-- Address Bus Lines -->
      <line x1="95" y1="55" x2="140" y2="55" stroke="#00f0ff" stroke-width="1.5">
        <animate attributeName="stroke-dasharray" values="0,10;10,0" dur="1s" repeatCount="indefinite"/>
      </line>
      <line x1="95" y1="80" x2="140" y2="80" stroke="#3b82f6" stroke-width="1.5"/>
      <line x1="95" y1="105" x2="140" y2="105" stroke="#64748b" stroke-width="1.5"/>

      <!-- D Flip-Flop Array Matrix (2D Memory Cells) -->
      <g transform="translate(140, 35)">
        <rect x="0" y="0" width="22" height="22" rx="3" fill="#1e293b" stroke="#00f0ff" stroke-width="1"/>
        <text x="6" y="15" font-family="JetBrains Mono" font-size="9" fill="#00f0ff">FF0</text>

        <rect x="28" y="0" width="22" height="22" rx="3" fill="#1e293b" stroke="#64748b" stroke-width="1"/>
        <text x="34" y="15" font-family="JetBrains Mono" font-size="9" fill="#94a3b8">FF1</text>

        <rect x="0" y="28" width="22" height="22" rx="3" fill="#1e293b" stroke="#64748b" stroke-width="1"/>
        <text x="6" y="43" font-family="JetBrains Mono" font-size="9" fill="#94a3b8">FF2</text>

        <rect x="28" y="28" width="22" height="22" rx="3" fill="#1e293b" stroke="#00f0ff" stroke-width="1"/>
        <text x="34" y="43" font-family="JetBrains Mono" font-size="9" fill="#00f0ff">FF3</text>
      </g>

      <!-- 7447 Decoder & 7-Segment Display -->
      <rect x="215" y="45" width="55" height="70" rx="4" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
      <text x="223" y="70" font-family="JetBrains Mono" font-size="10" fill="#34d399">7447</text>
      <!-- 7 segment numeric 'A' / '8' readout -->
      <rect x="238" y="80" width="10" height="25" fill="#10b981"/>
    </svg>
  `;
}

// Project 05: Automatic Garage Gate Control System (PLC + Vehicle Sensor + Timed Gate)
function initP5Diagram() {
  const container = document.getElementById('p5-visual');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 300 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="160" fill="#07090e" rx="8"/>

      <!-- PLC Controller Module -->
      <rect x="30" y="30" width="80" height="100" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="50" y="55" font-family="JetBrains Mono" font-size="11" fill="#60a5fa">PLC</text>
      <text x="42" y="70" font-family="JetBrains Mono" font-size="8" fill="#94a3b8">AUTOMATION</text>
      
      <circle cx="45" cy="95" r="4" fill="#10b981"/>
      <circle cx="60" cy="95" r="4" fill="#00f0ff">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="75" cy="95" r="4" fill="#ef4444"/>

      <!-- Vehicle Infrared Sensor Ray -->
      <line x1="110" y1="65" x2="175" y2="65" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4"/>
      <rect x="175" y="55" width="20" height="20" rx="3" fill="#ef4444" opacity="0.8"/>
      <text x="178" y="69" font-family="JetBrains Mono" font-size="8" fill="#ffffff">IR</text>

      <!-- Automated Gate Barrier -->
      <rect x="230" y="35" width="12" height="90" rx="2" fill="#475569"/>
      
      <!-- Gate Arm Swinging -->
      <rect x="236" y="45" width="50" height="8" rx="2" fill="#00f0ff">
        <animateTransform attributeName="transform" type="rotate" values="0 236 49;-75 236 49;0 236 49" dur="4s" repeatCount="indefinite"/>
      </rect>
    </svg>
  `;
}
