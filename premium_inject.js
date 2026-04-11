const fs = require('fs');

// 1. Modificar HTML
let html = fs.readFileSync('public/index.html', 'utf-8');

const premiumFeaturesHtml = `
  <!-- 🌟 CINTA INFINITA (MARQUEE) -->
  <div class="marquee-container">
    <div class="marquee-content">
      <span>🚀 Tecnología de Punta</span><span class="dot">•</span>
      <span>⚡ Conexión Ultra Rápida</span><span class="dot">•</span>
      <span>📹 Seguridad Inteligente 24/7</span><span class="dot">•</span>
      <span>💻 Equipos Exclusivos</span><span class="dot">•</span>
      <span>🚀 Soporte Elite</span><span class="dot">•</span>
      <span>⚡ Conexión Ultra Rápida</span><span class="dot">•</span>
      <span>📹 Seguridad Inteligente 24/7</span><span class="dot">•</span>
      <span>💻 Equipos Exclusivos</span>
    </div>
  </div>

  <!-- 📊 ESTADÍSTICAS -->
  <section class="stats-section">
    <div class="container stats-grid">
      <div class="stat-card" data-aos="flip-up" data-aos-delay="100">
        <h3 class="counter" data-target="500">0</h3><span class="plus">+</span>
        <p>Clientes Satisfechos</p>
      </div>
      <div class="stat-card" data-aos="flip-up" data-aos-delay="250">
        <h3 class="counter" data-target="15">0</h3><span class="plus">+</span>
        <p>Años de Experiencia</p>
      </div>
      <div class="stat-card" data-aos="flip-up" data-aos-delay="400">
        <h3 class="counter" data-target="1200">0</h3><span class="plus">+</span>
        <p>Sistemas Instalados</p>
      </div>
    </div>
  </section>
`;

// Insert after swiper section
html = html.replace('<!-- SECCIÓN DIVERTIDA Y ACOGEDORA -->', premiumFeaturesHtml + '\n\n  <!-- SECCIÓN DIVERTIDA Y ACOGEDORA -->');

// BREAK CACHE: Force loading of new Javascript bypassing browser cache completely
const cacheBuster = Date.now();
html = html.replace(/<script src="index\.js(\?v=[0-9]+)?"><\/script>/, '<script src="index.js?v=' + cacheBuster + '"></script>');
html = html.replace(/<link rel="stylesheet" href="index\.css(\?v=[0-9]+)?" \/>/, '<link rel="stylesheet" href="index.css?v=' + cacheBuster + '" />');

fs.writeFileSync('public/index.html', html);


// 2. Modificar CSS
let css = fs.readFileSync('public/index.css', 'utf-8');
css += `
/* ================================= */
/* 🚀 SUPER ELEMENTOS PREMIUM AÑADIDOS */

.marquee-container {
  width: 100%;
  background: #00e5ff;
  padding: 12px 0;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  box-shadow: 0 0 25px rgba(0, 229, 255, 0.5);
  transform: rotate(-1.5deg);
  margin: 70px 0 50px 0;
  z-index: 10;
}

.marquee-content {
  display: inline-block;
  animation: marquee 12s linear infinite;
  font-weight: 800;
  font-size: 1.2rem;
  color: #020617;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.marquee-content span { margin: 0 25px; }
.marquee-content .dot { color: #020617; opacity: 0.6; }

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.stats-section {
  padding: 80px 20px;
  background: radial-gradient(circle at center, rgba(30,41,59,0.3), #0f172a 80%);
  position: relative;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  text-align: center;
}

.stat-card {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(0,229,255,0.3);
  border-radius: 20px;
  padding: 40px 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.6);
  transition: transform 0.4s ease;
  position: relative;
}

.stat-card::after {
  content: ''; position: absolute;
  top: 0; left: 50%; transform: translateX(-50%);
  width: 60%; height: 4px;
  background: #00e5ff;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 0 15px #00e5ff;
}

.stat-card:hover {
  transform: translateY(-15px);
  border-color: #00e5ff;
  box-shadow: 0 20px 50px rgba(0,229,255,0.2);
}

.stat-card h3 {
  display: inline-block;
  font-size: 4.2rem;
  color: #fff;
  font-weight: 900;
  margin-bottom: 5px;
  text-shadow: 0 0 20px rgba(255,255,255,0.2);
}

.stat-card .plus {
  font-size: 3.5rem;
  color: #00e5ff;
  font-weight: 900;
  margin-left: 5px;
  vertical-align: top;
  text-shadow: 0 0 15px rgba(0,229,255,0.8);
}

.stat-card p {
  color: #94a3b8;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
}
`;
fs.writeFileSync('public/index.css', css);


// 3. Modificar JS
let js = fs.readFileSync('public/index.js', 'utf-8');

// Forzador robusto para el swiper (Si no habia funcionado el anterior, reasegurarlo)
js = js.replace(/autoplay:\s*false,/g, 'autoplay: { delay: 1500, disableOnInteraction: false },');

const statsJS = \`
// 🔢 ANIMACIÓN DE ESTADÍSTICAS INTELIGENTE
const counters = document.querySelectorAll('.counter');
const animateCounters = () => {
  counters.forEach(counter => {
    counter.innerText = '0';
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const speed = 100; // lower is faster
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

let statsStarted = false;
window.addEventListener('scroll', () => {
  const statsSection = document.querySelector('.stats-section');
  if (statsSection && !statsStarted) {
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;
    if (sectionPos < screenPos - 100) {
      animateCounters();
      statsStarted = true;
    }
  }
});
\`;
js += '\n\n' + statsJS;

fs.writeFileSync('public/index.js', js);
console.log('Premium features injected, cache bypassed.');
