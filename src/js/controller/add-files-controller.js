import { fromEvent } from 'rxjs';
import BasicController from '../common/basic-controller';

export default class AddFilesController extends BasicController {
  initialize() {
    // Opens add file dialogue
    fromEvent(
      this.createMessage.addButton, 'click',
    ).subscribe(() => {
      this.fileCache.grabFiles();
    });
    // Remove files with "X" button
    fromEvent(
      this.attachedFiles.html(), 'click',
    ).subscribe((event) => {
      // THIS NEEDS TO BE CHANGED:
      const filename = this.attachedFiles.removeFileFromList(event.target);
      this.fileCache.removeFileFromCache(filename);
    });
    // File(s) drag and dropping
    fromEvent(
      this.messagesPage.list, 'dragover',
    ).subscribe((e) => {
      e.stopPropagation();
      e.preventDefault();
    });
    fromEvent(
      this.messagesPage.list, 'dragenter',
    ).subscribe((e) => {
      e.stopPropagation();
      e.preventDefault();
    });
    fromEvent(
      this.messagesPage.list, 'drop',
    ).subscribe((e) => {
      e.stopPropagation();
      e.preventDefault();
      const { files } = e.dataTransfer;
      this.fileCache.addFilesToCache(files);
      this.fileCache.updateFilesList();
    });
  }
}
