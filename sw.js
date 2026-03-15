// Service Worker para cache offline - Otimizado para contas gratuitas
const CACHE_NAME = 'geradores-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/src/app.js',
  '/src/firebase.js',
  '/src/utils.js',
  '/src/env.js'
];

// Cache estático na instalação
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Limpar caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Estratégia: Cache First, fallback para network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Não cachear requisições do Firebase
  if (url.hostname.includes('firebase') || url.hostname.includes('gstatic')) {
    return;
  }

  // API calls não são cacheadas
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networked = fetch(request)
        .then((response) => {
          const clone = response.clone();
          if (response.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        })
        .catch(() => cached);

      return cached || networked;
    })
  );
});