#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const studentsDir = path.join(root, 'creatures', 'students');
const manifestPath = path.join(studentsDir, '_manifest.json');

if (!fs.existsSync(studentsDir)) {
  console.error('No directory:', studentsDir);
  process.exit(1);
}

const entries = fs
  .readdirSync(studentsDir, { withFileTypes: true })
  .filter(d => d.isFile())
  .map(d => d.name)
  .filter(n => n.endsWith('.js'))
  .filter(n => !n.startsWith('_'))
  .sort((a, b) => a.localeCompare(b));

fs.writeFileSync(manifestPath, JSON.stringify(entries, null, 2) + '\n');
console.log('Wrote manifest:', path.relative(root, manifestPath), `(${entries.length} files)`);

