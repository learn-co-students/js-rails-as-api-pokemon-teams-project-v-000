const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

/* FETCH */

let fetchData = function() {
  return fetch(`http://localhost:3000/trainers`)
  .then(resp => resp.json())
  .then(results => renderCards(results))
}

/* RENDER TRAINER CARDS */

function createTrainerCard(trainer) {
  const container = document.getElementById("container");
  const trainerCard = document.createElement("div");
  trainerCard.setAttribute("class", "card");
  trainerCard.setAttribute("data-trainer-id", `${trainer.id}`);
  const trainerName = document.createElement("p");
  trainerName.innerText = `${trainer.name}`;
  const addButton = document.createElement("button");
  addButton.setAttribute("class", "add");
  addButton.setAttribute("data-trainer-id", `${trainer.id}`);
  addButton.innerText = "Add Pokemon";
  const pokemonRoster = document.createElement("ul");
  pokemonRoster.setAttribute("data-trainer-id", `${trainer.id}`);
  trainerCard.appendChild(trainerName);
  trainerCard.appendChild(addButton);
  trainerCard.appendChild(pokemonRoster);
  container.appendChild(trainerCard);
  createPokemonTeam(trainer, pokemonRoster);
  return container;
}
  
  
/* CREATE POKEMON TEAMS */

function createPokemonTeam(trainer, pokemonRoster) {
  for (let pokemon of trainer.pokemons) {
    addPokemonToTeam(pokemon, pokemonRoster);
  }
}

/* ADD POKEMON TO TEAM */

function addPokemonToTeam(pokemon, pokemonRoster) {
  const poke = document.createElement("li");
  poke.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
  const releaseButton = document.createElement("button");
  releaseButton.setAttribute("class", "release");
  releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`);
  releaseButton.innerText = "Release";
  poke.appendChild(releaseButton);
  pokemonRoster.appendChild(poke);
}

let postFetch = function(trainerId) {
  let obj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"trainer_id": trainerId})
  };
  return fetch(`http://localhost:3000/pokemons`, obj)
  .then(resp => resp.json())
  .then(results => results.data.forEach(trainer => {
    populateTrainerCard(trainer)
  }))
}

/* REMOVE POKEMON FROM TEAM */

let removePokemon = function() {

}

document.addEventListener("DOMContentLoaded", function() {
  fetchData();
  document.addEventListener("click", function(){
    postFetch(event.target.dataset.trainerId)
  })
})