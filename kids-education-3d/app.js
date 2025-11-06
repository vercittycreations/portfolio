// Learning Adventure Land - Interactive JavaScript

// State management (using in-memory variables)
let achievementProgress = {
  superStar: 7,
  quickLearner: 2,
  creativeKid: 1
};

let isAnimating = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeAnimations();
  setupEventListeners();
  animateProgressBars();
  setupIntersectionObserver();
});

// Initialize animations
function initializeAnimations() {
  // Animate cards on page load
  const cards = document.querySelectorAll('.subject-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
    }, index * 100);
  });
}

// Setup all event listeners
function setupEventListeners() {
  // Start Adventure Button
  const startBtn = document.getElementById('startAdventure');
  if (startBtn) {
    startBtn.addEventListener('click', handleStartAdventure);
  }

  // Subject Cards - Flip on click
  const subjectCards = document.querySelectorAll('.subject-card');
  subjectCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't flip if clicking the button inside
      if (!e.target.classList.contains('btn-start-learning')) {
        this.classList.toggle('flipped');
      }
    });

    // Add hover sound effect visual
    card.addEventListener('mouseenter', function() {
      const mascot = this.querySelector('.mascot-icon');
      if (mascot) {
        mascot.style.transform = 'scale(1.2) rotate(10deg)';
        setTimeout(() => {
          mascot.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
      }
    });
  });

  // Start Learning Buttons
  const learningButtons = document.querySelectorAll('.btn-start-learning');
  learningButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      handleStartLearning(this);
    });
  });

  // Game Play Buttons
  const playButtons = document.querySelectorAll('.btn-play');
  playButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      handlePlayGame(this);
    });
  });

  // Achievement Cards
  const achievementCards = document.querySelectorAll('.achievement-card');
  achievementCards.forEach(card => {
    card.addEventListener('click', function() {
      celebrateAchievement(this);
    });
  });
}

// Handle Start Adventure button click
function handleStartAdventure() {
  if (isAnimating) return;
  isAnimating = true;

  // Create confetti explosion
  createConfetti(50);

  // Scroll to learning areas
  const learningSection = document.getElementById('learningAreas');
  if (learningSection) {
    setTimeout(() => {
      learningSection.scrollIntoView({ behavior: 'smooth' });
      isAnimating = false;
    }, 500);
  }

  // Animate button
  const btn = document.getElementById('startAdventure');
  btn.style.transform = 'scale(0.9)';
  setTimeout(() => {
    btn.style.transform = 'scale(1)';
  }, 200);
}

// Handle Start Learning button click
function handleStartLearning(button) {
  const card = button.closest('.subject-card');
  const subject = card.dataset.subject;
  
  // Create success animation
  createConfetti(30);
  
  // Show celebration message
  showMessage(`Great choice! Let's explore ${subject}! 🎉`);
  
  // Flip card back after delay
  setTimeout(() => {
    card.classList.remove('flipped');
  }, 2000);

  // Update progress
  updateProgress('superStar', 1);
}

// Handle Play Game button click
function handlePlayGame(button) {
  const gameCard = button.closest('.game-card');
  const gameName = gameCard.querySelector('h3').textContent;
  
  // Create star burst effect
  createStarBurst(gameCard);
  
  // Show game starting message
  showMessage(`Starting ${gameName}! Get ready! 🎮`);
  
  // Update progress
  updateProgress('quickLearner', 1);
}

// Celebrate achievement
function celebrateAchievement(card) {
  // Create massive confetti explosion
  createConfetti(100);
  
  // Pulse animation
  card.style.transform = 'scale(1.1)';
  setTimeout(() => {
    card.style.transform = 'scale(1)';
  }, 300);
  
  const achievementName = card.querySelector('h3').textContent;
  showMessage(`Amazing work on ${achievementName}! 🌟`);
}

// Create confetti effect
function createConfetti(count) {
  const container = document.getElementById('confettiContainer');
  const colors = ['#FFD93D', '#FF6B9D', '#95E1D3', '#A78BFA', '#6BCB77'];
  
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    container.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

// Create star burst effect
function createStarBurst(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 8; i++) {
    const star = document.createElement('div');
    star.textContent = '⭐';
    star.style.position = 'fixed';
    star.style.left = centerX + 'px';
    star.style.top = centerY + 'px';
    star.style.fontSize = '2rem';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '10000';
    star.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(star);
    
    // Animate star outward
    setTimeout(() => {
      const angle = (i * 45) * Math.PI / 180;
      const distance = 100;
      star.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
      star.style.opacity = '0';
    }, 10);
    
    // Remove star after animation
    setTimeout(() => {
      star.remove();
    }, 1100);
  }
}

// Show message
function showMessage(text) {
  // Remove existing message if any
  const existing = document.querySelector('.floating-message');
  if (existing) {
    existing.remove();
  }
  
  const message = document.createElement('div');
  message.className = 'floating-message';
  message.textContent = text;
  message.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: linear-gradient(135deg, #FFD93D, #FF6B9D);
    color: white;
    padding: 1.5rem 3rem;
    border-radius: 50px;
    font-size: 1.5rem;
    font-weight: bold;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    border: 4px solid white;
    font-family: 'Comic Sans MS', sans-serif;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  `;
  
  document.body.appendChild(message);
  
  // Animate in
  setTimeout(() => {
    message.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);
  
  // Animate out
  setTimeout(() => {
    message.style.transform = 'translateX(-50%) translateY(-100px)';
    message.style.opacity = '0';
  }, 3000);
  
  // Remove
  setTimeout(() => {
    message.remove();
  }, 3500);
}

// Update progress
function updateProgress(achievement, increment) {
  const maxValues = {
    superStar: 10,
    quickLearner: 5,
    creativeKid: 3
  };
  
  achievementProgress[achievement] = Math.min(
    achievementProgress[achievement] + increment,
    maxValues[achievement]
  );
  
  // Visual update would go here in a real implementation
  // For now, we'll just log it
  console.log(`Progress updated: ${achievement} = ${achievementProgress[achievement]}`);
}

// Animate progress bars
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-fill');
  
  progressBars.forEach(bar => {
    const progress = bar.dataset.progress;
    // Start from 0 and animate to target
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = progress + '%';
    }, 500);
  });
}

// Intersection Observer for scroll animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        entry.target.style.opacity = '1';
      }
    });
  }, observerOptions);
  
  // Observe sections
  const sections = document.querySelectorAll('.games-zone, .progress-dashboard, .parent-zone');
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Character interaction animations
function animateCharacter(character, animationType) {
  switch(animationType) {
    case 'bounce':
      character.style.animation = 'bounce 0.5s ease';
      break;
    case 'wave':
      character.style.animation = 'wave 1s ease';
      break;
    case 'wiggle':
      character.style.animation = 'wiggle 0.5s ease';
      break;
  }
  
  setTimeout(() => {
    character.style.animation = '';
  }, 1000);
}

// Random element movements for playful feel
function addRandomMovements() {
  const mascots = document.querySelectorAll('.mascot-icon');
  
  setInterval(() => {
    mascots.forEach(mascot => {
      if (Math.random() > 0.95) {
        mascot.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
          mascot.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
      }
    });
  }, 2000);
}

// Start random movements
addRandomMovements();

// Console welcome message
console.log('%c🌟 Welcome to Learning Adventure Land! 🌟', 'color: #FFD93D; font-size: 20px; font-weight: bold;');
console.log('%cWhere learning is fun!', 'color: #FF6B9D; font-size: 16px;');