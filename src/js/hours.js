/**
 * Baca Tel – hero hours status (open/closed)
 *
 * Displays current store status based on Europe/Warsaw timezone.
 * Pon–Pt 9:00–17:00, Sob 9:00–13:00, Nd closed.
 */

/**
 * Updates hero hours status – uses Europe/Warsaw timezone.
 */
function updateHoursStatus() {
  const el = document.getElementById("hours-status");
  if (!el) return;

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-CA", { timeZone: "Europe/Warsaw" });
  const timeStr = now.toLocaleTimeString("en-GB", {
    timeZone: "Europe/Warsaw",
    hour12: false,
  });
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();
  const time = hour * 60 + minute;

  const HOURS = {
    1: [9 * 60, 17 * 60],
    2: [9 * 60, 17 * 60],
    3: [9 * 60, 17 * 60],
    4: [9 * 60, 17 * 60],
    5: [9 * 60, 17 * 60],
    6: [9 * 60, 13 * 60],
  };

  el.classList.remove("hero__hours-status--open", "hero__hours-status--closed");

  if (dayOfWeek === 0) {
    el.textContent = "Zamknięte – otwarcie w poniedziałek 9:00";
    el.classList.add("hero__hours-status--closed");
    return;
  }

  const [open, close] = HOURS[dayOfWeek] || [0, 0];
  if (time < open) {
    el.textContent = "Zamknięte – otwarcie dziś 9:00";
    el.classList.add("hero__hours-status--closed");
  } else if (time >= close) {
    el.textContent =
      dayOfWeek === 6
        ? "Zamknięte – otwarcie w poniedziałek 9:00"
        : "Zamknięte – otwarcie jutro 9:00";
    el.classList.add("hero__hours-status--closed");
  } else {
    const closeHour = Math.floor(close / 60);
    el.textContent = "Otwarte do " + closeHour + ":00";
    el.classList.add("hero__hours-status--open");
  }
}
