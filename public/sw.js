const CACHE = "autoassist-shell-v1";
const SHELL = ["/mobile", "/manifest.webmanifest", "/icon.svg"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL))));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))));
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.pathname === "/api/mobile/vehicles") return;
  if (event.request.mode === "navigate" && (url.pathname === "/mobile" || url.pathname === "/")) {
    event.respondWith(fetch(event.request).catch(() => caches.match("/mobile"))); return;
  }
  if (url.pathname.startsWith("/_next/static/")) event.respondWith(caches.open(CACHE).then(async cache => { const hit = await cache.match(event.request); if (hit) return hit; const response = await fetch(event.request); if (response.ok) cache.put(event.request, response.clone()); return response; }));
});
