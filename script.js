// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    initNavigation();
    initScrollAnimations();
    initTypingAnimation();
    initSkillAnimations();
    initProjectFilters();
    initContactForm();
    initThemeToggle();
    initScrollToTop();
}

// Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stats counters
                if (entry.target.classList.contains('stat')) {
                    setTimeout(() => animateCounter(entry.target), 200);
                }
                
                // Animate skill items
                if (entry.target.classList.contains('skill-item')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    entry.target.classList.add('animate-skill');
                }
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.skill-item, .project-card, .timeline-item, .stat, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Typing Animation
function initTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const texts = [
        'Sr. Software Engineer | Full-Stack | AI/ML | Cloud',
        'Generative AI & Machine Learning Specialist',
        'Scalable Systems Architect',
        'Enterprise Software Developer',
        'Cloud Computing Expert'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    setTimeout(typeWriter, 1000);
}

// Skill Animations
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'scale(1.05)';
        });
        
        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'scale(1)';
        });
    });
}

// Project Filters
function initProjectFilters() {
    const projectsSection = document.querySelector('#projects .container');
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All Projects (14)</button>
        <button class="filter-btn" data-filter="ai">AI/ML (3)</button>
        <button class="filter-btn" data-filter="web">Web Development (3)</button>
        <button class="filter-btn" data-filter="mobile">Mobile (3)</button>
        <button class="filter-btn" data-filter="cloud">Cloud & DevOps (3)</button>
    `;
    
    const sectionHeader = projectsSection.querySelector('.section-header');
    sectionHeader.appendChild(filterContainer);

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const contactContent = document.querySelector('.contact-content');
    if (!contactContent) return;

    const formHTML = `
        <form class="contact-form" id="contactForm">
            <div class="form-group">
                <input type="text" id="name" name="name" placeholder="Your Name" required>
            </div>
            <div class="form-group">
                <input type="email" id="email" name="email" placeholder="Your Email" required>
            </div>
            <div class="form-group">
                <input type="text" id="subject" name="subject" placeholder="Subject" required>
            </div>
            <div class="form-group">
                <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
                <i class="fas fa-paper-plane"></i>
                Send Message
            </button>
        </form>
    `;
    
    contactContent.insertAdjacentHTML('beforeend', formHTML);

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
}

// Theme Toggle
function initThemeToggle() {
    const navbar = document.querySelector('.nav-container');
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    
    navbar.appendChild(themeToggle);
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Scroll to Top
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate Counter
function animateCounter(element) {
    // Prevent multiple animations
    if (element.dataset.animated === 'true') return;
    element.dataset.animated = 'true';
    
    const statNumber = element.querySelector('.stat-number');
    const target = parseInt(statNumber.textContent.replace('+', ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        statNumber.textContent = Math.floor(current) + '+';
    }, 16);
}

// Additional Styles
const additionalStyles = `
.project-filters {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 0.5rem 1.5rem;
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    color: var(--text-secondary);
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-fast);
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.contact-form {
    background: var(--bg-card);
    padding: 2rem;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-light);
    margin-top: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    font-family: var(--font-primary);
    font-size: var(--font-size-base);
    transition: var(--transition-fast);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.theme-toggle {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-fast);
    color: var(--text-primary);
}

.theme-toggle:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition-normal);
    z-index: 1000;
    box-shadow: var(--shadow-medium);
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-to-top:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-large);
}

.dark-theme {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-card: #334155;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-light: #94a3b8;
    --border-color: #475569;
}

.dark-theme .navbar {
    background: rgba(15, 23, 42, 0.95) !important;
}

/* Project Statistics */
.project-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.project-stat {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-light);
    transition: var(--transition-normal);
}

.project-stat:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-medium);
}

.stat-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
}

.stat-info {
    display: flex;
    flex-direction: column;
}

.stat-count {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    line-height: 1;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    font-weight: 500;
}

@media (max-width: 768px) {
    .project-filters {
        gap: 0.5rem;
    }
    
    .filter-btn {
        padding: 0.4rem 1rem;
        font-size: var(--font-size-sm);
    }
    
    .theme-toggle {
        width: 35px;
        height: 35px;
    }
    
    .scroll-to-top {
        bottom: 1rem;
        right: 1rem;
        width: 45px;
        height: 45px;
    }
    
    .project-stats {
        gap: 1rem;
        margin: 1.5rem 0;
        grid-template-columns: repeat(2, 1fr);
    }
    
    .project-stat {
        padding: 0.8rem 1rem;
        gap: 0.8rem;
    }
    
    .stat-icon {
        width: 40px;
        height: 40px;
        font-size: 1rem;
    }
    
    .stat-count {
        font-size: 1.2rem;
    }
    
    .stat-label {
        font-size: 0.8rem;
    }
}

/* Read More Button Styles */
.read-more-btn {
    background: none;
    border: none;
    color: var(--primary-color);
    font-size: var(--font-size-sm);
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.5rem 0;
    transition: var(--transition-fast);
}

.read-more-btn:hover {
    color: var(--primary-dark);
    transform: translateX(3px);
}

.read-more-btn i {
    transition: transform var(--transition-fast);
    transform: rotate(0deg);
}

.read-more-btn.expanded i {
    transform: rotate(180deg);
}

.description-preview,
.description-full {
    line-height: 1.6;
    color: var(--text-secondary);
}

.description-full {
    animation: fadeInUp 0.3s ease-out;
}

.description-full strong {
    color: var(--text-primary);
    font-weight: 600;
}

.project-description {
    margin-bottom: var(--spacing-lg);
}

/* Animation Classes */
.animate-skill {
    animation: skillPulse 0.6s ease-out;
}

@keyframes skillPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.pulse {
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

@media (max-width: 768px) {
    .read-more-btn {
        font-size: var(--font-size-xs);
        margin-top: 0.8rem;
    }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== PROJECT READ MORE FUNCTIONALITY ===== //
function toggleDescription(button) {
    const projectDescription = button.closest('.project-description');
    const preview = projectDescription.querySelector('.description-preview');
    const full = projectDescription.querySelector('.description-full');
    const readMoreText = button.querySelector('.read-more-text');
    const icon = button.querySelector('i');
    
    if (full.style.display === 'none' || !full.style.display) {
        // Show full description
        preview.style.display = 'none';
        full.style.display = 'block';
        readMoreText.textContent = 'Read Less';
        button.classList.add('expanded');
    } else {
        // Show preview
        preview.style.display = 'block';
        full.style.display = 'none';
        readMoreText.textContent = 'Read More';
        button.classList.remove('expanded');
    }
}

// Make function globally available
window.toggleDescription = toggleDescription;

// ===== ERROR HANDLING AND DEBUGGING ===== //
// Add error handling for common issues
document.addEventListener('DOMContentLoaded', function() {
    // Check if all required elements exist
    const requiredElements = [
        '.navbar',
        '.hero',
        '.projects-grid',
        '.stat'
    ];
    
    requiredElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Required element not found: ${selector}`);
        }
    });
    
    // Check for broken images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // Replace with placeholder if needed
            this.src = 'https://via.placeholder.com/600x400/6366f1/ffffff?text=Image+Not+Found';
        });
    });
});