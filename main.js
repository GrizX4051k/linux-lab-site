document.addEventListener("DOMContentLoaded", () => {
  console.log("Linux Lab loaded.");

  // progress values – you can still edit if you want
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

  // matrix streams
  const streams = document.querySelectorAll(".matrix-stream");
  streams.forEach((stream) => {
    const label = (stream.dataset.text || "LINUX").toUpperCase();
    const chars = [];
    for (let i = 0; i < 80; i++) {
      if (i % 10 === 0) {
        chars.push("\n" + label);
      } else {
        chars.push(Math.random() > 0.5 ? "0" : "1");
      }
    }
    stream.textContent = chars.join("");
  });
});
