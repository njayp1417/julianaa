// Games JavaScript

let currentGame = null;
let gameScore = 0;
let gameTimer = 0;
let gameInterval = null;

// Love messages for Julian
const loveMessages = [
    "Juliana, you are the most beautiful woman in the world, and I fall in love with you more every single day. Your smile lights up my entire universe. 💜",
    "My dearest Juliana, your intelligence amazes me, your kindness inspires me, and your love completes me. You are my everything. ❤️",
    "Every morning I wake up grateful that you're in my life. You make every day brighter just by being you, my beautiful queen. ✨",
    "Juliana, your dreams of becoming a solicitor fill me with pride. I believe in you completely and will support you always. 🌟",
    "You are not just my girlfriend, you are my best friend, my soulmate, my future. I love you beyond words, my precious Juliana. 💖",
    "Your laugh is my favorite sound, your happiness is my greatest joy. Thank you for being the amazing woman you are. 💕",
    "Juliana, you are strong, brilliant, beautiful, and perfect in every way. Never doubt how incredible you are, my love. 🦋",
    "I promise to love you, support your dreams, and cherish every moment we have together. You are my forever, Juliana. 💍",
    "Your beauty radiates from within and without. You are absolutely stunning, inside and out, my gorgeous Juliana. 🌹",
    "Every day with you is a blessing. I can't wait to build our beautiful future together, my queen. 🏰"
];

// Quiz questions about love and relationship
const loveQuizQuestions = [
    {
        question: "What is my favorite thing about Julian?",
        options: ["Her beautiful smile", "Her intelligence", "Her kindness", "Everything about her"],
        correct: 3,
        explanation: "I love everything about you, Julian! You are perfect in every way. 💜"
    },
    {
        question: "What do I call Julian most often?",
        options: ["My love", "My queen", "My beautiful", "All of the above"],
        correct: 3,
        explanation: "You are my love, my queen, my beautiful everything! 👑"
    },
    {
        question: "What is Julian's biggest dream?",
        options: ["To travel the world", "To become a solicitor", "To be famous", "To be rich"],
        correct: 1,
        explanation: "Your dream of becoming a solicitor inspires me every day! I believe in you completely. ⚖️"
    },
    {
        question: "How much do I love Julian?",
        options: ["A lot", "More than anything", "To infinity", "Beyond measure"],
        correct: 3,
        explanation: "My love for you is beyond measure, infinite, and grows stronger every day! ∞"
    },
    {
        question: "What makes Julian special?",
        options: ["Her beauty", "Her intelligence", "Her heart", "All of these and more"],
        correct: 3,
        explanation: "You are special in every possible way, my amazing Julian! 🌟"
    }
];

// Intimate quiz questions (tasteful and loving)
const intimateQuizQuestions = [
    {
        question: "What is the most romantic thing we could do together?",
        options: ["Watch sunset together", "Dance under the stars", "Cook dinner together", "All of these"],
        correct: 3,
        explanation: "Every moment with you is romantic, my love! 💕"
    },
    {
        question: "What makes our relationship special?",
        options: ["Trust and communication", "Shared dreams", "Deep connection", "All of the above"],
        correct: 3,
        explanation: "Our love is built on trust, dreams, and deep connection! 💖"
    },
    {
        question: "How do I want to make you feel every day?",
        options: ["Loved", "Cherished", "Beautiful", "All of these"],
        correct: 3,
        explanation: "I want you to feel loved, cherished, and beautiful always! 👑"
    }
];

// Memory game data
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;

// Show game category
function showCategory(category) {
    // Hide all game sections
    document.querySelectorAll('.game-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected category
    document.getElementById(category).classList.remove('hidden');
    
    // Scroll to section
    document.getElementById(category).scrollIntoView({ behavior: 'smooth' });
}

// Enter spicy section
function enterSpicySection() {
    document.querySelector('.spicy-warning').style.display = 'none';
    document.getElementById('spicy-content').classList.remove('hidden');
    
    // Show a sweet message
    showGameMessage("Welcome to our special corner, my beautiful Julian! 😈💜");
}

// Start Memory Game
function startMemoryGame() {
    currentGame = 'memory';
    gameScore = 0;
    gameTimer = 0;
    matchedPairs = 0;
    
    // Create memory cards with heart emojis
    const symbols = ['💜', '❤️', '💖', '💕', '🌟', '✨', '🦋', '🌹'];
    memoryCards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    flippedCards = [];
    
    openGameInterface('Memory Master', createMemoryGameContent());
    startGameTimer();
}

// Create memory game content
function createMemoryGameContent() {
    let content = '<div class="memory-grid">';
    
    memoryCards.forEach((symbol, index) => {
        content += `
            <div class="memory-card" onclick="flipCard(${index})" id="card-${index}">
                <span class="card-back">💜</span>
                <span class="card-front hidden">${symbol}</span>
            </div>
        `;
    });
    
    content += '</div>';
    content += '<div class="game-info"><p>Match all the pairs to win! Click cards to flip them.</p></div>';
    
    return content;
}

// Flip memory card
function flipCard(index) {
    const card = document.getElementById(`card-${index}`);
    
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        card.querySelector('.card-back').style.display = 'none';
        card.querySelector('.card-front').classList.remove('hidden');
        
        flippedCards.push(index);
        
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Check if cards match
function checkMatch() {
    const [first, second] = flippedCards;
    const firstCard = document.getElementById(`card-${first}`);
    const secondCard = document.getElementById(`card-${second}`);
    
    if (memoryCards[first] === memoryCards[second]) {
        // Match found
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        gameScore += 10;
        
        if (matchedPairs === memoryCards.length / 2) {
            // Game won
            setTimeout(() => {
                showGameMessage("Congratulations! You have an amazing memory, my brilliant Julian! 🎉");
                generateLoveMessage();
            }, 500);
        }
    } else {
        // No match
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.querySelector('.card-back').style.display = 'block';
        secondCard.querySelector('.card-back').style.display = 'block';
        firstCard.querySelector('.card-front').classList.add('hidden');
        secondCard.querySelector('.card-front').classList.add('hidden');
    }
    
    flippedCards = [];
    updateGameScore();
}

// Start other games
function startPuzzleGame() {
    currentGame = 'puzzle';
    openGameInterface('Number Puzzle', createPuzzleGameContent());
    startGameTimer();
}

function startWordGame() {
    currentGame = 'word';
    openGameInterface('Word Wizard', createWordGameContent());
    startGameTimer();
}

function startLogicGame() {
    currentGame = 'logic';
    openGameInterface('Logic Master', createLogicGameContent());
    startGameTimer();
}

function startMathGame() {
    currentGame = 'math';
    openGameInterface('Math Genius', createMathGameContent());
    startGameTimer();
}

// Create puzzle game content
function createPuzzleGameContent() {
    return `
        <div class="puzzle-game">
            <h4>Complete the Number Sequence</h4>
            <div class="puzzle-question">
                <p>What comes next in this sequence?</p>
                <div class="sequence">2, 4, 8, 16, ?</div>
                <div class="puzzle-options">
                    <button class="quiz-option" onclick="checkPuzzleAnswer(24)">24</button>
                    <button class="quiz-option" onclick="checkPuzzleAnswer(32)">32</button>
                    <button class="quiz-option" onclick="checkPuzzleAnswer(20)">20</button>
                    <button class="quiz-option" onclick="checkPuzzleAnswer(18)">18</button>
                </div>
            </div>
            <div class="puzzle-explanation">
                <p>Each number is double the previous number!</p>
            </div>
        </div>
    `;
}

// Create word game content
function createWordGameContent() {
    return `
        <div class="word-game">
            <h4>Create Words from Letters</h4>
            <div class="word-letters">
                <div class="letters-display">J U L I A N</div>
                <p>How many words can you make using these letters?</p>
                <input type="text" id="wordInput" placeholder="Enter a word...">
                <button class="btn" onclick="submitWord()">Submit Word</button>
            </div>
            <div class="found-words">
                <h5>Words Found:</h5>
                <div id="wordsList"></div>
            </div>
        </div>
    `;
}

// Create logic game content
function createLogicGameContent() {
    return `
        <div class="logic-game">
            <h4>Logic Puzzle</h4>
            <div class="logic-question">
                <p>If Julian studies law for 3 hours every day, and she wants to complete 21 hours of study this week, how many days does she need to study?</p>
                <div class="logic-options">
                    <button class="quiz-option" onclick="checkLogicAnswer(6)">6 days</button>
                    <button class="quiz-option" onclick="checkLogicAnswer(7)">7 days</button>
                    <button class="quiz-option" onclick="checkLogicAnswer(8)">8 days</button>
                    <button class="quiz-option" onclick="checkLogicAnswer(5)">5 days</button>
                </div>
            </div>
            <div class="logic-explanation">
                <p>21 hours ÷ 3 hours per day = 7 days. You're so smart, Julian! 📚</p>
            </div>
        </div>
    `;
}

// Create math game content
function createMathGameContent() {
    return `
        <div class="math-game">
            <h4>Quick Math Challenge</h4>
            <div class="math-question">
                <p>Solve this equation:</p>
                <div class="equation">(15 × 4) + (20 ÷ 4) - 10 = ?</div>
                <div class="math-options">
                    <button class="quiz-option" onclick="checkMathAnswer(55)">55</button>
                    <button class="quiz-option" onclick="checkMathAnswer(65)">65</button>
                    <button class="quiz-option" onclick="checkMathAnswer(75)">75</button>
                    <button class="quiz-option" onclick="checkMathAnswer(45)">45</button>
                </div>
            </div>
            <div class="math-explanation">
                <p>(60) + (5) - 10 = 55. Brilliant as always, my genius Julian! 🧮</p>
            </div>
        </div>
    `;
}

// Start love quiz
function startLoveQuiz() {
    currentGame = 'love-quiz';
    gameScore = 0;
    openGameInterface('How Well Do You Know Me?', createLoveQuizContent());
}

// Create love quiz content
function createLoveQuizContent() {
    let content = '<div class="love-quiz">';
    
    loveQuizQuestions.forEach((q, index) => {
        content += `
            <div class="quiz-question" id="question-${index}">
                <h4>${q.question}</h4>
                <div class="quiz-options">
        `;
        
        q.options.forEach((option, optIndex) => {
            content += `<button class="quiz-option" onclick="answerLoveQuiz(${index}, ${optIndex})">${option}</button>`;
        });
        
        content += `
                </div>
                <div class="quiz-explanation hidden" id="explanation-${index}">
                    <p>${q.explanation}</p>
                </div>
            </div>
        `;
    });
    
    content += '</div>';
    return content;
}

// Answer love quiz
function answerLoveQuiz(questionIndex, answerIndex) {
    const question = loveQuizQuestions[questionIndex];
    const options = document.querySelectorAll(`#question-${questionIndex} .quiz-option`);
    const explanation = document.getElementById(`explanation-${questionIndex}`);
    
    // Disable all options
    options.forEach(option => option.disabled = true);
    
    // Highlight selected answer
    options[answerIndex].classList.add('selected');
    
    // Show explanation
    explanation.classList.remove('hidden');
    
    // Update score if correct
    if (answerIndex === question.correct) {
        gameScore += 20;
        options[answerIndex].style.background = 'var(--success)';
    } else {
        options[question.correct].style.background = 'var(--success)';
        options[answerIndex].style.background = 'var(--error)';
    }
    
    updateGameScore();
    
    // Check if quiz is complete
    const answeredQuestions = document.querySelectorAll('.quiz-explanation:not(.hidden)').length;
    if (answeredQuestions === loveQuizQuestions.length) {
        setTimeout(() => {
            showGameMessage("Quiz complete! You know me so well, my love! 💕");
            generateLoveMessage();
        }, 2000);
    }
}

// Start love messages
function startLoveMessages() {
    generateLoveMessage();
}

// Generate love message
function generateLoveMessage() {
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    document.getElementById('loveMessageText').textContent = randomMessage;
    document.getElementById('loveMessageModal').classList.remove('hidden');
}

// Generate new love message
function generateNewMessage() {
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    document.getElementById('loveMessageText').textContent = randomMessage;
}

// Close love message
function closeLoveMessage() {
    document.getElementById('loveMessageModal').classList.add('hidden');
}

// Start future plans
function startFuturePlans() {
    openGameInterface('Our Future Together', createFuturePlansContent());
}

// Create future plans content
function createFuturePlansContent() {
    return `
        <div class="future-plans">
            <h4>Let's Plan Our Beautiful Future</h4>
            <div class="future-sections">
                <div class="future-section">
                    <h5>🏠 Our Dream Home</h5>
                    <p>A beautiful house where we'll build our life together, with a garden where we can watch sunsets.</p>
                </div>
                <div class="future-section">
                    <h5>💍 Our Wedding</h5>
                    <p>The most beautiful day when I'll officially make you my wife, surrounded by love and joy.</p>
                </div>
                <div class="future-section">
                    <h5>👶 Our Family</h5>
                    <p>Beautiful children who will have your intelligence and kindness, starting with our Allison.</p>
                </div>
                <div class="future-section">
                    <h5>⚖️ Your Career</h5>
                    <p>Supporting your dream of becoming the most amazing solicitor, celebrating every achievement.</p>
                </div>
                <div class="future-section">
                    <h5>🌍 Our Adventures</h5>
                    <p>Traveling the world together, creating memories in every corner of the earth.</p>
                </div>
            </div>
            <div class="future-message">
                <p>Every day with you is a step towards this beautiful future. I love you, Julian! 💜</p>
            </div>
        </div>
    `;
}

// Start intimate quiz
function startIntimateQuiz() {
    currentGame = 'intimate-quiz';
    openGameInterface('Intimate Connection', createIntimateQuizContent());
}

// Create intimate quiz content
function createIntimateQuizContent() {
    let content = '<div class="intimate-quiz">';
    
    intimateQuizQuestions.forEach((q, index) => {
        content += `
            <div class="quiz-question" id="intimate-question-${index}">
                <h4>${q.question}</h4>
                <div class="quiz-options">
        `;
        
        q.options.forEach((option, optIndex) => {
            content += `<button class="quiz-option" onclick="answerIntimateQuiz(${index}, ${optIndex})">${option}</button>`;
        });
        
        content += `
                </div>
                <div class="quiz-explanation hidden" id="intimate-explanation-${index}">
                    <p>${q.explanation}</p>
                </div>
            </div>
        `;
    });
    
    content += '</div>';
    return content;
}

// Answer intimate quiz
function answerIntimateQuiz(questionIndex, answerIndex) {
    const question = intimateQuizQuestions[questionIndex];
    const options = document.querySelectorAll(`#intimate-question-${questionIndex} .quiz-option`);
    const explanation = document.getElementById(`intimate-explanation-${questionIndex}`);
    
    // Disable all options
    options.forEach(option => option.disabled = true);
    
    // Highlight selected answer
    options[answerIndex].classList.add('selected');
    
    // Show explanation
    explanation.classList.remove('hidden');
    
    updateGameScore();
}

// Start romantic challenges
function startRomanticChallenges() {
    openGameInterface('Romantic Challenges', createRomanticChallengesContent());
}

// Create romantic challenges content
function createRomanticChallengesContent() {
    return `
        <div class="romantic-challenges">
            <h4>Romantic Challenges for Us</h4>
            <div class="challenges-list">
                <div class="challenge-item">
                    <h5>💕 Love Letter Challenge</h5>
                    <p>Write each other a heartfelt love letter expressing your deepest feelings.</p>
                </div>
                <div class="challenge-item">
                    <h5>🌹 Surprise Date Challenge</h5>
                    <p>Plan a surprise romantic date for each other without revealing the details.</p>
                </div>
                <div class="challenge-item">
                    <h5>💭 Dream Sharing Challenge</h5>
                    <p>Share your wildest dreams and fantasies about our future together.</p>
                </div>
                <div class="challenge-item">
                    <h5>🎵 Song Dedication Challenge</h5>
                    <p>Choose a song that represents your love and explain why it's special.</p>
                </div>
                <div class="challenge-item">
                    <h5>📸 Memory Creation Challenge</h5>
                    <p>Create new beautiful memories together and capture them forever.</p>
                </div>
            </div>
            <div class="challenge-message">
                <p>These challenges will bring us even closer together, my beautiful Julian! 💖</p>
            </div>
        </div>
    `;
}

// Game interface functions
function openGameInterface(title, content) {
    document.getElementById('gameTitle').textContent = title;
    document.getElementById('gameContent').innerHTML = content;
    document.getElementById('gameInterface').classList.remove('hidden');
    updateGameScore();
}

function closeGame() {
    document.getElementById('gameInterface').classList.add('hidden');
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
    currentGame = null;
}

function restartGame() {
    switch(currentGame) {
        case 'memory':
            startMemoryGame();
            break;
        case 'puzzle':
            startPuzzleGame();
            break;
        case 'word':
            startWordGame();
            break;
        case 'logic':
            startLogicGame();
            break;
        case 'math':
            startMathGame();
            break;
        case 'love-quiz':
            startLoveQuiz();
            break;
        case 'intimate-quiz':
            startIntimateQuiz();
            break;
    }
}

function nextLevel() {
    showGameMessage("You're already at the highest level of amazingness, my brilliant Juliana! 🌟");
}

// Game timer
function startGameTimer() {
    gameTimer = 0;
    gameInterval = setInterval(() => {
        gameTimer++;
        updateGameTimer();
    }, 1000);
}

function updateGameTimer() {
    const minutes = Math.floor(gameTimer / 60);
    const seconds = gameTimer % 60;
    document.getElementById('gameTimer').textContent = 
        `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateGameScore() {
    document.getElementById('gameScore').textContent = `Score: ${gameScore}`;
}

// Utility functions
function showGameMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'game-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-hover);
        z-index: 3000;
        font-weight: 600;
        animation: fadeInUp 0.3s ease;
        max-width: 80%;
        text-align: center;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// Answer checking functions
function checkPuzzleAnswer(answer) {
    if (answer === 32) {
        showGameMessage("Correct! You're so smart, Juliana! 🎉");
        gameScore += 50;
    } else {
        showGameMessage("Not quite, but you're still amazing! The answer is 32. 💜");
    }
    updateGameScore();
}

function checkLogicAnswer(answer) {
    if (answer === 7) {
        showGameMessage("Perfect! Your logic is flawless, my brilliant Juliana! 🎉");
        gameScore += 50;
    } else {
        showGameMessage("Close! The answer is 7 days. You're still incredible! 💜");
    }
    updateGameScore();
}

function checkMathAnswer(answer) {
    if (answer === 55) {
        showGameMessage("Excellent! Your math skills are amazing, Juliana! 🎉");
        gameScore += 50;
    } else {
        showGameMessage("Good try! The answer is 55. You're still my genius! 💜");
    }
    updateGameScore();
}

// Word game functions
function submitWord() {
    const input = document.getElementById('wordInput');
    const word = input.value.toLowerCase().trim();
    
    if (word && isValidWord(word)) {
        addWordToList(word);
        input.value = '';
        gameScore += word.length * 5;
        updateGameScore();
        showGameMessage(`Great word! "${word.toUpperCase()}" added! 🎉`);
    } else {
        showGameMessage("Try another word, beautiful! 💜");
    }
}

function isValidWord(word) {
    const availableLetters = 'julian'.split('');
    const wordLetters = word.split('');
    
    return wordLetters.every(letter => {
        const index = availableLetters.indexOf(letter);
        if (index > -1) {
            availableLetters.splice(index, 1);
            return true;
        }
        return false;
    });
}

function addWordToList(word) {
    const wordsList = document.getElementById('wordsList');
    const wordElement = document.createElement('span');
    wordElement.textContent = word.toUpperCase();
    wordElement.style.cssText = `
        display: inline-block;
        background: var(--accent-light);
        color: var(--primary);
        padding: 0.25rem 0.5rem;
        margin: 0.25rem;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 600;
    `;
    wordsList.appendChild(wordElement);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add motivational gaming message
    setTimeout(() => {
        showGameMessage("Welcome to your game corner, my brilliant Juliana! Have fun! 🎮💜");
    }, 2000);
    
    // Add keyboard shortcuts for games
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentGame) {
            closeGame();
        }
    });
    
    // Add hover effects to category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});