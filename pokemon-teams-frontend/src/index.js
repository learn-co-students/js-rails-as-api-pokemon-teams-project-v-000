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
  
  p.innerText = trainer.name
  
  addButton.setAttribute("data-trainer-id", `${trainer.id}`)
  addButton.innerText = "Add Pokemon"
  
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

    ul.append(li)
    li.append(releaseButton)
  })
}