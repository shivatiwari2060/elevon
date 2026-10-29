(function () {
  'use strict';

  /* Mobile navigation ------------------------------------------------------ */
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  /* Scroll reveal ---------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* Footer year ------------------------------------------------------------ */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Inquiry form ----------------------------------------------------------- */
  var form = document.getElementById('inquiry');
  if (!form) return;

  var EMAIL = 'elevonnp@gmail.com';
  // Set data-endpoint on the form (e.g. a Formspree/Netlify/own-backend URL) once a
  // form service is chosen. While empty, submitting opens the visitor's email app
  // with the inquiry pre-filled.
  var ENDPOINT = form.getAttribute('data-endpoint') || '';

  var alertBox = document.getElementById('form-alert');
  var confirmBox = document.getElementById('confirm');
  var submitBtn = form.querySelector('button[type="submit"]');

  var rules = {
    name: function (v) { return v.length > 1; },
    email: function (v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v); },
    message: function (v) { return v.length > 9; }
  };

  function setError(field, hasError) {
    var wrapper = field.closest('.field, .consent');
    wrapper.classList.toggle('has-error', hasError);
    field.setAttribute('aria-invalid', String(hasError));
  }

  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];
    field.addEventListener('blur', function () { setError(field, !rules[name](field.value.trim())); });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') setError(field, !rules[name](field.value.trim()));
    });
  });

  function showFailure() {
    alertBox.textContent = 'Sorry, we couldn’t send your inquiry. Please try again, or email us directly at ' + EMAIL + '.';
    alertBox.classList.add('show');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Inquiry';
  }

  function showSuccess(usedEmailApp) {
    form.hidden = true;
    confirmBox.querySelector('[data-mode]').textContent = usedEmailApp
      ? 'Your email app should have opened with your inquiry ready to go. Please press send to complete it. If nothing opened, write to us at ' + EMAIL + '.'
      : 'We’ve received your inquiry and will reply by email with next steps.';
    confirmBox.classList.add('show');
    confirmBox.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.elements.website.value) return; // honeypot
    alertBox.classList.remove('show');

    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      var bad = !rules[name](field.value.trim());
      setError(field, bad);
      if (bad && !firstInvalid) firstInvalid = field;
    });
    var consent = form.elements.consent;
    setError(consent, !consent.checked);
    if (!consent.checked && !firstInvalid) firstInvalid = consent;
    if (firstInvalid) { firstInvalid.focus(); return; }

    var services = [].map.call(form.querySelectorAll('input[name="services"]:checked'), function (c) { return c.value; }).join(', ') || 'Not specified';
    var data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      company: form.elements.company.value.trim(),
      services: services,
      budget: form.elements.budget.value,
      timeline: form.elements.timeline.value,
      message: form.elements.message.value.trim()
    };

    if (ENDPOINT) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error('Request failed');
        showSuccess(false);
      }).catch(showFailure);
    } else {
      var body = [
        'Name: ' + data.name,
        'Email: ' + data.email,
        'Company: ' + (data.company || '-'),
        'Services: ' + data.services,
        'Budget: ' + (data.budget || '-'),
        'Timeline: ' + (data.timeline || '-'),
        '',
        'Project description:',
        data.message
      ].join('\n');
      window.location.href = 'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent('Project inquiry from ' + data.name) +
        '&body=' + encodeURIComponent(body);
      showSuccess(true);
    }
  });
})();
