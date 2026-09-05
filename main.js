/* ==========================================================================
   GLOBAL APPLICATION LOGIC & COSMIC INTERACTION ENGINE
   Peyyala Karthik Personal Engineering & VLSI Portfolio
   ========================================================================== */

import { initSpaceEngine } from './space-engine.js';
import { initProjectDiagrams } from './project-diagrams.js';

// Project Data Store from CV
const PROJECTS_DATA = {
  p4: {
    number: "PROJECT 01 • MAY 2026",
    title: "2D Memory Controller Using Decoder",
    technologies: ["Proteus", "74139 Decoder", "D Flip-Flops", "7447 Decoder", "7-Segment Displays"],
    overview: "Digital memory-controller circuit utilizing decoder-based address selection, D flip-flop storage arrays, Write Enable gating, and 7-segment output visualization simulated in Proteus.",
    role: "Worked on the design and implementation of the digital memory-controller circuit.",
    responsibilities: "Implemented memory selection and data-handling functions using a 74139 decoder, D flip-flops, data switches, Write Enable, 7447 decoder, and 7-segment displays in Proteus.",
    challenges: "Coordinating the decoder, storage elements, control signals, and display sections to achieve the required circuit operation.",
    outcomes: "Learned practical digital-circuit design, decoder-based memory selection, flip-flop usage, control-signal handling, and circuit simulation using Proteus."
  },
  p2: {
    number: "PROJECT 02 • APR 2026",
    title: "Water Level Indicator & Automatic Pump Control",
    technologies: ["Arduino", "Ultrasonic Sensor", "Relay", "LCD 16x2"],
    overview: "Automated water tank level management using ultrasonic distance measurement, continuous real-time LCD readout, and automated motor-pump control via relay switching.",
    role: "Contributed to building and testing the Arduino-based system.",
    responsibilities: "Used an ultrasonic sensor to measure the distance of water in the tank, displayed the measured distance on an LCD, and used a relay to control the motor pump.",
    challenges: "Integrating the ultrasonic sensor, LCD, relay, and motor pump into a robust working system.",
    outcomes: "Learned the basics of sensor interfacing, Arduino-based control, LCD interfacing, and relay-based motor-pump control."
  },
  p3: {
    number: "PROJECT 03 • JUN 2025",
    title: "Obstacle Avoiding Car",
    technologies: ["Arduino", "Ultrasonic Sensor", "L293D Motor Driver", "Robotics"],
    overview: "Autonomous mobile robotics platform featuring real-time ultrasonic proximity detection and automated directional course correction using dual DC motors.",
    role: "Contributed to assembling and implementing the obstacle-detection and movement-control system.",
    responsibilities: "Used an ultrasonic sensor for obstacle detection and an L293D motor driver for motor control. Implemented automatic direction change when an obstacle was detected.",
    challenges: "Coordinating obstacle detection with motor control so that the car could respond automatically to real-time obstacles.",
    outcomes: "Learned the basics of ultrasonic sensing, motor-driver interfacing, autonomous vehicle control, and real-time response."
  },
};

// Web Audio API Cosmic Sound Synthesizer
class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  toggle() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playChime(587.33, 0.15, 'sine'); // D5
    }
    return this.enabled;
  }

  playChime(freq = 440, duration = 0.2, type = 'sine') {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  playHover() {
    if (!this.enabled || !this.ctx) return;
    this.playChime(880, 0.08, 'sine');
  }

  playSuccess() {
    if (!this.enabled || !this.ctx) return;
    this.playChime(523.25, 0.1, 'sine'); // C5
    setTimeout(() => this.playChime(659.25, 0.1, 'sine'), 80); // E5
    setTimeout(() => this.playChime(783.99, 0.2, 'sine'), 160); // G5
  }
}

const cosmicAudio = new CosmicAudioEngine();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Page Loader
  const loader = document.getElementById('loader');
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }
  }, 800);

  // 2. Initialize Cosmic Canvas & Diagrams
  initSpaceEngine();
  initProjectDiagrams();

  // 3. Audio Toggle
  initAudioToggle();

  // 4. Navigation & Active Scroll Tracking
  initNavigation();

  // 5. Hero Focus Cycler
  initFocusCycler();

  // 6. Project Filters
  initProjectFilters();

  // 7. Project Details Modal
  initProjectModal();

  // 8. Certificate Preview Modal
  initCertificateModal();

  // 9. Resume Modal
  initResumeModal();

  // 10. Contact Handlers & Clipboard
  initContact();
});

/* --- Audio Toggle --- */
function initAudioToggle() {
  const toggleBtn = document.getElementById('audioToggle');
  const statusText = document.getElementById('audioStatusText');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isEnabled = cosmicAudio.toggle();
    if (statusText) {
      statusText.textContent = isEnabled ? 'SFX: ON' : 'SFX: OFF';
    }
    toggleBtn.style.borderColor = isEnabled ? 'var(--accent-cyan)' : 'var(--border-cosmic)';
    toggleBtn.style.color = isEnabled ? 'var(--accent-cyan)' : 'var(--text-secondary)';
    showToast(isEnabled ? 'Cosmic Audio Effects Enabled' : 'Cosmic Audio Muted');
  });

  // Attach hover sound to buttons
  document.querySelectorAll('.btn, .nav-link, .filter-btn, .project-btn, .cert-link-btn, .contact-item').forEach(el => {
    el.addEventListener('mouseenter', () => cosmicAudio.playHover());
  });
}

/* --- Navigation --- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* --- Hero Focus Area Text Cycler --- */
function initFocusCycler() {
  const statusEl = document.getElementById('statusText');
  if (!statusEl) return;

  const topics = [
    'VLSI & Digital Logic',
    'Embedded Systems & IoT',
    'Microcontroller Automation',
    'PLC Ladder Control',
    'Circuit Design & Simulation'
  ];

  let currentIdx = 0;
  setInterval(() => {
    currentIdx = (currentIdx + 1) % topics.length;
    statusEl.style.opacity = '0';
    statusEl.style.transform = 'translateY(4px)';
    setTimeout(() => {
      statusEl.textContent = topics[currentIdx];
      statusEl.style.opacity = '1';
      statusEl.style.transform = 'translateY(0)';
    }, 300);
  }, 3200);
}

/* --- Project Filters --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- Project Detail Modal --- */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = btn.getAttribute('data-project');
      const data = PROJECTS_DATA[pId];
      if (!data) return;

      document.getElementById('modalProjectNum').textContent = data.number;
      document.getElementById('modalProjectTitle').textContent = data.title;
      
      const badgeContainer = document.getElementById('modalProjectBadges');
      badgeContainer.innerHTML = '';
      data.technologies.forEach(tech => {
        const badge = document.createElement('span');
        badge.className = 'tech-badge';
        badge.textContent = tech;
        badgeContainer.appendChild(badge);
      });

      document.getElementById('modalOverview').textContent = data.overview;
      document.getElementById('modalRole').textContent = data.role;
      document.getElementById('modalResponsibilities').textContent = data.responsibilities;
      document.getElementById('modalChallenges').textContent = data.challenges;
      document.getElementById('modalOutcomes').textContent = data.outcomes;

      modal.classList.add('open');
      cosmicAudio.playChime(600, 0.15, 'triangle');
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

/* --- Certificate Preview Modal --- */
function initCertificateModal() {
  const certModal = document.getElementById('certModal');
  const closeBtn = document.getElementById('certModalCloseBtn');
  const iframe = document.getElementById('certIframe');
  const title = document.getElementById('certModalTitle');
  const driveBtn = document.getElementById('certDriveBtn');
  const previewBtns = document.querySelectorAll('.preview-cert-btn');

  if (!certModal) return;

  previewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const certTitle = btn.getAttribute('data-title');
      const previewLink = btn.getAttribute('data-link');
      const fullLink = previewLink.replace('/preview', '/view?usp=sharing');

      if (title) title.textContent = certTitle;
      if (iframe) iframe.src = previewLink;
      if (driveBtn) driveBtn.href = fullLink;

      certModal.classList.add('open');
      cosmicAudio.playChime(700, 0.15, 'sine');
    });
  });

  closeBtn?.addEventListener('click', () => {
    certModal.classList.remove('open');
    if (iframe) iframe.src = '';
  });

  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
      certModal.classList.remove('open');
      if (iframe) iframe.src = '';
    }
  });
}

/* --- Resume Modal --- */
function initResumeModal() {
  const modal = document.getElementById('resumeModal');
  const openBtn = document.getElementById('openResumeBtn');
  const closeBtn = document.getElementById('resumeModalCloseBtn');

  if (!modal) return;

  openBtn?.addEventListener('click', () => {
    modal.classList.add('open');
    cosmicAudio.playChime(650, 0.15, 'sine');
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

/* --- Contact & Clipboard --- */
function initContact() {
  const copyEmail = document.getElementById('copyEmail');
  const copyPhone = document.getElementById('copyPhone');
  const contactForm = document.getElementById('contactForm');

  copyEmail?.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('karthikpeyyala3145@gmail.com').then(() => {
      showToast('Email address copied to clipboard!');
      cosmicAudio.playSuccess();
    });
  });

  copyPhone?.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('+916304811915').then(() => {
      showToast('Phone number copied to clipboard!');
      cosmicAudio.playSuccess();
    });
  });

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value;
    cosmicAudio.playSuccess();
    showToast(`Transmission received! Thank you, ${name || 'friend'}. Karthik will connect soon.`);
    contactForm.reset();
  });
}

/* --- Toast Notification --- */
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
