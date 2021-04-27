const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const container = document.querySelector('main');

// make a fetch request to the '/trainers' and display pokemons

fetch(TRAINERS_URL)
    .then(resp => resp.json());
    .then(renderCard);
    
    
function renderCard(arg) {
    debugger
    }
    
    //     trainers.forEach(trainer => {
    //         const trainerHTML = `
    //         <div class='card' data-id=${trainer.id}><p>${trainer.name}</p>
    //         <button data-action='add' data-trainer-id=${trainer.id}>Add Pokemon</button>
    //         <ul data-trainer-ul-id=${trainer.id}>
    //         </ul>
    //         </div>`;
    //     container.insertAdjacentHTML('beforeend', trainerHTML);
    //     debugger
    //     const trainerUl = document.querySelector(`[data-trainer-ul-id='${trainer.id}']`);
    //     trainer.pokemons.forEach(pokemon => {
    //         const pokemonHTML = `
    //         <li>${pokemon.nickname} (${pokemon.species})
    //         <button class ="release" data-pokemon-id=${pokemon.id}>Release</button>
    //         </li>`;
    //         trainerUl.insertAdjacentHTML('beforeend', pokemonHTML);
    //     })
    //     })
    // });
