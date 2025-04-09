// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos DOM
    const themeButtons = document.querySelectorAll('.theme-btn');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const rotateLeftBtn = document.getElementById('rotate-left');
    const rotateRightBtn = document.getElementById('rotate-right');
    const rotationSlider = document.getElementById('rotation-slider');
    const productImg = document.getElementById('product-img');
    const progressBar = document.querySelector('.progress-bar');
    
    // Variables para la rotación 360
    let currentRotation = 0;
    const totalFrames = 36; // 36 frames para una rotación completa (cada 10 grados)
    const imagePaths = [];
    
    // Crear rutas de imágenes para simulación de rotación 360
    // En un escenario real, estas serían imágenes reales de diferentes ángulos
    for (let i = 0; i < totalFrames; i++) {
        imagePaths.push(`/api/placeholder/600/400`);
    }
    
    // Cambio de temas
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
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
    
    // Tabs de especificaciones
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Eliminar clase activa de todos los botones y paneles
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
            
            // Mostrar el panel correspondiente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Rotación 360 - Botones de control
    rotateLeftBtn.addEventListener('click', function() {
        currentRotation = (currentRotation - 10 + 360) % 360;
        updateRotation();
    });
    
    rotateRightBtn.addEventListener('click', function() {
        currentRotation = (currentRotation + 10) % 360;
        updateRotation();
    });
    
    // Rotación 360 - Slider
    rotationSlider.addEventListener('input', function() {
        currentRotation = parseInt(this.value);
        updateRotation(false);
    });
    
    // Función para actualizar la rotación
    function updateRotation(updateSlider = true) {
        // Calcular qué frame mostrar basado en la rotación actual
        const frameIndex = Math.floor(currentRotation / (360 / totalFrames));
        
        // En un escenario real, aquí cargaríamos diferentes imágenes
        // Para esta simulación, solo aplicamos una transformación CSS
        productImg.style.transform = `rotateY(${currentRotation}deg)`;
        
        // Actualizar el slider si es necesario
        if (updateSlider) {
            rotationSlider.value = currentRotation;
        }
    }
    
    // Animar la barra de progreso al cargar la página
    if (progressBar) {
        const targetWidth = progressBar.style.width;
        progressBar.style.width = '0%';
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, 500);
    }
    
    const detailVideo = document.getElementById('detail-video');
    if (detailVideo) {
        detailVideo.addEventListener('ended', function() {
            document.querySelector('.model-viewer-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    
    // Inicializar la rotación
    updateRotation();
    
    // Efecto de entrada para los elementos
    const sections = document.querySelectorAll('.intro-video-section, .model-viewer-section, .specs-section, .progress-section');
    
    // Función para verificar si un elemento está en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Función para verificar elementos visibles y animarlos
    function checkVisibility() {
        sections.forEach(section => {
            if (isElementInViewport(section) && !section.classList.contains('animated')) {
                section.classList.add('animated', 'fade-in');
            }
        });
    }
    
    // Verificar visibilidad inicial
    checkVisibility();
    
    // Verificar en scroll
    window.addEventListener('scroll', checkVisibility);
});




const detailVideo = document.getElementById('detail-video');

function playVideoWithSound() {
    if (detailVideo) {
        detailVideo.muted = false;
        detailVideo.play().catch(e => {
            console.log('No se pudo reproducir automáticamente:', e);
        });
    }

    // Solo queremos que esto ocurra una vez
    document.removeEventListener('click', playVideoWithSound);
    document.removeEventListener('touchstart', playVideoWithSound);
}

// Espera a que el usuario toque o haga clic en cualquier parte
document.addEventListener('click', playVideoWithSound);
document.addEventListener('touchstart', playVideoWithSound);
