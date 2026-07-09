// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-menu');
if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    if (targetId && document.getElementById(targetId)) {
      e.preventDefault();
      document.getElementById(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Contact form handling (client-side only, fallback to mailto)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm && formStatus) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simple validation
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in all fields.';
      formStatus.classList.add('error');
      return;
    }

    // Try to open mail client
    const mailto = `mailto:hello@tibago.org?subject=Contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(name)}%20<${encodeURIComponent(email)}>`;
    window.location.href = mailto;

    formStatus.textContent = 'Thank you! Your email client should open to send your message.';
    formStatus.classList.remove('error');
    contactForm.reset();
  });
}