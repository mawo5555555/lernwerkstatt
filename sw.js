const C='wt-v7',F=['./','index.html','app.js','content.js','c-grafik.js','c-mathe.js','c-deutsch.js','c-englisch.js','c-nawi.js','c-technik.js','c-sprechen.js','manifest.webmanifest','icon.svg','icon-180.png','icon-512.png','img/foto/rasen-front.jpg','img/foto/s51-calau.jpg','img/foto/schwalbe-kr51-2.jpg','img/foto/zt300-gelsdorf.jpg','img/foto/e512-seite.jpg','img/foto/rasen-motor.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request).catch(()=>caches.match(e.request))));
