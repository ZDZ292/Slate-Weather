const SlateIcons = {
    getAnimIcon: (condition) => {
        const c = condition.toLowerCase();
        if (c.includes('thunder') || c.includes('lightning')) {
            return `<svg class="bolt-anim" viewBox="0 0 24 24" fill="none" stroke="#00ff00" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`;
        }
        if (c.includes('rain')) {
            return `<svg class="rain-anim" viewBox="0 0 24 24" fill="none" stroke="#00ff00" stroke-width="2"><path d="M8 19v2M12 19v2M16 19v2M12 3v10m0 0l-4-4m4 4l4-4"/></svg>`;
        }
        return `<svg viewBox="0 0 24 24" fill="none" stroke="#00ff00" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    }
};
