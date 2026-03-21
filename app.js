(function(){
  const loader = document.getElementById('loader');
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('load', function(){
    if(loader){
      loader.classList.add('hidden');
      setTimeout(function(){
        loader.style.display = 'none';
      }, 360);
    }
  });

  if(toggle && navLinks){
    toggle.addEventListener('click', function(){
      toggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  const counters = document.querySelectorAll('.counter');
  counters.forEach(function(counter){
    let current = 0;
    const target = Number(counter.getAttribute('data-target') || '0');
    const step = Math.max(1, Math.ceil(target / 50));

    function update(){
      current = Math.min(target, current + step);
      counter.textContent = current;
      if(current < target){
        requestAnimationFrame(update);
      }
    }

    update();
  });
})();
