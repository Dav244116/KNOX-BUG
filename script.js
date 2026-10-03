/* =========================================================
   KNOX BUG v2
   UNKNOWN STRAINS
   Browser-only fictional malware simulator
   ========================================================= */

const $ = id => document.getElementById(id);

let running = false;
let infection = 0;
let mutation = 0;
let generation = 0;
let instances = 0;

let bugTimer;
let popupTimer;
let effectTimer;
let telemetryTimer;

const strains = [
  {
    name: "VOID-13",
    icon: "👁️",
    type: "Visual anomaly",
    behavior: "Distortion"
  },
  {
    name: "REDWORM-X",
    icon: "🪱",
    type: "Swarm strain",
    behavior: "Replication"
  },
  {
    name: "BLACKOUT-7",
    icon: "🌑",
    type: "Shadow strain",
    behavior: "Blackout"
  },
  {
    name: "GLITCH-404",
    icon: "⚡",
    type: "Digital anomaly",
    behavior: "Glitching"
  },
  {
    name: "KX-MUTANT",
    icon: "🧬",
    type: "Adaptive strain",
    behavior: "Mutation"
  },
  {
    name: "UNKNOWN-0",
    icon: "❓",
    type: "Unclassified",
    behavior: "Unknown"
  }
];

const behaviors = [
  "Replication",
  "Distortion",
  "Glitching",
  "Mutation",
  "Blackout",
  "Swarming",
  "Unknown"
];

function random(min,max) {
  return Math.floor(Math.random() * (max-min+1)) + min;
}

function now() {
  return new Date().toLocaleTimeString([], {
    hour12:false
  });
}

/* =========================
   BOOT
========================= */

let bootProgress = 0;

const bootTimer = setInterval(() => {

  bootProgress += random(5,14);

  if (bootProgress >= 100) {
    bootProgress = 100;
    clearInterval(bootTimer);

    $("bootText").textContent =
      "Simulation engine ready.";

    setTimeout(() => {
      $("boot").style.display = "none";
    },700);
  }

  $("bootProgress").style.width =
    bootProgress + "%";

  const messages = [
    "Initializing simulator...",
    "Loading fictional strains...",
    "Preparing visual engine...",
    "Loading mutation system...",
    "Starting telemetry...",
    "Ready."
  ];

  $("bootText").textContent =
    messages[Math.min(
      messages.length-1,
      Math.floor(bootProgress/18)
    )];

},250);


/* =========================
   LOGGING
========================= */

function event(message,type="normal") {

  const box = $("events");

  const item = document.createElement("div");

  item.className = "event";

  item.innerHTML =
    `<b>[${now()}]</b> ${message}`;

  box.prepend(item);

  while(box.children.length > 13) {
    box.lastElementChild.remove();
  }

  terminal(message,type);
}

function terminal(message,type="normal") {

  const box = $("terminal");

  const item = document.createElement("div");

  item.className = "term-line";

  item.innerHTML =
    `<b>[${now()}]</b> ${message}`;

  box.appendChild(item);

  while(box.children.length > 10) {
    box.firstElementChild.remove();
  }

  box.scrollTop = box.scrollHeight;
}


/* =========================
   STRAIN GENERATOR
========================= */

function generateStrain() {

  const strain =
    strains[random(0,strains.length-1)];

  $("strainName").textContent =
    strain.name;

  $("bigStrain").textContent =
    strain.name;

  $("strainIcon").textContent =
    strain.icon;

  $("strainType").textContent =
    strain.type;

  $("behavior").textContent =
    strain.behavior;

  generation++;

  mutation = random(5,40);

  $("generation").textContent =
    generation;

  $("mutation").textContent =
    mutation + "%";

  $("mutationMeter").style.width =
    mutation + "%";

  $("signature").textContent =
    makeSignature();

  event(
    `Generated fictional strain ${strain.name}`,
    "success"
  );
}

function makeSignature() {

  const chars =
    "ABCDEF0123456789";

  let result = "";

  for(let i=0;i<8;i++) {
    result +=
      chars[random(0,chars.length-1)];
  }

  return result;
}


/* =========================
   MUTATION
========================= */

function mutate() {

  const names = [
    "X-" + random(100,999),
    "KX-" + random(10,99),
    "VX-" + random(1000,9999),
    "NULL-" + random(10,99),
    "RED-" + random(100,999)
  ];

  $("strainName").textContent =
    names[random(0,names.length-1)];

  $("bigStrain").textContent =
    $("strainName").textContent;

  $("behavior").textContent =
    behaviors[random(0,behaviors.length-1)];

  generation++;

  mutation = random(35,100);

  $("generation").textContent =
    generation;

  $("mutation").textContent =
    mutation + "%";

  $("mutationMeter").style.width =
    mutation + "%";

  $("signature").textContent =
    makeSignature();

  event(
    "Strain mutation generated",
    "danger"
  );

  glitch();

}


/* =========================
   START
========================= */

function start() {

  if(running) return;

  running = true;

  if($("strainName").textContent === "UNKNOWN-00") {
    generateStrain();
  }

  $("mode").textContent =
    "INFECTED";

  $("mainTitle").textContent =
    "SIMULATION INFECTED";

  $("mainMessage").textContent =
    "Fictional strain activity detected.";

  event(
    "Simulation infection started",
    "danger"
  );

  bugTimer = setInterval(() => {

    if($("bugs").checked) {
      spawnBug();
    }

  },1300);

  popupTimer = setInterval(() => {

    if($("errors").checked) {
      popup();
    }

  },4200);

  effectTimer = setInterval(() => {

    if($("glitches").checked) {
      glitch();
    }

  },2100);

  telemetryTimer =
    setInterval(updateTelemetry,900);

  updateTelemetry();
}


/* =========================
   BUGS
========================= */

function spawnBug() {

  const bug =
    document.createElement("div");

  bug.className = "bug";

  bug.textContent =
    Math.random() > .5
      ? "🪲"
      : "🐛";

  bug.style.left =
    random(0,90) + "vw";

  bug.style.top =
    random(5,85) + "vh";

  bug.style.animationDuration =
    random(5,11) + "s";

  $("bugLayer").appendChild(bug);

  instances++;

  $("instances").textContent =
    instances;

  event(
    "Simulated strain instance detected",
    "danger"
  );

  setTimeout(() => {
    bug.remove();
  },12000);

  sound(220,50);
}


/* =========================
   POPUPS
========================= */

function popup() {

  const box =
    document.createElement("div");

  box.className =
    "fake-popup";

  box.style.left =
    random(4,72) + "vw";

  box.style.top =
    random(10,70) + "vh";

  const codes = [
    "0xKX404",
    "0xVOID13",
    "0xRED777",
    "0xNULL01",
    "0xBUG999"
  ];

  box.innerHTML = `
    <div class="popup-title">
      ⚠ SIMULATED ANOMALY
    </div>

    <div class="popup-body">

      Fictional strain activity
      detected in the simulation.

      <br><br>

      Signature:
      <strong>${$("signature").textContent}</strong>

      <br>

      Code:
      <strong>
        ${codes[random(0,codes.length-1)]}
      </strong>

      <br>

      <button>DISMISS</button>

    </div>
  `;

  $("popupLayer").appendChild(box);

  box.querySelector("button")
    .onclick = () => box.remove();

  event(
    "Simulated anomaly window displayed",
    "danger"
  );

  setTimeout(() => {
    box.remove();
  },7000);

  sound(160,70);
}


/* =========================
   GLITCH
========================= */

function glitch() {

  if(!$("glitches").checked &&
     running) return;

  document.body.classList.add(
    "glitching"
  );

  setTimeout(() => {
    document.body.classList.remove(
      "glitching"
    );
  },random(250,900));

  event(
    "Visual corruption effect triggered"
  );

  sound(90,60);
}


/* =========================
   TELEMETRY
========================= */

function updateTelemetry() {

  if(!running) return;

  infection += random(1,5);

  if(infection > 100)
    infection = 100;

  const cpu =
    random(25,95);

  const ram =
    random(30,90);

  $("infection").textContent =
    infection + "%";

  $("infectionMeter").style.width =
    infection + "%";

  $("cpu").textContent =
    cpu + "%";

  $("cpuMeter").style.width =
    cpu + "%";

  $("ram").textContent =
    ram + "%";

  $("ramMeter").style.width =
    ram + "%";

  if(infection < 30)
    $("threat").textContent = "LOW";

  else if(infection < 70)
    $("threat").textContent = "MEDIUM";

  else if(infection < 90)
    $("threat").textContent = "HIGH";

  else
    $("threat").textContent = "CRITICAL";

  $("percentage").textContent =
    infection + "%";

  $("infectionBar").style.width =
    infection + "%";

  if(infection >= 100) {
    event(
      "Maximum simulated infection reached",
      "danger"
    );
  }
}


/* =========================
   SCANNER
========================= */

function scanner() {

  $("mainTitle").textContent =
    "SCANNING STRAIN";

  $("mainMessage").textContent =
    "Analyzing fictional behavior...";

  let p = 0;

  const scan =
    setInterval(() => {

      p += random(6,13);

      if(p >= 100) {

        p = 100;

        clearInterval(scan);

        $("mainTitle").textContent =
          "SCAN COMPLETE";

        $("mainMessage").textContent =
          "Fictional strain identified. No real device changes detected.";

        event(
          "Scanner completed safely",
          "success"
        );

        return;
      }

      $("mainMessage").textContent =
        `Analyzing simulated sectors... ${p}%`;

    },300);
}


/* =========================
   FAKE CRASH
========================= */

function fakeCrash() {

  $("crash").classList.add("active");

  let p = 0;

  $("crashBar").style.width = "0%";

  event(
    "Simulated crash sequence initiated",
    "danger"
  );

  const timer =
    setInterval(() => {

      p += random(4,10);

      if(p >= 100) {

        p = 100;

        clearInterval(timer);

        setTimeout(() => {

          $("crash").classList.remove(
            "active"
          );

          $("crashBar").style.width =
            "0%";

          $("crashPercent").textContent =
            "0%";

          event(
            "Simulation recovered",
            "success"
          );

        },1200);
      }

      $("crashBar").style.width =
        p + "%";

      $("crashPercent").textContent =
        p + "%";

    },250);
}


/* =========================
   BLACKOUT
========================= */

function blackout() {

  $("flash").classList.add("blackout");

  event(
    "Simulated blackout activated",
    "danger"
  );

  setTimeout(() => {

    $("flash").classList.remove(
      "blackout"
    );

    event(
      "Simulated display restored",
      "success"
    );

  },2200);
}


/* =========================
   CLEAN
========================= */

function clean() {

  running = false;

  clearInterval(bugTimer);
  clearInterval(popupTimer);
  clearInterval(effectTimer);
  clearInterval(telemetryTimer);

  document.querySelectorAll(".bug")
    .forEach(x => x.remove());

  $("popupLayer").innerHTML = "";

  document.body.classList.remove(
    "glitching",
    "shaking"
  );

  infection = 0;
  mutation = 0;
  instances = 0;

  $("infection").textContent = "0%";
  $("infectionMeter").style.width = "0%";

  $("mutation").textContent = "0%";
  $("mutationMeter").style.width = "0%";

  $("instances").textContent = "0";

  $("cpu").textContent = "11%";
  $("ram").textContent = "22%";

  $("cpuMeter").style.width = "11%";
  $("ramMeter").style.width = "22%";

  $("threat").textContent = "LOW";

  $("percentage").textContent = "0%";
  $("infectionBar").style.width = "0%";

  $("mode").textContent =
    "CLEAN";

  $("mainTitle").textContent =
    "SIMULATION CLEAN";

  $("mainMessage").textContent =
    "All fictional strain effects have been cleared.";

  event(
    "Simulation cleaned successfully",
    "success"
  );
}


/* =========================
   CHAOS
========================= */

function chaos() {

  if(!running)
    start();

  $("bugs").checked = true;
  $("glitches").checked = true;
  $("errors").checked = true;
  $("matrixToggle").checked = true;
  $("shake").checked = true;

  matrix(true);

  document.body.classList.add(
    "shaking"
  );

  event(
    "CHAOS ENGINE ACTIVATED",
    "danger"
  );

  for(let i=0;i<6;i++) {
    setTimeout(spawnBug,i*250);
  }

  popup();
  glitch();

  setTimeout(fakeCrash,3500);
}


/* =========================
   MATRIX
========================= */

function matrix(enabled) {

  const old =
    document.querySelectorAll(
      ".matrix-column"
    );

  old.forEach(x => x.remove());

  if(!enabled)
    return;

  for(let i=0;i<35;i++) {

    const column =
      document.createElement("div");

    column.className =
      "matrix-column";

    column.style.position =
      "fixed";

    column.style.top = "-100%";

    column.style.left =
      random(0,100) + "%";

    column.style.color =
      "#00ff66";

    column.style.fontFamily =
      "monospace";

    column.style.fontSize =
      random(10,16) + "px";

    column.style.zIndex = "100";

    column.style.animation =
      `matrixFall ${random(4,10)}s linear infinite`;

    let text = "";

    for(let j=0;j<30;j++) {
      text +=
        random(0,1) +
        "<br>";
    }

    column.innerHTML = text;

    $("matrix").appendChild(column);
  }
}


/* =========================
   SOUND
========================= */

function sound(freq,duration) {

  if(!$("sound").checked)
    return;

  try {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    const ctx =
      new AudioContext();

    const oscillator =
      ctx.createOscillator();

    const gain =
      ctx.createGain();

    oscillator.type =
      "square";

    oscillator.frequency.value =
      freq;

    gain.gain.value =
      .025;

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();

    setTimeout(() => {

      oscillator.stop();
      ctx.close();

    },duration);

  } catch(e) {}
}


/* =========================
   SHAKE
========================= */

$("shake").addEventListener(
  "change",
  e => {

    if(e.target.checked)
      document.body.classList.add(
        "shaking"
      );

    else
      document.body.classList.remove(
        "shaking"
      );

  }
);

$("matrixToggle").addEventListener(
  "change",
  e => matrix(e.target.checked)
);


/* =========================
   BUTTONS
========================= */

$("startBtn")
  .addEventListener("click",start);

$("mutateBtn")
  .addEventListener("click",mutate);

$("scanBtn")
  .addEventListener("click",scanner);

$("cleanBtn")
  .addEventListener("click",clean);

$("chaosBtn")
  .addEventListener("click",chaos);

document.querySelectorAll(
  ".tools button"
).forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const tool =
        button.dataset.tool;

      if(tool === "swarm") {

        if(!running)
          start();

        for(let i=0;i<3;i++)
          setTimeout(
            spawnBug,
            i*300
          );

      }

      if(tool === "glitch") {

        if(!running)
          start();

        glitch();

      }

      if(tool === "popup") {

        if(!running)
          start();

        popup();

      }

      if(tool === "crash")
        fakeCrash();

      if(tool === "blackout")
        blackout();

      if(tool === "scan")
        scanner();

    }
  );

});


/* =========================
   THEME BUTTON
========================= */

$("themeBtn").addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "bright-mode"
    );

    event(
      "Interface theme toggled"
    );

  }
);


/* =========================
   INITIAL STATE
========================= */

$("signature").textContent =
  makeSignature();

event(
  "KNOX BUG v2 initialized",
  "success"
);

event(
  "Waiting for fictional strain..."
);
