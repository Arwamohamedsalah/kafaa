// Main JavaScript file for Kafaa website

// When page loads
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#' && this.getAttribute('href') !== '#navbarNav') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add active class to navbar items on scroll
    window.addEventListener('scroll', function () {
        let scrollPosition = window.scrollY;

        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // You can add AJAX form submission here
                alert('تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.');
                event.preventDefault(); // Prevent actual submission for demo
            }
            form.classList.add('was-validated');
        });
    });

    // Navbar active state
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentLocation.includes(linkPath) && linkPath !== '#' && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') || currentLocation.endsWith('index.html')) {
            // Make home link active if on index page
            if (linkPath === 'index.html' || linkPath === './') {
                link.classList.add('active');
            }
        }
    });

    // Whatsapp floating button functionality
    const floatingWhatsapp = document.querySelector('.floating-whatsapp');
    if (floatingWhatsapp) {
        floatingWhatsapp.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        floatingWhatsapp.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

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