document.documentElement.style.scrollBehavior = 'smooth';

const page = document.body.dataset.page;
document.querySelectorAll('nav a[data-page]').forEach(link => {
  if (link.dataset.page === page) link.classList.add('active');
});

const year = new Date().getFullYear();
document.querySelectorAll('[data-year]').forEach(node => node.textContent = year);

window.addEventListener('pointermove', (event) => {
  document.body.style.setProperty('--mouse-x', `${event.clientX}px`);
  document.body.style.setProperty('--mouse-y', `${event.clientY}px`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function wireForm(formId, sheetName, successText) {
  const form = document.getElementById(formId);
  if (!form) return;

  const status = form.querySelector('.status');
  const scriptURL = 'https://script.google.com/macros/s/AKfycbz4NzPug47y38qVTu9LiDLwp2a9X6J7Iygmq5qQUktEUjyEKp5R7FG5L_0XhMfFApVI/exec';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';

    try {
      const formData = new FormData(form);
      formData.append('sheet', sheetName);

      await fetch(scriptURL, {
        method: 'POST',
        body: formData
      });

      status.textContent = successText;
      form.reset();
    } catch {
      status.textContent = 'Something went wrong. Please try again.';
    }
  });
}

wireForm('contactForm', 'Contact', 'Message sent successfully.');
wireForm('enquiryForm', 'Enquiry', 'Enquiry submitted successfully.');
