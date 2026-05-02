let inputCode = "";
const correctCode = CONFIG.DEFAULT_PASSCODE;

function handleInput(num) {
    if (inputCode.length < 6) {
        inputCode += num;
        if (inputCode === correctCode) {
            document.getElementById('lock-screen').style.display = 'none';
            document.getElementById('dashboard').classList.remove('hidden');
            initWeather(); // Starts the weather engine
        }
    }
}

function clearInput() { inputCode = ""; }
