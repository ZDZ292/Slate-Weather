let inputBuffer = "";
const keypad = document.getElementById('keypad');

function initAuth() {
    [1,2,3,4,5,6,7,8,9,'C',0,'OK'].forEach(val => {
        const key = document.createElement('div');
        key.className = 'key-unit';
        key.innerText = val;
        key.onpointerdown = (e) => {
            e.preventDefault();
            processInput(val);
        };
        keypad.appendChild(key);
    });
}

window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) processInput(e.key);
    if (e.key === 'Enter') processInput('OK');
    if (e.key === 'Backspace') processInput('C');
});

function processInput(v) {
    if (v === 'C') inputBuffer = "";
    else if (v === 'OK') {
        if (inputBuffer === CONFIG.PASSCODE) {
            document.getElementById('lock-screen').style.transition = '1.2s cubic-bezier(0.8, 0, 0.2, 1)';
            document.getElementById('lock-screen').style.opacity = '0';
            document.getElementById('lock-screen').style.transform = 'scale(1.1)';
            setTimeout(() => {
                document.getElementById('lock-screen').classList.add('hidden');
                document.getElementById('app').classList.remove('hidden');
                bootDashboard();
            }, 1000);
        } else {
            inputBuffer = "";
        }
    } else if (inputBuffer.length < 4) {
        inputBuffer += v;
    }
    document.getElementById('pin-view').innerText = ".".repeat(inputBuffer.length) || "....";
}

initAuth();
