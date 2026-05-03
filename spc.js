async function loadSPC() {
    const view = document.getElementById('spc-tab-view');
    const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4-8'];
    view.innerHTML = days.map(d => `
        <div class="card">
            <h3>${d} Outlook</h3>
            <div class="prob-bars">
                <span>Tornado: 5%</span><div class="bar"><div style="width:5%; background:red"></div></div>
                <span>Wind: 15%</span><div class="bar"><div style="width:15%; background:blue"></div></div>
                <span>Hail: 10%</span><div class="bar"><div style="width:10%; background:green"></div></div>
            </div>
            <img src="https://www.spc.noaa.gov/products/outlook/day1otlk_2000.gif" style="width:100%">
        </div>
    `).join('');
}
