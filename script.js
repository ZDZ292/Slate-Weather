let currentLat, currentLon;

function playSound(id) {
    const s = document.getElementById(id);
    s.currentTime = 0;
    s.play().catch(() => {}); // Catch browser blocking audio
}

async function performSearch() {
    const query = document.getElementById('location-input').value;
    const status = document.getElementById('lock-status');
    
    if(!query) return;
    status.innerText = "GEO-LOCATING TARGET...";
    
    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`;
        const res = await fetch(geoUrl);
        const data = await res.json();
        
        if(!data.results) {
            status.innerText = "ERROR: TARGET NOT FOUND";
            return;
        }

        const target = data.results[0];
        currentLat = target.latitude;
        currentLon = target.longitude;
        
        // Unlock Dashboard
        playSound('sound-startup');
        document.getElementById('system-lock').style.display = 'none';
        document.getElementById('dashboard-main').style.display = 'block';
        
        // Initialize UI
        document.getElementById('current-coords').innerText = `LAT: ${currentLat.toFixed(2)} | LON: ${currentLon.toFixed(2)}`;
        document.getElementById('stat-city').innerText = target.name.toUpperCase();
        
        initRadar();
        initSPC();
        fetch8Models();

    } catch (e) {
        status.innerText = "CONNECTION FAILURE";
    }
}

function handleSearch(e) { if(e.key === 'Enter') performSearch(); }

function initRadar() {
    // RainViewer with animation loop parameter (m=1)
    const url = `https://www.rainviewer.com/map.html?loc=${currentLat},${currentLon},6&base=1&layer=1&color=3&m=1&o=1`;
    document.getElementById('radar-iframe').src = url;
}

function initSPC() {
    const container = document.getElementById('spc-container');
    container.innerHTML = "";
    const days = [1, 2, 3, 4, 5, 6, 7, 8];
    
    days.forEach(day => {
        const isProb = day >= 4;
        const suffix = isProb ? `_PROB.png` : `.png`;
        const url = `https://www.spc.noaa.gov/partners/outlooks/cwa/images/LOT_swody${day}${suffix}?${Date.now()}`;
        
        container.innerHTML += `
            <div class="spc-card">
                <h3>DAY ${day} ${isProb ? 'PROB' : 'CAT'}</h3>
                <img src="${url}" onerror="this.parentElement.style.display='none'">
            </div>`;
    });
}

async function fetch8Models() {
    const output = document.getElementById('model-output');
    output.innerText = "> INITIALIZING MULTI-MODEL ARRAY...";
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${currentLat}&longitude=${currentLon}&hourly=temperature_2m&models=ecmwf_ifs04,gfs_seamless,jma_seamless,icon_seamless,gem_seamless,meteofrance_seamless,hrrr_conus,nam_conus&timezone=auto`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        
        const models = [
            ["HRRR", data.hourly.temperature_2m_hrrr_conus],
            ["NAM", data.hourly.temperature_2m_nam_conus],
            ["GFS", data.hourly.temperature_2m_gfs_seamless],
            ["EURO", data.hourly.temperature_2m_ecmwf_ifs04],
            ["ICON", data.hourly.temperature_2m_icon_seamless],
            ["GEM", data.hourly.temperature_2m_gem_seamless],
            ["ARPEGE", data.hourly.temperature_2m_meteofrance_seamless],
            ["JMA", data.hourly.temperature_2m_jma_seamless]
        ];

        let html = "";
        models.forEach(([name, val]) => {
            const currentVal = val ? val[0] + "°C" : "OFFLINE";
            html += `> ${name.padEnd(10)} : [ ${currentVal} ]<br>`;
        });
        output.innerHTML = html;
    } catch (e) {
        output.innerText = "> CRITICAL ERROR: API LINK SEVERED";
    }
}

function openTab(evt, tabName) {
    playSound('sound-click');
    let content = document.getElementsByClassName("tab-content");
    for (let i = 0; i < content.length; i++) content[i].style.display = "none";
    let links = document.getElementsByClassName("tab-link");
    for (let i = 0; i < links.length; i++) links[i].className = links[i].className.replace(" active", "");
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
