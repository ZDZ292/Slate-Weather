let input = "";
const keypad = document.getElementById('keypad');

function setupKeypad() {
    [1,2,3,4,5,6,7,8,9,'C',0,'OK'].forEach(key => {
        const btn = document.createElement('div');
        btn.className = 'key-btn';
        btn.innerText = key;
        
        btn.onpointerdown = (e) => {
            e.preventDefault();
            createRipple(e, btn);
            handleKey(key);
        };
        keypad.appendChild(btn);
    });
}

function createRipple(event, button) {
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) { ripple.remove(); }
    button.appendChild(circle);
}

window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) handleKey(e.key);
    if (e.key === 'Enter') handleKey('OK');
    if (e.key === 'Backspace') handleKey('C');
});

function handleKey(v) {
    if (v === 'C') input = "";
    else if (v === 'OK') {
        if (input === CONFIG.PASSCODE) unlock();
        else input = "";
    } else if (input.length < 4) {
        input += v;
    }
    document.getElementById('pin-display').innerText = ".".repeat(input.length) || "....";
}

function unlock() {
    const lockScreen = document.getElementById('lock-screen');
    lockScreen.style.opacity = '0';
    lockScreen.style.backdropFilter = 'blur(0px)';
    setTimeout(() => {
        lockScreen.classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
        // initWeather() would trigger here
    }, 800);
}

setupKeypad();
