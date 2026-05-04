async function startDashboard() {
    fetchWeather(CONFIG.LAT, CONFIG.LON);
    loadSPC();
    loadMCD();
}

document.getElementById('city-input').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const q = e.target.value;
        const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${CONFIG.WEATHER_API_KEY}&q=${q}`);
        const data = await res.json();
        if (data.length) fetchWeather(data[0].lat, data[0].lon);
    }
});

async function fetchWeather(lat, lon) {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${CONFIG.WEATHER_API_KEY}&q=${lat},${lon}&days=14`);
    const d = await res.json();
    
    document.getElementById('temp-display').innerText = Math.round(d.current.temp_f) + "°";
    document.getElementById('condition-text').innerText = d.current.condition.text.toUpperCase();
    document.getElementById('main-icon').innerHTML = SlateIcons.getIcon(d.current.condition.text);
    document.getElementById('p-val').innerText = d.current.precip_in + '"';
    document.getElementById('w-val').innerText = d.current.wind_mph + " MPH";
    document.getElementById('h-val').innerText = d.current.humidity + "%";
}

function tab(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.t-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('v-' + id).classList.add('active');
    event.target.classList.add('active');
}
