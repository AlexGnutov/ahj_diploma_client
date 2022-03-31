import BasicComponent from '../../../common/basic-component';
import { combineDateOnlyString } from '../../../common/utils/date-processing';

export default class ContentMessage extends BasicComponent {
  constructor(messageData) {
    super('content-message-container');
    const { fileType, fileName, date } = messageData;
    this.markup = `
            <div class="content-message-date">${combineDateOnlyString(date)}</div>
            <div class="content-message-filetype">${fileType}</div>
            <a class="content-message-link"
                href="http://localhost:8080/api/files/download/${fileName}"
                download="${fileName}">${fileName}</a>
    `;
    this.container.innerHTML = this.markup;
  }
}
