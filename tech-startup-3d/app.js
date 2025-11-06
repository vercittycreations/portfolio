// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Globe mouse interaction
const globe = document.querySelector('.globe');
const globeContainer = document.querySelector('.globe-container');
let isGlobeHovered = false;
let mouseX = 0;
let mouseY = 0;

if (globeContainer && globe) {
  globeContainer.addEventListener('mouseenter', () => {
    isGlobeHovered = true;
  });

  globeContainer.addEventListener('mouseleave', () => {
    isGlobeHovered = false;
    globe.style.transform = '';
  });

  globeContainer.addEventListener('mousemove', (e) => {
    if (isGlobeHovered) {
      const rect = globeContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX = (e.clientX - centerX) / (rect.width / 2);
      mouseY = (e.clientY - centerY) / (rect.height / 2);
      
      const rotateY = mouseX * 15;
      const rotateX = -mouseY * 15;
      
      globe.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });
}

// Glass card tilt effect
const glassCards = document.querySelectorAll('.glass-card');

glassCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Statistics counter animation
const statValues = document.querySelectorAll('.stat-value');
let hasAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasAnimated) {
      hasAnimated = true;
      animateStats();
    }
  });
}, { threshold: 0.5 });

if (statValues.length > 0) {
  statsObserver.observe(document.querySelector('.stats-section'));
}

function animateStats() {
  statValues.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const isDecimal = target < 100 && target % 1 !== 0;
    const isLarge = target > 1000;
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (isLarge) {
        stat.textContent = formatNumber(Math.floor(current)) + '+';
      } else if (isDecimal) {
        stat.textContent = current.toFixed(1) + '%';
      } else {
        stat.textContent = Math.floor(current) + '+';
      }
    }, 16);
  });
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num;
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = contactForm.querySelector('.glass-cta');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.disabled = true;
    
    setTimeout(() => {
      button.textContent = 'Message Sent!';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-section');
  
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / 700);
  }
});

// Add glow effect on CTA buttons
const ctaButtons = document.querySelectorAll('.glass-cta');
ctaButtons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.boxShadow = '0 0 40px rgba(0, 217, 255, 0.6)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = '';
  });
});

// Typewriter effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  
  setTimeout(typeWriter, 500);
}

// Smooth page load animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// Add scan line effect to tech stack items
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
});

// Connection lines animation (visual enhancement)
function createConnectionLines() {
  const points = document.querySelectorAll('.connection-point');
  const sphere = document.querySelector('.globe-sphere');
  
  if (points.length < 2 || !sphere) return;
  
  points.forEach((point, index) => {
    if (index < points.length - 1) {
      const line = document.createElement('div');
      line.className = 'connection-line';
      line.style.cssText = `
        position: absolute;
        height: 2px;
        background: linear-gradient(90deg, transparent, var(--cyan-accent), transparent);
        transform-origin: left center;
        animation: linePulse 3s ease-in-out infinite;
        animation-delay: ${index * 0.5}s;
        opacity: 0.6;
      `;
      sphere.appendChild(line);
    }
  });
}

createConnectionLines();

// Add dynamic gradient background animation
const body = document.body;
let hue = 220;

setInterval(() => {
  hue = (hue + 1) % 360;
  body.style.background = `linear-gradient(135deg, 
    hsl(${hue}, 60%, 5%) 0%, 
    hsl(${(hue + 20) % 360}, 50%, 8%) 100%)`;
}, 100);

console.log('🚀 NEXIS TECH - Website Loaded Successfully');