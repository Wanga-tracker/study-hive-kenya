const messaging = firebase.messaging();

messaging.requestPermission().then(() => {
  console.log('Notification permission granted.');
}).catch(err => {
  console.log('Unable to get permission:', err);
});

messaging.onMessage((payload) => {
  const notificationBanner = document.getElementById('notification-banner');
  notificationBanner.textContent = payload.notification.body;
  notificationBanner.style.display = 'block';
  setTimeout(() => {
    notificationBanner.style.display = 'none';
  }, 10000);
});
