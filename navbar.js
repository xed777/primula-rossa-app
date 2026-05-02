/* ─────────────────────────────────────────────────
   Bottom Navigation Bar
───────────────────────────────────────────────── */
window.Navbar = (() => {
  const items = [
    { route: '/home',    icon: 'home',     label: 'Home'    },
    { route: '/prenota', icon: 'calendar', label: 'Prenota' },
    { route: '/galleria',icon: 'image',    label: 'Galleria'},
    { route: '/profilo', icon: 'user',     label: 'Profilo' },
  ];

  const icons = {
    home: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12L12 3l9 9"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/></svg>`,
    calendar: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    image: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>`,
    user: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
  };

  function render(activeRoute) {
    return `
      <nav class="bottom-nav" id="bottom-nav">
        ${items.map(item => `
          <button class="nav-item ${activeRoute === item.route ? 'active' : ''}"
                  data-route="${item.route}" onclick="App.navigate('${item.route}')">
            <span class="nav-icon">${icons[item.icon]}</span>
            <span class="nav-label">${item.label}</span>
          </button>
        `).join('')}
      </nav>`;
  }

  function update(route) {
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;
    nav.querySelectorAll('.nav-item').forEach(btn => {
      const active = btn.dataset.route === route;
      btn.classList.toggle('active', active);
    });
  }

  return { render, update };
})();
