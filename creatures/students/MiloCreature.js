class MiloCreature extends Creature {
  constructor(x=0, y=0, w=10, h=10, par={}) {  
    super(x, y, w, h, par);
    this.x = x;
    this.y = y;  
    this.w = w;
    this.h = h;
    this.par = par;
    
    // Initialize creature-specific things
    this.offscreen1 = createGraphics(this.w, this.h);
    this.capture = createCapture(VIDEO);
    this.capture.hide();
    this.offscreenmask1 = createGraphics(this.w, this.h);
    this.offscreenmask1.noStroke();
    this.offscreenmask1.fill(255, 0, 0, 200);
    this.offscreenmask1.ellipse(this.w/2, this.h/2, this.w, this.h);
    
    // this.offscreenmask1.image(maskimg, 0, 0);
    //  this.capture.mask(this.offscreen1);
  }  
  
  update() {
    if (mouseIsPressed) {
      this.offscreen1.fill(255, 0, 0, 200);  
      this.offscreen1.noStroke();
      let x = map(mouseX, 0, width, 0, this.w);
      let y = map(mouseY, 0, height, 0, this.h);
    //   this.offscreen1.ellipse(x, y, 30, 30); 
    
        
    //   this.offscreen1.ellipse(mouseX, mouseY, 30, 30);  
      this.capture.mask(this.offscreen1)
    }
    
   
  }  
  
  interact() {
  }  
  
  draw() {
    // image(maskimg, this.x, this.y, this.w, this.h);
    image(this.capture, this.x, this.y, this.w, this.h);
    image(this.offscreenmask1, this.x, this.y);
  }  
}





