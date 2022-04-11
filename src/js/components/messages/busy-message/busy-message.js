import BasicComponent from '../../../common/basic-component';

export default class BusyMessage extends BasicComponent {
  constructor() {
    super('busy-message-container hidden');
    this.markup = `
    <div class="busy-circle">
       <div class="busy-brick"></div> 
    </div>
    <div class="busy-text">Loading...</div>
    `;
    this.container.innerHTML = this.markup;
  }
}
