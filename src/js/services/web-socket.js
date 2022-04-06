export default class WebSocketService {
  constructor() {
    this.ws = null;
    this.attempts = 1;
    this.left = this.attempts;
  }

  startWebSocket(stateService) {
    this.ws = new WebSocket('wss://ahjdiploma.herokuapp.com');
    // Standard routes
    this.ws.addEventListener('open', () => {
      stateService.switchStateToOnline(); // 1 - OPEN
    });
    this.ws.addEventListener('close', () => {
      stateService.switchStateToOffline(); // 3 - CLOSED
    });
    this.ws.addEventListener('error', (e) => e);
    /* DO RECONNECTION
      console.log('WS server error - try to reconnect...');
      setTimeout(() => {
        if (this.left > 0) {
          this.startWebSocket();
          this.left -= 1;
        } else {
          console.log(`Did ${this.attempts} attempts - no WS available.`);
        }
      }, 3000);
      */
  }

  sendMessage(text, fileNames, fileTypes) {
    const messageData = JSON.stringify({
      user: 'User',
      date: Date.now(),
      content: text,
      attachment: fileNames || [],
      fileTypes: fileTypes || [],
      type: 'text',
      status: 'regular',
    });
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(messageData));
    } else {
      // console.log('reconnection needed');
    }
  }
}
