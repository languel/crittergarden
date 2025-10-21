class DiagonalsCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.n = floor(random(12, 24));
    this.flip = random() < 0.5;
    this.colA = color(0, 120);
    this.colB = color(0, 40);
  }

  update() {}

  draw() {
    push();
    const s = min(this.w, this.h);
    const m = 0.1 * s;
    translate(this.w / 2, this.h / 2);
    const half = (s - 2 * m) / 2;
    strokeWeight(2);
    noFill();
    for (let i = -this.n; i <= this.n; i++) {
      stroke(i % 2 === 0 ? this.colA : this.colB);
      const d = (i / this.n) * half;
      if (!this.flip) line(-half, d, half, -d);
      else line(-half, -d, half, d);
    }
    pop();
  }
}

