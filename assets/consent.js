// AiGAMA – cookie consent
// Stores the visitor's choice in this browser (localStorage key "aigama_consent").
// Optional analytics run ONLY after the visitor clicks "Accept".
// To add analytics later, put its loading code inside loadAnalytics() below.
(function () {
  var KEY = 'aigama_consent';
  var VERSION = 2;          // raise this number if you add new cookie types, so everyone is asked again
  var GTM_ID = 'GTM-PM2RD9J4'; // Google Tag Manager container
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

    // Google Tag Manager – loads ONLY after the visitor clicks "Accept".
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    // Google Consent Mode: analytics allowed, advertising always off.
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    gtag('js', new Date());
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(s);
  }

  // Remove Google Analytics cookies when the visitor rejects
  function clearAnalyticsCookies() {
    var host = location.hostname;
    var domains = ['', host, '.' + host, '.' + host.replace(/^www\./, '')];
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat)/.test(name)) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function apply(c) {
    if (c && c.analytics) loadAnalytics();
    else clearAnalyticsCookies();
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
        'We use only what’s needed to run this site. With your OK, we also use Google Analytics to see how the site is used. ' +
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
