import BasicComponent from '../../common/basic-component';
import ChatMessage from "../messages/chat-message/chat-message";
import BotMessage from "../messages/bot-message/bot-message";

export default class MessagesPage extends BasicComponent {
  constructor() {
    super('messages-page-container');
    this.markup = `
        <div class="ml-download-bar">
            <button class="ml-load-button">Load previous messages</button>
        </div>
        <div class="messages-list"></div> 
    `;
    this.container.innerHTML = this.markup;
    this.list = this.container.querySelector('.messages-list');
    this.loadPreviousButton = this.container.querySelector('.ml-load-button');
  }

  publishMessages(messagesData, direct = true) {
    if (!direct) {
      messagesData.reverse();
    }
    messagesData.forEach((message) => {
      if (message.type === 'text') {
        this.publishOneMessage(message, direct);
      }
    });
  }

  // Creates and publishes one chat-message
  publishOneMessage(messageData, atBottom = true) {
    const textMessage = new ChatMessage(messageData);
    // Top or bottom position select
    if (atBottom) {
      this.placeOnBottom(textMessage);
    } else {
      this.placeOnTop(textMessage);
    }
  }

  // Places chat-message at the bottom end
  placeOnBottom(textMessage) {
    textMessage.bindToDOM(this.list);
    this.scrollDown();
  }

  // Places chat-message at the top end
  placeOnTop(textMessage) {
    this.list.insertBefore(
      textMessage.html(),
      this.list.firstChild,
    );
    this.scrollUp();
  }

  // Place temporal bot chat-message
  publishTempBotMessage(messageData) {
    const botMessage = new BotMessage(messageData);
    botMessage.bindToDOM(this.list);
    setTimeout(() => {
      botMessage.html().remove();
    }, 10000);
    this.scrollDown();
  }
}
