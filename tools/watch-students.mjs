#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const studentsDir = path.join(root, 'creatures', 'students');
const manifestPath = path.join(studentsDir, '_manifest.json');

function scan() {
  if (!fs.existsSync(studentsDir)) return [];
  return fs
    .readdirSync(studentsDir, { withFileTypes: true })
    .filter(d => d.isFile())
    .map(d => d.name)
    .filter(n => n.endsWith('.js'))
    .filter(n => !n.startsWith('_'))
    .sort((a, b) => a.localeCompare(b));
}

function writeManifest(entries) {
  fs.writeFileSync(manifestPath, JSON.stringify(entries, null, 2) + '\n');
}

function regen(reason = '') {
  const entries = scan();
  writeManifest(entries);
  const msg = `students manifest updated (${entries.length} files)` + (reason ? ` — ${reason}` : '');
  console.log(msg);
}

// initial write
regen('initial');

// watch for changes with debounce
let timer = null;
function schedule(reason) {
  clearTimeout(timer);
  timer = setTimeout(() => regen(reason), 150);
}

try {
  fs.watch(studentsDir, { persistent: true }, (eventType, filename) => {
    if (!filename) return schedule('change');
    if (!filename.endsWith('.js')) return; // ignore non-js
    if (filename.startsWith('_')) return;  // ignore manifest or private files
    schedule(`${eventType}: ${filename}`);
  });
  console.log('watching', path.relative(root, studentsDir));
} catch (err) {
  console.error('watch failed:', err.message);
  process.exit(1);
}

