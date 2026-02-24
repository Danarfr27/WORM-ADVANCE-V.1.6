// WORM AI Service Worker
// Automatically generated empty service worker to fulfill browser requests
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
    // Do nothing, let the browser handle requests normally
});
