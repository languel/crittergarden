class OffsetSquaresCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.n = floor(random(5, 10));
    this.margin = 0.1 * min(this.w, this.h);
    this.squares = [];
    const s = min(this.w, this.h) - 2 * this.margin;
    for (let i = 0; i < this.n; i++) {
      const t = i / (this.n - 1);
      const side = lerp(s, s * 0.2, t);
      const jitter = (1 - t) * 0.15 * s;
      this.squares.push({
        side,
        dx: random(-jitter, jitter),
        dy: random(-jitter, jitter),
        sc: random(palette),
      });
    }
  }

  update() {}

  draw() {
    push();
    translate(this.w / 2, this.h / 2);
    noFill();
    strokeWeight(2);
    for (const q of this.squares) {
      stroke(q.sc);
      rectMode(CENTER);
      rect(q.dx, q.dy, q.side, q.side);
    }
    pop();
  }
}

