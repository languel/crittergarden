class NoiseFieldCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.step = floor(random(10, 18));
    this.scale = random(0.003, 0.01);
    this.t = random(1000);
    this.col = color(0, 60);
  }

  update() {
    this.t += 0.002;
  }

  draw() {
    push();
    stroke(this.col);
    strokeWeight(1.5);
    noFill();
    for (let y = this.step / 2; y < this.h; y += this.step) {
      for (let x = this.step / 2; x < this.w; x += this.step) {
        const a = noise((x + this.x) * this.scale, (y + this.y) * this.scale, this.t) * TWO_PI * 2;
        const r = this.step * 0.45;
        const x2 = x + cos(a) * r;
        const y2 = y + sin(a) * r;
        line(x, y, x2, y2);
      }
    }
    pop();
  }
}
