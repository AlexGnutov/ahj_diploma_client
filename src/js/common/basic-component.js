import { create } from './utils/utils';

export default class BasicComponent extends EventTarget {
  constructor(containerClassName) {
    super();
    this.container = create('div', containerClassName);
  }

  bindToDOM(parent) {
    parent.appendChild(this.container);
  }

  html() {
    return this.container;
  }

  addElements(elementsContainer) {
    const elementsNames = Object.keys(elementsContainer);
    elementsNames.forEach((elementName) => {
      this[elementName] = elementsContainer[elementName];
    });
  }
}
