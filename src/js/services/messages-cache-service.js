export default class MessagesCacheService {
  constructor() {
    this.messages = [];
  }

  loadFromLocalStorage() {
    const messages = window.localStorage.getItem('messages');
    if (messages) {
      this.messages = JSON.parse(messages);
      return this.messages;
    }
    return [];
  }

  saveToLocalStorage() {
    window.localStorage.setItem('messages',
      JSON.stringify(this.messages));
  }

  addAsOlder(olderMessages) {
    this.messages.unshift(...olderMessages);
    this.saveToLocalStorage();
  }

  addAsNewer(newerMessages) {
    this.messages.push(...newerMessages);
  }

  getOldestDate() {
    if (this.messages[0]) {
      return this.messages[0].date;
    }
  }

  getNewestDate() {
    const lastIndex = this.messages.length - 1;
    if (this.messages[lastIndex]) {
      return this.messages[lastIndex].date;
    }
  }

  getMessages() {
    return this.messages;
  }
}
