async function loadMCD() {
    try {
        const res = await fetch(`https://api.weather.gov/products/types/SWOMCD`);
        const data = await res.json();
        const detail = await fetch(data['@graph'][0]['@id']);
        const textData = await detail.json();
        document.getElementById('mcd-content').innerText = textData.productText;
    } catch (e) {
        document.getElementById('mcd-content').innerText = "NO ACTIVE MESOSCALE DISCUSSIONS IN AREA.";
    }
}
