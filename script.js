// Enhanced JavaScript with all fixes
document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    const typingText = document.getElementById('typing-text');
    const roles = [
        'Business Operations Expert', 
        'Financial Management Professional', 
        'Data Entry Specialist', 
        'Customer Service Professional'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingStopped = false;

    function typeRole() {
        if (typingStopped) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeRole, typingSpeed);
    }

    // Start typing when in view
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typingStopped = false;
                typeRole();
            } else {
                typingStopped = true;
            }
        });
    }, { threshold: 0.1 });

    typingObserver.observe(typingText);

    // Enhanced smooth scroll function
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const offset = 80; // Header height
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
            
            // Update URL without page jump
            history.pushState(null, null, target);
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                menuOpen = false;
            }
            
            return false;
        }
    }

    // Navigation click handlers
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let menuOpen = false;

    mobileMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('hidden');
        this.setAttribute('aria-expanded', menuOpen);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && e.target !== mobileMenuButton) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            menuOpen = false;
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Animate skill bars when in view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`);
            
            // Reset form
            this.reset();
        });
    }
});

// Global smooth scroll function for onclick handlers
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
        history.pushState(null, null, target);
        return false;
    }
} 