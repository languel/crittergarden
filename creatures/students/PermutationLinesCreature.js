class PermutationLinesCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.n = floor(random(8, 16));
    this.left = [];
    this.right = [];
    for (let i = 0; i < this.n; i++) {
      const t = i / (this.n - 1);
      this.left.push({ x: 0, y: t * this.h });
      this.right.push({ x: this.w, y: t * this.h });
    }
    this.perm = [...Array(this.n).keys()].sort(() => random() - 0.5);
    this.strokeColor = color(0, 80);
  }

  update() {}

  draw() {
    push();
    noFill();
    stroke(this.strokeColor);
    strokeWeight(2);
    for (let i = 0; i < this.n; i++) {
      const a = this.left[i];
      const b = this.right[this.perm[i]];
      line(a.x, a.y, b.x, b.y);
    }
    pop();
  }
}

