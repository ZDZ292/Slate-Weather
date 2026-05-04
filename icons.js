const SlateIcons = {
    get3DIcon: (condition) => {
        const c = condition.toLowerCase();
        let svg = '';
        
        // Base definitions for 3D frosted glass filters
        const defs = `
            <defs>
                <filter id="frost-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="5" dy="15" stdDeviation="8" flood-color="#000" flood-opacity="0.6"/>
                </filter>
                <filter id="ice-glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>`;

        if (c.includes("rain")) {
            svg = `<svg viewBox="0 0 100 100" class="icon-3d">${defs}
                <path d="M25 60 Q25 40 45 40 Q50 25 70 30 Q85 35 85 55 A15 15 0 0 1 70 75 H35 A15 15 0 0 1 25 60" fill="rgba(255,255,255,0.85)" filter="url(#frost-shadow)"/>
                <line x1="40" y1="75" x2="35" y2="90" stroke="#aee4ff" stroke-width="4" stroke-linecap="round" filter="url(#ice-glow)"><animate attributeName="y1" values="75;85;75" dur="1s" repeatCount="indefinite"/></line>
                <line x1="60" y1="75" x2="55" y2="90" stroke="#aee4ff" stroke-width="4" stroke-linecap="round" filter="url(#ice-glow)"><animate attributeName="y1" values="75;85;75" dur="1.2s" repeatCount="indefinite"/></line>
            </svg>`;
        } else if (c.includes("cloud")) {
            svg = `<svg viewBox="0 0 100 100" class="icon-3d">${defs}
                <path d="M30 50 Q30 30 50 30 Q60 15 75 25 Q90 35 85 55 A15 15 0 0 1 70 70 H40 A15 15 0 0 1 30 50" fill="rgba(255,255,255,0.9)" filter="url(#frost-shadow)"/>
                <path d="M15 65 Q15 50 30 50 Q40 40 55 45 Q65 50 65 65 A10 10 0 0 1 55 75 H25 A10 10 0 0 1 15 65" fill="rgba(174,228,255,0.6)" filter="url(#frost-shadow)" transform="translate(0, 10) scale(0.9)"/>
            </svg>`;
        } else {
            svg = `<svg viewBox="0 0 100 100" class="icon-3d">${defs}
                <circle cx="50" cy="50" r="25" fill="#ffffff" filter="url(#frost-shadow)"/>
                <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(174,228,255,0.5)" stroke-width="2" stroke-dasharray="10 5" filter="url(#ice-glow)">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite"/>
                </circle>
            </svg>`;
        }
        return svg;
    }
};
