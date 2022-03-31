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

  scrollUp() {
    this.list.scrollTop = 0;
  }

  scrollDown() {
    this.list.scrollTop = this.list.scrollHeight - this.list.offsetHeight;
  }

  hide() {
    this.container.classList.add('hidden');
  }

  show() {
    this.container.classList.remove('hidden');
  }

  addElements(elementsContainer) {
    const elementsNames = Object.keys(elementsContainer);
    elementsNames.forEach((elementName) => {
      this[elementName] = elementsContainer[elementName];
    });
  }
}
