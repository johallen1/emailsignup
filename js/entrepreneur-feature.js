/**
 * Entrepreneur Feature for The We Three Coaching Business
 * 
 * This script handles the interactive Business Idea Generator feature which:
 * 1. Validates and processes email submissions
 * 2. Generates random business ideas based on predefined components
 * 3. Creates dynamic elevator pitches for the generated ideas
 * 4. Provides sharing functionality for the generated business concepts
 * 
 * @author The We Three
 * @version 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Email validation and form submission components
    const emailForm = document.getElementById('email-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const featureContainer = document.getElementById('entrepreneur-feature');
    const storedEmails = [];

    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Basic email validation using regex pattern
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.style.display = 'block';
                return;
            }
            
            // Clear any previous error messages
            emailError.style.display = 'none';
            
            // Store the email (would typically send to a server)
            storedEmails.push(email);
            
            // Show the entrepreneur feature
            featureContainer.style.display = 'block';
            
            // Scroll to the feature
            featureContainer.scrollIntoView({ behavior: 'smooth' });
            
            // Reset the form
            emailForm.reset();
            
            // Generate the first business idea
            generateBusinessIdea();
        });
    }
    
    // Business idea generator components
    const ideaContainer = document.getElementById('idea-container');
    const generateButton = document.getElementById('generate-button');
    const shareButton = document.getElementById('share-button');
    
    // Arrays for business idea generation
    const industries = [
        'FinTech', 'HealthTech', 'EdTech', 'CleanTech', 'AgTech', 
        'RetailTech', 'FoodTech', 'PropTech', 'InsurTech', 'LegalTech',
        'AI Services', 'Blockchain', 'IoT Solutions', 'AR/VR', 'Robotics',
        'Cybersecurity', 'E-commerce', 'Social Media', 'Gaming', 'Streaming'
    ];
    
    const problems = [
        'inefficient processes', 'high costs', 'lack of transparency', 
        'limited access', 'poor user experience', 'data security concerns',
        'environmental impact', 'skill gaps', 'information overload',
        'fragmented markets', 'outdated systems', 'compliance challenges',
        'resource scarcity', 'supply chain disruptions', 'digital divide',
        'mental health issues', 'work-life balance', 'remote collaboration',
        'financial inclusion', 'sustainability challenges'
    ];
    
    const solutions = [
        'AI-powered platform', 'blockchain-based system', 'subscription service',
        'mobile application', 'IoT network', 'marketplace', 'SaaS solution',
        'data analytics tool', 'automation system', 'collaborative platform',
        'AR/VR experience', 'personalized assistant', 'on-demand service',
        'distributed network', 'community-driven platform', 'API integration',
        'cloud-based solution', 'predictive algorithm', 'digital twin technology',
        'smart contract system'
    ];
    
    const businessModels = [
        'Subscription', 'Freemium', 'Marketplace', 'SaaS', 'PaaS',
        'Transaction Fee', 'Advertising', 'Affiliate Marketing', 'Licensing',
        'White Label', 'Open Source + Services', 'Hardware + Software',
        'Usage-Based', 'Data Monetization', 'Franchise', 'Crowdsourcing',
        'On-Demand', 'Membership', 'Pay-Per-Use', 'Hybrid'
    ];
    
    /**
     * Generates a random business idea using the predefined arrays
     * Creates a startup name, problem statement, solution, and business model
     */
    function generateBusinessIdea() {
        // Select random elements from arrays
        const industry = industries[Math.floor(Math.random() * industries.length)];
        const problem = problems[Math.floor(Math.random() * problems.length)];
        const solution = solutions[Math.floor(Math.random() * solutions.length)];
        const businessModel = businessModels[Math.floor(Math.random() * businessModels.length)];
        
        // Generate a startup name based on the industry
        const startupName = generateStartupName(industry);
        
        // Calculate a random success probability (60-100%)
        const successProbability = Math.floor(Math.random() * 41) + 60;
        
        // Create the elevator pitch
        const elevatorPitch = `${startupName} is a ${solution} that addresses ${problem} in the ${industry} industry using a ${businessModel} model.`;
        
        // Update the UI with the generated idea
        updateIdeaDisplay(startupName, industry, problem, solution, businessModel, successProbability, elevatorPitch);
    }
    
    /**
     * Generates a startup name based on the selected industry
     * @param {string} industry - The industry for the business idea
     * @returns {string} A generated startup name
     */
    function generateStartupName(industry) {
        const prefixes = ['Nova', 'Quantum', 'Flux', 'Nexus', 'Vertex', 'Pulse', 'Echo', 'Cipher', 'Prism', 'Helix'];
        const suffixes = ['Hub', 'Labs', 'AI', 'Tech', 'X', 'Flow', 'Sync', 'Link', 'Wave', 'Mind'];
        
        // Get industry-specific word
        let industryWord = '';
        
        switch(industry) {
            case 'FinTech':
                industryWord = ['Pay', 'Cash', 'Coin', 'Bank', 'Wealth'][Math.floor(Math.random() * 5)];
                break;
            case 'HealthTech':
                industryWord = ['Health', 'Care', 'Med', 'Vital', 'Life'][Math.floor(Math.random() * 5)];
                break;
            case 'EdTech':
                industryWord = ['Learn', 'Edu', 'Mind', 'Know', 'Skill'][Math.floor(Math.random() * 5)];
                break;
            case 'CleanTech':
                industryWord = ['Green', 'Eco', 'Earth', 'Solar', 'Pure'][Math.floor(Math.random() * 5)];
                break;
            default:
                // Extract first part of industry name
                industryWord = industry.replace('Tech', '').replace(' ', '');
        }
        
        // Randomly decide name format
        const format = Math.floor(Math.random() * 3);
        
        if (format === 0) {
            return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${industryWord}`;
        } else if (format === 1) {
            return `${industryWord}${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
        } else {
            return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
        }
    }
    
    /**
     * Updates the UI with the generated business idea details
     * @param {string} name - The startup name
     * @param {string} industry - The selected industry
     * @param {string} problem - The problem being solved
     * @param {string} solution - The proposed solution
     * @param {string} businessModel - The business model
     * @param {number} probability - The success probability percentage
     * @param {string} pitch - The elevator pitch
     */
    function updateIdeaDisplay(name, industry, problem, solution, businessModel, probability, pitch) {
        // Create HTML for the idea display
        const html = `
            <div class="idea-header">
                <h3 class="startup-name">${name}</h3>
                <span class="industry-tag">${industry}</span>
            </div>
            
            <div class="idea-details">
                <div class="detail-item">
                    <span class="detail-label">Problem:</span>
                    <span class="detail-value">${problem}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Solution:</span>
                    <span class="detail-value">${solution}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Business Model:</span>
                    <span class="detail-value">${businessModel}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Success Probability:</span>
                    <div class="probability-bar-container">
                        <div class="probability-bar" style="width: 0%"></div>
                        <span class="probability-value">0%</span>
                    </div>
                </div>
            </div>
            
            <div class="elevator-pitch">
                <h4>Elevator Pitch:</h4>
                <div class="terminal">
                    <div class="terminal-header">
                        <span class="terminal-button"></span>
                        <span class="terminal-button"></span>
                        <span class="terminal-button"></span>
                        <span class="terminal-title">startup-pitch.sh</span>
                    </div>
                    <div class="terminal-body">
                        <span class="terminal-prompt">$</span>
                        <span class="terminal-text"></span>
                        <span class="terminal-cursor">_</span>
                    </div>
                </div>
            </div>
        `;
        
        // Update the container with the new idea
        ideaContainer.innerHTML = html;
        
        // Animate the probability bar
        setTimeout(() => {
            const bar = document.querySelector('.probability-bar');
            const value = document.querySelector('.probability-value');
            
            bar.style.width = `${probability}%`;
            
            // Color based on probability
            if (probability >= 80) {
                bar.style.backgroundColor = 'var(--success-color)';
            } else if (probability >= 70) {
                bar.style.backgroundColor = 'var(--primary-color)';
            } else {
                bar.style.backgroundColor = 'var(--warning-color)';
            }
            
            // Animate the percentage counter
            let currentValue = 0;
            const interval = setInterval(() => {
                currentValue++;
                value.textContent = `${currentValue}%`;
                
                if (currentValue >= probability) {
                    clearInterval(interval);
                }
            }, 20);
        }, 300);
        
        // Type out the elevator pitch
        setTimeout(() => {
            const terminalText = document.querySelector('.terminal-text');
            let i = 0;
            
            const typeInterval = setInterval(() => {
                if (i < pitch.length) {
                    terminalText.textContent += pitch.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    
                    // Make cursor blink after typing is complete
                    const cursor = document.querySelector('.terminal-cursor');
                    cursor.classList.add('blink');
                }
            }, 30);
        }, 1000);
    }
    
    // Event listener for the generate button
    if (generateButton) {
        generateButton.addEventListener('click', generateBusinessIdea);
    }
    
    // Event listener for the share button
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            // Get the current startup name and pitch
            const startupName = document.querySelector('.startup-name')?.textContent || 'My Startup Idea';
            const pitch = document.querySelector('.terminal-text')?.textContent || '';
            
            // Create the shareable text
            const shareText = `Check out this startup idea from The We Three: ${startupName} - ${pitch}`;
            
            // Try to use the Web Share API if available
            if (navigator.share) {
                navigator.share({
                    title: `Startup Idea: ${startupName}`,
                    text: shareText,
                    url: window.location.href
                }).catch(err => {
                    console.error('Error sharing:', err);
                    copyToClipboard(shareText);
                });
            } else {
                // Fall back to clipboard copy
                copyToClipboard(shareText);
            }
        });
    }
    
    /**
     * Copies text to the clipboard and shows a notification
     * @param {string} text - The text to copy to clipboard
     */
    function copyToClipboard(text) {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        
        // Select and copy the text
        textarea.select();
        document.execCommand('copy');
        
        // Remove the textarea
        document.body.removeChild(textarea);
        
        // Show a notification
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = 'Copied to clipboard!';
        document.body.appendChild(notification);
        
        // Remove the notification after a delay
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 2000);
    }
});