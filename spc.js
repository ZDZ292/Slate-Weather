async function updateSPC() {
    // Fetching the Day 1 Convective Outlook GeoJSON
    const url = 'https://www.spc.noaa.gov/products/outlook/day1otlk_cat.geojson';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const container = document.querySelector('.spc-outlook');
        
        // Simplified logic to display the risk level
        container.innerHTML = `<h3>Severe Weather Center</h3><p>Monitoring SPC Feeds...</p>`;
        // In a full build, we'd check if Evanston's coordinates are inside the risk polygons
    } catch (e) {
        console.log("SPC Feed currently unavailable");
    }
}
