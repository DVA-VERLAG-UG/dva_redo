// background.js - Animated particle system

let particleCanvas = null;
let ctx = null;
let particles = [];
let animationId = null;

// Particle configuration
const PARTICLE_COUNT = 50; // Adjust for performance
const PARTICLE_SIZE_MIN = 1;
const PARTICLE_SIZE_MAX = 3;
const PARTICLE_SPEED_MIN = 0.1;
const PARTICLE_SPEED_MAX = 0.5;

class Particle {
  constructor(canvas) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN;
    this.speedX = (Math.random() - 0.5) * (PARTICLE_SPEED_MAX - PARTICLE_SPEED_MIN) + PARTICLE_SPEED_MIN;
    this.speedY = (Math.random() - 0.5) * (PARTICLE_SPEED_MAX - PARTICLE_SPEED_MIN) + PARTICLE_SPEED_MIN;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update(canvas) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw(ctx, isDarkMode) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    
    // Different colors for light/dark mode
    if (isDarkMode) {
      ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`; // Purple in dark mode
    } else {
      ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity * 0.6})`; // Lighter purple in light mode
    }
    
    ctx.fill();
  }
}

function createCanvas() {
  // Check if canvas already exists
  if (document.getElementById('particle-canvas')) return;

  particleCanvas = document.createElement('canvas');
  particleCanvas.id = 'particle-canvas';
  document.body.prepend(particleCanvas);

  ctx = particleCanvas.getContext('2d');
  resizeCanvas();

  // Create particles
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(particleCanvas));
  }
}

function resizeCanvas() {
  if (!particleCanvas) return;
  
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}

function animate() {
  if (!ctx || !particleCanvas) return;

  // Check if dark mode is active
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dim';

  // Clear canvas
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  // Update and draw particles
  particles.forEach(particle => {
    particle.update(particleCanvas);
    particle.draw(ctx, isDarkMode);
  });

  // Draw connecting lines between nearby particles (optional)
  drawConnections(isDarkMode);

  animationId = requestAnimationFrame(animate);
}

function drawConnections(isDarkMode) {
  const maxDistance = 150;
  
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.15;
        ctx.beginPath();
        ctx.strokeStyle = isDarkMode 
          ? `rgba(167, 139, 250, ${opacity})`
          : `rgba(139, 92, 246, ${opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

export function initBackground() {
  console.log('🌌 Initializing background particles...');
  
  createCanvas();
  animate();

  // Handle window resize
  window.addEventListener('resize', resizeCanvas);

  console.log('✅ Background particles initialized');
}

export function stopBackground() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}