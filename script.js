/**
 * ==========================================================================
 * ADHI STUDIO — INTERACTIVE JAVASCRIPT ENGINE
 * Reverse-Engineered Mechanics: Scroll Zoom into 'i', FPS Profiler,
 * Theme Controller, 3D Node Tilt & WhatsApp Inquiry Lead Funnel.
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. SCROLL-DRIVEN "DIVE INTO THE 'i'" CAMERA ZOOM
  // ------------------------------------------------------------------------
  const section = document.querySelector(".u-section");
  const stage = document.getElementById("stageContainer");
  const world = document.getElementById("worldContainer");
  const focalDot = document.getElementById("focalDot");
  const arrivalPortal = document.getElementById("arrivalPortal");
  const zoomReadout = document.getElementById("zoomReadout");
  const cursorSpot = document.getElementById("cursorSpot");

  // Cache dot position relative to the world
  function updateTransformOrigin() {
    if (!focalDot || !world) return;
    const dotRect = focalDot.getBoundingClientRect();
    const worldRect = world.getBoundingClientRect();
    
    // Relative percentages
    const originX = ((dotRect.left + dotRect.width / 2 - worldRect.left) / worldRect.width) * 100;
    const originY = ((dotRect.top + dotRect.height / 2 - worldRect.top) / worldRect.height) * 100;
    world.style.transformOrigin = `${originX.toFixed(2)}% ${originY.toFixed(2)}%`;
  }

  window.addEventListener("resize", updateTransformOrigin);
  updateTransformOrigin();

  let ticking = false;

  function onScroll() {
    if (!section || !world || !arrivalPortal) return;
    const rect = section.getBoundingClientRect();
    const scrollDistance = rect.height - window.innerHeight;
    const currentScroll = -rect.top;
    const progress = Math.min(Math.max(currentScroll / scrollDistance, 0), 1);

    // Exponential scaling: from 1x up to 45x
    const maxScale = 45;
    const scale = 1 + Math.pow(progress, 1.6) * (maxScale - 1);

    // Apply scale to world
    world.style.transform = `scale(${scale.toFixed(3)})`;

    // Update readout
    if (zoomReadout) {
      zoomReadout.textContent = `Zoom ${scale.toFixed(2)}×`;
    }

    // Portal arrival threshold logic
    if (progress >= 0.82) {
      arrivalPortal.classList.add("active");
      arrivalPortal.removeAttribute("inert");
      world.style.opacity = Math.max(1 - (progress - 0.82) / 0.12, 0);
    } else {
      arrivalPortal.classList.remove("active");
      arrivalPortal.setAttribute("inert", "");
      world.style.opacity = "1";
    }

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  onScroll();

  // ------------------------------------------------------------------------
  // 2. MOUSE SPOTLIGHT & 3D NODE PERSPECTIVE TILT
  // ------------------------------------------------------------------------
  const stageContainer = document.getElementById("stageContainer");
  const orbitalNodes = document.querySelectorAll(".u-node");

  if (stageContainer) {
    stageContainer.addEventListener("mousemove", (e) => {
      const rect = stageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (cursorSpot) {
        cursorSpot.style.transform = `translate(${x}px, ${y}px)`;
        cursorSpot.style.opacity = "1";
      }

      // Subtle dynamic 3D tilt on hovered node
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;

      orbitalNodes.forEach(node => {
        if (node.matches(":hover")) {
          const tiltX = -deltaY * 16;
          const tiltY = deltaX * 16;
          const link = node.querySelector("a");
          if (link) {
            link.style.transform = `perspective(700px) translateZ(42px) rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg) scale(1.12)`;
          }
        }
      });
    });

    stageContainer.addEventListener("mouseleave", () => {
      if (cursorSpot) cursorSpot.style.opacity = "0";
      orbitalNodes.forEach(node => {
        const link = node.querySelector("a");
        if (link) link.style.transform = "";
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. LIVE FPS BENCHMARK & DIAGNOSTIC PROFILER
  // ------------------------------------------------------------------------
  let frameCount = 0;
  let lastTime = performance.now();
  let currentFps = 60;

  const menuFpsVal = document.getElementById("menuFpsVal");
  const menuFpsDot = document.getElementById("menuFpsDot");
  const pinnedFpsVal = document.getElementById("pinnedFpsVal");
  const fpsBadge = document.getElementById("fpsBadge");
  const fpsStatusText = document.getElementById("fpsStatusText");
  const pinFpsToggle = document.getElementById("pinFpsToggle");

  // Load pinned state from preferences
  const savedPrefs = JSON.parse(localStorage.getItem("adhi_prefs") || "{}");
  if (savedPrefs.pinFps && fpsBadge && pinFpsToggle) {
    fpsBadge.classList.remove("hidden");
    pinFpsToggle.classList.add("active");
  }

  if (pinFpsToggle) {
    pinFpsToggle.addEventListener("click", () => {
      const isPinned = fpsBadge.classList.toggle("hidden");
      pinFpsToggle.classList.toggle("active", !isPinned);
      
      const prefs = JSON.parse(localStorage.getItem("adhi_prefs") || "{}");
      prefs.pinFps = !isPinned;
      localStorage.setItem("adhi_prefs", JSON.stringify(prefs));
    });
  }

  function fpsLoop(now) {
    frameCount++;
    if (now - lastTime >= 500) {
      currentFps = Math.round((frameCount * 1000) / (now - lastTime));
      frameCount = 0;
      lastTime = now;

      const toneColor = currentFps >= 55 ? "#4ade80" : currentFps >= 30 ? "#facc15" : "#fb7185";
      const statusMsg = currentFps >= 55 ? "Fluid GPU frame delivery (60+ FPS)" : currentFps >= 30 ? "Balanced performance" : "Frame drops detected";

      if (menuFpsVal) menuFpsVal.textContent = currentFps;
      if (pinnedFpsVal) pinnedFpsVal.textContent = currentFps;
      if (fpsStatusText) fpsStatusText.textContent = statusMsg;

      if (menuFpsDot) {
        menuFpsDot.style.background = toneColor;
        menuFpsDot.style.boxShadow = `0 0 8px ${toneColor}`;
      }
      const pinnedDot = fpsBadge ? fpsBadge.querySelector(".fps-dot") : null;
      if (pinnedDot) {
        pinnedDot.style.background = toneColor;
        pinnedDot.style.boxShadow = `0 0 8px ${toneColor}`;
      }
    }
    requestAnimationFrame(fpsLoop);
  }
  requestAnimationFrame(fpsLoop);

  // ------------------------------------------------------------------------
  // 4. THEME & SETTINGS MANAGER
  // ------------------------------------------------------------------------
  const themeBtn = document.getElementById("themeBtn");
  const themePanel = document.getElementById("themePanel");
  const themeOptBtns = document.querySelectorAll(".theme-opt-btn");

  if (themeBtn && themePanel) {
    themeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = themePanel.classList.toggle("open");
      themeBtn.setAttribute("aria-expanded", isOpen);
      themePanel.toggleAttribute("inert", !isOpen);
    });

    document.addEventListener("click", (e) => {
      if (!themePanel.contains(e.target) && !themeBtn.contains(e.target)) {
        themePanel.classList.remove("open");
        themeBtn.setAttribute("aria-expanded", "false");
        themePanel.setAttribute("inert", "");
      }
    });

    themeOptBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const themeVal = btn.getAttribute("data-theme-val");
        let activeTheme = themeVal;
        if (themeVal === "system") {
          activeTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        }
        document.documentElement.dataset.theme = activeTheme;

        // Persist
        const prefs = JSON.parse(localStorage.getItem("adhi_prefs") || "{}");
        prefs.theme = themeVal;
        localStorage.setItem("adhi_prefs", JSON.stringify(prefs));

        themeOptBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        themePanel.classList.remove("open");
        themePanel.setAttribute("inert", "");
        themeBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Text Scaling (S, M, L)
  const textSizeGroup = document.getElementById("textSizeGroup");
  if (textSizeGroup) {
    const textBtns = textSizeGroup.querySelectorAll("button");
    textBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const opt = btn.getAttribute("data-text-opt");
        document.documentElement.dataset.text = opt;

        const prefs = JSON.parse(localStorage.getItem("adhi_prefs") || "{}");
        prefs.text = opt;
        localStorage.setItem("adhi_prefs", JSON.stringify(prefs));

        textBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }

  // Navigation Drawer Toggle
  const menuToggle = document.getElementById("menuToggle");
  const menuPanel = document.getElementById("menuPanel");
  const menuClose = document.getElementById("menuClose");

  if (menuToggle && menuPanel) {
    function toggleDrawer(open) {
      menuPanel.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", open);
      menuPanel.toggleAttribute("inert", !open);
    }

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menuPanel.classList.contains("open");
      toggleDrawer(!isOpen);
    });

    if (menuClose) {
      menuClose.addEventListener("click", () => toggleDrawer(false));
    }

    document.addEventListener("click", (e) => {
      if (!menuPanel.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleDrawer(false);
      }
    });

    // Close on navigation link click
    menuPanel.querySelectorAll(".menu-nav-item").forEach(link => {
      link.addEventListener("click", () => toggleDrawer(false));
    });
  }

  // ------------------------------------------------------------------------
  // 5. INQUIRY BASKET ("+ ADD TO MESSAGE" CONVERSION FUNNEL)
  // ------------------------------------------------------------------------
  const basketPill = document.getElementById("inquiryBasket");
  const basketCount = document.getElementById("basketCount");
  const basketSendBtn = document.getElementById("basketSendBtn");
  const basketClearBtn = document.getElementById("basketClearBtn");
  const addButtons = document.querySelectorAll(".btn-add-inquiry");
  const directWaBtn = document.getElementById("directWaBtn");
  const directEmailBtn = document.getElementById("directEmailBtn");

  const selectedItems = new Set();

  function updateBasketUI() {
    const count = selectedItems.size;
    if (basketCount) basketCount.textContent = count;
    
    if (count > 0) {
      basketPill.classList.remove("hidden");
    } else {
      basketPill.classList.add("hidden");
    }

    // Format query text for WhatsApp & Email
    const itemList = Array.from(selectedItems);
    let messageText = "Hi Adhi, I explored your portfolio and I would like to discuss working on:";
    if (itemList.length > 0) {
      messageText += "\n" + itemList.map((item, idx) => `• ${item}`).join("\n");
      messageText += "\n\nLet's connect!";
    } else {
      messageText = "Hi Adhi, I saw your portfolio and would like to connect!";
    }

    const encodedMsg = encodeURIComponent(messageText);
    
    // Default phone placeholder or custom direct link
    const waUrl = `https://wa.me/?text=${encodedMsg}`;
    const emailUrl = `mailto:contact@adhiboss.com?subject=Collaboration%20Inquiry&body=${encodedMsg}`;

    if (basketSendBtn) {
      basketSendBtn.onclick = () => window.open(waUrl, "_blank");
    }
    if (directWaBtn) {
      directWaBtn.href = waUrl;
    }
    if (directEmailBtn) {
      directEmailBtn.href = emailUrl;
    }
  }

  addButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const itemName = btn.getAttribute("data-item");
      if (!itemName) return;

      if (selectedItems.has(itemName)) {
        selectedItems.delete(itemName);
        btn.classList.remove("added");
        btn.innerHTML = `<span>+</span> Add to message`;
      } else {
        selectedItems.add(itemName);
        btn.classList.add("added");
        btn.innerHTML = `<span>✓</span> Added`;
      }

      updateBasketUI();
    });
  });

  if (basketClearBtn) {
    basketClearBtn.addEventListener("click", () => {
      selectedItems.clear();
      addButtons.forEach(btn => {
        btn.classList.remove("added");
        btn.innerHTML = `<span>+</span> Add to message`;
      });
      updateBasketUI();
    });
  }

  console.log("🚀 Adhi Studio initialized successfully with 60FPS scroll zoom & lead generation engine.");
});
