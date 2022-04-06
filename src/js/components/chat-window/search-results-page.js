import BasicComponent from '../../common/basic-component';
import ChatMessage from '../messages/chat-message/chat-message';

export default class SearchResultsPage extends BasicComponent {
  constructor() {
    super('search-results-container hidden widget-container');
    this.markup = `
        <button class="close-button">x</button>
        <h3>Результаты поиска:</h3>
        <div class="search-results-list"></div>
    `;
    this.container.innerHTML = this.markup;
    this.list = this.container.querySelector('.search-results-list');
    this.closeButton = this.container.querySelector('.close-button');
    this.init();
  }

  init() {
    this.closeButton.addEventListener('click', () => {
      this.hide();
    });
  }

  // Publish search results
  publishSearchResults(searchResults, searchString) {
    // console.log('SEARCH PUBLISH');
    this.list.innerHTML = '';
    if (searchResults.length > 0) {
      searchResults.forEach((messageData) => {
        const searchMessage = new ChatMessage(messageData);
        searchMessage.markSearchKey(searchString);
        searchMessage.bindToDOM(this.list);
      });
    }
    this.show();
  }
}
