
document.addEventListener("DOMContentLoaded", () => {
  try {
    const swiperEl = document.querySelector(".mySwiper");
    if (swiperEl) {
      var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: true,
          scale: 0.8,
        },
        speed: 1200,
        autoplay: {
          delay: 2500,
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
    }
  } catch (e) {
    console.error("No se pudo iniciar Swiper:", e);
  }
});


// MENU MÓVIL
const menuToggle = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}



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

// WIDGET FLOTANTE FINANCIAMIENTO DINÁMICO
const finaFloat = document.getElementById("finaFloat");
if (finaFloat) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      finaFloat.classList.add("show");
    } else {
      finaFloat.classList.remove("show");
    }
  });

  finaFloat.addEventListener("click", () => {
    window.location.href = "https://wa.me/18296232138?text=Hola,%20me%20interesa%20explorar%20las%20opciones%20de%20Financiamiento%20con%20Cooperativa%20Altagracia.";
  });
}

// 💖 SISTEMA DE LIKE PERSISTENTE CUSTOMIZADO
document.addEventListener("DOMContentLoaded", () => {
  const likeBtn = document.getElementById('custom-like-btn');
  const likeCountSpan = document.getElementById('custom-like-count');
  
  if (likeBtn && likeCountSpan) {
    // 1. Obtener la cantidad inicial de likes
    fetch(`https://api.counterapi.dev/v1/sanrod/likes/?t=${Date.now()}`)
      .then(r => r.json())
      .then(data => {
        likeCountSpan.innerText = data.count || 0;
      })
      .catch(err => {
        console.error('Error fetching likes:', err);
        likeCountSpan.innerText = '0';
      });

    // 2. Comprobar si ya le dio like antes en este dispositivo
    if (localStorage.getItem('sanrod_liked') === 'true') {
      likeBtn.classList.add('liked'); // Mantener el corazón rojo permanentemente
    }
    
    // 3. Manejar el click en el botón de Like
    likeBtn.addEventListener('click', () => {
      // Si ya le dio like, le mostramos un mensaje bonito de agradecimiento y evitamos el spam
      if (localStorage.getItem('sanrod_liked') === 'true') {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: '¡Gracias por tu apoyo! 💖',
            text: 'Ya has valorado nuestra página. Nos alegra mucho que te guste.',
            icon: 'success',
            iconColor: '#ff0055',
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#e2e8f0',
            confirmButtonColor: '#00e5ff',
            confirmButtonText: 'Cerrar'
          });
        }
        return; // Salimos sin sumar otro like
      }

      // Marcamos el estado en el dispositivo
      localStorage.setItem('sanrod_liked', 'true');
      likeBtn.classList.add('liked');
      
      // Actualizamos visualmente al instante el contador
      const currentClicks = parseInt(likeCountSpan.innerText) || 0;
      likeCountSpan.innerText = currentClicks + 1;

      // Sumamos el like real en la API pública
      fetch(`https://api.counterapi.dev/v1/sanrod/likes/up?t=${Date.now()}`)
        .then(r => r.json())
        .then(data => {
          likeCountSpan.innerText = data.count; // Ajustar con precisión real
        })
        .catch(err => console.error('Error incrementing likes:', err));
    });
  }
});
