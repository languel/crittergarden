// Auto-load and auto-register student creature classes.
// Looks for a manifest at creatures/students/_manifest.json like:
// ["AliceCreature.js", "BobCreature.js"]
// For each file, it injects a <script> and auto-registers any global class
// exported by that file that extends Creature.
(function() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (typeof registerCreature !== 'function' || typeof Creature === 'undefined') return;

  const manifestUrl = 'creatures/students/_manifest.json';

  function parseClassNames(jsText) {
    const names = [];
    const re = /class\s+([A-Za-z_$][\w$]*)\s+extends\s+([A-Za-z_$][\w$]*)/g;
    let m;
    while ((m = re.exec(jsText)) !== null) {
      names.push(m[1]);
    }
    return names;
  }

  function loadItemsSequential(items, onDone) {
    const next = () => {
      const item = items.shift();
      if (!item) { onDone && onDone(); return; }
      const s = document.createElement('script');
      s.async = false; // preserve order
      s.src = item.url;
      s.onload = () => {
        try {
          for (const name of item.classNames) {
            let ctor = window[name];
            if (typeof ctor !== 'function') {
              try { ctor = (0, eval)(name); } catch (_) { ctor = undefined; }
            }
            if (typeof ctor === 'function' && ctor.prototype && (ctor === Creature || ctor.prototype instanceof Creature)) {
              registerCreature(name, ctor);
            }
          }
        } catch (_) {}
        next();
      };
      s.onerror = () => next();
      document.head.appendChild(s);
    };
    next();
  }

  fetch(manifestUrl)
    .then(r => (r.ok ? r.json() : []))
    .catch(() => [])
    .then(async (list) => {
      if (!Array.isArray(list) || list.length === 0) return;
      const names = list.filter(n => typeof n === 'string' && n.endsWith('.js'));
      const items = [];
      for (const name of names) {
        const url = `creatures/students/${name}`;
        let classNames = [];
        try {
          const resp = await fetch(url, { cache: 'no-cache' });
          const text = await resp.text();
          classNames = parseClassNames(text);
        } catch (_) {}
        items.push({ url, classNames });
      }
      loadItemsSequential(items);
    });
})();
