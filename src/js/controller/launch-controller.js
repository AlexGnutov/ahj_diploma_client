import BasicController from '../common/basic-controller';

export default class LaunchController extends BasicController {
  async initialize() {
    const latestMessages = await this.httpService.getLatestMessages();
    if (latestMessages) {
      this.messagesCache.addAsOlder(latestMessages);
      this.messagesPage.publishMessages(latestMessages);
    }
  }

  switchToOffline() {
    this.messagesPage.clear();
    this.offlineMessage.show();
    const messages = this.messagesCache.loadFromLocalStorage();
    if (messages[0]) {
      this.messagesPage.publishMessages(messages);
    }
  }
}
