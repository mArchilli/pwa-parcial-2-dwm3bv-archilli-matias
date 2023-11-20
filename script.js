const listaPersonajes = document.getElementById('lista-personajes');
const modalPersonaje = document.getElementById('personajeModal');
const modalLabel = document.getElementById('personajeModalLabel');
const modalContent = document.getElementById('personajeModalContent');

const getData = () => {
    return fetch('https://rickandmortyapi.com/api/character/?status=alive&limit=20')
    .then(response => response.json())
    .then(data => {
        const personajes = data.results;
        personajes.forEach(personaje => {
            const personajeItem = document.createElement('div');
            personajeItem.className = 'col-12 col-md-6 col-lg-4 mb-4';
            personajeItem.innerHTML = `
                <div class="card">
                    <img src="${personaje.image}" class="card-img-top" alt="Imagen ${personaje.name}">
                    
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h3 class="card-title">${personaje.name}</h3>\
                        <p class="card-text">Gender: ${personaje.gender}</p>
                        <button class="btn btn-style" onclick="showModal(${personaje.id})">Ver Detalles</button>
                    </div>
                </div>
            `;
            listaPersonajes.appendChild(personajeItem);
        });
    });
}


function showModal(personajeId) {    
    fetch(`https://rickandmortyapi.com/api/character/${personajeId}`)
        .then(response => response.json())
        .then(data => {
            const personaje = data;

            console.log(personaje);

            modalLabel.textContent = personaje.name;
            modalContent.innerHTML = `
                <div class="my-3">
                    <img class="img-fluid" src="${personaje.image}" alt="Imagen de ${personaje.name} ">
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nombre: ${personaje.name}</li>
                    <li class="list-group-item">Especie: ${personaje.species}</li>
                    <li class="list-group-item">Estado: ${personaje.status}</li>
                    <li class="list-group-item">Creado: ${personaje.created}</li>
                </ul>
                `;

            const modal = new bootstrap.Modal(modalPersonaje);
            modal.show();
        })
}

getData();

