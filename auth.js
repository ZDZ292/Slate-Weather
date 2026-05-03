let currentInput = "";
const pad = document.getElementById('numpad');

// Generate Buttons
[1,2,3,4,5,6,7,8,9,'CLR',0,'ENT'].forEach(key => {
    const b = document.createElement('button');
    b.innerText = key;
    b.onclick = () => handlePress(key);
    pad.appendChild(b);
});

// Keyboard listener
window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) handlePress(e.key);
    if (e.key === 'Enter') handlePress('ENT');
    if (e.key === 'Backspace') handlePress('CLR');
});

function handlePress(k) {
    if (k === 'CLR') currentInput = "";
    else if (k === 'ENT') {
        if (currentInput === CONFIG.PASSCODE) {
            document.getElementById('lock-screen').classList.add('hidden');
            document.getElementById('app').classList.remove('hidden');
            initApp();
        } else {
            currentInput = "";
        }
    } else if (currentInput.length < 4) {
        currentInput += k;
    }
    document.getElementById('pin-view').innerText = "•".repeat(currentInput.length) || "••••";
}
