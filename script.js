document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los pads y audios
    const pads = document.querySelectorAll('.pad, .song-pad');
    const audios = document.querySelectorAll('audio');

    // Mapea las teclas a los sonidos para un acceso rápido
    const keyMap = {};
    pads.forEach(pad => {
        const key = pad.dataset.key;
        const soundName = pad.dataset.sound;
        keyMap[key] = soundName;
    });

    // Función para detener todos los audios en reproducción
    function stopAllAudio() {
        audios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });
    }

    // Función para reproducir un sonido
    function playSound(soundName) {
        const audio = document.querySelector(`audio[data-sound="${soundName}"]`);
        const pad = document.querySelector(`[data-sound="${soundName}"]`);

        if (!audio) return;

        // Detenemos cualquier audio antes de reproducir el nuevo
        stopAllAudio();

        // Reproduce el audio
        audio.play();

        // Agrega un efecto visual
        if (pad) {
            pad.classList.add('playing');
            setTimeout(() => {
                pad.classList.remove('playing');
            }, 100); // Duración del efecto visual
        }
    }

    // Escucha los clics en los pads
    pads.forEach(pad => {
        pad.addEventListener('click', () => {
            const soundName = pad.dataset.sound;
            playSound(soundName);
        });
    });

    // Escucha las pulsaciones del teclado
    document.addEventListener('keydown', (e) => {
        // Verifica si la tecla presionada es la barra espaciadora
        if (e.key === ' ') {
            e.preventDefault(); // Evita el comportamiento predeterminado de la barra espaciadora (como hacer scroll)
            stopAllAudio();
        } else {
            const key = e.key.toLowerCase();
            const soundName = keyMap[key];
            if (soundName) {
                playSound(soundName);
            }
        }
    });
});