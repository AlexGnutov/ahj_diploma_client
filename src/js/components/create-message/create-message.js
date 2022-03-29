import BasicComponent from '../../common/basic-component';

export default class CreateMessage extends BasicComponent {
  constructor() {
    super('cm-container');
    this.markup = `
        <form class="cm-form">
            <input class="cm-text-input" name="text">
            <button class="cm-send-button">Send</button>            
            <div class="cm-file-inputs"></div>
            <button type="button" class="cm-add-button">Add</button>            
        </form>       
    `;
    this.container.innerHTML = this.markup;
    // Links to elements
    this.fileInputs = this.container.querySelector('.cm-file-inputs');
    this.textInput = this.container.querySelector('.cm-text-input');
    this.sendButton = this.container.querySelector('.cm-send-button');
    this.addButton = this.container.querySelector('.cm-add-button');
    this.form = this.container.querySelector('.cm-form');
  }

  returnText() {
    return this.textInput.value;
  }

  clear() {
    this.fileInputs.innerHTML = '';
    this.form.reset();
  }
}
