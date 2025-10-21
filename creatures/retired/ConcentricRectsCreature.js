class ConcentricRectsCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.levels = floor(random(6, 12));
    this.col = random(palette);
  }

  update() {}

  draw() {
    push();
    translate(this.w / 2, this.h / 2);
    rectMode(CENTER);
    noFill();
    stroke(this.col);
    strokeWeight(2);
    const s = min(this.w, this.h) * 0.9;
    for (let i = 0; i < this.levels; i++) {
      const t = i / (this.levels - 1);
      const k = lerp(1, 0.1, t);
      rect(0, 0, s * k, s * k);
    }
    pop();
  }
}

