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
   2. AUTOMATED EMAIL DISPATCH TO sharukesank01@gmail.com
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const successBanner = document.getElementById('contactSuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const business = document.getElementById('userBusiness').value.trim();
    const integrationSelect = document.getElementById('userIntegration');
    const integration = integrationSelect ? integrationSelect.value : '';
    const message = document.getElementById('userMessage').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in your name, email address, and project details.');
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 0.8s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Dispatching to sharukesank01@gmail.com...</span>
    `;

    try {
      const response = await fetch('https://formsubmit.co/ajax/sharukesank01@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Project Inquiry from ${name} (SHRKZ.dev)`,
          _template: 'table',
          _captcha: 'false',
          'Client Name': name,
          'Client Email': email,
          'Business / Current Site': business || 'Not specified',
          'Requested Integration': integration,
          'Project Details': message
        })
      });

      if (response.ok) {
        form.reset();
        submitBtn.style.display = 'none';
        if (successBanner) {
          successBanner.classList.remove('hidden');
          successBanner.innerHTML = `
            <strong>✓ Inquiry Sent to sharukesank01@gmail.com!</strong>
            <p style="margin-top: 0.35rem; font-size: 0.82rem; color: #dcd0e8;">Thank you, <strong>${name}</strong>. Your project details have been dispatched to my inbox. I will review your requirements and reply within 24 hours.</p>
          `;
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        throw new Error('Form service returned a non-OK status');
      }
    } catch (err) {
      console.warn('AJAX dispatch failed, falling back to direct POST submission:', err);
      // Fallback: standard HTML form POST to ensure delivery is never lost
      form.submit();
    }
  });
}
