class SquiggleCreature extends DotCreature {
  constructor(x, y, w, h, par) {
    super(x, y, w, h, par);
    this.strokeWeight = 5;

    this.parts = []; // memory of where the parts are
    let nParts = random(5, 8) * 3; // random creature choices on creation
    for (let i = 0; i < nParts - 1; i++) {
      // init the parts
      let rndx = random(0, this.w);
      let rndy = random(this.h);

      this.parts.push({ x: rndx, y: rndy });
    }
  }

  update() {
    if (mouseIsPressed) {
      let d = dist(this.x, this.y, mouseX, mouseY);
      let vx = this.x - mouseX;
      let vy = this.y - mouseY;

      this.x += -random(0, 0.1) * vx;
      this.y += -random(0, 0.1) * vy;
    }
    for (let p of this.parts) {
      p.x += random(-3, 3);
      p.y += random(-3, 3);
    }
  }

  drawParts() {
    push();
    translate(this.x, this.y);
    stroke(this.stroke);
    noFill();
    strokeWeight(this.strokeWeight);
    beginShape();

    vertex(this.parts[0].x, this.parts[0].y);
    for (let i = 0; i < this.parts.length - 2; i = i + 3) {
      bezierVertex(
        this.parts[i].x,
        this.parts[i].y,
        this.parts[i + 1].x,
        this.parts[i + 1].y,
        this.parts[i + 2].x,
        this.parts[i + 2].y
      );
    }

    endShape();
    pop();
  }
}
