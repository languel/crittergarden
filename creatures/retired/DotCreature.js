class DotCreature extends Creature {
  constructor(x = 0, y = 0, w = 10, h = 10, par = {}) {
    super(x, y, w, h, par);

    this.size = min(this.w, this.h);
    this.stroke = color(random(255), random(255), random(255));
    this.frameColor = "black";

    this.parts = []; // memory of where the parts are
    let nParts = random(3, 5); // random creature choices on creation
    for (let i = 0; i < nParts - 1; i++) {
      // init the parts
      let rndx = random(0, this.w);
      let rndy = random(this.h);

      this.parts.push({ x: rndx, y: rndy, fill: random(palette) });
    }
  }

  drawParts() {
    push();
    translate(this.x, this.y);
    for (let p of this.parts) {
      fill(p.fill);
      circle(p.x, p.y, 0.3 * this.size);
    }
    pop();
  }

  debugDraw() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke("hotpink");
    rect(0, 0, this.w, this.h);
    pop();
  }

  draw() {
    this.drawParts();
    if (DEBUG) this.debugDraw();
  }
}
