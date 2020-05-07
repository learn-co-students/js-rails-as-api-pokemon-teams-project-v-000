const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


console.log("%c Welcome to pokèmon trainers!", "color: blue;");

const trainersContainer = document.querySelector('main');


fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(trainers => {
  trainers.forEach(renderTrainer);
});

function renderTrainer(trainer){
  const html = `
    <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
      <button data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul data-trainer-ul=${trainer.id}></ul>
    </div>`;



    trainersContainer.insertAdjacentHTML('beforeend', html);
    const trainerUl = document.querySelector(`[data-trainer-ul='${trainer.id}']`)
    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon, trainerUl));
};

function renderPokemon(pokemon, trainerUl){

  const html = `
        <li>
          ${pokemon.nickname} (${pokemon.species})
          <button class="release" data-pokemon-id=${pokemon.id}>
            Release
          </button>
        </li>`;

  trainerUl.insertAdjacentHTML('beforeend', html);
};


trainersContainer.addEventListener('click',(e) => {
  if(e.target.innerText === "Add Pokemon"){
    const trainerUl = e.target.nextElementSibling
    const trainerId = e.target.dataset.trainerId;

  if(trainerUl.children.length < 6){
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers:{
        'CONTENT-TYPE': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "trainer_id": trainerId
      })
    })
    .then(resp => resp.json())
    .then(pokemon => renderPokemon(pokemon, trainerUl))

   };
 };




  if (e.target.classList.contains("release")){
      const pokemonId = e.target.dataset.pokemonId;
      fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(() => e.target.parentNode.remove());
    }

})
