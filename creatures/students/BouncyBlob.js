class BouncyBlob extends Creature {
  constructor(x, y, w, h, {c = color(200, 100, 150)} = {}) {
    super(x, y, w, h);
    this.c = c;
    this.vx = random(-5, 10);
    this.vy = random(-5, 10);
  }
  update() {
    this.x += this.vx; 
    this.y += this.vy;
    
    if (this.x < 0 || this.x > width) { 
      
      this.vx *= -1; this.c = color(random(250), random(250), random(250)); }
   
    if (this.y < 0 || this.y > height) { 
      
      this.vy *= -1; this.c = color(random(245), random(245), random(230)); }
  }
  draw() {
    push(); 
    translate(this.x, this.y); 
    noStroke(); 
    fill(this.c); 
    ellipse(5, 5, this.w, this.h); 
    pop();
  }
}