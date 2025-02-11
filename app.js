// Configuración del reproductor
const radioStream = new Howl({
    src: ['https://sitio-web-radio.onrender.com/stream'], // URL de tu Icecast
    html5: true,
    format: ['mp3'],
    onplay: () => {
        document.querySelector('.vinyl').style.animationPlayState = 'running';
        document.querySelector('#playPauseBtn i').className = 'fas fa-pause';
    },
    onpause: () => {
        document.querySelector('.vinyl').style.animationPlayState = 'paused';
        document.querySelector('#playPauseBtn i').className = 'fas fa-play';
    },
    onvolume: (vol) => {
        radioStream.volume(vol);
    }
});

// Botón Play/Pausa
document.getElementById('playPauseBtn').addEventListener('click', () => {
    radioStream.playing() ? radioStream.pause() : radioStream.play();
});

// Control de Volumen
document.getElementById('volumeSlider').addEventListener('input', (e) => {
    radioStream.volume(e.target.value);
});

// Actualizar metadata (opcional)
radioStream.on('load', () => {
    const track = radioStream._sounds[0]._node.metadata;
    if (track) {
        document.getElementById('currentTrack').textContent = 
            `🎵 ${track.title || 'Título desconocido'} - ${track.artist || 'Artista desconocido'}`;
    }
});