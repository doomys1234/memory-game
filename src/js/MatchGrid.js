import MatchGridHelper from './MatchGridHelper';
import Timer from './Timer';

export default class MatchGrid extends MatchGridHelper {
  constructor({
    amountOfTiles, timer, amountOfRows, amountOfColumns,
  }) {
    super(amountOfTiles, timer);
    this.amountOfTiles = amountOfTiles;
    this.amountOfColumns = amountOfColumns;
    this.amountOfRows = amountOfRows;
    this.timer = this.adjustTime();
    this.shuffledArray = this.getShuffledContent();
    this.firstElement = null;
    this.secondElement = null;
    this.firstTile = null;
    this.secondTile = null;
    this.list = document.querySelector('.list');
    this.gameTimer = null;
  }

  startGame() {
    this.createTileElements();
    this.makeTilesFlipped();
    this.startTimer();
  }

  startTimer() {
    this.gameTimer = new Timer({
      durationMinutes: this.timer,
      onFinish: this.stopTimerOnFinish.bind(this),
    });
    this.gameTimer.startInterval(this.gameTimer.getRefs());
  }

  restartGame() {
    const listItems = this.getElementsByClassName('.tile.flipped.is-hidden');
    const finnishText = this.getElementByClassName(
      '.list-wrapper__text:not(.is-hidden)',
    );
    const textElements = this.getElementsByClassName(
      '.tile-text:not(.is-hidden-text)',
    );
    if (finnishText) {
      this.toggleClassName(finnishText, 'is-hidden');
    }
    this.clearState(true);
    textElements.forEach((textElement) => this.toggleClassName(textElement, 'is-hidden-text'));
    listItems.forEach((tile) => {
      this.toggleClassName(tile, 'flipped');
      this.toggleClassName(tile, 'is-hidden');
    });
    this.shuffledArray = this.getShuffledContent();
    this.gameTimer.stopTimer();
    this.startTimer();
  }

  pauseTheGame() {
    this.gameTimer.pauseTimer();
  }

  unPauseTheGame() {
    this.gameTimer.resumeTimer();
  }

  stopTimerOnFinish() {
    alert("Time's up!");
    this.restartGame();
  }

  createTileElements() {
    for (let i = 1; i <= this.amountOfTiles; i += 1) {
      const textValue = this.shuffledArray[i - 1];
      const tile = this.createElement('li', null, ['tile']);
      const textElement = this.createElement('p', textValue, [
        'tile-text',
        'is-hidden-text',
      ]);
      this.appendElement(this.list, tile);
      this.appendElement(tile, textElement);
    }
    this.list.style.gridTemplateRows = `repeat(${this.amountOfRows.toString()}, 1fr)`;
    this.list.style.gridTemplateColumns = `repeat(${this.amountOfColumns.toString()}, 1fr)`;
  }

  makeTilesFlipped() {
    const listItems = this.getElementsByClassName('.list .tile');
    listItems.forEach((tile, index) => {
      tile.addEventListener('click', () => this.handleTileClick(tile, index));
    });
  }

  handleTileClick(tile) {
    const textElement = this.getElementByClassName(
      '.tile-text.is-hidden-text',
      tile,
    );
    this.toggleTileFlipping(tile);
    if (!this.firstElement) {
      this.onFirstTileClickHandler(tile, textElement);
      return;
    } if (!this.secondElement) {
      this.onSecondTileClickHandler(tile, textElement);
    }
    if (this.firstElement && this.secondElement) {
      if (this.firstElement === this.secondElement) {
        this.removeMatchedTiles();
        this.clearState();
        return;
      }
      this.clearState();
    }
  }

  onFirstTileClickHandler(tile, textElement) {
    this.firstElement = +textElement.innerText;
    this.firstTile = tile;
    if (this.firstElement !== this.secondElement && this.secondTile) {
      this.flipBack(this.secondTile);
    }
  }

  onSecondTileClickHandler(tile, textElement) {
    this.secondElement = +textElement.innerText;
    this.secondTile = tile;
    if (this.firstElement !== this.secondElement) {
      this.flipBack(this.firstTile);
    }
  }

  removeMatchedTiles() {
    setTimeout(() => {
      this.toggleClassName(this.firstTile, 'is-hidden');
      this.toggleClassName(this.secondTile, 'is-hidden');
      this.clearState(true);
    }, 1000);
    setTimeout(() => {
      const amountOfLeftTiles = this.getElementsByClassName('.tile:not(.is-hidden)', this.list);
      if (amountOfLeftTiles.length === 0) {
        this.showFinishMessage();
      }
    }, 1050);
  }

  showFinishMessage() {
    this.gameTimer.stopTimer();
    const finnishText = this.getElementByClassName('.list-wrapper__text');
    this.toggleClassName(finnishText, 'is-hidden');
  }

  clearState(tiles) {
    if (tiles) {
      this.firstTile = null;
      this.secondTile = null;
      return;
    }
    this.firstElement = null;
    this.secondElement = null;
  }

  flipBack(tile) {
    const tileText = this.getElementByClassName('p.tile-text', tile);
    this.toggleClassName(tile, 'flipped');
    this.toggleClassName(tile, 'flip-back');
    setTimeout(() => {
      this.toggleClassName(tileText, 'is-hidden-text');
      this.toggleClassName(tile, 'flip-back');
    }, 350);
  }

  toggleTileFlipping(tile) {
    const textElement = this.getElementByClassName('p.tile-text', tile);
    this.toggleClassName(tile, 'flipped');
    setTimeout(() => this.toggleClassName(textElement, 'is-hidden-text'), 300);
  }
}
