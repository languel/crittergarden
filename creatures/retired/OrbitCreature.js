class OrbitCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.size = min(this.w, this.h);
    this.coreColor = random(palette);
    this.satellites = [];
    const n = floor(random(3, 7));
    for (let i = 0; i < n; i++) {
      this.satellites.push({
        r: random(0.25, 0.6) * this.size,
        a: random(TWO_PI),
        s: random(0.01, 0.03) * (random() < 0.5 ? -1 : 1),
        d: random(8, 18),
        c: random(palette),
      });
    }
  }

  update() {
    for (let s of this.satellites) {
      s.a += s.s;
    }
  }

  draw() {
    push();
    // draw centered within the creature's local bounding box
    const cx = this.w / 2; const cy = this.h / 2;
    // orbits
    noFill();
    stroke(0, 40);
    for (let s of this.satellites) {
      circle(cx, cy, s.r * 2);
    }
    // core
    noStroke();
    fill(this.coreColor);
    circle(cx, cy, this.size * 0.3);
    // satellites
    for (let s of this.satellites) {
      const px = cx + cos(s.a) * s.r;
      const py = cy + sin(s.a) * s.r;
      fill(s.c);
      noStroke();
      circle(px, py, s.d);
    }
    pop();
  }
}
