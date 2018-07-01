let staticCacheName = 'restaurant-static-v1';

self.addEventListener('install', event => {
  event.waitUntil(
   caches.open(staticCacheName).then(
     cache => cache.addAll([
       '/',
       '/index.html',
       '/restaurant.html',
       '/css/styles.css',
       '/css/responsive.css',
       '/data/restaurants.json',
       '/js/dbhelper.js',
       '/js/main.js',
       '/js/restaurant_info.js',
       '/img/1.jpg',
       '/img/2.jpg',
       '/img/3.jpg',
       '/img/4.jpg',
       '/img/5.jpg',
       '/img/6.jpg',
       '/img/7.jpg',
       '/img/8.jpg',
       '/img/9.jpg',
       '/img/10.jpg'
     ])
   ));
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames
        .filter(cacheName => cacheName.startsWith('restaurant-') && cacheName != staticCacheName)
        .map(cacheName => caches.delete(cacheName))
			);
		})
	);
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch (event.request);
    })
  );
});
