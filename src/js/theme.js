/**
 * Baca Tel – dark mode / theme toggle
 *
 * Handles dark mode: system preference, localStorage persistence,
 * header toggle button, meta theme-color updates.
 */

/** localStorage key for saved theme preference */
const THEME_STORAGE_KEY = "bacatel-theme";

/** data-theme attribute values */
const THEME_LIGHT = "light";
const THEME_DARK = "dark";

/**
 * Checks if the user's system prefers dark mode.
 * @returns {boolean}
 */
function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Returns the currently active theme (saved or from system preference).
 * @returns {string} "light" | "dark"
 */
function getEffectiveTheme() {
  const stored = document.documentElement.getAttribute("data-theme");
  if (stored === THEME_LIGHT || stored === THEME_DARK) return stored;
  return getSystemPrefersDark() ? THEME_DARK : THEME_LIGHT;
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
 * Initializes theme on page load.
 * Applies saved preference or system preference, binds toggle button.
 */
function initTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === THEME_LIGHT || stored === THEME_DARK) {
    document.documentElement.setAttribute("data-theme", stored);
  }
  updateThemeUI(getEffectiveTheme());

  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
}

/**
 * Toggles theme to the opposite and saves choice to localStorage.
 */
function toggleTheme() {
  const current = getEffectiveTheme();
  const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem(THEME_STORAGE_KEY, next);
  updateThemeUI(next);
}
