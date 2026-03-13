function renderNavbar(activePage) {
  const pages = [
    { href: '../index.html', label: 'Inicio' },
    { href: '../pages/galeria.html', label: 'Galería' },
    { href: '../pages/tecnicas.html', label: 'Técnicas' },
    { href: '../pages/equipo.html', label: 'Equipo' },
    { href: '../pages/contacto.html', label: 'Contacto' },
  ];

  const links = pages.map(p => `
    <li class="nav-item">
      <a class="nav-link${p.label === activePage ? ' active' : ''}" href="${p.href}">${p.label}</a>
    </li>
  `).join('');

  return `
  <nav class="navbar navbar-expand-lg navbar-custom fixed-top">
    <div class="container">
      <a class="navbar-brand" href="../index.html">
        <span class="navbar-brand-text">🌿 Naturaleza</span>
        <span class="navbar-brand-sub">en foco</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMain">
        <ul class="navbar-nav ms-auto gap-1">${links}</ul>
      </div>
    </div>
  </nav>`;
}

function renderFooter() {
  return `
  <footer class="footer-custom">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4">
          <div class="footer-brand">🌿 Naturaleza en Foco</div>
          <p class="mt-2" style="font-size:0.8rem;opacity:0.7;line-height:1.7">
            Capturando la belleza efímera del mundo natural, un fotograma a la vez.
          </p>
        </div>
        <div class="col-md-4">
          <h6 style="color:var(--acento-dorado);letter-spacing:3px;font-size:0.7rem;text-transform:uppercase;margin-bottom:1rem">Páginas</h6>
          <div class="footer-links">
            <a href="../index.html">Inicio</a>
            <a href="../pages/galeria.html">Galería</a>
            <a href="../pages/tecnicas.html">Técnicas</a>
            <a href="../pages/equipo.html">Equipo</a>
            <a href="../pages/contacto.html">Contacto</a>
          </div>
        </div>
        <div class="col-md-4">
          <h6 style="color:var(--acento-dorado);letter-spacing:3px;font-size:0.7rem;text-transform:uppercase;margin-bottom:1rem">Síguenos</h6>
          <div class="footer-links">
            <a href="#">📸 Instagram</a>
            <a href="#">🎥 YouTube</a>
            <a href="#">🐦 Twitter / X</a>
          </div>
        </div>
      </div>
      <hr>
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <p class="footer-copy mb-0">© 2025 Naturaleza en Foco — Todos los derechos reservados</p>
        <p class="footer-copy mb-0" style="color:var(--acento-dorado)">Hecho con ❤️ y paciencia</p>
      </div>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden-anim');
        const animClass = entry.target.dataset.anim || 'animate-fadeInUp';
        entry.target.classList.add(animClass);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-scroll-anim]').forEach(el => {
    el.classList.add('hidden-anim');
    observer.observe(el);
  });
});
