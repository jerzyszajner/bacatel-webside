/**
 * Nordic Mobile – hero hours status (open/closed)
 *
 * Displays current store status based on Europe/Oslo timezone.
 * Man–Fre 9:00–17:00, Lør 9:00–13:00, Søn closed.
 */

/**
 * Updates hero hours status – uses Europe/Oslo timezone.
 * Uses Intl.formatToParts to avoid string parsing; works correctly for any visitor timezone.
 */
function updateHoursStatus() {
  const el = document.getElementById("hours-status");
  if (!el) return;

  const now = new Date();
  const tz = { timeZone: "Europe/Oslo" };

  // en-CA → YYYY-MM-DD, en-GB → 24h; predictable formats for formatToParts
  const dateParts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", tz).formatToParts(now).map((p) => [p.type, p.value])
  );
  const timeParts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { ...tz, hour12: false, hour: "2-digit", minute: "2-digit" })
      .formatToParts(now)
      .map((p) => [p.type, p.value])
  );

  const date = new Date(
    Number(dateParts.year),
    Number(dateParts.month) - 1,
    Number(dateParts.day)
  );
  const dayOfWeek = date.getDay();
  const time =
    Number(timeParts.hour) * 60 +
    Number(timeParts.minute || 0);

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
    el.textContent = "Stengt – åpner mandag 9:00";
    el.classList.add("hero__hours-status--closed");
    return;
  }

  const [open, close] = HOURS[dayOfWeek] || [0, 0];
  if (time < open) {
    el.textContent = "Stengt – åpner i dag 9:00";
    el.classList.add("hero__hours-status--closed");
  } else if (time >= close) {
    el.textContent =
      dayOfWeek === 6
        ? "Stengt – åpner mandag 9:00"
        : "Stengt – åpner i morgen 9:00";
    el.classList.add("hero__hours-status--closed");
  } else {
    const closeHour = Math.floor(close / 60);
    el.textContent = "Åpent til " + closeHour + ":00";
    el.classList.add("hero__hours-status--open");
  }
}
