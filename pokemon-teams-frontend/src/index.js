const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', (ev) => {
  getPokemonTeams()
})

function getPokemonTeams() {
  fetch(TRAINERS_URL)
    .then((r) => {
      return r.json()
    })
    .then((json) => {
      listPokemonTeams(json)
    })
}

const teamsArea = document.querySelector('main')
function listPokemonTeams(teams) {
  teams.forEach((t) => {
    const trainer = listTrainer(t)
    listAllPokemon(t, trainer)
    teamsArea.appendChild(trainer)
  })
}

function listTrainer(team) {
  const trainerId = team.id
  const trainerName = team.name

  const trainerCard = document.createElement('div')
  trainerCard.id = `card-${trainerId}`
  trainerCard.className = 'card'
  trainerCard.innerHTML = `
      <p>${trainerName}</p>
  `

  const trainerAddButton = document.createElement('button')
  trainerAddButton.id=`${trainerId}`
  trainerAddButton.innerHTML = 'Add Pokemon'
  trainerAddButton.addEventListener('click', (ev) => {
    addNewPokemon(ev.target.id)
  })
  trainerCard.appendChild(trainerAddButton)

  return trainerCard
}

function listAllPokemon(team, trainerCard) {
  const pokemonList = document.createElement('ul')
  pokemonList.id = `trainer-${team.id}-pokemons`

  team.pokemon.forEach((p) => {
    listAPokemon(p, pokemonList)
  })
  trainerCard.appendChild(pokemonList)
}

function listAPokemon(p, pokemonList) {
  const newPokemonLi = document.createElement('li')
  newPokemonLi.id = `pokemon-${p.id}`
  newPokemonLi.innerHTML = `
    ${p.nickname} (${p.species})
  `
  const releaseButton = document.createElement('button')
  releaseButton.id = `${p.id}`
  releaseButton.className = 'release'
  releaseButton.innerHTML = 'Release'
  releaseButton.addEventListener('click', (e) => {
    removePokemon(e.target.id)
  })
  newPokemonLi.appendChild(releaseButton)

  pokemonList.appendChild(newPokemonLi)
}

function addNewPokemon(trainerId) {
  const pokemonList = document.getElementById(`trainer-${trainerId}-pokemons`)

  if (pokemonList.childElementCount < 6) {
    config = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ trainerId })
    }

    fetch(POKEMONS_URL, config)
      .then((r) => {
        return r.json()
      })
      .then((json) => {
        listAPokemon(json, pokemonList)
      })
  }
}

function removePokemon(id) {
  const pokemonToRemove = document.getElementById(`pokemon-${id}`)
  pokemonToRemove.remove()

  const deleteUrl = POKEMONS_URL + '/' + id
  fetch(deleteUrl, { method: 'DELETE' })
}
