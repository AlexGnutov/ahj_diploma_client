import { fromEvent } from 'rxjs';
import BasicController from '../common/basic-controller';

export default class MessagesController extends BasicController {
  initialize() {
    this.webSocketService.startWebSocket();

    // Send new message
    fromEvent(
      this.createMessage.form, 'submit',
    )
      .subscribe(async (event) => {
        event.preventDefault();
        const text = this.createMessage.returnText();
        if (text.startsWith('@chaos:')) {
          const reply = await this.httpService.getBotReply(text);
          this.publisher.publishTempBotMessage(reply);
          return;
        }
        const files = this.fileCache.getFilesFromCache();
        if (files.length > 0) {
          const reply = await this.httpService.sendFile(files);
          if (reply.status === 'success') {
            console.log(reply);
            const { fileNames } = reply;
            const { fileTypes } = reply;
            this.webSocketService.sendMessage(text, fileNames, fileTypes);
          }
        } else {
          this.webSocketService.sendMessage(text, null);
        }
        this.fileCache.clear();
        this.createMessage.clear();
      });

    // Receive mirror - to publish message
    fromEvent(
      this.webSocketService.ws, 'message',
    )
      .subscribe((event) => {
        const message = JSON.parse(event.data);
        this.publisher.publishMessages([message]);
      });

    // Load more messages
    fromEvent(
      this.messagesList.loadPreviousButton, 'click',
    ).subscribe(async () => {
      const oldestMessageId = this.messagesCache.getOldestDate();
      const oldMessages = await this.httpService.loadPreviousMessages(oldestMessageId);
      if (oldMessages[0]) {
        this.messagesCache.addAsOlder(oldMessages);
        this.publisher.publishMessages(oldMessages, false);
      }
    });

    // Scrolling
    fromEvent(
      this.messagesList.html(), 'scroll',
    ).subscribe((e) => {
      if (e.target.scrollTop < 20) {
        e.target.scrollTop = 20;
      }
    });
  }
}
