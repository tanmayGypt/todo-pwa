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

        "/index.html",
        "/",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request);
        console.log("Fetched from network:", event.request.url);
        if (networkResponse.ok) {
          const cache = await caches.open(cacheData);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } else {
          return await caches.match(event.request);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        return await caches.match(event.request);
      }
    })()
  );
});
