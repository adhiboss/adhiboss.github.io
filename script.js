/**
 * Portfolio Interactive Engine & ASCII Ocean Simulation
 * Recreates the exact technical canvas experience of sanathr.me
 */

(function () {
  "use strict";

  // 1. DYNAMIC DATA HYDRATION FROM portfolio-data.js
  function hydrateFromData() {
    const data = window.PORTFOLIO_DATA;
    if (!data) return;

    // Personal & Intro
    if (data.personal) {
      const p = data.personal;
      const brandEl = document.querySelector(".portfolio-brand");
      if (brandEl && p.brand) brandEl.textContent = p.brand;

      const aliasEl = document.querySelector(".alias");
      if (aliasEl && p.alias) aliasEl.textContent = p.alias;

      const introEl = document.querySelector(".intro-statement");
      if (introEl && p.statementLine1 && p.statementLine2) {
        introEl.textContent = `${p.statementLine1} ${p.statementLine2}`;
      }

      const recentEl = document.querySelector(".recent-work");
      if (recentEl && p.recentWorkOrg) {
        recentEl.innerHTML = `${p.recentWorkPrefix || "most recently, work at"} <a href="${p.recentWorkUrl || "#"}" target="_blank" rel="noopener noreferrer">${p.recentWorkOrg}</a>`;
      }
    }

    // Work Experience
    if (data.work) {
      const workSec = document.querySelector("#work");
      const items = Array.isArray(data.work.items)
        ? data.work.items
        : [data.work];

      if (workSec && items.length > 0) {
        const headingHtml = `<h2 class="cell-text" id="heading-work">${data.work.heading || "work"}</h2>`;
        const itemsHtml = items
          .map(
            (w) => `
          <div class="work-item">
            <div class="work-heading">
              <img
                src="${w.logo || "images/jainlogo.png"}"
                loading="lazy"
                decoding="async"
                width="44"
                height="44"
                alt="${w.company}"
                draggable="false"
              />
              <div>
                <h3>${w.company}</h3>
                <p>${w.role}</p>
              </div>
            </div>
            <p class="work-dates">
              ${w.datesHtml || w.dates}
            </p>
            <div class="work-description">
              ${Array.isArray(w.description) ? w.description.map((d) => `<p>${d}</p>`).join("") : `<p>${w.description}</p>`}
            </div>
            <a
              class="inline-link"
              href="${w.linkUrl || "#"}"
              target="_blank"
              rel="noopener noreferrer"
            >${w.linkText || "visit organization"}</a>
          </div>`
          )
          .join("");

        workSec.innerHTML = headingHtml + itemsHtml;
      }
    }

    // Projects
    if (data.projects && Array.isArray(data.projects.items)) {
      const projList = document.querySelector(".project-list");
      if (projList) {
        projList.innerHTML = data.projects.items
          .map(
            (item) => `
            <li>
              <a href="${item.url || "#"}" target="_blank" rel="noopener noreferrer">
                <span>
                  <strong>${item.title}</strong>
                  <small>${item.category}</small>
                </span>
                <svg class="icon" viewBox="0 0 256 256" aria-hidden="true">
                  <use href="ui-icons.svg#link-simple"></use>
                </svg>
              </a>
            </li>`
          )
          .join("");
      }
      const noteEl = document.querySelector("#projects .section-note");
      if (noteEl && data.projects.footer) {
        noteEl.innerHTML = `${data.projects.footer.text} <a href="${data.projects.footer.linkUrl}" target="_blank" rel="noopener noreferrer">${data.projects.footer.linkText}</a>`;
      }
    }

    // Research
    if (data.research && Array.isArray(data.research.items)) {
      const researchSec = document.querySelector("#research");
      if (researchSec) {
        const headingHtml = `<h2 class="cell-text" id="heading-research">${data.research.heading || "research"}</h2>`;
        const listHtml = `
          <ul class="project-list">
            ${data.research.items
              .map(
                (item) => `
              <li>
                <a href="${item.url || "#"}" target="_blank" rel="noopener noreferrer">
                  <span>
                    <strong>${item.title}</strong>
                    <small>${item.description} · doi: ${item.doi}</small>
                  </span>
                  <svg class="icon" viewBox="0 0 256 256" aria-hidden="true">
                    <use href="ui-icons.svg#link-simple"></use>
                  </svg>
                </a>
              </li>`
              )
              .join("")}
          </ul>
        `;
        const noteHtml = data.research.footer
          ? `<p class="section-note">${data.research.footer.text} <a href="${data.research.footer.linkUrl}" target="_blank" rel="noopener noreferrer">${data.research.footer.linkText}</a></p>`
          : "";
        researchSec.innerHTML = headingHtml + listHtml + noteHtml;
      }
    }

    // Skills
    if (data.skills && Array.isArray(data.skills.groups)) {
      const skillGroups = document.querySelector(".skill-groups");
      if (skillGroups) {
        skillGroups.innerHTML = data.skills.groups
          .map(
            (g) => `
            <div>
              <dt>${g.category}</dt>
              <dd>${g.tech}</dd>
            </div>`
          )
          .join("");
      }
    }

    // Recognition
    if (data.recognition && Array.isArray(data.recognition.items)) {
      const recList = document.querySelector(".recognition-list");
      if (recList) {
        recList.innerHTML = data.recognition.items
          .map(
            (item) => `
            <li>
              <span>${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>` : item.title}</span>
              <strong>${item.result}</strong>
            </li>`
          )
          .join("");
      }
    }

    // Contact
    if (data.contact) {
      const c = data.contact;
      const cIntro = document.querySelector(".contact-intro");
      const cNote = document.querySelector(".contact-note");
      const cLinks = document.querySelector(".contact-links");

      if (cIntro && c.intro) cIntro.textContent = c.intro;
      if (cNote && c.note) cNote.textContent = c.note;
      if (cLinks && Array.isArray(c.links)) {
        cLinks.innerHTML = c.links
          .map(
            (link) => `
            <a href="${link.url}" aria-label="${link.label}" title="${link.title}" ${link.url.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>
              <svg class="icon" viewBox="0 0 256 256" aria-hidden="true">
                <use href="ui-icons.svg#${link.icon}"></use>
              </svg>
            </a>`
          )
          .join("");
      }
    }
  }

  hydrateFromData();

  // 2. BLOCK-LETTER SECTION HEADING TILE GENERATOR
  function buildHeadingTiles() {
    document.querySelectorAll(".cell-text").forEach((heading) => {
      const text = heading.textContent.trim().toLowerCase();
      heading.setAttribute("aria-label", text);
      heading.replaceChildren(
        ...Array.from(text, (char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.setAttribute("aria-hidden", "true");
          return span;
        })
      );
    });
  }

  buildHeadingTiles();

  // 3. CANVAS ASCII OCEAN & GRAPH PAPER SIMULATION ENGINE
  const TWO_PI = Math.PI * 2;
  const clamp = (val, min, max) => (val < min ? min : val > max ? max : val);
  const randRange = (min, max) => min + Math.random() * (max - min);
  const randInt = (min, max) => Math.floor(randRange(min, max + 1));

  function smoothstep(min, max, val) {
    const s = clamp((val - min) / (max - min), 0, 1);
    return s * s * (3 - 2 * s);
  }

  function angleDiff(a, b) {
    let diff = (b - a) % TWO_PI;
    if (diff > Math.PI) diff -= TWO_PI;
    if (diff < -Math.PI) diff += TWO_PI;
    return diff;
  }

  function hashNoise(x, y, z) {
    let s = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(z | 0, 1442695041);
    s = Math.imul(s ^ (s >>> 13), 1274126177);
    s ^= s >>> 16;
    return (s >>> 0) / 4294967296;
  }

  const FISH_SPECIES = [
    { name: "sardine", cruise: 36, maxSpeed: 64, minSpeed: 18, weight: 3, schoolSize: [18, 28], spacing: [1.8, 1.1], align: 1.6, cohesion: 1.6, jitter: 40, mill: 70, verticalDrag: 0.5 },
    { name: "anchovy", cruise: 46, maxSpeed: 78, minSpeed: 22, weight: 3, schoolSize: [20, 32], spacing: [1.5, 1], align: 3.2, cohesion: 0.45, jitter: 30, mill: 0, verticalDrag: 1.4 },
    { name: "silverside", cruise: 40, maxSpeed: 70, minSpeed: 20, weight: 3, schoolSize: [12, 20], spacing: [2, 1.1], align: 2.4, cohesion: 1.1, jitter: 35, mill: 0, verticalDrag: 1.6 },
    { name: "mackerel", cruise: 32, maxSpeed: 60, minSpeed: 16, weight: 2, schoolSize: [5, 9], spacing: [2.6, 1.3], align: 2, cohesion: 0.9, jitter: 25, mill: 0, verticalDrag: 2 },
    { name: "goby", cruise: 26, maxSpeed: 56, minSpeed: 10, weight: 1, schoolSize: [8, 12], spacing: [1.4, 1.1], align: 0.35, cohesion: 1.4, jitter: 110, mill: 0, verticalDrag: 0.3 }
  ];

  const TOTAL_SPECIES_WEIGHT = FISH_SPECIES.reduce((acc, sp) => acc + sp.weight, 0);

  function pickSpecies() {
    let r = Math.random() * TOTAL_SPECIES_WEIGHT;
    for (let i = 0; i < FISH_SPECIES.length; i++) {
      r -= FISH_SPECIES[i].weight;
      if (r <= 0) return i;
    }
    return 0;
  }

  const SPINE_NODES = 20;
  const SHARK_SPECS = [
    { kind: "greathammer", size: 1 },
    { kind: "classic", size: 0.7 },
    { kind: "greathammer", size: 0.84 },
    { kind: "classic", size: 0.82 },
    { kind: "greathammer", size: 0.77 },
    { kind: "greathammer", size: 0.9 }
  ];

  function calcBaseSharkLength(w, h) {
    return clamp(Math.min(w, h) * 0.44, 170, 430);
  }

  class OceanWorld {
    constructor(specs = SHARK_SPECS) {
      this.width = 0;
      this.height = 0;
      this.time = 0;
      this.fish = [];
      this.sharks = [];
      this.events = [];
      this.pointer = { x: 0, y: 0, active: false };
      this.perception = 60;
      this.sepX = [];
      this.sepY = [];
      this.foreignSep = 40;
      this.bucketCols = 0;
      this.bucketRows = 0;
      this.bucketHead = new Int32Array(0);
      this.bucketCount = new Uint16Array(0);
      this.bucketNext = new Int32Array(0);
      this.lastSpawn = 0;
      this.tmp = { x: 0, y: 0 };
      this.sharkSpecs = specs;
    }

    resize(w, h, cellW, cellH) {
      const isFirst = this.width === 0;
      const oldW = this.width;
      const oldH = this.height;

      this.width = w;
      this.height = h;
      this.sepX = FISH_SPECIES.map((s) => s.spacing[0] * cellW);
      this.sepY = FISH_SPECIES.map((s) => s.spacing[1] * cellH);
      this.perception = Math.max(cellH * 3, cellW * 5.5);
      this.foreignSep = cellW * 3;

      if (isFirst || this.fish.length === 0) {
        this.seed();
        return;
      }

      const scaleX = w / oldW;
      const scaleY = h / oldH;
      const pScale = calcBaseSharkLength(w, h) / calcBaseSharkLength(oldW, oldH);

      for (const s of this.sharks) {
        const hx = s.nodes[0];
        const hy = s.nodes[1];
        s.length *= pScale;
        for (let i = 0; i < SPINE_NODES; i++) {
          s.nodes[i * 2] = hx * scaleX + (s.nodes[i * 2] - hx) * pScale;
          s.nodes[i * 2 + 1] = hy * scaleY + (s.nodes[i * 2 + 1] - hy) * pScale;
        }
      }

      for (const f of this.fish) {
        f.x = clamp(f.x * scaleX, 0, w);
        f.y = clamp(f.y * scaleY, 0, h);
      }
    }

    seed() {
      const { width: w, height: h } = this;
      const baseLen = calcBaseSharkLength(w, h);
      this.sharks = [];

      for (let i = 0; i < this.sharkSpecs.length; i++) {
        const spec = this.sharkSpecs[i];
        const sLen = baseLen * spec.size;
        let px = 0, py = 0, bestScore = -1;

        for (let attempts = 0; attempts < 24; attempts++) {
          const testX = randRange(w * 0.08, w * 0.92);
          const testY = randRange(h * 0.08, h * 0.92);
          let minDist = Infinity;
          for (const other of this.sharks) {
            minDist = Math.min(minDist, Math.hypot(testX - other.nodes[0], testY - other.nodes[1]) / (sLen + other.length));
          }
          if (minDist > bestScore) {
            px = testX;
            py = testY;
            bestScore = minDist;
          }
          if (minDist >= 0.65) break;
        }

        const heading = randRange(0, TWO_PI);
        const nodes = new Float32Array(SPINE_NODES * 2);
        const segmentLen = sLen / (SPINE_NODES - 1);

        for (let j = 0; j < SPINE_NODES; j++) {
          nodes[j * 2] = px - Math.cos(heading) * segmentLen * j;
          nodes[j * 2 + 1] = py - Math.sin(heading) * segmentLen * j;
        }

        this.sharks.push({
          id: i + 1,
          kind: spec.kind,
          length: sLen,
          nodes,
          heading,
          speed: 30,
          phase: randRange(0, TWO_PI),
          turn: 0,
          hunger: randRange(0.25, 0.75),
          wander: 0,
          target: null,
          retargetAt: 0,
          depth: spec.size
        });
      }

      const totalFish = clamp(Math.round((w * h) / 4400), 85, 300);
      this.fish = [];

      while (this.fish.length < totalFish) {
        const spIdx = pickSpecies();
        const sp = FISH_SPECIES[spIdx];
        const schoolCount = Math.min(randInt(sp.schoolSize[0], sp.schoolSize[1]), totalFish - this.fish.length);
        const dir = Math.random() < 0.5 ? 1 : -1;
        const cx = randRange(w * 0.06, w * 0.94);
        const cy = randRange(h * 0.08, h * 0.92);
        const baseAngle = (Math.random() < 0.5 ? 0 : Math.PI) + randRange(-0.5, 0.5);

        for (let j = 0; j < schoolCount; j++) {
          this.fish.push({
            x: cx + randRange(-1, 1) * this.sepX[spIdx] * Math.sqrt(schoolCount),
            y: cy + randRange(-1, 1) * this.sepY[spIdx] * Math.sqrt(schoolCount) * 0.6,
            vx: Math.cos(baseAngle) * sp.cruise,
            vy: Math.sin(baseAngle) * sp.cruise,
            species: spIdx,
            alarm: 0,
            alive: true,
            respawnAt: 0,
            phase: randRange(0, TWO_PI),
            turn: 0,
            depth: randRange(0.55, 1),
            millDir: dir
          });
        }
      }

      this.bucketNext = new Int32Array(this.fish.length);
    }

    splash(x, y) {
      this.events.push({ kind: "splash", x, y });
      const radius = 240;
      for (const f of this.fish) {
        if (!f.alive) continue;
        const dx = f.x - x;
        const dy = f.y - y;
        const dist = Math.hypot(dx, dy);
        if (dist > radius || dist < 0.001) continue;
        const force = (1 - dist / radius) * 260;
        f.vx += (dx / dist) * force;
        f.vy += (dy / dist) * force;
        f.alarm = 1;
      }
    }

    step(dt) {
      this.time += dt;
      this.rebuildHash();
      this.stepFish(dt);
      this.stepSharks(dt);
      this.respawn();
    }

    rebuildHash() {
      const p = this.perception;
      this.bucketCols = Math.ceil(this.width / p) + 4;
      this.bucketRows = Math.ceil(this.height / p) + 4;
      const count = this.bucketCols * this.bucketRows;

      if (this.bucketHead.length !== count) {
        this.bucketHead = new Int32Array(count);
        this.bucketCount = new Uint16Array(count);
      }
      this.bucketHead.fill(-1);
      this.bucketCount.fill(0);

      if (this.bucketNext.length !== this.fish.length) {
        this.bucketNext = new Int32Array(this.fish.length);
      }

      for (let i = 0; i < this.fish.length; i++) {
        const f = this.fish[i];
        if (!f.alive) continue;
        const b = this.bucketOf(f.x, f.y);
        this.bucketNext[i] = this.bucketHead[b];
        this.bucketHead[b] = i;
        this.bucketCount[b]++;
      }
    }

    bucketOf(x, y) {
      const p = this.perception;
      const bx = clamp(Math.floor(x / p) + 2, 0, this.bucketCols - 1);
      const by = clamp(Math.floor(y / p) + 2, 0, this.bucketRows - 1);
      return by * this.bucketCols + bx;
    }

    stepFish(dt) {
      const { fish, sharks, pointer, width: w, height: h } = this;
      const p = this.perception;
      const pSq = p * p;
      const bCols = this.bucketCols;
      const bRows = this.bucketRows;
      const bHead = this.bucketHead;
      const bNext = this.bucketNext;

      for (let i = 0; i < fish.length; i++) {
        const f = fish[i];
        if (!f.alive) continue;

        const sp = FISH_SPECIES[f.species];
        const alarmFactor = 1 + 1.8 * f.alarm;
        const sx = this.sepX[f.species] * alarmFactor;
        const sy = this.sepY[f.species] * alarmFactor;
        const speed = Math.hypot(f.vx, f.vy) || 1;
        const dirX = f.vx / speed;
        const dirY = f.vy / speed;

        let accX = 0, accY = 0;
        let sepForceX = 0, sepForceY = 0;
        let sumVx = 0, sumVy = 0, sumDx = 0, sumDy = 0;
        let neighborCount = 0;

        const bx = clamp(Math.floor(f.x / p) + 2, 0, bCols - 1);
        const by = clamp(Math.floor(f.y / p) + 2, 0, bRows - 1);

        for (let cy = Math.max(0, by - 1); cy <= Math.min(bRows - 1, by + 1); cy++) {
          for (let cx = Math.max(0, bx - 1); cx <= Math.min(bCols - 1, bx + 1); cx++) {
            let neighborIdx = bHead[cy * bCols + cx];
            while (neighborIdx !== -1) {
              if (neighborIdx !== i) {
                const other = fish[neighborIdx];
                const dx = other.x - f.x;
                const dy = other.y - f.y;
                const dSq = dx * dx + dy * dy;

                if (dSq < pSq && dSq > 1e-6) {
                  const d = Math.sqrt(dSq);
                  if ((dx * dirX + dy * dirY) / d > -0.6) {
                    const normX = dx / sx;
                    const normY = dy / sy;
                    const normSq = normX * normX + normY * normY;
                    if (normSq < 1) {
                      const normD = Math.sqrt(normSq) || 0.001;
                      const rep = (1 - normD) / normD;
                      sepForceX -= normX * rep;
                      sepForceY -= normY * rep;
                    }
                    if (other.species === f.species) {
                      sumVx += other.vx;
                      sumVy += other.vy;
                      sumDx += dx;
                      sumDy += dy;
                      neighborCount++;
                    }
                  }
                }
              }
              neighborIdx = bNext[neighborIdx];
            }
          }
        }

        accX += sepForceX * 420;
        accY += sepForceY * 420;

        if (neighborCount > 0) {
          const alignF = (sumVx / neighborCount - f.vx) * 1.4 * sp.align;
          const alignFY = (sumVy / neighborCount - f.vy) * 1.4 * sp.align;
          const cohF = (sumDx / neighborCount) * sp.cohesion * (1 - 0.8 * f.alarm);
          const cohFY = (sumDy / neighborCount) * sp.cohesion * (1 - 0.8 * f.alarm);
          accX += alignF + cohF;
          accY += alignFY + cohFY;
        }

        // Flee from sharks
        let maxThreat = 0;
        for (const s of sharks) {
          const threatRadius = s.length * 0.6 + 60;
          let closestDistSq = Infinity;
          let nodeX = 0, nodeY = 0;

          for (let nodeIdx = 0; nodeIdx <= 12; nodeIdx += 3) {
            const nx = s.nodes[nodeIdx * 2];
            const ny = s.nodes[nodeIdx * 2 + 1];
            const distSq = (f.x - nx) ** 2 + (f.y - ny) ** 2;
            if (distSq < closestDistSq) {
              closestDistSq = distSq;
              nodeX = nx;
              nodeY = ny;
            }
          }

          const dist = Math.sqrt(closestDistSq);
          if (dist < threatRadius && dist > 0.001) {
            let threat = (1 - dist / threatRadius) ** 2;
            const pushX = (f.x - nodeX) / dist;
            const pushY = (f.y - nodeY) / dist;
            accX += pushX * 1100 * threat;
            accY += pushY * 1100 * threat;
            maxThreat = Math.max(maxThreat, Math.sqrt(threat));
          }
        }

        // Pointer reaction
        if (pointer.active) {
          const pdx = f.x - pointer.x;
          const pdy = f.y - pointer.y;
          const pDist = Math.hypot(pdx, pdy);
          if (pDist < 130 && pDist > 0.001) {
            const pF = (1 - pDist / 130) ** 2;
            accX += (pdx / pDist) * 1100 * pF;
            accY += (pdy / pDist) * 1100 * pF;
            maxThreat = Math.max(maxThreat, Math.sqrt(pF) * 0.8);
          }
        }

        f.alarm = Math.max(f.alarm * Math.exp(-dt * 0.7), maxThreat);

        // Boundary margins
        const margin = 36;
        if (f.x < margin) accX += (margin - f.x) * 7;
        else if (f.x > w - margin) accX -= (f.x - (w - margin)) * 7;
        if (f.y < margin) accY += (margin - f.y) * 7;
        else if (f.y > h - margin) accY -= (f.y - (h - margin)) * 7;

        // Cruise velocity damping
        const targetCruise = sp.cruise * (1 + 1.3 * f.alarm);
        accX += (targetCruise - speed) * dirX * 1.6;
        accY += (targetCruise - speed) * dirY * 1.6;

        f.vx += accX * dt;
        f.vy += accY * dt;

        const maxSpd = sp.maxSpeed * (1 + 1.8 * f.alarm);
        const curSpd = Math.hypot(f.vx, f.vy);
        if (curSpd > maxSpd) {
          f.vx *= maxSpd / curSpd;
          f.vy *= maxSpd / curSpd;
        } else if (curSpd < sp.minSpeed && curSpd > 0.001) {
          f.vx *= sp.minSpeed / curSpd;
          f.vy *= sp.minSpeed / curSpd;
        }

        f.x = clamp(f.x + f.vx * dt, -60, w + 60);
        f.y = clamp(f.y + f.vy * dt, -60, h + 60);
      }
    }

    stepSharks(dt) {
      const { sharks, width: w, height: h, time } = this;
      for (const s of sharks) {
        s.hunger = Math.min(1, s.hunger + dt * 0.03);
        s.wander = clamp(s.wander + (Math.random() - 0.5) * dt * 3.2, -1.1, 1.1);

        let steerX = Math.cos(s.heading + s.wander) * 0.45 + Math.cos(s.heading);
        let steerY = Math.sin(s.heading + s.wander) * 0.45 + Math.sin(s.heading);

        // Boundary reflection
        const boundMargin = s.length * 0.35;
        steerX += (clamp(-s.nodes[0] / boundMargin, 0, 1) - clamp((s.nodes[0] - w) / boundMargin, 0, 1)) * 3.5;
        steerY += (clamp(-s.nodes[1] / boundMargin, 0, 1) - clamp((s.nodes[1] - h) / boundMargin, 0, 1)) * 3.5;

        const targetHeading = Math.atan2(steerY, steerX);
        const maxTurn = Math.min(0.8, s.speed / (s.length * 0.22)) * dt;
        const turnStep = clamp(angleDiff(s.heading, targetHeading), -maxTurn, maxTurn);

        s.heading += turnStep;
        s.phase += dt * (2 + s.speed / 24);

        s.nodes[0] += Math.cos(s.heading) * s.speed * dt;
        s.nodes[1] += Math.sin(s.heading) * s.speed * dt;

        const segLen = s.length / (SPINE_NODES - 1);
        let prevAngle = s.heading + Math.PI;

        for (let i = 1; i < SPINE_NODES; i++) {
          const prevX = s.nodes[(i - 1) * 2];
          const prevY = s.nodes[(i - 1) * 2 + 1];
          let curAngle = Math.atan2(s.nodes[i * 2 + 1] - prevY, s.nodes[i * 2] - prevX);
          curAngle = prevAngle + clamp(angleDiff(prevAngle, curAngle), -0.16, 0.16);

          s.nodes[i * 2] = prevX + Math.cos(curAngle) * segLen;
          s.nodes[i * 2 + 1] = prevY + Math.sin(curAngle) * segLen;
          prevAngle = curAngle;
        }

        // Eat fish within jaw range
        if (s.hunger > 0.15) {
          const jawRadius = s.length * 0.05 + 8;
          const hx = s.nodes[0];
          const hy = s.nodes[1];
          for (const f of this.fish) {
            if (f.alive && (f.x - hx) ** 2 + (f.y - hy) ** 2 < jawRadius * jawRadius) {
              f.alive = false;
              f.respawnAt = time + randRange(3, 8);
              s.hunger = Math.max(0, s.hunger - 0.16);
              this.events.push({ kind: "eat", x: f.x, y: f.y });
            }
          }
        }
      }
    }

    respawn() {
      const { time, width: w, height: h } = this;
      const deadFish = this.fish.filter((f) => !f.alive && f.respawnAt <= time);
      if (deadFish.length === 0 || (deadFish.length < 6 && time - this.lastSpawn < 9)) return;

      this.lastSpawn = time;
      const wall = randInt(0, 3);
      const frac = randRange(0.15, 0.85);
      const rx = wall === 0 ? -20 : wall === 1 ? w + 20 : frac * w;
      const ry = wall === 2 ? -20 : wall === 3 ? h + 20 : frac * h;
      const enterAngle = Math.atan2(h / 2 - ry, w / 2 - rx) + randRange(-0.5, 0.5);

      const spIdx = pickSpecies();
      const sp = FISH_SPECIES[spIdx];

      for (const f of deadFish.slice(0, sp.schoolSize[1])) {
        f.alive = true;
        f.species = spIdx;
        f.alarm = 0;
        f.x = rx + randRange(-1, 1) * this.perception;
        f.y = ry + randRange(-1, 1) * this.perception;
        f.vx = Math.cos(enterAngle) * sp.cruise * 1.4;
        f.vy = Math.sin(enterAngle) * sp.cruise * 1.4;
      }
    }
  }

  // 4. CANVAS RENDERER (GRID & MONOSPACE ASCII CHARACTERS)
  const ASCII_CHAR_SETS = {
    sharkBody: ":;t%SX8#@",
    sharkFin: "%;tS:",
    faint: ".',`",
    dense: ":;"
  };

  const ACCENT_COLORS = ["#e0892c", "#e03a32", "#b44ae0", "#33c8cc", "#3cb54a", "#3150e8", "#d9c14a"];

  class OceanRenderer {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d", { alpha: false });
      this.bg = document.createElement("canvas");
      this.dpr = 1;
      this.width = 0;
      this.height = 0;
      this.cw = 12;
      this.ch = 18;
      this.cols = 0;
      this.rows = 0;
      this.light = true;
      this.fontFamily = 'var(--font-mono, "Geist Mono", monospace)';
    }

    get cellWidth() { return this.cw; }
    get cellHeight() { return this.ch; }

    setTheme(isLight) {
      this.light = isLight;
      if (this.width > 0) this.paintBackground();
    }

    resize(w, h, dpr) {
      this.width = w;
      this.height = h;
      this.dpr = dpr;
      this.cw = clamp(Math.round(w / 124), 8, 13);
      this.ch = Math.round(this.cw * 1.45);
      this.cols = Math.ceil(w / this.cw);
      this.rows = Math.ceil(h / this.ch);

      this.canvas.width = Math.round(w * dpr);
      this.canvas.height = Math.round(h * dpr);
      this.bg.width = this.canvas.width;
      this.bg.height = this.canvas.height;

      this.paintBackground();
    }

    paintBackground() {
      const bgCtx = this.bg.getContext("2d");
      if (!bgCtx) return;

      const { width: w, height: h, dpr, cw, ch } = this;
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bgCtx.fillStyle = this.light ? "#ffffff" : "#000000";
      bgCtx.fillRect(0, 0, w, h);

      // Draw Graph Paper Technical Grid Lines
      bgCtx.setTransform(1, 0, 0, 1, 0, 0);
      bgCtx.strokeStyle = this.light ? "rgba(0, 0, 0, 0.055)" : "rgba(255, 255, 255, 0.055)";
      bgCtx.lineWidth = 1;
      bgCtx.beginPath();

      for (let x = 0; x <= Math.ceil(w / cw); x++) {
        const px = Math.round(x * cw * dpr) + 0.5;
        bgCtx.moveTo(px, 0);
        bgCtx.lineTo(px, h * dpr);
      }
      for (let y = 0; y <= Math.ceil(h / ch); y++) {
        const py = Math.round(y * ch * dpr) + 0.5;
        bgCtx.moveTo(0, py);
        bgCtx.lineTo(w * dpr, py);
      }
      bgCtx.stroke();
    }

    render(world, dt) {
      const { ctx, dpr, cols, cw, ch } = this;
      if (cols === 0) return;

      // Draw background grid
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(this.bg, 0, 0);

      // Draw fish & sharks in grid scale
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `600 ${Math.round(ch * 0.74)}px ${this.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      this.drawFish(world);
      this.drawSharks(world);
    }

    drawFish(world) {
      const { ctx, cw, ch } = this;
      for (const f of world.fish) {
        if (!f.alive) continue;
        const cellX = Math.floor(f.x / cw);
        const cellY = Math.floor(f.y / ch);
        const alpha = clamp(0.25 + 0.45 * (f.depth || 0.7), 0.2, 0.75);

        ctx.fillStyle = this.light
          ? `rgba(36, 48, 61, ${alpha.toFixed(3)})`
          : `rgba(230, 238, 255, ${alpha.toFixed(3)})`;

        ctx.fillText("-", cellX * cw + cw / 2, cellY * ch + ch / 2 + 1);
      }
    }

    drawSharks(world) {
      const { ctx, cw, ch, cols, rows } = this;
      const chars = ASCII_CHAR_SETS.sharkBody;

      for (const s of world.sharks) {
        const sLen = s.length;
        const spine = s.nodes;

        // Trace spine segments and sample points for ASCII cells
        for (let seg = 0; seg < SPINE_NODES - 1; seg++) {
          const x0 = spine[seg * 2];
          const y0 = spine[seg * 2 + 1];
          const x1 = spine[(seg + 1) * 2];
          const y1 = spine[(seg + 1) * 2 + 1];
          const tFrac = seg / (SPINE_NODES - 1);

          // Body width tapers naturally
          const halfW = (Math.sin(tFrac * Math.PI) * 0.12 + 0.03) * sLen;
          const normalX = -(y1 - y0);
          const normalY = x1 - x0;
          const nLen = Math.hypot(normalX, normalY) || 1;
          const nx = normalX / nLen;
          const ny = normalY / nLen;

          const steps = Math.ceil(halfW / cw);
          for (let step = -steps; step <= steps; step++) {
            const px = x0 + nx * step * (cw * 0.9);
            const py = y0 + ny * step * (ch * 0.9);
            const col = Math.floor(px / cw);
            const row = Math.floor(py / ch);

            if (col < 0 || row < 0 || col >= cols || row >= rows) continue;

            const charIndex = Math.abs((col * 7 + row * 13 + seg) % chars.length);
            const char = chars[charIndex];
            const distFrac = Math.abs(step) / (steps || 1);

            // Shading intensity
            const intensity = clamp(1 - distFrac * 0.7, 0.2, 0.95);

            // Subtle occasional colored accent
            const isAccent = (col * 31 + row * 17) % 37 === 0;
            if (isAccent) {
              ctx.fillStyle = ACCENT_COLORS[(col + row) % ACCENT_COLORS.length];
            } else {
              if (this.light) {
                const shade = Math.round(210 - intensity * 150);
                ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade + 8})`;
              } else {
                const shade = Math.round(60 + intensity * 180);
                ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade + 12})`;
              }
            }

            // Draw tile fill block for core spine
            if (distFrac < 0.35) {
              ctx.fillStyle = this.light
                ? "rgba(228, 232, 238, 0.65)"
                : "rgba(35, 42, 54, 0.65)";
              ctx.fillRect(col * cw + 1, row * ch + 1, cw - 1, ch - 1);
              ctx.fillStyle = this.light ? "#252830" : "#ffffff";
            }

            ctx.fillText(char, col * cw + cw / 2, row * ch + ch / 2 + 1);
          }
        }
      }
    }
  }

  // 5. ANIMATION COORDINATOR & EVENT ORCHESTRATION
  class SimulationCoordinator {
    constructor(canvas) {
      this.canvas = canvas;
      this.world = new OceanWorld();
      this.renderer = new OceanRenderer(canvas);
      this.raf = 0;
      this.lastTime = 0;
      this.accumulator = 0;
      this.paused = false;
      this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      this.onFrame = (time) => {
        const dt = Math.min(0.1, (time - this.lastTime) / 1000);
        this.lastTime = time;
        this.accumulator += dt;

        const fixedStep = 1 / 60;
        let steps = 0;
        while (this.accumulator >= fixedStep && steps < 4) {
          this.world.step(fixedStep);
          this.accumulator -= fixedStep;
          steps++;
        }
        if (steps === 4) this.accumulator = 0;

        this.renderer.render(this.world, dt);
        if (!this.paused) {
          this.raf = requestAnimationFrame(this.onFrame);
        }
      };

      this.resize();
      window.addEventListener("resize", () => this.resize(), { passive: true });

      // Pointer interactions
      canvas.addEventListener("pointermove", (e) => {
        const rect = canvas.getBoundingClientRect();
        this.world.pointer.x = e.clientX - rect.left;
        this.world.pointer.y = e.clientY - rect.top;
        this.world.pointer.active = true;
      }, { passive: true });

      canvas.addEventListener("pointerleave", () => {
        this.world.pointer.active = false;
      });

      canvas.addEventListener("pointerdown", (e) => {
        if (this.paused) return;
        const rect = canvas.getBoundingClientRect();
        this.world.splash(e.clientX - rect.left, e.clientY - rect.top);
      }, { passive: true });

      // Check reduced motion
      this.reducedMotion.addEventListener("change", () => {
        if (this.reducedMotion.matches) {
          this.setPaused(true);
        }
      });

      if (!this.reducedMotion.matches) {
        this.start();
      } else {
        this.renderer.render(this.world, 0);
      }
    }

    start() {
      if (this.raf) return;
      this.lastTime = performance.now();
      this.raf = requestAnimationFrame(this.onFrame);
    }

    stop() {
      if (this.raf) {
        cancelAnimationFrame(this.raf);
        this.raf = 0;
      }
    }

    setPaused(pause) {
      this.paused = pause;
      if (pause) this.stop();
      else this.start();
    }

    setTheme(isLight) {
      this.renderer.setTheme(isLight);
      this.renderer.render(this.world, 0);
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.renderer.resize(w, h, dpr);
      this.world.resize(w, h, this.renderer.cellWidth, this.renderer.cellHeight);
      this.renderer.render(this.world, 0);
    }
  }

  const canvasEl = document.querySelector("canvas");
  const sim = new SimulationCoordinator(canvasEl);

  // 6. MOTION CONTROLS (PAUSE / RESUME)
  const motionToggle = document.querySelector(".motion-toggle");
  const motionLabel = motionToggle ? motionToggle.querySelector(".motion-label") : null;
  let isPaused = false;

  if (motionToggle) {
    motionToggle.addEventListener("click", () => {
      isPaused = !isPaused;
      sim.setPaused(isPaused);
      motionToggle.dataset.paused = String(isPaused);
      const label = isPaused ? "resume ocean motion" : "pause ocean motion";
      motionToggle.setAttribute("aria-label", label);
      motionToggle.title = label;
      if (motionLabel) motionLabel.textContent = isPaused ? "resume" : "pause";
    });
  }

  // 7. THEME CONTROLS (LIGHT / DARK)
  const themeToggle = document.querySelector(".theme-toggle");
  const themeLabel = themeToggle ? themeToggle.querySelector(".theme-label") : null;

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    sim.setTheme(theme === "light");
    if (themeLabel) themeLabel.textContent = theme;
    const label = `switch to ${theme === "dark" ? "light" : "dark"} theme`;
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", label);
      themeToggle.title = label;
    }
  }

  applyTheme("light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const cur = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      applyTheme(cur);
    });
  }

  // 8. DECK SCROLL, READING PROGRESS & SECTION DOCK SPY
  const deckScroll = document.querySelector(".deck-scroll");
  const sections = Array.from(deckScroll ? deckScroll.querySelectorAll(".deck-section") : []);
  const sectionLinks = Array.from(document.querySelectorAll(".section-link"));
  const sectionNav = document.querySelector(".section-nav");
  const progressBar = document.querySelector(".reading-progress span");

  let activeIndex = -1;

  function setActiveSection(index) {
    if (index === activeIndex) return;
    activeIndex = index;
    if (sectionNav) {
      sectionNav.style.setProperty("--active-section", String(index));
    }
    sectionLinks.forEach((link, i) => {
      if (i === index) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  function onDeckScroll() {
    if (!deckScroll || sections.length === 0) return;

    const maxScroll = Math.max(0, deckScroll.scrollHeight - deckScroll.clientHeight);
    const scrollPos = deckScroll.scrollTop + deckScroll.clientHeight * 0.35;

    let current = 0;
    sections.forEach((sec, idx) => {
      if (sec.offsetTop <= scrollPos) current = idx;
    });

    if (maxScroll > 0 && deckScroll.scrollTop >= maxScroll - 4) {
      current = sections.length - 1;
    }

    setActiveSection(current);

    // Reading progress bar scale
    if (progressBar && maxScroll > 0) {
      const progress = clamp(deckScroll.scrollTop / maxScroll, 0, 1);
      progressBar.style.transform = `scaleX(${progress})`;
    }
  }

  if (deckScroll) {
    deckScroll.addEventListener("scroll", onDeckScroll, { passive: true });
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.hash.slice(1);
      const targetSec = sections.find((s) => s.id === targetId);
      if (targetSec && deckScroll) {
        e.preventDefault();
        deckScroll.scrollTo({
          top: targetSec.offsetTop,
          behavior: "smooth"
        });
        if (location.hash !== anchor.hash) {
          history.pushState(null, "", anchor.hash);
        }
      }
    });
  });

  // Handle URL hash on initial load
  function handleInitialHash() {
    if (!deckScroll) return;
    const hash = location.hash.slice(1);
    const target = sections.find((s) => s.id === hash) || sections[0];
    if (target) {
      deckScroll.scrollTo({ top: target.offsetTop, behavior: "auto" });
      setActiveSection(sections.indexOf(target));
    }
    onDeckScroll();
  }

  window.addEventListener("hashchange", handleInitialHash);
  handleInitialHash();

})();
