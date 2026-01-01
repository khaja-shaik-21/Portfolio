// ========================================
// NEW YEAR 2026 BANNER SYSTEM
// ========================================

class NewYearBanner {
    constructor() {
        this.banner = document.getElementById('newYearBanner');
        this.closeBtn = document.getElementById('closeBanner');
        this.fireworksContainer = document.getElementById('fireworksContainer');
        this.confettiContainer = document.getElementById('confettiContainer');
        this.autoCloseTime = 5000; // 5 seconds
        this.fireworkInterval = null;
        this.confettiInterval = null;
        
        this.init();
    }

    init() {
        if (!this.banner) return;
        
        // Start effects immediately
        this.startFireworks();
        this.startConfetti();
        
        // Close button handler
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.closeBanner();
            });
        }
        
        // Auto close after 5 seconds
        setTimeout(() => {
            this.closeBanner();
        }, this.autoCloseTime);
    }

    startFireworks() {
        // Create initial burst
        this.createFirework();
        
        // Continue creating fireworks
        this.fireworkInterval = setInterval(() => {
            this.createFirework();
        }, 600);
    }

    createFirework() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', 
                       '#00ffff', '#ff6600', '#ff0099', '#00ff99', '#ffd700'];
        
        // Random position
        const x = Math.random() * (window.innerWidth - 100) + 50;
        const y = Math.random() * (window.innerHeight * 0.6) + 50;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Create multiple sparks for explosion effect
        const sparkCount = 30;
        
        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'firework';
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            spark.style.background = color;
            
            // Random direction for each spark
            const angle = (Math.PI * 2 * i) / sparkCount;
            const velocity = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            spark.style.setProperty('--tx', tx + 'px');
            spark.style.setProperty('--ty', ty + 'px');
            
            this.fireworksContainer.appendChild(spark);
            
            // Remove spark after animation
            setTimeout(() => {
                spark.remove();
            }, 1500);
        }
    }

    startConfetti() {
        // Create confetti continuously
        this.confettiInterval = setInterval(() => {
            this.createConfetti();
        }, 100);
    }

    createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', 
                       '#00ffff', '#ff6600', '#ffd700'];
        
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        // Random shape (square or rectangle)
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        this.confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }

    closeBanner() {
        // Stop creating new effects
        clearInterval(this.fireworkInterval);
        clearInterval(this.confettiInterval);
        
        // Fade out banner
        this.banner.classList.add('fade-out');
        
        // Remove banner from DOM after fade
        setTimeout(() => {
            if (this.banner && this.banner.parentNode) {
                this.banner.parentNode.removeChild(this.banner);
            }
        }, 1000);
    }
}

// Initialize New Year Banner when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NewYearBanner();
});

// Alternative initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NewYearBanner();
    });
} else {
    new NewYearBanner();
}