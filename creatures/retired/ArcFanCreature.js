class ArcFanCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.count = floor(random(8, 16));
    this.angleSpan = random(PI / 3, PI);
    this.rot = random(TWO_PI);
    this.strokeColor = random(palette);
  }

  update() {}

  draw() {
    push();
    translate(this.w / 2, this.h / 2);
    rotate(this.rot);
    noFill();
    stroke(this.strokeColor);
    strokeWeight(2);
    const r = min(this.w, this.h) * 0.45;
    for (let i = 0; i < this.count; i++) {
      const t = i / (this.count - 1);
      const a0 = -this.angleSpan * (0.5 + 0.2 * sin(i));
      const a1 = this.angleSpan * (0.5 + 0.2 * cos(i));
      const rr = r * (0.2 + 0.8 * t);
      arc(0, 0, rr * 2, rr * 2, a0, a1);
    }
    pop();
  }
}

