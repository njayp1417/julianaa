// Main JavaScript for Julian's Website

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    // Add beautiful animations on scroll
    initScrollAnimations();
    
    // Add prism effects
    initPrismEffects();
    
    // Add love messages
    initLoveMessages();
    
    // Add interactive elements
    initInteractiveElements();
    
    // Set current year in footer
    updateFooterYear();
    
    // Add keyboard shortcuts
    initKeyboardShortcuts();
});

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special effects for different elements
                if (entry.target.classList.contains('card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
                
                if (entry.target.classList.contains('love-card')) {
                    entry.target.style.animation = 'heartbeat 2s infinite';
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.animate, .card, .love-card, .section-title').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Prism effects
function initPrismEffects() {
    // Add prism effect to cards
    document.querySelectorAll('.card, .game-card, .song-card').forEach(card => {
        card.classList.add('prism-effect');
        
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'prismShine 2s ease-in-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });
}

// Love messages system
function initLoveMessages() {
    const loveMessages = [
        "Juliana, you make every day brighter! 💜",
        "My beautiful queen, you're amazing! 👑",
        "Your smile lights up my world! ✨",
        "I believe in your dreams completely! 🌟",
        "You're my everything, Juliana! ❤️",
        "Your intelligence inspires me daily! 🧠",
        "Future Solicitor Juliana! So proud! ⚖️",
        "You're absolutely gorgeous! 🌹",
        "My heart belongs to you! 💖",
        "Together forever, my love! 💍"
    ];
    
    // Show random love message every 30 seconds
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 30 seconds
            showFloatingLoveMessage();
        }
    }, 30000);
    
    function showFloatingLoveMessage() {
        const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
        const messageDiv = document.createElement('div');
        messageDiv.className = 'floating-love-message';
        messageDiv.textContent = message;
        
        // Random position
        const side = Math.random() < 0.5 ? 'left' : 'right';
        const topPosition = Math.random() * 50 + 20; // 20-70% from top
        
        messageDiv.style.cssText = `
            position: fixed;
            ${side}: -300px;
            top: ${topPosition}%;
            background: linear-gradient(135deg, var(--primary), var(--accent-light));
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            box-shadow: var(--shadow-hover);
            z-index: 1000;
            font-weight: 600;
            font-size: 0.9rem;
            animation: floatAcross 8s ease-in-out forwards;
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Remove after animation
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 8000);
    }
}

// Interactive elements
function initInteractiveElements() {
    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add hover effects to navigation
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add parallax effect to hero sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Update footer year
function updateFooterYear() {
    const yearElements = document.querySelectorAll('#currentYear, .copyright');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        if (element.id === 'currentYear') {
            element.textContent = currentYear;
        }
    });
}

// Keyboard shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + specific keys for navigation
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    window.location.href = 'index.html';
                    break;
                case '2':
                    e.preventDefault();
                    window.location.href = 'gallery.html';
                    break;
                case '3':
                    e.preventDefault();
                    window.location.href = 'solicitor.html';
                    break;
                case '4':
                    e.preventDefault();
                    window.location.href = 'music.html';
                    break;
                case '5':
                    e.preventDefault();
                    window.location.href = 'games.html';
                    break;
            }
        }
        
        // Special love message shortcut
        if (e.key === 'l' && e.shiftKey && e.ctrlKey) {
            e.preventDefault();
            showSpecialLoveMessage();
        }
    });
}

// Special love message
function showSpecialLoveMessage() {
    const specialMessage = "Juliana, you are the most incredible woman I've ever known. Your beauty, intelligence, kindness, and strength inspire me every single day. I am so grateful to have you in my life, and I can't wait to spend forever loving you. You are my queen, my heart, my everything. 💜👑✨";
    
    const messageModal = document.createElement('div');
    messageModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(106, 27, 154, 0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
    `;
    
    const messageContent = document.createElement('div');
    messageContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 20px;
        max-width: 600px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: heartbeat 2s infinite;
    `;
    
    messageContent.innerHTML = `
        <h2 style="color: var(--primary); margin-bottom: 1.5rem; font-size: 2rem;">
            💜 Special Message for Juliana 💜
        </h2>
        <p style="color: var(--text); font-size: 1.2rem; line-height: 1.6; margin-bottom: 2rem;">
            ${specialMessage}
        </p>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="background: var(--primary); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; font-size: 1.1rem; cursor: pointer;">
            Close with Love ❤️
        </button>
    `;
    
    messageModal.appendChild(messageContent);
    document.body.appendChild(messageModal);
    
    // Auto-close after 15 seconds
    setTimeout(() => {
        if (messageModal.parentNode) {
            messageModal.parentNode.removeChild(messageModal);
        }
    }, 15000);
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        info: 'var(--primary)',
        success: 'var(--success)',
        error: 'var(--error)',
        love: 'linear-gradient(135deg, var(--primary), var(--accent-light))'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-hover);
        z-index: 2000;
        font-weight: 600;
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 4s forwards;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Add CSS animations
const mainCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes floatAcross {
    0% {
        transform: translateX(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateX(calc(100vw + 300px));
        opacity: 0;
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes heartbeat {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.floating-love-message {
    animation: floatAcross 8s ease-in-out forwards;
}

/* Smooth scrolling for all browsers */
html {
    scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: var(--bg);
}

::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--primary-dark);
}

/* Selection color */
::selection {
    background: var(--accent-light);
    color: var(--primary-dark);
}

::-moz-selection {
    background: var(--accent-light);
    color: var(--primary-dark);
}
`;

const mainStyle = document.createElement('style');
mainStyle.textContent = mainCSS;
document.head.appendChild(mainStyle);

// Mobile menu functionality
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const body = document.body;
    
    nav.classList.toggle('active');
    body.classList.toggle('mobile-menu-open');
}

// Love quotes carousel
let currentQuoteIndex = 1;

function currentQuote(n) {
    showQuote(currentQuoteIndex = n);
}

function showQuote(n) {
    const quotes = document.querySelectorAll('.quote');
    const dots = document.querySelectorAll('.dot');
    
    if (n > quotes.length) currentQuoteIndex = 1;
    if (n < 1) currentQuoteIndex = quotes.length;
    
    quotes.forEach(quote => quote.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (quotes[currentQuoteIndex - 1]) {
        quotes[currentQuoteIndex - 1].classList.add('active');
    }
    if (dots[currentQuoteIndex - 1]) {
        dots[currentQuoteIndex - 1].classList.add('active');
    }
}

// Auto-advance quotes
setInterval(() => {
    currentQuoteIndex++;
    showQuote(currentQuoteIndex);
}, 5000);

// Inspiration carousel
let currentInspirationIndex = 0;

function nextInspiration() {
    const quotes = document.querySelectorAll('.inspiration-quote');
    quotes[currentInspirationIndex].classList.remove('active');
    currentInspirationIndex = (currentInspirationIndex + 1) % quotes.length;
    quotes[currentInspirationIndex].classList.add('active');
}

function previousInspiration() {
    const quotes = document.querySelectorAll('.inspiration-quote');
    quotes[currentInspirationIndex].classList.remove('active');
    currentInspirationIndex = currentInspirationIndex === 0 ? quotes.length - 1 : currentInspirationIndex - 1;
    quotes[currentInspirationIndex].classList.add('active');
}

// Auto-advance inspiration quotes
setInterval(() => {
    nextInspiration();
}, 4000);

// Welcome message for Juliana
setTimeout(() => {
    showNotification("Welcome to your special website, my beautiful Juliana! 💜", 'love');
}, 1000);

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const nav = document.getElementById('mainNav');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
    }
});