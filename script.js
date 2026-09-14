document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min((index % 4) * 65, 195)}ms`;
  observer.observe(el);
});

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  if (!open) {
    nav.style.display = 'flex'; nav.style.position = 'absolute'; nav.style.top = '70px'; nav.style.left = '0'; nav.style.right = '0'; nav.style.padding = '30px 6vw'; nav.style.background = '#f3f0e8'; nav.style.flexDirection = 'column'; nav.style.borderBottom = '1px solid rgba(17,18,15,.18)';
  } else nav.removeAttribute('style');
});

nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { if (window.innerWidth <= 900) { nav.removeAttribute('style'); menuButton?.setAttribute('aria-expanded','false'); } }));

const glow = document.querySelector('.cursor-glow');
if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove', e => { if (!glow) return; glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; glow.style.opacity = '1'; });
}

const orbit = document.querySelector('.hero-orbit');
window.addEventListener('scroll', () => {
  if (!orbit || window.innerWidth < 900) return;
  const y = Math.min(window.scrollY * .06, 32);
  orbit.style.marginBottom = `${y}px`;
}, { passive: true });
