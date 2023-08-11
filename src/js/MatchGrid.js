import { text } from "body-parser";

export default class MatchGrid {
  constructor({ amountOfTiles }) {
    this.amountOfTiles = amountOfTiles;
  }

  createTileElements() {
    console.log("start");
    const list = document.querySelector(".list");
    for (let i = 1; i <= this.amountOfTiles; i++) {
      const tile = document.createElement("li");
      tile.classList.add("tile");
      list.appendChild(tile);
    }
  }
  startGame() {
    this.createTileElements();
    this.flipTiles();
  }
  flipTiles() {
    const listItems = document.querySelectorAll(".list .tile");
    console.log(listItems);
    listItems.forEach((tile, index) => {
      tile.addEventListener("click", () => {
        const hasTileText =
          tile.querySelector("p.tile-text.is-hidden-text") !== null;
        tile.classList.add("flipped");
        if (!hasTileText) {
          this.flipText(tile);
          return;
        }
        this.flipTileWithText(tile);
      });
    });
  }
  flipTileWithText(tile) {
    const textElement = tile.querySelector("p.tile-text.is-hidden-text");
    setTimeout(() => {
      textElement.classList.remove("is-hidden-text");
    }, 500);
    setTimeout(() => {
      this.removeTextElement(tile);
    }, 1500);
    setTimeout(() => {
      tile.classList.remove("flipped");
    }, 2500);
  }
  flipText(tile, value) {
    setTimeout(() => {
      this.createTextElement(tile, 1);
    }, 500);
    setTimeout(() => {
      this.removeTextElement(tile);
    }, 1500);
    setTimeout(() => {
      tile.classList.remove("flipped");
    }, 2500);
  }
  removeTextElement(tile) {
    const textElement = tile.querySelector("p.tile-text");
    textElement.classList.add("is-hidden-text");
  }
  createTextElement(tile, value) {
    const textElement = document.createElement("p");
    textElement.classList.add("tile-text");
    textElement.innerText = value;
    tile.appendChild(textElement);
  }
}
