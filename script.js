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

/* =========================
   Tabs + Lightbox Galerías
   ========================= */
(function () {
  // ---- Tabs ----
  const tabButtons = Array.from(document.querySelectorAll(".tabs .tab"));
  const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

  // Título dinámico (se crea si no existe)
  const portfolio = document.getElementById("portfolio");
  let titleEl = portfolio?.querySelector(".tab-current-title");
  if (!titleEl && portfolio) {
    titleEl = document.createElement("h3");
    titleEl.className = "tab-current-title";
    portfolio
      .querySelector(".tab-panels")
      ?.insertAdjacentElement("beforebegin", titleEl);
  }

  function setTitleFrom(btn) {
    if (!titleEl) return;
    // Toma el texto del botón de la pestaña como título
    titleEl.textContent = btn?.textContent?.trim() || "";
  }
  function activateTab(btn) {
    const targetId = btn.getAttribute("aria-controls");

    // 1) Cambia estado visual de pestañas
    tabButtons.forEach((b) => b.classList.toggle("active", b === btn));
    tabButtons.forEach((b) => {
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
      b.tabIndex = b === btn ? 0 : -1;
    });

    // 2) Muestra solo el panel objetivo
    tabPanels.forEach((p) => p.classList.toggle("active", p.id === targetId));

    // 3) Si el lightbox estaba abierto, lo cerramos para no mezclar galerías
    if (!lightbox.classList.contains("hidden")) {
      lightbox.classList.add("hidden");
      document.body.style.overflow = "";
    }
    // Resetea referencias de navegación del lightbox
    currentGallery = null;
    currentIndex = 0;

    // 4) Actualiza el título visible
    setTitleFrom(btn);
    // Lleva la vista al inicio del portafolio
    portfolio?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Activación + navegación con flechas
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn));
    btn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const idx = tabButtons.indexOf(btn);
        const next =
          tabButtons[(idx + dir + tabButtons.length) % tabButtons.length];
        next.focus();
        activateTab(next);
      }
    });
  });

  // Setea el título inicial si hay una pestaña marcada como activa
  const initial =
    tabButtons.find((b) => b.classList.contains("active")) || tabButtons[0];
  if (initial) setTitleFrom(initial);

  // ---- Lightbox ----
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const imgEl = lightbox.querySelector(".lightbox-img");
  const prevBtn = lightbox.querySelector(".lb-prev");
  const nextBtn = lightbox.querySelector(".lb-next");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const backdrop = lightbox.querySelector(".lightbox-backdrop");

  let currentGallery = null; // NodeList de imágenes
  let currentIndex = 0;

  function openLightbox(galleryImgs, index) {
    currentGallery = galleryImgs;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    imgEl.focus();
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
    currentGallery = null;
  }

  function updateLightbox() {
    if (!currentGallery) return;
    const el = currentGallery[currentIndex];
    imgEl.src = el.getAttribute("data-full") || el.src;
    imgEl.alt = el.alt || "Vista ampliada";
  }

  function go(delta) {
    if (!currentGallery) return;
    currentIndex =
      (currentIndex + delta + currentGallery.length) % currentGallery.length;
    updateLightbox();
  }

  // Delegación: click en cualquier imagen de .gallery-grid
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".gallery-grid img");
    if (!img) return;
    const grid = img.closest(".gallery-grid");
    const imgs = Array.from(grid.querySelectorAll("img"));
    const idx = imgs.indexOf(img);
    openLightbox(imgs, idx);
  });

  // Controles
  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));
  closeBtn.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeLightbox();
  });

  // Teclado
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });
})();

// ===== Rotador de servicios en el hero (ES / EN según la página) =====
document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.getElementById("hero-rotating-text");
  if (!textEl) return;

  const dots = document.querySelectorAll(".hero-widget-dots li");

  // Detectar idioma desde la etiqueta <html lang="...">
  const lang = document.documentElement.lang || "es";

  // Mensajes según idioma
  const mensajes =
    lang === "en"
      ? [
          "Conversion-focused landing pages for services and online mentoring.",
          "End-to-end payment and booking flows (e.g. PayPal + Calendly).",
          "Custom HubSpot modules and landing pages, easy for clients to edit.",
          "Web apps with admin panels (Supabase, databases, appointments and patients).",
        ]
      : [
          "Landing pages enfocadas en conversión para servicios y mentorías online.",
          "Flujos completos de pago y agenda (ej. PayPal + Calendly).",
          "Módulos y landings personalizadas en HubSpot, fáciles de editar por el cliente.",
          "Aplicaciones web con panel de administración (Supabase, bases de datos, turnos y pacientes).",
        ];

  let index = 0;

  function actualizarTexto() {
    textEl.classList.remove("fade-in");
    textEl.classList.add("fade-out");

    setTimeout(() => {
      index = (index + 1) % mensajes.length;
      textEl.textContent = mensajes[index];

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      textEl.classList.remove("fade-out");
      textEl.classList.add("fade-in");
    }, 300);
  }

  setInterval(actualizarTexto, 2600);
});
