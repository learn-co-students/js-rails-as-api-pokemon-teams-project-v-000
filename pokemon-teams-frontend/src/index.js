const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(event) {
  fetchTeams();
})

function fetchTeams() {
  return fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => renderTeams(json));
}

function renderTeams(trainers) {
  trainers.forEach(trainer => {
    renderTeam(trainer);
  })
}

function renderTeam(trainer) {
  const main = document.querySelector("main");

  const div = document.createElement("div");
  div.className = "card";
  div.setAttribute("data-id", `${trainer.id}`);

  const p = document.createElement("p");
  p.innerHTML = trainer.name;

  const addBtn = document.createElement("button");
  addBtn.innerHTML = "Add Pokemon";
  addBtn.setAttribute("data-trainer-id", `${trainer.id}`);
  addBtn.addEventListener("click", function(event) {
    addPokemon(trainer.id);
  })

  div.append(p, addBtn)

  const ul = document.createElement("ul");

  trainer.pokemons.forEach(pokemon => {
    ul.append(renderPokemon(pokemon));
  });

  div.appendChild(ul);
  main.appendChild(div);
}

function renderPokemon(pokemon) {
  const li = document.createElement("li");

  const releaseBtn = document.createElement("button");
  releaseBtn.className = "release";
  releaseBtn.innerHTML = "Release";
  releaseBtn.setAttribute("data-pokemon-id", `${pokemon.id}`);
  releaseBtn.addEventListener("click", function(event) {
    releasePokemon(pokemon)
  })

  li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;
  li.append(releaseBtn);
  return li;
}

function addPokemon(trainer_id) {
  const ul = document.querySelector(`[data-id="${trainer_id}"] ul`)

  if (ul.childElementCount < 6) {
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        trainer_id
      })
    })
    .then(response => response.json())
    .then(json => {
      const li = renderPokemon(json.pokemon)
      ul.appendChild(li)
    })
  }
}

function releasePokemon(pokemon) {
  const li = document.querySelector(`[data-id="${pokemon.trainer_id}"] ul li [data-pokemon-id="${pokemon.id}"]`).parentNode

  fetch(`${POKEMONS_URL}/${pokemon.id}`, {
    method: "DELETE",
  })
  .then(response => li.parentNode.removeChild(li))
}
