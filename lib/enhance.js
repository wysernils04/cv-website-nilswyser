// Progressive enhancement — the page is complete, static HTML without this
// file. Inlined into the layout at build time (~2 KB min). Everything here
// only ADDS: scroll reveals, the hero width-axis signature, scroll-spy,
// the mobile menu, locale-switch scroll preservation, copy-to-clipboard.
// Reduced motion is honored per feature via matchMedia.
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---- Scroll reveals (§5.5): fire once, additive ------------------------ */
  // The html.js class (set before first paint) opted this content into its
  // hidden pre-animation state — so if the observer can't run, everything must
  // be revealed immediately, or the page would stay blank.
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var ro = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            ro.unobserve(e.target);
          }
        });
      },
      {rootMargin: '0px 0px -12% 0px'}
    );
    revealEls.forEach(function (el) {
      ro.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('in');
    });
  }

  /* ---- Hero signature (§5.4): width axis condenses with scroll ---------- */
  var name = document.querySelector('.hero-name');
  var hero = name && name.closest('section');
  if (name && hero && !reduce.matches) {
    var ticking = false;
    var drive = function () {
      ticking = false;
      var p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
      name.style.fontVariationSettings =
        '"wght" ' + Math.round(700 - 40 * p) + ', "wdth" ' + Math.round(125 - 47 * p);
    };
    var onScroll = function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(drive);
      }
    };
    addEventListener('scroll', onScroll, {passive: true});
    drive();
  }

  /* ---- Scroll-spy: aria-current on the section crossing mid-view -------- */
  var spyLinks = {};
  document.querySelectorAll('[data-nav] a[href^="#"]').forEach(function (a) {
    spyLinks[a.getAttribute('href').slice(1)] = a;
  });
  var ids = Object.keys(spyLinks);
  if ('IntersectionObserver' in window && ids.length) {
    var so = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            ids.forEach(function (id) {
              if (spyLinks[id]) spyLinks[id].removeAttribute('aria-current');
            });
            var link = spyLinks[e.target.id];
            if (link) link.setAttribute('aria-current', 'true');
          }
        });
      },
      {rootMargin: '-45% 0px -50% 0px'}
    );
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) so.observe(el);
    });
  }

  /* ---- Mobile menu: overlay + focus trap + Esc --------------------------- */
  var openBtn = document.querySelector('[data-menu-open]');
  var menu = document.getElementById('mobile-menu');
  if (openBtn && menu) {
    var closeBtn = menu.querySelector('[data-menu-close]');
    var setOpen = function (open) {
      menu.hidden = !open;
      openBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        (closeBtn || menu).focus();
      } else {
        openBtn.focus();
      }
    };
    openBtn.addEventListener('click', function () {
      setOpen(menu.hidden);
    });
    menu.addEventListener('click', function (e) {
      var t = e.target;
      if (t.closest('[data-menu-close]') || t.closest('a[href^="#"]')) setOpen(false);
    });
    // If the viewport grows past the mobile breakpoint while the menu is open,
    // CSS hides the overlay (md:hidden) but the body scroll lock would remain —
    // close properly instead.
    var desktop = matchMedia('(min-width: 768px)');
    var onDesktop = function (e) {
      if (e.matches && !menu.hidden) setOpen(false);
    };
    if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      var f = menu.querySelectorAll('a[href], button:not([disabled])');
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ---- Locale switch: keep the visitor's scroll position ---------------- */
  document.querySelectorAll('a[data-locale-switch]').forEach(function (a) {
    a.addEventListener('click', function () {
      try {
        sessionStorage.setItem('nw:scroll', String(window.scrollY));
      } catch {
        /* private mode */
      }
    });
  });
  try {
    var stored = sessionStorage.getItem('nw:scroll');
    if (stored !== null) {
      sessionStorage.removeItem('nw:scroll');
      window.scrollTo(0, parseInt(stored, 10) || 0);
    }
  } catch {
    /* private mode */
  }

  /* ---- Copy email (§4.7): enhancement over selectable mailto ------------ */
  // Only surface the button where the Clipboard API actually exists (it is
  // absent on http and in older browsers) — a dead button is worse than none.
  var canCopy = navigator.clipboard && typeof navigator.clipboard.writeText === 'function';
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    if (!canCopy) return;
    btn.hidden = false;
    var label = btn.querySelector('[data-copy-label]');
    var idle = label.textContent;
    var timer;
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(function () {
        label.textContent = btn.getAttribute('data-copied-label');
        clearTimeout(timer);
        timer = setTimeout(function () {
          label.textContent = idle;
        }, 2000);
      }, function () {});
    });
  });
})();
