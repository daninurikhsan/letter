(function () {
  var PASSWORD = '020224';
  var gateStage = document.getElementById('gateStage');
  var letterStage = document.getElementById('letterStage');
  var envelope = document.getElementById('envelope');
  var form = document.getElementById('gateForm');
  var input = document.getElementById('gateInput');
  var error = document.getElementById('gateError');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealParagraphs() {
    var paras = document.querySelectorAll('.letter p');
    if (reduce || !('IntersectionObserver' in window)) {
      paras.forEach(function (p) { p.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    paras.forEach(function (p) { io.observe(p); });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var value = input.value.trim();

    if (value !== PASSWORD) {
      error.classList.add('show');
      envelope.classList.remove('shake');
      void envelope.offsetWidth;
      envelope.classList.add('shake');
      input.value = '';
      input.focus();
      return;
    }

    envelope.classList.add('open');
    var delay = reduce ? 0 : 900;

    setTimeout(function () {
      gateStage.classList.add('fade-out');
      setTimeout(function () {
        gateStage.classList.add('hide');
        letterStage.classList.add('show');
        revealParagraphs();
      }, reduce ? 0 : 550);
    }, delay);
  });
})();
