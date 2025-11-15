// Music Player JavaScript

let currentPlaylist = 'nigerian';
let currentSongIndex = 0;
let isPlaying = false;
let currentSongId = null;

// Sample music data (in a real app, these would be actual audio files)
const musicDatabase = {
    nigerian: [
        { id: 'burna-boy-ye', title: 'Ye', artist: 'Burna Boy', duration: '2:47', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'wizkid-essence', title: 'Essence', artist: 'Wizkid ft. Tems', duration: '3:12', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'davido-fall', title: 'Fall', artist: 'Davido', duration: '3:33', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'tiwa-savage-somebody-son', title: 'Somebody Son', artist: 'Tiwa Savage', duration: '3:45', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'rema-calm-down', title: 'Calm Down', artist: 'Rema', duration: '3:59', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'asake-sungba', title: 'Sungba', artist: 'Asake', duration: '2:58', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'kizz-daniel-buga', title: 'Buga', artist: 'Kizz Daniel ft. Tekno', duration: '2:32', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'fireboy-peru', title: 'Peru', artist: 'Fireboy DML', duration: '3:21', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' }
    ],
    gospel: [
        { id: 'sinach-way-maker', title: 'Way Maker', artist: 'Sinach', duration: '4:12', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'mercy-chinwo-excess-love', title: 'Excess Love', artist: 'Mercy Chinwo', duration: '4:45', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'nathaniel-bassey-olowogbogboro', title: 'Olowogbogboro', artist: 'Nathaniel Bassey', duration: '5:23', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'tim-godfrey-nara', title: 'Nara', artist: 'Tim Godfrey ft. Travis Greene', duration: '4:33', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'frank-edwards-mma-mma', title: 'Mma Mma', artist: 'Frank Edwards', duration: '3:56', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' },
        { id: 'ada-ehi-only-you-jesus', title: 'Only You Jesus', artist: 'Ada Ehi', duration: '4:18', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' }
    ],

};

// Get audio player element
const audioPlayer = document.getElementById('audioPlayer');

// Playlist functionality
function showPlaylist(playlistName) {
    // Hide all playlist contents
    document.querySelectorAll('.playlist-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.playlist-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected playlist
    document.getElementById(playlistName).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    currentPlaylist = playlistName;
    
    // Populate favorites if that's the selected playlist
    if (playlistName === 'favorites') {
        populateFavorites();
    }
}

// Populate favorites playlist
function populateFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    const favorites = [
        ...musicDatabase.nigerian.slice(0, 3),
        ...musicDatabase.gospel.slice(0, 3)
    ];
    
    favoritesGrid.innerHTML = '';
    
    favorites.forEach(song => {
        const songCard = createSongCard(song);
        favoritesGrid.appendChild(songCard);
    });
}

// Create song card element
function createSongCard(song) {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.onclick = () => playSong(song.id, song.title, song.artist);
    
    const initials = song.artist.split(' ').map(word => word[0]).join('').substring(0, 2);
    
    card.innerHTML = `
        <div class="song-image">
            <img src="https://via.placeholder.com/200x200/6a1b9a/ffffff?text=${initials}" alt="${song.artist}">
            <div class="play-overlay">
                <i class="fas fa-play"></i>
            </div>
        </div>
        <div class="song-info">
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        </div>
    `;
    
    return card;
}

// Play song function
function playSong(songId, title, artist) {
    // Find song in database
    let song = null;
    let playlist = null;
    
    for (const [playlistName, songs] of Object.entries(musicDatabase)) {
        const foundSong = songs.find(s => s.id === songId);
        if (foundSong) {
            song = foundSong;
            playlist = playlistName;
            currentSongIndex = songs.indexOf(foundSong);
            break;
        }
    }
    
    if (!song) return;
    
    currentSongId = songId;
    currentPlaylist = playlist;
    
    // Update player display
    document.getElementById('currentSong').textContent = title;
    document.getElementById('currentArtist').textContent = artist;
    
    // Update album art
    const initials = artist.split(' ').map(word => word[0]).join('').substring(0, 2);
    document.getElementById('albumArt').src = `https://via.placeholder.com/80x80/6a1b9a/ffffff?text=${initials}`;
    
    // Load and play audio (using placeholder audio for demo)
    audioPlayer.src = song.url;
    audioPlayer.load();
    
    // Update UI
    updatePlayingState();
    
    // Play audio
    audioPlayer.play().then(() => {
        isPlaying = true;
        updatePlayButton();
        highlightCurrentSong();
    }).catch(error => {
        console.log('Audio play failed:', error);
        // Show a message to user
        showMusicMessage('Audio playback not available in demo mode. Enjoy the visual experience! 🎵');
    });
}

// Toggle play/pause
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        if (currentSongId) {
            audioPlayer.play().then(() => {
                isPlaying = true;
            }).catch(error => {
                showMusicMessage('Select a song to start playing! 🎵');
            });
        } else {
            showMusicMessage('Please select a song first! 🎵');
        }
    }
    updatePlayButton();
}

// Update play button icon
function updatePlayButton() {
    const playBtn = document.querySelector('.play-pause i');
    playBtn.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

// Previous song
function previousSong() {
    if (currentPlaylist && musicDatabase[currentPlaylist]) {
        const playlist = musicDatabase[currentPlaylist];
        currentSongIndex = currentSongIndex > 0 ? currentSongIndex - 1 : playlist.length - 1;
        const song = playlist[currentSongIndex];
        playSong(song.id, song.title, song.artist);
    }
}

// Next song
function nextSong() {
    if (currentPlaylist && musicDatabase[currentPlaylist]) {
        const playlist = musicDatabase[currentPlaylist];
        currentSongIndex = currentSongIndex < playlist.length - 1 ? currentSongIndex + 1 : 0;
        const song = playlist[currentSongIndex];
        playSong(song.id, song.title, song.artist);
    }
}

// Change volume
function changeVolume() {
    const volume = document.getElementById('volumeSlider').value / 100;
    audioPlayer.volume = volume;
}

// Seek to position
function seekTo(event) {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const seekTime = percent * audioPlayer.duration;
    
    if (!isNaN(seekTime)) {
        audioPlayer.currentTime = seekTime;
    }
}

// Update progress bar
function updateProgress() {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        document.getElementById('progress').style.width = percent + '%';
        
        // Update time displays
        document.getElementById('currentTime').textContent = formatTime(audioPlayer.currentTime);
        document.getElementById('duration').textContent = formatTime(audioPlayer.duration);
    }
}

// Format time helper
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Highlight currently playing song
function highlightCurrentSong() {
    // Remove previous highlights
    document.querySelectorAll('.song-card').forEach(card => {
        card.classList.remove('playing');
    });
    
    // Add highlight to current song
    const currentCard = document.querySelector(`[onclick*="${currentSongId}"]`);
    if (currentCard) {
        currentCard.classList.add('playing');
    }
}

// Update playing state
function updatePlayingState() {
    // Update all UI elements to reflect current playing state
    highlightCurrentSong();
}

// Download playlist function
function downloadPlaylist(playlistType) {
    let message = '';
    let songs = [];
    
    switch (playlistType) {
        case 'nigerian':
            songs = musicDatabase.nigerian;
            message = `Nigerian Hits Playlist (${songs.length} songs) download started! 🎵`;
            break;
        case 'gospel':
            songs = musicDatabase.gospel;
            message = `Gospel Songs Playlist (${songs.length} songs) download started! 🙏`;
            break;
        case 'all':
            songs = [...musicDatabase.nigerian, ...musicDatabase.gospel];
            message = `Complete Music Collection (${songs.length} songs) download started! 🎶`;
            break;
    }
    
    // Simulate download process
    showDownloadProgress(message, songs.length);
}

// Show download progress
function showDownloadProgress(message, songCount) {
    const progressDiv = document.createElement('div');
    progressDiv.className = 'download-progress';
    progressDiv.innerHTML = `
        <div class="download-message">
            <i class="fas fa-download"></i>
            <span>${message}</span>
        </div>
        <div class="progress-bar">
            <div class="progress" id="downloadProgress"></div>
        </div>
        <div class="download-status">Preparing download...</div>
    `;
    
    progressDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        padding: 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-hover);
        z-index: 1000;
        min-width: 300px;
        border: 2px solid var(--primary);
    `;
    
    document.body.appendChild(progressDiv);
    
    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            progressDiv.querySelector('.download-status').textContent = 'Download completed! 🎉';
            progressDiv.querySelector('.download-status').style.color = 'var(--success)';
            
            setTimeout(() => {
                if (progressDiv.parentNode) {
                    progressDiv.parentNode.removeChild(progressDiv);
                }
            }, 3000);
        }
        
        progressDiv.querySelector('#downloadProgress').style.width = progress + '%';
        progressDiv.querySelector('.download-status').textContent = `Downloading... ${Math.floor(progress)}%`;
    }, 200);
}

// Show music message
function showMusicMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'music-message';
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
        z-index: 2000;
        font-weight: 600;
        animation: fadeInUp 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 3000);
}

// Audio event listeners
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextSong);
audioPlayer.addEventListener('loadedmetadata', () => {
    document.getElementById('duration').textContent = formatTime(audioPlayer.duration);
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial volume
    audioPlayer.volume = 0.7;
    
    // Add love messages for music
    const musicMessages = [
        "Every song reminds me of you, my beautiful Juliana! 💜",
        "Dance like nobody's watching, my queen! 💃",
        "Music sounds better with you in my life! 🎵",
        "You're the melody to my heart! ❤️",
        "Let the music lift your spirit, my love! ✨"
    ];
    
    // Show random music message after 3 seconds
    setTimeout(() => {
        const messageIndex = Math.floor(Math.random() * musicMessages.length);
        showMusicMessage(musicMessages[messageIndex]);
    }, 3000);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                togglePlay();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                previousSong();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSong();
                break;
        }
    });
    
    // Add visual effects to song cards
    document.querySelectorAll('.song-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('playing')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});

// Add CSS for animations
const musicCSS = `
.download-progress .progress-bar {
    width: 100%;
    height: 8px;
    background: var(--accent-light);
    border-radius: 4px;
    margin: 1rem 0;
    overflow: hidden;
}

.download-progress .progress {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--accent-dark));
    border-radius: 4px;
    transition: width 0.3s ease;
}

.download-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--primary);
}

.download-status {
    font-size: 0.9rem;
    color: var(--text-light);
    text-align: center;
}
`;

const musicStyle = document.createElement('style');
musicStyle.textContent = musicCSS;
document.head.appendChild(musicStyle);