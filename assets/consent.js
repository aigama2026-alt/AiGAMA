// AiGAMA – cookie consent
// Stores the visitor's choice in this browser (localStorage key "aigama_consent").
// Optional analytics run ONLY after the visitor clicks "Accept".
// To add analytics later, put its loading code inside loadAnalytics() below.
(function () {
  var KEY = 'aigama_consent';
  var VERSION = 1;          // raise this number if you add new cookie types, so everyone is asked again
  var MAX_AGE_DAYS = 365;   // ask again after 12 months

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (!c || c.v !== VERSION) return null;
      if (Date.now() - c.t > MAX_AGE_DAYS * 864e5) return null;
      return c;
    } catch (e) { return null; }
  }

  function save(analytics) {
    var c = { v: VERSION, t: Date.now(), necessary: true, analytics: !!analytics };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    return c;
  }

  var analyticsLoaded = false;
  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    // No analytics are installed yet.
    // Example later: create a <script> tag for a privacy-friendly analytics tool here.
  }

  function apply(c) {
    if (c && c.analytics) loadAnalytics();
  }

  var banner;
  function build() {
    banner = document.createElement('div');
    banner.className = 'consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookie choices');
    banner.innerHTML =
      '<div class="consent-inner">' +
        '<p class="consent-text"><strong>Cookies</strong><br>' +
        'We use only what’s needed to run this site. With your OK, we may also use analytics to see how the site is used. ' +
        '<a href="cookies.html">Cookie policy</a></p>' +
        '<div class="consent-actions">' +
          '<button type="button" class="btn btn-light" data-consent="reject">Reject</button>' +
          '<button type="button" class="btn btn-light" data-consent="accept">Accept</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);
    banner.addEventListener('click', function (e) {
      var choice = e.target.getAttribute && e.target.getAttribute('data-consent');
      if (!choice) return;
      var c = save(choice === 'accept');
      hide();
      apply(c);
      if (choice !== 'accept' && analyticsLoaded) location.reload(); // stop analytics that already started
    });
  }

  function show() {
    if (!banner) build();
    banner.hidden = false;
    var first = banner.querySelector('button');
    if (first) first.focus({ preventScroll: true });
  }
  function hide() { if (banner) banner.hidden = true; }

  // "Cookie settings" links reopen the banner
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (!el) return;
    e.preventDefault();
    show();
  });

  var current = read();
  // Global Privacy Control: the browser already says "don't track me", so treat it as Reject.
  if (!current && navigator.globalPrivacyControl === true) current = save(false);
  if (current) apply(current);
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show);
  else show();
})();
