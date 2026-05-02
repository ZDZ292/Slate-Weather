let currentPin = "";

function updateClock() {
    const now = new Date();
    document.getElementById('live-clock').innerText = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('live-date').innerText = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}
setInterval(updateClock, 1000);
updateClock();

function addPin(num) {
    if (currentPin.length < 6) {
        currentPin += num;
        updateDots();
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.pin-dots span');
    dots.forEach((dot, i) => {
        dot.style.background = i < currentPin.length ? 'white' : 'transparent';
    });
}

function clearPin() { currentPin = ""; updateDots(); }

function submitPin() {
    if (currentPin === CONFIG.PASSCODE) {
        document.getElementById('lock-screen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        initWeather();
    } else {
        alert("ACCESS DENIED");
        clearPin();
    }
}
