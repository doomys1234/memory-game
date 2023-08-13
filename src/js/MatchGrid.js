import MatchGridHelper from "./MatchGridHelper";
export default class MatchGrid extends MatchGridHelper {
  constructor({ amountOfTiles }) {
    super(".list", amountOfTiles);
    this.amountOfTiles = amountOfTiles;
    this.shuffledArray = this.getShuffledContent();
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
      const textValue = this.shuffledArray[i - 1];
      const tile = this.createElement("li", null, ["tile"]);
      const textElement = this.createElement("p", textValue, [
        "tile-text",
        "is-hidden-text",
      ]);
      this.appendElement(this.parent, tile);
      this.appendElement(tile, textElement);
    }
  }

  makeTilesFlipped() {
    const listItems = document.querySelectorAll(".list .tile");
    listItems.forEach((tile, index) => {
      tile.addEventListener("click", () => this.handleTileClick(tile, index));
    });
  }

  handleTileClick(tile) {
    const textElement = this.getElementByClassName(
      ".tile-text.is-hidden-text",
      tile
    );
    this.toggleTileFlipping(tile);
    if (!this.firstElement) {
      this.onFirstTileClickHandler(tile, textElement);
      return;
    } else if (!this.secondElement) {
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
      this.toggleClassName(this.firstTile, "is-hidden");
      this.toggleClassName(this.secondTile, "is-hidden");
      this.clearState(true);
    }, 1000);
    setTimeout(() => {
      const amountOfLeftTiles = this.list.children.length;
      if (amountOfLeftTiles === 0) {
        this.finished = true;
        const finnishText = this.getElementByClassName(".list-wrapper__text");
        this.toggleClassName(finnishText, "is-hidden");
      }
    }, 1200);
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
    const tileText = this.getElementByClassName("p.tile-text", tile);
    this.toggleClassName(tile, "flipped");
    this.toggleClassName(tile, "flip-back");
    setTimeout(() => {
      this.toggleClassName(tileText, "is-hidden-text");
      this.toggleClassName(tile, "flip-back");
    }, 350);
  }

  toggleTileFlipping(tile) {
    const textElement = this.getElementByClassName("p.tile-text", tile);
    this.toggleClassName(tile, "flipped");
    setTimeout(() => this.toggleClassName(textElement, "is-hidden-text"), 300);
  }
}
