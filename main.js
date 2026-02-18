document.addEventListener("DOMContentLoaded", () => {
  console.log("Linux Lab loaded.");

  // === EDIT THESE NUMBERS AS YOU PROGRESS ===
  const beginner = 20;      // e.g. 20% of beginner roadmap done
  const intermediate = 0;   // set later
  const advanced = 0;       // set later
  // ==========================================

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
});
