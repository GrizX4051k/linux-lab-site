document.addEventListener("DOMContentLoaded", () => {
  console.log("Linux Lab loaded.");

  // ===== progress bars (unchanged) =====
  const beginner = 20;
  const intermediate = 0;
  const advanced = 0;

  function setProgress(idBar, idText, value) {
    const bar = document.querySelector(idBar);
    const text = document.querySelector(idText);
    if (!bar || !text) return;
    const clamped = Math.max(0, Math.min(100, value));
    bar.style.transform = `scaleX(${clamped / 100})`;
    text.textContent = `${clamped}%`;
  }

  setProgress(".bar-beginner", "#beginner-percent", beginner);
  setProgress(".bar-intermediate", "#intermediate-percent", intermediate);
  setProgress(".bar-advanced", "#advanced-percent", advanced);

// ===== full-screen falling binary streams =====
const overlay = document.querySelector(".matrix-overlay");
const template = document.querySelector(".matrix-stream");
if (!overlay || !template) return;

const STREAM_COUNT = 160;      // adjust for density
const LINE_HEIGHT_PX = 24;     // roughly matches your font-size * line-height
const VIEWPORT_HEIGHT = window.innerHeight * 0.96; // 2% top & bottom margin

template.remove();

function randomBit() {
  return Math.random() < 0.5 ? "0" : "1";
}

for (let i = 0; i < STREAM_COUNT; i++) {
  const stream = template.cloneNode(true);

  // horizontal packing with slight overlap
  const baseX = (i / STREAM_COUNT) * 100;
  const jitter = (Math.random() - 0.5) * (100 / STREAM_COUNT);
  const xPercent = Math.max(0, Math.min(100, baseX + jitter));
  stream.style.left = `${xPercent}%`;

  overlay.appendChild(stream);

  // each column controls its own falling segment
  let headY = -Math.random() * VIEWPORT_HEIGHT;         // start above the top
  let length = 5 + Math.floor(Math.random() * 50);      // 5–30 lines
  let speed = 80 + Math.random() * 80  ;                  // px per second

  function tick(lastTime) {
    return function step(now) {
      const dt = (now - lastTime.time) / 1000;          // seconds
      lastTime.time = now;

      headY += speed * dt;

      // reset when past bottom
      if (headY - length * LINE_HEIGHT_PX > VIEWPORT_HEIGHT) {
        headY = -Math.random() * VIEWPORT_HEIGHT * 0.5; // respawn above top
        length = 5 + Math.floor(Math.random() * 25);
        speed = 80 + Math.random() * 80;
      }

      // build visible tail from top to bottom of this segment
      const lines = [];
      for (let j = 0; j < length; j++) {
        const lineY = headY - (length - 1 - j) * LINE_HEIGHT_PX;
        if (lineY < 0 || lineY > VIEWPORT_HEIGHT) continue;
        lines.push(randomBit());
      }
      stream.textContent = lines.join("\n");

      requestAnimationFrame(step);
    };
  }

  requestAnimationFrame(tick({ time: performance.now() }));
}

});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedback-form");
  if (!form) return;

  const limitMsg = document.getElementById("feedback-limit-msg");
  const STORAGE_KEY = "linux_lab_feedback_submissions";
  const WINDOW_MS = 48 * 60 * 60 * 1000; // 48 hours
  const MAX_SUBMISSIONS = 2;

  function getSubmissions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      const now = Date.now();
      // keep only timestamps within last 48 hours
      return arr.filter(ts => now - ts < WINDOW_MS);
    } catch {
      return [];
    }
  }

  function saveSubmissions(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  function updateLimitMessage() {
    const subs = getSubmissions();
    if (subs.length >= MAX_SUBMISSIONS) {
      limitMsg.textContent =
        "You’ve reached the limit of 2 feedback submissions in 48 hours for Linux Lab. Please try again later.";
      limitMsg.style.color = "#f97316"; // orange
    } else if (subs.length > 0) {
      limitMsg.textContent =
        `You’ve used ${subs.length}/2 feedback submissions in the last 48 hours.`;
      limitMsg.style.color = "#9ca3af";
    } else {
      limitMsg.textContent = "";
    }
  }

  updateLimitMessage();

  form.addEventListener("submit", (e) => {
    const subs = getSubmissions();
    if (subs.length >= MAX_SUBMISSIONS) {
      e.preventDefault();
      updateLimitMessage();
      return;
    }
    subs.push(Date.now());
    saveSubmissions(subs);
    updateLimitMessage();
  });
});
