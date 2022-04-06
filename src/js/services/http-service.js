export default class HttpService {
  constructor() {
    this.hostURL = 'https://ahjdiploma.herokuapp.com/';
  }

  async sendFile(files) {
    const data = new FormData();
    files.forEach((file, index) => {
      data.append(`file-${index}`, file);
    });
    const response = await fetch(`${this.hostURL}api/files/upload`, {
      method: 'POST',
      body: data,
    });
    if (response.ok) {
      return response.json();
    }
    return null;
  }

  async loadPreviousMessages(lastDate) {
    const reqURL = `${this.hostURL}api/messages/next?lastDate=${lastDate}`;
    const response = await fetch(reqURL);
    if (response.ok) {
      const reply = await response.json();
      return reply;
    }
    return null;
  }

  async getBotReply(text) {
    const command = text.replace('@chaos:', '').trim();
    const reqURL = `${this.hostURL}api/bot?command=${command}`;
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

  async getNotifications() {
    const reqURL = `${this.hostURL}api/notifications`;
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

  async createNotification(notificationData) {
    const data = new FormData();
    Object.keys(notificationData).forEach((key) => {
      data.append(key, notificationData[key]);
    });
    const response = await fetch(`${this.hostURL}api/notifications`, {
      method: 'POST',
      body: data,
    });
    if (response.ok) {
      return response.json();
    }
    return null;
  }

  async deleteNotification(id) {
    const reqURL = `${this.hostURL}api/notifications/delete?id=${id}`;
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
