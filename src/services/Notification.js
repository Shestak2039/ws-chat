export default function Notify(nickname, message) {
  if (Notification.permission === 'granted') {
    new Notification(nickname, { body: message });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        new Notification(nickname, { body: message });
      }
    });
  }
}
