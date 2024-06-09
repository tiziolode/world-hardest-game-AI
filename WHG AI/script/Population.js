class Population {

    constructor(size) {
      this.players = [];
      this.fitnessSum = 0.0;
      this.gen = 1;
      this.bestPlayer =0;
      this.minStep = 10000;
      this.genPlayers = [];
      this.bestFitness = 0;
      this.solutionFound = false;
  
      for (var i = 0; i< size; i++) {
        this.players[i] = new Player();
      }
    }
  
  
    //------------------------------------------------------------------------------------------------------------------------------
    //mostra tutti i giocatori
     show() {
      if (!showBest) {
        for (var i = 1; i< this.players.length; i++) {
          this.players[i].show();
        }
      }
      this.players[0].show();
    }
  
    //-------------------------------------------------------------------------------------------------------------------------------
    //update dei player
     update() {
      for (var i = 0; i< this.players.length; i++) {
        if (this.players[i].brain.step > this.minStep) {//se fa più step del record muore
          this.players[i].dead = true;//muroe
        } else {
          this.players[i].update();
        }
      }
    }
  
    //-----------------------------------------------------------------------------------------------------------------------------------
    //calcola la fitness
     calculateFitness() {
      for (var i = 0; i< this.players.length; i++) {
        this.players[i].calculateFitness();
      }
    }
  
  
    //------------------------------------------------------------------------------------------------------------------------------------
    //dice se i bro sono morti o hanno raggiunto il Gol
     allPlayersDead() {
      for (var i = 0; i< this.players.length; i++) {
        if (!this.players[i].dead && !this.players[i].reachedGoal) {
          return false;
        }
      }
      print("bah:");
      return true;
    }
  
  
  
    //-------------------------------------------------------------------------------------------------------------------------------------
  
    //crea la gen. successiva
     naturalSelection() {
      var newPlayers = [];//next gen
      this.setBestPlayer();
      this.calculateFitnessSum();
  
      //il campione sopravvive
      newPlayers[0] = this.players[this.bestPlayer].gimmeBaby();
      newPlayers[0].isBest = true;
      for (var i = 1; i< populationSize; i++) {
        //seleziona i genitori basandosi sulla fitness
        var parent = this.selectParent();
  
        //fa il figlio
        newPlayers[i] = parent.gimmeBaby();
      }
      this.players = [];
      for(var i = 0 ; i< newPlayers.length;i++){
        this.players[i] = newPlayers[i];
      }
      this.gen ++;
    }
  
  
    //--------------------------------------------------------------------------------------------------------------------------------------
    //calcola il fitness migliore
     calculateFitnessSum() {
      this.fitnessSum = 0;
      for (var i = 0; i< this.players.length; i++) {
        this.fitnessSum += this.players[i].fitness;
      }
    }
  
    //-------------------------------------------------------------------------------------------------------------------------------------
  
    //random vari
     selectParent() {
      var rand = random(this.fitnessSum);
  
  
      var runningSum = 0;
  
      for (var i = 0; i< this.players.length; i++) {
        runningSum+= this.players[i].fitness;
        if (runningSum > rand) {
          return this.players[i];
        }
      }
  
      //non dovrebbe arrivare fino a qui
  
      return null;
    }
  
    //------------------------------------------------------------------------------------------------------------------------------------------
    //lavaggio del cervello ai neonati 
     mutateDemBabies() {
      for (var i = 1; i< this.players.length; i++) {
        this.players[i].brain.mutate(this.players[i].deathByDot, this.players[i].deathAtStep);
        this.players[i].deathByDot = false;
        this.players[i].gen = this.gen;
      }
      this.players[0].deathByDot = false;
      this.players[0].gen = this.gen;
    }
  
    //---------------------------------------------------------------------------------------------------------------------------------------------
    //trova il player con la maggiore fitness
     setBestPlayer() {
      var max = 0;
      var maxIndex = 0;
      for (var i = 0; i< this.players.length; i++) {
        if (this.players[i].fitness > max) {
          max = this.players[i].fitness;
          maxIndex = i;
        }
      }
  
      this.bestPlayer = maxIndex;
  
      if (max > this.bestFitness) {
        this.bestFitness = max;
        this.genPlayers.push(this.players[this.bestPlayer].gimmeBaby());
      }
  
      //se il player raggiunge il goal, riduce il numero max di mosse
      if (this.players[this.bestPlayer].reachedGoal) {
        this.minStep = this.players[this.bestPlayer].brain.step;
        this.solutionFound = true;
      }
    }
  
  
   increaseMoves() {
      if (this.players[0].brain.directions.length < 120 && !this.solutionFound) {
        for (var i = 0; i< this.players.length; i++) {
          this.players[i].brain.increaseMoves();
        }
      }
    }
  }
  