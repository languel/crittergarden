class Creature {
  // Ancestor to all creatures
  constructor(x = 0, y = 0, w = 10, h = 10, par = {}) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.par = par;
    // extend with creature-specific properties in subclasses
  }

  update() {}

  interact(other) {}

  draw() {
    // base creature draw loop
    // push();
    // translate(this.x, this.y);
    // draw your stuff here
    // pop();
  }
}

