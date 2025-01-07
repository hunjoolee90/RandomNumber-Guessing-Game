const generateNumber = document.querySelector('#generate-number');
const generationInput = document.querySelector('#generate-number input');
const generationButton = document.querySelector('#generate-number button');
const startMessage = document.querySelector('#start-message');
const guessNumber = document.querySelector('#guess-number');
const guessInput = document.querySelector('#guess-number input');
const guessButton = document.querySelector('#guess-number button');
const gameProgress = document.querySelector('#game-progress');
const gameResult = document.querySelector('#result');
const resetButton = document.querySelector('#reset');

const HIDDEN_CLASSNAME = 'hidden';

let randomNumber = 0;
let attempts = 0;

function onGenerateNumber(event) {
  event.preventDefault();

  const maxValue = parseInt(generationInput.value);
  if (isNaN(maxValue) || maxValue <= 0) {
    alert('Please enter a valid number greater than 0.');
    return;
  }
  randomNumber = Math.floor(Math.random() * (maxValue + 1));
  attempts = 0;
  startMessage.classList.remove(HIDDEN_CLASSNAME);
  gameProgress.classList.add(HIDDEN_CLASSNAME);
  gameResult.classList.add(HIDDEN_CLASSNAME);
  guessInput.value = '';

  localStorage.setItem('chosen_number', generationInput.value);
}

function onCheckNumber() {
  const userGuess = parseInt(guessInput.value);

  if (isNaN(userGuess) || userGuess > generationInput.value) {
    alert('Please enter a valid number.');
    return;
  }

  attempts++;
  if (attempts < 5 && userGuess === randomNumber) {
    gameResult.innerText = 'Congratulations! You won.';
    gameResult.classList.remove(HIDDEN_CLASSNAME);
    resetButton.classList.remove(HIDDEN_CLASSNAME);
  } else if (attempts === 5 && userGuess !== randomNumber) {
    gameResult.innerText = `You lost... The correct number was ${randomNumber}`;
    gameResult.classList.remove(HIDDEN_CLASSNAME);
    resetButton.classList.remove(HIDDEN_CLASSNAME);
  } else {
    gameProgress.innerText = `Attempt ${attempts}/5. You chose: ${userGuess}. ${
      userGuess < randomNumber ? 'Go higher!' : 'Go lower!'
    }`;
    gameProgress.classList.remove(HIDDEN_CLASSNAME);
  }

  guessInput.value = '';
}

function resetGame() {
  randomNumber = 0;
  attempts = 0;
  generationInput.value = '';
  startMessage.classList.add(HIDDEN_CLASSNAME);
  gameProgress.classList.add(HIDDEN_CLASSNAME);
  gameResult.classList.add(HIDDEN_CLASSNAME);
  resetButton.classList.add(HIDDEN_CLASSNAME);
}

generationButton.addEventListener('click', onGenerateNumber);
guessButton.addEventListener('click', onCheckNumber);
resetButton.addEventListener('click', resetGame);
