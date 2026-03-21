(function () {
  const loader = document.getElementById('loader');
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('load', function () {
    if (loader) {
      loader.classList.add('hidden');
      window.setTimeout(function () {
        loader.style.display = 'none';
      }, 450);
    }
  });

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  const counters = document.querySelectorAll('.counter');
  counters.forEach(function (counter) {
    const target = Number(counter.dataset.target || '0');
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 45));

    const tick = function () {
      current = Math.min(target, current + increment);
      counter.textContent = current;
      if (current < target) {
        window.requestAnimationFrame(tick);
      }
    };

    tick();
  });
})();
