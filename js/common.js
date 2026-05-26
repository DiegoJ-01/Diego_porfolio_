/* Shared logic: theme, language, clock */

const I18N = {
  es: {
    about_desc:      'Diseñador gráfico y director de arte con base en España. Especializado en identidad visual, motion y 3D.',
    nav_awards:      'Premiados',
    nav_artdir:      'Dirección de Arte',
    nav_3d:          '3D y Video',
    nav_cv:          'CV & Contacto',
    footer_role:     'Diseñador Gráfico',
    marquee_contact: 'CONTACTO  —  CONTACTO  —  CONTACTO  —  CONTACTO  —  CONTACTO  —  CONTACTO  —  CONTACTO  —  CONTACTO  —  ',
    back:            '← Inicio',
    page_awards:     'Premiados',
    page_awards_sub: 'Trabajos reconocidos en los principales premios de diseño.',
    page_artdir:     'Dirección de Arte',
    page_artdir_sub: 'Campañas, editoriales y proyectos fotográficos.',
    page_3d:         '3D y Video',
    page_3d_sub:     'Motion graphics, visualización 3D y piezas audiovisuales.',
    page_cv:         'CV & Contacto',
    page_cv_sub:     'Trayectoria profesional y formas de contacto.',
    contact_intro:   '¿Tienes un proyecto en mente?',
  },
  en: {
    about_desc:      'Graphic designer and art director based in Spain. Specialised in visual identity, motion, and 3D.',
    nav_awards:      'Awards',
    nav_artdir:      'Art Direction',
    nav_3d:          '3D & Video',
    nav_cv:          'CV & Contact',
    footer_role:     'Graphic Designer',
    marquee_contact: 'CONTACT  —  CONTACT  —  CONTACT  —  CONTACT  —  CONTACT  —  CONTACT  —  CONTACT  —  CONTACT  —  ',
    back:            '← Home',
    page_awards:     'Awards',
    page_awards_sub: 'Work recognised at the leading design awards.',
    page_artdir:     'Art Direction',
    page_artdir_sub: 'Campaigns, editorials, and photographic projects.',
    page_3d:         '3D & Video',
    page_3d_sub:     'Motion graphics, 3D visualisation, and audiovisual pieces.',
    page_cv:         'CV & Contact',
    page_cv_sub:     'Professional background and ways to get in touch.',
    contact_intro:   'Have a project in mind?',
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

/* ── language ── */
let currentLang = localStorage.getItem('der-lang') || 'es';

function applyLang(lang) {
  const t = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  if (langBtn) langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
  html.lang = lang;
  html.dataset.lang = lang;
  localStorage.setItem('der-lang', lang);
  currentLang = lang;
}

langBtn && langBtn.addEventListener('click', () => {
  applyLang(currentLang === 'es' ? 'en' : 'es');
});

applyLang(currentLang);

/* ── clock ── */
function tick() {
  const now  = new Date();
  const dayEl = document.getElementById('timeDay');
  const clkEl = document.getElementById('timeClock');

  if (clkEl) {
    clkEl.textContent = now.toLocaleTimeString('es-ES', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }

  if (dayEl) {
    const days_es   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    const days_en   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months_es = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const months_en = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const d   = currentLang === 'es' ? days_es   : days_en;
    const m   = currentLang === 'es' ? months_es : months_en;
    dayEl.textContent = `${d[now.getDay()]}, ${now.getDate()} ${m[now.getMonth()]}`;
  }
}

setInterval(tick, 1000);
tick();
