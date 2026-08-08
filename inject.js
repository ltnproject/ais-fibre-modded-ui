/*
 * AIS Fibre Router — Modded UI Injector
 * by LtnProject | https://github.com/ltnproject/ais-fibre-modded-ui
 *
 * This script is injected into the REAL router page (http://192.168.1.1)
 * via a bookmarklet. It runs with same-origin access so session tokens,
 * captcha images, and form submissions all work natively — no CORS issues.
 *
 * License: LtnProject Open Source License (LPOSL) v1.0
 * Credit LtnProject when forking or modding. See LICENSE.
 */
(function () {
  'use strict';

  if (document.getElementById('ltn-injected')) return; // don't double-inject

  var BASE = 'https://ltnproject.github.io/ais-fibre-modded-ui';

  /* ── 1. Inject Google Fonts ─────────────────────────────────────────── */
  var fontLink = document.createElement('link');
  fontLink.rel  = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(fontLink);

  /* ── 2. Inject our CSS ──────────────────────────────────────────────── */
  var cssLink    = document.createElement('link');
  cssLink.id     = 'ltn-injected';
  cssLink.rel    = 'stylesheet';
  cssLink.href   = BASE + '/inject.css?v=' + Date.now();
  document.head.appendChild(cssLink);

  /* ── 3. Wait for CSS, then rebuild the visual structure ─────────────── */
  cssLink.onload = function () { buildUI(); };
  /* Fallback if onload doesn't fire */
  setTimeout(function () {
    if (!document.querySelector('.ltn-card')) buildUI();
  }, 1500);

  function buildUI() {
    /* ── Body & background ─────────────────────────────────────────────── */
    document.body.classList.add('ltn-body');

    /* Animated background mesh */
    var mesh = document.createElement('div');
    mesh.innerHTML =
      '<div class="ltn-mesh" aria-hidden="true"></div>' +
      '<div class="ltn-grid" aria-hidden="true"></div>';
    document.body.insertBefore(mesh, document.body.firstChild);

    /* ── Top bar ───────────────────────────────────────────────────────── */
    var banner = document.getElementById('banner');
    if (banner) {
      banner.classList.add('ltn-topbar');
      /* Restyle the logo inside the banner */
      var logo = banner.querySelector('.logo, #logo, img');
      if (logo) logo.classList.add('ltn-logo-img');
    }

    /* ── Wrap existing loginWrapper in our card shell ──────────────────── */
    var loginWrapper = document.getElementById('loginWrapper');
    if (loginWrapper) {
      /* Card container */
      var card = document.createElement('div');
      card.className = 'ltn-card-wrap';
      loginWrapper.parentNode.insertBefore(card, loginWrapper);
      card.appendChild(loginWrapper);
      loginWrapper.classList.add('ltn-card');

      /* Move logo/branding into card header */
      var logoWrap = loginWrapper.querySelector('.loginLogo');
      if (logoWrap) {
        var header = document.createElement('div');
        header.className = 'ltn-card-header';
        var titleEl = document.createElement('p');
        titleEl.className = 'ltn-title';
        titleEl.textContent = 'Welcome back';
        var subEl = document.createElement('p');
        subEl.className = 'ltn-sub';
        subEl.textContent = 'Sign in to manage your AIS Fibre router';
        header.appendChild(logoWrap.cloneNode(true));
        header.appendChild(titleEl);
        header.appendChild(subEl);
        loginWrapper.insertBefore(header, loginWrapper.firstChild);
        logoWrap.style.display = 'none';
      }

      /* Restyle h2 "SIGN IN" (hide it — we have our own title) */
      var h2 = loginWrapper.querySelector('h2');
      if (h2) h2.style.display = 'none';
    }

    /* ── Inputs ────────────────────────────────────────────────────────── */
    var userInput = document.getElementById('Frm_Username');
    var passInput = document.getElementById('Frm_Password');

    if (userInput) {
      userInput.classList.add('ltn-input');
      userInput.placeholder = 'Enter username';
      wrapWithIcon(userInput, 'user');
    }
    if (passInput) {
      passInput.classList.add('ltn-input');
      passInput.placeholder = 'Enter password';
      var passWrap = wrapWithIcon(passInput, 'lock');
      /* Password toggle button */
      var toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'ltn-pw-toggle';
      toggle.setAttribute('aria-label', 'Toggle password visibility');
      toggle.innerHTML = eyeOpenSVG();
      toggle.addEventListener('click', function () {
        var isPass = passInput.type === 'password';
        passInput.type = isPass ? 'text' : 'password';
        toggle.innerHTML = isPass ? eyeClosedSVG() : eyeOpenSVG();
      });
      if (passWrap) passWrap.appendChild(toggle);
    }

    /* ── Captcha area ──────────────────────────────────────────────────── */
    var captchaArea = document.getElementById('captchaArea');
    if (captchaArea) {
      captchaArea.classList.add('ltn-field');
      var captchaImg = document.getElementById('captchaImg');
      if (captchaImg) {
        captchaImg.classList.add('ltn-captcha-img');
        captchaImg.title = 'Click to refresh captcha';
      }
      var captchaInput = document.getElementById('Frm_captchaCode');
      if (captchaInput) {
        captchaInput.classList.add('ltn-input');
        captchaInput.placeholder = 'Enter code above';
      }
    }

    /* ── Sign in button ────────────────────────────────────────────────── */
    var loginBtn = document.getElementById('LoginId');
    if (loginBtn) {
      loginBtn.classList.add('ltn-btn');
      if (loginBtn.value) loginBtn.value = 'Sign In →';
      /* Wrap in a styled div */
      var btnWrap = document.getElementById('loginBtn');
      if (btnWrap) btnWrap.classList.add('ltn-btn-wrap');
    }

    /* ── Error hint ────────────────────────────────────────────────────── */
    var errHint = document.getElementById('login_error');
    if (errHint) errHint.classList.add('ltn-error');

    /* ── Footer ────────────────────────────────────────────────────────── */
    var footer = document.getElementById('page_footer');
    if (footer) footer.classList.add('ltn-footer');

    /* ── Styled label for each field group ─────────────────────────────── */
    document.querySelectorAll('.loginInstCfgArea .group label, .loginInstCfgArea .row label')
      .forEach(function (l) { l.classList.add('ltn-label'); });

    /* ── Add "by LtnProject" badge ─────────────────────────────────────── */
    var badge = document.createElement('div');
    badge.className = 'ltn-badge';
    badge.innerHTML = 'UI by <a href="https://github.com/ltnproject/ais-fibre-modded-ui" target="_blank">LtnProject</a>';
    document.body.appendChild(badge);

    console.log('%c[LtnProject] AIS Fibre Modded UI injected ✓', 'color:#8dc63f;font-weight:bold;');
  }

  /* ── Helpers ─────────────────────────────────────────────────────────── */
  function wrapWithIcon(input, type) {
    var parent = input.parentNode;
    var wrap = document.createElement('div');
    wrap.className = 'ltn-input-wrap';
    parent.insertBefore(wrap, input);
    wrap.appendChild(input);
    var icon = document.createElement('span');
    icon.className = 'ltn-icon';
    icon.innerHTML = type === 'user' ? userSVG() : lockSVG();
    wrap.insertBefore(icon, input);
    return wrap;
  }

  function userSVG() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>';
  }
  function lockSVG() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>';
  }
  function eyeOpenSVG() {
    return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  }
  function eyeClosedSVG() {
    return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
  }

})();
