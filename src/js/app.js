import Main from './main';

window.addEventListener('load', () => {
  const container = document.getElementById('container');
  // Create and add application to HTML
  const chaosOrganizer = new Main();
  chaosOrganizer.initialize();
  chaosOrganizer.bindToDOM(container);
});
