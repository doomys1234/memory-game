import MatchGrid from './js/MatchGrid';
import './sass/main.scss';

const form = document.querySelector('.form');
const startButton = document.querySelector('.form-button.button-common');
const restartButton = document.querySelector('.list-button.button-common');

let timeout;

function debounceMouseMove(fn, delay) {
  clearTimeout(timeout);
  timeout = setTimeout(fn, delay);
}
startButton.addEventListener('click', () => {
  const checkedColumns = document.querySelector(
    'input[name="amount-of-columns"]:checked',
  );
  const checkedRows = document.querySelector(
    'input[name="amount-of-rows"]:checked',
  );
  const checkedTime = document.querySelector('input[name="time"]:checked');
  if (!checkedColumns || !checkedRows || !checkedTime) {
    alert('Please select all values!');
    return;
  }
  const { value: amountOfColumns } = checkedColumns;
  const { value: amountOfRows } = checkedRows;
  const { value: timer } = checkedTime;
  const totalAmountOfElements = +amountOfColumns * +amountOfRows;
  const matchGridGame = new MatchGrid({
    amountOfTiles: totalAmountOfElements,
    timer,
    amountOfColumns,
    amountOfRows,
  });
  matchGridGame.startGame();
  const listBox = document.querySelector('.list-wrapper');
  listBox.classList.remove('is-hidden');
  form.classList.add('is-hidden');
  restartButton.addEventListener('click', () => {
    matchGridGame.restartGame();
  });

  function performAction() {
    matchGridGame.pauseTheGame();
  }
  // Pause the timer for inactivity
  document.addEventListener('mousemove', () => {
    debounceMouseMove(performAction, 3000);
    matchGridGame.unPauseTheGame();
  });
});
