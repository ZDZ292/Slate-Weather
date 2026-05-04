const SlateIcons = {
    getLiquidIcon: (condition) => {
        const c = condition.toLowerCase();
        if (c.includes('storm') || c.includes('lightning')) return `
            <svg class="liquid-svg" viewBox="0 0 100 100">
                <defs><filter id="glow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
                <path class="cloud-glass" d="M25 60 Q25 40 45 40 Q50 25 70 30 Q85 35 85 55 A15 15 0 0 1 70 75 H35 A15 15 0 0 1 25 60" fill="rgba(255,255,255,0.1)" stroke="rgba(0,255,0,0.5)" />
                <path class="bolt-anim" d="M50 45 L40 70 H55 L45 95" fill="none" stroke="#00ff00" stroke-width="3" filter="url(#glow)" />
            </svg>`;
        if (c.includes('rain')) return `
            <svg class="liquid-svg" viewBox="0 0 100 100">
                <path class="cloud-glass" d="M25 60 Q25 40 45 40 Q50 25 70 30 Q85 35 85 55 A15 15 0 0 1 70 75 H35 A15 15 0 0 1 25 60" fill="rgba(255,255,255,0.1)" stroke="#00ff00" />
                <line class="rain-drop" x1="40" y1="75" x2="35" y2="85" stroke="#00ff00" stroke-width="2" />
                <line class="rain-drop" x1="55" y1="80" x2="50" y2="90" stroke="#00ff00" stroke-width="2" />
            </svg>`;
        return `<svg class="liquid-svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="20" fill="rgba(0,255,0,0.2)" stroke="#00ff00" stroke-width="2" filter="url(#glow)"/></svg>`;
    }
};
