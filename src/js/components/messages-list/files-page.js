import BasicComponent from '../../common/basic-component';
import ContentMessage from '../messages/content-message/content-message';

export default class FilesPage extends BasicComponent {
  constructor() {
    super('content-container hidden');
    this.markup = `
        <button class="content-close">X</button>
        <h3>Сохранённые файлы:</h3>
        <div class="content-list"></div>
    `;
    this.container.innerHTML = this.markup;
    this.list = this.container.querySelector('.content-list');
    this.closeButton = this.container.querySelector('.content-close');
    this.closeButton.addEventListener('click', () => {
      this.hide();
    });
  }

  publishContentData(contentData) {
    contentData.forEach((fileInfo) => {
      const contentMessage = new ContentMessage(fileInfo);
      contentMessage.bindToDOM(this.list);
    });
  }
}
