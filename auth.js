let inputBuffer = "";
const PIN = CONFIG.PASSCODE;

function setupKeypad() {
    const pad = document.getElementById('keypad');
    [1,2,3,4,5,6,7,8,9,'C',0,'OK'].forEach(k => {
        const b = document.createElement('button');
        b.innerText = k;
        b.onclick = () => handleInput(k);
        pad.appendChild(b);
    });
}

window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) handleInput(e.key);
    if (e.key === 'Enter') handleInput('OK');
    if (e.key === 'Backspace') handleInput('C');
});

function handleInput(v) {
    if (v === 'C') inputBuffer = "";
    else if (v === 'OK') {
        if (inputBuffer === PIN) unlock();
        else { inputBuffer = ""; triggerError(); }
    } else if (inputBuffer.length < 4) {
        inputBuffer += v;
    }
    document.getElementById('pin-display').innerText = "•".repeat(inputBuffer.length);
}

function unlock() {
    document.getElementById('lock-screen').style.transform = "translateY(-100%)";
    setTimeout(() => {
        document.getElementById('lock-screen').classList.add('hidden');
        document.getElementById('main-ui').classList.remove('hidden');
        initDashboard();
    }, 6000);
}

setupKeypad();
