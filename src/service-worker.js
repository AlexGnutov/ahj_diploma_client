/* eslint-disable no-restricted-globals */
const version = 'v1';
const cacheName = `cho-${version}`;

const files = [
  '/',
  '/index.html',
  '/main.css',
  '/main.js',
  '/favicon.ico',
];

async function putFilesToCache(filesToCache) {
  const cache = await caches.open(cacheName);
  await cache.addAll(filesToCache);
}

async function removeOldCache(retain) {
  const keys = await caches.keys();
  return Promise.all(
    keys.filter((key) => !retain.includes(key))
      .map((key) => caches.delete(key)),
  );
}

self.addEventListener('install', (evt) => {
  // console.log(evt);
  evt.waitUntil((async () => {
    await putFilesToCache(files);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (evt) => {
  // console.log(evt);
  evt.waitUntil((async () => {
    await removeOldCache([cacheName]);
    await self.clients.claim();
  })());
});

function fromCache(request) {
  return caches.open(cacheName).then((cache) => cache.match(request));
}

function networkOrCache(request) {
  return fetch(request)
    .then((response) => (response.ok ? response : fromCache(request)))
    .catch(() => fromCache(request));
}

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname.startsWith('/api')
  || requestUrl.pathname.startsWith('/sockjs')) {
    return;
  }
  event.respondWith(networkOrCache(event.request));
});
