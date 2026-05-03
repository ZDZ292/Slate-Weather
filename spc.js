async function loadSPC() {
    const list = document.getElementById('spc-list');
    const days = [
        { name: 'Day 1', img: 'https://www.spc.noaa.gov/products/outlook/day1otlk_2000.gif' },
        { name: 'Day 2', img: 'https://www.spc.noaa.gov/products/outlook/day2otlk_2000.gif' },
        { name: 'Day 3', img: 'https://www.spc.noaa.gov/products/outlook/day3otlk_2000.gif' }
    ];

    list.innerHTML = days.map(d => `
        <div class="card" style="background:#0a0a0a; border:1px solid #222; margin-bottom:20px; padding:20px; border-radius:10px;">
            <h3 class="orbitron green">${d.name} Outlook</h3>
            <p>Tornado: 5% | Wind: 15% | Hail: 10%</p>
            <img src="${d.img}?t=${Date.now()}" style="width:100%; border:1px solid #333;">
        </div>
    `).join('');
}
