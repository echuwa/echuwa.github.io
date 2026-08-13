/* ─── Navbar scroll effect ─────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── Matrix canvas background ────────────────────────────── */
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = '01アイウエオカキ{}[]<>/\\|=+-';
  const fontSize = 13;
  let cols = Math.floor(canvas.width / fontSize);
  let drops = Array(cols).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(5,12,26,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4f9eff';
    ctx.font = `${fontSize}px JetBrains Mono, monospace`;
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
    cols = Math.floor(canvas.width / fontSize);
    while (drops.length < cols) drops.push(Math.floor(Math.random() * canvas.height / fontSize));
  }

  setInterval(draw, 60);
})();

/* ─── Scroll-in animations ─────────────────────────────────── */
(function initScrollAnim() {
  const style = document.createElement('style');
  style.textContent = `
    .anim-hidden { opacity:0; transform:translateY(30px); transition:opacity 0.6s ease, transform 0.6s ease; }
    .anim-visible { opacity:1; transform:translateY(0); }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.project-card,.info-card,.contact-card,.skill-group,.stat'
  );
  targets.forEach(el => el.classList.add('anim-hidden'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('anim-visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => obs.observe(el));
})();

/* ─── Smooth active nav highlight ──────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = '#c9a96e';
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => obs.observe(s));
})();
