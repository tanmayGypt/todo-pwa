// swDev.js

export default function swDev() {
  if ("serviceWorker" in navigator) {
    const swUrl = `${window.location.origin}/sw.js`; // Ensure correct URL

    navigator.serviceWorker
      .register(swUrl)
      .then((response) => {
        console.warn("Service Worker registered successfully:", response);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  } else {
    console.warn("Service workers are not supported in this browser.");
  }
}
