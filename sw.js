// Nombre de la caché (cámbialo a v2 si haces actualizaciones)
const CACHE_NAME = 'gastos-app-cache-v1';

// Archivos que la app necesita para funcionar offline
const urlsToCache = [
  'control_gastos14b.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  // Archivos externos (CDN) que tu app utiliza
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js'
];

// 1. Evento 'install': Guarda los archivos en la caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caché abierta. Guardando archivos de la app...');
        // Agrega todos los archivos del "cascarón" a la caché
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Evento 'fetch': Intercepta las solicitudes
// Estrategia: "Cache First" (Primero busca en caché, si no, va a la red)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el recurso está en la caché, lo devuelve desde allí
        if (response) {
          return response;
        }
        
        // Si no está en la caché, lo busca en la red (internet)
        return fetch(event.request);
      })
  );
});