window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            initAnimations();
        }, 300);
    }, 100);
});

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function initAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.6
    })
    .from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, '-=0.3')
    .from('.typed-container', {
        opacity: 0,
        duration: 0.4
    }, '-=0.2')
    .from('.hero-subtitle', {
        y: 15,
        opacity: 0,
        duration: 0.6
    }, '-=0.1')
    .from('.hero-buttons .btn', {
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08
    }, '-=0.3')
    .from('.social-link', {
        x: -15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08
    }, '-=0.5')
    .from('.hero-visual', {
        x: 30,
        opacity: 0,
        duration: 1
    }, '-=0.8');

    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                once: true
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 80%',
            once: true
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.education-card', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 80%',
            once: true
        },
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.15
    });
}

if (typeof Typed !== 'undefined') {
    new Typed('#typed', {
        strings: [
            'Software Engineering Intern',
            'Web Developer',
            'Mobile Developer',
            'UI/UX Enthusiast'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
}

if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 30, density: { enable: true, value_area: 1000 } },
            color: { value: '#6c5ce7' },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 120, color: '#6c5ce7', opacity: 0.15, width: 1 },
            move: { enable: true, speed: 1.5, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: false },
                onclick: { enable: false },
                resize: true
            }
        },
        retina_detect: true
    });
}

const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;
let isMoving = false;
let rafId = null;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX - 6;
    cursorY = e.clientY - 6;
    
    if (!isMoving) {
        isMoving = true;
        rafId = requestAnimationFrame(updateCursor);
    }
}, { passive: true });

function updateCursor() {
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    
    const dx = cursorX + 6 - 20 - followerX;
    const dy = cursorY + 6 - 20 - followerY;
    
    followerX += dx * 0.15;
    followerY += dy * 0.15;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        rafId = requestAnimationFrame(updateCursor);
    } else {
        isMoving = false;
        rafId = null;
    }
}

document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(0)';
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(1.5)`;
        follower.style.backgroundColor = 'rgba(255,255,255,0.1)';
        follower.style.borderColor = 'transparent';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(1)`;
        follower.style.backgroundColor = 'transparent';
        follower.style.borderColor = 'var(--text-light)';
    });
});

document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        const btnText = btn.querySelector('.btn-text') || btn.querySelector('i');
        if(btnText) {
            gsap.to(btnText, {
                x: x * 0.15,
                y: y * 0.15,
                duration: 0.3
            });
        }
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        const btnText = btn.querySelector('.btn-text') || btn.querySelector('i');
        if(btnText) {
            gsap.to(btnText, { x: 0, y: 0, duration: 0.5 });
        }
    });
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
        
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

let ticking = false;

function updateOnScroll() {
    const scrollY = window.scrollY;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
    
    if (scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const counters = document.querySelectorAll('.stat-number[data-count]');

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-count');
    const duration = 2000;
    const start = performance.now();
    
    const update = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        counter.innerText = current + '+';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counter.innerText = target + '+';
        }
    };
    
    requestAnimationFrame(update);
};

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));

if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.project-card, .skill-card'), {
        max: 5,
        speed: 300,
        glare: false,
        scale: 1.02
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, { passive: false });
});

document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
});

if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('site-theme');

if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
} else if (savedTheme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
}

function refreshThemeIcon() {
    if (document.documentElement.getAttribute('data-theme') === 'light') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

refreshThemeIcon();

themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('site-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('site-theme', 'light');
    }
    refreshThemeIcon();
});

// ===== COSMIC MOUSE FOLLOW EFFECT =====
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');
const orb3 = document.querySelector('.orb-3');
const cosmicTrail = document.querySelector('.cosmic-trail');
const mouseFollowContainer = document.querySelector('.mouse-follow-container');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let orb1X = mouseX, orb1Y = mouseY;
let orb2X = mouseX, orb2Y = mouseY;
let orb3X = mouseX, orb3Y = mouseY;
let trailX = mouseX, trailY = mouseY;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create floating particles occasionally
    if (Math.random() < 0.1) {
        createCosmicParticle(mouseX, mouseY);
    }
}, { passive: true });

// Smooth follow animation
function animateCosmicOrbs() {
    // Different follow speeds for parallax effect
    const speed1 = 0.02; // Slowest - largest orb
    const speed2 = 0.04; // Medium
    const speed3 = 0.06; // Faster
    const speedTrail = 0.15; // Fastest - small trail
    
    // Lerp (linear interpolation) for smooth movement
    orb1X += (mouseX - orb1X) * speed1;
    orb1Y += (mouseY - orb1Y) * speed1;
    
    orb2X += (mouseX - orb2X) * speed2;
    orb2Y += (mouseY - orb2Y) * speed2;
    
    orb3X += (mouseX - orb3X) * speed3;
    orb3Y += (mouseY - orb3Y) * speed3;
    
    trailX += (mouseX - trailX) * speedTrail;
    trailY += (mouseY - trailY) * speedTrail;
    
    // Apply positions
    if (orb1) orb1.style.transform = `translate(${orb1X - 150}px, ${orb1Y - 150}px)`;
    if (orb2) orb2.style.transform = `translate(${orb2X - 100}px, ${orb2Y - 100}px)`;
    if (orb3) orb3.style.transform = `translate(${orb3X - 75}px, ${orb3Y - 75}px)`;
    if (cosmicTrail) cosmicTrail.style.transform = `translate(${trailX - 4}px, ${trailY - 4}px)`;
    
    requestAnimationFrame(animateCosmicOrbs);
}

// Create floating particle
function createCosmicParticle(x, y) {
    if (!mouseFollowContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'cosmic-particle';
    
    // Random offset
    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;
    
    particle.style.left = (x + offsetX) + 'px';
    particle.style.top = (y + offsetY) + 'px';
    
    // Random color
    const colors = [
        'rgba(99, 102, 241, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(6, 182, 212, 0.8)',
        'rgba(244, 114, 182, 0.8)',
        'rgba(255, 255, 255, 0.9)'
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = `0 0 6px ${particle.style.background}`;
    
    mouseFollowContainer.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Start animation
if (orb1 && orb2 && orb3) {
    animateCosmicOrbs();
}

// Hide cosmic mouse effects on touch devices
if ('ontouchstart' in window && mouseFollowContainer) {
    mouseFollowContainer.style.display = 'none';
}