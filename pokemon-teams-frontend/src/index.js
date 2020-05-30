const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main")

const loadTrainers = () => {
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => { 
      json.forEach(trainer => renderTrainer(trainer))
      // json.forEach(trainer => console.log(trainer))
    })
}

document.addEventListener("DOMContentLoaded", loadTrainers)

const renderTrainer = (trainer) => {
  // Create div tag
  const div = document.createElement("div")
  //  Create  p tag 
  const p = document.createElement("p")
  // Create button tag
  const button = document.createElement("button")
  // Create ul tag
  const ul = document.createElement("ul")

  // First Attribute card.className = "card"
  div.setAttribute("class", "card")
  // Second Attribut create id for each trainer
  div.setAttribute("data-id", trainer.id)
  //console.log(trainer.id)
  // Sets innerHTML of the p to trainerName
  p.innerHTML = trainer.name
  // <button data-trainer-id="1">Add Pokemon</button>
  button.setAttribute("data-trainer-id", trainer.id)
  // Adds the innerHTML of the likeButton to "Like"
  button.innerHTML = "Add Pokemon"
  // Add Event Listener "click" to Add Pokemon Button
  button.addEventListener("click", createPokemon)

   // Append Each Child (p, button and  ul  to div (Parent)
   div.appendChild(p)
   div.appendChild(button)
   div.appendChild(ul)

  // Append Child (div) to the main (Parent)
  main.appendChild(div)
  trainer.pokemons.forEach(pokemon => renderPokemon(pokemon)) 
}

const renderPokemon = (pokemon) => {
  // Retrieve ul
  const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
  // Create li
  const li = document.createElement("li")
  // Create button
  const button = document.createElement("button")

  // pokemon.nickname (pokemon.species) using Interpolation
  li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
  
  // First Attribute button.className = "telease"
  button.setAttribute("class", "release")
  //Button Set Second Attribute class release
  button.setAttribute("button", "release")
  // Button Set Third Attribute data-pokemon-id pokemon.id
  button.setAttribute("data-pokemon-id", pokemon.id)
  // Set innerHTML of button to Release
  button.innerHTML = "Release"

  // Add Event Listener "click" to Add Pokemon Button
  button.addEventListener("click", deletePokemon)
  // Append Child(button) to li (Parent)
  li.appendChild(button)
  // Append Child(li) to ul (Parent)
  ul.appendChild(li)
}

const createPokemon = (e) => {
  e.preventDefault()
  const configObj = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ trainer_id: e.target.dataset.trainerId})
  }
  fetch(POKEMONS_URL, configObj)
    .then(res => res.json())
    .then(json => {
      // console.log("YIPPEE!!!") HITS
      // console.log(json) 
      // console.log(res)

    // if (res.message) {
    //   alert(json.message)
    //     } else {
    //       renderPokemon(json)

    if (json.message) {
      alert(json.message)
        } else {
          renderPokemon(json)
    }
  })
}

const deletePokemon = (e) => {
  e.preventDefault()
  const configObj = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
  }
  fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
  e.target.parentElement.remove()
}