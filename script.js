const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const yearNode = document.querySelector('#year');
const contactForm = document.querySelector('.contact-form');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('is-open');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
    });
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = 'Request Sent';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      contactForm.reset();
    }, 1800);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.feature-card, .service-card, .workflow-step, .testimonial-card, .price-card, .stat-item, .industry-card').forEach((element) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(18px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (!topbar) return;

  if (window.scrollY > 10) {
    topbar.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.14)';
  } else {
    topbar.style.boxShadow = 'none';
  }
});

console.log('NeuralForge website initialized successfully.');
