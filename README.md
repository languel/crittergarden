# Critter Garden

A p5.js class demo where every student contributes a custom creature by extending a base `Creature` class. The sketch auto‑loads all student files, registers the classes, and lets you collage them on a canvas with selection, move/resize/rotate and layering.

## Features
- Auto‑loader reads `creatures/students/_manifest.json`, loads each JS file, and registers any class extending `Creature`.
- Toolbar picker (toggle with Tab) to spawn a specific creature or a random one.
- Collage tools: select, move, resize (corners), rotate (top handle), multi‑select (Shift‑click), delete, and z‑order.
- 20+ example “pioneer” gen‑art creatures included.

## Quick Start
- Requirements: Node 16+ recommended (for the small dev tools), VS Code Live Preview (or any static server).
- Install (there are no dependencies): nothing to install.
- Run dev server + manifest watcher:
  - `npm start`
  - Open `index.html` in VS Code Live Preview (in‑editor) or visit http://127.0.0.1:5500/

## Controls
- Spawn: click empty space (uses picker selection; Random by default)
- Select: click a creature (topmost)
- Multi‑select: Shift‑click to add/remove selection
- Move: drag inside frame
- Resize: drag corner handles
- Rotate: drag top handle
- Deselect/hide frame: `Esc`
- Delete selected: `Backspace` or `Delete`
- Clear all: `Shift` + (`Backspace` or `Delete`)
- Layer forward: `Cmd/Ctrl` + `]`
- Layer backward: `Cmd/Ctrl` + `[` 
- Toggle picker: `Tab`

## Adding Student Creatures
1. Drop each student file in `creatures/students/`. Each file should define a single global class that extends `Creature` (no exports needed).
2. Regenerate the manifest:
   - One‑shot: `npm run students`
   - Or keep dev watcher running: `npm start` (auto‑updates on file changes)
3. Reload the page. Their class appears in the picker and spawns like any other.

See `creatures/students/README.md` for a tiny example.

## Project Layout
- `index.html` — loads p5, registry, base class, loader, and the sketch
- `sketch.js` — globals, collage tools, picker, and world loop
- `creatures/registry.js` — global registry (`CreatureRegistry`, `registerCreature`)
- `creatures/Creature.js` — base class to extend
- `creatures/autoLoader.js` — fetches `_manifest.json`, loads files, auto‑registers classes
- `creatures/students/` — student creature files + `_manifest.json`
- `tools/generate-student-manifest.mjs` — writes `_manifest.json`
- `tools/watch-students.mjs` — watches folder and rewrites manifest on change
- `tools/dev.mjs` — tiny static server + manifest watcher

## Scripts
- `npm start` — start static server (http://127.0.0.1:5500/) and watch students
- `npm run students` — regenerate `creatures/students/_manifest.json`
- `npm run watch:students` — watch only the students folder

## Create and Push a Git Repo
This folder is already set up to be version‑controlled. If not yet initialized, run:

```
git init
git add .
git commit -m "Initial commit: Critter Garden"
```

Then create a GitHub repo and push:

```
git branch -M main
git remote add origin git@github.com:<your-user>/crittergarden.git
git push -u origin main
```

Or with GitHub CLI:

```
gh repo create crittergarden --public --source=. --remote=origin --push
```

## Credits
- Built with p5.js
- Inspired by the work of Sol LeWitt, Vera Molnár, and early algorists.
