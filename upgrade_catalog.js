const fs = require('fs');

// 1. MODIFICAR HTML
let html = fs.readFileSync('public/catalogo.html', 'utf-8');

// Insertar Atributos 3D Vanilla-Tilt en las tarjetas
html = html.replace(/<div class="product-card">/g, '<div class="product-card" data-tilt data-tilt-glare data-tilt-max-glare="0.5" data-tilt-scale="1.05">');

// Categorizar inteligentemente los productos usando su texto interior, y añadir insignias Neón
const productsRegex = /(<div class="product-card"[^>]*>[\s\S]*?<h[34]>)(.*?)(<\/h[34]>)([\s\S]*?<\/div>)/gi;
let idx = 0;
html = html.replace(productsRegex, (match, prefix, title, titleTagEnd, suffix) => {
    let t = title.toLowerCase();
    let cat = "otro";
    if (t.includes('impresora') || t.includes('rollo') || t.includes('tinta')) cat = 'impresora';
    else if (t.includes('teléfono') || t.includes('telefono')) cat = 'telefono';
    else if (t.includes('computadora') || t.includes('dell') || t.includes('lenovo') || t.includes('portátil') || t.includes('laptop')) cat = 'computadora';
    else if (t.includes('tv') || t.includes('fire')) cat = 'tv';
    else if (t.includes('bocina') || t.includes('audifono') || t.includes('sound')) cat = 'bocinas';

    let badge = "";
    if (idx === 0 || idx === 7 || idx === 15) badge = '<div class="premium-badge neon-red">🔥 Top Ventas</div>';
    else if (idx === 3 || idx === 11 || idx === 20) badge = '<div class="premium-badge neon-blue">⭐ Premium</div>';
    idx++;

    return prefix.replace('class="product-card"', `class="product-card" data-category="${cat}"`) + badge + title + titleTagEnd + suffix;
});

// Reemplazar la galería rota del fondo con un Swiper
const premiumSliderHtml = `
<!-- SWIPER CATALOGO DESTACADOS -->
<section class="hero-swiper-section">
    <h2 class="section-title" style="text-align: center; color: #fff; text-shadow: 0 0 15px #00e5ff; margin-bottom: 20px;">Marcas Destacadas</h2>
    <div class="swiper swiperCatalog">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="images/productos/producto3.jpg" alt="Marca"></div>
        <div class="swiper-slide"><img src="images/productos/producto4.jpg" alt="Marca"></div>
        <div class="swiper-slide"><img src="images/productos/BOCI-0202.jpg" alt="Marca"></div>
        <div class="swiper-slide"><img src="images/productos/BOCI-0014.jpg" alt="Marca"></div>
        <div class="swiper-slide"><img src="images/productos/fire1.jpg" alt="Marca"></div>
        <div class="swiper-slide"><img src="images/productos/epsonl5590.jfif" alt="Marca"></div>
        <div class="swiper-slide"><img src="images/productos/telefono.jfif" alt="Marca"></div>
      </div>
    </div>
</section>
`;
if (!html.includes('swiperCatalog')) {
    html = html.replace(/<!-- SLIDER ADICIONAL -->[\s\S]*?<\/section>/, premiumSliderHtml);
}

// Inyectar el botón y las librerías al final (rompiendo caché)
const librerias = `
<!-- BOTÓN MAGNÉTICO WHATSAPP -->
<a href="https://wa.me/18296232138?text=Hola,%20me%20encuentro%20en%20el%20CATÁLOGO%20y%20necesito%20asesoría%20inmediata." class="whatsapp-float" target="_blank">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
</a>

<!-- LIBRERÍAS DE KINESIA 3D Y SLIDER -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="catalogo_logic.js?v=${Date.now()}"></script>
`;
html = html.replace('</body>', librerias + '\n</body>');

if (!html.includes('swiper-bundle')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n</head>');
}
html = html.replace(/<link rel="stylesheet" href="catalogo\.css(\?v=[0-9]+)?" \/>/, `<link rel="stylesheet" href="catalogo.css?v=${Date.now()}" />`);

fs.writeFileSync('public/catalogo.html', html);
console.log("HTML Processed.");

// 2. ESCRIBIR LA LOGICA CUSTOM DEL CATALOGO (catalogo_logic.js)
const catalogoJS = `
// 🔮 EFECTO FÍSICO Y REFLEJO (VANILLA TILT) EN TODAS LAS TARJETAS
VanillaTilt.init(document.querySelectorAll(".product-card"), {
    max: 12,
    speed: 400,
    glare: true,
    "max-glare": 0.35,
    scale: 1.04
});

// 🔎 LÓGICA DE BÚSQUEDA Y FILTRADO INSTANTÁNEO CERO RECARGA
const searchBox = document.getElementById('search');
const categoryDropdown = document.getElementById('category');
const cards = document.querySelectorAll('.product-card');

function filterProducts() {
    const searchText = searchBox.value.toLowerCase();
    const activeCategory = categoryDropdown.value;

    cards.forEach(card => {
        const titleElement = card.querySelector('h3') || card.querySelector('h4');
        const title = titleElement ? titleElement.innerText.toLowerCase() : '';
        const category = card.getAttribute('data-category') || '';
        
        let matchesSearch = title.includes(searchText);
        let matchesCategory = (activeCategory === '' || category === activeCategory);

        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
        }
    });
}

if(searchBox) searchBox.addEventListener('input', filterProducts);
if(categoryDropdown) categoryDropdown.addEventListener('change', filterProducts);


// 🔄 SWIPER 11 MARCAS INFINITAS
document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".swiperCatalog", {
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        }
    });
});
`;
fs.writeFileSync('public/catalogo_logic.js', catalogoJS);
console.log("JS Processed.");
