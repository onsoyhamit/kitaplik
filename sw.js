const C = 'kitaplik-v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(C)
      .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== C).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const same = u.origin === location.origin;
  const sdk = u.hostname === 'www.gstatic.com' && u.pathname.startsWith('/firebasejs/');
  if (!same && !sdk) return;
  if (sdk) {
    // Firebase kütüphanesi sürümlü adreslerden gelir: önce önbellek
    e.respondWith(caches.match(r).then(h => h || fetch(r).then(res => {
      const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); return res;
    })));
    return;
  }
  // Uygulamanın kendi dosyaları: önce internet (güncellemeler hemen gelsin), olmazsa önbellek
  e.respondWith(
    fetch(r).then(res => {
      const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); return res;
    }).catch(() => caches.match(r).then(h => h || caches.match('./')))
  );
});
