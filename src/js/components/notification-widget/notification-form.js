import BasicComponent from '../../common/basic-component';

export default class NotificationForm extends BasicComponent {
  constructor() {
    super('notification-form-container hidden');
    this.markup = `
    <div class="notification-form-box widget-container">
        <button class="close-button">x</button>
        <div>Введите текст и выберите время напоминания</div>
        <form class="new-notification-form">
            <input class="notification-form-text" type="text" name="text" required>
            <input class="notification-form-date" type="datetime-local" name="date" required>
            <button class="notification-form-create rect-button">Создать</button>
        </form>
    </div>
    `;
    this.container.innerHTML = this.markup;
    this.form = this.container.querySelector('.new-notification-form');
    this.closeButton = this.container.querySelector('.close-button');
    this.textInput = this.container.querySelector('.notification-form-text');
    this.dateInput = this.container.querySelector('.notification-form-date');
    this.init();
  }

  init() {
    this.closeButton.addEventListener('click', () => {
      this.hide();
    });
  }
}
