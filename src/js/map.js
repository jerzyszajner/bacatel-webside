/**
 * Baca Tel – map lazy-load
 *
 * Loads Google Maps iframe only after scrolling to Contact section.
 */

/**
 * Initializes lazy-load for map iframe.
 * Uses IntersectionObserver when available, fallback for older browsers.
 */
function initMap() {
  const mapIframe = document.querySelector(".contact-map__iframe[data-src]");
  if (!mapIframe) return;

  if ("IntersectionObserver" in window) {
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
  } else {
    /** Fallback when IntersectionObserver is unavailable (older browsers) */
    const src = mapIframe.getAttribute("data-src");
    if (src) {
      mapIframe.setAttribute("src", src);
      mapIframe.removeAttribute("data-src");
    }
  }
}
