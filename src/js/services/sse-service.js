export default class SseService {
  constructor() {
    this.messageUpdate = null;
    this.contentDataUpdate = null;
  }

  startMessageUpdate() {
    this.messageUpdate = new EventSource('http://localhost:8080/api/messages/sse');
    this.messageUpdate.addEventListener('open', (evt) => {
      console.log('SSE connected', evt);
    });
  }

  startContentDataUpdate() {
    this.contentDataUpdate = new EventSource('http://localhost:8080/api/messages/sse/info');
    this.contentDataUpdate.addEventListener('open', (evt) => {
      console.log('SSE connected', evt);
    });
    this.contentDataUpdate.addEventListener('message', (evt) => {
      console.log('Content Data Update: ');
      console.log(JSON.parse(evt.data));
    });
    this.contentDataUpdate.addEventListener('error', (evt) => {
      console.log('Content Data Update Error: ', evt);
    });
  }
}
