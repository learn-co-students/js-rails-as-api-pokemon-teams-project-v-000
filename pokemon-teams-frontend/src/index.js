const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainSection = document.querySelector('main')

document.addEventListener("DOMContentLoaded", getTrainers())

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => {
        json.forEach(trainer => listTrainer(trainer))
    })
}

function listTrainer(trainer) {
    const ul = document.createElement('ul')
    const div = document.createElement('div')
    div.className = "card"
    div.setAttribute("data-id", trainer.id)
    const p = document.createElement('p')
    p.innerHTML = trainer.name
    
    const button = document.createElement('button')
    button.setAttribute("data-trainer-id", trainer.id)
    button.innerHTML = "Add Pokemon"
    button.addEventListener("click", createPokemon)
    
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)

    mainSection.appendChild(div)
    trainer.pokemons.forEach(pokemon => listPokemon(pokemon))
}

function listPokemon(pokemon) {
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement('li')
    const button = document.createElement('button')

    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    button.className = "release"
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerHTML = "Release"
    button.addEventListener("click", deletePokemon)
    
    li.appendChild(button)
    ul.appendChild(li)
}

function createPokemon(event) {
    event.preventDefault()
    const sendObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: event.target.dataset.trainerId})
    }

    fetch(POKEMONS_URL, sendObj)
    .then(response => response.json())
    .then(json => {
        if (json.message){
            alert(json.message)
        }
    })
}

function deletePokemon(event) {
    event.preventDefault()
    const deleteObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`, deleteObj)
    event.target.parentElement.remove()
}