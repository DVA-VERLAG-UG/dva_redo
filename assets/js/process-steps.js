// process-steps.js - Animated process timeline

export function initProcessSteps() {
  console.log('📋 Initializing process steps...');
  
  const section = document.querySelector('.process-steps-section');
  if (!section) {
    console.warn('Process steps section not found');
    return;
  }
  
  const header = section.querySelector('.process-header');
  const timeline = section.querySelector('.timeline-line');
  const bookBg = section.querySelector('.timeline-book-bg');
  const steps = section.querySelectorAll('.process-step');
  const cta = section.querySelector('.process-cta');
  
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Observe header
  if (header) {
    observer.observe(header);
  }
  
  // Observe timeline
  if (timeline) {
    observer.observe(timeline);
  }
  
  // Observe book background
  if (bookBg) {
    observer.observe(bookBg);
  }
  
  // Observe each step
  steps.forEach(step => {
    observer.observe(step);
  });
  
  // Observe CTA
  if (cta) {
    observer.observe(cta);
  }
  
  console.log('✅ Process steps initialized with', steps.length, 'steps');
}