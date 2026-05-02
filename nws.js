async function fetchNWS(type) {
    const output = document.getElementById('nws-text-output');
    output.innerText = "Connecting to NWS Server...";
    
    // NWS API endpoint for Area Forecast Discussion (AFD) and HWO
    const office = CONFIG.OFFICE;
    const product = type === 'discussion' ? 'AFD' : 'HWO';
    
    try {
        const res = await fetch(`https://api.weather.gov/products/types/${product}/locations/${office}`);
        const list = await res.json();
        const detailRes = await fetch(list['@graph'][0]['@id']);
        const data = await detailRes.json();
        output.innerText = data.productText;
    } catch(e) {
        output.innerText = "Error fetching NWS product. Technical text may be unavailable.";
    }
}
