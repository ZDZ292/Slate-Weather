async function initWeather() {
    const lat = 42.0451; // Evanston coordinates
    const lon = -87.6877;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${CONFIG.OPENWEATHER_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Update Hero Card
        document.querySelector('.temp-display').innerText = `${Math.round(data.current.temp)}°`;

        // Trigger SPC and NWS updates
        updateSPC();
        updateNWS();
    } catch (error) {
        console.error("Weather Load Failed", error);
    }
}
