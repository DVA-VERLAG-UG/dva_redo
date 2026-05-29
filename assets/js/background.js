// background.js - Falling book pages for publishing house - Royal Bronze Theme

let particleCanvas = null;
let ctx = null;
let pages = [];
let animationId = null;

// Page configuration - 🎯 STELLSCHRAUBEN
const PAGE_COUNT = 12; // Anzahl der fallenden Seiten (8-15)
const PAGE_SIZE_MIN = 80; // Min Größe (60-100)
const PAGE_SIZE_MAX = 140; // Max Größe (100-180)
const FALL_SPEED_MIN = 0.3; // Min Fall-Geschwindigkeit (0.2-0.5)
const FALL_SPEED_MAX = 0.8; // Max Fall-Geschwindigkeit (0.5-1.2)

class FallingPage {
  constructor(canvas) {
    this.reset(canvas, true); // true = start from random position
  }
  
  reset(canvas, randomStart = false) {
    this.x = Math.random() * canvas.width;
    
    // Start position
    if (randomStart) {
      this.y = Math.random() * canvas.height; // Random für initialen Start
    } else {
      this.y = -200; // Oben außerhalb des Bildschirms
    }
    
    this.width = Math.random() * (PAGE_SIZE_MAX - PAGE_SIZE_MIN) + PAGE_SIZE_MIN;
    this.height = this.width * 1.3; // Buch-Proportionen
    this.rotation = (Math.random() - 0.5) * 0.3; // Leichte Rotation
    this.rotationSpeed = (Math.random() - 0.5) * 0.005; // Langsame Rotation beim Fallen
    
    // Hauptbewegung: NACH UNTEN!
    this.speedY = Math.random() * (FALL_SPEED_MAX - FALL_SPEED_MIN) + FALL_SPEED_MIN; // 🎯 Fallgeschwindigkeit
    
    // Minimale horizontale Drift (leichte Seitwärtsbewegung)
    this.speedX = (Math.random() - 0.5) * 0.2; // Sehr wenig horizontal
    
    this.opacity = Math.random() * 0.35 + 0.25; // 0.25-0.6
    this.type = Math.random() > 0.5 ? 'page' : 'folded';
    
    // Für sanfte Seitwärtsbewegung (Pendel-Effekt)
    this.swayOffset = Math.random() * Math.PI * 2;
    this.swaySpeed = 0.002 + Math.random() * 0.002; // Wie schnell sie pendelt
    this.swayAmount = 0.5 + Math.random() * 1; // Wie weit sie pendelt
  }

  update(canvas) {
    // Hauptbewegung: FALLEN (nach unten)
    this.y += this.speedY; // 🔥 Nach unten bewegen!
    
    // Minimale horizontale Bewegung
    this.x += this.speedX;
    
    // Sanftes Pendeln beim Fallen (wie echtes Papier)
    this.x += Math.sin(this.y * this.swaySpeed + this.swayOffset) * this.swayAmount;
    
    // Rotation beim Fallen
    this.rotation += this.rotationSpeed;
    
    // Wenn Seite unten raus ist → Oben neu spawnen
    if (this.y > canvas.height + 200) {
      this.reset(canvas, false); // false = start from top
    }
    
    // Wenn Seite seitlich raus ist → korrigieren
    if (this.x < -100) this.x = canvas.width + 100;
    if (this.x > canvas.width + 100) this.x = -100;
  }

  draw(ctx, isDarkMode) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;

    // 🎨 ROYAL BRONZE THEME COLORS
    const pageColor = isDarkMode 
      ? `rgba(176, 141, 87, 0.25)` // Bronze im Dark Mode
      : `rgba(176, 141, 87, 0.18)`; // Helleres Bronze im Light Mode
    
    const lineColor = isDarkMode
      ? `rgba(176, 141, 87, 0.2)` // Bronze Lines Dark
      : `rgba(176, 141, 87, 0.15)`; // Bronze Lines Light
    
    const shadowColor = isDarkMode
      ? `rgba(176, 141, 87, 0.15)` // Bronze Shadow Dark
      : `rgba(138, 109, 63, 0.12)`; // Dunkleres Bronze Shadow Light

    if (this.type === 'page') {
      // Rechteckige Seite
      ctx.fillStyle = pageColor;
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      
      // Textlinien
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      const lineSpacing = 12;
      const lineCount = Math.floor(this.height / lineSpacing);
      for (let i = 0; i < lineCount; i++) {
        const lineY = -this.height / 2 + 15 + i * lineSpacing;
        ctx.beginPath();
        ctx.moveTo(-this.width / 2 + 8, lineY);
        ctx.lineTo(this.width / 2 - 8, lineY);
        ctx.stroke();
      }
      
      // Schatten (stärker nach unten für Fall-Effekt)
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 3; // Mehr Schatten nach unten!
      
      // Border - Bronze
      ctx.strokeStyle = isDarkMode 
        ? `rgba(176, 141, 87, 0.35)` // Bronze Border Dark
        : `rgba(176, 141, 87, 0.25)`; // Bronze Border Light
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
      
    } else {
      // Gefaltete Seite
      const foldSize = 20;
      
      ctx.fillStyle = pageColor;
      ctx.beginPath();
      ctx.moveTo(-this.width / 2, -this.height / 2);
      ctx.lineTo(this.width / 2, -this.height / 2);
      ctx.lineTo(this.width / 2, this.height / 2);
      ctx.lineTo(-this.width / 2 + foldSize, this.height / 2);
      ctx.lineTo(-this.width / 2, this.height / 2 - foldSize);
      ctx.closePath();
      ctx.fill();
      
      // Gefaltete Ecke - Dunkleres Bronze
      ctx.fillStyle = isDarkMode
        ? `rgba(138, 109, 63, ${this.opacity * 0.7})` // Dunkleres Bronze Dark
        : `rgba(138, 109, 63, ${this.opacity * 0.5})`; // Dunkleres Bronze Light
      ctx.beginPath();
      ctx.moveTo(-this.width / 2, this.height / 2 - foldSize);
      ctx.lineTo(-this.width / 2 + foldSize, this.height / 2);
      ctx.lineTo(-this.width / 2, this.height / 2);
      ctx.closePath();
      ctx.fill();
      
      // Textlinien
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      const lineSpacing = 12;
      const lineCount = Math.floor(this.height / lineSpacing);
      for (let i = 0; i < lineCount - 2; i++) {
        const lineY = -this.height / 2 + 15 + i * lineSpacing;
        ctx.beginPath();
        ctx.moveTo(-this.width / 2 + 8, lineY);
        ctx.lineTo(this.width / 2 - 8, lineY);
        ctx.stroke();
      }
      
      // Schatten
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 3;
    }

    ctx.restore();
  }
}

function createCanvas() {
  if (document.getElementById('particle-canvas')) {
    particleCanvas = document.getElementById('particle-canvas');
    ctx = particleCanvas.getContext('2d');
    resizeCanvas();
    return;
  }

  particleCanvas = document.createElement('canvas');
  particleCanvas.id = 'particle-canvas';
  document.body.prepend(particleCanvas);

  ctx = particleCanvas.getContext('2d');
  resizeCanvas();

  for (let i = 0; i < PAGE_COUNT; i++) {
    pages.push(new FallingPage(particleCanvas));
  }
}

function resizeCanvas() {
  if (!particleCanvas) return;
  
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}

function animate() {
  if (!ctx || !particleCanvas) return;

  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dim';

  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  pages.forEach(page => {
    page.update(particleCanvas);
    page.draw(ctx, isDarkMode);
  });

  animationId = requestAnimationFrame(animate);
}

export function initBackground() {
  
  pages = [];
  createCanvas();
  
  if (pages.length === 0) {
    for (let i = 0; i < PAGE_COUNT; i++) {
      pages.push(new FallingPage(particleCanvas));
    }
  }
  
  animate();
  window.addEventListener('resize', resizeCanvas);

}

export function stopBackground() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'data-theme') {
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
});

/* ==========================================
   STELLSCHRAUBEN - ROYAL BRONZE THEME
   ========================================== 
   
   🎨 FARBEN (Bronze Theme):
   
   Light Mode:
   - Page Color:     rgba(176, 141, 87, 0.18)
   - Line Color:     rgba(176, 141, 87, 0.15)
   - Shadow:         rgba(138, 109, 63, 0.12)
   - Border:         rgba(176, 141, 87, 0.25)
   
   Dark Mode:
   - Page Color:     rgba(176, 141, 87, 0.25)
   - Line Color:     rgba(176, 141, 87, 0.2)
   - Shadow:         rgba(176, 141, 87, 0.15)
   - Border:         rgba(176, 141, 87, 0.35)
   - Fold:           rgba(138, 109, 63, ...)
   
   🎯 ANZAHL:
   PAGE_COUNT: 12            → Anzahl Seiten (8-20)
   
   📏 GRÖßE:
   PAGE_SIZE_MIN: 80         → Min (60-100)
   PAGE_SIZE_MAX: 140        → Max (100-180)
   
   ⬇️ FALL-GESCHWINDIGKEIT:
   FALL_SPEED_MIN: 0.3       → Min Speed (0.2-0.5)
   FALL_SPEED_MAX: 0.8       → Max Speed (0.5-1.5)
   
   🌊 PENDEL-BEWEGUNG:
   swaySpeed: 0.002-0.004    → Wie schnell sie pendelt
   swayAmount: 0.5-1.5       → Wie weit sie pendelt
   speedX: 0.2               → Horizontale Drift (0.1-0.3)
   
   💡 TIPPS:
   
   Mehr Bronze Sichtbarkeit:
   Light Mode opacity: 0.25
   Dark Mode opacity: 0.35
   
   Schneller fallen:
   FALL_SPEED_MIN: 0.5
   FALL_SPEED_MAX: 1.2
   
   Mehr Seiten (dichter Regen):
   PAGE_COUNT: 20
   
   Weniger Pendeln:
   swayAmount: 0.3
   
   Mehr Pendeln (dramatischer):
   swayAmount: 2.0
   
   ========================================== */