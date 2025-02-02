class Dot {

    constructor( t1, t2, velX) {
      this.position = createVector(t1.pixelPos.x + tileSize/2, t1.pixelPos.y + tileSize/2);
      this.startingPos = createVector(t1.pixelPos.x + tileSize/2, t1.pixelPos.y + tileSize/2);
      this.speed = floor(tileSize/6.6);
      this.velocity = createVector(velX*this.speed, 0);
      this.startingVel = createVector(velX*this.speed, 0);
      this.bouncers = [];
      this.bouncers[0] = t1;
      this.bouncers[1] = t2;
      this.diameter = tileSize/2.0;
      this.bounceWait = -1;
      this.bounceTimer = 10;
    }
  
    //------------------------------------------------------------------------------------------------------------
    //sposta il punto
     move() {
  
      for (var i = 0; i < this.bouncers.length; i++) {
        if (this.bounceTimer < 0 && dist(this.position.x, this.position.y, this.bouncers[i].pixelPos.x + tileSize/2, this.bouncers[i].pixelPos.y + tileSize/2) < this.speed) {//if reached bouncer
          this.bounceTimer = 10;
          this.bounceWait= 1;//aspetta 1 frame e cambia posizione
        }
      }
      if (this.bounceWait ==0) {
        //cambia direzione
        this.velocity.x *= -1;
      }
  
      this.position.add(this.velocity);//sposta punto
      this.bounceTimer --;
      this.bounceWait --;
    }
  
    //------------------------------------------------------------------------------------------------------------
    //disegna il punto
    show() {
      fill(0, 0, 255);
      stroke(0);
      strokeWeight(4);
      ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
    }
  
  
    //------------------------------------------------------------------------------------------------------------
    //crea le hitbox
    collides(ptl, pbr) {//grandezza player
  
      var topLeft = createVector(this.position.x - this.diameter/2, this.position.y-this.diameter/2);
      var bottomRight = createVector(this.position.x + this.diameter/2, this.position.y + this.diameter/2);
      var playerSize = bottomRight.x - topLeft.x;
      if ((ptl.x <bottomRight.x && pbr.x > topLeft.x) &&( ptl.y < bottomRight.y && pbr.y > topLeft.y)) {
  
        if (dist(this.position.x, this.position.y, (ptl.x + pbr.x) /2.0, (ptl.y + pbr.y) /2.0)< this.diameter/2 + sqrt(playerSize*playerSize *2)/2) {
          return true;
        }
      }
      return false;
    }
    //------------------------------------------------------------------------------------------------------------
    //fa tornare il punto al suo stato originale
  
    resetDot() {
      this.position = this.startingPos.copy();
      this.velocity = this.startingVel.copy();
      this.bounceTimer = 10;
      this.bounceWait = -1;
    }
    //------------------------------------------------------------------------------------------------------------
    //ritorna una copia del punto
    clone() {
      var clone = new Dot(this.bouncers[0], this.bouncers[1], floor(this.velocity.x));
      clone.velocity = this.velocity.copy();
      clone.position = this.position.copy();
      clone.startingVel = this.startingVel.copy();
      clone.bounceTimer = this.bounceTimer;
      clone.bounceWait = this.bounceWait;
      return clone;
    }
  }