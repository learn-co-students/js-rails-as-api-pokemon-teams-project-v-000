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
        const h2 = document.createElement('h2')
        h2.innerHTML = `<h2>${trainer.name}</h2>`
        main.appendChild(h2)
        const ul = document.createElement('ul')
        trainer.pokemons.forEach(pokemon => {
            const li = document.createElement('li')
            li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
            ul.appendChild(li)
        })
        main.appendChild(ul)
    })
}

document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers()
})
