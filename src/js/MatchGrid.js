export default class MatchGrid {
  constructor({ amountOfTiles }) {
    this.amountOfTiles = amountOfTiles;
    this.shuffledArray = this.shuffleArray(this.createDynamicArray());
    this.firstElement = null;
    this.secondElement = null;
    this.firstTile = null;
    this.secondTile = null;
    this.list = document.querySelector(".list");
    this.finished = false;
  }
  startGame() {
    this.createTileElements();
    this.makeTilesFlipped();
  }

  createTileElements() {
    for (let i = 1; i <= this.amountOfTiles; i++) {
      const tile = document.createElement("li");
      const textValue = this.shuffledArray[i - 1];

      tile.classList.add("tile");
      this.list.appendChild(tile);
      this.createTextElement(tile, textValue, ["tile-text","is-hidden-text"]);
    }
  }
  createTextElement(parentElement, textValue, classes) {
    const textElement = document.createElement("p");
    textElement.classList.add(...classes);
    textElement.innerText = textValue;
    parentElement.appendChild(textElement);
  }

  makeTilesFlipped() {
    const listItems = document.querySelectorAll(".list .tile");
    listItems.forEach((tile, index) => {
      tile.addEventListener("click", () => this.handleTileClick(tile, index));
    });
  }

    handleTileClick(tile) {
        const textElement = tile.querySelector(".tile-text.is-hidden-text");
        this.toggleTileFlipping(tile);
    // this.flipTileWithText(tile, textElement);
    if (!this.firstElement) {
      this.firstElement = +textElement.innerText;
      this.firstTile = tile;
      return;
    } else if (!this.secondElement) {
      this.secondElement = +textElement.innerText;
      this.secondTile = tile;
    }
    if (this.firstElement && this.secondElement) {
      if (this.firstElement === this.secondElement) {
        this.removeMatchedTiles();
        this.firstElement = null;
        this.secondElement = null;
        return;
      }

      const firstTileText = this.firstTile.querySelector("p.tile-text");
      const secondTileText = this.secondTile.querySelector("p.tile-text");
      this.firstTile.classList.toggle("flipped");

    //   setTimeout(() => this.toggleTextContent(firstTileText), 500);
    //   setTimeout(() => this.toggleTileFlipping(this.firstTile), 1500);
    //   setTimeout(() => this.flipText(firstTileText), 1600);
    //   setTimeout(() => this.secondTile.classList.toggle("flipped"), 2000);
    //   setTimeout(() => this.toggleTextContent(secondTileText), 2500);
    //   setTimeout(() => this.toggleTileFlipping(this.secondTile), 3000);
    //   setTimeout(() => this.flipText(secondTileText), 3100);

      this.firstElement = null;
      this.secondElement = null;
      this.firstIndex = null;
      this.secondIndex = null;
    }
  }
  removeMatchedTiles() {
    setTimeout(() => {
      this.list.removeChild(this.firstTile);
      this.list.removeChild(this.secondTile);
      this.firstTile = null;
      this.secondTile = null;
    }, 2000);
    setTimeout(() => {
      const amountOfLeftTiles = this.list.children.length;
        if (amountOfLeftTiles === 0) {
            this.finished = true;
            const finnishText = document.querySelector(".list-wrapper__text")
            finnishText.classList.remove('is-hidden')
      }
    }, 2000);
  }

  flipTileWithText(tile, textElement) {
    setTimeout(() => this.toggleTextContent(textElement), 500);
    setTimeout(() => this.toggleTileFlipping(tile), 1200);
  }

  toggleTextContent(textElement) {
    textElement.classList.toggle("is-hidden-text");
  }
    toggleTileFlipping(tile) {
        const textElement = tile.querySelector("p.tile-text");
        textElement.classList.toggle("flip-text");
    this.toggleTextContent(textElement)

        tile.classList.toggle("flipped");
        textElement.classList.toggle("flip-text");
  }
  flipText(textElement) {
    textElement.classList.toggle("flip-text");
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
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
}
