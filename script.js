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

// --- Linux Terminal Typing Animation ---
function initLinuxTerminal() {
    const typingEl = document.getElementById('termTyping');
    const outputEl = document.getElementById('termOutput');
    const cursorEl = typingEl ? typingEl.nextElementSibling : null;
    if (!typingEl || !outputEl) return;

    const commands = [
        {
            cmd: 'uname -a',
            output: ['Linux archlinux 6.7.4-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux']
        },
        {
            cmd: 'neofetch --off',
            output: [
                'OS: Arch Linux x86_64',
                'Kernel: 6.7.4-arch1-1',
                'Shell: bash 5.2.26',
                'DE: GNOME 45.4',
                'Terminal: alacritty',
                'CPU: AMD Ryzen 7 5800X',
                'Memory: 4096MiB / 16384MiB'
            ],
            highlight: [0, 1, 2]
        },
        {
            cmd: 'cat /etc/os-release | head -3',
            output: [
                'NAME="Arch Linux"',
                'PRETTY_NAME="Arch Linux"',
                'ID=arch'
            ]
        },
        {
            cmd: 'uptime',
            output: [' 19:20:34 up 42 days, 3:17,  1 user,  load average: 0.42, 0.38, 0.31']
        },
        {
            cmd: 'echo "I use Linux btw 🐧"',
            output: ['I use Linux btw 🐧'],
            highlight: [0]
        },
        {
            cmd: 'sudo pacman -Syu',
            output: [
                ':: Synchronizing package databases...',
                ' core is up to date',
                ' extra is up to date',
                ':: Starting full system upgrade...',
                ' there is nothing to do'
            ],
            highlight: [4]
        }
    ];

    let cmdIndex = 0;

    async function typeCommand(text) {
        typingEl.textContent = '';
        for (let i = 0; i < text.length; i++) {
            typingEl.textContent += text[i];
            await sleep(40 + Math.random() * 60);
        }
    }

    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    async function showOutput(lines, highlights = []) {
        if (cursorEl) cursorEl.style.display = 'none';
        for (let i = 0; i < lines.length; i++) {
            const div = document.createElement('div');
            div.className = 'term-output-line' + (highlights.includes(i) ? ' output-highlight' : '');
            div.textContent = lines[i];
            outputEl.appendChild(div);
            await sleep(120);
        }
    }

    async function runLoop() {
        while (true) {
            const { cmd, output, highlight } = commands[cmdIndex];
            outputEl.innerHTML = '';
            typingEl.textContent = '';
            if (cursorEl) cursorEl.style.display = 'inline';

            await typeCommand(cmd);
            await sleep(400);
            await showOutput(output, highlight || []);
            await sleep(2500);

            cmdIndex = (cmdIndex + 1) % commands.length;
        }
    }

    // Start when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.disconnect();
                runLoop();
            }
        });
    }, { threshold: 0.2 });

    const section = document.getElementById('linux');
    if (section) observer.observe(section);
}

// --- Kernel/Shell Chat Animation ---
function initKernelChat() {
    const chatBody = document.getElementById('kernelChat');
    if (!chatBody) return;

    const conversation = [
        { sender: 'adhi', msg: 'Hey Kernel, you awake?' },
        { sender: 'kernel', msg: 'I never sleep. I\'ve been running for 42 days straight. What do you need?' },
        { sender: 'adhi', msg: 'Just wanted to say... you\'re amazing. Managing all my processes, memory, drivers...' },
        { sender: 'kernel', msg: 'Flattery won\'t get you more RAM. But thanks. 😏' },
        { sender: 'adhi', msg: 'Shell! Can you run something for me?' },
        { sender: 'shell', msg: 'Sure, I\'m always ready. What command?' },
        { sender: 'adhi', msg: 'echo "I love Linux"' },
        { sender: 'shell', msg: '→ I love Linux ❤️🐧' },
        { sender: 'kernel', msg: 'That command just gave me a warm fuzzy feeling in ring 0.' },
        { sender: 'adhi', msg: 'Kernel, what\'s your favorite food?' },
        { sender: 'kernel', msg: 'Syscalls. I eat them for breakfast, lunch, and dinner. 🍽️' },
        { sender: 'shell', msg: 'He\'s not joking. I feed him thousands per second.' },
        { sender: 'adhi', msg: 'I\'m on WSL right now but I\'m going full Linux soon!' },
        { sender: 'kernel', msg: 'WSL? So you\'re visiting me through a window? Ironic. 🪟' },
        { sender: 'shell', msg: 'Don\'t worry Adhi, we\'ll be your native home soon. 🏠' },
        { sender: 'adhi', msg: 'Can\'t wait to dual-boot. Arch or Ubuntu?' },
        { sender: 'kernel', msg: 'I run the same in both. Pick your poison. ☠️' },
        { sender: 'shell', msg: 'Arch users will tell you about it. Ubuntu users will just get stuff done. 😄' },
        { sender: 'adhi', msg: 'One last thing... sudo make me a sandwich?' },
        { sender: 'shell', msg: '🥪 Here you go. When you say sudo, I listen.' },
        { sender: 'kernel', msg: 'Permission granted. Now stop talking and write some code.' },
    ];

    let lineIndex = 0;
    let running = false;

    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    async function addLine() {
        if (lineIndex >= conversation.length) {
            await sleep(3000);
            chatBody.innerHTML = '';
            lineIndex = 0;
        }

        const { sender, msg } = conversation[lineIndex];
        const avatarEmoji = sender === 'adhi' ? '👤' : sender === 'kernel' ? '🧠' : '⚡';
        const displayName = sender === 'adhi' ? 'Adhi' : sender === 'kernel' ? 'Kernel' : 'Shell';

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble bubble-${sender}`;

        const avatar = document.createElement('span');
        avatar.className = 'chat-bubble-avatar';
        avatar.textContent = avatarEmoji;

        const content = document.createElement('div');
        content.className = 'chat-bubble-content';

        const name = document.createElement('span');
        name.className = 'chat-bubble-name';
        name.textContent = displayName;

        const msgEl = document.createElement('span');
        msgEl.className = 'chat-bubble-msg';
        msgEl.textContent = msg;

        content.appendChild(name);
        content.appendChild(msgEl);
        bubble.appendChild(avatar);
        bubble.appendChild(content);
        chatBody.appendChild(bubble);


        // Auto-scroll
        chatBody.scrollTop = chatBody.scrollHeight;

        lineIndex++;
    }

    async function runChatLoop() {
        running = true;
        while (running) {
            await addLine();
            await sleep(1800 + Math.random() * 800);
        }
    }

    // Start when section scrolls into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !running) {
                observer.disconnect();
                runChatLoop();
            }
        });
    }, { threshold: 0.1 });

    const section = document.getElementById('linux');
    if (section) observer.observe(section);
}

// --- Spider-Man Scroll Companion ---
function initSpiderman() {
    const spidey = document.getElementById('spiderman');
    const webSvg = document.getElementById('spidey-web');
    const label = document.getElementById('spideyLabel');
    if (!spidey || !webSvg || !label) return;

    const sectionIds = ['home', 'journey', 'skills', 'projects', 'certifications', 'achievements', 'linux', 'contact'];
    const sectionLabels = {
        home: '🏠 Home',
        journey: '🎓 Journey',
        skills: '⚡ Skills',
        projects: '💻 Projects',
        certifications: '📜 Certs',
        achievements: '🏆 Achievements',
        linux: '🐧 Linux',
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
    initBackground();
    initScrollAnimations();
    initLinuxTerminal();
    initKernelChat();
    initSpiderman();
});
