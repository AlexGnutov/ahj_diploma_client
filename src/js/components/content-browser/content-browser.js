import BasicComponent from '../../common/basic-component';

export default class ContentBrowser extends BasicComponent {
  constructor() {
    super('c-browser-container');
    this.markup = `
      <div class="c-browser-header">
        <span>Content Browser</span>
        <button class="c-browser-expand-button">+</button>
      </div>
      <div class="c-browser-links"></div>
      <div class="c-browser-content-list hidden"></div>
    `;
    this.container.innerHTML = this.markup;
    this.linksContainer = this.container.querySelector('.c-browser-links');
    this.contentList = this.container.querySelector('.c-browser-content-list');
    this.expandButton = this.container.querySelector('.c-browser-expand-button');
  }

  // Call createLink for all linksData elements
  publishLinks(linksData) {
    this.linksContainer.innerHTML = '';
    const keys = Object.keys(linksData);
    keys.forEach((key) => {
      this.linksContainer.innerHTML += `
        <div class="c-browser-link">
            ${key} (${linksData[key]})
        </div>
      `;
    });
  }

  // DEPRECATED - replaced by relevant publisher method
  publishContent(contentData) {
    this.contentList.innerHTML = '';
    contentData.forEach((fileInfo) => {
      this.contentList.innerHTML += ` 
        <div>
            <span>${fileInfo.fileType}</span>
            <a className="content-list-link"
                href="http://localhost:8080/api/files/download/${fileInfo.fileName}"
                download="${fileInfo.fileName}">${fileInfo.fileName}</a>
        </div>
        `;
    });
  }

  // Counts all content types from server data
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

  toggle() {
    this.contentList.classList.toggle('hidden');
  }

  // Clear
  clear() {
    this.container.innerHTML = '';
  };
}
