// Solicitor Study Page JavaScript

// Tab functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Test System
let currentTest = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let testTimer = null;
let timeRemaining = 3600; // 60 minutes in seconds

// Test questions database
const testQuestions = {
    contract: [
        {
            question: "What are the essential elements of a valid contract?",
            options: [
                "Offer, acceptance, consideration, intention to create legal relations",
                "Offer, acceptance, payment, signature",
                "Agreement, payment, witnesses, legal advice",
                "Offer, negotiation, acceptance, documentation"
            ],
            correct: 0
        },
        {
            question: "In contract law, what is 'consideration'?",
            options: [
                "Thinking carefully about the contract terms",
                "Something of value exchanged between parties",
                "The time taken to negotiate",
                "Legal advice received"
            ],
            correct: 1
        },
        {
            question: "What is the 'postal rule' in contract law?",
            options: [
                "Contracts must be sent by post",
                "Acceptance is effective when posted, not when received",
                "Offers expire after postal delivery",
                "All contracts require postal confirmation"
            ],
            correct: 1
        },
        {
            question: "What makes a contract void?",
            options: [
                "High value transactions",
                "Lack of witnesses",
                "Fundamental illegality or impossibility",
                "Verbal agreements"
            ],
            correct: 2
        },
        {
            question: "What is 'privity of contract'?",
            options: [
                "Contracts must be private",
                "Only parties to a contract can sue or be sued on it",
                "Contracts require privacy protection",
                "Third parties can always enforce contracts"
            ],
            correct: 1
        }
    ],
    tort: [
        {
            question: "What are the elements of negligence?",
            options: [
                "Duty, breach, causation, damage",
                "Intent, action, harm, payment",
                "Fault, injury, compensation, court order",
                "Accident, injury, claim, settlement"
            ],
            correct: 0
        },
        {
            question: "What is the 'but for' test?",
            options: [
                "A test for legal capacity",
                "A test for factual causation",
                "A test for damages",
                "A test for duty of care"
            ],
            correct: 1
        },
        {
            question: "In Donoghue v Stevenson, what principle was established?",
            options: [
                "Strict liability for products",
                "The neighbour principle",
                "Absolute liability for manufacturers",
                "Consumer protection rights"
            ],
            correct: 1
        },
        {
            question: "What is 'novus actus interveniens'?",
            options: [
                "A new legal action",
                "An intervening act breaking the chain of causation",
                "A novel legal principle",
                "A type of damages"
            ],
            correct: 1
        },
        {
            question: "What is the standard of care in negligence?",
            options: [
                "Perfect care at all times",
                "The reasonable person standard",
                "Professional expert standard always",
                "Absolute care without exception"
            ],
            correct: 1
        }
    ],
    criminal: [
        {
            question: "What are the two elements of a crime?",
            options: [
                "Intent and action",
                "Actus reus and mens rea",
                "Guilt and punishment",
                "Harm and responsibility"
            ],
            correct: 1
        },
        {
            question: "What is 'actus reus'?",
            options: [
                "The mental element of crime",
                "The physical element of crime",
                "The punishment for crime",
                "The investigation of crime"
            ],
            correct: 1
        },
        {
            question: "What does 'mens rea' mean?",
            options: [
                "The physical act",
                "The guilty mind",
                "The criminal record",
                "The court procedure"
            ],
            correct: 1
        },
        {
            question: "What is the difference between murder and manslaughter?",
            options: [
                "The weapon used",
                "The intent to kill",
                "The location of the crime",
                "The age of the victim"
            ],
            correct: 1
        },
        {
            question: "What is 'strict liability' in criminal law?",
            options: [
                "Crimes requiring proof of intent",
                "Crimes not requiring proof of mens rea",
                "Crimes with mandatory sentences",
                "Crimes involving strict evidence rules"
            ],
            correct: 1
        }
    ],
    constitutional: [
        {
            question: "What is the principle of parliamentary sovereignty?",
            options: [
                "Parliament can make or unmake any law",
                "Parliament is above the courts",
                "Parliament controls the executive",
                "Parliament represents the people"
            ],
            correct: 0
        },
        {
            question: "What is the separation of powers?",
            options: [
                "Division between central and local government",
                "Division between legislature, executive, and judiciary",
                "Division between different political parties",
                "Division between different types of law"
            ],
            correct: 1
        },
        {
            question: "What is judicial review?",
            options: [
                "Courts reviewing other courts' decisions",
                "Courts reviewing the legality of public body decisions",
                "Judges reviewing their own decisions",
                "Public reviewing judicial decisions"
            ],
            correct: 1
        },
        {
            question: "What is the rule of law?",
            options: [
                "Laws must be written down",
                "Everyone is equal before the law",
                "Laws must be approved by parliament",
                "Laws must be enforced by police"
            ],
            correct: 1
        },
        {
            question: "What are human rights?",
            options: [
                "Rights given by government",
                "Fundamental rights inherent to all humans",
                "Rights earned through citizenship",
                "Rights granted by courts"
            ],
            correct: 1
        }
    ]
};

function startTest(testType) {
    currentTest = testType;
    currentQuestionIndex = 0;
    userAnswers = [];
    timeRemaining = 3600; // Reset timer
    
    // Hide test categories and show test interface
    document.querySelector('.test-categories').style.display = 'none';
    document.getElementById('testInterface').classList.remove('hidden');
    
    // Set test title and total questions
    const testTitles = {
        contract: 'Contract Law Test',
        tort: 'Tort Law Test',
        criminal: 'Criminal Law Test',
        constitutional: 'Constitutional Law Test'
    };
    
    document.getElementById('testTitle').textContent = testTitles[testType];
    document.getElementById('totalQuestions').textContent = testQuestions[testType].length;
    
    // Start timer
    startTimer();
    
    // Load first question
    loadQuestion();
}

function loadQuestion() {
    const questions = testQuestions[currentTest];
    const question = questions[currentQuestionIndex];
    
    // Update question number
    document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;
    
    // Load question text
    document.getElementById('currentQuestion').textContent = question.question;
    
    // Load answer options
    const answersContainer = document.getElementById('answerOptions');
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        
        // Check if this answer was previously selected
        if (userAnswers[currentQuestionIndex] === index) {
            button.classList.add('selected');
        }
        
        answersContainer.appendChild(button);
    });
}

function selectAnswer(answerIndex) {
    // Remove previous selection
    document.querySelectorAll('.answer-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selection to clicked option
    event.target.classList.add('selected');
    
    // Store answer
    userAnswers[currentQuestionIndex] = answerIndex;
}

function nextQuestion() {
    const questions = testQuestions[currentTest];
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // Last question, show submit button
        alert('This is the last question. Click Submit Test when ready.');
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function submitTest() {
    if (confirm('Are you sure you want to submit your test?')) {
        clearInterval(testTimer);
        calculateResults();
    }
}

function calculateResults() {
    const questions = testQuestions[currentTest];
    let correctCount = 0;
    
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correctCount++;
        }
    });
    
    const percentage = Math.round((correctCount / questions.length) * 100);
    const timeTaken = formatTime(3600 - timeRemaining);
    
    // Hide test interface and show results
    document.getElementById('testInterface').classList.add('hidden');
    document.getElementById('testResults').classList.remove('hidden');
    
    // Update results display
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('totalTestQuestions').textContent = questions.length;
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('incorrectCount').textContent = questions.length - correctCount;
    document.getElementById('timeTaken').textContent = timeTaken;
}

function startTimer() {
    testTimer = setInterval(() => {
        timeRemaining--;
        document.getElementById('timer').textContent = formatTime(timeRemaining);
        
        if (timeRemaining <= 0) {
            clearInterval(testTimer);
            alert('Time is up! Submitting your test automatically.');
            calculateResults();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function retakeTest() {
    startTest(currentTest);
    document.getElementById('testResults').classList.add('hidden');
}

function backToTests() {
    // Reset everything
    document.getElementById('testInterface').classList.add('hidden');
    document.getElementById('testResults').classList.add('hidden');
    document.querySelector('.test-categories').style.display = 'grid';
    
    if (testTimer) {
        clearInterval(testTimer);
    }
    
    currentTest = null;
    currentQuestionIndex = 0;
    userAnswers = [];
}

// Load legal questions database
let legalQuestionsDatabase = null;
let currentDifficulty = 'beginner';
let testQuestions = [];

// Load the questions database
function loadQuestionsDatabase() {
    // Include the legal questions from legal-questions.js
    const script = document.createElement('script');
    script.src = 'js/legal-questions.js';
    script.onload = function() {
        // Questions database is now available
        console.log('Legal questions database loaded');
    };
    document.head.appendChild(script);
}

// Quick test function for legal questions
function startQuickTest(difficulty) {
    // Define questions database inline since external loading might not work
    const questionsDB = {
        beginner: [
            {
                question: "What is the highest court in England and Wales?",
                options: ["High Court", "Court of Appeal", "Supreme Court", "Crown Court"],
                correct: 2,
                explanation: "The Supreme Court is the highest court in the UK, established in 2009."
            },
            {
                question: "What does 'actus reus' mean in criminal law?",
                options: ["Guilty mind", "Physical act", "Legal consequence", "Criminal intent"],
                correct: 1,
                explanation: "Actus reus refers to the physical element or conduct of a crime."
            },
            {
                question: "In contract law, what is consideration?",
                options: ["Thinking about terms", "Something of value exchanged", "Legal advice", "Written agreement"],
                correct: 1,
                explanation: "Consideration is something of value that each party gives to make the contract legally binding."
            },
            {
                question: "What is the standard of proof in criminal cases?",
                options: ["Balance of probabilities", "Beyond reasonable doubt", "Clear and convincing", "Preponderance of evidence"],
                correct: 1,
                explanation: "Criminal cases require proof beyond reasonable doubt, the highest standard of proof."
            },
            {
                question: "What is judicial precedent?",
                options: ["Judge's opinion", "Court procedure", "Binding legal principle from previous cases", "Jury decision"],
                correct: 2,
                explanation: "Judicial precedent means courts are bound by decisions made in higher courts in similar cases."
            },
            {
                question: "What does 'ultra vires' mean?",
                options: ["Beyond powers", "Very strong", "Extremely fast", "Above law"],
                correct: 0,
                explanation: "Ultra vires means 'beyond powers' - acting outside legal authority."
            },
            {
                question: "In tort law, what is negligence?",
                options: ["Intentional harm", "Breach of duty causing damage", "Criminal behavior", "Contract violation"],
                correct: 1,
                explanation: "Negligence is the breach of a duty of care that causes damage to another person."
            },
            {
                question: "What is the difference between civil and criminal law?",
                options: ["No difference", "Civil deals with disputes between individuals, criminal with offenses against state", "Civil is more serious", "Criminal is private"],
                correct: 1,
                explanation: "Civil law deals with disputes between individuals, while criminal law deals with offenses against the state."
            },
            {
                question: "What is a statute?",
                options: ["Court decision", "Legal principle", "Act of Parliament", "Judge's ruling"],
                correct: 2,
                explanation: "A statute is a written law passed by Parliament, also known as an Act of Parliament."
            },
            {
                question: "What does 'mens rea' mean?",
                options: ["Physical act", "Guilty mind", "Legal procedure", "Court hearing"],
                correct: 1,
                explanation: "Mens rea refers to the mental element or guilty mind required for most crimes."
            }
        ],
        intermediate: [
            {
                question: "In Donoghue v Stevenson, what legal principle was established?",
                options: ["Strict liability", "The neighbour principle", "Absolute liability", "Vicarious liability"],
                correct: 1,
                explanation: "The neighbour principle established the modern law of negligence - you must take reasonable care to avoid acts likely to injure your neighbour."
            },
            {
                question: "What is the 'but for' test in negligence?",
                options: ["Test for duty of care", "Test for factual causation", "Test for damages", "Test for breach"],
                correct: 1,
                explanation: "The 'but for' test asks: 'but for the defendant's actions, would the damage have occurred?' It establishes factual causation."
            },
            {
                question: "In contract law, what makes an offer different from an invitation to treat?",
                options: ["Nothing", "Offers are binding when accepted, invitations are not", "Offers are written", "Invitations are verbal"],
                correct: 1,
                explanation: "An offer creates legal relations when accepted, while an invitation to treat merely invites offers."
            },
            {
                question: "What is the postal rule in contract law?",
                options: ["Contracts must be posted", "Acceptance is effective when posted", "Offers expire after posting", "All contracts need postal confirmation"],
                correct: 1,
                explanation: "The postal rule states that acceptance is effective when posted, not when received."
            },
            {
                question: "What is vicarious liability?",
                options: ["Personal liability", "Liability for another's actions", "Criminal liability", "Contractual liability"],
                correct: 1,
                explanation: "Vicarious liability makes one person liable for the wrongful acts of another, typically employers for employees."
            }
        ],
        advanced: [
            {
                question: "In Caparo v Dickman, what three-stage test was established for duty of care?",
                options: ["Foreseeability, proximity, fair/just/reasonable", "Duty, breach, causation", "Offer, acceptance, consideration", "Actus reus, mens rea, causation"],
                correct: 0,
                explanation: "Caparo established the three-stage test: foreseeability of harm, proximity of relationship, and whether it's fair, just and reasonable to impose a duty."
            },
            {
                question: "What is the rule in Rylands v Fletcher?",
                options: ["Negligence standard", "Strict liability for escape of dangerous things", "Contract formation", "Criminal liability"],
                correct: 1,
                explanation: "Rylands v Fletcher establishes strict liability for the escape of things likely to do mischief if they escape from land."
            },
            {
                question: "In constitutional law, what is parliamentary sovereignty?",
                options: ["Parliament controls courts", "Parliament can make/unmake any law", "Parliament is elected", "Parliament makes policy"],
                correct: 1,
                explanation: "Parliamentary sovereignty means Parliament has unlimited legislative power and can make or unmake any law."
            }
        ],
        expert: [
            {
                question: "In White v Jones, what principle was established regarding solicitors' liability?",
                options: ["No liability to third parties", "Liability to intended beneficiaries for negligent will preparation", "Absolute liability", "Limited liability"],
                correct: 1,
                explanation: "White v Jones established that solicitors can owe a duty of care to intended beneficiaries when negligently preparing wills."
            },
            {
                question: "What is the doctrine of proprietary estoppel?",
                options: ["Contract principle", "Prevents denial of property rights where detrimental reliance occurred", "Criminal defense", "Company law principle"],
                correct: 1,
                explanation: "Proprietary estoppel prevents a landowner from denying another's property rights where that person has relied to their detriment on assurances about the land."
            }
        ]
    };
    
    currentGame = 'legal-test';
    currentDifficulty = difficulty;
    gameScore = 0;
    currentQuestionIndex = 0;
    
    // Get questions from the difficulty level
    const allQuestions = questionsDB[difficulty] || questionsDB.beginner;
    testQuestions = shuffleArray([...allQuestions]).slice(0, Math.min(10, allQuestions.length));
    
    const difficultyNames = {
        beginner: 'Foundation Level',
        intermediate: 'LLB Level', 
        advanced: 'Professional Level',
        expert: 'Solicitor Level'
    };
    
    openGameInterface(`Legal Test - ${difficultyNames[difficulty]}`, createLegalTestContent());
    loadLegalQuestion();
    startGameTimer();
}

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create legal test content
function createLegalTestContent() {
    return `
        <div class="legal-test">
            <div class="question-progress">
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" id="questionProgress"></div>
                </div>
                <span class="progress-text">Question <span id="currentQ">1</span> of ${testQuestions.length}</span>
            </div>
            
            <div class="question-container">
                <div class="question-text" id="questionText">
                    Loading question...
                </div>
                
                <div class="answer-options" id="answerOptions">
                    <!-- Options will be populated -->
                </div>
                
                <div class="question-explanation hidden" id="questionExplanation">
                    <!-- Explanation will appear here -->
                </div>
            </div>
            
            <div class="test-navigation">
                <button class="btn btn-outline" onclick="previousLegalQuestion()" id="prevBtn" disabled>Previous</button>
                <button class="btn" onclick="nextLegalQuestion()" id="nextBtn">Next</button>
                <button class="btn btn-secondary hidden" onclick="finishLegalTest()" id="finishBtn">Finish Test</button>
            </div>
        </div>
    `;
}

// Load legal question
function loadLegalQuestion() {
    if (!testQuestions || currentQuestionIndex >= testQuestions.length) return;
    
    const question = testQuestions[currentQuestionIndex];
    
    // Update progress
    document.getElementById('currentQ').textContent = currentQuestionIndex + 1;
    document.getElementById('questionProgress').style.width = ((currentQuestionIndex + 1) / testQuestions.length) * 100 + '%';
    
    // Load question
    document.getElementById('questionText').textContent = question.question;
    
    // Load options
    const optionsContainer = document.getElementById('answerOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-option';
        button.textContent = option;
        button.onclick = () => selectLegalAnswer(index);
        optionsContainer.appendChild(button);
    });
    
    // Hide explanation
    document.getElementById('questionExplanation').classList.add('hidden');
    
    // Update navigation
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === testQuestions.length - 1;
    document.getElementById('nextBtn').style.display = isLastQuestion ? 'none' : 'inline-block';
    document.getElementById('finishBtn').style.display = isLastQuestion ? 'inline-block' : 'none';
}

// Select legal answer
function selectLegalAnswer(answerIndex) {
    const question = testQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.answer-option');
    
    // Store answer
    if (!userAnswers) userAnswers = [];
    userAnswers[currentQuestionIndex] = answerIndex;
    
    // Disable all options
    options.forEach(option => option.disabled = true);
    
    // Highlight selected and correct answers
    options[answerIndex].classList.add('selected');
    
    if (answerIndex === question.correct) {
        options[answerIndex].style.background = 'var(--success)';
        options[answerIndex].style.color = '#fff';
        gameScore += 10;
    } else {
        options[answerIndex].style.background = 'var(--error)';
        options[answerIndex].style.color = '#fff';
        options[question.correct].style.background = 'var(--success)';
        options[question.correct].style.color = '#fff';
    }
    
    // Show explanation
    const explanationDiv = document.getElementById('questionExplanation');
    explanationDiv.innerHTML = `<p><strong>Explanation:</strong> ${question.explanation}</p>`;
    explanationDiv.classList.remove('hidden');
    
    updateGameScore();
}

// Navigation functions
function nextLegalQuestion() {
    if (currentQuestionIndex < testQuestions.length - 1) {
        currentQuestionIndex++;
        loadLegalQuestion();
    }
}

function previousLegalQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadLegalQuestion();
    }
}

function finishLegalTest() {
    clearInterval(gameInterval);
    showLegalTestResults();
}

// Show test results
function showLegalTestResults() {
    const correctAnswers = userAnswers.filter((answer, index) => 
        answer === testQuestions[index].correct
    ).length;
    
    const percentage = Math.round((correctAnswers / testQuestions.length) * 100);
    const timeTaken = formatTime(gameTimer);
    
    let performance = '';
    if (percentage >= 90) performance = 'Outstanding! You\'re ready for the next level! 🌟';
    else if (percentage >= 80) performance = 'Excellent work! Keep it up! 👏';
    else if (percentage >= 70) performance = 'Good job! Review and try again! 📚';
    else if (percentage >= 60) performance = 'Not bad! More practice needed! 💪';
    else performance = 'Keep studying, you\'ll get there! 📖';
    
    const resultsHTML = `
        <div class="test-results-content">
            <div class="results-header">
                <i class="fas fa-trophy"></i>
                <h3>Test Complete!</h3>
            </div>
            
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-percentage">${percentage}%</span>
                </div>
                <p class="score-text">You scored ${correctAnswers} out of ${testQuestions.length} questions correctly</p>
                <p class="performance-text">${performance}</p>
            </div>
            
            <div class="results-details">
                <div class="detail-item">
                    <span>Correct Answers:</span>
                    <span>${correctAnswers}</span>
                </div>
                <div class="detail-item">
                    <span>Incorrect Answers:</span>
                    <span>${testQuestions.length - correctAnswers}</span>
                </div>
                <div class="detail-item">
                    <span>Time Taken:</span>
                    <span>${timeTaken}</span>
                </div>
                <div class="detail-item">
                    <span>Difficulty Level:</span>
                    <span>${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)}</span>
                </div>
            </div>
            
            <div class="results-actions">
                <button class="btn" onclick="startQuickTest('${currentDifficulty}')">Retake Test</button>
                <button class="btn btn-outline" onclick="closeGame()">Back to Tests</button>
            </div>
        </div>
    `;
    
    document.getElementById('gameContent').innerHTML = resultsHTML;
    
    // Show motivational message
    setTimeout(() => {
        showGameMessage(`Amazing work, Juliana! You're becoming an incredible lawyer! 💜⚖️`);
    }, 1000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showTab(tabName);
        });
    });
    
    // Add progress animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all curriculum sections
    document.querySelectorAll('.curriculum-section, .resource-category, .org-category').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add motivational messages
    const motivationalMessages = [
        "You're going to be an amazing solicitor, Juliana! 💜",
        "Every step brings you closer to your dream! ✨",
        "I believe in you completely, my love! ❤️",
        "Your dedication inspires me every day! 🌟",
        "Future Solicitor Juliana - I'm so proud! 💖"
    ];
    
    // Show random motivational message
    const messageIndex = Math.floor(Math.random() * motivationalMessages.length);
    const messageDiv = document.createElement('div');
    messageDiv.className = 'motivational-message';
    messageDiv.textContent = motivationalMessages[messageIndex];
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary), var(--accent-light));
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
        z-index: 1000;
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 4s forwards;
        max-width: 300px;
        font-weight: 600;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
    
    // Load questions database
    loadQuestionsDatabase();
});

// Add CSS animations
const animationCSS = `
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
`;

const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);