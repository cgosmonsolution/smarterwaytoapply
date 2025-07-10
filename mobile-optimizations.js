// Mobile-specific optimizations and touch enhancements
function initMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isMobile || isTouch) {
        document.body.classList.add('mobile-device');
        
        // Prevent zoom on input focus for iOS
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            // Store original viewport content
            const originalViewport = document.querySelector('meta[name="viewport"]').getAttribute('content');
            
            input.addEventListener('focus', function() {
                // Only prevent zoom if not already prevented by form submission
                if (!document.body.classList.contains('form-submitting')) {
                    document.querySelector('meta[name="viewport"]').setAttribute('content', 
                        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                }
            }, { passive: true });
            
            input.addEventListener('blur', function() {
                // Only restore viewport if not in form submission
                setTimeout(() => {
                    if (!document.body.classList.contains('form-submitting')) {
                        document.querySelector('meta[name="viewport"]').setAttribute('content', originalViewport);
                    }
                }, 100);
            }, { passive: true });
        });
        
        // Enhanced touch interactions for testimonial carousel
        let touchStartX = 0;
        let touchEndX = 0;
        const carousel = document.getElementById('testimonialCarousel');
        
        if (carousel) {
            carousel.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            carousel.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    const dots = document.querySelectorAll('.testimonial-dot');
                    const activeDot = document.querySelector('.testimonial-dot.active');
                    let currentIndex = Array.from(dots).indexOf(activeDot) || 0;
                    
                    if (diff > 0 && currentIndex < dots.length - 1) {
                        // Swipe left - next testimonial
                        dots[currentIndex + 1].click();
                    } else if (diff < 0 && currentIndex > 0) {
                        // Swipe right - previous testimonial
                        dots[currentIndex - 1].click();
                    }
                }
            }
        }
        
        // Improve form scrolling on mobile
        const formSteps = document.querySelectorAll('.form-step');
        formSteps.forEach(step => {
            step.addEventListener('transitionend', function() {
                if (step.classList.contains('active')) {
                    // Smooth scroll to top of form on mobile
                    const formElement = document.getElementById('application-form');
                    if (formElement && window.innerWidth <= 768) {
                        setTimeout(() => {
                            formElement.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'start',
                                inline: 'nearest' 
                            });
                        }, 300);
                    }
                }
            });
        });
    }
    
    // Optimize performance on mobile
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => particle.remove());
        
        // Optimize AOS settings for mobile
        if (typeof AOS !== 'undefined') {
            AOS.refresh({
                duration: 600,
                offset: 50,
                once: true
            });
        }
    }
}

// Initialize mobile optimizations as soon as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileOptimizations);
} else {
    initMobileOptimizations();
}
