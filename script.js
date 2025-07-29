// ----------- Skill Section ----------------

// Floating Icons Animation System - Fixed Version
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
        
        // Tech stack icons mapping
        this.techIcons = [
            // Full Stack Development
            { icon: 'devicon-html5-plain colored', name: 'HTML' },
            { icon: 'devicon-css3-plain colored', name: 'CSS' },
            { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
            { icon: 'devicon-django-plain', name: 'Django' },
            { icon: 'devicon-djangorest-plain', name: 'Django REST Framework' },
            { icon: 'devicon-flask-original-wordmark colored', name: 'Flask' },
            { icon: 'devicon-fastapi-plain-wordmark', name: 'FastAPI' },
            { icon: 'devicon-mysql-plain-wordmark colored', name: 'MySQL' },
            { icon: 'devicon-mongodb-plain-wordmark colored', name: 'MongoDB' },
            { icon: 'devicon-postgresql-plain', name: 'PostgreSQL' },
            { icon: 'devicon-sqlite-plain', name: 'SQLite' },
            { icon: 'devicon-sqlalchemy-plain', name: 'SQLAlchemy' },
            
            // AI & Data Engineering
            { icon: 'devicon-numpy-original', name: 'NumPy' },
            { icon: 'devicon-pandas-original', name: 'Pandas' },
            { icon: 'devicon-matplotlib-plain', name: 'Matplotlib' },
            { icon: 'devicon-seaborn-original', name: 'Seaborn' },
            { icon: 'devicon-plotly-plain-wordmark', name: 'Plotly' },
            { icon: 'devicon-scikitlearn-plain', name: 'Scikit-learn' },
            { icon: 'devicon-apacheairflow-plain-wordmark', name: 'Apache Airflow' },
            { icon: 'devicon-powerbi-plain', name: 'Power BI' },
            { icon: 'devicon-hadoop-plain', name: 'Hadoop' },
            { icon: 'devicon-apachespark-plain-wordmark', name: 'Spark' },
            { icon: 'devicon-apachekafka-plain-wordmark', name: 'Kafka' },
            { icon: 'devicon-apachenifi-plain-wordmark', name: 'NiFi' },
            { icon: 'devicon-talend-plain', name: 'Talend' },
            { icon: 'devicon-dbt-plain-wordmark', name: 'dbt' },
            { icon: 'devicon-hive-plain', name: 'Hive' },
            { icon: 'devicon-apacheflink-plain', name: 'Flink' },

            // Tools & Technologies
            { icon: 'devicon-c-plain', name: 'C' },
            { icon: 'devicon-python-plain colored', name: 'Python' },
            { icon: 'devicon-scala-plain-wordmark colored', name: 'Scala' },
            { icon: 'devicon-bash-plain colored', name: 'Bash' },
            { icon: 'devicon-azuresqldatabase-plain', name: 'SQL' },
            { icon: 'devicon-git-plain colored', name: 'Git' },
            { icon: 'devicon-github-original-wordmark colored', name: 'GitHub' },
            { icon: 'devicon-googlecloud-plain-wordmark', name: 'GCP' },
            { icon: 'devicon-amazonwebservices-plain-wordmark', name: 'AWS' },
            { icon: 'fas fa-snowflake', name: 'Snowflake' },
            { icon: 'devicon-docker-plain-wordmark colored', name: 'Docker' },
            { icon: 'devicon-kubernetes-plain colored', name: 'Kubernetes' },
            { icon: 'devicon-grafana-plain-wordmark', name: 'Grafana' }
        ];
        
        this.init();
    }
    
    init() {
        console.log('FloatingIconsManager: Initializing...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        console.log('FloatingIconsManager: Setting up...');
        
        // Find elements
        this.container = document.querySelector('.floating-icons-container');
        this.skillsSection = document.getElementById('Skills');
        
        if (!this.container) {
            console.warn('FloatingIconsManager: .floating-icons-container not found');
            return;
        }
        
        if (!this.skillsSection) {
            console.warn('FloatingIconsManager: #Skills section not found');
            return;
        }
        
        console.log('FloatingIconsManager: Elements found, starting animation');
        
        // Initialize available icons
        this.resetAvailableIcons();
        
        // Start animation
        setTimeout(() => {
            this.startAnimation();
        }, 1000);
    }
    
    resetAvailableIcons() {
        this.availableIcons = [...this.techIcons];
        this.shuffleArray(this.availableIcons);
        console.log('Available icons:', this.availableIcons.length);
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    startAnimation() {
        console.log('FloatingIconsManager: Starting animation...');
        this.isAnimating = true;
        this.animateNextIcon();
    }
    
    animateNextIcon() {
        if (!this.isAnimating) return;
        
        console.log(`Active icons: ${this.activeIcons.size}/${this.maxActiveIcons}`);
        
        // Check if we have space for more icons
        if (this.activeIcons.size >= this.maxActiveIcons) {
            this.animationInterval = setTimeout(() => {
                this.animateNextIcon();
            }, 500);
            return;
        }
        
        // Get next unique icon
        const iconData = this.getNextUniqueIcon();
        if (!iconData || this.activeIcons.has(iconData.name)) {
            this.animationInterval = setTimeout(() => {
                this.animateNextIcon();
            }, 500);
            return;
        }
        
        console.log('Creating icon:', iconData.name);
        
        // Create and animate icon
        this.createFloatingIcon(iconData);
        
        // Schedule next icon
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
        
        // Get safe position - simplified approach
        const position = this.getSimpleSafePosition();
        if (!position) {
            console.warn('No safe position found for icon:', iconData.name);
            return;
        }
        
        console.log(`Placing ${iconData.name} at position:`, position);
        
        // Mark as active
        this.activeIcons.set(iconData.name, position);
        
        // Set position
        icon.style.left = position.x + 'px';
        icon.style.top = position.y + 'px';
        icon.style.position = 'absolute';
        
        // Add to container
        this.container.appendChild(icon);
        
        console.log('Icon added to DOM:', iconData.name);
        
        // Animate entrance
        setTimeout(() => {
            icon.classList.add('show', 'floating');
            console.log('Icon animated in:', iconData.name);
        }, 100);
        
        // Schedule removal
        setTimeout(() => {
            this.removeIcon(icon, iconData, position);
        }, 4000);
    }
    
    removeIcon(icon, iconData, position) {
        console.log('Removing icon:', iconData.name);
        
        icon.classList.remove('show', 'floating');
        icon.classList.add('hide');
        
        setTimeout(() => {
            if (icon.parentNode) {
                icon.parentNode.removeChild(icon);
            }
            this.activeIcons.delete(iconData.name);
            this.markPositionAsRecentlyUsed(position);
            console.log('Icon removed:', iconData.name);
        }, 800);
    }
    
    getSimpleSafePosition() {
        const containerRect = this.skillsSection.getBoundingClientRect();
        const iconSize = 60; // Reduced for smaller icons
        
        // Define specific safe areas: above cards, left/right of title, below nav
        const safeAreas = [
            // Left side of skill title (below nav, above cards)
            { x: 50, y: 180, width: 200, height: 120 },
            
            // Right side of skill title (below nav, above cards)  
            { x: containerRect.width - 250, y: 180, width: 200, height: 120 },
            
            // Above skill cards - left area
            { x: 20, y: 250, width: 150, height: 100 },
            
            // Above skill cards - right area
            { x: containerRect.width - 170, y: 250, width: 150, height: 100 },
            
            // Between skill title and cards - center left
            { x: containerRect.width * 0.2, y: 200, width: 120, height: 80 },
            
            // Between skill title and cards - center right
            { x: containerRect.width * 0.8 - 120, y: 200, width: 120, height: 80 },
            
            // Far left edge (beside the whole section)
            { x: 10, y: 300, width: 80, height: 200 },
            
            // Far right edge (beside the whole section)
            { x: containerRect.width - 90, y: 300, width: 80, height: 200 }
        ];
        
        // Try each safe area randomly
        const shuffledAreas = [...safeAreas].sort(() => Math.random() - 0.5);
        
        for (let area of shuffledAreas) {
            for (let attempt = 0; attempt < 3; attempt++) {
                const position = {
                    x: area.x + Math.random() * (area.width - iconSize),
                    y: area.y + Math.random() * (area.height - iconSize)
                };
                
                // Ensure position is within bounds
                position.x = Math.max(10, Math.min(position.x, containerRect.width - iconSize - 10));
                position.y = Math.max(150, Math.min(position.y, containerRect.height - iconSize - 10));
                
                if (this.isPositionSafe(position)) {
                    return position;
                }
            }
        }
        
        // Fallback: simple position in top area
        return {
            x: Math.random() * (containerRect.width - iconSize - 100) + 50,
            y: 180 + Math.random() * 120 // Between nav and cards
        };
    }
    
    isPositionSafe(position) {
        const minDistance = 80; // Reduced for smaller icons
        
        // Check distance from other active icons
        for (let [iconName, activePosition] of this.activeIcons) {
            const distance = Math.sqrt(
                Math.pow(position.x - activePosition.x, 2) + 
                Math.pow(position.y - activePosition.y, 2)
            );
            
            if (distance < minDistance) {
                return false;
            }
        }
        
        // Check recently used positions
        const currentTime = Date.now();
        const positionKey = `${Math.floor(position.x / 50)}-${Math.floor(position.y / 50)}`; // Smaller grid
        
        if (this.usedPositions.has(positionKey)) {
            const lastUsed = this.usedPositions.get(positionKey);
            if (currentTime - lastUsed < 2000) { // 2 second cooldown
                return false;
            }
        }
        
        return true;
    }
    
    markPositionAsRecentlyUsed(position) {
        const positionKey = `${Math.floor(position.x / 50)}-${Math.floor(position.y / 50)}`;
        this.usedPositions.set(positionKey, Date.now());
        
        // Clean up old positions
        const currentTime = Date.now();
        for (let [key, time] of this.usedPositions) {
            if (currentTime - time > 8000) { // 8 seconds
                this.usedPositions.delete(key);
            }
        }
    }
    
    getRandomDelay() {
        return Math.random() * 800 + 500; // 0.5 to 1.3 seconds
    }
}

// Initialize the floating icons system
console.log('Loading FloatingIconsManager...');

// Multiple initialization approaches to ensure it works
function initializeFloatingIcons() {
    console.log('Initializing FloatingIconsManager...');
    if (typeof window.floatingIconsManager === 'undefined') {
        window.floatingIconsManager = new FloatingIconsManager();
    }
}

// Try immediate initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFloatingIcons);
} else {
    initializeFloatingIcons();
}

// Fallback initialization after a delay
setTimeout(initializeFloatingIcons, 2000);

// Also try when window loads
window.addEventListener('load', initializeFloatingIcons);










// -------------- Certificate Section --------------
const certificateLinks = {
    'Aviatrix_cloud.jpg': 'https://www.credly.com/badges/b2f8b061-fe9f-46d3-b8c9-872d2d541fa7/public_url',
    'Python_Udemy.jpg': 'https://www.udemy.com/certificate/UC-557254a0-542b-4267-b52d-91782195d9af/', 
    'Google_Cloud_Fundamentals.png': 'https://www.cloudskillsboost.google/public_profiles/9e676916-e61f-4c0e-a880-fac5df24540b/badges/15555915',
    'Python_HackerRank.png': 'https://www.hackerrank.com/certificates/iframe/4fee9a38240c',
    'Introduction to AI_page-0001.jpg': 'https://your-ai-certificate-link.com',
    'Introduction to NLP_page-0001.jpg': 'https://your-nlp-certificate-link.com'
};

// Certificates Section Script
const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');
const linkIcon = document.getElementById('certificateLink');
const linkWrapper = document.querySelector('.certificate-link-wrapper');
const certificatesSection = document.getElementById('Certificates');

// Function to update the link for the center certificate
function updateCertificateLink() {
    const centerCertificate = document.querySelector('.gallery-item-3');
    if (centerCertificate && linkIcon && linkWrapper) {
        const certificateImageSrc = centerCertificate.src;
        const imageName = certificateImageSrc.split('/').pop(); // Get filename
        const certificateLink = certificateLinks[imageName] || '#';
        
        // Show the link icon
        certificatesSection.classList.add('show-link-icon');
        
        // Update the click handler
        linkIcon.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (certificateLink !== '#') {
                window.open(certificateLink, '_blank');
            } else {
                console.log('No link found for:', imageName);
            }
        };
        
        // Add hover effect to show which certificate will be opened
        linkIcon.title = `Open ${centerCertificate.alt}`;
        
        console.log('Link updated for:', imageName, 'Link:', certificateLink);
    } else {
        // Hide the link icon if no center certificate
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
    }

    updateGallery() {
        // Remove all position classes
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
        });

        // Add position classes to visible items
        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i + 1}`);
        });

        // Update certificate link for the center item with a small delay
        setTimeout(() => {
            updateCertificateLink();
        }, 50);
    }

    setCurrentState(direction) {
        if (direction.className === 'gallery-controls-previous' || direction === 'previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls() {
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
                this.resetAutoScroll();
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
        // Pause auto-scroll when hovering over gallery container
        this.carouselContainer.addEventListener('mouseenter', () => {
            this.isHovered = true;
        });

        this.carouselContainer.addEventListener('mouseleave', () => {
            this.isHovered = false;
        });

        // Also pause when hovering over controls
        galleryControlsContainer.addEventListener('mouseenter', () => {
            this.isHovered = true;
        });

        galleryControlsContainer.addEventListener('mouseleave', () => {
            this.isHovered = false;
        });

        // Pause when hovering over link icon
        if (linkWrapper) {
            linkWrapper.addEventListener('mouseenter', () => {
                this.isHovered = true;
            });

            linkWrapper.addEventListener('mouseleave', () => {
                this.isHovered = false;
            });
        }
    }

    init() {
        this.setControls();
        this.useControls();
        this.updateGallery();
        this.startAutoScroll(3000);
        this.setupHoverControls();
        
        // Force initial link update
        setTimeout(() => {
            updateCertificateLink();
        }, 100);
    }
}

// Initialize everything when DOM is ready
function initializeCarousel() {
    if (galleryContainer && galleryItems.length > 0) {
        const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);
        exampleCarousel.init();
        
        // Double-check link icon visibility
        setTimeout(() => {
            updateCertificateLink();
            console.log('Carousel initialized and link icon should be visible');
        }, 200);
    } else {
        console.error('Gallery container or items not found');
    }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCarousel);
} else {
    initializeCarousel();
}

// Additional check after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        updateCertificateLink();
    }, 500);
});







// ------------ Contact Form Script -------------
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        alert("Thank you! I'll get back to you as soon as possible.");
        form.reset();
    } else {
        alert('Oops! There was a problem submitting your Contact form.');
    }
});