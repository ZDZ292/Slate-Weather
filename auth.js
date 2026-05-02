let inputPin = "";

function updateLiveClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    // Update Lock Screen
    const lockClock = document.getElementById('lock-clock');
    if(lockClock) lockClock.innerText = timeStr;
    const lockDate = document.getElementById('lock-date');
    if(lockDate) lockDate.innerText = dateStr;
    
    // Update Dashboard Small Clock
    const dashClock = document.getElementById('current-time-small');
    if(dashClock) dashClock.innerText = timeStr + " local";
}

setInterval(updateLiveClock, 1000);
updateLiveClock();

function addPin(val) {
    if (inputPin.length < 4) {
        inputPin += val;
        updatePinUI();
    }
}

function updatePinUI() {
    const dots = document.querySelectorAll('#dots span');
    dots.forEach((dot, i) => {
        dot.style.background = i < inputPin.length ? 'white' : 'transparent';
    });
}

function clearPin() { inputPin = ""; updatePinUI(); }

function submitPin() {
    if (inputPin === CONFIG.PASSCODE) {
        document.getElementById('lock-screen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        initWeather();
    } else {
        alert("ACCESS DENIED");
        clearPin();
    }
}
