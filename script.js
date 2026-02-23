// OR ELSE - Interactive Elements

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimations();
    initCounters();
    initNavbar();
    initMobileMenu();
    initParallax();
    initModal();
});

// 1. Particle System
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random positioning and animation properties
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;

    const duration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${duration}s`;

    const delay = Math.random() * 5;
    particle.style.animationDelay = `-${delay}s`;

    // Low opacity for subtle effect
    particle.style.opacity = Math.random() * 0.5 + 0.1;

    container.appendChild(particle);
}

// 2. Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to run animation only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Elements to animate
    const elementsToAnimate = [
        '.section-title',
        '.section-subtitle',
        '.service-card-flip',
        '.glass-card',
        '.cta-box'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

            // Stagger delay for grids
            if (el.classList.contains('service-card-flip')) {
                el.style.transitionDelay = `${index % 3 * 0.1}s`;
            }

            observer.observe(el);
        });
    });

    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// 3. Animated Counters
function initCounters() {
    const statsSection = document.querySelector('.showcase');
    let started = false;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            document.querySelectorAll('.stat-number').forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16);

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        }
    });

    if (statsSection) {
        observer.observe(statsSection);
    }
}

// 4. Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 5. Mobile Menu
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

// 6. 3D Parallax Effect
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const sphere = document.querySelector('.sphere');
        const heroImg = document.querySelector('.hero-img');

        if (sphere && heroImg) {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            sphere.style.transform = `translateX(${x}px) translateY(${y}px)`;
            heroImg.style.transform = `translateX(${-x}px) translateY(${-y}px)`;
        }
    });
}

// 7. Terms Modal
function initModal() {
    const modal = document.getElementById('terms-modal');
    const openBtn = document.getElementById('open-terms');
    const openDisclaimerBtn = document.getElementById('open-disclaimer');
    const openPrivacyBtn = document.getElementById('open-privacy');
    const closeBtn = document.querySelector('.close-btn');
    const acceptBtn = document.getElementById('accept-terms');

    if (!modal) return;

    const openModal = (e, scrollTargetId = null) => {
        if (e) e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        if (scrollTargetId) {
            // Wait for display block to apply before scrolling
            setTimeout(() => {
                const target = document.getElementById(scrollTargetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // Scroll to top if general terms
            const content = modal.querySelector('.modal-content');
            if (content) content.scrollTop = 0;
        }
    };

    if (openBtn) openBtn.addEventListener('click', (e) => openModal(e));

    if (openDisclaimerBtn) {
        openDisclaimerBtn.addEventListener('click', (e) => openModal(e, 'disclaimer'));
    }

    if (openPrivacyBtn) {
        openPrivacyBtn.addEventListener('click', (e) => openModal(e, 'privacy'));
    }

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (acceptBtn) acceptBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });
}
