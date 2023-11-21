self.addEventListener("install", (e) => {
    console.log("install");
    const cache = caches.open("mi-cache-2").then((cache) => {
        cache.addAll([
            '/',
            '/img/favicon.png',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
            '/css/style.css',
            '/js/script.js'
        ]);
    });
    e.waitUntil(cache);
});