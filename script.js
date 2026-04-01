// =========================================
// MOBILE NAV TOGGLE
// =========================================

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// =========================================
// FORM VALIDATION
// =========================================

const form = document.getElementById('kontaktForm');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function setError(inputId, errorId, show) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (show) {
        input.classList.add('is-error');
        error.classList.add('is-visible');
    } else {
        input.classList.remove('is-error');
        error.classList.remove('is-visible');
    }
}

// Live validation – clear error on input
['jmeno', 'email', 'zprava'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
        const input = document.getElementById(id);
        if (input.value.trim()) {
            if (id === 'email' && !validateEmail(input.value)) return;
            setError(id, `${id}-error`, false);
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const jmeno  = document.getElementById('jmeno').value.trim();
    const email  = document.getElementById('email').value.trim();
    const zprava = document.getElementById('zprava').value.trim();

    let isValid = true;

    if (!jmeno) {
        setError('jmeno', 'jmeno-error', true);
        isValid = false;
    } else {
        setError('jmeno', 'jmeno-error', false);
    }

    if (!email || !validateEmail(email)) {
        setError('email', 'email-error', true);
        isValid = false;
    } else {
        setError('email', 'email-error', false);
    }

    if (!zprava) {
        setError('zprava', 'zprava-error', true);
        isValid = false;
    } else {
        setError('zprava', 'zprava-error', false);
    }

    if (!isValid) return;

    // Success
    form.querySelectorAll('input, textarea, button[type="submit"]').forEach(el => {
        el.disabled = true;
    });

    formSuccess.removeAttribute('hidden');
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
