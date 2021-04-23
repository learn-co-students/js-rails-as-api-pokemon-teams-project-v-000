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
  div.appendChild(button)

  let ul = document.createElement('ul')
  div.appendChild(ul)

  for (const pokemon of trainerObj['pokemons']) {
    let pokeLi = createPokemon(pokemon)
    ul.appendChild(pokeLi)
  }

function createPokemon(pokeObj) {
  let pokemon = document.createElement('li')
  pokemon.innerText = pokeObj['nickname'] + ` (${pokeObj['species']})`
  let releaseButton = document.createElement('button')
  releaseButton.className = 'release'
  releaseButton.innerText = 'Release'
  releaseButton.setAttribute('data-pokemon-id', pokeObj['id'] )
  pokemon.appendChild(releaseButton)
  return pokemon
}

  

  document.querySelector('main').appendChild(div)
}


// Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.

// Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.
