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
  var slot = document.querySelector('[data-name-slot]');
  var about = document.getElementById('about');
  var divider = about && (about.querySelector('.bg-line') || about);
  var progress = document.querySelector('[data-progress]');
  var fades = hero ? hero.querySelectorAll('[data-hero-fade]') : [];
  var kineticTrack = document.querySelector('[data-kinetic-track]');
  var kineticHalf = 0;
  // current scroll-driven axis base — the liquid swell adds on top of THIS,
  // so hovered letters stay consistent with the compressed name mid-scroll
  var heroWght = 700;
  var heroWdth = 125;
  var nameFixed = false;

  // pin geometry — document-space positions, refreshed on resize
  var slotTopDoc = 0;
  var slotLeft = 0;
  var slotWidth = 0;
  var dividerDoc = 0;
  var lineH = 0; // one line-box of the name — STABLE fade basis (no live reads)
  var PIN_TOP = 84;

  var measureKinetic = function () {
    if (kineticTrack) kineticHalf = kineticTrack.scrollWidth / 2;
    if (slot) {
      var wasFixed = nameFixed;
      if (wasFixed) setFixed(false); // measure the natural position
      // Size the slot to the name's RESTING height (viewport-dependent: one
      // or two lines). Measured under a forced rest state — the !important
      // inline value beats even the running entrance animation — so the
      // result is deterministic at init, on resize, and mid-scroll.
      var inner = name.firstElementChild;
      if (inner) {
        var prevFvs = name.style.fontVariationSettings;
        var prevWs = name.style.whiteSpace;
        name.style.setProperty(
          'font-variation-settings', '"wght" 700, "wdth" 125', 'important');
        name.style.whiteSpace = 'normal';
        slot.style.height = inner.getBoundingClientRect().height + 'px';
        name.style.removeProperty('font-variation-settings');
        if (prevFvs) name.style.fontVariationSettings = prevFvs;
        name.style.whiteSpace = prevWs;
      }
      var r = slot.getBoundingClientRect();
      slotTopDoc = r.top + window.scrollY;
      slotLeft = r.left;
      slotWidth = r.width;
      lineH = parseFloat(getComputedStyle(name).fontSize) * 0.9;
      if (divider) {
        dividerDoc = divider.getBoundingClientRect().top + window.scrollY;
      }
      if (wasFixed) setFixed(true);
    }
  };

  function setFixed(on) {
    if (!name || on === nameFixed) return;
    nameFixed = on;
    if (on) {
      name.style.left = slotLeft + 'px';
      name.style.width = slotWidth + 'px';
      name.classList.add('hero-name--fixed');
    } else {
      name.classList.remove('hero-name--fixed');
      name.style.left = '';
      name.style.width = '';
      name.style.transform = '';
      name.style.opacity = '';
      name.style.visibility = '';
    }
  }
  measureKinetic();
  addEventListener('resize', measureKinetic);
  // The slot/divider geometry depends on real font metrics — the init run
  // above used fallback-font layout. Re-measure once the webfonts are in.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      measureKinetic();
      drive();
    });
  }

  var ticking = false;
  var drive = function () {
    ticking = false;
    var y = window.scrollY;

    if (!reduce.matches) {
      if (hero && name) {
        var p = Math.min(1, Math.max(0, y / hero.offsetHeight));
        heroWght = Math.round(700 - 40 * p);
        heroWdth = Math.round(125 - 47 * p);
        var shouldPin = slot && slotTopDoc - y <= PIN_TOP;
        name.style.fontVariationSettings =
          '"wght" ' + heroWght + ', "wdth" ' + heroWdth;

        // Pin: once the slot's natural position would pass under the nav, the
        // name rides fixed while everything scrolls away behind its solid
        // background — all the way to the hero/About divider.
        if (slot) {
          setFixed(shouldPin);
          if (nameFixed && dividerDoc) {
            // Dissolve: viewport-relative — the fade runs while the hero/About
            // divider climbs through the lower half of the screen and is DONE
            // by the time it reaches ~45% height, i.e. exactly when the About
            // section becomes the dominant content. Pure function of y.
            var dView = dividerDoc - y; // divider's viewport y
            var vh = window.innerHeight;
            var fStart = vh * 0.88;
            var fEnd = Math.max(PIN_TOP + 20, vh * 0.45);
            var ft = Math.min(1, Math.max(0, (fStart - dView) / (fStart - fEnd)));
            name.style.transform = ft > 0 ? 'scale(' + (1 - 0.3 * ft).toFixed(4) + ')' : '';
            name.style.opacity = ft > 0 ? (1 - ft).toFixed(3) : '';
            name.style.visibility = ft >= 1 ? 'hidden' : '';
          }
        }
        fades.forEach(function (el) {
          var f = parseInt(el.getAttribute('data-hero-fade'), 10) || 1;
          el.style.transform = 'translateY(' + (-p * 18 * f).toFixed(1) + 'px)';
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
      lastOut[li] = '';
    }
    var cacheDirty = true;
    var inside = false;
    var running = false;
    var fixedMode = false; // letter cache in viewport space while pinned
    var mx = 0;
    var myDoc = 0;
    var myView = 0;

    var rebuildCache = function () {
      cacheDirty = false;
      // Line lock: if the (possibly scroll-compressed) name currently fits on
      // one line, freeze wrapping for this gesture — the swell then spills a
      // few px into the page margin instead of re-wrapping to two lines.
      // Measured on the inner span: the h1 box reserves two lines by design.
      var inner = name.firstElementChild;
      if (inner) {
        var lineHeight = parseFloat(getComputedStyle(name).fontSize) * 0.9;
        var lines = Math.round(inner.getBoundingClientRect().height / lineHeight);
        name.style.whiteSpace = lines <= 1 ? 'nowrap' : '';
      }
      // one batched read block at frame start — a single reflow at most.
      // While the name is pinned (position: fixed) letters live in viewport
      // space; otherwise document space, so vertical scrolling stays free.
      fixedMode = name.classList.contains('hero-name--fixed');
      for (var i = 0; i < count; i++) {
        var r = letters[i].getBoundingClientRect();
        centerX[i] = r.left + r.width / 2;
        centerY[i] = r.top + r.height / 2 + (fixedMode ? 0 : window.scrollY);
      }
    };

    var step = function () {
      if (cacheDirty) rebuildCache();
      var alive = false;
      for (var i = 0; i < count; i++) {
        var target = 0;
        if (inside) {
          var d = Math.hypot(centerX[i] - mx, centerY[i] - (fixedMode ? myView : myDoc));
          var t = Math.max(0, 1 - d / 300);
          target = t * t * (3 - 2 * t); // smoothstep: organic falloff
        }
        // asymmetric spring: swell quickly, relax gently
        var c = cur[i] + (target - cur[i]) * (target > cur[i] ? 0.34 : 0.16);
        if (c < 0.004 && target === 0) c = 0;
        cur[i] = c;
        if (c > 0 || inside) alive = true;
        var out = c === 0
          ? ''
          : '"wght" ' + Math.round(heroWght + 210 * c) +
            ', "wdth" ' + Math.round(heroWdth + 15 * c);
        if (out !== lastOut[i]) {
          lastOut[i] = out;
          letters[i].style.fontVariationSettings = out;
        }
      }
      if (alive) {
        requestAnimationFrame(step);
      } else {
        running = false;
        name.style.whiteSpace = '';
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
      myView = e.clientY;
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
