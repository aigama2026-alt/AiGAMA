// AiGAMA – cookie consent + Google Tag Manager
// Visitors choose: Necessary (always on), Analytics (GA4), Marketing (Google Ads conversions + remarketing).
// Choice is stored in this browser (localStorage key "aigama_consent").
// Google Tag Manager loads ONLY after the visitor allows Analytics or Marketing.
// Each choice is passed to Google with Consent Mode v2, so tags respect it.
(function () {
  var KEY = 'aigama_consent';
  var VERSION = 3;             // raise this number if you add new cookie types, so everyone is asked again
  var GTM_ID = 'GTM-PM2RD9J4'; // Google Tag Manager container
  var MAX_AGE_DAYS = 365;      // ask again after 12 months

  // ---------- storage ----------
  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (!c || c.v !== VERSION) return null;
      if (Date.now() - c.t > MAX_AGE_DAYS * 864e5) return null;
      return c;
    } catch (e) { return null; }
  }
  function save(analytics, marketing) {
    var c = { v: VERSION, t: Date.now(), necessary: true, analytics: !!analytics, marketing: !!marketing };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    return c;
  }

  // ---------- Google Tag Manager + Consent Mode v2 ----------
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  function consentState(c) {
    var a = c && c.analytics ? 'granted' : 'denied';
    var m = c && c.marketing ? 'granted' : 'denied';
    return {
      analytics_storage: a,
      ad_storage: m,
      ad_user_data: m,
      ad_personalization: m,
      functionality_storage: 'granted',
      security_storage: 'granted'
    };
  }

  var gtmLoaded = false;
  var loadedWith = null;
  function loadGTM(c) {
    if (gtmLoaded) return;
    gtmLoaded = true;
    loadedWith = c;
    gtag('consent', 'default', consentState(c));
    gtag('set', 'ads_data_redaction', !c.marketing);
    gtag('js', new Date());
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    document.head.appendChild(s);
  }

  function deleteCookies(pattern) {
    var host = location.hostname;
    var domains = ['', host, '.' + host, '.' + host.replace(/^www\./, '')];
    document.cookie.split(';').forEach(function (part) {
      var name = part.split('=')[0].trim();
      if (!pattern.test(name)) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function apply(c) {
    if (!c.analytics) deleteCookies(/^(_ga|_gid|_gat)/);
    if (!c.marketing) deleteCookies(/^(_gcl_|_gac_)/);
    if (!gtmLoaded) {
      if (c.analytics || c.marketing) loadGTM(c);
      return;
    }
    // GTM already running: allow more right away; if something was taken back, reload to stop it.
    var tookBack = (loadedWith.analytics && !c.analytics) || (loadedWith.marketing && !c.marketing);
    if (tookBack) { location.reload(); return; }
    gtag('consent', 'update', consentState(c));
    gtag('set', 'ads_data_redaction', !c.marketing);
    loadedWith = c;
  }

  // ---------- banner ----------
  var banner, analyticsBox, marketingBox, details;
  function build() {
    banner = document.createElement('div');
    banner.className = 'consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie choices');
    banner.innerHTML =
      '<div class="consent-inner">' +
        '<p class="consent-text"><strong>Cookies</strong><br>' +
        'We use necessary cookies to run this site. With your OK, we also use Google Analytics to improve it, and Google Ads to measure our ads and show you AiGAMA ads on other sites. ' +
        '<a href="cookies.html">Cookie policy</a></p>' +
        '<div class="consent-details" hidden>' +
          '<label class="consent-row"><input type="checkbox" checked disabled><span><strong>Necessary</strong><br>Keeps the site working and remembers your choice. Always on.</span></label>' +
          '<label class="consent-row"><input type="checkbox" data-cat="analytics"><span><strong>Analytics</strong><br>Google Analytics: which pages are visited and how people find us.</span></label>' +
          '<label class="consent-row"><input type="checkbox" data-cat="marketing"><span><strong>Marketing</strong><br>Google Ads: measure sign-ups from our ads and show you AiGAMA ads on other sites (remarketing).</span></label>' +
        '</div>' +
        '<div class="consent-actions">' +
          '<button type="button" class="btn btn-light" data-consent="reject">Reject all</button>' +
          '<button type="button" class="btn btn-light" data-consent="settings">Settings</button>' +
          '<button type="button" class="btn btn-light" data-consent="save" hidden>Save choices</button>' +
          '<button type="button" class="btn btn-light" data-consent="accept">Accept all</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);
    details = banner.querySelector('.consent-details');
    analyticsBox = banner.querySelector('[data-cat="analytics"]');
    marketingBox = banner.querySelector('[data-cat="marketing"]');

    banner.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-consent]');
      if (!btn) return;
      var action = btn.getAttribute('data-consent');
      if (action === 'settings') { openDetails(); return; }
      var c;
      if (action === 'accept') c = save(true, true);
      else if (action === 'reject') c = save(false, false);
      else c = save(analyticsBox.checked, marketingBox.checked);
      hide();
      apply(c);
    });
  }

  function openDetails() {
    details.hidden = false;
    banner.querySelector('[data-consent="settings"]').hidden = true;
    banner.querySelector('[data-consent="save"]').hidden = false;
    analyticsBox.focus({ preventScroll: true });
  }

  function show(withDetails) {
    if (!banner) build();
    var c = read();
    analyticsBox.checked = !!(c && c.analytics);
    marketingBox.checked = !!(c && c.marketing);
    details.hidden = true;
    banner.querySelector('[data-consent="settings"]').hidden = false;
    banner.querySelector('[data-consent="save"]').hidden = true;
    banner.hidden = false;
    if (withDetails) openDetails();
    else banner.querySelector('button').focus({ preventScroll: true });
  }
  function hide() { if (banner) banner.hidden = true; }

  // "Cookie settings" links reopen the banner with the choices open
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (!el) return;
    e.preventDefault();
    show(true);
  });

  // ---------- start ----------
  var current = read();
  // Global Privacy Control: the browser says "don't track or share", so treat it as Reject all.
  if (!current && navigator.globalPrivacyControl === true) current = save(false, false);
  if (current) apply(current);
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { show(false); });
  else show(false);
})();
