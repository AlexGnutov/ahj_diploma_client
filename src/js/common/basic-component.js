import { create } from './utils/utils';

export default class BasicComponent {
  constructor(containerClassName) {
    this.container = create('div', containerClassName);
  }

  bindToDOM(parent) {
    parent.appendChild(this.container);
  }

  html() {
    return this.container;
  }
}
