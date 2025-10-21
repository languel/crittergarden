
class CinniDot extends Creature {
  constructor(x, y, w, h, par = {}) {
    super(x, y, w, h, par);
    this.col = color(random(255), random(255), random(255));
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  interact(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d < (this.w + other.w) * 0.5) {
      this.vx *= -1;
      this.vy *= -1;
    }
  }
  draw() {
    push();
    translate(this.x, this.y);
    fill(this.col);
    ellipse(0, 0, this.w, this.h);
    pop();
  }
}
