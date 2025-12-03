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

        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });

    // Update language dropdown button
    const langFlags = {
        en: '🇬🇧',
        ar: '🇮🇶',
        ku: '🇮🇶'
    };

    const langNames = {
        en: 'English',
        ar: 'العربية',
        ku: 'کوردی'
    };

    const currentLangBtn = document.getElementById('currentLang');
    if (currentLangBtn) {
        currentLangBtn.innerHTML = `${langFlags[currentLang]} <span class="hidden sm:inline">${langNames[currentLang]}</span>`;
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
});
