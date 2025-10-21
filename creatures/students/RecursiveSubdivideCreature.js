class RecursiveSubdivideCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.depth = 0;
    this.rects = [];
    this.maxDepth = 3;
    this.generate();
    this.col = color(0, 60);
  }

  generate() {
    this.rects = [];
    const rec = (x, y, w, h, d) => {
      this.rects.push({ x, y, w, h, d });
      if (d >= this.maxDepth) return;
      if (w > h) {
        const cut = random(0.3, 0.7) * w;
        rec(x, y, cut, h, d + 1);
        rec(x + cut, y, w - cut, h, d + 1);
      } else {
        const cut = random(0.3, 0.7) * h;
        rec(x, y, w, cut, d + 1);
        rec(x, y + cut, w, h - cut, d + 1);
      }
    };
    rec(0, 0, this.w, this.h, 0);
  }

  update() {}

  draw() {
    push();
    noFill();
    stroke(this.col);
    strokeWeight(2);
    for (const r of this.rects) {
      rect(r.x, r.y, r.w, r.h);
    }
    pop();
  }
}

