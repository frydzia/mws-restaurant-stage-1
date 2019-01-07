var staticCacheName = 'restaurant-static-v1';
var urlsToCache = [
//  '/skeleton',
  '/',
  'https://frydzia.github.io/mws-restaurant-stage-1/index.html',
  'https://frydzia.github.io/mws-restaurant-stage-1/restaurant.html',
  'https://frydzia.github.io/mws-restaurant-stage-1/css/styles.css',
  'https://frydzia.github.io/mws-restaurant-stage-1/css/responsive.css',
  'https://frydzia.github.io/mws-restaurant-stage-1/data/restaurants.json',
  'https://frydzia.github.io/mws-restaurant-stage-1/js/dbhelper.js',
  'https://frydzia.github.io/mws-restaurant-stage-1/js/main.js',
  'https://frydzia.github.io/mws-restaurant-stage-1/js/restaurant_info.js',
  'https://frydzia.github.io/mws-restaurant-stage-1/sw.js',
  'https://frydzia.github.io/mws-restaurant-stage-1/img/1.jpg',
  'https://frydzia.github.io/mws-restaurant-stage-1/img/2.jpg',
  'https://frydzia.github.io/mws-restaurant-stage-1/img/3.jpg',
  'https://frydzia.github.io/mws-restaurant-stage-1/img/4.jpg',
  'https://frydzia.github.io/mws-restaurant-stage-1/img/5.jpg',
  'https://frydzia.github.io/mws-restaurant-stage-1/img/6.jpg',
  'https://frydzia.github.io/mws-restaurant-stage-1/img/7.jpg',
  'https://frydzia.github.io/mws-restaurant-stage-1/img/8.jpg',
  'https://frydzia.github.io/mws-restaurant-stage-1/img/9.jpg',
  'https://frydzia.github.io/mws-restaurant-stage-1/img/10.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
   caches.open(staticCacheName).then(
     cache => cache.addAll(urlsToCache)
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
  // var requestUrl = new URL(event.request.url);
  // if (requestUrl.origin === location.origin) {
  //   if (requestUrl.pathname === '/') {
  //     event.respondWith(caches.match('/skeleton'));
  //     return;
  //   }
  // }
  event.respondWith(
    caches.match(event.request, {'ignoreSearch': true}).then(response => {
      return response || fetch(event.request);
    })
    .catch(err => console.log(err, event.request))
  );
});
