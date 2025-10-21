class EyesCreature extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    const n = floor(random(3, 8));
    this.eyes = [];
    this.eyeColor = 'white';
    this.rimColor = color(0);
    this.pupilColor = color(20);
    for (let i = 0; i < n; i++) {
      this.eyes.push({
        x: random(-this.w * 0.35, this.w * 0.35),
        y: random(-this.h * 0.35, this.h * 0.35),
        r: random(min(this.w, this.h) * 0.08, min(this.w, this.h) * 0.18),
      });
    }
  }

  update() {}

  draw() {
    push();
    translate(this.w / 2, this.h / 2);
    // subtle body
    noStroke();
    fill(0, 10);
    ellipse(0, 0, this.w * 0.8, this.h * 0.6);

    for (let e of this.eyes) {
      // eye white
      stroke(this.rimColor);
      strokeWeight(2);
      fill(this.eyeColor);
      circle(e.x, e.y, e.r * 2);

      // pupil that looks at mouse
      const gx = this.x + this.w/2 + e.x;
      const gy = this.y + this.h/2 + e.y;
      const dx = mouseX - gx;
      const dy = mouseY - gy;
      const ang = atan2(dy, dx);
      const pr = e.r * 0.45;
      const px = e.x + cos(ang) * (e.r - pr * 0.8);
      const py = e.y + sin(ang) * (e.r - pr * 0.8);
      noStroke();
      fill(this.pupilColor);
      circle(px, py, pr);
    }
    pop();
  }
}
