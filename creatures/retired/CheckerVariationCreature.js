class CheckerVariationCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.n = 8;
    this.margin = 0.08 * min(this.w, this.h);
    this.flip = random() < 0.5;
  }

  update() {}

  draw() {
    push();
    const iw = this.w - 2 * this.margin;
    const ih = this.h - 2 * this.margin;
    translate(this.margin, this.margin);
    const cw = iw / this.n;
    const ch = ih / this.n;
    noStroke();
    for (let r = 0; r < this.n; r++) {
      for (let c = 0; c < this.n; c++) {
        const on = (r + c) % 2 === 0;
        fill(on ? 20 : 240, on ? 20 : 240, on ? 20 : 240, 200);
        rect(c * cw, r * ch, cw, ch);
        if ((this.flip ? r : c) % 3 === 0 && on) {
          fill(random(palette));
          rect(c * cw + cw * 0.25, r * ch + ch * 0.25, cw * 0.5, ch * 0.5);
        }
      }
    }
    pop();
  }
}

