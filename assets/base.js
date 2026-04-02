/* ============================================================
   MNW — Base JavaScript
   Nav scroll behaviour, mobile menu, scroll reveals
   ============================================================ */

'use strict';

/* ── Header reveal timing ── */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const revealDelay = document.body.classList.contains('template-index') ? 1200 : 0;
  window.setTimeout(function () {
    header.classList.add('is-ready');
  }, revealDelay);
})();

/* ── Nav scroll behaviour ── */
(function () {
  const SCROLL_THRESHOLD = 60;
  const header = document.querySelector('.site-header');
  if (!header) return;

  function updateNav() {
    if (window.scrollY >= SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

/* ── Mobile menu ── */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const overlay = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.nav-overlay__close');
  const links = document.querySelectorAll('.nav-overlay__link');
  if (!toggle || !overlay) return;

  function openMenu() {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', openMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  links.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeMenu();
  });

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
})();

/* ── Hero and section parallax ── */
(function () {
  const hero = document.querySelector('.hero');
  const heroVisual = document.querySelector('.hero__wheel-wrap');
  const parallaxItems = document.querySelectorAll('[data-parallax="true"]');

  if (!hero && parallaxItems.length === 0) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    if (hero && heroVisual) {
      const heroHeight = hero.offsetHeight || window.innerHeight;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      heroVisual.style.transform = 'translate3d(0, ' + (scrollY * -0.3).toFixed(2) + 'px, 0)';
      heroVisual.style.opacity = (1 - progress * 0.8).toFixed(3);
    }

    parallaxItems.forEach(function (item) {
      const rect = item.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * 0.05;
      item.style.transform = 'translate3d(0, ' + Math.max(Math.min(offset, 28), -28).toFixed(2) + 'px, 0)';
    });

    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  requestUpdate();
})();

/* ── Scroll-triggered reveals ── */
(function () {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

/* ── Nav link hover underline ── */
/* Handled purely in CSS via .site-header__nav-link::after */

/* ── Vehicle configurator widget ── */
(function () {
  const makeSelect = document.getElementById('vehicle-make');
  const modelSelect = document.getElementById('vehicle-model');
  const yearSelect = document.getElementById('vehicle-year');
  const cta = document.querySelector('.configurator-cta__btn');

  if (!makeSelect || !modelSelect || !yearSelect) return;

  // Vehicle data — extend as needed
  const vehicleData = {
    BMW: {
      '1 Series': [2004, 2007, 2011, 2015, 2019, 2020, 2021, 2022, 2023, 2024],
      '2 Series': [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      '3 Series': [1992, 1999, 2005, 2012, 2019, 2020, 2021, 2022, 2023, 2024],
      '4 Series': [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      '5 Series': [1987, 1996, 2003, 2010, 2017, 2020, 2021, 2022, 2023, 2024],
      'M2': [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      'M3': [1994, 1999, 2008, 2014, 2021, 2022, 2023, 2024],
      'M4': [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      'M5': [1999, 2005, 2012, 2018, 2021, 2022, 2023, 2024],
    },
    Porsche: {
      '911': [1999, 2005, 2012, 2020, 2021, 2022, 2023, 2024],
      'Cayman / Boxster': [2005, 2009, 2013, 2016, 2020, 2021, 2022, 2023, 2024],
      'Cayenne': [2003, 2008, 2011, 2018, 2020, 2021, 2022, 2023, 2024],
      'Macan': [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      'Panamera': [2009, 2014, 2017, 2020, 2021, 2022, 2023, 2024],
    },
    Audi: {
      'A3 / S3 / RS3': [2000, 2004, 2013, 2020, 2021, 2022, 2023, 2024],
      'A4 / S4 / RS4': [1994, 2002, 2008, 2016, 2020, 2021, 2022, 2023, 2024],
      'A5 / S5 / RS5': [2007, 2012, 2017, 2020, 2021, 2022, 2023, 2024],
      'TT / TTS / TT RS': [1998, 2006, 2014, 2019],
      'R8': [2007, 2012, 2016, 2020, 2021, 2022, 2023],
    },
    Mercedes: {
      'C-Class (C43 / C63)': [2000, 2007, 2014, 2019, 2022, 2023, 2024],
      'E-Class (E43 / E63)': [1999, 2002, 2010, 2016, 2021, 2022, 2023, 2024],
      'A35 / A45 AMG': [2013, 2016, 2019, 2020, 2021, 2022, 2023, 2024],
      'GLC / GLC 63': [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
      'GT / AMG GT': [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    },
    Volkswagen: {
      'Golf R / GTI': [2000, 2005, 2013, 2015, 2021, 2022, 2023, 2024],
      'Polo GTI': [2010, 2014, 2018, 2022, 2023, 2024],
      'Arteon': [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    },
    Other: {},
  };

  function populateModels(make) {
    modelSelect.innerHTML = '<option value="">Select Model</option>';
    yearSelect.innerHTML = '<option value="">Select Year</option>';
    modelSelect.disabled = !make || make === '';

    if (!make || !vehicleData[make]) return;

    Object.keys(vehicleData[make]).forEach(function (model) {
      const opt = document.createElement('option');
      opt.value = model;
      opt.textContent = model;
      modelSelect.appendChild(opt);
    });
    modelSelect.disabled = false;
  }

  function populateYears(make, model) {
    yearSelect.innerHTML = '<option value="">Select Year</option>';
    yearSelect.disabled = true;

    if (!make || !model || !vehicleData[make] || !vehicleData[make][model]) return;

    const years = vehicleData[make][model];
    years.slice().reverse().forEach(function (year) {
      const opt = document.createElement('option');
      opt.value = year;
      opt.textContent = year + '+';
      yearSelect.appendChild(opt);
    });
    yearSelect.disabled = false;
  }

  function updateCTA() {
    if (!cta) return;
    const make = makeSelect.value;
    const model = modelSelect.value;
    const year = yearSelect.value;

    if (make && model && year) {
      cta.classList.add('is-active');
      cta.setAttribute('aria-disabled', 'false');

      // Build filtered collection URL
      const params = new URLSearchParams({
        filter_make: make,
        filter_model: model,
        filter_year: year,
      });
      cta.href = '/collections/all?' + params.toString();
    } else {
      cta.classList.remove('is-active');
      cta.setAttribute('aria-disabled', 'true');
      cta.href = '/collections/all';
    }
  }

  makeSelect.addEventListener('change', function () {
    populateModels(makeSelect.value);
    updateCTA();
  });

  modelSelect.addEventListener('change', function () {
    populateYears(makeSelect.value, modelSelect.value);
    updateCTA();
  });

  yearSelect.addEventListener('change', updateCTA);

  // Init
  populateModels(makeSelect.value);
  updateCTA();
})();

/* ── Collection mobile filters ── */
(function () {
  const toggle = document.querySelector('.collection-page__filter-toggle');
  const drawer = document.querySelector('.collection-page__mobile-drawer');
  const closeButtons = document.querySelectorAll('[data-mobile-filter-close]');

  if (!toggle || !drawer) return;

  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    if (drawer.classList.contains('is-open')) {
      closeDrawer();
      return;
    }

    openDrawer();
  });

  closeButtons.forEach(function (button) {
    button.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
})();
