const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// get dom main (query selector)
// fetch data from rails API

document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/trainers')
  .then(response => response.json())
  .then(json => json.forEach(element => trainerBuilder(element)))

  fetch('http://localhost:3000/pokemons')
  .then(response => response.json())
  .then(json => json.forEach(element => pokemonBuilder(element)))
});

function trainerBuilder(json){
  let main = document.querySelector('main')
  let div = document.createElement('div')
  div.classList.add("card");
  div.setAttribute("data-id", json.id)
  let p = document.createElement('p')
  p.append(json.name)
      let addButton = document.createElement('button')
      addButton.append('Add Pokemon')
      addButton.setAttribute("data-trainer-id", json.id)
      addButton.addEventListener("click", createPokemon)
      let ul = document.createElement('ul')
  div.appendChild(p)
  div.appendChild(addButton)
  div.appendChild(ul)
  main.appendChild(div)
}

function pokemonBuilder(json){
  let ul = document.querySelectorAll(`div`)[json.trainer_id-1].querySelector('ul')
  let li = document.createElement('li')
  li.append(json.nickname)
  li.append(" (")
  li.append(json.species)
  li.append(") ")
  let releaseButton = document.createElement('button')
  releaseButton.classList.add("release")
  releaseButton.setAttribute("data-pokemon-id", json.id)
  releaseButton.append("Release")
  releaseButton.addEventListener("click", deletePokemon)
  li.append(releaseButton)
  ul.appendChild(li)
}

const createPokemon = (e) => {
  e.preventDefault()
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
  }

  fetch(POKEMONS_URL, configObj)
  .then(res => res.json())
  .then(json => pokemonBuilder(json))
}

const deletePokemon = (e) => {
  const configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
  e.target.parentElement.remove()
}
