async function initApp() {
    updateCurrent();
    loadSPC();
    loadMD();
    loadLongRange();
    loadHourly72();
    setInterval(updateCurrent, 60000); // Live updates
}

function showTab(num) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${num}`).classList.add('active');
    event.target.classList.add('active');
}

async function updateCurrent() {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${CONFIG.WEATHER_API_KEY}&q=${CONFIG.LAT},${CONFIG.LON}&days=1&aqi=yes`);
    const data = await res.json();
    
    document.getElementById('temp-big').innerText = Math.round(data.current.temp_f) + "°";
    document.getElementById('rain-val').innerText = data.current.precip_in + '"';
    document.getElementById('snow-val').innerText = data.forecast.forecastday[0].day.totalsnow_cm + " cm";
    document.getElementById('live-icon').innerHTML = WeatherIcons.getIcon('lightning');
}
