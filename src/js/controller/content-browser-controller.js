import { fromEvent } from 'rxjs';
import BasicController from '../common/basic-controller';

export default class ContentBrowserController extends BasicController {
  initialize() {
    // Process expand button click
    fromEvent(
      this.contentBrowser.expandButton, 'click',
    ).subscribe(() => {
      this.contentBrowser.toggle();
    });

    // Starts content data update with SSE
    this.startContentDataUpdate();
  }

  startContentDataUpdate() {
    this.sse = new EventSource('http://localhost:8080/api/content-update');
    this.sse.addEventListener('open', () => {
      console.log('SSE Content Update Connected');
    });
    this.sse.addEventListener('message', (evt) => {
      console.log('Content Data Update Received: ', evt.data);
      const contentData = JSON.parse(evt.data);
      const linksData = this.contentBrowser.getLinks(contentData);
      this.contentBrowser.publishLinks(linksData);
      this.contentBrowser.publishContent(contentData);
    });
    this.sse.addEventListener('error', (evt) => {
      console.log('Content Data Update Error: ', evt);
      this.sse.close();
      console.log('Connection Status ', this.sse.readyState);
    });
  }
}
