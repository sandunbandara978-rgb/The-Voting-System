// Theme toggle: switch between dark and light themes and persist choice
(function () {
  const TOGGLE_ID = 'themeToggle';

  function setTheme(theme) {
    document.body.classList.toggle('light-theme', theme === 'light');
    try { localStorage.setItem('theme', theme); } catch (e) {}
    const checkbox = document.getElementById(TOGGLE_ID);
    if (checkbox) checkbox.checked = theme === 'light';
    // notify other scripts (bg rotator) that theme changed
    try { window.dispatchEvent(new CustomEvent('themechange', { detail: theme })); } catch (e) {}
  }

  function init() {
    const stored = (function () { try { return localStorage.getItem('theme'); } catch (e) { return null; }})();
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = stored || (prefersLight ? 'light' : 'dark');
    setTheme(initial);

    document.addEventListener('change', (e) => {
      const target = e.target;
      if (target && target.id === TOGGLE_ID) {
        setTheme(target.checked ? 'light' : 'dark');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
