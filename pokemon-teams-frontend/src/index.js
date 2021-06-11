const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let canvas = document.querySelector('main')

fetch(TRAINERS_URL)
.then(r => r.json())
.then(trainers => {
    for (let t of trainers) {
            let button = document.createElement('button')
            button.innerText = "Add Pokemon"
            button.setAttribute("data-trainer-id",t.id)
            let card = document.createElement('div')
            card.dataset.id = t.id
            card.className = 'card'
                   
            let name = document.createElement('p')
            name.innerText = t.name
            let ul = document.createElement('ul')
    
            card.appendChild(name)
            card.appendChild(button)
            card.appendChild(ul)
            canvas.appendChild(card)
        }
    })

fetch(POKEMONS_URL)
    .then(r => r.json())
    .then(pokemon => {
        for (let p of pokemon) {
            let poke = document.createElement('li')
            let release = document.createElement('button')
            release.className = "release"
            release.setAttribute("data-pokemon-id",p.id)
            release.innerText = "Release"
            poke.innerHTML = `${p.species} (${p.nickname})`
            document.querySelector(`[data-id='${p.trainer_id}'] ul`).appendChild(poke)
            poke.appendChild(release)
        }
    })



