const SlateIcons = {
    getIcon: (condition) => {
        const c = condition.toLowerCase();
        let stroke = "#fff";
        let fill = "rgba(255,255,255,0.2)";
        let filter = "url(#ice-glow)";
        
        const icons = {
            'thunder': `<svg class="bolt-anim" viewBox="0 0 100 100" fill="none" stroke="${stroke}" stroke-width="2"><path d="M50 45 L40 70 H55 L45 95" filter="${filter}" /></svg>`,
            'rain': `<svg class="rain-anim" viewBox="0 0 100 100" fill="none" stroke="${stroke}" stroke-width="2"><line class="rain-drop" x1="40" y1="75" x2="35" y2="85"/><line class="rain-drop" x1="55" y1="80" x2="50" y2="90"/></svg>`,
            'cloud': `<svg viewBox="0 0 100 100" fill="none" stroke="${stroke}" stroke-width="1.5"><path class="cloud-glass" d="M25 60 Q25 40 45 40 Q50 25 70 30 Q85 35 85 55 A15 15 0 0 1 70 75 H35 A15 15 0 0 1 25 60" fill="${fill}" stroke-opacity="0.5" /></svg>`,
            'sun': `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="20" fill="${fill}" stroke="${stroke}" stroke-width="2" filter="${filter}"/></svg>`,
            'snow': `<svg viewBox="0 0 100 100" fill="none" stroke="${stroke}" stroke-width="1.5"><path d="M50 5v40M50 95v-40M10 50h40M90 50H50M20 20l60 60M80 20L20 80" /></svg>`
        };
        
        const iconKey = Object.keys(icons).find(key => c.includes(key)) || 'sun';
        return `<defs><filter id="ice-glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>${icons[iconKey]}`;
    }
};
