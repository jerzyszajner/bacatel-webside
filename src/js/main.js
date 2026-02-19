/**
 * Baca Tel – scroll-to-top, map lazy-load, app init
 *
 * Entry point: initializes modules (theme, nav, gallery, hours),
 * handles logo, scroll-to-top button, Google Maps lazy-load.
 */

/**
 * Updates active state on nav links based on visible section.
 */
function updateActiveNav() {
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("#o-nas, #galeria, #oferta, #serwis, #kontakt");
  const offset = 120;

  const scrollPosition = window.scrollY + offset;
  let activeId = null;

  for (const section of sections) {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPosition >= top && scrollPosition < top + height) {
      activeId = section.id;
      break;
    }
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `#${activeId}`) {
      link.classList.add("nav__link--active");
    } else {
      link.classList.remove("nav__link--active");
    }
  });
}

/**
 * Removes active state from all nav links.
 */
function clearActiveNav() {
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.classList.remove("nav__link--active");
  });
}

/**
 * Initializes active nav highlighting (scroll-based).
 */
function initActiveNav() {
  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav, { passive: true });
}

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
  updateHoursStatus();
  initNav();
  initGallery();
  initActiveNav();

  /** Logo – click scrolls to top */
  const logo = document.querySelector('.logo[href="#top"]');
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToTop();
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
      clearActiveNav();
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
