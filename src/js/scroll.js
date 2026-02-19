/**
 * Baca Tel – scroll behavior
 * Active nav highlighting, scroll-to-top (logo + button), scroll-top visibility.
 */

/** Updates active nav link based on visible section. */
function updateActiveNav() {
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("#o-nas, #galeria, #oferta, #serwis, #kontakt");
  const scrollY = window.scrollY + 120;
  let activeId = null;

  for (const section of sections) {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      activeId = section.id;
      break;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("nav__link--active", link.getAttribute("href") === `#${activeId}`);
  });
}

/** Removes active state from all nav links. */
function clearActiveNav() {
  document.querySelectorAll(".nav__link").forEach((link) => link.classList.remove("nav__link--active"));
}

/** Scrolls to top, clears URL hash, clears nav state, blurs element. */
function handleScrollToTop(el) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", location.pathname + location.search);
  clearActiveNav();
  if (el) el.blur();
}

/** Initializes scroll behavior: active nav, logo + scroll-top clicks, scroll-top visibility. */
function initScroll() {
  const logo = document.querySelector(".logo");
  const scrollTopBtn = document.querySelector(".scroll-top");

  function onScroll() {
    updateActiveNav();
    if (scrollTopBtn) {
      const isVisible = window.scrollY > 400;
      scrollTopBtn.classList.toggle("is-visible", isVisible);
      scrollTopBtn.setAttribute("aria-hidden", isVisible ? "false" : "true");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (logo) {
    logo.addEventListener("click", (e) => { e.preventDefault(); handleScrollToTop(logo); });
  }
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => { e.preventDefault(); handleScrollToTop(scrollTopBtn); });
  }
}
