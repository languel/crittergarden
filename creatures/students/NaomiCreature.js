class NaomiCreature extends Creature{
  constructor(x = 0, y = 0, w = 10, h = 10, par = {}) {
    super(x,y,w,h,par);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.par = par;
    /////
    this.size = min(this.w,this.h);
    this.stroke = color(random(255),random(255),random(255));
  this. frameColor = 'black'
  }

  update() {}

  interact(other) {}

  //helper function
  randomDotsInRect(xmin, ymin, xmax, ymax, markSize) {
    let x = random(xmin, xmax);
    let y = random(ymin, ymax);

    circle(x, y, random(markSize));
  }

  draw() {
    push();
    translate(this.x, this.y);
    stroke(this.stroke);
    fill(random(255),random(255),random(255));
    this.randomDotsInRect(0,0,this.w,this.h, 0.2*this.size);

    //draw things relative to this.w, this.h
    pop();
  }
}