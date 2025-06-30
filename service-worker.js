const CACHE_NAME = 'my-dashboard-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',

  // iFrame HTML files from your main content
  '/tabs/appdrawer.html',
  '/tabs/widgets-iframe.html',
  '/tabs/readlater.html',
  '/tabs/rss-reader.html',
  '/tabs/aurimea.html',
  '/tabs/memomea.html',

  // Scripts
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://unpkg.com/lucide@latest',

  // Fonts
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap',

  // Icons and images from the sidebar and loader
  '/assets/icons/home-solid-white.png',
  '/assets/icons/appdrawer.svg',
  '/assets/icons/widgets.svg',
  '/assets/icons/readlater.svg',
  '/assets/icons/rss.svg',
  '/assets/icons/aurimea.svg',
  '/assets/icons/memomea.svg',
  '/assets/icons/unicorn.svg',
  '/assets/icons/calendar.svg',
  '/assets/icons/drive.svg',
  '/assets/icons/notes.svg',
  '/assets/icons/settings.svg',
  '/assets/loading/zzz-loading.gif'
];

// Install event: Open cache and add all core files to it
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Fetch event: Serve cached content first, or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      })
  );
});

// Activate event: Clean up old caches
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