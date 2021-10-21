class AudioController {
  constructor() {
      this.backgroundMusic = new Audio('sounds/bgMusic.mp3');
      this.flipChime = new Audio('sounds/flip.wav');
      this.cardMatched = new Audio('sounds/match.mp3');
      this.winChime = new Audio('sounds/win.mp3');
      this.gameEndChime = new Audio('sounds/timesUp');
      this.backgroundMusic.volume = 0.5;
      this.backgroundMusic.loop = true;
  }
  playMusic() {
      this.backgroundMusic.play();
  }
  pauseMusic() {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
  }
  flipCard() {
      this.flipChime.play();
  }
  matched() {
      this.cardMatched.play();
  }
  win() {
      this.pauseMusic();
      this.winChime.play();
  }
  gameEnd() {
      this.pauseMusic();
      this.gameEndChime.play();
  }
}

class findPokemon {
  constructor(totalTime, cards) {
      this.arrayOfCards = cards;
      this.totalTime = totalTime;
      this.timeRemaining = totalTime;
      this.timer = document.getElementById('time-remaining')
      this.ticker = document.getElementById('flips');
      this.audioController = new AudioController();
  }

  playgame() {
      this.numberOfClicks = 0;
      this.timeRemaining = this.totalTime;
      this.checkCard = null;
      this.cardMatch = [];
      this.busy = true;
      setTimeout(() => {
          this.audioController.playMusic();
          this.cardShuffle(this.arrayOfCards);
          this.countdown = this.countBegin();
          this.busy = false;
      }, 500)
      this.unflip();
      this.timer.innerText = this.timeRemaining;
      this.ticker.innerText = this.numberOfClicks;
  }
  countBegin() {
      return setInterval(() => {
          this.timeRemaining--;
          this.timer.innerText = this.timeRemaining;
          if(this.timeRemaining === 0)
              this.gameEnd();
      }, 1000);
  }
  gameEnd() {
      clearInterval(this.countdown);
      this.audioController.gameEnd();
      document.getElementById('game-over-text').classList.add('visible');
  }
  win() {
      clearInterval(this.countdown);
      this.audioController.win();
      document.getElementById('victory-text').classList.add('visible');
  }
  unFlip() {
      this.arrayOfCards.forEach(card => {
          card.classList.remove('visible');
          card.classList.remove('matched');
      });
  }
  cardFlip(card) {
      if(this.toFlip(card)) {
          this.audioController.flipCard();
          this.numberOfClicks++;
          this.ticker.innerText = this.numberOfClicks;
          card.classList.add('visible');

          if(this.checkCard) {
              this.findPair(card);
          } else {
              this.checkCard = card;
          }
      }
  }
  findPair(card) {
      if(this.sameType(card) === this.sameTypeType(this.checkCard))
          this.pairMatch(card, this.checkCard);
      else 
          this.notMatch(card, this.checkCard);

      this.checkCard = null;
  }
  pairMatch(firstCard, secondCard) {
      this.cardMatch.push(firstCard);
      this.cardMatch.push(secondCard);
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      this.audioController.matched();
      if(this.cardMatch.length === this.arrayOfCards.length)
          this.victory();
  }
  notmatch(firstCard, secondCard) {
      this.busy = true;
      setTimeout(() => {
          firstCard.classList.remove('visible');
          secondCard.classList.remove('visible');
          this.busy = false;
      }, 1000);
  }
  cardShuffle(arrayOfCards) {
      for (let i = arrayOfCards.length - 1; i > 0; i--) {
          let randCard = Math.floor(Math.random() * (i + 1));
          arrayOfCards[randCard].style.order = i;
          arrayOfCards[i].style.order = randCard;
      }
  }
  sameType(card) {
      return card.getElementsByClassName('cardVal')[0].src;
  }
  toFlip(card) {
      return !this.busy && !this.cardMatch.includes(card) && card !== this.checkCard;
  }
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName('overlay-text'));
  let cards = Array.from(document.getElementsByClassName('card'));
  let game = new findPokemon(100, cards);

  overlays.forEach(overlay => {
      overlay.addEventListener('click', () => {
          overlay.classList.remove('visible');
          game.playgame();
      });
  });

  cards.forEach(card => {
      card.addEventListener('click', () => {
          game.cardFlip(card);
      });
  });
}