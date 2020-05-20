const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => loadTrainers())

const loadTrainers = () => {
    fetch(TRAINERS_URL)
      .then(res => res.json())
      .then(json => {
        json.forEach(trainer => renderTrainer(trainer))
      })
}

const renderTrainer = (trainerHash) => {
  const div = document.createElement("div")
  const p = document.createElement("p")
  const button = document.createElement("button")
  const ul = document.createElement("ul")

  div.setAttribute("class", "card")
  div.setAttribute("data-id", trainerHash.id)
  p.innerHTML = trainerHash.name

  button.setAttribute("data-trainer-id", trainerHash.id)
  button.innerHTML = "Add Pokemon"

  div.appendChild(p)
  div.appendChild(button)
  div.appendChild(ul)

  main.appendChild(div)
  trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

  const renderPokemon = (pokemon) => {
    // const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const ul = document.querySelector('div[data-id="${pokemon.trainer_id}"]')
    const li = document.createElement("li")
  }


// is the 'trainer' being passed to renderTrainer the same as trainerHash on line 16?
// is a js object the same as a hash or does it just look like one? it was described in the
// lab as anything stored between {}?
// difference between innerHTML and innerText if anything
// what's going on with the debugger? why does hightling the url in the url bar and refreshing
// have a different effect than just refreshing or clicking forward on the debugger play icon?
