import { fromEvent } from 'rxjs';
// import HttpWorker from '../workers/http.worker';
import WebSocketService from '../services/web-socket';
import SseService from '../services/sse-service';
import HttpService from '../services/http-service';
import MessagesCacheService from '../services/messages-cache-service';
import FilesCacheService from '../services/files-cache-service';
import Publisher from '../view/publisher';

export default class Controller {
  constructor(
    messageListComponent,
    createMessageComponent,
    attachedFilesComponent,
  ) {
    this.messageList = messageListComponent;
    this.createMessage = createMessageComponent;
    this.attachedFiles = attachedFilesComponent;
    this.webSocketService = new WebSocketService();
    this.sseService = new SseService();
    this.publisher = new Publisher(null, this.messageList);
    this.httpService = new HttpService();
    this.messagesCache = new MessagesCacheService();
    this.fileCache = new FilesCacheService(this.attachedFiles);
  }

  initialize() {
    this.webSocketService.startWebSocket();
    this.sseService.startMessageUpdate();
    this.sseService.startContentDataUpdate();
    // MESSAGES //

    // Send new message
    fromEvent(
      this.createMessage.form, 'submit',
    )
      .subscribe(async (event) => {
        event.preventDefault();
        const text = this.createMessage.returnText();
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

    // Receive SSE - latest messages
    fromEvent(
      this.sseService.messageUpdate, 'message',
    )
      .subscribe((event) => {
        const messages = JSON.parse(event.data);
        // Save update to cache!!! - later fix in into complete recover logic
        console.log(messages);
        this.messagesCache.addAsOlder(messages);
        this.publisher.publishMessages(messages);
        this.sseService.messageUpdate.close();
        console.log(this.sseService.messageUpdate.readyState);
      });
    fromEvent(
      this.sseService.messageUpdate, 'error',
    ).subscribe(() => {
      console.log('SSE is not responding');
      this.sseService.messageUpdate.close();
      console.log(this.sseService.messageUpdate.readyState);
      const messages = this.messagesCache.loadFromLocalStorage();
      if (messages[0]) {
        this.publisher.publishMessages(messages);
      }
    });

    // Load more messages
    fromEvent(
      this.messageList.loadPreviousButton, 'click',
    ).subscribe(async () => {
      const oldestMessageId = this.messagesCache.getOldestDate();
      const oldMessages = await this.httpService.loadPreviousMessages(oldestMessageId);
      if (oldMessages[0]) {
        this.messagesCache.addAsOlder(oldMessages);
        this.publisher.publishMessages(oldMessages, false);
      }
    });

    // FILES
    // Add files with button
    fromEvent(
      this.createMessage.addButton, 'click',
    ).subscribe(() => {
      this.fileCache.grabFiles();
    });
    // Remove files with button
    fromEvent(
      this.attachedFiles.html(), 'click',
    ).subscribe((event) => {
      // THIS NEEDS TO BE CHANGED:
      const filename = this.attachedFiles.removeFileFromList(event.target);
      this.fileCache.removeFileFromCache(filename);
    });
    // File(s) drag and dropping
    fromEvent(
      this.messageList.html(), 'dragover',
    ).subscribe((e) => {
      e.stopPropagation();
      e.preventDefault();
    });
    fromEvent(
      this.messageList.html(), 'dragenter',
    ).subscribe((e) => {
      e.stopPropagation();
      e.preventDefault();
    });
    fromEvent(
      this.messageList.html(), 'drop',
    ).subscribe((e) => {
      e.stopPropagation();
      e.preventDefault();
      const { files } = e.dataTransfer;
      this.fileCache.addFilesToCache(files);
      this.fileCache.updateFilesList();
    });
    // Scrolling
    fromEvent(
      this.messageList.html(), 'scroll',
    ).subscribe((e) => {
      if (e.target.scrollTop < 20) {
        e.target.scrollTop = 20;
      }
    });
  }
}
