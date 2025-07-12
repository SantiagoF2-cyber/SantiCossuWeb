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

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

if (slides.length > 0) {
  showSlide(currentSlide);

  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }
}

document.querySelector("input[name='name']").addEventListener("input", (e) => {
  if (e.target.value.length < 3) {
    e.target.style.borderColor = "#ff4d4d";
  } else {
    e.target.style.borderColor = "green";
  }
});
