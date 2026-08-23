// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeBtn = document.getElementById('mobileNavClose');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  }
}

function closeMobileNav() {
  if (mobileNav) mobileNav.classList.remove('open');
}

// Batman Easter Egg
console.log("%c🦇 BATMAN PROTOCOL INITIALIZED 🦇\n%c\"I am vengeance. I am the night. I am Adhi Gowda.\"", 
  "color: #e3b341; font-size: 14px; font-weight: bold; background: #06090e; padding: 4px 8px; border-radius: 4px;",
  "color: #7ee787; font-size: 12px; font-style: italic;");
