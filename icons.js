const SlateIcons = {
    getIcon: (condition) => {
        const c = condition.toLowerCase();
        let color = "#00ff6a";
        if (c.includes("rain")) return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" class="glass-svg"><path d="M8 19v2M12 19v2M16 19v2M20 16.5a4 4 0 00-4-4 4 4 0 00-7.5-1.5 5 5 0 101.5 9.5h10a4 4 0 000-8z"/></svg>`;
        if (c.includes("cloud")) return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" class="glass-svg"><path d="M20 16.5a4 4 0 00-4-4 4 4 0 00-7.5-1.5 5 5 0 101.5 9.5h10a4 4 0 000-8z"/></svg>`;
        return `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" class="glass-svg"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    }
};
