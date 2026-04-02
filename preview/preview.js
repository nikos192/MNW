document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.preview-header');

  function updateHeader() {
    if (!header) {
      return;
    }

    header.classList.toggle('is-scrolled', window.scrollY > 42);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('[data-fitment-trigger]').forEach(function (button) {
    button.addEventListener('click', function () {
      var container = button.closest('[data-fitment-checker]');
      if (!container) {
        return;
      }

      var make = container.querySelector('[data-fitment-make]');
      var model = container.querySelector('[data-fitment-model]');
      var result = container.querySelector('[data-fitment-result]');

      if (!result || !make || !model) {
        return;
      }

      var makeValue = make.value.trim().toLowerCase();
      var modelValue = model.value.trim().toLowerCase();

      result.classList.remove('is-ok');

      if (!makeValue || !modelValue) {
        result.textContent = 'Enter make and model to simulate the fitment response.';
        return;
      }

      if (makeValue.indexOf('bmw') !== -1 && (modelValue.indexOf('m3') !== -1 || modelValue.indexOf('g80') !== -1)) {
        result.textContent = 'Compatible - recommended offset: ET35';
        result.classList.add('is-ok');
        return;
      }

      if (makeValue.indexOf('porsche') !== -1 && modelValue.indexOf('911') !== -1) {
        result.textContent = 'Compatible - final rear specification should be confirmed against tyre width.';
        result.classList.add('is-ok');
        return;
      }

      result.textContent = 'This width may require arch modification - contact MNW before approval.';
    });
  });

  document.querySelectorAll('[data-swatch]').forEach(function (swatch) {
    swatch.addEventListener('click', function () {
      var group = swatch.closest('[data-swatch-group]');
      if (!group) {
        return;
      }

      group.querySelectorAll('[data-swatch]').forEach(function (item) {
        item.classList.remove('is-selected');
      });

      swatch.classList.add('is-selected');
    });
  });

  document.querySelectorAll('[data-thumb]').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      var group = thumb.closest('[data-thumb-group]');
      if (!group) {
        return;
      }

      group.querySelectorAll('[data-thumb]').forEach(function (item) {
        item.classList.remove('is-active');
      });

      thumb.classList.add('is-active');
    });
  });
});