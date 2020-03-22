const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

/* GOALS */

// Load all trainers on index page, each having their own card
// Each trainer card has its own team of pokemon:
  // "Add Pokemon" button creates a new relationship between a pokemon and the trainer
  // "Release Pokemon" button destroys the relationship between the pokemon and trainer
  // The pokemon team cannot exceed six

/* METHODS/PLAN */

// Create templates to iterate over:
  // A template for the trainer cards
  // A subtemplate for the pokemon being added to the trainer card teams
// Create event listeners for the buttons:
  // "Add Pokemon" creates a new relationship
  // "Release Pokemon" destroys an existing relationship
// Figure out which routes I need to display (look at examples in lab)

/* FETCH */

let fetchData = function() {
  return fetch(`http://localhost:3000/trainers`)
  .then(resp => resp.json())
  .then(results => renderCards(results))
}

/* PREP DATA FOR CARDS */

let renderCards = function(results) {
  const container = document.getElementById("container");
  let trainers = results.data;
  let pokemons = results.included;
  trainers.forEach(trainer => {
    createCard(trainer);
  });
  pokemons.forEach(pokemon => {
    createPokemonTeam(pokemon);
  });
}

/* RENDER TRAINER CARDS WITH POKEMON TEAMS */

let createCard = function(trainer) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  const trainerName = document.createElement("p");
  const addButton = document.createElement("button");
  addButton.innerText = "Add Pokemon";
  const pokemonRoster = document.createElement("ul");
  pokemonRoster.setAttribute("id", "pokemon-team")
  card.appendChild(trainerName);
  card.appendChild(addButton);
  card.appendChild(pokemonRoster);
  container.appendChild(card);
  populateTrainerCard(trainer, card, trainerName, addButton);
}

let populateTrainerCard = function(trainer, card, trainerName, addButton) {
  card.setAttribute("data-id", `${trainer.id}`);
  trainerName.innerText = `${trainer.attributes.name}`
  addButton.setAttribute("data-trainer-id", `${trainer.id}`);
}

let createPokemonTeam = function(pokemon) {
  const trainerId = pokemon.relationships.trainer.data.id;
  const trainerCard = document.body.querySelector(`[data-id='${trainerId}']`);
  const roster = trainerCard.querySelector("ul");
  const poke = document.createElement("li");
  poke.innerHTML = `${pokemon.attributes.nickname} (${pokemon.attributes.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`;
  roster.appendChild(poke);
}

// Figure out how to limit roster to 6 pokemons

/* ADD POKEMON TO TEAM */

let addPokemon = function(trainerId) {
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
  .then(results => results.included.forEach(pokemon => {
    createPokemonTeam(pokemon);
  }))

document.addEventListener("DOMContentLoaded", function() {
  fetchData();
  document.addEventListener("click", function(){
    addPokemon(event.target.dataset.trainerId)
  })
})