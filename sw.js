self.addEventListener("install", (e) => {
    console.log("install");
    caches.open("mi-cache-2").then((cache) => {
        cache.addAll([
            '/',
            '/script.js',
            '/favincon.png'
        ]);
    });
});