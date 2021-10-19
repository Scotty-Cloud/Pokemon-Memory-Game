class AudioController {
  init () {
    this.backgroundMusic = new Audio(sounds/);
    this.flipChime = new Audio(sounds/);
    this.sameCardChime = new Audio(sounds/);
    this.winningChime = new Audio(sounds/);
    this.timeOutChime = new Audio(sounds/)
    this.backgroundMusic.volume = 0.5;
    this.backgroundMusic.loop = true;
  }
}