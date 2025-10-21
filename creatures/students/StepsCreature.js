class StepsCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.rows = floor(random(6, 12));
    this.col = random(palette);
    this.dir = random() < 0.5 ? 1 : -1;
  }

  update() {}

  draw() {
    push();
    noFill();
    stroke(this.col);
    strokeWeight(3);
    const m = 0.1 * min(this.w, this.h);
    const iw = this.w - 2 * m;
    const ih = this.h - 2 * m;
    translate(m, m);
    const rh = ih / this.rows;
    for (let r = 0; r < this.rows; r++) {
      const t = r / (this.rows - 1);
      const offset = t * iw * 0.6 * this.dir;
      const y = r * rh;
      line(0, y, iw - abs(offset), y);
      line(iw - abs(offset), y, iw - abs(offset), y + rh);
    }
    pop();
  }
}

