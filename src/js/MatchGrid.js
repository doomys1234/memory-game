export default class MatchGrid {
  constructor({ amountOfTiles }) {
    this.amountOfTiles = amountOfTiles;
    this.shuffledArray = this.shuffleArray(this.createDynamicArray());
    this.firsElement = null;
    this.secondElement = null;
  }
  startGame() {
    this.createTileElements();
    this.makeTilesFlipped();
  }

  createTileElements() {
    const list = document.querySelector(".list");
    for (let i = 1; i <= this.amountOfTiles; i++) {
      const tile = document.createElement("li");
      tile.classList.add("tile");
      list.appendChild(tile);
    }
  }

  makeTilesFlipped() {
    const listItems = document.querySelectorAll(".list .tile");
    listItems.forEach((tile, index) => {
      tile.addEventListener("click", () => this.handleTileClick(tile, index));
    });
  }
  handleTileClick(tile, index) {
    const textElement = tile.querySelector("p.tile-text.is-hidden-text");
    const textValue = this.shuffledArray[index];
    const doesTileContainText = textElement !== null;
    tile.classList.add("flipped");

    if (doesTileContainText) {
      this.flipTileWithText(tile, textElement);
    } else {
      this.flipTileWithoutText(tile, textValue);
    }
  }
  flipTileWithText(tile, textElement) {
    setTimeout(() => this.showTextContent(textElement), 500);
    setTimeout(() => this.hideTextContent(tile), 1500);
    setTimeout(() => this.stopTileFlipping(tile), 2500);
  }
  flipTileWithoutText(tile, textValue) {
    setTimeout(() => this.createTextElement(tile, textValue), 500);
    setTimeout(() => this.hideTextContent(tile), 1500);
    setTimeout(() => this.stopTileFlipping(tile), 2500);
  }
  createTextElement(tile, textValue) {
    const textElement = document.createElement("p");
    textElement.classList.add("tile-text");
    textElement.innerText = textValue;
    tile.appendChild(textElement);
  }
  showTextContent(textElement) {
    textElement.classList.remove("is-hidden-text");
  }
  hideTextContent(tile) {
    const textElement = tile.querySelector("p.tile-text");
    textElement.classList.add("is-hidden-text");
  }
  stopTileFlipping(tile) {
    tile.classList.remove("flipped");
  }

  createDynamicArray() {
    const length = this.amountOfTiles;
    const halfLength = length / 2;
    const dynamicArray = [];

    for (let i = 1; i <= length; i++) {
      dynamicArray.push(((i - 1) % halfLength) + 1);
    }
    return dynamicArray;
  }
  shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
}
