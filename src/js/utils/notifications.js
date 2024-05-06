export const Notifications = {
  setup() {
    if (!('Notification' in window)) {
      console.error('Notification is not found');
    } else if (window.Notification.permission === 'granted') {

    } else if (window.Notification.permission !== 'denied') {
      window.Notification.requestPermission()
        .then(permission => {
          if (permission === 'granted') {
            console.log('Permission granted');
          }
        })
    }
  },
  show({ title, body }) {
    new Notification(title, { body });
  }
}
