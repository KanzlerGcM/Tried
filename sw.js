const C='atlasvivo-v8';
const CORE=['./','index.html','meta.json','geo.json','cities.json','flags.json','hist.json','water.json','topo.png','night.jpg','sat.jpg','icon.svg','manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  const ok=u.origin===location.origin||/cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(u.host);if(!ok)return;
  e.respondWith(caches.open(C).then(async c=>{const hit=await c.match(r);const net=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}).catch(()=>hit);return hit||net}))});
