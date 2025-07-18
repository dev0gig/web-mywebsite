const CACHE_NAME = 'axismea-app-cache-v1';
const urlsToCache = [
  '/web-mywebsite/',
  '/web-mywebsite/index.html',
  '/web-mywebsite/script.js',
  '/web-mywebsite/style.css',
  '/web-mywebsite/assets/icons/unicorn.svg',
  '/web-mywebsite/assets/icons/unicorn-solid-white.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});