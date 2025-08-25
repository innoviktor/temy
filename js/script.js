// HQTechTalk JavaScript Functions

class HQTechTalkApp {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupAnimations();
    }

    // Theme Management
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeIcon();
        this.animateThemeTransition();
    }

    updateThemeIcon() {
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            if (this.theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
    }

    animateThemeTransition() {
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    // Event Listeners
    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                if (href && href !== '#') {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Mobile menu handling
        this.setupMobileMenu();

        // Contact form
        this.setupContactForm();
    }

    setupMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            // Close mobile menu when clicking on a link
            navbarCollapse.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        }
    }

    // Form Validation and Handling
    setupFormValidation() {
        // Bootstrap form validation
        const forms = document.querySelectorAll('.needs-validation');
        forms.forEach(form => {
            form.addEventListener('submit', (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            });
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (contactForm.checkValidity()) {
                this.submitContactForm(contactForm);
            }
        });

        // Real-time validation feedback
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim() !== '') {
                    input.classList.add('was-validated');
                }
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('was-validated')) {
                    // Re-validate on input
                    if (input.checkValidity()) {
                        input.classList.remove('is-invalid');
                        input.classList.add('is-valid');
                    } else {
                        input.classList.remove('is-valid');
                        input.classList.add('is-invalid');
                    }
                }
            });
        });
    }

    async submitContactForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        const messagesContainer = document.getElementById('formMessages');

        try {
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(data);

            // Show success message
            this.showFormMessage('success', 
                'Thank you for your message! We\'ll get back to you within 24 hours.');
            
            // Reset form
            form.reset();
            form.classList.remove('was-validated');

        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormMessage('error', 
                'Sorry, there was an error sending your message. Please try again.');
        } finally {
            // Restore button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    }

    simulateFormSubmission(data) {
        // Simulate API call - replace with actual implementation
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate occasional errors for testing
                if (Math.random() > 0.9) {
                    reject(new Error('Simulated network error'));
                } else {
                    console.log('Form data would be sent:', data);
                    resolve();
                }
            }, 2000);
        });
    }

    showFormMessage(type, message) {
        const messagesContainer = document.getElementById('formMessages');
        if (!messagesContainer) return;

        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';

        messagesContainer.innerHTML = `
            <div class="alert ${alertClass} d-flex align-items-center" role="alert">
                <i class="${icon} me-2"></i>
                <div>${message}</div>
            </div>
        `;

        // Scroll to message
        messagesContainer.scrollIntoView({ behavior: 'smooth' });

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                const alert = messagesContainer.querySelector('.alert');
                if (alert) {
                    alert.remove();
                }
            }, 5000);
        }
    }

    // Animations and Visual Effects
    setupAnimations() {
        this.setupScrollAnimations();
        this.setupLoadingAnimations();
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loading');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.card, .category-card').forEach(el => {
            observer.observe(el);
        });
    }

    setupLoadingAnimations() {
        // Add loading animation to page elements
        const elements = document.querySelectorAll('.hero, .page-header');
        elements.forEach(el => {
            el.classList.add('loading');
        });
    }

    // Utility Functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Analytics and Performance
    trackEvent(category, action, label) {
        // Placeholder for analytics tracking
        console.log('Event tracked:', { category, action, label });
    }

    measurePerformance() {
        // Simple performance measurement
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', pageLoadTime + 'ms');
        });
    }

    // Accessibility Features
    setupAccessibility() {
        // Skip to main content link
        this.addSkipLink();
        
        // Keyboard navigation improvements
        this.improveKeyboardNavigation();
        
        // Screen reader announcements
        this.setupScreenReaderAnnouncements();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'visually-hidden-focusable';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            z-index: 9999;
            padding: 8px 16px;
            background: var(--primary-color);
            color: white;
            text-decoration: none;
            border-radius: 4px;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    improveKeyboardNavigation() {
        // Trap focus in mobile menu when open
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarNav = document.querySelector('.navbar-nav');
        
        if (navbarToggler && navbarNav) {
            navbarToggler.addEventListener('click', () => {
                setTimeout(() => {
                    const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
                    if (isExpanded) {
                        navbarNav.querySelector('.nav-link').focus();
                    }
                }, 100);
            });
        }
    }

    setupScreenReaderAnnouncements() {
        // Create aria-live region for dynamic announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'visually-hidden';
        liveRegion.id = 'sr-announcements';
        document.body.appendChild(liveRegion);
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('sr-announcements');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new HQTechTalkApp();
    
    // Setup accessibility features
    app.setupAccessibility();
    
    // Measure performance
    app.measurePerformance();
    
    // Make app globally available for debugging
    window.HQTechTalkApp = app;
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment and implement service worker if needed
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HQTechTalkApp;
}
