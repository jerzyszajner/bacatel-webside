/**
 * Baca Tel – app init
 *
 * Entry point: initializes modules (theme, nav, gallery, hours, scroll, map).
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  updateHoursStatus();
  setInterval(updateHoursStatus, 60 * 1000);
  initNav();
  initGallery();
  initScroll();
  initMap();
});
