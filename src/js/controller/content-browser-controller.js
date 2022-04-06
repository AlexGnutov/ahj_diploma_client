import { fromEvent } from 'rxjs';
import BasicController from '../common/basic-controller';

export default class ContentBrowserController extends BasicController {
  constructor(elements, services) {
    super(elements, services);
    this.sse = null;
  }

  initialize() {
    // Expand button click
    fromEvent(
      this.contentBrowser.expandButton, 'click',
    ).subscribe(() => {
      this.filesPage.show();
    });

    fromEvent(
      this.contentBrowser.linksContainer, 'click',
    ).subscribe((e) => {
      if (e.target.classList.contains('c-browser-link')) {
        this.filesPage.filterContent(e.target.dataset.key);
        this.contentBrowser.highlightLink(e.target);
      }
    });
    // Content link click
    // Starts content data update with SSE (Never restarts)
    this.startContentDataUpdate();
  }

  startContentDataUpdate() {
    this.sse = new EventSource('https://ahjdiploma.herokuapp.com/api/content-update');
    this.sse.addEventListener('open', () => {
      // console.log('SSE Content Update Connected');
    });
    this.sse.addEventListener('message', (evt) => {
      // console.log('Content Data Update Received: ', evt.data);
      const contentData = JSON.parse(evt.data);
      this.filesPage.publishContentData(contentData);
      const linksData = this.contentBrowser.getLinks(contentData);
      this.contentBrowser.publishLinks(linksData);
    });
    this.sse.addEventListener('error', () => {
      // console.log('Content Data Update Error: ', evt);
      this.sse.close();
      // console.log('Connection Status ', this.sse.readyState);
    });
  }

  freezeContentBrowserElement() {
    if (this.sse) {
      this.sse.close();
    }
    this.contentBrowser.freeze();
  }
}
