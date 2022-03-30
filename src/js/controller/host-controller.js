import ContentBrowserController from './content-browser-controller';
import AddFilesController from './add-files-controller';
import MessagesController from './messages-controller';
import LaunchController from './launch-controller';
import BasicController from '../common/basic-controller';

export default class HostController extends BasicController {
  async initialize() {
    // Launch controller
    this.launchController = new LaunchController(
      this.elements,
      this.services,
    );
    await this.launchController.initialize();

    // Controls content browser events and update
    // Isolated - uses own SSE connection + switch self to offline state
    this.contentBrowserController = new ContentBrowserController(
      this.elements,
      this.services,
    );
    this.contentBrowserController.initialize();

    // Controls file adding through dialogue or with drag`n`drop
    this.addFilesController = new AddFilesController(
      this.elements,
      this.services,
    );
    this.addFilesController.initialize();

    // Controls all events connected with messages sending / receiving
    this.messagesController = new MessagesController(
      this.elements,
      this.services,
    );
    this.messagesController.initialize();
  }
}
