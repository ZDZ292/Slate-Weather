function showTab(tabId) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

async function initDashboard() {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${CONFIG.WEATHER_API_KEY}&q=${CONFIG.LAT},${CONFIG.LON}&days=10&aqi=yes&alerts=yes`);
    const data = await res.json();

    // Populate Current
    document.getElementById('main-temp').innerText = Math.round(data.current.temp_f);
    document.getElementById('rain-val').innerText = `${data.current.precip_in}"`;
    document.getElementById('lock-precip').innerText = `Current Accumulation: ${data.current.precip_in}"`;

    // Alerts
    const alertBox = document.getElementById('severe-alerts');
    if (data.alerts.alert.length > 0) {
        alertBox.classList.remove('hidden');
        alertBox.innerHTML = `⚠️ SEVERE ALERT: ${data.alerts.alert[0].event}`;
    }

    // 72 Hour Forecast
    const hourlyContainer = document.getElementById('hourly-72-container');
    // Logic to map data.forecast.forecastday[0,1,2].hour here...
}

function loadSPC(day) {
    const img = document.getElementById('spc-img');
    const urls = {
        '1': 'https://www.spc.noaa.gov/products/outlook/day1otlk_2000.gif',
        '2': 'https://www.spc.noaa.gov/products/outlook/day2otlk_2000.gif',
        '3': 'https://www.spc.noaa.gov/products/outlook/day3otlk_2000.gif',
        '4': 'https://www.spc.noaa.gov/products/exper/day4-8/day48prob.gif'
    };
    img.src = urls[day];
}
