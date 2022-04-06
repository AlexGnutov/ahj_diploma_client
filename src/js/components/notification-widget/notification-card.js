import BasicComponent from '../../common/basic-component';
import { combineDateString } from '../../common/utils/date-processing';

export default class NotificationCard extends BasicComponent {
  constructor(notificationData) {
    super('notification-card-container');
    const { text, date, id } = notificationData;
    this.markup = `
      <div class="notification-card-text">${text}</div>
      <div class="notification-card-date">${combineDateString(date)}</div>
      <button class="notification-card-delete">x</button>
    `;
    this.container.dataset.id = id;
    this.container.innerHTML = this.markup;
  }
}
