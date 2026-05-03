let inputPin = "";

window.addEventListener('keydown', (e) => {
    // Only listen if lock screen is active
    if (document.getElementById('lock-screen').classList.contains('active')) {
        if (e.key >= '0' && e.key <= '9') addPin(e.key);
        if (e.key === 'Enter') submitPin();
        if (e.key === 'Backspace') clearPin();
    }
});

function addPin(val) {
    if (inputPin.length < 4) {
        inputPin += val;
        updatePinUI();
    }
}

function updatePinUI() {
    const dots = document.querySelectorAll('#pin-dots span');
    dots.forEach((dot, i) => {
        dot.className = i < inputPin.length ? 'filled' : '';
    });
}

function clearPin() {
    inputPin = "";
    updatePinUI();
}

function submitPin() {
    if (inputPin === CONFIG.PASSCODE) {
        document.getElementById('lock-screen').classList.remove('active');
        document.getElementById('dashboard').classList.remove('hidden');
        initDashboard();
    } else {
        alert("ACCESS DENIED");
        clearPin();
    }
}

function updateLiveClocks() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    document.getElementById('lock-time').innerText = time;
    document.getElementById('lock-date').innerText = date;
    if(document.getElementById('dash-clock')) {
        document.getElementById('dash-clock').innerText = time + " local";
    }
}
setInterval(updateLiveClocks, 1000);
updateLiveClocks();
