/* =========================================================
   KNOX BUG
   Harmless browser-only bug simulator
   ========================================================= */

const $ = (id) => document.getElementById(id);

let running = false;
let startTime = null;
let uptimeTimer = null;
let simulationTimer = null;

let bugs = 0;
let errors = 0;
let glitches = 0;

let bugTimer = null;
let popupTimer = null;
let glitchTimer = null;
let statsTimer = null;

const bugMessages = [
  "Bug detected in simulated UI",
  "Crawling bug activated",
  "Visual anomaly detected",
  "Simulated process behaving strangely",
  "Unknown bug entered the interface",
  "Bug swarm increasing",
  "Fake system instability detected",
  "KNOX BUG is having fun..."
];

const errorMessages = [
  "A simulated application error occurred.",
  "KNOX BUG encountered a fake exception.",
  "Visual subsystem stopped responding.",
  "Simulated memory warning detected.",
  "Fake critical process failure.",
  "Browser simulation reports an anomaly."
];

const terminalMessages = [
  "Initializing simulation...",
  "Loading virtual bug engine...",
  "Checking simulated processes...",
  "Injecting visual bugs...",
  "Activating glitch renderer...",
  "Monitoring fake system load...",
  "Scanning browser simulation...",
  "Everything is fine... probably.",
  "No real system changes detected."
];

/* =========================
   CLOCK / HELPERS
========================= */

function timeNow() {
  return new Date().toLocaleTimeString([], {
    hour12: false
  });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function log(message, type = "normal") {
  const logs = $("logs");

  if (!$("logsToggle").checked) return;

  const item = document.createElement("div");
  item.className = "log";

  const color = type === "danger"
    ? "#ff2636"
    : type === "success"
      ? "#00ff66"
      : "#777";

  item.innerHTML = `
    <time>${timeNow()}</time>
    <span style="color:${color}">${message}</span>
  `;

  logs.prepend(item);

  while (logs.children.length > 14) {
    logs.lastElementChild.remove();
  }

  addTerminal(message);
}

function addTerminal(message) {
  const terminal = $("terminalOutput");

  const line = document.createElement("div");
  line.className = "log-line";
  line.innerHTML = `<span>[${timeNow()}]</span> ${message}`;

  terminal.appendChild(line);

  while (terminal.children.length > 8) {
    terminal.firstElementChild.remove();
  }

  terminal.scrollTop = terminal.scrollHeight;
}

function updateStats() {
  $("bugCount").textContent = bugs;
  $("errorCount").textContent = errors;
  $("glitchCount").textContent = glitches;

  $("bugBar").style.width = Math.min(bugs * 3, 100) + "%";
  $("errorBar").style.width = Math.min(errors * 5, 100) + "%";
  $("glitchBar").style.width = Math.min(glitches * 3, 100) + "%";
}

function updateUptime() {
  if (!startTime) return;

  const seconds = Math.floor((Date.now() - startTime) / 1000);

  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");

  $("uptime").textContent = `${h}:${m}:${s}`;
}

/* =========================
   SOUND
========================= */

function beep(frequency = 440, duration = 70) {
  if (!$("soundToggle").checked) return;

  try {
    const AudioContext =
      window.AudioContext || window.webkitAudioContext;

    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.frequency.value = frequency;
    oscillator.type = "square";

    gain.gain.value = 0.035;

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();

    setTimeout(() => {
      oscillator.stop();
      ctx.close();
    }, duration);
  } catch (e) {
    // Audio is optional.
  }
}

/* =========================
   BUGS
========================= */

function spawnBug() {
  if (!running) return;

  if (!$("bugsToggle").checked) return;

  const bug = document.createElement("div");
  bug.className = "bug";
  bug.textContent = Math.random() > 0.5 ? "🪲" : "🐛";

  bug.style.left = random(0, 90) + "vw";
  bug.style.top = random(5, 85) + "vh";
  bug.style.animationDuration = random(5, 12) + "s";

  document.body.appendChild(bug);

  bugs++;

  log(
    bugMessages[random(0, bugMessages.length - 1)],
    "danger"
  );

  updateStats();

  setTimeout(() => {
    bug.remove();
  }, 13000);

  beep(250, 45);
}

/* =========================
   ERROR POPUPS
========================= */

function createPopup() {
  if (!running) return;

  if (!$("popupToggle").checked) return;

  errors++;

  const popup = document.createElement("div");
  popup.className = "fake-popup";

  popup.style.left = random(5, 75) + "vw";
  popup.style.top = random(12, 70) + "vh";

  popup.innerHTML = `
    <div class="popup-head">
      <span>⚠ SIMULATED ERROR</span>
      <span class="close-popup">×</span>
    </div>

    <div class="popup-body">
      ${errorMessages[random(0, errorMessages.length - 1)]}

      <br><br>

      Error code:
      <strong>0x${random(100000, 999999).toString(16).toUpperCase()}</strong>

      <br>

      <button>OK</button>
    </div>
  `;

  $("popupContainer").appendChild(popup);

  popup.querySelector(".close-popup").onclick = () => {
    popup.remove();
  };

  popup.querySelector("button").onclick = () => {
    popup.remove();
  };

  log("Fake error popup displayed", "danger");

  updateStats();

  beep(180, 90);

  setTimeout(() => {
    if (popup.isConnected) popup.remove();
  }, 8000);
}

/* =========================
   GLITCH
========================= */

function activateGlitch() {
  if (!$("glitchToggle").checked && running) return;

  glitches++;

  document.body.classList.add("glitch-active");

  setTimeout(() => {
    document.body.classList.remove("glitch-active");
  }, random(300, 1000));

  log("Visual glitch effect activated", "danger");

  updateStats();

  beep(90, 60);
}

/* =========================
   MATRIX
========================= */

function createMatrix() {
  const matrix = $("matrix");

  matrix.innerHTML = "";

  for (let i = 0; i < 35; i++) {
    const column = document.createElement("div");

    column.className = "matrix-column";

    column.style.left = random(0, 100) + "%";
    column.style.animationDuration = random(4, 12) + "s";
    column.style.animationDelay = random(0, 5) + "s";

    let text = "";

    for (let j = 0; j < random(10, 30); j++) {
      text += random(0, 1) ? "1" : "0";
      text += "<br>";
    }

    column.innerHTML = text;

    matrix.appendChild(column);
  }
}

function toggleMatrix(enabled) {
  $("matrix").style.display = enabled ? "block" : "none";

  if (enabled) {
    createMatrix();
    log("Matrix visual mode activated", "success");
  } else {
    log("Matrix visual mode disabled");
  }
}

/* =========================
   FAKE CPU / RAM
========================= */

function updateSystemStats() {
  if (!running) {
    $("cpu").textContent = "12%";
    $("ram").textContent = "24%";

    $("cpuBar").style.width = "12%";
    $("ramBar").style.width = "24%";

    return;
  }

  const chaos = $("chaosBtn").dataset.active === "true";

  const cpu = chaos
    ? random(75, 99)
    : random(20, 80);

  const ram = chaos
    ? random(70, 96)
    : random(25, 70);

  $("cpu").textContent = cpu + "%";
  $("ram").textContent = ram + "%";

  $("cpuBar").style.width = cpu + "%";
  $("ramBar").style.width = ram + "%";
}

/* =========================
   SHAKE
========================= */

function toggleShake(enabled) {
  if (enabled) {
    document.body.classList.add("shake-active");
    log("Screen shake simulation enabled");
  } else {
    document.body.classList.remove("shake-active");
    log("Screen shake simulation disabled");
  }
}

/* =========================
   START
========================= */

function startSimulator() {
  if (running) return;

  running = true;
  startTime = Date.now();

  $("statusText").textContent = "SIMULATION RUNNING";
  $("modeLabel").textContent = "ACTIVE";
  $("statusMessage").textContent = "RUNNING";

  $("mainTitle").textContent = "SYSTEM BUG DETECTED";
  $("mainMessage").textContent =
    "Simulated bugs are now crawling through the interface.";

  log("KNOX BUG simulator started", "success");

  addTerminal("Simulation started successfully.");

  uptimeTimer = setInterval(updateUptime, 1000);
  statsTimer = setInterval(updateSystemStats, 1500);

  bugTimer = setInterval(() => {
    if ($("bugsToggle").checked) {
      spawnBug();
    }
  }, 1800);

  popupTimer = setInterval(() => {
    if ($("popupToggle").checked) {
      createPopup();
    }
  }, 5000);

  glitchTimer = setInterval(() => {
    if ($("glitchToggle").checked) {
      activateGlitch();
    }
  }, 2300);

  $("simulationScreen").classList.add("running");

  beep(700, 100);
}

/* =========================
   STOP
========================= */

function stopSimulator() {
  running = false;

  clearInterval(uptimeTimer);
  clearInterval(statsTimer);
  clearInterval(bugTimer);
  clearInterval(popupTimer);
  clearInterval(glitchTimer);

  document.body.classList.remove("glitch-active");
  document.body.classList.remove("shake-active");

  $("statusText").textContent = "SYSTEM PAUSED";
  $("modeLabel").textContent = "PAUSED";
  $("statusMessage").textContent = "PAUSED";

  log("Simulation stopped");

  beep(250, 100);
}

/* =========================
   RESET
========================= */

function resetSimulator() {
  stopSimulator();

  bugs = 0;
  errors = 0;
  glitches = 0;

  startTime = null;

  $("uptime").textContent = "00:00:00";

  $("statusText").textContent = "SYSTEM ONLINE";
  $("modeLabel").textContent = "IDLE";
  $("statusMessage").textContent = "READY";

  $("mainTitle").textContent = "KNOX BUG";
  $("mainMessage").textContent =
    "Ready to start the harmless bug simulation.";

  $("popupContainer").innerHTML = "";
  $("matrix").innerHTML = "";
  $("matrix").style.display = "none";

  document.querySelectorAll(".bug").forEach(b => b.remove());

  document.body.classList.remove("glitch-active");
  document.body.classList.remove("shake-active");

  $("chaosBtn").dataset.active = "false";

  updateStats();
  updateSystemStats();

  $("logs").innerHTML = `
    <div class="log">
      <time>${timeNow()}</time>
      <span>System reset successfully.</span>
    </div>
  `;

  $("terminalOutput").innerHTML = `
    <div class="log-line">
      <span>[RESET]</span> KNOX BUG simulator cleared
    </div>
    <div class="log-line">
      <span>[READY]</span> Awaiting simulation...
    </div>
  `;
}

/* =========================
   SCANNER
========================= */

function runScanner() {
  $("mainTitle").textContent = "SCANNING...";
  $("mainMessage").textContent =
    "Searching the simulation for imaginary bugs.";

  $("scanBtn").disabled = true;
  $("scanBtn").textContent = "🔄 SCANNING...";

  log("Bug scanner started", "success");

  let progress = 0;

  const scanner = setInterval(() => {
    progress += random(5, 15);

    if (progress >= 100) {
      progress = 100;
      clearInterval(scanner);

      $("mainTitle").textContent = "BUGS FOUND";
      $("mainMessage").textContent =
        "Simulation scan complete. No real device changes detected.";

      $("scanBtn").disabled = false;
      $("scanBtn").textContent = "🔍 SCAN AGAIN";

      log("Bug scan completed — simulation safe", "success");

      if (running && $("bugsToggle").checked) {
        for (let i = 0; i < 4; i++) {
          setTimeout(spawnBug, i * 400);
        }
      }

      return;
    }

    $("mainMessage").textContent =
      `Scanning virtual sectors... ${progress}%`;
  }, 350);
}

/* =========================
   FAKE CRASH
========================= */

function fakeCrash() {
  log("Fake crash sequence triggered", "danger");

  $("crashScreen").classList.add("show");

  let progress = 0;

  const interval = setInterval(() => {
    progress += random(4, 12);

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      setTimeout(() => {
        $("crashScreen").classList.remove("show");

        $("crashProgress").style.width = "0%";
        $("crashPercent").textContent = "0% complete";

        log("Fake system restart completed", "success");

        $("mainTitle").textContent = "SYSTEM RECOVERED";
        $("mainMessage").textContent =
          "The simulated crash has been cleared.";
      }, 1200);
    }

    $("crashProgress").style.width = progress + "%";
    $("crashPercent").textContent =
      progress + "% complete";
  }, 250);
}

/* =========================
   CHAOS MODE
========================= */

function chaosMode() {
  const button = $("chaosBtn");

  const active = button.dataset.active === "true";

  if (active) {
    button.dataset.active = "false";
    button.textContent = "☠️ CHAOS MODE";

    log("Chaos mode disabled");

    $("bugsToggle").checked = false;
    $("glitchToggle").checked = false;
    $("popupToggle").checked = false;
    $("matrixToggle").checked = false;
    $("shakeToggle").checked = false;

    toggleMatrix(false);
    toggleShake(false);

    return;
  }

  if (!running) {
    startSimulator();
  }

  button.dataset.active = "true";
  button.textContent = "☠️ CHAOS ACTIVE";

  $("bugsToggle").checked = true;
  $("glitchToggle").checked = true;
  $("popupToggle").checked = true;
  $("logsToggle").checked = true;
  $("matrixToggle").checked = true;
  $("shakeToggle").checked = true;

  toggleMatrix(true);
  toggleShake(true);

  log("☠ CHAOS MODE ACTIVATED", "danger");

  $("mainTitle").textContent = "CHAOS MODE";
  $("mainMessage").textContent =
    "Multiple visual simulation effects are active.";

  for (let i = 0; i < 5; i++) {
    setTimeout(spawnBug, i * 250);
  }

  createPopup();
  activateGlitch();
}

/* =========================
   QUICK TOOL ACTIONS
========================= */

function quickEffect(effect) {
  switch (effect) {

    case "bug":
      if (!running) startSimulator();
      $("bugsToggle").checked = true;
      spawnBug();
      spawnBug();
      break;

    case "glitch":
      if (!running) startSimulator();
      $("glitchToggle").checked = true;
      activateGlitch();
      break;

    case "error":
      if (!running) startSimulator();
      $("popupToggle").checked = true;
      createPopup();
      break;

    case "crash":
      fakeCrash();
      break;

    case "matrix":
      $("matrixToggle").checked =
        !$("matrixToggle").checked;

      toggleMatrix($("matrixToggle").checked);
      break;

    case "scan":
      runScanner();
      break;
  }
}

/* =========================
   EVENT LISTENERS
========================= */

$("startBtn").addEventListener("click", startSimulator);

$("stopBtn").addEventListener("click", stopSimulator);

$("resetBtn").addEventListener("click", resetSimulator);

$("scanBtn").addEventListener("click", runScanner);

$("chaosBtn").addEventListener("click", chaosMode);

$("matrixToggle").addEventListener("change", e => {
  toggleMatrix(e.target.checked);
});

$("shakeToggle").addEventListener("change", e => {
  toggleShake(e.target.checked);
});

document.querySelectorAll(".quick-tools button").forEach(button => {
  button.addEventListener("click", () => {
    quickEffect(button.dataset.effect);
  });
});

/* =========================
   INITIALIZATION
========================= */

updateStats();
updateSystemStats();

log("KNOX BUG ready", "success");

console.log(
  "%cKNOX BUG",
  "color:red;font-size:30px;font-weight:bold"
);

console.log(
  "Harmless browser simulation loaded."
);
