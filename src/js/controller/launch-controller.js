import BasicController from '../common/basic-controller';

export default class LaunchController extends BasicController {
  async initialize() {
    const latestMessages = await this.httpService.getLatestMessages();
    if (latestMessages) {
      this.messagesCache.addAsOlder(latestMessages);
      this.publisher.publishMessages(latestMessages);
    } else {
      console.log('Server is not available');
      this.offlineMessage.show();
      const messages = this.messagesCache.loadFromLocalStorage();
      if (messages[0]) {
        this.publisher.publishMessages(messages);
      }
    }
  }
}
