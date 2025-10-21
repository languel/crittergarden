class AlvaCreature extends Creature{
  
  constructor(x = 0, y = 0, w = 10, h = 10, par = {}) {
    super(x,y,w,h,par);
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.par = par;
    
    ////////creature specific things
    
    this.size = min(this.w,this.h);
    this.stroke = color(random(255),random(255),random(255));
    this.frameColor = 'black';
    
    this.parts = []; //memory of where the parts are
    let nParts = random(3,5);//random creature choices on creation
    for(let i=0; i<nParts-1; i++) { ///init the parts
       let rndx = random(0,this.w); 
       let rndy = random(this.h); //0,this.h
      
       this.parts.push( {x: rndx, y:rndy }); 
    }
  }

  update() {}

  interact(other) {}

  drawParts() {
    push();
    translate(this.x,this.y);
    //
    let a=random(0,100)
    let b=random(0,100)
    let c=random(0,100)
     for(let p of this.parts) {
        fill(color(random(100,255),random(255),random(50,255)));
        ellipse(a,b,c, 0.3*this.size);
     }
    pop();
  }
  
  debugDraw() {

  }

  draw() { //creature draw loop

//     push();
//     translate(this.x, this.y);
//    draw your stuff here
//     pop();
    
    this.drawParts(); 
    
    if(DEBUG) this.debugDraw();
  }
}
