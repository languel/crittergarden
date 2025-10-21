class StripesCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.vertical = random() < 0.5;
    this.count = floor(random(6, 14));
    this.colors = [];
    for (let i = 0; i < this.count; i++) this.colors.push(random(palette));
  }

  update() {}

  draw() {
    push();
    noStroke();
    if (this.vertical) {
      const wstep = this.w / this.count;
      for (let i = 0; i < this.count; i++) {
        fill(this.colors[i]);
        rect(i * wstep, 0, wstep, this.h);
      }
    } else {
      const hstep = this.h / this.count;
      for (let i = 0; i < this.count; i++) {
        fill(this.colors[i]);
        rect(0, i * hstep, this.w, hstep);
      }
    }
    pop();
  }
}

