// ===== MOBILE NAVIGATION =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    // Animate hamburger icon
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('shadow-lg');
        navbar.classList.remove('shadow-sm');
    } else {
        navbar.classList.add('shadow-sm');
        navbar.classList.remove('shadow-lg');
    }

    lastScroll = currentScroll;
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

// Observe feature cards with stagger effect
const featureCards = document.querySelectorAll('.group');
featureCards.forEach((card, index) => {
    card.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
    card.style.transitionDelay = `${index * 100}ms`;
    observer.observe(card);
});

// ===== COUNTER ANIMATION FOR HERO STATS =====
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        const value = Math.floor(progress * (end - start) + start);

        // Handle different formats
        if (element.textContent.includes('K')) {
            element.textContent = Math.floor(value / 1000) + 'K+';
        } else if (element.textContent.includes('%')) {
            element.textContent = value.toFixed(1) + '%';
        } else {
            element.textContent = value + '+';
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Trigger counter animation when hero stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';

            const stats = entry.target.querySelectorAll('h3');
            stats.forEach(stat => {
                const text = stat.textContent;
                let targetValue = 0;

                if (text.includes('500')) {
                    targetValue = 500;
                    stat.textContent = '0+';
                    animateValue(stat, 0, targetValue, 2000);
                } else if (text.includes('50K')) {
                    targetValue = 50000;
                    stat.textContent = '0K+';
                    animateValue(stat, 0, targetValue, 2000);
                } else if (text.includes('99.9')) {
                    targetValue = 99.9;
                    stat.textContent = '0%';
                    animateValue(stat, 0, targetValue, 2000);
                }
            });
        }
    });
}, { threshold: 0.5 });

// Observe hero stats section
const heroStatsSection = document.querySelector('.grid.grid-cols-3');
if (heroStatsSection) {
    statsObserver.observe(heroStatsSection);
}

// ===== FORM HANDLING =====
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show success message (in production, you would send this to a server)
        alert('Thank you for your message! We will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// ===== PARALLAX EFFECT FOR HERO IMAGE =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.animate-float');

    if (heroImage && scrolled < 1000) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ===== ADD HOVER EFFECT TO PRICING CARDS =====
const pricingCards = document.querySelectorAll('#pricing > div > div > div');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('md:scale-105')) {
            this.classList.add('transform', 'scale-105');
        }
    });

    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('md:scale-105')) {
            this.classList.remove('scale-105');
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    const navbarHeight = navbar.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary-500', 'font-bold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-primary-500', 'font-bold');
        }
    });
});

// ===== CONSOLE BRANDING =====
console.log('%c TableNow ', 'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; font-size: 24px; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
console.log('%c Restaurant Management Made Simple 🍽️ ', 'color: #6366f1; font-size: 16px; font-weight: 600;');
console.log('%c Visit us at tablenow.com ', 'color: #64748b; font-size: 12px;');
