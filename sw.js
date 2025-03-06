//Asignar nombre y version de la cache
//Constante
const CACHE_NAME = "v1_cache_PWA";

var urlsToCache = [
    './',
    './public_html/assets/css/alan.css',
    './public_html/assets/js/alan.js',
    './public_html/assets/scss/',
    './public_html/assets/imgs/avatar.jpg',
    './public_html/assets/imgs/header.jpg',
    './public_html/assets/imgs/icono16x16.jpg',
    './public_html/assets/imgs/icono32x32.jpg',
    './public_html/assets/imgs/icono64x64.jpg',
    './public_html/assets/imgs/icono96x96.jpg',
    './public_html/assets/imgs/icono128x128.jpg',
    './public_html/assets/imgs/icono144x144.jpg',
    './public_html/assets/imgs/icono192x192.jpg',
    './public_html/assets/imgs/icono240x240.jpg',
    './public_html/assets/imgs/icono256x256.jpg',
    './public_html/assets/imgs/icono384x384.jpg',
    './public_html/assets/imgs/icono512x512.jpg',
    './public_html/assets/imgs/icono1024x1024.jpg',
    './public_html/assets/imgs/icons8-rick-sanchez-64.png'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    });
            })
            .catch(err => {
                console.log('No se ha cargado la cache', err);
            })
    );
});

//Evento activate activa el SW y permite que trabaje offline
self.addEventListener('activate', e => {
    //Añadimos todos los elementos de la cache
    const cacheWitheList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWitheList.indexOf(cacheName) === -1) {
                            //Borrar los elementos que ya no esten en la cache o no se necestian
                            return caches.delete(cacheName);
                        }
                    })
                )
            })
            .then(() => {
                //Activar cache en el dispositivo
                self.clients.claim();
            })
    )
})

//Evento Fetch (actualiza la aplicacion)

self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //Devuelvo datos desde cache
                return res;
            }
            return fetch(e.request)
        })
    );
});


