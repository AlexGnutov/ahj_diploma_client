import { distinctUntilChanged, pluck } from 'rxjs';
import ContentBrowserController from './content-browser-controller';
import AddFilesController from './add-files-controller';
import MessagesController from './messages-controller';
import LaunchController from './launch-controller';
import BasicController from '../common/basic-controller';
import SearchController from './search-controller';
import NotificationController from './notification-controller';

export default class HostController extends BasicController {
  async initialize() {
    // Create necessary sub-controllers:
    this.launchController = new LaunchController(this.elements, this.services);
    this.contentBrowserController = new ContentBrowserController(this.elements, this.services);
    this.addFilesController = new AddFilesController(this.elements, this.services);
    this.messagesController = new MessagesController(this.elements, this.services);
    this.searchController = new SearchController(this.elements, this.services);
    this.notificationsController = new NotificationController(this.elements, this.services);

    this.stateService.state$
      .pipe(
        pluck('online'),
        distinctUntilChanged(),
      )
      .subscribe(async (value) => {
        if (value === true) {
          await this.launchController.initialize();
          this.contentBrowserController.initialize();
          this.addFilesController.initialize();
          this.messagesController.initialize();
          this.searchController.initialize();
          this.notificationsController.initialize();
        }
        if (value === false) {
          this.launchController.switchToOffline();
          this.messagesController.freezeCreateMessageElement();
          this.searchController.freezeSearchElement();
          this.addFilesController.freezeFileAdding();
          this.notificationsController.freezeNotificationWidget();
          this.contentBrowserController.freezeContentBrowserElement();
          // console.log('You are offline');
        }
      });

    this.webSocketService.startWebSocket(this.stateService);
  }
}
