// Gallery JavaScript

let currentGallerySection = 'public';
let pendingSection = null;

// Gallery section navigation
function showGallerySection(section) {
    if (section === 'memories' || section === 'dontplay') {
        pendingSection = section;
        showPasswordModal(section);
        return;
    }
    
    // Hide all gallery sections
    document.querySelectorAll('.gallery-content').forEach(content => {
        content.classList.remove('active');
        content.classList.add('hidden');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.gallery-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = section === 'public' ? 'publicGallery' : section + 'Gallery';
    document.getElementById(targetSection).classList.remove('hidden');
    document.getElementById(targetSection).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    currentGallerySection = section;
}

// Show password modal
function showPasswordModal(section) {
    const modal = document.getElementById('passwordModal');
    const title = document.getElementById('modalTitle');
    const description = document.getElementById('modalDescription');
    const hint = document.getElementById('passwordHint');
    const icon = document.getElementById('modalIcon');
    
    if (section === 'memories') {
        title.textContent = 'Bring Up Memory';
        description.textContent = 'Enter the password to access our special memories';
        hint.textContent = 'Hint: Our first daughter\'s name';
        icon.className = 'fas fa-heart';
    } else if (section === 'dontplay') {
        title.textContent = 'Don\'t Play Gallery';
        description.textContent = 'Enter the password to access the secret gallery';
        hint.textContent = 'Hint: August 11 (no spaces)';
        icon.className = 'fas fa-fire';
    }
    
    modal.style.display = 'flex';
    document.getElementById('passwordInput').focus();
}

// Password protection
function checkPassword() {
    const password = document.getElementById('passwordInput').value.toLowerCase().replace(/\s/g, '');
    const errorElement = document.getElementById('passwordError');
    let correctPassword = '';
    
    if (pendingSection === 'memories') {
        correctPassword = 'allison';
    } else if (pendingSection === 'dontplay') {
        correctPassword = 'august11';
    }
    
    if (password === correctPassword) {
        // Hide password modal
        document.getElementById('passwordModal').style.display = 'none';
        
        // Show the requested gallery section
        showGallerySection(pendingSection);
        
        // Store access in session
        sessionStorage.setItem(pendingSection + 'Access', 'true');
        
        // Clear input
        document.getElementById('passwordInput').value = '';
        errorElement.style.display = 'none';
        
        pendingSection = null;
    } else {
        errorElement.textContent = 'Incorrect password. Try again, my love.';
        errorElement.style.display = 'block';
        // Clear input
        document.getElementById('passwordInput').value = '';
        // Shake animation
        document.querySelector('.password-content').style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            document.querySelector('.password-content').style.animation = '';
        }, 500);
    }
}

// Check if user already has access
function checkAccess() {
    // Always start with public gallery visible
    document.getElementById('publicGallery').classList.add('active');
    document.getElementById('publicGallery').classList.remove('hidden');
}

// Allow Enter key to submit password
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
});

// Image modal functions
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Video modal functions with enhanced controls
function openVideoModal(videoSrc) {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    modal.style.display = 'block';
    modalVideo.src = videoSrc;
    modalVideo.load();
    
    // Add custom controls
    addVideoControls(modalVideo);
    
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = '';
    document.body.style.overflow = 'auto';
    
    // Remove custom controls
    const existingControls = modal.querySelector('.video-controls');
    if (existingControls) {
        existingControls.remove();
    }
}

// Add video controls
function addVideoControls(video) {
    const modal = video.closest('.modal-content');
    
    const controlsHTML = `
        <div class="video-controls">
            <button class="video-control-btn" onclick="toggleVideoPlay()">
                <i class="fas fa-play" id="playPauseIcon"></i>
            </button>
            <div class="video-progress" onclick="seekVideo(event)">
                <div class="video-progress-bar" id="videoProgressBar"></div>
            </div>
            <button class="video-control-btn" onclick="toggleMute()">
                <i class="fas fa-volume-up" id="muteIcon"></i>
            </button>
            <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="70" onchange="changeVideoVolume()">
        </div>
    `;
    
    modal.insertAdjacentHTML('beforeend', controlsHTML);
    
    // Set initial volume
    video.volume = 0.7;
    
    // Update progress
    video.addEventListener('timeupdate', updateVideoProgress);
    video.addEventListener('loadedmetadata', () => {
        video.currentTime = 0;
    });
}

// Video control functions
function toggleVideoPlay() {
    const video = document.getElementById('modalVideo');
    const icon = document.getElementById('playPauseIcon');
    
    if (video.paused) {
        video.play();
        icon.className = 'fas fa-pause';
    } else {
        video.pause();
        icon.className = 'fas fa-play';
    }
}

function toggleMute() {
    const video = document.getElementById('modalVideo');
    const icon = document.getElementById('muteIcon');
    
    video.muted = !video.muted;
    icon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
}

function changeVideoVolume() {
    const video = document.getElementById('modalVideo');
    const slider = document.getElementById('volumeSlider');
    video.volume = slider.value / 100;
}

function seekVideo(event) {
    const video = document.getElementById('modalVideo');
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
}

function updateVideoProgress() {
    const video = document.getElementById('modalVideo');
    const progressBar = document.getElementById('videoProgressBar');
    
    if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        if (progressBar) {
            progressBar.style.width = percent + '%';
        }
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const imageModal = document.getElementById('imageModal');
    const videoModal = document.getElementById('videoModal');
    
    if (event.target === imageModal) {
        closeModal();
    }
    if (event.target === videoModal) {
        closeVideoModal();
    }
}

// Escape key to close modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeVideoModal();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAccess();
    
    // Add love messages to gallery items
    const loveMessages = [
        "My beautiful queen 💜",
        "You light up my world ✨",
        "Forever my love ❤️",
        "My heart belongs to you 💕",
        "You're my everything 🌟",
        "My gorgeous Juliana 💜",
        "Love you endlessly 💖",
        "My perfect match 💝"
    ];
    
    // Add love messages to all gallery items
    setTimeout(() => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            if (!item.querySelector('.love-message-overlay')) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'love-message-overlay';
                messageDiv.textContent = loveMessages[index % loveMessages.length];
                item.appendChild(messageDiv);
            }
        });
    }, 500);
    
    // Close modal when clicking outside
    document.getElementById('passwordModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            pendingSection = null;
        }
    });
});

// Add shake animation CSS
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);