caches.keys().then(cache => {
    console.log("cache", cache)
})

self.addEventListener("install", (e) => {
    console.log("install");
    const cache = caches.open("mi-cache-2").then((cache) => {
        cache.addAll([
            '/',
            '/index.html',
            '/js/script.js',
            '/img/favicon.png',
            '/css/styles.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
            'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20', 
        ]);
    });
    e.waitUntil(cache);
});

self.addEventListener("fetch", (e) => {
    const url = e.request.url;
    console.log(url);

    if(url.includes("index.html")){
        e.respondWith(
            fetch(url)
            .then(respuesta => {
                if(respuesta.status == 404){
                    return {}
                } else {
                    return respuesta;
                }
            })
        )
    }
});