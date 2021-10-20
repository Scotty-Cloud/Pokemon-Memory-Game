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

  gameBegin() {
    this.numberOfClicks = 0
    this.timeRemaining = gameTime
    this.checkCard = null;
    this.cardMatched = []
    this.inPlay = true
    gameTimeEnd(() => {
      this.audioController.playMusic()
      this.shuffleCard(this.arrayOfCards)
      this.timer = this.startTimer()
      this.inPlay = false
    }, 500) 
    this.unflipped()
    this.timeOfGame.innerText = this.timeRemaining
    this.track.innerText = this.numberOfClicks
  }
  startTimer() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timeOfGame.innerText = this.timeRemaining
      if(this.timeRemaining === 0)
        this.gameEnd
    }, 1000)
  }
  gameEnd() {
    clearInterval(this.countdown)
    this.audioController.gameEnd()
    document.getElementById('gameOver').classList.add('visible')
  }
  win() {
    clearInterval(this.countdown)
    this.audioController.winningChime()
    document.getElementById('winningText').classList.add('visible')
  }

  unflipped() {
    this.arrayOfCards.forEach(card => {
      card.classList.remove('visible')
      card.classList.remove('pair')
    });
  }
  flipped(card) {
    if(this.cardFlipped.(card)){
      this.audioController.flip()
      this.numberOfClicks++
      this.track.innerText = this.numberOfClicks
      card.classList.add('visible')

      if(this.cardCheck) {
        this.findPair(card)
      }else {
        this.cardCheck = card;
      }
    }
  }
  findPair(card) {
    if(this.sameCard(card) === this.sameCard(this.cardCheck))
      this.sameType(card, this.cardCheck)
    else  
      this.notMatch(card, this.cardCheck)
      this.cardCheck = null;
  }
  sameType(cardA, cardB){
    this.matchCards.push(cardA)
    this.matchCards.push(cardB)
    cardA.classList.add('match')
    cardB.classList.add('match')
    this.audioController.match()
    if(this.cardMatched.length === this.arrayOfCards.length)
    this.win();
  }
}