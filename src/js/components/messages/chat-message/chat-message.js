import BasicComponent from '../../../common/basic-component';
import { combineDateString } from '../../../common/utils/date-processing';
import { addLinks } from '../../../common/utils/links-parsing';

export default class ChatMessage extends BasicComponent {
  constructor(messageData) {
    super('chat-message-container');
    this.markup = `
        <div class="chat-message-card">
            <div class="chat-message-header">
                <div class="chat-message-user"></div>
                <div class="chat-message-date"></div>
            </div>
            <div class="chat-message-content"></div>
            <div class="chat-message-footer">                
            </div>
        </div>
    `;
    this.container.innerHTML = this.markup;
    this.user = this.container.querySelector('.chat-message-user');
    this.date = this.container.querySelector('.chat-message-date');
    this.content = this.container.querySelector('.chat-message-content');
    this.footer = this.container.querySelector('.chat-message-footer');
    // Add content in safe mode
    const {
      user, date, content, attachment, fileTypes,
    } = messageData;
    this.user.innerText = user;
    if (user === 'User') {
      this.container.classList.add('right-position');
    }
    this.date.innerText = combineDateString(date);
    this.content.innerText = content;
    this.content.innerHTML = addLinks(this.content, 'chat-message-link');
    // Add attachments
    this.addFileLinks(attachment, fileTypes);
  }

  addFileLinks(attachments, fileTypes) {
    if (!Array.isArray(attachments) || !Array.isArray(fileTypes)) {
      return;
    }
    attachments.forEach((filename, index) => {
      const markup = `
        <div>
            <span class="hidden">${fileTypes[index]}</span>
            <a class="message-attachment"
                href="http://localhost:8080/api/files/download/${filename}"
                download="${filename}">${filename}</a>
        </div>
      `;
      this.footer.innerHTML += markup;
    });
  }

  markSearchKey(key) {
    this.content.innerHTML = this.content.innerHTML.replace(
      key, `<span class="chat-message-highlighted">${key}</span>`,
    );
  }
}
