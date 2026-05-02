//* ─────────────────────────────────────────────────
   Service Worker — La Primula Rossa PWA
   GitHub Pages ready
───────────────────────────────────────────────── */

const CACHE_NAME = 'primula-rossa-v2';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',

  './css/variables.css',
  './css/base.css',
  './css/components.css',
  './css/screens.css',

  './js/app.js',
  './js/state.js',

  './data/mock.js',

  './js/components/navbar.js',
  './js/components/cards.js',

  './js/screens/onboarding.js',
  './js/screens/home.js',
  './js/screens/prenota.js',
  './js/screens/portfolio.js',
  './js/screens/artisti.js',
  './js/screens/shop.js',
  './js/screens/fidelity.js',
  './js/screens/chat.js',
  './js/screens/profilo.js',
  './js/screens/storia.js',
  './js/screens/login.js',
  './js/screens/register.js',

  './assets/icons/icon-192.svg',
  './assets/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }

          const clone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });

          return response;
        })
        .catch(() => cached);
    })
  );
});