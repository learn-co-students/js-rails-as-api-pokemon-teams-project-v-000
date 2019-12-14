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
  //div.id = `${trainer.id.toString()}`
  //console.log(div.id)

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
  trainer.pokemons.forEach(pokemon => {
    let li = document.createElement('li')
    li.textContent = `${pokemon.nickname} (${pokemon.species})`
    let relBtn = document.createElement('button')
    relBtn.setAttribute('class', 'release')
    relBtn.textContent = 'Release'
    relBtn.setAttribute('id', pokemon.id)
    relBtn.addEventListener("click", event => {
      event.preventDefault()
      releasePokemon(event)
    })
    li.appendChild(relBtn)
    ul.appendChild(li)
  })
  div.append(p, addBtn, ul)
  trainerCollection.appendChild(div)
}

function releasePokemon(event) {
  let pokemon_id = event.target.id
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
      //console.log(jsonResponse)
      renderPokemon(jsonResponse)
    })
    .catch(error => {
      console.log(error)
    })
  }

  function renderPokemon(Object) {

    let trainer_ul = document.getElementById(`${Object.trainer_id.toString()}`).nextSibling
    let li = document.createElement('li')
    li.textContent = `${Object.nickname} (${Object.species})`
    let relBtn = document.createElement('button')
    relBtn.setAttribute('class', 'release')
    relBtn.textContent = 'Release'
    relBtn.setAttribute('id', Object.id)
    relBtn.addEventListener("click", event => {
      event.preventDefault()
      releasePokemon(event)
    })
    li.appendChild(relBtn)
    trainer_ul.appendChild(li)
  }
