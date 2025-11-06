// Camera state
let cameraState = {
  rotationY: 25,
  rotationX: -15,
  zoom: 1,
  currentRoom: 'exterior'
};

// Room camera positions
const roomPositions = {
  exterior: {
    rotationX: -15,
    rotationY: 25,
    zoom: 1
  },
  living: {
    rotationX: 0,
    rotationY: 0,
    zoom: 1.3
  },
  kitchen: {
    rotationX: -5,
    rotationY: -15,
    zoom: 1.3
  },
  bedroom: {
    rotationX: -10,
    rotationY: 20,
    zoom: 1.3
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initRoomControls();
  initCameraControls();
  initKeyboardControls();
  initStatsAnimation();
  initContactForm();
  initAutoRotation();
  initHotspots();
});

// Room Navigation
function initRoomControls() {
  const roomButtons = document.querySelectorAll('.room-btn');
  
  roomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const room = btn.dataset.room;
      switchRoom(room);
      
      // Update active button
      roomButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function switchRoom(roomId) {
  const houseModel = document.getElementById('houseModel');
  const houseSections = document.querySelectorAll('.house-section');
  const position = roomPositions[roomId];
  
  if (!position) return;
  
  // Update camera state
  cameraState.currentRoom = roomId;
  cameraState.rotationX = position.rotationX;
  cameraState.rotationY = position.rotationY;
  cameraState.zoom = position.zoom;
  
  // Apply camera transformation
  updateCamera();
  
  // Update minimap
  updateMinimap(roomId);
  
  // Show/hide sections based on room
  houseSections.forEach(section => {
    if (section.id === roomId) {
      section.classList.remove('hidden');
    } else if (roomId === 'exterior') {
      section.classList.remove('hidden');
    } else if (section.id !== 'exterior') {
      section.classList.add('hidden');
    }
  });
}

function updateCamera() {
  const houseModel = document.getElementById('houseModel');
  const transform = `
    rotateX(${cameraState.rotationX}deg)
    rotateY(${cameraState.rotationY}deg)
    scale(${cameraState.zoom})
  `;
  
  houseModel.style.transform = transform;
}

// Camera Manual Controls
function initCameraControls() {
  const rotateLeftBtn = document.getElementById('rotateLeft');
  const rotateRightBtn = document.getElementById('rotateRight');
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');
  
  rotateLeftBtn.addEventListener('click', () => {
    cameraState.rotationY -= 15;
    updateCamera();
  });
  
  rotateRightBtn.addEventListener('click', () => {
    cameraState.rotationY += 15;
    updateCamera();
  });
  
  zoomInBtn.addEventListener('click', () => {
    cameraState.zoom = Math.min(cameraState.zoom + 0.1, 2);
    updateCamera();
  });
  
  zoomOutBtn.addEventListener('click', () => {
    cameraState.zoom = Math.max(cameraState.zoom - 0.1, 0.5);
    updateCamera();
  });
}

// Keyboard Controls
function initKeyboardControls() {
  document.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'ArrowLeft':
        cameraState.rotationY -= 10;
        updateCamera();
        break;
      case 'ArrowRight':
        cameraState.rotationY += 10;
        updateCamera();
        break;
      case 'ArrowUp':
        cameraState.rotationX -= 5;
        updateCamera();
        break;
      case 'ArrowDown':
        cameraState.rotationX += 5;
        updateCamera();
        break;
      case '+':
      case '=':
        cameraState.zoom = Math.min(cameraState.zoom + 0.1, 2);
        updateCamera();
        break;
      case '-':
      case '_':
        cameraState.zoom = Math.max(cameraState.zoom - 0.1, 0.5);
        updateCamera();
        break;
    }
  });
}

// Auto-rotation for exterior view
let autoRotationInterval;
function initAutoRotation() {
  startAutoRotation();
  
  // Stop auto-rotation when user interacts
  const interactiveElements = document.querySelectorAll('.room-btn, .control-btn');
  interactiveElements.forEach(el => {
    el.addEventListener('click', () => {
      stopAutoRotation();
      // Restart after 10 seconds of inactivity
      setTimeout(() => {
        if (cameraState.currentRoom === 'exterior') {
          startAutoRotation();
        }
      }, 10000);
    });
  });
}

function startAutoRotation() {
  stopAutoRotation();
  
  if (cameraState.currentRoom === 'exterior') {
    autoRotationInterval = setInterval(() => {
      if (cameraState.currentRoom === 'exterior') {
        cameraState.rotationY += 0.3;
        updateCamera();
      }
    }, 50);
  }
}

function stopAutoRotation() {
  if (autoRotationInterval) {
    clearInterval(autoRotationInterval);
    autoRotationInterval = null;
  }
}

// Minimap update
function updateMinimap(roomId) {
  const minimapCamera = document.getElementById('minimapCamera');
  const positions = {
    exterior: { x: -50, y: -50 },
    living: { x: -50, y: -20 },
    kitchen: { x: -20, y: -50 },
    bedroom: { x: -80, y: -50 }
  };
  
  const pos = positions[roomId] || positions.exterior;
  minimapCamera.style.transform = `translate(calc(-50% + ${pos.x}%), calc(-50% + ${pos.y}%))`;
}

// Stats Counter Animation
function initStatsAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

// Hotspots
function initHotspots() {
  const hotspots = document.querySelectorAll('.hotspot');
  
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      const room = hotspot.dataset.room;
      if (room) {
        switchRoom(room);
        // Update active button
        const roomBtn = document.querySelector(`.room-btn[data-room="${room}"]`);
        if (roomBtn) {
          document.querySelectorAll('.room-btn').forEach(b => b.classList.remove('active'));
          roomBtn.classList.add('active');
        }
      }
    });
  });
}

// Contact Form
function initContactForm() {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    // Simulate form submission
    formMessage.className = 'form-message';
    formMessage.textContent = 'Submitting...';
    formMessage.style.display = 'block';
    
    setTimeout(() => {
      // Success
      formMessage.className = 'form-message success';
      formMessage.textContent = 'Thank you! We will contact you soon to schedule your viewing.';
      form.reset();
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }, 1500);
  });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});