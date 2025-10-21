class DotMatrixCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.cols = floor(random(8, 16));
    this.rows = floor(random(8, 16));
    this.margin = 0.08 * min(this.w, this.h);
    this.maxR = min(this.w, this.h) / max(this.cols, this.rows) * 0.5;
    this.seed = random(1000);
    this.colorUpdateInterval = floor(random(30, 120)); // frames between color refreshes
    this.lastColorUpdate = -1;
    this.colors = [];
    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < this.cols; c++) row.push(random(palette));
      this.colors.push(row);
    }
  }

  update() {
    if (frameCount - this.lastColorUpdate >= this.colorUpdateInterval) {
      // refresh a subset of colors to retain some flicker but slower
      for (let i = 0; i < (this.cols * this.rows) * 0.1; i++) {
        const r = floor(random(this.rows));
        const c = floor(random(this.cols));
        this.colors[r][c] = random(palette);
      }
      this.lastColorUpdate = frameCount;
    }
  }

  draw() {
    push();
    const iw = this.w - 2 * this.margin;
    const ih = this.h - 2 * this.margin;
    translate(this.margin, this.margin);
    const cw = iw / this.cols;
    const ch = ih / this.rows;
    noStroke();
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const x = c * cw + cw / 2;
        const y = r * ch + ch / 2;
        const v = noise(this.seed + c * 0.2, this.seed + r * 0.2);
        const d = lerp(2, min(cw, ch) * 0.9, v);
        fill(this.colors[r][c]);
        circle(x, y, d);
      }
    }
    pop();
  }
}
