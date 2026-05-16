const KEYBOARD_RU = 'йцукенгшщзхъфывапролджэячсмитьбюё';
const KEYBOARD_EN = "qwertyuiop[]asdfghjkl;'zxcvbnm,.`";

const SPECIAL_KEYS = {
  '[': 'BracketLeft',
  ']': 'BracketRight',
  ';': 'Semicolon',
  "'": 'Quote',
  ',': 'Comma',
  '.': 'Period',
  '`': 'Backquote',
};

class Game {
  constructor(container) {
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    this.createTimer(container);

    this.timerId = null;

    this.reset();
    this.registerEvents();
  }

  createTimer(container) {
    const status = container.querySelector('.status');
    this.timerElement = status.querySelector('.status__timer');

    if (this.timerElement) {
      return;
    }

    const timerParagraph = document.createElement('p');
    timerParagraph.textContent = 'Осталось секунд: ';

    this.timerElement = document.createElement('span');
    this.timerElement.className = 'status__timer';
    this.timerElement.textContent = '0';

    timerParagraph.appendChild(this.timerElement);
    status.appendChild(timerParagraph);
  }

  reset() {
    this.stopTimer();
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keyup', (event) => {
      if (event.key.length !== 1) {
        return;
      }

      const currentSymbol = this.currentSymbol.textContent.toLowerCase();
      const enteredSymbol = event.key.toLowerCase();
      const isCorrectKey = event.code === this.currentSymbol.dataset.code;

      if (enteredSymbol === currentSymbol || isCorrectKey) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    if (this.currentSymbol.classList.contains('symbol_current')) {
      this.currentSymbol.classList.remove('symbol_current');
    }

    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    const wins = Number(this.winsElement.textContent) + 1;
    this.winsElement.textContent = wins;

    if (wins === 10) {
      alert('Победа!');
      this.reset();
      return;
    }

    this.setNewWord();
  }

  fail() {
    this.stopTimer();

    const losses = Number(this.lossElement.textContent) + 1;
    this.lossElement.textContent = losses;

    if (losses === 3) {
      alert('Вы проиграли!');
      this.reset();
      return;
    }

    this.setNewWord();
  }

  setNewWord() {
    this.renderWord(this.getWord());
  }

  getWord() {
    const words = [
      'bob',
      'awesome',
      'netology',
      'hello',
      'kitty',
      'rock',
      'youtube',
      'popcorn',
      'cinema',
      'love',
      'javascript',
      'привет',
      'я люблю kitkat',
      'hello мир',
    ];

    return words[Math.floor(Math.random() * words.length)];
  }

  getKeyName(char) {
    const letter = char.toLowerCase();

    if (letter === ' ') {
      return 'Space';
    }

    if (letter >= 'a' && letter <= 'z') {
      return `Key${letter.toUpperCase()}`;
    }

    const index = KEYBOARD_RU.indexOf(letter);
    const enKey = KEYBOARD_EN[index];

    if (enKey >= 'a' && enKey <= 'z') {
      return `Key${enKey.toUpperCase()}`;
    }

    return SPECIAL_KEYS[enKey];
  }

  renderWord(word) {
    const html = [...word]
      .map((symbol, index) => {
        const keyName = this.getKeyName(symbol);

        return `<span class="symbol ${index === 0 ? 'symbol_current' : ''}" data-code="${keyName}">${symbol}</span>`;
      })
      .join('');

    this.wordElement.innerHTML = html;
    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
    this.startTimer(word.length);
  }

  startTimer(seconds) {
    this.stopTimer();

    let timeLeft = seconds;
    this.updateTimer(timeLeft);

    this.timerId = setInterval(() => {
      timeLeft -= 1;
      this.updateTimer(timeLeft);

      if (timeLeft <= 0) {
        this.stopTimer();
        this.fail();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  updateTimer(seconds) {
    this.timerElement.textContent = seconds;
    this.timerElement.classList.toggle('timer_warning', seconds <= 3 && seconds > 0);
  }
}

new Game(document.getElementById('game'));
