import BasicComponent from './common/basic-component';
import CreateMessage from './components/create-message/create-message';
import AttachedFiles from './components/attached-files/attached-files';
import ControlBar from './components/control-bar/control-bar';
import SearchComponent from './components/search/search-component';
import ContentBrowser from './components/content-browser/content-browser';
import HostController from './controller/host-controller';
import OfflineMessage from './components/messages/offline-message/offline-message';
import WebSocketService from './services/web-socket';
import HttpService from './services/http-service';
import MessagesCacheService from './services/messages-cache-service';
import FilesCacheService from './services/files-cache-service';
import ChatWindow from './components/chat-window/chat-window';
import FilesPage from './components/chat-window/files-page';
import MessagesPage from './components/chat-window/messages-page';
import SearchResultsPage from './components/chat-window/search-results-page';
import NotificationWidget from './components/notification-widget/notification-widget';
import NotificationForm from './components/notification-widget/notification-form';
import StateService from './services/state-service';
import BusyMessage from './components/messages/busy-message/busy-message';

export default class MainComponent extends BasicComponent {
  constructor() {
    super('app-container');
    this.markup = `
        <h1 class="app-header">Chaos Organizer</h1>
        <div class="column-container">
            <div id="main-container" class="main-container"></div>
            <div id="side-container" class="side-container hidden"></div>
        </div>
    `;
    this.container.innerHTML = this.markup;
    this.mainContainer = this.container.querySelector('.main-container');
    this.sideContainer = this.container.querySelector('.side-container');
    // Add components
    this.chatWindow = new ChatWindow();
    this.filesPage = new FilesPage();
    this.messagesPage = new MessagesPage();
    this.searchResultsPage = new SearchResultsPage();
    // Create message form
    this.createMessage = new CreateMessage();
    this.attachedFilesList = new AttachedFiles();
    this.controlBar = new ControlBar(this.sideContainer);
    this.contentBrowserComponent = new ContentBrowser();
    this.offlineMessage = new OfflineMessage();
    this.busyMessage = new BusyMessage();
    this.searchWidget = new SearchComponent();
    this.notificationWidget = new NotificationWidget();
    this.notificationForm = new NotificationForm();
  }

  async initialize() {
    // Add visual components - main container
    this.controlBar.bindToDOM(this.mainContainer);
    this.chatWindow.bindToDOM(this.mainContainer);
    this.filesPage.bindToDOM(this.chatWindow.html());
    this.messagesPage.bindToDOM(this.chatWindow.html());
    this.searchResultsPage.bindToDOM(this.chatWindow.html());
    this.createMessage.bindToDOM(this.container);
    this.attachedFilesList.bindToDOM(this.createMessage.cmAttachedFiles);
    // Add visual components - side container
    this.contentBrowserComponent.bindToDOM(this.sideContainer);
    this.searchWidget.bindToDOM(this.sideContainer);
    this.notificationWidget.bindToDOM(this.sideContainer);
    this.notificationForm.bindToDOM(this.container); // popups
    this.offlineMessage.bindToDOM(this.container); // popups
    this.busyMessage.bindToDOM(this.container); // popups

    // All components will be accessible from controllers
    const elementsContainer = {
      messagesPage: this.messagesPage,
      searchResultsPage: this.searchResultsPage,
      filesPage: this.filesPage,
      createMessage: this.createMessage,
      attachedFiles: this.attachedFilesList,
      controlBar: this.controlBar,
      contentBrowser: this.contentBrowserComponent,
      offlineMessage: this.offlineMessage,
      busyMessage: this.busyMessage,
      search: this.searchWidget,
      notificationWidget: this.notificationWidget,
      notificationForm: this.notificationForm,
    };

    // Services
    const servicesContainer = {
      webSocketService: new WebSocketService(),
      httpService: new HttpService(),
      messagesCache: new MessagesCacheService(),
      fileCache: new FilesCacheService(this.attachedFilesList),
      stateService: new StateService(),
    };

    // Create Host controller
    this.hostController = new HostController(
      elementsContainer,
      servicesContainer,
    );
    await this.hostController.initialize();
  }
}
