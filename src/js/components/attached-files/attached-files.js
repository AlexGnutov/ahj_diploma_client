import BasicComponent from '../../common/basic-component';

export default class AttachedFiles extends BasicComponent {
  constructor() {
    super('cm-attachments');
  }

  showFiles(files) {
    this.container.innerHTML = '';
    files.forEach((file) => {
      const markup = `
        <div class="cm-file-info" data-filename="${file.name}">
          <span class="cm-file-name">${file.name}</span>
          <span class="cm-file-size">${file.size}</span>
          <button class="cm-rm-file-button">rem</button>
        </div>
      `;
      this.container.innerHTML += markup;
    });
  }

  // eslint-disable-next-line class-methods-use-this
  removeFileFromList(button) {
    if (!button.classList.contains('cm-rm-file-button')) {
      return null;
    }
    const parentFileInfo = button.closest('.cm-file-info');
    const { filename } = parentFileInfo.dataset;
    parentFileInfo.remove();
    return filename;
  }

  clear() {
    this.container.innerHTML = '';
  }
}
