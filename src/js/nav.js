/**
 * Baca Tel – mobile navigation menu
 *
 * Handles hamburger menu on mobile: open/close,
 * close on link click, aria-label updates.
 */

/**
 * Initializes mobile menu.
 * Binds hamburger button to nav list and links.
 */
function initNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const overlay = document.getElementById("nav-overlay");

  if (!navToggle || !nav) return;

  /** Updates button aria-label (Open/Close menu) */
  function updateMenuLabel() {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute(
      "aria-label",
      isExpanded ? "Zamknij menu" : "Otwórz menu",
    );
  }

  /** Toggle menu on hamburger click */
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !isExpanded);
    nav.classList.toggle("is-open");
    overlay?.classList.toggle("is-visible", !isExpanded);
    document.body.classList.toggle("menu-open", !isExpanded);
    updateMenuLabel();
  });

  /** Close menu on overlay click */
  overlay?.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    overlay?.classList.remove("is-visible");
    document.body.classList.remove("menu-open");
    updateMenuLabel();
    navToggle.focus();
  });

  /** Close menu on link click (smooth scroll handles navigation) */
  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      overlay?.classList.remove("is-visible");
      document.body.classList.remove("menu-open");
      updateMenuLabel();
      navToggle.focus();
    });
  });
}
