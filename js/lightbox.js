/* Lightbox — galería navegable, keyboard-friendly */
(function () {

  let images = [];
  let titles = [];
  let idx    = 0;
  let lb, lbImg, lbCounter, lbTitleEl;

  /* ── build DOM (once) ── */
  function build() {
    if (document.getElementById('lb')) return;
    const el = document.createElement('div');
    el.id = 'lb';
    el.className = 'lb';
    el.hidden = true;
    el.innerHTML = `
      <div class="lb-backdrop"></div>
      <button class="lb-btn lb-close" title="Cerrar (Esc)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <button class="lb-btn lb-prev" title="Anterior (←)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15,18 9,12 15,6"/>
        </svg>
      </button>
      <button class="lb-btn lb-next" title="Siguiente (→)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9,18 15,12 9,6"/>
        </svg>
      </button>
      <div class="lb-stage">
        <img class="lb-img" src="" alt="">
      </div>
      <div class="lb-footer">
        <span class="lb-title-text"></span>
        <span class="lb-counter">1 / 1</span>
      </div>
    `;
    document.body.appendChild(el);

    lb         = el;
    lbImg      = el.querySelector('.lb-img');
    lbCounter  = el.querySelector('.lb-counter');
    lbTitleEl  = el.querySelector('.lb-title-text');

    el.querySelector('.lb-close')   .addEventListener('click', close);
    el.querySelector('.lb-backdrop').addEventListener('click', close);
    el.querySelector('.lb-prev')    .addEventListener('click', prev);
    el.querySelector('.lb-next')    .addEventListener('click', next);
    document.addEventListener('keydown', onKey);
  }

  /* ── public open ── */
  function open(imgs, startIndex, projectTitle) {
    build();
    images = imgs;
    titles = Array.isArray(projectTitle) ? projectTitle : Array(imgs.length).fill(projectTitle || '');
    idx    = startIndex || 0;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    render();
  }

  function close() {
    if (!lb) return;
    lb.hidden = true;
    document.body.style.overflow = '';
  }

  function render() {
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src         = images[idx];
      lbImg.alt         = titles[idx] || '';
      lbCounter.textContent = `${idx + 1} / ${images.length}`;
      if (lbTitleEl) lbTitleEl.textContent = titles[idx] || '';
      lbImg.style.opacity = '1';
    }, 120);

    const multi = images.length > 1;
    lb.querySelector('.lb-prev').style.visibility = multi ? 'visible' : 'hidden';
    lb.querySelector('.lb-next').style.visibility = multi ? 'visible' : 'hidden';
  }

  function prev() { idx = (idx - 1 + images.length) % images.length; render(); }
  function next() { idx = (idx + 1) % images.length; render(); }

  function onKey(e) {
    if (!lb || lb.hidden) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  }

  /* ── auto-wire cards with data-gallery ── */
  function init() {
    document.querySelectorAll('[data-gallery]').forEach(card => {
      card.addEventListener('click', () => {
        const imgs  = JSON.parse(card.dataset.gallery);
        const title = card.dataset.title || '';
        open(imgs, 0, title);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
  window.Lightbox = { open, close };
})();
