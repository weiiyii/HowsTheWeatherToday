const cacheName = "v1";

// app shell
const cacheAsset = ["index.html", "offline.html"];

// Install
self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        return cache.addAll(cacheAsset);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  // remove old caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        console.log(`response type: ${res.type}`);
        const resClone = res.clone();
        // store res copy to cache
        caches.open(cacheName).then((cache) => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => {
        console.log("connection drops");
        return caches
          .match(e.request)
          .then((res) => {
            console.log(`digging cache: ${res.type}`);
            return res;
          })
          .catch((err) => {
            console.log("no match in cache");
            return caches.match("offline.html");
          });
      })

    // caches
    //   .match(e.request)
    //   .then((res) => {
    //     return (
    //       res ||
    //       fetch(e.request).then(async (res) => {
    //         const cache = await caches.open(cacheName);
    //         cache.put(e.request, res.clone());
    //         return res;
    //       })
    //     );
    //   })
    //   .catch(() => {
    //     caches.match("offline.html").then((res) => res);
    //   })

    // caches.match(e.request).then(() => {
    //   return fetch(e.request).catch(() => caches.match("offline.html"));
    // })
  );
});
