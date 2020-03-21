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

/* FETCH DATA */

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
    createTrainerCard(trainer);
  });
  pokemons.forEach(pokemon => {
    createPokemonTeam(pokemon);
  });
}

function createTrainerCard(trainer) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("data-id", `${trainer.id}`);
    card.innerHTML = `
      <p>${trainer.attributes.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul id="pokemon-team"></ul>`
    container.appendChild(card);
}

function createPokemonTeam(pokemon) {
    const trainerId = pokemon.relationships.trainer.data.id;
    const trainerCard = document.body.querySelector(`[data-id='${trainerId}']`);
    const roster = trainerCard.querySelector("ul");
    const poke = document.createElement("li");
    poke.innerHTML = `${pokemon.attributes.nickname} (${pokemon.attributes.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`;
    roster.appendChild(poke);
}

// Figure out how to limit roster to 6 pokemons

document.addEventListener("DOMContentLoaded", function() {
  fetchData();
})