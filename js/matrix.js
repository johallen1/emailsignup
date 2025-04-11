/**
 * Matrix Code Rain Effect for The We Three Coaching Business
 * 
 * This script creates a Matrix-style falling code animation on the canvas background
 * and handles additional visual effects including:
 * 1. Glitch text effect for elements with the 'glitch-text' class
 * 2. Typing animation for elements with the 'typing' class
 * 3. Scroll animations for sections and cards
 * 4. Mobile menu toggle functionality
 * 
 * @author The We Three
 * @version 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    /**
     * Sets canvas dimensions to match window size
     * Called on load and window resize
     */
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Initialize canvas size
    resizeCanvas();
    
    // Update canvas size when window is resized
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters - using a mix of characters for a hacker feel
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    
    // Font size and columns
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops = [];
    
    /**
     * Initialize all columns to start at random positions outside the screen
     * This creates a staggered falling effect
     */
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
    }
    
    /**
     * Main drawing function for the Matrix rain effect
     * Creates a semi-transparent fade effect and renders falling characters
     */
    function draw() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(30, 30, 30, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set the color and font for the characters
        ctx.fillStyle = '#00FF00'; // Matrix green
        ctx.font = `${fontSize}px monospace`;
        
        // Loop through each column
        for (let i = 0; i < drops.length; i++) {
            // Choose a random character
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Move the drop down
            drops[i]++;
            
            // Reset the drop when it reaches the bottom or randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = Math.floor(Math.random() * -100);
            }
        }
    }
    
    // Animate at approximately 30fps
    setInterval(draw, 33);
    
    /**
     * Add glitch text effect to elements with the 'glitch-text' class
     * Uses the data-text attribute for the glitch effect
     */
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        const content = text.textContent;
        text.setAttribute('data-text', content);
    });
    
    /**
     * Add typing effect to elements with the 'typing' class
     * Creates a typewriter-style animation
     */
    const typingElements = document.querySelectorAll('.typing');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    });
});

/**
 * Scroll Animations
 * 
 * Adds 'visible' class to elements when they enter the viewport
 * Used for fade-in and slide-in animations
 */
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe all cards for scroll animations
    document.querySelectorAll('.coach-card, .pricing-card, .timeline-item').forEach(card => {
        observer.observe(card);
    });
});

/**
 * Mobile Menu Toggle
 * 
 * Creates and manages a hamburger menu for mobile devices
 * Dynamically adds/removes the menu toggle based on screen width
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create the menu toggle button with three spans (hamburger icon)
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('nav');
    const header = document.querySelector('header .container');
    
    // Add mobile menu toggle if on small screen
    if (window.innerWidth <= 768) {
        header.appendChild(menuToggle);
        nav.classList.add('mobile-nav');
    }
    
    /**
     * Handle responsive menu on window resize
     * Adds or removes mobile menu elements based on screen width
     */
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && !document.querySelector('.menu-toggle')) {
            // Add mobile menu for small screens
            header.appendChild(menuToggle);
            nav.classList.add('mobile-nav');
        } else if (window.innerWidth > 768 && document.querySelector('.menu-toggle')) {
            // Remove mobile menu for larger screens
            document.querySelector('.menu-toggle').remove();
            nav.classList.remove('mobile-nav');
            nav.classList.remove('active');
        }
    });
    
    /**
     * Toggle mobile menu when hamburger icon is clicked
     */
    document.addEventListener('click', function(e) {
        if (e.target.closest('.menu-toggle')) {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        }
    });
});