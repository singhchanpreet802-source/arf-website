// MAKE IT MOVE 2026 — interactions

document.addEventListener('DOMContentLoaded', () => {

  /* ---- mobile menu ---- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ---- reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- PERFORM/THINK/BUILD/SOLVE statement cycle ---- */
  const stackSpans = document.querySelectorAll('#statementStack span');
  if (stackSpans.length) {
    let idx = 0;
    stackSpans[0].classList.add('active');
    setInterval(() => {
      stackSpans[idx].classList.remove('active');
      idx = (idx + 1) % stackSpans.length;
      stackSpans[idx].classList.add('active');
    }, 1400);
  }

  /* ---- find your track quiz ---- */
  const quizOptions = document.querySelectorAll('.quiz-opt');
  const quizResult = document.getElementById('quizResult');
  const quizTrackName = document.getElementById('quizTrackName');
  quizOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      quizOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const track = opt.getAttribute('data-track');
      if (quizTrackName) quizTrackName.textContent = track;
      if (quizResult) quizResult.classList.add('show');
    });
  });

  /* ---- FAQ accordion ---- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---- interest form ----
     NOTE: This is a client-side placeholder only. No submission endpoint
     is wired up yet. To collect real submissions, connect this form to
     a backend (Google Forms/Sheets, Formspree, or a custom endpoint)
     before launch — do this deliberately, not silently. */
  const form = document.getElementById('interestForm');
  const formSuccess = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      try {
        const existing = JSON.parse(localStorage.getItem('mim_interest_submissions') || '[]');
        existing.push({ ...data, submittedAt: new Date().toISOString() });
        localStorage.setItem('mim_interest_submissions', JSON.stringify(existing));
      } catch (err) { /* localStorage unavailable — submission not persisted */ }

      form.style.display = 'none';
      formSuccess.classList.add('show');
    });
  }

});
