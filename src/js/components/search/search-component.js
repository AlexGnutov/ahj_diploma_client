import BasicComponent from '../../common/basic-component';

export default class SearchComponent extends BasicComponent {
  constructor() {
    super('search-container');
    this.markup = `
        <input class="sc-search-input">
        <button class="sc-search-button">Search</button>
      `;
    this.container.innerHTML = this.markup;
    // Links
    this.searchInput = this.container.querySelector('.sc-search-input');
    this.searchButton = this.container.querySelector('.sc-search-button');
  }

  disable() {
    this.searchButton.disabled = true;
    this.searchInput.disabled = true;
    this.container.classList.toggle('search-inactive');
  }
}
