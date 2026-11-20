/* 알싹킹 마스터 키친 3 — 홈 화면 앱용 서비스 워커 (made by J.G)
   화면(HTML)은 항상 최신을 먼저 받고(인터넷이 끊기면 저장본), 아이콘 · 배경음은 저장해 두고 빠르게 열어요.
   이 파일이 있어야 안드로이드 Chrome이 '앱 바로 설치하기'(탭 한 번 설치)를 준비해요. */
const CACHE = 'bhc-alssa3-v1';
const CORE = ['./', './manifest.json', './icons/bhc-192.png', './icons/bhc-512.png', './icons/bhc-maskable-512.png', './icons/bhc-apple-touch-180.png', './icons/bhc-favicon-32.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => { }).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k.indexOf('bhc-alssa3-') === 0).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET' || r.headers.has('range')) return;     // 소리 파일의 부분 요청은 브라우저에 맡겨요
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  if (r.mode === 'navigate') {                                                         // 화면: 최신 먼저
    e.respondWith(fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put('./', cp)); } return res; })
      .catch(() => caches.match('./').then(m => m || caches.match(r))));
    return;
  }
  e.respondWith(caches.match(r).then(m => {                                            // 아이콘 등: 저장본으로 빠르게, 뒤에서 새로 받아 두기
    const net = fetch(r).then(res => { if (res.ok && res.type === 'basic') { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return res; }).catch(() => m);
    return m || net;
  }));
});
