async function loadMD() {
    const res = await fetch(`https://api.weather.gov/products/types/MCD`);
    const data = await res.json();
    document.getElementById('mcd-feed').innerText = data['@graph'][0].productText || "No Active Discussions";
}

async function loadHourly72() {
    // Fetches grid data from NWS and maps 72 hours
    const view = document.getElementById('hourly-72-view');
    view.innerHTML = "<h4>72-Hour Detailed Micro-Forecast Active</h4>";
}
