import { fromEvent } from 'rxjs';
import BasicController from '../common/basic-controller';

export default class MessagesController extends BasicController {
  initialize() {
    this.webSocketService.startWebSocket();

    // Send new chat-message(and files) or bot command
    fromEvent(
      this.createMessage.form, 'submit',
    )
      .subscribe(async (event) => {
        event.preventDefault();
        const text = this.createMessage.returnText();
        if (text.startsWith('@chaos:')) {
          const reply = await this.httpService.getBotReply(text);
          this.messagesPage.publishTempBotMessage(reply);
          this.createMessage.clear();
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

    // Receive mirror - to publish chat-message
    fromEvent(
      this.webSocketService.ws, 'message',
    )
      .subscribe((event) => {
        const message = JSON.parse(event.data);
        this.messagesPage.publishMessages([message]);
      });

    // Load more messages
    fromEvent(
      this.messagesPage.loadPreviousButton, 'click',
    ).subscribe(async () => {
      const oldestMessageId = this.messagesCache.getOldestDate();
      const oldMessages = await this.httpService.loadPreviousMessages(oldestMessageId);
      if (oldMessages[0]) {
        this.messagesCache.addAsOlder(oldMessages);
        this.messagesPage.publishMessages(oldMessages, false);
      }
    });

    /*
    // Scrolling
    fromEvent(
      this.list.html(), 'scroll',
    ).subscribe((e) => {
      if (e.target.scrollTop < 20) {
        e.target.scrollTop = 20;
      }
    });
    */
  }
}
