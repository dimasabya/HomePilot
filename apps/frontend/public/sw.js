const CACHE_NAME = "homepilot-v3";

const APP_SHELL = [
  "/",
  "/dashboard",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    }),
  );

  self.skipWaiting();
});

// self.addEventListener("install", (event) => {
//   console.log("SW INSTALL");

//   event.waitUntil(
//     (async () => {
//       const cache = await caches.open(CACHE_NAME);

//       for (const file of APP_SHELL) {
//         try {
//           console.log("Caching", file);
//           await cache.add(file);
//           console.log("OK", file);
//         } catch (err) {
//           console.error("FAILED", file, err);
//         }
//       }
//     })(),
//   );

//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(clients.claim());
// });

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Delete cache:", key);
            return caches.delete(key);
          }
        }),
      );

      await clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // ==========================
  // API
  // ==========================
  if (url.pathname.startsWith("/api")) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // ==========================
  // Halaman
  // ==========================
  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // ==========================
  // Asset
  // ==========================
  event.respondWith(cacheFirst(event.request));
});

// helper functions
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);

  cache.put(request, response.clone());

  return response;
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);

    cache.put(request, response.clone());

    return response;
  } catch {
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    return caches.match("/dashboard");
  }
}

self.addEventListener("message", async (event) => {
  if (event.data?.type !== "SHOW_NOTIFICATION") return;

  await self.registration.showNotification(event.data.title, {
    body: event.data.body,
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    tag: "homepilot",
    renotify: true,
    vibrate: [200, 100, 200],

    data: {
      url: event.data.url || "/dashboard",
    },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow(event.notification.data.url));
});

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-homepilot") {
    console.log("Background Sync triggered");
  }
});
