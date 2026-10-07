const WHATSAPP_NUMBER = "ADICIONAR_NUMERO_POSTERIORMENTE";
const WHATSAPP_MESSAGE = "Olá, Dra. Indira! Gostaria de informações sobre uma consulta.";

function openWhatsApp() {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  const status = document.querySelector("#whatsapp-status");
  if (!number || WHATSAPP_NUMBER === "ADICIONAR_NUMERO_POSTERIORMENTE") {
    if (status) {
      const note = "O WhatsApp para agendamentos será disponibilizado em breve.";
      status.textContent = note;
      window.setTimeout(() => { if (status.textContent === note) status.textContent = ""; }, 5500);
    }
    return;
  }
  window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE), "_blank", "noopener,noreferrer");
}
document.querySelectorAll("[data-whatsapp]").forEach((button) => button.addEventListener("click", openWhatsApp));

const menu = document.querySelector(".menu");
const nav = document.querySelector("#nav");
function setMenu(open) {
  menu?.setAttribute("aria-expanded", String(open));
  menu?.setAttribute("aria-label", open ? "Fechar navegação" : "Abrir navegação");
  nav?.classList.toggle("open", open);
}
menu?.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenu(false); });

const header = document.querySelector(".header");
const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 20);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

let progressTick = 0;
function updateScrollProgress() {
  if (progressTick) return;
  progressTick = window.requestAnimationFrame(() => {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
    document.documentElement.style.setProperty("--scroll-progress", String(progress));
    progressTick = 0;
  });
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress, { passive: true });
updateScrollProgress();

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const SITE_URL = "ADICIONAR_DOMINIO_POSTERIORMENTE";
if (/^https:\/\/[^/\s]+/i.test(SITE_URL)) {
  const canonical = document.createElement("link");
  canonical.rel = "canonical";
  canonical.href = SITE_URL.replace(/\/+$/, "") + "/";
  document.head.append(canonical);
  const og = document.createElement("meta");
  og.setAttribute("property", "og:url");
  og.content = canonical.href;
  document.head.append(og);
}

const animated = document.querySelectorAll(
  ".hero-copy,.hero-portrait img,.about-portrait,.about>div,.journey-intro,.timeline li,.section-title,.practice-grid article,.approach-copy,.approach-image,.pillars article,.degrees article,.courses,.experience>div,.experience ol,.trust,.location>div,.contact h2"
);
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  animated.forEach((el) => el.classList.add("reveal"));
  const observer = new IntersectionObserver((entries, obs) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
  }), { threshold: 0.12 });
  animated.forEach((el) => observer.observe(el));
}
window.openWhatsApp = openWhatsApp;
// Keep the floating appointment shortcut from covering the About section on small screens.
(() => {
  const about = document.querySelector('#sobre');
  if (!about || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(([entry]) => {
    document.body.classList.toggle('about-in-view', entry.isIntersecting);
  }, { threshold: 0.12 });
  observer.observe(about);
})();
