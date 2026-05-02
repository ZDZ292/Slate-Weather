async function initWeather() {
    const { LAT, LON, WEATHER_API_KEY, OFFICE } = CONFIG;

    try {
        // Fetch Current + Forecast
        const wRes = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${LAT},${LON}&days=7&aqi=yes`);
        const wData = await wRes.json();

        // Update Current UI
        document.getElementById('big-temp').innerText = Math.round(wData.current.temp_f);
        document.getElementById('main-desc').innerText = wData.current.condition.text;
        document.getElementById('wind').innerText = `${wData.current.wind_mph} mph`;
        document.getElementById('hum').innerText = `${wData.current.humidity}%`;
        document.getElementById('pres').innerText = `${wData.current.pressure_mb} hPa`;
        document.getElementById('vis').innerText = `${wData.current.vis_km} km`;
        document.getElementById('feels').innerText = `${Math.round(wData.current.feelslike_f)}°F`;
        document.getElementById('low').innerText = `${Math.round(wData.forecast.forecastday[0].day.mintemp_f)}°F`;
        document.getElementById('high').innerText = `${Math.round(wData.forecast.forecastday[0].day.maxtemp_f)}°F`;

        // Hourly
        const hList = document.getElementById('hourly-list');
        hList.innerHTML = '';
        wData.forecast.forecastday[0].hour.filter((_, i) => i % 3 === 0).slice(0, 8).forEach(hr => {
            const time = new Date(hr.time).toLocaleTimeString([], {hour: 'numeric'});
            hList.innerHTML += `<div class="h-item">
                <span>${time}</span><br><i class="fa-solid fa-cloud"></i>
                <b>${Math.round(hr.temp_f)}°F</b>
            </div>`;
        });

        // 7-Day List
        const dList = document.getElementById('daily-list');
        dList.innerHTML = '';
        wData.forecast.forecastday.forEach(day => {
            const date = new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', {weekday: 'short'});
            dList.innerHTML += `<div style="display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #111">
                <span>${date}</span><span>${Math.round(day.day.mintemp_f)}° · ${Math.round(day.day.maxtemp_f)}°</span>
            </div>`;
        });

        fetchNWS(OFFICE);
    } catch(e) { console.error("Weather load error", e); }
}

async function fetchNWS(office) {
    try {
        const res = await fetch(`https://api.weather.gov/products/types/AFD/locations/${office}`);
        const json = await res.json();
        const detail = await fetch(json['@graph'][0]['@id']);
        const data = await detail.json();
        document.getElementById('nws-text').innerText = data.productText;
    } catch(e) { document.getElementById('nws-text').innerText = "AFD currently unavailable."; }
}
