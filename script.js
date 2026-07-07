// MedStats AI — subtle progressive-enhancement interactions.
// Respects prefers-reduced-motion; degrades gracefully with no JS.

(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Reveal sections on scroll ─────────────────────────────────────────
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }

  // ── Back-to-top visibility ────────────────────────────────────────────
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    var toggle = function () {
      backToTop.classList.toggle('is-shown', window.scrollY > 600);
    };
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
  }

  // ── Current year in footer ────────────────────────────────────────────
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // ── Email de-obfuscation ───────────────────────────────────────────────
  // The address is never present as plain text in the HTML source; it is
  // assembled here from data attributes at runtime so basic scrapers that
  // just parse static HTML can't harvest it.
  document.querySelectorAll('.js-email').forEach(function (el) {
    var user = el.getAttribute('data-u');
    var domain = el.getAttribute('data-d');
    if (!user || !domain) return;
    var address = user + '@' + domain;
    el.href = 'mailto:' + address;
    if (!el.textContent.trim()) { el.textContent = address; }
  });

  var emailForm = document.querySelector('.js-email-form');
  if (emailForm) {
    var fUser = emailForm.getAttribute('data-u');
    var fDomain = emailForm.getAttribute('data-d');
    if (fUser && fDomain) {
      emailForm.setAttribute('action', 'mailto:' + fUser + '@' + fDomain);
    }
  }
})();
