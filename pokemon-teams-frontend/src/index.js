const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main");

document.addEventListener("DOMContentLoaded", function(event) {
  fetch(TRAINERS_URL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    json.map(function(trainer) {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.setAttribute("data-trainer-id", `${trainer.id}`)
      const p = document.createElement("p");
      const addButton = document.createElement("button")
      addButton.setAttribute("data-trainer-id", `${trainer.id}`)
      addButton.innerText = "Add Pokemon"
      const ul = document.createElement("ul");
      card.appendChild(p);
      card.appendChild(addButton);
      card.appendChild(ul);
      p.innerText = trainer.name;
      main.appendChild(card);
      trainer.pokemons.map(function(pokemon) {
        const li = document.createElement("li");
        li.innerHTML = `${pokemon.nickname}<button class="release" data-pokemon-id=${pokemon.id}>Release</button`;
        ul.appendChild(li);
        li.addEventListener("click", function() {
          li.remove();
        });
      });
    });
  });
});
