class MondrianCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.lines = [];
    this.blocks = [];
    this.generate();
  }

  generate() {
    const stack = [{ x: 0, y: 0, w: this.w, h: this.h, d: 0 }];
    const maxD = 3;
    while (stack.length) {
      const r = stack.pop();
      if (r.d >= maxD || (r.w < this.w * 0.25 && r.h < this.h * 0.25)) {
        // terminal block
        // assign a stable optional color
        r.color = (random() < 0.25) ? random(palette) : null;
        this.blocks.push(r);
        continue;
      }
      if (r.w > r.h) {
        const cut = random(r.w * 0.3, r.w * 0.7);
        this.lines.push({ x1: r.x + cut, y1: r.y, x2: r.x + cut, y2: r.y + r.h });
        stack.push({ x: r.x, y: r.y, w: cut, h: r.h, d: r.d + 1 });
        stack.push({ x: r.x + cut, y: r.y, w: r.w - cut, h: r.h, d: r.d + 1 });
      } else {
        const cut = random(r.h * 0.3, r.h * 0.7);
        this.lines.push({ x1: r.x, y1: r.y + cut, x2: r.x + r.w, y2: r.y + cut });
        stack.push({ x: r.x, y: r.y, w: r.w, h: cut, d: r.d + 1 });
        stack.push({ x: r.x, y: r.y + cut, w: r.w, h: r.h - cut, d: r.d + 1 });
      }
    }
  }

  update() {}

  draw() {
    push();
    // fill preselected blocks
    noStroke();
    for (const b of this.blocks) {
      if (b.color) { fill(b.color); rect(b.x, b.y, b.w, b.h); }
    }
    // draw thick black lines
    stroke(0);
    strokeWeight(6);
    for (const l of this.lines) line(l.x1, l.y1, l.x2, l.y2);
    pop();
  }
}

