import BasicComponent from '../../common/basic-component';

export default class MessagesList extends BasicComponent {
  constructor() {
    super('messages-list-container');
    this.markup = `
        <div class="ml-download-bar">
            <button class="ml-load-button">Load previous messages</button>
        </div>
        <div class="messages-list">
            <div class="ml-scroll-box"></div>
        </div>
    `;
    this.container.innerHTML = this.markup;
    this.messagesContainer = this.container.querySelector('.messages-list');
    this.loadPreviousButton = this.container.querySelector('.ml-load-button');
  }

  scrollMessagesDown() {
    const elem = this.container.querySelector('.messages-list');
    elem.scrollTop = elem.scrollHeight - elem.offsetHeight;
  }

  scrollMessagesUp() {
    const elem = this.container.querySelector('.messages-list');
    elem.scrollTop = 0; // elem.offsetHeight; // - elem.height;
  }
}
