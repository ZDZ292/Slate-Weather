async function initWeather() {
    const { LAT, LON, WEATHER_API_KEY, OFFICE } = CONFIG;
    
    // NWS Weather Story
    document.getElementById('nws-story').src = `https://www.weather.gov/images/${OFFICE}/weatherstory.png`;

    try {
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${LAT},${LON}&days=7`);
        const data = await res.json();
        
        document.getElementById('main-temp').innerText = Math.round(data.current.temp_f);
        document.getElementById('main-desc').innerText = data.current.condition.text;
        
        // Populate Forecast
        const daily = document.getElementById('daily-forecast');
        daily.innerHTML = '<h3>7-DAY OUTLOOK</h3>';
        data.forecast.forecastday.forEach(day => {
            const date = new Date(day.date).toLocaleDateString('en-US', {weekday: 'short'});
            daily.innerHTML += `<div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #111">
                <span>${date}</span><span>${day.day.condition.text}</span><span>${Math.round(day.day.maxtemp_f)}°</span>
            </div>`;
        });
    } catch(e) { console.error(e); }
}

function showPanel(id) {
    document.querySelectorAll('.panel').forEach(p => p.classList.add('hidden'));
    document.getElementById(`${id}-panel`).classList.remove('hidden');
}
