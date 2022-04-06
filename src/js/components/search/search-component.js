import BasicComponent from '../../common/basic-component';

export default class SearchComponent extends BasicComponent {
  constructor() {
    super('search-container widget-container');
    this.markup = `
        <form class="sc-search-form">
            <input class="sc-search-input">
            <button class="sc-search-button rect-button">Найти</button>
        </form>        
      `;
    this.container.innerHTML = this.markup;
    // Links
    this.form = this.container.querySelector('.sc-search-form');
    this.searchInput = this.container.querySelector('.sc-search-input');
    this.searchButton = this.container.querySelector('.sc-search-button');
  }

  getSearchString() {
    return this.searchInput.value;
  }

  clearInput() {
    this.searchInput.value = '';
  }

  freeze() {
    this.searchButton.disabled = true;
    this.searchInput.disabled = true;
    this.container.classList.add('inactive');
  }
}
