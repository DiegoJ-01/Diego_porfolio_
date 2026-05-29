/* FAB navigation — circular section index */
(function () {

  const fabBtn  = document.getElementById('fabBtn');
  const fabMenu = document.getElementById('fabMenu');
  const fabCur  = document.getElementById('fabCurrent');
  const content = document.querySelector('.page-content');

  if (!fabBtn || !fabMenu || !content) return;

  let isOpen = false;

  /* ── toggle menu ── */
  fabBtn.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      fabMenu.removeAttribute('hidden');
      fabBtn.classList.add('is-open');
    } else {
      fabMenu.setAttribute('hidden', '');
      fabBtn.classList.remove('is-open');
    }
  });

  /* close on click outside */
  document.addEventListener('click', e => {
    if (isOpen && !e.target.closest('.fab-wrap')) {
      fabMenu.setAttribute('hidden', '');
      fabBtn.classList.remove('is-open');
      isOpen = false;
    }
  });

  /* close + smooth scroll on item click */
  fabMenu.querySelectorAll('.fab-item').forEach(item => {
    item.addEventListener('click', e => {
      e.stopPropagation();
      fabMenu.setAttribute('hidden', '');
      fabBtn.classList.remove('is-open');
      isOpen = false;
    });
  });

  /* ── update current section on scroll ── */
  const sections = Array.from(document.querySelectorAll('.work-section[id]'));
  if (!sections.length) return;

  function getActiveSection() {
    const scrollTop = content.scrollTop + 120;
    let active = sections[0];
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollTop) active = sec;
    });
    return active;
  }

  function updateFab() {
    const sec  = getActiveSection();
    const idx  = sections.indexOf(sec);
    const num  = String(idx + 1).padStart(2, '0');

    if (fabCur) fabCur.textContent = num;

    fabMenu.querySelectorAll('.fab-item').forEach((item, i) => {
      item.classList.toggle('is-current', i === idx);
    });
  }

  content.addEventListener('scroll', updateFab, { passive: true });
  updateFab();

})();
