const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`




let fetchData = function() {
  return fetch(`http://localhost:3000/trainers`)
  .then(resp => resp.json())
  .then(sanitizeFetched(results))
  .catch(error => console.log(error.message))
}


let sanitizeFetched = function(results) {
  let trainers = results.data;
  let pokemons = results.included;
  return trainers && pokemons;
}


function renderTrainerCard(){
  const main = document.getElementsByName("main");
  trainers.forEach(trainer => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("data-id", `${trainer.id}`);
    card.innerHTML = `
      <p>${trainer.attributes.name}</p>
      <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul id="pokemon-team">
        {/* // Extract other code - single responsibility principle */}
      </ul>
      `
    main.appendChild(card);
  })
}




function renderPokemonTeam(){
  const roster = document.getElementById("pokemon-team");
  pokemons.forEach(pokemon => {
    const poke = document.createElement("li");
    poke.innerHTML = `${poke.nickname} (${poke.species}) <button class="release" data-pokemon-id="${poke.id}">Release</button>`;
    roster.appendChild(poke);
  })



document.addEventListener("DOMContentLoaded", function() {
  fetchData();
})
