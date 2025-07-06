const CACHE_NAME = 'unicorn-work-tools-cache-v1';
const urlsToCache = [
  '/unicorn/',
  '/unicorn/work-tools.html',
  '../assets/icons/unicorn-solid-white.png',
  '../assets/icons/home.svg',
  '../assets/icons/contact.svg',
  '../assets/icons/mail.svg',
  '../assets/icons/tools.svg',
  '../assets/icons/notes.svg',
  '../assets/icons/folder.svg',
  '../assets/icons/settings.svg',
  '../assets/loading/we_loading.png',
  'we-iframe/dashboard.html',
  'we-iframe/contacts.html',
  'we-iframe/templates.html',
  'we-iframe/tool-widgets.html',
  'we-iframe/notes.html',
  'we-iframe/evidenz.html'
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