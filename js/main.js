/* Homepage: full-screen carousel — 5 projects */

const SLIDES = [
  {
    bg:    'linear-gradient(160deg,#0e0c0c 0%,#000 100%)',
    image: 'https://res.cloudinary.com/drlwejyl9/image/upload/q_auto/f_auto/v1779837370/lata_1_1_drdvrg.jpg',
    title: 'Text 0',
    category: 'Study Cases',
    year: '2024',
  },
  {
    bg: 'linear-gradient(160deg,#1e1a14 0%,#0a0806 100%)',
    title: 'Campaña SS25',
    category: 'Art Direction',
    year: '2025',
  },
  {
    bg: 'linear-gradient(160deg,#0e1220 0%,#04060e 100%)',
    title: 'Brand Motion',
    category: '3D & Video',
    year: '2024',
  },
  {
    bg: 'linear-gradient(160deg,#10122a 0%,#060718 100%)',
    title: 'Product\nVisualization',
    category: '3D / Blender',
    year: '2025',
  },
  {
    bg: 'linear-gradient(160deg,#1c1a18 0%,#080806 100%)',
    title: 'Editorial AW24',
    category: 'Art Direction',
    year: '2024',
  },
];

const SLIDE_DURATION = 3000; // ms

const carousel    = document.getElementById('carousel');
const progressBar = document.getElementById('progressBar');
const slideLabel  = document.getElementById('slideLabel');
const playBtn     = document.getElementById('playToggle');

let currentIndex = 0;
let timer        = null;
let isPlaying    = true;

/* ── Build DOM slides ────────────────────────────────────── */
SLIDES.forEach((s, i) => {
  const el = document.createElement('div');
  el.className = 'slide';
  el.dataset.index = i;

  const bgStyle = s.image
    ? `background:${s.bg}; background-image:url('${s.image}'); background-size:cover; background-position:center;`
    : `background:${s.bg};`;

  el.innerHTML = `
    <div class="slide-bg" style="${bgStyle}"></div>
    <span class="slide-year">${s.year}</span>
    <div class="slide-content">
      <p class="slide-category">${s.category}</p>
      <h2 class="slide-title">${s.title.replace('\n', '<br>')}</h2>
    </div>
  `;
  carousel.appendChild(el);
});

const slideEls = carousel.querySelectorAll('.slide');

/* ── Show slide ──────────────────────────────────────────── */
function showSlide(idx) {
  slideEls.forEach((el, i) => el.classList.toggle('active', i === idx));
  const s = SLIDES[idx];
  if (slideLabel) {
    slideLabel.innerHTML =
      `<span style="color:rgba(255,255,255,0.55);margin-right:8px;">${s.category}</span>` +
      `<span>${idx + 1}&thinsp;/&thinsp;${SLIDES.length}</span>`;
  }
  startProgress();
}

function next() {
  currentIndex = (currentIndex + 1) % SLIDES.length;
  showSlide(currentIndex);
}

function startTimer() {
  clearInterval(timer);
  if (isPlaying) timer = setInterval(next, SLIDE_DURATION);
}

function startProgress() {
  if (!progressBar) return;
  progressBar.classList.remove('progress-running');
  progressBar.style.setProperty('--slide-duration', SLIDE_DURATION + 'ms');
  void progressBar.offsetWidth; // force reflow
  if (isPlaying) progressBar.classList.add('progress-running');
}

/* ── Play / Pause ────────────────────────────────────────── */
playBtn && playBtn.addEventListener('click', () => {
  isPlaying = !isPlaying;
  const svg = playBtn.querySelector('.icon-play');
  if (isPlaying) {
    svg.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
    startTimer();
    startProgress();
  } else {
    svg.innerHTML = '<polygon points="5,3 19,12 5,21"/>';
    clearInterval(timer);
    progressBar && progressBar.classList.remove('progress-running');
  }
});

/* ── Init ────────────────────────────────────────────────── */
showSlide(0);
startTimer();
