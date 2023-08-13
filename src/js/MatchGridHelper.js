export default class MatchGridHelper {
  constructor(amountOfTiles, timer) {
    this.timer = timer;
    // this.parent = document.querySelector(parentSelector);
    this.amountOfTiles = amountOfTiles;
  }

  createElement(elementType, textValue, classes) {
    const element = document.createElement(elementType);
    if (classes && classes.length > 0) {
      element.classList.add(...classes);
    }
    if (textValue) {
      element.innerText = textValue;
    }
    return element;
  }

  appendElement(parentElement, childElement) {
    parentElement.appendChild(childElement);
  }

  getElementByClassName(className, parent = document) {
    return parent.querySelector(className);
  }

  getElementsByClassName(className, parent = document) {
    return parent.querySelectorAll(className);
  }

  toggleClassName(element, className) {
    element.classList.toggle(className);
  }

  createDynamicContent() {
    const length = this.amountOfTiles;
    const halfLength = length / 2;
    const dynamicArray = [];

    for (let i = 1; i <= length; i += 1) {
      dynamicArray.push(((i - 1) % halfLength) + 1);
    }

    return dynamicArray;
  }

  getShuffledContent() {
    const array = this.createDynamicContent();
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  adjustTime() {
    if (this.timer === '30') {
      return 0.5;
    }
    return +this.timer;
  }
}
