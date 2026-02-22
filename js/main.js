/* ========================================
   LaySun - Main JavaScript
   ======================================== */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initHeroSlider();
  initTestimonialsSlider();
  initContactForm();
  initScrollAnimations();
});

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.strength-card, .solution-card, .value-card, .cert-card, .tech-card, .product-cat-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Simple validation
    const requiredFields = ['firstName', 'lastName', 'email', 'company', 'country', 'industry', 'interest'];
    let isValid = true;
    
    requiredFields.forEach(field => {
      const input = form.querySelector(`[name="${field}"]`);
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = '#e74c3c';
      } else {
        input.style.borderColor = '';
      }
    });
    
    if (!isValid) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your inquiry! We will get back to you within 24 hours.');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
  
  // Clear error styles on input
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', function() {
      this.style.borderColor = '';
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  
  if (!menuBtn || !navMenu) return;
  
  menuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      menuBtn.classList.remove('active');
    });
  });
}

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;

function initHeroSlider() {
  if (totalSlides === 0) return;
  
  // Auto slide every 5 seconds
  setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function changeSlide(direction) {
  slides[currentSlide].classList.remove('active');
  
  currentSlide += direction;
  
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }
  
  slides[currentSlide].classList.add('active');
}

// Testimonials Slider
let testimonialPosition = 0;
const testimonialTrack = document.getElementById('testimonialsTrack');
const testimonialItems = document.querySelectorAll('.testimonial-item');

function initTestimonialsSlider() {
  if (!testimonialTrack || testimonialItems.length === 0) return;
}

function moveTestimonials(direction) {
  if (!testimonialTrack) return;
  
  const itemWidth = testimonialItems[0].offsetWidth;
  const maxPosition = -(testimonialItems.length - 3) * itemWidth;
  
  testimonialPosition += direction * -itemWidth;
  
  if (testimonialPosition > 0) {
    testimonialPosition = maxPosition;
  } else if (testimonialPosition < maxPosition) {
    testimonialPosition = 0;
  }
  
  testimonialTrack.style.transform = `translateX(${testimonialPosition}px)`;
}

// Lightbox Functions
function openLightbox(src, caption) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImage');
  const captionEl = document.getElementById('lightboxCaption');
  
  if (lightbox && img) {
    img.src = src;
    if (captionEl) captionEl.textContent = caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modals on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Close modals on backdrop click
document.querySelectorAll('.lightbox').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll to Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add animation classes on scroll
const animateOnScroll = function() {
  const elements = document.querySelectorAll('.product-card, .category-card, .blog-card');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate-in');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);

// Preload critical images
function preloadImages() {
  const criticalImages = [
    'images/hero-olive-tree.jpg',
    'images/factory-production.jpg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Run preload on page load
window.addEventListener('load', preloadImages);
