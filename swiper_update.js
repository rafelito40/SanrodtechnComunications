const fs = require('fs');
const path = require('path');

// 1. UPDATE index.html
let html = fs.readFileSync('public/index.html', 'utf-8');

const newSliderHTML = `
  <!-- SWIPER SLIDER PREMIUM 3D -->
  <section class="hero-swiper-section" data-aos="fade-up">
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        
        <div class="swiper-slide">
          <img src="images/productos/producto3.jpg" alt="Destacado" />
          <div class="glass-caption">
            <h3>Nuevos Estándares</h3>
            <p>La mejor tecnología, al alcance de tus manos.</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="images/productos/fina1.jfif" alt="Financiamientos" />
          <div class="glass-caption">
            <h3>Financiamientos</h3>
            <p>Pensamos en soluciones rápidas para ti.</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="images/productos/producto4.jpg" alt="Premium" />
          <div class="glass-caption">
            <h3>Servicio Premium</h3>
            <p>Instalación y soporte de red para empresas.</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="images/productos/mouse1.jfif" alt="Mouse" />
          <div class="glass-caption">
            <h3>Accesorios Gaming</h3>
            <p>Precisión absoluta y diseños ergonómicos.</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="images/productos/papel1.jfif" alt="Papeleria" />
          <div class="glass-caption">
            <h3>Papelería Empresarial</h3>
            <p>Suministros integrales de oficina superior.</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="images/productos/producto6.jpg" alt="Soluciones" />
          <div class="glass-caption">
            <h3>Alta Personalización</h3>
            <p>Configuramos tu infraestructura desde cero.</p>
          </div>
        </div>
        <div class="swiper-slide">
          <img src="images/productos/seguro.png" alt="Seguridad" />
          <div class="glass-caption">
            <h3>Sistemas de Seguridad</h3>
            <p>Protección 24/7 con monitoreo inteligente.</p>
          </div>
        </div>

      </div>
      <!-- Controles -->
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </section>
`;

html = html.replace(/<!-- SLIDER -->[\s\S]*?(?=<!-- SECCIÓN DIVERTIDA Y ACOGEDORA -->)/, newSliderHTML);

if (!html.includes('swiper-bundle.min.css')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />\n</head>');
}
if (!html.includes('swiper-bundle.min.js')) {
    // Inserción antes de script index.js
    html = html.replace('<script src="index.js"></script>', '<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>\n  <script src="index.js"></script>');
}

fs.writeFileSync('public/index.html', html);

// 2. UPDATE index.css
let css = fs.readFileSync('public/index.css', 'utf-8');
css = css.replace(/\/\* 🖼️ SLIDER ACTUALIZADO[\s\S]*?(?=\/\* 🎉 SECCIÓN DIVERTIDA \*\/)/, `
/* 🌌 SWIPER SLIDER PREMIUM 3D */
.hero-swiper-section {
  width: 100%;
  padding: 40px 0 60px;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(0,229,255,0.03), transparent 60%);
}

.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 380px;
  height: 420px;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 15px 35px rgba(0,0,0,0.5);
  position: relative;
  overflow: hidden;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 60%;
  object-fit: contain;
  padding: 20px;
  filter: drop-shadow(0 10px 10px rgba(0,0,0,0.5));
}

.glass-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(10px);
  border-top: 3px solid rgba(0, 229, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15px;
}

.glass-caption h3 {
  color: #00e5ff;
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 5px;
  text-shadow: 0 0 10px rgba(0,229,255,0.4);
}

.glass-caption p {
  color: #e2e8f0;
  font-size: 0.95rem;
}

.swiper-button-next, .swiper-button-prev {
  color: #00e5ff !important;
  text-shadow: 0 0 15px rgba(0,229,255,0.8);
  background: rgba(15, 23, 42, 0.6);
  padding: 30px 20px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
}

.swiper-button-next:hover, .swiper-button-prev:hover {
  background: rgba(0,229,255,0.2);
}

.swiper-pagination-bullet {
  background: #fff !important;
  opacity: 0.4;
  width: 12px !important;
  height: 12px !important;
}
.swiper-pagination-bullet-active {
  background: #00e5ff !important;
  box-shadow: 0 0 10px #00e5ff;
  opacity: 1;
}

@media (max-width: 768px) {
  .swiper-slide { width: 280px; height: 350px; }
  .glass-caption h3 { font-size: 1.1rem; }
  .glass-caption p { font-size: 0.8rem; }
}

`);
fs.writeFileSync('public/index.css', css);

// 3. UPDATE index.js
let js = fs.readFileSync('public/index.js', 'utf-8');
js = js.replace(/let slides = document\.querySelectorAll\("\.slide"\);[\s\S]*?setInterval\(showSlide, 3000\);/g, `
document.addEventListener("DOMContentLoaded", () => {
  var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 250,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
`);
fs.writeFileSync('public/index.js', js);
console.log('Swiper 3D implantado con éxito.');
