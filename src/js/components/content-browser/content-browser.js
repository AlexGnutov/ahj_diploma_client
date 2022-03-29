import BasicComponent from '../../common/basic-component';

// Only for initials tests without server (delete later):
const sampleContentData = [
  {date: Date.now(), fileName: 'test.txt', fileType: 'text/plain'},
  {date: Date.now(), fileName: 'test2.txt', fileType: 'text/plain'},
  {date: Date.now(), fileName: 'test3.txt', fileType: 'text/plain'},
  {date: Date.now(), fileName: 'test1.pdf', fileType: 'application/pdf'},
  {date: Date.now(), fileName: 'test.jpeg', fileType: 'image/jpeg'},
  {date: Date.now(), fileName: 'test.png', fileType: 'image/png'},
];

// Corresponds to Content Browser Element - widget to see various attached files
export default class ContentBrowser extends BasicComponent {
  constructor() {
    super('c-browser-container');
    this.markup = `
      <div class="c-browser-header">
        <span>Content Browser</span>
        <button class="c-browser-expand-button">+</button>
      </div>
      <div class="c-browser-links hidden">
      
      </div>
      <div class="c-browser-content-list hidden">
            
      </div>
      
    `;
    this.container.innerHTML = this.markup;
    this.linksContainer = this.container.querySelector('.c-browser-links');
    this.contentList = this.container.querySelector('.c-browser-content-list');
    this.expandButton = this.container.querySelector('.c-browser-expand-button');
    this.expandButton.addEventListener('click', () => {
      this.linksContainer.classList.toggle('hidden');
      this.contentList.classList.toggle('hidden');
    });
    // Test calls
    const linksData = this.getContentTypeQuantities(sampleContentData);
    this.publishLinks(linksData);
    this.publishContent(sampleContentData);
  }

  // Call createLink for all linksData elements
  publishLinks(linksData) {
    const keys = Object.keys(linksData);
    keys.forEach((key) => {
      this.linksContainer.innerHTML += `
        <div class="c-browser-link">
            ${key} (${linksData[key]})
        </div>
      `;
    });
  }

  // publishContent
  publishContent(contentData) {
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

  // Pre-filter content types to handle together images, text and others
  // Necessary function needs to be added

  // Counts all content types from server data
  getContentTypeQuantities(contentData) {
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

  // Clear
  clear() {
    this.container.innerHTML = '';
  };
}
