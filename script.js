:root {
    --bg-dark: #0a0a0a;
    --card-bg: #161616;
    --accent: #00e5ff; /* Tactical Cyan */
    --text-main: #e0e0e0;
    --border: #333;
}

body {
    background-color: var(--bg-dark);
    color: var(--text-main);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    overflow: hidden; /* Desktop feel */
}

.top-bar {
    background: #000;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid var(--border);
}

.logo { font-size: 1.2rem; letter-spacing: 2px; color: var(--accent); }

.tab-nav {
    display: flex;
    background: var(--card-bg);
    border-bottom: 1px solid var(--border);
}

.tab-link {
    background: none;
    border: none;
    color: #888;
    padding: 15px 25px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s;
}

.tab-link.active {
    color: var(--accent);
    border-bottom: 2px solid var(--accent);
    background: rgba(0, 229, 255, 0.05);
}

.tab-content {
    display: none;
    height: calc(100vh - 110px);
    padding: 20px;
}

.spc-map {
    width: 48%;
    border: 1px solid var(--border);
    margin: 5px;
}

.radar-wrapper { height: 100%; border: 1px solid var(--border); }

.terminal-text {
    background: #000;
    color: #00ff41; /* Classic Matrix/Tactical Green */
    padding: 15px;
    font-family: monospace;
    border-radius: 4px;
    line-height: 1.6;
}

.temp-big { font-size: 5rem; font-weight: bold; margin: 10px 0; }
