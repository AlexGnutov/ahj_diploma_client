export default class HttpService {
  constructor() {
    this.hostURL = 'http://localhost:8080/';
    this.uploadURL = 'http://localhost:8080/api/files/upload';
  }

  async sendFile(files) {
    const data = new FormData();
    files.forEach((file, index) => {
      data.append(`file-${index}`, file);
    });
    const response = await fetch(this.uploadURL, {
      method: 'POST',
      body: data,
    });
    if (response.ok) {
      return response.json();
    }
    return null;
  }

  async loadPreviousMessages(lastDate) {
    const reqURL = `http://localhost:8080/api/messages/next?lastDate=${lastDate}`;
    const response = await fetch(reqURL);
    if (response.ok) {
      const reply = await response.json();
      return reply;
    }
    return null;
  }

  async getBotReply(text) {
    const command = text.replace('@chaos:', '').trim();
    const reqURL = `http://localhost:8080/api/bot?command=${command}`;
    const response = await fetch(reqURL);
    if (response.ok) {
      const reply = await response.json();
      return reply;
    }
    return {
      name: undefined,
      status: 'sleeping',
      opinion: 'Роботы сейчас отдыхают. Роботы недоступны.',
    };
  }

  async getLatestMessages() {
    const reqURL = `${this.hostURL}api/messages/latest`;
    try {
      const response = await fetch(reqURL);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async searchInMessages(searchString) {
    const reqURL = `${this.hostURL}api/messages/search?key=${searchString}`;
    try {
      const response = await fetch(reqURL);
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
