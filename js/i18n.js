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
    updateMetaTags();
    updateJsonLd();
    updateHeroImage();
}

// Update hero image based on language
function updateHeroImage() {
    const heroImage = document.getElementById('heroImage');
    const heroImageWebp = document.getElementById('heroImageWebp');

    if (heroImage) {
        heroImage.src = `images/ipad-header_${currentLang}.png`;
    }
    if (heroImageWebp) {
        heroImageWebp.srcset = `images/ipad-header_${currentLang}.webp`;
    }
}

// Update meta tags for SEO
function updateMetaTags() {
    const t = translations[currentLang];
    if (!t || !t.seo) return;

    const seo = t.seo;

    // Update title
    document.title = seo.title;

    // Update meta tags
    const metaUpdates = {
        'title': seo.title,
        'description': seo.description,
        'keywords': seo.keywords
    };

    // Update standard meta tags
    Object.entries(metaUpdates).forEach(([name, content]) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (meta) {
            meta.setAttribute('content', content);
        }
    });

    // Update Open Graph tags
    const ogUpdates = {
        'og:title': seo.ogTitle,
        'og:description': seo.ogDescription,
        'og:locale': currentLang === 'ar' ? 'ar_IQ' : currentLang === 'ku' ? 'ku_IQ' : 'en_US'
    };

    Object.entries(ogUpdates).forEach(([property, content]) => {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (meta) {
            meta.setAttribute('content', content);
        }
    });

    // Update Twitter tags
    const twitterUpdates = {
        'twitter:title': seo.ogTitle,
        'twitter:description': seo.twitterDescription
    };

    Object.entries(twitterUpdates).forEach(([name, content]) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (meta) {
            meta.setAttribute('content', content);
        }
    });

    // Update canonical URL with language parameter
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        const baseUrl = 'https://table-now.co/';
        canonical.setAttribute('href', currentLang === 'en' ? baseUrl : `${baseUrl}?lang=${currentLang}`);
    }

    // Update language meta tag
    const langMeta = document.querySelector('meta[name="language"]');
    if (langMeta) {
        const langNames = { en: 'English', ar: 'Arabic', ku: 'Kurdish' };
        langMeta.setAttribute('content', langNames[currentLang] || 'English');
    }
}

// Update JSON-LD structured data
function updateJsonLd() {
    const t = translations[currentLang];
    if (!t || !t.seo) return;

    const seo = t.seo;
    const jsonLdScript = document.querySelector('script[type="application/ld+json"]');

    if (jsonLdScript) {
        try {
            const jsonLd = JSON.parse(jsonLdScript.textContent);

            // Update SoftwareApplication description
            const software = jsonLd['@graph'].find(item => item['@type'] === 'SoftwareApplication');
            if (software) {
                software.description = seo.description;
            }

            // Update WebSite description
            const website = jsonLd['@graph'].find(item => item['@type'] === 'WebSite');
            if (website) {
                website.description = seo.ogDescription;
            }

            // Update WebPage
            const webpage = jsonLd['@graph'].find(item => item['@type'] === 'WebPage');
            if (webpage) {
                webpage.name = seo.title;
                webpage.description = seo.description;
                webpage.inLanguage = currentLang;
            }

            jsonLdScript.textContent = JSON.stringify(jsonLd, null, 2);
        } catch (e) {
            console.error('Error updating JSON-LD:', e);
        }
    }
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
    updateMetaTags();
    updateJsonLd();
    updateHeroImage();

    // Set dynamic copyright year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
