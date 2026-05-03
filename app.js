async function initDashboard() {
    const { LAT, LON, WEATHER_API_KEY } = CONFIG;

    try {
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${LAT},${LON}&days=7&aqi=yes`);
        const data = await res.json();

        // Map Data to UI
        document.getElementById('temp-val').innerText = Math.round(data.current.temp_f);
        document.getElementById('main-desc').innerText = data.current.condition.text;
        document.getElementById('v-wind').innerText = `${Math.round(data.current.wind_mph)} mph`;
        document.getElementById('v-hum').innerText = `${data.current.humidity}%`;
        document.getElementById('v-pres').innerText = `${data.current.pressure_mb} hPa`;
        document.getElementById('v-vis').innerText = `${data.current.vis_km} km`;
        document.getElementById('v-feels').innerText = `${Math.round(data.current.feelslike_f)}°F`;
        document.getElementById('v-low').innerText = `${Math.round(data.forecast.forecastday[0].day.mintemp_f)}°F`;
        document.getElementById('v-high').innerText = `${Math.round(data.forecast.forecastday[0].day.maxtemp_f)}°F`;

        // Hourly
        const hList = document.getElementById('hourly-list');
        hList.innerHTML = '';
        data.forecast.forecastday[0].hour.filter((_, i) => i % 3 === 0).slice(0, 8).forEach(hr => {
            const timeStr = new Date(hr.time).toLocaleTimeString([], {hour: 'numeric'});
            hList.innerHTML += `
                <div class="h-block">
                    <span>${timeStr}</span>
                    <i class="fa-solid fa-cloud"></i>
                    <b>${Math.round(hr.temp_f)}°F</b>
                </div>`;
        });

        // 7-Day
        const dList = document.getElementById('daily-list');
        dList.innerHTML = '';
        data.forecast.forecastday.forEach(day => {
            const dayName = new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', {weekday: 'short'});
            dList.innerHTML += `
                <div style="display:flex; justify-content:space-between; padding:15px 0; border-bottom:1px solid #111">
                    <span>${dayName}</span>
                    <span><i class="fa-solid fa-cloud"></i></span>
                    <span class="serif">${Math.round(day.day.mintemp_f)}° · ${Math.round(day.day.maxtemp_f)}°</span>
                </div>`;
        });

    } catch (err) { console.error("Load failed", err); }
}
