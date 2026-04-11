
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
