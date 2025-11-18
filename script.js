// ========================================
// MODERN PILL NAVIGATION SYSTEM
// ========================================
class ModernNavigation {
    constructor() {
        this.navLinks = document.querySelectorAll('nav ul li a');
        this.highlight = document.querySelector('.nav-highlight');
        this.sections = document.querySelectorAll('[id]');
        this.currentSection = '';
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.setupClickHandlers();
        this.setupScrollHandler();
        this.setInitialHighlight();
        this.setupResizeHandler();
        this.setupLogoHandler();
    }

    setupLogoHandler() {
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToTop();
                this.setActiveSection('home');
            });
        }
    }

    scrollToTop() {
        this.isScrolling = true;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }

    setupClickHandlers() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.setActiveSection(targetId);
            });
        });
    }

    setupScrollHandler() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (!this.isScrolling) {
                        this.updateActiveSection();
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (this.currentSection !== 'home') {
                    const activeLink = document.querySelector('nav ul li.active a');
                    if (activeLink) {
                        this.moveHighlight(activeLink);
                    }
                }
            }, 100);
        });
    }

    updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        let activeSection = '';

        if (scrollPosition <= 150) {
            activeSection = 'home';
        } else {
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                const navItem = document.querySelector(`a[data-section="${sectionId}"]`);
                
                if (navItem && scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activeSection = sectionId;
                }
            });
        }

        if (activeSection && this.currentSection !== activeSection) {
            this.setActiveSection(activeSection);
        }
    }

    setActiveSection(sectionId) {
        this.currentSection = sectionId;
        
        this.navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });
        
        if (sectionId === 'home') {
            this.highlight.classList.remove('active');
            this.highlight.style.opacity = '0';
        } else {
            const activeLink = document.querySelector(`a[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.parentElement.classList.add('active');
                this.moveHighlight(activeLink);
            }
        }
    }

    moveHighlight(activeLink) {
        if (!activeLink || !this.highlight) return;

        const linkRect = activeLink.getBoundingClientRect();
        const navRect = activeLink.closest('nav ul').getBoundingClientRect();
        
        const left = linkRect.left - navRect.left;
        const width = linkRect.width;
        const height = linkRect.height - 8;
        
        this.highlight.style.left = `${left}px`;
        this.highlight.style.width = `${width}px`;
        this.highlight.style.height = `${height}px`;
        this.highlight.style.opacity = '1';
        this.highlight.classList.add('active');
    }

    setInitialHighlight() {
        this.setActiveSection('home');
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            this.isScrolling = true;
            
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            setTimeout(() => {
                this.isScrolling = false;
            }, 1000);
        }
    }
}

// ========================================
// VIEWPORT HEIGHT ADJUSTMENT SYSTEM
// ========================================
function adjustSectionHeights() {
    const sections = document.querySelectorAll('.Header, .About, #Skills, .Projects, #Certificates');
    const vh = window.innerHeight;
    sections.forEach(sec => {
        sec.style.minHeight = vh + 'px';
    });
}

// ========================================
// SMOOTH SCROLLING EFFECTS
// ========================================
(function () {
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;

    document.addEventListener('click', function (e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const hash = link.getAttribute('href');
        if (hash === '#' || hash.length < 2) return;

        const target = document.getElementById(hash.slice(1));
        if (!target) return;

        e.preventDefault();

        if (supportsNativeSmoothScroll && typeof target.scrollIntoView === 'function') {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        // JavaScript fallback for older browsers
        const startY = window.pageYOffset;
        const targetY = startY + target.getBoundingClientRect().top;
        const duration = 500;
        const startTime = performance.now();

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutQuad(progress);
            const currentY = startY + (targetY - startY) * eased;
            window.scrollTo(0, currentY);
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }, { passive: false });
})();

// ========================================
// FLOATING TECH ICONS ANIMATION SYSTEM
// ========================================
class FloatingIconsManager {
    constructor() {
        this.container = null;
        this.skillsSection = null;
        this.usedPositions = new Map();
        this.availableIcons = [];
        this.activeIcons = new Map();
        this.animationInterval = null;
        this.isAnimating = false;
        this.maxActiveIcons = 5;
        
        this.techIcons = [
            { icon: 'devicon-html5-plain colored', name: 'HTML' },
            { icon: 'devicon-css3-plain colored', name: 'CSS' },
            { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
            { icon: 'devicon-react-original colored', name: 'React' },
            { icon: 'devicon-django-plain', name: 'Django' },
            { icon: 'devicon-flask-original-wordmark colored', name: 'Flask' },
            { icon: 'devicon-mysql-plain-wordmark colored', name: 'MySQL' },
            { icon: 'devicon-mongodb-plain-wordmark colored', name: 'MongoDB' },
            { icon: 'devicon-postgresql-plain', name: 'PostgreSQL' },
            { icon: 'devicon-sqlite-plain', name: 'SQLite' },
            { icon: 'devicon-numpy-plain-wordmark colored', name: 'NumPy' },
            { icon: 'devicon-pandas-plain-wordmark colored', name: 'Pandas' },
            { icon: 'devicon-matplotlib-plain', name: 'Matplotlib' },
            { icon: 'devicon-plotly-plain-wordmark', name: 'Plotly' },
            { icon: 'devicon-python-plain colored', name: 'Python' },
            { icon: 'devicon-git-plain colored', name: 'Git' },
            { icon: 'devicon-github-original-wordmark colored', name: 'GitHub' },
            { icon: 'devicon-googlecloud-plain', name: 'GCP' },
            { icon: 'devicon-amazonwebservices-plain-wordmark', name: 'AWS' },
            { icon: 'devicon-vscode-plain colored', name: 'VS Code' },
            { icon: 'devicon-jupyter-plain colored', name: 'Jupyter Notebook' },
            { icon: 'devicon-pycharm-plain colored', name: 'PyCharm' }
        ];
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.container = document.querySelector('.floating-icons-container');
        this.skillsSection = document.getElementById('Skills');
        
        if (!this.container || !this.skillsSection) {
            return;
        }
        
        this.resetAvailableIcons();
        
        setTimeout(() => {
            this.startAnimation();
        }, 1000);
    }
    
    resetAvailableIcons() {
        this.availableIcons = [...this.techIcons];
        this.shuffleArray(this.availableIcons);
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    startAnimation() {
        this.isAnimating = true;
        this.animateNextIcon();
    }
    
    animateNextIcon() {
        if (!this.isAnimating) return;
        
        if (this.activeIcons.size >= this.maxActiveIcons) {
            this.animationInterval = setTimeout(() => {
                this.animateNextIcon();
            }, 500);
            return;
        }
        
        const iconData = this.getNextUniqueIcon();
        if (!iconData || this.activeIcons.has(iconData.name)) {
            this.animationInterval = setTimeout(() => {
                this.animateNextIcon();
            }, 500);
            return;
        }
        
        this.createFloatingIcon(iconData);
        
        const nextDelay = this.getRandomDelay();
        this.animationInterval = setTimeout(() => {
            this.animateNextIcon();
        }, nextDelay);
    }
    
    getNextUniqueIcon() {
        if (this.availableIcons.length === 0) {
            this.resetAvailableIcons();
        }
        return this.availableIcons.pop();
    }
    
    createFloatingIcon(iconData) {
        if (this.activeIcons.has(iconData.name) || this.activeIcons.size >= this.maxActiveIcons) {
            return;
        }
        
        const icon = document.createElement('i');
        icon.className = `floating-icon ${iconData.icon}`;
        icon.setAttribute('data-tech', iconData.name);
        
        const position = this.getSafePosition();
        if (!position) {
            return;
        }
        
        this.activeIcons.set(iconData.name, position);
        
        icon.style.left = position.x + 'px';
        icon.style.top = position.y + 'px';
        icon.style.position = 'absolute';
        
        this.container.appendChild(icon);
        
        setTimeout(() => {
            icon.classList.add('show', 'floating');
        }, 100);
        
        setTimeout(() => {
            this.removeIcon(icon, iconData, position);
        }, 4000);
    }
    
    removeIcon(icon, iconData, position) {
        icon.classList.remove('show', 'floating');
        icon.classList.add('hide');
        
        setTimeout(() => {
            if (icon.parentNode) {
                icon.parentNode.removeChild(icon);
            }
            this.activeIcons.delete(iconData.name);
            this.markPositionAsRecentlyUsed(position);
        }, 800);
    }
    
    getSafePosition() {
        const containerRect = this.skillsSection.getBoundingClientRect();
        const iconSize = 60;
        
        const safeAreas = [
            { x: 50, y: 180, width: 200, height: 120 },
            { x: containerRect.width - 250, y: 180, width: 200, height: 120 },
            { x: 20, y: 250, width: 150, height: 100 },
            { x: containerRect.width - 170, y: 250, width: 150, height: 100 },
            { x: containerRect.width * 0.2, y: 200, width: 120, height: 80 },
            { x: containerRect.width * 0.8 - 120, y: 200, width: 120, height: 80 },
            { x: 10, y: 300, width: 80, height: 200 },
            { x: containerRect.width - 90, y: 300, width: 80, height: 200 }
        ];
        
        const shuffledAreas = [...safeAreas].sort(() => Math.random() - 0.5);
        
        for (let area of shuffledAreas) {
            for (let attempt = 0; attempt < 3; attempt++) {
                const position = {
                    x: area.x + Math.random() * (area.width - iconSize),
                    y: area.y + Math.random() * (area.height - iconSize)
                };
                
                position.x = Math.max(10, Math.min(position.x, containerRect.width - iconSize - 10));
                position.y = Math.max(150, Math.min(position.y, containerRect.height - iconSize - 10));
                
                if (this.isPositionSafe(position)) {
                    return position;
                }
            }
        }
        
        return {
            x: Math.random() * (containerRect.width - iconSize - 100) + 50,
            y: 180 + Math.random() * 120
        };
    }
    
    isPositionSafe(position) {
        const minDistance = 80;
        
        for (let [iconName, activePosition] of this.activeIcons) {
            const distance = Math.sqrt(
                Math.pow(position.x - activePosition.x, 2) + 
                Math.pow(position.y - activePosition.y, 2)
            );
            
            if (distance < minDistance) {
                return false;
            }
        }
        
        const currentTime = Date.now();
        const positionKey = `${Math.floor(position.x / 50)}-${Math.floor(position.y / 50)}`;
        
        if (this.usedPositions.has(positionKey)) {
            const lastUsed = this.usedPositions.get(positionKey);
            if (currentTime - lastUsed < 2000) {
                return false;
            }
        }
        
        return true;
    }
    
    markPositionAsRecentlyUsed(position) {
        const positionKey = `${Math.floor(position.x / 50)}-${Math.floor(position.y / 50)}`;
        this.usedPositions.set(positionKey, Date.now());
        
        const currentTime = Date.now();
        for (let [key, time] of this.usedPositions) {
            if (currentTime - time > 8000) {
                this.usedPositions.delete(key);
            }
        }
    }
    
    getRandomDelay() {
        return Math.random() * 800 + 500;
    }
}

// ========================================
// PROJECT CARDS INTERACTION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card');
    const container = document.querySelector('.cards-container');
    
    // Calculate center card index dynamically for ANY number of cards
    const totalCards = cards.length;
    const centerCardIndex = Math.floor(totalCards / 2);
    
    // Auto-scroll variables
    let autoScrollInterval;
    let currentAutoIndex = 0;
    let isUserInteracting = false;
    let hasCompletedFullCycle = false;
    let isProjectSectionVisible = false;
    let isHoveringCard = false;
    
    console.log(`SCALABLE SYSTEM: ${totalCards} cards detected!`);
    console.log(`Center card index: ${centerCardIndex}`);
    console.log(`Will auto-scroll: Card 0 → Card 1 → ... → Card ${totalCards-1} → Center Card ${centerCardIndex}`);
    
    // Function to expand a specific card
    function expandCard(index) {
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('expanded');
                card.classList.remove('collapsed');
            } else {
                card.classList.add('collapsed');
                card.classList.remove('expanded');
            }
        });
        console.log(`Expanded card ${index}`);
    }
    
    // Initialize: Set center card as expanded on page load (works for ANY number of cards)
    function initializeCards() {
        expandCard(centerCardIndex);
        console.log(`Initialized with center card: ${centerCardIndex} (Total: ${totalCards} cards)`);
    }
    
    // Auto-scroll function - cycles through ALL N cards (0 to N-1) then returns to center
    function startAutoScroll() {
        if (isUserInteracting || hasCompletedFullCycle) {
            console.log('Auto-scroll blocked - user interacting or cycle complete');
            return;
        }
        
        console.log(`Starting auto-scroll for ${totalCards} cards...`);
        console.log(`Sequence: 0 → 1 → 2 → ... → ${totalCards-1} → Center(${centerCardIndex})`);
        currentAutoIndex = 0; // Always start from first card (index 0)
        
        // First, immediately show card 0
        expandCard(currentAutoIndex);
        console.log(`Auto-scroll: Showing card ${currentAutoIndex}/${totalCards-1}`);
        
        autoScrollInterval = setInterval(() => {
            if (isUserInteracting) {
                console.log('Auto-scroll stopped - user interaction detected');
                clearInterval(autoScrollInterval);
                return;
            }
            
            // Move to next card
            currentAutoIndex++;
            
            // Check if we've shown all N cards
            if (currentAutoIndex >= totalCards) {
                console.log(`Auto-scroll: Completed full cycle of ${totalCards} cards, returning to center`);
                // Cycle complete - go back to center card and stop
                expandCard(centerCardIndex);
                hasCompletedFullCycle = true;
                clearInterval(autoScrollInterval);
                console.log(`Auto-scroll permanently stopped after showing all ${totalCards} cards`);
                return;
            }
            
            // Expand current card
            expandCard(currentAutoIndex);
            console.log(`Auto-scroll: Showing card ${currentAutoIndex}/${totalCards-1}`);
            
        }, 3000); // 3 seconds per card (adjustable for N cards)
    }
    
    // Stop auto-scroll function
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            console.log('Auto-scroll manually stopped');
        }
    }
    
    // Check if project section is in viewport
    function checkProjectSectionVisibility() {
        const rect = container.getBoundingClientRect();
        const isVisible = (rect.top >= 0 && rect.top <= window.innerHeight) || 
                         (rect.bottom >= 0 && rect.bottom <= window.innerHeight) ||
                         (rect.top < 0 && rect.bottom > window.innerHeight);
        
        if (isVisible && !isProjectSectionVisible) {
            isProjectSectionVisible = true;
            console.log('Project section became visible - starting auto-scroll in 1 second');
            
            // Start auto-scroll after 1 second when section becomes visible
            setTimeout(() => {
                if (!isUserInteracting && !hasCompletedFullCycle && isProjectSectionVisible) {
                    startAutoScroll();
                }
            }, 1000);
        } else if (!isVisible && isProjectSectionVisible) {
            isProjectSectionVisible = false;
            console.log('Project section not visible');
            stopAutoScroll();
        }
    }
    
    // Initialize cards on page load
    initializeCards();
    
    // Check initial visibility
    setTimeout(checkProjectSectionVisibility, 500);
    
    // Monitor scroll to detect when project section comes into view
    window.addEventListener('scroll', checkProjectSectionVisibility);
    
    // Add hover event listeners for manual control (works for ANY number of cards)
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            console.log(`User hovered on card ${index}/${totalCards-1}`);
            
            // Stop auto-scroll if running
            isUserInteracting = true;
            stopAutoScroll();
            isHoveringCard = true;
            
            // Expand the hovered card - NO TIMERS, STAYS OPEN
            expandCard(index);
        });
        
        card.addEventListener('mouseleave', function() {
            console.log(`Mouse left Card ${index}/${totalCards-1} - Card STAYS OPEN (no auto-return)`);
            isHoveringCard = false;
            // Card stays open - no automatic return to center!
        });
        
        // Mobile touch support for N cards
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                console.log(`User clicked card ${index}/${totalCards-1} on mobile`);
                isUserInteracting = true;
                stopAutoScroll();
                isHoveringCard = true;
                expandCard(index);
            }
        });
    });

    // Container events - simplified (no automatic returns)
    container.addEventListener('mouseenter', function() {
        console.log('Mouse entered project container');
    });

    container.addEventListener('mouseleave', function() {
        console.log('Mouse left project container - Cards STAY as they are');
        isHoveringCard = false;
        isUserInteracting = false;
        // No automatic changes when leaving container!
    });
    
    // Keyboard navigation for N cards
    document.addEventListener('keydown', function(e) {
        if (e.key.includes('Arrow')) {
            console.log(`Keyboard navigation detected (${totalCards} cards available)`);
            isUserInteracting = true;
            stopAutoScroll();
            hasCompletedFullCycle = true; // Keyboard use = permanent manual mode
            isHoveringCard = true;
            
            const currentExpanded = document.querySelector('.project-card.expanded');
            const currentIndex = Array.from(cards).indexOf(currentExpanded);
            
            let newIndex = currentIndex;
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : totalCards - 1;
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                newIndex = currentIndex < totalCards - 1 ? currentIndex + 1 : 0;
            }
            
            expandCard(newIndex);
            console.log(`Keyboard navigation: ${currentIndex} → ${newIndex} (Total: ${totalCards})`);
        }
    });
    
    // Handle window resize - reset everything fresh
    window.addEventListener('resize', function() {
        console.log('Window resized - FRESH RESTART');
        stopAutoScroll();
        
        // Reset ALL variables to initial state
        isUserInteracting = false;
        hasCompletedFullCycle = false;
        isProjectSectionVisible = false;
        isHoveringCard = false;
        currentAutoIndex = 0;
        
        setTimeout(() => {
            initializeCards(); // Start with center card
            checkProjectSectionVisibility(); // Begin fresh auto-scroll if needed
        }, 200);
    });
    
    // Pause when page is hidden
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoScroll();
            console.log('Page hidden - auto-scroll paused');
        } else {
            console.log('Page visible - checking if auto-scroll should resume');
            setTimeout(checkProjectSectionVisibility, 500);
        }
    });
    
    console.log('SCALABLE Project animation system initialized successfully!');
    console.log(`System supports: ${totalCards} cards with center at index ${centerCardIndex}`);
    console.log('Behavior: Auto-scroll ALL N cards → Manual hover → Cards STAY OPEN until user hovers different card');
    console.log(`Auto-scroll sequence: 0→1→2→...→${totalCards-1}→Center(${centerCardIndex})→STOP`);
});


// ========================================
// CERTIFICATE CAROUSEL GALLERY SYSTEM
// ========================================
const certificateLinks = {
    'Aviatrix_cloud.jpg': 'https://www.credly.com/badges/b2f8b061-fe9f-46d3-b8c9-872d2d541fa7/public_url',
    'Python_Udemy.jpg': 'https://www.udemy.com/certificate/UC-557254a0-542b-4267-b52d-91782195d9af/', 
    'Google_Cloud_Fundamentals.png': 'https://www.cloudskillsboost.google/public_profiles/9e676916-e61f-4c0e-a880-fac5df24540b/badges/15555915',
    'Python_HackerRank.png': 'https://www.hackerrank.com/certificates/iframe/4fee9a38240c',
    'Introduction to AI_page-0001.jpg': '#',
    'Introduction to NLP_page-0001.jpg': '#',
    'SQL_Hacker_Rank_Basics.jpg': 'https://www.hackerrank.com/certificates/iframe/1a4dbbabc8e9'
};

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');
const linkIcon = document.getElementById('certificateLink');
const linkWrapper = document.querySelector('.certificate-link-wrapper');
const certificatesSection = document.getElementById('Certificates');

function updateCertificateLink() {
    const centerCertificate = document.querySelector('.gallery-item-3');
    if (centerCertificate && linkIcon && linkWrapper) {
        const certificateImageSrc = centerCertificate.src;
        const imageName = certificateImageSrc.split('/').pop();
        const certificateLink = certificateLinks[imageName] || '#';
        
        certificatesSection.classList.add('show-link-icon');
        
        linkIcon.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (certificateLink !== '#') {
                window.open(certificateLink, '_blank');
            }
        };
        
        linkIcon.title = `Open ${centerCertificate.alt}`;
    } else {
        if (certificatesSection) {
            certificatesSection.classList.remove('show-link-icon');
        }
    }
}

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
        this.autoScrollInterval = null;
        this.isHovered = false;
        this.currentIndex = 0; // Track current position properly
    }

    updateGallery() {
        // Clear all position classes
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1', 'gallery-item-2', 'gallery-item-3', 'gallery-item-4', 'gallery-item-5');
        });

        // Show only 5 items in proper sequence
        for (let i = 0; i < 5; i++) {
            const itemIndex = (this.currentIndex + i) % this.carouselArray.length;
            this.carouselArray[itemIndex].classList.add(`gallery-item-${i + 1}`);
        }

        // Ensure smooth transitions
        setTimeout(() => {
            updateCertificateLink();
        }, 50);
    }

    setCurrentState(direction) {
        if (direction.className === 'gallery-controls-previous' || direction === 'previous') {
            this.currentIndex = (this.currentIndex - 1 + this.carouselArray.length) % this.carouselArray.length;
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.carouselArray.length;
        }
        this.updateGallery();
    }

    setControls() {
        // Clear any existing controls first to prevent duplicates
        galleryControlsContainer.innerHTML = '';
        
        this.carouselControls.forEach(control => {
            const button = document.createElement('button');
            button.className = `gallery-controls-${control}`;
            button.innerText = control;
            galleryControlsContainer.appendChild(button);
        });
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
                // Don't reset auto-scroll after manual navigation
                // This prevents the jumping issue after clicking previous/next
            });
        });
    }

    startAutoScroll(interval = 3000) {
        this.stopAutoScroll();
        this.autoScrollInterval = setInterval(() => {
            if (!this.isHovered) {
                this.setCurrentState('next');
            }
        }, interval);
    }

    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }

    resetAutoScroll(interval = 3000) {
        this.stopAutoScroll();
        this.startAutoScroll(interval);
    }

    setupHoverControls() {
        // Only pause scrolling when hovering over the certificate link icon
        if (linkWrapper) {
            linkWrapper.addEventListener('mouseenter', () => {
                this.isHovered = true;
            });

            linkWrapper.addEventListener('mouseleave', () => {
                this.isHovered = false;
            });
        }
        
        // Also pause when hovering over the controls
        if (galleryControlsContainer) {
            galleryControlsContainer.addEventListener('mouseenter', () => {
                this.isHovered = true;
            });

            galleryControlsContainer.addEventListener('mouseleave', () => {
                this.isHovered = false;
            });
        }
    }

    init() {
        this.currentIndex = 0;
        
        this.setControls();
        this.useControls();
        this.updateGallery();
        this.startAutoScroll(3000);
        this.setupHoverControls();
        
        setTimeout(() => {
            updateCertificateLink();
        }, 100);
    }
}

// Initialize Certificate Carousel
function initializeCarousel() {
    if (galleryContainer && galleryItems.length > 0) {
        const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
        exampleCarousel.init();
        
        setTimeout(() => {
            updateCertificateLink();
        }, 200);
    }
}

// DOM Content Loaded Event Listener for Carousel
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
});

// Alternative initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCarousel);
} else {
    initializeCarousel();
}



// ========================================
// CONTACT FORM WITH SUCCESS MODAL SYSTEM + VALIDATION
// ========================================
const overlay = document.getElementById("modalOverlay");
const modal = document.getElementById("successModal");
const okButton = document.getElementById("okButton");

const form = document.getElementById("contactForm");

const mailAnim = document.getElementById("mailAnimationContainer");
const successTick = document.getElementById("successTick");

const tickSound = new Audio("assets/send-sound.mp3");

let lottieAnimation = null;
let animationComplete = false;

// Load Lottie animation
window.addEventListener("DOMContentLoaded", () => {
    lottieAnimation = lottie.loadAnimation({
        container: mailAnim,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "assets/send-email.json"
    });
});


// ERROR MESSAGE ELEMENTS
function injectErrorElements() {
    const fields = ["name", "email", "message"];
    fields.forEach(id => {
        const input = document.getElementById(id);
        let error = document.createElement("small");
        error.className = "input-error";
        error.style.color = "red";
        error.style.fontSize = "13px";
        error.style.marginTop = "4px";
        error.style.display = "none";
        input.insertAdjacentElement("afterend", error);
    });
}

injectErrorElements();

// VALIDATION FUNCTION
function validateForm() {
    let isValid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const errors = document.querySelectorAll(".input-error");
    errors.forEach(e => e.style.display = "none");

    // Validate Name
    if (name.value.trim().length < 2) {
        name.nextElementSibling.innerText = "Please enter a valid name.";
        name.nextElementSibling.style.display = "block";
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.nextElementSibling.innerText = "Please enter a valid email address.";
        email.nextElementSibling.style.display = "block";
        isValid = false;
    }

    // Validate Message
    if (message.value.trim().length < 5) {
        message.nextElementSibling.innerText = "Message must be at least 5 characters.";
        message.nextElementSibling.style.display = "block";
        isValid = false;
    }

    if (message.value.trim().length > 500) {
        message.nextElementSibling.innerText = "Message must be less than 500 characters.";
        message.nextElementSibling.style.display = "block";
        isValid = false;
    }

    return isValid;
}

// FORM SUBMISSION (NO REDIRECT)
form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Stop redirect

    if (!validateForm()) {
        return; // ❌ Do not submit if validation fails
    }

    const submitBtn = form.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const formData = new FormData(form);

    try {
        await fetch("https://formspree.io/f/xjkynddq", {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        showSuccessModal();
        form.reset();
    } catch (err) {
        alert("Something went wrong! Please try again.");
    }

    submitBtn.disabled = false;
    submitBtn.innerText = "Send Message";
});


// ===============================
// SUCCESS MODAL ANIMATION SYSTEM
// ===============================
function showSuccessModal() {
    animationComplete = false;

    overlay.classList.add("show");
    modal.classList.add("show");

    mailAnim.classList.remove("hidden");
    successTick.classList.remove("show");

    setTimeout(() => {
        lottieAnimation.goToAndStop(0, true);
        lottieAnimation.play();

        lottieAnimation.addEventListener("complete", onAnimationDone);
    }, 200);
}

function onAnimationDone() {
    if (animationComplete) return;
    animationComplete = true;

    mailAnim.classList.add("hidden");

    setTimeout(() => {
        successTick.classList.add("show");

        // 🔊 Play tick sound exactly when green tick appears
        tickSound.currentTime = 0;
        tickSound.play();
    }, 350);
}


function closeModal() {
    overlay.classList.remove("show");
    modal.classList.remove("show");

    // Reset animation states
    mailAnim.classList.remove("hidden");
    successTick.classList.remove("show");
    lottieAnimation.stop();
}

// OK button closes modal
okButton.addEventListener("click", closeModal);

// Clicking outside modal closes it
overlay.addEventListener("click", closeModal);



// ========================================
// INITIALIZATION AND EVENT HANDLERS
// ========================================

// Initialize Navigation System
function initializeNav() {
    if (document.querySelector('nav ul li a') && document.querySelector('.nav-highlight')) {
        window.modernNav = new ModernNavigation();
    }
}

// Initialize Floating Icons System
function initializeFloatingIcons() {
    if (typeof window.floatingIconsManager === 'undefined') {
        window.floatingIconsManager = new FloatingIconsManager();
    }
}

// Initialize Certificate Carousel
function initializeCarousel() {
    if (galleryContainer && galleryItems.length > 0) {
        const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
        exampleCarousel.init();
        
        setTimeout(() => {
            updateCertificateLink();
        }, 200);
    }
}

// Contact Form Button Hover Effects
function setupContactButtonEffects() {
    const button = document.querySelector('.form-group button');
    
    if (button) {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    }
}

// DOM Content Loaded Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeNav();
    initializeFloatingIcons();
    initializeCarousel();
    new ContactFormHandler();
    setupContactButtonEffects();
});

// Alternative initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeNav();
        initializeFloatingIcons();
        initializeCarousel();
    });
} else {
    initializeNav();
    initializeFloatingIcons();
    initializeCarousel();
}

// Window Event Listeners
window.addEventListener('resize', adjustSectionHeights);
window.addEventListener('load', adjustSectionHeights);