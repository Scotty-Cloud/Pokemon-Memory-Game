class AudioController {
  constructor () {
    this.backgroundMusic = new Audio(sounds/);
    this.flipChime = new Audio(sounds/);
    this.sameCardChime = new Audio(sounds/);
    this.winningChime = new Audio(sounds/);
    this.timeOutChime = new Audio(sounds/)
    this.backgroundMusic.volume = 0.5;
    this.backgroundMusic.loop = true;
  }

  playMusic() {
    this.backgroundMusic.play();
  }

  stopMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  flipSound() {
    this.flipChime.play();
  }

  cardMatch() {
    this.sameCardChime.play();
  }

  gameWin() {
    this.winningChime.play();
  }

  gameEnd(){
    this.timeOutChime.play();
  }
}

class pokemonFind {
  init(gameTime, card) {
    this.arrayOfCards = card
    this.timeOfGame = gameTime
    this.timeRemaining = gameTime
    this.timeOfGame = document.getElementById('timeRemaining')
    this.track = document.getElementById('flips')
    this.audioController = new AudioController();
  }
}