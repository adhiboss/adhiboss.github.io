// --- Mobile Navigation ---
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('mobileNavOverlay');
    const closeBtn = document.getElementById('mobileNavClose');

    if (!hamburger || !overlay) return;

    hamburger.addEventListener('click', () => {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close on backdrop tap
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

function closeMobileNav() {
    const overlay = document.getElementById('mobileNavOverlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
}

// --- Three.js Background Logic ---
function initBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    const container = document.getElementById('bg-canvas');
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const cyberColors = [
        [0, 240/255, 255/255], // Cyan
        [255/255, 0, 170/255], // Magenta
        [0, 255/255, 136/255]  // Green
    ];
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        
        const color = cyberColors[Math.floor(Math.random() * cyberColors.length)];
        colors[i * 3] = color[0];
        colors[i * 3 + 1] = color[1];
        colors[i * 3 + 2] = color[2];
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    camera.position.z = 15;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        requestAnimationFrame(animate);
        
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;
        
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- Scroll Animation Logic ---
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
        nav.style.boxShadow = 'none';
    }
});


// --- Spider-Man Scroll Companion ---
function initSpiderman() {
    const spidey = document.getElementById('spiderman');
    const webSvg = document.getElementById('spidey-web');
    const label = document.getElementById('spideyLabel');
    if (!spidey || !webSvg || !label) return;

    const sectionIds = ['home', 'journey', 'skills', 'projects', 'certifications', 'achievements', 'contact'];
    const sectionLabels = {
        home: '🏠 Home',
        journey: '🎓 Journey',
        skills: '⚡ Skills',
        projects: '💻 Projects',
        certifications: '📜 Certs',
        achievements: '🏆 Achievements',
        contact: '📧 Contact'
    };

    let lastSection = '';
    let swingTimeout = null;
    let webLineTimeout = null;

    // Set SVG namespace for web lines
    webSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    function getVisibleSection() {
        const scrollY = window.scrollY + window.innerHeight * 0.4;
        let current = sectionIds[0];

        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= scrollY) {
                current = id;
            }
        }
        return current;
    }

    function getScrollProgress() {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        return Math.min(Math.max(window.scrollY / docHeight, 0), 1);
    }

    function drawWebLine(spideyTop, targetX, targetY) {
        // Clear old web lines
        while (webSvg.firstChild) {
            webSvg.removeChild(webSvg.firstChild);
        }

        const startX = 50; // Spider-Man's hand position (roughly)
        const startY = spideyTop + 20; // From arm level

        // Create curved web line path
        const midX = (startX + targetX) / 2 + 30;
        const midY = (startY + targetY) / 2 - 40;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M${startX},${startY} Q${midX},${midY} ${targetX},${targetY}`);
        path.setAttribute('class', 'spidey-web-line');
        path.style.opacity = '0';
        webSvg.appendChild(path);

        // Animate web line appearing
        requestAnimationFrame(() => {
            path.style.transition = 'opacity 0.3s';
            path.style.opacity = '1';
        });

        // Fade out web line after a bit
        if (webLineTimeout) clearTimeout(webLineTimeout);
        webLineTimeout = setTimeout(() => {
            path.style.opacity = '0';
            setTimeout(() => {
                if (path.parentNode) path.parentNode.removeChild(path);
            }, 300);
        }, 1200);
    }

    function updateSpiderman() {
        const progress = getScrollProgress();
        const currentSection = getVisibleSection();

        // Position Spider-Man along the viewport height based on scroll
        const viewH = window.innerHeight;
        const topOffset = 80 + progress * (viewH - 180);
        spidey.style.top = topOffset + 'px';

        // Position the label next to Spider-Man
        label.style.top = (topOffset + 20) + 'px';

        // If section changed, trigger swing animation + web shot
        if (currentSection !== lastSection) {
            // Swing animation
            spidey.classList.remove('swinging');
            void spidey.offsetWidth; // force reflow
            spidey.classList.add('swinging');

            if (swingTimeout) clearTimeout(swingTimeout);
            swingTimeout = setTimeout(() => {
                spidey.classList.remove('swinging');
            }, 600);

            // Update label
            label.textContent = sectionLabels[currentSection] || '🕷️';
            label.classList.add('visible');
            setTimeout(() => label.classList.remove('visible'), 2000);

            // Draw web line to the target section header
            const targetEl = document.getElementById(currentSection);
            if (targetEl) {
                const rect = targetEl.getBoundingClientRect();
                const targetX = Math.min(rect.left + 100, window.innerWidth * 0.4);
                const targetY = rect.top + 30;
                drawWebLine(topOffset, targetX, targetY);
            }

            lastSection = currentSection;
        }
    }

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateSpiderman();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial position
    updateSpiderman();
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initBackground();
    initScrollAnimations();
    initSpiderman();
});
