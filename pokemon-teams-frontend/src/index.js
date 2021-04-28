const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const container = document.querySelector('main');

// make a fetch request to the '/trainers' and display pokemons

fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(renderCard);
    
    
function renderCard(arg) {
    trainers = arg['data']
   
    trainers.forEach(trainer => {
        const trainerHTML = `
        <div class='card' data-id=${trainer.id}><p>${trainer.attributes.name}</p>
        <button data-action='add' data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul data-trainer-ul-id=${trainer.id}>
        </ul>
        </div>`;
        container.insertAdjacentHTML('beforeend', trainerHTML);
    // debugger
        const trainerUl = document.querySelector(`[data-trainer-ul-id='${trainer.id}']`);
        const trainerPokemons = trainer['attributes']['pokemons']
      //  debugger
        trainerPokemons.forEach(pokemon => {
            const pokemonHTML = `
            <li>${pokemon.nickname} (${pokemon.species})
            <button class ="release" data-pokemon-id=${pokemon.id}>Release</button>
            </li>`;
            trainerUl.insertAdjacentHTML('beforeend', pokemonHTML);
        })
    })
};
container.addEventListener('click', (e) => {
    if (e.target.dataset.action === "add"){
        debugger
        const trainerId = e.target.dataset.trainerId;
        const trainerUl = e.target.parentNode.querySelector('ul');
        if (trainerUl.children.length < 6){
            fetch(POKEMONS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "trainer_id": trainerId
                })
            })
            .then(resp => resp.json())
            .then(makeNewPokemon);
        });
        
    function makeNewPokemon(arg) {
            const newPokemon = arg['data']
            debugger
            const pokemonHTML = `
            <li>${newPokemon.nickname} (${newPokemon.species})
            <button class='release' data-pokemon-id=${newPokemon.id}>
            Release</button></li>`;
            trainerUl.insertAdjacentHTML('beforeend', pokemonHTML);
            }

     if (e.target.classList.contains("release")){
         const pokemonId = e.target.dataset.pokemonId;
         fetch(`${POKEMONS_URL}/${pokemonId}`, {
             method: 'DELETE'})
             .then(resp => resp.json())
             .then(() => e.target.parentNode.remove());
         }
     