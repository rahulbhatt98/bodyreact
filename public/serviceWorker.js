let CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/',
    '/locales/en.json',
    '/assets/images/pwa/48x48.png',
    '/assets/images/pwa/72x72.png',
    '/assets/images/pwa/96x96.png',
    '/assets/images/pwa/192x192.png',
    '/assets/images/pwa/maskable_icon_x192.png',
    '/assets/images/pwa/144x144.png',
    '/assets/images/nointernet.svg',
    '/index.html',
    '/offline.html',
    '/static/js/bundle.js',
    '/static/js/vendors~main.chunk.js',
    '/static/js/main.chunk.js',
    '/manifest.json',
    '/favicon.svg',

];

const self = this;


// ('self', self.addEventListener)
self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});




self.addEventListener('fetch', function (event) {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        return response
                    } else if (event.request.mode === 'navigate') {
                        return caches.match('/offline.html');
                    }
                    // return fetch(event.request)
                    // else {
                    return fetch(event.request).then(resp => resp).catch(() => caches.match('/offline.html'));
                    // }
                })
                .catch(function (err) {
                    return caches.match('/offline.html')
                })
            // async function() {
            //     // Try to get the response from a cache.
            //     const cachedResponse = await caches.match(event.request);
            //     // Return it if we found one.
            //     if (cachedResponse) return cachedResponse;
            //     // If we didn't find a match in the cache, use the network.
            //     return fetch(event.request);
            //   }()
        );
    }

});

// Activate the ServiceWorker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))

    )
});