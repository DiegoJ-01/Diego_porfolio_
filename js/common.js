/* Shared: theme, language, clock, video hover */

const I18N = {
  es: {
    about_desc:      'Diseñador gráfico y director de arte con base en España. Especializado en identidad visual, motion y 3D.',
    nav_work:        'Work',
    nav_cv:          'CV',
    nav_contacto:    'Contacto',
    footer_role:     'Diseñador Gráfico',
    marquee_contact: 'CONTACTO  —  CONTACTO  —  CONTACTO  —  CONTACTO  —  CONTACTO  —  CONTACTO  —  CONTACTO  —  CONTACTO  —  ',
    back:            '← Inicio',
    page_work:       'Work',
    page_work_sub:   'Selección de proyectos 2022 — 2025.',
    ws_study:        'Study Cases',
    ws_rrss:         'RRSS',
    ws_3d:           '3D y Video',
    ws_artdir:       'Dirección de Arte',
    page_cv:         'CV',
    page_cv_sub:     'Trayectoria profesional.',
    page_contacto:   'Contacto',
    page_contacto_sub: '¿Tienes un proyecto en mente?',
    contact_intro:   '¿Tienes un proyecto en mente?',
    desc_label:      'Descripción',
    cv_profile:      'Perfil',
    cv_experience:   'Experiencia',
    cv_education:    'Formación',
    cv_awards:       'Premios',
    cv_tools:        'Herramientas',
    cv_languages:    'Idiomas',
  },
  en: {
    about_desc:      'Graphic designer and art director based in Spain. Specialised in visual identity, motion, and 3D.',
    nav_work:        'Work',
    nav_cv:          'CV',
    nav_contacto:    'Contact',
    footer_role:     'Graphic Designer',
    marquee_contact: 'CONTACT  —  CONTACT  —  CONTACT  —  CONTACT  —  CONTACT  —  CONTACT  —  CONTACT  —  CONTACT  —  ',
    back:            '← Home',
    page_work:       'Work',
    page_work_sub:   'Selected projects 2022 — 2025.',
    ws_study:        'Study Cases',
    ws_rrss:         'Social Media',
    ws_3d:           '3D & Video',
    ws_artdir:       'Art Direction',
    page_cv:         'CV',
    page_cv_sub:     'Professional background.',
    page_contacto:   'Contact',
    page_contacto_sub: 'Have a project in mind?',
    contact_intro:   'Have a project in mind?',
    desc_label:      'Description',
    cv_profile:      'Profile',
    cv_experience:   'Experience',
    cv_education:    'Education',
    cv_awards:       'Awards',
    cv_tools:        'Tools',
    cv_languages:    'Languages',
  }
};

const html    = document.documentElement;
const langBtn = document.getElementById('langToggle');
const themBtn = document.getElementById('themeToggle');

/* ── theme ── */
(function initTheme() {
  const saved = localStorage.getItem('der-theme') || 'dark';
  html.dataset.theme = saved;
})();

themBtn && themBtn.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.dataset.theme = next;
  localStorage.setItem('der-theme', next);
});

/* ── language ──
   La visibilidad del contenido bilingüe (bloques [data-lang]) se controla
   íntegramente por CSS según el atributo html[data-lang]. Aquí solo
   intercambiamos los textos cortos de interfaz ([data-i18n]). */
let currentLang = localStorage.getItem('der-lang') || 'es';

function applyLang(lang) {
  const t = I18N[lang] || I18N.es;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  if (langBtn) langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
  html.lang = lang;
  html.dataset.lang = lang;           // ← dispara la visibilidad bilingüe vía CSS
  localStorage.setItem('der-lang', lang);
  currentLang = lang;
  window.currentLang = lang;
}
window.applyLang = applyLang;

langBtn && langBtn.addEventListener('click', () => {
  applyLang(currentLang === 'es' ? 'en' : 'es');
});

applyLang(currentLang);

/* ── clock ── */
function tick() {
  const now   = new Date();
  const dayEl = document.getElementById('timeDay');
  const clkEl = document.getElementById('timeClock');

  if (clkEl) {
    clkEl.textContent = now.toLocaleTimeString('es-ES', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }

  if (dayEl) {
    const days_es = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    const days_en = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const mon_es  = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const mon_en  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const d = currentLang === 'es' ? days_es : days_en;
    const m = currentLang === 'es' ? mon_es  : mon_en;
    dayEl.textContent = `${d[now.getDay()]}, ${now.getDate()} ${m[now.getMonth()]}`;
  }
}

setInterval(tick, 1000);
tick();

/* ── video autoplay on hover ──
   Soporta tanto iframes de YouTube ([data-video-id]) como <video> nativos. */
function initVideoAutoplay() {
  /* YouTube iframes */
  document.querySelectorAll('.story-video[data-video-id]').forEach(container => {
    const videoId = container.dataset.videoId;
    const iframe = container.querySelector('iframe');
    if (!iframe) return;

    const baseUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`;
    iframe.src = baseUrl;

    container.addEventListener('mouseenter', () => {
      if (!iframe.src.includes('autoplay=1')) {
        iframe.src = baseUrl + '&autoplay=1';   // con sonido
      }
    });
    container.addEventListener('mouseleave', () => {
      iframe.src = baseUrl;
    });
  });

  /* <video> nativos */
  document.querySelectorAll('.story-video > video').forEach(video => {
    const container = video.parentElement;

    container.addEventListener('mouseenter', () => {
      video.muted = false;                      // sonido siempre por defecto
      const p = video.play();
      if (p && p.catch) {
        p.catch(() => {                         // si el navegador bloquea el autoplay con sonido
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    });
    container.addEventListener('mouseleave', () => {
      video.pause();
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVideoAutoplay);
} else {
  initVideoAutoplay();
}
window.addEventListener('load', initVideoAutoplay);
