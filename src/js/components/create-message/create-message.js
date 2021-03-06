import BasicComponent from '../../common/basic-component';

export default class CreateMessage extends BasicComponent {
  constructor() {
    super('cm-container app-block');
    this.markup = `
        <form class="cm-form">
            <button type="button" class="cm-chaos-button rect-button">@</button>
            <input class="cm-text-input" name="text">
            <button class="cm-send-button rect-button">Отправить</button>            
            <div class="cm-file-inputs"></div>
            <button type="button" class="cm-add-button rect-button">+</button>            
        </form>
        <div class="cm-attached-files"></div>       
    `;
    this.container.innerHTML = this.markup;
    // Links to elements
    this.fileInputs = this.container.querySelector('.cm-file-inputs');
    this.textInput = this.container.querySelector('.cm-text-input');
    this.sendButton = this.container.querySelector('.cm-send-button');
    this.chaosButton = this.container.querySelector('.cm-chaos-button');
    this.addButton = this.container.querySelector('.cm-add-button');
    this.form = this.container.querySelector('.cm-form');
    this.cmAttachedFiles = this.container.querySelector('.cm-attached-files');
    this.init();
  }

  init() {
    this.chaosButton.addEventListener('click', () => {
      if (!this.textInput.value.startsWith('@chaos:')) {
        this.textInput.value = '@chaos:'.concat(this.textInput.value);
        this.textInput.focus();
      } else {
        this.textInput.value = this.textInput.value.replace('@chaos:', '');
      }
    });
  }

  returnText() {
    return this.textInput.value;
  }

  clear() {
    this.fileInputs.innerHTML = '';
    this.form.reset();
  }

  freeze() {
    this.fileInputs.disabled = true;
    this.textInput.disabled = true;
    this.sendButton.disabled = true;
    this.chaosButton.disabled = true;
    this.addButton.disabled = true;
    this.container.classList.add('inactive');
  }
}
