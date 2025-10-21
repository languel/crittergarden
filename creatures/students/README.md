Drop student creature files here. Each file should define exactly one global class that extends `Creature`, e.g.:

class AliceCreature extends Creature {
  constructor(x,y,w,h,par) { super(x,y,w,h,par); }
  update() {}
  draw() {}
}

No registration call is needed. The loader will detect classes that extend `Creature` and auto-register them.

After adding new files, run the manifest generator to update `_manifest.json`:

node tools/generate-student-manifest.mjs

