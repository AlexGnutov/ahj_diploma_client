export default class HttpService {
  constructor() {
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
}
