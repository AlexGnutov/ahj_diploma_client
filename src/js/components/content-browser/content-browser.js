import BasicComponent from '../../common/basic-component';

export default class ContentBrowser extends BasicComponent {
  constructor() {
    super('c-browser-container widget-container');
    this.markup = `
      <div class="c-browser-header">
        <span>Файлы</span>
        <button class="c-browser-expand-button round-button">+</button>
      </div>
      <div class="c-browser-links"></div>
    `;
    this.container.innerHTML = this.markup;
    this.linksContainer = this.container.querySelector('.c-browser-links');
    this.expandButton = this.container.querySelector('.c-browser-expand-button');
    this.highlightedLink = null;
  }

  // Call createLink for all linksData elements
  publishLinks(linksData) {
    this.linksContainer.innerHTML = '';
    const keys = Object.keys(linksData);
    keys.forEach((key) => {
      this.linksContainer.innerHTML += `
        <div class="c-browser-link" data-key="${key}">
            ${key} (${linksData[key]})
        </div>
      `;
    });
  }

  // Counts all content types from server data
  // eslint-disable-next-line class-methods-use-this
  getLinks(contentData) {
    const linksData = {};
    contentData.forEach((fileInfo) => {
      if (!linksData[fileInfo.fileType]) {
        linksData[fileInfo.fileType] = 1;
      } else {
        linksData[fileInfo.fileType] += 1;
      }
    });
    return linksData;
  }

  highlightLink(activeLink) {
    if (activeLink.classList.contains('selected-link')) {
      activeLink.classList.remove('selected-link');
    } else {
      Array.from(this.linksContainer.children)
        .forEach((link) => link.classList
          .remove('selected-link'));
      activeLink.classList.add('selected-link');
    }
  }

  clear() {
    this.linksContainer.innerHTML = '';
  }

  freeze() {
    this.expandButton.disabled = true;
    this.container.classList.add('inactive');
  }
}
