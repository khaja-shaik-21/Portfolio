// Certificate links mapping - UPDATE THESE WITH YOUR ACTUAL CERTIFICATE LINKS
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







// Contact Form Script
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