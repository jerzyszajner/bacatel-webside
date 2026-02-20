/**
 * Baca Tel – dark mode / theme toggle
 *
 * Handles dark mode: system preference (injected by index.html),
 * localStorage persistence, header toggle button, meta theme-color updates.
 */

const THEME_STORAGE_KEY = "bacatel-theme";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

/**
 * Returns current theme from data-theme attribute.
 * Assumes index.html has already set it in <head>.
 * @returns {string} "light" | "dark"
 */
function getCurrentTheme() {
  const theme = document.documentElement.getAttribute("data-theme");
  return theme === THEME_DARK ? THEME_DARK : THEME_LIGHT;
}

/**
 * Updates theme-dependent UI elements (meta theme-color, button aria-label).
 * @param {string} theme - "light" | "dark"
 */
function updateThemeUI(theme) {
  document.documentElement.style.colorScheme = theme === THEME_DARK ? "dark" : "light";

  const metaTheme = document.getElementById("theme-color");
  if (metaTheme) {
    metaTheme.setAttribute("content", theme === THEME_DARK ? "#121110" : "#f2ede6");
  }
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.setAttribute("aria-label", theme === THEME_DARK ? "Przełącz tryb jasny" : "Przełącz tryb ciemny");
    toggle.setAttribute("title", theme === THEME_DARK ? "Tryb jasny" : "Tryb ciemny");
  }
}

/**
 * Initializes theme UI on page load.
 * Binds toggle button and updates meta/buttons based on existing HTML attribute.
 */
function initTheme() {
  updateThemeUI(getCurrentTheme());

  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
}

/**
 * Toggles theme to the opposite and saves choice to localStorage.
 */
function toggleTheme() {
  const nextTheme = getCurrentTheme() === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  updateThemeUI(nextTheme);
}
