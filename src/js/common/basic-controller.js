export default class BasicController extends EventTarget {
  constructor(elementsContainer, servicesContainer) {
    super();
    this.elements = elementsContainer;
    this.services = servicesContainer;
    this.addDependencies(elementsContainer);
    this.addDependencies(servicesContainer);
  }

  bindToDOM(parent) {
    parent.appendChild(this.container);
  }

  html() {
    return this.container;
  }

  addDependencies(elementsContainer) {
    const elementsNames = Object.keys(elementsContainer);
    elementsNames.forEach((elementName) => {
      this[elementName] = elementsContainer[elementName];
    });
  }
}
