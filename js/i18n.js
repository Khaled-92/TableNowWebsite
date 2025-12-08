// Language Management System
let currentLang = localStorage.getItem('language') || 'en';
let currentDir = currentLang === 'ar' || currentLang === 'ku' ? 'rtl' : 'ltr';

// Set initial language and direction
document.documentElement.lang = currentLang;
document.documentElement.dir = currentDir;

// Change language function
function changeLanguage(lang) {
    currentLang = lang;
    currentDir = (lang === 'ar' || lang === 'ku') ? 'rtl' : 'ltr';

    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = currentDir;

    updateContent();
    updateDirectionStyles();
}

// Update direction styles
function updateDirectionStyles() {
    const body = document.body;

    if (currentDir === 'rtl') {
        body.classList.add('rtl');
        body.classList.remove('ltr');
    } else {
        body.classList.add('ltr');
        body.classList.remove('rtl');
    }
}

// Update all content
function updateContent() {
    const t = translations[currentLang];

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getNestedTranslation(t, key);

        if (value !== undefined && value !== null) {
            element.textContent = value;
        }
    });

    // Update all elements with data-i18n-placeholder attribute (for form inputs)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const value = getNestedTranslation(t, key);

        if (value !== undefined && value !== null) {
            element.placeholder = value;
        }
    });

    // Update language dropdown button
    const langNames = {
        en: 'English',
        ar: 'العربية',
        ku: 'کوردی'
    };

    const currentLangBtn = document.getElementById('currentLang');
    if (currentLangBtn) {
        currentLangBtn.innerHTML = `<span>${langNames[currentLang]}</span> <i class="fas fa-chevron-down text-xs"></i>`;
    }
}

// Get nested translation value
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
    updateDirectionStyles();

    // Set dynamic copyright year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
