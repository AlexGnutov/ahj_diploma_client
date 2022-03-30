import BasicComponent from '../../common/basic-component';

export default class OfflineMessage extends BasicComponent {
  constructor() {
    super('offline-message-container hidden');
    this.markup = `
      <div class="offline-message">
        <div class="offline-message-content">  
        <h2>К сожалению, сервер недоступен.</h2> 
        <p>Перезагрузите страницу или продолжите работу в ограниченном режиме.В этом случае будут доступны только сохранённые в памяти вашего бразура сообщения.</p>         
        </div>
        <button class="offline-message-reload">Перезагрузить страницу</button>
        <button class="offline-message-continue">Продолжить работу</button>
      </div>
    `;
    this.container.innerHTML = this.markup;
    this.reloadButton = this.container.querySelector('.offline-message-reload');
    this.continueButton = this.container.querySelector('.offline-message-continue');
    this.init();
  }

  init() {
    this.reloadButton.addEventListener('click', () => {
      window.location.reload();
    });
    this.continueButton.addEventListener('click', () => {
      this.hide();
    });
  }

  hide() {
    this.container.classList.add('hidden');
  }

  show() {
    this.container.classList.remove('hidden');
  }
}
