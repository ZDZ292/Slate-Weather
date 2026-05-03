async function initApp() {
    await updateWeather();
    await loadSPC();
    await loadMCD();
}

function switchTab(id) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.t-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.target.classList.add('active');
}

async function updateWeather() {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${CONFIG.WEATHER_API_KEY}&q=${CONFIG.LAT},${CONFIG.LON}&days=1&aqi=yes`);
    const data = await res.json();
    
    document.getElementById('main-temp').innerText = Math.round(data.current.temp_f) + "°";
    document.getElementById('rain-val').innerText = data.current.precip_in + '"';
    document.getElementById('big-icon').innerHTML = SlateIcons.getAnimIcon(data.current.condition.text);
}
