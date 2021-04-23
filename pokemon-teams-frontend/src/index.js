const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// When a user loads the page, they should see all trainers, with their current team of Pokemon
document.addEventListener('DOMContentLoaded', () => {
  getTrainers()
})

function getTrainers () {
  fetch(TRAINERS_URL)
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    const trainersObject = json
    for (const trainer of trainersObject) {
      createTrainer(trainer)
    }
  })
}

function createTrainer(trainerObj) {
  let div = document.createElement('div')
  div.className = 'card'

  let pName = document.createElement('p')
  pName.innerText = trainerObj['name']
  div.appendChild(pName)

  let button = document.createElement('button')
  button.innerText = 'Add Pokemon'
  button.setAttribute('data-trainer-id', trainerObj['id'])
  button.addEventListener('click', function(e) {
    trainerId = e.currentTarget.dataset.trainerId
    trainerUl = e.currentTarget.parentElement.querySelector('ul')
    if (trainerUl.childElementCount < 6) {
      addNewPokemon(trainerId, trainerUl)
    }
  })
  div.appendChild(button)

  let ul = document.createElement('ul')
  div.appendChild(ul)

  for (const pokemon of trainerObj['pokemons']) {
    createPokemon(pokemon, ul)
  }

  document.querySelector('main').appendChild(div)
}

function createPokemon(pokeObj, ul) {
  let pokemon = document.createElement('li')
  pokemon.innerText = pokeObj['nickname'] + ` (${pokeObj['species']})`

  let releaseButton = document.createElement('button')
  releaseButton.className = 'release'
  releaseButton.innerText = 'Release'
  releaseButton.setAttribute('data-pokemon-id', pokeObj['id'] )
  releaseButton.addEventListener('click', function(e) {
    pokeId = e.currentTarget.dataset.pokemonId
    pokeLi = e.currentTarget.parentElement
    releasePokemon(pokeId, pokeLi, ul)
  })
  pokemon.appendChild(releaseButton)

  ul.appendChild(pokemon)
}

// Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.
function addNewPokemon(id, ul) {
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers:  {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {trainer_id: id}
      )
  })
  .then(response => response.json())
  .then(function(json) {
    createPokemon(json, ul)
  })
}

// Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.
function releasePokemon(id, li, ul) {
  fetch(`${POKEMONS_URL}/${id}`, {
    method: 'DELETE',
    headers:  {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
  .then(function(data) {
    console.log(data)
    ul.removeChild(li)
  })
}