// ── Matrix rain on landing ──────────────────────────────────────────
const matrixCanvas = document.getElementById("matrix-canvas");
const matrixCtx = matrixCanvas.getContext("2d");

const chars = "アイウエオカキクケコ0123456789#$%";
const fontSize = 18;
let columns = 0;
let drops = [];

function resizeMatrix() {
  const wrapper = document.getElementById("landing-matrix-wrapper");
  matrixCanvas.width = wrapper.clientWidth;
  matrixCanvas.height = wrapper.clientHeight;
  columns = Math.floor(matrixCanvas.width / fontSize);
  initDrops();
}

function initDrops() {
  columns = Math.floor(matrixCanvas.width / fontSize);
  drops = Array.from({ length: columns }, () => ({
    y: -Math.random() * matrixCanvas.height * 1.5,
  }));
}

window.addEventListener("resize", resizeMatrix);
resizeMatrix();

function matrixLoop() {
  matrixCtx.fillStyle = "rgba(0,0,0,0.06)";
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  matrixCtx.fillStyle = "#a855f7";
  matrixCtx.font = fontSize + "px monospace";

  const speed = 6;
  drops.forEach((drop, i) => {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    matrixCtx.fillText(ch, x, drop.y);
    drop.y += speed;
    if (drop.y > matrixCanvas.height + 20) {
      drop.y = -Math.random() * 100 - 20;
    }
  });
  requestAnimationFrame(matrixLoop);
}

if (matrixCanvas.width > 0 && matrixCanvas.height > 0) {
  matrixLoop();
} else {
  setTimeout(matrixLoop, 100);
}

// ── Cursor particle trail ───────────────────────────────────────────
document.addEventListener("mousemove", (e) => {
  const particle = document.createElement("div");
  particle.className = "cursor-particle";
  particle.style.left = e.clientX + "px";
  particle.style.top = e.clientY + "px";
  particle.style.setProperty("--dx", (Math.random() - 0.5) * 80 + "px");
  particle.style.setProperty("--dy", (Math.random() - 0.5) * 80 + "px");
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 1100);
});

// ── Role styling maps (friend roster) ───────────────────────────────
const roleMap = {
  mommy:       { title: "MOMMY",        cssClass: "mommy-title" },
  harmful:     { title: "HARMFUL",      cssClass: "harmful-title" },
  coOwner:     { title: "CO OWNER",     cssClass: "co-owner-title" },
  bunnies:     { title: "BUNNIES",      cssClass: "bunnies-title" },
  admin:       { title: "ADMIN",        cssClass: "admin-title" },
  skid:        { title: "SKID",         cssClass: "skid-title" },
  larp:        { title: "LARP",         cssClass: "larp-title" },
  femboy:      { title: "FEMBOY",       cssClass: "femboy-title" },
  cuck:        { title: "CUCK",         cssClass: "cuck-title" },
  thecoopers:  { title: "The Coopers",  cssClass: "thecoopers-title" },
  member:      { title: "FRIENDS",      cssClass: "member-title" },
};

const nameClasses = {
  mommy: "mommy-name",
  harmful: "harmful-name",
  coOwner: "co-owner-name",
  bunnies: "bunnies-name",
  admin: "admin-name",
  skid: "skid-name",
  larp: "larp-name",
  femboy: "femboy-name",
  cuck: "cuck-name",
  thecoopers: "thecoopers-name",
  member: "member-name",
};

const boxClasses = {
  mommy: "mommy-box",
  harmful: "harmful-box",
  coOwner: "co-owner-box",
  bunnies: "bunnies-box",
  admin: "admin-box",
  skid: "skid-box",
  larp: "larp-box",
  femboy: "femboy-box",
  cuck: "cuck-box",
  thecoopers: "thecoopers-box",
  member: "member-box",
};

function buildRoster(allPeople) {
  const container = document.getElementById("roster-container");
  container.innerHTML = "";

  const groups = {
    mommy: [], harmful: [], coOwner: [], bunnies: [], admin: [], skid: [],
    larp: [], femboy: [], cuck: [], thecoopers: [], member: [],
  };

  allPeople.forEach((person) => {
    const role = person.role;
    if (groups[role]) groups[role].push(person);
  });

  const order = [
    "mommy", "harmful", "coOwner", "bunnies", "admin", "skid",
    "larp", "femboy", "cuck", "thecoopers", "member",
  ];

  order.forEach((roleKey) => {
    const list = groups[roleKey];
    if (!list || list.length === 0) return;

    const info = roleMap[roleKey];
    const section = document.createElement("div");
    section.className = "section";

    const title = document.createElement("div");
    title.className = `section-title ${info.cssClass}`;
    title.innerText = info.title;

    const grid = document.createElement("div");
    grid.className = "grid";

    list.forEach((member) => {
      const row = document.createElement("div");
      row.className = `person-container ${boxClasses[member.role] || "member-box"}`;

      const img = document.createElement("img");
      img.className = "avatar";
      img.src = member.image;
      img.alt = member.name;

      const textWrap = document.createElement("div");

      const nameEl = document.createElement("div");
      nameEl.className = `name ${nameClasses[member.role] || ""}`;
      nameEl.innerText = member.name;

      const descEl = document.createElement("div");
      descEl.className = "desc";
      descEl.innerText = member.desc;

      textWrap.appendChild(nameEl);
      textWrap.appendChild(descEl);
      row.appendChild(img);
      row.appendChild(textWrap);
      grid.appendChild(row);
    });

    section.appendChild(title);
    section.appendChild(grid);
    container.appendChild(section);
  });
}

function initParticles() {
  if (typeof particlesJS !== "function") return;
  particlesJS("particles-js", {
    particles: {
      number: { value: 220, density: { enable: true, value_area: 800 } },
      color: { value: ["#a855f7", "#c084fc", "#7c3aed", "#e9d5ff"] },
      shape: { type: "circle" },
      opacity: { value: 0.6, random: true, anim: { enable: false } },
      size: { value: 3, random: true, anim: { enable: false } },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#a855f7",
        opacity: 0.35,
        width: 1.2,
      },
      move: {
        enable: true,
        speed: 1.7,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
      },
    },
    retina_detect: true,
  });
}

let mouseX = 0, mouseY = 0;
let lastMouseX = 0, lastMouseY = 0;

function createBlood(x, y, intensity = 1) {
  const types = ["blood", "blood-small", "blood-large"];
  const count = Math.floor(2 * intensity) + 1;
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const drop = document.createElement("div");
    drop.className = type;
    drop.style.left = x + (Math.random() - 0.5) * 15 + "px";
    drop.style.top = y + (Math.random() - 0.5) * 15 + "px";
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 400 + Math.random() * 400);
  }
}

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  const dx = mouseX - lastMouseX;
  const dy = mouseY - lastMouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance > 2) {
    let intensity = 1;
    if (distance > 6) intensity = 2;
    if (distance > 20) intensity = 3;
    if (distance > 45) intensity = 4;
    createBlood(mouseX, mouseY, intensity);
    for (let i = 0; i < intensity * 2; i++) {
      const extra = document.createElement("div");
      extra.className = "blood-small";
      extra.style.left = mouseX + (Math.random() - 0.5) * 25 + "px";
      extra.style.top = mouseY + (Math.random() - 0.5) * 15 + "px";
      document.body.appendChild(extra);
      setTimeout(() => extra.remove(), 400 + Math.random() * 200);
    }
    lastMouseX = mouseX;
    lastMouseY = mouseY;
  }
});

window.addEventListener("click", (e) => {
  const cx = e.clientX, cy = e.clientY;
  for (let i = 0; i < 6; i++) {
    const types = ["blood", "blood-small", "blood-large"];
    const drop = document.createElement("div");
    drop.className = types[Math.floor(Math.random() * types.length)];
    drop.style.left = cx + (Math.random() - 0.5) * 40 + "px";
    drop.style.top = cy + (Math.random() - 0.5) * 40 + "px";
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 600 + Math.random() * 400);
  }
  for (let i = 0; i < 3; i++) {
    const big = document.createElement("div");
    big.className = "blood-large";
    big.style.left = cx + (Math.random() - 0.5) * 20 + "px";
    big.style.top = cy + (Math.random() - 0.5) * 40 + "px";
    document.body.appendChild(big);
    setTimeout(() => big.remove(), 900);
  }
});

const landing = document.getElementById("landing");
const main = document.getElementById("main");
const music = document.getElementById("music");
const particlesContainer = document.getElementById("particles-js");

const EMBEDDED_PEOPLE = [
  {
    "name": "unity",
    "description": "we harmful modders :>",
    "pfp": "https://media.discordapp.net/attachments/1464130653153923103/1544793782594306199/IMG_8788.jpg?ex=6aa99ed2&is=6aa84d52&hm=23ca6721dc771f1b9480dcfccb815c328080360dbabb9c5d4cbd87b6dd63dd23&=&format=webp",
    "role": "harmful"
  },
  {
    "name": "syri",
    "description": "i love boobys",
    "pfp": "https://media.discordapp.net/attachments/1464130653153923103/1544794354760032427/IMG_8784.jpg?ex=6aa99f5b&is=6aa84ddb&hm=b29998948ade0498d7cacd9c4b448d8ba1f904c44263e9fb0cf1dfe597d26d8c&=&format=webp",
    "role": "femboy"
  },
  {
    "name": "frog",
    "description": "im really gay",
    "pfp": "https://cdn.discordapp.com/avatars/1327394236005355662/e5ded841ea047129ab662e3cbf000fd3.png?size=1024",
    "role": "cuck"
  },
  {
    "name": "ray",
    "description": "i love my daddy crazy",
    "pfp": "https://images-ext-1.discordapp.net/external/saRtboCJdHriNmL_t_urVgSEDqlY50JA0XPS274gLG0/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1519866644191641715/06c884dabc861a04e83b86cf4a52c8e1.png?format=webp&quality=lossless",
    "role": "femboy"
  },
  {
    "name": "crazy 764",
    "description": "i like touching ray",
    "pfp": "https://media.discordapp.net/attachments/1522725378626552012/1548867289137291294/382EFBBD-5443-45EA-9726-E9EA79F8894D.png?ex=6aa94752&is=6aa7f5d2&hm=a27f5e988aee64141993906fe365b5c4bcc972dd0f62f9ac9666d634eb3a7467&=&format=webp&quality=lossless",
    "role": "femboy"
  },
  {
    "name": "gay boy billy",
    "description": "number 1 fbi fed",
    "pfp": "https://cdn.discordapp.com/attachments/1531488818841129010/1549220526742831224/discord-avatar-512px_3.png?ex=6aa9e78c&is=6aa8960c&hm=be72e6a6088b2c6956237bb9d737468a9b9ebd70419f90412fa0fdc96c3571a1&",
    "role": "larp"
  },
  {
    "name": "pringles",
    "description": "i farted in a Aldi's bathroom",
    "pfp": "https://media.discordapp.net/attachments/1549249865744126023/1549250119814348852/Screenshot_2026-09-14_194604.png?ex=6aaa031c&is=6aa8b19c&hm=88e820819547a79f64ee54ead773508e08770b0b96f4a53529c2a25cedcf453b&=&format=webp&quality=lossless",
    "role": "cuck"
  }
];

function mapPeople(list) {
  return list.map((p) => ({
    name: p.name,
    role: p.role,
    desc: p.description || p.desc || "",
    image: p.pfp || p.image || "",
  }));
}

function loadPeople() {
  buildRoster(mapPeople(EMBEDDED_PEOPLE));
}

function enterSite() {
  landing.classList.add("fade-out");
  particlesContainer.style.display = "block";
  initParticles();
  if (music) {
    music.volume = 0.5;
    music.play().catch(() => {});
  }
  setTimeout(() => {
    main.style.display = "block";
    document.body.style.overflowY = "auto";
    loadPeople();
  }, 700);
}

landing.addEventListener("click", enterSite);
