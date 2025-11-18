// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Pricing tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const pricingGrids = document.querySelectorAll('.pricing-grid');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and grids
        tabButtons.forEach(btn => btn.classList.remove('active'));
        pricingGrids.forEach(grid => grid.classList.remove('active'));
        
        // Add active class to clicked button and corresponding grid
        button.classList.add('active');
        document.getElementById(`${targetTab}-prices`).classList.add('active');
    });
});


// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.service-card, .price-card, .contact-card, .faq-item, .about-text').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
    }
    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// FAQ accordion functionality (optional enhancement)
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + 'px';
        }
    });
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
