// Vercitty Creation - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
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

    // CTA button scroll to projects
    const ctaBtn = document.querySelector('.cta-btn');
    ctaBtn.addEventListener('click', function() {
        const projectsSection = document.querySelector('#projects');
        const offsetTop = projectsSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });

    // Parallax scrolling effects
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes, .particles');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Update navigation active state
        updateActiveNavigation();
        
        // Trigger animations on scroll
        animateOnScroll();
    });

    // Update active navigation based on scroll position
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Animate elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .project-card, .value-item, .info-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize elements for scroll animation
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.service-card, .project-card, .value-item, .info-item');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        });
    }

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            const color = this.dataset.color;
            this.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.3), 0 0 40px ${color}`;
            
            // Slight rotation effect
            this.style.transform = 'translateY(-15px) rotateX(10deg) rotateY(5deg) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Service card enhanced interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Create ripple effect
            createRipple(this);
        });
    });

    function createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Launching...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! We\'ll be in touch soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '0.9rem',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
        });
        
        // Set background based on type
        const colors = {
            success: 'linear-gradient(135deg, #00ff80, #00ffff)',
            error: 'linear-gradient(135deg, #ff0080, #ff8000)',
            info: 'linear-gradient(135deg, #007fff, #8b5cf6)'
        };
        
        notification.style.background = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Dynamic particle generation
    function generateParticles() {
        const particleContainer = document.querySelector('.particles');
        
        setInterval(() => {
            if (particleContainer.children.length < 12) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random properties
                const colors = ['#00ffff', '#8b5cf6', '#007fff', '#ff0080', '#00ff80', '#ff8000'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 4 + 2;
                const left = Math.random() * 100;
                const duration = Math.random() * 6 + 4;
                
                Object.assign(particle.style, {
                    background: color,
                    boxShadow: `0 0 6px ${color}`,
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    animationDuration: `${duration}s`
                });
                
                particleContainer.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    particle.remove();
                }, duration * 1000);
            }
        }, 1000);
    }

    // Enhanced floating shapes animation
    function enhanceFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            // Add mouse interaction
            shape.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
                this.style.transform += ' scale(1.2)';
                this.style.filter = 'brightness(1.5)';
            });
            
            shape.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
                this.style.transform = this.style.transform.replace(' scale(1.2)', '');
                this.style.filter = 'brightness(1)';
            });
        });
    }

    // Typing effect for hero title
    function typeWriter() {
        const titleLines = document.querySelectorAll('.title-line');
        
        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';
            
            setTimeout(() => {
                let i = 0;
                const timer = setInterval(() => {
                    line.textContent += text.charAt(i);
                    i++;
                    if (i >= text.length) {
                        clearInterval(timer);
                    }
                }, 50);
            }, index * 800 + 1000);
        });
    }

    // Mouse cursor effect
    function createCursorEffect() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        
        Object.assign(cursor.style, {
            position: 'fixed',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #00ffff, transparent)',
            pointerEvents: 'none',
            zIndex: '9999',
            transition: 'transform 0.1s ease',
            mixBlendMode: 'screen'
        });
        
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = (e.clientX - 10) + 'px';
            cursor.style.top = (e.clientY - 10) + 'px';
        });
        
        // Scale cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    // Matrix rain effect for background
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ffff';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 35);
    }

    // Initialize all features
    initScrollAnimations();
    generateParticles();
    enhanceFloatingShapes();
    createCursorEffect();
    createMatrixEffect();
    
    // Optional: Enable typing effect for hero (commented out for better UX)
    // typeWriter();

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .custom-cursor {
            pointer-events: none !important;
        }
        
        .nav-link.active {
            color: #00ffff !important;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.8) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function() {
    const shapes = document.querySelectorAll('.shape');
    const cube = document.querySelector('.rotating-cube');
    
    if (document.hidden) {
        // Pause animations when page is hidden
        shapes.forEach(shape => {
            shape.style.animationPlayState = 'paused';
        });
        if (cube) cube.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        shapes.forEach(shape => {
            shape.style.animationPlayState = 'running';
        });
        if (cube) cube.style.animationPlayState = 'running';
    }
});
