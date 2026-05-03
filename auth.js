let inputPin = "";

// Keyboard Support
window.addEventListener('keydown', (e) => {
    if (document.getElementById('lock-screen').classList.contains('active')) {
        if (e.key >= 0 && e.key <= 9) addPin(e.key);
        if (e.key === "Enter") submitPin();
        if (e.key === "Backspace") clearPin();
    }
});

function addPin(val) {
    if (inputPin.length < 4) {
        inputPin += val;
        updateDots();
    }
}

function updateDots() {
    const dots = document.querySelectorAll('#pin-dots span');
    dots.forEach((dot, i) => {
        dot.className = i < inputPin.length ? 'active' : '';
    });
}

function clearPin() {
    inputPin = "";
    updateDots();
}

function submitPin() {
    if (inputPin === CONFIG.PASSCODE) {
        document.getElementById('lock-screen').classList.remove('active');
        document.getElementById('dashboard').classList.remove('hidden');
        initDashboard();
    } else {
        alert("DENIED");
        clearPin();
    }
}

// Real-time Live Clock
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    document.getElementById('lock-time').innerText = time;
    document.getElementById('lock-date').innerText = date;
    if(document.getElementById('dash-clock')) {
        document.getElementById('dash-clock').innerText = time + " local";
    }
}
setInterval(updateClock, 1000);
updateClock();
