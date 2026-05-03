const WeatherIcons = {
    getIcon: (type) => {
        const icons = {
            'rain': `<svg class="anim-weather" viewBox="0 0 512 512"><path d="M400 224h-24c-1.3 0-2.5.2-3.8.4C362.1 162.7 314.1 128 256 128c-51.1 0-94.2 26.6-113.3 64.1-3.6-1.1-7.4-2.1-11.4-2.1-22.1 0-40 17.9-40 40 0 1 .1 2 .2 3C60.1 245.5 32 279.1 32 320c0 48.6 39.4 88 88 88h280c48.6 0 88-39.4 88-88s-39.4-88-88-88z" fill="#444"/><rect class="drop" x="160" y="420" width="4" height="20" fill="#00ff00"/><rect class="drop" x="250" y="440" width="4" height="20" fill="#00ff00"/><rect class="drop" x="340" y="420" width="4" height="20" fill="#00ff00"/></svg>`,
            'lightning': `<svg class="anim-weather" viewBox="0 0 512 512"><path d="M400 224h-24c-1.3 0-2.5.2-3.8.4C362.1 162.7 314.1 128 256 128c-51.1 0-94.2 26.6-113.3 64.1-3.6-1.1-7.4-2.1-11.4-2.1-22.1 0-40 17.9-40 40 0 1 .1 2 .2 3C60.1 245.5 32 279.1 32 320c0 48.6 39.4 88 88 88h280c48.6 0 88-39.4 88-88s-39.4-88-88-88z" fill="#333"/><path class="bolt" d="M256 464l-32-96h64l-48-128 96 112h-64z" fill="#00ff00"/></svg>`
        };
        return icons[type] || icons['rain'];
    }
};
