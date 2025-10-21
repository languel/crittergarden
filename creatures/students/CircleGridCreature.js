class CircleGridCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.cols = floor(random(6, 12));
    this.rows = floor(random(6, 12));
    this.margin = 0.08 * min(this.w, this.h);
    this.strokeColor = color(0, 80);
  }

  update() {}

  draw() {
    push();
    const iw = this.w - 2 * this.margin;
    const ih = this.h - 2 * this.margin;
    translate(this.margin, this.margin);
    const cw = iw / this.cols;
    const ch = ih / this.rows;
    noFill();
    stroke(this.strokeColor);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const x = c * cw + cw / 2;
        const y = r * ch + ch / 2;
        const k = ((r + c) % 2 === 0) ? 0.8 : 0.4;
        circle(x, y, min(cw, ch) * k);
      }
    }
    pop();
  }
}

