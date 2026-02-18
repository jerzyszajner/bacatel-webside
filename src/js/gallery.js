/**
 * Baca Tel – gallery carousel
 *
 * Image carousel: auto-rotation, prev/next navigation,
 * scroll-snap, aria-current and live region updates for screen readers.
 */

/** Auto-rotation interval in ms */
const CAROUSEL_INTERVAL = 5000;

/**
 * Initializes gallery carousel.
 * Starts auto-rotation and binds navigation buttons.
 */
function initGallery() {
  const galleryTrack = document.querySelector(".gallery__track");
  const galleryPrev = document.querySelector(".gallery__btn--prev");
  const galleryNext = document.querySelector(".gallery__btn--next");

  if (!galleryTrack || !galleryPrev || !galleryNext) return;

  const slides = galleryTrack.querySelectorAll(".gallery__slide");
  const totalSlides = slides.length;
  const slideWidth = () => galleryTrack.offsetWidth;

  let carouselTimer = null;

  /** Live region element – announces current slide to screen readers */
  const galleryLive = document.querySelector(".gallery__live");
  let lastAnnouncedIndex = -1;

  /**
   * Updates aria-current on slides and live region text.
   * @param {number} activeIndex - index of active slide
   */
  function updateAriaCurrent(activeIndex) {
    slides.forEach((slide, i) => {
      if (i === activeIndex) {
        slide.setAttribute("aria-current", "true");
      } else {
        slide.removeAttribute("aria-current");
      }
    });
    if (galleryLive && activeIndex !== lastAnnouncedIndex) {
      lastAnnouncedIndex = activeIndex;
      galleryLive.textContent = `Zdjęcie ${activeIndex + 1} z ${totalSlides}`;
    }
  }

  /**
   * Scrolls to slide at given index.
   * @param {number} index - slide index (0-based)
   */
  function goToSlide(index) {
    const target = Math.max(0, Math.min(index, totalSlides - 1));
    galleryTrack.scrollTo({
      left: target * slideWidth(),
      behavior: "smooth",
    });
    updateAriaCurrent(target);
  }

  /** Goes to next slide (wraps to first) */
  function goNext() {
    const current = Math.round(galleryTrack.scrollLeft / slideWidth());
    goToSlide(current >= totalSlides - 1 ? 0 : current + 1);
  }

  /** Goes to previous slide (wraps to last) */
  function goPrev() {
    const current = Math.round(galleryTrack.scrollLeft / slideWidth());
    goToSlide(current <= 0 ? totalSlides - 1 : current - 1);
  }

  /** Starts auto-rotation */
  function startCarousel() {
    carouselTimer = setInterval(goNext, CAROUSEL_INTERVAL);
  }

  /** Restarts timer after user interaction */
  function resetCarousel() {
    clearInterval(carouselTimer);
    startCarousel();
  }

  /** Navigation – previous button */
  galleryPrev.addEventListener("click", () => {
    goPrev();
    resetCarousel();
  });

  /** Navigation – next button */
  galleryNext.addEventListener("click", () => {
    goNext();
    resetCarousel();
  });

  /** Updates aria on scroll (e.g. swipe on mobile) */
  galleryTrack.addEventListener("scroll", () => {
    const current = Math.round(galleryTrack.scrollLeft / slideWidth());
    updateAriaCurrent(current);
  });

  startCarousel();
  updateAriaCurrent(0);
}
