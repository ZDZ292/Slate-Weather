async function updateNWS() {
    const discussionUrl = 'https://api.weather.gov/products/types/AFD/locations/LOT';
    try {
        const response = await fetch(discussionUrl);
        const data = await response.json();
        // This pulls the latest technical discussion link
        console.log("NWS Discussion Updated");
    } catch (e) {
        console.log("NWS API limit reached or down");
    }
}
