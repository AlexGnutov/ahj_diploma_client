import { fromEvent } from 'rxjs';
import BasicController from '../common/basic-controller';

export default class SearchController extends BasicController {
  initialize() {
    fromEvent(this.search.searchButton, 'click')
      .subscribe(async () => {
        const searchString = this.search.searchInput.value;
        const searchResults = await this.httpService.searchInMessages(searchString);
        if (searchResults) {
          this.searchResultsPage.publishSearchResults(searchResults, searchString);
          this.search.searchInput.value = '';
        } else {
          console.log('No search results was received!');
        }
      });
  }
}
