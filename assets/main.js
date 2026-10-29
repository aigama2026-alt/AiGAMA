// AiGAMA – early access popup
(function () {
  var dialog = document.getElementById('signup');
  if (!dialog) return;

  var form = document.getElementById('signup-form');
  var step = document.getElementById('signup-step');
  var done = document.getElementById('signup-done');
  var error = document.getElementById('signup-error');
  var website = document.getElementById('signup-website');
  var email = document.getElementById('signup-email');
  var product = document.getElementById('signup-product');
  var heroForm = document.getElementById('hero-form');
  var heroWebsite = document.getElementById('hero-website');

  function open(productName) {
    step.hidden = false;
    done.hidden = true;
    error.hidden = true;
    product.value = productName || '';
    if (heroWebsite && heroWebsite.value.trim()) website.value = heroWebsite.value.trim();
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    setTimeout(function () { (website.value ? email : website).focus(); }, 50);
  }

  function close() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  document.querySelectorAll('[data-open-signup]').forEach(function (el) {
    el.addEventListener('click', function () { open(el.getAttribute('data-product')); });
  });
  document.querySelectorAll('[data-close-signup]').forEach(function (el) {
    el.addEventListener('click', close);
  });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });

  if (heroForm) {
    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      open('');
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    error.hidden = true;

    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      error.textContent = 'Sign-up is not connected yet. Please email info@aigama.app.';
      error.hidden = false;
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Sending…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        step.hidden = true;
        done.hidden = false;
        form.reset();
        if (heroWebsite) heroWebsite.value = '';
      })
      .catch(function () {
        error.textContent = 'Something went wrong. Please try again or email info@aigama.app.';
        error.hidden = false;
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = 'Get early access';
      });
  });
})();
