class StarCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.size = min(this.w, this.h);
    this.n = floor(random(5, 9));
    this.inner = this.size * random(0.15, 0.35);
    this.outer = this.size * random(0.35, 0.55);
    this.fillColor = random(palette);
    this.strokeColor = color(0, 80);
    this.rot = random(TWO_PI);
    this.spin = random(-0.02, 0.02);
  }

  update() {
    this.rot += this.spin;
  }

  drawStar(n, inner, outer) {
    const step = TWO_PI / (n * 2);
    beginShape();
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = i * step;
      vertex(cos(a) * r, sin(a) * r);
    }
    endShape(CLOSE);
  }

  draw() {
    push();
    translate(this.w / 2, this.h / 2);
    rotate(this.rot);
    stroke(this.strokeColor);
    strokeWeight(2);
    fill(this.fillColor);
    this.drawStar(this.n, this.inner, this.outer);
    pop();
  }
}
