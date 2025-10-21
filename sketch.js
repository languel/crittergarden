/* global CreatureRegistry */
let population = [];

// let palette = ["teal", "aquamarine", "gold", "maroon", "darkgreen"];
// nice minimal aged paper palette
 let palette = ["#40312f", "#6e5849", "#c9ada1", "#f2e9e4", "#b8b0ad"];


let DEBUG = false;

// Collage selection/transform state
let activeIndex = -1; // primary selected creature (for handles/drag)
let selectedIndices = []; // multi-select support (shift-click to add/remove)
let dragMode = null; // 'move' | 'resize-nw|ne|sw|se' | 'rotate'
let dragInfo = null; // metadata for current drag
const HANDLE_R = 10;
const ROTATE_OFFSET = 30;
const MIN_SIZE = 20;
let suppressNextSpawn = false; // avoid spawning when clicking selection/handles

// Helpers for transforms
function getAngle(c) { return c.__angle || 0; }
function setAngle(c, a) { c.__angle = a; }
function getCenter(c) { return { x: c.x + c.w / 2, y: c.y + c.h / 2 }; }
function localToGlobal(c, lx, ly) {
  const a = getAngle(c);
  const cx = c.x + c.w / 2;
  const cy = c.y + c.h / 2;
  const ox = lx - c.w / 2;
  const oy = ly - c.h / 2;
  const ca = Math.cos(a), sa = Math.sin(a);
  return { x: cx + (ox * ca - oy * sa), y: cy + (ox * sa + oy * ca) };
}
function globalToLocal(c, gx, gy) {
  const a = getAngle(c);
  const cx = c.x + c.w / 2;
  const cy = c.y + c.h / 2;
  const dx = gx - cx;
  const dy = gy - cy;
  const ca = Math.cos(-a), sa = Math.sin(-a);
  const rx = dx * ca - dy * sa;
  const ry = dx * sa + dy * ca;
  return { x: rx + c.w / 2, y: ry + c.h / 2 };
}
function getCorners(c) {
  return {
    nw: localToGlobal(c, 0, 0),
    ne: localToGlobal(c, c.w, 0),
    se: localToGlobal(c, c.w, c.h),
    sw: localToGlobal(c, 0, c.h),
  };
}
function insideCritter(c, mx, my) {
  const p = globalToLocal(c, mx, my);
  return p.x >= 0 && p.x <= c.w && p.y >= 0 && p.y <= c.h;
}
function closestHandle(c, mx, my) {
  const corners = getCorners(c);
  const handles = [
    { name: 'nw', ...corners.nw },
    { name: 'ne', ...corners.ne },
    { name: 'se', ...corners.se },
    { name: 'sw', ...corners.sw },
  ];
  const topMid = localToGlobal(c, c.w / 2, 0);
  const rotatePt = {
    name: 'rotate',
    x: topMid.x + Math.cos(getAngle(c) - Math.PI / 2) * ROTATE_OFFSET,
    y: topMid.y + Math.sin(getAngle(c) - Math.PI / 2) * ROTATE_OFFSET,
  };
  let best = null;
  for (const h of [...handles, rotatePt]) {
    const d = dist(mx, my, h.x, h.y);
    if (d <= HANDLE_R * 1.2 && (!best || d < best.d)) best = { ...h, d };
  }
  return best ? best.name : null;
}
function oppositeCorner(name) {
  return { nw: 'se', ne: 'sw', se: 'nw', sw: 'ne' }[name] || null;
}

function setup() {
  createCanvas((w = windowWidth), (h = windowHeight));
  // frameRate(5); //global framerate
  syncPickerOptions(true);
}

function draw() {
  background('bisque');
  syncPickerOptions(false);
  worldManagement();
  drawSelectionOverlay();
}

/// events

function keyPressed () {
  // toggle picker with Tab
  if (keyCode === 9 /* TAB */) { togglePicker(); return false; }

  // reset population on shift-delete or shift-backspace
  if (keyIsDown(SHIFT) && (keyCode === BACKSPACE || keyCode === DELETE)) {
    population = [];
    activeIndex = -1; selectedIndices = []; dragMode = null; dragInfo = null;
    return false;
  }

  // delete selected on Backspace/Delete
  if (keyCode === BACKSPACE || keyCode === DELETE) {
    deleteSelected();
    return false;
  }

  // layer ordering: Cmd/Ctrl + ] (forward), Cmd/Ctrl + [ (backward)
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const metaHeld = (isMac ? (keyIsDown(91) || keyIsDown(93)) : keyIsDown(CONTROL)) || (typeof window !== 'undefined' && window.event && (window.event.metaKey || window.event.ctrlKey));
  const isBracketRight = key === ']' || key === '}' || keyCode === 221;
  const isBracketLeft  = key === '[' || key === '{' || keyCode === 219;
  if (metaHeld && isBracketRight) { bringForwardOne(); return false; }
  if (metaHeld && isBracketLeft)  { sendBackwardOne(); return false; }

  if (keyCode === ESCAPE) { activeIndex = -1; selectedIndices = []; dragMode = null; dragInfo = null; return false; }
}

function mousePressed() {
  // select topmost under cursor
  let idx = -1;
  let preHandle = null;
  for (let i = population.length - 1; i >= 0; i--) {
    const c = population[i];
    const h = closestHandle(c, mouseX, mouseY);
    if (h) { idx = i; preHandle = h; break; }
    if (insideCritter(c, mouseX, mouseY)) { idx = i; break; }
  }
  if (idx === -1) { activeIndex = -1; if (!keyIsDown(SHIFT)) selectedIndices = []; dragMode = null; dragInfo = null; return; }
  suppressNextSpawn = true;

  // Multi-select: shift-click toggles selection state, otherwise single select
  let proceedToDrag = true;
  if (keyIsDown(SHIFT)) {
    const pos = selectedIndices.indexOf(idx);
    if (pos >= 0) { selectedIndices.splice(pos, 1); proceedToDrag = false; }
    else { selectedIndices.push(idx); }
  } else {
    selectedIndices = [idx];
  }
  if (selectedIndices.indexOf(idx) >= 0) activeIndex = idx;
  else if (selectedIndices.length > 0) activeIndex = selectedIndices[selectedIndices.length - 1];
  else activeIndex = -1;
  if (!proceedToDrag || activeIndex === -1) { dragMode = null; dragInfo = null; return; }

  const c = population[activeIndex];
  const handle = preHandle || closestHandle(c, mouseX, mouseY);
  if (handle === 'rotate') {
    dragMode = 'rotate';
    const ctr = getCenter(c);
    dragInfo = { angle0: getAngle(c), ctr, v0: { x: mouseX - ctr.x, y: mouseY - ctr.y } };
  } else if (['nw','ne','se','sw'].includes(handle)) {
    dragMode = 'resize-' + handle;
    const anchorName = oppositeCorner(handle);
    const corners = getCorners(c);
    const anchor = corners[anchorName];
    dragInfo = { anchorName, anchor, angle0: getAngle(c) };
  } else {
    dragMode = 'move';
    const pLocal = globalToLocal(c, mouseX, mouseY);
    dragInfo = { pLocal };
  }
}

function mouseDragged() {
  if (activeIndex < 0 || !dragMode) return;
  const c = population[activeIndex];
  if (dragMode === 'move') {
    const a = getAngle(c);
    const p = dragInfo.pLocal;
    const ca = Math.cos(a), sa = Math.sin(a);
    const cx = mouseX - ( (p.x - c.w/2) * ca - (p.y - c.h/2) * sa );
    const cy = mouseY - ( (p.x - c.w/2) * sa + (p.y - c.h/2) * ca );
    c.x = cx - c.w/2; c.y = cy - c.h/2;
  } else if (dragMode.startsWith('resize-')) {
    const handle = dragMode.split('-')[1];
    const anchorName = oppositeCorner(handle);
    const angle = getAngle(c);
    const A = dragInfo.anchor; // fixed global point
    // project mouse into local axes around anchor
    const dx = mouseX - A.x, dy = mouseY - A.y;
    const ca = Math.cos(-angle), sa = Math.sin(-angle);
    const vxl = dx * ca - dy * sa;
    const vyl = dx * sa + dy * ca;
    let newW = Math.max(MIN_SIZE, Math.abs(vxl));
    let newH = Math.max(MIN_SIZE, Math.abs(vyl));
    // anchor local coord depends on which corner is the anchor
    let alx = 0, aly = 0;
    if (anchorName === 'ne') { alx = newW; aly = 0; }
    else if (anchorName === 'sw') { alx = 0; aly = newH; }
    else if (anchorName === 'se') { alx = newW; aly = newH; }
    // solve new center from fixed anchor
    const cx = A.x - ( (alx - newW/2) * Math.cos(angle) - (aly - newH/2) * Math.sin(angle) );
    const cy = A.y - ( (alx - newW/2) * Math.sin(angle) + (aly - newH/2) * Math.cos(angle) );
    c.w = newW; c.h = newH;
    c.x = cx - c.w/2; c.y = cy - c.h/2;
  } else if (dragMode === 'rotate') {
    const ctr = dragInfo.ctr;
    const v0 = dragInfo.v0;
    const v1 = { x: mouseX - ctr.x, y: mouseY - ctr.y };
    const a0 = Math.atan2(v0.y, v0.x);
    const a1 = Math.atan2(v1.y, v1.x);
    setAngle(c, dragInfo.angle0 + (a1 - a0));
  }
}


function mouseReleased() {
  // end drag
  if (dragMode) { dragMode = null; dragInfo = null; suppressNextSpawn = false; return; }
  // spawn only if clicking empty space
  if (suppressNextSpawn) { suppressNextSpawn = false; return; }
  let onAny = false;
  for (let i = population.length - 1; i >= 0; i--) {
    if (insideCritter(population[i], mouseX, mouseY)) { onAny = true; break; }
  }
  if (onAny) { return; }
  const Ctor = pickCtorFromUI();
  if (!Ctor) return; // no available creatures
  const critter = new Ctor(
    mouseX,
    mouseY,
    random(0.1 * w, 0.25 * w),
    random(0.1 * h, 0.25 * h)
  );
  population.push(critter);
}

///
function worldManagement() {
  for (let critter of population) {
    critter.update();
    drawCreatureTransformed(critter);
  }
}

function drawCreatureTransformed(c) {
  push();
  const a = getAngle(c);
  const ox = c.x, oy = c.y;
  translate(c.x + c.w/2, c.y + c.h/2);
  rotate(a);
  translate(-c.w/2, -c.h/2);
  c.x = 0; c.y = 0;
  c.draw();
  c.x = ox; c.y = oy;
  pop();
}

// Picker helpers
let lastPickerCount = -1;
function syncPickerOptions(force) {
  const reg = (window.CreatureRegistry || []);
  const count = reg.length;
  if (!force && count === lastPickerCount) return;
  const sel = document.getElementById('creaturePicker');
  if (!sel) return;
  const prev = sel.value;
  // clear all but first (Random)
  while (sel.options.length > 1) sel.remove(1);
  for (const e of reg) {
    const opt = document.createElement('option');
    opt.value = e.name;
    opt.textContent = e.name;
    sel.appendChild(opt);
  }
  const hasPrev = [...sel.options].some(o => o.value === prev);
  sel.value = hasPrev ? prev : '__random__';
  lastPickerCount = count;
}

function pickCtorFromUI() {
  const reg = (window.CreatureRegistry || []);
  if (!reg.length) return null;
  const sel = document.getElementById('creaturePicker');
  const choice = sel ? sel.value : '__random__';
  if (!choice || choice === '__random__') return random(reg).ctor;
  const m = reg.find(e => e.name === choice);
  return m ? m.ctor : random(reg).ctor;
}

function togglePicker() {
  const bar = document.getElementById('toolbar');
  if (!bar) return;
  const isHidden = bar.style.display === 'none';
  bar.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    const sel = document.getElementById('creaturePicker');
    if (sel) sel.focus();
  } else {
    if (document.activeElement) document.activeElement.blur();
  }
}

function drawSelectionOverlay() {
  if (selectedIndices.length === 0) return;
  // draw frames for all selected; draw handles for active only
  push();
  for (const idx of selectedIndices) {
    const c = population[idx];
    stroke('hotpink');
    noFill();
    strokeWeight(idx === activeIndex ? 2 : 1);
    const corners = getCorners(c);
    beginShape();
    vertex(corners.nw.x, corners.nw.y);
    vertex(corners.ne.x, corners.ne.y);
    vertex(corners.se.x, corners.se.y);
    vertex(corners.sw.x, corners.sw.y);
    endShape(CLOSE);
    if (idx === activeIndex) {
      fill('white'); stroke('hotpink');
      for (const pt of [corners.nw, corners.ne, corners.se, corners.sw]) circle(pt.x, pt.y, HANDLE_R * 2);
      const topMid = localToGlobal(c, c.w/2, 0);
      const rx = topMid.x + Math.cos(getAngle(c) - Math.PI/2) * ROTATE_OFFSET;
      const ry = topMid.y + Math.sin(getAngle(c) - Math.PI/2) * ROTATE_OFFSET;
      line(topMid.x, topMid.y, rx, ry);
      circle(rx, ry, HANDLE_R * 2);
    }
  }
  pop();
}

// Helpers: delete + z-order
function deleteSelected() {
  if (selectedIndices.length === 0) return;
  // remove from highest index to lowest
  const sorted = [...selectedIndices].sort((a,b)=>b-a);
  for (const i of sorted) {
    if (i >= 0 && i < population.length) population.splice(i, 1);
  }
  activeIndex = -1;
  selectedIndices = [];
}

function bringForwardOne() {
  if (selectedIndices.length === 0) return;
  let sel = new Set(selectedIndices);
  for (let i = population.length - 2; i >= 0; i--) {
    if (sel.has(i) && !sel.has(i + 1)) {
      const tmp = population[i + 1];
      population[i + 1] = population[i];
      population[i] = tmp;
      selectedIndices = selectedIndices.map(ix => ix === i ? i + 1 : (ix === i + 1 ? i : ix));
      if (activeIndex === i) activeIndex = i + 1; else if (activeIndex === i + 1) activeIndex = i;
      sel = new Set(selectedIndices);
    }
  }
}

function sendBackwardOne() {
  if (selectedIndices.length === 0) return;
  let sel = new Set(selectedIndices);
  for (let i = 1; i < population.length; i++) {
    if (sel.has(i) && !sel.has(i - 1)) {
      const tmp = population[i - 1];
      population[i - 1] = population[i];
      population[i] = tmp;
      selectedIndices = selectedIndices.map(ix => ix === i ? i - 1 : (ix === i - 1 ? i : ix));
      if (activeIndex === i) activeIndex = i - 1; else if (activeIndex === i - 1) activeIndex = i;
      sel = new Set(selectedIndices);
    }
  }
}

// Classes moved to separate files in ./creatures
