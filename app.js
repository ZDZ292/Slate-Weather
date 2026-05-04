async function initDashboard() {
    updateWeather(CONFIG.LAT, CONFIG.LON, "Chicago, US");
    loadSPC();
    loadMCD();
}

document.getElementById('city-search').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=${CONFIG.WEATHER_API_KEY}&q=${e.target.value}`);
        const locs = await res.json();
        if (locs.length) updateWeather(locs[0].lat, locs[0].lon, locs[0].name);
    }
});

function tab(id) {
    document.querySelectorAll('.glass-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('view-' + id).classList.add('active');
    event.target.classList.add('active');
}

async function updateWeather(lat, lon, label) {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${CONFIG.WEATHER_API_KEY}&q=${lat},${lon}&days=14&aqi=yes`);
    const data = await res.json();
    
    document.getElementById('hero-temp').innerText = Math.round(data.current.temp_f) + "°";
    document.getElementById('hero-desc').innerText = data.current.condition.text.toUpperCase();
    document.getElementById('hero-icon').innerHTML = SlateIcons.getLiquidIcon(data.current.condition.text);
    document.getElementById('m-precip').innerText = data.current.precip_in + '"';
    document.getElementById('m-wind').innerText = data.current.wind_mph + " mph";
    document.getElementById('m-hum').innerText = data.current.humidity + "%";

    // 14-Day Mapping
    const list14 = document.getElementById('list-14d');
    list14.innerHTML = data.forecast.forecastday.map(d => `
        <div class="metric-glass">
            <span>${new Date(d.date).toLocaleDateString('en-US', {weekday:'short'})}</span>
            <b>${Math.round(d.day.maxtemp_f)}° / ${Math.round(d.day.mintemp_f)}°</b>
        </div>
    `).join('');
}
