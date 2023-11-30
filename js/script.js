const listaPersonajes = document.getElementById('lista-personajes');
const modalPersonaje = document.getElementById('personajeModal');
const modalLabel = document.getElementById('personajeModalLabel');
const modalContent = document.getElementById('personajeModalContent');

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .then((registration) => {
            console.log("Service Worker registrado");
        })
        .catch((error) => {
            console.log("Service Worker no se encuentra registrado");
        });
}

(async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20');
        const data = await response.json();

        const pokemons = data.results;
        for (const pokemon of pokemons) {
            const pokemonDetails = await fetchPokemonDetalles(pokemon.url);
            const pokemonItem = crearPokemonCard(pokemonDetails);
            listaPersonajes.appendChild(pokemonItem);
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
})();

async function fetchPokemonDetalles(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los detalles del Pokémon:', error);
    }
}

function crearPokemonCard(pokemon) {
    const pokemonItem = document.createElement('div');
    pokemonItem.className = 'col-12 col-md-6 col-lg-4 mb-4';
    pokemonItem.innerHTML = `
        <div class="card">
            <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="Imagen ${pokemon.name}">

            <div class="card-body d-flex flex-column justify-content-between">
                <h3 class="card-title">${pokemon.name}</h3>
                <p class="card-text">Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <button class="btn btn-style" onclick="showModal(${pokemon.id})">Ver Detalles</button>
            </div>
        </div>
    `;
    return pokemonItem;
}

function showModal(pokemonId) {
    fetchPokemonDetalles(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(pokemon => {
            console.log(pokemon);

            modalLabel.textContent = pokemon.name;
            modalContent.innerHTML = `
                <div class="mb-3">
                    <img class="img-fluid w-100" src="${pokemon.sprites.front_default}" alt="Imagen de ${pokemon.name}">
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Nombre:</strong> ${pokemon.name}</li>
                    <li class="list-group-item"><strong>Especie:</strong> ${pokemon.species.name}</li>
                    <li class="list-group-item"><strong>Altura:</strong> ${pokemon.height}</li>
                    <li class="list-group-item"><strong>Peso:</strong> ${pokemon.weight}</li>
                </ul>
            `;

            const modal = new bootstrap.Modal(modalPersonaje);
            modal.show();
        });
}
