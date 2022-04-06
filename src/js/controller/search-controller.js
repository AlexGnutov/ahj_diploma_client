import { fromEvent } from 'rxjs';
import BasicController from '../common/basic-controller';

export default class SearchController extends BasicController {
  initialize() {
    fromEvent(this.search.form, 'submit')
      .subscribe(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const searchString = this.search.getSearchString();
        if (searchString) {
          const searchResults = await this.httpService.searchInMessages(searchString);
          if (searchResults) {
            this.searchResultsPage.publishSearchResults(searchResults, searchString);
            this.search.clearInput();
          }
        }
      });
  }

  freezeSearchElement() {
    this.search.freeze();
  }
}
