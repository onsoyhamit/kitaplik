const C = 'kitaplik-v43';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'vendor/zxing.min.js'];

const cacheable = res => res && (res.ok || res.type === 'opaque');

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(C)
      .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {}))))
  );
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
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
  // Firebase Auth'ın yardımcı iframe/endpoint'leri asla önbelleğe alınmaz.
  if (u.pathname.startsWith('/__/')) return;
  // Sadece http(s) istekleri.
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return;
  const same = u.origin === location.origin;
  const sdk = u.hostname === 'www.gstatic.com' && u.pathname.startsWith('/firebasejs/');
  const asset = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'].includes(u.hostname);
  if (!same && !sdk && !asset) return;
  const put = (req, res) => {
    if (!cacheable(res)) return;
    const cp = res.clone();
    e.waitUntil(caches.open(C).then(c => c.put(req, cp)).catch(() => {}));
  };
  if (sdk || asset) {
    // Sürümlü / değişmeyen dış kaynaklar: önce önbellek
    e.respondWith(caches.match(r).then(h => h || fetch(r).then(res => { put(r, res); return res })));
    return;
  }
  // Uygulamanın kendi dosyaları: önce internet (güncellemeler hemen gelsin), olmazsa önbellek
  e.respondWith(
    fetch(r).then(res => { put(r, res); return res })
      .catch(() => caches.match(r).then(h => h || caches.match('./')))
  );
});
