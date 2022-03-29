import { create } from '../common/utils/utils';

export default class FilesCacheService {
  constructor(attachmentsList) {
    this.files = [];
    this.attachmentsList = attachmentsList;
  }

  grabFiles() {
    const newInput = create('input', 'cm-file-input');
    newInput.accept = '.txt, .pdf';
    newInput.type = 'file';
    newInput.multiple = true;
    newInput.addEventListener('change', (e) => {
      const { files } = e.target;
      this.addFilesToCache(files);
      this.updateFilesList();
      e.target.remove();
    });
    newInput.click();
  }

  updateFilesList() {
    this.attachmentsList.showFiles(this.files);
    console.log(this.files);
  }

  addFilesToCache(fileList) {
    const numberOfFiles = fileList.length;
    if (numberOfFiles) {
      for (let i = 0; i < numberOfFiles; i += 1) {
        this.files.push(fileList[`${i}`]);
      }
    }
  }

  removeFileFromCache(filename) {
    const index = this.files.findIndex((file) => file.name === filename);
    if (index >= 0) {
      this.files.splice(index, 1);
    }
  }

  getFilesFromCache() {
    return this.files;
  }

  clear() {
    this.files = [];
    this.attachmentsList.clear();
  }
}
