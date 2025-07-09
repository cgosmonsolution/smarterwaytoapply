// Enhanced JavaScript for Jess Recruiting Application Form
// Version 2.0 - Dynamic and Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Testimonial Features
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        if (testimonialSlides[index]) {
            testimonialSlides[index].classList.add('active');
        }
        if (testimonialDots[index]) {
            testimonialDots[index].classList.add('active');
        }
        currentTestimonial = index;
    }

    // Initialize first testimonial
    if (testimonialSlides.length > 0) {
        showTestimonial(0);
    }

    // Dot click handlers
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });

    // Auto-rotate testimonials
    function showNextTestimonial() {
        if (testimonialSlides.length > 0) {
            const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
            showTestimonial(nextIndex);
        }
    }

    setInterval(showNextTestimonial, 5000);

    // Dynamic Particles Background
    function createParticle() {
        const particlesCanvas = document.getElementById('particles-canvas');
        if (!particlesCanvas) return;

        const particle = document.createElement('div');
        particle.className = 'particle absolute rounded-full opacity-30';
        
        // Random size between 1-4px
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color
        const colors = ['bg-yellow-400', 'bg-white', 'bg-blue-300'];
        particle.classList.add(colors[Math.floor(Math.random() * colors.length)]);
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation
        const animations = ['animate-pulse', 'animate-ping', 'animate-bounce'];
        particle.classList.add(animations[Math.floor(Math.random() * animations.length)]);
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        particlesCanvas.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 3000 + Math.random() * 2000);
    }

    // Create particles periodically
    setInterval(createParticle, 1200);

    // Enhanced Touch and Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    function handleGesture() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next testimonial
            showNextTestimonial();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous testimonial
            const prevIndex = currentTestimonial === 0 ? testimonialSlides.length - 1 : currentTestimonial - 1;
            showTestimonial(prevIndex);
        }
    }

    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        testimonialCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleGesture();
        });
    }

    // Enhanced Form Interactions
    document.querySelectorAll('input, select, textarea').forEach(field => {
        // Add hover effects
        field.addEventListener('mouseenter', () => {
            field.style.transform = 'scale(1.01)';
            field.style.transition = 'transform 0.2s ease';
        });
        field.addEventListener('mouseleave', () => {
            field.style.transform = 'scale(1)';
        });

        // Enhanced focus effects
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
            field.style.boxShadow = '0 0 0 3px rgba(30, 58, 138, 0.1)';
        });
        field.addEventListener('blur', () => {
            field.parentElement.classList.remove('focused');
            field.style.boxShadow = '';
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to { transform: scale(2); opacity: 0; }
        }
        .btn { position: relative; overflow: hidden; }
    `;
    document.head.appendChild(rippleStyle);

    // Smooth Scroll Enhancement
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

    // Enhanced Loading States
    document.querySelectorAll('button, input[type="submit"]').forEach(element => {
        element.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.opacity = '0.8';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            }
        });
    });

    // Keyboard Navigation Enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add keyboard navigation styles
    const keyboardStyles = document.createElement('style');
    keyboardStyles.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--jess-yellow) !important;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(keyboardStyles);

    // Performance Optimization - Lazy Loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Enhanced Error Reporting
    window.addEventListener('error', function(e) {
        console.error('Application Error:', e.error);
    });

    // Form Analytics Tracking
    function trackFormInteraction(action, data = {}) {
        console.log('Form Event:', action, data);
        
        // Example integration with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'custom_parameter_1': data.step || '',
                'custom_parameter_2': data.field || ''
            });
        }
    }

    // Enhanced checkbox interactions
    document.querySelectorAll('.checkbox-container input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.nextElementSibling;
            if (this.checked) {
                label.classList.add('bg-blue-50', 'border-blue-500', 'scale-105');
                label.style.transform = 'scale(1.02)';
            } else {
                label.classList.remove('bg-blue-50', 'border-blue-500', 'scale-105');
                label.style.transform = 'scale(1)';
            }
        });
    });

    // Add progressive enhancement for older browsers
    if (!window.fetch) {
        console.warn('This browser does not support fetch API. Form submission may not work.');
    }

    // Add service worker registration for offline capability (optional)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service worker registration failed:', err);
        });
    }

    console.log('Jess Recruiting Application Form - Enhanced Version Loaded Successfully! 🚗✨');
});
