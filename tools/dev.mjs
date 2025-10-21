#!/usr/bin/env node
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const port = process.env.PORT ? Number(process.env.PORT) : 5500;

// Minimal static server
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURI((req.url || '/')).split('?')[0];
  let filePath = path.join(root, urlPath);
  // prevent path traversal
  if (!filePath.startsWith(root)) {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  // default to index.html for root and directories
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (urlPath === '/' || !fs.existsSync(filePath)) {
    const candidate = path.join(root, urlPath === '/' ? 'index.html' : urlPath);
    if (fs.existsSync(candidate)) filePath = candidate;
  }

  try {
    const ext = path.extname(filePath).toLowerCase();
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`dev server listening on http://127.0.0.1:${port}/`);
  console.log('Open index.html with VS Code Live Preview for in-editor view, or a browser.');
});

// Also watch and update the students manifest
import './watch-students.mjs';

