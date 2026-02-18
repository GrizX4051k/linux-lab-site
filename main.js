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

// ===== full-screen segmented binary streams =====
const overlay = document.querySelector(".matrix-overlay");
const template = document.querySelector(".matrix-stream");
if (!overlay || !template) return;

const STREAM_COUNT = 220;   // adjust up/down for density
const MAX_LINES = 100;

template.remove();

function randomBit() {
  return Math.random() < 0.5 ? "0" : "1";
}

for (let i = 0; i < STREAM_COUNT; i++) {
  const stream = template.cloneNode(true);

  // packed horizontally with small overlap
  const baseX = (i / STREAM_COUNT) * 100;
  const jitter = (Math.random() - 0.5) * (100 / STREAM_COUNT);
  const xPercent = Math.max(0, Math.min(100, baseX + jitter));
  stream.style.left = `${xPercent}%`;

  // start near top, tiny jitter
  stream.style.top = `${2 + Math.random() * 2}%`; // respect 2% page margin

  overlay.appendChild(stream);

  let buffer = "";
  let currentSegmentLines = 0;
  let targetSegmentLines = 5 + Math.floor(Math.random() * 25); // 5–30
  let gapLinesLeft = 0;

  const baseDelay = 40 + Math.random() * 40; // 40–80 ms

  function tick() {
    if (gapLinesLeft > 0) {
      buffer += " \n";            // visual break (empty-ish line)
      gapLinesLeft--;
    } else {
      buffer += randomBit() + "\n";
      currentSegmentLines++;

      // segment finished: start a gap, then a new segment length
      if (currentSegmentLines >= targetSegmentLines) {
        currentSegmentLines = 0;
        targetSegmentLines = 5 + Math.floor(Math.random() * 25);
        gapLinesLeft = Math.floor(Math.random() * 10); // 0–9 line gaps
      }
    }

    const lines = buffer.split("\n");
    if (lines.length > MAX_LINES) {
      buffer = lines.slice(lines.length - MAX_LINES).join("\n");
    }

    stream.textContent = buffer;

    setTimeout(tick, baseDelay);
  }

  setTimeout(tick, i * 15);
}

});
