class LissajousCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.a = floor(random(2, 6));
    this.b = floor(random(3, 8));
    this.delta = random(PI);
    this.rot = random(TWO_PI);
    this.col = random(palette);
    this.t = 0;
  }

  update() { this.t += 0.004; }

  draw() {
    push();
    translate(this.w / 2, this.h / 2);
    rotate(this.rot);
    stroke(this.col);
    noFill();
    strokeWeight(2);
    const r = min(this.w, this.h) * 0.4;
    beginShape();
    for (let i = 0; i < 300; i++) {
      const t = map(i, 0, 299, 0, TWO_PI);
      const x = r * sin(this.a * (t + this.t) + this.delta);
      const y = r * sin(this.b * (t + this.t));
      vertex(x, y);
    }
    endShape();
    pop();
  }
}

