let currentSlide = 0;
const slides = document.querySelector('#projects-slides');
const totalSlides = document.querySelectorAll('#projects .slide').length;

document.querySelector('#projects .next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
});

document.querySelector('#projects .prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
});

function updateSlide() {
  const translateX = -currentSlide * (100 / 3);
  slides.style.transform = `translateX(${translateX}%)`;
}

let currentTestimonial = 0;
const testimonialSlides = document.querySelector('#testimonials-slides');
const totalTestimonialSlides = document.querySelectorAll('#testimonials .slide').length;

document.querySelector('#testimonials .next').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonialSlides;
  updateTestimonialSlide();
});

document.querySelector('#testimonials .prev').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + totalTestimonialSlides) % totalTestimonialSlides;
  updateTestimonialSlide();
});

function updateTestimonialSlide() {
  const translateX = -currentTestimonial * (100 / totalTestimonialSlides);
  testimonialSlides.style.transform = `translateX(${translateX}%)`;
}

// Typing animation
const typingElement = document.getElementById('typing');
const text = 'Jerick Bigas';
let index = 0;

function typeWriter() {
  if (index < text.length) {
    typingElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 150);
  }
}

typeWriter();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll-triggered fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .card').forEach(section => {
    observer.observe(section);
});

// Auto-play functionality for sliders
let projectsAutoPlay = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
}, 5000);

let testimonialsAutoPlay = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonialSlides;
    updateTestimonialSlide();
}, 6000);

// Pause auto-play on hover
document.querySelector('#projects').addEventListener('mouseenter', () => {
    clearInterval(projectsAutoPlay);
});

document.querySelector('#projects').addEventListener('mouseleave', () => {
    projectsAutoPlay = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    }, 5000);
});

document.querySelector('#testimonials').addEventListener('mouseenter', () => {
    clearInterval(testimonialsAutoPlay);
});

document.querySelector('#testimonials').addEventListener('mouseleave', () => {
    testimonialsAutoPlay = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonialSlides;
        updateTestimonialSlide();
    }, 6000);
});

// Form validation and submission handling
const contactForm = document.querySelector('#contact form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff6b6b';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';
    input.parentNode.insertBefore(errorElement, input.nextSibling);
    input.style.border = '1px solid #ff6b6b';
}

function clearError(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    input.style.border = 'none';
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validate email
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validate message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
    } else {
        clearError(messageInput);
    }

    if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
});

// Scroll progress bar functionality
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scroll-progress-bar').style.width = scrollPercent + '%';
});

// Touch/swipe functionality for sliders
let startX = 0;
let endX = 0;

function handleTouchStart(e, sliderType) {
    startX = e.touches[0].clientX;
}

function handleTouchEnd(e, sliderType) {
    endX = e.changedTouches[0].clientX;
    handleSwipe(sliderType);
}

function handleSwipe(sliderType) {
    const diffX = startX - endX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            // Swipe left - next slide
            if (sliderType === 'projects') {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlide();
            } else if (sliderType === 'testimonials') {
                currentTestimonial = (currentTestimonial + 1) % totalTestimonialSlides;
                updateTestimonialSlide();
            }
        } else {
            // Swipe right - previous slide
            if (sliderType === 'projects') {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateSlide();
            } else if (sliderType === 'testimonials') {
                currentTestimonial = (currentTestimonial - 1 + totalTestimonialSlides) % totalTestimonialSlides;
                updateTestimonialSlide();
            }
        }
    }
}

// Add touch event listeners to sliders
document.querySelector('#projects .slider').addEventListener('touchstart', (e) => handleTouchStart(e, 'projects'), { passive: true });
document.querySelector('#projects .slider').addEventListener('touchend', (e) => handleTouchEnd(e, 'projects'), { passive: true });

document.querySelector('#testimonials .slider').addEventListener('touchstart', (e) => handleTouchStart(e, 'testimonials'), { passive: true });
document.querySelector('#testimonials .slider').addEventListener('touchend', (e) => handleTouchEnd(e, 'testimonials'), { passive: true });

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Mobile form optimization - prevent zoom on input focus
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        // Store current viewport meta tag
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    });

    input.addEventListener('blur', () => {
        // Restore viewport meta tag
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        }
    });
});