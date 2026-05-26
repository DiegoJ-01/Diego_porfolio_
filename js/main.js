/* Homepage: carousel + section hover previews */

const SLIDES = [
  {
    section: 'awards',
    bg: 'linear-gradient(145deg,#1c2514 0%,#0e1209 100%)',
    title: 'Laus 2024 — Plata',
    category: 'PREMIADOS',
    year: '2024',
  },
  {
    section: 'art-direction',
    bg: 'linear-gradient(145deg,#1e1a14 0%,#0f0d0a 100%)',
    title: 'Campaña\nSS25',
    category: 'DIRECCIÓN DE ARTE',
    year: '2025',
  },
  {
    section: '3d-video',
    bg: 'linear-gradient(145deg,#0e1220 0%,#080c18 100%)',
    title: 'Brand\nMotion',
    category: '3D & VIDEO',
    year: '2024',
  },
  {
    section: 'awards',
    bg: 'linear-gradient(145deg,#1a2010 0%,#0c120a 100%)',
    title: 'ADC*E\nShortlist',
    category: 'PREMIADOS',
    year: '2024',
  },
  {
    section: 'art-direction',
    bg: 'linear-gradient(145deg,#1c1c1c 0%,#101010 100%)',
    title: 'Editorial\nAW24',
    category: 'DIRECCIÓN DE ARTE',
    year: '2024',
  },
  {
    section: '3d-video',
    bg: 'linear-gradient(145deg,#101828 0%,#080e18 100%)',
    title: 'Product\nVisualization',
    category: '3D & VIDEO',
    year: '2025',
  },
  {
    section: 'awards',
    bg: 'linear-gradient(145deg,#14180e 0%,#0a0c08 100%)',
    title: 'FAD Premi\nEspecial',
    category: 'PREMIADOS',
    year: '2023',
  },
  {
    section: 'art-direction',
    bg: 'linear-gradient(145deg,#201e18 0%,#110f0c 100%)',
    title: 'Lookbook\nVerano',
    category: 'DIRECCIÓN DE ARTE',
    year: '2025',
  },
  {
    section: '3d-video',
    bg: 'linear-gradient(145deg,#0c1020 0%,#060810 100%)',
    title: 'Reel\n2024',
    category: '3D & VIDEO',
    year: '2024',
  },
  {
    section: 'art-direction',
    bg: 'linear-gradient(145deg,#181816 0%,#0c0c0a 100%)',
    title: 'Identidad\nVisual',
    category: 'DIRECCIÓN DE ARTE',
    year: '2025',
  },
];

const SLIDE_DURATION = 2000; // ms per slide

const carousel    = document.getElementById('carousel');
const progressBar = document.getElementById('progressBar');
const slideLabel  = document.getElementById('slideLabel');
const playBtn     = document.getElementById('playToggle');

let currentIndex  = 0;
let filteredSlides = [...SLIDES.map((s, i) => i)]; // indices
let timer         = null;
let isPlaying     = true;
let activeSection = null;

/* Build DOM slides */
SLIDES.forEach((s, i) => {
  const el = document.createElement('div');
  el.className = 'slide';
  el.dataset.index = i;
  el.innerHTML = `
    <div class="slide-bg" style="background:${s.bg}"></div>
    <span class="slide-year">${s.year}</span>
    <div class="slide-content">
      <p class="slide-category">${s.category}</p>
      <h2 class="slide-title">${s.title.replace('\n','<br>')}</h2>
    </div>
  `;
  carousel.appendChild(el);
});

const slideEls = carousel.querySelectorAll('.slide');

function showSlide(realIndex) {
  slideEls.forEach((el, i) => el.classList.toggle('active', i === realIndex));
  const s = SLIDES[realIndex];
  if (slideLabel) slideLabel.textContent = `${filteredSlides.indexOf(realIndex) + 1} / ${filteredSlides.length}`;
  startProgress();
}

function next() {
  const pos = filteredSlides.indexOf(currentIndex);
  const nextPos = (pos + 1) % filteredSlides.length;
  currentIndex = filteredSlides[nextPos];
  showSlide(currentIndex);
}

function startTimer() {
  clearInterval(timer);
  if (isPlaying) timer = setInterval(next, SLIDE_DURATION);
}

function startProgress() {
  progressBar.classList.remove('progress-running');
  progressBar.style.setProperty('--slide-duration', SLIDE_DURATION + 'ms');
  void progressBar.offsetWidth; // reflow
  progressBar.classList.add('progress-running');
}

function filterSection(section) {
  if (section === 'all' || !section) {
    filteredSlides = SLIDES.map((_, i) => i);
  } else {
    filteredSlides = SLIDES.map((s, i) => s.section === section ? i : -1).filter(i => i >= 0);
  }
  currentIndex = filteredSlides[0];
  showSlide(currentIndex);
  startTimer();
}

/* Section hover previews */
document.querySelectorAll('.nav-card[data-section]').forEach(card => {
  const section = card.dataset.section;

  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.nav-card--section').forEach(c => c.classList.remove('is-previewing'));
    if (section !== 'all') {
      card.classList.add('is-previewing');
      activeSection = section;
      filterSection(section);
    }
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('is-previewing');
    activeSection = null;
    filterSection('all');
  });
});

/* Play / pause */
playBtn && playBtn.addEventListener('click', () => {
  isPlaying = !isPlaying;
  const svgPath = playBtn.querySelector('svg');
  if (isPlaying) {
    svgPath.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
    startTimer();
  } else {
    svgPath.innerHTML = '<polygon points="5,3 19,12 5,21"/>';
    clearInterval(timer);
    progressBar.classList.remove('progress-running');
  }
});

/* Init */
filterSection('all');
