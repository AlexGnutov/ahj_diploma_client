let notificationsArray = [];
let interval;

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', (event) => {
  // Stop previous interval - if exist
  if (interval) {
    clearInterval(interval);
  }
  // Fill down new notifications
  notificationsArray = event.data;
  // console.log('worker renewed');
  // console.log(event.data);

  // Start notification time check
  if (notificationsArray[0]) {
    interval = setInterval(() => {
      // Scan over all actual notifications
      notificationsArray.forEach((notification) => {
        const now = Date.now();
        const notificationDate = parseInt(`${notification.date}`, 10);
        const delta = notificationDate - now;
        // console.log(delta);
        if (delta < 30000) {
          // eslint-disable-next-line no-restricted-globals
          self.postMessage(notification);
          clearInterval(interval);
        }
      });
      // console.log('notifications checked');
    }, 10000);
  }
});
