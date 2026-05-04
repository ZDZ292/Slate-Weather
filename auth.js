let entry = "";
const keypad = document.getElementById('keypad');

function initKeypad() {
    [1,2,3,4,5,6,7,8,9,'C',0,'OK'].forEach(val => {
        const btn = document.createElement('button');
        btn.innerText = val;
        // Universal listeners
        btn.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            handlePress(val);
        });
        keypad.appendChild(btn);
    });
}

// Physical Keyboard Listener
window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) handlePress(e.key);
    if (e.key === 'Enter') handlePress('OK');
    if (e.key === 'Backspace') handlePress('C');
});

function handlePress(val) {
    if (val === 'C') entry = "";
    else if (val === 'OK') {
        if (entry === CONFIG.PASSCODE) {
            document.getElementById('lock-screen').style.opacity = "0";
            setTimeout(() => {
                document.getElementById('lock-screen').classList.add('hidden');
                document.getElementById('app').classList.remove('hidden');
                startDashboard();
            }, 500);
        } else {
            entry = "";
        }
    } else if (entry.length < 4) {
        entry += val;
    }
    document.getElementById('pin-dots').innerText = ".".repeat(entry.length) || "....";
}

initKeypad();
