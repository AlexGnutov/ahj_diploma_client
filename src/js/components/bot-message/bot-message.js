import BasicComponent from '../../common/basic-component';
import combineDateString from '../../common/utils/date-processing';

export default class BotMessage extends BasicComponent {
  constructor(messageData) {
    super('message-container');
    this.markup = `
        <div class="message-card">
            <div class="message-header">
                <div class="message-user"></div>
                <div class="message-date"></div>
            </div>
            <div class="message-content"></div>
        </div>
    `;
    this.container.innerHTML = this.markup;
    this.container.querySelector('.message-user').innerText = 'Bot';
    this.container.querySelector('.message-date').innerHTML = combineDateString(Date.now());
    this.content = this.container.querySelector('.message-content');
    const { opinion, status } = messageData;
    this.content.innerText = opinion;
    if (status) {
      this.container.querySelector('.message-card').classList.add(`bot-${status}`);
    }
  }
}
