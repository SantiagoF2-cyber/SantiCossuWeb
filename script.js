/* 
Copyright © 2025 Santiago Cossu (SantiagoF2-cyber)
This work is licensed under CC BY-NC-ND 4.0.
Do not copy, modify or use without permission.
Full license: https://creativecommons.org/licenses/by-nc-nd/4.0/
*/
document.addEventListener("DOMContentLoaded", () => {
  const idioma = localStorage.getItem("idioma");
  const path = window.location.pathname;

  const rutas = {
    "index.html": "index-en.html",
    "acercademi.html": "aboutme-en.html",
    "proyectos.html": "projects-en.html",
    "habilidades.html": "skills-en.html",
    "contacto.html": "contact-en.html",

    "index-en.html": "index.html",
    "aboutme-en.html": "acercademi.html",
    "projects-en.html": "proyectos.html",
    "skills-en.html": "habilidades.html",
    "contact-en.html": "contacto.html",
  };

  const archivo = path.split("/").pop();

  if (idioma === "en" && rutas[archivo] && !archivo.includes("-en.html")) {
    window.location.href = rutas[archivo];
  } else if (idioma === "es" && archivo.includes("-en.html")) {
    window.location.href = rutas[archivo];
  }
});

const btnModoOscuro = document.querySelector(".modo-oscuro-toggle");

if (btnModoOscuro) {
  btnModoOscuro.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");
  });
}

const btnEs = document.getElementById("es-btn");
const btnEn = document.getElementById("en-btn");

if (btnEs && btnEn) {
  const currentPage = window.location.pathname;

  if (currentPage.includes("-en.html")) {
    btnEs.style.display = "inline-block";
    btnEn.style.display = "none";
  } else {
    btnEn.style.display = "inline-block";
    btnEs.style.display = "none";
  }

  btnEn.addEventListener("click", () => {
    localStorage.setItem("idioma", "en");
    let newUrl = currentPage;

    if (currentPage.includes("index.html")) {
      newUrl = currentPage.replace("index.html", "index-en.html");
    } else if (currentPage.includes("acercademi.html")) {
      newUrl = currentPage.replace("acercademi.html", "aboutme-en.html");
    } else if (currentPage.includes("proyectos.html")) {
      newUrl = currentPage.replace("proyectos.html", "projects-en.html");
    } else if (currentPage.includes("contacto.html")) {
      newUrl = currentPage.replace("contacto.html", "contact-en.html");
    }
    if (currentPage.includes("habilidades.html")) {
      newUrl = currentPage.replace("habilidades.html", "skills-en.html");
    }
    window.location.href = newUrl;
  });

  btnEs.addEventListener("click", () => {
    localStorage.setItem("idioma", "es");
    let newUrl = currentPage;

    if (currentPage.includes("index-en.html")) {
      newUrl = currentPage.replace("index-en.html", "index.html");
    } else if (currentPage.includes("aboutme-en.html")) {
      newUrl = currentPage.replace("aboutme-en.html", "acercademi.html");
    } else if (currentPage.includes("projects-en.html")) {
      newUrl = currentPage.replace("projects-en.html", "proyectos.html");
    } else if (currentPage.includes("contact-en.html")) {
      newUrl = currentPage.replace("contact-en.html", "contacto.html");
    }

    if (currentPage.includes("skills-en.html")) {
      newUrl = currentPage.replace("skills-en.html", "habilidades.html");
    }
    window.location.href = newUrl;
  });
}


const nameInput = document.querySelector("input[name='name']");
if (nameInput) {
  nameInput.addEventListener("input", (e) => {
    if (e.target.value.length < 3) {
      e.target.style.borderColor = "#ff4d4d";
    } else {
      e.target.style.borderColor = "green";
    }
  });
}
// ===== FIN utilidades (idioma / dark mode / formularios) =====
// ===== Slider de proyectos =====
// ===== FIN utilidades (idioma / dark mode / formularios) =====
// ===== Slider de proyectos (HTML actualizado: .dots y .dot) =====
(function initProjectsSlider() {
  const root = document.getElementById('projects-slider');
  if (!root) return;

  const slides   = Array.from(root.querySelectorAll('.slide'));
  const prevBtn  = root.querySelector('.slider-arrow.prev');
  const nextBtn  = root.querySelector('.slider-arrow.next');
  const dotsWrap = root.querySelector('.dots'); // <-- nuevo contenedor

  if (!slides.length || !prevBtn || !nextBtn || !dotsWrap) return;

  // Slide activo inicial
  let index = slides.findIndex(s => s.classList.contains('active'));
  if (index < 0) { index = 0; slides[0].classList.add('active'); }

  // Crear dots
  dotsWrap.innerHTML = slides
    .map((_, i) => `<button class="dot" aria-label="Ir al slide ${i + 1}"></button>`)
    .join('');
  const dots = Array.from(dotsWrap.querySelectorAll('.dot'));
  dots[index].classList.add('active');

  function goTo(i) {
    slides[index].classList.remove('active');
    dots[index].classList.remove('active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('active');
    dots[index].classList.add('active');
  }

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Teclado
  root.setAttribute('tabindex', '0');
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  });

  // Touch (swipe)
  let startX = 0, touching = false;
  root.addEventListener('touchstart', (e) => {
    touching = true;
    startX = e.touches[0].clientX;
    pause();
  }, { passive: true });

  root.addEventListener('touchend', (e) => {
    if (!touching) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) (dx < 0 ? next() : prev());
    touching = false;
    resume();
  });

  // Autoplay con pausa en hover
  let timer = null;
  const INTERVAL = 4000;
  function start() { if (!timer) timer = setInterval(next, INTERVAL); }
  function pause() { if (timer) clearInterval(timer); timer = null; }
  function resume() { start(); }

  root.addEventListener('mouseenter', pause);
  root.addEventListener('mouseleave', resume);

  // Iniciar
  start();
})();
