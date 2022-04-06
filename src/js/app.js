import MainComponent from './main-component';

// Init service worker
if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register(
        '/service-worker.js', { scope: './' },
      );
    } catch (e) {
      // console.log(e);
    }
  });
}

window.addEventListener('load', async () => {
  const container = document.getElementById('container');
  // Create and add application to HTML
  const chaosOrganizer = new MainComponent();
  await chaosOrganizer.initialize();
  chaosOrganizer.bindToDOM(container);
});
