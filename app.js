// app.js

// State variables
let currentRole = null;
let currentStep = null;
let userXP = 0;
let currentLevel = 1;
const XP_PER_LEVEL = 100;

// DOM Elements
// Initialization
const startModal = document.getElementById('start-modal');
const roleCards = document.querySelectorAll('.role-card');
const chatHistory = document.getElementById('chat-history');
const optionsContainer = document.getElementById('options-container');
const xpBar = document.getElementById('xp-bar');
const currentXpEl = document.getElementById('current-xp');
const nextLevelXpEl = document.getElementById('next-level-xp');
const currentLevelEl = document.getElementById('current-level');
const levelTitleEl = document.getElementById('level-title');

// Level Titles
const levelTitles = [
    'Novice Citizen',
    'Informed Voter',
    'Civic Leader',
    'Democracy Champion'
];

// Initialize
function init() {
    // Add event listeners to role cards
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            const role = card.getAttribute('data-role');
            startRoleplay(role);
        });
    });

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            
            // Close all other accordions
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle the clicked one
            item.classList.toggle('active');
        });
    });
}

function updateProgress(xpGained) {
    userXP += xpGained;
    
    // Check level up
    if (userXP >= XP_PER_LEVEL * currentLevel) {
        currentLevel++;
        userXP = userXP - (XP_PER_LEVEL * (currentLevel - 1)); // Keep remainder
        // Level up animation or notification could go here
    }

    const percentage = Math.min(100, (userXP / (XP_PER_LEVEL * currentLevel)) * 100);
    
    xpBar.style.width = `${percentage}%`;
    currentXpEl.textContent = userXP;
    nextLevelXpEl.textContent = XP_PER_LEVEL * currentLevel;
    currentLevelEl.textContent = currentLevel;
    
    // Update title
    const titleIndex = Math.min(currentLevel - 1, levelTitles.length - 1);
    levelTitleEl.textContent = levelTitles[titleIndex];
}

function renderMessage(speaker, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${speaker}`;
    
    // Format text (simple bold parsing for Markdown **text**)
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    let heading = '';
    if (speaker === 'assistant') heading = '<h3>Assistant</h3>';
    if (speaker === 'user') heading = '<h3>You</h3>';
    if (speaker === 'system') heading = '<h3>System</h3>';
    
    msgDiv.innerHTML = `${heading}<p>${formattedText}</p>`;
    chatHistory.appendChild(msgDiv);
    
    // Scroll to bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function renderOptions(options) {
    optionsContainer.innerHTML = ''; // Clear previous options
    
    options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span>${opt.text}</span> <span>→</span>`;
        btn.style.animationDelay = `${index * 0.1}s`;
        
        btn.addEventListener('click', () => {
            handleOptionSelect(opt);
        });
        
        optionsContainer.appendChild(btn);
    });
}

function handleOptionSelect(option) {
    // Render user choice as a message
    renderMessage('user', option.text);
    
    // Update XP
    if (option.xp) {
        updateProgress(option.xp);
    }
    
    // Check if role is switching (from Results screen)
    if (option.role) {
        // Switch role and restart
        startRoleplay(option.role);
        return;
    }

    // Load next step
    setTimeout(() => {
        loadStep(option.next);
    }, 600); // Small delay to simulate thinking/transition
}

function startRoleplay(role) {
    currentRole = role;
    startModal.classList.add('hidden');
    
    // Clear chat
    chatHistory.innerHTML = '';
    
    // Reset or keep XP depending on design. Let's keep it to reward playing both.
    // userXP = 0;
    // updateProgress(0);
    
    loadStep('start');
}

function loadStep(stepKey) {
    currentStep = stepKey;
    const stepData = gameData[currentRole][stepKey];
    
    if (!stepData) {
        console.error(`Step ${stepKey} not found for role ${currentRole}`);
        return;
    }
    
    renderMessage(stepData.speaker, stepData.text);
    
    if (stepData.options && stepData.options.length > 0) {
        renderOptions(stepData.options);
    } else {
        optionsContainer.innerHTML = '';
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
