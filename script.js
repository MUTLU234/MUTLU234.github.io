document.addEventListener('DOMContentLoaded', () => {
    
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    const preloaderFill = document.querySelector('.preloader-fill');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        preloaderFill.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initAnimations();
                }, 500);
            }, 300);
        }
    }, 100);

    // --- Custom Cursor ---
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Slight delay for outline
        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }, 50);
    });
    
    // Cursor hover effects
    const links = document.querySelectorAll('a, button, input, textarea, .project-card, .highlight-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        link.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    hamburger.addEventListener('click', () => {
        // Simple toggle for demo - in production add proper mobile menu styles
        if(navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--bg-secondary)';
            navLinks.style.padding = '2rem';
        }
    });

    // --- Typing Effect ---
    const typedTextElement = document.getElementById('typedText');
    const texts = [
        'Yapay Zeka (AI)', 
        'Makine Öğrenmesi', 
        'Full Stack Geliştirme', 
        'Enterprise Backend', 
        'Doğal Dil İşleme (NLP)'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing effect immediately
    typeEffect();

    // --- Number Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    function animateNumbers() {
        statNumbers.forEach(num => {
            const target = +num.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    num.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    num.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // --- Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Hide all
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                
                // Show matched
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    // Trigger reflow
                    void card.offsetWidth;
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }
            });
        });
    });

    // --- Scroll Reveal Animations & Active Nav Link ---
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const profFills = document.querySelectorAll('.prof-fill');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    function initAnimations() {
        revealElements();
        window.addEventListener('scroll', revealElements);
    }
    
    function revealElements() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        let currentSectionId = 'home';
        
        // Handle Section Reveals
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('reveal-active');
            }
        });
        
        // Handle Proficiency Bars
        profFills.forEach(fill => {
            const fillTop = fill.getBoundingClientRect().top;
            if (fillTop < windowHeight - 50) {
                fill.style.width = fill.getAttribute('data-width');
            }
        });
        
        // Handle Number Counters (only once)
        const statsSection = document.querySelector('.hero-stats');
        if (statsSection && !counted) {
            const statsTop = statsSection.getBoundingClientRect().top;
            if (statsTop < windowHeight) {
                animateNumbers();
                counted = true;
            }
        }
        
        // Active Nav Link based on scroll
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
        
        // Back to top button visibility
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // Back to top click
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form submission is now handled natively by HTML action/method for FormSubmit.co
});
