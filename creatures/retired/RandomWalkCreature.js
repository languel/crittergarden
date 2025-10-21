class RandomWalkCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.steps = [];
    this.maxSteps = 400;
    this.stepSize = min(this.w, this.h) * 0.05;
    this.pos = { x: this.w / 2, y: this.h / 2 };
    this.col = color(0, 120);
    this.stepEvery = floor(random(2, 5)); // add a step every N frames
    this._lastStep = -9999;
  }

  update() {
    if (this.steps.length >= this.maxSteps) return;
    if ((frameCount - this._lastStep) < this.stepEvery) return;
    const ang = random(TWO_PI);
    const nx = constrain(this.pos.x + cos(ang) * this.stepSize, 0, this.w);
    const ny = constrain(this.pos.y + sin(ang) * this.stepSize, 0, this.h);
    this.steps.push({ x: nx, y: ny });
    this.pos = { x: nx, y: ny };
    this._lastStep = frameCount;
  }

  draw() {
    push();
    noFill();
    stroke(this.col);
    beginShape();
    vertex(this.w / 2, this.h / 2);
    for (const p of this.steps) vertex(p.x, p.y);
    endShape();
    pop();
  }
}
