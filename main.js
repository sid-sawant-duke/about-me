// Marquee tickers: the only interactivity on the page.
// The track scrolls via CSS (translateX 0 → -50%), so the item list is
// duplicated an even number of times for a seamless loop.

const TICKER_ITEMS = [
  "PERSONAL DOSSIER №01",
  "NOW READING · KAHNEMAN, GLADWELL, GODIN",
  "CURRENTLY BUILDING · AN 8-BIT POKÉMON LEARNING GAME",
  "OPEN TO · PRODUCT MARKETING · 2026 NEW GRAD",
  "LOCATION · DURHAM → ATL → ?",
  "★ NEW · IRIS NOW LIVE PORTFOLIO-WIDE AT SAP",
];

function fillTicker(track, items) {
  const repeated = Array(8).fill(items).flat();
  const frag = document.createDocumentFragment();
  for (const text of repeated) {
    const item = document.createElement("span");
    item.className = "tk-item";
    const dot = document.createElement("span");
    dot.className = "tk-dot";
    item.append(dot, document.createTextNode(" " + text));
    frag.appendChild(item);
  }
  track.appendChild(frag);
}

document.querySelectorAll(".tk-track").forEach((track) => {
  const speed = track.dataset.speed;
  if (speed) track.style.animationDuration = `${speed}s`;
  const items = track.dataset.ticker === "bottom"
    ? TICKER_ITEMS.slice().reverse()
    : TICKER_ITEMS;
  fillTicker(track, items);
});

// Keep the masthead issue date and the byline publish stamp current,
// always in US Eastern time (ET auto-handles EST/EDT).
const TZ = "America/New_York";

function updateStamps() {
  const now = new Date();

  const d = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TZ, weekday: "short", day: "2-digit", month: "short", year: "numeric",
    }).formatToParts(now).map((p) => [p.type, p.value])
  );
  const mast = document.getElementById("mast-date");
  if (mast) {
    mast.textContent = `${d.weekday.toUpperCase()} · ${d.day} · ${d.month.toUpperCase()} · ${d.year}`;
  }

  const s = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ, day: "2-digit", month: "2-digit", year: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: false,
    }).formatToParts(now).map((p) => [p.type, p.value])
  );
  const pub = document.getElementById("pub-stamp");
  if (pub) {
    pub.textContent = `${s.day}.${s.month}.${s.year} · ${s.hour}:${s.minute} ET`;
  }
}

updateStamps();
setInterval(updateStamps, 60000);

