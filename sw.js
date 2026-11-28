/* bhc 교육 게임 (게임 목록 앱) — 서비스 워커 (made by J.G)
   이 파일이 있어야 안드로이드 Chrome이 '앱 바로 설치하기'(탭 한 번 설치)를 준비해요.
   게임 목록 화면과 hub/ 파일만 맡아요. 각 게임(alssa3/ 등)의 요청은 건드리지 않고 그대로 보내요. */
const CACHE = 'bhc-hub-v1';
const CORE = ['./', './manifest.webmanifest', './hub/games.json', './hub/link.js',
  './hub/img/alssa3.jpg', './hub/img/bburinkle3.jpg', './hub/img/burger3.jpg',
  './hub/icons/hub-192.png', './hub/icons/hub-512.png', './hub/icons/hub-maskable-512.png', './hub/icons/hub-apple-180.png', './hub/icons/hub-32.png'];
const BASE = new URL('./', self.location).pathname;            // '/'
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => { }).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k.indexOf('bhc-hub-') === 0).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const fresh = (r, key) => fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(key || r, cp)); } return res; })
  .catch(() => caches.match(key || r).then(m => m || Promise.reject(new Error('offline'))));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  const p = u.pathname.slice(BASE.length);                     // 'alssa3/…', 'hub/…', '' …
  if (p === '' || p === 'index.html') { e.respondWith(fresh(r, './')); return; }            // 게임 목록: 최신 먼저
  if (p === 'hub/games.json' || p === 'hub/link.js' || p === 'manifest.webmanifest') { e.respondWith(fresh(r, './' + p)); return; }
  if (p.indexOf('hub/') === 0) {                                                             // 그림 · 아이콘: 저장본으로 빠르게
    e.respondWith(caches.match(r).then(m => m || fresh(r)));
    return;
  }
  // 그 밖(각 게임)은 건드리지 않아요
});
