// ===== INIT AOS =====
AOS.init({
    duration: 800,
    once: false,
    mirror: true
});

// ===== EMAILJS INIT =====
emailjs.init("ZvcX816KIJJeEobus");

// ===== PARTICLES =====
function createParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 10 + 's';
        particles.appendChild(p);
    }
}
createParticles();

// ===== OPENING + VOICE =====
setTimeout(() => {
    document.getElementById('openingOverlay').classList.add('hidden');
    
    setTimeout(() => {
        const text = "Halo, saya Indra Abdul Hakim, Mahasiswa Teknik Industri, selamat datang, dan Terima kasih untuk dukungannya.";
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'id-ID';
            utterance.rate = 0.9;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    }, 1000);
}, 3000);

// ===== WORD TYPING =====
const wordTyping = document.getElementById('wordTyping');
const words = ['Industrial', 'Engineer', '•', 'Bengkel', 'Mobil', '•', 'Admin', '•', 'CNC', 'Operator'];
wordTyping.innerHTML = '';
words.forEach((word, i) => {
    const span = document.createElement('span');
    span.textContent = word + ' ';
    span.style.animationDelay = i * 0.15 + 's';
    wordTyping.appendChild(span);
});

// ===== ID CARD DRAG =====
const idCard = document.getElementById('idCardDragable');
const dragHandle = document.getElementById('dragHandle');
let isDragging = false;
let startY, startTop;
let currentTop = 0;

dragHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    startTop = currentTop;
    idCard.style.transition = 'none';
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const delta = e.clientY - startY;
    let newTop = startTop + delta;
    newTop = Math.max(-50, Math.min(newTop, 200));
    currentTop = newTop;
    idCard.style.top = newTop + 'px';
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        idCard.style.transition = 'top 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        setTimeout(() => {
            currentTop = 0;
            idCard.style.top = '0px';
        }, 1000);
    }
});

// Touch events
dragHandle.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDragging = true;
    startY = e.touches[0].clientY;
    startTop = currentTop;
    idCard.style.transition = 'none';
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const delta = e.touches[0].clientY - startY;
    let newTop = startTop + delta;
    newTop = Math.max(-50, Math.min(newTop, 200));
    currentTop = newTop;
    idCard.style.top = newTop + 'px';
});

document.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        idCard.style.transition = 'top 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        setTimeout(() => {
            currentTop = 0;
            idCard.style.top = '0px';
        }, 1000);
    }
});

// ===== SCROLL COUNTER =====
function startCounters() {
    document.querySelectorAll('.gauge').forEach(gauge => {
        const rect = gauge.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && !gauge.classList.contains('counted')) {
            gauge.classList.add('counted');
            const target = parseFloat(gauge.dataset.target);
            const valueEl = gauge.querySelector('.gauge-value');
            let current = 0;
            const inc = target / 80;
            const timer = setInterval(() => {
                current += inc;
                if (current >= target) {
                    valueEl.textContent = target.toFixed(1) + '%';
                    clearInterval(timer);
                } else {
                    valueEl.textContent = current.toFixed(1) + '%';
                }
            }, 20);
        }
    });
}
window.addEventListener('scroll', startCounters);
startCounters();

// ===== CHARTS =====
function createCharts() {
    new Chart(document.getElementById('projectChart1'), {
        type: 'line',
        data: { labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'], datasets: [{ data: [65, 70, 75, 80], borderColor: '#5a9eff', backgroundColor: 'rgba(90,158,255,0.1)', tension: 0.4, fill: true }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
    new Chart(document.getElementById('projectChart2'), {
        type: 'bar',
        data: { labels: ['Bulan 1', 'Bulan 3', 'Bulan 6', 'Bulan 12'], datasets: [{ data: [70, 80, 85, 90], backgroundColor: '#5a9eff', borderRadius: 8 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
    new Chart(document.getElementById('projectChart3'), {
        type: 'line',
        data: { labels: ['Tahun 1', 'Tahun 2', 'Tahun 3'], datasets: [{ data: [85, 92, 98], borderColor: '#5a9eff', backgroundColor: 'rgba(90,158,255,0.1)', tension: 0.4, fill: true }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
}
setTimeout(createCharts, 500);

// ===== GAME =====
let gameScore = 0;
let gameLevel = 1;
let gameActive = false;
let gameInterval;
let collector = document.getElementById('collector');
let collectorArea = document.getElementById('collectorArea');

function moveCollector(e) {
    if (!gameActive) return;
    const rect = collectorArea.getBoundingClientRect();
    let x = e.clientX - rect.left - 40;
    x = Math.max(0, Math.min(x, rect.width - 80));
    collector.style.left = x + 'px';
}

function moveCollectorTouch(e) {
    e.preventDefault();
    if (!gameActive) return;
    const rect = collectorArea.getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left - 40;
    x = Math.max(0, Math.min(x, rect.width - 80));
    collector.style.left = x + 'px';
}

function createItem() {
    if (!gameActive) return;
    
    const isGood = Math.random() > 0.3;
    const item = document.createElement('div');
    item.className = 'item' + (isGood ? '' : ' bad-item');
    item.innerHTML = isGood ? '⚙️' : '💥';
    
    const left = Math.random() * (collectorArea.offsetWidth - 30);
    item.style.left = left + 'px';
    item.style.top = '-30px';
    
    collectorArea.appendChild(item);
    
    let pos = -30;
    const fallInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(fallInterval);
            item.remove();
            return;
        }
        
        pos += 3 + gameLevel;
        item.style.top = pos + 'px';
        
        const itemRect = item.getBoundingClientRect();
        const collectorRect = collector.getBoundingClientRect();
        
        if (pos > collectorArea.offsetHeight - 80 && 
            itemRect.left < collectorRect.right && 
            itemRect.right > collectorRect.left) {
            
            if (isGood) {
                gameScore += 10 * gameLevel;
            } else {
                gameScore = Math.max(0, gameScore - 20);
            }
            
            document.getElementById('gameScore').textContent = gameScore;
            clearInterval(fallInterval);
            item.remove();
        }
        
        if (pos > collectorArea.offsetHeight) {
            clearInterval(fallInterval);
            item.remove();
        }
    }, 50);
}

function startGame() {
    gameActive = true;
    gameScore = 0;
    gameLevel = 1;
    document.getElementById('gameScore').textContent = '0';
    document.getElementById('gameLevel').textContent = '1';
    
    document.querySelectorAll('.item').forEach(item => item.remove());
    
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(createItem, 1000);
    
    setTimeout(() => {
        if (gameActive) {
            gameLevel = 2;
            document.getElementById('gameLevel').textContent = '2';
        }
    }, 15000);
    
    setTimeout(() => {
        if (gameActive) {
            gameLevel = 3;
            document.getElementById('gameLevel').textContent = '3';
        }
    }, 30000);
}

function resetGame() {
    gameActive = false;
    gameScore = 0;
    gameLevel = 1;
    document.getElementById('gameScore').textContent = '0';
    document.getElementById('gameLevel').textContent = '1';
    document.querySelectorAll('.item').forEach(item => item.remove());
    if (gameInterval) clearInterval(gameInterval);
}

collectorArea.addEventListener('mousemove', moveCollector);
collectorArea.addEventListener('touchmove', moveCollectorTouch);

// ===== FIX AUDIO =====
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.volume = 0.3;
        
        function playAudio() {
            audio.play().catch(e => {
                console.log('Autoplay failed:', e);
            });
        }
        
        playAudio();
        
        // Play on first click
        document.body.addEventListener('click', function playOnClick() {
            audio.play();
            document.body.removeEventListener('click', playOnClick);
        }, { once: true });
    }
});
// ===== CHATBOT DENGAN S.ID API =====
async function getAIResponse(message) {
    try {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Chat error:', error);
        return "Maaf, lagi error. Coba lagi ya!";
    }
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = `<i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>`;
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;
    
    if (sender === 'user') {
        div.appendChild(content);
        div.appendChild(avatar);
    } else {
        div.appendChild(avatar);
        div.appendChild(content);
    }
    
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<div class="message-avatar"><i class="fas fa-robot"></i></div><div class="typing-indicator"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    chatInput.value = '';
    showTypingIndicator();
    
    const response = await getAIResponse(text);
    
    document.getElementById('typingIndicator')?.remove();
    addMessage(response, 'bot');
}

sendChatBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
// ===== ENERGY SECTION =====
const energySlider = document.getElementById('energySlider');
const energyDisplay = document.getElementById('energyDisplay');
const sendBtn = document.getElementById('sendEnergyBtn');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');
const lastMessage = document.getElementById('lastMessagePreview');

energySlider.addEventListener('input', (e) => {
    energyDisplay.textContent = e.target.value + '%';
});

sendBtn.addEventListener('click', () => {
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const message = document.getElementById('messageText').value;
    
    if (!name || !email || !message) {
        alert('Isi semua field!');
        return;
    }
    
    emailjs.send("service_mfww4ci", "template_ld6w3vf", {
        from_name: name,
        from_email: email,
        message: message
    }).then(() => {
        // AMBIL NILAI ENERGY SAAT INI
        let currentEnergy = parseInt(energySlider.value);
        
        // TAMBAH 5% (MAKSIMAL 100%)
        let newEnergy = Math.min(currentEnergy + 5, 100);
        
        // UPDATE SLIDER DAN TAMPILAN
        energySlider.value = newEnergy;
        energyDisplay.textContent = newEnergy + '%';
        
        // NOTIFIKASI
        notification.classList.add('show');
        notificationMessage.textContent = 'Pesan terkirim! Energy naik 5%';
        
        // PREVIEW PESAN
        lastMessage.innerHTML = `<p>"${message.substring(0, 30)}..." - ${name}</p>`;
        
        // RESET FORM
        document.getElementById('senderName').value = '';
        document.getElementById('senderEmail').value = '';
        document.getElementById('messageText').value = '';
        
        setTimeout(() => notification.classList.remove('show'), 3000);
    }).catch((error) => {
        alert('Error: ' + error);
        console.error(error);
    });
});S
    
    if (!name || !email || !message) {
        alert('Isi semua field!');
        return;
    }
    
    emailjs.send("service_mfww4ci", "template_ld6w3vf", {
        from_name: name,
        from_email: email,
        message: message
    }).then(() => {
        notification.classList.add('show');
        notificationMessage.textContent = 'Pesan terkirim!';
        lastMessage.innerHTML = `<p>"${message.substring(0, 30)}..." - ${name}</p>`;
        
        document.getElementById('senderName').value = '';
        document.getElementById('senderEmail').value = '';
        document.getElementById('messageText').value = '';
        
        setTimeout(() => notification.classList.remove('show'), 3000);
    }).catch((error) => {
        alert('Error: ' + error);
        console.error(error);
    });
});
// ===== MULTI LANGUAGE SUPPORT =====
const translations = {
    id: {
        // Navbar
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        game: "Game",
        chat: "Chat",
        support: "Support",
        
        // Hero
        heroSub: "Mahasiswa Teknik Industri dengan pengalaman 3+ tahun di industri manufaktur otomotif.",
        
        // About
        aboutTitle: "Tentang Saya",
        aboutText: "Mahasiswa Teknik Industri dengan pengalaman 3+ tahun di dunia industri, mulai dari bengkel mobil, administrasi penjualan, hingga manufacturing otomotif. Memiliki minat yang kuat dalam mengoptimalkan proses industri melalui pendekatan data-driven dan teknologi Industry 5.0.",
        
        // Interest Cards
        qualityTitle: "Quality Management & Risk",
        qualityDesc: "Implementasi Six Sigma, FMEA, dan sistem manajemen mutu untuk meningkatkan kualitas produk dan mengurangi risiko operasional.",
        supplyTitle: "Supply Chain",
        supplyDesc: "Optimasi logistik, inventory management, dan distribusi untuk efisiensi biaya dan waktu dalam rantai pasok.",
        dataTitle: "Data Analysis",
        dataDesc: "Predictive analytics, statistical process control, dan visualisasi data untuk pengambilan keputusan berbasis data.",
        
        // Dashboard
        production: "PRODUCTION",
        uptime: "UPTIME",
        quality: "QUALITY",
        oee: "OEE",
        
        // Skills Section
        skillsTitle: "Core Competencies",
        manufacturing: "Manufacturing",
        dataAnalysis: "Data Analysis",
        industrialSystems: "Industrial Systems",
        
        // Projects
        projectsTitle: "Pengalaman & Proyek",
        project1Title: "PKL - Bengkel Mobil",
        project1Status: "3 BULAN",
        project1Desc: "Praktik Kerja Lapangan di bengkel mobil. Melakukan perawatan dan perbaikan kendaraan, diagnosa kerusakan mesin, serta membantu teknisi dalam perbaikan sistem kelistrikan dan mekanik mobil.",
        project2Title: "Admin Penjualan",
        project2Status: "1 TAHUN",
        project2Desc: "Mengelola administrasi penjualan, input data transaksi, membuat laporan penjualan harian, serta berkoordinasi dengan tim logistik untuk pengiriman barang.",
        project3Title: "CNC Operator",
        project3Status: "3 TAHUN",
        project3Desc: "Mengoperasikan mesin CNC 5-axis untuk komponen otomotif. Melakukan setup mesin, setting tool, quality control hasil produksi, dan maintenance rutin.",
        
        // Game
        gameTitle: "Industrial Collector",
        gameScore: "Score",
        gameLevel: "Level",
        startGame: "Mulai Game",
        reset: "Reset",
        
        // Chat
        chatTitle: "Chat AI",
        chatBadge: "Powered by Gemini",
        chatPlaceholder: "Ketik pesan...",
        
        // Support
        supportTitle: "Kirim Dukungan",
        nameLabel: "Nama",
        namePlaceholder: "Nama kamu...",
        emailLabel: "Email",
        emailPlaceholder: "email@example.com",
        messageLabel: "Pesan",
        messagePlaceholder: "Pesan dukungan...",
        sendButton: "Kirim",
        energyLevel: "Energy Level",
        noMessage: "Belum ada pesan...",
        
        // Footer
        footerRights: "© 2026 indra abdul hakim · industrial engineer"
    },
    
    en: {
        // Navbar
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        game: "Game",
        chat: "Chat",
        support: "Support",
        
        // Hero
        heroSub: "Industrial Engineering student with 3+ years experience in automotive manufacturing industry.",
        
        // About
        aboutTitle: "About Me",
        aboutText: "Industrial Engineering student with 3+ years experience in various industries, from automotive workshop, sales administration, to automotive manufacturing. Strong interest in optimizing industrial processes through data-driven approaches and Industry 5.0 technology.",
        
        // Interest Cards
        qualityTitle: "Quality Management & Risk",
        qualityDesc: "Implementation of Six Sigma, FMEA, and quality management systems to improve product quality and reduce operational risks.",
        supplyTitle: "Supply Chain",
        supplyDesc: "Logistics optimization, inventory management, and distribution for cost and time efficiency in the supply chain.",
        dataTitle: "Data Analysis",
        dataDesc: "Predictive analytics, statistical process control, and data visualization for data-driven decision making.",
        
        // Dashboard
        production: "PRODUCTION",
        uptime: "UPTIME",
        quality: "QUALITY",
        oee: "OEE",
        
        // Skills Section
        skillsTitle: "Core Competencies",
        manufacturing: "Manufacturing",
        dataAnalysis: "Data Analysis",
        industrialSystems: "Industrial Systems",
        
        // Projects
        projectsTitle: "Experience & Projects",
        project1Title: "Internship - Auto Workshop",
        project1Status: "3 MONTHS",
        project1Desc: "Internship at an auto workshop. Performed vehicle maintenance and repair, engine diagnostics, and assisted technicians in electrical and mechanical systems repair.",
        project2Title: "Sales Admin",
        project2Status: "1 YEAR",
        project2Desc: "Managed sales administration, transaction data entry, daily sales reports, and coordinated with logistics team for goods delivery.",
        project3Title: "CNC Operator",
        project3Status: "3 YEARS",
        project3Desc: "Operated 5-axis CNC machines for automotive components. Performed machine setup, tool setting, quality control of production results, and routine maintenance.",
        
        // Game
        gameTitle: "Industrial Collector",
        gameScore: "Score",
        gameLevel: "Level",
        startGame: "Start Game",
        reset: "Reset",
        
        // Chat
        chatTitle: "Chat AI",
        chatBadge: "Powered by Gemini",
        chatPlaceholder: "Type a message...",
        
        // Support
        supportTitle: "Send Support",
        nameLabel: "Name",
        namePlaceholder: "Your name...",
        emailLabel: "Email",
        emailPlaceholder: "email@example.com",
        messageLabel: "Message",
        messagePlaceholder: "Support message...",
        sendButton: "Send",
        energyLevel: "Energy Level",
        noMessage: "No messages yet...",
        
        // Footer
        footerRights: "© 2026 indra abdul hakim · industrial engineer"
    }
};

// Fungsi untuk update bahasa
function updateLanguage(lang) {
    const t = translations[lang];
    
    // Update navbar
    document.querySelectorAll('.nav-menu .nav-item').forEach((item, index) => {
        const keys = ['home', 'about', 'skills', 'projects', 'game', 'chat', 'support'];
        item.textContent = t[keys[index]];
    });
    
    // Update hero
    document.querySelector('.hero-description').textContent = t.heroSub;
    
    // Update about section
    document.querySelector('.about-title').textContent = t.aboutTitle;
    document.querySelector('.about-text').innerHTML = t.aboutText;
    
    // Update interest cards
    const interestTitles = document.querySelectorAll('.interest-card h4');
    const interestDesc = document.querySelectorAll('.interest-card p');
    if (interestTitles.length >= 3) {
        interestTitles[0].textContent = t.qualityTitle;
        interestTitles[1].textContent = t.supplyTitle;
        interestTitles[2].textContent = t.dataTitle;
        
        interestDesc[0].textContent = t.qualityDesc;
        interestDesc[1].textContent = t.supplyDesc;
        interestDesc[2].textContent = t.dataDesc;
    }
    
    // Update dashboard titles
    const gaugeTitles = document.querySelectorAll('.gauge-title');
    if (gaugeTitles.length >= 4) {
        gaugeTitles[0].textContent = t.production;
        gaugeTitles[1].textContent = t.uptime;
        gaugeTitles[2].textContent = t.quality;
        gaugeTitles[3].textContent = t.oee;
    }
    
    // Update skills section
    document.querySelector('.section-title').textContent = t.skillsTitle;
    const skillHeaders = document.querySelectorAll('.skill-header h3');
    if (skillHeaders.length >= 3) {
        skillHeaders[0].textContent = t.manufacturing;
        skillHeaders[1].textContent = t.dataAnalysis;
        skillHeaders[2].textContent = t.industrialSystems;
    }
    
    // Update projects section
    document.querySelectorAll('.section-title')[1].textContent = t.projectsTitle;
    const projectTitles = document.querySelectorAll('.project-header h3');
    const projectStatus = document.querySelectorAll('.project-status');
    const projectDesc = document.querySelectorAll('.project-description');
    
    if (projectTitles.length >= 3) {
        projectTitles[0].textContent = t.project1Title;
        projectTitles[1].textContent = t.project2Title;
        projectTitles[2].textContent = t.project3Title;
        
        projectStatus[0].textContent = t.project1Status;
        projectStatus[1].textContent = t.project2Status;
        projectStatus[2].textContent = t.project3Status;
        
        projectDesc[0].textContent = t.project1Desc;
        projectDesc[1].textContent = t.project2Desc;
        projectDesc[2].textContent = t.project3Desc;
    }
    
    // Update game section
    document.querySelector('.game-header h2').textContent = t.gameTitle;
    const gameStatLabels = document.querySelectorAll('.game-stat-label');
    if (gameStatLabels.length >= 2) {
        gameStatLabels[0].textContent = t.gameScore;
        gameStatLabels[1].textContent = t.gameLevel;
    }
    document.getElementById('startGameBtn').innerHTML = `<i class="fas fa-play"></i> ${t.startGame}`;
    document.getElementById('resetGameBtn').innerHTML = `<i class="fas fa-redo-alt"></i> ${t.reset}`;
    
    // Update chat section
    document.querySelector('.chat-header h2').innerHTML = `${t.chatTitle} <span class="ai-badge">${t.chatBadge}</span>`;
    document.getElementById('chatInput').placeholder = t.chatPlaceholder;
    
    // Update support section
    document.querySelector('.energy-header h2').textContent = t.supportTitle;
    const formLabels = document.querySelectorAll('.form-group label');
    if (formLabels.length >= 3) {
        formLabels[0].textContent = t.nameLabel;
        formLabels[1].textContent = t.emailLabel;
        formLabels[2].textContent = t.messageLabel;
    }
    document.getElementById('senderName').placeholder = t.namePlaceholder;
    document.getElementById('senderEmail').placeholder = t.emailPlaceholder;
    document.getElementById('messageText').placeholder = t.messagePlaceholder;
    document.querySelector('.send-btn').innerHTML = `<i class="fas fa-paper-plane"></i> ${t.sendButton}`;
    
    const energyPanel = document.querySelector('.energy-panel h3');
    if (energyPanel) energyPanel.textContent = t.energyLevel;
    
    if (lastMessage && lastMessage.innerHTML.includes('Belum ada pesan')) {
        lastMessage.innerHTML = `<p>${t.noMessage}</p>`;
    }
    
    // Update footer
    document.querySelector('.footer p').textContent = t.footerRights;
}

// Deteksi bahasa browser
function detectBrowserLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    return userLang.startsWith('id') ? 'id' : 'en';
}

// Event listener untuk tombol bahasa
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        updateLanguage(this.dataset.lang);
    });
});

// Set bahasa awal berdasarkan browser
const defaultLang = detectBrowserLanguage();
updateLanguage(defaultLang);
document.querySelector(`.lang-btn[data-lang="${defaultLang}"]`).classList.add('active');