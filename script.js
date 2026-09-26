// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name') || 'Anonymous',
            email: formData.get('email') || '',
            message: formData.get('message') || ''
        };

        console.log('Form submitted:', data);
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00d084 0%, #00b870 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 2000;
            animation: slideInRight 0.3s ease-out;
        `;
        successMsg.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
        document.body.appendChild(successMsg);

        // Remove message after 5 seconds
        setTimeout(() => {
            successMsg.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => successMsg.remove(), 300);
        }, 5000);

        // Reset form
        contactForm.reset();
    });
}

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.service-card, .solution-item, .testimonial-card, .pricing-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// CTA button interactions
document.querySelectorAll('.cta-button, .btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 20px;
            height: 20px;
            top: ${e.clientY - btn.getBoundingClientRect().top}px;
            left: ${e.clientX - btn.getBoundingClientRect().left}px;
            animation: ripple 0.6s ease-out;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            width: 20px;
            height: 20px;
            opacity: 1;
            transform: scale(1);
        }
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect on scroll
const heroVisual = document.querySelector('.neural-network');
if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('.hero');
        const heroBounds = heroSection.getBoundingClientRect();
        
        if (heroBounds.top < window.innerHeight && heroBounds.bottom > 0) {
            heroVisual.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
    });
}

// Dynamic stat counter
const stats = document.querySelectorAll('.feature-number');
const observerStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = entry.target;
            const text = target.textContent;
            const isPercentage = text.includes('%');
            const isPlus = text.includes('+');
            
            let finalValue = text.replace(/[^0-9]/g, '');
            let currentValue = 0;
            
            const increment = Math.ceil(finalValue / 30);
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                    target.classList.add('counted');
                }
                
                let display = currentValue;
                if (isPercentage) display += '%';
                if (isPlus) display += '+';
                target.textContent = display;
            }, 30);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => observerStats.observe(stat));

// Get Started button scroll to contact
document.querySelector('.cta-button')?.addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

console.log('✨ Premium AI Industries Website Loaded Successfully');
