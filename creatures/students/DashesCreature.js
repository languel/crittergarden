class DashesCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.rows = floor(random(8, 16));
    this.density = random(0.2, 0.6);
    this.strokeColor = color(0, 100);
  }

  update() {}

  draw() {
    push();
    const m = 0.08 * min(this.w, this.h);
    const iw = this.w - 2 * m;
    const ih = this.h - 2 * m;
    translate(m, m);
    stroke(this.strokeColor);
    strokeWeight(3);
    noFill();
    const rh = ih / this.rows;
    for (let r = 0; r < this.rows; r++) {
      const y = r * rh + rh / 2;
      let x = 0;
      while (x < iw) {
        const len = random(10, 30);
        if (random() < this.density) line(x, y, min(x + len, iw), y);
        x += len + random(5, 20);
      }
    }
    pop();
  }
}

