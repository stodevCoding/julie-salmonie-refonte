/* ============================================
   JULIE SALMONIE — MAIN JS
   ============================================ */

(function () {
  'use strict';

  /* ---------- THEME TOGGLE ---------- */
  function initThemeToggle() {
    var saved = localStorage.getItem('theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }

    var toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        if (next === 'light') {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
        }
      });
    });
  }

  /* ---------- PRELOADER ---------- */
  function initPreloader() {
    var preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('hidden');
        document.body.classList.add('loaded');
      }, 600);
    });
    setTimeout(function () {
      preloader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 3000);
  }

  /* ---------- NAVBAR ---------- */
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var scrollY = window.scrollY;
        navbar.classList.toggle('scrolled', scrollY > 80);

        var scrollPos = scrollY + 200;
        var activeId = '';
        for (var i = sections.length - 1; i >= 0; i--) {
          if (scrollPos >= sections[i].offsetTop) {
            activeId = sections[i].id;
            break;
          }
        }
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
        });
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- MOBILE MENU ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('mobile-menu');
    var links = menu.querySelectorAll('a');

    function closeMenu() {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }

    toggle.addEventListener('click', function () {
      if (menu.classList.contains('open')) {
        closeMenu();
      } else {
        toggle.classList.add('active');
        menu.classList.add('open');
        document.body.classList.add('no-scroll');
      }
    });

    links.forEach(function (link) { link.addEventListener('click', closeMenu); });
  }

  /* ---------- SMOOTH SCROLL ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          var top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal, .reveal-up');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );
    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- INIT ---------- */
  function init() {
    initThemeToggle();
    initPreloader();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
