const V="dwibahasa-v2",F=["./","index.html","manifest.json","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 if(e.request.method!="GET")return;
 const u=new URL(e.request.url);
 if(u.origin==location.origin&&u.pathname.endsWith("/hanzi.json")){
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(e.request,c))}return x})));
  return;
 }
 e.respondWith(fetch(e.request).then(r=>{if(r.ok&&u.origin==location.origin){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))));
});
