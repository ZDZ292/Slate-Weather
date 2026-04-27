function openTab(evt, tabName) {
    let content = document.getElementsByClassName("tab-content");
    for (let i = 0; i < content.length; i++) content[i].style.display = "none";
    
    let links = document.getElementsByClassName("tab-link");
    for (let i = 0; i < links.length; i++) links[i].className = links[i].className.replace(" active", "");
    
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    
    if(tabName === 'models') fetchWeather();
}

async function fetchWeather() {
    const lat = 42.0411; // Evanston
    const lon = -87.6901;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m&models=ecmwf_ifs04,gfs_seamless,jma_seamless,icon_seamless,gem_seamless,meteofrance_seamless,hrrr_conus,nam_conus&timezone=auto`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        document.getElementById('main-temp').innerText = `${Math.round(data.current_weather.temperature)}°`;
        
        const models = {
            "HRRR (High-Res)": data.hourly.temperature_2m_hrrr_conus[0],
            "NAM (Mesoscale)": data.hourly.temperature_2m_nam_conus[0],
            "GFS (Global)": data.hourly.temperature_2m_gfs_seamless[0],
            "ECMWF (Euro)": data.hourly.temperature_2m_ecmwf_ifs04[0],
            "ICON (German)": data.hourly.temperature_2m_icon_seamless[0],
            "GEM (Canadian)": data.hourly.temperature_2m_gem_seamless[0],
            "ARPEGE (French)": data.hourly.temperature_2m_meteofrance_seamless[0],
            "JMA (Japanese)": data.hourly.temperature_2m_jma_seamless[0]
        };

        let html = "";
        for (const [name, val] of Object.entries(models)) {
            html += `> ${name.padEnd(20)} : ${val}°C<br>`;
        }
        document.getElementById('model-list').innerHTML = html;

    } catch (err) {
        document.getElementById('model-list').innerText = "Error: Link Failure.";
    }
}

// Auto-load weather on start
window.onload = fetchWeather;
