import BasicComponent from '../../common/basic-component';
import combineDateString from '../../common/utils/date-processing';
import { addLinks } from '../../common/utils/links-parsing';

export default class Message extends BasicComponent {
  constructor(messageData) {
    super('message-container');
    this.markup = `
        <div class="message-card">
            <div class="message-header">
                <div class="message-user"></div>
                <div class="message-date"></div>
            </div>
            <div class="message-content"></div>
            <div class="message-footer">                
            </div>
        </div>
    `;
    this.container.innerHTML = this.markup;
    this.user = this.container.querySelector('.message-user');
    this.date = this.container.querySelector('.message-date');
    this.content = this.container.querySelector('.message-content');
    this.footer = this.container.querySelector('.message-footer');
    // Add content in safe mode
    console.log(messageData);
    const {
      user, date, content, attachment, fileTypes,
    } = messageData;
    this.user.innerText = user;
    this.date.innerText = combineDateString(date);
    this.content.innerText = content;
    this.content.innerHTML = addLinks(this.content, 'message-link');
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
            <span>${fileTypes[index]}</span>
            <a class="message-attachment"
                href="http://localhost:8080/api/files/download/${filename}"
                download="${filename}">${filename}</a>
        </div>
      `;
      this.footer.innerHTML += markup;
    });
  }
}
