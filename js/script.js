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

// ===== FORM HANDLING (moved to bottom with validation) =====

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

// ===== PAGE LOADER =====
window.addEventListener('load', () => {
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
        }, 500);
    }
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== COOKIE CONSENT =====
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookiesBtn = document.getElementById('acceptCookies');
const declineCookiesBtn = document.getElementById('declineCookies');

// Check if user already made a choice
const cookieConsent = localStorage.getItem('cookieConsent');

if (!cookieConsent) {
    // Show banner after a short delay
    setTimeout(() => {
        cookieBanner.classList.add('visible');
    }, 1500);
}

acceptCookiesBtn?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.classList.remove('visible');
});

declineCookiesBtn?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    cookieBanner.classList.remove('visible');
});

// ===== FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
const formFields = {
    name: document.getElementById('contactName'),
    email: document.getElementById('contactEmail'),
    subject: document.getElementById('contactSubject'),
    message: document.getElementById('contactMessage')
};
const submitBtn = document.getElementById('submitBtn');
const formSuccessMessage = document.getElementById('formSuccessMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field, validationFn) {
    const formGroup = field.parentElement;
    const errorSpan = formGroup.querySelector('.form-error');
    const isValid = validationFn(field.value);

    field.classList.remove('error', 'success');
    formGroup.classList.remove('valid');
    errorSpan?.classList.remove('visible');

    if (field.value.trim() !== '') {
        if (isValid) {
            field.classList.add('success');
            formGroup.classList.add('valid');
        } else {
            field.classList.add('error');
            errorSpan?.classList.add('visible');
        }
    }

    return isValid;
}

// Real-time validation
formFields.name?.addEventListener('blur', () => {
    validateField(formFields.name, value => value.trim().length >= 2);
});

formFields.email?.addEventListener('blur', () => {
    validateField(formFields.email, value => emailRegex.test(value));
});

formFields.subject?.addEventListener('blur', () => {
    validateField(formFields.subject, value => value.trim().length >= 3);
});

formFields.message?.addEventListener('blur', () => {
    validateField(formFields.message, value => value.trim().length >= 10);
});

// Form submission
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField(formFields.name, value => value.trim().length >= 2);
    const isEmailValid = validateField(formFields.email, value => emailRegex.test(value));
    const isSubjectValid = validateField(formFields.subject, value => value.trim().length >= 3);
    const isMessageValid = validateField(formFields.message, value => value.trim().length >= 10);

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            formSuccessMessage.classList.remove('hidden');

            // Reset form
            contactForm.reset();

            // Remove validation states
            Object.values(formFields).forEach(field => {
                field?.classList.remove('success', 'error');
                field?.parentElement.classList.remove('valid');
            });

            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtn.getAttribute('data-i18n') === 'contact.form.button'
                ? (translations[currentLang]?.contact?.form?.button || 'Send Message')
                : 'Send Message';

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccessMessage.classList.add('hidden');
            }, 5000);
        }, 1500);
    }
});

// ===== COMING SOON MODAL =====
const comingSoonModal = document.getElementById('comingSoonModal');

function showComingSoon() {
    comingSoonModal.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function hideComingSoon(event) {
    if (event && event.target !== comingSoonModal) return;
    comingSoonModal.classList.remove('visible');
    document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && comingSoonModal.classList.contains('visible')) {
        hideComingSoon();
    }
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer')?.classList.add('hidden');
            }
        });

        // Toggle current item
        if (isActive) {
            item.classList.remove('active');
            answer?.classList.add('hidden');
        } else {
            item.classList.add('active');
            answer?.classList.remove('hidden');
        }
    });
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = newsletterEmail.value;
    if (emailRegex.test(email)) {
        // Simulate subscription (replace with actual API call)
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            newsletterEmail.value = '';

            setTimeout(() => {
                button.disabled = false;
                button.textContent = originalText;
            }, 3000);
        }, 1500);
    }
});

// ===== EXIT INTENT POPUP =====
const exitIntentPopup = document.getElementById('exitIntentPopup');
const exitIntentForm = document.getElementById('exitIntentForm');
let exitIntentShown = false;

function showExitIntent() {
    if (!exitIntentShown && !localStorage.getItem('exitIntentDismissed')) {
        exitIntentPopup.classList.add('visible');
        document.body.style.overflow = 'hidden';
        exitIntentShown = true;
    }
}

function hideExitIntent(event) {
    if (event && event.target !== exitIntentPopup) return;
    exitIntentPopup.classList.remove('visible');
    document.body.style.overflow = '';
    localStorage.setItem('exitIntentDismissed', 'true');
}

// Detect exit intent (mouse leaving viewport at top)
document.addEventListener('mouseout', (e) => {
    if (e.clientY <= 0 && !exitIntentShown) {
        // Small delay to avoid triggering on quick movements
        setTimeout(() => {
            showExitIntent();
        }, 100);
    }
});

// Also show after 30 seconds if user hasn't interacted much
let scrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollDepth = Math.max(scrollDepth, scrollPercent);
});

setTimeout(() => {
    if (scrollDepth < 50 && !exitIntentShown) {
        showExitIntent();
    }
}, 30000);

// Exit intent form submission
exitIntentForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('exitIntentEmail').value;
    if (emailRegex.test(email)) {
        const button = exitIntentForm.querySelector('button');
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check mr-2"></i> Discount Claimed!';
            document.getElementById('exitIntentEmail').value = '';

            setTimeout(() => {
                hideExitIntent();
            }, 2000);
        }, 1500);
    }
});

// Close exit intent with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && exitIntentPopup?.classList.contains('visible')) {
        hideExitIntent();
    }
});

// ===== CONSOLE BRANDING =====
console.log('%c TableNow ', 'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; font-size: 24px; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
console.log('%c Restaurant Management Made Simple 🍽️ ', 'color: #6366f1; font-size: 16px; font-weight: 600;');
console.log('%c Visit us at tablenow.com ', 'color: #64748b; font-size: 12px;');
