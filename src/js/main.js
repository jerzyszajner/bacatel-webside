/**
 * Baca Tel – scroll-to-top, map lazy-load, app init
 *
 * Entry point: initializes modules (theme, nav, gallery),
 * handles logo, scroll-to-top button, Google Maps lazy-load.
 */

/**
 * Scrolls page to top with smooth animation.
 * @param {Event} [e] - optional event (preventDefault)
 */
function scrollToTop(e) {
  if (e) e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  /** Module initialization */
  initTheme();

  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  initNav();
  initGallery();

  /** Logo – click scrolls to top */
  const logo = document.querySelector('.logo[href="#top"]');
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToTop();
      logo.blur();
    });
  }

  /** Scroll-to-top button – shows after scrolling > 400px */
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToTop();
    });

    const toggleScrollTop = () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add("is-visible");
      } else {
        scrollTopBtn.classList.remove("is-visible");
      }
    };

    toggleScrollTop();
    window.addEventListener("scroll", toggleScrollTop, { passive: true });
  }

  /** Lazy-load map – loads Google Maps iframe only after scrolling to Contact section */
  const mapIframe = document.querySelector(".contact-map__iframe[data-src]");
  if (mapIframe && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const src = mapIframe.getAttribute("data-src");
          if (src) {
            mapIframe.setAttribute("src", src);
            mapIframe.removeAttribute("data-src");
          }
          observer.disconnect();
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(mapIframe);
  } else if (mapIframe) {
    /** Fallback when IntersectionObserver is unavailable (older browsers) */
    const src = mapIframe.getAttribute("data-src");
    if (src) {
      mapIframe.setAttribute("src", src);
      mapIframe.removeAttribute("data-src");
    }
  }
});
