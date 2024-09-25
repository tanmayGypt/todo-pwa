export default function swDev() {
  function determineAppServerKey() {
    const vapidPublicKey =
      "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
    return urlBase64ToUint8Array(vapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log("Service Worker Registered: ", registration);

      registration.pushManager.getSubscription().then((subscription) => {
        if (subscription === null) {
          // No subscription, create a new one
          console.log("No subscription detected, subscribing...");

          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: determineAppServerKey(),
            })
            .then((newSubscription) => {
              console.log("Subscribed successfully: ", newSubscription);
            })
            .catch((error) => {
              console.error(
                "Failed to subscribe to push notifications: ",
                error
              );
            });
        } else {
          console.log("Already subscribed: ", subscription);
        }
      });
    })
    .catch((error) => {
      console.error("Service Worker registration failed: ", error);
    });
}
