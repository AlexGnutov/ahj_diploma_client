import BasicComponent from './common/basic-component';
import MessagesList from './components/messages-list/messages-list';
import CreateMessage from './components/create-message/create-message';
import AttachedFiles from './components/attached-files/attached-files';
import Controller from './controller/controller';
import ControlBar from './components/control-bar/control-bar';
import SearchComponent from './components/search/search-component';
import ContentBrowser from './components/content-browser/content-browser';

export default class Main extends BasicComponent {
  constructor() {
    super('app-container');
    this.markup = `
        <div id="main-container" class="main-container"></div>
        <div id="side-container" class="side-container"></div>
    `;
    this.container.innerHTML = this.markup;
    this.mainContainer = this.container.querySelector('.main-container');
    this.sideContainer = this.container.querySelector('.side-container');
    // Add components
    this.messagesList = new MessagesList();
    this.createMessage = new CreateMessage();
    this.attachedFilesList = new AttachedFiles();
    this.searchComponent = new SearchComponent();
    this.browserComponent = new ContentBrowser();
    this.controlBar = new ControlBar(this.sideContainer);
  }

  initialize() {
    // Add visual components - main container
    this.controlBar.bindToDOM(this.mainContainer);
    this.messagesList.bindToDOM(this.mainContainer);
    this.createMessage.bindToDOM(this.mainContainer);
    this.attachedFilesList.bindToDOM(this.mainContainer);
    // Add visual components - side container
    this.searchComponent.bindToDOM(this.sideContainer);
    this.browserComponent.bindToDOM(this.sideContainer);
    // Add and initialize controller
    const controller = new Controller(
      this.messagesList,
      this.createMessage,
      this.attachedFilesList,
    );
    controller.initialize();
  }
}
