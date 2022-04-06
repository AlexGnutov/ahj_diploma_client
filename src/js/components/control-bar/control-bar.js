import { fromEvent } from 'rxjs';
import BasicComponent from '../../common/basic-component';

export default class ControlBar extends BasicComponent {
  constructor(sidebar) {
    super('control-bar-container app-block');
    this.sidebarContainer = sidebar;
    this.markup = `
      <button class="cb-sidebar-button rect-button">+</button>
    `;
    this.container.innerHTML = this.markup;
    this.sidebarButton = this.container.querySelector('.cb-sidebar-button');
    this.initialize();
  }

  initialize() {
    fromEvent(
      this.sidebarButton, 'click',
    ).subscribe(() => {
      this.sidebarContainer.classList.toggle('hidden');
    });
  }
}
