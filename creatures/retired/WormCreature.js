class WormCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.segs = floor(random(12, 24));
    this.phase = random(1000);
    this.bodyColor = random(palette);
    this.strokeColor = color(0, 60);
    this.ampl = this.h * 0.3;
    this.speed = random(0.01, 0.03);
  }

  update() {
    this.phase += this.speed;
  }

  draw() {
    push();
    translate(this.w / 2, this.h / 2);
    noFill();
    stroke(this.strokeColor);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < this.segs; i++) {
      const t = i / (this.segs - 1);
      const x = lerp(-this.w * 0.4, this.w * 0.4, t);
      const y = sin(this.phase + t * TWO_PI * 2.5) * this.ampl * (0.5 + 0.5 * cos(t * PI));
      curveVertex(x, y);
    }
    endShape();

    // draw filled segments on top
    noStroke();
    fill(this.bodyColor);
    for (let i = 0; i < this.segs; i++) {
      const t = i / (this.segs - 1);
      const x = lerp(-this.w * 0.4, this.w * 0.4, t);
      const y = sin(this.phase + t * TWO_PI * 2.5) * this.ampl * (0.5 + 0.5 * cos(t * PI));
      const d = lerp(this.h * 0.35, this.h * 0.08, t);
      circle(x, y, d);
    }
    pop();
  }
}
