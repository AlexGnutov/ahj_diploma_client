import BasicComponent from '../../common/basic-component';
import NotificationCard from './notification-card';

export default class NotificationWidget extends BasicComponent {
  constructor() {
    super('notification-widget-container widget-container');
    this.markup = `
      <div class="widget-header">
        
        <span class="widget-title">Напоминания</span>
        <button class="add-notification-button round-button">+</button>
      </div>
      
      <div class="notifications-list"></div>
    `;
    this.container.innerHTML = this.markup;
    // Links to elements:
    this.showFormButton = this.container.querySelector('.add-notification-button');
    this.list = this.container.querySelector('.notifications-list');
  }

  publishNotifications(notificationsData) {
    this.list.innerHTML = '';
    notificationsData.forEach((data) => {
      const notificationCard = new NotificationCard(data);
      notificationCard.bindToDOM(this.list);
    });
  }

  removeNotificationCard(notificationData) {
    const { id } = notificationData;
    const toRemove = this.list.querySelector(`[data-id="${id}"]`);
    if (toRemove) {
      toRemove.remove();
    }
  }

  freeze() {
    this.showFormButton.disabled = true;
    this.container.classList.add('inactive');
  }
}
