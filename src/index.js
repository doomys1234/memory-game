import './sass/main.scss';
import MatchGrid from "./js/MatchGrid";

const form = document.querySelector('.form');
const startButton = document.querySelector('.button-container__submit');
startButton.addEventListener('click', () => {
    const checkedRadio = document.querySelector('input[name="amount-of-columns"]:checked');
    if (!checkedRadio) {
    alert('Please select a value.');
    return
}
    const selectedValue = checkedRadio.value;
    const matchGrid = new MatchGrid({ amountOfTiles: +selectedValue });
    matchGrid.startGame();
    const listBox = document.querySelector('.list-wrapper');
    listBox.classList.remove('is-hidden');
    form.classList.add('is-hidden');

})



