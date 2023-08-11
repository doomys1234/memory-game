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
      const textValue = this.shuffledArray[i];

      tile.classList.add("tile");
      list.appendChild(tile);
      this.createTextElement(tile, textValue);
    }
  }

  makeTilesFlipped() {
    const listItems = document.querySelectorAll(".list .tile");
    listItems.forEach((tile) => {
      tile.addEventListener("click", () => this.handleTileClick(tile));
    });
  }

  handleTileClick(tile) {
    const textElement = tile.querySelector("p.tile-text.is-hidden-text");
    this.toggleTileFlipping(tile);
    this.flipTileWithText(tile, textElement);
  }
  flipTileWithText(tile, textElement) {
    setTimeout(() => this.toggleTextContent(textElement), 500);
    setTimeout(() => this.toggleTextContent(textElement), 1500);
    setTimeout(() => this.toggleTileFlipping(tile), 2500);
  }
  createTextElement(tile, textValue) {
    const textElement = document.createElement("p");
    textElement.classList.add("tile-text", "is-hidden-text");
    textElement.innerText = textValue;
    tile.appendChild(textElement);
  }

  toggleTextContent(textElement) {
    textElement.classList.toggle("is-hidden-text");
  }
  toggleTileFlipping(tile) {
    tile.classList.toggle("flipped");
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
