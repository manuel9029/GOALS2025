// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Referencias a elementos DOM
    const introContainer = document.querySelector('.intro-container');
    const dreamsContainer = document.querySelector('.dreams-container');
    const skipIntroBtn = document.getElementById('skip-intro');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const cards = document.querySelectorAll('.card');
    const introVideo = document.getElementById('intro-video');

    // Temporizador para saltar automáticamente la introducción después de 15 segundos
    const autoSkipTimer = setTimeout(() => {
        skipIntro();
    }, 15000);

    // Función para saltar la introducción
    function skipIntro() {
        introContainer.style.opacity = '0';
        clearTimeout(autoSkipTimer);

        setTimeout(() => {
            introContainer.style.display = 'none';
            dreamsContainer.classList.remove('hidden');
            dreamsContainer.style.opacity = '1';

            // Animar la aparición de las tarjetas
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 150);
            });
        }, 1000);
    }

    // Event listener para el botón de saltar introducción
    skipIntroBtn.addEventListener('click', skipIntro);

    // Cambio de temas
    themeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Eliminar clase activa de todos los botones
            themeButtons.forEach(btn => btn.classList.remove('active'));

            // Agregar clase activa al botón clickeado
            this.classList.add('active');

            // Cambiar clase del body para el tema seleccionado
            document.body.classList.remove('blue-theme', 'red-theme', 'green-theme');

            if (this.classList.contains('blue-theme')) {
                document.body.classList.add('blue-theme');
            } else if (this.classList.contains('red-theme')) {
                document.body.classList.add('red-theme');
            } else if (this.classList.contains('green-theme')) {
                document.body.classList.add('green-theme');
            }
        });
    });

    // Navegación a páginas de detalles
    cards.forEach(card => {
        const detailsBtn = card.querySelector('.view-details-btn');

        detailsBtn.addEventListener('click', function (e) {
            e.stopPropagation(); // Evitar que se active el volteo de la tarjeta
            const targetPage = card.getAttribute('data-page');

            // Efecto de transición antes de redirigir
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = targetPage;
            }, 500);
        });
    });

    // Detectar cuando termina el video local
    if (introVideo && introVideo.tagName.toLowerCase() === 'video') {
        introVideo.addEventListener('ended', skipIntro);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('intro-video');

    // Intenta reproducir con sonido desde el inicio
    try {
        video.muted = false;
        video.play().catch(() => {
            console.warn('Autoplay con sonido fue bloqueado. Esperando interacción del usuario...');
        });
    } catch (error) {
        console.warn('Error al intentar reproducir con sonido:', error);
    }

    // Si el usuario toca o hace clic en cualquier parte, activar sonido
    function activarSonido() {
        video.muted = false;
        video.play();
        // Solo se necesita una vez, así que quitamos el listener
        document.removeEventListener('click', activarSonido);
        document.removeEventListener('touchstart', activarSonido);
    }

    document.addEventListener('click', activarSonido);
    document.addEventListener('touchstart', activarSonido);
});


