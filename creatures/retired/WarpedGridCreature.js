class WarpedGridCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.cols = floor(random(8, 16));
    this.rows = floor(random(8, 16));
    this.margin = 0.08 * min(this.w, this.h);
    this.kx = random(0.6, 1.4);
    this.ky = random(0.6, 1.4);
    this.phase = random(TWO_PI);
    this.speed = random(0.002, 0.006);
    this.strokeColor = color(0, 60);
  }

  update() { this.phase += this.speed; }

  draw() {
    push();
    const iw = this.w - 2 * this.margin;
    const ih = this.h - 2 * this.margin;
    translate(this.margin, this.margin);
    stroke(this.strokeColor);
    noFill();
    // verticals
    for (let c = 0; c <= this.cols; c++) {
      const x = (c / this.cols) * iw;
      beginShape();
      for (let r = 0; r <= this.rows; r++) {
        const y = (r / this.rows) * ih;
        const off = sin(this.phase + x * 0.02 * this.kx + y * 0.02 * this.ky) * iw * 0.03;
        vertex(x + off, y);
      }
      endShape();
    }
    // horizontals
    for (let r = 0; r <= this.rows; r++) {
      const y = (r / this.rows) * ih;
      beginShape();
      for (let c = 0; c <= this.cols; c++) {
        const x = (c / this.cols) * iw;
        const off = cos(this.phase + x * 0.02 * this.kx + y * 0.02 * this.ky) * ih * 0.03;
        vertex(x, y + off);
      }
      endShape();
    }
    pop();
  }
}

