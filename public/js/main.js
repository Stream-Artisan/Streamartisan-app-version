// Enhanced main.js with navbar scroll hide/show functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll hide/show functionality
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    if (navbar) {
        // Add initial background
        navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
        
        // Navbar scroll effect with hide/show
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Only show navbar when fully at top of page
            if (scrollTop <= 0) {
                navbar.classList.remove('navbar-hidden');
                navbar.classList.remove('navbar-scrolled');
            } else {
                // Hide navbar for any scroll position below top
                navbar.classList.add('navbar-hidden');
                navbar.classList.add('navbar-scrolled');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .portfolio-item, .testimonial-card, .service-card, .team-card, .value-card');
    animatedElements.forEach(el => observer.observe(el));

    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('[data-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Counter animation for stats
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Stats counter observer
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (this.checkValidity()) {
                // Show success message
                const alert = document.createElement('div');
                alert.className = 'alert alert-success alert-dismissible fade show mt-3';
                alert.innerHTML = `
                    <strong>Success!</strong> Your message has been sent successfully. We'll get back to you soon.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
                this.parentNode.insertBefore(alert, this.nextSibling);
                this.reset();
            }
            
            this.classList.add('was-validated');
        });
    }

    // Contact form success message from URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show';
        alert.innerHTML = `
            <strong>Success!</strong> Your message has been sent successfully.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const form = document.querySelector('form');
        if (form) {
            form.parentNode.insertBefore(alert, form);
        }
    }

    // Dropdown hover functionality for Services menu
    const servicesDropdown = document.getElementById('servicesDropdown');
    const dropdownMenu = servicesDropdown ? servicesDropdown.nextElementSibling : null;
    
    if (servicesDropdown && dropdownMenu) {
        const dropdownContainer = servicesDropdown.closest('.nav-item.dropdown');
        
        // Show dropdown on hover
        dropdownContainer.addEventListener('mouseenter', function() {
            dropdownMenu.classList.add('show');
            servicesDropdown.setAttribute('aria-expanded', 'true');
        });
        
        // Hide dropdown when mouse leaves
        dropdownContainer.addEventListener('mouseleave', function() {
            dropdownMenu.classList.remove('show');
            servicesDropdown.setAttribute('aria-expanded', 'false');
        });
        
        // Keep Bootstrap's click functionality for mobile
        servicesDropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownMenu.classList.toggle('show');
                const isExpanded = dropdownMenu.classList.contains('show');
                servicesDropdown.setAttribute('aria-expanded', isExpanded);
            }
        });
    }
});

// Add navbar scroll styles
const style = document.createElement('style');
style.textContent = `
    .navbar-scrolled {
        background-color: rgba(33, 37, 41, 0.95) !important;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
    }
    
    .navbar-hidden {
        transform: translateY(-100%) !important;
        transition: transform 0.3s ease-in-out !important;
    }
    
    .navbar:not(.navbar-hidden) {
        transform: translateY(0) !important;
        transition: transform 0.3s ease-in-out !important;
    }
`;
document.head.appendChild(style);

// Lazy Loading Implementation
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Image Compression Helper
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading attribute for native lazy loading
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add alt text if missing
        if (!img.hasAttribute('alt') || img.alt === '') {
            const src = img.src || img.dataset.src || '';
            const filename = src.split('/').pop().split('.')[0];
            img.alt = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
    optimizeImages();
});






