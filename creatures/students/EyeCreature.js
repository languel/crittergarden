class EyeCreature extends Creature {
  constructor(x = 0, y = 0, w = 10, h = 10, par = {}) {
    super(x, y, w, h, par);
    
    // eyes
    this.pupilSize = min(this.w, this.h) * 0.3;
    this.blinkTimer = 0;
    this.blinkDuration = 15;
    this.isBlinking = false;
    this.eyeOpenness = 1;
    this.eyeColor = "black"; 
    this.pupilColor = color(180, 0, 0); 
    this.irisColor = color(255, 20, 20); 
    this.glowColor = color(255, 0, 0, 100); 
    
    this.pupilX = 0;
    this.pupilY = 0;
    
}

  update() {
    // eyes follow the mouse moving
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let angle = atan2(dy, dx);
    let maxDist = this.pupilSize * 0.5;
    this.pupilX = cos(angle) * maxDist;
    this.pupilY = sin(angle) * maxDist;
    
    if (!this.isBlinking && random() < 0.003) {
      this.isBlinking = true;
      this.blinkTimer = 0;
    }
    
    // blink the eyes
    if (this.isBlinking) {
      this.blinkTimer++;
      if (this.blinkTimer < this.blinkDuration / 2) {
        this.eyeOpenness = 1 - (this.blinkTimer / (this.blinkDuration / 2));
      } else if (this.blinkTimer < this.blinkDuration) {
        this.eyeOpenness = (this.blinkTimer - this.blinkDuration / 2) / (this.blinkDuration / 2);
      } else {
        this.isBlinking = false;
        this.eyeOpenness = 1;
      }
    }
  }
  
  interact(other) {
    
  }
  
  draw() {
    // draw the creepy eyes
    push();
    translate(this.x, this.y);
    
    fill(255);
    stroke("black"); 
    strokeWeight(3);
    ellipse(0, 0, this.w, this.h * this.eyeOpenness);
    
    fill(this.irisColor);
    noStroke();
    let irisSize = this.pupilSize * 1.5;
    ellipse(this.pupilX, this.pupilY, irisSize * this.eyeOpenness, irisSize * this.eyeOpenness);
    
 
    fill(this.pupilColor);
    ellipse(this.pupilX, this.pupilY, this.pupilSize * this.eyeOpenness, this.pupilSize * this.eyeOpenness);
    
    // make it more creepy?
    fill(this.glowColor);
    ellipse(this.pupilX, this.pupilY, (irisSize + 10) * this.eyeOpenness, (irisSize + 10) * this.eyeOpenness);
    
    fill(255, 200);
    noStroke();
    let highlightX = this.pupilX - this.pupilSize * 0.2;
    let highlightY = this.pupilY - this.pupilSize * 0.2;
    ellipse(highlightX, highlightY, this.pupilSize * 0.3 * this.eyeOpenness, this.pupilSize * 0.3 * this.eyeOpenness);
    
    pop();
    
    if (DEBUG) {
      push();
      translate(this.x, this.y);
      noFill();
      stroke("rgb(34,31,33)");
      rect(-this.w/2, -this.h/2, this.w, this.h);
      pop();
    }
  }
}