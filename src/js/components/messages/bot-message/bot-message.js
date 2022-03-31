import BasicComponent from '../../../common/basic-component';
import { combineDateString } from '../../../common/utils/date-processing';

export default class BotMessage extends BasicComponent {
  constructor(messageData) {
    super('chat-message-container');
    this.markup = `
        <div class="chat-message-card">
            <div class="chat-message-header">
                <div class="chat-message-user"></div>
                <div class="chat-message-date"></div>
            </div>
            <div class="chat-message-content"></div>
        </div>
    `;
    this.container.innerHTML = this.markup;
    this.container.querySelector('.chat-message-user').innerText = 'Bot';
    this.container.querySelector('.chat-message-date').innerHTML = combineDateString(Date.now());
    this.content = this.container.querySelector('.chat-message-content');
    const { opinion, status } = messageData;
    this.content.innerText = opinion;
    if (status) {
      this.container.querySelector('.chat-message-card').classList.add(`bot-${status}`);
    }
  }
}
