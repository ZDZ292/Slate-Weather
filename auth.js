let inputPin = "";

// Keyboard Support
window.addEventListener('keydown', (e) => {
    if (document.getElementById('lock-screen').classList.contains('active')) {
        if (e.key >= '0' && e.key <= '9') addPin(e.key);
        if (e.key === 'Enter') submitPin();
        if (e.key === 'Backspace') clearPin();
    }
});

function addPin(num) {
    if (inputPin.length < 4) {
        inputPin += num;
        updateDots();
    }
}

function updateDots() {
    const dots = document.querySelectorAll('#pin-dots span');
    dots.forEach((dot, i) => dot.className = i < inputPin.length ? 'filled' : '');
}

function submitPin() {
    if (inputPin === CONFIG.PASSCODE) {
        const ls = document.getElementById('lock-screen');
        ls.classList.add('unlocked');
        setTimeout(() => { ls.classList.remove('active'); initDashboard(); }, 500);
    } else {
        clearPin();
    }
}

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    document.getElementById('lock-time').innerText = time;
    document.getElementById('lock-date').innerText = date;
}
setInterval(updateClock, 1000);
