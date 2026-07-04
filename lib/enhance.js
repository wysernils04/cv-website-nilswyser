// Progressive enhancement — the page is complete, static HTML without this
// file. Inlined into the layout at build time (~4 KB min). Everything here
// only ADDS: scroll reveals, the hero signature (entrance, width-axis
// compression, cursor-proximity liquid type), scroll-spy + sliding nav
// indicator, scroll progress hairline, the kinetic type band, the mobile
// menu, locale-switch scroll restore, copy-to-clipboard.
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

  /* ---- Unified scroll driver ---------------------------------------------
     One rAF loop drives everything scroll-linked: the hero width axis, the
     staggered hero exit, the progress hairline, and the kinetic band. All of
     it is a pure function of scroll position — nothing moves on its own. */
  var name = document.querySelector('.hero-name');
  var hero = name && name.closest('section');
  var progress = document.querySelector('[data-progress]');
  var fades = hero ? hero.querySelectorAll('[data-hero-fade]') : [];
  var kineticTrack = document.querySelector('[data-kinetic-track]');
  var kineticHalf = 0;

  var measureKinetic = function () {
    if (kineticTrack) kineticHalf = kineticTrack.scrollWidth / 2;
  };
  measureKinetic();
  addEventListener('resize', measureKinetic);

  var ticking = false;
  var drive = function () {
    ticking = false;
    var y = window.scrollY;

    if (!reduce.matches) {
      if (hero && name) {
        var p = Math.min(1, Math.max(0, y / hero.offsetHeight));
        name.style.fontVariationSettings =
          '"wght" ' + Math.round(700 - 40 * p) + ', "wdth" ' + Math.round(125 - 47 * p);
        fades.forEach(function (el) {
          var f = parseInt(el.getAttribute('data-hero-fade'), 10) || 1;
          el.style.transform = 'translateY(' + (-p * 30 * f).toFixed(1) + 'px)';
          el.style.opacity = Math.max(0, 1 - p * (1.1 + 0.3 * f)).toFixed(3);
        });
      }
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0).toFixed(4) + ')';
      }
      if (kineticTrack && kineticHalf > 0) {
        kineticTrack.style.transform =
          'translate3d(' + -((y * 0.4) % kineticHalf).toFixed(1) + 'px,0,0)';
      }
    }

    // At the very top nothing is "the current section" — clear the spy state.
    if (hero && y < hero.offsetHeight * 0.5) {
      clearSpy();
    }
  };
  var onScroll = function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(drive);
    }
  };
  addEventListener('scroll', onScroll, {passive: true});
  drive();

  /* ---- Liquid type: the name responds to the pointer ---------------------
     Weight/width swell with distance falloff — the site's variable-font motif
     made touchable. Fine pointers only. Built for 60/120 fps:
     - letter centers are CACHED per gesture (x viewport-relative — the page
       never scrolls horizontally; y in document space so vertical scrolling
       doesn't invalidate). Zero layout reads in the steady state, and the
       effect never measures the geometry it is itself changing.
     - every letter carries a spring-smoothed value with fast attack and slow
       release, on a self-terminating rAF loop (runs only while the pointer is
       inside or a letter is still relaxing — nothing idles).
     - styles are written only when the rounded output actually changed, and
       clear back to inherited values once fully relaxed. */
  if (hero && name && !reduce.matches && matchMedia('(pointer: fine)').matches) {
    var letters = Array.prototype.slice.call(name.querySelectorAll('.hero-letter'));
    var count = letters.length;
    var centerX = new Array(count);
    var centerY = new Array(count); // document space
    var cur = new Array(count);
    var lastOut = new Array(count);
    for (var li = 0; li < count; li++) {
      cur[li] = 0;
      lastOut[li] = 0;
    }
    var cacheDirty = true;
    var inside = false;
    var running = false;
    var mx = 0;
    var myDoc = 0;

    var rebuildCache = function () {
      cacheDirty = false;
      // one batched read block at frame start — a single reflow at most
      for (var i = 0; i < count; i++) {
        var r = letters[i].getBoundingClientRect();
        centerX[i] = r.left + r.width / 2;
        centerY[i] = r.top + r.height / 2 + window.scrollY;
      }
    };

    var step = function () {
      if (cacheDirty) rebuildCache();
      var alive = false;
      for (var i = 0; i < count; i++) {
        var target = 0;
        if (inside) {
          var d = Math.hypot(centerX[i] - mx, centerY[i] - myDoc);
          var t = Math.max(0, 1 - d / 300);
          target = t * t * (3 - 2 * t); // smoothstep: organic falloff
        }
        // asymmetric spring: swell quickly, relax gently
        var c = cur[i] + (target - cur[i]) * (target > cur[i] ? 0.34 : 0.16);
        if (c < 0.004 && target === 0) c = 0;
        cur[i] = c;
        if (c > 0 || inside) alive = true;
        var w = c === 0 ? 0 : Math.round(700 + 210 * c);
        if (w !== lastOut[i]) {
          lastOut[i] = w;
          letters[i].style.fontVariationSettings =
            w === 0 ? '' : '"wght" ' + w + ', "wdth" ' + Math.round(125 + 15 * c);
        }
      }
      if (alive) {
        requestAnimationFrame(step);
      } else {
        running = false;
      }
    };
    var ensureLoop = function () {
      if (!running) {
        running = true;
        requestAnimationFrame(step);
      }
    };

    var track = function (e) {
      inside = true;
      mx = e.clientX;
      myDoc = e.clientY + window.scrollY;
      ensureLoop();
    };
    hero.addEventListener('pointerenter', function (e) {
      cacheDirty = true; // fresh geometry per gesture
      track(e);
    });
    hero.addEventListener('pointermove', track);
    var release = function () {
      inside = false;
      ensureLoop(); // lets the relax animation play out, then stops
    };
    hero.addEventListener('pointerleave', release);
    addEventListener('blur', release);
    addEventListener('resize', function () {
      cacheDirty = true;
    });
    // scroll compresses the width axis and shifts letters — refresh lazily on
    // the next frame (reads happen before writes there: one reflow, no thrash)
    addEventListener('scroll', function () {
      cacheDirty = true;
    }, {passive: true});
  }

  /* ---- Scroll-spy + sliding accent indicator ----------------------------- */
  var navList = document.querySelector('[data-nav]');
  var indicator = document.querySelector('[data-nav-indicator]');
  var spyLinks = {};
  var activeLink = null;
  if (navList) {
    navList.querySelectorAll('a[href^="#"]').forEach(function (a) {
      spyLinks[a.getAttribute('href').slice(1)] = a;
    });
  }
  var ids = Object.keys(spyLinks);

  var moveIndicator = function (link) {
    if (!indicator || !navList) return;
    if (!link) {
      indicator.style.opacity = '0';
      return;
    }
    var span = link.querySelector('span') || link;
    var s = span.getBoundingClientRect();
    var u = navList.getBoundingClientRect();
    indicator.style.left = (s.left - u.left) + 'px';
    indicator.style.width = s.width + 'px';
    indicator.style.opacity = '1';
  };

  function clearSpy() {
    if (!activeLink) return;
    activeLink.removeAttribute('aria-current');
    activeLink = null;
    moveIndicator(null);
  }

  var setSpy = function (id) {
    var link = spyLinks[id];
    if (!link || link === activeLink) return;
    if (activeLink) activeLink.removeAttribute('aria-current');
    link.setAttribute('aria-current', 'true');
    activeLink = link;
    moveIndicator(link);
  };

  if ('IntersectionObserver' in window && ids.length) {
    var so = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) setSpy(e.target.id);
        });
      },
      {rootMargin: '-45% 0px -50% 0px'}
    );
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) so.observe(el);
    });
    addEventListener('resize', function () {
      moveIndicator(activeLink);
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
