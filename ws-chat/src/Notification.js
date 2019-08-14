export default function Notify(nickname, message) {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(nickname, { body: message });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        const notification = new Notification(nickname, { body: message });
      }
    });
  }
}
