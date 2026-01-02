// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
});

function initializePortfolio() {
    // Hide loader after page loads
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 1500);

    // Initialize all components
    populatePersonalInfo();
    renderProjects();
    renderExperience();
    renderSkills();
    renderContactInfo();
    initializeTypingEffect();
    initializeCodeTyping();
    initializeScrollAnimations();
    initializeNavbar();
    initializeMobileMenu();
    initialize3DDesk();
    initializeBackToTop();
    setCurrentYear();
}

// ===================================
// PERSONAL INFO
// ===================================

function populatePersonalInfo() {
    document.getElementById('heroName').textContent = PERSONAL_INFO.name;
    document.getElementById('heroDescription').textContent = PERSONAL_INFO.description;
    document.getElementById('resumeBtn').href = PERSONAL_INFO.resumeLink;
    document.getElementById('footerName').textContent = PERSONAL_INFO.name;
}

// ===================================
// TYPING EFFECT FOR HERO ROLE
// ===================================

function initializeTypingEffect() {
    const typingElement = document.getElementById('typingText');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = PERSONAL_INFO.roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % PERSONAL_INFO.roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ===================================
// CODE EDITOR TYPING EFFECT
// ===================================

function initializeCodeTyping() {
    const codeElement = document.getElementById('codeTyping');
    let charIndex = 0;

    function typeCode() {
        if (charIndex < CODE_SNIPPET.length) {
            codeElement.textContent = CODE_SNIPPET.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeCode, 30);
        }
    }

    setTimeout(typeCode, 1000);
}

// ===================================
// RENDER PROJECTS
// ===================================

function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    PROJECTS.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='https://via.placeholder.com/400x220/2b1056/8b5cf6?text=${encodeURIComponent(project.title)}'">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                    ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="project-link"><i class="fab fa-github"></i> Code</a>` : ''}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// ===================================
// RENDER EXPERIENCE
// ===================================

function renderExperience() {
    const timeline = document.getElementById('experienceTimeline');
    
    EXPERIENCE.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'} fade-in`;
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <span class="timeline-date">${item.date}</span>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-company">${item.company} ${item.location ? `• ${item.location}` : ''}</p>
                <p class="timeline-description">${item.description}</p>
            </div>
            <div class="timeline-dot"></div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// ===================================
// RENDER SKILLS
// ===================================

function renderSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    
    SKILLS.forEach((skill, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card fade-in';
        skillCard.style.animationDelay = `${index * 0.05}s`;
        
        skillCard.innerHTML = `
            <i class="${skill.icon} skill-icon"></i>
            <span class="skill-name">${skill.name}</span>
        `;
        
        skillsGrid.appendChild(skillCard);
    });
}

// ===================================
// RENDER CONTACT INFO
// ===================================

function renderContactInfo() {
    const contactInfo = document.getElementById('contactInfo');
    
    const contactItems = [
        {
            icon: 'fas fa-envelope',
            title: 'Email',
            value: PERSONAL_INFO.email,
            link: `mailto:${PERSONAL_INFO.email}`
        },
        {
            icon: 'fas fa-phone',
            title: 'Phone',
            value: PERSONAL_INFO.phone,
            link: `tel:${PERSONAL_INFO.phone}`
        },
        {
            icon: 'fas fa-map-marker-alt',
            title: 'Location',
            value: PERSONAL_INFO.location,
            link: null
        }
    ];

    contactItems.forEach(item => {
        const contactItem = document.createElement(item.link ? 'a' : 'div');
        contactItem.className = 'contact-item';
        if (item.link) contactItem.href = item.link;
        
        contactItem.innerHTML = `
            <i class="${item.icon} contact-icon"></i>
            <div class="contact-details">
                <h3>${item.title}</h3>
                <p>${item.value}</p>
            </div>
        `;
        
        contactInfo.appendChild(contactItem);
    });

    // Add social links
    SOCIAL_LINKS.forEach(social => {
        const socialItem = document.createElement('a');
        socialItem.className = 'contact-item';
        socialItem.href = social.url;
        socialItem.target = '_blank';
        
        socialItem.innerHTML = `
            <i class="${social.icon} contact-icon"></i>
            <div class="contact-details">
                <h3>${social.name}</h3>
                <p>Connect with me</p>
            </div>
        `;
        
        contactInfo.appendChild(socialItem);
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// NAVBAR FUNCTIONALITY
// ===================================

function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    let lastScroll = 0;

    // Navbar hide/show on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('hidden');
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;

        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for nav links
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

            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
}

// ===================================
// MOBILE MENU
// ===================================

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// ===================================
// CONTACT FORM
// ===================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
        
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function setCurrentYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// ===================================
// 3D OFFICE DESK TILT EFFECT
// ===================================

function initialize3DDesk() {
    const desk3d = document.getElementById('desk3d');
    
    if (!desk3d) return;
    
    desk3d.addEventListener('mousemove', (e) => {
        const rect = desk3d.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Tilt up/down
        const rotateY = ((x - centerX) / centerX) * 10;  // Tilt left/right
        
        desk3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    desk3d.addEventListener('mouseleave', () => {
        desk3d.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}

// ===================================
// BACK TO TOP BUTTON
// ===================================

function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
