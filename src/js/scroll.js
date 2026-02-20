/**
 * Baca Tel – scroll behavior
 * Active nav highlighting, scroll-to-top (logo + button), scroll-top visibility.
 */

/** Scroll threshold (px) to show the scroll-to-top button. */
const SCROLL_TOP_THRESHOLD = Math.min(400, typeof window !== "undefined" ? window.innerHeight : 400);

/** Updates active nav link based on section id. */
function setActiveNav(activeId) {
  const navLinks = document.querySelectorAll(".nav__link");
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

/** Initializes scroll behavior: active nav (IntersectionObserver), logo + scroll-top, button visibility. */
function initScroll() {
  const header = document.querySelector(".header");
  const headerHeight = header?.offsetHeight ?? 72;
  const logo = document.querySelector(".logo");
  const scrollTopBtn = document.querySelector(".scroll-top");
  const sections = document.querySelectorAll("#o-nas, #galeria, #oferta, #serwis, #kontakt");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
      // When a section leaves (isIntersecting: false), we ignore it.
      // The next section entering the zone will set itself as active.
    },
    {
      root: null,
      rootMargin: `-${headerHeight}px 0px -60% 0px`,
      threshold: 0,
    }
  );

  sections.forEach((s) => observer.observe(s));

  let ticking = false;
  function updateScrollTopVisibility() {
    if (scrollTopBtn) {
      const isVisible = window.scrollY > SCROLL_TOP_THRESHOLD;
      scrollTopBtn.classList.toggle("is-visible", isVisible);
      scrollTopBtn.setAttribute("aria-hidden", isVisible ? "false" : "true");
    }
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollTopVisibility);
        ticking = true;
      }
    },
    { passive: true }
  );
  updateScrollTopVisibility();

  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      handleScrollToTop(logo);
    });
  }
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleScrollToTop(scrollTopBtn);
    });
  }
}
