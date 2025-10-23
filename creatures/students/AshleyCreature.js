class AshleyCreature extends Creature {
  constructor(x = 0, y = 0, w = 10, h = 10, par = {}) {
    super(x, y, w, h, par);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.par = par;
    
    this.size = min(this.w, this.h);
    this.lineColor = color(255, 20, 147); // pink
    this.bgColor = color(250, 235, 215, 15); // antiquewhite fade
    this.frameColor = 'black';
  }
  
  update() {}
  
  interact(other) {}
  
  drawParts() {
    push();
    translate(this.x, this.y);
    
    // Draw fade effect
    noStroke();
    fill(this.bgColor);
    rect(0, 0, this.w, this.h);
    
    // Draw lines
    for (let i = 0; i < 20; i++) {
      let x1 = random(0, this.w);
      let y1 = random(0, this.h);
      let x2 = random(0, this.w);
      let y2 = random(0, this.h);
      let markSize = random(0.1) * this.size;
      
      stroke(this.lineColor);
      strokeWeight(markSize * 0.1);
      line(x1, y1, x2, y2);
    }
    
    pop();
  }
  
  debugDraw() {}
  
  draw() {
    this.drawParts();
    if(DEBUG) this.debugDraw();
  }
}