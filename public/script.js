
let i = 0;
const texto = document.getElementById("mensaje-bienvenida");

if (texto) {
  texto.textContent = mensajes[0];
  setInterval(() => {
    i = (i + 1) % mensajes.length;
    texto.textContent = mensajes[i];
  }, 2500);
}

// Slider automático
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 4000);
