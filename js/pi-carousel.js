/* pi-carousel.js — auto-scroll infinito (marquee) con velocidad y dirección
   variables por carrusel, para romper la monotonía y dar ritmo de lectura. */
(function () {

  /* Segundos por imagen — más bajo = más rápido.
     Se alternan varias velocidades para que carruseles contiguos no coincidan. */
  const SPEEDS = [2.4, 3.2, 2.8, 3.6, 2.6];

  function init(carousel, index) {
    const items = Array.from(carousel.querySelectorAll('.pi-carousel-item'));
    if (!items.length) return;

    /* Track wrapper */
    const track = document.createElement('div');
    track.className = 'pi-carousel-track';

    /* Mover originales + clonar para bucle seamless */
    items.forEach(item => track.appendChild(item));
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    /* Velocidad variable por carrusel */
    const speed = SPEEDS[index % SPEEDS.length];
    const dur = items.length * speed;
    track.style.setProperty('--pi-dur', dur + 's');

    /* Dirección alterna: pares → izquierda, impares → derecha */
    if (index % 2 === 1) {
      track.classList.add('pi-carousel-track--reverse');
    }

    carousel.appendChild(track);
  }

  function initAll() {
    document.querySelectorAll('.pi-carousel').forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
