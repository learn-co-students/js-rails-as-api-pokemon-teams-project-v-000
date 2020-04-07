const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  fetchTrainers()
})

function fetchTrainers() {
  return fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(json => allTrainers(json))
}

function allTrainers(json) {
  json.forEach(trainer => {
    renderTrainer(trainer)
  })
}

function renderTrainer(trainer) {
  let trainerCollection = document.getElementById("trainer-collection")
  let div = document.createElement('div')
  div.className = 'card'

  let p = document.createElement('p')
  p.innerText = trainer.name

  let addBtn = document.createElement('button')
  addBtn.className = 'addBtn'
  addBtn.textContent = 'Add Pokemon'
  addBtn.setAttribute('id', trainer.id)
  addBtn.addEventListener("click", event => {
    event.preventDefault()
    addPokemon(event)
  })
  let ul = document.createElement('ul')
  div.append(p, addBtn, ul)
  trainerCollection.appendChild(div)

  trainer.pokemons.forEach(pokemon => {
    renderPokemon(pokemon)
  })
}

function releasePokemon(event) {
  //debugger;
  let pokemon_id = parseInt(event.target.id, 10)
  fetch(`http://localhost:3000/pokemons/${pokemon_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  event.target.parentNode.remove()
  }

  function addPokemon(event) {
    let trainer_id = event.target.id
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body:JSON.stringify({"trainer_id": `${trainer_id}`})
    })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.message) {
        alert(jsonResponse.message)
      } else {
      renderPokemon(jsonResponse)}
    })
    .catch(error => {
      console.log(error)
    })
  }

  function renderPokemon(object) {
    let trainer_ul = document.getElementById(`${object.trainer_id.toString()}`).nextSibling
    let li = document.createElement('li')
    li.textContent = `${object.nickname} (${object.species})`
    let relBtn = document.createElement('button')
    relBtn.setAttribute('class', 'release')
    relBtn.textContent = 'Release'
    relBtn.setAttribute('id', `${object.id}-rel`)
    relBtn.addEventListener("click", event => {
      event.preventDefault()
      releasePokemon(event)
    })
    li.appendChild(relBtn)
    trainer_ul.appendChild(li)
  }
