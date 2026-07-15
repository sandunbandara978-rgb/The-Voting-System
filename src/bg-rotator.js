// Background rotator: picks wallpapers by time of day and rotates them periodically
(function () {
  // separate wallpaper pools for dark and light themes
  const wallpapers = {
    dark: {
      morning: [
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80'
      ],
      day: [
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80'
      ],
      evening: [
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1600&q=80'
      ],
      night: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80'
      ]
    },
    light: {
      morning: [
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1600&q=80'
      ],
      day: [
        'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600&q=80'
      ],
      evening: [
        'https://images.unsplash.com/photo-1473938703430-4d7b234f5a27?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80'
      ],
      night: [
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80'
      ]
    }
  };

  function timeOfDay() {
    const h = new Date().getHours();
    if (h >= 6 && h < 12) return 'morning';
    if (h >= 12 && h < 18) return 'day';
    if (h >= 18 && h < 22) return 'evening';
    return 'night';
  }

  function setBackground(url) {
    // set the CSS variable for the background URL so theme CSS remains in control of overlay
    document.body.style.setProperty('--bg-url', `url('${url}')`);
  }

  function currentPool() {
    const kind = timeOfDay();
    const themeKey = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const pool = (wallpapers[themeKey] && wallpapers[themeKey][kind]) || [];
    if (pool.length) return pool;
    // fallback to any available lists
    const fallback = [];
    Object.values(wallpapers).forEach(obj => Object.values(obj).forEach(arr => arr.forEach(u => fallback.push(u))));
    return fallback;
  }

  let pool = currentPool();
  let idx = Math.floor(Math.random() * pool.length);
  setBackground(pool[idx]);

  // rotate every 30 seconds to show variety (adjust if you prefer slower)
  const rot = setInterval(() => {
    pool = currentPool();
    idx = (idx + 1) % pool.length;
    setBackground(pool[idx]);
  }, 30000);

  // respond to theme changes so wallpaper can adapt if needed
  window.addEventListener('themechange', () => {
    pool = currentPool();
    idx = Math.floor(Math.random() * pool.length);
    setBackground(pool[idx]);
  });
})();
