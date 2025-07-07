const CACHE_NAME = 'unicorn-work-tools-cache-v1';
const urlsToCache = [
  'web-mywebsite/unicorn/',
  'web-mywebsite/unicorn/work-tools.html',
  'web-mywebsite/assets/icons/unicorn-solid-white.png',
  'web-mywebsite/assets/icons/home.svg',
  'web-mywebsite/assets/icons/contact.svg',
  'web-mywebsite/assets/icons/mail.svg',
  'web-mywebsite/assets/icons/tools.svg',
  'web-mywebsite/assets/icons/notes.svg',
  'web-mywebsite/assets/icons/folder.svg',
  'web-mywebsite/assets/icons/settings.svg',
  'web-mywebsite/assets/loading/we_loading.png',
  'web-mywebsite/unicorn/we-iframe/dashboard.html',
  'web-mywebsite/unicorn/we-iframe/contacts.html',
  'web-mywebsite/unicorn/we-iframe/templates.html',
  'web-mywebsite/unicorn/we-iframe/tool-widgets.html',
  'web-mywebsite/unicorn/we-iframe/notes.html',
  'web-mywebsite/unicorn/we-iframe/evidenz.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache for Unicorn');
        // Use addAll with relative URLs. The browser resolves them against the service worker's location.
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
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1 && cacheName.startsWith('unicorn-work-tools')) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});