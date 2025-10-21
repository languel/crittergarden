class TrianglesTilingCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.cols = floor(random(6, 12));
    this.rows = floor(random(6, 12));
    this.margin = 0.06 * min(this.w, this.h);
  }

  update() {}

  drawTri(x, y, w, h, up) {
    beginShape();
    if (up) {
      vertex(x, y + h);
      vertex(x + w / 2, y);
      vertex(x + w, y + h);
    } else {
      vertex(x, y);
      vertex(x + w / 2, y + h);
      vertex(x + w, y);
    }
    endShape(CLOSE);
  }

  draw() {
    push();
    const iw = this.w - 2 * this.margin;
    const ih = this.h - 2 * this.margin;
    translate(this.margin, this.margin);
    const tw = iw / this.cols;
    const th = ih / this.rows;
    noStroke();
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const up = (r + c) % 2 === 0;
        fill(random(palette));
        this.drawTri(c * tw, r * th, tw, th, up);
      }
    }
    pop();
  }
}

