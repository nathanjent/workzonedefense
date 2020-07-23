var cacheName = 'phaser-v1';

var filesToCache = [ 
    '/', 
    '/index.html', 
    '/assets/skies/space3.png',
    '/assets/sprites/phaser2.png',
    '/assets/particles/red.png',
    '/assets/sprites/logo.png', 
    '/icons/icon-32.png', 
    '/icons/icon-64.png', 
    '/icons/icon-128.png', 
    '/icons/icon-192.png', 
    '/icons/icon-256.png', 
    '/icons/icon-512.png', 
    '/game.js', 
    '/style.css', 
    'https://cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser-arcade-physics.min.js',
];

self.addEventListener('install', function(event) { 
    console.log('sw install'); 
    event.waitUntil( 
        caches.open(cacheName).then(function(cache) { 
            console.log('sw caching files'); 
            return cache.addAll(filesToCache); 
        }).catch(function(err) { 
            console.log(err); 
        }) 
    ); 
});

self.addEventListener('fetch', (event) => {
    console.log('sw fetch');
    console.log(event.request.url);
    event.respondWith(caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })
        .catch(function (error) {
            console.log(error);
        }));
});

self.addEventListener('activate', function(event) { 
    console.log('sw activate'); 
    event.waitUntil( 
        caches.keys().then(function(keyList) { 
            return Promise.all(keyList.map(function(key) { 
                if (key !== cacheName) { 
                    console.log('sw removing old cache', key); 
                    return caches.delete(key); 
                } 
            })); 
        }) 
    ); 
});
