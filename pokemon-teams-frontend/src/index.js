const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", function() {
  getTrainers()
})

function getTrainers() {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(json => {
    json.forEach(trainer => createTrainerCard(trainer))
  })
}

function createTrainerCard(trainer) {
  const div = document.createElement("div")
  const p = document.createElement("p")
  const addButton = document.createElement("button")
  const ul = document.createElement("ul")
  
  div.setAttribute("class", "card")
  div.setAttribute("data-id", `${trainer.id}`)
  
  p.innerText = `${trainer.name}`
  
  addButton.setAttribute("data-trainer-id", `${trainer.id}`)
  addButton.setAttribute("class", "add")
  addButton.innerText = "Add Pokemon"
  addButton.addEventListener("click", function() {
    addPokemonToTeam(trainer)
  })
  
  main.append(div)
  div.append(p)
  div.append(addButton)
  div.append(ul)

  trainer.pokemons.forEach(pokemon => {
    const li = document.createElement("li")
    const releaseButton = document.createElement("button")

    li.innerText = `${pokemon.nickname} (${pokemon.species})`

    releaseButton.setAttribute("class", "release")
    releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`)
    releaseButton.innerText = "Release"
    releaseButton.addEventListener("click", function() {
      releasePokemonFromTeam(pokemon)
    })

    ul.append(li)
    li.append(releaseButton)
  })
}

function addPokemonToTeam(trainer) {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainer.id,
    })
  })
  .then(json => window.location.reload(true))
}

function releasePokemonFromTeam(pokemon) {
  fetch(`${BASE_URL}/pokemons/${pokemon.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      pokemon_id: pokemon.id,
    })
  })
  .then(json => window.location.reload(true))
}