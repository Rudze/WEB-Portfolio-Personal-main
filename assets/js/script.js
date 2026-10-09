'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");


// Fonction de filtrage
const filterFunc = (selectedValue) => {
  console.log(selectedValue);
  
  filterItems.forEach((item) => {
    const category = item.dataset.category;

    if (selectedValue === "all" || category === selectedValue) {
      item.classList.add("active");
      
    } else {
      item.classList.remove("active");
    }
  });
};

if (select) {
  select.addEventListener("click", () => elementToggleFunc(select));

  selectItems.forEach((item) => {
    item.addEventListener("click", () => {
      const selectedValue = item.getAttribute("data-select-item");
      elementToggleFunc(select);
      filterFunc(selectedValue);
      selectItems.forEach((selectItem) =>
        selectItem.classList.remove("active")
      );
      item.classList.add("active");
    });
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedValue = btn.getAttribute("data-filter-btn");
    filterFunc(selectedValue);
    filterBtns.forEach((filterBtn) =>
      filterBtn.classList.remove("active")
    );
    btn.classList.add("active");
  });
});


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.getAttribute("data-nav-link");

    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page === targetPage) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}


function envoieMail() {
   const emailInput = document.getElementById("email");
   const emailValue = emailInput.value;
   alert( emailValue);

  // TODO: call the EmailJS library with emailValue
}



// age, computed from the birth date
const ageEl = document.querySelector("[data-age]");

if (ageEl) {
  const birth = new Date(2001, 7, 17);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) age--;
  ageEl.textContent = age;
}



// background: dot grid lit up around the cursor
const bgFx = document.querySelector("[data-bg-fx]");

if (bgFx && window.matchMedia("(pointer: fine)").matches) {
  let frame = 0;

  window.addEventListener("pointermove", (e) => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      bgFx.style.setProperty("--mx", e.clientX + "px");
      bgFx.style.setProperty("--my", e.clientY + "px");
    });
  }, { passive: true });

  document.addEventListener("pointerleave", () => {
    bgFx.style.setProperty("--mx", "-999px");
    bgFx.style.setProperty("--my", "-999px");
  });
}



// skills terminal
const SKILLS = [
  {
    dir: "systems", key: "skills.systems", label: "Systems & Virtualization",
    desc: "The foundation: installing, hardening and running servers, physical or virtual.",
    items: ["Linux", "Debian", "CentOS", "Windows", "Windows Server", "Proxmox"],
  },
  {
    dir: "devops", key: "skills.devops", label: "DevOps & Automation",
    desc: "Infrastructure as code, containers, CI/CD pipelines and scripts to automate everything.",
    items: ["Docker", "Kubernetes", "Ansible", "GitLab CI/CD", "GitHub", "Bash", "Python"],
  },
  {
    dir: "network", key: "skills.network", label: "Networking, Web & Security",
    desc: "Load balancing, caching, firewalls and secure access to services.",
    items: ["HAProxy", "Varnish", "Apache", "IIS", "OPNsense", "VPN", "Wi-Fi", "Ethernet"],
  },
  {
    dir: "monitoring", key: "skills.monitoring", label: "Monitoring & Backup",
    desc: "Spot problems before users do, and always keep a way back.",
    items: ["Nagios", "Zabbix", "Prometheus", "Grafana", "Bareos", "PBS", "Veeam"],
  },
  {
    dir: "databases", key: "skills.databases", label: "Databases",
    desc: "Installing, running and backing up relational and document databases.",
    items: ["PostgreSQL", "MariaDB", "MySQL", "MongoDB"],
  },
  {
    dir: "gamedev", key: "skills.gamedev", label: "Game development",
    desc: "Building games and 3D content, my creative playground.",
    items: ["Unreal Engine 5", "Blueprints", "Godot", "GDScript", "Blender"],
  },
  {
    dir: "tools", key: "skills.tools", label: "Tools & Environments",
    desc: "Everyday tools, from directory services and ticketing to the code editor.",
    items: ["Active Directory", "Office 365", "GLPI", "Cloudflare", "Mailcow", "Ntfy", "VS Code"],
  },
];

// short labels shown in the tile badge (default: first two letters)
const MONOGRAMS = {
  "Windows Server": "WS", "Kubernetes": "K8s", "GitLab CI/CD": "GL", "HAProxy": "HA",
  "IIS": "IIS", "VPN": "VPN", "PBS": "PBS", "PostgreSQL": "Pg", "MySQL": "My",
  "MongoDB": "Mo", "Unreal Engine 5": "UE5", "Blueprints": "BP", "GDScript": "GD",
  "Active Directory": "AD", "Office 365": "365", "VS Code": "VS", "Python": "Py",
};

const skillTerm = document.querySelector("[data-skill-term]");

if (skillTerm) {
  const tree = skillTerm.querySelector("[data-st-tree]");
  const cmdEl = skillTerm.querySelector("[data-st-cmd]");
  const commentEl = skillTerm.querySelector("[data-st-comment]");
  const grid = skillTerm.querySelector("[data-st-grid]");
  const statusEl = skillTerm.querySelector("[data-st-status]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const total = SKILLS.reduce((n, s) => n + s.items.length, 0);
  const GLYPHS = "!<>-_\\/[]{}=+*^?#$%&01";
  const AUTOPLAY_MS = 6500;

  let current = 0;
  let runId = 0;
  let autoplay = !reduceMotion;
  let autoplayTimer = null;
  let started = false;

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const label = (s) => I18N.t(s.key, s.label);
  const desc = (s) => I18N.t(s.key + ".text", s.desc);

  // folder buttons
  tree.innerHTML = SKILLS.map((s, i) => `
    <button class="st-dir" role="tab" data-index="${i}" title="${label(s)}">
      <ion-icon name="folder-outline" class="i-closed"></ion-icon>
      <ion-icon name="folder-open-outline" class="i-open"></ion-icon>
      <span>${s.dir}/</span>
      <span class="st-count">${s.items.length}</span>
      <span class="st-progress"></span>
    </button>`).join("");

  const dirs = [...tree.querySelectorAll(".st-dir")];

  // letters settle one by one from random glyphs
  const scramble = async (el, text, id) => {
    const steps = 12;
    for (let f = 0; f <= steps; f++) {
      if (id !== runId) return;
      const settled = Math.floor((f / steps) * text.length);
      el.textContent = text
        .split("")
        .map((ch, i) => (i < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("");
      await sleep(30);
    }
    el.textContent = text;
  };

  const tile = (name, i) => `
    <li class="st-item" style="--i: ${i}">
      <span class="st-mono">${MONOGRAMS[name] || name.slice(0, 2)}</span>
      <span class="st-name">${name}</span>
    </li>`;

  const updateStatus = () => {
    statusEl.textContent = I18N.t("st.status", "{n} items · {total} total", { n: SKILLS[current].items.length, total });
  };

  const show = async (index, animate = true) => {
    const id = ++runId;
    const s = SKILLS[index];
    current = index;

    dirs.forEach((d, i) => {
      d.classList.toggle("active", i === index);
      d.setAttribute("aria-selected", i === index);
      // restart the progress animation
      const bar = d.querySelector(".st-progress");
      bar.style.animation = "none";
      void bar.offsetWidth;
      bar.style.animation = "";
    });

    updateStatus();
    const command = `ls ${s.dir}/`;

    if (!animate || reduceMotion) {
      cmdEl.textContent = command;
      commentEl.textContent = `# ${label(s)} — ${desc(s)}`;
      grid.innerHTML = s.items.map(tile).join("");
      return;
    }

    grid.innerHTML = "";
    commentEl.textContent = "";
    commentEl.classList.remove("show");

    // type the command
    for (let i = 0; i <= command.length; i++) {
      if (id !== runId) return;
      cmdEl.textContent = command.slice(0, i);
      await sleep(40 + Math.random() * 40);
    }
    await sleep(180);
    if (id !== runId) return;

    commentEl.textContent = `# ${label(s)} — ${desc(s)}`;
    commentEl.classList.add("show");

    grid.innerHTML = s.items.map(tile).join("");
    grid.querySelectorAll(".st-name").forEach((el, i) => {
      setTimeout(() => scramble(el, s.items[i], id), i * 70);
    });
  };

  const scheduleNext = () => {
    clearTimeout(autoplayTimer);
    if (!autoplay) return;
    autoplayTimer = setTimeout(() => {
      show((current + 1) % SKILLS.length);
      scheduleNext();
    }, AUTOPLAY_MS);
  };

  const stopAutoplay = () => {
    autoplay = false;
    clearTimeout(autoplayTimer);
    skillTerm.classList.remove("autoplay");
  };

  dirs.forEach((d) => d.addEventListener("click", () => {
    stopAutoplay();
    show(Number(d.dataset.index));
  }));

  // glow following the cursor on each tile
  grid.addEventListener("pointermove", (e) => {
    const item = e.target.closest(".st-item");
    if (!item) return;
    const r = item.getBoundingClientRect();
    item.style.setProperty("--mx", e.clientX - r.left + "px");
    item.style.setProperty("--my", e.clientY - r.top + "px");
  });

  // start when the terminal becomes visible, pause autoplay while it is hidden
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (autoplay) skillTerm.classList.add("autoplay");
      if (!started) {
        started = true;
        show(0);
      } else if (autoplay) {
        show(current, false); // resync the progress bar with the timer
      }
      scheduleNext();
    } else {
      clearTimeout(autoplayTimer);
    }
  }, { threshold: 0.4 }).observe(skillTerm);

  document.addEventListener("langchange", () => {
    dirs.forEach((d, i) => { d.title = label(SKILLS[i]); });
    if (started) show(current, false);
  });
}



// GitHub contributions graph (black & white)
const ghSection = document.querySelector("[data-gh]");

if (ghSection) {
  const user = ghSection.dataset.ghUser;
  const graph = ghSection.querySelector("[data-gh-graph]");
  const scroller = ghSection.querySelector("[data-gh-scroll]");
  const totalEl = ghSection.querySelector("[data-gh-total]");
  let data = null;

  // "2025-10-05" -> local date (avoids timezone shifts)
  const toDate = (iso) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const render = (animate) => {
    const locale = I18N.lang === "fr" ? "fr-FR" : "en-US";
    const days = data.contributions;
    const offset = toDate(days[0].date).getDay(); // weeks start on Sunday

    const cells = [];
    const months = [];
    let lastMonth = -1;

    for (let i = 0; i < offset; i++) cells.push('<i class="gh-cell" style="visibility: hidden"></i>');

    days.forEach((day, i) => {
      const date = toDate(day.date);
      const col = Math.floor((i + offset) / 7);

      if (date.getDay() === 0 && date.getMonth() !== lastMonth && date.getDate() <= 7) {
        lastMonth = date.getMonth();
        months.push(`<span style="grid-column: ${col + 1} / span 4">${date.toLocaleDateString(locale, { month: "short" })}</span>`);
      }

      const tip = I18N.t("gh.cell", "{n} contribution(s) on {date}", {
        n: day.count,
        date: date.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" }),
      });
      cells.push(`<i class="gh-cell l${day.level}" style="--c: ${col}" title="${tip}"></i>`);
    });

    // Mon / Wed / Fri labels
    const dayLabels = [0, 1, 2, 3, 4, 5, 6].map((d) => {
      if (d % 2 === 0) return "<span></span>";
      const ref = new Date(2024, 0, 7 + d); // 2024-01-07 is a Sunday
      return `<span>${ref.toLocaleDateString(locale, { weekday: "short" })}</span>`;
    }).join("");

    graph.classList.remove("animate");
    graph.innerHTML = `
      <span></span>
      <div class="gh-months">${months.join("")}</div>
      <div class="gh-days">${dayLabels}</div>
      <div class="gh-cells">${cells.join("")}</div>`;

    totalEl.innerHTML = I18N.t("gh.total", "{n} contributions in the last year", {
      n: `<strong>${data.total.lastYear}</strong>`,
    });

    // latest activity is on the right
    scroller.scrollLeft = scroller.scrollWidth;

    if (animate) {
      void graph.offsetWidth;
      graph.classList.add("animate");
    }
  };

  const fallback = () => {
    graph.innerHTML = `<img class="gh-fallback" src="https://ghchart.rshah.org/ffffff/${user}" alt="GitHub contributions of ${user}" loading="lazy">`;
  };

  const load = async () => {
    try {
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`);
      if (!res.ok) throw new Error(res.status);
      data = await res.json();
      render(true);
    } catch (e) {
      fallback();
    }
  };

  // fetch on first display of the Portfolio tab
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    load();
  });
  observer.observe(ghSection);

  document.addEventListener("langchange", () => { if (data) render(false); });
}



// project modal: opens a detailed card instead of following the link
const pm = document.querySelector("[data-pm]");

if (pm) {
  const dialog = pm.querySelector(".pm-dialog");
  const media = pm.querySelector("[data-pm-media]");
  const catEl = pm.querySelector("[data-pm-cat]");
  const statusEl = pm.querySelector("[data-pm-status]");
  const titleEl = pm.querySelector("[data-pm-title]");
  const detailsEl = pm.querySelector("[data-pm-details]");
  const countEl = pm.querySelector("[data-pm-count]");
  const items = [...document.querySelectorAll("[data-filter-item]")];

  let current = null;
  let lastFocus = null;

  // only the projects currently shown by the filter
  const visibleItems = () => items.filter((item) => item.classList.contains("active"));

  const fill = (item) => {
    const details = item.querySelector(".project-details");
    const status = details.querySelector(".pd-status");

    media.innerHTML = item.querySelector(".project-img img, .project-img .project-cover").outerHTML;
    catEl.textContent = item.querySelector(".project-category").textContent;
    statusEl.textContent = status ? status.textContent : "";
    titleEl.textContent = item.querySelector(".project-title").textContent;

    detailsEl.innerHTML = "";
    [...details.children]
      .filter((el) => !el.classList.contains("pd-status"))
      .forEach((el) => detailsEl.appendChild(el.cloneNode(true)));

    const list = visibleItems();
    countEl.textContent = `${list.indexOf(item) + 1} / ${list.length}`;
    pm.querySelector(".pm-body").scrollTop = 0;
  };

  const open = (item) => {
    current = item;
    lastFocus = document.activeElement;
    fill(item);
    pm.classList.add("open");
    pm.setAttribute("aria-hidden", "false");
    document.body.classList.add("pm-locked");
    pm.querySelector(".pm-close").focus({ preventScroll: true });
  };

  const close = () => {
    pm.classList.remove("open");
    pm.setAttribute("aria-hidden", "true");
    document.body.classList.remove("pm-locked");
    current = null;
    lastFocus?.focus({ preventScroll: true });
  };

  const step = (dir) => {
    const list = visibleItems();
    const next = list[(list.indexOf(current) + dir + list.length) % list.length];
    if (!next || next === current) return;
    current = next;
    fill(next);
    dialog.classList.remove("swap");
    void dialog.offsetWidth;
    dialog.classList.add("swap");
  };

  items.forEach((item) => {
    item.querySelector("[data-project-open]").addEventListener("click", (e) => {
      // keep ctrl/cmd + click to open the link in a new tab
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      open(item);
    });
  });

  pm.querySelectorAll("[data-pm-close]").forEach((el) => el.addEventListener("click", close));
  pm.querySelector("[data-pm-prev]").addEventListener("click", () => step(-1));
  pm.querySelector("[data-pm-next]").addEventListener("click", () => step(1));

  document.addEventListener("keydown", (e) => {
    if (!current) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // re-fill with the translated texts when the language changes
  document.addEventListener("langchange", () => { if (current) fill(current); });
}
