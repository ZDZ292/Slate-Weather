let pin = "";
const target = "2014";

window.onload = () => {
    const pad = document.querySelector('.numpad');
    [1,2,3,4,5,6,7,8,9,'CLR',0,'ENT'].forEach(val => {
        const btn = document.createElement('button');
        btn.innerText = val;
        btn.onclick = () => handleInput(val);
        pad.appendChild(btn);
    });
};

function handleInput(v) {
    if (v === 'CLR') pin = "";
    else if (v === 'ENT') {
        if (pin === target) unlock();
        else pin = "";
    } else if (pin.length < 4) pin += v;
    
    document.getElementById('pin-display').innerText = "•".repeat(pin.length) || "••••";
}

function unlock() {
    document.getElementById('lock-screen').style.display = 'none';
    document.getElementById('dashboard').classList.remove('hidden');
    initApp();
}
