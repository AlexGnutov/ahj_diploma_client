import BasicComponent from '../../../common/basic-component';
import { combineDateOnlyString } from '../../../common/utils/date-processing';
import shortLink from '../../../common/utils/short-link';

export default class ContentMessage extends BasicComponent {
  constructor(messageData) {
    super('content-message-container');
    const { fileType, fileName, date } = messageData;
    this.markup = `
            <div class="content-message-date">${combineDateOnlyString(date)}</div>
            <div class="content-message-filetype">${fileType}</div>
            <a class="content-message-link"
                href="https://ahjdiploma.herokuapp.com/api/files/download/${fileName}"
                download="${fileName}">${shortLink(fileName)}</a>
    `;
    this.container.innerHTML = this.markup;
    this.container.dataset.fileType = fileType;
  }
}
