const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



function fetchTrainers() {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json))
}

function renderTrainers(json) {
    const main = document.querySelector('main')
    json.forEach(trainer => {
        const div = document.createElement('div')
        div.className = 'card'
        div.setAttribute("data-id", trainer.id)
        div.innerHTML = `<p>${trainer.name}</p> <button data-trainer-id="${trainer.id}">Add Pokemon</button>`
        const ul = document.createElement('ul')
        trainer.pokemons.forEach(pokemon => {
            const li = document.createElement('li')
            li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
            ul.appendChild(li)
        })
        div.appendChild(ul)
        main.appendChild(div)
    })
    const addButtons = document.querySelectorAll("[data-trainer-id]")
    for (const button of addButtons) {
        button.addEventListener('click', function(event) {
            const targetElement = event.target
            addPokemon(targetElement).then(pokemon => {
                //console.log(pokemon)
                const container = document.querySelector(`div[data-id="${pokemon.trainer_id}"] ul`)
                const li = document.createElement('li')
                li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
                container.appendChild(li)
            })
        })
    }
    const deleteButtons = document.querySelectorAll(".release")
    for (const button of deleteButtons) {
        button.addEventListener('click', function(event) {
            const targetElement = event.target
            deletePokemon(targetElement)
        })
    }
}

function deletePokemon(element) {
    const pokemonID = element.getAttribute("data-pokemon-id")
    element.parentNode.remove()
    return fetch(POKEMONS_URL + `/${pokemonID}`, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
    
}

function addPokemon(element) {
    return fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: element.getAttribute("data-trainer-id")})
    })
    .then(resp => resp.json())
    .catch(function(error) {
        alert("There are too many pokemons on that team, sorry")
        console.log(error.message)
    })
}

document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers()
})
