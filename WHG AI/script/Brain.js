class Brain {
    constructor(size){
      this.directions = [];
      this.step =0;
      this.randomize(size);
  
    }
    //--------------------------------------------------------------------------------------------------------------------------------
    //imposta la lunghezza dei "vettori posizione" di 1
    randomize(size) {
      for (var i = 0; i< size; i++) {
        this.directions[i] = this.getRandomDirection();
      }
    }
  
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Genera un vettore randomico
    getRandomDirection() {
      var randomNumber = floor(random(9));
      switch(randomNumber) {
      case 0:
        return createVector(0, 1);
      case 1:
        return createVector(1, 1);
      case 2:
        return createVector(1, 0);
      case 3:
        return createVector(1, -1);
      case 4:
        return createVector(0, -1);
      case 5:
        return createVector(-1, -1);
      case 6:
        return createVector(-1, 0);
      case 7:
        return createVector(-1, 1);
      case 8:
        return createVector(0, 0);
      }
  
      return createVector();
    }
  
    //-------------------------------------------------------------------------------------------------------------------------------------
    //clona una copia perfetta del cervello migliore x generazione
    clone() {
      var clone = new Brain(this.directions.length);
      for (var i = 0; i < this.directions.length; i++) {
        clone.directions[i] = this.directions[i].copy();
      }
      return clone;
    }
  
    //----------------------------------------------------------------------------------------------------------------------------------------
  
    //combia il cervello randomizziando alcuni vettori
    mutate(died, deathStep) {
      //cambia il vettore selezionato con un altro randomico
      for (var i =0; i< this.directions.length; i++) {
        var rand = random(1);
        if (died && i > deathStep - 10) {
          rand = random(0.2);
        }
  
        if (rand < mutationRate) {
          //imposta la direzione a un oggetto
          this.directions[i] = this.getRandomDirection();
        }
      }
    }
  
    //---------------------------------------------------------------------------------------------------------------------------------------------------------
    //aumenta le mosse x generazione
   increaseMoves() {
     for(var i = 0 ; i< increaseMovesBy ;i++){
       this.directions.push(this.getRandomDirection());
     }
    }
  }
  