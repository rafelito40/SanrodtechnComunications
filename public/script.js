let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
}

// Inicial
slides[0].classList.add('active');

// Cambia cada 4 segundos
setInterval(showSlides, 4000);
