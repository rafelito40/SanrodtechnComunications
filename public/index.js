
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
