/**
 * ALEX CARTER - WEB DEV & BUSINESS INTEGRATIONS CONTROLLER
 * Lightweight, robust script for mobile navigation, contact form submission,
 * and smooth interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initContactForm();
});

/* ==========================================================================
   1. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   2. CLEAN CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const successBanner = document.getElementById('contactSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();

    if (!name || !email) {
      alert('Please fill in your name and email address.');
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span>Sending Message...</span>
    `;

    setTimeout(() => {
      submitBtn.style.display = 'none';
      if (successBanner) {
        successBanner.classList.remove('hidden');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 600);
  });
}
