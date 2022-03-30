import BasicComponent from './common/basic-component';
import MessagesList from './components/messages-list/messages-list';
import CreateMessage from './components/create-message/create-message';
import AttachedFiles from './components/attached-files/attached-files';
import ControlBar from './components/control-bar/control-bar';
import SearchComponent from './components/search/search-component';
import ContentBrowser from './components/content-browser/content-browser';
import HostController from './controller/host-controller';
import OfflineMessage from './components/offline-message/offline-message';
import WebSocketService from './services/web-socket';
import HttpService from './services/http-service';
import MessagesCacheService from './services/messages-cache-service';
import Publisher from './view/publisher';
import FilesCacheService from './services/files-cache-service';

export default class Main extends BasicComponent {
  constructor() {
    super('app-container');
    this.markup = `
        <div class="column-container">
            <div id="main-container" class="main-container"></div>
            <div id="side-container" class="side-container"></div>
        </div>
    `;
    this.container.innerHTML = this.markup;
    this.mainContainer = this.container.querySelector('.main-container');
    this.sideContainer = this.container.querySelector('.side-container');
    // Add components
    this.messagesList = new MessagesList();
    this.createMessage = new CreateMessage();
    this.attachedFilesList = new AttachedFiles();
    this.controlBar = new ControlBar(this.sideContainer);
    this.contentBrowserComponent = new ContentBrowser();
    this.offlineMessage = new OfflineMessage();
    this.searchComponent = new SearchComponent();
  }

  async initialize() {
    // Add visual components - main container
    this.messagesList.bindToDOM(this.mainContainer);
    this.createMessage.bindToDOM(this.container);
    this.attachedFilesList.bindToDOM(this.mainContainer);
    this.controlBar.bindToDOM(this.mainContainer);
    // Add visual components - side container
    this.contentBrowserComponent.bindToDOM(this.sideContainer);
    this.offlineMessage.bindToDOM(this.container);
    this.searchComponent.bindToDOM(this.sideContainer);

    const elementsContainer = {
      messagesList: this.messagesList,
      createMessage: this.createMessage,
      attachedFiles: this.attachedFilesList,
      controlBar: this.controlBar,
      contentBrowser: this.contentBrowserComponent,
      offlineMessage: this.offlineMessage,
      search: this.searchComponent,
    };

    const servicesContainer = {
      webSocketService: new WebSocketService(),
      httpService: new HttpService(),
      messagesCache: new MessagesCacheService(),
      publisher: new Publisher(null, this.messagesList),
      fileCache: new FilesCacheService(this.attachedFilesList),
    };

    // Create Host controller
    this.hostController = new HostController(
      elementsContainer,
      servicesContainer,
    );
    await this.hostController.initialize();
  }
}
