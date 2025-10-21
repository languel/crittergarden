class SpiralLinesCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.turns = random(2, 6);
    this.strokeColor = color(0, 100);
  }

  update() {}

  draw() {
    push();
    translate(this.w / 2, this.h / 2);
    noFill();
    stroke(this.strokeColor);
    const rMax = min(this.w, this.h) * 0.45;
    beginShape();
    const total = 400;
    for (let i = 0; i <= total; i++) {
      const t = i / total;
      const a = t * this.turns * TWO_PI;
      const r = t * rMax;
      vertex(cos(a) * r, sin(a) * r);
    }
    endShape();
    pop();
  }
}

