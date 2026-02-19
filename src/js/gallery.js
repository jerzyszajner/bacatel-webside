/**
 * Baca Tel – gallery carousel (Swiper)
 */
function initGallery() {
  const el = document.querySelector(".gallery.swiper");
  if (!el) return;
  new Swiper(el, {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    navigation: {
      nextEl: ".gallery__btn--next",
      prevEl: ".gallery__btn--prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
