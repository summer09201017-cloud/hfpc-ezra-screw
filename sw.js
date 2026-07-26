// v6(2026-07-27):修年齡選單黏在每關最上方(#ageScreen display:flex 蓋過 hidden,改 :not([hidden]))
// v5(2026-07-26):帶重校——bot 改拒絕制語意(只挑放得進),站六重生(躺平46%/會想44%)
// v4(2026-07-26):抬走動畫——滿三件的箱子上飄淡出(rules.js clearedBins + index .carried)
// v3 以前:v1 上架 → v2 托盤 → v3 拒絕制(沿用 tabernacle 的 v8 註解世系,cache 名從 ezra v1 起算)
const CACHE_NAME = 'ezra-screw-v6';
const STATIC_ASSETS = ['./', './index.html', './levels.js', './layout.js', './rules.js', './tts.js', './audio.js', './manifest.json', './tts/manifest.json'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(STATIC_ASSETS)).catch(() => {}));
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  // 統計打點絕不進快取(離線時讓它自然失敗就好)
  if (request.url.includes('/api/ping')) return;
  e.respondWith(
    caches.match(request).then((hit) =>
      hit || fetch(request).then((res) => {
        if (res.ok && new URL(request.url).origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(request, copy)).catch(() => {});
        }
        return res;
      }).catch(() => hit)
    )
  );
});
