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
        const text = "Halo, saya Indra Abdul Hakim, Mahasiswa Teknik Industri dengan pengalaman di bengkel mobil, admin penjualan, dan CNC operator. Terima kasih untuk dukungannya.";
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

// ===== CHATBOT =====
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');

// Fungsi offline sementara sampai Netlify Functions jalan
function getAIResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('halo') || lowerMsg.includes('hai') || lowerMsg.includes('hi')) {
        return "Halo juga! Ada yang bisa gue bantu?";
    } else if (lowerMsg.includes('siapa') || lowerMsg.includes('nama')) {
        return "Gue Indra Abdul Hakim, industrial engineer!";
    } else if (lowerMsg.includes('skill') || lowerMsg.includes('bisa')) {
        return "Skill gue: Manufacturing, Data Analysis, Industrial Systems. Lengkapnya di atas!";
    } else if (lowerMsg.includes('game')) {
        return "Coba main game Industrial Collector di atas! Seru loh!";
    } else if (lowerMsg.includes('makasih') || lowerMsg.includes('thanks')) {
        return "Sama-sama! Jangan lupa kirim dukungan ya!";
    } else {
        return "Maaf, gue belum paham. Coba tanya yang lain ya!";
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

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    chatInput.value = '';
    showTypingIndicator();
    
    setTimeout(() => {
        document.getElementById('typingIndicator')?.remove();
        const response = getAIResponse(text);
        addMessage(response, 'bot');
    }, 1000);
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