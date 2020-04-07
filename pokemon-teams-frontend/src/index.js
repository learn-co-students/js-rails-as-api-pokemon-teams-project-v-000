const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
  loadTrainers();
})

function loadTrainers() {
  return fetch (TRAINERS_URL)
  .then(response => response.json())
  .then(json => loadTeams(json))
  }

function loadTeams(trainers) {
  trainers.forEach(trainer => {
      displayTeam(trainer);
  })
}

function displayTeam(trainer) {
  const main = document.querySelector('main')
  const div = document.createElement('div')
  div.className = 'card'
  div.setAttribute('data-id', `${trainer.id}`)

  const p = document.createElement('p')
  p.innerHTML = trainer.name

  const addButton = document.createElement('button')
  addButton.innerHTML = 'Add Pokemon'
  addButton.setAttribute("data-trainer-id", `${trainer.id}`)
  addButton.addEventListener("click", function(e) {
      addPokemon(trainer)
  })

  div.append(p, addButton)

  const ul = document.createElement('ul')
    trainer.pokemons.forEach(pokemon => {
      displayPokemons(pokemon);

  })

  function displayPokemons(pokemon) {
    const li = document.createElement('li')
    const releaseButton = document.createElement('button')

    li.innerHTML =  `${pokemon.nickname} (${pokemon.species})`
    li.setAttribute('data-pokemon-id', `${pokemon.id}`)
    
    releaseButton.className = 'release'
    releaseButton.innerHTML = 'Release'
    releaseButton.setAttribute("data-pokemon-id", `${pokemon.id}`)
    releaseButton.addEventListener("click", function(e) {
        releasePokemon(pokemon)
    })

    ul.append(li)
    li.append(releaseButton)
  }

  div.appendChild(ul)
  main.appendChild(div)

}

function addPokemon(trainer){

  return fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      trainer_id: trainer.id
      })
  })
}

function releasePokemon(pokemon){
  console.log(pokemon)

  return fetch(POKEMONS_URL + '/' + pokemon.id, {
    method: "DELETE"})
}