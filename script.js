// ========== 1. MENÚ HAMBURGUESA (móvil) ==========
const botonMenu = document.getElementById('hamburguesa');
const menu = document.getElementById('menu');

function alternarMenu(abrir) {
  menu.classList.toggle('abierto', abrir);
  botonMenu.setAttribute('aria-expanded', abrir);
  botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
}

botonMenu.addEventListener('click', () => {
  alternarMenu(!menu.classList.contains('abierto'));
});

// Cierra el menú al pulsar un enlace o la tecla Escape
menu.querySelectorAll('a').forEach(enlace => {
  enlace.addEventListener('click', () => alternarMenu(false));
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') alternarMenu(false);
});

// ========== 2. MODO OSCURO ==========
const botonTema = document.getElementById('tema');
const raiz = document.documentElement;

function aplicarTema(tema) {
  raiz.setAttribute('data-theme', tema);
  botonTema.innerHTML = tema === 'dark'
    ? '<span aria-hidden="true">☀️</span>'
    : '<span aria-hidden="true">🌙</span>';
  botonTema.setAttribute('aria-label',
    tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

// Tema guardado, o el del sistema si es la primera visita
let temaGuardado = null;
try { temaGuardado = localStorage.getItem('tema'); } catch (e) { /* sin almacenamiento */ }
const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
aplicarTema(temaGuardado || (prefiereOscuro ? 'dark' : 'light'));

botonTema.addEventListener('click', () => {
  const nuevo = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  aplicarTema(nuevo);
  try { localStorage.setItem('tema', nuevo); } catch (e) { /* ignorar */ }
});

// ========== 3. APARICIÓN AL HACER SCROLL ==========
const elementos = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        obs.unobserve(entrada.target); // solo anima una vez
      }
    });
  }, { threshold: 0.15 });
  elementos.forEach(el => observador.observe(el));
} else {
  // Navegadores antiguos: mostrar todo directamente
  elementos.forEach(el => el.classList.add('visible'));
}

// ========== 4. AÑO ACTUAL EN EL FOOTER ==========
document.getElementById('anio').textContent = new Date().getFullYear();