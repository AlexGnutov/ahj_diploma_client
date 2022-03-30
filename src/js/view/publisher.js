import Message from '../components/message/message';
import BotMessage from "../components/bot-message/bot-message";

export default class Publisher {
  constructor(service, messagesList) {
    this.service = service;
    this.messagesList = messagesList;
    this.messagesContainer = messagesList.messagesContainer;
  }

  // Process messages array and publish them one by one
  // in direct (at bottom) or reverse (at top) order
  publishMessages(messagesData, direct = true) {
    if (!direct) {
      messagesData.reverse();
    }
    messagesData.forEach((message) => {
      if (message.type === 'text') {
        this.publishTextMessage(message, direct);
      }
    });
  }

  // Creates and publishes one message
  publishTextMessage(messageData, atBottom = true) {
    const textMessage = new Message(messageData);
    // Top or bottom position select
    if (atBottom) {
      this.placeOnBottom(textMessage);
    } else {
      this.placeOnTop(textMessage);
    }
  }

  // Places message at the bottom end
  placeOnBottom(textMessage) {
    textMessage.bindToDOM(this.messagesContainer);
    this.messagesList.scrollMessagesDown();
  }

  // Places message at the top end
  placeOnTop(textMessage) {
    this.messagesContainer.insertBefore(
      textMessage.html(),
      this.messagesContainer.firstChild,
    );
    this.messagesList.scrollMessagesUp();
  }

  // Removes all messages from list
  clearMessagesList() {
    this.messagesContainer.innerHTML = '';
  }

  // Place temporal bot message
  publishTempBotMessage(messageData) {
    const botMessage = new BotMessage(messageData);
    botMessage.bindToDOM(this.messagesContainer);
    setTimeout(() => {
      botMessage.html().remove();
    }, 10000);
  }
}
