import Main from './main';

window.addEventListener('load', async () => {
  const container = document.getElementById('container');
  // Create and add application to HTML
  const chaosOrganizer = new Main();
  await chaosOrganizer.initialize();
  chaosOrganizer.bindToDOM(container);
});
