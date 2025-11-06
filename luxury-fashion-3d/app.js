// Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1500);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Smooth Scrolling for Navigation Links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// Parallax Effect for About Section
const aboutSection = document.querySelector('.about');
const parallaxBg = document.querySelector('.parallax-bg');

if (aboutSection && parallaxBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const aboutTop = aboutSection.offsetTop;
    const aboutHeight = aboutSection.offsetHeight;
    
    if (scrolled > aboutTop - window.innerHeight && scrolled < aboutTop + aboutHeight) {
      const offset = (scrolled - aboutTop) * 0.5;
      parallaxBg.style.setProperty('--parallax-offset', `${offset}px`);
    }
  });
}

// 3D Tilt Effect for Featured Cards
const featuredCards = document.querySelectorAll('[data-tilt]');

featuredCards.forEach(card => {
  const cardInner = card.querySelector('.featured-card-inner');
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardInner.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    cardInner.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});

// Collection Cards Hover Effect
const collectionCards = document.querySelectorAll('.collection-card');

collectionCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const container = card.querySelector('.card-3d-container');
    container.style.transform = 'rotateY(10deg) translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    const container = card.querySelector('.card-3d-container');
    container.style.transform = 'rotateY(0) translateY(0) scale(1)';
  });
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      message: document.getElementById('message').value
    };
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #D4AF37, #FFD700);
      color: white;
      padding: 2rem 3rem;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      text-align: center;
      font-family: var(--font-serif);
      font-size: 1.2rem;
      animation: fadeInUp 0.5s ease;
    `;
    successMessage.innerHTML = `
      <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">Thank You!</h3>
      <p>Your message has been received. We'll contact you shortly.</p>
    `;
    
    document.body.appendChild(successMessage);
    
    // Reset form
    contactForm.reset();
    
    // Remove message after 3 seconds
    setTimeout(() => {
      successMessage.style.opacity = '0';
      successMessage.style.transform = 'translate(-50%, -50%) scale(0.9)';
      successMessage.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 300);
    }, 3000);
  });
}

// Button Click Effects
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    // Skip form submit buttons
    if (this.type === 'submit') return;
    
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Enhance scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const collectionsSection = document.getElementById('collections');
    if (collectionsSection) {
      const offsetTop = collectionsSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
  
  // Hide scroll indicator after scrolling
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.pointerEvents = 'auto';
    }
  });
}

// Add cursor following effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
      heroBackground.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    }
  });
}

console.log('%cLUXE COUTURE', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
console.log('%cTimeless Elegance Redefined', 'font-size: 14px; color: #666;');