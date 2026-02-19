/**
 * Baca Tel – app init
 *
 * Entry point: initializes modules (theme, nav, gallery, hours, scroll, map).
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  updateHoursStatus();
  initNav();
  initGallery();
  initScroll();
  initMap();
});
