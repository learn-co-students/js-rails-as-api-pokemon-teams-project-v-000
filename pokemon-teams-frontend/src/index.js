const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function addErrorMessage(error) { // Test this out with a bad response missing headers.
  let errorHeading = document.createElement('h1');
  errorHeading.textContent = error.message;
  errorHeading.className = "error-heading";
  return errorHeading;
}

function addPokemon(pokemon) {
  const pokeLi = document.createElement('li');
  const releaseBtn = document.createElement('button');

  pokeLi.textContent = `${pokemon.nickname} (${pokemon.species})`;

  releaseBtn.textContent = 'Release';
  releaseBtn.className = 'release';
  releaseBtn.setAttribute('data-pokemon-id', pokemon.id);
  pokeLi.appendChild(releaseBtn);

  return pokeLi;
}

function createTrainerCard (trainer) {
  const card = document.createElement('div');
  const trainerName = document.createElement('p');
  const addPokemonBtn = document.createElement('button');
  const pokemonList = document.createElement('ul');
  const trainerPokemons = trainer.pokemons;

  card.className = 'card';
  card.setAttribute('data-id', trainer.id);

  trainerName.textContent = trainer.name;
  card.appendChild(trainerName);

  addPokemonBtn.textContent = 'Add Pokemon';
  addPokemonBtn.setAttribute('data-trainer-id', trainer.id);
  card.appendChild(addPokemonBtn);

  for (const pokemon of trainerPokemons) {
    pokemonList.appendChild( addPokemon(pokemon) );
  }
  card.appendChild(pokemonList);

  addPokemonBtn.addEventListener("click", function() {
    if (trainer.pokemons.length < 6) {
      // pokemonList.appendChild( newPokemon );
      console.log("New Pokemon added to team!");
    } else {
      console.log(`Sorry. ${trainer.name} has enough Pokemon!`);
    }
  })

  return card;
}

document.addEventListener("DOMContentLoaded", function () {
  const main = document.querySelector('main');

  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(function (trainersObj) {
      for (const trainer of trainersObj) {
        main.appendChild( createTrainerCard(trainer) );
      }
    })
    .catch(function () {
      main.prepend(addErrorMessage());
    });
});