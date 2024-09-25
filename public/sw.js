// sw.js

const cacheData = "appV1";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/bundle.js",
        "/static/css/main.chunk.css",
        "/main.c45fd41e.css",
        "/static/js/main.eadae8db.js",
        "/static/js/dom.js",
        "/sw.js",
        "/index.html",
        "https://jovial-alpaca-1d7c97.netlify.app/",
        "/",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        // Attempt to fetch the resource from the network
        const networkResponse = await fetch(event.request);

        // If the fetch is successful, return the response
        if (networkResponse.ok) {
          // Optionally, cache the response
          const cache = await caches.open(cacheData);
          cache.put(event.request, networkResponse.clone()); // Clone the response for caching
          return networkResponse;
        } else {
          // If the network response is not OK, fall back to the cache
          return await caches.match(event.request);
        }
      } catch (error) {
        // If there’s a network error, return the cached response (if available)
        return await caches.match(event.request);
      }
    })()
  );
});
