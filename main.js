const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img'),
    volumeBtn = document.getElementById('volume'),
    repeatBtn = document.getElementById('repeat'),
    sliderBtn = document.getElementById('slider');

const music = new Audio();

const songs = [
    {
        path: 'https://ruo.morsmusic.org/load/1240845338/Joywave_-_Its_A_Trip_(musmore.com).mp3',
        displayName: 'It\'s A Trip!',
        cover: 'https://play-lh.googleusercontent.com/TKSxUQvcstGcQucELtKQWAe-wbsoOihlvAk52LvfD-0XxlSv2zp-WfbA6-hNM5ptfkg',
        artist: 'Joywave',
    },
    {
        path: 'https://mp3bob.ru/download/muz/Marilyn_Manson_-_Sweet_Dreams_(Are_Made_of_This)_[mp3pulse.ru].mp3',
        displayName: 'Sweet Dreams',
        cover: 'https://i1.sndcdn.com/artworks-000178268055-t97r17-t500x500.jpg',
        artist: 'Marilyn Manson',
    },
    {
        path: 'https://mp3bob.ru/download/muz/System_of_a_Down_-_Chop_Suey_[mp3pulse.ru].mp3',
        displayName: 'Chop Suey!',
        cover: 'https://m.media-amazon.com/images/I/616q2tsAwxL._SL1280_.jpg',
        artist: 'System Of A Down',
    }
];

let musicIndex = 0;
let isPlaying = false;
let volume = true;
let repeatSong = true;
let slider;

function togglePlay() {
    if(isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function volumeMode() {
    if(volume) {
        volumeOff();
    } else {
        volumeOn();
    }
}

function repeatSongs() {
    if(repeatSong) {
        repeatSongOn();
    } else {
        repeatSongOff();
    }
}

function setVolume() {
    music.volume = sliderBtn.value / 100;
}

function repeatSongOn() {
    repeatBtn.setAttribute('style', 'color: rgb(0, 0, 0)')
    music.loop = true;
    repeatSong = false;
}

function repeatSongOff() {
    repeatBtn.setAttribute('style', 'color: rgb(86, 86, 86)')
    music.loop = false;
    repeatSong = true;
}

let currentSliderValue = 0;

function volumeOff() {
    volume = false;
    volumeBtn.classList.remove('fa-volume-high');
    volumeBtn.classList.add('fa-volume-xmark');
    volumeBtn.setAttribute('title', 'Sound off');
    currentSliderValue = sliderBtn.value;
    sliderBtn.value = 0;
    music.muted = true;
}

function volumeOn() {
    volume = true;
    volumeBtn.classList.remove('fa-volume-xmark');
    volumeBtn.classList.add('fa-volume-high');
    volumeBtn.setAttribute('title', 'Sound on');
    sliderBtn.value = currentSliderValue;
    music.muted = false;
    setVolume();
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

sliderBtn.addEventListener('click', setVolume);
repeatBtn.addEventListener('click', repeatSongs);
volumeBtn.addEventListener('click', volumeMode);
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);