const cacheName = 'rps-cache-v1';
const cacheAssets = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/icons/apple-touch-icon.png',
    '/icons/favicon-16x16.png',
    '/icons/favicon-32x32.png',
    '/icons/android-chrome-192x192.png',
    '/icons/android-chrome-512x512.png',
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', event => {
    // Remove old caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Clone the response
                const responseClone = response.clone();
                // Open cache
                caches.open(cacheName)
                    .then(cache => {
                        // Add response to cache
                        cache.put(event.request, responseClone);
                    });
                return response;
            }).catch(() => caches.match(event.request).then(response => response))
    );
});
