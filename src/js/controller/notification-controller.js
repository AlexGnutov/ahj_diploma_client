import { from, fromEvent } from 'rxjs';
import BasicController from '../common/basic-controller';
import Worker from '../workers/notification-worker';

export default class NotificationController extends BasicController {
  constructor(elements, services) {
    super(elements, services);
    this.worker = null;
  }

  initialize() {
    // Creates worker to control notifications and subscribes for messages from it
    this.worker = new Worker();
    this.worker.addEventListener('message', async (e) => {
      this.notificationWidget.removeNotificationCard(e.data); // deletes notification html
      const renewedList = await this.httpService
        .deleteNotification(e.data.id); // deletes notification at server side
      if (renewedList) {
        this.worker.postMessage(renewedList); // renews workers notification list
      }
      await this.publishNotification(e.data); // shows notification
    });

    // Deletes notification from everywhere, when red button pressed
    fromEvent(
      this.notificationWidget.list, 'click',
    ).subscribe(async (event) => {
      if (event.target.classList.contains('notification-card-delete')) {
        const { id } = event.target.parentNode.dataset;
        const renewedList = await this.httpService.deleteNotification(id);
        if (renewedList) {
          this.worker.postMessage(renewedList); // renews workers notification list
        }
        this.notificationWidget.removeNotificationCard({ id });
      }
    });

    // Load existing notifications from server
    from(this.httpService.getNotifications())
      .subscribe((reply) => {
        if (reply) {
          // console.log(reply);
          this.notificationWidget.publishNotifications(reply);
          this.worker.postMessage(reply);
        }
      });

    // Opens new notification form
    fromEvent(
      this.notificationWidget.showFormButton, 'click',
    ).subscribe(() => {
      this.notificationForm.show();
    });

    // Submits new notification and send its data to server
    fromEvent(
      this.notificationForm.form, 'submit',
    ).subscribe(async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const notificationData = {
        text: this.notificationForm.textInput.value,
        date: new Date(this.notificationForm.dateInput.value).valueOf(),
      };
      // console.log(notificationData);
      const reply = await this.httpService.createNotification(notificationData);
      if (reply && reply.status !== 'error') {
        this.notificationWidget.publishNotifications(reply);
        this.worker.postMessage(reply);
        // console.log(reply);
      }
      this.notificationForm.form.reset();
      this.notificationForm.hide();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async publishNotification(data) {
    if (!window.Notification) {
      // console.log('Notifications impossible!');
      return;
    }
    if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-unused-vars
      const notification = new Notification(data.text, {
        requireInteraction: true,
      });
      return;
    }
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // eslint-disable-next-line no-unused-vars
        const notification = new Notification(data.text, {
          requireInteraction: true,
        });
      }
    }
  }

  freezeNotificationWidget() {
    this.notificationForm.hide();
    this.notificationWidget.freeze();
    if (this.worker) {
      this.worker.terminate();
    }
  }
}
