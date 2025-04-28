// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validate form
            if (!name || !phone || !message) {
                alert('الرجاء ملء جميع الحقول المطلوبة');
                return;
            }
            
            // Here you would typically send the form data to your server
            // For now, we'll just show a success message
            alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
            this.reset();
        });
    }
});

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

// Navbar background color change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
}); 

const counters = {
    'ac-counter': {
        target: 2500,
        suffix: '+',
        prefix: '',
        format: (value) => value >= 1000 ? (value / 1000).toFixed(1) + ' ألف' : value
    },
    'tech-counter': {
        target: 15,
        suffix: '+',
        prefix: '',
        format: (value) => value
    },
    'satisfaction-counter': {
        target: 100,
        suffix: '%',
        prefix: '',
        format: (value) => value
    }
};

function animateCounter(id, start, end, duration, options) {
    let startTimestamp = null;
    const element = document.getElementById(id);

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);

        // تنسيق العرض
        let displayValue = options.format(currentValue);
        element.textContent = options.prefix + displayValue + options.suffix;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(counters).forEach(id => {
        animateCounter(id, 0, counters[id].target, 2000, counters[id]);
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            if (counters[id]) {
                animateCounter(id, 0, counters[id].target, 2000, counters[id]);
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.counter').forEach(counter => {
    observer.observe(counter);
});