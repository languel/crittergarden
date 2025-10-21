// Simple global registry for creature constructors
window.CreatureRegistry = window.CreatureRegistry || [];

window.registerCreature = function registerCreature(name, ctor) {
  if (typeof ctor !== 'function') return;
  // avoid duplicates by name
  if (!window.CreatureRegistry.some(e => e.name === name)) {
    window.CreatureRegistry.push({ name, ctor });
  }
};
