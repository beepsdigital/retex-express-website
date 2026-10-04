/* RetEx Express – small progressive enhancements. Nothing here is required for navigation or contact. */
(function () {
  'use strict';

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var closeNav = function () {
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    };
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      if (open) { closeNav(); return; }
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
      var first = nav.querySelector('a');
      if (first) first.focus();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { closeNav(); toggle.focus(); }
    });
    // Leaving the mobile breakpoint while the drawer is open would otherwise leave the page unscrollable.
    var desktop = window.matchMedia ? window.matchMedia('(min-width: 901px)') : null;
    if (desktop && desktop.addEventListener) desktop.addEventListener('change', function (e) { if (e.matches) closeNav(); });
  }

  // Sticky header shadow
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Reveal on scroll (respects reduced motion)
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (items.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Quote form → WhatsApp message
  var form = document.getElementById('quote-form');
  if (form) {
    var msg = document.getElementById('quote-msg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll('input, select, textarea');
      var lines = [form.getAttribute('data-intro') || ''];
      var error = '';
      fields.forEach(function (f) {
        f.classList.remove('is-invalid');
        var value = (f.value || '').trim();
        if (f.required && !value) { if (!error) error = f.getAttribute('data-error') || ''; f.classList.add('is-invalid'); }
        if (f.name === 'phone' && value && !/^\+?[0-9\s-]{8,16}$/.test(value)) { if (!error) error = f.getAttribute('data-error') || ''; f.classList.add('is-invalid'); }
        if (value) lines.push((f.getAttribute('data-label') || f.name) + ': ' + value);
      });
      if (error) { msg.textContent = error; msg.className = 'form-msg is-error'; form.querySelector('.is-invalid').focus(); return; }
      msg.textContent = '';
      msg.className = 'form-msg';
      var url = 'https://wa.me/' + form.getAttribute('data-wa') + '?text=' + encodeURIComponent(lines.join('\n'));
      // Do not pass "noopener" as a feature: it makes window.open return null, which would also trigger the fallback.
      var w = window.open(url, '_blank');
      if (w) { try { w.opener = null; } catch (err) { /* cross-origin window: nothing to do */ } }
      else { window.location.href = url; } // popup blocked: navigate in place instead
    });
  }

  // Footer year
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
