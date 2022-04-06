import BasicComponent from '../../common/basic-component';
import ContentMessage from '../messages/content-message/content-message';

export default class FilesPage extends BasicComponent {
  constructor() {
    super('content-container hidden widget-container');
    this.markup = `
        <button class="close-button">x</button>
        <h3>Сохранённые файлы:</h3>
        <div class="content-list"></div>
    `;
    this.container.innerHTML = this.markup;
    this.list = this.container.querySelector('.content-list');
    this.closeButton = this.container.querySelector('.close-button');
    this.closeButton.addEventListener('click', () => {
      this.hide();
    });
    this.filter = null;
  }

  publishContentData(contentData) {
    this.list.innerHTML = '';
    contentData.forEach((fileInfo) => {
      const contentMessage = new ContentMessage(fileInfo);
      contentMessage.bindToDOM(this.list);
    });
  }

  showAll() {
    Array.from(this.list.children).forEach((fileDescription) => {
      fileDescription.classList.remove('hidden');
    });
  }

  hideFilteredElements() {
    Array.from(this.list.children).forEach((contentMessage) => {
      if (contentMessage.dataset.fileType === this.filter) {
        return;
      }
      contentMessage.classList.add('hidden');
    });
  }

  filterContent(key) {
    if (key === this.filter) {
      this.showAll();
      this.filter = null;
      return;
    }
    this.showAll();
    this.filter = key;
    this.hideFilteredElements();
  }
}
