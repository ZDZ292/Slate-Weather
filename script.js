let lat, lon, cityName;

async function bootSystem() {
    const input = document.getElementById('loc-input').value;
    const feedback = document.getElementById('feedback-msg');
    const snd = document.getElementById('snd-click');

    if (!input) return;
    feedback.innerText = "UPLINKING TO SATELLITE...";
    
    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(input)}&count=1`;
        const res = await fetch(geoUrl);
        const data = await res.json();

        if (!data.results) {
            feedback.innerText = "ERROR: LOCATION NOT FOUND";
            return;
        }

        const loc = data.results[0];
        lat = loc.latitude;
        lon = loc.longitude;
        cityName = loc.name;

        // UI Transition
        snd.play().catch(()=> {});
        document.getElementById('system-lock').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('system-lock').style.display = 'none';
            document.getElementById('app-shell').style.display = 'grid';
            initApp();
        }, 500);

    } catch (err) {
        feedback.innerText = "LINK FAILURE: CHECK CONNECTION";
        console.error(err);
    }
}

function initApp() {
    document.getElementById('meta-data').innerText = `${cityName.toUpperCase()} // ${lat.toFixed(2)}, ${lon.toFixed(2)}`;
    loadSPC();
    loadRadar();
    fetchModels();
    updateStatusLog();
}

// Rewritten V4.0: Injecting onclick and setting basic cards
function loadSPC() {
    const view = document.getElementById('spc-view');
    view.innerHTML = '';
    // Days 1-8 Outlooks specifically for LOT (Chicago)
    for (let i = 1; i <= 8; i++) {
        const isProb = i >= 4;
        const typeSuffix = isProb ? "_PROB" : "";
        const url = `https://www.spc.noaa.gov/partners/outlooks/cwa/images/LOT_swody${i}${typeSuffix}.png?ts=${Date.now()}`;
        
        // V4.0 Update: Added onclick, set image onerror to handle missing images silently
        view.innerHTML += `
            <div class="spc-card" onclick="openModal(${i})">
                <div class="model-name">DAY ${i} ${isProb ? 'PROBABILITY' : 'CATEGORICAL'}</div>
                <img src="${url}" onerror="this.parentElement.style.display='none'">
            </div>`;
    }
}

// V4.0 Update: Handles opening modal and conditional map loading
function openModal(day) {
    const snd = document.getElementById('snd-click');
    snd.play().catch(() => {});
    
    const modal = document.getElementById('spc-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    
    modal.style.display = 'block';
    
    // Clear previous modal content
    body.innerHTML = '';

    const ts = Date.now(); // Cache-busting timestamp
    const baseLotUrl = `https://www.spc.noaa.gov/partners/outlooks/cwa/images/LOT_swody${day}`;

    // Conditional Logic based on which day was clicked
    if (day === 1 || day === 2) {
        title.innerHTML = `DAY ${day} // <span class="accent">DETAILED RISKS</span>`;
        
        // Construct the URLs for the 4 specific risk maps
        const catMap = `${baseLotUrl}.png?ts=${ts}`;
        const tornMap = `${baseLotUrl}_TORN.png?ts=${ts}`;
        const windMap = `${baseLotUrl}_WIND.png?ts=${ts}`;
        const hailMap = `${baseLotUrl}_HAIL.png?ts=${ts}`;

        // Build the Multi-Map Matrix structure
        body.innerHTML = `
            <div class="modal-multi-map">
                <div class="modal-sub-card"><div class="modal-sub-title">OVERALL RISK</div><img src="${catMap}" onerror="this.parentElement.style.display='none'"></div>
                <div class="modal-sub-card"><div class="modal-sub-title">TORNADO RISK</div><img src="${tornMap}" onerror="this.parentElement.style.display='none'"></div>
                <div class="modal-sub-card"><div class="modal-sub-title">WIND RISK</div><img src="${windMap}" onerror="this.parentElement.style.display='none'"></div>
                <div class="modal-sub-card"><div class="modal-sub-title">HAIL RISK</div><img src="${hailMap}" onerror="this.parentElement.style.display='none'"></div>
            </div>`;
    } else {
        // Days 3-8: Just show the single probability outlook large
        title.innerHTML = `DAY ${day} // <span class="accent">PROBABILITY OUTLOOK</span>`;
        
        const typeSuffix = day >= 4 ? "_PROB" : "";
        const singleMap = `${baseLotUrl}${typeSuffix}.png?ts=${ts}`;

        body.innerHTML = `
            <div class="modal-single-map">
                <img src="${singleMap}" onerror="this.parentElement.style.display='none'">
            </div>`;
    }
}

// V4.0 Update: Closing logic
function closeModal() {
    document.getElementById('spc-modal').style.display = 'none';
}

// V4.0 Update: Close modal if clicking outside content area
window.onclick = function(event) {
    const modal = document.getElementById('spc-modal');
    if (event.target == modal) {
        closeModal();
    }
}

function loadRadar() {
    const frame = document.getElementById('radar-map');
    frame.src = `https://www.rainviewer.com/map.html?loc=${lat},${lon},7&base=1&layer=1&color=3&m=1&p=1&o=1`;
}

async function fetchModels() {
    const output = document.getElementById('model-output');
    output.innerHTML = '<div class="log-line">FETCHING 8-MODEL DATA...</div>';

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m&models=ecmwf_ifs04,gfs_seamless,jma_seamless,icon_seamless,gem_seamless,meteofrance_seamless,hrrr_conus,nam_conus&timezone=auto`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        
        const models = [
            ["HRRR (HI-RES)", data.hourly.temperature_2m_hrrr_conus],
            ["NAM (3KM)", data.hourly.temperature_2m_nam_conus],
            ["EURO (IFS)", data.hourly.temperature_2m_ecmwf_ifs04],
            ["GFS (SEAM)", data.hourly.temperature_2m_gfs_seamless],
            ["ICON (GER)", data.hourly.temperature_2m_icon_seamless],
            ["GEM (CAN)", data.hourly.temperature_2m_gem_seamless],
            ["ARPEGE (FR)", data.hourly.temperature_2m_meteofrance_seamless],
            ["JMA (JAP)", data.hourly.temperature_2m_jma_seamless]
        ];

        output.innerHTML = '';
        models.forEach(([name, val]) => {
            const temp = val ? Math.round(val[0]) + "°" : "OFFLINE";
            output.innerHTML += `
                <div class="model-card">
                    <div class="model-name">${name}</div>
                    <div class="model-val">${temp}</div>
                </div>`;
        });

    } catch (e) {
        output.innerHTML = '<div class="log-line" style="color:red">ARRAY FETCH FAILED.</div>';
    }
}

function switchTab(evt, tabId) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

function updateStatusLog() {
    const log = document.getElementById('status-log');
    log.innerHTML = `
        <div class="log-line">> SATELLITE: LOCKED</div>
        <div class="log-line">> LATENCY: 24ms</div>
        <div class="log-line">> TARGET: ${cityName.toUpperCase()}</div>
        <div class="log-line">> SPC DATA: ACTIVE (MODAL OS ACTIVE)</div>
    `;
}
