// This script ensures the SPC images refresh their timestamps to bypass browser cache
function refreshSPC() {
    const timestamp = new Date().getTime();
    document.getElementById('spc-d1').src += `?t=${timestamp}`;
    document.getElementById('spc-d2').src += `?t=${timestamp}`;
    document.getElementById('spc-d3').src += `?t=${timestamp}`;
    document.getElementById('spc-d48').src += `?t=${timestamp}`;
}
setInterval(refreshSPC, 300000); // Refresh every 5 mins
