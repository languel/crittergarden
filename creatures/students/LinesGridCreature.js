class LinesGridCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.cols = floor(random(6, 12));
    this.rows = floor(random(6, 12));
    this.margin = 0.08 * min(this.w, this.h);
    // precompute orientations per cell (0 or 1)
    this.grid = [];
    for (let r = 0; r < this.rows; r++) {
      const row = [];
      for (let c = 0; c < this.cols; c++) row.push(random() < 0.5 ? 0 : 1);
      this.grid.push(row);
    }
    this.strokeColor = color(30, 40);
  }

  update() {}

  draw() {
    push();
    const iw = this.w - 2 * this.margin;
    const ih = this.h - 2 * this.margin;
    translate(this.margin, this.margin);
    const cw = iw / this.cols;
    const ch = ih / this.rows;
    stroke(this.strokeColor);
    noFill();
    strokeWeight(2);
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const x0 = c * cw, y0 = r * ch;
        if (this.grid[r][c] === 0) line(x0, y0, x0 + cw, y0 + ch);
        else line(x0 + cw, y0, x0, y0 + ch);
      }
    }
    pop();
  }
}

